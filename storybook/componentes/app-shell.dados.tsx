import {
  ChartBarIcon,
  ChartLineIcon,
  ChatsCircleIcon,
  ClipboardTextIcon,
  CurrencyCircleDollarIcon,
  FileTextIcon,
  FolderIcon,
  GearIcon,
  HouseIcon,
  LifebuoyIcon,
  PackageIcon,
  ShoppingCartIcon,
  TagIcon,
  TruckIcon,
  UsersIcon,
  UsersThreeIcon,
  WrenchIcon,
} from "@phosphor-icons/react"
import type { AppLauncherApp } from "@/registry/servfaz/app-launcher"
import type { AppModule } from "@/registry/servfaz/app-sidebar"

/*
 * Dados fictícios das stories do App Shell e das partes dele. Ficam só no
 * Storybook: os componentes publicados não trazem dado de exemplo.
 */

export const modulos: AppModule[][] = [
  [
    {
      title: "Inventário",
      icon: HouseIcon,
      groups: [
        {
          label: "Dia a dia",
          items: [
            { title: "Início", url: "/inicio", icon: HouseIcon },
            { title: "Clientes", url: "/clientes", icon: UsersIcon },
            { title: "Ordens de serviço", url: "/ordens", icon: ClipboardTextIcon, badge: 3 },
            { title: "Contratos", url: "/contratos", icon: FileTextIcon },
            { title: "Relatórios", url: "/relatorios", icon: ChartBarIcon },
          ],
        },
        {
          label: "Cadastros",
          items: [
            { title: "Serviços", url: "/servicos", icon: TagIcon },
            { title: "Equipe", url: "/equipe", icon: UsersThreeIcon, disabled: true },
          ],
        },
      ],
    },
    {
      title: "Compras",
      icon: ShoppingCartIcon,
      groups: [
        {
          label: "Pedidos",
          items: [
            { title: "Pedidos de compra", url: "/compras", icon: ShoppingCartIcon },
            { title: "Fornecedores", url: "/fornecedores", icon: UsersThreeIcon },
          ],
        },
      ],
    },
    { title: "Frota", icon: TruckIcon },
    { title: "Estoque", icon: PackageIcon },
  ],
  [
    { title: "Manutenção", icon: WrenchIcon },
    { title: "Pessoas", icon: UsersThreeIcon, disabled: true },
  ],
]

export const rodapeDoRail: AppModule[] = [{ title: "Configurações", icon: GearIcon }]

export const aplicacoes: AppLauncherApp[] = [
  { name: "Conecta", url: "#", icon: ChatsCircleIcon, current: true },
  { name: "Logística", url: "#", icon: LifebuoyIcon },
  { name: "Faturamento", url: "#", icon: CurrencyCircleDollarIcon },
  { name: "Dossiê", url: "#", icon: FolderIcon },
  { name: "Cotação", url: "#", icon: ChartLineIcon },
]

export function Vazio({ texto }: { texto: string }) {
  return (
    <div className="flex flex-1 items-center justify-center rounded-(--radius-lg) border border-dashed border-(--color-border-default) p-4 text-center typo-sans-sm-regular text-(--color-foreground-muted)">
      {texto}
    </div>
  )
}

export function ConteudoDeExemplo() {
  return (
    <div className="flex w-full min-w-0 flex-1 flex-col gap-4 p-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-(--radius-xl) bg-(--color-background-subtle)" />
        <div className="aspect-video rounded-(--radius-xl) bg-(--color-background-subtle)" />
        <div className="aspect-video rounded-(--radius-xl) bg-(--color-background-subtle)" />
      </div>
      <div className="min-h-[50vh] flex-1 rounded-(--radius-xl) bg-(--color-background-subtle)" />
    </div>
  )
}
