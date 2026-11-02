import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "@/registry/servfaz/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/servfaz/sheet"

type Args = { side: "top" | "right" | "bottom" | "left" }

function Exemplo({ side }: Args) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Abrir</Button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Título</SheetTitle>
          <SheetDescription>Descrição de apoio do painel.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button>Salvar</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

const meta = {
  title: "Componentes/Sheet",
  component: Exemplo,
  parameters: { layout: "centered" },
  args: { side: "right" },
  argTypes: {
    side: { control: "inline-radio", options: ["top", "right", "bottom", "left"] },
  },
} satisfies Meta<typeof Exemplo>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {}
