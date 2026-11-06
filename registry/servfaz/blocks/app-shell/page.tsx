"use client"

import type * as React from "react"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"

/*
 * Bloco App Shell - estrutura das telas logadas, no mesmo padrão do bloco
 * sidebar-16 do shadcn (cabeçalho fixo por cima da Sidebar). Referência de
 * layout: GitLab (logo e busca no cabeçalho, menu à esquerda, painel com
 * cantos arredondados). Este arquivo e os de components/ são copiados para o
 * projeto e editados por cada sistema (itens do menu, rotas, conta, busca,
 * lista de aplicações do hub).
 */

export default function Page() {
  return (
    <div className="[--header-height:calc(var(--spacing)*14)]">
      <SidebarProvider
        className="flex flex-col"
        // Recolhida: coluna de 40px, item de 32px com 8px até o painel.
        style={{ "--sidebar-width-icon": "2.5rem" } as React.CSSProperties}
      >
        <AppHeader
          notifications={4}
          user={{ name: "Nome Sobrenome" }}
          search={{
            placeholders: [
              "Tente 'contratos vencendo este mês'",
              "Tente 'clientes sem atendimento'",
              "Tente 'ordens de serviço abertas'",
            ],
          }}
        />
        <div className="flex flex-1">
          <AppSidebar />
          {/* min-w-0: a página nunca passa da largura da tela; quem rola é o conteúdo.
              mt-0 e ml-0: o painel começa colado no cabeçalho e no menu, como no GitLab. */}
          <SidebarInset className="min-w-0 md:peer-data-[variant=inset]:mt-0 md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0">
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
