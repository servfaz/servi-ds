import Link from "next/link"
import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr"
import { textMuted } from "@/lib/doc-styles"

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
  const external = /^https?:\/\//.test(href)
  const className = `flex flex-col overflow-hidden rounded-lg border border-[var(--color-taupe-300)] bg-[var(--color-white)] transition-colors hover:border-primary/50 dark:bg-[var(--color-taupe-900)] ${
    highlight ? "sm:col-span-2 lg:col-span-3 xl:col-span-4" : ""
  }`

  const content = (
    <>
      {thumbnail && (
        <div className="flex h-40 items-center justify-center bg-[var(--color-taupe-100)] dark:bg-[var(--color-taupe-800)]">
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="" className="size-full object-cover" />
          )}
        </div>
      )}
      <div className="flex flex-col gap-1 p-5">
        <div className="flex items-center gap-1.5">
          <h3 className="text-base font-semibold tracking-tight">{title}</h3>
          {external && <ArrowSquareOutIcon className={`size-3.5 ${textMuted}`} />}
        </div>
        <p className={`text-sm ${textMuted}`}>{description}</p>
      </div>
    </>
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  )
}
