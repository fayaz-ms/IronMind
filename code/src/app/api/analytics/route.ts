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
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setDate(monthAgo.getDate() - 30);

    const [
      totalWorkouts,
      weeklyWorkouts,
      monthlyWorkouts,
      totalNutritionLogs,
      totalSleepLogs,
      achievements,
      streakData,
    ] = await Promise.all([
      prisma.workout.count({ where: { userId: user.id } }),
      prisma.workout.count({ where: { userId: user.id, completedAt: { gte: weekAgo } } }),
      prisma.workout.count({ where: { userId: user.id, completedAt: { gte: monthAgo } } }),
      prisma.nutritionLog.count({ where: { userId: user.id } }),
      prisma.sleepLog.count({ where: { userId: user.id } }),
      prisma.userAchievement.count({ where: { userId: user.id } }),
      prisma.habit.findMany({
        where: { userId: user.id },
        select: { currentStreak: true, longestStreak: true },
      }),
    ]);

    const longestStreak = streakData.reduce((max, h) => Math.max(max, h.longestStreak), 0);
    const currentStreak = streakData.reduce((max, h) => Math.max(max, h.currentStreak), 0);

    // Workout completion rate (workouts per week target = 5)
    const completionRate = weeklyWorkouts > 0 ? Math.min(Math.round((weeklyWorkouts / 5) * 100), 100) : 0;

    return NextResponse.json({
      totalWorkouts,
      weeklyWorkouts,
      monthlyWorkouts,
      totalNutritionLogs,
      totalSleepLogs,
      achievements,
      longestStreak,
      currentStreak,
      completionRate,
      memberSince: user.createdAt,
    });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
