import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@/registry/servfaz/button"
import { Spinner } from "@/registry/servfaz/spinner"

const meta = {
  title: "Componentes/Spinner",
  component: Spinner,
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

/** Gira na cor do texto em volta. */
export const Playground: Story = {}

export const Tamanhos: Story = {
  render: () => (
    <div className="flex items-center gap-4 text-(--color-foreground-muted)">
      <Spinner className="size-3" />
      <Spinner />
      <Spinner className="size-6" />
      <Spinner className="size-8 text-(--color-brand-foreground-default)" />
    </div>
  ),
}

export const NoBotao: Story = {
  name: "No botão",
  render: () => (
    <Button disabled>
      <Spinner />
      Salvando
    </Button>
  ),
}
