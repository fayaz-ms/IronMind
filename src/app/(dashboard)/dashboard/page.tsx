"use client";

import { motion } from "framer-motion";
import {
  Flame,
  Droplets,
  Footprints,
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

// Mock data — replace with real API calls
const stats = {
  calories: { consumed: 1847, goal: 2200, burned: 420 },
  water: { consumed: 1.8, goal: 2.5 },
  steps: { count: 7832, goal: 10000 },
  sleep: { hours: 7.2, goal: 8, score: 82 },
  workout: { minutes: 45, goal: 60 },
  streak: { workout: 12, hydration: 5 },
};

const cards = [
  {
    label: "Calories",
    value: `${stats.calories.consumed}`,
    unit: "kcal",
    goal: stats.calories.goal,
    progress: (stats.calories.consumed / stats.calories.goal) * 100,
    icon: Flame,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    progressColor: "bg-orange-500",
  },
  {
    label: "Water",
    value: `${stats.water.consumed}`,
    unit: "L",
    goal: stats.water.goal,
    progress: (stats.water.consumed / stats.water.goal) * 100,
    icon: Droplets,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    progressColor: "bg-blue-500",
  },
  {
    label: "Steps",
    value: stats.steps.count.toLocaleString(),
    unit: "",
    goal: stats.steps.goal,
    progress: (stats.steps.count / stats.steps.goal) * 100,
    icon: Footprints,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    progressColor: "bg-emerald-500",
  },
  {
    label: "Sleep",
    value: `${stats.sleep.hours}`,
    unit: "hrs",
    goal: stats.sleep.goal,
    progress: (stats.sleep.hours / stats.sleep.goal) * 100,
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
    progress: (stats.workout.minutes / stats.workout.goal) * 100,
    icon: Dumbbell,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    progressColor: "bg-violet-500",
  },
  {
    label: "Streak",
    value: `${stats.streak.workout}`,
    unit: "days",
    goal: 30,
    progress: (stats.streak.workout / 30) * 100,
    icon: Zap,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    progressColor: "bg-amber-500",
  },
];

export default function DashboardPage() {
  const greeting = getGreeting();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {greeting} <span className="gradient-text">Alex</span> 👋
          </h1>
          <p className="text-sm text-muted-foreground">
            Here&apos;s your fitness summary for today
          </p>
        </div>
        <Badge variant="success" className="w-fit gap-1">
          <TrendingUp className="h-3 w-3" /> On Track
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
                    {card.label} • Goal: {card.goal}
                    {card.unit}
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
        {/* Weekly chart */}
        <motion.div
          className="lg:col-span-2"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={6}
        >
          <WeeklyChart />
        </motion.div>

        {/* Quick actions */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={7}>
          <QuickActions />
        </motion.div>
      </div>

      {/* AI Insights */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={8}>
        <AiInsightCards />
      </motion.div>
    </div>
  );
}
