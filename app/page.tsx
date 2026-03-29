"use client"

import { useState } from "react"
import { Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HealthStatusCard } from "@/components/health-status-card"
import { QuickActions } from "@/components/quick-actions"
import { DailyTips } from "@/components/daily-tips"
import { BottomNav } from "@/components/bottom-nav"
import { LanguageSelector } from "@/components/language-selector"
import Link from "next/link"

export default function HomePage() {
  const [healthStatus] = useState<"safe" | "warning" | "emergency">("safe")

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-xl font-bold text-primary">MATRINOVA</h1>
            <p className="text-xs text-muted-foreground">Mother Care</p>
          </div>
          <div className="flex items-center gap-1">
            <LanguageSelector />
            <Button variant="ghost" size="icon" asChild>
              <Link href="/alerts">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/settings">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-md space-y-6 px-4 py-6">
        {/* Greeting */}
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Hello, <span className="text-primary">Priya</span>
          </h2>
          <p className="text-xs text-primary/80">வணக்கம், பிரியா</p>
          <p className="text-muted-foreground">How are you feeling today?</p>
          <p className="text-xs text-muted-foreground">இன்று எப்படி உணர்கிறீர்கள்?</p>
        </div>

        {/* Health Status */}
        <HealthStatusCard
          status={healthStatus}
          weekNumber={24}
          trimester={2}
          lastCheckup="2 days ago"
        />

        {/* Quick Actions */}
        <section>
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          <p className="mb-3 text-xs text-muted-foreground">விரைவான நடவடிக்கைகள்</p>
          <QuickActions />
        </section>

        {/* Daily Tips */}
        <section>
          <h3 className="text-lg font-semibold text-foreground">Daily Tips</h3>
          <p className="mb-3 text-xs text-muted-foreground">தினசரி குறிப்புகள்</p>
          <DailyTips />
        </section>

        {/* Emergency Banner */}
        <Link href="/emergency" className="block">
          <div className="flex items-center justify-between rounded-xl bg-emergency/10 p-4 ring-1 ring-emergency/20">
            <div>
              <p className="font-semibold text-emergency">Need Help Urgently?</p>
              <p className="text-xs text-emergency/80">உதவி அவசரமாக தேவையா?</p>
              <p className="text-sm text-muted-foreground">Tap to send emergency alert</p>
              <p className="text-xs text-muted-foreground">அவசர எச்சரிக்கையை அனுப்ப தட்டவும்</p>
            </div>
            <Button className="bg-emergency hover:bg-emergency/90 text-emergency-foreground">
              SOS
            </Button>
          </div>
        </Link>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
