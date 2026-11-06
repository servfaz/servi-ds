import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  ChartBarIcon,
  FileTextIcon,
  GearIcon,
  HouseIcon,
  UsersIcon,
} from "@phosphor-icons/react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/registry/servfaz/sidebar"

const itens = [
  { title: "Início", icon: HouseIcon, active: true },
  { title: "Clientes", icon: UsersIcon },
  { title: "Contratos", icon: FileTextIcon, badge: 3 },
  { title: "Financeiro", icon: ChartBarIcon },
]

type Args = {
  variant: "sidebar" | "floating" | "inset"
  collapsible: "offcanvas" | "icon" | "none"
  side: "left" | "right"
  defaultOpen: boolean
}

function Exemplo({ variant, collapsible, side, defaultOpen }: Args) {
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <Sidebar variant={variant} collapsible={collapsible} side={side}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-(--radius-lg) bg-(--color-brand-filled) text-xs font-bold text-(--color-brand-foreground-on-filled)">
                  NS
                </span>
                <span>Nome do sistema</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Dia a dia</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {itens.map(({ title, icon: Icone, active, badge }) => (
                  <SidebarMenuItem key={title}>
                    <SidebarMenuButton isActive={active} tooltip={title}>
                      <Icone weight={active ? "fill" : "regular"} />
                      <span>{title}</span>
                    </SidebarMenuButton>
                    {badge ? <SidebarMenuBadge>{badge}</SidebarMenuBadge> : null}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Configurações">
                <GearIcon />
                <span>Configurações</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center px-2">
          <SidebarTrigger />
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}

const meta = {
  title: "Componentes/Sidebar",
  component: Exemplo,
  parameters: { layout: "fullscreen" },
  args: {
    variant: "inset",
    collapsible: "icon",
    side: "left",
    defaultOpen: true,
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["sidebar", "floating", "inset"],
    },
    collapsible: {
      control: "inline-radio",
      options: ["offcanvas", "icon", "none"],
    },
    side: { control: "inline-radio", options: ["left", "right"] },
  },
} satisfies Meta<typeof Exemplo>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {}

export const Variantes: Story = {
  args: { variant: "sidebar", collapsible: "offcanvas" },
}

export const Recolhida: Story = {
  args: { defaultOpen: false },
}

export const Carregando: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar collapsible="none" className="h-svh">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {Array.from({ length: 5 }).map((_, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  ),
}
