"use client";

import { useState } from "react";
import { Plus, TrendingDown, TrendingUp, Minus } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";

const progressData = [
  { date: "Jan", weight: 82, bodyFat: 20, muscleMass: 35 },
  { date: "Feb", weight: 80.5, bodyFat: 19, muscleMass: 35.5 },
  { date: "Mar", weight: 79, bodyFat: 18.5, muscleMass: 36 },
  { date: "Apr", weight: 78, bodyFat: 17.5, muscleMass: 36.5 },
  { date: "May", weight: 77, bodyFat: 17, muscleMass: 37 },
  { date: "Jun", weight: 76.5, bodyFat: 16.5, muscleMass: 37.2 },
];

const recentMeasurements = [
  { id: "1", date: "2026-03-12", weight: 76.5, bodyFat: 16.5, muscleMass: 37.2, waist: 81 },
  { id: "2", date: "2026-02-15", weight: 77.0, bodyFat: 17.0, muscleMass: 37.0, waist: 82 },
  { id: "3", date: "2026-01-18", weight: 78.0, bodyFat: 17.5, muscleMass: 36.5, waist: 83 },
];

export default function ProgressPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ weight: "", bodyFat: "", muscleMass: "", waist: "" });

  const latest = recentMeasurements[0];
  const previous = recentMeasurements[1];
  const weightDiff = latest && previous ? latest.weight - previous.weight : 0;
  const fatDiff = latest && previous ? latest.bodyFat - previous.bodyFat : 0;
  const muscleDiff = latest && previous ? latest.muscleMass - previous.muscleMass : 0;

  function TrendIcon({ value }: { value: number }) {
    if (value < 0) return <TrendingDown className="h-4 w-4 text-emerald-500" />;
    if (value > 0) return <TrendingUp className="h-4 w-4 text-orange-500" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  }

  async function saveProgress() {
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setDialogOpen(false);
    setForm({ weight: "", bodyFat: "", muscleMass: "", waist: "" });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Body Progress</h1>
          <p className="text-sm text-muted-foreground">Track your body composition over time</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient" className="gap-2"><Plus className="h-4 w-4" /> New Measurement</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Log Measurements</DialogTitle></DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Weight (kg)</Label>
                <Input type="number" step="0.1" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Body Fat (%)</Label>
                <Input type="number" step="0.1" value={form.bodyFat} onChange={(e) => setForm({ ...form, bodyFat: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Muscle Mass (kg)</Label>
                <Input type="number" step="0.1" value={form.muscleMass} onChange={(e) => setForm({ ...form, muscleMass: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Waist (cm)</Label>
                <Input type="number" step="0.1" value={form.waist} onChange={(e) => setForm({ ...form, waist: e.target.value })} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="gradient" onClick={saveProgress}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Weight", value: `${latest?.weight} kg`, diff: weightDiff, unit: "kg" },
          { label: "Body Fat", value: `${latest?.bodyFat}%`, diff: fatDiff, unit: "%" },
          { label: "Muscle Mass", value: `${latest?.muscleMass} kg`, diff: muscleDiff, unit: "kg" },
          { label: "Waist", value: `${latest?.waist} cm`, diff: 0, unit: "cm" },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <TrendIcon value={item.diff} />
              </div>
              <p className="text-2xl font-bold mt-1">{item.value}</p>
              {item.diff !== 0 && (
                <p className={`text-xs mt-1 ${item.diff < 0 ? "text-emerald-500" : "text-orange-500"}`}>
                  {item.diff > 0 ? "+" : ""}{item.diff.toFixed(1)}{item.unit} vs last
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress chart */}
      <Card>
        <CardHeader><CardTitle>6-Month Progress</CardTitle></CardHeader>
        <CardContent>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.5rem", color: "hsl(var(--foreground))" }} />
                <Legend />
                <Line type="monotone" dataKey="weight" stroke="hsl(262, 83%, 58%)" strokeWidth={2} dot={{ r: 3 }} name="Weight (kg)" />
                <Line type="monotone" dataKey="bodyFat" stroke="hsl(12, 76%, 61%)" strokeWidth={2} dot={{ r: 3 }} name="Body Fat (%)" />
                <Line type="monotone" dataKey="muscleMass" stroke="hsl(142, 76%, 36%)" strokeWidth={2} dot={{ r: 3 }} name="Muscle Mass (kg)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent measurements table */}
      <Card>
        <CardHeader><CardTitle>Recent Measurements</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left font-medium text-muted-foreground">Date</th>
                  <th className="py-2 text-right font-medium text-muted-foreground">Weight</th>
                  <th className="py-2 text-right font-medium text-muted-foreground">Body Fat</th>
                  <th className="py-2 text-right font-medium text-muted-foreground">Muscle</th>
                  <th className="py-2 text-right font-medium text-muted-foreground">Waist</th>
                </tr>
              </thead>
              <tbody>
                {recentMeasurements.map((m) => (
                  <tr key={m.id} className="border-b last:border-0">
                    <td className="py-3">{m.date}</td>
                    <td className="py-3 text-right">{m.weight} kg</td>
                    <td className="py-3 text-right">{m.bodyFat}%</td>
                    <td className="py-3 text-right">{m.muscleMass} kg</td>
                    <td className="py-3 text-right">{m.waist} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
