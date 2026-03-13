import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { workoutSchema } from "@/lib/validations";

export async function GET(req: Request) {
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

    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 100);
    const offset = parseInt(searchParams.get("offset") || "0");

    const workouts = await prisma.workout.findMany({
      where: { userId: user.id },
      include: {
        sets: { include: { exercise: true } },
      },
      orderBy: { completedAt: "desc" },
      take: limit,
      skip: offset,
    });

    const total = await prisma.workout.count({ where: { userId: user.id } });

    return NextResponse.json({ workouts, total });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function POST(req: Request) {
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

    const body = await req.json();
    const result = workoutSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, duration, caloriesBurned, notes, sets } = result.data;

    const workout = await prisma.workout.create({
      data: {
        userId: user.id,
        name,
        duration,
        caloriesBurned,
        notes,
        sets: {
          create: sets.map((set: any) => ({
            exerciseId: set.exerciseId,
            reps: set.reps,
            weight: set.weight,
            setNumber: set.setNumber,
          })),
        },
      },
      include: {
        sets: { include: { exercise: true } },
      },
    });

    return NextResponse.json(workout, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
