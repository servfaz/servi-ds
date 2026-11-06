import type { Meta, StoryObj } from "@storybook/react-vite"
import { Skeleton } from "@/registry/servfaz/skeleton"

const meta = {
  title: "Componentes/Skeleton",
  component: Skeleton,
  parameters: { layout: "padded" },
  args: { className: "h-4 w-60" },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {}

export const Composicao: Story = {
  name: "Composição",
  render: () => (
    <div className="flex items-center gap-3">
      <Skeleton className="size-10 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-56" />
        <Skeleton className="h-4 w-40" />
      </div>
    </div>
  ),
}
