"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { SidebarInset, SidebarProvider } from "./sidebar"
import { AppHeader, type AppHeaderBrand, type AppHeaderUser } from "./app-header"
import type { AppLauncherApp } from "./app-launcher"
import { AppSidePanel } from "./app-side-panel"
import {
  AppRail,
  AppSidebar,
  isPathActive,
  type AppLinkComponent,
  type AppModule,
} from "./app-sidebar"
import type { SearchBarProps } from "./search-bar"

/*
 * AppShell - estrutura das telas logadas, espelho do "App Shell" do Figma
 * ([SDS] Components, página App Shell): cabeçalho por cima (modelo do
 * GitLab), rail fixo com os módulos e sidebar aberta com as funcionalidades
 * do módulo (modelo do ClickUp), o painel de conteúdo em background/default
 * e o bloco da direita, que abre pelo chat com a IA ou pelas notificações.
 *
 * O sistema usa o AppShell no layout das telas logadas e passa por props o
 * que é dele (marca, usuário, módulos, menus, rotas, conteúdo dos painéis).
 * Não edita este arquivo: assim cada atualização do Servi DS chega inteira.
 *
 * Medidas do layout (pendentes de variável): cabeçalho 56px, rail 56px,
 * sidebar 256px, bloco da direita 352px.
 */

type AppShellPanelName = "ai" | "notifications"

type AppShellPanel = {
  title?: string
  /** Texto para leitor de tela. */
  description?: string
  /** Conteúdo do painel, como o chat ou a lista de notificações. */
  content?: React.ReactNode
}

type AppShellProps = {
  children?: React.ReactNode
  className?: string
  brand: AppHeaderBrand
  user: AppHeaderUser
  /** Módulos do sistema no rail, em grupos separados por divisor. */
  modules: AppModule[][]
  /** Módulos no pé do rail, como Configurações. */
  railFooter?: AppModule[]
  /** Título do módulo ativo. Sem a prop, o AppShell controla a troca de módulo. */
  activeModule?: string
  onModuleSelect?: (module: AppModule) => void
  /** Rota atual (ex.: `usePathname()` do Next.js): marca o item e o módulo ativos. */
  currentPath?: string
  /** Componente de link, como o `Link` do Next.js. Padrão: `a`. */
  linkComponent?: AppLinkComponent
  /** Outros sistemas no hub de aplicações. Sem a prop, o hub não aparece. */
  apps?: AppLauncherApp[]
  /** Props repassadas ao Search Bar do cabeçalho. */
  search?: SearchBarProps
  showSearch?: boolean
  onMobileSearchClick?: React.MouseEventHandler<HTMLButtonElement>
  /** Número de notificações não lidas. */
  notifications?: number
  /** Painel do chat com a IA. `false` esconde o botão. */
  aiPanel?: AppShellPanel | false
  /** Painel de notificações. */
  notificationsPanel?: AppShellPanel
  /** Painel aberto (controlado). */
  panel?: AppShellPanelName | null
  /** Painel aberto ao carregar (não controlado). */
  defaultPanel?: AppShellPanelName | null
  onPanelChange?: (panel: AppShellPanelName | null) => void
  onAccountClick?: React.MouseEventHandler<HTMLButtonElement>
  /** Texto dos itens indisponíveis na sidebar. */
  soonLabel?: string
}

const defaultPanels: Record<AppShellPanelName, Required<Pick<AppShellPanel, "title">>> = {
  ai: { title: "Chat com GAIA" },
  notifications: { title: "Notificações" },
}

/** Módulo que contém a rota atual; sem rota, o primeiro marcado ou o primeiro da lista. */
function findActiveModule(modules: AppModule[], currentPath?: string) {
  return (
    modules.find((module) =>
      module.groups?.some((group) => group.items.some((item) => isPathActive(item.url, currentPath)))
    ) ??
    modules.find((module) => module.isActive) ??
    modules.find((module) => module.groups?.length) ??
    modules[0]
  )
}

