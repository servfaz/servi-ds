import registry from "@/registry.json"

export type RegistryItem = (typeof registry.items)[number]

export type NavLink = {
  key: string
  label: string
  href?: string
  external?: boolean
}

export const foundationItems: RegistryItem[] = registry.items.filter(
  (item) => item.type === "registry:theme"
)

export const componentItems: RegistryItem[] = registry.items.filter(
  (item) => item.type === "registry:ui"
)

export function toNavLink(item: RegistryItem): NavLink {
  return {
    key: item.name,
    label: item.title ?? item.name,
    href:
      item.type === "registry:ui"
        ? `/docs/componentes/${item.name}`
        : `#${item.name}`,
  }
}

export const linkGroupItems: NavLink[] = [
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

export const headerTabs: NavLink[] = [
  { key: "para-designer", label: "Para designer" },
  { key: "para-devs", label: "Para devs", href: "/docs/para-devs" },
  { key: "sobre", label: "Sobre o DS", href: "/docs/sobre" },
]
