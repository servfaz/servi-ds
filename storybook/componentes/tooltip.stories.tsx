import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "@/registry/servfaz/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/servfaz/tooltip"

type Args = { side: "top" | "right" | "bottom" | "left"; texto: string }

function Exemplo({ side, texto }: Args) {
  return (
    <Tooltip defaultOpen>
      <TooltipTrigger asChild>
        <Button variant="outline">Passe o mouse</Button>
      </TooltipTrigger>
      <TooltipContent side={side}>{texto}</TooltipContent>
    </Tooltip>
  )
}

const meta = {
  title: "Componentes/Tooltip",
  component: Exemplo,
  parameters: { layout: "centered" },
  args: { side: "top", texto: "Texto de apoio" },
  argTypes: {
    side: { control: "inline-radio", options: ["top", "right", "bottom", "left"] },
  },
} satisfies Meta<typeof Exemplo>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {}
