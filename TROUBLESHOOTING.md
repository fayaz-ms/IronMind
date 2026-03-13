# FitTrack AI - Troubleshooting Guide

## Installation Issues

### "npm: command not found"
**Problem:** Node.js is not installed  
**Solution:**
```bash
# Download and install Node.js 18+ from https://nodejs.org
# Verify installation
node --version
npm --version
```

### "cannot find module 'react'"
**Problem:** Dependencies not installed  
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run db:generate
```

### "EACCES: permission denied"
**Problem:** npm needs root permissions (macOS/Linux)  
**Solution:**
```bash
# Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Or reinstall Node.js with Homebrew (macOS)
brew install node
```

## Configuration Issues

### ".env.local: No such file or directory"
**Problem:** Environment file not created  
**Solution:**
```bash
cp .env.example .env.local
# Edit .env.local with your values
nano .env.local
```

### "DATABASE_URL is not configured"
**Problem:** Missing database connection string  
**Solution:**
```bash
# If using local PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/fittrack_ai"

# If using Neon, Supabase, or Railway, copy their connection string
# Add to .env.local and restart dev server
npm run dev
```

### "NEXTAUTH_SECRET was not defined"
**Problem:** NextAuth secret not set  
**Solution:**
```bash
# Generate a secure secret
openssl rand -base64 32   # Linux/macOS
# Or in Windows PowerShell
$bytes = New-Object System.Byte[] 32
$rng = [System.Security.Cryptography.RNGCryptoServiceProvider]::new()
$rng.GetBytes($bytes)
[Convert]::ToBase64String($bytes)

# Add to .env.local
NEXTAUTH_SECRET="your-generated-secret-here"
```

### "Google OAuth credentials not valid"
**Problem:** GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is wrong  
**Solution:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new credentials → OAuth 2.0 Client ID
3. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
4. Copy Client ID and Secret to .env.local
5. Restart dev server

## Database Issues

### "connect ECONNREFUSED 127.0.0.1:5432"
**Problem:** PostgreSQL not running or wrong credentials  
**Solution:**
```bash
# macOS
brew services start postgresql@15

# Linux
sudo systemctl start postgresql

# Windows - ensure PostgreSQL service is running
# OR use cloud database (Neon, Supabase)

# Verify connection
psql -U postgres -h localhost -d fittrack_ai
```

### "error: role "postgres" does not exist"
**Problem:** PostgreSQL user not found  
**Solution:**
```bash
# macOS/Linux
psql -U $(whoami)

# Create database if not exist
createdb fittrack_ai

# Update DATABASE_URL to your username
DATABASE_URL="postgresql://$(whoami):@localhost:5432/fittrack_ai"
```

### "unknown error reading from database"
**Problem:** Database doesn't exist or migrations not run  
**Solution:**
```bash
# Create database
createdb fittrack_ai

# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:push

# Test connection
npx prisma db execute --stdin < /dev/null
```

### "relation "User" does not exist"
**Problem:** Database not initialized or migrations failed  
**Solution:**
```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Or push schema
npm run db:push

# Verify tables exist
npx prisma studio
```

## Development Server Issues

### "Port 3000 already in use"
**Problem:** Another application using port 3000  
**Solution:**
```bash
# Use different port
PORT=3001 npm run dev

# Or kill process using port 3000
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### "Next.js build fails with TypeScript errors"
**Problem:** TypeScript compilation errors  
**Solution:**
```bash
# Check errors
npx tsc --noEmit

# Fix imports - ensure @/* paths work
# Wrong: import Button from '@components/ui/button'
# Right: import Button from '@/components/ui/button'

# Clear cache and rebuild
rm -rf .next
npm run build
```

### "Module not found: @/" errors
**Problem:** Path alias not configured  
**Solution:**
Verify `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### "Styling not loading (missing Tailwind classes)"
**Problem:** Tailwind CSS not processing  
**Solution:**
```bash
# Verify globals.css is imported in layout.tsx
# Check that content paths in tailwind.config.ts are correct

# Clear cache and restart
rm -rf .next node_modules/.cache
npm run dev

# Or explicitly rebuild
npm run build
npm run dev
```

## API & Authentication Issues

### "Sign up fails with 'email already exists'"
**Problem:** User already registered with that email  
**Solution:**
- Use a different email
- Reset one via Prisma Studio: `npm run db:studio`

### "Google login shows redirect_uri_mismatch"
**Problem:** Redirect URI not added to Google OAuth  
**Solution:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Edit OAuth Client ID
3. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google`
4. Save and wait 1-2 minutes for changes to propagate

