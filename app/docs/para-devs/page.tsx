import type { Metadata } from "next"
import { readDoc } from "@/lib/content"
import { extractHeadings } from "@/lib/markdown-headings"
import { PageHeader } from "@/components/docs/page-header"
import { MarkdownContent } from "@/components/docs/markdown-content"
import { DocLayout } from "@/components/docs/doc-layout"

export const metadata: Metadata = {
  title: "Para devs | Servi DS",
  description:
    "Guia para devs que estão configurando um produto novo para consumir o Servi DS pela primeira vez.",
}

export default function ParaDevsPage() {
  const doc = readDoc("para-devs")
  const headings = extractHeadings(doc.body)

  return (
    <DocLayout
      headings={headings}
      header={
        <PageHeader
          title={doc.frontmatter.title}
          description={doc.frontmatter.description}
          updated={doc.frontmatter.updated}
          raw={doc.raw}
        />
      }
    >
      <MarkdownContent body={doc.body} />
    </DocLayout>
  )
}
