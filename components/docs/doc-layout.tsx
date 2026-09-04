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
        <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_11rem] xl:gap-10">
          <div className="mx-auto max-w-[var(--docs-content-max-width)]">
            {header}
          </div>
        </div>
      </div>
      <div className="flex flex-col pt-10 sm:pt-14 xl:grid xl:grid-cols-[minmax(0,1fr)_11rem] xl:gap-10">
        <div className="mx-auto flex min-w-0 max-w-[var(--docs-content-max-width)] flex-col gap-10">
          {children}
        </div>
        <TableOfContents headings={headings} />
      </div>
    </div>
  )
}
