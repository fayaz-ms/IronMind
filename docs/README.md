# 🧠 IronMind — AI-Powered Fitness Platform

[![Author](https://img.shields.io/badge/Author-Fayazahmad__Siddik-violet?style=for-the-badge)](https://github.com/fayaz-ms)
[![Live](https://img.shields.io/badge/Live-ironmind--ten.vercel.app-brightgreen?style=for-the-badge)](https://ironmind-ten.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?style=for-the-badge&logo=openai)](https://openai.com)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635bff?style=for-the-badge&logo=stripe)](https://stripe.com)

> **Built with ❤️ | Author - Fayazahmad_Siddik**

IronMind is a **startup-grade AI fitness SaaS platform** that combines intelligent workout tracking, nutrition management, sleep optimization, and AI-powered coaching into a single, beautifully designed application.

## 🌐 Live Demo

**[https://ironmind-ten.vercel.app](https://ironmind-ten.vercel.app)**

## ✨ Features

### Core Platform
- **AI Personal Trainer** — GPT-4 powered coaching with personalized workout plans, nutrition advice, and daily insights
- **Smart Workout Tracking** — Exercise library, set/rep logging, progressive overload suggestions
- **Nutrition Intelligence** — Macro tracking, meal logging, AI-generated meal plans
- **Sleep Optimization** — Sleep quality analysis, duration tracking, recovery insights
- **Body Analytics** — Weight, body fat, muscle mass tracking with trend charts
- **Hydration Tracking** — Daily water intake goals and logging

### Growth & Engagement
- **Gamification System** — Achievements, badges, streaks, levels, weekly challenges
- **Social Feed** — Posts, likes, comments, follow system, public profiles
- **Leaderboards** — Streak-based competitive rankings
- **Referral System** — Invite friends and earn rewards

### Monetization
- **Stripe SaaS Billing** — Free / Pro ($9/mo) / Elite ($19/mo) tiers
- **Feature Gating** — Plan-based access controls
- **Checkout & Billing Portal** — Stripe-powered subscription management

### AI Endpoints
- `/api/ai-coach` — Conversational AI fitness coaching
- `/api/workout-generator` — AI-generated workout plans
- `/api/nutrition-advice` — Personalized nutrition recommendations

### Enterprise Features
- **Role-Based Access** — User and Admin roles with protected routes
- **Analytics Dashboard** — Workout completion, retention metrics, progress tracking
- **SEO Optimized** — Dynamic metadata, OpenGraph, sitemap, robots.txt
- **Performance** — Server components, lazy loading, optimized images

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | TailwindCSS + Radix UI primitives |
| Animation | Framer Motion |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth.js (Google + Email/Password) |
| AI | OpenAI GPT-4o-mini |
| Payments | Stripe (Checkout + Webhooks) |
| Charts | Recharts |
| Validation | Zod + React Hook Form |
| Deployment | Vercel (Edge Network) |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- OpenAI API key
- Stripe account
- Google OAuth credentials (optional)

### Installation

```bash
git clone https://github.com/fayaz-ms/IronMind.git
cd IronMind
npm install

# Set up environment variables
cp .env.example .env.local

# Set up database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

### Environment Variables

```env
DATABASE_URL=postgresql://...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_ELITE_PRICE_ID=price_...
```

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/           # Login, Signup, Onboarding
│   ├── (dashboard)/      # Protected dashboard pages
│   │   └── dashboard/
│   │       ├── workouts/     # Workout tracking
│   │       ├── nutrition/    # Nutrition logging
│   │       ├── sleep/        # Sleep tracking
│   │       ├── progress/     # Body progress
│   │       ├── ai-coach/     # AI coaching chat
│   │       ├── social/       # Social feed
│   │       ├── achievements/ # Gamification
│   │       ├── analytics/    # Advanced analytics
│   │       ├── profile/      # User profile
│   │       └── admin/        # Admin panel
│   ├── api/              # API routes
│   │   ├── ai-coach/         # AI coaching
│   │   ├── workout-generator/# AI workout generation
│   │   ├── nutrition-advice/ # AI nutrition advice  
│   │   ├── analytics/        # User analytics
│   │   ├── stripe/           # Payments
│   │   └── ...
│   ├── pricing/          # Pricing page
│   ├── sitemap.ts        # Dynamic sitemap
│   └── robots.ts         # Robots.txt
├── components/           # React components
├── lib/                  # Utilities & configs
├── types/                # TypeScript types
└── prisma/
    └── schema.prisma     # Database schema
```

## 📊 Database Schema

- Users & Profiles
- Workouts & WorkoutSets
- Exercises & Programs
- NutritionLogs
- SleepLogs
- BodyProgress
- WaterLogs
- Habits & HabitCompletions
- Achievements & UserAchievements
- AiInsights
- SocialPosts, Likes, Comments, Follows
- Subscriptions

## 🧪 Scripts

```bash
npm run dev       # Development server
npm run build     # Production build
npm run start     # Start production
npm run lint      # ESLint
npx prisma studio # Database GUI
```

## 🌍 Deployment

Deployed on **Vercel** with automatic CI/CD from GitHub.

1. Push to `main` branch
2. Vercel auto-deploys
3. Environment variables configured in Vercel dashboard

### Recommended Database Providers
- [Neon](https://neon.tech) (recommended)
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)

## 👤 Author

**Fayazahmad_Siddik**

- GitHub: [@fayaz-ms](https://github.com/fayaz-ms)

Built with ❤️ | Author - Fayazahmad_Siddik

## 📄 License

MIT
