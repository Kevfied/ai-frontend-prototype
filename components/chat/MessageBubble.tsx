"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Message } from "@/lib/mock-ai"
import { MarkdownRenderer } from "./MarkdownRenderer"
import { ThumbsUp, ThumbsDown, Copy, Check } from "lucide-react"
import { useState } from "react"

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user"
  const [copied, setCopied] = useState(false)
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group py-6"
    >
      <div className={cn(
        "max-w-3xl mx-auto flex",
        isUser ? "justify-end" : "justify-start"
      )}>
        <div className={cn(
          "flex flex-col max-w-[85%] min-w-0",
          isUser ? "items-end" : "items-start"
        )}>
          <div className={cn(
            "px-5 py-3.5 rounded-2xl text-base leading-relaxed [overflow-wrap:anywhere] min-w-0",
            isUser
              ? "bg-white/10 text-gray-100 rounded-br-md"
              : "bg-white/[0.03] text-gray-200 rounded-bl-md"
          )}>
            <MarkdownRenderer content={message.content} />
          </div>

          {!isUser && (
            <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={handleCopy}
                className="p-2 rounded-md text-gray-500 hover:text-gray-300 hover:bg-white/[0.06] transition-colors"
                aria-label={copied ? "Copied" : "Copy message"}
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => setFeedback(feedback === "up" ? null : "up")}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  feedback === "up"
                    ? "text-blue-400 bg-blue-500/10"
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.06]"
                )}
                aria-label="Good response"
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => setFeedback(feedback === "down" ? null : "down")}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  feedback === "down"
                    ? "text-red-400 bg-red-500/10"
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.06]"
                )}
                aria-label="Bad response"
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
