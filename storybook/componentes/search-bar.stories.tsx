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
    placeholders: sugestoes,
    placeholder: "Buscar",
    showFilter: true,
    filterActive: false,
    showAi: true,
    aiLabel: "Chat com GAIA",
    disabled: false,
  },
  argTypes: {
    placeholderInterval: { control: { type: "number", step: 500 } },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {}

export const PlaceholderFixo: Story = {
  name: "Placeholder fixo",
  args: { placeholders: undefined, placeholder: "Buscar no sistema" },
}

export const Preenchido: Story = {
  args: { defaultValue: "Conecta" },
}

export const FiltroAtivo: Story = {
  name: "Filtro ativo",
  args: { filterActive: true },
}

export const SemAcoes: Story = {
  name: "Sem ações",
  args: { showFilter: false, showAi: false },
}

export const Desabilitado: Story = {
  args: { disabled: true },
}
