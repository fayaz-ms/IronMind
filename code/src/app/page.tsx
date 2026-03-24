"use client";

import Link from "next/link";
import { useState } from "react";
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
  Heart,
  Trophy,
  Droplets,
  Target,
  Sparkles,
  ArrowRight,
  Check,
  ChevronDown,
  Quote,
  Flame,
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
  { icon: Dumbbell, title: "Smart Workout Tracking", desc: "Log exercises, sets, reps, and weight with our AI-powered exercise library. Auto-suggest progressive overload." },
  { icon: Salad, title: "Nutrition Intelligence", desc: "Track meals, calories, and macros. Get AI-generated meal plans tailored to your goals." },
  { icon: Moon, title: "Sleep Optimization", desc: "Monitor sleep patterns, quality scores, and get AI-driven tips to improve recovery." },
  { icon: TrendingUp, title: "Body Analytics", desc: "Track weight, body fat, muscle mass, and measurements with trend visualization." },
  { icon: Brain, title: "AI Personal Trainer", desc: "Get personalized workout plans, nutrition advice, and daily insights powered by GPT-4." },
  { icon: Users, title: "Social & Leaderboards", desc: "Share progress, follow friends, compete on streak boards, and join challenges." },
  { icon: Droplets, title: "Hydration Tracking", desc: "Log water intake, set daily goals, and get reminders to stay optimally hydrated." },
  { icon: Trophy, title: "Gamification & Badges", desc: "Earn achievements, maintain streaks, level up, and unlock exclusive badges." },
  { icon: Target, title: "Goal Engine", desc: "Set SMART fitness goals with AI-assisted milestones and adaptive progress tracking." },
];

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "2M+", label: "Workouts Logged" },
  { value: "98%", label: "Satisfaction" },
  { value: "4.9★", label: "App Rating" },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marathon Runner",
    content: "IronMind transformed my training. The AI coach suggested a periodization plan that helped me PR by 12 minutes. The sleep tracking alone is worth it.",
    rating: 5,
    avatar: "SC",
  },
  {
    name: "Marcus Johnson",
    role: "Powerlifter",
    content: "I've tried every fitness app out there. IronMind is the only one that actually adapts to my training style. The progressive overload suggestions are spot-on.",
    rating: 5,
    avatar: "MJ",
  },
  {
    name: "Emily Rodriguez",
    role: "CrossFit Athlete",
    content: "The nutrition tracking + AI meal suggestions helped me dial in my macros perfectly. Lost 15 lbs of fat while gaining strength. Game changer.",
    rating: 5,
    avatar: "ER",
  },
  {
    name: "David Park",
    role: "Personal Trainer",
    content: "I recommend IronMind to all my clients. The gamification keeps them engaged, and the AI insights give me data I can actually use in programming.",
    rating: 5,
    avatar: "DP",
  },
  {
    name: "Priya Sharma",
    role: "Yoga Instructor",
    content: "Even for non-traditional training, IronMind's flexibility is incredible. Sleep tracking and mindfulness insights have elevated my practice.",
    rating: 5,
    avatar: "PS",
  },
  {
    name: "Alex Thompson",
    role: "Bodybuilder",
    content: "The body composition analytics are next level. Being able to see my muscle mass vs body fat trends over months keeps me accountable and motivated.",
    rating: 5,
    avatar: "AT",
  },
];

const faqs = [
  {
    q: "What makes IronMind different from other fitness apps?",
    a: "IronMind uses advanced AI powered by GPT-4 to provide truly personalized coaching — not generic templates. It learns from your workout history, nutrition, sleep, and body data to deliver insights that evolve with you.",
  },
  {
    q: "Is IronMind free to use?",
    a: "Yes! IronMind offers a generous free tier with basic workout tracking, nutrition logging, sleep tracking, and limited AI insights. Upgrade to Pro or Elite for unlimited AI coaching and advanced analytics.",
  },
  {
    q: "How does the AI Coach work?",
    a: "Our AI Coach analyzes your complete fitness profile — workouts, nutrition, sleep, body composition — and uses GPT-4 to generate personalized recommendations. It adapts as you progress, ensuring your plans always match your current fitness level.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Absolutely. There are no long-term contracts or cancellation fees. You can upgrade, downgrade, or cancel your subscription at any time from your profile settings.",
  },
  {
    q: "Does IronMind work for beginners?",
    a: "Yes! IronMind is designed for all fitness levels. The AI Coach tailors recommendations based on your experience level, from complete beginners to seasoned athletes.",
  },
  {
    q: "Is my health data secure?",
    a: "Your data security is our top priority. All health data is encrypted at rest and in transit. We never sell or share your personal data with third parties.",
  },
];

