import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "./separator"

/*
 * ButtonGroup - base do Button Group do shadcn com os tokens Semantic do
 * Servi DS. Junta Buttons (e Input, Select) numa peça só, com os cantos de
 * dentro retos. ButtonGroupText mostra um rótulo com a mesma caixa.
 */

const buttonGroupVariants = cva(
  [
    "flex w-fit items-stretch [&>*]:focus-visible:relative [&>*]:focus-visible:z-10",
    "has-[>[data-slot=button-group]]:gap-2",
    "has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-(--radius-lg)",
    "[&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  ],
  {
    variants: {
      orientation: {
        horizontal:
          "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
      },
    },
    defaultVariants: { orientation: "horizontal" },
  }
)

function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  )
}

function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      className={cn(
        "flex items-center gap-2 rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-background-muted) px-3 shadow-xs",
        "typo-sans-sm-medium text-(--color-foreground-default)",
        "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn("relative !m-0 self-stretch data-[orientation=vertical]:h-auto", className)}
      {...props}
    />
  )
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants }
