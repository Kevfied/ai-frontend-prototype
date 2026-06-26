# AI Frontend Prototype

**What is this?**

This is a frontend-only prototype of an AI chat application. It demonstrates what a modern, polished AI chat interface could look and feel like, with no backend integration. All AI responses are mocked, and the chat state lives entirely in memory.

**What is it for?**

This project serves as a reference implementation or starting point for building an AI chat application. It showcases a clean, dark-glassmorphism UI, custom markdown rendering with syntax highlighting, smooth animations, a sidebar-based navigation system, and responsive layout patterns.

**Why does it exist?**

To explore and demonstrate frontend patterns for AI chat interfaces without the complexity of backend integration, authentication, or database persistence. It's a sandbox for UI/UX experimentation and a learning resource for developers building similar applications.

> ⚠️ **This is a prototype.** It uses mocked AI responses and keeps chat data in memory only. Reloading the page clears the conversation history.

---

## See It in Action

A dark, glassmorphism chat interface built for the modern web.

<table>
  <tr>
    <td align="center"><b>Main Chat</b></td>
    <td align="center"><b>Sidebar & Recents</b></td>
  </tr>
  <tr>
    <td><img src="Images/Screenshot%202026-06-26%20195510.png" alt="Main chat interface" width="100%"></td>
    <td><img src="Images/Screenshot%202026-06-26%20195544.png" alt="Sidebar with recent conversations" width="100%"></td>
  </tr>
  <tr>
    <td align="center"><b>Code Highlighting</b></td>
    <td align="center"><b>Navigation Pages</b></td>
  </tr>
  <tr>
    <td><img src="Images/Screenshot%202026-06-26%20195616.png" alt="Syntax highlighted code block" width="100%"></td>
    <td><img src="Images/Screenshot%202026-06-26%20195651.png" alt="Help and settings page" width="100%"></td>
  </tr>
</table>

### What the screenshots show

**1. Main Chat Interface**  
The centerpiece of the prototype. A clean, dark chat canvas with a centered welcome prompt and a large input area at the bottom. The design uses subtle translucent surfaces, rounded message bubbles, and generous spacing to keep the focus on the conversation.

**2. Sidebar & Recents**  
The collapsible sidebar in action. It shows the "New Chat" button, the active chat highlight, and a list of recent conversations ordered by the last time you sent a message. This demonstrates how the app keeps older chats accessible without requiring a database.

**3. Code Highlighting**  
A message containing a fenced code block rendered with custom syntax highlighting. This screenshot highlights the custom markdown renderer and the lightweight tokenizer that colors keywords, strings, numbers, and comments without relying on a heavy external library.

**4. Navigation Pages**  
The prototype is not just a single page. The Help and Settings pages share the same dark glassmorphism shell and sidebar, demonstrating how the chat state stays in memory while you move around the app.

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
