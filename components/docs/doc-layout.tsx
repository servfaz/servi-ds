import type { ReactNode } from "react"
import type { DocHeading } from "@/lib/markdown-headings"
import { TableOfContents } from "@/components/docs/table-of-contents"

/**
 * Layout de página de documentação: conteúdo + índice lateral direito,
 * estreito, com os títulos da própria página. Não usado na home ("Comece").
 */
export function DocLayout({
  headings,
  children,
}: {
  headings: DocHeading[]
  children: ReactNode
}) {
  return (
    <div className="flex gap-10">
      <div className="flex min-w-0 flex-1 flex-col gap-10">{children}</div>
      <TableOfContents headings={headings} />
    </div>
  )
}
