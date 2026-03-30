"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { ArrowLeft, Send, Mic, MicOff, Loader2, AlertCircle, CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

const quickSymptoms = [
  { label: "Headache", labelTamil: "தலைவலி", icon: "🤕" },
  { label: "Nausea", labelTamil: "குமட்டல்", icon: "🤢" },
  { label: "Back pain", labelTamil: "முதுகு வலி", icon: "💆" },
  { label: "Swelling", labelTamil: "வீக்கம்", icon: "🦶" },
  { label: "Bleeding", labelTamil: "இரத்தப்போக்கு", icon: "🩸" },
  { label: "No baby movement", labelTamil: "குழந்தையின் அசைவு இல்லை", icon: "👶" },
]

function getRiskLevel(text: string): "safe" | "warning" | "emergency" | null {
  const upperText = text.toUpperCase()
  const normalizedTamil = text.replace(/\s+/g, "")

  if (upperText.includes("EMERGENCY")) return "emergency"
  if (normalizedTamil.includes("அவசரம்")) return "emergency"

  if (upperText.includes("WARNING")) return "warning"
  if (normalizedTamil.includes("எச்சரிக்கை")) return "warning"

  if (upperText.includes("SAFE")) return "safe"
  if (normalizedTamil.includes("பாதுகாப்பு")) return "safe"

  return null
}

