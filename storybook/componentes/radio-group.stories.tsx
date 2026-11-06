import type { Meta, StoryObj } from "@storybook/react-vite"
import { RadioGroup, RadioGroupItem } from "@/registry/servfaz/radio-group"

const opcoes = [
  { value: "padrao", label: "Padrão", description: "Entrega em até 5 dias úteis." },
  { value: "expressa", label: "Expressa", description: "Entrega em até 2 dias úteis." },
  { value: "retirada", label: "Retirada", description: "Retire na unidade mais próxima." },
]

const meta = {
  title: "Componentes/Radio Group",
  component: RadioGroup,
  parameters: { layout: "padded" },
  args: {
    defaultValue: "padrao",
    disabled: false,
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      {opcoes.map((opcao) => (
        <RadioGroupItem key={opcao.value} {...opcao} />
      ))}
    </RadioGroup>
  ),
}

export const Caixa: Story = {
  render: (args) => (
    <RadioGroup {...args} className="w-80">
      {opcoes.map((opcao) => (
        <RadioGroupItem key={opcao.value} variant="box" {...opcao} />
      ))}
    </RadioGroup>
  ),
}

export const Estados: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroupItem value="padrao" label="Selecionado" />
      <RadioGroupItem value="a" label="Default" />
      <RadioGroupItem value="b" label="Desabilitado" disabled />
      <RadioGroupItem value="c" label="Inválido" aria-invalid />
    </RadioGroup>
  ),
}

export const SemLabel: Story = {
  name: "Sem label",
  render: (args) => (
    <RadioGroup {...args} className="flex">
      <RadioGroupItem value="padrao" aria-label="Opção 1" />
      <RadioGroupItem value="b" aria-label="Opção 2" />
    </RadioGroup>
  ),
}
