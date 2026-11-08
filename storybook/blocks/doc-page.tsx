import type { ReactNode } from "react"
import { Unstyled } from "@storybook/addon-docs/blocks"
import { parseDoc, splitTabs } from "./frontmatter"
import { PageHeader } from "./page-header"
import { MarkdownContent } from "./markdown-content"
import { CodeBlock } from "./code-block"
import { DocSection } from "./doc-section"
import { DocTabs } from "./doc-tabs"
import type { StoriesModule } from "./demo"

/**
 * Página de documentação montada a partir de um arquivo de content/docs/.
 * O markdown continua sendo a fonte única (Regra 4): esta peça só exibe.
 *
 * Páginas de componente seguem o modelo do Mantine: cabeçalho com
 * metadados, abas vindas dos títulos de nível 1 do markdown e exemplos ao
 * vivo intercalados no texto (blocos ```tsx demo=<Story>```). O código-fonte
 * do registry fecha a primeira aba.
 */
export function DocPage({
  raw,
  source,
  stories,
  toc = true,
  markdownActions = true,
  children,
}: {
  raw: string
  source?: string
  stories?: StoriesModule
  /** false tira o índice "Nesta página" desta página. */
  toc?: boolean
  /** false tira os botões de versão em markdown do topo desta página. */
  markdownActions?: boolean
  children?: ReactNode
}) {
  const doc = parseDoc(raw)
  const { intro, tabs } = splitTabs(doc.body)

  const sourceSection = source ? (
    <DocSection title="Código-fonte">
      <CodeBlock code={source.replace(/\r\n/g, "\n")} language="tsx" />
    </DocSection>
  ) : null

  return (
    <Unstyled>
      <div
        data-doc-toc={toc ? undefined : "off"}
        className="flex flex-col gap-10 py-6 font-[family-name:var(--typography-font-sans)] text-[var(--color-foreground-emphasis)]">
        <PageHeader frontmatter={doc.frontmatter} raw={doc.raw} markdownActions={markdownActions} />
        {children}
        {intro && <MarkdownContent body={intro} stories={stories} />}
        {tabs.length > 0 ? (
          <DocTabs
            tabs={tabs}
            renderTab={(tab, index) => (
              <div className="flex flex-col gap-10">
                <MarkdownContent body={tab.body} stories={stories} />
                {index === 0 && sourceSection}
              </div>
            )}
          />
        ) : (
          sourceSection
        )}
      </div>
    </Unstyled>
  )
}
