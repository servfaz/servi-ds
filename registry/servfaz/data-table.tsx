"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type ExpandedState,
  type FilterFn,
  type Row,
  type RowData,
  type RowSelectionState,
  type SortingState,
  type Table as TanstackTable,
} from "@tanstack/react-table"
import {
  CaretDownIcon,
  CaretUpDownIcon,
  CaretUpIcon,
  DotsThreeIcon,
  FunnelSimpleIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Badge } from "./badge"
import { Button } from "./button"
import { Checkbox } from "./checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./dropdown-menu"
import { Input } from "./input"
import { Label } from "./label"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table"

/*
 * DataTable - tabela de dados do Servi DS, montada sobre o Table e o
 * TanStack Table (mesma base do Data Table do shadcn).
 * Nasceu no código (referência de tabela de gestão de usuários); o component
 * set no Figma vem depois, espelhando este arquivo.
 *
 * Recursos, todos opcionais:
 * - busca (em todas as colunas ou em uma coluna só, com `searchColumn`)
 * - botão de filtros com opções por coluna e contador de filtros ativos
 * - ordenação no cabeçalho (DataTableColumnHeader)
 * - seleção de linhas com "marcar todas" e ações em lote
 * - linha expansível com conteúdo extra (`renderSubRow`)
 * - linha apagada para registro inativo (`isRowMuted`)
 * - menu de ações por linha (DataTableRowActions)
 */

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    /** Classe do <th> da coluna. */
    headerClassName?: string
    /** Classe de cada <td> da coluna. */
    cellClassName?: string
  }
}

// Foco por dentro, igual ao Button ghost.
const insetFocus = "focus-visible:shadow-[inset_0_0_0_2px_var(--color-brand-border-focus)]"

/* ------------------------------------------------------------------ */
/* Filtros                                                             */
/* ------------------------------------------------------------------ */

function cellText(value: unknown): string[] {
  if (value === undefined || value === null) return []
  return Array.isArray(value) ? value.map(String) : [String(value)]
}

function isEmptyFilter(value: unknown) {
  return value === undefined || value === "" || (Array.isArray(value) && value.length === 0)
}

/**
 * Filtro padrão das colunas: lista de valores (vindos do botão de filtros)
 * ou texto (vindo da busca por coluna). Célula com array passa se algum
 * valor bater.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columnFilter: FilterFn<any> = (row, columnId, filterValue) => {
  if (isEmptyFilter(filterValue)) return true
  const values = cellText(row.getValue(columnId))
  if (Array.isArray(filterValue)) {
    return filterValue.some((option) => values.includes(String(option)))
  }
  const term = String(filterValue).toLowerCase()
  return values.some((value) => value.toLowerCase().includes(term))
}
columnFilter.autoRemove = isEmptyFilter

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalSearch: FilterFn<any> = (row, columnId, filterValue) => {
  const term = String(filterValue ?? "").trim().toLowerCase()
  if (!term) return true
  return cellText(row.getValue(columnId)).some((value) => value.toLowerCase().includes(term))
}

type DataTableFilterOption = {
  label: string
  value: string
  /** Ícone Phosphor à esquerda do texto da opção. */
  icon?: React.ReactNode
}

type DataTableFilter = {
  /** Id da coluna filtrada (o `accessorKey` ou o `id` da coluna). */
  columnId: string
  /** Título do grupo de opções no painel de filtros. */
  title: string
  options: DataTableFilterOption[]
}

/* ------------------------------------------------------------------ */
/* Peças                                                               */
/* ------------------------------------------------------------------ */

type DataTableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>
  title: React.ReactNode
  className?: string
}

/** Cabeçalho de coluna com ordenação (crescente, decrescente, sem ordem). */
function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <span className={className}>{title}</span>
  }

  const sorted = column.getIsSorted()
  const Icon = sorted === "asc" ? CaretUpIcon : sorted === "desc" ? CaretDownIcon : CaretUpDownIcon

  return (
    <button
      type="button"
      data-slot="data-table-column-header"
      onClick={column.getToggleSortingHandler()}
      className={cn(
        "-mx-1.5 inline-flex h-7 items-center gap-1 rounded-(--radius-md) px-1.5 outline-none",
        "transition-[color,background-color,box-shadow] duration-150",
        "hover:bg-(--color-palette-olive-light) hover:text-(--color-foreground-default)",
        sorted && "text-(--color-foreground-emphasis)",
        insetFocus,
        className
      )}
    >
      {title}
      <Icon aria-hidden className="size-3.5 shrink-0" />
    </button>
  )
}

