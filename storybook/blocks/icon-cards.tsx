import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react"
import { Badge } from "@/registry/servfaz/badge"
import { cn } from "@/lib/utils"
import { docIcon } from "./doc-icons"
import { InlineMarkdown } from "./inline-markdown"
import { isExternal, linkProps } from "./links"
import { textMuted } from "./doc-styles"

export type IconCardData = {
  icon?: string
  title: string
  description?: string
  /** Opcional. Com link, o card inteiro é clicável e ganha a seta. */
  href?: string
  /** Etiqueta curta ao lado do título, como "Recomendado". */
  badge?: string
}

function IconCard({ icon, title, description, href, badge }: IconCardData) {
  const IconComponent = docIcon(icon)
  const Arrow = href && isExternal(href) ? ArrowUpRightIcon : ArrowRightIcon
  const className = cn(
    "group flex items-start gap-4 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-background-default)] p-5 no-underline",
    href &&
      "transition-colors hover:border-[var(--color-brand-border)] hover:bg-[var(--color-brand-light)]"
  )

  const content = (
    <>
      {IconComponent && (
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-subtle)] text-[var(--color-brand-foreground-default)]">
          <IconComponent weight="duotone" className="size-5" />
        </span>
      )}
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="typo-serif-lg-regular text-[var(--color-foreground-emphasis)]">
            {title}
          </span>
          {badge && (
            <Badge variant="light" color="brand">
              {badge}
            </Badge>
          )}
        </span>
        {description && (
          <span className={cn("text-sm leading-relaxed", textMuted)}>
            <InlineMarkdown>{description}</InlineMarkdown>
          </span>
        )}
      </span>
      {href && (
        <Arrow className="mt-1 size-4 shrink-0 text-[var(--color-foreground-muted)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--color-brand-foreground-default)]" />
      )}
    </>
  )

  if (!href) return <div className={className}>{content}</div>
  return (
    <a {...linkProps(href)} className={className}>
      {content}
    </a>
  )
}

// Número de colunas escolhido no bloco: ```icon-cards columns=2
const GRID_COLUMNS = {
  1: "",
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 xl:grid-cols-4",
} as const

export type IconCardColumns = keyof typeof GRID_COLUMNS

export function parseIconCardColumns(meta: string | undefined): IconCardColumns {
  const value = Number(meta?.match(/(?:^|\s)columns=(\d)/)?.[1])
  return value === 1 || value === 3 || value === 4 ? value : 2
}

/** Grade de cards com ícone, no bloco ```icon-cards do markdown. */
export function IconCardGrid({
  cards,
  columns = 2,
}: {
  cards: IconCardData[]
  columns?: IconCardColumns
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-4", GRID_COLUMNS[columns])}>
      {cards.map((card) => (
        <IconCard key={card.title} {...card} />
      ))}
    </div>
  )
}
