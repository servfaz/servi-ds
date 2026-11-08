"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppHeader } from "@/components/app-header"
import { AppRail, AppSidebar } from "@/components/app-sidebar"
import { AppSidePanel } from "@/components/app-side-panel"

/*
 * Bloco App Shell - espelho do "App Shell" do Figma ([SDS] Components, página
 * App Shell). Estrutura das telas logadas: cabeçalho por cima (modelo do
 * GitLab), rail fixo com os módulos e sidebar aberta com as funcionalidades
 * do módulo (modelo do ClickUp), o painel de conteúdo em background/default
 * e o bloco da direita, que abre pelo chat com a IA ou pelas notificações.
 * Este arquivo e os de components/ são copiados para o projeto e editados por
 * cada sistema (módulos, itens do menu, rotas, conta, busca, aplicações do
 * hub, conteúdo dos painéis).
 *
 * Medidas do layout (pendentes de variável): cabeçalho 56px, rail 56px,
 * sidebar 256px, bloco da direita 352px.
 */

type AppPanel = "ai" | "notifications"

const panels: Record<AppPanel, { title: string; description: string }> = {
  ai: { title: "Chat com GAIA", description: "Converse com a assistente de IA." },
  notifications: { title: "Notificações", description: "Avisos e pendências do sistema." },
}

type PageProps = {
  /** Painel aberto ao carregar a tela. */
  defaultPanel?: AppPanel | null
}

export default function Page({ defaultPanel = null }: PageProps) {
  const [panel, setPanel] = React.useState<AppPanel | null>(defaultPanel)
  // O mesmo botão abre e fecha; o outro botão troca o conteúdo do painel.
  const togglePanel = (next: AppPanel) => setPanel((current) => (current === next ? null : next))
  const closePanel = React.useCallback((open: boolean) => {
    if (!open) setPanel(null)
  }, [])

  return (
    <div className="[--header-height:calc(var(--spacing)*14)] [--rail-width:calc(var(--spacing)*14)] [--side-panel-width:calc(var(--spacing)*88)]">
      <SidebarProvider
        className="flex flex-col bg-(--color-background-muted)"
        style={{ "--sidebar-width": "16rem" } as React.CSSProperties}
      >
        <AppHeader
          brand={{ name: "Conecta", url: "#" }}
          notifications={4}
          user={{ name: "Nome Sobrenome" }}
          search={{ placeholder: "Busca" }}
          aiActive={panel === "ai"}
          onAiClick={() => togglePanel("ai")}
          notificationsActive={panel === "notifications"}
          onNotificationsClick={() => togglePanel("notifications")}
        />
        <div className="flex flex-1">
          <AppRail />
          <AppSidebar />
          {/* min-w-0: a página nunca passa da largura da tela; quem rola é o conteúdo. */}
          <SidebarInset
            className={cn(
              "min-w-0 border-t border-(--color-border-default) peer-data-[state=collapsed]:rounded-tl-(--radius-xl) peer-data-[state=collapsed]:border-l",
              // Com o bloco da direita aberto, o conteúdo fecha a borda e arredonda o canto.
              panel && "md:rounded-tr-(--radius-xl) md:border-r"
            )}
          >
            <div className="flex w-full min-w-0 flex-1 flex-col gap-4 p-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-(--radius-xl) bg-(--color-background-subtle)" />
                <div className="aspect-video rounded-(--radius-xl) bg-(--color-background-subtle)" />
                <div className="aspect-video rounded-(--radius-xl) bg-(--color-background-subtle)" />
              </div>
              <div className="min-h-[50vh] flex-1 rounded-(--radius-xl) bg-(--color-background-subtle)" />
            </div>
          </SidebarInset>
          <AppSidePanel
            open={panel !== null}
            onOpenChange={closePanel}
            title={panel ? panels[panel].title : ""}
            description={panel ? panels[panel].description : undefined}
          >
            {/* Conteúdo de exemplo: cada sistema coloca aqui o chat e a lista de notificações. */}
            <div className="flex flex-1 items-center justify-center rounded-(--radius-lg) border border-dashed border-(--color-border-default) p-4 text-center typo-sans-sm-regular text-(--color-foreground-muted)">
              {panel ? panels[panel].description : null}
            </div>
          </AppSidePanel>
        </div>
      </SidebarProvider>
    </div>
  )
}
