import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// XP calculation: 10 per workout, 5 per nutrition log, 3 per sleep log, 2 per water log
function calculateLevel(xp: number): { level: number; currentXp: number; nextLevelXp: number } {
  // Each level requires progressively more XP: level * 100
  let level = 1;
  let remainingXp = xp;
  while (remainingXp >= level * 100) {
    remainingXp -= level * 100;
    level++;
  }
  return { level, currentXp: remainingXp, nextLevelXp: level * 100 };
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        _count: {
          select: {
            workouts: true,
            nutritionLogs: true,
            sleepLogs: true,
            waterLogs: true,
          },
        },
        achievements: {
          include: { achievement: true },
          orderBy: { earnedAt: "desc" },
        },
        habits: {
          select: {
            id: true,
            name: true,
            currentStreak: true,
            longestStreak: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Calculate XP
    const totalXp =
      user._count.workouts * 10 +
      user._count.nutritionLogs * 5 +
      user._count.sleepLogs * 3 +
      user._count.waterLogs * 2;

    const levelInfo = calculateLevel(totalXp);

    // Calculate workout streak (consecutive days with workouts)
    const recentWorkouts = await prisma.workout.findMany({
      where: { userId: user.id },
      orderBy: { completedAt: "desc" },
      select: { completedAt: true },
      take: 90,
    });

    let workoutStreak = 0;
    if (recentWorkouts.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let checkDate = new Date(today);

      for (let i = 0; i < 90; i++) {
        const dayStart = new Date(checkDate);
        const dayEnd = new Date(checkDate);
        dayEnd.setDate(dayEnd.getDate() + 1);

        const hasWorkout = recentWorkouts.some((w) => {
          const d = new Date(w.completedAt);
          return d >= dayStart && d < dayEnd;
        });

        if (hasWorkout) {
          workoutStreak++;
        } else if (i > 0) {
          break;
        }
        checkDate.setDate(checkDate.getDate() - 1);
      }
    }

    // Weekly challenge progress: workouts this week >= 45 min
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);

    const weeklyWorkouts = await prisma.workout.findMany({
      where: {
        userId: user.id,
        completedAt: { gte: weekStart },
        duration: { gte: 45 },
      },
    });

    return NextResponse.json({
      xp: {
        total: totalXp,
        ...levelInfo,
      },
      streak: {
        current: workoutStreak,
        longest: Math.max(workoutStreak, ...user.habits.map((h) => h.longestStreak)),
      },
      stats: {
        totalWorkouts: user._count.workouts,
        totalNutritionLogs: user._count.nutritionLogs,
        totalSleepLogs: user._count.sleepLogs,
        totalWaterLogs: user._count.waterLogs,
      },
      achievements: user.achievements.map((ua) => ({
        id: ua.achievement.id,
        name: ua.achievement.name,
        description: ua.achievement.description,
        icon: ua.achievement.icon,
        category: ua.achievement.category,
        earnedAt: ua.earnedAt,
      })),
      weeklyChallenge: {
        name: "Endurance Week",
        description: "Complete 5 workouts of at least 45 minutes",
        progress: weeklyWorkouts.length,
        total: 5,
        daysLeft: 7 - new Date().getDay(),
        reward: "50 XP + Endurance Badge",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch gamification data" }, { status: 500 });
  }
}
