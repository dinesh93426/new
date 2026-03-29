"use client"

import { ArrowLeft, User, Heart, Calendar, MapPin, Phone, Edit, Shield, Bell, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"

const userProfile = {
  name: "Priya Sharma",
  age: 24,
  phone: "+91-9876543210",
  village: "Rampur",
  district: "Varanasi",
  weekNumber: 24,
  trimester: 2,
  dueDate: "June 15, 2026",
  bloodGroup: "O+",
  ashaWorker: "Sunita Devi",
  ashaPhone: "+91-9876543211",
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card">
        <div className="mx-auto flex max-w-md items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="font-semibold text-foreground">My Profile</h1>
            <p className="text-xs text-muted-foreground">என் புரோஃபைல்</p>
          </div>
          <Button variant="ghost" size="icon">
            <Edit className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-md space-y-6 px-4 py-6">
        {/* Profile Card */}
        <Card className="border-0 bg-primary text-primary-foreground">
          <CardContent className="flex items-center gap-4 p-6">
            <Avatar className="h-20 w-20 border-4 border-white/20">
              <AvatarFallback className="bg-white/20 text-2xl font-bold text-white">
                PS
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{userProfile.name}</h2>
              <p className="text-sm opacity-90">பிரியா சர்மா</p>
              <div className="mt-2 flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span className="text-sm">Week {userProfile.weekNumber} • Trimester {userProfile.trimester}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pregnancy Info */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Pregnancy Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Due Date</span>
              <span className="font-medium text-foreground">{userProfile.dueDate}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Current Week</span>
              <span className="font-medium text-foreground">Week {userProfile.weekNumber}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Trimester</span>
              <span className="font-medium text-foreground">{userProfile.trimester}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Blood Group</span>
              <span className="font-medium text-foreground">{userProfile.bloodGroup}</span>
            </div>
          </CardContent>
        </Card>

        {/* Personal Info */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 py-2 border-b border-border">
              <User className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Age</p>
                <p className="font-medium text-foreground">{userProfile.age} years</p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-2 border-b border-border">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">{userProfile.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="font-medium text-foreground">{userProfile.village}, {userProfile.district}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ASHA Worker */}
        <Card className="border-0 bg-accent/10 shadow-sm">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-accent text-accent-foreground">SD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">{userProfile.ashaWorker}</p>
                <p className="text-xs text-muted-foreground">Your ASHA Worker</p>
              </div>
            </div>
            <Button size="sm" variant="outline" asChild>
              <a href={`tel:${userProfile.ashaPhone}`}>
                <Phone className="mr-1 h-4 w-4" />
                Call
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Settings Links */}
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-3" asChild>
            <Link href="/settings">
              <Shield className="h-5 w-5 text-muted-foreground" />
              Privacy & Security
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Bell className="h-5 w-5 text-muted-foreground" />
            Notification Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-emergency hover:text-emergency">
            <LogOut className="h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
