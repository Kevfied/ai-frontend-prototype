"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { EmptyState } from "./EmptyState"
import { ChatInput } from "./ChatInput"
import { MessageBubble } from "./MessageBubble"
import { useChat } from "./ChatContext"
import { Message, getMockAIResponse, simulateTypingDelay } from "@/lib/mock-ai"

interface ChatInterfaceProps {
  initialPrompt?: string
  initialMessages?: Message[]
  readOnly?: boolean
}

export function ChatInterface({ initialPrompt, initialMessages = [], readOnly = false }: ChatInterfaceProps) {
  const chatContext = useChat()
  const isLiveChat = !readOnly && initialMessages.length === 0
  const { messages: contextMessages, setMessages: setContextMessages, tempChat, setTempChat } = chatContext

  const [localMessages, setLocalMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const messages = isLiveChat ? contextMessages : localMessages
  const setMessages = isLiveChat ? setContextMessages : setLocalMessages
  const hasMessages = messages.length > 0

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading || readOnly) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    if (isLiveChat) {
      const title = tempChat?.title ?? input.trim().slice(0, 30) + (input.trim().length > 30 ? "..." : "")
      const id = tempChat?.id ?? `temp-${Date.now()}`
      setTempChat({ id, title, lastActivity: new Date().toISOString() })
    }

    await simulateTypingDelay()

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: getMockAIResponse(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, aiMessage])
    setIsLoading(false)
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0">
      <AnimatePresence mode="wait">
        {!hasMessages ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            <EmptyState
              input={input}
              setInput={setInput}
              onSubmit={handleSend}
              isLoading={isLoading}
              initialPrompt={initialPrompt}
            />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col min-h-0"
          >
            {/* Messages */}
            <div className="flex-1 overflow-y-auto min-h-0">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={index === 0 ? "pt-8" : ""}
                >
                  <MessageBubble message={message} />
                </div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-6 bg-white/[0.02]"
                >
                  <div className="max-w-3xl mx-auto flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-3 h-3 bg-white/40 rounded-full" />
                    </div>
                    <div className="flex items-center h-8">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                        <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            {!readOnly && (
              <div className="p-4 md:p-6">
                <ChatInput
                  value={input}
                  onChange={setInput}
                  onSubmit={handleSend}
                  isLoading={isLoading}
                  placeholder="Message Prototype AI..."
                  autoFocus
                />
                <p className="text-center text-xs text-gray-600 mt-3">
                  Prototype AI is not fully connected yet. Messages are not saved.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
