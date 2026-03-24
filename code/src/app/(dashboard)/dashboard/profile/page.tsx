"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { User, Bell, Shield, CreditCard, LogOut, Camera, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ProfilePage() {
  const { data: session } = useSession();
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    name: session?.user?.name || "Alex Johnson",
    email: session?.user?.email || "alex@example.com",
    age: "28",
    gender: "male",
    height: "178",
    weight: "82",
    goal: "BUILD_MUSCLE",
    activityLevel: "MODERATE",
  });

  const [notifications, setNotifications] = useState({
    workoutReminders: true,
    mealReminders: true,
    sleepReminders: false,
    weeklyReport: true,
    aiInsights: true,
    socialActivity: false,
  });

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile & Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account, preferences, and subscription
        </p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile" className="gap-1.5">
            <User className="h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5">
            <Bell className="h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="subscription" className="gap-1.5">
            <CreditCard className="h-4 w-4" /> Subscription
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-1.5">
            <Shield className="h-4 w-4" /> Security
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-6 space-y-6">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={session?.user?.image || ""} />
                    <AvatarFallback className="text-xl bg-primary/10 text-primary">
                      {profile.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Camera className="h-4 w-4" /> Change Photo
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={profile.email} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Age</Label>
                    <Input
                      type="number"
                      value={profile.age}
                      onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select
                      value={profile.gender}
                      onValueChange={(v) => setProfile({ ...profile, gender: v })}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Height (cm)</Label>
                    <Input
                      type="number"
                      value={profile.height}
                      onChange={(e) => setProfile({ ...profile, height: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Weight (kg)</Label>
                    <Input
                      type="number"
                      value={profile.weight}
                      onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fitness Goal</Label>
                    <Select
                      value={profile.goal}
                      onValueChange={(v) => setProfile({ ...profile, goal: v })}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LOSE_WEIGHT">Lose Weight</SelectItem>
                        <SelectItem value="BUILD_MUSCLE">Build Muscle</SelectItem>
                        <SelectItem value="IMPROVE_ENDURANCE">Improve Endurance</SelectItem>
                        <SelectItem value="MAINTAIN">Maintain</SelectItem>
                        <SelectItem value="GENERAL_FITNESS">General Fitness</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Activity Level</Label>
                    <Select
                      value={profile.activityLevel}
                      onValueChange={(v) => setProfile({ ...profile, activityLevel: v })}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SEDENTARY">Sedentary</SelectItem>
                        <SelectItem value="LIGHT">Lightly Active</SelectItem>
                        <SelectItem value="MODERATE">Moderately Active</SelectItem>
                        <SelectItem value="VERY_ACTIVE">Very Active</SelectItem>
                        <SelectItem value="EXTRA_ACTIVE">Extra Active</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={saving} className="gap-1.5">
                    <Save className="h-4 w-4" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-6">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {([
                  { key: "workoutReminders", label: "Workout Reminders", desc: "Get reminded to complete your daily workout" },
                  { key: "mealReminders", label: "Meal Logging Reminders", desc: "Reminders to log your meals" },
                  { key: "sleepReminders", label: "Sleep Reminders", desc: "Bedtime and wake-up notifications" },
                  { key: "weeklyReport", label: "Weekly Report", desc: "Receive a weekly summary of your progress" },
                  { key: "aiInsights", label: "AI Insights", desc: "Get notified when new AI insights are available" },
                  { key: "socialActivity", label: "Social Activity", desc: "Notifications for likes, comments, and follows" },
                ] as const).map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch
                      checked={notifications[item.key]}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, [item.key]: checked })
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Subscription Tab */}
        <TabsContent value="subscription" className="mt-6">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-lg">Free Plan</p>
                      <Badge variant="secondary">Current</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Basic features with limited AI coaching
                    </p>
                  </div>
                  <p className="text-2xl font-bold">$0<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <p className="font-medium text-sm">Upgrade for more features</p>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-lg border p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">Pro</p>
                        <p className="font-bold">$9<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
                      </div>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Unlimited AI coaching</li>
                        <li>• Advanced analytics</li>
                        <li>• Custom workout plans</li>
                      </ul>
                      <Button size="sm" className="w-full">Upgrade to Pro</Button>
                    </div>
                    <div className="rounded-lg border border-primary/50 p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">Elite</p>
                        <p className="font-bold">$19<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
                      </div>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Everything in Pro</li>
                        <li>• Priority support</li>
                        <li>• Exclusive challenges</li>
                      </ul>
                      <Button size="sm" variant="gradient" className="w-full">Upgrade to Elite</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="mt-6 space-y-6">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm New Password</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                </div>
                <Button size="sm">Update Password</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-xs font-bold">G</div>
                    <div>
                      <p className="text-sm font-medium">Google</p>
                      <p className="text-xs text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Once you delete your account, there is no going back. This action is permanent.
                </p>
                <Button variant="destructive" size="sm" className="gap-1.5">
                  <LogOut className="h-4 w-4" /> Delete Account
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
