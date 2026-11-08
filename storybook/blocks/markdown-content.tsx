import * as React from "react"
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
import { Demo, parseDemoMeta, type StoriesModule } from "./demo"

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

function buildComponents(stories?: StoriesModule): Components {
  return {
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
    <li className={`ml-5 list-disc text-base marker:text-[var(--color-brand-foreground-muted)] ${textMuted}`}>
      {children}
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[var(--color-foreground-emphasis)]">
      {children}
    </strong>
  ),
  a: ({ children, href }) => (
    <a
      {...linkProps(href ?? "#")}
      className="text-[var(--color-brand-foreground-default)] underline decoration-[var(--color-brand-border)] underline-offset-4 hover:text-[var(--color-brand-foreground-emphasis)] hover:decoration-current"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <div className="rounded-lg border border-[var(--color-brand-border)] bg-[var(--color-brand-subtle)] p-4 text-sm text-[var(--color-brand-foreground-emphasis)] [&_p]:max-w-none [&_p]:text-inherit">
      {children}
    </div>
  ),
  code: ({ children, className }) => {
    if (className) {
      return <code className={className}>{children}</code>
    }
    return (
      <code className="rounded bg-[var(--color-background-muted)] px-1.5 py-0.5 font-[family-name:var(--typography-font-mono)] text-[0.85em]">
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
    const demo = parseDemoMeta(
      (codeNode.data as { meta?: string } | undefined)?.meta
    )

    if (demo) {
      return (
        <Demo
          stories={stories}
          storyName={demo.storyName}
          withControls={demo.withControls}
          code={raw}
          language={language}
        />
      )
    }

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
    <div className="overflow-x-auto rounded-lg border border-[var(--color-border-default)]">
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-[var(--color-background-muted)]">
      {children}
    </thead>
  ),
  th: ({ children }) => <th className="px-4 py-2 font-semibold">{children}</th>,
  td: ({ children }) => (
    <td className={`border-t border-[var(--color-border-default)] px-4 py-2 ${textMuted}`}>
      {children}
    </td>
  ),
  }
}

/**
 * Renderiza um trecho de markdown de content/docs/. Blocos de código com
 * `demo=<Story>` no meta viram exemplo ao vivo, usando as stories recebidas.
 */
export function MarkdownContent({
  body,
  stories,
}: {
  body: string
  stories?: StoriesModule
}) {
  const components = React.useMemo(() => buildComponents(stories), [stories])
  return (
    <div className="flex flex-col gap-6 [&>h2]:mt-4 [&>h2:first-child]:mt-0">
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {body}
      </Markdown>
    </div>
  )
}
