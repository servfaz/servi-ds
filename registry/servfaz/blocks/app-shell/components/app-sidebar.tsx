"use client"

import * as React from "react"
import {
  ArrowLineLeftIcon,
  ArrowLineRightIcon,
  ChartBarIcon,
  ClipboardTextIcon,
  FileTextIcon,
  GearIcon,
  HouseIcon,
  MegaphoneIcon,
  TagIcon,
  UsersIcon,
  UsersThreeIcon,
  type Icon,
} from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"

/*
 * AppSidebar - menu lateral do bloco App Shell, montado só com as peças da
 * Sidebar. Arquivo de bloco: o sistema copia e edita itens, rotas e textos.
 * Fica abaixo do AppHeader (top e altura descontam --header-height, como no
 * bloco sidebar-16 do shadcn). A logo mora no AppHeader.
 * Aberto: grupos com título e itens de 40px. Recolhido: só ícones de 32px,
 * com tooltip, e o título do grupo vira divisor. O botão de recolher fica no
 * rodapé, como no GitLab.
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

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  groups?: AppSidebarGroup[]
  footerItems?: AppSidebarItem[]
  /** Texto dos itens indisponíveis. */
  soonLabel?: string
  collapseLabel?: string
  expandLabel?: string
}

const defaultGroups: AppSidebarGroup[] = [
  {
    label: "Dia a dia",
    items: [
      { title: "Início", url: "#", icon: HouseIcon, isActive: true },
      { title: "Clientes", url: "#", icon: UsersIcon },
      { title: "Contratos", url: "#", icon: FileTextIcon },
      { title: "Ordens de serviço", url: "#", icon: ClipboardTextIcon, badge: 3 },
      { title: "Financeiro", url: "#", icon: ChartBarIcon },
    ],
  },
  {
    label: "Cadastros",
    items: [
      { title: "Serviços", url: "#", icon: TagIcon },
      { title: "Equipe", url: "#", icon: UsersThreeIcon, disabled: true },
    ],
  },
]

const defaultFooterItems: AppSidebarItem[] = [
  { title: "Novidades", url: "#", icon: MegaphoneIcon, badge: 2 },
  { title: "Configurações", url: "#", icon: GearIcon },
]

// Item aberto com 40px; recolhido, o size-8 da Sidebar vale por cima.
const itemButton = "h-(--size-control-lg)"

function AppSidebarCollapse({
  collapseLabel,
  expandLabel,
}: {
  collapseLabel: string
  expandLabel: string
}) {
  const { state, toggleSidebar } = useSidebar()
  const collapsed = state === "collapsed"
  const label = collapsed ? expandLabel : collapseLabel

  return (
    <SidebarMenuItem className="hidden md:block">
      <SidebarMenuButton
        onClick={toggleSidebar}
        tooltip={label}
        aria-expanded={!collapsed}
        data-slot="app-sidebar-collapse"
        className={cn(itemButton, "text-(--color-text-subtle) [&>svg]:text-(--color-icon-subtle)")}
      >
        {collapsed ? <ArrowLineRightIcon /> : <ArrowLineLeftIcon />}
        <span>{label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

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
      <SidebarMenuButton
        asChild
        isActive={item.isActive}
        tooltip={item.title}
        className={itemButton}
      >
        <a
          href={item.disabled ? undefined : item.url}
          aria-current={item.isActive ? "page" : undefined}
          aria-disabled={item.disabled || undefined}
        >
          <ItemIcon weight={item.isActive ? "fill" : "regular"} />
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>
      {item.badge && !item.disabled ? (
        <SidebarMenuBadge className="top-1/2! -translate-y-1/2 rounded-full bg-(--color-background-danger-bold) text-(--color-text-on-bold)">
          {item.badge > 99 ? "99+" : item.badge}
        </SidebarMenuBadge>
      ) : null}
      {item.disabled ? (
        <SidebarMenuBadge className="top-1/2! -translate-y-1/2 font-normal text-(--color-text-subtlest)">
          {soonLabel}
        </SidebarMenuBadge>
      ) : null}
    </SidebarMenuItem>
  )
}

function AppSidebar({
  className,
  groups = defaultGroups,
  footerItems = defaultFooterItems,
  soonLabel = "Em breve",
  collapseLabel = "Recolher menu",
  expandLabel = "Expandir menu",
  variant = "inset",
  collapsible = "icon",
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar
      variant={variant}
      collapsible={collapsible}
      className={cn(
        // Colado no cabeçalho (pt-0) e no painel (pr-0). Recolhido, a largura
        // acompanha o espaço reservado (ícone + 16px), sem os 2px extras do
        // shadcn, para o vão até o painel ser 8px nos dois estados.
        "top-(--header-height) h-[calc(100svh-var(--header-height))]! pt-0 pr-0 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]",
        className
      )}
      {...props}
    >
      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup
            key={group.label}
            className="group-data-[collapsible=icon]:py-0"
          >
            {/* Recolhido, o título some e um divisor aparece no lugar. */}
            <SidebarGroupLabel className="group-data-[collapsible=icon]:pointer-events-none">
              {group.label}
            </SidebarGroupLabel>
            <SidebarSeparator
              aria-hidden
              className="mx-0 mb-2 hidden w-full group-data-[collapsible=icon]:block"
            />
            <SidebarGroupContent>
              <SidebarMenu className="group-data-[collapsible=icon]:items-center">
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
      <SidebarFooter>
        <SidebarMenu className="group-data-[collapsible=icon]:items-center">
          {footerItems.map((item) => (
            <AppSidebarMenuItem
              key={item.title}
              item={item}
              soonLabel={soonLabel}
            />
          ))}
          <AppSidebarCollapse
            collapseLabel={collapseLabel}
            expandLabel={expandLabel}
          />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export { AppSidebar }
export type { AppSidebarProps, AppSidebarItem, AppSidebarGroup }
