import { ArrowSquareOutIcon } from "@phosphor-icons/react"
import { isExternal, linkProps } from "./links"
import { textMuted } from "./doc-styles"

export type ResourceCardData = {
  title: string
  href: string
  description: string
  image?: string
  thumbnail?: boolean
  highlight?: boolean
}

export function ResourceCard({
  title,
  href,
  description,
  image,
  thumbnail,
  highlight,
}: ResourceCardData) {
  const external = isExternal(href)
  const className = `flex flex-col overflow-hidden rounded-lg border border-[var(--color-taupe-300)] bg-[var(--color-white)] no-underline transition-colors hover:border-primary/50 dark:bg-[var(--color-taupe-900)] ${
    highlight ? "sm:col-span-2 lg:col-span-3 xl:col-span-4" : ""
  }`

  return (
    <a {...linkProps(href)} className={className}>
      {thumbnail && (
        <div className="flex h-40 items-center justify-center bg-[var(--color-taupe-100)] dark:bg-[var(--color-taupe-800)]">
          {image && <img src={image} alt="" className="size-full object-cover" />}
        </div>
      )}
      <div className="flex flex-col gap-1 p-5">
        <div className="flex items-center gap-1.5">
          <h3 className="text-lg font-bold tracking-tight text-[var(--color-taupe-950)] dark:text-[var(--color-taupe-50)]">
            {title}
          </h3>
          {external && <ArrowSquareOutIcon className={`size-3.5 ${textMuted}`} />}
        </div>
        <p className={`text-sm ${textMuted}`}>{description}</p>
      </div>
    </a>
  )
}

export function ResourceCardGrid({ cards }: { cards: ResourceCardData[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cards.map((card) => (
        <ResourceCard key={card.href + card.title} {...card} />
      ))}
    </div>
  )
}
