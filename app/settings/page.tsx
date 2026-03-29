"use client"

import { useState } from "react"
import { ArrowLeft, Globe, Bell, Moon, Volume2, Shield, HelpCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

type SettingToggle = {
  id: string
  label: string
  labelTamil: string
  description: string
  icon: React.ElementType
  enabled: boolean
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingToggle[]>([
    {
      id: "notifications",
      label: "Push Notifications",
      labelTamil: "புஷ் அறிவிப்புகள்",
      description: "Receive health reminders and alerts",
      icon: Bell,
      enabled: true,
    },
    {
      id: "voice",
      label: "Voice Responses",
      labelTamil: "குரல் பின்னூட்டம்",
      description: "AI assistant will speak responses",
      icon: Volume2,
      enabled: true,
    },
    {
      id: "darkMode",
      label: "Dark Mode",
      labelTamil: "இருண்ட பயன்முறை",
      description: "Use dark theme",
      icon: Moon,
      enabled: false,
    },
    {
      id: "locationShare",
      label: "Location Sharing",
      labelTamil: "இருப்பிடப் பகிர்வு",
      description: "Share location in emergencies",
      icon: Shield,
      enabled: true,
    },
  ])

  const [language, setLanguage] = useState("en")

  const toggleSetting = (id: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    )
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card">
        <div className="mx-auto flex max-w-md items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="font-semibold text-foreground">Settings</h1>
            <p className="text-xs text-muted-foreground">அமைப்புகள்</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-md space-y-6 px-4 py-6">
        {/* Language Selection */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Globe className="h-5 w-5 text-primary" />
              Language / மொழி
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { code: "en", label: "English", native: "English" },
              { code: "ta", label: "Tamil", native: "தமிழ்" },
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`flex w-full items-center justify-between rounded-lg p-3 text-left transition-colors ${
                  language === lang.code
                    ? "bg-primary/10 ring-2 ring-primary"
                    : "bg-muted/50 hover:bg-muted"
                }`}
              >
                <div>
                  <p className="font-medium text-foreground">{lang.native}</p>
                  <p className="text-xs text-muted-foreground">{lang.label}</p>
                </div>
                {language === lang.code && (
                  <div className="h-2 w-2 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Toggles */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {settings.map((setting) => {
              const Icon = setting.icon
              return (
                <div
                  key={setting.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-muted p-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{setting.label}</p>
                      <p className="text-xs text-muted-foreground">{setting.labelTamil}</p>
                    </div>
                  </div>
                  <Switch
                    checked={setting.enabled}
                    onCheckedChange={() => toggleSetting(setting.id)}
                  />
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Help & Support */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Help & Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <HelpCircle className="h-5 w-5 text-muted-foreground" />
              <div className="text-left">
                <p className="font-medium">Help Center</p>
                <p className="text-xs text-muted-foreground">Get help using the app</p>
              </div>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Info className="h-5 w-5 text-muted-foreground" />
              <div className="text-left">
                <p className="font-medium">About MATRINOVA</p>
                <p className="text-xs text-muted-foreground">Version 1.0.0</p>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Emergency Numbers */}
        <Card className="border-0 bg-emergency/10 shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground">Emergency Numbers</h3>
            <p className="text-sm text-muted-foreground">அவசர எண்கள்</p>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ambulance</span>
                <a href="tel:108" className="font-medium text-emergency">108</a>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Mother Helpline</span>
                <a href="tel:102" className="font-medium text-emergency">102</a>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Women Helpline</span>
                <a href="tel:181" className="font-medium text-emergency">181</a>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
