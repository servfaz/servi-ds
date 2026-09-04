import Link from "next/link"
import { ArrowSquareOutIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { textMuted, textStrong, textSubtle, hoverText } from "@/lib/doc-styles"
import {
  componentItems,
  foundationItems,
  headerTabs,
  linkGroupItems,
  toNavLink,
  type NavLink,
} from "@/lib/site-nav"

const guideItems: NavLink[] = [
  { key: "comece", label: "Comece", href: "/#comece" },
  ...headerTabs,
]

type FooterColumn = {
  label: string
  items: NavLink[]
}

const columns: FooterColumn[] = [
  { label: "Fundações", items: foundationItems.map(toNavLink) },
  { label: "Componentes", items: componentItems.map(toNavLink) },
  { label: "Guias", items: guideItems },
  { label: "Links", items: linkGroupItems },
].filter((column) => column.items.length > 0)

function FooterLink({ item }: { item: NavLink }) {
  if (!item.href) {
    return <span className={cn("text-sm", textMuted)}>{item.label}</span>
  }

  const className = cn(
    "flex items-center gap-1.5 text-sm transition-colors",
    textSubtle,
    hoverText
  )

  const content = (
    <>
      {item.label}
      {item.external && (
        <ArrowSquareOutIcon className={cn("size-3.5", textMuted)} />
      )}
    </>
  )

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={item.href} className={className}>
      {content}
    </Link>
  )
}

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--color-taupe-200)] px-4 py-10 sm:px-8 lg:px-12 xl:px-16 dark:border-[var(--color-taupe-800)]">
      <Link href="/" className="inline-flex items-center">
        <img
          src="/brand/logo-servi-complete-default.svg"
          alt="Servi DS"
          className="h-8 w-auto"
        />
      </Link>

      <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
        {columns.map((column) => (
          <div key={column.label} className="flex flex-col gap-3">
            <h3 className={cn("text-sm font-semibold", textStrong)}>
              {column.label}
            </h3>
            <ul className="flex flex-col gap-2">
              {column.items.map((item) => (
                <li key={item.key}>
                  <FooterLink item={item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-[var(--color-taupe-200)] pt-6 text-sm dark:border-[var(--color-taupe-800)]">
        <span className={textMuted}>© {year} Servfaz</span>
      </div>
    </footer>
  )
}
