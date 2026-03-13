# Quick Start Guide - FitTrack AI

## 5-Minute Setup

### 1. Install Dependencies (1 minute)
```bash
cd frontend/fittrack-ai
npm install
npm run db:generate
```

### 2. Configure Environment (2 minutes)
```bash
cp .env.example .env.local
```

Edit `.env.local` and add:
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/fittrack_ai

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-a-secret-key-here

# OAuth (optional, for production)
GOOGLE_ID=your_google_oauth_id
GOOGLE_SECRET=your_google_oauth_secret

# AI (optional, for production)
OPENAI_API_KEY=your_openai_key

# Payments (optional, for production)
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### 3. Database Setup (1 minute)
```bash
npm run db:push
```

### 4. Start Development Server (1 minute)
```bash
npm run dev
```

Visit: http://localhost:3000

---

## Key Features to Try

### 1. Sign Up
- Click "Get Started" on landing page
- Sign up with email/password
- Complete 3-step onboarding

### 2. Dashboard
- View fitness analytics
- Log workouts, nutrition, sleep
- Get AI-powered fitness insights

### 3. AI Coach
- Chat with AI fitness advisor
- Get personalized recommendations
- View coaching history

### 4. Social Features
- Create fitness posts
- Follow other users  
- Like and comment on posts

### 5. Admin Panel
- View user statistics
- Manage exercises
- Monitor system health

---

## Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

### Database Connection Failed
- Check DATABASE_URL in .env.local
- Verify PostgreSQL is running
- Test connection: `npm run db:push --dry-run`

### Prisma Client Not Generated
```bash
npm run db:generate
```

### TypeScript Errors
```bash
npm run diagnose
```

See `TROUBLESHOOTING.md` for detailed help.

---

## Next Steps

- **Production Deployment:** See `DEPLOYMENT.md`
- **Architecture & Best Practices:** See `ARCHITECTURE.md`
- **Complete Setup Guide:** See `SETUP.md`
- **API Documentation:** Each `/api/*` route is documented
- **Troubleshooting:** See `TROUBLESHOOTING.md`

---

## Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, TailwindCSS
- **Backend:** Next.js API Routes, Node.js
- **Database:** PostgreSQL with Prisma ORM
- **Auth:** NextAuth.js with JWT
- **Payments:** Stripe
- **AI:** OpenAI (GPT-4 Mini)
- **UI:** ShadCN UI + Radix UI

---

## Project Structure

```
fittrack-ai/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── (auth)/            # Auth pages (login, signup)
│   │   ├── (dashboard)/       # Dashboard pages
│   │   ├── api/               # API routes
│   │   └── page.tsx           # Landing page
│   ├── components/            # React components
│   │   ├── ui/               # UI components
│   │   ├── dashboard/        # Dashboard components
│   │   └── providers/        # Context providers
│   ├── lib/                  # Utilities
│   │   ├── auth.ts          # NextAuth config
│   │   ├── prisma.ts        # Prisma client
│   │   ├── stripe.ts        # Stripe config
│   │   └── openai.ts        # OpenAI functions
│   └── styles/              # Global styles
├── prisma/
│   └── schema.prisma        # Database schema
├── public/                  # Static assets
├── .env.example            # Environment template
├── package.json            # Dependencies
└── tsconfig.json           # TypeScript config
```

---

## Available Scripts

```bash
npm run dev              # Development server
npm run build            # Production build  
npm run start            # Start production server
npm run lint             # Check code quality
npm run diagnose         # Verify setup

# Database
npm run db:push          # Apply schema changes
npm run db:generate      # Generate Prisma types
npm run db:studio        # Open database GUI
npm run db:seed          # Load demo data
```

---

## Quick Reference: API Endpoints

```bash
# Auth
POST   /api/auth/signin          # Login
POST   /api/auth/signup          # Register
POST   /api/auth/signout         # Logout
GET    /api/auth/session         # Current user

# Workouts
GET    /api/workouts            # List workouts
POST   /api/workouts            # Log workout
GET    /api/exercises           # List exercises

# Nutrition
GET    /api/nutrition           # List logs
POST   /api/nutrition           # Log meal

# Sleep
GET    /api/sleep               # List sleep logs
POST   /api/sleep               # Log sleep

# Progress
GET    /api/progress            # Body metrics
POST   /api/progress            # Record measurement

# AI
POST   /api/ai-coach            # Get ai advice
GET    /api/ai-coach?id=        # Coaching history

# Social
GET    /api/social              # Feed
POST   /api/social              # Create post
POST   /api/social/[id]/like    # Like post
POST   /api/social/[id]/comment # Comment on post

# Dashboard
GET    /api/dashboard           # Summary stats

# Profile
GET    /api/profile             # User profile
PUT    /api/profile             # Update profile

# Admin
GET    /api/admin/stats         # System statistics
GET    /api/admin/users         # User management
```

---

## Environment Configuration

### Production Checklist
- [ ] Set NEXTAUTH_SECRET (strong random string)
- [ ] Set DATABASE_URL to production database
- [ ] Add Google OAuth IDs (for OAuth login)
- [ ] Add OpenAI API key (for AI features)
- [ ] Add Stripe keys (for payments)
- [ ] Set NEXTAUTH_URL to production domain
- [ ] Enable HTTPS
- [ ] Configure CORS domains
- [ ] Set up monitoring/logging
- [ ] Configure backups
- [ ] Set up error tracking

See `DEPLOYMENT.md` for complete production checklist.

---

## Getting Help

**Issues?** Check `TROUBLESHOOTING.md`

**Questions?** See relevant documentation:
- Setup questions → `SETUP.md`
- Deployment questions → `DEPLOYMENT.md`
- Architecture questions → `ARCHITECTURE.md`
- Repair details → `REPAIR_SUMMARY.md`

**Still stuck?** Verify installation:
```bash
npm run diagnose
```

This will verify:
- All config files present
- All dependencies installed
- TypeScript compiling
- Prisma Client generated
- Environment variables set

---

**Ready to build fitness? Let's go! 🚀**
