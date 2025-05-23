"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Mic, MicOff, Camera, CameraOff, PhoneOff, ScreenShare, ScreenShareOff, Volume2, VolumeX } from "lucide-react"

interface CallScreenProps {
  participant: string
  callType: "audio" | "video"
  onEndCall: () => void
}

export default function CallScreen({ participant, callType, onEndCall }: CallScreenProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isCameraOff, setIsCameraOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isSpeakerOff, setIsSpeakerOff] = useState(false)
  const [callDuration, setCallDuration] = useState(0)

  // Call timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Format call duration as mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const toggleMute = () => setIsMuted(!isMuted)
  const toggleCamera = () => setIsCameraOff(!isCameraOff)
  const toggleScreenShare = () => setIsScreenSharing(!isScreenSharing)
  const toggleSpeaker = () => setIsSpeakerOff(!isSpeakerOff)

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      {/* Call status bar */}
      <div className="p-4 text-center text-white">
        <p className="text-sm opacity-80">{formatDuration(callDuration)}</p>
      </div>

      {/* Main call area */}
      <div className="flex-1 flex items-center justify-center">
        {callType === "video" && !isCameraOff ? (
          <div className="relative w-full h-full max-w-4xl max-h-[70vh] mx-auto">
            {/* Remote video (simulated) */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center">
              {isScreenSharing ? (
                <div className="w-full h-full p-4 flex items-center justify-center">
                  <div className="bg-white w-full h-full rounded-lg flex items-center justify-center">
                    <p className="text-slate-800 text-xl font-medium">Screen sharing active</p>
                  </div>
                </div>
              ) : (
                <Avatar className="w-32 h-32">
                  <AvatarFallback className="text-4xl">
                    {participant
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>

            {/* Local video (simulated) */}
            <div className="absolute bottom-4 right-4 w-32 h-48 bg-slate-700 rounded-lg overflow-hidden border-2 border-white">
              <div className="w-full h-full flex items-center justify-center">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="text-xl">JD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-8">
            <Avatar className="w-32 h-32 mx-auto">
              <AvatarFallback className="text-4xl">
                {participant
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h3 className="mt-6 text-2xl font-medium text-white">{participant}</h3>
            <p className="mt-2 text-slate-400">{callType === "audio" ? "Audio call" : "Camera off"}</p>
            <p className="mt-1 text-slate-400">{formatDuration(callDuration)}</p>
          </div>
        )}
      </div>

      {/* Call controls */}
      <div className="p-8 flex items-center justify-center space-x-4">
        <Button
          size="icon"
          variant={isMuted ? "default" : "secondary"}
          className="h-12 w-12 rounded-full"
          onClick={toggleMute}
        >
          {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </Button>

        {callType === "video" && (
          <Button
            size="icon"
            variant={isCameraOff ? "default" : "secondary"}
            className="h-12 w-12 rounded-full"
            onClick={toggleCamera}
          >
            {isCameraOff ? <CameraOff className="h-6 w-6" /> : <Camera className="h-6 w-6" />}
          </Button>
        )}

        <Button
          size="icon"
          variant={isSpeakerOff ? "default" : "secondary"}
          className="h-12 w-12 rounded-full"
          onClick={toggleSpeaker}
        >
          {isSpeakerOff ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
        </Button>

        {callType === "video" && (
          <Button
            size="icon"
            variant={isScreenSharing ? "default" : "secondary"}
            className="h-12 w-12 rounded-full"
            onClick={toggleScreenShare}
          >
            {isScreenSharing ? <ScreenShareOff className="h-6 w-6" /> : <ScreenShare className="h-6 w-6" />}
          </Button>
        )}

        <Button size="icon" className="h-12 w-12 rounded-full bg-red-600 hover:bg-red-700" onClick={onEndCall}>
          <PhoneOff className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

