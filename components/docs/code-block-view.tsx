"use client"

import * as React from "react"
import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react"
import { Button } from "@/registry/servfaz/button"
import { CopyButton } from "@/components/docs/copy-button"
import { cn } from "@/lib/utils"
import { textMuted } from "@/lib/doc-styles"

export function CodeBlockView({
  html,
  code,
  language,
  collapsible,
}: {
  html: string
  code: string
  language?: string
  collapsible: boolean
}) {
  const [expanded, setExpanded] = React.useState(false)
  const isCollapsed = collapsible && !expanded

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-[var(--color-taupe-300)] bg-[var(--color-taupe-100)] dark:bg-[var(--color-taupe-900)]">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-taupe-300)] px-4 py-2">
        <span className={cn("text-xs uppercase tracking-wide", textMuted)}>
          {language ?? "código"}
        </span>
        <CopyButton text={code} label="Copiar" copiedLabel="Copiado" />
      </div>

      <div className="relative">
        <div
          className={cn(
            "overflow-x-auto p-4 text-sm [&_pre]:!bg-transparent",
            isCollapsed && "max-h-80 overflow-hidden"
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {isCollapsed && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--color-taupe-100)] to-transparent dark:from-[var(--color-taupe-900)]" />
        )}
      </div>

      {collapsible && (
        <div className="flex justify-center border-t border-[var(--color-taupe-300)] p-2">
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
