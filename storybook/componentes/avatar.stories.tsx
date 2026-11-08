import type { Meta, StoryObj } from "@storybook/react-vite"
import { UserIcon } from "@phosphor-icons/react"

import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/registry/servfaz/avatar"

const meta = {
  title: "Componentes/Avatar",
  component: Avatar,
  args: { size: "default" },
  argTypes: { size: { control: "inline-radio", options: ["xs", "sm", "default", "lg"] } },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="" alt="Ana Ribeiro" />
      <AvatarFallback>AR</AvatarFallback>
    </Avatar>
  ),
}

export const Tamanhos: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {(["xs", "sm", "default", "lg"] as const).map((size) => (
        <Avatar key={size} size={size}>
          <AvatarFallback>AR</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
}

export const ComIcone: Story = {
  name: "Com ícone",
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>
        <UserIcon />
      </AvatarFallback>
    </Avatar>
  ),
}

export const Grupo: Story = {
  render: () => (
    <AvatarGroup max={3} size="sm">
      {["AR", "CQ", "EL", "LA", "MS"].map((sigla) => (
        <Avatar key={sigla}>
          <AvatarFallback>{sigla}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  ),
}
