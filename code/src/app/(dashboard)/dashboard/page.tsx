"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Flame,
  Droplets,
  Moon,
  Dumbbell,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { WeeklyChart } from "@/components/dashboard/weekly-chart";
import { AiInsightCards } from "@/components/dashboard/ai-insight-cards";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { getGreeting } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

interface DashboardData {
  calories: { current: number; goal: number };
  protein: { current: number; goal: number };
  carbs: { current: number; goal: number };
  fat: { current: number; goal: number };
  sleep: { duration: number; quality: number } | null;
  workoutsThisWeek: number;
  totalWorkoutMinutes: number;
  latestWeight: number | null;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const greeting = getGreeting();
  const [dashData, setDashData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = useCallback(async () => {
    try {
      const res = await fetch("/api/dashboard");
      if (res.ok) {
        const data = await res.json();
        setDashData(data);
      }
    } catch {
      // silently fail, show defaults
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const stats = {
    calories: { consumed: dashData?.calories.current ?? 0, goal: dashData?.calories.goal ?? 2200 },
    protein: { consumed: dashData?.protein.current ?? 0, goal: dashData?.protein.goal ?? 150 },
    water: { consumed: 0, goal: 2.5 },
    sleep: { hours: dashData?.sleep?.duration ?? 0, goal: 8, score: dashData?.sleep?.quality ?? 0 },
    workout: { minutes: dashData?.totalWorkoutMinutes ?? 0, goal: 300 },
    streak: { workout: dashData?.workoutsThisWeek ?? 0, goal: 7 },
  };

  const cards = [
    {
      label: "Calories",
      value: `${stats.calories.consumed}`,
      unit: "kcal",
      goal: stats.calories.goal,
      progress: stats.calories.goal > 0 ? (stats.calories.consumed / stats.calories.goal) * 100 : 0,
      icon: Flame,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      progressColor: "bg-orange-500",
    },
    {
      label: "Protein",
      value: `${stats.protein.consumed}`,
      unit: "g",
      goal: stats.protein.goal,
      progress: stats.protein.goal > 0 ? (stats.protein.consumed / stats.protein.goal) * 100 : 0,
      icon: TrendingUp,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
      progressColor: "bg-violet-500",
    },
    {
      label: "Water",
      value: `${stats.water.consumed}`,
      unit: "L",
      goal: stats.water.goal,
      progress: stats.water.goal > 0 ? (stats.water.consumed / stats.water.goal) * 100 : 0,
      icon: Droplets,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      progressColor: "bg-blue-500",
    },
    {
      label: "Sleep",
      value: `${stats.sleep.hours}`,
      unit: "hrs",
      goal: stats.sleep.goal,
      progress: stats.sleep.goal > 0 ? (stats.sleep.hours / stats.sleep.goal) * 100 : 0,
      icon: Moon,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
      progressColor: "bg-indigo-500",
    },
    {
      label: "Workout",
      value: `${stats.workout.minutes}`,
      unit: "min",
      goal: stats.workout.goal,
      progress: stats.workout.goal > 0 ? (stats.workout.minutes / stats.workout.goal) * 100 : 0,
      icon: Dumbbell,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
      progressColor: "bg-violet-500",
    },
    {
      label: "Workouts",
      value: `${stats.streak.workout}`,
      unit: "this week",
      goal: stats.streak.goal,
      progress: stats.streak.goal > 0 ? (stats.streak.workout / stats.streak.goal) * 100 : 0,
      icon: Zap,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      progressColor: "bg-amber-500",
    },
  ];

  const userName = session?.user?.name?.split(" ")[0] || "Athlete";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {greeting}, <span className="gradient-text">{userName}</span> 👋
          </h1>
          <p className="text-sm text-muted-foreground">
            Here&apos;s your fitness summary for today
          </p>
        </div>
        <Badge variant="success" className="w-fit gap-1">
          <TrendingUp className="h-3 w-3" /> {loading ? "Loading..." : "Live Data"}
        </Badge>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={i}
          >
            <Card className="relative overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${card.bgColor}`}>
                    <card.icon className={`h-4 w-4 ${card.color}`} />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {Math.round(card.progress)}%
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold">
                    {card.value}
                    <span className="ml-1 text-sm font-normal text-muted-foreground">
                      {card.unit}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {card.label} • Goal: {card.goal}{card.unit === "this week" ? "" : card.unit}
                  </p>
                </div>
                <Progress
                  value={Math.min(card.progress, 100)}
                  className="mt-3 h-1.5"
                  indicatorClassName={card.progressColor}
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div className="lg:col-span-2" initial="hidden" animate="visible" variants={fadeUp} custom={6}>
          <WeeklyChart />
        </motion.div>
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={7}>
          <QuickActions />
        </motion.div>
      </div>

      {/* AI Insights */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={8}>
        <AiInsightCards />
      </motion.div>

      {/* Dashboard footer */}
      <div className="text-center pt-4 border-t">
        <p className="text-xs text-muted-foreground">
          Built with ❤️ | Author - <span className="font-medium">Fayazahmad_Siddik</span>
        </p>
      </div>
    </div>
  );
}
