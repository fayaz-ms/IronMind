"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Send, Loader2, Dumbbell, Salad, Moon, Droplets, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const suggestedPrompts = [
  "What workout should I do today?",
  "How can I improve my sleep quality?",
  "Create a weekly meal plan for muscle gain",
  "Suggest a warm-up routine for leg day",
  "How much water should I drink today?",
  "Am I on track with my fitness goals?",
];

const preloadedInsights = [
  {
    type: "WORKOUT",
    icon: Dumbbell,
    color: "text-violet-500 bg-violet-500/10",
    title: "Today's Workout",
    content: "Based on your training split, today is an upper body day. Focus on bench press and overhead press with 4 sets of 8–10 reps. You increased bench weight last session, so maintain the same weight today to consolidate strength.",
  },
  {
    type: "NUTRITION",
    icon: Salad,
    color: "text-emerald-500 bg-emerald-500/10",
    title: "Nutrition Insight",
    content: "Your protein average this week is 135 g — 15 g below target. Add a post-workout whey shake (25 g protein) and an extra egg at breakfast to close the gap. Keep carbs around 250 g since you're training today.",
  },
  {
    type: "SLEEP",
    icon: Moon,
    color: "text-indigo-500 bg-indigo-500/10",
    title: "Sleep Tip",
    content: "Your average bedtime shifted 35 minutes later this week. Inconsistent sleep timing disrupts circadian rhythm. Aim for lights-out by 23:00 tonight — set a phone reminder at 22:30 to start winding down.",
  },
  {
    type: "HYDRATION",
    icon: Droplets,
    color: "text-blue-500 bg-blue-500/10",
    title: "Hydration Goal",
    content: "With today's upper body workout, aim for 3.0 L of water. You've averaged 1.8 L this week — try a 500 mL glass 30 minutes before your workout and sip throughout the session.",
  },
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AiCoachPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(text?: string) {
    const prompt = text ?? input;
    if (!prompt.trim()) return;

    const userMsg: Message = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't process your request. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <Brain className="h-5 w-5 text-white" />
          </div>
          AI Coach
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Get personalized fitness guidance powered by intelligence
        </p>
      </div>

      {/* Insight cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {preloadedInsights.map((insight) => (
          <motion.div
            key={insight.type}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${insight.color}`}>
                    <insight.icon className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-sm">{insight.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{insight.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Chat interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-violet-500" />
            Ask Your AI Coach
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Suggested prompts */}
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="rounded-full border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Messages */}
          {messages.length > 0 && (
            <div className="max-h-[400px] space-y-4 overflow-y-auto rounded-lg border p-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === "user"
                        ? "gradient-primary text-white"
                        : "bg-muted"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-2.5 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Input */}
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <Input
              placeholder="Ask about workouts, nutrition, sleep, or recovery..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <Button type="submit" variant="gradient" disabled={loading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
