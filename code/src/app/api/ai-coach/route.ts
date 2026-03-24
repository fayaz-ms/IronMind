import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateFitnessInsight } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const { message } = body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (message.length > 2000) {
      return NextResponse.json({ error: "Message too long" }, { status: 400 });
    }

    // Gather user context for the AI
    const [recentWorkouts, recentNutrition, recentSleep] = await Promise.all([
      prisma.workout.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { sets: { include: { exercise: true } } },
      }),
      prisma.nutritionLog.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        take: 7,
      }),
      prisma.sleepLog.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        take: 7,
      }),
    ]);

    const userContext = {
      profile: user.profile,
      recentWorkouts: recentWorkouts.length,
      avgSleep: recentSleep.length > 0
        ? (recentSleep.reduce((sum: number, s: any) => sum + s.duration, 0) / recentSleep.length).toFixed(1)
        : "N/A",
      avgCalories: recentNutrition.length > 0
        ? Math.round(recentNutrition.reduce((sum: number, n: any) => sum + n.calories, 0) / recentNutrition.length)
        : "N/A",
    };

    const contextString = `User profile: ${user.profile?.fitnessGoal || "general fitness"}, activity level: ${user.profile?.activityLevel || "moderate"}. Recent data: ${userContext.recentWorkouts} workouts last week, avg sleep ${userContext.avgSleep}h, avg calories ${userContext.avgCalories}.`;

    const prompt = `${contextString}\n\nUser question: ${message}`;
    const response = await generateFitnessInsight({
      name: user.name || "User",
      age: user.profile?.age ?? undefined,
      weight: user.profile?.weight ?? undefined,
      height: user.profile?.height ?? undefined,
      fitnessGoal: user.profile?.fitnessGoal,
      activityLevel: user.profile?.activityLevel,
      recentWorkouts: recentWorkouts.length.toString(),
      recentNutrition: recentNutrition.length.toString(),
      sleepData: recentSleep.length.toString(),
    }, prompt);

    // Save as AI insight
    await prisma.aiInsight.create({
      data: {
        userId: user.id,
        type: "GENERAL",
        title: message.slice(0, 100),
        content: response,
      },
    });

    return NextResponse.json({ response });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const insights = await prisma.aiInsight.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return NextResponse.json(insights);
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
