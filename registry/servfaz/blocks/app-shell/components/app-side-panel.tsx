"use client"

import * as React from "react"
import { XIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useSidebar } from "@/components/ui/sidebar"

/*
 * AppSidePanel - bloco da direita do App Shell, espelho do "right block" do
 * Figma ([SDS] Components, página App Shell). Abre ao clicar no chat com a
 * IA ou nas notificações do cabeçalho e divide a tela com o conteúdo:
 * 352px de largura, 8px de respiro de cada lado, cantos de cima
 * arredondados e fundo background/subtle. Fecha pelo X, pela tecla Esc ou
 * clicando de novo no botão que abriu.
 * No celular não cabe ao lado do conteúdo: vira Sheet pela direita.
 * Arquivo de bloco: o sistema troca o conteúdo de cada painel.
 */

type AppSidePanelProps = Omit<React.ComponentProps<"aside">, "title"> & {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: React.ReactNode
  /** Texto para leitor de tela (obrigatório na Sheet do celular). */
  description?: string
  closeLabel?: string
}

function AppSidePanel({
  open,
  onOpenChange,
  title,
  description,
  closeLabel = "Fechar painel",
  className,
  children,
  ...props
}: AppSidePanelProps) {
  const { isMobile } = useSidebar()
  const titleId = React.useId()

  // Esc fecha o painel (a Sheet do celular já faz isso sozinha).
  React.useEffect(() => {
    if (!open || isMobile) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.defaultPrevented) onOpenChange(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, isMobile, onOpenChange])

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="gap-0 bg-(--color-background-subtle)">
          <SheetHeader className="border-b border-(--color-border-muted)">
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription className="sr-only">{description ?? title}</SheetDescription>
          </SheetHeader>
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  if (!open) return null

  return (
    <div
      data-slot="app-side-panel-wrapper"
      // Fica preso abaixo do cabeçalho enquanto o conteúdo rola.
      className="sticky top-(--header-height) h-[calc(100svh-var(--header-height))] w-[calc(var(--side-panel-width)+var(--spacing)*4)] shrink-0 self-start px-2"
    >
      <aside
        data-slot="app-side-panel"
        aria-labelledby={titleId}
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-t-(--radius-xl) border-x border-t border-(--color-border-default) bg-(--color-background-subtle)",
          className
        )}
        {...props}
      >
        <header className="flex shrink-0 items-center justify-between gap-2 border-b border-(--color-border-muted) px-4 py-2">
          <h2 id={titleId} className="truncate typo-sans-md-medium text-(--color-foreground-emphasis)">
            {title}
          </h2>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={closeLabel}
            title={closeLabel}
            className="text-(--color-foreground-muted) hover:bg-(--color-palette-olive-light-hover) hover:text-(--color-foreground-default) active:bg-(--color-palette-olive-light-pressed)"
            onClick={() => onOpenChange(false)}
          >
            <XIcon />
          </Button>
        </header>
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4">{children}</div>
      </aside>
    </div>
  )
}

export { AppSidePanel }
export type { AppSidePanelProps }
