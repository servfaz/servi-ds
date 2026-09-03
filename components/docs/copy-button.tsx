"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "@phosphor-icons/react"
import { Button } from "@/registry/servfaz/button"
import { cn } from "@/lib/utils"

export function CopyButton({
  text,
  label = "Copiar",
  copiedLabel = "Copiado",
  className,
}: {
  text: string
  label?: string
  copiedLabel?: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className={cn("gap-1.5", className)}
    >
      {copied ? (
        <CheckIcon className="size-3.5" />
      ) : (
        <CopyIcon className="size-3.5" />
      )}
      {copied ? copiedLabel : label}
    </Button>
  )
}
