import type { Meta, StoryObj } from "@storybook/react-vite"
import { AppHeader } from "@/registry/servfaz/app-header"
import { SidebarProvider } from "@/registry/servfaz/sidebar"
import { aplicacoes } from "./app-shell.dados"

const meta = {
  title: "Componentes/App Header",
  component: AppHeader,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="[--header-height:calc(var(--spacing)*14)]">
        <SidebarProvider className="min-h-0">
          <Story />
        </SidebarProvider>
      </div>
    ),
  ],
  args: {
    brand: { name: "Conecta", url: "#" },
    user: { name: "Nome Sobrenome" },
    apps: aplicacoes,
    search: { placeholder: "Busca" },
    notifications: 4,
  },
  argTypes: {
    apps: { control: false },
    linkComponent: { control: false },
  },
} satisfies Meta<typeof AppHeader>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {}

/** Botões do chat e das notificações pressionados, com o painel aberto. */
export const PaineisAbertos: Story = {
  name: "Chat e notificações pressionados",
  args: { aiActive: true, notificationsActive: true },
}

/** Só marca, notificações e conta. */
export const Minimo: Story = {
  name: "Mínimo",
  args: { showSearch: false, showAi: false, apps: undefined, notifications: 0 },
}
