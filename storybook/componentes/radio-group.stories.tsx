import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, waitFor } from "storybook/test"
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

// Testes de interação: rodam no Run tests e no Vitest. Ficam fora da página
// de docs (tag !autodocs) e aparecem só no Storybook local.

export const TesteEscolha: Story = {
  name: "Teste: escolha única",
  tags: ["!autodocs"],
  render: Playground.render,
  play: async ({ canvas, userEvent }) => {
    const padrao = canvas.getByRole("radio", { name: "Padrão" })
    const expressa = canvas.getByRole("radio", { name: "Expressa" })
    const retirada = canvas.getByRole("radio", { name: "Retirada" })
    await expect(padrao).toBeChecked()
    await userEvent.click(expressa)
    await expect(expressa).toBeChecked()
    await expect(padrao).not.toBeChecked()
    // Seta para baixo passa para a próxima opção. A tecla fica pressionada até
    // a troca, como numa pessoa digitando: o Radix só marca enquanto a seta
    // está apertada.
    await expect(expressa).toHaveFocus()
    await userEvent.keyboard("{ArrowDown>}")
    await waitFor(() => expect(retirada).toBeChecked())
    await userEvent.keyboard("{/ArrowDown}")
    await expect(expressa).not.toBeChecked()
  },
}

export const TesteDesabilitado: Story = {
  name: "Teste: opção desabilitada",
  tags: ["!autodocs"],
  render: Estados.render,
  play: async ({ canvas }) => {
    const desabilitado = canvas.getByRole("radio", { name: "Desabilitado" })
    await expect(desabilitado).toBeDisabled()
    await expect(desabilitado).not.toBeChecked()
    await expect(canvas.getByRole("radio", { name: "Selecionado" })).toBeChecked()
  },
}
