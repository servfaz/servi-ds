"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Toggle - base do Toggle do shadcn com os tokens Semantic do Servi DS.
 * Botão de ligar e desligar (negrito, itálico, favorito). Ligado em
 * brand/selected com texto brand/foreground/emphasis.
 */

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-(--radius-lg) whitespace-nowrap outline-none",
    "typo-sans-sm-medium text-(--color-foreground-default)",
    "transition-[color,background-color,box-shadow] duration-150",
    "hover:bg-(--color-palette-olive-light) hover:text-(--color-foreground-emphasis)",
    "data-[state=on]:bg-(--color-brand-selected) data-[state=on]:text-(--color-brand-foreground-emphasis)",
    "focus-visible:shadow-[0_0_0_1px_var(--color-brand-border-focus),0_0_0_4px_var(--color-brand-light-pressed)]",
    "disabled:pointer-events-none disabled:text-(--color-foreground-subtle)",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-(--color-border-default) bg-(--color-background-default) shadow-xs data-[state=on]:border-(--color-brand-outline)",
      },
      size: {
        default: "h-9 min-w-9 px-2",
        sm: "h-8 min-w-8 px-1.5",
        lg: "h-10 min-w-10 px-2.5",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
