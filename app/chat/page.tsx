import { ChatInterface } from "@/components/chat/ChatInterface"
import { FadeIn } from "@/components/layout/FadeIn"
import { getRandomWelcomePrompt } from "@/lib/prompts"

export default function ChatPage() {
  const initialPrompt = getRandomWelcomePrompt()

  return (
    <FadeIn className="flex-1 flex flex-col overflow-hidden">
      <ChatInterface initialPrompt={initialPrompt} />
    </FadeIn>
  )
}
