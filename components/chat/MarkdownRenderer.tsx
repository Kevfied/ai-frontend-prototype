"use client"

import { cn } from "@/lib/utils"
import { CodeBlock } from "./CodeBlock"
import React from "react"

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  const blocks = parseMarkdown(content)

  return (
    <div className={cn("space-y-4 [overflow-wrap:anywhere] min-w-0", className)}>
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  )
}

type Block =
  | { type: "paragraph"; content: InlineNode[] }
  | { type: "code"; language: string; code: string }
  | { type: "heading"; level: number; content: InlineNode[] }
  | { type: "list"; items: InlineNode[][] }
  | { type: "blockquote"; content: InlineNode[] }

interface TextNode {
  type: "text"
  text: string
}

interface BoldNode {
  type: "bold"
  content: InlineNode[]
}

interface ItalicNode {
  type: "italic"
  content: InlineNode[]
}

interface CodeNode {
  type: "code"
  text: string
}

type InlineNode = TextNode | BoldNode | ItalicNode | CodeNode

function parseMarkdown(content: string): Block[] {
  const lines = content.split("\n")
  const blocks: Block[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.trim() === "") {
      i++
      continue
    }

    if (line.startsWith("```")) {
      const language = line.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i])
        i++
      }
      i++
      blocks.push({ type: "code", language, code: codeLines.join("\n") })
      continue
    }

    if (line.startsWith("#")) {
      const level = line.match(/^#+/)?.[0].length || 1
      const text = line.slice(level).trim()
      blocks.push({ type: "heading", level, content: parseInline(text) })
      i++
      continue
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: InlineNode[][] = []
      while (i < lines.length && (lines[i].startsWith("- ") || lines[i].startsWith("* "))) {
        items.push(parseInline(lines[i].slice(2)))
        i++
      }
      blocks.push({ type: "list", items })
      continue
    }

    if (line.startsWith("> ")) {
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2))
        i++
      }
      blocks.push({ type: "blockquote", content: parseInline(quoteLines.join(" ")) })
      continue
    }

    const paragraphLines: string[] = []
    while (i < lines.length && lines[i].trim() !== "" && !lines[i].startsWith("```") && !lines[i].startsWith("#") && !lines[i].startsWith("- ") && !lines[i].startsWith("* ") && !lines[i].startsWith("> ")) {
      paragraphLines.push(lines[i])
      i++
    }
    blocks.push({ type: "paragraph", content: parseInline(paragraphLines.join(" ")) })
  }

  return blocks
}

function parseInline(text: string): InlineNode[] {
  const nodes: InlineNode[] = []
  const patterns = [
    { regex: /\*\*(.+?)\*\*/, type: "bold" as const },
    { regex: /__(.+?)__/, type: "bold" as const },
    { regex: /\*(.+?)\*/, type: "italic" as const },
    { regex: /_(.+?)_/, type: "italic" as const },
    { regex: /`(.+?)`/, type: "code" as const },
  ]

  let remaining = text

  while (remaining.length > 0) {
    let earliest: { index: number; match: RegExpMatchArray; type: "bold" | "italic" | "code" } | null = null

    for (const pattern of patterns) {
      const match = remaining.match(pattern.regex)
      if (match && (earliest === null || (match.index !== undefined && match.index < earliest.index))) {
        earliest = { index: match.index!, match, type: pattern.type }
      }
    }

    if (earliest === null) {
      nodes.push({ type: "text", text: remaining })
      break
    }

    if (earliest.index > 0) {
      nodes.push({ type: "text", text: remaining.slice(0, earliest.index) })
    }

    const inner = earliest.match[1]
    nodes.push({ type: earliest.type, content: parseInline(inner) } as InlineNode)

    remaining = remaining.slice(earliest.index + earliest.match[0].length)
  }

  return nodes
}

function renderBlock(block: Block, key: number): React.ReactNode {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={key} className="text-base leading-relaxed">
          {block.content.map((node, i) => renderInline(node, `${key}-${i}`))}
        </p>
      )
    case "heading":
      const headingClass = "text-lg font-semibold text-white mt-2"
      const headingChildren = block.content.map((node, i) => renderInline(node, `${key}-${i}`))
      return React.createElement(`h${block.level}`, { key, className: headingClass }, headingChildren)
    case "code":
      return (
        <CodeBlock key={key} code={block.code} language={block.language} />
      )
    case "list":
      return (
        <ul key={key} className="list-disc list-inside space-y-1 text-base leading-relaxed">
          {block.items.map((item, i) => (
            <li key={`${key}-${i}`}>
              {item.map((node, j) => renderInline(node, `${key}-${i}-${j}`))}
            </li>
          ))}
        </ul>
      )
    case "blockquote":
      return (
        <blockquote key={key} className="border-l-2 border-white/20 pl-4 italic text-gray-300">
          {block.content.map((node, i) => renderInline(node, `${key}-${i}`))}
        </blockquote>
      )
  }
}

function renderInline(node: InlineNode, key: string): React.ReactNode {
  switch (node.type) {
    case "text":
      return <span key={key}>{node.text}</span>
    case "bold":
      return (
        <strong key={key} className="font-semibold text-white">
          {node.content.map((n, i) => renderInline(n, `${key}-${i}`))}
        </strong>
      )
    case "italic":
      return (
        <em key={key} className="italic">
          {node.content.map((n, i) => renderInline(n, `${key}-${i}`))}
        </em>
      )
    case "code":
      return (
        <code key={key} className="text-sm font-mono font-semibold text-cyan-400">
          {node.text}
        </code>
      )
  }
}
