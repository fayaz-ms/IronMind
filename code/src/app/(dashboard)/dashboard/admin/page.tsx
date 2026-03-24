"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Dumbbell, BarChart3, Shield, Search, MoreHorizontal,
  Plus, Trash2, Edit, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const mockUsers = [
  { id: "1", name: "Alex Johnson", email: "alex@example.com", plan: "PRO", role: "USER", joined: "2024-01-15", status: "active" },
  { id: "2", name: "Sarah Miller", email: "sarah@example.com", plan: "ELITE", role: "USER", joined: "2024-02-03", status: "active" },
  { id: "3", name: "James Brown", email: "james@example.com", plan: "FREE", role: "USER", joined: "2024-02-20", status: "active" },
  { id: "4", name: "Emma Davis", email: "emma@example.com", plan: "PRO", role: "USER", joined: "2024-03-01", status: "inactive" },
  { id: "5", name: "Mike Wilson", email: "mike@example.com", plan: "FREE", role: "ADMIN", joined: "2023-11-10", status: "active" },
];

const mockExercises = [
  { id: "1", name: "Bench Press", muscle: "CHEST", difficulty: "INTERMEDIATE" },
  { id: "2", name: "Squat", muscle: "LEGS", difficulty: "INTERMEDIATE" },
  { id: "3", name: "Deadlift", muscle: "BACK", difficulty: "ADVANCED" },
  { id: "4", name: "Shoulder Press", muscle: "SHOULDERS", difficulty: "INTERMEDIATE" },
  { id: "5", name: "Pull Up", muscle: "BACK", difficulty: "INTERMEDIATE" },
];

const planColor: Record<string, string> = {
  FREE: "secondary",
  PRO: "default",
  ELITE: "success",
};

export default function AdminPage() {
  const [userSearch, setUserSearch] = useState("");
  const [exerciseSearch, setExerciseSearch] = useState("");
  const [addExerciseOpen, setAddExerciseOpen] = useState(false);

  const filteredUsers = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredExercises = mockExercises.filter((e) =>
    e.name.toLowerCase().includes(exerciseSearch.toLowerCase())
  );

  const stats = [
    { label: "Total Users", value: "1,247", icon: Users, change: "+12%" },
    { label: "Active Subs", value: "438", icon: BarChart3, change: "+8%" },
    { label: "Exercises", value: "156", icon: Dumbbell, change: "+3" },
    { label: "Admins", value: "4", icon: Shield, change: "" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p className="text-sm text-muted-foreground">
          Manage users, exercises, and platform settings
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="rounded-lg bg-primary/10 p-2.5">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">
                    {s.label}
                    {s.change && (
                      <span className="ml-1 text-emerald-500">{s.change}</span>
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
          <TabsTrigger value="settings">Platform</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="mt-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Name</th>
                      <th className="py-3 px-4 text-left font-medium">Email</th>
                      <th className="py-3 px-4 text-left font-medium">Plan</th>
                      <th className="py-3 px-4 text-left font-medium">Role</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-left font-medium">Joined</th>
                      <th className="py-3 px-4 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4 font-medium">{user.name}</td>
                        <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                        <td className="py-3 px-4">
                          <Badge variant={planColor[user.plan] as any}>{user.plan}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={user.role === "ADMIN" ? "destructive" : "outline"}>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center gap-1 text-xs ${user.status === "active" ? "text-emerald-500" : "text-muted-foreground"}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${user.status === "active" ? "bg-emerald-500" : "bg-muted-foreground"}`} />
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{user.joined}</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between border-t p-3">
                <p className="text-xs text-muted-foreground">
                  Showing {filteredUsers.length} of {mockUsers.length} users
                </p>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Exercises Tab */}
        <TabsContent value="exercises" className="mt-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search exercises..."
                value={exerciseSearch}
                onChange={(e) => setExerciseSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Dialog open={addExerciseOpen} onOpenChange={setAddExerciseOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1.5">
                  <Plus className="h-4 w-4" /> Add Exercise
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Exercise</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input placeholder="Exercise name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Muscle Group</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select muscle group" /></SelectTrigger>
                      <SelectContent>
                        {["CHEST", "BACK", "LEGS", "SHOULDERS", "ARMS", "CORE", "FULL_BODY"].map((m) => (
                          <SelectItem key={m} value={m}>{m}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Difficulty</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select difficulty" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BEGINNER">Beginner</SelectItem>
                        <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                        <SelectItem value="ADVANCED">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input placeholder="Brief description" />
                  </div>
                  <Button className="w-full" onClick={() => setAddExerciseOpen(false)}>
                    Add Exercise
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Name</th>
                      <th className="py-3 px-4 text-left font-medium">Muscle Group</th>
                      <th className="py-3 px-4 text-left font-medium">Difficulty</th>
                      <th className="py-3 px-4 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExercises.map((ex) => (
                      <tr key={ex.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4 font-medium">{ex.name}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{ex.muscle}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary">{ex.difficulty}</Badge>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Platform Settings Tab */}
        <TabsContent value="settings" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Platform Name</Label>
                <Input defaultValue="FitTrack AI" />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Max Free-Tier AI Queries/Day</Label>
                <Input type="number" defaultValue="5" />
              </div>
              <div className="space-y-2">
                <Label>Pro AI Queries/Day</Label>
                <Input type="number" defaultValue="50" />
              </div>
              <div className="space-y-2">
                <Label>Elite AI Queries/Day</Label>
                <Input type="number" defaultValue="999" />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Maintenance Mode</Label>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Off</Badge>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
