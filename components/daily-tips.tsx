"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Droplet, Moon, Apple } from "lucide-react"
import { cn } from "@/lib/utils"

const tips = [
  {
    icon: Droplet,
    title: "Stay Hydrated",
    titleTamil: "நீர்ச்சத்துடன் இருங்கள்",
    description: "Drink 8-10 glasses of water daily. It helps your baby grow healthy.",
    descriptionTamil: "தினமும் 8-10 கிளாஸ் தண்ணீர் குடிக்கவும். இது உங்கள் குழந்தை ஆரோக்கியமாக வளர உதவுகிறது.",
    color: "bg-chart-4",
  },
  {
    icon: Moon,
    title: "Rest Well",
    titleTamil: "நன்றாக ஓய்வெடுங்கள்",
    description: "Sleep 8 hours at night. Rest when you feel tired during the day.",
    descriptionTamil: "இரவில் 8 மணி நேரம் தூங்குங்கள். பகலில் சோர்வாக உணரும்போது ஓய்வெடுங்கள்.",
    color: "bg-primary",
  },
  {
    icon: Apple,
    title: "Eat Iron-Rich Foods",
    titleTamil: "இரும்புச்சத்து நிறைந்த உணவுகளை உண்ணுங்கள்",
    description: "Eat green leafy vegetables, jaggery, and dates to prevent anemia.",
    descriptionTamil: "இரத்த சோகையைத் தடுக்க பச்சை இலைக் காய்கறிகள், வெல்லம் மற்றும் பேரீச்சம்பழம் சாப்பிடுங்கள்.",
    color: "bg-safe",
  },
]

export function DailyTips() {
  const [currentTip, setCurrentTip] = useState(0)

  const nextTip = () => setCurrentTip((prev) => (prev + 1) % tips.length)
  const prevTip = () => setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length)

  const tip = tips[currentTip]
  const Icon = tip.icon

  return (
    <Card className="overflow-hidden border-0 shadow-md">
      <CardContent className={cn("p-0", tip.color)}>
        <div className="flex items-center justify-between p-4 text-white">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevTip}
            className="h-8 w-8 text-white hover:bg-white/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 text-center">
            <div className="mx-auto mb-2 w-fit rounded-full bg-white/20 p-2">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">{tip.title}</h3>
            <p className="text-xs opacity-90">{tip.titleTamil}</p>
            <p className="mt-2 text-sm opacity-95">{tip.description}</p>
            <p className="mt-1 text-xs opacity-80">{tip.descriptionTamil}</p>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={nextTip}
            className="h-8 w-8 text-white hover:bg-white/20"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center gap-1.5 bg-white/10 py-2">
          {tips.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentTip(idx)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                idx === currentTip ? "w-4 bg-white" : "w-1.5 bg-white/50"
              )}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
