import { notFound } from "next/navigation"
import { ChatInterface } from "@/components/chat/ChatInterface"
import { FadeIn } from "@/components/layout/FadeIn"
import { getConversationById } from "@/lib/dummy-conversations"
import { Info } from "lucide-react"

interface ChatDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ChatDetailPage({ params }: ChatDetailPageProps) {
  const { id } = await params
  const conversation = getConversationById(id)

  if (!conversation) {
    notFound()
  }

  return (
    <FadeIn className="flex-1 flex flex-col overflow-hidden">
      {/* Example chat notice */}
      <div className="shrink-0 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-start gap-3 p-3 rounded-xl bg-blue-500/10">
          <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-300">Example conversation</p>
            <p className="text-xs text-blue-400/80 mt-0.5">
              You can continue this dummy chat, but new messages are not saved.
            </p>
          </div>
        </div>
      </div>

      <ChatInterface
        initialMessages={conversation.messages}
      />
    </FadeIn>
  )
}
