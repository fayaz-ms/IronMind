import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitTrack AI — Your Intelligent Fitness Companion",
  description:
    "Track workouts, nutrition, sleep and body progress with AI-powered insights. Get personalized fitness guidance to reach your goals faster.",
  keywords: ["fitness", "workout tracker", "nutrition", "AI coach", "health", "wellness"],
  openGraph: {
    title: "FitTrack AI",
    description: "AI-powered fitness tracking and coaching platform",
    type: "website",
  },
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
