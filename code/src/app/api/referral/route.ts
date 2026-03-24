import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Generate a deterministic referral code from user email
    const encoder = new TextEncoder();
    const data = encoder.encode(session.user.email);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const referralCode = hashArray
      .slice(0, 4)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();

    const referralLink = `https://ironmind-ten.vercel.app/signup?ref=${referralCode}`;

    return NextResponse.json({
      referralCode,
      referralLink,
      reward: "1 month Pro free for each friend who signs up",
    });
  } catch {
    return NextResponse.json({ error: "Failed to generate referral" }, { status: 500 });
  }
}
