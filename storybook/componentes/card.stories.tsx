import type { Meta, StoryObj } from "@storybook/react-vite"

import { Badge } from "@/registry/servfaz/badge"
import { Button } from "@/registry/servfaz/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/servfaz/card"
import { Field } from "@/registry/servfaz/field"

const meta = {
  title: "Componentes/Card",
  component: Card,
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

/** Card com formulário. */
export const Playground: Story = {
  render: (args) => (
    <Card {...args} className="w-96">
      <CardHeader>
        <CardTitle>Entrar na conta</CardTitle>
        <CardDescription>Use o e-mail cadastrado na sua unidade.</CardDescription>
        <CardAction>
          <Button variant="link" size="sm">
            Criar conta
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Field label="E-mail" type="email" placeholder="voce@exemplo.com" />
        <Field label="Senha" type="password" />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full">Entrar</Button>
      </CardFooter>
    </Card>
  ),
}

export const Indicador: Story = {
  render: () => (
    <Card className="w-72 gap-2">
      <CardHeader>
        <CardDescription>Atendimentos no mês</CardDescription>
        <CardTitle className="typo-sans-3xl-semibold tabular-nums">1.284</CardTitle>
        <CardAction>
          <Badge variant="light" color="green">+12%</Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="typo-sans-sm-regular text-(--color-foreground-muted)">Comparado a outubro</CardFooter>
    </Card>
  ),
}
