import type { Meta, StoryObj } from "@storybook/react-vite"
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
