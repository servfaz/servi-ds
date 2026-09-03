"use client"

import * as React from "react"
import { ChevronDown, ChevronRight, Moon, Search, Sun } from "lucide-react"
import { Button } from "@/registry/servfaz/button"
import registry from "@/registry.json"

// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

type RegistryItem = (typeof registry.items)[number]

const foundationItems: RegistryItem[] = registry.items.filter(
  (item) => item.type === "registry:theme"
)
const componentItems: RegistryItem[] = registry.items.filter(
  (item) => item.type === "registry:ui"
)

const navGroups = [
  { label: "Fundamentos", items: foundationItems },
  { label: "Componentes", items: componentItems },
].filter((group) => group.items.length > 0)

export default function Home() {
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
    <div className="flex h-svh flex-col overflow-hidden bg-background text-foreground">
      <header className="flex h-16 shrink-0 items-stretch justify-between border-b border-border px-4 md:px-6">
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center">
            <img
              src="/brand/logo-default-complete.svg"
              alt="Servi DS"
              className="h-7 w-auto"
            />
          </a>
          <nav className="hidden self-stretch md:flex items-stretch gap-6">
            <span className="flex items-center border-b-2 border-primary text-sm font-medium text-foreground">
              Componentes
            </span>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground sm:flex"
          >
            <Search className="size-4" />
            Buscar
          </button>
          <button
            type="button"
            onClick={() => setIsDark((v) => !v)}
            aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
            className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-accent"
          >
            {isDark ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
            <span className="hidden sm:inline">Tema</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-64 shrink-0 flex-col overflow-y-auto border-r border-border px-3 py-6 md:flex">
          {navGroups.map((group) => {
            const isCollapsed = collapsedGroups[group.label]
            return (
              <div key={group.label} className="mb-4">
                <button
                  type="button"
                  onClick={() => toggleGroup(group.label)}
                  className="flex w-full items-center gap-1 rounded-md px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
                >
                  {isCollapsed ? (
                    <ChevronRight className="size-3.5" />
                  ) : (
                    <ChevronDown className="size-3.5" />
                  )}
                  {group.label}
                </button>
                {!isCollapsed && (
                  <ul className="mt-1 flex flex-col gap-0.5">
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <a
                          href={`#${item.name}`}
                          className="block rounded-md py-1.5 pl-7 pr-2 text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          {item.title ?? item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </aside>

        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto flex max-w-3xl flex-col gap-12 px-4 py-10 md:px-8 md:py-14">
              <div className="flex flex-col gap-4 border-b border-border pb-10">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Registry Servfaz
                </span>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Design System da Servfaz
                </h1>
                <p className="max-w-xl text-base text-muted-foreground">
                  Componentes shadcn/ui restilizados com a identidade visual
                  da Servfaz, distribuídos via Registry para os sistemas
                  consumidores.
                </p>
              </div>

              {componentItems.map((item) => (
                <section
                  key={item.name}
                  id={item.name}
                  className="flex scroll-mt-24 flex-col gap-4 rounded-lg border border-border p-4"
                >
                  <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold tracking-tight">
                      {item.title ?? item.name}
                    </h2>
                    {item.description && (
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {item.name === "button" && (
                    <div className="flex flex-wrap items-center gap-4 rounded-md border border-border p-4">
                      <Button variant="default">Default</Button>
                      <Button variant="default" disabled>
                        Default disabled
                      </Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="secondary" disabled>
                        Secondary disabled
                      </Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link</Button>
                    </div>
                  )}
                </section>
              ))}
            </div>
          </main>

          <aside className="hidden w-56 shrink-0 overflow-y-auto border-l border-border px-4 py-10 lg:block">
            <p className="mb-3 text-sm font-semibold text-foreground">
              Contents
            </p>
            <ul className="flex flex-col gap-2 border-l border-border pl-3">
              {componentItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={`#${item.name}`}
                    className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.title ?? item.name}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  )
}
