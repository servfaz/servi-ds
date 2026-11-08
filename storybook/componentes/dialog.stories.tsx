import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"

import { Button } from "@/registry/servfaz/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/servfaz/dialog"
import { Field } from "@/registry/servfaz/field"

const meta = {
  title: "Componentes/Dialog",
  component: Dialog,
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

/** Modal com formulário. */
export const Playground: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">Editar perfil</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>Altere seus dados e salve no final.</DialogDescription>
        </DialogHeader>
        <Field label="Nome" placeholder="Seu nome" defaultValue="Ana Ribeiro" />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const SemBotaoDeFechar: Story = {
  name: "Sem botão de fechar",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Abrir</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Tudo certo</DialogTitle>
          <DialogDescription>Seus dados foram salvos.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Entendi</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const TesteAbrirFechar: Story = {
  name: "Teste: abrir e fechar",
  tags: ["!autodocs"],
  render: Playground.render,
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Editar perfil" }))
    const body = within(canvasElement.ownerDocument.body)
    const dialog = await body.findByRole("dialog", { name: "Editar perfil" })
    await expect(dialog).toBeVisible()
    await userEvent.keyboard("{Escape}")
    await expect(body.queryByRole("dialog")).not.toBeInTheDocument()
  },
}
