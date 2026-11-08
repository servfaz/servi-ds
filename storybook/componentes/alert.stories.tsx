import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn } from "storybook/test"
import { Alert, AlertDescription, AlertTitle } from "@/registry/servfaz/alert"

const meta = {
  title: "Componentes/Alert",
  component: Alert,
  parameters: { layout: "padded" },
  args: {
    variant: "default",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "destructive", "warning", "success", "information"],
    },
    icon: { control: false },
  },
  decorators: [
    (Story) => (
      <div className="w-112">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Alterações salvas</AlertTitle>
      <AlertDescription>Este é um alerta com ícone, título e descrição.</AlertDescription>
    </Alert>
  ),
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {}

const variantes = ["default", "destructive", "warning", "success", "information"] as const

export const Variantes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {variantes.map((variant) => (
        <Alert key={variant} {...args} variant={variant} onClose={() => {}}>
          <AlertTitle>Alterações salvas</AlertTitle>
          <AlertDescription>Este é um alerta com ícone, título e descrição.</AlertDescription>
        </Alert>
      ))}
    </div>
  ),
}

export const ComFechar: Story = {
  name: "Com botão de fechar",
  args: { onClose: () => {} },
}

export const SemIcone: Story = {
  name: "Sem ícone",
  args: { icon: null },
}

// Testes de interação: rodam no Run tests e no Vitest. Ficam fora da página
// de docs (tag !autodocs) e aparecem só no Storybook local.

export const TesteFechar: Story = {
  name: "Teste: botão de fechar",
  tags: ["!autodocs"],
  args: { onClose: fn() },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Fechar" }))
    await expect(args.onClose).toHaveBeenCalledTimes(1)
  },
}

export const TesteSemFechar: Story = {
  name: "Teste: sem onClose, sem botão",
  tags: ["!autodocs"],
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole("button", { name: "Fechar" })).toBeNull()
  },
}
