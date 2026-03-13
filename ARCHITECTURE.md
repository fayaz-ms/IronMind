# FitTrack AI - Architecture & Code Quality Guide

## Project Architecture

### App Router Structure

```
src/app/
├── (auth)/                    # Authentication route group
│   ├── login/page.tsx        # Login page
│   ├── signup/page.tsx       # Sign up page
│   └── onboarding/page.tsx   # Onboarding wizard
├── (dashboard)/              # Protected dashboard route group
│   ├── layout.tsx            # Dashboard layout with sidebar
│   └── dashboard/            # Dashboard pages
│       ├── page.tsx          # Main dashboard
│       ├── workouts/         # Workout tracking
│       ├── nutrition/        # Nutrition logging
│       ├── sleep/            # Sleep tracking
│       ├── progress/         # Body progress
│       ├── ai-coach/         # AI coaching
│       ├── social/           # Social feed
│       ├── achievements/     # Gamification
│       ├── analytics/        # Advanced analytics
│       ├── profile/          # User settings
│       └── admin/            # Admin panel
├── api/                       # API routes
│   ├── auth/
│   ├── workouts/
│   ├── nutrition/
│   ├── sleep/
│   ├── progress/
│   ├── ai-coach/
│   ├── social/
│   ├── stripe/
│   ├── admin/
│   ├── exercises/
│   ├── dashboard/
│   └── profile/
├── pricing/                   # Pricing page (public)
├── page.tsx                  # Landing page
├── layout.tsx                # Root layout
└── globals.css              # Global styles

src/components/
├── ui/                       # ShadCN UI components (primitive)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ...more components
├── dashboard/               # Feature-specific components
│   ├── weekly-chart.tsx
│   ├── quick-actions.tsx
│   ├── ai-insight-cards.tsx
│   └── ...more features
├── layout/                  # Layout components
│   └── theme-toggle.tsx
└── providers/              # React context providers
    ├── theme-provider.tsx
    └── auth-provider.tsx

src/lib/
├── auth.ts                 # NextAuth configuration
├── prisma.ts              # Prisma client singleton
├── stripe.ts              # Stripe configuration
├── openai.ts              # OpenAI API wrapper
├── utils.ts               # Utility functions
└── validations.ts         # Zod validation schemas

src/types/
└── index.ts               # All TypeScript interfaces

prisma/
└── schema.prisma          # Database schema

public/                    # Static files
└── ...images, fonts, etc
```

### Key Design Patterns

#### 1. **Server vs Client Components**
```typescript
// ✓ Server Component (default) - good for:
// - Database queries
// - API secrets
// - Large dependencies
export default async function Dashboard() {
  const data = await prisma.workouts.findMany();
  return <div>{data}</div>;
}

// ✓ Client Component - good for:
// - Interactivity (useState, useEffect)
// - Browser APIs
// - Event handlers
'use client';
export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

#### 2. **API Route Pattern**
```typescript
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Business logic
    return NextResponse.json(data);
  } catch (error) {
    console.error('[API Error]', error);
    return NextResponse.json({ error: 'Error message' }, { status: 500 });
  }
}
```

#### 3. **Component Structure**
```typescript
// Good: Clear interface and exports
interface CardProps {
  title: string;
  value: number;
  unit?: string;
  trend?: number;
}

export function StatCard({ title, value, unit, trend }: CardProps) {
  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent>{value} {unit}</CardContent>
    </Card>
  );
}
```

### Database Schema Highlights

**Key Models:**
- **User** - Authentication and profiles
- **Workout** - Exercise tracking with sets
- **NutritionLog** - Food and macro tracking
- **SleepLog** - Sleep duration and quality
- **BodyProgress** - Weight and measurements
- **Subscription** - Stripe billing integration
- **AiInsight** - AI recommendations cache
- **SocialPost** - Feed content

**Important Field Names:**
- Workouts use `completedAt` (not `date`)
- Nutrition uses `loggedAt` (not `date`)
- Sleep uses `sleepStart`/`sleepEnd` (not `date`)
- Progress uses `measuredAt` (not `date`)

### Authentication Flow

```
1. User submits email/password
   ↓
2. NextAuth validates against database
   ↓
3. Credentials Provider checks bcryptjs hash
   ↓
4. JWT token created with userId and role
   ↓
5. Token stored in httpOnly cookie
   ↓
6. Middleware protects /dashboard routes
   ↓
7. Admin routes check user.role === 'ADMIN'
```

## Code Quality Standards

### TypeScript Best Practices

✓ **Always type function parameters:**
```typescript
// Good
function calculateBMI(weightKg: number, heightCm: number): number {
  return weightKg / ((heightCm / 100) ** 2);
}

// Avoid
function calculateBMI(weightKg, heightCm) {
  return weightKg / ((heightCm / 100) ** 2);
}
```

✓ **Use explicit return types:**
```typescript
// Good
async function fetchUser(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}

// Avoid
async function fetchUser(id: string) {
  return prisma.user.findUnique({ where: { id } });
}
```

✓ **Define interfaces for objects:**
```typescript
// Good
interface DashboardStats {
  calories: { current: number; goal: number };
  workouts: number;
}

// Avoid
function getDashboardStats(): any {
  return { /* ... */ };
}
```

### React Component Best Practices

✓ **Use functional components:**
```typescript
// Good - functional component with hooks
export function Sidebar() {
  const [open, setOpen] = useState(false);
  return <></>;
}

