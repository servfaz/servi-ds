import type { Meta, StoryObj } from "@storybook/react-vite"
import Page from "@/registry/servfaz/blocks/app-shell/page"

/*
 * Bloco App Shell: o mesmo arquivo page.tsx que o sistema recebe ao instalar o
 * bloco. Não é componente do DS: é ponto de partida para copiar e editar.
 */

const meta = {
  title: "Blocos/App Shell",
  component: Page,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Page>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = { name: "Padrão" }
