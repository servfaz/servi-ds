import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { CalendarBlankIcon, GearIcon, UserIcon, UsersThreeIcon } from "@phosphor-icons/react"

import { Button } from "@/registry/servfaz/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/registry/servfaz/command"
import { Kbd } from "@/registry/servfaz/kbd"

function Itens() {
  return (
    <>
      <CommandInput placeholder="Digite um comando ou busque..." />
      <CommandList>
        <CommandEmpty>Nenhum resultado.</CommandEmpty>
        <CommandGroup heading="Sugestões">
          <CommandItem>
            <CalendarBlankIcon />
            Agenda
          </CommandItem>
          <CommandItem>
            <UsersThreeIcon />
            Clientes
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Conta">
          <CommandItem>
            <UserIcon />
            Perfil
            <CommandShortcut>Ctrl P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <GearIcon />
            Configurações
            <CommandShortcut>Ctrl S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  )
}

const meta = {
  title: "Componentes/Command",
  component: Command,
} satisfies Meta<typeof Command>

export default meta
type Story = StoryObj<typeof meta>

/** Lista com busca. */
export const Playground: Story = {
  render: (args) => (
    <Command {...args} className="w-80 border border-(--color-border-default) shadow-md">
      <Itens />
    </Command>
  ),
}

function Paleta() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Abrir paleta <Kbd>Ctrl J</Kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Itens />
      </CommandDialog>
    </>
  )
}

export const PaletaDeComandos: Story = {
  name: "Paleta de comandos",
  render: () => <Paleta />,
}

export const TesteBusca: Story = {
  name: "Teste: filtrar",
  tags: ["!autodocs"],
  render: Playground.render,
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox"), "perf")
    await expect(canvas.getByRole("option", { name: /Perfil/ })).toBeVisible()
    await expect(canvas.queryByRole("option", { name: /Agenda/ })).not.toBeInTheDocument()
  },
}
