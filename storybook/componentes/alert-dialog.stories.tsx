import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, within } from "storybook/test"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/servfaz/alert-dialog"
import { Button } from "@/registry/servfaz/button"

const aoExcluir = fn()

const meta = {
  title: "Componentes/Alert Dialog",
  component: AlertDialog,
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

/** Confirmação de uma ação sem volta. */
export const Playground: Story = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Excluir conta</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir a conta?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Todos os dados da conta serão apagados.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={aoExcluir}>
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

export const TesteConfirmar: Story = {
  name: "Teste: confirmar",
  tags: ["!autodocs"],
  render: Playground.render,
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Excluir conta" }))
    const body = within(canvasElement.ownerDocument.body)
    await userEvent.click(await body.findByRole("button", { name: "Excluir" }))
    await expect(aoExcluir).toHaveBeenCalled()
    await expect(body.queryByRole("alertdialog")).not.toBeInTheDocument()
  },
}
