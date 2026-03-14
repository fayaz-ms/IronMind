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
      mealType = "any",
      dietaryPreferences = "none",
      allergies = "none",
    } = body;

    const allowedMealTypes = ["breakfast", "lunch", "dinner", "snack", "any"];
    if (!allowedMealTypes.includes(mealType)) {
      return NextResponse.json({ error: "Invalid meal type" }, { status: 400 });
    }

    if (typeof dietaryPreferences !== "string" || dietaryPreferences.length > 500) {
      return NextResponse.json({ error: "Invalid dietary preferences" }, { status: 400 });
    }
    if (typeof allergies !== "string" || allergies.length > 500) {
      return NextResponse.json({ error: "Invalid allergies field" }, { status: 400 });
    }

    const recentNutrition = await prisma.nutritionLog.findMany({
      where: { userId: user.id },
      orderBy: { loggedAt: "desc" },
      take: 14,
    });

    const avgCalories = recentNutrition.length > 0
      ? Math.round(recentNutrition.reduce((sum, n) => sum + n.calories, 0) / recentNutrition.length)
      : user.profile?.calorieGoal || 2000;

    const prompt = `Generate personalized nutrition advice for a ${mealType} meal.
User fitness goal: ${user.profile?.fitnessGoal || "MAINTAIN"}.
Daily calorie target: ${user.profile?.calorieGoal || 2000} kcal.
Protein target: ${user.profile?.proteinGoal || 150}g.
Carb target: ${user.profile?.carbGoal || 250}g.
Fat target: ${user.profile?.fatGoal || 65}g.
Average recent daily intake: ${avgCalories} kcal.
Dietary preferences: ${dietaryPreferences}.
Allergies: ${allergies}.

Return a structured JSON response with this exact format:
{
  "mealSuggestion": {
    "name": "meal name",
    "description": "brief description",
    "calories": 500,
    "protein": 35,
    "carbs": 45,
    "fat": 15,
    "ingredients": ["ingredient 1", "ingredient 2"],
    "instructions": ["step 1", "step 2"],
    "prepTime": "15 min"
  },
  "dailyTips": ["tip1", "tip2", "tip3"],
  "macroAdvice": "brief macro adjustment advice",
  "hydrationReminder": "daily water intake reminder"
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

    let parsedAdvice;
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      parsedAdvice = jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: response };
    } catch {
      parsedAdvice = { raw: response };
    }

    await prisma.aiInsight.create({
      data: {
        userId: user.id,
        type: "NUTRITION",
        title: `AI Nutrition: ${mealType} advice`,
        content: JSON.stringify(parsedAdvice),
      },
    });

    return NextResponse.json({ advice: parsedAdvice });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
