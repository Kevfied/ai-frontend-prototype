"use client"

import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language: string
}

const pythonKeywords = [
  "def", "class", "return", "if", "elif", "else", "for", "while", "in", "not", "and", "or",
  "import", "from", "as", "try", "except", "finally", "with", "yield", "lambda", "pass", "break", "continue", "is", "None", "True", "False"
]

const sqlKeywords = [
  "SELECT", "FROM", "WHERE", "INSERT", "UPDATE", "DELETE", "JOIN", "INNER", "LEFT", "RIGHT", "ON",
  "GROUP", "BY", "ORDER", "LIMIT", "OFFSET", "HAVING", "AND", "OR", "NOT", "NULL", "AS", "CREATE", "TABLE", "VALUES"
]

const jsKeywords = [
  "const", "let", "var", "function", "return", "if", "else", "for", "while", "class", "import", "from",
  "export", "default", "async", "await", "new", "this", "true", "false", "null", "undefined"
]

function getKeywords(language: string): string[] {
  const lower = language.toLowerCase()
  if (lower === "python") return pythonKeywords
  if (lower === "sql") return sqlKeywords
  if (["javascript", "js", "typescript", "ts"].includes(lower)) return jsKeywords
  return []
}

function getKeywordClass(token: string, keywords: string[]): string | null {
  if (keywords.includes(token)) return "text-pink-400"
  return null
}

function tokenize(code: string, language: string): Array<{ text: string; className: string }> {
  const keywords = getKeywords(language)
  const tokens: Array<{ text: string; className: string }> = []

  const lines = code.split("\n")

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex]
    let remaining = line

    while (remaining.length > 0) {
      // Comment
      const commentMatch = remaining.match(/^(#.*|--.*|\/\/.*)/)
      if (commentMatch) {
        tokens.push({ text: commentMatch[0], className: "text-gray-500" })
        remaining = remaining.slice(commentMatch[0].length)
        continue
      }

      // String
      const stringMatch = remaining.match(/^((?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`))/)
      if (stringMatch) {
        tokens.push({ text: stringMatch[0], className: "text-green-400" })
        remaining = remaining.slice(stringMatch[0].length)
        continue
      }

      // Number
      const numberMatch = remaining.match(/^\d+(?:\.\d+)?/)
      if (numberMatch) {
        tokens.push({ text: numberMatch[0], className: "text-orange-400" })
        remaining = remaining.slice(numberMatch[0].length)
        continue
      }

      // Word
      const wordMatch = remaining.match(/^\w+/)
      if (wordMatch) {
        const word = wordMatch[0]
        const keywordClass = getKeywordClass(word, keywords)
        tokens.push({ text: word, className: keywordClass || "text-gray-300" })
        remaining = remaining.slice(word.length)
        continue
      }

      // Operator or punctuation
      const opMatch = remaining.match(/^([=+\-*/<>!&|]+|[{}()\[\](),.;:])/)
      if (opMatch) {
        tokens.push({ text: opMatch[0], className: "text-blue-300" })
        remaining = remaining.slice(opMatch[0].length)
        continue
      }

      // Whitespace
      const wsMatch = remaining.match(/^\s+/)
      if (wsMatch) {
        tokens.push({ text: wsMatch[0], className: "text-gray-300" })
        remaining = remaining.slice(wsMatch[0].length)
        continue
      }

      // Fallback for any other character
      tokens.push({ text: remaining[0], className: "text-gray-300" })
      remaining = remaining.slice(1)
    }

    if (lineIndex < lines.length - 1) {
      tokens.push({ text: "\n", className: "" })
    }
  }

  return tokens
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const tokens = tokenize(code, language)

  return (
    <div className="relative rounded-xl bg-[#0d0d0d] overflow-hidden">
      {language && (
        <div className="px-4 py-2 text-xs text-gray-500 capitalize">
          {language}
        </div>
      )}
      <pre className={cn("px-4 pb-4 overflow-x-auto", !language && "pt-4")}>
        <code className="text-sm font-mono whitespace-pre">
          {tokens.map((token, index) => (
            <span key={index} className={cn(token.className)}>
              {token.text}
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}
