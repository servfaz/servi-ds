import type { Meta, StoryObj } from "@storybook/react-vite"
import { Textarea } from "@/registry/servfaz/textarea"

const meta = {
  title: "Componentes/Textarea",
  component: Textarea,
  parameters: { layout: "padded" },
  args: {
    status: "default",
    placeholder: "Placeholder",
    disabled: false,
  },
  argTypes: {
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
} satisfies Meta<typeof Textarea>

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
        <Textarea key={nome} {...args} {...props} aria-label={nome} />
      ))}
    </div>
  ),
}
