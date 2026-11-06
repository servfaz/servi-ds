"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

/*
 * Label - espelho do component set "Label" do Figma ([SDS] Components).
 * Estilo de texto Sans/sm/semibold, cor foreground/muted. Desabilitado: 50%
 * de opacidade, como no Figma.
 */

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 select-none",
        "typo-sans-sm-semibold text-(--color-foreground-muted)",
        "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
