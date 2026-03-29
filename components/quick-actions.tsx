"use client"

import { Mic, AlertTriangle, Apple, Users, Map, Stethoscope } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { cn } from "@/lib/utils"

const actions = [
  {
    icon: Mic,
    label: "Voice Check",
    labelTamil: "குரல் சோதனை",
    href: "/symptom-checker",
    color: "bg-primary text-primary-foreground",
    description: "Tell us how you feel",
  },
  {
    icon: AlertTriangle,
    label: "Emergency",
    labelTamil: "அவசரநிலை",
    href: "/emergency",
    color: "bg-emergency text-emergency-foreground",
    description: "Get help now",
  },
  {
    icon: Apple,
    label: "Nutrition",
    labelTamil: "ஊட்டச்சத்து",
    href: "/nutrition",
    color: "bg-safe text-safe-foreground",
    description: "Food guide",
  },
  {
    icon: Users,
    label: "Sisters",
    labelTamil: "சகோதரிகள்",
    href: "/community",
    color: "bg-accent text-accent-foreground",
    description: "Connect with helpers",
  },
  {
    icon: Map,
    label: "Hospital",
    labelTamil: "மருத்துவமனை",
    href: "/hospital",
    color: "bg-chart-4 text-white",
    description: "Find nearest hospital",
  },
  {
    icon: Stethoscope,
    label: "Health Log",
    labelTamil: "சுகாதார பதிவு",
    href: "/health-log",
    color: "bg-secondary text-secondary-foreground",
    description: "Track your health",
  },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {actions.map((action) => {
        const Icon = action.icon
        return (
          <Link key={action.label} href={action.href}>
            <Card className={cn("h-full cursor-pointer border-0 shadow-md transition-transform hover:scale-105 active:scale-95", action.color)}>
              <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                <div className="mb-2 rounded-full bg-white/20 p-3">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-semibold">{action.label}</h3>
                {action.labelTamil && <p className="mt-0.5 text-xs opacity-80">{action.labelTamil}</p>}
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
