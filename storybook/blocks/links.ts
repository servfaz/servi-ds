/**
 * O conteúdo em content/docs/ continua citando as rotas antigas do site
 * (/docs/sobre, /docs/componentes/button). Aqui elas viram a URL da página
 * equivalente no Storybook, para o markdown não depender da ferramenta que
 * o exibe.
 */
/**
 * Id no Storybook de cada página de content/docs/. As páginas ficam no grupo
 * Documentação da barra lateral, então o id não é mais igual ao nome do arquivo.
 */
const PAGE_IDS: Record<string, string> = {
  comece: "documentacao-introducao",
  desenvolvedores: "documentacao-desenvolvedores",
  sobre: "documentacao-sobre",
}

export const HOME_HREF = `/?path=/docs/${PAGE_IDS.comece}--docs`

export function toStorybookHref(href: string): string {
  if (href === "/") return HOME_HREF
  const componente = href.match(/^\/docs\/componentes\/([a-z0-9-]+)\/?$/)
  if (componente) return `/?path=/docs/componentes-${componente[1]}--docs`
  const pagina = href.match(/^\/docs\/([a-z0-9-]+)\/?$/)
  if (pagina) return `/?path=/docs/${PAGE_IDS[pagina[1]] ?? pagina[1]}--docs`
  return href
}

export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href)
}

/** Links internos saem do iframe da página e navegam na janela do Storybook. */
export function linkProps(href: string) {
  if (isExternal(href)) {
    return { href, target: "_blank", rel: "noopener noreferrer" }
  }
  if (href.startsWith("#")) return { href }
  return { href: toStorybookHref(href), target: "_top" }
}

/**
 * Rota da versão em markdown puro da página aberta, a partir do id que o
 * Storybook coloca na URL do iframe (componentes-button--docs). As rotas
 * .md são geradas no build a partir de content/docs/.
 */
export function markdownHrefFromStoryId(id: string | null): string | null {
  const storyId = id?.match(/^([a-z0-9-]+)--docs$/)?.[1]
  if (!storyId) return null
  const page =
    Object.entries(PAGE_IDS).find(([, pageId]) => pageId === storyId)?.[0] ?? storyId
  const componente = page.match(/^componentes-(.+)$/)
  return componente ? `/docs/componentes/${componente[1]}.md` : `/docs/${page}.md`
}
