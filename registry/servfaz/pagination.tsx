import * as React from "react"
import { CaretLeftIcon, CaretRightIcon, DotsThreeIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "./button"

/*
 * Pagination - base do Pagination do shadcn com os tokens Semantic do
 * Servi DS. Páginas com os variants do Button: atual em outline, demais em
 * ghost com texto neutro. O Figma já tem Pagination Ellipsis e Pagination.
 */

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="Paginação"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center font-(family-name:--typography-font-sans)", className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="pagination-content" className={cn("flex flex-row items-center gap-1", className)} {...props} />
}

function PaginationItem(props: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

function PaginationLink({ className, isActive, size = "icon", ...props }: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({ variant: isActive ? "outline" : "ghost", size }),
        !isActive && "text-(--color-foreground-default) hover:bg-(--color-palette-olive-light) hover:text-(--color-foreground-emphasis) active:bg-(--color-palette-olive-light-pressed)",
        isActive && "typo-sans-sm-semibold",
        size === "icon" && "typo-sans-sm-medium",
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Ir para a página anterior" size="default" className={cn("gap-1 px-2.5 sm:pl-2.5", className)} {...props}>
      <CaretLeftIcon />
      <span className="hidden sm:block">Anterior</span>
    </PaginationLink>
  )
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Ir para a próxima página" size="default" className={cn("gap-1 px-2.5 sm:pr-2.5", className)} {...props}>
      <span className="hidden sm:block">Próxima</span>
      <CaretRightIcon />
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center text-(--color-foreground-muted)", className)}
      {...props}
    >
      <DotsThreeIcon className="size-4" />
      <span className="sr-only">Mais páginas</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
