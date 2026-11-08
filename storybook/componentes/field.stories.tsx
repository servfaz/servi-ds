import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { CaretDownIcon, MagnifyingGlassIcon } from "@phosphor-icons/react"
import type * as React from "react"
import { Field, type FieldInputProps } from "@/registry/servfaz/field"

// Props da story: as do Field com Input e o variant "textarea" junto, para os
// controles mostrarem os três types do Figma.
type FieldStoryProps = Omit<FieldInputProps, "variant"> & {
  variant?: "default" | "floating" | "textarea"
}
const FieldStory = Field as React.ComponentType<FieldStoryProps>

const meta = {
  title: "Componentes/Field",
  component: FieldStory,
  parameters: { layout: "padded" },
  args: {
    variant: "default",
    status: "default",
    label: "Label",
    optional: true,
    description: "Descrição de apoio",
    message: "Mensagem de apoio",
    placeholder: "Placeholder",
    disabled: false,
    leftIcon: <MagnifyingGlassIcon />,
    rightIcon: <CaretDownIcon />,
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "floating", "textarea"],
    },
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
} satisfies Meta<typeof FieldStory>

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
    <div className="flex flex-col gap-8">
      {estados.map(({ nome, props }) => (
        <FieldStory key={nome} {...args} {...props} />
      ))}
    </div>
  ),
}

export const Flutuante: Story = {
  args: { variant: "floating" },
  render: (args) => (
    <div className="flex flex-col gap-6">
      {estados.map(({ nome, props }) => (
        <FieldStory key={nome} {...args} {...props} />
      ))}
    </div>
  ),
}

export const AreaDeTexto: Story = {
  name: "Área de texto",
  args: { variant: "textarea", leftIcon: undefined, rightIcon: undefined },
}

// Testes de interação: rodam no Run tests e no Vitest. Ficam fora da página
// de docs (tag !autodocs) e aparecem só no Storybook local.

export const TesteDigitar: Story = {
  name: "Teste: label, descrição e digitação",
  tags: ["!autodocs"],
  play: async ({ canvas, userEvent }) => {
    const campo = canvas.getByRole("textbox", { name: /Label/ })
    await expect(campo).toHaveAccessibleDescription(/Descrição de apoio/)
    await expect(campo).toHaveAccessibleDescription(/Mensagem de apoio/)
    await userEvent.type(campo, "Pedido 123")
    await expect(campo).toHaveValue("Pedido 123")
  },
}

export const TesteInvalido: Story = {
  name: "Teste: estado inválido",
  tags: ["!autodocs"],
  args: { status: "invalid" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("textbox", { name: /Label/ })).toHaveAttribute(
      "aria-invalid",
      "true"
    )
  },
}

export const TesteAreaDeTexto: Story = {
  name: "Teste: área de texto",
  tags: ["!autodocs"],
  args: { variant: "textarea", leftIcon: undefined, rightIcon: undefined },
  play: async ({ canvas, userEvent }) => {
    const campo = canvas.getByRole("textbox", { name: /Label/ })
    await expect(campo.tagName).toBe("TEXTAREA")
    await userEvent.type(campo, "Linha 1{Enter}Linha 2")
    await expect(campo).toHaveValue("Linha 1\nLinha 2")
  },
}
