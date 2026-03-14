import OpenAI from "openai";

let _openai: OpenAI | null = null;
function getOpenAI(): OpenAI {
  if (!_openai) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _openai;
}

interface UserContext {
  name: string;
  age?: number;
  weight?: number;
  height?: number;
  fitnessGoal?: string;
  activityLevel?: string;
  recentWorkouts?: string;
  recentNutrition?: string;
  sleepData?: string;
  bodyProgress?: string;
}

const SYSTEM_PROMPT = `You are IronMind AI Coach, an expert fitness and wellness advisor. 
You provide evidence-based, personalized guidance on workouts, nutrition, sleep, and overall health.
Be encouraging but honest. Give specific, actionable advice.
Format responses with clear sections using markdown.
Never provide medical diagnoses — recommend consulting a healthcare professional when appropriate.`;

export async function generateFitnessInsight(
  userContext: UserContext,
  prompt: string
): Promise<string> {
  const contextStr = Object.entries(userContext)
    .filter(([, v]) => v != null)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  const completion = await getOpenAI().chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `User profile:\n${contextStr}\n\nRequest: ${prompt}`,
      },
    ],
    max_tokens: 800,
    temperature: 0.7,
  });

  return completion.choices[0]?.message?.content ?? "Unable to generate insight.";
}

export async function generateDashboardInsights(userContext: UserContext) {
  const prompts = [
    {
      type: "WORKOUT" as const,
      prompt: "Based on the user's recent workout data, provide a brief workout tip or suggestion for today (2–3 sentences).",
    },
    {
      type: "NUTRITION" as const,
      prompt: "Based on the user's nutrition data, provide a brief nutrition tip for today (2–3 sentences).",
    },
    {
      type: "SLEEP" as const,
      prompt: "Based on the user's sleep data, provide a brief sleep improvement suggestion (2–3 sentences).",
    },
    {
      type: "HYDRATION" as const,
      prompt: "Based on the user profile, suggest today's hydration goal and a brief tip (2–3 sentences).",
    },
  ];

  const results = await Promise.allSettled(
    prompts.map(async ({ type, prompt }) => {
      const content = await generateFitnessInsight(userContext, prompt);
      return { type, content };
    })
  );

  return results
    .filter((r) => r.status === "fulfilled")
    .map((r: any) => r.value);
}