// Avoid - class components
class Sidebar extends React.Component {
  state = { open: false };
}
```

✓ **Memoize heavy computations:**
```typescript
// Good - for expensive calculations
const MemoComponent = memo(function Heavy({ data }) {
  const result = useMemo(() => expensiveCalc(data), [data]);
  return <div>{result}</div>;
});

// Good - for child components that don't need re-render
const ChildComponent = memo(function Child({ value }) {
  return <div>{value}</div>;
});
```

✓ **Use proper hook dependencies:**
```typescript
// Good - dependency array correctly specified
useEffect(() => {
  const timer = setInterval(() => check(), 1000);
  return () => clearInterval(timer);
}, [check]); // include 'check' if it changes

// Avoid - missing dependencies cause stale closures
useEffect(() => {
  setInterval(() => check(), 1000); // check not in dependencies
}, []);
```

### API Route Best Practices

✓ **Validate all inputs:**
```typescript
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(req: Request) {
  const result = schema.safeParse(await req.json());
  if (!result.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
}
```

✓ **Use consistent error responses:**
```typescript
// All error responses should have consistent structure
{
  error: "User-friendly error message",
  code: "ERROR_CODE", // optional, for client to handle
  details: "..." // optional, for logging
}
```

✓ **Handle all async errors:**
```typescript
export async function GET(req: Request) {
  try {
    const data = await riskyOperation();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[API Error]', error);
    return NextResponse.json({ error: 'Operation failed' }, { status: 500 });
  }
}
```

### Styling Best Practices

✓ **Use Tailwind utility-first approach:**
```typescript
// Good - utility classes
<div className="flex items-center justify-between p-4 rounded-lg border">

// Avoid - custom CSS for simple styling
<div style={{ display: 'flex', justifyContent: 'space-between' }}>
```

✓ **Use CSS variables for theming:**
```css
/* In globals.css */
:root {
  --primary: 262 83% 58%;
}

/* In component */
<div className="bg-primary text-primary-foreground">
```

✓ **Use component library consistently:**
```typescript
// Good - built-in components
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Bad - mixing with HTML elements
<button>Click</button>
<div className="card"><div className="content"></div></div>
```

## Performance Optimization

### Frontend Performance

**Image Optimization:**
```typescript
import Image from 'next/image';

// Good - optimized, lazy-loaded
<Image src="/avatar.jpg" alt="User" width={64} height={64} />

// Avoid - unoptimized
<img src="/avatar.jpg" alt="User" />
```

**Code Splitting:**
```typescript
// Good - lazy load heavy components
const Analytics = dynamic(() => import('@/components/Analytics'), {
  loading: () => <Skeleton />,
});

// Good - route-based code splitting (automatic with App Router)
export default () => <Analytics />;
```

**Database Query Optimization:**
```typescript
// Good - only fetch needed fields
prisma.user.findMany({
  select: { id: true, name: true, email: true },
});

// Good - prevent N+1 queries
prisma.post.findMany({
  include: { comments: true }, // joins comments
});

// Avoid - fetch everything
prisma.post.findMany();
```

### Build Optimization

```bash
# Analyze bundle size
npm run build
# Check .next/static/chunks/ for large files

# Check what's in node_modules
npm ls --depth=0
```

## Database Best Practices

### Query Pattern: Fetch with Relations
```typescript
// Instead of N queries
const user = await prisma.user.findUnique({ where: { id } });
const posts = await prisma.post.findMany({ where: { userId: id } });

// Do 1 query with include
const user = await prisma.user.findUnique({
  where: { id },
  include: { posts: true },
});
```

### Indexes for Performance
```prisma
model Workout {
  // ... fields ...
  @@index([userId, completedAt]) // For filtering user's workouts by date
  @@index([userId]) // For listing user's workouts
}
```

## Security Checklist

- ✓ Never expose secrets in client code
- ✓ Always validate user input
- ✓ Use prepared statements (Prisma provides this)
- ✓ Hash passwords with bcryptjs
- ✓ Verify authentication/authorization on backend
- ✓ Use HTTPS in production
- ✓ Set secure cookie flags
- ✓ Implement rate limiting for APIs
- ✓ Don't log sensitive data
- ✓ Keep dependencies updated

## Testing Strategy

```typescript
// Example test structure (using Jest)
describe('API: POST /api/workouts', () => {
  it('should create workout for authenticated user', async () => {
    // Setup: mock session
    // Execute: call POST /api/workouts
    // Assert: check response and database
  });

  it('should return 401 for unauthenticated user', async () => {
    // Setup: no session
    // Execute: call POST /api/workouts
    // Assert: check response is 401
  });
});
```

## Common Code Smells to Avoid

| Smell | Problem | Fix |
|-------|---------|-----|
| Long functions (50+ lines) | Hard to test, understand | Break into smaller functions |
| Nested callbacks | Callback hell, hard to read | Use async/await |
| Magic numbers | Unclear intent | Use named constants |
| Console.log for logging | Not structured | Use proper logging library |
| Any types | Loses TypeScript benefits | Type everything explicitly |
| Unused imports | Bloats bundle | Use IDE cleanup |
| No error handling | Crashes silently | Add try/catch |
| Hard-coded strings | Hard to change | Use env vars or constants |

---

Last Updated: March 2026
