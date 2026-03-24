# Environment Variables for Vercel Deployment

## Copy these to Vercel Project Settings > Environment Variables

### Required (Minimum for deployment)

```
DATABASE_URL=postgresql://username:password@host:5432/database?schema=public
NEXTAUTH_URL=https://your-app-url.vercel.app
NEXTAUTH_SECRET=generate-a-32-char-minimum-secret-key
```

### Optional (for full functionality)

```
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# OpenAI API
OPENAI_API_KEY=sk-your-openai-api-key

# Stripe Payments
STRIPE_SECRET_KEY=sk_test_or_live_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_PRO_PRICE_ID=price_xxxxxxxxxxxxx
STRIPE_ELITE_PRICE_ID=price_xxxxxxxxxxxxx
```

---

## How to Get These Values

### DATABASE_URL

**Free Options:**
1. **Neon** (https://neon.tech) - Free PostgreSQL
2. **Supabase** (https://supabase.com) - Free PostgreSQL
3. **Railway** (https://railway.app) - Free tier

**Format:**
```
postgresql://username:password@hostname:5432/database?schema=public
```

### NEXTAUTH_SECRET

**Generate with PowerShell:**
```powershell
$bytes = New-Object Byte[] 32
[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

**Or use online:** https://generate-secret.vercel.app/32

### NEXTAUTH_URL

Your Vercel deployment URL:
```
https://your-project-name.vercel.app
```

*(Vercel will provide this after first deployment)*

### GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET

1. Go to https://console.cloud.google.com
2. Create project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add redirect URI: `https://your-app.vercel.app/api/auth/callback/google`
6. Copy Client ID and Secret

### OPENAI_API_KEY

1. Go to https://platform.openai.com
2. Create account
3. Go to API Keys section
4. Create new secret key
5. Copy the key (starts with `sk-`)

### STRIPE Keys

1. Go to https://dashboard.stripe.com
2. Create account
3. Get API keys from Developers section
4. For webhook secret, create webhook endpoint pointing to:
   `https://your-app.vercel.app/api/stripe/webhook`
5. Create products and get price IDs for subscription plans

---

## Adding to Vercel

### Method 1: Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable:
   - Name: `DATABASE_URL`
   - Value: `your-value`
   - Environment: Production, Preview, Development

### Method 2: Vercel CLI

```powershell
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production
# ... add others as needed
```

### Method 3: Import from .env file

```powershell
# Create .env.production file with your values
vercel env pull .env.production
```

---

## Testing Environment Variables

After adding variables and deploying:

1. Check Vercel logs for errors
2. Test API endpoints
3. Verify database connection
4. Test authentication flow

---

## Security Notes

⚠️ **Never commit these values to Git**
⚠️ **Use production values for production environment**
⚠️ **Rotate secrets if exposed**
⚠️ **Use test/development keys for preview deployments**

---

## Minimal Working Configuration

For initial deployment to work (without full features):

```bash
DATABASE_URL="postgresql://user:pass@host:5432/db?schema=public"
NEXTAUTH_URL="https://your-app.vercel.app"
NEXTAUTH_SECRET="your-generated-secret-32-chars-minimum"
```

You can add other variables later to enable features incrementally.
