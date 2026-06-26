"use client"

import { createContext, useContext, useState, ReactNode, useCallback } from "react"
import { Message } from "@/lib/mock-ai"

interface SavedChat {
  id: string
  title: string
  messages: Message[]
  lastActivity: string
}

interface ChatContextType {
  messages: Message[]
  setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void
  tempChat: { id: string; title: string; lastActivity: string } | null
  setTempChat: (chat: { id: string; title: string; lastActivity: string } | null) => void
  savedChats: SavedChat[]
  createNewChat: () => void
  loadSavedChat: (id: string) => void
  resetChat: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [tempChat, setTempChat] = useState<{ id: string; title: string; lastActivity: string } | null>(null)
  const [savedChats, setSavedChats] = useState<SavedChat[]>([])

  const createNewChat = useCallback(() => {
    setSavedChats(prev => {
      if (tempChat && messages.length > 0) {
        return [{ id: tempChat.id, title: tempChat.title, messages, lastActivity: tempChat.lastActivity }, ...prev]
      }
      return prev
    })
    setMessages([])
    setTempChat(null)
  }, [tempChat, messages])

  const loadSavedChat = useCallback((id: string) => {
    const target = savedChats.find(c => c.id === id)
    if (!target) return
    setSavedChats(prev => {
      const withoutTarget = prev.filter(c => c.id !== id)
      if (tempChat && messages.length > 0) {
        return [{ id: tempChat.id, title: tempChat.title, messages, lastActivity: tempChat.lastActivity }, ...withoutTarget]
      }
      return withoutTarget
    })
    setMessages(target.messages)
    setTempChat({ id: target.id, title: target.title, lastActivity: target.lastActivity })
  }, [savedChats, tempChat, messages])

  const resetChat = useCallback(() => {
    setMessages([])
    setTempChat(null)
  }, [])

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        tempChat,
        setTempChat,
        savedChats,
        createNewChat,
        loadSavedChat,
        resetChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
