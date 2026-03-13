"use client";

import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const monthlyWorkouts = [
  { month: "Oct", count: 16, duration: 820 },
  { month: "Nov", count: 18, duration: 950 },
  { month: "Dec", count: 14, duration: 720 },
  { month: "Jan", count: 20, duration: 1050 },
  { month: "Feb", count: 22, duration: 1180 },
  { month: "Mar", count: 12, duration: 600 },
];

const muscleDistribution = [
  { name: "Chest", value: 18, color: "#8b5cf6" },
  { name: "Back", value: 22, color: "#06b6d4" },
  { name: "Legs", value: 25, color: "#10b981" },
  { name: "Shoulders", value: 12, color: "#f59e0b" },
  { name: "Arms", value: 15, color: "#ef4444" },
  { name: "Cardio", value: 8, color: "#3b82f6" },
];

const weeklyNutrition = [
  { week: "W1", avgCalories: 2050, avgProtein: 142 },
  { week: "W2", avgCalories: 2180, avgProtein: 148 },
  { week: "W3", avgCalories: 2100, avgProtein: 155 },
  { week: "W4", avgCalories: 2220, avgProtein: 150 },
];

const sleepTrend = [
  { week: "W1", avgHours: 7.0, avgQuality: 6.5 },
  { week: "W2", avgHours: 7.3, avgQuality: 7.0 },
  { week: "W3", avgHours: 7.1, avgQuality: 7.2 },
  { week: "W4", avgHours: 7.5, avgQuality: 7.8 },
];

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "0.5rem",
  color: "hsl(var(--foreground))",
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-sm text-muted-foreground">Deep dive into your fitness data</p>
      </div>

      <Tabs defaultValue="workouts">
        <TabsList>
          <TabsTrigger value="workouts">Workouts</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
        </TabsList>

        <TabsContent value="workouts" className="space-y-6 mt-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Monthly Workout Volume</CardTitle></CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyWorkouts}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                      <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend />
                      <Bar dataKey="count" fill="hsl(262, 83%, 58%)" radius={[4, 4, 0, 0]} name="Sessions" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Muscle Group Distribution</CardTitle></CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={muscleDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" stroke="none">
                        {muscleDistribution.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle>Total Duration (minutes/month)</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyWorkouts}>
                    <defs>
                      <linearGradient id="durationGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Area type="monotone" dataKey="duration" stroke="hsl(262, 83%, 58%)" strokeWidth={2} fill="url(#durationGrad)" name="Minutes" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nutrition" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Weekly Nutrition Averages</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyNutrition}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="week" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Line type="monotone" dataKey="avgCalories" stroke="hsl(12, 76%, 61%)" strokeWidth={2} name="Avg Calories" />
                    <Line type="monotone" dataKey="avgProtein" stroke="hsl(262, 83%, 58%)" strokeWidth={2} name="Avg Protein (g)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sleep" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Sleep Trends</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sleepTrend}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="week" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Line type="monotone" dataKey="avgHours" stroke="hsl(221, 83%, 53%)" strokeWidth={2} name="Avg Hours" />
                    <Line type="monotone" dataKey="avgQuality" stroke="hsl(142, 76%, 36%)" strokeWidth={2} name="Avg Quality" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
