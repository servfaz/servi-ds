import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "@/registry/servfaz/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/servfaz/popover"

type Args = {
  align: "start" | "center" | "end"
  side: "top" | "right" | "bottom" | "left"
}

function Exemplo({ align, side }: Args) {
  return (
    <Popover defaultOpen>
      <PopoverTrigger asChild>
        <Button variant="outline">Abrir</Button>
      </PopoverTrigger>
      <PopoverContent align={align} side={side}>
        <p className="text-sm font-medium">Título</p>
        <p className="text-sm text-(--color-foreground-default)">
          Conteúdo livre do popover.
        </p>
      </PopoverContent>
    </Popover>
  )
}

const meta = {
  title: "Componentes/Popover",
  component: Exemplo,
  parameters: { layout: "centered" },
  args: { align: "center", side: "bottom" },
  argTypes: {
    align: { control: "inline-radio", options: ["start", "center", "end"] },
    side: { control: "inline-radio", options: ["top", "right", "bottom", "left"] },
  },
} satisfies Meta<typeof Exemplo>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {}
