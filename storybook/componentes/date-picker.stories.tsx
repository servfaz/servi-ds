import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"

import { DatePicker, DateRangePicker } from "@/registry/servfaz/date-picker"

const meta = {
  title: "Componentes/Date Picker",
  component: DatePicker,
  args: { placeholder: "Escolha uma data", disabled: false, "aria-invalid": false },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {}

export const ComValor: Story = {
  name: "Com data escolhida",
  args: { value: new Date(2026, 10, 12) },
}

export const Periodo: Story = {
  name: "Período",
  render: () => <DateRangePicker />,
}

export const TesteEscolher: Story = {
  name: "Teste: escolher uma data",
  tags: ["!autodocs"],
  args: { value: undefined },
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Escolha uma data" }))
    const body = within(canvasElement.ownerDocument.body)
    const grid = await body.findByRole("grid")
    const dias = within(grid).getAllByRole("button")
    await userEvent.click(dias[10])
    await expect(canvas.getByRole("button")).toHaveTextContent(/\d{2}\/\d{2}\/\d{4}/)
  },
}
