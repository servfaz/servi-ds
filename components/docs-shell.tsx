"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowSquareOutIcon,
  CaretDownIcon,
  CaretRightIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
} from "@phosphor-icons/react"
import registry from "@/registry.json"
import { Button } from "@/registry/servfaz/button"
import {
  hoverSurface,
  hoverText,
  textMuted,
  textStrong,
  textSubtle,
} from "@/lib/doc-styles"

type RegistryItem = (typeof registry.items)[number]

type NavLink = {
  key: string
  label: string
  href: string
  external?: boolean
}

const foundationItems: RegistryItem[] = registry.items.filter(
  (item) => item.type === "registry:theme"
)
const componentItems: RegistryItem[] = registry.items.filter(
  (item) => item.type === "registry:ui"
)

const toNavLink = (item: RegistryItem): NavLink => ({
  key: item.name,
  label: item.title ?? item.name,
  href:
    item.type === "registry:ui"
      ? `/docs/componentes/${item.name}`
      : `#${item.name}`,
})

const linkGroupItems: NavLink[] = [
  {
    key: "repositorio",
    label: "Repositório",
    href: "https://github.com/servfaz/servi-ds",
    external: true,
  },
  {
    key: "figma",
    label: "Figma",
    href: "https://www.figma.com/design/FJY9bl17wrv2Qy6faoib66/-SF-DS--Variables",
    external: true,
  },
]

const navGroups = [
  { label: "Fundações", items: foundationItems.map(toNavLink) },
  { label: "Componentes", items: componentItems.map(toNavLink) },
  { label: "Links", items: linkGroupItems },
].filter((group) => group.items.length > 0)

const headerTabs = ["Para designer", "Para devs", "Sobre o DS"]

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = React.useState(false)
  const [collapsedGroups, setCollapsedGroups] = React.useState<
    Record<string, boolean>
  >({})

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  function toggleGroup(label: string) {
    setCollapsedGroups((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <div
      className={`flex h-svh flex-col overflow-hidden bg-[var(--color-taupe-50)] dark:bg-[var(--color-taupe-950)] ${textStrong}`}
    >
      <header className="flex h-14 shrink-0 items-stretch justify-between border-b border-[var(--color-taupe-200)] px-4 md:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            <img
              src="/brand/logo-servi-reduzida-default.svg"
              alt="Servi DS"
              className="h-9 w-auto"
            />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {headerTabs.map((tab) => (
            <nav
              key={tab}
              className="hidden self-stretch md:flex items-stretch gap-6"
            >
              <span className="flex items-center text-sm font-medium">
                {tab}
              </span>
            </nav>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="hidden gap-2 sm:flex"
          >
            <MagnifyingGlassIcon className="size-4" />
            Buscar
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsDark((v) => !v)}
            aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
            className="gap-2"
          >
            {isDark ? (
              <SunIcon className="size-4" />
            ) : (
              <MoonIcon className="size-4" />
            )}
            <span className="hidden sm:inline">Tema</span>
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-64 shrink-0 flex-col overflow-y-auto border-r border-[var(--color-taupe-200)] px-3 py-6 md:flex">
          <Link
            href="/#comece"
            className={`mb-4 block rounded-md px-2 py-1.5 text-sm font-semibold ${textStrong} transition-colors ${hoverSurface} ${hoverText}`}
          >
            Comece
          </Link>

          {navGroups.map((group) => {
            const isCollapsed = collapsedGroups[group.label]
            return (
              <div key={group.label} className="mb-4">
                <button
                  type="button"
                  onClick={() => toggleGroup(group.label)}
                  className={`flex w-full items-center gap-1 rounded-md px-2 py-1.5 text-xs font-semibold uppercase tracking-wide ${textMuted} transition-colors ${hoverText}`}
                >
                  {isCollapsed ? (
                    <CaretRightIcon className="size-3.5" />
                  ) : (
                    <CaretDownIcon className="size-3.5" />
                  )}
                  {group.label}
                </button>
                {!isCollapsed && (
                  <ul className="mt-1 flex flex-col gap-0.5">
                    {group.items.map((item) => {
                      const linkClassName = `flex items-center gap-1.5 rounded-md py-1.5 pl-7 pr-2 text-sm ${textSubtle} transition-colors ${hoverSurface} ${hoverText}`
                      const linkContent = (
                        <>
                          {item.label}
                          {item.external && (
                            <ArrowSquareOutIcon
                              className={`size-3.5 ${textMuted}`}
                            />
                          )}
                        </>
                      )
                      return (
                        <li key={item.key}>
                          {item.external ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={linkClassName}
                            >
                              {linkContent}
                            </a>
                          ) : item.href.startsWith("/") ? (
                            <Link href={item.href} className={linkClassName}>
                              {linkContent}
                            </Link>
                          ) : (
                            <a href={item.href} className={linkClassName}>
                              {linkContent}
                            </a>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            )
          })}
        </aside>

        <main className="flex-1 overflow-y-auto">
          <div className="flex w-full flex-col gap-10 px-4 py-10 sm:px-8 sm:py-14 lg:px-12 xl:px-16">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
