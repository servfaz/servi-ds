import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { CopyIcon, PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/registry/servfaz/context-menu"

const meta = {
  title: "Componentes/Context Menu",
  component: ContextMenu,
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

/** Clique com o botão direito na área. */
export const Playground: Story = {
  render: (args) => (
    <ContextMenu {...args}>
      <ContextMenuTrigger className="flex h-40 w-72 items-center justify-center rounded-(--radius-xl) border border-dashed border-(--color-border-strong) typo-sans-sm-regular text-(--color-foreground-muted)">
        Clique com o botão direito
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem>
          <PencilSimpleIcon />
          Renomear
          <ContextMenuShortcut>F2</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <CopyIcon />
          Duplicar
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Mover para</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Arquivo</ContextMenuItem>
            <ContextMenuItem>Projetos</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuCheckboxItem checked>Fixar no topo</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <TrashIcon />
          Excluir
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

export const TesteBotaoDireito: Story = {
  name: "Teste: abrir com o botão direito",
  tags: ["!autodocs"],
  render: Playground.render,
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.pointer({ keys: "[MouseRight]", target: canvas.getByText("Clique com o botão direito") })
    const body = within(canvasElement.ownerDocument.body)
    await expect(await body.findByRole("menuitem", { name: /Renomear/ })).toBeVisible()
  },
}
