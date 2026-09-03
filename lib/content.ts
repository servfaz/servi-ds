import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const CONTENT_DIR = path.join(process.cwd(), "content", "docs")

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

/** Lê e faz o parse de uma página de documentação a partir de content/docs/<relativePath>.md */
export function readDoc(relativePath: string): Doc {
  const filePath = path.join(CONTENT_DIR, `${relativePath}.md`)
  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)
  return {
    frontmatter: data as DocFrontmatter,
    body: content.trim(),
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
