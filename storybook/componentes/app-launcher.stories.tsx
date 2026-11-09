import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen, waitFor } from "storybook/test"
import { AppLauncher } from "@/registry/servfaz/app-launcher"
import { aplicacoes } from "./app-shell.dados"

const meta = {
  title: "Componentes/App Launcher",
  component: AppLauncher,
  parameters: { layout: "centered" },
  args: { apps: aplicacoes, label: "Aplicativos", title: "Seus aplicativos" },
  argTypes: { apps: { control: false } },
} satisfies Meta<typeof AppLauncher>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {}

// Testes de interação: rodam no Run tests e no Vitest. Ficam fora da página
// de docs (tag !autodocs) e aparecem só no Storybook local.

export const TesteAbrir: Story = {
  name: "Teste: abrir o hub",
  tags: ["!autodocs"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Aplicativos" }))
    await waitFor(() => expect(screen.getByText("Seus aplicativos")).toBeVisible())
    await expect(screen.getByRole("link", { name: "Conecta" })).toHaveAttribute("aria-current", "page")
  },
}
