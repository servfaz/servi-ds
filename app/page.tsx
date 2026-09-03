"use client"

import * as React from "react"
import {
  ArrowSquareOutIcon,
  CaretDownIcon,
  CaretRightIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
} from "@phosphor-icons/react"
import registry from "@/registry.json"

// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

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
  href: `#${item.name}`,
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

const textStrong =
  "text-[var(--color-taupe-950)] dark:text-[var(--color-taupe-50)]"
const textMuted =
  "text-[var(--color-taupe-700)] dark:text-[var(--color-taupe-300)]"
const textSubtle =
  "text-[var(--color-taupe-900)] dark:text-[var(--color-taupe-200)]"
const hoverSurface =
  "hover:bg-[var(--color-taupe-100)] dark:hover:bg-[var(--color-taupe-800)]"
const hoverText =
  "hover:text-[var(--color-taupe-950)] dark:hover:text-[var(--color-taupe-50)]"

type HeroCard = {
  key: string
  image?: string
  title: string
  description: string
  href: string
  external?: boolean
  highlight?: boolean
}

const heroCards: HeroCard[] = [
  {
    key: "sobre",
    title: "Sobre o Design System",
    description:
      "O que é o Servi DS, como ele é distribuído via Registry e por que existe.",
    href: "#",
    highlight: true,
  },
  {
    key: "design",
    title: "Design",
    description:
      "Identidade visual, tokens e princípios de design da Servfaz.",
    href: "#",
  },
  {
    key: "desenvolvimento",
    title: "Desenvolvimento",
    description:
      "Como instalar, consumir e contribuir com os componentes via Registry.",
    href: "#",
  },
  {
    key: "conteudo",
    title: "Conteúdo",
    description: "Padrões de voz, tom e escrita para as telas dos produtos.",
    href: "#",
  },
  {
    key: "figma",
    title: "Biblioteca do Figma",
    description:
      "Componentes e tokens sincronizados com o arquivo oficial no Figma.",
    href: "https://www.figma.com/design/FJY9bl17wrv2Qy6faoib66/-SF-DS--Variables",
    external: true,
  },
]

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
    <div
      className={`flex h-svh flex-col overflow-hidden bg-[var(--color-taupe-50)] dark:bg-[var(--color-taupe-950)] ${textStrong}`}
    >
      <header className="flex h-14 shrink-0 items-stretch justify-between border-b border-[var(--color-taupe-200)] px-4 md:px-6">
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center">
            <img
              src="/brand/logo-servi-reduzida-default.svg"
              alt="Servi DS"
              className="h-9 w-auto"
            />
          </a>
        </div>

        <div className="flex items-center gap-2">
          <nav className="hidden self-stretch md:flex items-stretch gap-6">
            <span
              className={`flex items-center border-b-2 border-primary text-sm font-medium ${textStrong}`}
            >
              Comece
            </span>
          </nav>
          <nav className="hidden self-stretch md:flex items-stretch gap-6">
            <span
              className={`flex items-center border-b-2 border-primary text-sm font-medium ${textStrong}`}
            >
              Para designer
            </span>
          </nav>
          <nav className="hidden self-stretch md:flex items-stretch gap-6">
            <span
              className={`flex items-center border-b-2 border-primary text-sm font-medium ${textStrong}`}
            >
              Para devs
            </span>
          </nav>
          <nav className="hidden self-stretch md:flex items-stretch gap-6">
            <span
              className={`flex items-center border-b-2 border-primary text-sm font-medium ${textStrong}`}
            >
              Sobre o DS
            </span>
          </nav>
          <button
            type="button"
            className={`hidden items-center gap-2 rounded-md border border-[var(--color-taupe-100)] px-3 py-1.5 text-sm ${textMuted} transition-colors ${hoverSurface} ${hoverText} sm:flex`}
          >
            <MagnifyingGlassIcon className="size-4" />
            Buscar
          </button>
          <button
            type="button"
            onClick={() => setIsDark((v) => !v)}
            aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
            className={`flex items-center gap-2 rounded-full border border-[var(--color-taupe-100)] px-3 py-1.5 text-sm ${textStrong} transition-colors ${hoverSurface}`}
          >
            {isDark ? (
              <SunIcon className="size-4" />
            ) : (
              <MoonIcon className="size-4" />
            )}
            <span className="hidden sm:inline">Tema</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-64 shrink-0 flex-col overflow-y-auto border-r border-[var(--color-taupe-200)] px-3 py-6 md:flex">
          <a
            href="#comece"
            className={`mb-4 block rounded-md px-2 py-1.5 text-sm font-semibold ${textStrong} transition-colors ${hoverSurface} ${hoverText}`}
          >
            Comece
          </a>

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
                    {group.items.map((item) => (
                      <li key={item.key}>
                        <a
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noopener noreferrer" : undefined}
                          className={`flex items-center gap-1.5 rounded-md py-1.5 pl-7 pr-2 text-sm ${textSubtle} transition-colors ${hoverSurface} ${hoverText}`}
                        >
                          {item.label}
                          {item.external && (
                            <ArrowSquareOutIcon
                              className={`size-3.5 ${textMuted}`}
                            />
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </aside>

        <main className="flex-1 overflow-y-auto">
          <div className="flex w-full flex-col gap-10 px-4 py-10 sm:px-8 sm:py-14 lg:px-12 xl:px-16">
            <div
              id="comece"
              className="flex scroll-mt-24 flex-col gap-4"
            >
              <span
                className={`text-xs font-semibold uppercase tracking-widest ${textMuted}`}
              >
                Registry Servfaz
              </span>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Comece
              </h1>
              <p className={`max-w-2xl text-base ${textMuted}`}>
                Componentes shadcn/ui restilizados com a identidade visual da
                Servfaz, distribuídos via Registry para os sistemas
                consumidores da empresa.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {heroCards.map((card) => (
                <a
                  key={card.key}
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                  className={`flex flex-col overflow-hidden rounded-lg border border-[var(--color-taupe-100)] bg-[var(--color-white)] dark:bg-[var(--color-taupe-900)] ${textStrong} transition-colors hover:border-primary/50 ${
                    card.highlight
                      ? "sm:col-span-2 lg:col-span-3 xl:col-span-4"
                      : ""
                  }`}
                >
                  <div className="flex h-40 items-center justify-center bg-[var(--color-taupe-100)] dark:bg-[var(--color-taupe-800)]">
                    {card.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={card.image}
                        alt=""
                        className="size-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-1 p-5">
                    <div className="flex items-center gap-1.5">
                      <h2 className="text-base font-semibold tracking-tight">
                        {card.title}
                      </h2>
                      {card.external && (
                        <ArrowSquareOutIcon
                          className={`size-3.5 ${textMuted}`}
                        />
                      )}
                    </div>
                    <p className={`text-sm ${textMuted}`}>
                      {card.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