const successStories = [
  {
    name: "Jake Morrison",
    before: "210 lbs",
    after: "175 lbs",
    duration: "6 months",
    story: "Lost 35 lbs using IronMind's AI nutrition plans and progressive workout programming.",
  },
  {
    name: "Lisa Wang",
    before: "Bench: 65 lbs",
    after: "Bench: 135 lbs",
    duration: "8 months",
    story: "Doubled her bench press with IronMind's progressive overload AI and recovery optimization.",
  },
  {
    name: "Ryan Cooper",
    before: "5K: 32 min",
    after: "5K: 22 min",
    duration: "4 months",
    story: "Shaved 10 minutes off his 5K time with AI-driven endurance programming and sleep optimization.",
  },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">
              Iron<span className="gradient-text">Mind</span>
            </span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Testimonials</Link>
            <Link href="#success-stories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Results</Link>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            <Link href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
            <Link href="/login"><Button variant="ghost" size="sm">Log in</Button></Link>
            <Link href="/signup"><Button variant="gradient" size="sm">Get Started Free</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
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
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
          >
            Train Smarter with{" "}
            <span className="gradient-text">AI-Powered</span> Fitness Coaching
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
          >
            IronMind is the all-in-one fitness platform that combines workout tracking, nutrition intelligence,
            sleep optimization, and AI coaching to help you achieve results faster than ever before.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            initial="hidden" animate="visible" variants={fadeUp} custom={3}
          >
            <Link href="/signup">
              <Button variant="gradient" size="xl" className="gap-2">
                Start Free Today <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="xl">See Features</Button>
            </Link>
          </motion.div>

          <motion.div
            className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-8 sm:grid-cols-4"
            initial="hidden" animate="visible" variants={fadeUp} custom={4}
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

      {/* Product Demo */}
      <section className="border-t py-24 overflow-hidden">
        <div className="container">
          <div className="text-center mb-16">
            <motion.h2 className="text-3xl font-bold sm:text-4xl" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              See IronMind <span className="gradient-text">In Action</span>
            </motion.h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              A glimpse of the intelligent dashboard that powers your fitness transformation.
            </p>
          </div>

          <motion.div className="relative mx-auto max-w-5xl" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="rounded-2xl border bg-card p-4 shadow-2xl shadow-violet-500/10">
              <div className="rounded-xl border bg-background p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold">Good Morning, Alex 👋</h3>
                    <p className="text-sm text-muted-foreground">Here&apos;s your fitness summary</p>
                  </div>
                  <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-500 font-medium">🔥 12 Day Streak</div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {[
                    { label: "Calories", value: "1,847", unit: "kcal", pct: 84, color: "bg-orange-500" },
                    { label: "Protein", value: "142", unit: "g", pct: 95, color: "bg-violet-500" },
                    { label: "Water", value: "2.1", unit: "L", pct: 84, color: "bg-blue-500" },
                    { label: "Sleep", value: "7.5", unit: "hrs", pct: 94, color: "bg-indigo-500" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl border bg-card/50 p-3">
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                      <p className="text-xl font-bold mt-1">{s.value}<span className="text-xs font-normal text-muted-foreground ml-1">{s.unit}</span></p>
                      <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                        <motion.div className={`h-full rounded-full ${s.color}`} initial={{ width: 0 }} whileInView={{ width: `${s.pct}%` }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 1 }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border bg-violet-500/5 border-violet-500/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-4 w-4 text-violet-500" />
                    <span className="text-sm font-medium">AI Coach Insight</span>
                    <Sparkles className="h-3 w-3 text-violet-400" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Great consistency this week! Consider adding 2.5kg to your bench press next session. Your protein is slightly below target — try a post-workout shake. 💪
                  </p>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -inset-8 rounded-3xl bg-violet-500/5 blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t py-24">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Everything You Need to <span className="gradient-text">Crush Your Goals</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              A complete fitness ecosystem — from intelligent tracking to AI coaching — built for beginners and serious athletes alike.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div key={f.title} className="group relative rounded-2xl border bg-card p-6 transition-colors hover:border-violet-500/40" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={i}>
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

      {/* AI Coach */}
      <section className="border-t py-24">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-400">
                <Brain className="h-3 w-3" /> GPT-4 Powered
              </span>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Meet Your <span className="gradient-text">AI Personal Trainer</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                IronMind&apos;s AI Coach analyzes your workout history, nutrition, sleep, and body progress to deliver hyper-personalized recommendations that evolve with you.
              </p>
              <ul className="mt-6 space-y-3">
                {["Personalized workout plan generation", "Smart calorie and macro targets", "Sleep optimization recommendations", "Recovery and hydration guidance", "Adaptive training periodization", "Daily AI-driven insights"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10">
                      <Check className="h-3 w-3 text-emerald-500" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="mt-8 inline-block">
                <Button variant="gradient" className="gap-2">Try AI Coach Free <ChevronRight className="h-4 w-4" /></Button>
              </Link>
            </div>

            <div className="relative">
              <div className="rounded-2xl border bg-card p-6 shadow-2xl shadow-violet-500/5">
                <div className="flex items-center gap-3 border-b pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">IronMind AI Coach</p>
                    <p className="text-xs text-muted-foreground">Just now</p>
                  </div>
                </div>
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <p>Great week! You&apos;ve been consistent — 4 sessions this week. 💪</p>
                  <p><strong className="text-foreground">Training:</strong> Increase bench press by 2.5 kg for optimal hypertrophy stimulus.</p>
                  <p><strong className="text-foreground">Nutrition:</strong> Protein is 15g below target. Add a post-workout whey shake.</p>
                  <p><strong className="text-foreground">Recovery:</strong> Sleep quality was 82/100. Try dimming lights 30 min before bed.</p>
                </div>
              </div>
              <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-violet-500/5 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="border-t py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">Loved by <span className="gradient-text">Athletes Worldwide</span></h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Join thousands of fitness enthusiasts who transformed their training with IronMind.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} className="rounded-2xl border bg-card p-6" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={i}>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="h-6 w-6 text-violet-500/30 mb-2" />
                <p className="text-sm text-muted-foreground mb-4">{t.content}</p>
                <div className="flex items-center gap-3 border-t pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/10 text-violet-500 text-sm font-bold">{t.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="success-stories" className="border-t py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">Real <span className="gradient-text">Transformation Stories</span></h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Real people, real results. See how IronMind is changing lives.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {successStories.map((s, i) => (
              <motion.div key={s.name} className="rounded-2xl border bg-card p-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <div className="flex items-center gap-2 mb-4">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <span className="text-sm font-semibold">{s.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="rounded-lg bg-destructive/10 p-3 text-center">
                    <p className="text-xs text-muted-foreground">Before</p>
                    <p className="font-bold text-sm">{s.before}</p>
                  </div>
                  <div className="rounded-lg bg-emerald-500/10 p-3 text-center">
                    <p className="text-xs text-muted-foreground">After</p>
                    <p className="font-bold text-sm text-emerald-500">{s.after}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{s.story}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3" /> {s.duration} with IronMind
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-t py-24">
        <div className="container text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Built for <span className="gradient-text">Trust & Performance</span></h2>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-4">
            {[
              { icon: Shield, title: "Bank-Grade Security", desc: "256-bit encryption for all health data" },
              { icon: BarChart3, title: "Real Analytics", desc: "Charts backed by your actual workout data" },
              { icon: Zap, title: "99.9% Uptime", desc: "Enterprise infrastructure on Vercel Edge" },
              { icon: Heart, title: "Privacy First", desc: "Your data is never sold or shared" },
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

      {/* About */}
      <section className="border-t py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-400">
              <Heart className="h-3 w-3" /> Our Story
            </span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">About <span className="gradient-text">IronMind</span></h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              IronMind was born from a simple belief: everyone deserves a personal trainer powered by the latest AI technology.
              We combine cutting-edge machine learning with proven sports science to deliver a fitness experience that rivals
              having a world-class coach by your side 24/7.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our platform tracks every dimension of your fitness — workouts, nutrition, sleep, hydration, and body composition —
              then uses AI to connect the dots and provide insights no human could generate at scale.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/5 px-6 py-3">
              <span className="text-sm text-muted-foreground">
                Built with ❤️ | Author - <span className="font-semibold text-foreground">Fayazahmad_Siddik</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">Frequently Asked <span className="gradient-text">Questions</span></h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Everything you need to know about IronMind.</p>
          </div>

          <div className="mx-auto max-w-2xl space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} className="rounded-xl border bg-card overflow-hidden" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <button className="flex w-full items-center justify-between p-5 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-medium text-sm">{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <motion.div className="px-5 pb-5" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.2 }}>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t">
        <div className="container py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold sm:text-5xl">Ready to Transform Your Fitness?</h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Join thousands of athletes using IronMind to train smarter, eat better, and recover faster.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/signup"><Button variant="gradient" size="xl" className="gap-2">Get Started — It&apos;s Free <ArrowRight className="h-4 w-4" /></Button></Link>
              <Link href="/pricing"><Button variant="outline" size="xl">View Pricing</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                  <Activity className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold">Iron<span className="gradient-text">Mind</span></span>
              </div>
              <p className="text-sm text-muted-foreground">The AI-powered fitness platform that helps you train smarter and achieve your goals faster.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="#faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} IronMind. All rights reserved.</p>
            <p className="text-sm text-muted-foreground">Built with ❤️ | Author - <span className="font-semibold text-foreground">Fayazahmad_Siddik</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
