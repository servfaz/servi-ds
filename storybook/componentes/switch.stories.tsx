import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"

import { Label } from "@/registry/servfaz/label"
import { Switch } from "@/registry/servfaz/switch"

const meta = {
  title: "Componentes/Switch",
  component: Switch,
  args: { size: "default", disabled: false, "aria-label": "Ativo" },
  argTypes: { size: { control: "inline-radio", options: ["sm", "default"] } },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {}

export const Estados: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Switch aria-label="Desligado" />
      <Switch aria-label="Ligado" defaultChecked />
      <Switch aria-label="Desabilitado" disabled />
      <Switch aria-label="Ligado e desabilitado" disabled defaultChecked />
    </div>
  ),
}

export const Tamanhos: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Switch size="sm" aria-label="Pequeno" defaultChecked />
      <Switch aria-label="Default" defaultChecked />
    </div>
  ),
}

export const ComLabel: Story = {
  name: "Com label",
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="notificacoes" />
      <Label htmlFor="notificacoes">Receber notificações</Label>
    </div>
  ),
}

export const TesteAlternar: Story = {
  name: "Teste: ligar e desligar",
  tags: ["!autodocs"],
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("switch", { name: "Ativo" })
    await expect(toggle).not.toBeChecked()
    await userEvent.click(toggle)
    await expect(toggle).toBeChecked()
    await userEvent.keyboard(" ")
    await expect(toggle).not.toBeChecked()
  },
}
