import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/servfaz/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/servfaz/dropdown-menu"

type Args = { niveis: string[] }

const meta = {
  title: "Componentes/Breadcrumb",
  component: Breadcrumb,
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<Args>

/** Monta a trilha: todos os níveis viram link, menos o último (página atual). */
function Trilha({ niveis }: Args) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {niveis.map((nivel, index) => {
          const atual = index === niveis.length - 1
          return (
            <React.Fragment key={`${nivel}-${index}`}>
              {index > 0 ? <BreadcrumbSeparator /> : null}
              <BreadcrumbItem>
                {atual ? <BreadcrumbPage>{nivel}</BreadcrumbPage> : <BreadcrumbLink href="#">{nivel}</BreadcrumbLink>}
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {
  args: { niveis: ["Início", "Usuários", "Antônio Dias"] },
  render: (args) => <Trilha {...args} />,
}

export const Niveis: Story = {
  name: "Níveis (1, 2 e 3)",
  render: () => (
    <div className="flex flex-col gap-3">
      <Trilha niveis={["Início"]} />
      <Trilha niveis={["Início", "Usuários"]} />
      <Trilha niveis={["Início", "Usuários", "Antônio Dias"]} />
    </div>
  ),
}

/** A partir de 4 níveis, os do meio ficam nas reticências, que abrem um menu. */
export const QuatroOuMais: Story = {
  name: "4 ou mais níveis",
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Início</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Cadastros</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Mostrar níveis ocultos"
              className="rounded-(--radius-xs) outline-none hover:text-(--color-foreground-emphasis) focus-visible:shadow-[0_0_0_2px_var(--color-brand-border-focus)]"
            >
              <BreadcrumbEllipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <a href="#">Usuários</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="#">Clientes</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Antônio Dias</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

export const TesteReticencias: Story = {
  name: "Teste: abrir níveis ocultos",
  tags: ["!autodocs"],
  render: QuatroOuMais.render,
  play: async ({ canvas, canvasElement, userEvent }) => {
    await expect(canvas.getByText("Antônio Dias")).toHaveAttribute("aria-current", "page")
    await userEvent.click(canvas.getByRole("button", { name: "Mostrar níveis ocultos" }))
    const menu = within(canvasElement.ownerDocument.body)
    await expect(await menu.findByRole("menuitem", { name: "Usuários" })).toBeVisible()
  },
}
