# AI Frontend Prototype

**What is this?**

This is a frontend-only prototype of an AI chat application. It demonstrates what a modern, polished AI chat interface could look and feel like, with no backend integration. All AI responses are mocked, and the chat state lives entirely in memory.

**What is it for?**

This project serves as a reference implementation or starting point for building an AI chat application. It showcases:
- A clean, dark-glassmorphism UI design
- Custom markdown rendering with syntax highlighting
- Smooth animations and transitions
- A sidebar-based navigation system with chat history
- Responsive layout and accessibility considerations

**Why does it exist?**

To explore and demonstrate frontend patterns for AI chat interfaces without the complexity of backend integration, authentication, or database persistence. It's a sandbox for UI/UX experimentation and a learning resource for developers building similar applications.

> ⚠️ **This is a prototype.** It uses mocked AI responses and keeps chat data in memory only. Reloading the page clears the conversation history.

---

## Features

### Chat Experience
- **Live chat interface** with a multi-line auto-resizing textarea, supporting `Enter` to send and `Shift + Enter` for new lines.
- **Mock AI responses** that simulate typing delay for a realistic feel.
- **Custom markdown renderer** supporting paragraphs, headings, bold/italic, lists, blockquotes, inline code, and fenced code blocks.
- **Syntax highlighting** for code blocks via a lightweight custom tokenizer (Python, SQL, JavaScript/TypeScript).
- **Text wrapping** optimized for long unbroken strings and natural word breaks.

### Navigation & Layout
- **Collapsible sidebar** with a "New Chat" button, recents list, and app links (Help, Settings).
- **Persistent chat state across client-side navigation** — switching between Help, Settings, and Chat keeps the current conversation.
- **In-memory chat history** — created chats appear in the sidebar recents, ordered by the last time you sent a message.
- **No persistence on reload** — refreshing the page starts fresh.

### UI/UX
- Dark glassmorphism design with subtle borders and translucent backgrounds.
- Smooth animations powered by **Framer Motion**.
- Responsive layout with a collapsible sidebar for smaller screens.
- Clean, icon-free message bubbles inspired by modern AI assistants.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations and transitions |
| [Lucide React](https://lucide.dev/) | Icons |
| [clsx](https://github.com/lukeed/clsx) / [tailwind-merge](https://github.com/dcastil/tailwind-merge) | Conditional class utilities |

---

## Project Structure

```
app/
  chat/
    page.tsx            # New chat page
    [id]/page.tsx       # Example / saved conversation view
  help/page.tsx         # Help page
  settings/page.tsx     # Settings page
  page.tsx              # Redirects to /chat
  layout.tsx            # Root layout with ChatProvider
components/
  chat/
    ChatContext.tsx     # In-memory chat state management
    ChatInterface.tsx   # Main chat UI and message logic
    ChatInput.tsx       # Auto-resizing textarea input
    MessageBubble.tsx   # Individual message bubble
    MarkdownRenderer.tsx # Custom markdown parser/renderer
    CodeBlock.tsx       # Syntax-highlighted code block
    Sidebar.tsx         # App navigation and recents
  layout/
    AppLayout.tsx       # Shell with sidebar and main content
    FadeIn.tsx          # Page transition wrapper
  landing/              # Landing page sections (Hero, Features)
  glass/                # Reusable glassmorphism UI primitives
lib/
  mock-ai.ts            # Mock AI response data and types
  dummy-conversations.ts # Example chat conversations with markdown
  prompts.ts            # Random welcome prompts
  utils.ts              # Utility functions (cn helper)
```

---

## Getting Started

### Prerequisites
- Node.js 18 or later
- npm (or pnpm/yarn/bun)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Kevfied/ai-frontend-prototype.git
cd ai-frontend-prototype
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app will redirect to `/chat`.

### Build for Production

```bash
npm run build
npm run start
```

---

## How the Chat State Works

This prototype intentionally avoids any backend or browser storage for chat data.

- **New Chat** — opens a fresh chat at `/chat`. No entry appears in the sidebar until you send your first message.
- **Sending a message** — creates a temporary chat entry titled with the start of your message.
- **Recents ordering** — conversations are ordered by the timestamp of the last message you sent. Clicking a conversation only switches to it; it does not change the order.
- **Switching pages** — the conversation stays in memory while you navigate between `/chat`, `/help`, and `/settings`.
- **Reloading** — all chat data is cleared.

---

## Notes & Limitations

- AI responses are mocked and deterministic. There is no real LLM integration.
- The custom markdown parser is intentionally lightweight and does not cover every Markdown edge case.
- The `@theme` rule in `app/globals.css` is a Tailwind CSS v4 convention and may show a lint warning in some editors, but it does not affect the build.

---

## License

This prototype is provided as-is for demonstration and learning purposes.
