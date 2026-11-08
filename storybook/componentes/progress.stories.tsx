import type { Meta, StoryObj } from "@storybook/react-vite"

import { Progress } from "@/registry/servfaz/progress"

const cores = ["brand", "neutral", "success", "warning", "danger", "information"] as const

const meta = {
  title: "Componentes/Progress",
  component: Progress,
  args: { value: 40, size: "sm", color: "brand", "aria-label": "Progresso" },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
    size: { control: "inline-radio", options: ["xs", "sm", "default"] },
    color: { control: "select", options: cores },
  },
  decorators: [(Story) => <div className="w-64"><Story /></div>],
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {}

export const ComLabel: Story = {
  name: "Com label",
  args: { label: "40%" },
}

export const Cores: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {cores.map((color) => (
        <Progress key={color} value={60} color={color} label={color} aria-label={color} />
      ))}
    </div>
  ),
}

export const Tamanhos: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(["xs", "sm", "default"] as const).map((size) => (
        <Progress key={size} value={60} size={size} aria-label={size} />
      ))}
    </div>
  ),
}
