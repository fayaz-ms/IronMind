"use client";

import Link from "next/link";
import { Dumbbell, Salad, Moon, Droplets, Scale, Brain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const actions = [
  { label: "Log Workout", href: "/dashboard/workouts", icon: Dumbbell, color: "text-violet-500 bg-violet-500/10" },
  { label: "Log Meal", href: "/dashboard/nutrition", icon: Salad, color: "text-emerald-500 bg-emerald-500/10" },
  { label: "Log Sleep", href: "/dashboard/sleep", icon: Moon, color: "text-indigo-500 bg-indigo-500/10" },
  { label: "Log Water", href: "/dashboard/nutrition", icon: Droplets, color: "text-blue-500 bg-blue-500/10" },
  { label: "Body Check", href: "/dashboard/progress", icon: Scale, color: "text-orange-500 bg-orange-500/10" },
  { label: "AI Coach", href: "/dashboard/ai-coach", icon: Brain, color: "text-pink-500 bg-pink-500/10" },
];

export function QuickActions() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-colors hover:bg-accent"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${action.color}`}>
              <action.icon className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium">{action.label}</span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
