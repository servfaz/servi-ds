import type { ReactNode } from "react"
import { HeroMedia } from "./hero-media"

/**
 * Topo de página com ilustração, no lugar do cabeçalho simples. Usado quando
 * o frontmatter da página traz o campo hero com o caminho da imagem ou do
 * vídeo (.webm).
 */
export function PageHero({
  title,
  description,
  image,
  poster,
  actions,
}: {
  title: string
  description?: string
  image: string
  poster?: string
  actions?: ReactNode
}) {
  return (
    <div className="grid items-center gap-8 py-4 md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] md:gap-16 md:py-10">
      <div className="flex flex-col gap-4">
        <h1 className="typo-serif-5xl-regular text-[var(--color-foreground-emphasis)] sm:typo-serif-6xl-regular lg:typo-serif-7xl-regular">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-lg text-[var(--color-foreground-muted)]">{description}</p>
        )}
        {actions && <div className="pt-2">{actions}</div>}
      </div>
      <HeroMedia
        src={image}
        poster={poster}
        className="w-full max-w-xs justify-self-center sm:max-w-sm md:max-w-none md:justify-self-end"
      />
    </div>
  )
}
