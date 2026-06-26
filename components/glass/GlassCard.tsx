import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  variant?: "default" | "strong" | "subtle"
}

export function GlassCard({ children, className, variant = "default" }: GlassCardProps) {
  const variantClasses = {
    default: "glass",
    strong: "glass-strong",
    subtle: "glass-subtle"
  }

  return (
    <div className={cn(variantClasses[variant], "rounded-xl", className)}>
      {children}
    </div>
  )
}
