import type { Meta, StoryObj } from "@storybook/react-vite"
import { ArrowLeftIcon, ArrowRightIcon, CaretDownIcon, MagnifyingGlassIcon } from "@phosphor-icons/react"

import { Button } from "@/registry/servfaz/button"
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@/registry/servfaz/button-group"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/registry/servfaz/input-group"

const meta = {
  title: "Componentes/Button Group",
  component: ButtonGroup,
  args: { orientation: "horizontal" },
  argTypes: { orientation: { control: "inline-radio", options: ["horizontal", "vertical"] } },
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {
  render: (args) => (
    <ButtonGroup {...args} aria-label="Navegação">
      <Button variant="outline">
        <ArrowLeftIcon />
        Anterior
      </Button>
      <Button variant="outline">Hoje</Button>
      <Button variant="outline">
        Próximo
        <ArrowRightIcon />
      </Button>
    </ButtonGroup>
  ),
}

export const ComSeparador: Story = {
  name: "Botão dividido",
  render: () => (
    <ButtonGroup aria-label="Salvar">
      <Button>Salvar</Button>
      <ButtonGroupSeparator />
      <Button size="icon" aria-label="Mais opções de salvar">
        <CaretDownIcon />
      </Button>
    </ButtonGroup>
  ),
}

export const ComCampo: Story = {
  name: "Com campo e rótulo",
  render: () => (
    <ButtonGroup aria-label="Busca">
      <ButtonGroupText>Clientes</ButtonGroupText>
      <InputGroup className="w-56">
        <InputGroupInput placeholder="Buscar..." aria-label="Buscar clientes" />
        <InputGroupAddon>
          <MagnifyingGlassIcon />
        </InputGroupAddon>
      </InputGroup>
      <Button variant="outline">Buscar</Button>
    </ButtonGroup>
  ),
}
