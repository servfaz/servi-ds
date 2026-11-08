/*
 * Publica a documentação em markdown para LLMs (padrão llmstxt.org).
 *
 * Roda depois do "storybook build". Para cada arquivo de content/docs/, grava
 * no build uma cópia com a mesma rota amigável do site, terminada em .md:
 *   content/docs/desenvolvedores.md      -> /docs/desenvolvedores.md
 *   content/docs/componentes/button.md   -> /docs/componentes/button.md
 * E gera dois arquivos na raiz:
 *   /llms.txt       índice com o link de cada página .md
 *   /llms-full.txt  toda a documentação em um arquivo só
 *
 * A cópia publicada é o próprio arquivo de content/docs/, com duas mudanças:
 * quebra de linha normalizada para LF e links internos do site
 * (/docs/<pagina>) trocados pela URL absoluta da versão .md, para a LLM
 * conseguir seguir de uma página para outra sem cair no HTML do Storybook.
 *
 * Uso: node scripts/build-llm-docs.cjs [pasta-de-saida]
 */
const fs = require("node:fs")
const path = require("node:path")
const yaml = require("js-yaml")

const root = path.resolve(__dirname, "..")
const docsDir = path.join(root, "content", "docs")
const outDir = path.resolve(root, process.argv[2] || "storybook-static")
const siteUrl = (process.env.SITE_URL || "https://ds.servfaz.app").replace(/\/$/, "")

// Páginas ocultas no site também ficam fora das rotas .md.
// Mesma lista de .storybook/main.ts ("!(sobre).mdx").
const HIDDEN = new Set(["sobre"])

// Ordem das páginas de apoio no índice. As que não estão aqui vêm depois,
// em ordem alfabética.
const GUIDE_ORDER = ["comece", "desenvolvedores", "componentes"]

function listMarkdown(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return listMarkdown(full)
    return entry.name.endsWith(".md") ? [full] : []
  })
}

function splitFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!match) return { meta: {}, body: source.trim() }
  return { meta: yaml.load(match[1]) || {}, body: source.slice(match[0].length).trim() }
}

const mdUrl = (slug) => `${siteUrl}/docs/${slug}.md`

/** Troca rotas internas do site pela URL absoluta da versão .md. */
function absolutizeLinks(source, slugs) {
  const toMd = (href) => {
    if (href === "/") return mdUrl("comece")
    const match = href.match(/^\/docs\/([a-z0-9/-]+?)\/?$/)
    if (match && slugs.has(match[1])) return mdUrl(match[1])
    // Página sem versão .md (componente com página automática): URL absoluta
    // da página no site, para o link continuar funcionando fora dele.
    return match ? `${siteUrl}${href}` : href
  }
  return source
    // Links em markdown: [texto](/docs/pagina) e [texto](/docs/pagina "título")
    .replace(/\]\((\/[^)\s]*)(\s+"[^"]*")?\)/g, (all, href, title = "") =>
      `](${toMd(href)}${title})`)
    // Campos href dos blocos de cards: href: /docs/pagina ou href: "/docs/pagina"
    .replace(/^(\s*-?\s*href:\s*)(["']?)(\/[^"'\s]*)\2\s*$/gm, (all, key, quote, href) =>
      `${key}${quote}${toMd(href)}${quote}`)
}

const pages = listMarkdown(docsDir)
  .map((file) => {
    const slug = path.relative(docsDir, file).split(path.sep).join("/").replace(/\.md$/, "")
    const source = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n")
    return { slug, source, ...splitFrontmatter(source) }
  })
  .sort((a, b) => a.slug.localeCompare(b.slug))

const visible = pages.filter((page) => !HIDDEN.has(page.slug))
const slugs = new Set(visible.map((page) => page.slug))

for (const page of pages) {
  const target = path.join(outDir, "docs", `${page.slug}.md`)
  if (HIDDEN.has(page.slug)) {
    // O staticDirs do Storybook copia content/docs/ inteiro para o build
    // (para a rota funcionar no dev). Página oculta sai daqui.
    fs.rmSync(target, { force: true })
    continue
  }
  page.published = absolutizeLinks(page.source, slugs)
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, page.published)
}

const rank = (slug) => {
  const index = GUIDE_ORDER.indexOf(slug)
  return index === -1 ? GUIDE_ORDER.length : index
}
const guides = visible
  .filter((p) => !p.slug.includes("/"))
  .sort((a, b) => rank(a.slug) - rank(b.slug) || a.slug.localeCompare(b.slug))
const components = visible.filter((p) => p.slug.startsWith("componentes/"))

const title = (page) => page.meta.title || page.slug

function indexLine(page) {
  const desc = page.meta.description ? `: ${page.meta.description}` : ""
  return `- [${title(page)}](${mdUrl(page.slug)})${desc}`
}

const summary =
  "> Design system interno, construído sobre o registry do shadcn/ui. " +
  "Componentes e tokens são instalados com o CLI do shadcn a partir deste site " +
  `(\`npx shadcn@latest add ${siteUrl}/r/<nome>.json\`). ` +
  "Os ícones vêm sempre do Phosphor Icons e toda cor, espaçamento e raio é um token (`var(--nome-do-token)`), nunca valor solto."

const llms = [
  "# Servi DS",
  "",
  summary,
  "",
  "Cada link abaixo aponta para a versão em markdown puro da página. " +
    `A documentação inteira em um arquivo só está em ${siteUrl}/llms-full.txt.`,
  "",
  "## Guias",
  "",
  ...guides.map(indexLine),
  "",
  "## Componentes",
  "",
  ...components.map(indexLine),
  "",
  "## Opcional",
  "",
  `- [Catálogo do registry](${siteUrl}/r/registry.json): lista de todos os itens publicados, em JSON.`,
  "",
].join("\n")

// Cada página entra com o título como nível 1 e a URL de origem, e os
// títulos internos descem um nível para não competir com o da página.
function fullSection(page) {
  const body = absolutizeLinks(page.body, slugs)
  let inFence = false
  const shifted = body
    .split("\n")
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) inFence = !inFence
      return !inFence && /^#{1,5}\s/.test(line) ? `#${line}` : line
    })
    .join("\n")
  const desc = page.meta.description ? `\n\n${page.meta.description}` : ""
  return `# ${title(page)}\n\nFonte: ${mdUrl(page.slug)}${desc}\n\n${shifted}`
}

const full = [
  `# Servi DS: documentação completa\n\n${summary}`,
  ...guides.map(fullSection),
  ...components.map(fullSection),
].join("\n\n---\n\n") + "\n"

fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, "llms.txt"), llms)
fs.writeFileSync(path.join(outDir, "llms-full.txt"), full)

console.log(
  `build-llm-docs: ${visible.length} páginas .md, llms.txt e llms-full.txt em ${path.relative(root, outDir) || "."}`,
)
