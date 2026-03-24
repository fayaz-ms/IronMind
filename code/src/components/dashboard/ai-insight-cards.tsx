"use client";

import { Brain, Dumbbell, Salad, Moon, Droplets } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const insights = [
  {
    type: "WORKOUT",
    icon: Dumbbell,
    color: "text-violet-500 bg-violet-500/10",
    title: "Push Day Suggestion",
    content:
      "You haven't trained chest in 4 days. Consider a push workout today — try increasing your bench press by 2.5 kg for progressive overload.",
  },
  {
    type: "NUTRITION",
    icon: Salad,
    color: "text-emerald-500 bg-emerald-500/10",
    title: "Protein Reminder",
    content:
      "You're 15 g below your protein goal on average this week. Add a post-workout shake or Greek yogurt to hit your target.",
  },
  {
    type: "SLEEP",
    icon: Moon,
    color: "text-indigo-500 bg-indigo-500/10",
    title: "Sleep Optimization",
    content:
      "Your average bedtime shifted 40 min later this week. Consistent sleep timing improves recovery by up to 23%.",
  },
  {
    type: "HYDRATION",
    icon: Droplets,
    color: "text-blue-500 bg-blue-500/10",
    title: "Hydration Check",
    content:
      "You've been hitting 72% of your water goal. Try keeping a bottle at your desk — aim for 0.5 L before each meal.",
  },
];

export function AiInsightCards() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
          <Brain className="h-4 w-4 text-white" />
        </div>
        <div>
          <CardTitle className="text-lg">AI Coach Insights</CardTitle>
          <p className="text-xs text-muted-foreground">Personalized recommendations based on your data</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {insights.map((insight) => (
            <div
              key={insight.type}
              className="rounded-xl border p-4 transition-colors hover:bg-accent/50"
            >
              <div className="flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${insight.color}`}>
                  <insight.icon className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-sm">{insight.title}</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {insight.content}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
