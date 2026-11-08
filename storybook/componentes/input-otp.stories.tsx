import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/registry/servfaz/input-otp"

const meta: Meta = {
  title: "Componentes/Input OTP",
  component: InputOTP,
}

export default meta
type Story = StoryObj

/** Código de 6 dígitos em dois grupos. */
export const Playground: Story = {
  render: () => (
    <InputOTP maxLength={6} aria-label="Código de verificação">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
}

export const QuatroDigitos: Story = {
  name: "Quatro dígitos",
  render: () => (
    <InputOTP maxLength={4} aria-label="Código de verificação">
      <InputOTPGroup>
        {[0, 1, 2, 3].map((index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  ),
}

export const TesteDigitar: Story = {
  name: "Teste: digitar o código",
  tags: ["!autodocs"],
  render: Playground.render,
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("textbox")
    await userEvent.click(input)
    await userEvent.keyboard("123456")
    await expect(input).toHaveValue("123456")
  },
}
