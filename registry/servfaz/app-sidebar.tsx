"use client"

import * as React from "react"
import type { Icon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Separator } from "./separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "./sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

/*
 * AppSidebar e AppRail - sidebar dupla do App Shell, espelho do "App Sidebar"
 * do Figma ([SDS] Components, página App Shell), no modelo do ClickUp:
 * - AppRail (App Sidebar collapsed=true): coluna fixa de 56px com os módulos
 *   do sistema, só ícones, com tooltip. Divisor entre grupos de módulos.
 * - AppSidebar (App Sidebar collapsed=false): sidebar aberta de 256px com as
 *   funcionalidades do módulo ativo, título do módulo no topo, grupos com
 *   título e itens de 32px.
 * Módulos, itens e rotas chegam por props: o sistema não edita este arquivo.
 */

type AppSidebarItem = {
  title: string
  url: string
  icon: Icon
  /** Força o item como ativo. Sem a prop, vale a comparação com `currentPath`. */
  isActive?: boolean
  /** Número ao lado do item (ex.: pendências). */
  badge?: number
  /** Item ainda indisponível: mostra o texto de `soonLabel`. */
  disabled?: boolean
}

type AppSidebarGroup = {
  label: string
  items: AppSidebarItem[]
}

type AppModule = {
  title: string
  icon: Icon
  isActive?: boolean
  disabled?: boolean
  /** Funcionalidades do módulo, mostradas na sidebar aberta. */
  groups?: AppSidebarGroup[]
}

/** Componente de link do sistema, como o `Link` do Next.js. Padrão: `a`. */
type AppLinkComponent = React.ElementType<{
  href: string
  className?: string
  children?: React.ReactNode
  "aria-current"?: "page"
}>

/** O item está ativo quando a rota atual é a dele ou uma rota abaixo dela. */
function isPathActive(url: string, currentPath?: string) {
  if (!currentPath || !url || url === "#") return false
  if (url === "/") return currentPath === "/"
  return currentPath === url || currentPath.startsWith(`${url}/`)
}

/* ---------- Rail (módulos) ---------- */

function AppRailButton({
  module,
  onSelect,
}: {
  module: AppModule
  onSelect?: (module: AppModule) => void
}) {
  const ModuleIcon = module.icon
  return (
    <SidebarMenuItem>
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarMenuButton
            isActive={module.isActive}
            aria-label={module.title}
            aria-current={module.isActive ? "page" : undefined}
            disabled={module.disabled}
            onClick={() => onSelect?.(module)}
          >
            <ModuleIcon weight={module.isActive ? "fill" : "light"} />
          </SidebarMenuButton>
        </TooltipTrigger>
        <TooltipContent side="right">{module.title}</TooltipContent>
      </Tooltip>
    </SidebarMenuItem>
  )
}

type AppRailProps = React.ComponentProps<"nav"> & {
  /** Módulos em grupos; um divisor separa cada grupo. */
  modules: AppModule[][]
  /** Módulos no pé do rail, como Configurações. */
  footer?: AppModule[]
  onModuleSelect?: (module: AppModule) => void
}

function AppRail({
  className,
  modules,
  footer = [],
  onModuleSelect,
  ...props
}: AppRailProps) {
  const { open, setOpen } = useSidebar()

  function handleSelect(module: AppModule) {
    if (!open) setOpen(true)
    onModuleSelect?.(module)
  }

  return (
    <nav
      aria-label="Módulos"
      data-slot="app-rail"
      // group + data-collapsible: os itens usam o formato recolhido da Sidebar.
      data-collapsible="icon"
      className={cn(
        "group sticky top-(--header-height) z-20 hidden h-[calc(100svh-var(--header-height))] w-(--rail-width) shrink-0 flex-col gap-2 bg-(--color-background-muted) p-2 md:flex",
        className
      )}
      {...props}
    >
      <div className="flex flex-1 flex-col gap-2">
        {modules.map((group, index) => (
          <React.Fragment key={index}>
            {index > 0 ? (
              <Separator aria-hidden className="mx-1 mb-1 w-8!" />
            ) : null}
            <SidebarMenu className="items-center">
              {group.map((module) => (
                <AppRailButton
                  key={module.title}
                  module={module}
                  onSelect={handleSelect}
                />
              ))}
            </SidebarMenu>
          </React.Fragment>
        ))}
      </div>
      {footer.length > 0 ? (
        <SidebarMenu className="items-center">
          {footer.map((module) => (
            <AppRailButton key={module.title} module={module} onSelect={handleSelect} />
          ))}
        </SidebarMenu>
      ) : null}
    </nav>
  )
}

