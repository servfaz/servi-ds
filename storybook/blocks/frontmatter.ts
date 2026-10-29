import { load as loadYaml } from "js-yaml"

export type DocFrontmatter = {
  title: string
  description?: string
  updated?: string
}

export type Doc = {
  frontmatter: DocFrontmatter
  body: string
  raw: string
}

/** Separa frontmatter e corpo de um arquivo .md de content/docs/. */
export function parseDoc(source: string): Doc {
  const raw = source.replace(/\r\n/g, "\n")
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!match) {
    return { frontmatter: { title: "" }, body: raw.trim(), raw }
  }
  return {
    frontmatter: (loadYaml(match[1]) as DocFrontmatter) ?? { title: "" },
    body: raw.slice(match[0].length).trim(),
    raw,
  }
}

export function formatUpdatedDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`)
  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
