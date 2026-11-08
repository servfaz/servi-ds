import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"

import { Card, CardContent } from "@/registry/servfaz/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/registry/servfaz/carousel"

const meta = {
  title: "Componentes/Carousel",
  component: Carousel,
  args: { orientation: "horizontal" },
  argTypes: { orientation: { control: "inline-radio", options: ["horizontal", "vertical"] } },
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

function Slides({ basis = "basis-full" }: { basis?: string }) {
  return (
    <CarouselContent className="h-full">
      {Array.from({ length: 5 }, (_, index) => (
        <CarouselItem key={index} className={basis}>
          <Card className="py-0">
            <CardContent className="flex aspect-square items-center justify-center p-6">
              <span className="typo-sans-4xl-semibold">{index + 1}</span>
            </CardContent>
          </Card>
        </CarouselItem>
      ))}
    </CarouselContent>
  )
}

/** Um slide por vez. */
export const Playground: Story = {
  render: (args) => (
    <Carousel {...args} className="w-full max-w-xs">
      <Slides />
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

export const VariosPorVez: Story = {
  name: "Vários por vez",
  render: () => (
    <Carousel opts={{ align: "start" }} className="w-full max-w-sm">
      <Slides basis="basis-1/2 lg:basis-1/3" />
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

export const TesteAvancar: Story = {
  name: "Teste: avançar",
  tags: ["!autodocs"],
  render: Playground.render,
  play: async ({ canvas, userEvent }) => {
    const anterior = canvas.getByRole("button", { name: "Anterior" })
    await expect(anterior).toBeDisabled()
    await userEvent.click(canvas.getByRole("button", { name: "Próximo" }))
    await expect(anterior).toBeEnabled()
  },
}
