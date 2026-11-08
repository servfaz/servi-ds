import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen, waitFor } from "storybook/test"
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

// Testes de interação: rodam no Run tests e no Vitest. Ficam fora da página
// de docs (tag !autodocs) e aparecem só no Storybook local.

export const TesteAbrirFechar: Story = {
  name: "Teste: abrir e fechar",
  tags: ["!autodocs"],
  play: async ({ canvas, userEvent }) => {
    // O exemplo já abre aberto. Esc fecha e o botão abre de novo.
    await waitFor(() => expect(screen.getByText("Conteúdo livre do popover.")).toBeVisible())
    await userEvent.keyboard("{Escape}")
    await waitFor(() => expect(screen.queryByText("Conteúdo livre do popover.")).toBeNull())
    await userEvent.click(canvas.getByRole("button", { name: "Abrir" }))
    await waitFor(() => expect(screen.getByText("Conteúdo livre do popover.")).toBeVisible())
  },
}
