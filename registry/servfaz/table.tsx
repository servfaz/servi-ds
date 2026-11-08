import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Table - base do Table do shadcn com os tokens Semantic do Servi DS.
 * Nasceu no código (referência de tabela de gestão de usuários); o component
 * set no Figma vem depois, espelhando este arquivo.
 *
 * variant "card": caixa com borda e raio, fundo default (uso comum).
 * variant "plain": só a tabela, sem caixa (dentro de outro container).
 *
 * Estados de linha, todos por atributo (sem lógica de tema no componente):
 * - hover: fundo subtle
 * - selected (data-state="selected"): fundo brand/selected
 * - muted (data-muted): texto apagado, para registro inativo ou cancelado
 *
 * O conteúdo da célula é livre (texto, Badge, Avatar, Progress, botão).
 * As peças TableCellMedia, TableCellThumbnail, TableCellTitle,
 * TableCellDescription e TableCellMeta montam células compostas com o mesmo
 * espaçamento e tipografia em qualquer tabela.
 */

const tableContainerVariants = cva(
  "relative w-full overflow-x-auto",
  {
    variants: {
      variant: {
        card: "rounded-(--radius-xl) border border-(--color-border-default) bg-(--color-background-default)",
        plain: "",
      },
    },
    defaultVariants: { variant: "card" },
  }
)

type TableProps = React.ComponentProps<"table"> &
  VariantProps<typeof tableContainerVariants> & {
    /** Classe aplicada na caixa em volta da tabela. `className` vai na tabela. */
    containerClassName?: string
  }

function Table({ className, containerClassName, variant, ...props }: TableProps) {
  return (
    <div
      data-slot="table-container"
      data-variant={variant ?? "card"}
      className={cn(tableContainerVariants({ variant }), containerClassName)}
    >
      <table
        data-slot="table"
        className={cn(
          "w-full caption-bottom border-collapse text-left",
          "font-(family-name:--typography-font-sans) text-(--color-foreground-emphasis)",
          className
        )}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b [&_tr]:hover:bg-transparent", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t border-(--color-border-default) bg-(--color-background-subtle) typo-sans-sm-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

type TableRowProps = React.ComponentProps<"tr"> & {
  /** Apaga o texto da linha (registro inativo, cancelado). */
  muted?: boolean
}

function TableRow({ className, muted, ...props }: TableRowProps) {
  return (
    <tr
      data-slot="table-row"
      data-muted={muted ? "" : undefined}
      className={cn(
        "border-b border-(--color-border-default) transition-colors duration-150",
        "hover:bg-(--color-background-subtle)",
        "data-[state=selected]:bg-(--color-brand-selected) data-[state=selected]:hover:bg-(--color-brand-selected-hover)",
        "data-muted:text-(--color-foreground-subtle)",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-3 align-middle whitespace-nowrap",
        "typo-sans-xs-medium text-(--color-foreground-muted)",
        "[&:has([role=checkbox])]:w-10 [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-3 py-3 align-middle typo-sans-sm-regular",
        "[&:has([role=checkbox])]:w-10 [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * Célula composta: mídia à esquerda (Avatar ou TableCellThumbnail) e textos
 * à direita (TableCellTitle, TableCellDescription, TableCellMeta).
 */
function TableCellMedia({
  media,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { media?: React.ReactNode }) {
  return (
    <div
      data-slot="table-cell-media"
      className={cn("flex min-w-0 items-center gap-3", className)}
      {...props}
    >
      {media}
      <div className="flex min-w-0 flex-col gap-0.5">{children}</div>
    </div>
  )
}

const thumbnailVariants = cva(
  "block shrink-0 overflow-hidden rounded-(--radius-lg) bg-(--color-background-muted)",
  {
    variants: {
      size: {
        sm: "h-10 w-14",
        default: "h-14 w-20",
        lg: "h-18 w-24",
      },
    },
    defaultVariants: { size: "default" },
  }
)

/**
 * Miniatura de imagem para a célula (capa de post, produto, arquivo).
 * Sem `src`, mostra o `fallback` (um ícone Phosphor) no fundo muted.
 */
function TableCellThumbnail({
  className,
  size,
  alt = "",
  src,
  fallback,
  ...props
}: React.ComponentProps<"img"> &
  VariantProps<typeof thumbnailVariants> & { fallback?: React.ReactNode }) {
  return (
    <span
      data-slot="table-cell-thumbnail"
      className={cn(
        thumbnailVariants({ size }),
        !src && "flex items-center justify-center text-(--color-foreground-muted) [&_svg]:size-5",
        className
      )}
    >
      {src ? <img src={src} alt={alt} className="size-full object-cover" {...props} /> : fallback}
    </span>
  )
}

/** Primeira linha de uma célula composta. */
function TableCellTitle({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="table-cell-title"
      className={cn(
        "block truncate typo-sans-sm-semibold text-(--color-foreground-emphasis)",
        "[[data-muted]_&]:text-(--color-foreground-subtle)",
        className
      )}
      {...props}
    />
  )
}

/**
 * Linha de metadados: cada filho vira um item, separado por um ponto
 * (autor, data, plano). Use <strong> para destacar um item.
 */
function TableCellMeta({ className, children, ...props }: React.ComponentProps<"span">) {
  const items = React.Children.toArray(children).filter(Boolean)
  return (
    <span
      data-slot="table-cell-meta"
      className={cn(
        "flex flex-wrap items-center gap-x-1.5 typo-sans-xs-regular text-(--color-foreground-muted)",
        "[&_strong]:typo-sans-xs-medium [&_strong]:text-(--color-foreground-default)",
        className
      )}
      {...props}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 ? (
            <span aria-hidden className="size-1 shrink-0 rounded-full bg-(--color-foreground-subtle)" />
          ) : null}
          <span className="min-w-0">{item}</span>
        </React.Fragment>
      ))}
    </span>
  )
}

/** Segunda linha de uma célula (telefone, e-mail, detalhe). */
function TableCellDescription({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="table-cell-description"
      className={cn(
        "block typo-sans-sm-regular text-(--color-foreground-muted)",
        "[[data-muted]_&]:text-(--color-foreground-subtle)",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 typo-sans-sm-regular text-(--color-foreground-muted)", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCellDescription,
  TableCellMedia,
  TableCellThumbnail,
  TableCellTitle,
  TableCellMeta,
  TableCaption,
  tableContainerVariants,
  thumbnailVariants,
}
export type { TableProps, TableRowProps }
