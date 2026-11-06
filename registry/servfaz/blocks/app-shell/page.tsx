"use client"

import type * as React from "react"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppHeader } from "@/components/app-header"
import { AppRail, AppSidebar } from "@/components/app-sidebar"

/*
 * Bloco App Shell - espelho do "App Shell" do Figma ([SDS] Components, página
 * App Shell). Estrutura das telas logadas: cabeçalho por cima (modelo do
 * GitLab), rail fixo com os módulos e sidebar aberta com as funcionalidades
 * do módulo (modelo do ClickUp), e o painel de conteúdo em background/default.
 * Este arquivo e os de components/ são copiados para o projeto e editados por
 * cada sistema (módulos, itens do menu, rotas, conta, busca, aplicações do hub).
 *
 * Medidas do layout (pendentes de variável): cabeçalho 56px, rail 56px,
 * sidebar 256px.
 */

export default function Page() {
  return (
    <div className="[--header-height:calc(var(--spacing)*14)] [--rail-width:calc(var(--spacing)*14)]">
      <SidebarProvider
        className="flex flex-col bg-(--color-background-muted)"
        style={{ "--sidebar-width": "16rem" } as React.CSSProperties}
      >
        <AppHeader
          brand={{ name: "Conecta", url: "#" }}
          notifications={4}
          user={{ name: "Nome Sobrenome" }}
          search={{ placeholder: "Busca" }}
        />
        <div className="flex flex-1">
          <AppRail />
          <AppSidebar />
          {/* min-w-0: a página nunca passa da largura da tela; quem rola é o conteúdo. */}
          <SidebarInset className="min-w-0 border-t border-(--color-border-default) peer-data-[state=collapsed]:rounded-tl-(--radius-xl) peer-data-[state=collapsed]:border-l">
            <div className="flex w-full min-w-0 flex-1 flex-col gap-4 p-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-(--radius-xl) bg-(--color-background-subtle)" />
                <div className="aspect-video rounded-(--radius-xl) bg-(--color-background-subtle)" />
                <div className="aspect-video rounded-(--radius-xl) bg-(--color-background-subtle)" />
              </div>
              <div className="min-h-[50vh] flex-1 rounded-(--radius-xl) bg-(--color-background-subtle)" />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