function AppShell({
  children,
  className,
  brand,
  user,
  modules,
  railFooter = [],
  activeModule,
  onModuleSelect,
  currentPath,
  linkComponent,
  apps,
  search,
  showSearch,
  onMobileSearchClick,
  notifications = 0,
  aiPanel = {},
  notificationsPanel = {},
  panel: panelProp,
  defaultPanel = null,
  onPanelChange,
  onAccountClick,
  soonLabel,
}: AppShellProps) {
  const allModules = React.useMemo(() => [...modules.flat(), ...railFooter], [modules, railFooter])

  // Módulo selecionado: controlado por `activeModule` ou pelo próprio AppShell.
  const [selectedTitle, setSelectedTitle] = React.useState<string | undefined>()
  const routeModule = findActiveModule(allModules, currentPath)
  const activeTitle = activeModule ?? selectedTitle ?? routeModule?.title
  const current = allModules.find((module) => module.title === activeTitle) ?? routeModule

  // A rota mudou: a sidebar volta a mostrar o módulo da rota.
  React.useEffect(() => {
    setSelectedTitle(undefined)
  }, [currentPath])

  function selectModule(module: AppModule) {
    if (module.disabled) return
    if (activeModule === undefined) setSelectedTitle(module.title)
    onModuleSelect?.(module)
  }

  const markActive = (module: AppModule): AppModule => ({
    ...module,
    isActive: module.title === current?.title,
  })

  // Painel da direita: controlado por `panel` ou pelo próprio AppShell.
  const [panelState, setPanelState] = React.useState<AppShellPanelName | null>(defaultPanel)
  const panel = panelProp !== undefined ? panelProp : panelState
  const setPanel = React.useCallback(
    (next: AppShellPanelName | null) => {
      if (panelProp === undefined) setPanelState(next)
      onPanelChange?.(next)
    },
    [panelProp, onPanelChange]
  )
  // O mesmo botão abre e fecha; o outro botão troca o conteúdo do painel.
  const togglePanel = (next: AppShellPanelName) => setPanel(panel === next ? null : next)
  const closePanel = React.useCallback(
    (open: boolean) => {
      if (!open) setPanel(null)
    },
    [setPanel]
  )

  const panels: Record<AppShellPanelName, AppShellPanel> = {
    ai: { ...defaultPanels.ai, ...(aiPanel || {}) },
    notifications: { ...defaultPanels.notifications, ...notificationsPanel },
  }
  const openPanel = panel && !(panel === "ai" && aiPanel === false) ? panels[panel] : null

  return (
    <div
      data-slot="app-shell"
      className={cn(
        "[--header-height:calc(var(--spacing)*14)] [--rail-width:calc(var(--spacing)*14)] [--side-panel-width:calc(var(--spacing)*88)]",
        className
      )}
    >
      <SidebarProvider
        className="flex flex-col bg-(--color-background-muted)"
        style={{ "--sidebar-width": "16rem" } as React.CSSProperties}
      >
        <AppHeader
          brand={brand}
          user={user}
          linkComponent={linkComponent}
          apps={apps}
          search={search}
          showSearch={showSearch}
          onMobileSearchClick={onMobileSearchClick}
          notifications={notifications}
          showAi={aiPanel !== false}
          aiLabel={panels.ai.title}
          aiActive={panel === "ai"}
          onAiClick={() => togglePanel("ai")}
          notificationsLabel={panels.notifications.title}
          notificationsActive={panel === "notifications"}
          onNotificationsClick={() => togglePanel("notifications")}
          onAccountClick={onAccountClick}
        />
        <div className="flex flex-1">
          <AppRail
            modules={modules.map((group) => group.map(markActive))}
            footer={railFooter.map(markActive)}
            onModuleSelect={selectModule}
          />
          <AppSidebar
            title={current?.title ?? ""}
            groups={current?.groups ?? []}
            currentPath={currentPath}
            linkComponent={linkComponent}
            mobileModules={allModules.map(markActive)}
            onModuleSelect={selectModule}
            soonLabel={soonLabel}
          />
          {/* min-w-0: a página nunca passa da largura da tela; quem rola é o conteúdo. */}
          <SidebarInset
            className={cn(
              "min-w-0 border-t border-(--color-border-default) peer-data-[state=collapsed]:rounded-tl-(--radius-xl) peer-data-[state=collapsed]:border-l",
              // Com o bloco da direita aberto, o conteúdo fecha a borda e arredonda o canto.
              openPanel && "md:rounded-tr-(--radius-xl) md:border-r"
            )}
          >
            {children}
          </SidebarInset>
          <AppSidePanel
            open={openPanel !== null}
            onOpenChange={closePanel}
            title={openPanel?.title ?? ""}
            description={openPanel?.description}
          >
            {openPanel?.content}
          </AppSidePanel>
        </div>
      </SidebarProvider>
    </div>
  )
}

export { AppShell }
export type { AppShellProps, AppShellPanel, AppShellPanelName }
export type {
  AppModule,
  AppSidebarGroup,
  AppSidebarItem,
  AppLinkComponent,
} from "./app-sidebar"
export type { AppHeaderBrand, AppHeaderUser } from "./app-header"
export type { AppLauncherApp } from "./app-launcher"
