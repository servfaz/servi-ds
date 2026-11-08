import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/registry/servfaz/navigation-menu"

const produtos = [
  { titulo: "Atendimento", descricao: "Fila, chamados e histórico de clientes." },
  { titulo: "Financeiro", descricao: "Cobranças, repasses e relatórios." },
  { titulo: "Estoque", descricao: "Entradas, saídas e inventário." },
  { titulo: "Relatórios", descricao: "Painéis com os números de cada área." },
]

const meta = {
  title: "Componentes/Navigation Menu",
  component: NavigationMenu,
  parameters: { layout: "padded" },
} satisfies Meta<typeof NavigationMenu>

export default meta
type Story = StoryObj<typeof meta>

/** Navegação de site com painel. */
export const Playground: Story = {
  render: (args) => (
    <div className="flex min-h-72 justify-center">
      <NavigationMenu {...args}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Produtos</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[min(28rem,90vw)] gap-1 sm:grid-cols-2">
                {produtos.map((produto) => (
                  <li key={produto.titulo}>
                    <NavigationMenuLink href="#">
                      <span className="typo-sans-sm-medium">{produto.titulo}</span>
                      <span className="typo-sans-sm-regular text-(--color-foreground-muted)">{produto.descricao}</span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
              Preços
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
              Contato
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
}
