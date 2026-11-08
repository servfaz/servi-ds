import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@/registry/servfaz/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/servfaz/drawer"

const meta = {
  title: "Componentes/Drawer",
  component: Drawer,
  args: { direction: "bottom" },
  argTypes: { direction: { control: "inline-radio", options: ["bottom", "top", "left", "right"] } },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button variant="outline">Abrir painel</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Meta de atendimentos</DrawerTitle>
          <DrawerDescription>Defina quantos atendimentos por dia.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 typo-sans-sm-regular text-(--color-foreground-default)">Conteúdo livre do painel.</div>
        <DrawerFooter>
          <Button>Salvar</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}
