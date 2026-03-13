"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Dumbbell, Clock, Flame, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const exerciseLibrary = [
  { id: "1", name: "Bench Press", muscleGroup: "CHEST", equipment: "Barbell" },
  { id: "2", name: "Squat", muscleGroup: "LEGS", equipment: "Barbell" },
  { id: "3", name: "Deadlift", muscleGroup: "BACK", equipment: "Barbell" },
  { id: "4", name: "Overhead Press", muscleGroup: "SHOULDERS", equipment: "Barbell" },
  { id: "5", name: "Barbell Row", muscleGroup: "BACK", equipment: "Barbell" },
  { id: "6", name: "Pull Up", muscleGroup: "BACK", equipment: "Bodyweight" },
  { id: "7", name: "Dumbbell Curl", muscleGroup: "BICEPS", equipment: "Dumbbell" },
  { id: "8", name: "Tricep Pushdown", muscleGroup: "TRICEPS", equipment: "Cable" },
  { id: "9", name: "Leg Press", muscleGroup: "LEGS", equipment: "Machine" },
  { id: "10", name: "Lat Pulldown", muscleGroup: "BACK", equipment: "Cable" },
  { id: "11", name: "Dumbbell Lateral Raise", muscleGroup: "SHOULDERS", equipment: "Dumbbell" },
  { id: "12", name: "Cable Fly", muscleGroup: "CHEST", equipment: "Cable" },
  { id: "13", name: "Plank", muscleGroup: "ABS", equipment: "Bodyweight" },
  { id: "14", name: "Running", muscleGroup: "CARDIO", equipment: "Treadmill" },
  { id: "15", name: "Hip Thrust", muscleGroup: "GLUTES", equipment: "Barbell" },
];

interface WorkoutSet {
  exerciseId: string;
  exerciseName: string;
  setNumber: number;
  reps: number;
  weight: number;
}

interface RecentWorkout {
  id: string;
  name: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  completedAt: string;
}

const recentWorkouts: RecentWorkout[] = [
  { id: "1", name: "Push Day", duration: 55, caloriesBurned: 380, sets: 16, completedAt: "2026-03-12" },
  { id: "2", name: "Pull Day", duration: 50, caloriesBurned: 350, sets: 15, completedAt: "2026-03-11" },
  { id: "3", name: "Leg Day", duration: 65, caloriesBurned: 450, sets: 18, completedAt: "2026-03-10" },
  { id: "4", name: "Upper Body", duration: 45, caloriesBurned: 320, sets: 14, completedAt: "2026-03-09" },
];

const programs = [
  { name: "PPL Beginner", difficulty: "BEGINNER", weeks: 4, days: 6 },
  { name: "Full Body 3x", difficulty: "BEGINNER", weeks: 8, days: 3 },
  { name: "Upper/Lower Split", difficulty: "INTERMEDIATE", weeks: 6, days: 4 },
  { name: "Push Pull Legs", difficulty: "INTERMEDIATE", weeks: 8, days: 6 },
  { name: "5/3/1 Strength", difficulty: "ADVANCED", weeks: 12, days: 4 },
  { name: "PHAT Hypertrophy", difficulty: "ADVANCED", weeks: 8, days: 5 },
];

