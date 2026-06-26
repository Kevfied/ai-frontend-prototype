import { Message } from "./mock-ai"

export interface Conversation {
  id: string
  title: string
  date: string
  preview: string
  messages: Message[]
}

function md(lines: string[]): string {
  return lines.join("\n")
}

export const dummyConversations: Conversation[] = [
  {
    id: "project-planning",
    title: "Project Planning",
    date: "Today",
    preview: "Here's a 6-week rollout plan with milestones...",
    messages: [
      {
        id: "1",
        role: "user",
        content: "I need help planning a new AI feature rollout. We have 6 weeks and a small team.",
        timestamp: new Date("2026-06-26T09:00:00")
      },
      {
        id: "2",
        role: "assistant",
        content: md([
          "Here's a 6-week rollout plan with milestones:",
          "",
          "- **Weeks 1–2:** Research and prototyping",
          "  - Define user stories",
          "  - Build proof of concept",
          "- **Weeks 3–4:** Core implementation",
          "  - Integrate the AI backend",
          "  - Build the chat UI",
          "- **Weeks 5–6:** Testing and polish",
          "  - Internal QA",
          "  - Beta launch",
          "",
          "Does that timeline feel realistic?"
        ]),
        timestamp: new Date("2026-06-26T09:01:00")
      },
      {
        id: "3",
        role: "user",
        content: "Yes, but we need a buffer for user feedback. Can we shift testing to week 5 and leave week 6 for iteration?",
        timestamp: new Date("2026-06-26T09:02:00")
      },
      {
        id: "4",
        role: "assistant",
        content: md([
          "Smart move. I'll restructure the plan to prioritize a **feedback loop** in week 6.",
          "",
          "Updated plan:",
          "- **Week 5:** Testing and early feedback",
          "- **Week 6:** Iteration and final polish",
          "",
          "This keeps the launch window flexible while giving users time to respond."
        ]),
        timestamp: new Date("2026-06-26T09:03:00")
      }
    ]
  },
  {
    id: "code-review-help",
    title: "Code Review Help",
    date: "Yesterday",
    preview: "Convert this recursive function to an iterative one...",
    messages: [
      {
        id: "1",
        role: "user",
        content: "Can you review this recursive function? It works for small inputs but crashes on large ones.",
        timestamp: new Date("2026-06-25T14:00:00")
      },
      {
        id: "2",
        role: "assistant",
        content: md([
          "The recursion here could hit a stack limit with deep inputs. Consider converting it to an iterative approach.",
          "",
          "Here's the iterative version:",
          "",
          "```python",
          "def factorial(n):",
          "    result = 1",
          "    while n > 1:",
          "        result *= n",
          "        n -= 1",
          "    return result",
          "```",
          "",
          "This avoids the call stack and handles much larger inputs."
        ]),
        timestamp: new Date("2026-06-25T14:01:00")
      },
      {
        id: "3",
        role: "user",
        content: "Iterative makes sense. Any tips on keeping the code readable?",
        timestamp: new Date("2026-06-25T14:02:00")
      },
      {
        id: "4",
        role: "assistant",
        content: md([
          "Use a `while` loop with a clear invariant, and add a short comment explaining the loop state.",
          "",
          "```python",
          "def factorial(n):",
          "    \"\"\"Compute n! iteratively.\"\"\"",
          "    result = 1  # invariant: result == product of (n_original..n]",
          "    while n > 1:",
          "        result *= n",
          "        n -= 1",
          "    return result",
          "```",
          "",
          "Readable iterative code usually beats clever recursive code in production."
        ]),
        timestamp: new Date("2026-06-25T14:03:00")
      }
    ]
  },
  {
    id: "brainstorming-session",
    title: "Brainstorming Session",
    date: "Jun 24",
    preview: "Turn onboarding into a mini-game with these ideas...",
    messages: [
      {
        id: "1",
        role: "user",
        content: "We need fresh ideas for user onboarding. Our current drop-off rate is too high.",
        timestamp: new Date("2026-06-24T10:00:00")
      },
      {
        id: "2",
        role: "assistant",
        content: md([
          "What if we turn onboarding into a **mini-game**? Users complete small tasks, earn progress, and unlock features.",
          "",
          "Ideas:",
          "- **Quest system:** Each feature is a quest with a reward",
          "- **Progress bar:** Show how close they are to \"power user\" status",
          "- **Tooltips:** Contextual hints that appear as they explore",
          "",
          "It could make learning the product feel rewarding."
        ]),
        timestamp: new Date("2026-06-24T10:01:00")
      },
      {
        id: "3",
        role: "user",
        content: "I like that. Can we A/B test it against the current checklist?",
        timestamp: new Date("2026-06-24T10:02:00")
      },
      {
        id: "4",
        role: "assistant",
        content: md([
          "Absolutely. I'd recommend a **50/50 split** over two weeks and measure:",
          "",
          "- Activation rate",
          "- Onboarding completion",
          "- 7-day retention",
          "",
          "That should give us a clear signal on which approach performs better."
        ]),
        timestamp: new Date("2026-06-24T10:03:00")
      }
    ]
  },
  {
    id: "writing-assistance",
    title: "Writing Assistance",
    date: "Jun 22",
    preview: "Here's a tighter version of your announcement...",
    messages: [
      {
        id: "1",
        role: "user",
        content: "Can you help me tighten this product announcement? It feels too long.",
        timestamp: new Date("2026-06-22T16:00:00")
      },
      {
        id: "2",
        role: "assistant",
        content: md([
          "This opening is strong, but the middle drags with too much background. I'd move the launch details up and keep the context to one paragraph.",
          "",
          "Try this structure:",
          "1. **Hook:** The problem you solve",
          "2. **Launch:** What's new and why it matters",
          "3. **Proof:** One short metric or testimonial",
          "4. **CTA:** What the reader should do next"
        ]),
        timestamp: new Date("2026-06-22T16:01:00")
      },
      {
        id: "3",
        role: "user",
        content: "Good point. Should I cut the quote from the founder?",
        timestamp: new Date("2026-06-22T16:02:00")
      },
      {
        id: "4",
        role: "assistant",
        content: md([
          "Keep the quote, but shorten it. A **punchy one-liner** about the user's benefit will land better than a long vision statement.",
          "",
          "Example:",
          "> \"We built this so teams can ship faster without losing context.\"",
          "",
          "That's much more memorable than a paragraph about company mission."
        ]),
        timestamp: new Date("2026-06-22T16:03:00")
      }
    ]
  },
  {
    id: "technical-research",
    title: "Technical Research",
    date: "Jun 20",
    preview: "Start with pgvector and keep the abstraction clean...",
    messages: [
      {
        id: "1",
        role: "user",
        content: "We're building a semantic search feature. Should we use a vector database or just embeddings in Postgres?",
        timestamp: new Date("2026-06-20T11:00:00")
      },
      {
        id: "2",
        role: "assistant",
        content: md([
          "Vector databases are ideal for semantic search at scale, but **pgvector** can handle millions of embeddings if your dataset is moderate.",
          "",
          "Comparison:",
          "- **pgvector:** Simpler stack, good for moderate volume",
          "- **Pinecone / Weaviate:** Lower latency, better for massive scale",
          "",
          "It depends on your expected query volume and latency requirements."
        ]),
        timestamp: new Date("2026-06-20T11:01:00")
      },
      {
        id: "3",
        role: "user",
        content: "Query volume will be low at first. Can we start with pgvector and migrate later?",
        timestamp: new Date("2026-06-20T11:02:00")
      },
      {
        id: "4",
        role: "assistant",
        content: md([
          "Yes, that's a pragmatic path. Start with pgvector, keep the embedding abstraction clean, and migrate later if you hit performance limits.",
          "",
          "Here's a sample query:",
          "",
          "```sql",
          "SELECT id, content, embedding <=> query_embedding AS distance",
          "FROM documents",
          "ORDER BY distance",
          "LIMIT 10;",
          "```",
          "",
          "This keeps your schema simple while still giving you semantic search."
        ]),
        timestamp: new Date("2026-06-20T11:03:00")
      }
    ]
  }
]

export function getConversationById(id: string): Conversation | undefined {
  return dummyConversations.find(conversation => conversation.id === id)
}
