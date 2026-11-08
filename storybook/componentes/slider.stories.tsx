import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"

import { Slider } from "@/registry/servfaz/slider"

const meta = {
  title: "Componentes/Slider",
  component: Slider,
  args: { defaultValue: [40], max: 100, step: 1, disabled: false, "aria-label": "Volume" },
  decorators: [(Story) => <div className="w-64"><Story /></div>],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {}

export const Intervalo: Story = {
  args: { defaultValue: [20, 70], "aria-label": "Faixa de preço" },
}

export const Desabilitado: Story = {
  args: { disabled: true },
}

export const TesteTeclado: Story = {
  name: "Teste: mudar pelo teclado",
  tags: ["!autodocs"],
  play: async ({ canvas, userEvent }) => {
    const thumb = canvas.getByRole("slider")
    await userEvent.click(thumb)
    await userEvent.keyboard("{ArrowRight}")
    await expect(thumb).toHaveAttribute("aria-valuenow", "41")
  },
}
