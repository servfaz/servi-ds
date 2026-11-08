import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { CaretUpDownIcon } from "@phosphor-icons/react"

import { Button } from "@/registry/servfaz/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/servfaz/collapsible"

const meta = {
  title: "Componentes/Collapsible",
  component: Collapsible,
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

const caixa = "rounded-(--radius-lg) border border-(--color-border-default) px-3 py-2 typo-mono-sm-regular"

/** Lista que mostra mais itens. */
export const Playground: Story = {
  render: (args) => (
    <Collapsible {...args} className="flex w-80 flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <span className="typo-sans-sm-semibold">3 repositórios consumidores</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Mostrar todos">
            <CaretUpDownIcon />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className={caixa}>sistema-atendimento</div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className={caixa}>sistema-financeiro</div>
        <div className={caixa}>sistema-estoque</div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const TesteAbrir: Story = {
  name: "Teste: mostrar todos",
  tags: ["!autodocs"],
  render: Playground.render,
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.queryByText("sistema-estoque")).not.toBeInTheDocument()
    await userEvent.click(canvas.getByRole("button", { name: "Mostrar todos" }))
    await expect(canvas.getByText("sistema-estoque")).toBeVisible()
  },
}