/* ---------- Sidebar aberta (funcionalidades do módulo) ---------- */

function AppSidebarMenuItem({
  item,
  soonLabel,
  currentPath,
  linkComponent: LinkComponent = "a",
}: {
  item: AppSidebarItem
  soonLabel: string
  currentPath?: string
  linkComponent?: AppLinkComponent
}) {
  const ItemIcon = item.icon
  const active = item.isActive ?? isPathActive(item.url, currentPath)
  const content = (
    <>
      <ItemIcon weight={active ? "fill" : "light"} />
      <span>{item.title}</span>
    </>
  )

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={active}>
        {item.disabled ? (
          <a aria-disabled data-slot="app-sidebar-item">
            {content}
          </a>
        ) : (
          <LinkComponent href={item.url} aria-current={active ? "page" : undefined}>
            {content}
          </LinkComponent>
        )}
      </SidebarMenuButton>
      {item.badge && !item.disabled ? (
        <SidebarMenuBadge className="top-1/2! -translate-y-1/2 rounded-full bg-(--color-feedback-danger-filled) text-(--color-feedback-danger-foreground-on-filled)">
          {item.badge > 99 ? "99+" : item.badge}
        </SidebarMenuBadge>
      ) : null}
      {item.disabled ? (
        <SidebarMenuBadge className="top-1/2! -translate-y-1/2">
          {soonLabel}
        </SidebarMenuBadge>
      ) : null}
    </SidebarMenuItem>
  )
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  /** Nome do módulo ativo, no topo da sidebar. */
  title: string
  groups: AppSidebarGroup[]
  /** Rota atual (ex.: `usePathname()` do Next.js), para marcar o item ativo. */
  currentPath?: string
  /** Componente de link, como o `Link` do Next.js. Padrão: `a`. */
  linkComponent?: AppLinkComponent
  /** Módulos listados no rodapé no celular, onde o rail não aparece. */
  mobileModules?: AppModule[]
  onModuleSelect?: (module: AppModule) => void
  /** Texto dos itens indisponíveis. */
  soonLabel?: string
}

function AppSidebar({
  className,
  title,
  groups,
  currentPath,
  linkComponent,
  mobileModules = [],
  onModuleSelect,
  soonLabel = "Em breve",
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar
      collapsible="offcanvas"
      className={cn(
        // Abaixo do cabeçalho e à direita do rail, com o canto superior
        // esquerdo arredondado como no Figma.
        "top-(--header-height) h-[calc(100svh-var(--header-height))]! md:left-(--rail-width) md:group-data-[collapsible=offcanvas]:left-[calc(var(--rail-width)-var(--sidebar-width))]",
        "overflow-hidden rounded-tl-(--radius-xl) border-t border-l border-(--color-border-default)",
        className
      )}
      {...props}
    >
      <SidebarHeader className="flex-row items-center justify-between gap-2 border-b border-(--color-border-muted) px-4 py-2">
        <span className="truncate typo-sans-md-medium text-(--color-foreground-emphasis)">
          {title}
        </span>
        <SidebarTrigger className="hidden md:inline-flex" />
      </SidebarHeader>
      <SidebarContent className="gap-2 px-2">
        {groups.map((group) => (
          <SidebarGroup key={group.label} className="px-0">
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <AppSidebarMenuItem
                    key={item.title}
                    item={item}
                    soonLabel={soonLabel}
                    currentPath={currentPath}
                    linkComponent={linkComponent}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      {mobileModules.length > 0 ? (
        <SidebarFooter className="md:hidden">
          {/* No celular o rail some: os módulos ficam no rodapé da Sheet. */}
          <SidebarMenu>
            {mobileModules.map((module) => {
              const ModuleIcon = module.icon
              return (
                <SidebarMenuItem key={module.title}>
                  <SidebarMenuButton
                    isActive={module.isActive}
                    disabled={module.disabled}
                    onClick={() => onModuleSelect?.(module)}
                  >
                    <ModuleIcon weight={module.isActive ? "fill" : "light"} />
                    <span>{module.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarFooter>
      ) : null}
    </Sidebar>
  )
}

export { AppSidebar, AppRail, isPathActive }
export type {
  AppSidebarProps,
  AppSidebarItem,
  AppSidebarGroup,
  AppModule,
  AppRailProps,
  AppLinkComponent,
}
