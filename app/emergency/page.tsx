"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Phone, MapPin, AlertTriangle, Users, MessageCircle, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"

type EmergencyContact = {
  id: string
  name: string
  role: string
  phone: string
  distance?: string
}

const emergencyContacts: EmergencyContact[] = [
  { id: "1", name: "ASHA Worker - Sunita", role: "Health Worker", phone: "+91-9876543210", distance: "0.5 km" },
  { id: "2", name: "PHC Rampur", role: "Primary Health Center", phone: "+91-1234567890", distance: "3 km" },
  { id: "3", name: "District Hospital", role: "Hospital", phone: "108", distance: "15 km" },
  { id: "4", name: "Husband - Rajesh", role: "Family", phone: "+91-9988776655" },
]

type AlertStatus = "idle" | "sending" | "sent" | "error"

export default function EmergencyPage() {
  const [alertStatus, setAlertStatus] = useState<AlertStatus>("idle")
  const [countdown, setCountdown] = useState(5)
  const [isCounting, setIsCounting] = useState(false)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)

  // Get user location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        () => {
          // Location access denied - continue without location
        }
      )
    }
  }, [])

  // Countdown timer for SOS
  useEffect(() => {
    if (isCounting && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (isCounting && countdown === 0) {
      sendEmergencyAlert()
    }
  }, [isCounting, countdown])

  const startSOSCountdown = () => {
    setIsCounting(true)
    setCountdown(5)
  }

  const cancelSOS = () => {
    setIsCounting(false)
    setCountdown(5)
  }

  const sendEmergencyAlert = async () => {
    setIsCounting(false)
    setAlertStatus("sending")

    // Simulate sending SMS/alerts
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setAlertStatus("sent")
  }

  const callContact = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-emergency">
        <div className="mx-auto flex max-w-md items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="text-white">
            <h1 className="font-semibold">Emergency Help</h1>
            <p className="text-xs opacity-90">அவசர உதவி</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-md space-y-6 px-4 py-6">
        {/* SOS Button */}
        <Card className="overflow-hidden border-0 shadow-xl">
          <CardContent className="p-6">
            {alertStatus === "sent" ? (
              <div className="flex flex-col items-center py-4 text-center">
                <div className="mb-4 rounded-full bg-safe p-4">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Alert Sent!</h2>
                <p className="mt-2 text-muted-foreground">
                  Help is on the way. Your contacts have been notified.
                </p>
                <p className="text-sm text-muted-foreground">
                  உதவி வந்து கொண்டிருக்கிறது. உங்கள் தொடர்புகளுக்கு அறிவிக்கப்பட்டுள்ளது.
                </p>
                <Button
                  className="mt-4"
                  variant="outline"
                  onClick={() => setAlertStatus("idle")}
                >
                  Done
                </Button>
              </div>
            ) : alertStatus === "sending" ? (
              <div className="flex flex-col items-center py-8 text-center">
                <Loader2 className="mb-4 h-16 w-16 animate-spin text-emergency" />
                <h2 className="text-xl font-bold text-foreground">Sending Alert...</h2>
                <p className="mt-2 text-muted-foreground">
                  Contacting your emergency contacts
                </p>
              </div>
            ) : isCounting ? (
              <div className="flex flex-col items-center py-4 text-center">
                <div className="relative">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-emergency text-white">
                    <span className="text-5xl font-bold">{countdown}</span>
                  </div>
                  <div className="absolute inset-0 animate-ping rounded-full bg-emergency opacity-30" />
                </div>
                <p className="mt-4 text-lg font-semibold text-foreground">Sending alert in {countdown}s...</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={cancelSOS}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center">
                <button
                  onClick={startSOSCountdown}
                  className="group relative flex h-36 w-36 items-center justify-center rounded-full bg-emergency text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  <div className="text-center">
                    <AlertTriangle className="mx-auto h-12 w-12" />
                    <span className="mt-1 block text-2xl font-bold">SOS</span>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-emergency opacity-20 group-hover:animate-ping" />
                </button>
                <p className="mt-4 text-lg font-semibold text-foreground">அவசர எச்சரிக்கைக்கு அழுத்தவும்</p>
                <p className="text-sm text-muted-foreground">அவசர எச்சரிக்கைக்கு இதை அழுத்தவும்</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  This will notify your family and health workers with your location
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Location Info */}
        {location && (
          <Card className="border-0 bg-primary/10">
            <CardContent className="flex items-center gap-3 p-4">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Location detected</p>
                <p className="text-xs text-muted-foreground">
                  Your location will be shared with emergency contacts
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Emergency Contacts */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Emergency Contacts</h2>
          <div className="space-y-3">
            {emergencyContacts.map((contact) => (
              <Card key={contact.id} className="border-0 shadow-sm">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full",
                      contact.role === "Hospital" ? "bg-emergency/10" : "bg-primary/10"
                    )}>
                      {contact.role === "Family" ? (
                        <Users className="h-5 w-5 text-primary" />
                      ) : contact.role === "Hospital" ? (
                        <AlertTriangle className="h-5 w-5 text-emergency" />
                      ) : (
                        <MessageCircle className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {contact.role}
                        {contact.distance && ` • ${contact.distance}`}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-2"
                    onClick={() => callContact(contact.phone)}
                  >
                    <Phone className="h-4 w-4" />
                    Call
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Call Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            className="h-auto flex-col gap-2 bg-emergency py-4 hover:bg-emergency/90"
            onClick={() => callContact("108")}
          >
            <Phone className="h-6 w-6" />
            <span className="text-sm font-semibold">Call 108</span>
            <span className="text-xs opacity-90">Ambulance</span>
          </Button>
          <Button
            className="h-auto flex-col gap-2 py-4"
            variant="secondary"
            onClick={() => callContact("102")}
          >
            <Phone className="h-6 w-6" />
            <span className="text-sm font-semibold">Call 102</span>
            <span className="text-xs opacity-70">Mother Helpline</span>
          </Button>
        </div>
      </main>
    </div>
  )
}
