import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Button - espelho do component set "Button" do Figma ([SDS] Components).
 * Cores vêm só da camada Semantic, tipografia dos estilos de texto (typo-*),
 * espaçamentos e raios das escalas Global/Tailwind.
 *
 * Valores sem variável no Figma (pendentes de variável):
 * - sombras de profundidade e brilho (rgb solto, igual ao Figma)
 * - estilo de efeito focus-ring/default usa hex fixo no Figma; aqui o anel usa
 *   brand/border-focus (1px) e brand/light-pressed (4px)
 */

// Fundo e borda em degradê do variant default (filled da marca).
const brandGradient = {
  rest: "[background:linear-gradient(var(--color-brand-filled-hover),var(--color-brand-filled))_padding-box,linear-gradient(var(--color-brand-foreground-subtle),var(--color-brand-filled))_border-box]",
  hover:
    "hover:[background:linear-gradient(var(--color-brand-filled-pressed),var(--color-brand-filled-hover))_padding-box,linear-gradient(var(--color-brand-filled),var(--color-brand-filled-hover))_border-box]",
  pressed:
    "active:[background:linear-gradient(var(--color-brand-filled-pressed),var(--color-brand-filled-pressed))_padding-box,linear-gradient(var(--color-brand-filled-pressed),var(--color-brand-filled-hover))_border-box]",
}

// Anel de foco dos variants com caixa (estilo de efeito focus-ring/default).
const focusRing =
  "focus-visible:shadow-[0_0_0_1px_var(--color-brand-border-focus),0_0_0_4px_var(--color-brand-light-pressed)]"

// Foco dos variants sem caixa (ghost e link): borda interna de 2px.
const insetFocus =
  "focus-visible:shadow-[inset_0_0_0_2px_var(--color-brand-border-focus)]"

// Desabilitado dos variants com caixa.
const disabledBox =
  "disabled:[background:var(--color-background-muted)] disabled:border-(--color-border-muted) disabled:text-(--color-foreground-subtle) disabled:shadow-none"

const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center whitespace-nowrap border border-transparent",
    "transition-[color,background-color,border-color,box-shadow] duration-150 outline-none",
    "disabled:pointer-events-none aria-disabled:pointer-events-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: [
          "text-(--color-brand-foreground-on-filled)",
          brandGradient.rest,
          brandGradient.hover,
          brandGradient.pressed,
          "shadow-[0_0_0_1px_var(--color-brand-filled-pressed),0_2px_4px_0_rgb(0_0_0/0.1)]",
          "active:shadow-[inset_0_1px_2px_0_rgb(0_0_0/0.2),0_0_0_1px_var(--color-brand-filled-pressed)]",
          "focus-visible:shadow-[0_0_0_1px_var(--color-brand-filled-pressed),0_2px_4px_0_rgb(0_0_0/0.1),0_0_0_2px_var(--color-background-default),0_0_0_4px_var(--color-brand-border-focus)]",
          disabledBox,
        ],
        outline: [
          "bg-(--color-background-default) border-(--color-border-default) text-(--color-foreground-emphasis) shadow-xs",
          "hover:bg-(--color-palette-olive-light)",
          "active:bg-(--color-palette-olive-light-pressed) active:shadow-[inset_0_1px_2px_0_rgb(0_0_0/0.06)]",
          focusRing,
          disabledBox,
        ],
        secondary: [
          "bg-(--color-palette-olive-subtle) border-(--color-border-default) text-(--color-foreground-emphasis)",
          "hover:bg-(--color-palette-olive-subtle-hover)",
          "active:bg-(--color-palette-olive-subtle-pressed) active:shadow-[inset_0_1px_2px_0_rgb(0_0_0/0.06)]",
          focusRing,
          disabledBox,
        ],
        ghost: [
          "bg-transparent text-(--color-brand-foreground-default)",
          "hover:bg-(--color-brand-subtle) active:bg-(--color-brand-subtle-pressed)",
          insetFocus,
          "disabled:bg-transparent disabled:text-(--color-foreground-subtle)",
        ],
        destructive: [
          "bg-(--color-feedback-danger-filled) border-(--color-feedback-danger-outline) text-(--color-feedback-danger-foreground-on-filled)",
          "shadow-[inset_0_1px_0_0_rgb(255_255_255/0.18),0_1px_2px_0_rgb(10_10_10/0.12)]",
          "hover:bg-(--color-feedback-danger-filled-hover) hover:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.14),0_1px_2px_0_rgb(10_10_10/0.14)]",
          "active:bg-(--color-feedback-danger-filled-pressed) active:shadow-[inset_0_1px_2px_0_rgb(0_0_0/0.2)]",
          focusRing,
          disabledBox,
        ],
        link: [
          "bg-transparent text-(--color-brand-foreground-default)",
          "hover:text-(--color-brand-foreground-emphasis) active:text-(--color-brand-foreground-emphasis)",
          insetFocus,
          "disabled:text-(--color-foreground-subtle)",
        ],
      },
      size: {
        default:
          "h-9 gap-2 rounded-(--radius-lg) px-3 typo-sans-sm-semibold [&_svg:not([class*='size-'])]:size-4",
        xs: "h-6 gap-1 rounded-(--radius-md) px-2 typo-sans-xs-semibold [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-2 rounded-(--radius-lg) px-2 typo-sans-sm-semibold [&_svg:not([class*='size-'])]:size-4",
        lg: "h-10 gap-2 rounded-(--radius-lg) px-4 typo-sans-md-semibold [&_svg:not([class*='size-'])]:size-4",
        icon: "size-9 rounded-(--radius-lg) [&_svg:not([class*='size-'])]:size-4",
        "icon-xs":
          "size-6 rounded-(--radius-md) [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-(--radius-lg) [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg":
          "size-10 rounded-(--radius-lg) [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant ?? "default"}
      data-size={size ?? "default"}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
