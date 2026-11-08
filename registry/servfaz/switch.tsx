"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

/*
 * Switch - base do Switch do shadcn com os tokens Semantic do Servi DS.
 * Desligado em border/strong, ligado em brand/filled, botão em
 * background/default. Tamanhos sm (16px de altura) e default (20px).
 * Nasceu no código (status na linha e no menu do Data Table); Figma depois.
 */

type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}

function Switch({ className, size = "default", ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer inline-flex shrink-0 items-center rounded-full border border-transparent p-px outline-none",
        "transition-[background-color,box-shadow] duration-150",
        "bg-(--color-border-strong) data-[state=checked]:bg-(--color-brand-filled)",
        "hover:data-[state=checked]:bg-(--color-brand-filled-hover)",
        "focus-visible:shadow-[0_0_0_1px_var(--color-brand-border-focus),0_0_0_4px_var(--color-brand-light-pressed)]",
        "disabled:cursor-not-allowed disabled:bg-(--color-background-muted) disabled:data-[state=checked]:bg-(--color-border-muted)",
        size === "sm" ? "h-4 w-7" : "h-5 w-9",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-(--color-background-default) shadow-xs",
          "transition-transform duration-150 data-[state=unchecked]:translate-x-0",
          size === "sm"
            ? "size-3 data-[state=checked]:translate-x-3"
            : "size-4 data-[state=checked]:translate-x-4"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
export type { SwitchProps }
