import type { Meta, StoryObj } from "@storybook/react-vite"
import { toast } from "sonner"
import { expect, within } from "storybook/test"

import { Button } from "@/registry/servfaz/button"
import { Toaster } from "@/registry/servfaz/sonner"

const meta = {
  title: "Componentes/Sonner",
  component: Toaster,
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

/** Clique para ver cada tipo. */
export const Playground: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast("Cliente cadastrado", {
            description: "Ana Ribeiro já pode entrar no sistema.",
            action: { label: "Desfazer", onClick: () => {} },
          })
        }
      >
        Padrão
      </Button>
      <Button variant="outline" onClick={() => toast.success("Alterações salvas")}>
        Sucesso
      </Button>
      <Button variant="outline" onClick={() => toast.info("Nova versão disponível")}>
        Informação
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Sua sessão expira em 5 minutos")}>
        Aviso
      </Button>
      <Button variant="outline" onClick={() => toast.error("Não foi possível salvar")}>
        Erro
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
            loading: "Enviando...",
            success: "Enviado",
            error: "Falhou",
          })
        }
      >
        Carregando
      </Button>
    </div>
  ),
}

export const TesteMostrar: Story = {
  name: "Teste: mostrar notificação",
  tags: ["!autodocs"],
  render: Playground.render,
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Sucesso" }))
    const body = within(canvasElement.ownerDocument.body)
    await expect(await body.findByText("Alterações salvas")).toBeVisible()
  },
}
