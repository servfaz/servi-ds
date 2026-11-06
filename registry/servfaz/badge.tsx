import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Badge - espelho do component set "Badge" do Figma ([SDS] Components).
 * Variants do shadcn (default, secondary, destructive, outline, ghost, link)
 * somados aos do Mantine (filled, light, dot, white), com a propriedade
 * `color` em todas as cores da camada Semantic: brand, as 17 cores cromáticas
 * da palette e neutral (palette/olive; "slate" no Figma).
 * Ícone: passe um ícone Phosphor como filho (12px). No variant link o ícone
 * vai depois do texto, como no Figma.
 *
 * Borda de 1px por dentro (sombra inset), como o stroke inside do Figma,
 * para manter os 22px de altura.
 *
 * A cor só troca variáveis locais (--badge-*); o variant decide quais delas
 * usar. Assim não existe lógica de cor dentro do componente.
 */

const badgeVariants = cva(
  [
    "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full px-2 py-0.5 whitespace-nowrap",
    "typo-sans-xs-medium transition-[color,background-color,box-shadow] duration-150 outline-none",
    "focus-visible:shadow-[0_0_0_1px_var(--color-brand-border-focus),0_0_0_4px_var(--color-brand-light-pressed)]",
    "[&>svg]:pointer-events-none [&>svg]:size-3 [&>svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-(--badge-filled) text-(--badge-on-filled)",
        filled:
          "bg-(--badge-filled) text-(--badge-on-filled)",
        light:
          "bg-(--badge-light) text-(--badge-emphasis)",
        dot: "shadow-[inset_0_0_0_1px_var(--color-border-default)] bg-(--color-background-default) text-(--color-foreground-default) before:size-1.5 before:shrink-0 before:rounded-full before:bg-(--badge-default) before:content-['']",
        ghost: "bg-transparent text-(--badge-emphasis)",
        white: "bg-(--color-background-default) text-(--badge-default)",
        link: "bg-transparent text-(--badge-emphasis) [a&]:hover:underline",
        secondary:
          "bg-(--color-palette-olive-subtle) text-(--color-foreground-emphasis)",
        destructive:
          "bg-(--color-feedback-danger-subtle) text-(--color-feedback-danger-foreground-default)",
        outline:
          "shadow-[inset_0_0_0_1px_var(--color-border-default)] text-(--color-foreground-emphasis)",
      },
      color: {
        brand:
          "[--badge-filled:var(--color-brand-filled)] [--badge-on-filled:var(--color-brand-foreground-on-filled)] [--badge-light:var(--color-brand-light)] [--badge-emphasis:var(--color-brand-foreground-emphasis)] [--badge-default:var(--color-brand-foreground-default)]",
        neutral:
          "[--badge-filled:var(--color-palette-olive-filled)] [--badge-on-filled:var(--color-palette-olive-foreground-on-filled)] [--badge-light:var(--color-palette-olive-light)] [--badge-emphasis:var(--color-palette-olive-foreground-emphasis)] [--badge-default:var(--color-palette-olive-foreground-default)]",
        red:
          "[--badge-filled:var(--color-palette-red-filled)] [--badge-on-filled:var(--color-palette-red-foreground-on-filled)] [--badge-light:var(--color-palette-red-light)] [--badge-emphasis:var(--color-palette-red-foreground-emphasis)] [--badge-default:var(--color-palette-red-foreground-default)]",
        orange:
          "[--badge-filled:var(--color-palette-orange-filled)] [--badge-on-filled:var(--color-palette-orange-foreground-on-filled)] [--badge-light:var(--color-palette-orange-light)] [--badge-emphasis:var(--color-palette-orange-foreground-emphasis)] [--badge-default:var(--color-palette-orange-foreground-default)]",
        amber:
          "[--badge-filled:var(--color-palette-amber-filled)] [--badge-on-filled:var(--color-palette-amber-foreground-on-filled)] [--badge-light:var(--color-palette-amber-light)] [--badge-emphasis:var(--color-palette-amber-foreground-emphasis)] [--badge-default:var(--color-palette-amber-foreground-default)]",
        yellow:
          "[--badge-filled:var(--color-palette-yellow-filled)] [--badge-on-filled:var(--color-palette-yellow-foreground-on-filled)] [--badge-light:var(--color-palette-yellow-light)] [--badge-emphasis:var(--color-palette-yellow-foreground-emphasis)] [--badge-default:var(--color-palette-yellow-foreground-default)]",
        lime:
          "[--badge-filled:var(--color-palette-lime-filled)] [--badge-on-filled:var(--color-palette-lime-foreground-on-filled)] [--badge-light:var(--color-palette-lime-light)] [--badge-emphasis:var(--color-palette-lime-foreground-emphasis)] [--badge-default:var(--color-palette-lime-foreground-default)]",
        green:
          "[--badge-filled:var(--color-palette-green-filled)] [--badge-on-filled:var(--color-palette-green-foreground-on-filled)] [--badge-light:var(--color-palette-green-light)] [--badge-emphasis:var(--color-palette-green-foreground-emphasis)] [--badge-default:var(--color-palette-green-foreground-default)]",
        emerald:
          "[--badge-filled:var(--color-palette-emerald-filled)] [--badge-on-filled:var(--color-palette-emerald-foreground-on-filled)] [--badge-light:var(--color-palette-emerald-light)] [--badge-emphasis:var(--color-palette-emerald-foreground-emphasis)] [--badge-default:var(--color-palette-emerald-foreground-default)]",
        teal:
          "[--badge-filled:var(--color-palette-teal-filled)] [--badge-on-filled:var(--color-palette-teal-foreground-on-filled)] [--badge-light:var(--color-palette-teal-light)] [--badge-emphasis:var(--color-palette-teal-foreground-emphasis)] [--badge-default:var(--color-palette-teal-foreground-default)]",
        cyan:
          "[--badge-filled:var(--color-palette-cyan-filled)] [--badge-on-filled:var(--color-palette-cyan-foreground-on-filled)] [--badge-light:var(--color-palette-cyan-light)] [--badge-emphasis:var(--color-palette-cyan-foreground-emphasis)] [--badge-default:var(--color-palette-cyan-foreground-default)]",
        sky:
          "[--badge-filled:var(--color-palette-sky-filled)] [--badge-on-filled:var(--color-palette-sky-foreground-on-filled)] [--badge-light:var(--color-palette-sky-light)] [--badge-emphasis:var(--color-palette-sky-foreground-emphasis)] [--badge-default:var(--color-palette-sky-foreground-default)]",
        blue:
          "[--badge-filled:var(--color-palette-blue-filled)] [--badge-on-filled:var(--color-palette-blue-foreground-on-filled)] [--badge-light:var(--color-palette-blue-light)] [--badge-emphasis:var(--color-palette-blue-foreground-emphasis)] [--badge-default:var(--color-palette-blue-foreground-default)]",
        indigo:
          "[--badge-filled:var(--color-palette-indigo-filled)] [--badge-on-filled:var(--color-palette-indigo-foreground-on-filled)] [--badge-light:var(--color-palette-indigo-light)] [--badge-emphasis:var(--color-palette-indigo-foreground-emphasis)] [--badge-default:var(--color-palette-indigo-foreground-default)]",
        violet:
          "[--badge-filled:var(--color-palette-violet-filled)] [--badge-on-filled:var(--color-palette-violet-foreground-on-filled)] [--badge-light:var(--color-palette-violet-light)] [--badge-emphasis:var(--color-palette-violet-foreground-emphasis)] [--badge-default:var(--color-palette-violet-foreground-default)]",
        purple:
          "[--badge-filled:var(--color-palette-purple-filled)] [--badge-on-filled:var(--color-palette-purple-foreground-on-filled)] [--badge-light:var(--color-palette-purple-light)] [--badge-emphasis:var(--color-palette-purple-foreground-emphasis)] [--badge-default:var(--color-palette-purple-foreground-default)]",
        fuchsia:
          "[--badge-filled:var(--color-palette-fuchsia-filled)] [--badge-on-filled:var(--color-palette-fuchsia-foreground-on-filled)] [--badge-light:var(--color-palette-fuchsia-light)] [--badge-emphasis:var(--color-palette-fuchsia-foreground-emphasis)] [--badge-default:var(--color-palette-fuchsia-foreground-default)]",
        pink:
          "[--badge-filled:var(--color-palette-pink-filled)] [--badge-on-filled:var(--color-palette-pink-foreground-on-filled)] [--badge-light:var(--color-palette-pink-light)] [--badge-emphasis:var(--color-palette-pink-foreground-emphasis)] [--badge-default:var(--color-palette-pink-foreground-default)]",
        rose:
          "[--badge-filled:var(--color-palette-rose-filled)] [--badge-on-filled:var(--color-palette-rose-foreground-on-filled)] [--badge-light:var(--color-palette-rose-light)] [--badge-emphasis:var(--color-palette-rose-foreground-emphasis)] [--badge-default:var(--color-palette-rose-foreground-default)]",
      },
    },
    defaultVariants: {
      variant: "default",
      color: "brand",
    },
  }
)

type BadgeProps = Omit<React.ComponentProps<"span">, "color"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }

function Badge({
  className,
  variant,
  color,
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant ?? "default"}
      data-color={color ?? "brand"}
      className={cn(badgeVariants({ variant, color }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
export type { BadgeProps }
