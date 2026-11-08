import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { TextAlignCenterIcon, TextAlignLeftIcon, TextAlignRightIcon, TextBIcon, TextItalicIcon, TextUnderlineIcon } from "@phosphor-icons/react"

import { ToggleGroup, ToggleGroupItem } from "@/registry/servfaz/toggle-group"

const meta = {
  title: "Componentes/Toggle Group",
  component: ToggleGroup,
  args: { type: "single", variant: "outline", size: "default", defaultValue: "esquerda" },
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "outline"] },
    size: { control: "inline-radio", options: ["sm", "default", "lg"] },
  },
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

/** Escolha única (alinhamento). */
export const Playground: Story = {
  render: (args) => (
    <ToggleGroup {...args} aria-label="Alinhamento">
      <ToggleGroupItem value="esquerda" aria-label="À esquerda">
        <TextAlignLeftIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="centro" aria-label="No centro">
        <TextAlignCenterIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="direita" aria-label="À direita">
        <TextAlignRightIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Multipla: Story = {
  name: "Escolha múltipla",
  render: () => (
    <ToggleGroup type="multiple" aria-label="Formatação">
      <ToggleGroupItem value="negrito" aria-label="Negrito">
        <TextBIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italico" aria-label="Itálico">
        <TextItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="sublinhado" aria-label="Sublinhado">
        <TextUnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const TesteEscolher: Story = {
  name: "Teste: escolher outro",
  tags: ["!autodocs"],
  render: Playground.render,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("radio", { name: "No centro" }))
    await expect(canvas.getByRole("radio", { name: "No centro" })).toHaveAttribute("aria-checked", "true")
    await expect(canvas.getByRole("radio", { name: "À esquerda" })).toHaveAttribute("aria-checked", "false")
  },
}
