import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IronMind — AI-Powered Fitness Platform",
  description:
    "IronMind is the ultimate AI fitness SaaS platform. Track workouts, nutrition, sleep, and body progress with intelligent coaching that adapts to your goals. Built by Fayazahmad_Siddik.",
  keywords: [
    "IronMind",
    "AI fitness",
    "workout tracker",
    "nutrition tracker",
    "AI coach",
    "health",
    "wellness",
    "personal trainer",
    "fitness app",
    "body composition",
    "sleep tracker",
  ],
  authors: [{ name: "Fayazahmad_Siddik" }],
  creator: "Fayazahmad_Siddik",
  openGraph: {
    title: "IronMind — AI-Powered Fitness Platform",
    description:
      "Track workouts, nutrition, sleep, and body progress with AI-powered coaching. The smartest fitness platform built for results.",
    type: "website",
    siteName: "IronMind",
    url: "https://ironmind-ten.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "IronMind — AI-Powered Fitness Platform",
    description:
      "Track workouts, nutrition, sleep, and body progress with AI-powered coaching.",
    creator: "@Fayazahmad_Siddik",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://ironmind-ten.vercel.app"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
