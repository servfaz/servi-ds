import Markdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import { linkProps } from "./links"

/**
 * Texto curto em markdown dentro dos blocos visuais (cards, passos, avisos).
 * Só formatação de linha: código, link e negrito. O parágrafo vira span para
 * herdar a cor e o tamanho do bloco que o contém.
 */
const components: Components = {
  p: ({ children }) => <span className="block">{children}</span>,
  strong: ({ children }) => <strong className="font-semibold text-current">{children}</strong>,
  a: ({ children, href }) => (
    <a
      {...linkProps(href ?? "#")}
      className="underline decoration-current/40 underline-offset-4 hover:decoration-current"
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="rounded bg-[var(--color-brand-light)] px-1.5 py-0.5 font-[family-name:var(--typography-font-mono)] text-[0.85em] text-[var(--color-brand-foreground-emphasis)]">
      {children}
    </code>
  ),
}

export function InlineMarkdown({ children }: { children?: string }) {
  if (!children) return null
  return (
    <Markdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </Markdown>
  )
}
