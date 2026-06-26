import { FadeIn } from "@/components/layout/FadeIn"
import { HelpCircle, ChevronDown, AlertTriangle } from "lucide-react"

const faqs = [
  {
    question: "What is this prototype?",
    answer: "This is a UI prototype for an AI co-worker chat. It shows how the chat, sidebar, navigation, and conversation history could look and feel. The layout and interactions are functional, but the AI responses are pre-written examples."
  },
  {
    question: "Can I ask real questions?",
    answer: "Not yet. The chat currently shows mock responses. In a production version, your messages would be sent to a real AI backend and you would receive actual answers."
  },
  {
    question: "What are the recent chats in the sidebar?",
    answer: "Those are dummy conversations for demonstration. Click any title to see how a finished chat looks in the app. They are read-only and labeled as example chats."
  },
  {
    question: "What's coming next?",
    answer: "The next step is connecting a real AI model, adding user accounts, and enabling saveable, editable conversations."
  }
]

export default function HelpPage() {
  return (
    <FadeIn className="flex-1 overflow-y-auto p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-white/[0.06]">
            <HelpCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-tight">Help</h1>
            <p className="text-sm text-gray-500">About this prototype</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-8 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-300">Prototype only</p>
            <p className="text-sm text-amber-400/80 mt-1">
              This app is not fully AI-powered yet. Questions you type in the chat will not receive real answers.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-xl bg-white/[0.02] border border-white/[0.06] open:bg-white/[0.03] open:border-white/[0.1] transition-all duration-200"
            >
              <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                <span className="font-medium text-gray-200">{faq.question}</span>
                <ChevronDown className="w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform duration-200" />
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-500 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}
