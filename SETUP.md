# FitTrack AI - Setup & Installation Guide

## Prerequisites

- **Node.js 18.17+** (download from https://nodejs.org)
- **Git** (for version control)
- **PostgreSQL** (local or cloud-hosted)
- **npm** or **yarn** (installed with Node.js)

## Quick Start

### 1. Install Dependencies

```bash
cd frontend/fittrack-ai
npm install
```

This will:
- Install all npm packages (Next.js, React, Prisma, etc.)
- Generate Prisma Client automatically (via postinstall script)

### 2. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/fittrack_ai?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here" # Generate with: openssl rand -base64 32

# Google OAuth (get from https://console.cloud.google.com)
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"

# OpenAI (get from https://platform.openai.com/api-keys)
OPENAI_API_KEY="sk-..."

# Stripe (get from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_test_..."
STRIPE_PRO_PRICE_ID="price_..."       # Create in Stripe Dashboard
STRIPE_ELITE_PRICE_ID="price_..."     # Create in Stripe Dashboard
```

### 3. Set Up Database

```bash
# Generate Prisma Client
npm run db:generate

# Create/migrate database
npm run db:push

# (Optional) Seed with demo data
npm run db:seed
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Setup Details

### PostgreSQL

**Local Setup** (macOS/Linux):
```bash
brew install postgresql@15
brew services start postgresql@15
createdb fittrack_ai
# Update DATABASE_URL in .env.local
```

**Local Setup** (Windows):
```bash
# Download PostgreSQL installer from https://www.postgresql.org/download/windows/
# During installation, note the password and port
# Update DATABASE_URL in .env.local
```

**Cloud Setup** (Recommended):
- **Neon** (https://neon.tech) - Free tier available
- **Supabase** (https://supabase.com) - Free tier available
- **Railway** (https://railway.app) - $5/month credit
- **Vercel Postgres** (https://vercel.com/storage/postgres)

Copy the connection string into `DATABASE_URL`.

### NextAuth Secret

Generate a secure secret:

```bash
# On macOS/Linux
openssl rand -base64 32

# On Windows PowerShell
$bytes = New-Object System.Byte[] 32
$rng = [System.Security.Cryptography.RNGCryptoServiceProvider]::new()
$rng.GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Create **OAuth 2.0 Client ID** (Web Application)
5. Add authorized redirect:
   - `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to `.env.local`

For production, also add:
- `https://yourdomain.com/api/auth/callback/google`

### OpenAI

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create new API key
3. Copy to `OPENAI_API_KEY` in `.env.local`
4. Set up billing at https://platform.openai.com/account/billing/overview

### Stripe

1. Create account at https://stripe.com
2. Go to [API Keys](https://dashboard.stripe.com/apikeys)
3. Copy Secret Key to `STRIPE_SECRET_KEY`
4. Create webhook endpoint:
   ```
   Dashboard → Webhooks → Add Endpoint
   URL: http://localhost:3000/api/stripe/webhook  (localhost: need Stripe CLI)
   URL: https://yourdomain.com/api/stripe/webhook  (production)
   Events: customer.subscription.*, checkout.session.*
   ```
5. Copy webhook signing secret to `STRIPE_WEBHOOK_SECRET`
6. Create subscription prices in Products → Pricing Plans
   - Pro: $9/month copy `price_xxx` to `STRIPE_PRO_PRICE_ID`
   - Elite: $19/month → copy `price_xxx` to `STRIPE_ELITE_PRICE_ID`

**Local Testing with Stripe CLI:**
```bash
# Download from https://stripe.com/docs/stripe-cli
stripe listen --forward-to localhost:3000/api/stripe/webhook

# In another terminal, trigger test event:
stripe trigger charge.succeeded
```

---

## Build & Deployment

### Local Production Build

```bash
npm run build
npm run start
```

### Deployment (Vercel)

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com/new)
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard
5. Deploy automatically on push to main

### Deployment (Other Platforms)

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t fittrack-ai .
docker run -p 3000:3000 \
  -e DATABASE_URL="..." \
  -e NEXTAUTH_SECRET="..." \
  fittrack-ai
```

---

## Troubleshooting

### "Cannot find module" errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Prisma Client not generated

```bash
npm run db:generate
```

### Database migration failed

```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Or push schema
npm run db:push
```

### TypeScript errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Port 3000 already in use

```bash
# Use different port
PORT=3001 npm run dev
```

---

## Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (http://localhost:3000) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Apply schema changes to database |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:studio` | Open Prisma Studio (database GUI) |
| `npm run db:seed` | Seed database with demo data |

---

## Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth Docs](https://next-auth.js.org)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Recharts Docs](https://recharts.org)

---

## Need Help?

- Check error messages carefully - they're informative
- Review `.env.example` for all required variables
- Run `npm run db:studio` to inspect database state
- Check logs in browser console (F12)
- Review API responses in Network tab

---

Last Updated: March 2026
