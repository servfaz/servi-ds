import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { AppRail, AppSidebar } from "@/registry/servfaz/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/registry/servfaz/sidebar"
import { modulos, rodapeDoRail } from "./app-shell.dados"

type Args = { currentPath: string; soonLabel: string }

const modulo = modulos[0][0]

function Exemplo({ currentPath, soonLabel }: Args) {
  return (
    <div className="[--header-height:0px] [--rail-width:calc(var(--spacing)*14)]">
      <SidebarProvider
        className="bg-(--color-background-muted)"
        style={{ "--sidebar-width": "16rem" } as React.CSSProperties}
      >
        <AppRail modules={modulos.map((g) => g.map((m) => ({ ...m, isActive: m === modulo })))} footer={rodapeDoRail} />
        <AppSidebar
          title={modulo.title}
          groups={modulo.groups ?? []}
          currentPath={currentPath}
          soonLabel={soonLabel}
        />
        <SidebarInset className="border-t border-(--color-border-default)" />
      </SidebarProvider>
    </div>
  )
}

const meta = {
  title: "Componentes/App Sidebar",
  component: Exemplo,
  parameters: { layout: "fullscreen" },
  args: { currentPath: "/inicio", soonLabel: "Em breve" },
} satisfies Meta<typeof Exemplo>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {}

/** Item ativo numa rota abaixo da dele (/clientes/42). */
export const RotaFilha: Story = { name: "Rota filha", args: { currentPath: "/clientes/42" } }

// Testes de interação: rodam no Run tests e no Vitest. Ficam fora da página
// de docs (tag !autodocs) e aparecem só no Storybook local.

export const TesteItemIndisponivel: Story = {
  name: "Teste: item indisponível sem link",
  tags: ["!autodocs"],
  play: async ({ canvas }) => {
    const equipe = canvas.getByText("Equipe").closest("a")
    await expect(equipe).not.toHaveAttribute("href")
    await expect(equipe).toHaveAttribute("aria-disabled")
    await expect(canvas.getByText("Em breve")).toBeVisible()
  },
}
