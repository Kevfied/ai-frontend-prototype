"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/chat/Sidebar"
import { dummyConversations } from "@/lib/dummy-conversations"
import { useChat } from "@/components/chat/ChatContext"
import { PanelLeftOpen } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { tempChat, savedChats, createNewChat, loadSavedChat } = useChat()
  const router = useRouter()
  const pathname = usePathname()

  const activeRoute = pathname.startsWith("/chat") ? "chat" : pathname.startsWith("/help") ? "help" : pathname.startsWith("/settings") ? "settings" : "chat"
  const activeChatId = pathname.startsWith("/chat/") ? pathname.split("/")[2] : null
  const isNewChat = pathname === "/chat"

  const handleNewChat = () => {
    createNewChat()
    router.push("/chat")
  }

  const handleLoadSavedChat = (id: string) => {
    loadSavedChat(id)
    router.push("/chat")
  }

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        activeRoute={activeRoute}
        activeChatId={isNewChat ? (tempChat?.id ?? null) : activeChatId}
        onNewChat={handleNewChat}
        onLoadSavedChat={handleLoadSavedChat}
        onToggle={() => setSidebarOpen(false)}
        currentTempChat={tempChat}
        savedChats={savedChats.map(c => ({ id: c.id, title: c.title, lastActivity: c.lastActivity }))}
        recentChats={dummyConversations.map(c => ({ id: c.id, title: c.title }))}
        className={`
          fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      />

      {/* Main Content */}
      <div
        className={cn(
          "flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out",
          sidebarOpen ? "lg:ml-64" : ""
        )}
      >
        {/* Top Bar */}
        <div className="h-14 flex items-center justify-between px-4">
          <div className="flex items-center">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors text-gray-400 hover:text-white mr-3"
                aria-label="Open sidebar"
              >
                <PanelLeftOpen className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight text-white">Prototype</span>
            <span className="text-lg font-semibold tracking-tight text-gray-500">AI</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          {children}
        </div>
      </div>
    </div>
  )
}
