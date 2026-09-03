import type { Element } from "hast"
import Markdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import { load as loadYaml } from "js-yaml"
import { textMuted } from "@/lib/doc-styles"
import { CodeBlock } from "@/components/docs/code-block"
import {
  ResourceCardGrid,
} from "@/components/docs/resource-card-grid"
import type { ResourceCardData } from "@/components/docs/resource-card"

function textOf(node: Element): string {
  return node.children
    .map((child) => {
      if (child.type === "text") return child.value
      if (child.type === "element") return textOf(child)
      return ""
    })
    .join("")
}

const components: Components = {
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold tracking-tight">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold tracking-tight">{children}</h3>
  ),
  p: ({ children }) => (
    <p className={`max-w-2xl text-base ${textMuted}`}>{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="flex flex-col gap-3">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="flex flex-col gap-4">{children}</ol>
  ),
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
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
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
      // Bloco com linguagem: tratado inteiramente pelo `pre` abaixo.
      return <code className={className}>{children}</code>
    }
    return (
      <code className="rounded bg-[var(--color-taupe-100)] px-1.5 py-0.5 text-[0.85em] dark:bg-[var(--color-taupe-800)]">
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
    const languageClass = classNames.find((name) =>
      name.startsWith("language-")
    )
    const language = languageClass?.replace("language-", "")
    const raw = textOf(codeNode).replace(/\n$/, "")

    if (language === "card-grid") {
      const cards = (loadYaml(raw) as ResourceCardData[]) ?? []
      return <ResourceCardGrid cards={cards} />
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
  th: ({ children }) => (
    <th className="px-4 py-2 font-semibold">{children}</th>
  ),
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
