import { notFound } from "next/navigation"
import type { Metadata } from "next"
import registry from "@/registry.json"
import { readDoc } from "@/lib/content"
import { readComponentSource } from "@/lib/registry-source"
import { extractHeadings } from "@/lib/markdown-headings"
import { PageHeader } from "@/components/docs/page-header"
import { MarkdownContent } from "@/components/docs/markdown-content"
import { componentPreviews } from "@/components/docs/component-previews"
import { ComponentSource } from "@/components/docs/component-source"
import { DocLayout } from "@/components/docs/doc-layout"

const componentNames = registry.items
  .filter((item) => item.type === "registry:ui")
  .map((item) => item.name)

export function generateStaticParams() {
  return componentNames.map((nome) => ({ nome }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ nome: string }>
}): Promise<Metadata> {
  const { nome } = await params
  const item = registry.items.find((i) => i.name === nome)
  return {
    title: item ? `${item.title} — Servi DS` : "Componente — Servi DS",
    description: item?.description,
  }
}

export default async function ComponentePage({
  params,
}: {
  params: Promise<{ nome: string }>
}) {
  const { nome } = await params

  if (!componentNames.includes(nome)) {
    notFound()
  }

  const doc = readDoc(`componentes/${nome}`)
  const headings = extractHeadings(doc.body)
  const Preview = componentPreviews[nome]
  const source = readComponentSource(nome)

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
      {Preview && <Preview />}
      <ComponentSource code={source} />
      <MarkdownContent body={doc.body} />
    </DocLayout>
  )
}
