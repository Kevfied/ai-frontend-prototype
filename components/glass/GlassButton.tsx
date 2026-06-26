import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface GlassButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: "default" | "primary" | "ghost"
  disabled?: boolean
}

export function GlassButton({ 
  children, 
  className, 
  onClick, 
  variant = "default",
  disabled = false 
}: GlassButtonProps) {
  const baseClasses = "px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variantClasses = {
    default: "glass hover:bg-white/10",
    primary: "bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:from-purple-600 hover:to-cyan-600 shadow-lg shadow-purple-500/25",
    ghost: "hover:bg-white/5 text-gray-300"
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      {children}
    </button>
  )
}
