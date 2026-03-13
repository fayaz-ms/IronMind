# FitTrack AI

A modern, full-stack fitness & wellness SaaS platform built with **Next.js 14**, **TypeScript**, **TailwindCSS**, **Prisma**, and **OpenAI**.

## Features

- **Dashboard** — Stats overview, weekly charts, AI insight cards
- **Workout Tracker** — Exercise library, set logging, programs
- **Nutrition Tracker** — Macro tracking, meal logging, pie/bar charts
- **Sleep Tracker** — Sleep logging, quality analysis, trends
- **Body Progress** — Weight, body fat, muscle mass with line charts
- **AI Coach** — GPT-powered fitness coaching chat
- **Social Feed** — Posts, likes, comments, leaderboard
- **Achievements** — Badges, weekly challenges, gamification
- **Analytics** — Deep-dive charts (workouts, nutrition, sleep)
- **Admin Panel** — User management, exercise CRUD, platform settings
- **Stripe Billing** — Free / Pro ($9/mo) / Elite ($19/mo) tiers

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS + ShadCN UI |
| Animation | Framer Motion |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth.js (Google + Credentials) |
| AI | OpenAI GPT-4o-mini |
| Payments | Stripe (Checkout + Webhooks) |
| Charts | Recharts |
| Validation | Zod + React Hook Form |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- OpenAI API key
- Stripe account (for billing)
- Google OAuth credentials (optional)

### Installation

```bash
# Clone and install
cd frontend/fittrack-ai
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your actual values

# Set up database
npx prisma generate
npx prisma db push

# (Optional) Seed the database
npx prisma db seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Stripe Setup

1. Create products & prices in Stripe Dashboard for Pro and Elite plans
2. Copy the price IDs into `.env.local`
3. Set up a webhook endpoint pointing to `/api/stripe/webhook`
4. Add the webhook signing secret to `.env.local`

For local development, use the Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Set authorized redirect URI to `http://localhost:3000/api/auth/callback/google`
4. Copy Client ID and Secret to `.env.local`

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Auth pages (login, signup, onboarding)
│   ├── (dashboard)/      # Dashboard layout + all feature pages
│   │   └── dashboard/
│   │       ├── workouts/
│   │       ├── nutrition/
│   │       ├── sleep/
│   │       ├── progress/
│   │       ├── ai-coach/
│   │       ├── social/
│   │       ├── achievements/
│   │       ├── analytics/
│   │       ├── profile/
│   │       └── admin/
│   ├── api/              # API routes
│   │   ├── auth/
│   │   ├── workouts/
│   │   ├── nutrition/
│   │   ├── sleep/
│   │   ├── progress/
│   │   ├── ai-coach/
│   │   ├── social/
│   │   ├── stripe/
│   │   ├── admin/
│   │   ├── dashboard/
│   │   ├── exercises/
│   │   └── profile/
│   ├── pricing/
│   └── globals.css
├── components/
│   ├── ui/               # ShadCN components
│   ├── dashboard/        # Dashboard-specific components
│   ├── layout/           # Layout components
│   └── providers/        # Context providers
├── lib/                  # Utilities, configs, API clients
├── types/                # TypeScript interfaces
└── prisma/
    └── schema.prisma     # Database schema
```

## Scripts

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
npx prisma studio # Open Prisma Studio (DB GUI)
```

## Deployment

The app is configured for deployment on **Vercel**:

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables in Vercel dashboard
4. Vercel auto-detects Next.js and deploys

For the database, use a managed PostgreSQL provider:
- [Neon](https://neon.tech) (recommended, free tier)
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)

## License

MIT
