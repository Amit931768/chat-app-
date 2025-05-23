"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// Update the chats array with Indian names
const chats = [
  {
    id: "1",
    name: "Arjun Sharma",
    lastMessage: "Kaise ho? (How are you?)",
    time: "10:30 AM",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Priya Patel",
    lastMessage: "Kal milte hain? (Shall we meet tomorrow?)",
    time: "Yesterday",
    unread: 0,
    online: true,
  },
  {
    id: "3",
    name: "Rahul Verma",
    lastMessage: "Maine files bhej di hain (I sent you the files)",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: "4",
    name: "Office Group",
    lastMessage: "Vikram: Project ke baare mein baat karte hain",
    time: "Monday",
    unread: 5,
    online: false,
    isGroup: true,
  },
  {
    id: "5",
    name: "Family",
    lastMessage: "Maa: Dinner 7 baje (Dinner at 7)",
    time: "Sunday",
    unread: 0,
    online: false,
    isGroup: true,
  },
]

interface ChatListProps {
  onSelectChat: (chatName: string) => void
  selectedChat: string | null
}

export default function ChatList({ onSelectChat, selectedChat }: ChatListProps) {
  return (
    <ScrollArea className="flex-1">
      <div className="p-2">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={cn(
              "flex items-center space-x-3 p-3 rounded-md cursor-pointer",
              selectedChat === chat.name
                ? "bg-slate-200 dark:bg-slate-800"
                : "hover:bg-slate-100 dark:hover:bg-slate-800/50",
            )}
            onClick={() => onSelectChat(chat.name)}
          >
            <div className="relative">
              <Avatar>
                <AvatarFallback>
                  {chat.isGroup
                    ? chat.name.substring(0, 2)
                    : chat.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                </AvatarFallback>
              </Avatar>
              {chat.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <p className="font-medium truncate">{chat.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap ml-2">{chat.time}</p>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{chat.lastMessage}</p>
            </div>
            {chat.unread > 0 && (
              <div className="flex-shrink-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs text-white">{chat.unread}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

