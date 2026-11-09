"use client"

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

import {
  AppShell,
  type AppLauncherApp,
  type AppModule,
} from "@/components/ui/app-shell"

/*
 * Exemplo de uso do AppShell, instalado como página em /app-shell.
 * Mostra a configuração completa com dados fictícios: troque pelos módulos,
 * menus, rotas e usuário do sistema. Para todas as telas logadas, use o
 * AppShell no layout (ex.: src/app/(sistema)/layout.tsx), com o `Link` do
 * Next.js em `linkComponent` e `usePathname()` em `currentPath`.
 * Este arquivo é do sistema: pode editar ou apagar. O AppShell em
 * components/ui é do Servi DS e não deve ser editado.
 */

const modulos: AppModule[][] = [
  [
    {
      title: "Inventário",
      icon: HouseIcon,
      groups: [
        {
          label: "Dia a dia",
          items: [
            { title: "Início", url: "/app-shell", icon: HouseIcon },
            { title: "Clientes", url: "/app-shell/clientes", icon: UsersIcon },
            { title: "Ordens de serviço", url: "/app-shell/ordens", icon: ClipboardTextIcon, badge: 3 },
            { title: "Contratos", url: "/app-shell/contratos", icon: FileTextIcon },
            { title: "Relatórios", url: "/app-shell/relatorios", icon: ChartBarIcon },
          ],
        },
        {
          label: "Cadastros",
          items: [
            { title: "Serviços", url: "/app-shell/servicos", icon: TagIcon },
            { title: "Equipe", url: "/app-shell/equipe", icon: UsersThreeIcon, disabled: true },
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
          items: [{ title: "Pedidos de compra", url: "/app-shell/compras", icon: ShoppingCartIcon }],
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

const rodapeDoRail: AppModule[] = [{ title: "Configurações", icon: GearIcon }]

const aplicacoes: AppLauncherApp[] = [
  { name: "Conecta", url: "#", icon: ChatsCircleIcon, current: true },
  { name: "Logística", url: "#", icon: LifebuoyIcon },
  { name: "Faturamento", url: "#", icon: CurrencyCircleDollarIcon },
  { name: "Dossiê", url: "#", icon: FolderIcon },
  { name: "Cotação", url: "#", icon: ChartLineIcon },
]

function Vazio({ texto }: { texto: string }) {
  return (
    <div className="flex flex-1 items-center justify-center rounded-(--radius-lg) border border-dashed border-(--color-border-default) p-4 text-center typo-sans-sm-regular text-(--color-foreground-muted)">
      {texto}
    </div>
  )
}

export default function AppShellExemplo() {
  return (
    <AppShell
      brand={{ name: "Conecta", url: "/app-shell" }}
      user={{ name: "Nome Sobrenome" }}
      modules={modulos}
      railFooter={rodapeDoRail}
      currentPath="/app-shell"
      apps={aplicacoes}
      search={{ placeholder: "Busca" }}
      notifications={4}
      aiPanel={{ description: "Converse com a assistente de IA.", content: <Vazio texto="Conteúdo do chat com a IA." /> }}
      notificationsPanel={{ description: "Avisos e pendências do sistema.", content: <Vazio texto="Lista de notificações." /> }}
    >
      <div className="flex w-full min-w-0 flex-1 flex-col gap-4 p-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-(--radius-xl) bg-(--color-background-subtle)" />
          <div className="aspect-video rounded-(--radius-xl) bg-(--color-background-subtle)" />
          <div className="aspect-video rounded-(--radius-xl) bg-(--color-background-subtle)" />
        </div>
        <div className="min-h-[50vh] flex-1 rounded-(--radius-xl) bg-(--color-background-subtle)" />
      </div>
    </AppShell>
  )
}
