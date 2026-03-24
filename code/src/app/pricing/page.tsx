"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    description: "Get started with basic fitness tracking",
    icon: Star,
    features: [
      "Basic workout logging",
      "Manual nutrition tracking",
      "Sleep logging",
      "Body progress tracking",
      "5 AI coach queries/day",
      "Community access",
    ],
    limitations: [
      "Limited exercise library",
      "No custom programs",
      "Basic analytics only",
    ],
    cta: "Get Started Free",
    variant: "outline" as const,
  },
  {
    name: "Pro",
    price: { monthly: 9, yearly: 90 },
    description: "Advanced tools for serious athletes",
    icon: Zap,
    popular: true,
    features: [
      "Everything in Free",
      "Full exercise library",
      "Custom workout programs",
      "Advanced analytics & charts",
      "50 AI coach queries/day",
      "Personalized meal plans",
      "Export data (CSV/PDF)",
      "Priority support",
    ],
    limitations: [],
    cta: "Start Pro Trial",
    variant: "default" as const,
  },
  {
    name: "Elite",
    price: { monthly: 19, yearly: 190 },
    description: "The ultimate fitness experience",
    icon: Crown,
    features: [
      "Everything in Pro",
      "Unlimited AI coaching",
      "1-on-1 AI workout plans",
      "Advanced body composition",
      "Exclusive challenges & rewards",
      "Video exercise guides",
      "Integration with wearables",
      "White-glove onboarding",
      "Early access to new features",
    ],
    limitations: [],
    cta: "Go Elite",
    variant: "gradient" as const,
  },
];

const faqs = [
  { q: "Can I switch plans anytime?", a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle." },
  { q: "Is there a free trial for Pro?", a: "Yes, Pro comes with a 14-day free trial. No credit card required to start." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards, debit cards, and PayPal through our secure Stripe payment platform." },
  { q: "Can I cancel anytime?", a: "Absolutely. There are no long-term contracts. Cancel anytime from your profile settings." },
];

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            Iron<span className="gradient-text">Mind</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          className="text-center space-y-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold md:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Choose the plan that fits your fitness journey. Upgrade anytime.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <span className={`text-sm ${!yearly ? "font-medium" : "text-muted-foreground"}`}>Monthly</span>
            <Switch checked={yearly} onCheckedChange={setYearly} />
            <span className={`text-sm ${yearly ? "font-medium" : "text-muted-foreground"}`}>
              Yearly <Badge variant="success" className="ml-1">Save 17%</Badge>
            </span>
          </div>
        </motion.div>

        {/* Plans */}
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto mb-20">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <Card className={`relative h-full flex flex-col ${plan.popular ? "border-primary shadow-lg shadow-primary/10" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="default" className="gradient-primary border-0 text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <plan.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>{plan.name}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                  <div className="pt-2">
                    <span className="text-4xl font-bold">
                      ${yearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      /{yearly ? "year" : "month"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-2.5 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                    {plan.limitations.map((l) => (
                      <li key={l} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="h-4 w-4 flex items-center justify-center mt-0.5 shrink-0">—</span>
                        {l}
                      </li>
                    ))}
                  </ul>
                  <Button variant={plan.variant} className="w-full mt-6" size="lg">
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Card
                key={i}
                className="cursor-pointer"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{faq.q}</p>
                    <span className="text-muted-foreground text-lg">{openFaq === i ? "−" : "+"}</span>
                  </div>
                  {openFaq === i && (
                    <motion.p
                      className="text-sm text-muted-foreground mt-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                    >
                      {faq.a}
                    </motion.p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Author credit */}
        <div className="text-center mt-16">
          <p className="text-sm text-muted-foreground">
            Built with ❤️ | Author - <span className="font-semibold">Fayazahmad_Siddik</span>
          </p>
        </div>
      </main>
    </div>
  );
}
