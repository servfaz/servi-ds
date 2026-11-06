import type { Meta, StoryObj } from "@storybook/react-vite"
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
