import type { Meta, StoryObj } from "@storybook/react-vite"
import { ArrowRightIcon, PlusIcon } from "@phosphor-icons/react"
import { Button } from "@/registry/servfaz/button"

const variants = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
  "link",
] as const

const sizes = ["sm", "default", "lg"] as const

const meta = {
  title: "Componentes/Button",
  component: Button,
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    disabled: false,
  },
  argTypes: {
    variant: { control: "select", options: variants },
    size: { control: "select", options: [...sizes, "icon"] },
    asChild: { control: false },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {}

export const Variantes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
}

export const Tamanhos: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <Button key={size} {...args} size={size}>
          {size}
        </Button>
      ))}
      <Button {...args} size="icon" aria-label="Adicionar">
        <PlusIcon />
      </Button>
    </div>
  ),
}

export const Desabilitado: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((variant) => (
        <Button key={variant} {...args} variant={variant} disabled>
          {variant}
        </Button>
      ))}
    </div>
  ),
}

export const ComIcone: Story = {
  name: "Com ícone",
  render: (args) => (
    <Button {...args}>
      Continuar
      <ArrowRightIcon />
    </Button>
  ),
}
