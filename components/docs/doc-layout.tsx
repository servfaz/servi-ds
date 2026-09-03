import type { ReactNode } from "react"
import type { DocHeading } from "@/lib/markdown-headings"
import { TableOfContents } from "@/components/docs/table-of-contents"

/**
 * Layout de página de documentação: título em uma faixa de largura total
 * com fundo próprio, acima do corpo (conteúdo + índice lateral direito).
 * Não usado na home ("Comece").
 */
export function DocLayout({
  header,
  headings,
  children,
}: {
  header: ReactNode
  headings: DocHeading[]
  children: ReactNode
}) {
  return (
    <div className="flex flex-col">
      <div className="-mx-4 -mt-10 bg-[var(--color-taupe-100)] px-4 pt-10 pb-10 dark:bg-[var(--color-taupe-900)] sm:-mx-8 sm:-mt-14 sm:px-8 sm:pt-14 sm:pb-14 lg:-mx-12 lg:px-12 xl:-mx-16 xl:px-16">
        {header}
      </div>
      <div className="flex gap-10 pt-10 sm:pt-14">
        <div className="flex min-w-0 flex-1 flex-col gap-10">{children}</div>
        <TableOfContents headings={headings} />
      </div>
    </div>
  )
}
