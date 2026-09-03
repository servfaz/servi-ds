import type { Metadata } from "next"
import { readDoc } from "@/lib/content"
import { PageHeader } from "@/components/docs/page-header"
import { MarkdownContent } from "@/components/docs/markdown-content"

export const metadata: Metadata = {
  title: "Sobre — Servi DS",
  description: "O que é o Servi DS, para que serve e como ele é distribuído.",
}

export default function SobrePage() {
  const doc = readDoc("sobre")

  return (
    <>
      <PageHeader
        title={doc.frontmatter.title}
        description={doc.frontmatter.description}
        updated={doc.frontmatter.updated}
        raw={doc.raw}
      />
      <MarkdownContent body={doc.body} />
    </>
  )
}
