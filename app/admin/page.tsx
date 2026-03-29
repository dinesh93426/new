"use client"

import { useState } from "react"
import { 
  Users, 
  AlertTriangle, 
  Activity, 
  TrendingUp, 
  Search,
  Filter,
  Phone,
  MapPin,
  Calendar,
  Bell,
  ChevronRight,
  CheckCircle,
  Clock,
  Heart
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import Link from "next/link"

type Patient = {
  id: string
  name: string
  age: number
  village: string
  weekNumber: number
  trimester: number
  riskLevel: "low" | "medium" | "high"
  lastCheckup: string
  nextCheckup: string
  phone: string
  alerts: number
}

const patients: Patient[] = [
  {
    id: "1",
    name: "Priya Sharma",
    age: 24,
    village: "Rampur",
    weekNumber: 32,
    trimester: 3,
    riskLevel: "low",
    lastCheckup: "2 days ago",
    nextCheckup: "In 5 days",
    phone: "+91-9876543210",
    alerts: 0,
  },
  {
    id: "2",
    name: "Anita Devi",
    age: 28,
    village: "Sundarpur",
    weekNumber: 28,
    trimester: 3,
    riskLevel: "high",
    lastCheckup: "1 week ago",
    nextCheckup: "Overdue",
    phone: "+91-9876543211",
    alerts: 3,
  },
  {
    id: "3",
    name: "Meena Kumari",
    age: 22,
    village: "Rampur",
    weekNumber: 16,
    trimester: 2,
    riskLevel: "medium",
    lastCheckup: "3 days ago",
    nextCheckup: "In 10 days",
    phone: "+91-9876543212",
    alerts: 1,
  },
  {
    id: "4",
    name: "Sunita Yadav",
    age: 26,
    village: "Lakshmipur",
    weekNumber: 38,
    trimester: 3,
    riskLevel: "high",
    lastCheckup: "Today",
    nextCheckup: "In 3 days",
    phone: "+91-9876543213",
    alerts: 2,
  },
  {
    id: "5",
    name: "Geeta Devi",
    age: 30,
    village: "Sundarpur",
    weekNumber: 12,
    trimester: 1,
    riskLevel: "low",
    lastCheckup: "5 days ago",
    nextCheckup: "In 9 days",
    phone: "+91-9876543214",
    alerts: 0,
  },
]

const stats = [
  {
    label: "Total Patients",
    value: "156",
    change: "+12 this month",
    icon: Users,
    color: "bg-primary text-primary-foreground",
  },
  {
    label: "High Risk",
    value: "23",
    change: "Need attention",
    icon: AlertTriangle,
    color: "bg-emergency text-emergency-foreground",
  },
  {
    label: "Active Alerts",
    value: "8",
    change: "3 new today",
    icon: Bell,
    color: "bg-warning text-warning-foreground",
  },
  {
    label: "Checkups Today",
    value: "12",
    change: "4 completed",
    icon: Activity,
    color: "bg-safe text-safe-foreground",
  },
]

const riskConfig = {
  low: {
    label: "Low Risk",
    color: "bg-safe text-safe-foreground",
    bgLight: "bg-safe/10 text-safe",
  },
  medium: {
    label: "Medium Risk",
    color: "bg-warning text-warning-foreground",
    bgLight: "bg-warning/10 text-warning-foreground",
  },
  high: {
    label: "High Risk",
    color: "bg-emergency text-emergency-foreground",
    bgLight: "bg-emergency/10 text-emergency",
  },
}

type FilterRisk = "all" | "low" | "medium" | "high"

export default function AdminDashboard() {
  const [filterRisk, setFilterRisk] = useState<FilterRisk>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPatients = patients.filter((patient) => {
    const matchesRisk = filterRisk === "all" || patient.riskLevel === filterRisk
    const matchesSearch = searchQuery === "" || 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.village.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesRisk && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-2xl font-bold text-primary">MATRINOVA Admin</h1>
            <p className="text-sm text-muted-foreground">Health Worker Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">View Patient App</Link>
            </Button>
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">SW</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.change}</p>
                    </div>
                    <div className={cn("rounded-full p-3", stat.color)}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Alerts Section */}
        <Card className="border-0 bg-emergency/5 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-emergency">
              <AlertTriangle className="h-5 w-5" />
              Active Alerts (8)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {patients
                .filter((p) => p.alerts > 0)
                .slice(0, 3)
                .map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between rounded-lg bg-card p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={riskConfig[patient.riskLevel].color}>
                          {patient.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{patient.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Week {patient.weekNumber} • {patient.village}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn("rounded-full px-2 py-1 text-xs", riskConfig[patient.riskLevel].bgLight)}>
                        {patient.alerts} alerts
                      </span>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Patient List */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Patient Directory
              </CardTitle>
              
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search patients..."
                    className="rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                
                {/* Filter */}
                <div className="flex gap-1">
                  <Button
                    variant={filterRisk === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterRisk("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={filterRisk === "high" ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => setFilterRisk("high")}
                  >
                    High Risk
                  </Button>
                  <Button
                    variant={filterRisk === "medium" ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setFilterRisk("medium")}
                  >
                    Medium
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className={riskConfig[patient.riskLevel].color}>
                        {patient.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{patient.name}</h3>
                        <span className={cn("rounded-full px-2 py-0.5 text-xs", riskConfig[patient.riskLevel].bgLight)}>
                          {riskConfig[patient.riskLevel].label}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          Week {patient.weekNumber} (T{patient.trimester})
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {patient.village}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Last: {patient.lastCheckup}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="hidden text-right sm:block">
                      <p className={cn(
                        "text-sm font-medium",
                        patient.nextCheckup === "Overdue" ? "text-emergency" : "text-foreground"
                      )}>
                        {patient.nextCheckup}
                      </p>
                      <p className="text-xs text-muted-foreground">Next checkup</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="cursor-pointer border-0 shadow-sm transition-transform hover:scale-105">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Schedule Visit</h3>
                <p className="text-sm text-muted-foreground">Plan home visits</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer border-0 shadow-sm transition-transform hover:scale-105">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-full bg-safe/10 p-3">
                <CheckCircle className="h-6 w-6 text-safe" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Log Checkup</h3>
                <p className="text-sm text-muted-foreground">Record patient data</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer border-0 shadow-sm transition-transform hover:scale-105">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-full bg-chart-4/10 p-3">
                <TrendingUp className="h-6 w-6 text-chart-4" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">View Reports</h3>
                <p className="text-sm text-muted-foreground">Analytics & insights</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
