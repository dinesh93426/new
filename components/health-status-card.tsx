"use client"

import { Heart, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface HealthStatusCardProps {
  status: "safe" | "warning" | "emergency"
  weekNumber: number
  trimester: number
  lastCheckup: string
}

const statusConfig = {
  safe: {
    icon: CheckCircle,
    label: "All Good",
    labelTamil: "எல்லாம் நல்லது",
    bgColor: "bg-safe",
    textColor: "text-safe-foreground",
    iconColor: "text-safe-foreground",
  },
  warning: {
    icon: AlertCircle,
    label: "Need Attention",
    labelTamil: "கவனம் தேவை",
    bgColor: "bg-warning",
    textColor: "text-warning-foreground",
    iconColor: "text-warning-foreground",
  },
  emergency: {
    icon: AlertCircle,
    label: "Emergency",
    labelTamil: "அவசரநிலை",
    bgColor: "bg-emergency",
    textColor: "text-emergency-foreground",
    iconColor: "text-emergency-foreground",
  },
}

export function HealthStatusCard({ status, weekNumber, trimester, lastCheckup }: HealthStatusCardProps) {
  const config = statusConfig[status]
  const StatusIcon = config.icon

  return (
    <Card className={cn("overflow-hidden border-0 shadow-lg", config.bgColor)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={cn("rounded-full bg-white/20 p-3", config.iconColor)}>
              <StatusIcon className="h-8 w-8" />
            </div>
            <div>
              <p className={cn("text-sm font-medium opacity-90", config.textColor)}>Health Status</p>
              <h2 className={cn("text-2xl font-bold", config.textColor)}>{config.label}</h2>
              <p className={cn("text-xs opacity-80", config.textColor)}>{config.labelTamil}</p>
            </div>
          </div>
          <div className={cn("text-right", config.textColor)}>
            <div className="flex items-center gap-1 opacity-90">
              <Heart className="h-4 w-4" />
              <span className="text-sm font-medium">Week {weekNumber}</span>
            </div>
            <p className="text-xs opacity-80">Trimester {trimester}</p>
          </div>
        </div>
        
        <div className={cn("mt-4 flex items-center gap-2 rounded-lg bg-white/20 px-3 py-2", config.textColor)}>
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm">Last checkup: {lastCheckup}</span>
        </div>
      </CardContent>
    </Card>
  )
}
