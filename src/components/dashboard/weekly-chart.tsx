"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const weeklyData = [
  { day: "Mon", calories: 2100, protein: 145, workoutMin: 60, sleepHrs: 7.5 },
  { day: "Tue", calories: 1950, protein: 160, workoutMin: 0, sleepHrs: 6.8 },
  { day: "Wed", calories: 2250, protein: 155, workoutMin: 45, sleepHrs: 8.0 },
  { day: "Thu", calories: 1800, protein: 140, workoutMin: 50, sleepHrs: 7.2 },
  { day: "Fri", calories: 2050, protein: 150, workoutMin: 60, sleepHrs: 7.0 },
  { day: "Sat", calories: 2400, protein: 130, workoutMin: 90, sleepHrs: 8.5 },
  { day: "Sun", calories: 1847, protein: 148, workoutMin: 45, sleepHrs: 7.2 },
];

const charts: Record<string, { key: string; color: string; label: string }> = {
  calories: { key: "calories", color: "hsl(12, 76%, 61%)", label: "Calories (kcal)" },
  protein: { key: "protein", color: "hsl(262, 83%, 58%)", label: "Protein (g)" },
  workout: { key: "workoutMin", color: "hsl(142, 76%, 36%)", label: "Workout (min)" },
  sleep: { key: "sleepHrs", color: "hsl(221, 83%, 53%)", label: "Sleep (hrs)" },
};

export function WeeklyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calories">
          <TabsList>
            <TabsTrigger value="calories">Calories</TabsTrigger>
            <TabsTrigger value="protein">Protein</TabsTrigger>
            <TabsTrigger value="workout">Workout</TabsTrigger>
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
          </TabsList>

          {Object.entries(charts).map(([tab, cfg]) => (
            <TabsContent key={tab} value={tab} className="mt-4">
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyData}>
                    <defs>
                      <linearGradient id={`grad-${tab}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={cfg.color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={cfg.color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="day" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.5rem",
                        color: "hsl(var(--foreground))",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey={cfg.key}
                      stroke={cfg.color}
                      strokeWidth={2}
                      fill={`url(#grad-${tab})`}
                      name={cfg.label}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
