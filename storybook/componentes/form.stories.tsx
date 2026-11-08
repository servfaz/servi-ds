import type { Meta, StoryObj } from "@storybook/react-vite"
import { useForm } from "react-hook-form"
import { expect } from "storybook/test"

import { Button } from "@/registry/servfaz/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/servfaz/form"
import { Input } from "@/registry/servfaz/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/servfaz/select"
import { Switch } from "@/registry/servfaz/switch"

type Valores = { nome: string; email: string; unidade: string; avisos: boolean }

function Cadastro() {
  const form = useForm<Valores>({ defaultValues: { nome: "", email: "", unidade: "", avisos: true } })
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})} className="flex w-80 flex-col gap-5" noValidate>
        <FormField
          control={form.control}
          name="nome"
          rules={{ required: "Informe o nome." }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "Informe o e-mail.",
            pattern: { value: /\S+@\S+\.\S+/, message: "E-mail inválido." },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input type="email" placeholder="voce@exemplo.com" {...field} />
              </FormControl>
              <FormDescription>Usado para entrar no sistema.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unidade"
          rules={{ required: "Escolha uma unidade." }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unidade</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Escolha uma unidade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="centro">Unidade Centro</SelectItem>
                  <SelectItem value="joquei">Unidade Jóquei</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avisos"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between gap-3">
              <FormLabel>Receber avisos por e-mail</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Cadastrar</Button>
      </form>
    </Form>
  )
}

const meta = {
  title: "Componentes/Form",
  component: Form,
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj

/** Formulário com validação. Envie vazio para ver os erros. */
export const Playground: Story = {
  render: () => <Cadastro />,
}

export const TesteValidacao: Story = {
  name: "Teste: erros ao enviar vazio",
  tags: ["!autodocs"],
  render: () => <Cadastro />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Cadastrar" }))
    await expect(await canvas.findByText("Informe o nome.")).toBeVisible()
    await expect(canvas.getByLabelText("Nome")).toHaveAttribute("aria-invalid", "true")
    await userEvent.type(canvas.getByLabelText("Nome"), "Ana")
    await expect(canvas.queryByText("Informe o nome.")).not.toBeInTheDocument()
  },
}
