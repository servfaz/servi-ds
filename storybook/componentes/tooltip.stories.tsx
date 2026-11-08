import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen, waitFor } from "storybook/test"
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

// Testes de interação: rodam no Run tests e no Vitest. Ficam fora da página
// de docs (tag !autodocs) e aparecem só no Storybook local.

export const TesteAbrirFechar: Story = {
  name: "Teste: abrir e fechar",
  tags: ["!autodocs"],
  play: async ({ canvas, userEvent }) => {
    // O exemplo já abre aberto. Esc fecha e o foco no botão abre de novo.
    await expect(await screen.findByRole("tooltip")).toHaveTextContent("Texto de apoio")
    await userEvent.keyboard("{Escape}")
    await waitFor(() => expect(screen.queryByRole("tooltip")).toBeNull())
    canvas.getByRole("button", { name: "Passe o mouse" }).blur()
    await userEvent.tab()
    await expect(await screen.findByRole("tooltip")).toHaveTextContent("Texto de apoio")
  },
}
