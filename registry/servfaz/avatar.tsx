"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Avatar - base do Avatar do shadcn com os tokens Semantic do Servi DS.
 * Imagem redonda com fallback (iniciais ou ícone Phosphor) no fundo
 * palette/olive subtle. AvatarGroup empilha avatares com anel no fundo da
 * página e mostra "+N" quando passa de `max`.
 * Nasceu no código (colunas de pessoas no Data Table); Figma depois.
 */

type AvatarSize = "xs" | "sm" | "default" | "lg"

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full select-none",
  {
    variants: {
      size: {
        xs: "size-6 typo-sans-xxs-medium [&_svg]:size-3",
        sm: "size-8 typo-sans-xs-medium [&_svg]:size-4",
        default: "size-10 typo-sans-sm-medium [&_svg]:size-5",
        lg: "size-12 typo-sans-md-medium [&_svg]:size-6",
      },
    },
    defaultVariants: { size: "default" },
  }
)

const AvatarGroupContext = React.createContext<AvatarSize | null>(null)

type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>

function Avatar({ className, size, ...props }: AvatarProps) {
  const groupSize = React.useContext(AvatarGroupContext)
  const resolved = size ?? groupSize ?? "default"
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={resolved}
      className={cn(avatarVariants({ size: resolved }), className)}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full",
        "bg-(--color-palette-olive-subtle) text-(--color-foreground-default)",
        className
      )}
      {...props}
    />
  )
}

type AvatarGroupProps = React.ComponentProps<"div"> & {
  /** Tamanho de todos os avatares do grupo. */
  size?: AvatarSize
  /** Quantos avatares aparecem antes do "+N". */
  max?: number
}

function AvatarGroup({ className, size = "sm", max, children, ...props }: AvatarGroupProps) {
  const items = React.Children.toArray(children)
  const visible = max ? items.slice(0, max) : items
  const rest = items.length - visible.length

  return (
    <AvatarGroupContext.Provider value={size}>
      <div
        data-slot="avatar-group"
        className={cn(
          "flex items-center -space-x-2",
          "*:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-(--color-background-default)",
          className
        )}
        {...props}
      >
        {visible}
        {rest > 0 ? (
          <Avatar aria-label={`Mais ${rest}`}>
            <AvatarFallback className="bg-(--color-background-muted) text-(--color-foreground-muted)">
              +{rest}
            </AvatarFallback>
          </Avatar>
        ) : null}
      </div>
    </AvatarGroupContext.Provider>
  )
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, avatarVariants }
export type { AvatarProps, AvatarGroupProps, AvatarSize }
