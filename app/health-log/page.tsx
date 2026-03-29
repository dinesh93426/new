"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Calendar, Weight, Droplet, Activity, TrendingUp, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"

type HealthEntry = {
  id: string
  date: string
  type: "weight" | "bp" | "checkup" | "symptom"
  title: string
  value?: string
  notes?: string
}

const healthEntries: HealthEntry[] = [
  {
    id: "1",
    date: "Today",
    type: "weight",
    title: "Weight Check",
    value: "62 kg",
    notes: "Gained 500g this week",
  },
  {
    id: "2",
    date: "Yesterday",
    type: "bp",
    title: "Blood Pressure",
    value: "120/80",
    notes: "Normal range",
  },
  {
    id: "3",
    date: "3 days ago",
    type: "checkup",
    title: "Prenatal Checkup",
    notes: "Baby heartbeat normal. All tests okay.",
  },
  {
    id: "4",
    date: "1 week ago",
    type: "symptom",
    title: "Mild Back Pain",
    notes: "Recommended rest and walking",
  },
  {
    id: "5",
    date: "2 weeks ago",
    type: "weight",
    title: "Weight Check",
    value: "61.5 kg",
  },
]

const typeConfig = {
  weight: {
    icon: Weight,
    color: "bg-primary text-primary-foreground",
    bgLight: "bg-primary/10",
  },
  bp: {
    icon: Activity,
    color: "bg-emergency text-emergency-foreground",
    bgLight: "bg-emergency/10",
  },
  checkup: {
    icon: Calendar,
    color: "bg-safe text-safe-foreground",
    bgLight: "bg-safe/10",
  },
  symptom: {
    icon: Droplet,
    color: "bg-warning text-warning-foreground",
    bgLight: "bg-warning/10",
  },
}

const stats = [
  { label: "Current Weight", value: "62 kg", trend: "+3 kg", icon: Weight },
  { label: "Blood Pressure", value: "120/80", trend: "Normal", icon: Activity },
  { label: "Weeks", value: "24", trend: "Week 24 of 40", icon: Calendar },
]

export default function HealthLogPage() {
  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="font-semibold text-foreground">Health Log</h1>
              <p className="text-xs text-muted-foreground">உடல்நலப் பதிவு</p>
            </div>
          </div>
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            Add Entry
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-md space-y-6 px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="border-0 shadow-sm">
                <CardContent className="p-3 text-center">
                  <Icon className="mx-auto h-5 w-5 text-primary" />
                  <p className="mt-1 text-lg font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Progress Card */}
        <Card className="border-0 bg-primary/10 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Pregnancy Progress</h3>
                <p className="text-sm text-muted-foreground">60% complete - 16 weeks to go</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[60%] rounded-full bg-primary" />
            </div>
          </CardContent>
        </Card>

        {/* Health Log Entries */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Recent Entries</h2>
          <div className="space-y-3">
            {healthEntries.map((entry) => {
              const config = typeConfig[entry.type]
              const Icon = config.icon
              
              return (
                <Card key={entry.id} className="border-0 shadow-sm">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className={cn("rounded-full p-2", config.bgLight)}>
                      <Icon className={cn("h-5 w-5", config.color.split(" ")[0].replace("bg-", "text-"))} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-foreground">{entry.title}</h3>
                        {entry.value && (
                          <span className="font-semibold text-primary">{entry.value}</span>
                        )}
                      </div>
                      {entry.notes && (
                        <p className="mt-0.5 text-sm text-muted-foreground">{entry.notes}</p>
                      )}
                      <p className="mt-1 text-xs text-muted-foreground">{entry.date}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* View All Button */}
        <Button variant="outline" className="w-full">
          View All Records
        </Button>
      </main>
    </div>
  )
}
