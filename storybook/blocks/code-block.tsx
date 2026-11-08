import * as React from "react"
import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react"
import { Button } from "@/registry/servfaz/button"
import { cn } from "@/lib/utils"
import { CopyButton } from "./copy-button"
import { highlightCode } from "./shiki"

const COLLAPSE_LINE_THRESHOLD = 12

export function CodeBlock({
  code,
  language,
  className,
}: {
  code: string
  language?: string
  className?: string
}) {
  const [html, setHtml] = React.useState<string | null>(null)
  const [expanded, setExpanded] = React.useState(false)
  const collapsible = code.split("\n").length > COLLAPSE_LINE_THRESHOLD
  const isCollapsed = collapsible && !expanded

  React.useEffect(() => {
    let active = true
    highlightCode(code, language).then((result) => {
      if (active) setHtml(result)
    })
    return () => {
      active = false
    }
  }, [code, language])

  return (
    <div
      className={cn(
        // Superfície própria de código, sempre escura (classe dark), com as
        // cores do tema definidas em .code-surface (storybook/styles/globals.css).
        "dark code-surface flex flex-col overflow-hidden rounded-xl border border-[var(--code-surface-border)] bg-[var(--code-surface-background)] text-[var(--shiki-foreground)]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-[var(--code-surface-border)] bg-[var(--code-surface-header)] py-1.5 pr-1.5 pl-4">
        <span className="flex items-center gap-2 font-[family-name:var(--typography-font-mono)] text-xs text-[var(--code-surface-label)]">
          <span aria-hidden className="size-2 rounded-full bg-[var(--shiki-token-function)]" />
          {language ?? "código"}
        </span>
        <CopyButton
          text={code}
          label="Copiar"
          copiedLabel="Copiado"
          className="border-transparent bg-transparent text-[var(--code-surface-label)] shadow-none hover:bg-[var(--code-surface-border)] hover:text-[var(--shiki-foreground)]"
        />
      </div>

      <div className="relative">
        {html ? (
          <div
            className={cn(
              "overflow-x-auto p-4 font-[family-name:var(--typography-font-mono)] text-sm leading-relaxed [&_pre]:!bg-transparent",
              isCollapsed && "max-h-80 overflow-hidden"
            )}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre
            className={cn(
              "overflow-x-auto p-4 font-[family-name:var(--typography-font-mono)] text-sm",
              isCollapsed && "max-h-80 overflow-hidden"
            )}
          >
            <code>{code}</code>
          </pre>
        )}
        {isCollapsed && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--code-surface-background)] to-transparent" />
        )}
      </div>

      {collapsible && (
        <div className="flex justify-center border-t border-[var(--code-surface-border)] p-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setExpanded((value) => !value)}
            className="gap-1.5"
          >
            {expanded ? (
              <CaretUpIcon className="size-3.5" />
            ) : (
              <CaretDownIcon className="size-3.5" />
            )}
            {expanded ? "Mostrar menos" : "Mostrar código completo"}
          </Button>
        </div>
      )}
    </div>
  )
}
