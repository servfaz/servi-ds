import type { Meta, StoryObj } from "@storybook/react-vite"
import { CommandIcon } from "@phosphor-icons/react"

import { Kbd, KbdGroup } from "@/registry/servfaz/kbd"

const meta = {
  title: "Componentes/Kbd",
  component: Kbd,
  args: { children: "Ctrl" },
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {}

export const Grupo: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3 typo-sans-sm-regular text-(--color-foreground-default)">
      <span className="flex items-center gap-2">
        Buscar
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </span>
      <span className="flex items-center gap-2">
        No Mac
        <KbdGroup>
          <Kbd>
            <CommandIcon />
          </Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </span>
    </div>
  ),
}
