import * as React from "react"
import { FileMdIcon } from "@phosphor-icons/react"
import { Button } from "@/registry/servfaz/button"
import { markdownHrefFromStoryId } from "./links"

/**
 * Regra 16: abre a versão em markdown puro da página em uma rota própria
 * (/docs/<pagina>.md), o link que se entrega para uma LLM ler a página.
 * Fica ao lado do botão de copiar como markdown (Regra 12).
 */
export function ViewMarkdownLink() {
  const [href, setHref] = React.useState<string | null>(null)

  React.useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id")
    setHref(markdownHrefFromStoryId(id))
  }, [])

  if (!href) return null

  return (
    <Button asChild variant="outline" size="sm" className="gap-1.5">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <FileMdIcon className="size-3.5" />
        Ver como .md
      </a>
    </Button>
  )
}
