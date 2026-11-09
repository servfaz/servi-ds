import type { Meta, StoryObj } from "@storybook/react-vite"
import Page from "@/registry/servfaz/blocks/app-shell/page"

/*
 * Bloco App Shell (exemplo): a página que o sistema recebe ao instalar o
 * bloco app-shell-exemplo. Usa o componente App Shell com dados fictícios e
 * serve de modelo para a configuração. O componente fica em Componentes.
 */

const meta = {
  title: "Patterns/App Shell",
  component: Page,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Page>

export default meta
type Story = StoryObj<typeof meta>

export const Exemplo: Story = {}
