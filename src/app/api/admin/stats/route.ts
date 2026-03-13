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

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const [totalUsers, activeSubscriptions, totalExercises, totalWorkouts] =
      await Promise.all([
        prisma.user.count(),
        prisma.subscription.count({ where: { status: "ACTIVE", plan: { not: "FREE" } } }),
        prisma.exercise.count(),
        prisma.workout.count(),
      ]);

    return NextResponse.json({
      totalUsers,
      activeSubscriptions,
      totalExercises,
      totalWorkouts,
    });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
