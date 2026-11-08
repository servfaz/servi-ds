import type { Meta, StoryObj } from "@storybook/react-vite"
import { CopyIcon, InfoIcon, MagnifyingGlassIcon, PaperPlaneRightIcon } from "@phosphor-icons/react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/registry/servfaz/input-group"
import { Kbd } from "@/registry/servfaz/kbd"
import { Spinner } from "@/registry/servfaz/spinner"

const meta = {
  title: "Componentes/Input Group",
  component: InputGroup,
  decorators: [(Story) => <div className="flex w-80 flex-col gap-4"><Story /></div>],
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

/** Busca com ícone e atalho. */
export const Playground: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupInput placeholder="Buscar..." aria-label="Buscar" />
      <InputGroupAddon>
        <MagnifyingGlassIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <Kbd>Ctrl K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const Complementos: Story = {
  render: () => (
    <>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="exemplo.com" aria-label="Site" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.br</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput defaultValue="ds.servfaz.app/r/button.json" aria-label="Endereço" readOnly />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" aria-label="Copiar">
            <CopyIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Salvando..." aria-label="Salvando" disabled />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
    </>
  ),
}

export const ComTextarea: Story = {
  name: "Com textarea",
  render: () => (
    <InputGroup>
      <InputGroupTextarea placeholder="Pergunte para a Gaia..." aria-label="Mensagem" />
      <InputGroupAddon align="block-end">
        <InputGroupText>
          <InfoIcon />
          Enter envia
        </InputGroupText>
        <InputGroupButton variant="default" size="icon-xs" className="ml-auto rounded-full" aria-label="Enviar">
          <PaperPlaneRightIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}