export default function SymptomCheckerPage() {
  const router = useRouter()
  const [inputValue, setInputValue] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(true)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyzerRef = useRef<AnalyserNode | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const resolvePreferredVoice = (synthesis: SpeechSynthesis) => {
    const voices = synthesis.getVoices()
    if (voices.length === 0) return null

    const preferred = ["ta-IN", "ta", "en-IN", "en-US"]
    for (const lang of preferred) {
      const matched = voices.find((voice) => voice.lang.toLowerCase() === lang.toLowerCase())
      if (matched) return matched
    }

    for (const lang of preferred) {
      const matched = voices.find((voice) => voice.lang.toLowerCase().startsWith(lang.toLowerCase()))
      if (matched) return matched
    }

    return voices[0] ?? null
  }

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/analyze-symptoms" }),
    onError: (error) => {
      console.error("Chat error:", error)
      alert("Something went wrong. Please try again later.")
    }
  })

  const isLoading = status === "streaming" || status === "submitted"

  const stopVoiceSession = () => {
    setIsListening(false)
    window.speechSynthesis.cancel()

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort()
      } catch {
        recognitionRef.current.stop()
      }
    }

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {})
      audioContextRef.current = null
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop())
      mediaStreamRef.current = null
    }

    analyzerRef.current = null
  }

  const disposeRecognition = () => {
    if (!recognitionRef.current) return

    recognitionRef.current.onresult = null
    recognitionRef.current.onerror = null
    recognitionRef.current.onend = null

    try {
      recognitionRef.current.abort()
    } catch {
      recognitionRef.current.stop()
    }

    recognitionRef.current = null
  }

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = false
        recognition.lang = "ta-IN"

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setInputValue(transcript)
          setIsListening(false)
        }

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error)
          setIsListening(false)
        }
        recognition.onend = () => setIsListening(false)

        recognitionRef.current = recognition
      } else {
        setSpeechSupported(false)
      }
    }

    return () => {
      stopVoiceSession()
      disposeRecognition()
    }
  }, [])

  // Stop voice immediately when browser-level navigation happens.
  useEffect(() => {
    const handleNavigationAway = () => {
      stopVoiceSession()
    }

    window.addEventListener("popstate", handleNavigationAway)
    window.addEventListener("pagehide", handleNavigationAway)

    return () => {
      window.removeEventListener("popstate", handleNavigationAway)
      window.removeEventListener("pagehide", handleNavigationAway)
    }
  }, [])

  // Voice Visualizer Effect
  useEffect(() => {
    if (isListening) {
      const startVisualizer = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
          const audioContext = new AudioContext()
          const source = audioContext.createMediaStreamSource(stream)
          const analyzer = audioContext.createAnalyser()
          
          analyzer.fftSize = 256
          source.connect(analyzer)
          
          audioContextRef.current = audioContext
          analyzerRef.current = analyzer
          mediaStreamRef.current = stream
          
          const bufferLength = analyzer.frequencyBinCount
          const dataArray = new Uint8Array(bufferLength)
          
            const draw = () => {
            if (!isListening || !canvasRef.current || !analyzerRef.current) return
            
            const canvas = canvasRef.current
            const ctx = canvas.getContext("2d")
            if (!ctx) return
            
            const width = canvas.width
            const height = canvas.height
            
            animationFrameRef.current = requestAnimationFrame(draw)
            analyzerRef.current.getByteFrequencyData(dataArray)
            
            ctx.clearRect(0, 0, width, height)
            
            // Get color from CSS variable or fallback
            ctx.fillStyle = "#ff5a5f" // Fallback to a warm primary color
            
            const barWidth = (width / bufferLength) * 2
            let x = 0
            
            for (let i = 0; i < bufferLength; i++) {
              const barHeight = (dataArray[i] / 255) * height
              ctx.fillRect(x, height / 2 - barHeight / 2, barWidth, barHeight)
              x += barWidth + 1
            }
          }
          
          draw()
        } catch (err) {
          console.error("Error accessing microphone:", err)
        }
      }
      
      startVisualizer()
    } else {
      stopVoiceSession()
    }
  }, [isListening])

  // TTS for AI Responses
  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage && lastMessage.role === "assistant" && status === "ready") {
      const text = lastMessage.parts
        ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
        .map((p) => p.text)
        .join("") || ""
      
      if (!text.trim()) return

      const synthesis = window.speechSynthesis
      synthesis.cancel()

      const speak = () => {
        const utterance = new SpeechSynthesisUtterance(text)
        const preferredVoice = resolvePreferredVoice(synthesis)

        if (preferredVoice) {
          utterance.voice = preferredVoice
          utterance.lang = preferredVoice.lang
        } else {
          // Fallback language for browsers where voice list is delayed/unavailable.
          utterance.lang = "en-US"
        }

        synthesis.speak(utterance)
      }

      if (synthesis.getVoices().length > 0) {
        speak()
      } else {
        // Some browsers load voices asynchronously after first interaction.
        const handleVoicesChanged = () => {
          synthesis.removeEventListener("voiceschanged", handleVoicesChanged)
          speak()
        }

        synthesis.addEventListener("voiceschanged", handleVoicesChanged)
        setTimeout(() => {
          synthesis.removeEventListener("voiceschanged", handleVoicesChanged)
          speak()
        }, 300)
      }
    }
  }, [messages, status])

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const toggleListening = () => {
    if (!recognitionRef.current) return
    if (isListening) {
      stopVoiceSession()
    } else {
      window.speechSynthesis.cancel() // Stop speaking if user starts talking
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const handleBack = () => {
    stopVoiceSession()
    disposeRecognition()
    router.push("/")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return
    console.log("Submitting:", inputValue)
    sendMessage({ text: inputValue })
    setInputValue("")
  }

  const handleQuickSymptom = (symptom: string) => {
    console.log("Quick symptom:", symptom)
    sendMessage({ text: `I am experiencing ${symptom}` })
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-semibold text-foreground">Symptom Checker</h1>
            <p className="text-xs text-muted-foreground">அறிகுறிகள் சரிபார்ப்பு - Tell us how you feel</p>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mx-auto max-w-3xl space-y-4">
          {isListening && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-6">
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-primary/20">
                  <div className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
                  <div className="absolute inset-0 animate-pulse rounded-full bg-primary/30" />
                  <canvas ref={canvasRef} width="128" height="64" className="h-16 w-24 opacity-60" />
                  <Mic className="absolute h-10 w-10 text-primary opacity-40" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">Listening...</h3>
                  <p className="text-muted-foreground">கேட்டுக் கொண்டிருக்கிறோம்...</p>
                </div>
                <Button variant="outline" onClick={toggleListening} className="rounded-full px-8">
                  Stop
                </Button>
              </div>
            </div>
          )}
          {messages.length === 0 ? (
            <div className="space-y-6 py-8">
              {/* Welcome Message */}
              <Card className="border-0 bg-primary/10">
                <CardContent className="p-4 text-center">
                  <div className="mx-auto mb-3 w-fit rounded-full bg-primary/20 p-4">
                    <Mic className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">How are you feeling?</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    நீங்கள் எப்படி உணர்கிறீர்கள்? Speak or type your symptoms
                  </p>
                </CardContent>
              </Card>

              {/* Quick Symptoms */}
              <div>
                <p className="mb-3 text-sm font-medium text-muted-foreground">Common symptoms:</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                  {quickSymptoms.map((symptom) => (
                    <Button
                      key={symptom.label}
                      variant="outline"
                      className="h-auto flex-col gap-1 py-3"
                      onClick={() => handleQuickSymptom(symptom.label)}
                    >
                      <span className="text-lg">{symptom.icon}</span>
                      <span className="text-sm">{symptom.label}</span>
                      <span className="text-xs text-muted-foreground">{symptom.labelTamil}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => {
                const isUser = message.role === "user"
                const text = message.parts
                  ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
                  .map((p) => p.text)
                  .join("") || ""
                const risk = !isUser ? getRiskLevel(text) : null

                return (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      isUser ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-3",
                        isUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-card shadow-md"
                      )}
                    >
                      {!isUser && risk && (
                        <div
                          className={cn(
                            "mb-2 flex items-center gap-2 rounded-lg px-3 py-1.5",
                            risk === "safe" && "bg-safe/20 text-safe",
                            risk === "warning" && "bg-warning/20 text-warning-foreground",
                            risk === "emergency" && "bg-emergency/20 text-emergency"
                          )}
                        >
                          {risk === "safe" && <CheckCircle className="h-4 w-4" />}
                          {risk === "warning" && <AlertTriangle className="h-4 w-4" />}
                          {risk === "emergency" && <AlertCircle className="h-4 w-4" />}
                          <span className="text-sm font-semibold capitalize">{risk}</span>
                        </div>
                      )}
                      <p className={cn(
                        "whitespace-pre-wrap text-sm",
                        isUser ? "text-primary-foreground" : "text-foreground"
                      )}>
                        {text}
                      </p>
                    </div>
                  </div>
                )
              })}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-card px-4 py-3 shadow-md">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </main>

      {/* Input Area */}
      <div className="sticky bottom-0 border-t border-border bg-card p-4">
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl items-center gap-2">
          {speechSupported && (
            <Button
              type="button"
              variant={isListening ? "destructive" : "secondary"}
              size="icon"
              onClick={toggleListening}
              className={cn(
                "shrink-0",
                isListening && "animate-pulse"
              )}
            >
              {isListening ? (
                <MicOff className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>
          )}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type or speak your symptoms..."
            className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!inputValue.trim() || isLoading}
            className="shrink-0 rounded-full"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}


