import { CubeIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { componentThumbnail } from "./component-thumbnails"
import { linkProps } from "./links"
import { textMuted } from "./doc-styles"

export type ComponentCardData = {
  /** Nome do componente, igual ao do registry e ao do arquivo de story. */
  name: string
  title: string
  description?: string
  /** Página do componente. Sem href, aponta para /docs/componentes/<name>. */
  href?: string
}

/** Card da página Componentes: ilustração esquemática, nome e descrição. */
function ComponentCard({ name, title, description, href }: ComponentCardData) {
  const Thumbnail = componentThumbnail(name)

  return (
    <a
      {...linkProps(href ?? `/docs/componentes/${name}`)}
      className="group flex flex-col overflow-hidden rounded-xl border border-[var(--color-border-default)] bg-[var(--color-background-default)] no-underline transition-colors hover:border-[var(--color-brand-border)] focus-visible:border-[var(--color-brand-border-focus)] focus-visible:outline-none"
    >
      <div className="aspect-[8/5] overflow-hidden border-b border-[var(--color-border-default)] bg-[var(--color-background-subtle)]">
        <div className="size-full transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
          {Thumbnail ? (
            <Thumbnail />
          ) : (
            <span className="flex size-full items-center justify-center text-[var(--color-foreground-subtle)]">
              <CubeIcon weight="duotone" className="size-10" />
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1 p-4">
        <span className="typo-serif-lg-regular text-[var(--color-foreground-emphasis)] transition-colors group-hover:text-[var(--color-brand-foreground-default)]">
          {title}
        </span>
        {description && (
          <span className={cn("line-clamp-2 text-sm leading-relaxed", textMuted)}>{description}</span>
        )}
      </div>
    </a>
  )
}

// Número máximo de colunas, escolhido no bloco: ```component-cards columns=4
const GRID_COLUMNS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
} as const

export type ComponentCardColumns = keyof typeof GRID_COLUMNS

export function parseComponentCardColumns(meta: string | undefined): ComponentCardColumns {
  const value = Number(meta?.match(/(?:^|\s)columns=(\d)/)?.[1])
  return value === 2 || value === 4 ? value : 3
}

/** Grade de cards de componente, no bloco ```component-cards do markdown. */
export function ComponentCardGrid({
  cards,
  columns = 3,
}: {
  cards: ComponentCardData[]
  columns?: ComponentCardColumns
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-4", GRID_COLUMNS[columns])}>
      {cards.map((card) => (
        <ComponentCard key={card.name} {...card} />
      ))}
    </div>
  )
}
