"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { motion } from "framer-motion"
import { Plus, Settings, HelpCircle, User, PanelLeftClose } from "lucide-react"

interface SidebarProps {
  onNewChat?: () => void
  onLoadSavedChat?: (id: string) => void
  onToggle?: () => void
  activeRoute?: string
  activeChatId?: string | null
  currentTempChat?: { id: string; title: string; lastActivity: string } | null
  recentChats?: { id: string; title: string }[]
  savedChats?: { id: string; title: string; lastActivity: string }[]
  className?: string
}

interface NavItem {
  id: string
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { id: "help", label: "Help", href: "/help", icon: HelpCircle },
  { id: "settings", label: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar({ onNewChat, onLoadSavedChat, onToggle, activeRoute = "chat", activeChatId = null, currentTempChat = null, recentChats = [], savedChats = [], className }: SidebarProps) {
  const userChats = [
    ...(currentTempChat ? [{ ...currentTempChat, isCurrent: true as const }] : []),
    ...savedChats.map(c => ({ ...c, isCurrent: false as const })),
  ].sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime())

  return (
    <aside className={cn("w-64 h-screen bg-[#0c0c0c] flex flex-col", className)}>
      {/* Toggle / Header */}
      <div className="h-14 px-3 flex items-center">
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors text-gray-400 hover:text-white"
          aria-label="Close sidebar"
        >
          <PanelLeftClose className="w-5 h-5" />
        </button>
      </div>

      {/* Logo / New Chat */}
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-200 group"
        >
          <Plus className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">New Chat</span>
        </button>
      </div>

      {/* Navigation */}
      <motion.nav
        className="flex-1 overflow-y-auto p-3 space-y-1"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.04
            }
          }
        }}
      >
        <motion.div
          className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 py-2"
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          Menu
        </motion.div>

        {navItems.map((item) => (
          <motion.div
            key={item.id}
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Link
              href={item.href}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                activeRoute === item.id
                  ? "bg-white/[0.06] text-white"
                  : "text-gray-400 hover:bg-white/[0.04] hover:text-gray-200"
              )}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          </motion.div>
        ))}

        {(userChats.length > 0 || recentChats.length > 0) && (
          <>
            <motion.div
              className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 py-2 mt-6"
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              Recents
            </motion.div>
            {userChats.map((chat, index) => (
              <motion.div
                key={chat.id}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.25, ease: "easeOut", delay: index * 0.02 }}
              >
                {chat.isCurrent ? (
                  <Link
                    href="/chat"
                    className={cn(
                      "w-full flex items-center px-3 py-2 rounded-lg text-sm transition-colors text-left truncate",
                      activeChatId === chat.id
                        ? "bg-white/[0.06] text-white"
                        : "text-gray-400 hover:bg-white/[0.06] hover:text-gray-200"
                    )}
                  >
                    <span className="truncate">{chat.title}</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => onLoadSavedChat?.(chat.id)}
                    className={cn(
                      "w-full flex items-center px-3 py-2 rounded-lg text-sm transition-colors text-left truncate",
                      activeChatId === chat.id
                        ? "bg-white/[0.06] text-white"
                        : "text-gray-400 hover:bg-white/[0.06] hover:text-gray-200"
                    )}
                  >
                    <span className="truncate">{chat.title}</span>
                  </button>
                )}
              </motion.div>
            ))}
            {recentChats.map((chat, index) => (
              <motion.div
                key={chat.id}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.25, ease: "easeOut", delay: (userChats.length + index) * 0.02 }}
              >
                <Link
                  href={`/chat/${chat.id}`}
                  className={cn(
                    "w-full flex items-center px-3 py-2 rounded-lg text-sm transition-colors text-left truncate",
                    activeChatId === chat.id
                      ? "bg-white/[0.06] text-white"
                      : "text-gray-400 hover:bg-white/[0.06] hover:text-gray-200"
                  )}
                >
                  <span className="truncate">{chat.title}</span>
                </Link>
              </motion.div>
            ))}
          </>
        )}
      </motion.nav>

      {/* Footer */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <User className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-300 truncate">Example</p>
            <p className="text-xs text-gray-500 truncate">Guest</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

