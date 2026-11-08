import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { Checkbox } from "@/registry/servfaz/checkbox"

const meta = {
  title: "Componentes/Checkbox",
  component: Checkbox,
  parameters: { layout: "padded" },
  args: {
    label: "Aceito os termos e condições",
    description: "Você pode mudar isso depois nas configurações.",
    variant: "default",
    disabled: false,
    defaultChecked: false,
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "box"] },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {}

const estados = [
  { nome: "default", props: {} },
  { nome: "checked", props: { defaultChecked: true } },
  { nome: "disabled", props: { disabled: true } },
  { nome: "disabled checked", props: { disabled: true, defaultChecked: true } },
  { nome: "invalid", props: { "aria-invalid": true } },
  { nome: "invalid checked", props: { "aria-invalid": true, defaultChecked: true } },
] as const

export const Estados: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {estados.map(({ nome, props }) => (
        <Checkbox key={nome} {...args} {...props} />
      ))}
    </div>
  ),
}

export const Caixa: Story = {
  args: { variant: "box" },
  render: (args) => (
    <div className="flex w-80 flex-col gap-3">
      {estados.slice(0, 3).map(({ nome, props }) => (
        <Checkbox key={nome} {...args} {...props} />
      ))}
    </div>
  ),
}

export const SoControle: Story = {
  name: "Só o controle",
  args: { label: undefined, description: undefined, "aria-label": "Selecionar" },
}

// Testes de interação: rodam no Run tests e no Vitest. Ficam fora da página
// de docs (tag !autodocs) e aparecem só no Storybook local.

export const TesteMarcar: Story = {
  name: "Teste: marcar e desmarcar",
  tags: ["!autodocs"],
  play: async ({ canvas, userEvent }) => {
    const checkbox = canvas.getByRole("checkbox", { name: "Aceito os termos e condições" })
    await expect(checkbox).not.toBeChecked()
    await expect(checkbox).toHaveAccessibleDescription(
      "Você pode mudar isso depois nas configurações."
    )
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
    // Clicar no label também alterna.
    await userEvent.click(canvas.getByText("Aceito os termos e condições"))
    await expect(checkbox).not.toBeChecked()
    // Espaço alterna pelo teclado.
    await userEvent.keyboard(" ")
    await expect(checkbox).toBeChecked()
  },
}

export const TesteDesabilitado: Story = {
  name: "Teste: desabilitado não marca",
  tags: ["!autodocs"],
  args: { disabled: true },
  play: async ({ canvas }) => {
    const checkbox = canvas.getByRole("checkbox", { name: "Aceito os termos e condições" })
    await expect(checkbox).toBeDisabled()
    await expect(checkbox).not.toBeChecked()
  },
}
