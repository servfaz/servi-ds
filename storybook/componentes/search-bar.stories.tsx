import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn } from "storybook/test"
import { SearchBar } from "@/registry/servfaz/search-bar"

const sugestoes = [
  "Tente 'contratos vencendo este mês'",
  "Tente 'clientes sem atendimento'",
  "Tente 'ordens de serviço abertas'",
]

const meta = {
  title: "Componentes/Search Bar",
  component: SearchBar,
  parameters: { layout: "padded" },
  args: {
    placeholder: "Busca",
    shortcutKey: "k",
    shortcutLabel: "Ctrl K",
    disabled: false,
  },
  argTypes: {
    placeholderInterval: { control: { type: "number", step: 500 } },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {}

export const PlaceholderRotativo: Story = {
  name: "Placeholder rotativo",
  args: { placeholders: sugestoes },
}

export const Preenchido: Story = {
  args: { defaultValue: "Conecta" },
}

export const SemAtalho: Story = {
  name: "Sem atalho",
  args: { shortcutKey: null },
}

export const Desabilitado: Story = {
  args: { disabled: true },
}

// Testes de interação: rodam no Run tests e no Vitest. Ficam fora da página
// de docs (tag !autodocs) e aparecem só no Storybook local.

export const TesteDigitarELimpar: Story = {
  name: "Teste: digitar e limpar",
  tags: ["!autodocs"],
  args: { onClear: fn() },
  play: async ({ args, canvas, userEvent }) => {
    const busca = canvas.getByRole("searchbox", { name: "Busca" })
    await expect(canvas.queryByRole("button", { name: "Limpar busca" })).toBeNull()
    await userEvent.type(busca, "contratos")
    await expect(busca).toHaveValue("contratos")
    await userEvent.click(canvas.getByRole("button", { name: "Limpar busca" }))
    await expect(busca).toHaveValue("")
    await expect(busca).toHaveFocus()
    await expect(args.onClear).toHaveBeenCalledTimes(1)
  },
}

export const TesteAtalho: Story = {
  name: "Teste: atalho Ctrl K",
  tags: ["!autodocs"],
  play: async ({ canvas, userEvent }) => {
    const busca = canvas.getByRole("searchbox", { name: "Busca" })
    await expect(busca).not.toHaveFocus()
    await userEvent.keyboard("{Control>}k{/Control}")
    await expect(busca).toHaveFocus()
  },
}
