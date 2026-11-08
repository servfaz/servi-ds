import * as React from "react"
import { markdownHrefFromStoryId } from "./links"

/**
 * Rota da versão em markdown puro da página aberta (/docs/<pagina>.md), a
 * partir do id que o Storybook coloca na URL do iframe. Regra 16.
 */
export function useMarkdownHref() {
  const [href, setHref] = React.useState<string | null>(null)

  React.useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id")
    setHref(markdownHrefFromStoryId(id))
  }, [])

  return href
}
