"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "./button"

/*
 * InputGroup - base do Input Group do shadcn com os tokens Semantic do
 * Servi DS. Caixa do Input (40px, raio lg, borda default, foco brand) com
 * complementos antes, depois, acima ou abaixo do campo: ícone, texto, Kbd,
 * Button, Spinner. Use InputGroupInput ou InputGroupTextarea dentro.
 */

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex w-full items-center rounded-(--radius-lg) border outline-none",
        "border-(--color-border-default) bg-(--color-background-default) shadow-xs",
        "transition-[border-color,box-shadow] duration-150",
        "h-10 has-[>textarea]:h-auto",
        "has-[>[data-align=inline-start]]:[&>input]:pl-2 has-[>[data-align=inline-end]]:[&>input]:pr-2",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",
        "hover:not-has-[[data-slot=input-group-control]:focus-visible]:shadow-md",
        "has-[[data-slot=input-group-control]:focus-visible]:border-(--color-brand-border-focus)",
        "has-[[data-slot][aria-invalid=true]]:border-(--color-feedback-danger-outline)",
        "has-[[data-slot=input-group-control]:disabled]:border-(--color-border-muted) has-[[data-slot=input-group-control]:disabled]:bg-(--color-background-muted) has-[[data-slot=input-group-control]:disabled]:shadow-none",
        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  [
    "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 select-none",
    "typo-sans-sm-medium text-(--color-foreground-muted)",
    "[&>svg:not([class*='size-'])]:size-4 [&>kbd]:rounded-(--radius-sm)",
    "group-has-[[data-slot=input-group-control]:disabled]/input-group:text-(--color-foreground-subtle)",
  ],
  {
    variants: {
      align: {
        "inline-start": "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
        "inline-end": "order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
        "block-start": "order-first w-full justify-start px-3 pt-3 [.border-b]:pb-3 group-has-[>input]/input-group:pt-2.5",
        "block-end": "order-last w-full justify-start px-3 pb-3 [.border-t]:pt-3 group-has-[>input]/input-group:pb-2.5",
      },
    },
    defaultVariants: { align: "inline-start" },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("button")) return
        event.currentTarget.parentElement?.querySelector<HTMLInputElement | HTMLTextAreaElement>("input, textarea")?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva("flex items-center gap-2 shadow-none", {
  variants: {
    size: {
      xs: "h-6 gap-1 rounded-(--radius-md) px-2 has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-3.5",
      sm: "h-8 gap-1.5 rounded-(--radius-md) px-2.5 has-[>svg]:px-2.5",
      "icon-xs": "size-6 rounded-(--radius-md) p-0 has-[>svg]:p-0",
      "icon-sm": "size-8 p-0 has-[>svg]:p-0",
    },
  },
  defaultVariants: { size: "xs" },
})

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> & VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 typo-sans-sm-regular text-(--color-foreground-muted) [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

const controlClasses = [
  "flex-1 rounded-none border-0 bg-transparent shadow-none outline-none",
  "typo-sans-sm-regular text-(--color-foreground-emphasis) caret-(--color-foreground-emphasis) placeholder:text-(--color-foreground-default)",
  "disabled:cursor-not-allowed disabled:text-(--color-foreground-subtle)",
]

function InputGroupInput({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input-group-control"
      className={cn(controlClasses, "h-full min-w-0 px-3", className)}
      {...props}
    />
  )
}

function InputGroupTextarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="input-group-control"
      className={cn(controlClasses, "min-h-16 w-full resize-none px-3 py-2.5", className)}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
