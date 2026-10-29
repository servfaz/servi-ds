import type { ReactNode } from "react"
import { Unstyled } from "@storybook/addon-docs/blocks"
import { parseDoc } from "./frontmatter"
import { PageHeader } from "./page-header"
import { MarkdownContent } from "./markdown-content"
import { CodeBlock } from "./code-block"
import { DocSection } from "./doc-section"

/**
 * Página de documentação montada a partir de um arquivo de content/docs/.
 * O markdown continua sendo a fonte única (Regra 4): esta peça só exibe,
 * com cabeçalho, botão de copiar como markdown (Regra 12) e, nas páginas
 * de componente, os exemplos ao vivo e o código-fonte do registry.
 */
export function DocPage({
  raw,
  source,
  children,
}: {
  raw: string
  source?: string
  children?: ReactNode
}) {
  const doc = parseDoc(raw)

  return (
    <Unstyled>
      <div className="flex flex-col gap-10 py-6 font-[family-name:var(--font-dm-sans)] text-[var(--color-taupe-950)] dark:text-[var(--color-taupe-50)]">
        <PageHeader
          title={doc.frontmatter.title}
          description={doc.frontmatter.description}
          updated={doc.frontmatter.updated}
          raw={doc.raw}
        />
        {children}
        {source && (
          <DocSection title="Código-fonte">
            <CodeBlock code={source.replace(/\r\n/g, "\n")} language="tsx" />
          </DocSection>
        )}
        <MarkdownContent body={doc.body} />
      </div>
    </Unstyled>
  )
}
