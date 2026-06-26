"use client"

import { Send } from "lucide-react"
import { useRef, useEffect } from "react"

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  isLoading?: boolean
  placeholder?: string
  autoFocus?: boolean
}

export function ChatInput({ 
  value, 
  onChange, 
  onSubmit, 
  isLoading, 
  placeholder = "Message Prototype AI...",
  autoFocus 
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = "auto"
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative flex items-end bg-white/[0.04] hover:bg-white/[0.06] rounded-2xl px-4 py-3 transition-colors duration-200 focus-within:bg-white/[0.08]">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          rows={1}
          className="flex-1 bg-transparent text-gray-200 placeholder:text-gray-500 outline-none text-base resize-none overflow-y-auto min-h-[24px] max-h-[200px] py-0.5 [overflow-wrap:anywhere]"
        />
        <button
          onClick={onSubmit}
          disabled={!value.trim() || isLoading}
          className="ml-3 w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 flex-shrink-0"
          aria-label="Send message"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="w-4 h-4 text-gray-300" />
          )}
        </button>
      </div>
    </div>
  )
}
