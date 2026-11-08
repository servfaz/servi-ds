import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { DotsThreeIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

/*
 * Breadcrumb - espelho do component set "Breadcrumb" do Figma ([SDS]
 * Components), na base do Breadcrumb do shadcn. Variantes do Figma (1, 2, 3 e
 * 4+ níveis) viram composição: um BreadcrumbItem por nível e o
 * BreadcrumbEllipsis no lugar dos níveis do meio a partir de 4.
 *
 * Texto Sans/xs/regular, intervalo de 8px, separador "/" e reticências com o
 * DotsThree do Phosphor (16px em uma caixa de 20px).
 * Cor: o Figma usa a variável color-text-subtlest (#737373), que aqui é
 * foreground/muted da camada Semantic. Link ganha hover em foreground/emphasis.
 */

function Breadcrumb({ "aria-label": ariaLabel = "Navegação estrutural", ...props }: React.ComponentProps<"nav">) {
  return <nav data-slot="breadcrumb" aria-label={ariaLabel} {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-2 break-words",
        "font-(family-name:--typography-font-sans) typo-sans-xs-regular text-(--color-foreground-muted)",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-2 whitespace-nowrap", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "a"
  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(
        "rounded-(--radius-xs) outline-none transition-colors duration-150",
        "hover:text-(--color-foreground-emphasis)",
        "focus-visible:shadow-[0_0_0_2px_var(--color-brand-border-focus)]",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? "/"}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  label = "Mais níveis",
  ...props
}: React.ComponentProps<"span"> & { label?: string }) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-5 items-center justify-center", className)}
      {...props}
    >
      <DotsThreeIcon className="size-4" />
      <span className="sr-only">{label}</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
