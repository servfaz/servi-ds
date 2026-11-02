import type { Meta, StoryObj } from "@storybook/react-vite"
import { CaretDownIcon, MagnifyingGlassIcon } from "@phosphor-icons/react"
import { Field } from "@/registry/servfaz/field"

const meta = {
  title: "Componentes/Field",
  component: Field,
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
} satisfies Meta<typeof Field>

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
        <Field key={nome} {...args} {...props} />
      ))}
    </div>
  ),
}

export const Flutuante: Story = {
  args: { variant: "floating" },
  render: (args) => (
    <div className="flex flex-col gap-6">
      {estados.map(({ nome, props }) => (
        <Field key={nome} {...args} {...props} />
      ))}
    </div>
  ),
}
