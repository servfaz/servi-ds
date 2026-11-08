import type { Meta, StoryObj } from "@storybook/react-vite"
import { ArrowUpRightIcon, StarIcon } from "@phosphor-icons/react"
import { Badge } from "@/registry/servfaz/badge"

const cores = [
  "brand", "neutral", "red", "orange", "amber", "yellow", "lime", "green",
  "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple",
  "fuchsia", "pink", "rose",
] as const

const variantesComCor = ["filled", "light", "dot", "dot-ghost", "ghost", "white", "link"] as const

const meta = {
  title: "Componentes/Badge",
  component: Badge,
  parameters: { layout: "padded" },
  args: {
    variant: "default",
    color: "brand",
    children: "Badge",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", ...variantesComCor],
    },
    color: { control: "select", options: cores },
    shape: { control: "inline-radio", options: ["pill", "tag"] },
    size: { control: "inline-radio", options: ["default", "lg"] },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {}

export const VariantesShadcn: Story = {
  name: "Variantes do shadcn",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link" asChild>
        <a href="#">
          Link
          <ArrowUpRightIcon />
        </a>
      </Badge>
    </div>
  ),
}

export const Cores: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {variantesComCor.map((variant) => (
        <div key={variant} className="flex flex-wrap gap-2">
          {cores.map((color) => (
            <Badge key={color} variant={variant} color={color}>
              {color}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
}

export const ComIcone: Story = {
  name: "Com ícone",
  render: (args) => (
    <Badge {...args}>
      <StarIcon />
      Badge
    </Badge>
  ),
}

export const FormatoETamanho: Story = {
  name: "Formato e tamanho",
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="secondary">Pill</Badge>
      <Badge variant="secondary" shape="tag">Tag</Badge>
      <Badge variant="secondary" shape="tag" size="lg">Tag lg</Badge>
      <Badge variant="dot-ghost" size="lg" color="green">Ativo</Badge>
    </div>
  ),
}
