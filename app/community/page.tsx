"use client"

import { useState } from "react"
import { ArrowLeft, Phone, MessageCircle, MapPin, Star, Heart, Users, Stethoscope, Baby } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import Link from "next/link"

type CommunityMember = {
  id: string
  name: string
  nameTamil: string
  role: "asha" | "anm" | "mother" | "dai"
  experience?: string
  distance: string
  available: boolean
  phone: string
  rating?: number
  specialties?: string[]
}

const members: CommunityMember[] = [
  {
    id: "1",
    name: "Sunita Devi",
    nameTamil: "சுனிதா தேவி",
    role: "asha",
    experience: "5 years",
    distance: "0.5 km",
    available: true,
    phone: "+91-9876543210",
    rating: 4.8,
    specialties: ["Prenatal Care", "Breastfeeding"],
  },
  {
    id: "2",
    name: "Kamla Ben",
    nameTamil: "கமலா பென்",
    role: "dai",
    experience: "20 years",
    distance: "1 km",
    available: true,
    phone: "+91-9876543211",
    rating: 4.9,
    specialties: ["Traditional Delivery", "Postpartum Care"],
  },
  {
    id: "3",
    name: "Nurse Priya",
    nameTamil: "செவிலியர் பிரியா",
    role: "anm",
    experience: "8 years",
    distance: "3 km",
    available: false,
    phone: "+91-9876543212",
    rating: 4.7,
    specialties: ["Vaccinations", "High-Risk Pregnancy"],
  },
  {
    id: "4",
    name: "Meena",
    nameTamil: "மீனா",
    role: "mother",
    experience: "2 children",
    distance: "0.2 km",
    available: true,
    phone: "+91-9876543213",
  },
  {
    id: "5",
    name: "Lakshmi",
    nameTamil: "லட்சுமி",
    role: "mother",
    experience: "3 children",
    distance: "0.8 km",
    available: true,
    phone: "+91-9876543214",
  },
]

const roleConfig = {
  asha: {
    label: "ASHA Worker",
    labelTamil: "ஆஷா பணியாளர்",
    icon: Stethoscope,
    color: "bg-primary text-primary-foreground",
    bgLight: "bg-primary/10",
  },
  anm: {
    label: "ANM Nurse",
    labelTamil: "ஏஎன்எம் செவிலியர்",
    icon: Heart,
    color: "bg-emergency text-emergency-foreground",
    bgLight: "bg-emergency/10",
  },
  mother: {
    label: "Experienced Mother",
    labelTamil: "அனுபவம் வாய்ந்த தாய்",
    icon: Baby,
    color: "bg-accent text-accent-foreground",
    bgLight: "bg-accent/10",
  },
  dai: {
    label: "Traditional Midwife",
    labelTamil: "பாரம்பரிய மருத்துவச்சி",
    icon: Users,
    color: "bg-chart-3 text-white",
    bgLight: "bg-chart-3/10",
  },
}

type FilterRole = "all" | "asha" | "anm" | "mother" | "dai"

export default function CommunityPage() {
  const [filterRole, setFilterRole] = useState<FilterRole>("all")

  const filteredMembers = filterRole === "all" 
    ? members 
    : members.filter((m) => m.role === filterRole)

  const callMember = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-accent">
        <div className="mx-auto flex max-w-md items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" className="text-accent-foreground hover:bg-white/20" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="text-accent-foreground">
            <h1 className="font-semibold">Village Sisters</h1>
            <p className="text-xs opacity-90">கிராம சகோதரிகள் - Community Support</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-md space-y-6 px-4 py-6">
        {/* Info Card */}
        <Card className="border-0 bg-accent/10">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-accent p-2">
                <Users className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Connect with Support</h3>
                <p className="text-sm text-muted-foreground">
                  Find ASHA workers, nurses, and experienced mothers near you who can help during pregnancy.
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  உங்களுக்கு அருகிலுள்ள ஆஷா பணியாளர்கள், செவிலியர்கள் மற்றும் அனுபவம் வாய்ந்த தாய்மார்களுடன் இணையுங்கள்
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Role Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={filterRole === "all" ? "default" : "outline"}
            size="sm"
            className="shrink-0"
            onClick={() => setFilterRole("all")}
          >
            All
          </Button>
          {(Object.keys(roleConfig) as FilterRole[]).filter(k => k !== "all").map((role) => (
            <Button
              key={role}
              variant={filterRole === role ? "default" : "outline"}
              size="sm"
              className="shrink-0"
              onClick={() => setFilterRole(role as FilterRole)}
            >
              {roleConfig[role].label}
            </Button>
          ))}
        </div>

        {/* Members List */}
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
            <MapPin className="h-5 w-5 text-primary" />
            Near You ({filteredMembers.length})
          </h2>
          
          <div className="space-y-3">
            {filteredMembers.map((member) => {
              const config = roleConfig[member.role]
              const Icon = config.icon
              
              return (
                <Card key={member.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className={cn("h-12 w-12", config.bgLight)}>
                        <AvatarFallback className={config.color}>
                          {member.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-foreground">{member.name}</h3>
                            <p className="text-xs text-muted-foreground">{member.nameTamil}</p>
                          </div>
                          {member.available ? (
                            <span className="rounded-full bg-safe/10 px-2 py-0.5 text-xs font-medium text-safe">
                              Available
                            </span>
                          ) : (
                            <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                              Busy
                            </span>
                          )}
                        </div>
                        
                        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Icon className="h-3 w-3" />
                            {config.label}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {member.distance}
                          </span>
                        </div>
                        
                        {member.rating && (
                          <div className="mt-1 flex items-center gap-1">
                            <Star className="h-3 w-3 fill-warning text-warning" />
                            <span className="text-xs font-medium">{member.rating}</span>
                            <span className="text-xs text-muted-foreground">
                              • {member.experience}
                            </span>
                          </div>
                        )}
                        
                        {member.specialties && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {member.specialties.map((s) => (
                              <span
                                key={s}
                                className="rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="mt-3 flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1"
                            onClick={() => callMember(member.phone)}
                          >
                            <Phone className="h-4 w-4" />
                            Call
                          </Button>
                          <Button size="sm" variant="secondary" className="gap-1">
                            <MessageCircle className="h-4 w-4" />
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Help Card */}
        <Card className="border-0 bg-primary text-primary-foreground">
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold">Want to become a Village Sister?</h3>
            <p className="mt-1 text-sm opacity-90">
              Help other mothers in your community
            </p>
            <Button variant="secondary" size="sm" className="mt-3">
              Learn More
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
