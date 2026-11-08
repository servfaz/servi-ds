"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Progress - base do Progress do shadcn com os tokens Semantic do Servi DS.
 * Trilho em background/muted e barra na cor escolhida (brand, neutral ou
 * feedback). A cor só troca a variável local --progress-fill.
 * `label` mostra um texto antes da barra (por exemplo "40%" ou "1/5").
 * Nasceu no código (coluna de progresso no Data Table); Figma depois.
 */

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-(--color-background-muted)",
  {
    variants: {
      size: {
        xs: "h-1",
        sm: "h-1.5",
        default: "h-2",
      },
      color: {
        brand: "[--progress-fill:var(--color-brand-filled)]",
        neutral: "[--progress-fill:var(--color-palette-olive-filled)]",
        success: "[--progress-fill:var(--color-feedback-success-filled)]",
        warning: "[--progress-fill:var(--color-feedback-warning-filled)]",
        danger: "[--progress-fill:var(--color-feedback-danger-filled)]",
        information: "[--progress-fill:var(--color-feedback-information-filled)]",
      },
    },
    defaultVariants: { size: "sm", color: "brand" },
  }
)

type ProgressProps = Omit<React.ComponentProps<typeof ProgressPrimitive.Root>, "color"> &
  VariantProps<typeof progressVariants> & {
    /** Texto antes da barra. */
    label?: React.ReactNode
    /** Classe do conjunto (label + barra), quando há label. */
    containerClassName?: string
  }

function Progress({
  className,
  containerClassName,
  value,
  size,
  color,
  label,
  ...props
}: ProgressProps) {
  const bar = (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      className={cn(progressVariants({ size, color }), className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 rounded-full bg-(--progress-fill) transition-transform duration-300"
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )

  if (label === undefined) return bar

  return (
    <div
      data-slot="progress-field"
      className={cn("flex w-full items-center gap-2", containerClassName)}
    >
      <span className="shrink-0 typo-sans-xs-medium tabular-nums text-(--color-foreground-default)">
        {label}
      </span>
      {bar}
    </div>
  )
}

export { Progress, progressVariants }
export type { ProgressProps }
