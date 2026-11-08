import * as React from "react"

import { cn } from "@/lib/utils"
import { Badge } from "./badge"

/*
 * TableGroup - várias tabelas agrupadas, cada uma em uma seção com título,
 * contador e ações (filtro, botões). Referência: lista de tarefas agrupada
 * por projeto. Nasceu no código; o component set no Figma vem depois.
 *
 * Estrutura:
 *   TableGroup              lista de seções
 *     TableGroupItem        caixa da seção (fundo subtle, raio 2xl)
 *       TableGroupHeader    linha do título
 *         TableGroupTitle   título da seção
 *         TableGroupCount   contador (Badge outline, ícone opcional)
 *         TableGroupActions ações à direita
 *       TableGroupContent   área da tabela (Table ou DataTable, variant card)
 */

function TableGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="table-group"
      className={cn("flex w-full flex-col gap-4", className)}
      {...props}
    />
  )
}

function TableGroupItem({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="table-group-item"
      className={cn(
        "flex flex-col gap-2 rounded-(--radius-2xl) border border-(--color-border-default) bg-(--color-background-subtle) p-2",
        "font-(family-name:--typography-font-sans)",
        className
      )}
      {...props}
    />
  )
}

function TableGroupHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="table-group-header"
      className={cn("flex min-h-10 flex-wrap items-center gap-2 px-2", className)}
      {...props}
    />
  )
}

function TableGroupTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="table-group-title"
      className={cn("typo-sans-md-medium text-(--color-foreground-emphasis)", className)}
      {...props}
    />
  )
}

type TableGroupCountProps = React.ComponentProps<typeof Badge> & {
  /** Ícone Phosphor à esquerda do número. */
  icon?: React.ReactNode
}

function TableGroupCount({ icon, children, className, ...props }: TableGroupCountProps) {
  return (
    <Badge
      data-slot="table-group-count"
      variant="outline"
      className={cn("bg-(--color-background-default) text-(--color-foreground-default)", className)}
      {...props}
    >
      {icon}
      {children}
    </Badge>
  )
}

function TableGroupActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="table-group-actions"
      className={cn("ml-auto flex items-center gap-2", className)}
      {...props}
    />
  )
}

function TableGroupContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="table-group-content" className={cn("min-w-0", className)} {...props} />
}

export {
  TableGroup,
  TableGroupItem,
  TableGroupHeader,
  TableGroupTitle,
  TableGroupCount,
  TableGroupActions,
  TableGroupContent,
}
export type { TableGroupCountProps }
