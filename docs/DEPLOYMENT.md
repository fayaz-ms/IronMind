# FitTrack AI - Production Deployment Checklist

## Pre-Deployment Verification

- [ ] All environment variables set in production
- [ ] Database backups configured
- [ ] SSL/HTTPS certificates obtained
- [ ] DNS records configured
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Monitoring and logging set up

## Code Quality

- [ ] TypeScript compilation passes with no errors
  ```bash
  npm run build
  ```
- [ ] ESLint passes
  ```bash
  npm run lint
  ```
- [ ] All API routes tested
- [ ] Authentication flows verified
- [ ] Payment processing tested (Stripe sandbox)
- [ ] Error handling implemented
- [ ] No console errors or warnings

## Database

- [ ] PostgreSQL connection string obtained
- [ ] Database created and migrations applied
  ```bash
  npm run db:push
  ```
- [ ] Database backups automated
- [ ] Connection pooling configured (PgBouncer or similar)
- [ ] Performance indexes verified
- [ ] Query performance tested

## Security Checklist

### Authentication & Authorization
- [ ] NextAuth secret generated (32+ chars)
- [ ] Password hashing using bcrypt
- [ ] JWT tokens validated
- [ ] Admin role enforcement
- [ ] Rate limiting on login endpoints
- [ ] CORS properly configured

### API Security
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (Prisma guards against this)
- [ ] CSRF protection enabled
- [ ] API key rotation strategy
- [ ] Sensitive data not logged
- [ ] Error messages don't leak info

### Data Protection
- [ ] HTTPS enforced
- [ ] Database encryption at rest
- [ ] Database backups encrypted
- [ ] PII data handling compliant
- [ ] Data retention policies set
- [ ] Access logs maintained

### Third-Party Services
- [ ] Google OAuth credentials set
- [ ] OpenAI API key secured in secrets manager
- [ ] Stripe webhook signing secret validated
- [ ] All APIs use HTTPS only

## Performance Optimization

### Frontend
- [ ] Next.js build size analyzed
  ```bash
  npm run build
  npm run start
  ```
- [ ] Images optimized (WebP, lazy load)
- [ ] Code splitting verified
- [ ] CSS bundle optimized
- [ ] JavaScript bundle < 200KB (gzipped)

### Backend
- [ ] Database query performance tested
- [ ] N+1 queries eliminated (Prisma include/select)
- [ ] API response times < 200ms
- [ ] Caching strategy implemented
- [ ] CDN configured for static assets

### Monitoring
- [ ] Uptime monitoring configured
- [ ] Error tracking (Sentry/Rollbar)
- [ ] Performance monitoring (New Relic/DataDog)
- [ ] Log aggregation (CloudWatch/ELK)
- [ ] Alerts set up for critical errors

## Deployment Platform

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

Vercel automatically handles:
- ✓ Edge functions for serverless
- ✓ Auto-scaling
- ✓ HTTPS/SSL
- ✓ Environment variables
- ✓ Git integration
- ✓ Preview deployments
- ✓ Log streaming
- ✓ Analytics

### Option 2: Self-Hosted (VPS/AWS/GCP)

```bash
# 1. SSH into your server
ssh user@yourserver.com

# 2. Clone repository
git clone https://github.com/yourusername/fittrack-ai.git
cd fittrack-ai

# 3. Install dependencies
npm ci

# 4. Set environment variables
nano .env.production

# 5. Build application
npm run build

# 6. Start with process manager (PM2)
npm install -g pm2
pm2 start "npm start" --name "fittrack-ai"
pm2 save
pm2 startup

# 7. Setup Nginx reverse proxy
cat > /etc/nginx/sites-available/fittrack-ai << EOF
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# 8. Enable SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com

# 9. Enable and restart Nginx
sudo systemctl enable nginx
sudo systemctl restart nginx
```

### Option 3: Docker Container

```bash
# Build image
docker build -t fittrack-ai:latest .

# Run container
docker run -d \
  --name fittrack-ai \
  -p 80:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e NEXTAUTH_SECRET="..." \
  -e NEXTAUTH_URL="https://yourdomain.com" \
  fittrack-ai:latest

# Push to registry
docker tag fittrack-ai:latest your-registry/fittrack-ai:latest
docker push your-registry/fittrack-ai:latest

# Docker Compose (recommended for production)
version: '3.8'
services:
  app:
    image: fittrack-ai:latest
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://...
      - NEXTAUTH_SECRET=...
    depends_on:
      - postgres
  postgres:
    image: postgres:15-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=...
volumes:
  postgres_data:
```

## Post-Deployment

### Verification
- [ ] Website loads without errors
- [ ] Authentication works (Google OAuth)
- [ ] Database operations succeed
- [ ] API endpoints respond correctly
- [ ] Stripe payments process
- [ ] Email notifications send
- [ ] Admin panel accessible
- [ ] Analytics tracked

### Monitoring Setup
- [ ] Set up uptime monitoring
- [ ] Configure error alerts
- [ ] Enable performance monitoring
- [ ] Test critical user paths
- [ ] Monitor database size growth

### User Communication
- [ ] Update status page
- [ ] Announce new deployment
- [ ] Document breaking changes
- [ ] Prepare support docs
- [ ] Train support team

## Scaling Considerations

### Load Management
When users exceed 1000/month:
```bash
# 1. Increase database connections
# 2. Add read replicas
# 3. Enable Redis caching
# 4. Use CDN for images (Cloudflare, AWS CloudFront)
# 5. Consider breaking into microservices
```

### Database Optimization
```bash
# Add indexes on frequently queried columns
# Implement connection pooling (PgBouncer)
# Archive old data periodically
# Set up automated backups
```

### API Rate Limiting
```typescript
// Add to API routes
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

## Troubleshooting

### Common Issues

**502 Bad Gateway**
- Check app is running: `pm2 status`
- Check logs: `pm2 logs fittrack-ai`
- Verify database connection

**High Latency**
- Check database query performance
- Enable caching
- Scale up server resources
- Optimize images

**Memory Leaks**
- Check for lost references
- Use memory profiler
- Review long-running processes
- Implement process restart schedule

### Useful Commands

```bash
# View logs
pm2 logs fittrack-ai
pm2 logs fittrack-ai --lines 100
pm2 logs fittrack-ai --err

# Monitor resources
pm2 monit

# Restart application
pm2 restart fittrack-ai

# Stop application
pm2 stop fittrack-ai

# View process status
pm2 status

# Database diagnostics
npx prisma studio
npx prisma db execute --stdin < query.sql
```

## Disaster Recovery

### Backup Strategy
- Daily database backups
- Weekly full backups
- Monthly archive backups
- Test restore procedures monthly

### Backup Locations
- Primary: Cloud provider (AWS S3, GCP Cloud Storage)
- Secondary: Off-site encrypted storage
- Tertiary: Local encrypted backup

### Recovery Time Objectives (RTO)
- Can be back online within: 1 hour
- Data loss acceptable: < 24 hours

### Recovery Procedures
1. Restore latest backup to new database
2. Update `DATABASE_URL` in environment
3. Verify data integrity
4. Restart application
5. Run health checks
6. Notify users if needed

---

## Support & Documentation

- Production Troubleshooting: See TROUBLESHOOTING.md
- API Documentation: See API.md
- Architecture Overview: See ARCHITECTURE.md
- Contribution Guide: See CONTRIBUTING.md

---

Last Updated: March 2026
