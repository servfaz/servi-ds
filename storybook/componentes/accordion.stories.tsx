import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/servfaz/accordion"

const perguntas = [
  ["Como troco a minha senha?", "Abra o menu do seu avatar, entre em Perfil e escolha Redefinir senha."],
  ["Posso usar o sistema no celular?", "Sim. O sistema funciona no navegador do celular, sem instalar nada."],
  ["Quem vê os meus relatórios?", "Só as pessoas com perfil de administrador da sua unidade."],
]

type Args = { type: "single" | "multiple" }

const meta: Meta<Args> = {
  title: "Componentes/Accordion",
  component: Accordion as Meta<Args>["component"],
  args: { type: "single" },
  argTypes: { type: { control: "inline-radio", options: ["single", "multiple"] } },
  decorators: [(Story) => <div className="w-96"><Story /></div>],
}

export default meta
type Story = StoryObj<Args>

function Itens() {
  return perguntas.map(([pergunta, resposta]) => (
    <AccordionItem key={pergunta} value={pergunta}>
      <AccordionTrigger>{pergunta}</AccordionTrigger>
      <AccordionContent>{resposta}</AccordionContent>
    </AccordionItem>
  ))
}

/** Perguntas frequentes. */
export const Playground: Story = {
  render: ({ type }) =>
    type === "multiple" ? (
      <Accordion type="multiple">
        <Itens />
      </Accordion>
    ) : (
      <Accordion type="single" collapsible>
        <Itens />
      </Accordion>
    ),
}

export const VariosAbertos: Story = {
  name: "Vários abertos",
  args: { type: "multiple" },
  render: Playground.render,
}

export const TesteAbrir: Story = {
  name: "Teste: abrir e fechar",
  tags: ["!autodocs"],
  render: Playground.render,
  play: async ({ canvas, userEvent }) => {
    const gatilho = canvas.getByRole("button", { name: perguntas[0][0] })
    await userEvent.click(gatilho)
    await expect(gatilho).toHaveAttribute("aria-expanded", "true")
    await expect(canvas.getByText(perguntas[0][1])).toBeVisible()
    await userEvent.click(gatilho)
    await expect(gatilho).toHaveAttribute("aria-expanded", "false")
  },
}
