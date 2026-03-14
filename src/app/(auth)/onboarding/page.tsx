"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const steps = ["Basics", "Body", "Goals"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    fitnessGoal: "MAINTAIN",
    activityLevel: "MODERATE",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleFinish() {
    setLoading(true);
    try {
      await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      router.push("/dashboard");
    } catch {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div
        className="w-full max-w-lg rounded-2xl border bg-card p-8 shadow-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex items-center gap-2 mb-8">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">
            Iron<span className="gradient-text">Mind</span>
          </span>
        </div>

        {/* Progress */}
        <div className="mb-8 flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                  i <= step ? "gradient-primary text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              <span className={`text-sm ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
                {s}
              </span>
              {i < steps.length - 1 && <div className="mx-2 h-px w-8 bg-border" />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Tell us about yourself</h2>
                <p className="text-sm text-muted-foreground">This helps us personalize your experience.</p>
                <div className="space-y-2">
                  <Label>Age</Label>
                  <Input type="number" placeholder="25" value={form.age} onChange={(e) => update("age", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select value={form.gender} onValueChange={(v) => update("gender", v)}>
                    <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Body measurements</h2>
                <p className="text-sm text-muted-foreground">We&apos;ll use this to calculate your targets.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Height (cm)</Label>
                    <Input type="number" placeholder="175" value={form.height} onChange={(e) => update("height", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Weight (kg)</Label>
                    <Input type="number" placeholder="75" value={form.weight} onChange={(e) => update("weight", e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Your fitness goals</h2>
                <p className="text-sm text-muted-foreground">We&apos;ll customize your dashboard and AI coaching.</p>
                <div className="space-y-2">
                  <Label>Fitness Goal</Label>
                  <Select value={form.fitnessGoal} onValueChange={(v) => update("fitnessGoal", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOSE">Lose Weight</SelectItem>
                      <SelectItem value="MAINTAIN">Maintain</SelectItem>
                      <SelectItem value="GAIN">Build Muscle</SelectItem>
                      <SelectItem value="RECOMP">Body Recomposition</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Activity Level</Label>
                  <Select value={form.activityLevel} onValueChange={(v) => update("activityLevel", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SEDENTARY">Sedentary (office job)</SelectItem>
                      <SelectItem value="LIGHT">Lightly Active (1–3 days/week)</SelectItem>
                      <SelectItem value="MODERATE">Moderately Active (3–5 days/week)</SelectItem>
                      <SelectItem value="ACTIVE">Very Active (6–7 days/week)</SelectItem>
                      <SelectItem value="VERY_ACTIVE">Athlete (twice/day)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          <Button variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>
            <ChevronLeft className="mr-1 h-4 w-4" /> Back
          </Button>
          {step < steps.length - 1 ? (
            <Button variant="gradient" onClick={() => setStep(step + 1)}>
              Next <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button variant="gradient" onClick={handleFinish} disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Finish Setup
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
