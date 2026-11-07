import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { CaretDownIcon, MagnifyingGlassIcon } from "@phosphor-icons/react"
import { Input } from "@/registry/servfaz/input"

const meta = {
  title: "Componentes/Input",
  component: Input,
  parameters: { layout: "padded" },
  args: {
    variant: "default",
    status: "default",
    placeholder: "Placeholder",
    label: "Label",
    optional: true,
    disabled: false,
    leftIcon: <MagnifyingGlassIcon />,
    rightIcon: <CaretDownIcon />,
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "floating"] },
    status: {
      control: "inline-radio",
      options: ["default", "invalid", "success"],
    },
    leftIcon: { control: false },
    rightIcon: { control: false },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {}

const estados = [
  { nome: "default", props: {} },
  { nome: "filled", props: { defaultValue: "Valor" } },
  { nome: "disabled", props: { disabled: true } },
  { nome: "invalid", props: { status: "invalid", defaultValue: "Valor" } },
  { nome: "success", props: { status: "success", defaultValue: "Valor" } },
] as const

export const Estados: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {estados.map(({ nome, props }) => (
        <Input key={nome} {...args} {...props} aria-label={nome} />
      ))}
    </div>
  ),
}

export const Flutuante: Story = {
  args: { variant: "floating" },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {estados.map(({ nome, props }) => (
        <Input key={nome} {...args} {...props} />
      ))}
    </div>
  ),
}

export const SemIcones: Story = {
  name: "Sem ícones",
  args: { leftIcon: undefined, rightIcon: undefined },
}

// Testes de interação: rodam no Run tests e no Vitest. Ficam fora da página
// de docs (tag !autodocs) e aparecem só no Storybook local.

export const TesteDigitar: Story = {
  name: "Teste: digitar",
  tags: ["!autodocs"],
  play: async ({ canvas, userEvent }) => {
    const campo = canvas.getByRole("textbox")
    await userEvent.type(campo, "Pedido 123")
    await expect(campo).toHaveValue("Pedido 123")
    await userEvent.clear(campo)
    await expect(campo).toHaveValue("")
  },
}

export const TesteInvalido: Story = {
  name: "Teste: estado inválido",
  tags: ["!autodocs"],
  args: { status: "invalid" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("textbox")).toHaveAttribute("aria-invalid", "true")
  },
}

export const TesteDesabilitado: Story = {
  name: "Teste: desabilitado",
  tags: ["!autodocs"],
  args: { disabled: true },
  play: async ({ canvas }) => {
    const campo = canvas.getByRole("textbox")
    await expect(campo).toBeDisabled()
    await expect(campo).toHaveValue("")
  },
}
