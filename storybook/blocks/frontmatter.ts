import { load as loadYaml } from "js-yaml"
import { slugify } from "./slugify"

export type DocFrontmatter = {
  title: string
  description?: string
  updated?: string
  /** Nome do item no registry.json. Presente só nas páginas de componente. */
  name?: string
  /** Link do componente no arquivo Components do Figma (opcional). */
  figma?: string
  /** Ilustração do topo da página, imagem ou vídeo .webm (opcional). Com ela, o topo vira um hero. */
  hero?: string
  /** Primeiro quadro do vídeo do hero, usado enquanto carrega e com movimento reduzido. */
  heroPoster?: string
}

export type Doc = {
  frontmatter: DocFrontmatter
  body: string
  raw: string
}

export type DocTab = {
  value: string
  label: string
  body: string
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

/**
 * Divide o corpo em abas pelos títulos de nível 1 (`# Documentação`,
 * `# Props`, `# Tokens`), ignorando linhas dentro de blocos de código.
 * O texto antes do primeiro título de nível 1 volta como `intro`.
 * Página sem título de nível 1 (páginas de apoio) volta sem abas.
 */
export function splitTabs(body: string): { intro: string; tabs: DocTab[] } {
  const lines = body.split("\n")
  const intro: string[] = []
  const tabs: { label: string; lines: string[] }[] = []
  let inFence = false

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence
    const heading = !inFence && line.match(/^#\s+(.+?)\s*$/)
    if (heading) {
      tabs.push({ label: heading[1], lines: [] })
      continue
    }
    if (tabs.length === 0) intro.push(line)
    else tabs[tabs.length - 1].lines.push(line)
  }

  return {
    intro: intro.join("\n").trim(),
    tabs: tabs.map((tab) => ({
      value: slugify(tab.label),
      label: tab.label,
      body: tab.lines.join("\n").trim(),
    })),
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
