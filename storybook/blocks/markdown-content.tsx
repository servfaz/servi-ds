import type { Element } from "hast"
import Markdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import { load as loadYaml } from "js-yaml"
import { WarningCircleIcon } from "@phosphor-icons/react"
import { slugify } from "./slugify"
import { textMuted } from "./doc-styles"
import { linkProps } from "./links"
import { CodeBlock } from "./code-block"
import { ResourceCardGrid, type ResourceCardData } from "./resource-card"
import { Alert, AlertDescription, AlertTitle } from "./alert"

function textOf(node: Element): string {
  return node.children
    .map((child) => {
      if (child.type === "text") return child.value
      if (child.type === "element") return textOf(child)
      return ""
    })
    .join("")
}

type AlertBlockData = {
  variant?: "default" | "destructive"
  title?: string
  body?: string
}

const components: Components = {
  h2: ({ node, children }) => (
    <h2
      id={node ? slugify(textOf(node)) : undefined}
      className="scroll-mt-24 text-3xl font-extrabold tracking-tight"
    >
      {children}
    </h2>
  ),
  h3: ({ node, children }) => (
    <h3
      id={node ? slugify(textOf(node)) : undefined}
      className="scroll-mt-24 text-xl font-bold tracking-tight"
    >
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className={`max-w-2xl text-base ${textMuted}`}>{children}</p>
  ),
  ul: ({ children }) => <ul className="flex flex-col gap-3">{children}</ul>,
  ol: ({ children }) => <ol className="flex flex-col gap-4">{children}</ol>,
  li: ({ children }) => (
    <li className={`ml-5 list-disc text-base marker:text-[var(--color-taupe-400)] ${textMuted}`}>
      {children}
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[var(--color-taupe-950)] dark:text-[var(--color-taupe-50)]">
      {children}
    </strong>
  ),
  a: ({ children, href }) => (
    <a
      {...linkProps(href ?? "#")}
      className="text-primary underline underline-offset-4 hover:no-underline"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <div className="rounded-lg border border-[var(--color-taupe-300)] bg-[var(--color-taupe-100)] p-4 text-sm text-[var(--color-taupe-900)] dark:bg-[var(--color-taupe-900)] dark:text-[var(--color-taupe-200)] [&_p]:max-w-none [&_p]:text-inherit">
      {children}
    </div>
  ),
  code: ({ children, className }) => {
    if (className) {
      return <code className={className}>{children}</code>
    }
    return (
      <code className="rounded bg-[var(--color-taupe-100)] px-1.5 py-0.5 font-[family-name:var(--font-geist-mono)] text-[0.85em] dark:bg-[var(--color-taupe-800)]">
        {children}
      </code>
    )
  },
  pre: ({ node }) => {
    const codeNode = node?.children.find(
      (child): child is Element =>
        child.type === "element" && child.tagName === "code"
    )
    if (!codeNode) return null

    const classNames = (codeNode.properties?.className ?? []) as string[]
    const language = classNames
      .find((name) => name.startsWith("language-"))
      ?.replace("language-", "")
    const raw = textOf(codeNode).replace(/\n$/, "")

    if (language === "card-grid") {
      const cards = (loadYaml(raw) as ResourceCardData[]) ?? []
      return <ResourceCardGrid cards={cards} />
    }

    if (language === "alert") {
      const data = (loadYaml(raw) as AlertBlockData) ?? {}
      return (
        <Alert variant={data.variant ?? "default"}>
          <WarningCircleIcon />
          {data.title && <AlertTitle>{data.title}</AlertTitle>}
          {data.body && <AlertDescription>{data.body}</AlertDescription>}
        </Alert>
      )
    }

    return <CodeBlock code={raw} language={language} />
  },
  table: ({ children }) => (
    <div className="overflow-x-auto rounded-lg border border-[var(--color-taupe-300)]">
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-[var(--color-taupe-100)] dark:bg-[var(--color-taupe-900)]">
      {children}
    </thead>
  ),
  th: ({ children }) => <th className="px-4 py-2 font-semibold">{children}</th>,
  td: ({ children }) => (
    <td className={`border-t border-[var(--color-taupe-300)] px-4 py-2 ${textMuted}`}>
      {children}
    </td>
  ),
}

export function MarkdownContent({ body }: { body: string }) {
  return (
    <div className="flex flex-col gap-6 [&>h2]:mt-4 [&>h2:first-child]:mt-0">
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {body}
      </Markdown>
    </div>
  )
}
