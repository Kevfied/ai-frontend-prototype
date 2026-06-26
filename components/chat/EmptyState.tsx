"use client"

import { motion } from "framer-motion"
import { GlassInput } from "@/components/glass/GlassInput"
import { useRef } from "react"
import { Send } from "lucide-react"

interface EmptyStateProps {
  input: string
  setInput: (value: string) => void
  onSubmit: () => void
  isLoading?: boolean
  initialPrompt?: string
}

export function EmptyState({ input, setInput, onSubmit, isLoading, initialPrompt }: EmptyStateProps) {
  const prompt = initialPrompt || "What are we tackling today?"
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 glow-radial">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl w-full"
      >
        <h1 className="text-4xl md:text-6xl font-medium text-white/90 mb-12 tracking-tight">
          {prompt}
        </h1>

        <div className="relative max-w-2xl mx-auto">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-t from-white/[0.04] via-blue-500/5 to-transparent blur-2xl pointer-events-none" />
          <GlassInput
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            className="relative pr-14 text-lg py-5 shadow-[0_0_40px_rgba(255,255,255,0.03)]"
            autoFocus
          />
          <button
            onClick={onSubmit}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4 text-white/70" />
            )}
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          Press Enter to start chatting
        </p>
      </motion.div>
    </div>
  )
}
