"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Trophy, Dumbbell, TrendingUp, Medal, Gift, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const posts = [
  {
    id: "1", userName: "Sarah K.", userImage: null, initials: "SK",
    content: "Just crushed a new PR on deadlift — 140 kg! Consistency is everything 🔥",
    type: "WORKOUT", likes: 24, comments: 8, isLiked: false, createdAt: "2 hours ago",
  },
  {
    id: "2", userName: "Mike D.", userImage: null, initials: "MD",
    content: "30-day workout streak unlocked! Never missed a session this month 💪",
    type: "ACHIEVEMENT", likes: 42, comments: 12, isLiked: true, createdAt: "5 hours ago",
  },
  {
    id: "3", userName: "Alex R.", userImage: null, initials: "AR",
    content: "Down 5 kg in 2 months. Clean eating + PPL program = results. Thanks IronMind for keeping me accountable!",
    type: "PROGRESS", likes: 56, comments: 15, isLiked: false, createdAt: "1 day ago",
  },
  {
    id: "4", userName: "Emma L.", userImage: null, initials: "EL",
    content: "Morning runs are the best way to start the day. 5 km in 24 minutes — new personal best!",
    type: "WORKOUT", likes: 18, comments: 5, isLiked: false, createdAt: "1 day ago",
  },
];

const leaderboard = [
  { rank: 1, name: "Sarah K.", initials: "SK", streak: 45, badge: "🥇" },
  { rank: 2, name: "Mike D.", initials: "MD", streak: 30, badge: "🥈" },
  { rank: 3, name: "Alex R.", initials: "AR", streak: 28, badge: "🥉" },
  { rank: 4, name: "Emma L.", initials: "EL", streak: 22, badge: "" },
  { rank: 5, name: "James W.", initials: "JW", streak: 18, badge: "" },
  { rank: 6, name: "You", initials: "YO", streak: 12, badge: "" },
];

const typeIcons: Record<string, typeof Dumbbell> = {
  WORKOUT: Dumbbell,
  ACHIEVEMENT: Trophy,
  PROGRESS: TrendingUp,
};

export default function SocialPage() {
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>(
    Object.fromEntries(posts.map((p) => [p.id, p.isLiked]))
  );
  const [copied, setCopied] = useState(false);
  const referralLink = "https://ironmind-ten.vercel.app/signup?ref=invite";

  function toggleLike(postId: string) {
    setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  }

  function copyReferral() {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Social Feed</h1>
        <p className="text-sm text-muted-foreground">See what the community is up to</p>
      </div>

      <Tabs defaultValue="feed">
        <TabsList>
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="invite">Invite Friends</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-4 mt-4">
          {/* Share box */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>YO</AvatarFallback>
                </Avatar>
                <Input placeholder="Share your progress..." className="flex-1" />
                <Button variant="gradient" size="sm">Post</Button>
              </div>
            </CardContent>
          </Card>

          {/* Posts */}
          {posts.map((post) => {
            const Icon = typeIcons[post.type] ?? Dumbbell;
            return (
              <motion.div key={post.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback>{post.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{post.userName}</span>
                          <Badge variant="secondary" className="gap-1 text-xs">
                            <Icon className="h-3 w-3" />
                            {post.type.toLowerCase()}
                          </Badge>
                          <span className="text-xs text-muted-foreground ml-auto">{post.createdAt}</span>
                        </div>
                        <p className="mt-2 text-sm">{post.content}</p>
                        <div className="mt-3 flex items-center gap-4">
                          <button
                            className={`flex items-center gap-1.5 text-sm transition-colors ${likedPosts[post.id] ? "text-red-500" : "text-muted-foreground hover:text-red-500"}`}
                            onClick={() => toggleLike(post.id)}
                          >
                            <Heart className={`h-4 w-4 ${likedPosts[post.id] ? "fill-current" : ""}`} />
                            {post.likes + (likedPosts[post.id] && !post.isLiked ? 1 : 0)}
                          </button>
                          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                            <MessageCircle className="h-4 w-4" /> {post.comments}
                          </button>
                          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                            <Share2 className="h-4 w-4" /> Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </TabsContent>

        <TabsContent value="leaderboard" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Medal className="h-5 w-5 text-yellow-500" /> Workout Streak Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center gap-3 rounded-lg border p-3 ${
                    entry.name === "You" ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <span className="w-8 text-center font-bold text-lg">
                    {entry.badge || `#${entry.rank}`}
                  </span>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">{entry.initials}</AvatarFallback>
                  </Avatar>
                  <span className="flex-1 font-medium text-sm">{entry.name}</span>
                  <div className="flex items-center gap-1 text-sm">
                    <Dumbbell className="h-3.5 w-3.5 text-violet-500" />
                    <span className="font-semibold">{entry.streak}</span>
                    <span className="text-muted-foreground">days</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invite" className="mt-4">
          <Card className="border-violet-500/30 bg-gradient-to-r from-violet-500/5 to-indigo-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-violet-500" /> Invite Friends & Earn Rewards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Share IronMind with friends and earn <span className="font-semibold text-foreground">1 month of Pro free</span> for each friend who signs up and completes their first workout.
              </p>
              <div className="flex items-center gap-2">
                <Input value={referralLink} readOnly className="flex-1 font-mono text-xs" />
                <Button variant="gradient" size="sm" className="gap-1.5" onClick={copyReferral}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="rounded-xl border bg-card/50 p-3 text-center">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-xs text-muted-foreground">Friends Invited</p>
                </div>
                <div className="rounded-xl border bg-card/50 p-3 text-center">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-xs text-muted-foreground">Signed Up</p>
                </div>
                <div className="rounded-xl border bg-card/50 p-3 text-center">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-xs text-muted-foreground">Months Earned</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
