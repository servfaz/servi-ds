import type { Meta, StoryObj } from "@storybook/react-vite"
import { BellIcon, CaretRightIcon, ShieldCheckIcon } from "@phosphor-icons/react"

import { Avatar, AvatarFallback } from "@/registry/servfaz/avatar"
import { Button } from "@/registry/servfaz/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/registry/servfaz/item"
import { Switch } from "@/registry/servfaz/switch"

const meta = {
  title: "Componentes/Item",
  component: Item,
  args: { variant: "outline", size: "default" },
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "outline", "muted"] },
    size: { control: "inline-radio", options: ["default", "sm"] },
  },
  decorators: [(Story) => <div className="flex w-96 flex-col gap-4"><Story /></div>],
} satisfies Meta<typeof Item>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {
  render: (args) => (
    <Item {...args}>
      <ItemMedia variant="icon">
        <ShieldCheckIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Verificação em duas etapas</ItemTitle>
        <ItemDescription>Peça um código a cada novo acesso.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Switch aria-label="Verificação em duas etapas" defaultChecked />
      </ItemActions>
    </Item>
  ),
}

export const Lista: Story = {
  render: () => (
    <ItemGroup className="rounded-(--radius-lg) border border-(--color-border-default)">
      {[
        ["Ana Ribeiro", "ana@exemplo.com", "AR"],
        ["Caio Quintela", "caio@exemplo.com", "CQ"],
      ].map(([nome, email, sigla], index) => (
        <div key={nome}>
          {index > 0 ? <ItemSeparator /> : null}
          <Item asChild size="sm">
            <a href="#">
              <ItemMedia>
                <Avatar size="sm">
                  <AvatarFallback>{sigla}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{nome}</ItemTitle>
                <ItemDescription>{email}</ItemDescription>
              </ItemContent>
              <CaretRightIcon className="size-4 text-(--color-foreground-muted)" />
            </a>
          </Item>
        </div>
      ))}
    </ItemGroup>
  ),
}

export const ComBotao: Story = {
  name: "Com botão",
  render: () => (
    <Item variant="muted">
      <ItemMedia variant="icon">
        <BellIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>3 avisos novos</ItemTitle>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="outline">
          Ver avisos
        </Button>
      </ItemActions>
    </Item>
  ),
}
