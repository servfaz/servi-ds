import { unified } from "unified"
import remarkParse from "remark-parse"
import { visit } from "unist-util-visit"
import { toString } from "mdast-util-to-string"
import type { Heading as MdastHeading } from "mdast"
import { slugify } from "@/lib/slugify"

export type DocHeading = {
  depth: 2 | 3
  text: string
  slug: string
}

/**
 * Extrai os títulos (H2 e H3) do corpo em markdown de uma página, para
 * alimentar o índice lateral. Lê o texto puro, nunca o HTML renderizado.
 */
export function extractHeadings(markdown: string): DocHeading[] {
  const tree = unified().use(remarkParse).parse(markdown)
  const headings: DocHeading[] = []

  visit(tree, "heading", (node: MdastHeading) => {
    if (node.depth !== 2 && node.depth !== 3) return
    const text = toString(node)
    headings.push({ depth: node.depth, text, slug: slugify(text) })
  })

  return headings
}
