import type { Meta, StoryObj } from "@storybook/react-vite"
import { Separator } from "@/registry/servfaz/separator"

const meta = {
  title: "Componentes/Separator",
  component: Separator,
  parameters: { layout: "padded" },
  args: { orientation: "horizontal" },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
  decorators: [
    (Story) => (
      <div className="flex h-10 w-80 items-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {}
