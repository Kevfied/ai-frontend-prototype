export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const mockResponses = [
  "That's a great question! Let me help you with that. Based on my understanding, I'd suggest approaching this systematically.",
  "I can definitely assist you with that. Here's what I recommend: first, let's break down the problem into smaller components.",
  "Interesting! I've analyzed your request and have some insights to share. Would you like me to elaborate on any specific aspect?",
  "I understand what you're looking for. Let me provide a comprehensive solution that addresses your needs.",
  "That's a thoughtful approach. Building on your idea, I'd suggest considering these additional factors for optimal results.",
  "Excellent point! I can help you implement this. Here's a step-by-step guide to get you started.",
  "I've processed your request and have several suggestions. Let me walk you through the most effective approach.",
  "Great question! The answer depends on several factors, but I can provide a general framework that should work well.",
  "I see what you mean. Let me offer a different perspective that might be helpful for your situation.",
  "Absolutely! I can help with that. Here's a detailed explanation with practical examples."
]

export function getMockAIResponse(): string {
  const randomIndex = Math.floor(Math.random() * mockResponses.length)
  return mockResponses[randomIndex]
}

export function simulateTypingDelay(): Promise<void> {
  const delay = Math.random() * 1000 + 500 // 500-1500ms
  return new Promise(resolve => setTimeout(resolve, delay))
}
