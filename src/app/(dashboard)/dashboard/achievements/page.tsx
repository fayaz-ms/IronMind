"use client";

import { motion } from "framer-motion";
import { Trophy, Target, Zap, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const achievements = [
  { name: "First Workout", desc: "Complete your first workout", icon: "💪", earned: true, progress: 1, threshold: 1, category: "Workout" },
  { name: "7-Day Streak", desc: "Work out 7 days in a row", icon: "🔥", earned: true, progress: 7, threshold: 7, category: "Streak" },
  { name: "30-Day Streak", desc: "Work out 30 days in a row", icon: "⚡", earned: false, progress: 12, threshold: 30, category: "Streak" },
  { name: "Centurion", desc: "Complete 100 workouts", icon: "🏋️", earned: false, progress: 47, threshold: 100, category: "Workout" },
  { name: "Hydration Hero", desc: "Hit water goal for 14 days straight", icon: "💧", earned: false, progress: 5, threshold: 14, category: "Hydration" },
  { name: "Early Bird", desc: "Log sleep before midnight for 7 days", icon: "🌅", earned: true, progress: 7, threshold: 7, category: "Sleep" },
  { name: "Macro Master", desc: "Hit all macro targets for 7 days", icon: "🥗", earned: false, progress: 3, threshold: 7, category: "Nutrition" },
  { name: "Night Owl", desc: "Log 8+ hours sleep for 14 days", icon: "🦉", earned: false, progress: 8, threshold: 14, category: "Sleep" },
  { name: "Iron Will", desc: "Complete 5 workouts in a week", icon: "🏆", earned: true, progress: 5, threshold: 5, category: "Workout" },
  { name: "Transformation", desc: "Track body progress for 3 months", icon: "🦋", earned: false, progress: 2, threshold: 3, category: "Progress" },
];

const weeklyChallenge = {
  name: "Endurance Week",
  description: "Complete 5 workouts of at least 45 minutes each",
  progress: 3,
  total: 5,
  daysLeft: 3,
  reward: "50 XP + Endurance Badge",
};

export default function AchievementsPage() {
  const earned = achievements.filter((a) => a.earned);
  const inProgress = achievements.filter((a) => !a.earned);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" /> Achievements
        </h1>
        <p className="text-sm text-muted-foreground">Track your milestones and earn badges</p>
      </div>

      {/* Weekly challenge */}
      <Card className="border-violet-500/30 bg-gradient-to-r from-violet-500/5 to-indigo-500/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-5 w-5 text-violet-500" /> Weekly Challenge
            </CardTitle>
            <Badge variant="secondary">{weeklyChallenge.daysLeft} days left</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="font-semibold">{weeklyChallenge.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{weeklyChallenge.description}</p>
          <div className="mt-3 flex items-center gap-2">
            <Progress value={(weeklyChallenge.progress / weeklyChallenge.total) * 100} className="h-2 flex-1" />
            <span className="text-sm font-medium">{weeklyChallenge.progress}/{weeklyChallenge.total}</span>
          </div>
          <p className="mt-2 text-xs text-violet-400">Reward: {weeklyChallenge.reward}</p>
        </CardContent>
      </Card>

      {/* Earned badges */}
      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Award className="h-5 w-5 text-emerald-500" /> Earned ({earned.length})
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {earned.map((a) => (
            <motion.div key={a.name} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className="border-emerald-500/20">
                <CardContent className="p-4 flex items-center gap-3">
                  <span className="text-3xl">{a.icon}</span>
                  <div>
                    <p className="font-semibold text-sm">{a.name}</p>
                    <p className="text-xs text-muted-foreground">{a.desc}</p>
                    <Badge variant="success" className="mt-1">Earned</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* In progress */}
      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Target className="h-5 w-5 text-orange-500" /> In Progress ({inProgress.length})
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {inProgress.map((a) => (
            <motion.div key={a.name} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl opacity-50">{a.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{a.name}</p>
                      <p className="text-xs text-muted-foreground">{a.desc}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Progress value={(a.progress / a.threshold) * 100} className="h-1.5 flex-1" />
                    <span className="text-xs text-muted-foreground">{a.progress}/{a.threshold}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
