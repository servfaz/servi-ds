import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Button - espelho do component set "Button" do Figma ([SDS] Components).
 * Cores, espaçamentos, alturas e raios vêm só dos tokens Semantic do Servi DS.
 *
 * Valores sem variável no Figma (registrados em "Variáveis pendentes"):
 * - sombras de brilho interno e de profundidade (rgb solto)
 * - altura do size xs e do icon-xs (24px, spacing/6 do Tailwind)
 * - line-height 18px do size xs
 * - raio do size lg e icon-lg usa o primitivo radius/xl direto
 */

// Sombras dos variants com fundo sólido (default e destructive)
const solidShadow =
  "shadow-[inset_0_1px_0_0_rgb(255_255_255/0.18),0_1px_2px_0_rgb(10_10_10/0.12)] hover:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.14),0_1px_2px_0_rgb(10_10_10/0.14)] active:shadow-[inset_0_1px_2px_0_rgb(0_0_0/0.2)] focus-visible:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.18),0_0_0_2px_var(--color-background-default),0_0_0_4px_var(--color-border-focus)]"

// Anel de foco duplo (fundo + cor de foco) dos variants com borda
const ringFocus =
  "focus-visible:shadow-[0_0_0_2px_var(--color-background-default),0_0_0_4px_var(--color-border-focus)]"

// Foco dos variants sem fundo (ghost e link): borda interna de 2px
const insetFocus =
  "focus-visible:shadow-[inset_0_0_0_2px_var(--color-border-focus)]"

// Estado desabilitado comum aos variants com fundo
const disabledFilled =
  "disabled:bg-(--color-background-disabled) disabled:border-(--color-border-disabled) disabled:text-(--color-text-disabled) disabled:shadow-none"

const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center whitespace-nowrap border border-transparent",
    "font-(family-name:--typography-font-family) font-semibold",
    "transition-[color,background-color,border-color,box-shadow] duration-150 outline-none",
    "disabled:pointer-events-none aria-disabled:pointer-events-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-(--color-background-brand-bold) border-(--color-border-brand) text-(--color-text-on-brand)",
          "hover:bg-(--color-background-brand-bold-hover) active:bg-(--color-background-brand-bold-pressed)",
          solidShadow,
          disabledFilled,
        ],
        outline: [
          "bg-(--color-background-default) border-(--color-border-strong) text-(--color-text-default)",
          "shadow-[0_1px_2px_0_rgb(10_10_10/0.05)]",
          "hover:bg-(--color-background-neutral-subtle-hover)",
          "active:bg-(--color-background-neutral-subtle-pressed) active:shadow-[inset_0_1px_2px_0_rgb(0_0_0/0.06)]",
          ringFocus,
          disabledFilled,
        ],
        secondary: [
          "bg-(--color-background-neutral-default) border-(--color-border-default) text-(--color-text-default)",
          "hover:bg-(--color-background-neutral-default-hover)",
          "active:bg-(--color-background-neutral-default-pressed) active:shadow-[inset_0_1px_2px_0_rgb(0_0_0/0.06)]",
          ringFocus,
          disabledFilled,
        ],
        ghost: [
          "bg-transparent text-(--color-text-brand)",
          "hover:bg-(--color-background-brand-subtle) active:bg-(--color-background-brand-subtle-pressed)",
          insetFocus,
          "disabled:bg-transparent disabled:text-(--color-text-disabled)",
        ],
        destructive: [
          "bg-(--color-background-danger-bold) border-(--color-border-danger) text-(--color-text-on-bold)",
          "hover:bg-(--color-background-danger-bold-hover) active:bg-(--color-background-danger-bold-pressed)",
          solidShadow,
          disabledFilled,
        ],
        link: [
          "bg-transparent text-(--color-text-link)",
          "hover:text-(--color-text-link-hover) active:text-(--color-text-link-hover)",
          insetFocus,
          "disabled:text-(--color-text-disabled)",
        ],
      },
      size: {
        default:
          "h-(--size-control-md) gap-(--space-inline-sm) rounded-(--radius-control-md) px-(--space-inset-control-md) text-sm leading-5 [&_svg:not([class*='size-'])]:size-4",
        xs: "h-6 gap-(--space-inline-xs) rounded-(--radius-control-sm) px-(--space-inset-control-sm) text-xs leading-4.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-(--size-control-sm) gap-(--space-inline-sm) rounded-(--radius-control-md) px-(--space-inset-control-sm) text-sm leading-5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-(--size-control-lg) gap-(--space-inline-sm) rounded-(--radius-xl) px-(--space-inset-control-lg) text-base leading-6 [&_svg:not([class*='size-'])]:size-4",
        icon: "size-(--size-control-md) rounded-(--radius-control-md) [&_svg:not([class*='size-'])]:size-4",
        "icon-xs":
          "size-6 rounded-(--radius-control-sm) [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-(--size-control-sm) rounded-(--radius-control-md) [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg":
          "size-(--size-control-lg) rounded-(--radius-xl) [&_svg:not([class*='size-'])]:size-4",
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
