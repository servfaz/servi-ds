import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, waitFor } from "storybook/test"
import { AppSidePanel } from "@/registry/servfaz/app-side-panel"
import { SidebarProvider } from "@/registry/servfaz/sidebar"
import { Vazio } from "./app-shell.dados"

type Args = { title: string; description: string }

function Exemplo({ title, description }: Args) {
  const [open, setOpen] = React.useState(true)
  return (
    <div className="[--header-height:0px] [--side-panel-width:calc(var(--spacing)*88)]">
      <SidebarProvider className="justify-end bg-(--color-background-muted) pt-2">
        <AppSidePanel open={open} onOpenChange={setOpen} title={title} description={description}>
          <Vazio texto="Conteúdo do painel." />
        </AppSidePanel>
      </SidebarProvider>
    </div>
  )
}

const meta = {
  title: "Componentes/App Side Panel",
  component: Exemplo,
  parameters: { layout: "fullscreen" },
  args: { title: "Notificações", description: "Avisos e pendências do sistema." },
} satisfies Meta<typeof Exemplo>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {}

// Testes de interação: rodam no Run tests e no Vitest. Ficam fora da página
// de docs (tag !autodocs) e aparecem só no Storybook local.

export const TesteFechar: Story = {
  name: "Teste: fechar pelo X e pelo Esc",
  tags: ["!autodocs"],
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole("complementary", { name: "Notificações" })).toBeVisible()
    await userEvent.click(canvas.getByRole("button", { name: "Fechar painel" }))
    await waitFor(() => expect(canvas.queryByRole("complementary")).toBeNull())
  },
}