export default function WorkoutsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [sets, setSets] = useState<WorkoutSet[]>([]);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [muscleFilter, setMuscleFilter] = useState("ALL");

  function addSet() {
    const exercise = exerciseLibrary.find((e) => e.id === selectedExercise);
    if (!exercise) return;
    const existingSets = sets.filter((s) => s.exerciseId === selectedExercise);
    setSets([
      ...sets,
      {
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        setNumber: existingSets.length + 1,
        reps: 0,
        weight: 0,
      },
    ]);
  }

  function updateSet(index: number, field: "reps" | "weight", value: number) {
    setSets(sets.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }

  function removeSet(index: number) {
    setSets(sets.filter((_, i) => i !== index));
  }

  async function saveWorkout() {
    await fetch("/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: workoutName, sets }),
    });
    setDialogOpen(false);
    setWorkoutName("");
    setSets([]);
  }

  const filteredExercises =
    muscleFilter === "ALL"
      ? exerciseLibrary
      : exerciseLibrary.filter((e) => e.muscleGroup === muscleFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Workout Tracker</h1>
          <p className="text-sm text-muted-foreground">Log exercises, track progress, follow programs</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient" className="gap-2">
              <Plus className="h-4 w-4" /> Log Workout
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Log Workout</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Workout Name</Label>
                <Input
                  placeholder="e.g. Push Day"
                  value={workoutName}
                  onChange={(e) => setWorkoutName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label>Muscle Group</Label>
                  <Select value={muscleFilter} onValueChange={setMuscleFilter}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All</SelectItem>
                      <SelectItem value="CHEST">Chest</SelectItem>
                      <SelectItem value="BACK">Back</SelectItem>
                      <SelectItem value="SHOULDERS">Shoulders</SelectItem>
                      <SelectItem value="LEGS">Legs</SelectItem>
                      <SelectItem value="BICEPS">Biceps</SelectItem>
                      <SelectItem value="TRICEPS">Triceps</SelectItem>
                      <SelectItem value="ABS">Abs</SelectItem>
                      <SelectItem value="GLUTES">Glutes</SelectItem>
                      <SelectItem value="CARDIO">Cardio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Exercise</Label>
                  <Select value={selectedExercise} onValueChange={setSelectedExercise}>
                    <SelectTrigger><SelectValue placeholder="Select exercise" /></SelectTrigger>
                    <SelectContent>
                      {filteredExercises.map((e) => (
                        <SelectItem key={e.id} value={e.id}>
                          {e.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button variant="outline" onClick={addSet} disabled={!selectedExercise} className="w-full gap-2">
                <Plus className="h-4 w-4" /> Add Set
              </Button>

              {sets.length > 0 && (
                <div className="space-y-2">
                  <div className="grid grid-cols-[1fr,80px,80px,40px] gap-2 text-xs font-medium text-muted-foreground px-1">
                    <span>Exercise</span>
                    <span>Reps</span>
                    <span>Weight (kg)</span>
                    <span />
                  </div>
                  {sets.map((set, i) => (
                    <div key={i} className="grid grid-cols-[1fr,80px,80px,40px] gap-2 items-center">
                      <span className="text-sm truncate">
                        {set.exerciseName} — Set {set.setNumber}
                      </span>
                      <Input
                        type="number"
                        min={0}
                        value={set.reps || ""}
                        onChange={(e) => updateSet(i, "reps", Number(e.target.value))}
                        className="h-8"
                      />
                      <Input
                        type="number"
                        min={0}
                        value={set.weight || ""}
                        onChange={(e) => updateSet(i, "weight", Number(e.target.value))}
                        className="h-8"
                      />
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeSet(i)}>
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="gradient" onClick={saveWorkout} disabled={!workoutName || sets.length === 0}>
                Save Workout
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Recent workouts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Workouts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentWorkouts.map((w) => (
            <motion.div
              key={w.id}
              className="flex items-center justify-between rounded-xl border p-4 transition-colors hover:bg-accent/50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
                  <Dumbbell className="h-5 w-5 text-violet-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{w.name}</p>
                  <p className="text-xs text-muted-foreground">{w.completedAt}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {w.duration}min
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Flame className="h-3.5 w-3.5" /> {w.caloriesBurned}kcal
                </div>
                <Badge variant="secondary">{w.sets} sets</Badge>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Workout Programs */}
      <Card>
        <CardHeader>
          <CardTitle>Workout Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <div key={p.name} className="rounded-xl border p-4 transition-colors hover:bg-accent/50">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">{p.name}</h3>
                  <Badge
                    variant={
                      p.difficulty === "BEGINNER"
                        ? "success"
                        : p.difficulty === "INTERMEDIATE"
                        ? "secondary"
                        : "default"
                    }
                  >
                    {p.difficulty.toLowerCase()}
                  </Badge>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {p.weeks} weeks • {p.days} days/week
                </p>
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  Start Program
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
