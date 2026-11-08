import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/registry/servfaz/menubar"

const meta = {
  title: "Componentes/Menubar",
  component: Menubar,
} satisfies Meta<typeof Menubar>

export default meta
type Story = StoryObj<typeof meta>

/** Barra de menus de um editor. */
export const Playground: Story = {
  render: (args) => (
    <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>Arquivo</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Novo documento <MenubarShortcut>Ctrl N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Abrir <MenubarShortcut>Ctrl O</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Imprimir</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Editar</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Desfazer <MenubarShortcut>Ctrl Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Refazer <MenubarShortcut>Ctrl Y</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Exibir</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked>Mostrar régua</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarRadioGroup value="100">
            <MenubarRadioItem value="75">75%</MenubarRadioItem>
            <MenubarRadioItem value="100">100%</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}
