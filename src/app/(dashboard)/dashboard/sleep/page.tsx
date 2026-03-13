"use client";

import { useState } from "react";
import { Plus, Moon, Clock, Star } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";

const sleepGoal = 8;

const weeklyData = [
  { day: "Mon", hours: 7.5, quality: 8 },
  { day: "Tue", hours: 6.8, quality: 6 },
  { day: "Wed", hours: 8.0, quality: 9 },
  { day: "Thu", hours: 7.2, quality: 7 },
  { day: "Fri", hours: 7.0, quality: 7 },
  { day: "Sat", hours: 8.5, quality: 9 },
  { day: "Sun", hours: 7.2, quality: 7 },
];

const recentLogs = [
  { id: "1", date: "2026-03-12", start: "23:15", end: "06:30", hours: 7.25, quality: 7 },
  { id: "2", date: "2026-03-11", start: "23:45", end: "07:15", hours: 7.5, quality: 8 },
  { id: "3", date: "2026-03-10", start: "22:30", end: "06:30", hours: 8.0, quality: 9 },
  { id: "4", date: "2026-03-09", start: "00:00", end: "06:50", hours: 6.83, quality: 6 },
  { id: "5", date: "2026-03-08", start: "23:00", end: "07:00", hours: 8.0, quality: 8 },
];

function sleepScore(hours: number, quality: number) {
  return Math.round((hours / sleepGoal) * 50 + (quality / 10) * 50);
}

export default function SleepPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ sleepStart: "", sleepEnd: "", quality: "" });

  const avgHours = weeklyData.reduce((a, d) => a + d.hours, 0) / weeklyData.length;
  const avgQuality = weeklyData.reduce((a, d) => a + d.quality, 0) / weeklyData.length;
  const score = sleepScore(avgHours, avgQuality);

  async function saveSleep() {
    await fetch("/api/sleep", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setDialogOpen(false);
    setForm({ sleepStart: "", sleepEnd: "", quality: "" });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Sleep Tracker</h1>
          <p className="text-sm text-muted-foreground">Monitor your sleep patterns and quality</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient" className="gap-2">
              <Plus className="h-4 w-4" /> Log Sleep
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Log Sleep</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Bedtime</Label>
                  <Input type="time" value={form.sleepStart} onChange={(e) => setForm({ ...form, sleepStart: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Wake Time</Label>
                  <Input type="time" value={form.sleepEnd} onChange={(e) => setForm({ ...form, sleepEnd: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Quality (1–10)</Label>
                <Input type="number" min={1} max={10} placeholder="7" value={form.quality} onChange={(e) => setForm({ ...form, quality: e.target.value })} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="gradient" onClick={saveSleep} disabled={!form.sleepStart || !form.sleepEnd}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/10">
              <Moon className="h-8 w-8 text-indigo-500" />
            </div>
            <p className="mt-3 text-3xl font-bold">{avgHours.toFixed(1)}<span className="text-sm font-normal text-muted-foreground"> hrs</span></p>
            <p className="text-sm text-muted-foreground">Avg Sleep Duration</p>
            <Progress value={(avgHours / sleepGoal) * 100} className="mt-3 h-1.5" indicatorClassName="bg-indigo-500" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/10">
              <Star className="h-8 w-8 text-violet-500" />
            </div>
            <p className="mt-3 text-3xl font-bold">{score}<span className="text-sm font-normal text-muted-foreground"> / 100</span></p>
            <p className="text-sm text-muted-foreground">Sleep Score</p>
            <Progress value={score} className="mt-3 h-1.5" indicatorClassName="bg-violet-500" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
              <Clock className="h-8 w-8 text-emerald-500" />
            </div>
            <p className="mt-3 text-3xl font-bold">{avgQuality.toFixed(1)}<span className="text-sm font-normal text-muted-foreground"> / 10</span></p>
            <p className="text-sm text-muted-foreground">Avg Quality</p>
            <Progress value={avgQuality * 10} className="mt-3 h-1.5" indicatorClassName="bg-emerald-500" />
          </CardContent>
        </Card>
      </div>

      {/* Weekly sleep chart */}
      <Card>
        <CardHeader><CardTitle>Weekly Sleep</CardTitle></CardHeader>
        <CardContent>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="sleepGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.5rem", color: "hsl(var(--foreground))" }} />
                <Area type="monotone" dataKey="hours" stroke="hsl(221, 83%, 53%)" strokeWidth={2} fill="url(#sleepGrad)" name="Sleep (hrs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent logs */}
      <Card>
        <CardHeader><CardTitle>Recent Sleep Logs</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {recentLogs.map((log) => (
            <div key={log.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10">
                  <Moon className="h-4 w-4 text-indigo-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">{log.date}</p>
                  <p className="text-xs text-muted-foreground">{log.start} — {log.end}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span>{log.hours.toFixed(1)} hrs</span>
                <Badge variant={log.quality >= 8 ? "success" : "secondary"}>
                  Quality: {log.quality}/10
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
