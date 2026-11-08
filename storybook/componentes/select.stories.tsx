import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/registry/servfaz/select"

const meta = {
  title: "Componentes/Select",
  component: Select,
  args: { disabled: false },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-56" aria-label="Unidade">
        <SelectValue placeholder="Escolha uma unidade" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Teresina</SelectLabel>
          <SelectItem value="centro">Unidade Centro</SelectItem>
          <SelectItem value="joquei">Unidade Jóquei</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Outras cidades</SelectLabel>
          <SelectItem value="parnaiba">Unidade Parnaíba</SelectItem>
          <SelectItem value="picos" disabled>
            Unidade Picos (em breve)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

export const Tamanhos: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {(["sm", "default"] as const).map((size) => (
        <Select key={size} defaultValue="centro">
          <SelectTrigger size={size} aria-label={`Tamanho ${size}`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="centro">Unidade Centro</SelectItem>
          </SelectContent>
        </Select>
      ))}
    </div>
  ),
}

export const Invalido: Story = {
  name: "Inválido",
  render: () => (
    <Select>
      <SelectTrigger className="w-56" aria-invalid aria-label="Unidade">
        <SelectValue placeholder="Escolha uma unidade" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="centro">Unidade Centro</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const TesteEscolher: Story = {
  name: "Teste: escolher opção",
  tags: ["!autodocs"],
  render: Playground.render,
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("combobox", { name: "Unidade" }))
    const body = within(canvasElement.ownerDocument.body)
    await userEvent.click(await body.findByRole("option", { name: "Unidade Jóquei" }))
    await expect(canvas.getByRole("combobox", { name: "Unidade" })).toHaveTextContent("Unidade Jóquei")
  },
}
