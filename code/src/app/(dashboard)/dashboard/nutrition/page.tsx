"use client";

import { useState } from "react";
import { Plus, Salad } from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const dailyGoal = { calories: 2200, protein: 150, carbs: 250, fat: 65 };

const todayMeals = [
  { id: "1", mealType: "BREAKFAST", name: "Oatmeal with Banana", calories: 380, protein: 12, carbs: 65, fat: 8 },
  { id: "2", mealType: "BREAKFAST", name: "Greek Yogurt", calories: 150, protein: 15, carbs: 10, fat: 5 },
  { id: "3", mealType: "LUNCH", name: "Chicken Rice Bowl", calories: 620, protein: 45, carbs: 70, fat: 14 },
  { id: "4", mealType: "SNACK", name: "Protein Bar", calories: 210, protein: 20, carbs: 25, fat: 8 },
  { id: "5", mealType: "DINNER", name: "Salmon with Vegetables", calories: 487, protein: 40, carbs: 20, fat: 25 },
];

const weeklyCalories = [
  { day: "Mon", calories: 2100 }, { day: "Tue", calories: 1950 }, { day: "Wed", calories: 2250 },
  { day: "Thu", calories: 1800 }, { day: "Fri", calories: 2050 }, { day: "Sat", calories: 2400 },
  { day: "Sun", calories: 1847 },
];

export default function NutritionPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    mealType: "BREAKFAST",
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });

  const totals = todayMeals.reduce(
    (acc, m) => ({
      calories: acc.calories + m.calories,
      protein: acc.protein + m.protein,
      carbs: acc.carbs + m.carbs,
      fat: acc.fat + m.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const macroData = [
    { name: "Protein", value: totals.protein, color: "hsl(262, 83%, 58%)" },
    { name: "Carbs", value: totals.carbs, color: "hsl(47, 96%, 53%)" },
    { name: "Fat", value: totals.fat, color: "hsl(173, 80%, 40%)" },
  ];

  async function saveMeal() {
    await fetch("/api/nutrition", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setDialogOpen(false);
    setForm({ mealType: "BREAKFAST", name: "", calories: "", protein: "", carbs: "", fat: "" });
  }

  const mealGroups = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Nutrition Tracker</h1>
          <p className="text-sm text-muted-foreground">Log meals and track your macros</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient" className="gap-2">
              <Plus className="h-4 w-4" /> Log Meal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log Meal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Meal Type</Label>
                <Select value={form.mealType} onValueChange={(v) => setForm({ ...form, mealType: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BREAKFAST">Breakfast</SelectItem>
                    <SelectItem value="LUNCH">Lunch</SelectItem>
                    <SelectItem value="DINNER">Dinner</SelectItem>
                    <SelectItem value="SNACK">Snack</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Food Name</Label>
                <Input placeholder="e.g. Chicken Breast" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Calories</Label>
                  <Input type="number" placeholder="0" value={form.calories} onChange={(e) => setForm({ ...form, calories: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Protein (g)</Label>
                  <Input type="number" placeholder="0" value={form.protein} onChange={(e) => setForm({ ...form, protein: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Carbs (g)</Label>
                  <Input type="number" placeholder="0" value={form.carbs} onChange={(e) => setForm({ ...form, carbs: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Fat (g)</Label>
                  <Input type="number" placeholder="0" value={form.fat} onChange={(e) => setForm({ ...form, fat: e.target.value })} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="gradient" onClick={saveMeal} disabled={!form.name || !form.calories}>Save Meal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Calories", value: totals.calories, goal: dailyGoal.calories, unit: "kcal", color: "bg-orange-500" },
          { label: "Protein", value: totals.protein, goal: dailyGoal.protein, unit: "g", color: "bg-violet-500" },
          { label: "Carbs", value: totals.carbs, goal: dailyGoal.carbs, unit: "g", color: "bg-yellow-500" },
          { label: "Fat", value: totals.fat, goal: dailyGoal.fat, unit: "g", color: "bg-teal-500" },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="text-2xl font-bold mt-1">
                {item.value} <span className="text-sm font-normal text-muted-foreground">/ {item.goal}{item.unit}</span>
              </p>
              <Progress value={Math.min((item.value / item.goal) * 100, 100)} className="mt-2 h-1.5" indicatorClassName={item.color} />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Macro pie chart */}
        <Card>
          <CardHeader><CardTitle>Macro Split</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={macroData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" stroke="none">
                    {macroData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.5rem", color: "hsl(var(--foreground))" }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Weekly calories */}
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Weekly Calories</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyCalories}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.5rem", color: "hsl(var(--foreground))" }} />
                  <Bar dataKey="calories" fill="hsl(262, 83%, 58%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meals by type */}
      <Card>
        <CardHeader><CardTitle>Today&apos;s Meals</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          {mealGroups.map((type) => {
            const meals = todayMeals.filter((m) => m.mealType === type);
            if (meals.length === 0) return null;
            return (
              <div key={type}>
                <h3 className="text-sm font-semibold mb-2 capitalize">{type.toLowerCase()}</h3>
                <div className="space-y-2">
                  {meals.map((m) => (
                    <div key={m.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                          <Salad className="h-4 w-4 text-emerald-500" />
                        </div>
                        <span className="text-sm font-medium">{m.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{m.calories} kcal</span>
                        <span>P: {m.protein}g</span>
                        <span>C: {m.carbs}g</span>
                        <span>F: {m.fat}g</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
