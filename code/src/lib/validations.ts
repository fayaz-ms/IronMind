import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const profileSchema = z.object({
  age: z.coerce.number().min(13).max(120).optional(),
  height: z.coerce.number().min(50).max(300).optional(),
  weight: z.coerce.number().min(20).max(500).optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  fitnessGoal: z.enum(["LOSE", "MAINTAIN", "GAIN", "RECOMP"]),
  activityLevel: z.enum(["SEDENTARY", "LIGHT", "MODERATE", "ACTIVE", "VERY_ACTIVE"]),
});

export const workoutSchema = z.object({
  name: z.string().min(1, "Workout name is required"),
  duration: z.coerce.number().min(1).optional(),
  caloriesBurned: z.coerce.number().min(0).optional(),
  notes: z.string().optional(),
  sets: z.array(
    z.object({
      exerciseId: z.string().min(1),
      setNumber: z.coerce.number().min(1),
      reps: z.coerce.number().min(0).optional(),
      weight: z.coerce.number().min(0).optional(),
      duration: z.coerce.number().min(0).optional(),
    })
  ),
});

export const nutritionSchema = z.object({
  mealType: z.enum(["BREAKFAST", "LUNCH", "DINNER", "SNACK"]),
  name: z.string().min(1, "Food name is required"),
  calories: z.coerce.number().min(0),
  protein: z.coerce.number().min(0).default(0),
  carbs: z.coerce.number().min(0).default(0),
  fat: z.coerce.number().min(0).default(0),
});

export const sleepSchema = z.object({
  sleepStart: z.string().min(1, "Sleep start time is required"),
  sleepEnd: z.string().min(1, "Wake time is required"),
  quality: z.coerce.number().min(1).max(10).optional(),
  notes: z.string().optional(),
});

export const bodyProgressSchema = z.object({
  weight: z.coerce.number().min(0).optional(),
  bodyFat: z.coerce.number().min(0).max(100).optional(),
  muscleMass: z.coerce.number().min(0).optional(),
  waist: z.coerce.number().min(0).optional(),
  chest: z.coerce.number().min(0).optional(),
  arms: z.coerce.number().min(0).optional(),
  notes: z.string().optional(),
});

export const waterLogSchema = z.object({
  amount: z.coerce.number().min(0.05).max(5),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type WorkoutInput = z.infer<typeof workoutSchema>;
export type NutritionInput = z.infer<typeof nutritionSchema>;
export type SleepInput = z.infer<typeof sleepSchema>;
export type BodyProgressInput = z.infer<typeof bodyProgressSchema>;
export type WaterLogInput = z.infer<typeof waterLogSchema>;
