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

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Get top users by workout count in last 30 days
    const topUsers = await prisma.user.findMany({
      where: {
        workouts: { some: { completedAt: { gte: thirtyDaysAgo } } },
      },
      select: {
        id: true,
        name: true,
        image: true,
        _count: { select: { workouts: true } },
        achievements: { select: { id: true } },
      },
      orderBy: { workouts: { _count: "desc" } },
      take: 20,
    });

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        _count: { select: { workouts: true } },
      },
    });

    const leaderboard = topUsers.map((user, index) => ({
      rank: index + 1,
      name: user.name ?? "Anonymous",
      image: user.image,
      workoutCount: user._count.workouts,
      achievementCount: user.achievements.length,
      isCurrentUser: user.id === currentUser?.id,
    }));

    return NextResponse.json({
      leaderboard,
      currentUserRank: leaderboard.findIndex((u) => u.isCurrentUser) + 1 || null,
      currentUserWorkouts: currentUser?._count.workouts ?? 0,
    }, {
      headers: { "Cache-Control": "private, max-age=60" },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
  }
}
