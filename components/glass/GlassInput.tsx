import { cn } from "@/lib/utils"
import { InputHTMLAttributes, forwardRef } from "react"

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full bg-[#151515] text-white placeholder-gray-500 rounded-2xl px-5 py-4 outline-none glow-border transition-all duration-200",
          className
        )}
        {...props}
      />
    )
  }
)

GlassInput.displayName = "GlassInput"
