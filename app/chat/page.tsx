"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Send,
  Menu,
  LogOut,
  Users,
  Settings,
  Bell,
  PhoneCall,
  Video,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  PhoneOff,
} from "lucide-react"
import ChatList from "@/components/chat-list"
import MessageList from "@/components/message-list"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function ChatPage() {
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [callStatus, setCallStatus] = useState<null | "incoming" | "outgoing" | "active">(null)
  const [callType, setCallType] = useState<"audio" | "video">("audio")
  const [isMuted, setIsMuted] = useState(false)
  const [isCameraOff, setIsCameraOff] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const handleLogout = () => {
    // In a real app, you would clear the authentication state
    router.push("/")
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() === "") return

    // In a real app, you would send the message to your backend
    console.log("Sending message:", message)
    setMessage("")
  }

  const startCall = (type: "audio" | "video") => {
    setCallType(type)
    setCallStatus("outgoing")

    // Simulate call being answered after 2 seconds
    setTimeout(() => {
      setCallStatus("active")
    }, 2000)
  }

  const endCall = () => {
    setCallStatus(null)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleCamera = () => {
    setIsCameraOff(!isCameraOff)
  }

  // Simulate incoming call
  useEffect(() => {
    if (selectedChat) {
      const timer = setTimeout(() => {
        if (Math.random() > 0.7 && !callStatus) {
          // 30% chance of incoming call
          setCallType(Math.random() > 0.5 ? "audio" : "video")
          setCallStatus("incoming")
        }
      }, 10000) // After 10 seconds

      return () => clearTimeout(timer)
    }
  }, [selectedChat, callStatus])

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      {/* Mobile sidebar */}
      {isMobile && (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden absolute top-4 left-4 z-10">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[280px]">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b">
                <h2 className="text-xl font-bold">ChatApp</h2>
              </div>
              <ChatList onSelectChat={setSelectedChat} selectedChat={selectedChat} />
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Desktop sidebar */}
      {!isMobile && (
        <div className="w-80 border-r border-slate-200 dark:border-slate-800 flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h2 className="text-xl font-bold">ChatApp</h2>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Input type="search" placeholder="Search conversations..." className="pl-8" />
            </div>
          </div>

          <Tabs defaultValue="chats" className="flex-1">
            <TabsList className="grid grid-cols-2 mx-4">
              <TabsTrigger value="chats">Chats</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
            </TabsList>
            <TabsContent value="chats" className="flex-1 p-0">
              <ChatList onSelectChat={setSelectedChat} selectedChat={selectedChat} />
            </TabsContent>
            <TabsContent value="contacts" className="flex-1 p-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Online Contacts</h3>
                <div className="space-y-2">
                  {["Arjun Sharma", "Priya Patel", "Rahul Verma"].map((name) => (
                    <div
                      key={name}
                      className="flex items-center space-x-3 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback>
                            {name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Amit Singh</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Online</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>
                    {selectedChat
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedChat}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Online • Typing...</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={() => startCall("audio")}>
                  <PhoneCall className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => startCall("video")}>
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Users className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <MessageList selectedChat={selectedChat} />
            </ScrollArea>

            {/* Message input */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-8">
              <Users className="h-12 w-12 mx-auto text-slate-400" />
              <h3 className="mt-4 text-lg font-medium">Select a conversation</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Choose a contact or group to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Call UI */}
      {callStatus && (
        <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center">
          <div className="relative w-full h-full max-w-3xl max-h-[600px]">
            {/* Video container */}
            <div className="w-full h-full rounded-lg overflow-hidden bg-slate-900 flex items-center justify-center">
              {callType === "video" && callStatus === "active" && !isCameraOff ? (
                <div className="relative w-full h-full">
                  {/* Remote video (simulated) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <Avatar className="w-32 h-32">
                      <AvatarFallback className="text-4xl">
                        {selectedChat
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
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
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarFallback className="text-3xl">
                      {selectedChat
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="mt-6 text-xl font-medium text-white">{selectedChat}</h3>
                  <p className="mt-2 text-slate-400">
                    {callStatus === "incoming"
                      ? "Incoming call..."
                      : callStatus === "outgoing"
                        ? "Calling..."
                        : callType === "audio"
                          ? "On call"
                          : "Camera off"}
                  </p>
                </div>
              )}
            </div>

            {/* Call controls */}
            <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center space-x-4">
              {callStatus === "incoming" ? (
                <>
                  <Button size="icon" className="h-12 w-12 rounded-full bg-red-600 hover:bg-red-700" onClick={endCall}>
                    <PhoneOff className="h-6 w-6" />
                  </Button>
                  <Button
                    size="icon"
                    className="h-12 w-12 rounded-full bg-green-600 hover:bg-green-700"
                    onClick={() => setCallStatus("active")}
                  >
                    <PhoneCall className="h-6 w-6" />
                  </Button>
                </>
              ) : (
                <>
                  {callType === "audio" ? (
                    <Button
                      size="icon"
                      variant={isMuted ? "default" : "secondary"}
                      className="h-12 w-12 rounded-full"
                      onClick={toggleMute}
                    >
                      {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                    </Button>
                  ) : (
                    <>
                      <Button
                        size="icon"
                        variant={isMuted ? "default" : "secondary"}
                        className="h-12 w-12 rounded-full"
                        onClick={toggleMute}
                      >
                        {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                      </Button>
                      <Button
                        size="icon"
                        variant={isCameraOff ? "default" : "secondary"}
                        className="h-12 w-12 rounded-full"
                        onClick={toggleCamera}
                      >
                        {isCameraOff ? <CameraOff className="h-6 w-6" /> : <Camera className="h-6 w-6" />}
                      </Button>
                    </>
                  )}
                  <Button size="icon" className="h-12 w-12 rounded-full bg-red-600 hover:bg-red-700" onClick={endCall}>
                    <PhoneOff className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

