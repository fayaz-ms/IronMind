import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
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

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const [
      todayNutrition,
      todaySleep,
      weekWorkouts,
      latestProgress,
    ] = await Promise.all([
      prisma.nutritionLog.findMany({
        where: { userId: user.id, loggedAt: { gte: today, lt: tomorrow } },
      }),
      prisma.sleepLog.findFirst({
        where: { userId: user.id, sleepStart: { gte: weekAgo } },
        orderBy: { sleepStart: "desc" },
      }),
      prisma.workout.findMany({
        where: { userId: user.id, completedAt: { gte: weekAgo } },
      }),
      prisma.bodyProgress.findFirst({
        where: { userId: user.id },
        orderBy: { measuredAt: "desc" },
      }),
    ]);

    const totalCalories = todayNutrition.reduce((sum: number, n: any) => sum + n.calories, 0);
    const totalProtein = todayNutrition.reduce((sum: number, n: any) => sum + (n.protein || 0), 0);
    const totalCarbs = todayNutrition.reduce((sum: number, n: any) => sum + (n.carbs || 0), 0);
    const totalFat = todayNutrition.reduce((sum: number, n: any) => sum + (n.fat || 0), 0);

    return NextResponse.json({
      calories: { current: totalCalories, goal: 2200 },
      protein: { current: totalProtein, goal: 150 },
      carbs: { current: totalCarbs, goal: 250 },
      fat: { current: totalFat, goal: 70 },
      sleep: todaySleep ? { duration: todaySleep.duration, quality: todaySleep.quality } : null,
      workoutsThisWeek: weekWorkouts.length,
      totalWorkoutMinutes: weekWorkouts.reduce((sum: number, w: any) => sum + (w.duration || 0), 0),
      latestWeight: latestProgress?.weight || null,
    });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
