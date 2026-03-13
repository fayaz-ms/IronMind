"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  Brain,
  Dumbbell,
  Moon,
  Salad,
  TrendingUp,
  Users,
  Zap,
  ChevronRight,
  Star,
  Shield,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const features = [
  { icon: Dumbbell, title: "Workout Tracking", desc: "Log exercises, sets, reps and weight with our built-in exercise library." },
  { icon: Salad, title: "Nutrition Logging", desc: "Track meals, calories, and macros to hit your daily targets." },
  { icon: Moon, title: "Sleep Tracking", desc: "Monitor sleep patterns and get a weekly sleep score." },
  { icon: TrendingUp, title: "Body Progress", desc: "Track weight, body fat, and muscle mass over time." },
  { icon: Brain, title: "AI Coach", desc: "Get personalized workout suggestions and nutrition tips powered by AI." },
  { icon: Users, title: "Social & Leaderboards", desc: "Share progress, follow friends, and compete on streak boards." },
];

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "2M+", label: "Workouts Logged" },
  { value: "98%", label: "Satisfaction" },
  { value: "4.9★", label: "App Rating" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Navbar ───────────────────────────────────────────── */}
      <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">
              FitTrack <span className="gradient-text">AI</span>
            </span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button variant="gradient" size="sm">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute top-60 right-0 h-[400px] w-[400px] rounded-full bg-indigo-500/15 blur-[100px]" />

        <div className="container relative text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-400">
              <Zap className="h-3.5 w-3.5" /> AI-Powered Fitness Platform
            </span>
          </motion.div>

          <motion.h1
            className="mx-auto mt-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
          >
            Your Fitness Journey,{" "}
            <span className="gradient-text">Supercharged by AI</span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
          >
            Track workouts, nutrition, sleep, and body progress in one place. Get intelligent
            coaching that adapts to your goals and performance.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
          >
            <Link href="/signup">
              <Button variant="gradient" size="xl" className="gap-2">
                Start Free Today <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="xl">
                See Features
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-8 sm:grid-cols-4"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={4}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold gradient-text">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section id="features" className="border-t py-24">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Everything You Need to{" "}
              <span className="gradient-text">Crush Your Goals</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              A complete fitness ecosystem — from tracking to intelligent coaching — built for
              beginners and serious athletes alike.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="group relative rounded-2xl border bg-card p-6 transition-colors hover:border-violet-500/40"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500 transition-colors group-hover:bg-violet-500/20">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Section ───────────────────────────────────────── */}
      <section className="border-t py-24">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-400">
                <Brain className="h-3 w-3" /> AI-Powered
              </span>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Meet Your <span className="gradient-text">AI Fitness Coach</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Our AI analyzes your workout history, nutrition, sleep, and body progress to
                deliver personalized recommendations that evolve with you.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Personalized workout suggestions",
                  "Smart calorie and macro targets",
                  "Sleep optimization tips",
                  "Recovery and hydration guidance",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10">
                      <Star className="h-3 w-3 text-emerald-500" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="mt-8 inline-block">
                <Button variant="gradient" className="gap-2">
                  Try AI Coach <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Mock AI card */}
            <div className="relative">
              <div className="rounded-2xl border bg-card p-6 shadow-2xl shadow-violet-500/5">
                <div className="flex items-center gap-3 border-b pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">AI Coach</p>
                    <p className="text-xs text-muted-foreground">Just now</p>
                  </div>
                </div>
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <p>
                    Great week! You&apos;ve been consistent with your workouts — 4 sessions
                    this week. 💪
                  </p>
                  <p>
                    <strong className="text-foreground">Suggestion:</strong> Try adding a
                    progressive overload to your bench press. Increase weight by 2.5 kg next
                    session.
                  </p>
                  <p>
                    Your protein intake is 15 g below target. Consider adding a post-workout
                    shake.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-violet-500/5 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust ─────────────────────────────────────────────── */}
      <section className="border-t py-24">
        <div className="container text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Trusted by <span className="gradient-text">Fitness Enthusiasts</span>
          </h2>
          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
            {[
              { icon: Shield, title: "Secure Data", desc: "Your health data is encrypted and never shared." },
              { icon: BarChart3, title: "Real Analytics", desc: "Charts and insights backed by your actual data." },
              { icon: Zap, title: "Fast & Reliable", desc: "Lightning-fast performance, 99.9% uptime." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border bg-card p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">
                  <item.icon className="h-6 w-6 text-violet-500" />
                </div>
                <h3 className="mt-3 font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="border-t">
        <div className="container py-24 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to Transform Your Fitness?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Join thousands of athletes using FitTrack AI to train smarter, eat better, and
            recover faster.
          </p>
          <Link href="/signup" className="mt-8 inline-block">
            <Button variant="gradient" size="xl" className="gap-2">
              Get Started — It&apos;s Free <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t py-12">
        <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md gradient-primary">
              <Activity className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">FitTrack AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} FitTrack AI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/pricing" className="hover:text-foreground">Pricing</Link>
            <Link href="#" className="hover:text-foreground">Privacy</Link>
            <Link href="#" className="hover:text-foreground">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
