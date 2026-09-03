import type { DocHeading } from "@/lib/markdown-headings"
import { textMuted } from "@/lib/doc-styles"

export function TableOfContents({ headings }: { headings: DocHeading[] }) {
  if (headings.length === 0) return null

  return (
    <nav className="hidden w-44 shrink-0 xl:block">
      <div className="sticky top-10 flex flex-col gap-2">
        <span className={`text-xs font-semibold uppercase tracking-wide ${textMuted}`}>
          Nesta página
        </span>
        <ul className="flex flex-col gap-2 border-l border-[var(--color-taupe-300)]">
          {headings.map((heading) => (
            <li key={heading.slug}>
              <a
                href={`#${heading.slug}`}
                className={`block text-sm leading-snug ${textMuted} transition-colors hover:text-[var(--color-taupe-950)] dark:hover:text-[var(--color-taupe-50)] ${
                  heading.depth === 3 ? "pl-6" : "pl-3"
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
