import * as React from "react"
import {
  ArrowUpRightIcon,
  CaretDownIcon,
  ChatCircleTextIcon,
  CheckIcon,
  CopyIcon,
} from "@phosphor-icons/react"
import { Button } from "@/registry/servfaz/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/servfaz/popover"
import { CopyPageMenuItem } from "./copy-page-menu-item"
import { useMarkdownHref } from "./use-markdown-href"

const COPIED_MS = 2000

/** Link que abre uma conversa no Claude.ai já pedindo a leitura da página. */
function claudeChatHref(markdownHref: string) {
  const url = new URL(markdownHref, window.location.origin).href
  const prompt = `Leia ${url} e me ajude a entender e usar esta página da documentação do Servi DS.`
  return `https://claude.ai/new?q=${encodeURIComponent(prompt)}`
}

/**
 * Botão agrupado de markdown da página (Regras 12 e 16): a parte principal
 * copia a página inteira como markdown; a seta abre o menu com copiar,
 * abrir a versão .md e conversar no Claude.ai sobre a página.
 */
export function CopyPageMenu({ raw }: { raw: string }) {
  const markdownHref = useMarkdownHref()
  const [open, setOpen] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<number>(undefined)

  React.useEffect(() => () => window.clearTimeout(timer.current), [])

  async function copy() {
    await navigator.clipboard.writeText(raw)
    setCopied(true)
    setOpen(false)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), COPIED_MS)
  }

  return (
    <div role="group" aria-label="Markdown da página" className="inline-flex">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={copy}
        className="gap-1.5 rounded-r-none"
      >
        {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
        <span aria-live="polite">{copied ? "Copiado!" : "Copiar página"}</span>
      </Button>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-label="Mais opções de markdown"
            className="-ml-px rounded-l-none px-2"
          >
            <CaretDownIcon className="size-3.5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" role="menu" className="w-64 p-1">
          <CopyPageMenuItem onSelect={copy}>
            <CopyIcon />
            Copiar página como Markdown
          </CopyPageMenuItem>
          {markdownHref && (
            <>
              <CopyPageMenuItem href={markdownHref} onSelect={() => setOpen(false)}>
                <ArrowUpRightIcon />
                Abrir Markdown
              </CopyPageMenuItem>
              <CopyPageMenuItem href={claudeChatHref(markdownHref)} onSelect={() => setOpen(false)}>
                <ChatCircleTextIcon />
                Conversar no Claude.ai
              </CopyPageMenuItem>
            </>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
