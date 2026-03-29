"use client"

import { ArrowLeft, Bell, CheckCircle, AlertTriangle, Calendar, Pill, Droplet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"

type Alert = {
  id: string
  type: "reminder" | "tip" | "warning" | "checkup"
  title: string
  titleTamil: string
  description: string
  time: string
  read: boolean
}

const alerts: Alert[] = [
  {
    id: "1",
    type: "reminder",
    title: "Take Iron Tablet",
    titleTamil: "இரும்புச்சத்து மாத்திரை உட்கொள்ளுங்கள்",
    description: "Time for your daily iron supplement",
    time: "30 mins ago",
    read: false,
  },
  {
    id: "2",
    type: "tip",
    title: "Stay Hydrated",
    titleTamil: "நீர்ச்சத்துடன் இருங்கள்",
    description: "Remember to drink 8-10 glasses of water today",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "3",
    type: "checkup",
    title: "Checkup Reminder",
    titleTamil: "பரிசோதனை நினைவூட்டல்",
    description: "Your next checkup is in 5 days",
    time: "Yesterday",
    read: true,
  },
  {
    id: "4",
    type: "tip",
    title: "Evening Walk",
    titleTamil: "மாலை நடைப்பயிற்சி",
    description: "A 15-minute walk can help with back pain",
    time: "Yesterday",
    read: true,
  },
  {
    id: "5",
    type: "warning",
    title: "Missed Checkup",
    titleTamil: "தவறிய பரிசோதனை",
    description: "Please reschedule your missed appointment",
    time: "3 days ago",
    read: true,
  },
]

const alertConfig = {
  reminder: {
    icon: Pill,
    color: "bg-primary text-primary-foreground",
    bgLight: "bg-primary/10",
  },
  tip: {
    icon: Droplet,
    color: "bg-safe text-safe-foreground",
    bgLight: "bg-safe/10",
  },
  warning: {
    icon: AlertTriangle,
    color: "bg-warning text-warning-foreground",
    bgLight: "bg-warning/10",
  },
  checkup: {
    icon: Calendar,
    color: "bg-accent text-accent-foreground",
    bgLight: "bg-accent/10",
  },
}

export default function AlertsPage() {
  const unreadCount = alerts.filter((a) => !a.read).length

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
            <h1 className="font-semibold text-foreground">Notifications</h1>
            <p className="text-xs text-muted-foreground">அறிவிப்புகள்</p>
          </div>
          {unreadCount > 0 && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              {unreadCount} new
            </span>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-md space-y-4 px-4 py-6">
        {alerts.length === 0 ? (
          <Card className="border-0 bg-muted/50">
            <CardContent className="flex flex-col items-center py-12 text-center">
              <Bell className="mb-4 h-12 w-12 text-muted-foreground" />
              <h2 className="text-lg font-semibold text-foreground">No notifications</h2>
              <p className="text-sm text-muted-foreground">
                You&apos;re all caught up!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => {
              const config = alertConfig[alert.type]
              const Icon = config.icon
              
              return (
                <Card
                  key={alert.id}
                  className={cn(
                    "border-0 shadow-sm transition-colors",
                    !alert.read && "ring-2 ring-primary/20"
                  )}
                >
                  <CardContent className="flex items-start gap-3 p-4">
                    <div className={cn("rounded-full p-2", config.bgLight)}>
                      <Icon className={cn("h-5 w-5", config.color.split(" ")[0].replace("bg-", "text-"))} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className={cn("font-semibold text-foreground", !alert.read && "text-primary")}>
                            {alert.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">{alert.titleTamil}</p>
                        </div>
                        {!alert.read && (
                          <span className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{alert.description}</p>
                      <p className="mt-2 text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        <Button variant="outline" className="w-full">
          <CheckCircle className="mr-2 h-4 w-4" />
          Mark all as read
        </Button>
      </main>

      <BottomNav />
    </div>
  )
}
