import type { Meta, StoryObj } from "@storybook/react-vite"
import { ImageIcon } from "@phosphor-icons/react"

import { AspectRatio } from "@/registry/servfaz/aspect-ratio"

const meta = {
  title: "Componentes/Aspect Ratio",
  component: AspectRatio,
  args: { ratio: 16 / 9 },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {
  render: (args) => (
    <AspectRatio {...args} className="flex items-center justify-center rounded-(--radius-xl) bg-(--color-background-muted) text-(--color-foreground-muted)">
      <ImageIcon className="size-8" />
    </AspectRatio>
  ),
}

export const Quadrado: Story = {
  args: { ratio: 1 },
  render: Playground.render,
}
