import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen, waitFor } from "storybook/test"
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

// Testes de interação: rodam no Run tests e no Vitest. Ficam fora da página
// de docs (tag !autodocs) e aparecem só no Storybook local.

export const TesteAbrirFechar: Story = {
  name: "Teste: abrir e fechar",
  tags: ["!autodocs"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Abrir" }))
    const painel = await screen.findByRole("dialog", { name: "Título" })
    await expect(painel).toHaveAccessibleDescription("Descrição de apoio do painel.")
    await userEvent.keyboard("{Escape}")
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
    // O botão Fechar do painel também fecha.
    await userEvent.click(canvas.getByRole("button", { name: "Abrir" }))
    await userEvent.click(await screen.findByRole("button", { name: "Fechar" }))
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
  },
}
