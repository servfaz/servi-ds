import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { ClipboardTextIcon, KanbanIcon, UsersThreeIcon } from "@phosphor-icons/react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/servfaz/tabs"

const meta = {
  title: "Componentes/Tabs",
  component: Tabs,
  args: { variant: "segmented", defaultValue: "clientes" },
  argTypes: { variant: { control: "inline-radio", options: ["segmented", "line"] } },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList aria-label="Tipo de usuário">
        <TabsTrigger value="clientes">Clientes</TabsTrigger>
        <TabsTrigger value="funcionarios">Funcionários</TabsTrigger>
      </TabsList>
      <TabsContent value="clientes" className="typo-sans-sm-regular">Lista de clientes.</TabsContent>
      <TabsContent value="funcionarios" className="typo-sans-sm-regular">Lista de funcionários.</TabsContent>
    </Tabs>
  ),
}

export const LineComIcone: Story = {
  name: "Line com ícone",
  render: () => (
    <Tabs variant="line" defaultValue="tarefas" className="w-96">
      <TabsList aria-label="Visões do time">
        <TabsTrigger value="quadro"><KanbanIcon />Quadro</TabsTrigger>
        <TabsTrigger value="time"><UsersThreeIcon />Visão do time</TabsTrigger>
        <TabsTrigger value="tarefas"><ClipboardTextIcon />Todas as tarefas</TabsTrigger>
      </TabsList>
    </Tabs>
  ),
}

export const TesteTroca: Story = {
  name: "Teste: trocar de aba",
  tags: ["!autodocs"],
  render: Playground.render,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("tab", { name: "Funcionários" }))
    await expect(canvas.getByRole("tab", { name: "Funcionários" })).toHaveAttribute("aria-selected", "true")
    await expect(canvas.getByText("Lista de funcionários.")).toBeVisible()
    await userEvent.keyboard("{ArrowLeft}")
    await expect(canvas.getByRole("tab", { name: "Clientes" })).toHaveAttribute("aria-selected", "true")
  },
}
