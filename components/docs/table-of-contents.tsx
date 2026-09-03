"use client"

import * as React from "react"
import type { DocHeading } from "@/lib/markdown-headings"
import { hoverSurface, textMuted, textStrong } from "@/lib/doc-styles"

export function TableOfContents({ headings }: { headings: DocHeading[] }) {
  const [activeSlug, setActiveSlug] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (headings.length === 0) return

    const elements = headings
      .map((heading) => document.getElementById(heading.slug))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return
        const topMost = visible.reduce((closest, entry) =>
          entry.boundingClientRect.top < closest.boundingClientRect.top
            ? entry
            : closest
        )
        setActiveSlug(topMost.target.id)
      },
      {
        root: document.querySelector("main"),
        rootMargin: "0px 0px -70% 0px",
        threshold: 0,
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="hidden w-44 shrink-0 xl:block">
      <div className="sticky top-10 flex flex-col gap-4">
        <span
          className={`text-xs font-semibold uppercase tracking-wide ${textMuted}`}
        >
          Nesta página
        </span>
        <ul className="flex flex-col gap-1 border-l border-[var(--color-taupe-300)]">
          {headings.map((heading) => {
            const isActive = heading.slug === activeSlug
            return (
              <li key={heading.slug}>
                <a
                  href={`#${heading.slug}`}
                  className={`-ml-px block rounded-r-md border-l-2 py-1.5 pr-2 text-sm leading-snug transition-colors ${hoverSurface} ${
                    heading.depth === 3 ? "pl-7" : "pl-4"
                  } ${
                    isActive
                      ? `border-primary font-medium ${textStrong}`
                      : `border-transparent ${textMuted} hover:text-[var(--color-taupe-950)] dark:hover:text-[var(--color-taupe-50)]`
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
