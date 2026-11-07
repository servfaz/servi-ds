/**
 * O conteúdo em content/docs/ continua citando as rotas antigas do site
 * (/docs/sobre, /docs/componentes/button). Aqui elas viram a URL da página
 * equivalente no Storybook, para o markdown não depender da ferramenta que
 * o exibe.
 */
export function toStorybookHref(href: string): string {
  if (href === "/") return "/?path=/docs/comece--docs"
  const componente = href.match(/^\/docs\/componentes\/([a-z0-9-]+)\/?$/)
  if (componente) return `/?path=/docs/componentes-${componente[1]}--docs`
  const pagina = href.match(/^\/docs\/([a-z0-9-]+)\/?$/)
  if (pagina) return `/?path=/docs/${pagina[1]}--docs`
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
  const page = id?.match(/^([a-z0-9-]+)--docs$/)?.[1]
  if (!page) return null
  const componente = page.match(/^componentes-(.+)$/)
  return componente ? `/docs/componentes/${componente[1]}.md` : `/docs/${page}.md`
}
