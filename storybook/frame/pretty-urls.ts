import type { Channel } from "storybook/internal/channels"
import { DOCS_RENDERED, STORY_CHANGED } from "storybook/internal/core-events"

/**
 * Endereços amigáveis no site público: /componentes/button em vez de
 * /?path=/docs/componentes-button--docs.
 *
 * O roteador do Storybook só entende o parâmetro ?path=. Por isso:
 * 1. A Vercel redireciona o endereço amigável para o do Storybook (vercel.json),
 *    então recarregar ou compartilhar o link sempre funciona.
 * 2. Depois que o Storybook abre a página, a barra de endereço passa a
 *    mostrar o endereço amigável (sem recarregar nada).
 * 3. No voltar e avançar do navegador, o endereço amigável é trocado de novo
 *    pelo do Storybook antes de o roteador ler a URL.
 *
 * Testado no site publicado: navegação pela barra lateral, voltar e avançar.
 *
 * Os demais parâmetros (globals, args) e a âncora continuam na URL.
 */

const HOME_ID = "documentacao-introducao"
const PAGE_PREFIX = "documentacao-"
const GROUPS = ["componentes", "patterns", "foundations", "resources"]

/** "/docs/componentes-button--docs" vira "/componentes/button". */
export function prettyFromStoryPath(path: string | null): string | null {
  const id = path?.match(/^\/docs\/([a-z0-9-]+)--docs$/)?.[1]
  if (!id) return null
  if (id === HOME_ID) return "/"
  if (id.startsWith(PAGE_PREFIX)) return `/${id.slice(PAGE_PREFIX.length)}`
  const group = GROUPS.find((name) => id.startsWith(`${name}-`))
  return group ? `/${group}/${id.slice(group.length + 1)}` : null
}

/** "/componentes/button" vira "/docs/componentes-button--docs". */
export function storyPathFromPretty(pathname: string): string | null {
  const clean = pathname.replace(/\/+$/, "") || "/"
  if (clean === "/") return `/docs/${HOME_ID}--docs`
  const match = clean.match(/^\/([a-z0-9-]+)(?:\/([a-z0-9-]+))?$/)
  if (!match) return null
  const [, first, second] = match
  if (second) return GROUPS.includes(first) ? `/docs/${first}-${second}--docs` : null
  return `/docs/${PAGE_PREFIX}${first}--docs`
}

export function installPrettyUrls(channel: Channel) {
  const replace = (url: string) => {
    if (url !== location.pathname + location.search + location.hash) {
      window.history.replaceState(window.history.state, "", url)
    }
  }

  // Endereço amigável na barra, depois de o Storybook abrir a página.
  const showPretty = () => {
    const params = new URLSearchParams(location.search)
    const pretty = prettyFromStoryPath(params.get("path"))
    if (!pretty) return
    params.delete("path")
    const rest = params.toString()
    replace(`${pretty}${rest ? `?${rest}` : ""}${location.hash}`)
  }

  // Endereço do Storybook de volta. Devolve true quando trocou.
  const showStorybook = () => {
    const params = new URLSearchParams(location.search)
    if (params.has("path")) return false
    const path = storyPathFromPretty(location.pathname)
    if (!path) return false
    const rest = params.toString()
    replace(`/?path=${path}${rest ? `&${rest}` : ""}${location.hash}`)
    return true
  }

  // Voltar e avançar: o roteador do Storybook precisa ler o endereço dele. O
  // evento é trocado por um novo, já com esse endereço, para funcionar mesmo
  // que o roteador tenha ouvido o evento antes.
  window.addEventListener(
    "popstate",
    (event) => {
      if (!showStorybook()) return
      event.stopImmediatePropagation()
      window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }))
    },
    { capture: true },
  )

  channel.on(STORY_CHANGED, () => setTimeout(showPretty, 0))
  channel.on(DOCS_RENDERED, () => setTimeout(showPretty, 0))

  showStorybook()
}
