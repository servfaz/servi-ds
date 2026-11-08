import * as React from "react"
import { cn } from "@/lib/utils"

const itemClassName =
  "flex w-full items-center gap-2.5 rounded-(--radius-md) px-2.5 py-2 text-left text-sm text-(--color-foreground-default) no-underline outline-none transition-colors hover:bg-(--color-brand-light-hover) hover:text-(--color-foreground-emphasis) focus-visible:bg-(--color-brand-light-hover) focus-visible:text-(--color-foreground-emphasis) [&_svg]:size-4 [&_svg]:shrink-0"

/** Item do menu do botão Copiar página: botão ou link, com ícone à esquerda. */
export function CopyPageMenuItem({
  href,
  onSelect,
  children,
  className,
}: {
  href?: string
  onSelect?: () => void
  children: React.ReactNode
  className?: string
}) {
  if (href) {
    return (
      <a
        role="menuitem"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onSelect}
        className={cn(itemClassName, className)}
      >
        {children}
      </a>
    )
  }
  return (
    <button type="button" role="menuitem" onClick={onSelect} className={cn(itemClassName, className)}>
      {children}
    </button>
  )
}
