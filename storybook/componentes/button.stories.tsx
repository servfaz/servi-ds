import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn } from "storybook/test"
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

const sizes = ["xs", "sm", "default", "lg"] as const

const iconSizes = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const

const meta = {
  title: "Componentes/Button",
  component: Button,
  // O Button usa a página própria (button.mdx) no lugar da automática.
  tags: ["!autodocs"],
  // A página do Button usa títulos de nível 2: o índice "Nesta página" lista esses.
  parameters: { docs: { toc: { headingSelector: "h2" } } },
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    disabled: false,
  },
  argTypes: {
    variant: { control: "select", options: variants },
    size: { control: "select", options: [...sizes, ...iconSizes] },
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
      {iconSizes.map((size) => (
        <Button key={size} {...args} size={size} aria-label="Adicionar">
          <PlusIcon />
        </Button>
      ))}
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
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args}>
        <PlusIcon />
        Novo pedido
      </Button>
      <Button {...args} variant="secondary">
        Continuar
        <ArrowRightIcon />
      </Button>
    </div>
  ),
}

export const ComoLink: Story = {
  name: "Como link",
  render: (args) => (
    <Button {...args} asChild>
      <a href="#como-link-aschild">Ver pedidos</a>
    </Button>
  ),
}

// Testes de interação: rodam no Run tests e no Vitest. Ficam fora da página
// de docs (tag !autodocs) e aparecem só no Storybook local.

export const TesteClique: Story = {
  name: "Teste: clique",
  tags: ["!autodocs"],
  args: { onClick: fn() },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Button" }))
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

export const TesteTeclado: Story = {
  name: "Teste: Enter e espaço",
  tags: ["!autodocs"],
  args: { onClick: fn() },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.tab()
    await expect(canvas.getByRole("button", { name: "Button" })).toHaveFocus()
    await userEvent.keyboard("{Enter}")
    await userEvent.keyboard(" ")
    await expect(args.onClick).toHaveBeenCalledTimes(2)
  },
}

export const TesteDesabilitado: Story = {
  name: "Teste: desabilitado não clica",
  tags: ["!autodocs"],
  args: { onClick: fn(), disabled: true },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole("button", { name: "Button" })
    await expect(button).toBeDisabled()
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}

export const TesteComoLink: Story = {
  name: "Teste: como link",
  tags: ["!autodocs"],
  render: ComoLink.render,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Ver pedidos" })).toHaveAttribute(
      "href",
      "#como-link-aschild"
    )
  },
}