type DataTableSearchProps<TData> = {
  table: TanstackTable<TData>
  /** Busca só nesta coluna. Sem ela, busca em todas. */
  column?: string
  placeholder?: string
  className?: string
}

/** Campo de busca ligado à tabela. */
function DataTableSearch<TData>({
  table,
  column,
  placeholder = "Buscar...",
  className,
}: DataTableSearchProps<TData>) {
  const target = column ? table.getColumn(column) : undefined
  const value = target
    ? ((target.getFilterValue() as string | undefined) ?? "")
    : ((table.getState().globalFilter as string | undefined) ?? "")

  return (
    <Input
      role="searchbox"
      aria-label={placeholder}
      placeholder={placeholder}
      value={value}
      onChange={(event) => {
        const next = event.currentTarget.value
        if (target) target.setFilterValue(next)
        else table.setGlobalFilter(next)
      }}
      rightIcon={<MagnifyingGlassIcon />}
      className={cn("w-full sm:w-64", className)}
    />
  )
}

type DataTableFiltersProps<TData> = {
  table: TanstackTable<TData>
  filters: DataTableFilter[]
  /** Texto do botão. */
  label?: string
  className?: string
}

/** Botão de filtros: painel com as opções de cada coluna e contador de ativos. */
function DataTableFilters<TData>({
  table,
  filters,
  label = "Filtros",
  className,
}: DataTableFiltersProps<TData>) {
  const baseId = React.useId()
  const columns = filters
    .map((filter) => ({ filter, column: table.getColumn(filter.columnId) }))
    .filter((item): item is { filter: DataTableFilter; column: Column<TData, unknown> } =>
      Boolean(item.column)
    )

  const activeCount = columns.reduce((total, { column }) => {
    const value = column.getFilterValue()
    return total + (Array.isArray(value) ? value.length : 0)
  }, 0)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          size="lg"
          data-slot="data-table-filters-trigger"
          className={className}
        >
          {label}
          {activeCount > 0 ? (
            <Badge variant="filled" color="brand" aria-label={activeCount === 1 ? "1 filtro ativo" : `${activeCount} filtros ativos`}>
              {activeCount}
            </Badge>
          ) : (
            <FunnelSimpleIcon aria-hidden />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 p-0">
        <div className="flex max-h-80 flex-col overflow-y-auto py-1">
          {columns.map(({ filter, column }, groupIndex) => {
            const selected = new Set(
              ((column.getFilterValue() as string[] | undefined) ?? []).map(String)
            )
            const facets = column.getFacetedUniqueValues()

            return (
              <div
                key={filter.columnId}
                role="group"
                aria-labelledby={`${baseId}-${groupIndex}`}
                className={cn(
                  "flex flex-col px-1 py-1",
                  groupIndex > 0 && "border-t border-(--color-border-default)"
                )}
              >
                <span
                  id={`${baseId}-${groupIndex}`}
                  className="px-2 py-1.5 typo-sans-xs-medium text-(--color-foreground-muted)"
                >
                  {filter.title}
                </span>
                {filter.options.map((option, optionIndex) => {
                  const id = `${baseId}-${groupIndex}-${optionIndex}`
                  const isSelected = selected.has(option.value)
                  return (
                    <div
                      key={option.value}
                      className="flex items-center gap-2 rounded-(--radius-md) px-2 py-1.5 transition-colors duration-150 hover:bg-(--color-palette-olive-light)"
                    >
                      <Checkbox
                        id={id}
                        checked={isSelected}
                        onCheckedChange={(checked) => {
                          const next = new Set(selected)
                          if (checked === true) next.add(option.value)
                          else next.delete(option.value)
                          column.setFilterValue(next.size ? Array.from(next) : undefined)
                        }}
                      />
                      <Label
                        htmlFor={id}
                        className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 typo-sans-sm-regular text-(--color-foreground-emphasis) [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-(--color-foreground-muted)"
                      >
                        {option.icon}
                        <span className="truncate">{option.label}</span>
                      </Label>
                      <span className="typo-mono-xs-regular text-(--color-foreground-subtle)">
                        {facets.get(option.value) ?? 0}
                      </span>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
        <div className="flex justify-end border-t border-(--color-border-default) p-1">
          <Button
            variant="ghost"
            size="sm"
            disabled={activeCount === 0}
            onClick={() => columns.forEach(({ column }) => column.setFilterValue(undefined))}
          >
            Limpar filtros
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

type DataTableRowActionsProps = {
  /** Itens do menu (DropdownMenuItem, DropdownMenuSeparator...). */
  children: React.ReactNode
  /** Nome acessível do botão. */
  label?: string
  className?: string
}

/** Botão de três pontos com o menu de ações da linha. */
function DataTableRowActions({
  children,
  label = "Ações da linha",
  className,
}: DataTableRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon-sm"
          aria-label={label}
          className={cn("-my-1.5 rounded-full", className)}
        >
          <DotsThreeIcon weight="bold" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* ------------------------------------------------------------------ */
/* Colunas automáticas                                                 */
/* ------------------------------------------------------------------ */

// Alinha controles de 16px à primeira linha de texto (20px) da célula.
const controlCell = "flex h-5 items-center"

function selectColumn<TData>(): ColumnDef<TData> {
  return {
    id: "select",
    enableSorting: false,
    enableHiding: false,
    enableGlobalFilter: false,
    header: ({ table }) => (
      <div className={controlCell}>
        <Checkbox
          aria-label="Selecionar todas as linhas"
          checked={
            table.getIsAllRowsSelected()
              ? true
              : table.getIsSomeRowsSelected()
                ? "indeterminate"
                : false
          }
          onCheckedChange={(checked) => table.toggleAllRowsSelected(checked === true)}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className={controlCell}>
        <Checkbox
          aria-label="Selecionar linha"
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onCheckedChange={(checked) => row.toggleSelected(checked === true)}
        />
      </div>
    ),
    meta: { headerClassName: "w-10 pr-0", cellClassName: "w-10 pr-0" },
  }
}

function expandColumn<TData>(): ColumnDef<TData> {
  return {
    id: "expand",
    enableSorting: false,
    enableHiding: false,
    enableGlobalFilter: false,
    header: () => <span className="sr-only">Expandir</span>,
    cell: ({ row }) =>
      row.getCanExpand() ? (
        <div className={controlCell}>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label={row.getIsExpanded() ? "Recolher linha" : "Expandir linha"}
            aria-expanded={row.getIsExpanded()}
            onClick={row.getToggleExpandedHandler()}
            className="text-(--color-foreground-muted) hover:bg-(--color-palette-olive-light) active:bg-(--color-palette-olive-light-pressed)"
          >
            <CaretDownIcon
              aria-hidden
              className={cn(
                "transition-transform duration-150",
                row.getIsExpanded() && "rotate-180"
              )}
            />
          </Button>
        </div>
      ) : null,
    meta: { headerClassName: "w-8 pr-0", cellClassName: "w-8 pr-0" },
  }
}

/* ------------------------------------------------------------------ */
/* DataTable                                                           */
/* ------------------------------------------------------------------ */

type DataTableProps<TData> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[]
  data: TData[]
  /** Id estável da linha (recomendado com seleção). */
  getRowId?: (row: TData, index: number) => string
  /** Mostra a barra acima da tabela (busca, filtros, ações). */
  toolbar?: boolean
  /** Mostra o campo de busca na barra. */
  search?: boolean
  searchPlaceholder?: string
  /** Busca só nesta coluna. Sem ela, busca em todas. */
  searchColumn?: string
  /** Busca controlada de fora (por exemplo, uma busca que filtra vários grupos). */
  globalFilter?: string
  /** Opções do botão de filtros. Sem itens, o botão não aparece. */
  filters?: DataTableFilter[]
  /** Conteúdo à esquerda da barra (abas, título). */
  toolbarStart?: React.ReactNode
  /** Botões à direita da barra, depois dos filtros. */
  actions?: React.ReactNode
  /** Adiciona a coluna de seleção com "marcar todas". */
  selectable?: boolean
  /** Chamado quando a seleção muda, com os registros marcados. */
  onSelectionChange?: (rows: TData[]) => void
  /** Ações em lote, mostradas na barra quando há linhas marcadas. */
  selectionActions?: (rows: TData[]) => React.ReactNode
  /** Conteúdo da linha expandida. Liga a coluna de expandir. */
  renderSubRow?: (row: Row<TData>) => React.ReactNode
  /** Quais linhas podem expandir. Padrão: todas, quando há `renderSubRow`. */
  getRowCanExpand?: (row: Row<TData>) => boolean
  /** Linhas com texto apagado (registro inativo, cancelado). */
  isRowMuted?: (row: TData) => boolean
  /** Ordenação inicial. */
  initialSorting?: SortingState
  /** Texto quando nenhuma linha aparece. */
  emptyMessage?: React.ReactNode
  /** "plain" tira a caixa da tabela. */
  variant?: "card" | "plain"
  className?: string
  /** Classe da barra acima da tabela. */
  toolbarClassName?: string
}

function DataTable<TData>({
  columns,
  data,
  getRowId,
  toolbar = true,
  search = true,
  searchPlaceholder = "Buscar...",
  searchColumn,
  globalFilter: globalFilterProp,
  filters = [],
  toolbarStart,
  actions,
  selectable = false,
  onSelectionChange,
  selectionActions,
  renderSubRow,
  getRowCanExpand,
  isRowMuted,
  initialSorting = [],
  emptyMessage = "Nenhum resultado encontrado.",
  variant = "card",
  className,
  toolbarClassName,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>(initialSorting)
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [globalFilterState, setGlobalFilter] = React.useState("")
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [expanded, setExpanded] = React.useState<ExpandedState>({})

  const globalFilter = globalFilterProp ?? globalFilterState

  const allColumns = React.useMemo(() => {
    const extra: ColumnDef<TData>[] = []
    if (selectable) extra.push(selectColumn<TData>())
    if (renderSubRow) extra.push(expandColumn<TData>())
    return [...extra, ...columns]
  }, [columns, selectable, renderSubRow])

  const table = useReactTable({
    data,
    columns: allColumns,
    getRowId,
    state: { sorting, columnFilters, globalFilter, rowSelection, expanded },
    defaultColumn: { filterFn: columnFilter },
    globalFilterFn: globalSearch,
    getColumnCanGlobalFilter: (column) => Boolean(column.accessorFn),
    enableRowSelection: selectable,
    getRowCanExpand: renderSubRow ? (getRowCanExpand ?? (() => true)) : () => false,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getExpandedRowModel: getExpandedRowModel(),
  })

  const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original)

  // Avisa a seleção sem reexecutar a cada render do pai.
  const onSelectionChangeRef = React.useRef(onSelectionChange)
  onSelectionChangeRef.current = onSelectionChange
  React.useEffect(() => {
    onSelectionChangeRef.current?.(table.getSelectedRowModel().rows.map((row) => row.original))
  }, [rowSelection, table])

  const rows = table.getRowModel().rows
  const visibleColumnCount = table.getVisibleLeafColumns().length
  const showSearch = search && globalFilterProp === undefined

  return (
    <div data-slot="data-table" className={cn("flex w-full flex-col gap-4", className)}>
      {toolbar ? (
        <div
          data-slot="data-table-toolbar"
          className={cn("flex flex-wrap items-center justify-between gap-2", toolbarClassName)}
        >
          <div className="flex min-h-10 min-w-0 items-center gap-2">
            {selectedRows.length > 0 ? (
              <>
                <span
                  aria-live="polite"
                  className="typo-sans-sm-medium whitespace-nowrap text-(--color-foreground-emphasis)"
                >
                  {selectedRows.length === 1
                    ? "1 selecionada"
                    : `${selectedRows.length} selecionadas`}
                </span>
                {selectionActions?.(selectedRows)}
                <Button variant="ghost" size="sm" onClick={() => table.resetRowSelection()}>
                  Limpar seleção
                </Button>
              </>
            ) : (
              toolbarStart
            )}
          </div>
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:flex-nowrap">
            {showSearch ? (
              <DataTableSearch
                table={table}
                column={searchColumn}
                placeholder={searchPlaceholder}
                className="flex-1 sm:flex-none"
              />
            ) : null}
            {filters.length > 0 ? <DataTableFilters table={table} filters={filters} /> : null}
            {actions}
          </div>
        </div>
      ) : null}

      <Table variant={variant}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sorted = header.column.getIsSorted()
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    aria-sort={
                      sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : undefined
                    }
                    className={header.column.columnDef.meta?.headerClassName}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rows.length ? (
            rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  data-expanded={row.getIsExpanded() ? "" : undefined}
                  muted={isRowMuted?.(row.original)}
                  className={cn(renderSubRow && row.getIsExpanded() && "border-b-0")}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={cell.column.columnDef.meta?.cellClassName}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
                {renderSubRow && row.getIsExpanded() ? (
                  <TableRow
                    data-slot="data-table-sub-row"
                    className="bg-(--color-background-subtle) hover:bg-(--color-background-subtle)"
                  >
                    <TableCell colSpan={visibleColumnCount} className="py-4">
                      {renderSubRow(row)}
                    </TableCell>
                  </TableRow>
                ) : null}
              </React.Fragment>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={visibleColumnCount}
                className="h-24 text-center align-middle text-(--color-foreground-muted)"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export {
  DataTable,
  DataTableColumnHeader,
  DataTableSearch,
  DataTableFilters,
  DataTableRowActions,
  columnFilter,
  globalSearch,
}
export type { DataTableProps, DataTableFilter, DataTableFilterOption }
