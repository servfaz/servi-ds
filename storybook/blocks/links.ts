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
