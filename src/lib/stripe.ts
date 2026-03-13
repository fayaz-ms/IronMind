import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
});

export const PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    stripePriceId: null,
    features: [
      "Basic workout tracking",
      "Log up to 3 meals/day",
      "Sleep tracking",
      "Limited AI insights (3/week)",
      "Basic progress charts",
    ],
    limits: {
      aiInsightsPerWeek: 3,
      workoutsPerWeek: 5,
      customExercises: 5,
    },
  },
  PRO: {
    name: "Pro",
    price: 9,
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID,
    features: [
      "Unlimited workout tracking",
      "Unlimited meal logging",
      "AI Coach — unlimited insights",
      "Advanced analytics & charts",
      "Workout programs",
      "Export data",
      "Priority support",
    ],
    limits: {
      aiInsightsPerWeek: Infinity,
      workoutsPerWeek: Infinity,
      customExercises: 50,
    },
  },
  ELITE: {
    name: "Elite",
    price: 19,
    stripePriceId: process.env.STRIPE_ELITE_PRICE_ID,
    features: [
      "Everything in Pro",
      "Personalized AI workout plans",
      "AI nutrition coach",
      "Premium analytics dashboard",
      "Body composition analysis",
      "1-on-1 onboarding call",
      "Early access to new features",
    ],
    limits: {
      aiInsightsPerWeek: Infinity,
      workoutsPerWeek: Infinity,
      customExercises: Infinity,
    },
  },
} as const;
