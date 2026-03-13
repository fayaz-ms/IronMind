import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

export interface DashboardStats {
  calories: { consumed: number; goal: number; burned: number };
  protein: { consumed: number; goal: number };
  water: { consumed: number; goal: number };
  steps: { count: number; goal: number };
  sleep: { hours: number; goal: number; score: number };
  workoutMinutes: { total: number; goal: number };
  streak: { workout: number; hydration: number };
}

export interface WeeklySummary {
  day: string;
  calories: number;
  protein: number;
  workoutMinutes: number;
  sleepHours: number;
  steps: number;
}

export interface ExerciseOption {
  id: string;
  name: string;
  muscleGroup: string;
  equipment?: string;
}

export interface WorkoutSetRow {
  exerciseId: string;
  exerciseName: string;
  setNumber: number;
  reps?: number;
  weight?: number;
  duration?: number;
}

export interface NutritionEntry {
  id: string;
  mealType: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  loggedAt: string;
}

export interface SleepEntry {
  id: string;
  sleepStart: string;
  sleepEnd: string;
  duration: number;
  quality?: number;
  notes?: string;
}

export interface BodyProgressEntry {
  id: string;
  weight?: number;
  bodyFat?: number;
  muscleMass?: number;
  waist?: number;
  measuredAt: string;
}

export interface AiInsightCard {
  id: string;
  type: string;
  title: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface SocialPostData {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  content: string;
  type: string;
  metadata?: Record<string, unknown>;
  likes: number;
  comments: number;
  isLiked: boolean;
  createdAt: string;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  image?: string;
  streak: number;
  rank: number;
}

export interface AchievementData {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  earnedAt?: string;
  progress?: number;
  threshold: number;
}
