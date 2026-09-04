"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ArrowSquareOutIcon,
  CaretDownIcon,
  CaretRightIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
} from "@phosphor-icons/react"
import { Button } from "@/registry/servfaz/button"
import { SiteFooter } from "@/components/docs/site-footer"
import {
  componentItems,
  foundationItems,
  headerTabs,
  linkGroupItems,
  toNavLink,
} from "@/lib/site-nav"
import {
  hoverSurface,
  hoverText,
  textMuted,
  textStrong,
  textSubtle,
} from "@/lib/doc-styles"

const navGroups = [
  { label: "Fundações", items: foundationItems.map(toNavLink) },
  { label: "Componentes", items: componentItems.map(toNavLink) },
  { label: "Links", items: linkGroupItems },
].filter((group) => group.items.length > 0)

export function DocsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
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
      className={`min-h-svh bg-[var(--color-taupe-50)] dark:bg-[var(--color-taupe-950)] ${textStrong}`}
    >
      <header className="sticky top-0 z-30 flex h-14 items-stretch justify-between border-b border-[var(--color-taupe-200)] bg-[var(--color-taupe-50)] px-4 dark:bg-[var(--color-taupe-950)] md:px-6">
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
          {headerTabs.map((tab) => {
            const isActive = tab.href ? pathname === tab.href : false
            const tabClassName = `flex items-center border-b-2 text-sm font-medium transition-colors ${
              isActive
                ? "border-primary"
                : `border-transparent ${textMuted} ${hoverText}`
            }`
            return (
              <nav
                key={tab.label}
                className="hidden self-stretch md:flex items-stretch gap-6"
              >
                {tab.href ? (
                  <Link href={tab.href} className={tabClassName}>
                    {tab.label}
                  </Link>
                ) : (
                  <span className={tabClassName}>{tab.label}</span>
                )}
              </nav>
            )
          })}
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

      <div className="flex">
        <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-64 shrink-0 flex-col overflow-y-auto border-r border-[var(--color-taupe-200)] px-3 py-6 md:flex">
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
                          ) : item.href?.startsWith("/") ? (
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

        <main className="min-w-0 flex-1">
          <div className="flex w-full flex-col gap-10 px-4 py-10 sm:px-8 sm:py-14 lg:px-12 xl:px-16">
            {children}
          </div>
          <SiteFooter />
        </main>
      </div>
    </div>
  )
}
