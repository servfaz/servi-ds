import { ArrowSquareOutIcon } from "@phosphor-icons/react"
import { isExternal, linkProps } from "./links"
import { textMuted } from "./doc-styles"

export type ResourceCardData = {
  title: string
  href: string
  description: string
  /** Capa do card, ocupando a área inteira (proporção 3:2). */
  image?: string
  /** Capa alternativa mostrada no hover e no foco do card (opcional). */
  imageHover?: string
  thumbnail?: boolean
  highlight?: boolean
}

export function ResourceCard({
  title,
  href,
  description,
  image,
  imageHover,
  thumbnail,
  highlight,
}: ResourceCardData) {
  const external = isExternal(href)
  const className = `flex flex-col overflow-hidden group rounded-xl border border-[var(--color-border-default)] bg-[var(--color-background-default)] no-underline transition-colors hover:border-[var(--color-brand-border)] ${
    highlight ? "sm:col-span-2 lg:col-span-3 xl:col-span-4" : ""
  }`

  return (
    <a {...linkProps(href)} className={className}>
      {thumbnail && (
        <div className="relative aspect-[3/2] overflow-hidden bg-[var(--color-brand-subtle)]">
          {image && (
            <img src={image} alt="" className="absolute inset-0 size-full object-cover" />
          )}
          {imageHover && (
            <img
              src={imageHover}
              alt=""
              className="absolute inset-0 size-full object-cover opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
            />
          )}
        </div>
      )}
      <div className="flex flex-col gap-1 border-t border-[var(--color-border-default)] p-5">
        <div className="flex items-center gap-1.5">
          <h3 className="text-lg font-bold tracking-tight text-[var(--color-foreground-emphasis)] transition-colors group-hover:text-[var(--color-brand-foreground-default)]">
            {title}
          </h3>
          {external && <ArrowSquareOutIcon className={`size-3.5 ${textMuted}`} />}
        </div>
        <p className={`text-sm ${textMuted}`}>{description}</p>
      </div>
    </a>
  )
}

// Número máximo de colunas da grade, escolhido no bloco: ```card-grid columns=3
const GRID_COLUMNS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
} as const

export type CardGridColumns = keyof typeof GRID_COLUMNS

export function parseCardGridColumns(meta: string | undefined): CardGridColumns {
  const value = Number(meta?.match(/(?:^|\s)columns=(\d)/)?.[1])
  return value === 2 || value === 3 ? value : 4
}

export function ResourceCardGrid({
  cards,
  columns = 4,
}: {
  cards: ResourceCardData[]
  columns?: CardGridColumns
}) {
  return (
    <div className={`grid grid-cols-1 gap-4 ${GRID_COLUMNS[columns]}`}>
      {cards.map((card) => (
        <ResourceCard key={card.href + card.title} {...card} />
      ))}
    </div>
  )
}
