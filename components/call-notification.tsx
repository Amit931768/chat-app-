"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PhoneCall, PhoneOff, Video } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface CallNotificationProps {
  caller: string
  callType: "audio" | "video"
  onAccept: () => void
  onDecline: () => void
}

export default function CallNotification({ caller, callType, onAccept, onDecline }: CallNotificationProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [ringTone, setRingTone] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element for ringtone
    const audio = new Audio("/sounds/ringtone.mp3")
    audio.loop = true
    audio.play().catch((e) => console.log("Audio play failed:", e))
    setRingTone(audio)

    return () => {
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [])

  const handleAccept = () => {
    if (ringTone) {
      ringTone.pause()
      ringTone.currentTime = 0
    }
    setIsOpen(false)
    onAccept()
  }

  const handleDecline = () => {
    if (ringTone) {
      ringTone.pause()
      ringTone.currentTime = 0
    }
    setIsOpen(false)
    onDecline()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Incoming {callType === "audio" ? "Audio" : "Video"} Call</DialogTitle>
          <DialogDescription className="text-center">{caller} is calling you</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-6">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarFallback className="text-3xl">
              {caller
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex justify-center space-x-4 mt-6">
            <Button variant="destructive" size="icon" className="h-12 w-12 rounded-full" onClick={handleDecline}>
              <PhoneOff className="h-6 w-6" />
            </Button>

            <Button
              variant="default"
              size="icon"
              className="h-12 w-12 rounded-full bg-green-600 hover:bg-green-700"
              onClick={handleAccept}
            >
              {callType === "audio" ? <PhoneCall className="h-6 w-6" /> : <Video className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

