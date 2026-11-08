import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { ScrollArea, ScrollBar } from "@/registry/servfaz/scroll-area"
import { Separator } from "@/registry/servfaz/separator"

const versoes = Array.from({ length: 30 }, (_, index) => `v1.${30 - index}.0`)

const meta = {
  title: "Componentes/Scroll Area",
  component: ScrollArea,
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

/** Rolagem vertical. */
export const Playground: Story = {
  render: (args) => (
    <ScrollArea {...args} className="h-72 w-48 rounded-(--radius-lg) border border-(--color-border-default)">
      <div className="p-4">
        <h4 className="mb-4 typo-sans-sm-semibold">Versões</h4>
        {versoes.map((versao) => (
          <React.Fragment key={versao}>
            <div className="typo-mono-sm-regular">{versao}</div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-80 rounded-(--radius-lg) border border-(--color-border-default) whitespace-nowrap">
      <div className="flex w-max gap-3 p-4">
        {Array.from({ length: 10 }, (_, index) => (
          <div
            key={index}
            className="flex h-24 w-32 shrink-0 items-center justify-center rounded-(--radius-md) bg-(--color-background-muted) typo-sans-sm-medium"
          >
            Item {index + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
}
