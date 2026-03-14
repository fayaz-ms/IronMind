"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  BarChart3,
  Brain,
  Dumbbell,
  Home,
  Menu,
  Moon,
  Salad,
  Scale,
  Settings,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/workouts", label: "Workouts", icon: Dumbbell },
  { href: "/dashboard/nutrition", label: "Nutrition", icon: Salad },
  { href: "/dashboard/sleep", label: "Sleep", icon: Moon },
  { href: "/dashboard/progress", label: "Progress", icon: Scale },
  { href: "/dashboard/ai-coach", label: "AI Coach", icon: Brain },
  { href: "/dashboard/social", label: "Social", icon: Users },
  { href: "/dashboard/achievements", label: "Achievements", icon: Trophy },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/profile", label: "Profile", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const initials = session?.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() ?? "U";

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ── Desktop sidebar ──────────────────────────────── */}
      <aside className="hidden w-64 flex-shrink-0 border-r bg-card lg:block">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 border-b px-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <Activity className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold">
              Iron<span className="gradient-text">Mind</span>
            </span>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="border-t p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={session?.user?.image ?? undefined} />
                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 truncate">
                <p className="text-sm font-medium truncate">{session?.user?.name ?? "User"}</p>
                <p className="text-xs text-muted-foreground truncate">{session?.user?.email}</p>
              </div>
            </div>
            <p className="mt-3 text-[10px] text-muted-foreground text-center">
              Built with ❤️ | Author - Fayazahmad_Siddik
            </p>
          </div>
        </div>
      </aside>

      {/* ── Mobile sidebar ───────────────────────────────── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-64 border-r bg-card lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex h-full flex-col">
                <div className="flex h-16 items-center justify-between border-b px-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                      <Activity className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-lg font-bold">Iron<span className="gradient-text">Mind</span></span>
                  </div>
                  <button onClick={() => setSidebarOpen(false)}>
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main content ─────────────────────────────────── */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between border-b px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Avatar className="h-8 w-8 lg:hidden">
              <AvatarImage src={session?.user?.image ?? undefined} />
              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</div>
      </main>
    </div>
  );
}
