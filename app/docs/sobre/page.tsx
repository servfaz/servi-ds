import type { Metadata } from "next"
import { readDoc } from "@/lib/content"
import { extractHeadings } from "@/lib/markdown-headings"
import { PageHeader } from "@/components/docs/page-header"
import { MarkdownContent } from "@/components/docs/markdown-content"
import { DocLayout } from "@/components/docs/doc-layout"

export const metadata: Metadata = {
  title: "Sobre o Design System | Servi DS",
  description: "O que é o Servi DS, para que serve e como ele é distribuído.",
}

export default function SobrePage() {
  const doc = readDoc("sobre")
  const headings = extractHeadings(doc.body)

  return (
    <DocLayout headings={headings}>
      <PageHeader
        title={doc.frontmatter.title}
        description={doc.frontmatter.description}
        updated={doc.frontmatter.updated}
        raw={doc.raw}
      />
      <MarkdownContent body={doc.body} />
    </DocLayout>
  )
}
