import type { Meta, StoryObj } from "@storybook/react-vite"
import { CalendarBlankIcon } from "@phosphor-icons/react"

import { Avatar, AvatarFallback } from "@/registry/servfaz/avatar"
import { Button } from "@/registry/servfaz/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/servfaz/hover-card"

const meta = {
  title: "Componentes/Hover Card",
  component: HoverCard,
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

/** Passe o mouse no link. */
export const Playground: Story = {
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger asChild>
        <Button variant="link">@anaribeiro</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="flex gap-3">
          <Avatar>
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <span className="typo-sans-sm-semibold">Ana Ribeiro</span>
            <span className="typo-sans-sm-regular text-(--color-foreground-default)">Coordenadora de atendimento.</span>
            <span className="flex items-center gap-1 typo-sans-xs-regular text-(--color-foreground-muted)">
              <CalendarBlankIcon className="size-3.5" />
              Desde março de 2025
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}
