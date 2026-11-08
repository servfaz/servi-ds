import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"

import { Combobox, type ComboboxOption } from "@/registry/servfaz/combobox"

const unidades: ComboboxOption[] = [
  { value: "centro", label: "Unidade Centro" },
  { value: "joquei", label: "Unidade Jóquei" },
  { value: "leste", label: "Unidade Leste" },
  { value: "norte", label: "Unidade Norte" },
  { value: "sul", label: "Unidade Sul" },
  { value: "picos", label: "Unidade Picos", disabled: true },
]

type Args = {
  placeholder: string
  searchPlaceholder: string
  disabled: boolean
  invalid: boolean
}

const meta: Meta<Args> = {
  title: "Componentes/Combobox",
  args: {
    placeholder: "Escolha uma unidade",
    searchPlaceholder: "Buscar unidade...",
    disabled: false,
    invalid: false,
  },
  render: ({ invalid, ...args }) => <Combobox {...args} options={unidades} aria-invalid={invalid} />,
  decorators: [(Story) => <div className="w-72"><Story /></div>],
}

export default meta
type Story = StoryObj<Args>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {}

export const Multipla: Story = {
  name: "Escolha múltipla",
  render: ({ invalid, ...args }) => (
    <Combobox {...args} options={unidades} aria-invalid={invalid} multiple placeholder="Escolha as unidades" />
  ),
}

export const TesteBuscarEscolher: Story = {
  name: "Teste: buscar e escolher",
  tags: ["!autodocs"],
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("combobox"))
    const body = within(canvasElement.ownerDocument.body)
    await userEvent.type(await body.findByPlaceholderText("Buscar unidade..."), "joq")
    await userEvent.click(body.getByRole("option", { name: /Unidade Jóquei/ }))
    await expect(canvas.getByRole("combobox")).toHaveTextContent("Unidade Jóquei")
  },
}
