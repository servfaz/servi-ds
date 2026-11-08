import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { StarIcon, TextBIcon, TextItalicIcon } from "@phosphor-icons/react"

import { Toggle } from "@/registry/servfaz/toggle"

const meta = {
  title: "Componentes/Toggle",
  component: Toggle,
  args: { variant: "default", size: "default", disabled: false, "aria-label": "Negrito" },
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "outline"] },
    size: { control: "inline-radio", options: ["sm", "default", "lg"] },
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {
  render: (args) => (
    <Toggle {...args}>
      <TextBIcon />
    </Toggle>
  ),
}

export const Variantes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle aria-label="Itálico">
        <TextItalicIcon />
      </Toggle>
      <Toggle variant="outline" aria-label="Itálico">
        <TextItalicIcon />
      </Toggle>
      <Toggle variant="outline" defaultPressed>
        <StarIcon />
        Favorito
      </Toggle>
    </div>
  ),
}

export const TesteAlternar: Story = {
  name: "Teste: ligar e desligar",
  tags: ["!autodocs"],
  render: Playground.render,
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: "Negrito" })
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-pressed", "true")
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-pressed", "false")
  },
}
