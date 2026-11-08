import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, within } from "storybook/test"
import { DotsThreeIcon, KeyIcon, PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react"

import { Button } from "@/registry/servfaz/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/registry/servfaz/dropdown-menu"

const aoEditar = fn()

const meta = {
  title: "Componentes/Dropdown Menu",
  component: DropdownMenu,
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

/** Menu de ações de uma linha. */
export const Playground: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon-sm" className="rounded-full" aria-label="Ações">
          <DotsThreeIcon weight="bold" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Conta</DropdownMenuLabel>
        <DropdownMenuItem onSelect={aoEditar}>
          <PencilSimpleIcon />
          Editar perfil
          <DropdownMenuShortcut>Ctrl E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <KeyIcon />
          Redefinir senha
        </DropdownMenuItem>
        <DropdownMenuCheckboxItem checked>Receber avisos</DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <TrashIcon />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const TesteAbrirEscolher: Story = {
  name: "Teste: abrir e escolher item",
  tags: ["!autodocs"],
  render: Playground.render,
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Ações" }))
    const menu = within(canvasElement.ownerDocument.body)
    await userEvent.click(await menu.findByRole("menuitem", { name: /Editar perfil/ }))
    await expect(aoEditar).toHaveBeenCalled()
    await expect(menu.queryByRole("menu")).not.toBeInTheDocument()
  },
}
