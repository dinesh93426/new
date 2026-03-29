"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, MapPin, Phone, Navigation, Clock, Star, Hospital, Ambulance } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"

type HospitalInfo = {
  id: string
  name: string
  nameTamil: string
  type: "phc" | "chc" | "district" | "private"
  distance: string
  address: string
  phone: string
  hours: string
  rating?: number
  services: string[]
  hasAmbulance: boolean
}

const hospitals: HospitalInfo[] = [
  {
    id: "1",
    name: "Primary Health Center Rampur",
    nameTamil: "ராம்பூர் முதன்மை சுகாதார மையம்",
    type: "phc",
    distance: "3 km",
    address: "Main Road, Rampur Village",
    phone: "+91-1234567890",
    hours: "24 hours",
    rating: 4.2,
    services: ["Delivery", "Prenatal Care", "Vaccinations"],
    hasAmbulance: true,
  },
  {
    id: "2",
    name: "Community Health Center",
    nameTamil: "சமூக சுகாதார மையம்",
    type: "chc",
    distance: "8 km",
    address: "Block Road, Sundarpur",
    phone: "+91-1234567891",
    hours: "24 hours",
    rating: 4.5,
    services: ["C-Section", "NICU", "Blood Bank", "Ultrasound"],
    hasAmbulance: true,
  },
  {
    id: "3",
    name: "District Hospital Varanasi",
    nameTamil: "வரணாசி மாவட்ட மருத்துவமனை",
    type: "district",
    distance: "15 km",
    address: "Civil Lines, Varanasi",
    phone: "+91-1234567892",
    hours: "24 hours",
    rating: 4.0,
    services: ["All Services", "ICU", "NICU", "Specialists"],
    hasAmbulance: true,
  },
  {
    id: "4",
    name: "Shanti Hospital",
    nameTamil: "சாந்தி மருத்துவமனை",
    type: "private",
    distance: "12 km",
    address: "MG Road, Varanasi",
    phone: "+91-1234567893",
    hours: "24 hours",
    rating: 4.7,
    services: ["Premium Care", "Private Rooms", "Specialists"],
    hasAmbulance: true,
  },
]

const typeConfig = {
  phc: { label: "PHC", color: "bg-safe" },
  chc: { label: "CHC", color: "bg-primary" },
  district: { label: "District", color: "bg-accent" },
  private: { label: "Private", color: "bg-chart-3" },
}

export default function HospitalPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null)

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        () => {}
      )
    }
  }, [])

  const openDirections = (hospital: HospitalInfo) => {
    // Open in Google Maps
    const query = encodeURIComponent(hospital.address)
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank")
  }

  const callHospital = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-chart-4">
        <div className="mx-auto flex max-w-md items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="text-white">
            <h1 className="font-semibold">Find Hospital</h1>
            <p className="text-xs opacity-90">மருத்துவமனையைத் தேடுங்கள்</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-md space-y-6 px-4 py-6">
        {/* Emergency Call */}
        <Card className="border-0 bg-emergency text-white shadow-lg">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/20 p-2">
                <Ambulance className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold">Call Ambulance</p>
                <p className="text-sm opacity-90">ஆம்புலன்ஸ் அழைக்க</p>
              </div>
            </div>
            <Button
              className="bg-white text-emergency hover:bg-white/90"
              onClick={() => callHospital("108")}
            >
              <Phone className="mr-1 h-4 w-4" />
              108
            </Button>
          </CardContent>
        </Card>

        {/* Location Status */}
        {location ? (
          <div className="flex items-center gap-2 text-sm text-safe">
            <MapPin className="h-4 w-4" />
            <span>Location detected - showing nearest hospitals</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Enable location for accurate distances</span>
          </div>
        )}

        {/* Hospital List */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Nearby Hospitals</h2>
          <div className="space-y-3">
            {hospitals.map((hospital) => {
              const config = typeConfig[hospital.type]
              const isSelected = selectedHospital === hospital.id
              
              return (
                <Card
                  key={hospital.id}
                  className={cn(
                    "cursor-pointer border-0 shadow-sm transition-all",
                    isSelected && "ring-2 ring-primary"
                  )}
                  onClick={() => setSelectedHospital(isSelected ? null : hospital.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={cn("rounded-full p-2", config.color, "text-white")}>
                          <Hospital className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{hospital.name}</h3>
                          </div>
                          <p className="text-xs text-muted-foreground">{hospital.nameTamil}</p>
                          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {hospital.distance}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {hospital.hours}
                            </span>
                            {hospital.rating && (
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-warning text-warning" />
                                {hospital.rating}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className={cn("rounded-full px-2 py-0.5 text-xs text-white", config.color)}>
                        {config.label}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="mt-4 border-t border-border pt-4">
                        <p className="text-sm text-muted-foreground">{hospital.address}</p>
                        
                        <div className="mt-3 flex flex-wrap gap-1">
                          {hospital.services.map((service) => (
                            <span
                              key={service}
                              className="rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                            >
                              {service}
                            </span>
                          ))}
                        </div>

                        <div className="mt-4 flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 gap-1"
                            onClick={(e) => {
                              e.stopPropagation()
                              callHospital(hospital.phone)
                            }}
                          >
                            <Phone className="h-4 w-4" />
                            Call
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 gap-1"
                            onClick={(e) => {
                              e.stopPropagation()
                              openDirections(hospital)
                            }}
                          >
                            <Navigation className="h-4 w-4" />
                            Directions
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Info Card */}
        <Card className="border-0 bg-muted/50">
          <CardContent className="p-4 text-center text-sm text-muted-foreground">
            <p>Tap on a hospital to see more details and get directions</p>
            <p className="mt-1 text-xs text-muted-foreground">மேலும் தகவலுக்கு ஒரு மருத்துவமனையைத் தட்டவும்</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
