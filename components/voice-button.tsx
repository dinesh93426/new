"use client"

import { useState, useRef, useEffect } from "react"
import { Mic, MicOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface VoiceButtonProps {
  onTranscript: (transcript: string) => void
  isProcessing?: boolean
  size?: "default" | "large"
  className?: string
}

export function VoiceButton({ onTranscript, isProcessing = false, size = "default", className }: VoiceButtonProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = false
        recognition.lang = "ta-IN" // Default to Tamil

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          onTranscript(transcript)
          setIsListening(false)
        }

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error)
          setIsListening(false)
        }

        recognition.onend = () => {
          setIsListening(false)
        }

        recognitionRef.current = recognition
      } else {
        setIsSupported(false)
      }
    }
  }, [onTranscript])

  const toggleListening = () => {
    if (!recognitionRef.current) return

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  if (!isSupported) {
    return (
      <Button variant="secondary" disabled className={className}>
        <MicOff className="h-5 w-5" />
        <span className="ml-2">Voice not supported</span>
      </Button>
    )
  }

  const isLarge = size === "large"

  return (
    <Button
      onClick={toggleListening}
      disabled={isProcessing}
      className={cn(
        "relative transition-all",
        isLarge ? "h-24 w-24 rounded-full" : "h-12 w-12 rounded-full",
        isListening ? "bg-emergency hover:bg-emergency/90 animate-pulse" : "bg-primary hover:bg-primary/90",
        className
      )}
    >
      {isProcessing ? (
        <Loader2 className={cn("animate-spin", isLarge ? "h-10 w-10" : "h-6 w-6")} />
      ) : isListening ? (
        <>
          <Mic className={cn(isLarge ? "h-10 w-10" : "h-6 w-6")} />
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm text-foreground">
            Listening...
          </span>
        </>
      ) : (
        <Mic className={cn(isLarge ? "h-10 w-10" : "h-6 w-6")} />
      )}
      
      {/* Pulse rings when listening */}
      {isListening && !isProcessing && (
        <>
          <span className="absolute inset-0 animate-ping rounded-full bg-emergency opacity-20" />
          <span className="absolute inset-0 animate-pulse rounded-full bg-emergency opacity-10" />
        </>
      )}
    </Button>
  )
}


