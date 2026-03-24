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
    const {
      focus = "FULL_BODY",
      difficulty = "INTERMEDIATE",
      duration = 45,
      equipment = "full_gym",
    } = body;

    const allowedFocus = ["CHEST", "BACK", "SHOULDERS", "LEGS", "ARMS", "ABS", "CARDIO", "FULL_BODY"];
    const allowedDifficulty = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];

    if (!allowedFocus.includes(focus)) {
      return NextResponse.json({ error: "Invalid focus area" }, { status: 400 });
    }
    if (!allowedDifficulty.includes(difficulty)) {
      return NextResponse.json({ error: "Invalid difficulty" }, { status: 400 });
    }
    if (typeof duration !== "number" || duration < 10 || duration > 180) {
      return NextResponse.json({ error: "Duration must be 10-180 minutes" }, { status: 400 });
    }

    const [recentWorkouts] = await Promise.all([
      prisma.workout.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { sets: { include: { exercise: true } } },
      }),
    ]);

    const recentMuscleGroups = recentWorkouts
      .flatMap((w) => w.sets.map((s) => s.exercise.muscleGroup))
      .filter(Boolean);

    const prompt = `Generate a ${duration}-minute ${difficulty.toLowerCase()} workout plan focused on ${focus.replace("_", " ").toLowerCase()}.
Equipment available: ${equipment}.
User fitness goal: ${user.profile?.fitnessGoal || "general fitness"}.
Activity level: ${user.profile?.activityLevel || "moderate"}.
Recently trained muscle groups: ${recentMuscleGroups.join(", ") || "none recorded"}.

Return a structured JSON response with this exact format:
{
  "name": "workout name",
  "duration": ${duration},
  "warmup": [{"exercise": "name", "duration": "time", "notes": "tips"}],
  "exercises": [{"exercise": "name", "sets": 3, "reps": "8-12", "rest": "60s", "notes": "form tips", "muscleGroup": "GROUP"}],
  "cooldown": [{"exercise": "name", "duration": "time"}],
  "tips": ["tip1", "tip2"],
  "estimatedCalories": 300
}

Only return valid JSON, no markdown.`;

    const response = await generateFitnessInsight(
      {
        name: user.name || "User",
        age: user.profile?.age ?? undefined,
        weight: user.profile?.weight ?? undefined,
        height: user.profile?.height ?? undefined,
        fitnessGoal: user.profile?.fitnessGoal,
        activityLevel: user.profile?.activityLevel,
      },
      prompt
    );

    let parsedWorkout;
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      parsedWorkout = jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: response };
    } catch {
      parsedWorkout = { raw: response };
    }

    await prisma.aiInsight.create({
      data: {
        userId: user.id,
        type: "WORKOUT",
        title: `AI Workout: ${focus} (${difficulty})`,
        content: JSON.stringify(parsedWorkout),
      },
    });

    return NextResponse.json({ workout: parsedWorkout });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
