import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, waitFor, within } from "storybook/test"
import { AppShell } from "@/registry/servfaz/app-shell"
import { ConteudoDeExemplo, Vazio, aplicacoes, modulos, rodapeDoRail } from "./app-shell.dados"

const meta = {
  title: "Componentes/App Shell",
  component: AppShell,
  parameters: { layout: "fullscreen" },
  args: {
    brand: { name: "Conecta", url: "#" },
    user: { name: "Nome Sobrenome" },
    modules: modulos,
    railFooter: rodapeDoRail,
    currentPath: "/inicio",
    apps: aplicacoes,
    search: { placeholder: "Busca" },
    notifications: 4,
    aiPanel: {
      description: "Converse com a assistente de IA.",
      content: <Vazio texto="Conteúdo do chat com a IA." />,
    },
    notificationsPanel: {
      description: "Avisos e pendências do sistema.",
      content: <Vazio texto="Lista de notificações." />,
    },
    children: <ConteudoDeExemplo />,
  },
  argTypes: {
    children: { control: false },
    modules: { control: false },
    railFooter: { control: false },
    apps: { control: false },
    linkComponent: { control: false },
    defaultPanel: { control: "inline-radio", options: [null, "ai", "notifications"] },
  },
} satisfies Meta<typeof AppShell>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {}

/** Bloco da direita aberto pelo botão "Chat com GAIA". */
export const ChatAberto: Story = { name: "Chat aberto", args: { defaultPanel: "ai" } }

/** Bloco da direita aberto pelo sino de notificações. */
export const NotificacoesAbertas: Story = {
  name: "Notificações abertas",
  args: { defaultPanel: "notifications" },
}

/** Sistema sem chat com IA e sem hub de aplicações. */
export const SemChatEHub: Story = {
  name: "Sem chat e sem hub",
  args: { aiPanel: false, apps: undefined },
}

// Testes de interação: rodam no Run tests e no Vitest. Ficam fora da página
// de docs (tag !autodocs) e aparecem só no Storybook local.

export const TesteItemAtivo: Story = {
  name: "Teste: item da rota atual ativo",
  tags: ["!autodocs"],
  args: { currentPath: "/clientes/42" },
  play: async ({ canvas }) => {
    const item = canvas.getByRole("link", { name: "Clientes" })
    await expect(item).toHaveAttribute("aria-current", "page")
    await expect(canvas.getByRole("link", { name: "Início" })).not.toHaveAttribute("aria-current")
  },
}

export const TesteTrocarModulo: Story = {
  name: "Teste: trocar de módulo",
  tags: ["!autodocs"],
  play: async ({ canvas, userEvent }) => {
    const rail = within(canvas.getByRole("navigation", { name: "Módulos" }))
    await userEvent.click(rail.getByRole("button", { name: "Compras" }))
    await waitFor(() => expect(canvas.getByRole("link", { name: "Pedidos de compra" })).toBeVisible())
    await expect(rail.getByRole("button", { name: "Compras" })).toHaveAttribute("aria-current", "page")
  },
}

export const TesteAbrirFecharPainel: Story = {
  name: "Teste: abrir e fechar o painel",
  tags: ["!autodocs"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Chat com GAIA" }))
    await waitFor(() => expect(canvas.getByText("Conteúdo do chat com a IA.")).toBeVisible())
    // O sino troca o conteúdo do mesmo painel.
    await userEvent.click(canvas.getByRole("button", { name: /^Notificações/ }))
    await waitFor(() => expect(canvas.getByText("Lista de notificações.")).toBeVisible())
    // O mesmo botão fecha.
    await userEvent.click(canvas.getByRole("button", { name: /^Notificações/ }))
    await waitFor(() => expect(canvas.queryByText("Lista de notificações.")).toBeNull())
  },
}
