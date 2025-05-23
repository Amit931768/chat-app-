"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Check, CheckCheck, Phone, Video } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: string
  timestamp: string
  status: "sent" | "delivered" | "read"
  isMe: boolean
  messageType?: "text" | "call"
  callType?: "audio" | "video"
  callStatus?: "missed" | "answered" | "outgoing"
}

interface MessageListProps {
  selectedChat: string
}

export default function MessageList({ selectedChat }: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>([])

  // Generate mock messages when the selected chat changes
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: "1",
        content: "Namaste! Kaise ho?",
        sender: selectedChat,
        timestamp: "10:30 AM",
        status: "read",
        isMe: false,
      },
      {
        id: "2",
        content: "Main theek hoon, aap batao?",
        sender: "You",
        timestamp: "10:31 AM",
        status: "read",
        isMe: true,
      },
      {
        id: "3",
        messageType: "call",
        content: "Audio Call",
        callType: "audio",
        callStatus: "answered",
        sender: "You",
        timestamp: "10:32 AM",
        status: "read",
        isMe: true,
      },
      {
        id: "4",
        content: "Main ek naya project par kaam kar raha hoon.",
        sender: "You",
        timestamp: "10:33 AM",
        status: "read",
        isMe: true,
      },
      {
        id: "5",
        content: "Kaisa project hai? Kuch batao!",
        sender: selectedChat,
        timestamp: "10:34 AM",
        status: "delivered",
        isMe: false,
      },
      {
        id: "6",
        messageType: "call",
        content: "Video Call",
        callType: "video",
        callStatus: "missed",
        sender: selectedChat,
        timestamp: "10:35 AM",
        status: "delivered",
        isMe: false,
      },
      {
        id: "7",
        content: "Next.js aur WebSockets ka use karke ek chat application bana raha hoon.",
        sender: "You",
        timestamp: "10:36 AM",
        status: "sent",
        isMe: true,
      },
    ]

    setMessages(mockMessages)

    // Simulate receiving a new message after a delay
    const timer = setTimeout(() => {
      setMessages([
        ...mockMessages,
        {
          id: "8",
          content: "Bahut badhiya! Jab complete ho jaye, mujhe zaroor dikhana.",
          sender: selectedChat,
          timestamp: "Just now",
          status: "sent",
          isMe: false,
        },
      ])
    }, 2000)

    return () => clearTimeout(timer)
  }, [selectedChat])

  // Render message status indicator
  const renderMessageStatus = (status: string) => {
    switch (status) {
      case "sent":
        return <Check className="h-4 w-4 text-slate-400" />
      case "delivered":
        return <CheckCheck className="h-4 w-4 text-slate-400" />
      case "read":
        return <CheckCheck className="h-4 w-4 text-primary" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message.id} className={cn("flex", message.isMe ? "justify-end" : "justify-start")}>
          <div className="flex items-end space-x-2 max-w-[75%]">
            {!message.isMe && (
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs">
                  {message.sender
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            )}

            <div>
              {message.messageType === "call" ? (
                <div
                  className={cn(
                    "rounded-lg p-3 flex items-center space-x-2",
                    "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100",
                  )}
                >
                  {message.callType === "audio" ? <Phone className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                  <div>
                    <p>
                      {message.callType === "audio" ? "Audio" : "Video"} call
                      {message.callStatus === "missed"
                        ? " missed"
                        : message.callStatus === "answered"
                          ? ""
                          : " outgoing"}
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  className={cn(
                    "rounded-lg p-3",
                    message.isMe
                      ? "bg-primary text-primary-foreground"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100",
                  )}
                >
                  <p>{message.content}</p>
                </div>
              )}

              <div className="flex items-center mt-1 space-x-1">
                <p className="text-xs text-slate-500 dark:text-slate-400">{message.timestamp}</p>
                {message.isMe && renderMessageStatus(message.status)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

