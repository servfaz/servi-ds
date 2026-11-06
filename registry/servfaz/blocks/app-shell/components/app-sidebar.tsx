"use client"

import * as React from "react"
import {
  ChartBarIcon,
  ClipboardTextIcon,
  FileTextIcon,
  GearIcon,
  HouseIcon,
  PackageIcon,
  ShoppingCartIcon,
  TagIcon,
  TruckIcon,
  UsersIcon,
  UsersThreeIcon,
  WrenchIcon,
  type Icon,
} from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
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
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

/*
 * AppSidebar - sidebar dupla do bloco App Shell, espelho do "App Sidebar" do
 * Figma ([SDS] Components, página App Shell), no modelo do ClickUp:
 * - AppRail (App Sidebar collapsed=true): coluna fixa de 56px com os módulos
 *   do sistema, só ícones, com tooltip. Divisor entre grupos de módulos.
 * - AppSidebar (App Sidebar collapsed=false): sidebar aberta de 256px com as
 *   funcionalidades do módulo ativo, título do módulo no topo, grupos com
 *   título e itens de 32px.
 * Arquivo de bloco: o sistema copia e edita módulos, itens, rotas e textos.
 */

type AppSidebarItem = {
  title: string
  url: string
  icon: Icon
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

const defaultModules: AppModule[][] = [
  [
    {
      title: "Inventário",
      icon: HouseIcon,
      isActive: true,
      groups: [
        {
          label: "Dia a dia",
          items: [
            { title: "Início", url: "#", icon: HouseIcon, isActive: true },
            { title: "Clientes", url: "#", icon: UsersIcon },
            { title: "Ordens de serviço", url: "#", icon: ClipboardTextIcon, badge: 3 },
            { title: "Contratos", url: "#", icon: FileTextIcon },
            { title: "Relatórios", url: "#", icon: ChartBarIcon },
          ],
        },
        {
          label: "Cadastros",
          items: [
            { title: "Serviços", url: "#", icon: TagIcon },
            { title: "Equipe", url: "#", icon: UsersThreeIcon, disabled: true },
          ],
        },
      ],
    },
    { title: "Compras", icon: ShoppingCartIcon },
    { title: "Frota", icon: TruckIcon },
    { title: "Estoque", icon: PackageIcon },
  ],
  [
    { title: "Manutenção", icon: WrenchIcon },
    { title: "Pessoas", icon: UsersThreeIcon, disabled: true },
  ],
]

const defaultRailFooter: AppModule[] = [{ title: "Configurações", icon: GearIcon }]

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
  modules?: AppModule[][]
  footer?: AppModule[]
  onModuleSelect?: (module: AppModule) => void
}

function AppRail({
  className,
  modules = defaultModules,
  footer = defaultRailFooter,
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
      <SidebarMenu className="items-center">
        {footer.map((module) => (
          <AppRailButton key={module.title} module={module} onSelect={handleSelect} />
        ))}
      </SidebarMenu>
    </nav>
  )
}

/* ---------- Sidebar aberta (funcionalidades do módulo) ---------- */

function AppSidebarMenuItem({
  item,
  soonLabel,
}: {
  item: AppSidebarItem
  soonLabel: string
}) {
  const ItemIcon = item.icon

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={item.isActive}>
        <a
          href={item.disabled ? undefined : item.url}
          aria-current={item.isActive ? "page" : undefined}
          aria-disabled={item.disabled || undefined}
        >
          <ItemIcon weight={item.isActive ? "fill" : "light"} />
          <span>{item.title}</span>
        </a>
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
  title?: string
  groups?: AppSidebarGroup[]
  /** Texto dos itens indisponíveis. */
  soonLabel?: string
}

function AppSidebar({
  className,
  title = defaultModules[0][0].title,
  groups = defaultModules[0][0].groups ?? [],
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
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="md:hidden">
        {/* No celular o rail some: os módulos ficam no rodapé da Sheet. */}
        <SidebarMenu>
          {defaultModules.flat().map((module) => {
            const ModuleIcon = module.icon
            return (
              <SidebarMenuItem key={module.title}>
                <SidebarMenuButton isActive={module.isActive} disabled={module.disabled}>
                  <ModuleIcon weight={module.isActive ? "fill" : "light"} />
                  <span>{module.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export { AppSidebar, AppRail }
export type { AppSidebarProps, AppSidebarItem, AppSidebarGroup, AppModule, AppRailProps }
