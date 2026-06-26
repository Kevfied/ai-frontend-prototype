export const welcomePrompts = [
  "What are we tackling today?",
  "Drop your thoughts here",
  "Your next idea starts here",
  "Brainstorm, plan, or solve — let's go",
  "What problem are you chewing on?",
  "Start typing, I'll follow",
  "Think out loud with me",
  "Where should we focus?",
  "Let's untangle something together",
  "What do you need clarity on?",
  "Pick a thread, any thread",
  "Let's make sense of it",
  "What's the challenge right now?",
  "Fire away",
  "What should we dive into?"
]

export function getRandomWelcomePrompt(): string {
  const index = Math.floor(Math.random() * welcomePrompts.length)
  return welcomePrompts[index]
}