### "API returns 401 Unauthorized"
**Problem:** Session token invalid or expired  
**Solution:**
```bash
# Clear browser cookies and sign in again
# Check browser DevTools → Application → Cookies → localhost:3000

# Verify NEXTAUTH_SECRET is set correctly
echo $NEXTAUTH_SECRET
```

### "Stripe payment fails with invalid_request_error"
**Problem:** Stripe API key or price ID incorrect  
**Solution:**
1. Get Secret Key from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Create Products and get Price IDs
3. Update .env.local:
   ```
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_PRO_PRICE_ID="price_..."
   STRIPE_ELITE_PRICE_ID="price_..."
   ```
4. Use test card: `4242 4242 4242 4242`

### "OpenAI API key invalid"
**Problem:** API key expired or incorrect  
**Solution:**
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Check if key is valid and not revoked
3. Create new key if needed
4. Update OPENAI_API_KEY in .env.local
5. Ensure billing is set up

## Browser & Client Issues

### "Blank page or white screen"
**Problem:** React component error  
**Solution:**
1. Open DevTools (F12)
2. Check Console tab for red errors
3. Fix errors and refresh (Ctrl+Shift+R for hard refresh)

### "Changes not reflecting after save"
**Problem:** Hot reload not working  
**Solution:**
```bash
# Restart dev server
# Press Ctrl+C in terminal
npm run dev

# Or clear Next.js cache
rm -rf .next
npm run dev
```

### "Slow performance or high memory usage"
**Problem:** Dev server memory leak or too many files  
**Solution:**
```bash
# Restart dev server
# Check active connections: npm run db:studio
# Clear browser cache (Ctrl+Shift+Delete)
# Reduce number of console.log statements
```

## Deployment Issues

### "Vercel deployment fails"
**Problem:** Missing environment variables or build errors  
**Solution:**
1. Check Vercel Dashboard → Project Settings → Environment Variables
2. All variables from .env.example must be set
3. Check Build Logs (Vercel Dashboard → Deployments)
4. Common missing: DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL

### "NextAuth stops working after Vercel deployment"
**Problem:** NEXTAUTH_URL doesn't match deployment URL  
**Solution:**
1. Update NEXTAUTH_URL in Vercel environment:
   ```
   NEXTAUTH_URL=https://yourdomain.vercel.app
   ```
2. Or use custom domain:
   ```
   NEXTAUTH_URL=https://yourdomain.com
   ```
3. Redeploy after changing

### "Database connection timeout in production"
**Problem:** VPS or cloud database not accessible  
**Solution:**
```bash
# Test connection string locally first
psql "postgresql://user:pass@host:5432/db"

# For cloud databases (Neon, Supabase), whitelist IP
# Or use connection pooling (PgBouncer)

# Increase connection timeout
DATABASE_URL="postgresql://...?connect_timeout=10"
```

### "500 Internal Server Error on API calls"
**Problem:** Server-side error in API route  
**Solution:**
1. Check server logs (terminal running `npm run dev`)
2. Check browser DevTools → Network → Failed request → Response
3. Look for error message
4. Add error logging to see details:
   ```typescript
   try {
     // ... code ...
   } catch (error) {
     console.error('[API Error]', error);
     return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
   }
   ```

## Useful Debugging Commands

```bash
# Check Node version
node --version

# Check npm version  
npm --version

# List installed dependencies
npm ls

# Check what's listening on port 3000
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Test database connection
psql $DATABASE_URL -c "SELECT 1"

# View Prisma schema
npx prisma schema

# Open Prisma Studio (GUI for database)
npm run db:studio

# Clear Next.js cache
rm -rf .next

# Full clean rebuild
rm -rf node_modules package-lock.json .next
npm install
npm run db:generate
npm run build
npm run dev

# TypeScript type check
npx tsc --noEmit

# ESLint check
npm run lint

# Check environment
echo "DATABASE_URL: $DATABASE_URL"
echo "NEXTAUTH_URL: $NEXTAUTH_URL"
```

## Performance Diagnostics

```bash
# Analyze bundle size
npm run build
# Check .next/static/ folder size

# Check API response times
curl -w "@curl-format.txt" http://localhost:3000/api/workouts

# Database query performance
npm run db:studio
# Check query execution times

# Memory usage
node --inspect=9229 node_modules/next/dist/bin/next dev
# Open chrome://inspect
```

## Still Having Issues?

1. **Check the logs carefully** — error messages are informative
2. **Search GitHub Issues** — your problem might be known
3. **Check Discussions** — community may have solved it
4. **Ask in Discord** — community support channels
5. **Create bug report** — with reproduction steps

### When reporting issues, include:
- Operating system and version
- Node.js and npm versions
- Full error message/stack trace
- Steps to reproduce
- `npm diagnose` output
- Relevant .env vars (without secrets!)

---

Last Updated: March 2026
