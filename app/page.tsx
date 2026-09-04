import { readDoc } from "@/lib/content"
import { PageHeader } from "@/components/docs/page-header"
import { MarkdownContent } from "@/components/docs/markdown-content"

export default function Home() {
  const doc = readDoc("comece")

  return (
    <div className="mx-auto flex max-w-[var(--docs-content-max-width)] flex-col gap-10">
      <PageHeader
        title={doc.frontmatter.title}
        description={doc.frontmatter.description}
        updated={doc.frontmatter.updated}
        raw={doc.raw}
      />
      <MarkdownContent body={doc.body} />
    </div>
  )
}
