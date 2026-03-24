# IronMind - Deployment Guide

## Current Status

✅ Project built successfully  
✅ Dependencies installed  
✅ Git repository initialized  
✅ Git remote configured  
✅ Vercel CLI installed  
⏳ **Awaiting Authentication** - GitHub & Vercel

---

## Deployment Steps

### Step 1: Complete GitHub Push

The Git push command is waiting for authentication. Please:

1. Check your browser for the GitHub authentication window
2. Complete the authentication process
3. After authentication, verify the push completed:

```powershell
cd F:\Projects\frontend\fittrack-ai
git branch -vv
```

You should see `[origin/main]` in the output.

If the push failed or timed out, retry:

```powershell
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Vercel CLI (Recommended)

1. Authenticate with Vercel (if not already done):

```powershell
cd F:\Projects\frontend\fittrack-ai
vercel login
```

2. Deploy the project:

```powershell
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes  
- **Which scope?** → Select your account
- **Link to existing project?** → No
- **What's your project's name?** → ironmind (or preferred name)
- **In which directory is your code located?** → ./
- **Want to modify settings?** → No

3. Configure environment variables in Vercel:

```powershell
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production
```

4. Deploy to production:

```powershell
vercel --prod
```

#### Option B: Vercel Dashboard (Alternative)

1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Import from GitHub: `fayazahmad-siddik_THBS/IronMind`
4. Configure build settings:
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

5. Add environment variables (see section below)
6. Click "Deploy"

---

## Required Environment Variables

### Essential for Basic Functionality

```bash
# Database
DATABASE_URL="your-postgresql-database-url"

# NextAuth
NEXTAUTH_URL="https://your-deployment-url.vercel.app"
NEXTAUTH_SECRET="generate-using-openssl-rand-base64-32"

# For features to work properly, add:
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"
OPENAI_API_KEY="your-openai-api-key"
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
STRIPE_PRO_PRICE_ID="price_xxx"
STRIPE_ELITE_PRICE_ID="price_xxx"
```

### Generating NEXTAUTH_SECRET

```powershell
# Windows PowerShell
$bytes = New-Object Byte[] 32
[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

Or use: https://generate-secret.vercel.app/32

---

## Database Setup

### Option 1: Neon (Recommended - Free Tier)

1. Go to https://neon.tech
2. Create an account and new project
3. Copy the connection string
4. Add to Vercel environment variables

### Option 2: Supabase

1. Go to https://supabase.com
2. Create project and get PostgreSQL connection string
3. Add to Vercel environment variables

### Option 3: Railway

1. Go to https://railway.app
2. Create PostgreSQL database
3. Copy connection string
4. Add to Vercel environment variables

---

## Post-Deployment Steps

### 1. Run Prisma Migrations

After deploying with database URL:

```powershell
# Set DATABASE_URL locally or in Vercel
npx prisma db push
```

Or configure in Vercel:
- Go to Project Settings → General → Build & Development Settings
- Add Build Command: `prisma db push && next build`

### 2. Verify Deployment

Visit your deployment URL and check:
- ✅ Home page loads
- ✅ Sign up/login redirect works
- ✅ Dashboard pages load (may show "Connect to database" if database not configured)

### 3. Configure OAuth (Optional)

For Google OAuth:
1. Go to https://console.cloud.google.com
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `https://your-app.vercel.app/api/auth/callback/google`
4. Add Client ID and Secret to Vercel environment variables

---

## Troubleshooting

### Build Fails on Vercel

**Issue:** TypeScript or ESLint errors

**Solution:** 
- Check the build logs in Vercel dashboard
- Fix errors locally first: `npm run build`
- Push fixes to GitHub

### Database Connection Errors

**Issue:** `PrismaClientInitializationError`

**Solution:**
- Verify DATABASE_URL is set in Vercel
- Ensure database is accessible from Vercel's region
- Run `prisma generate` and `prisma db push`

### NextAuth Errors

**Issue:** `[next-auth][error]`

**Solution:**
- Ensure NEXTAUTH_SECRET is set (minimum 32 characters)
- Set NEXTAUTH_URL to your deployment URL
- Verify OAuth credentials if using providers

---

## Updating Deployment

To deploy updates:

```powershell
# 1. Make changes
# 2. Commit changes
git add .
git commit -m "Your commit message"

# 3. Push to GitHub
git push origin main

# 4. Vercel will auto-deploy (if connected to GitHub)
# Or manually deploy:
vercel --prod
```

---

## Monitoring

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Build Logs**: Check deployment logs for errors
- **Function Logs**: Monitor API route execution
- **Analytics**: Enable Vercel Analytics in project settings

---

## Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Prisma with Vercel**: https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel

---

## Summary

Your IronMind application is ready for deployment! 

**Next immediate actions:**
1. ✅ Complete GitHub authentication in browser
2. ✅ Complete Vercel authentication in browser
3. ✅ Configure environment variables
4. ✅ Set up database (Neon/Supabase/Railway)
5. ✅ Deploy and test

The deployment should take 2-3 minutes once authentication is complete.
