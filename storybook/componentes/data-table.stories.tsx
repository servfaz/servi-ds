import type { Meta, StoryObj } from "@storybook/react-vite"
import type { ColumnDef } from "@tanstack/react-table"
import { expect, within } from "storybook/test"
import {
  CaretRightIcon,
  EnvelopeSimpleIcon,
  KeyboardIcon,
  KeyIcon,
  NotePencilIcon,
  PencilSimpleIcon,
  PlantIcon,
  PlusIcon,
  TrashIcon,
  UserIcon,
  UserPlusIcon,
  VideoCameraIcon,
} from "@phosphor-icons/react"

import { Avatar, AvatarFallback, AvatarGroup } from "@/registry/servfaz/avatar"
import { Badge, type BadgeProps } from "@/registry/servfaz/badge"
import { Button } from "@/registry/servfaz/button"
import {
  DataTable,
  DataTableColumnHeader,
  DataTableRowActions,
  type DataTableFilter,
} from "@/registry/servfaz/data-table"
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/registry/servfaz/dropdown-menu"
import { Progress } from "@/registry/servfaz/progress"
import { Switch } from "@/registry/servfaz/switch"
import {
  TableCellDescription,
  TableCellMedia,
  TableCellMeta,
  TableCellThumbnail,
  TableCellTitle,
} from "@/registry/servfaz/table"
import { Tabs, TabsList, TabsTrigger } from "@/registry/servfaz/tabs"

/* ------------------------------------------------------------------ */
/* Gestão de usuários: busca, filtros, seleção, expandir, ações        */
/* ------------------------------------------------------------------ */

type Status = "Ativo" | "Aguardando aprovação" | "Inativo" | "Cancelado" | "Recusado"

type Usuario = {
  id: string
  nome: string
  telefone: string
  email: string
  unidades: string[]
  perfis: string[]
  status: Status
  ativo: boolean
}

const usuarios: Usuario[] = [
  { id: "1", nome: "Antônio Dias", telefone: "(86) 5555-0124", email: "antonio@exemplo.com", unidades: ["Unidade Centro"], perfis: ["Financeiro", "Usuário"], status: "Aguardando aprovação", ativo: true },
  { id: "2", nome: "Nicolas Prado", telefone: "(86) 5555-0187", email: "nicolas@exemplo.com", unidades: ["Unidade Jóquei", "Unidade Centro", "Unidade Sul"], perfis: ["Usuário", "Administrador", "Financeiro"], status: "Ativo", ativo: true },
  { id: "3", nome: "Marina Alves", telefone: "(86) 5555-0142", email: "marina@exemplo.com", unidades: ["Unidade Leste", "Unidade Sul", "Unidade Norte", "Unidade Centro"], perfis: ["Usuário"], status: "Cancelado", ativo: false },
  { id: "4", nome: "Eduardo Paiva", telefone: "(86) 5555-0199", email: "eduardo@exemplo.com", unidades: ["Unidade Norte"], perfis: ["Administrador"], status: "Recusado", ativo: true },
  { id: "5", nome: "Júlia Bandeira", telefone: "(86) 5555-0113", email: "julia@exemplo.com", unidades: ["Unidade Sul", "Unidade Leste", "Unidade Jóquei"], perfis: ["Usuário"], status: "Inativo", ativo: false },
  { id: "6", nome: "Miguel Santos", telefone: "(86) 5555-0156", email: "miguel@exemplo.com", unidades: ["Unidade Jóquei"], perfis: ["Administrador"], status: "Ativo", ativo: true },
]

const corDoStatus: Record<Status, NonNullable<BadgeProps["color"]>> = {
  Ativo: "green",
  "Aguardando aprovação": "amber",
  Inativo: "neutral",
  Cancelado: "neutral",
  Recusado: "red",
}

const colunasUsuarios: ColumnDef<Usuario>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nome" />,
    cell: ({ row }) => (
      <div>
        {row.original.nome}
        <TableCellDescription>{row.original.telefone}</TableCellDescription>
      </div>
    ),
  },
  {
    accessorKey: "unidades",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Unidades" />,
    sortingFn: (a, b) => a.original.unidades[0].localeCompare(b.original.unidades[0]),
    cell: ({ row }) => {
      const [primeira, ...resto] = row.original.unidades
      return (
        <div className="flex items-center gap-2">
          <Switch size="sm" defaultChecked={row.original.ativo} aria-label={`Acesso a ${primeira}`} />
          <span className="flex-1">{primeira}</span>
          {resto.length > 0 ? <Badge variant="secondary">+{resto.length}</Badge> : null}
        </div>
      )
    },
  },
  {
    accessorKey: "perfis",
    header: "Perfil",
    enableSorting: false,
    getUniqueValues: (usuario) => usuario.perfis,
    cell: ({ row }) => (
      <div className="flex flex-col">
        {row.original.perfis.map((perfil) => (
          <span key={perfil}>{perfil}</span>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: false,
    cell: ({ row }) => (
      <Badge variant="dot-ghost" size="lg" color={corDoStatus[row.original.status]}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "acoes",
    enableSorting: false,
    header: () => <span className="sr-only">Ações</span>,
    meta: { cellClassName: "w-px whitespace-nowrap" },
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        {row.original.status === "Aguardando aprovação" ? (
          <Button variant="outline" size="sm" className="-my-1.5">
            Aprovar
          </Button>
        ) : null}
        <DataTableRowActions label={`Ações de ${row.original.nome}`}>
          <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
            Ativo
            <Switch size="sm" className="ml-auto" defaultChecked={row.original.ativo} aria-label="Ativo" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <PencilSimpleIcon />
            Editar perfil
          </DropdownMenuItem>
          <DropdownMenuItem>
            <KeyIcon />
            Redefinir senha
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <TrashIcon />
            Excluir
          </DropdownMenuItem>
        </DataTableRowActions>
      </div>
    ),
  },
]

const filtrosUsuarios: DataTableFilter[] = [
  {
    columnId: "status",
    title: "Status",
    options: (["Ativo", "Aguardando aprovação", "Inativo", "Cancelado", "Recusado"] as const).map(
      (status) => ({ label: status, value: status })
    ),
  },
  {
    columnId: "perfis",
    title: "Perfil",
    options: ["Administrador", "Financeiro", "Usuário"].map((perfil) => ({ label: perfil, value: perfil })),
  },
]

function DetalheDoUsuario({ usuario }: { usuario: Usuario }) {
  const itens = [
    ["E-mail", usuario.email],
    ["Unidades", usuario.unidades.join(", ")],
    ["Perfis", usuario.perfis.join(", ")],
  ]
  return (
    <dl className="grid gap-4 pl-[4.5rem] sm:grid-cols-3">
      {itens.map(([rotulo, valor]) => (
        <div key={rotulo} className="flex flex-col gap-0.5">
          <dt className="typo-sans-xs-medium text-(--color-foreground-muted)">{rotulo}</dt>
          <dd className="typo-sans-sm-regular text-(--color-foreground-emphasis)">{valor}</dd>
        </div>
      ))}
    </dl>
  )
}

type PlaygroundArgs = {
  selectable: boolean
  toolbar: boolean
  search: boolean
  searchPlaceholder: string
  variant: "card" | "plain"
  expansivel: boolean
  comFiltros: boolean
}

const meta = {
  title: "Componentes/Data Table",
  component: DataTable,
  parameters: { layout: "padded" },
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<PlaygroundArgs>

function TabelaDeUsuarios(args: PlaygroundArgs) {
  return (
    <DataTable
      columns={colunasUsuarios}
      data={usuarios}
      getRowId={(usuario) => usuario.id}
      selectable={args.selectable}
      toolbar={args.toolbar}
      search={args.search}
      searchPlaceholder={args.searchPlaceholder}
      variant={args.variant}
      filters={args.comFiltros ? filtrosUsuarios : []}
      isRowMuted={(usuario) => usuario.status === "Inativo" || usuario.status === "Cancelado"}
      renderSubRow={args.expansivel ? (row) => <DetalheDoUsuario usuario={row.original} /> : undefined}
      toolbarStart={
        <Tabs defaultValue="clientes">
          <TabsList aria-label="Tipo de usuário">
            <TabsTrigger value="clientes">Clientes</TabsTrigger>
            <TabsTrigger value="funcionarios">Funcionários</TabsTrigger>
          </TabsList>
        </Tabs>
      }
      actions={
        <Button size="lg">
          Adicionar cliente
          <PlusIcon />
        </Button>
      }
      selectionActions={() => (
        <>
          <Button variant="outline" size="sm">
            Exportar
          </Button>
          <Button variant="destructive" size="sm">
            Excluir
          </Button>
        </>
      )}
    />
  )
}

/** Gestão de usuários. Edite pelos controles abaixo. */
export const Playground: Story = {
  args: {
    selectable: true,
    toolbar: true,
    search: true,
    searchPlaceholder: "Buscar clientes...",
    variant: "card",
    expansivel: true,
    comFiltros: true,
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["card", "plain"] },
    expansivel: { name: "linha expansível" },
    comFiltros: { name: "botão de filtros" },
  },
  render: (args) => <TabelaDeUsuarios {...args} />,
}

/* ------------------------------------------------------------------ */
/* Membros: avatar, status com ponto, ícone e link                     */
/* ------------------------------------------------------------------ */

type Membro = {
  id: string
  nome: string
  email: string
  desde: string
  plano: "Gratuito" | "Pago"
  nivel?: string
  emails: number
  evento: "Cadastro" | "Assinou a newsletter"
}

const membros: Membro[] = [
  { id: "1", nome: "Amanda Rocha", email: "amanda@exemplo.com", desde: "11 mar. 2025", plano: "Gratuito", emails: 94, evento: "Cadastro" },
  { id: "2", nome: "Caio Quintela", email: "caio@exemplo.com", desde: "10 mar. 2025", plano: "Pago", nivel: "Plano ouro", emails: 86, evento: "Cadastro" },
  { id: "3", nome: "Ana Ribeiro", email: "ana@exemplo.com", desde: "14 mar. 2025", plano: "Pago", nivel: "Plano prata", emails: 89, evento: "Cadastro" },
  { id: "4", nome: "Elisa Lauda", email: "elisa@exemplo.com", desde: "24 mar. 2025", plano: "Gratuito", emails: 78, evento: "Assinou a newsletter" },
  { id: "5", nome: "Lisa Andrade", email: "lisa@exemplo.com", desde: "23 mar. 2025", plano: "Gratuito", emails: 85, evento: "Assinou a newsletter" },
]

function iniciais(nome: string) {
  return nome
    .split(" ")
    .map((parte) => parte[0])
    .slice(0, 2)
    .join("")
}

const colunasMembros: ColumnDef<Membro>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Membro" />,
    cell: ({ row }) => (
      <TableCellMedia
        media={
          <Avatar>
            <AvatarFallback>{row.index === 4 ? <UserIcon /> : iniciais(row.original.nome)}</AvatarFallback>
          </Avatar>
        }
      >
        <TableCellTitle>{row.original.nome}</TableCellTitle>
        <TableCellMeta>
          {row.original.email}
          {`Membro desde ${row.original.desde}`}
        </TableCellMeta>
      </TableCellMedia>
    ),
  },
  {
    accessorKey: "plano",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <Badge variant="dot-ghost" size="lg" color={row.original.plano === "Pago" ? "purple" : "indigo"}>
          {row.original.plano === "Pago" ? "Membro pago" : "Membro gratuito"}
        </Badge>
        {row.original.nivel ? (
          <TableCellDescription className="pl-3 typo-sans-xs-regular">{row.original.nivel}</TableCellDescription>
        ) : null}
      </div>
    ),
  },
  {
    accessorKey: "emails",
    header: ({ column }) => <DataTableColumnHeader column={column} title="E-mails abertos" />,
    cell: ({ row }) => <span className="tabular-nums">{row.original.emails}</span>,
  },
  {
    accessorKey: "evento",
    header: "Evento",
    cell: ({ row }) => (
      <span className="flex items-center gap-1.5 [&_svg]:size-4 [&_svg]:text-(--color-foreground-muted)">
        {row.original.evento === "Cadastro" ? <UserPlusIcon /> : <EnvelopeSimpleIcon />}
        {row.original.evento}
      </span>
    ),
  },
  {
    id: "detalhes",
    header: () => <span className="sr-only">Detalhes</span>,
    meta: { cellClassName: "w-px text-right" },
    cell: ({ row }) => (
      <Button variant="link" size="sm" aria-label={`Detalhes de ${row.original.nome}`}>
        Detalhes
        <CaretRightIcon />
      </Button>
    ),
  },
]

export const Membros: Story = {
  name: "Membros (avatar e status)",
  render: () => (
    <DataTable
      columns={colunasMembros}
      data={membros}
      getRowId={(membro) => membro.id}
      searchPlaceholder="Buscar membros..."
      filters={[
        {
          columnId: "plano",
          title: "Plano",
          options: [
            { label: "Gratuito", value: "Gratuito" },
            { label: "Pago", value: "Pago" },
          ],
        },
      ]}
    />
  ),
}

/* ------------------------------------------------------------------ */
/* Projetos: tags, grupo de avatares e progresso                       */
/* ------------------------------------------------------------------ */

type Projeto = {
  id: string
  nome: string
  area: string
  tags: string[]
  pessoas: string[]
  etapas: [number, number]
  prazo: string
  prazoOrdem: number
}

const projetos: Projeto[] = [
  { id: "1", nome: "Melhorar a interface do site", area: "Site", tags: ["SaaS", "TI", "Tecnologia", "B2B"], pessoas: ["Lara Mota", "Leo Brito", "Iris Sá", "Otto Reis", "Ana Lins"], etapas: [1, 5], prazo: "10 abr. 2026", prazoOrdem: 20260410 },
  { id: "2", nome: "Auditoria interna de UX", area: "Site", tags: ["E-commerce", "Loja"], pessoas: ["Rui Lopes", "Leo Brito"], etapas: [3, 5], prazo: "5 mai. 2026", prazoOrdem: 20260505 },
  { id: "3", nome: "Novo fluxo de cadastro", area: "Aplicativo", tags: ["Mobile"], pessoas: ["Iris Sá", "Ana Lins", "Otto Reis"], etapas: [5, 5], prazo: "18 mar. 2026", prazoOrdem: 20260318 },
]

const colunasProjetos: ColumnDef<Projeto>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nome" />,
    cell: ({ row }) => (
      <div>
        <TableCellTitle>{row.original.nome}</TableCellTitle>
        <TableCellDescription>{row.original.area}</TableCellDescription>
      </div>
    ),
  },
  {
    accessorKey: "tags",
    header: "Tags",
    enableSorting: false,
    getUniqueValues: (projeto) => projeto.tags,
    meta: { cellClassName: "max-w-48" },
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1.5">
        {row.original.tags.map((tag) => (
          <Badge key={tag} variant="secondary" shape="tag" className="py-1">
            {tag}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "pessoas",
    header: "Responsáveis",
    enableSorting: false,
    cell: ({ row }) => (
      <AvatarGroup max={3} size="sm" aria-label={row.original.pessoas.join(", ")}>
        {row.original.pessoas.map((pessoa) => (
          <Avatar key={pessoa}>
            <AvatarFallback>{iniciais(pessoa)}</AvatarFallback>
          </Avatar>
        ))}
      </AvatarGroup>
    ),
  },
  {
    id: "progresso",
    accessorFn: (projeto) => projeto.etapas[0] / projeto.etapas[1],
    header: ({ column }) => <DataTableColumnHeader column={column} title="Progresso" />,
    enableGlobalFilter: false,
    cell: ({ row }) => {
      const [feitas, total] = row.original.etapas
      return (
        <Progress
          value={(feitas / total) * 100}
          label={`${feitas}/${total}`}
          color={feitas === total ? "success" : "neutral"}
          aria-label={`${feitas} de ${total} etapas`}
          containerClassName="w-32"
        />
      )
    },
  },
  {
    id: "prazo",
    accessorFn: (projeto) => projeto.prazoOrdem,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Prazo" />,
    enableGlobalFilter: false,
    cell: ({ row }) => row.original.prazo,
  },
]

export const Projetos: Story = {
  name: "Projetos (tags, avatares e progresso)",
  render: () => (
    <DataTable
      columns={colunasProjetos}
      data={projetos}
      getRowId={(projeto) => projeto.id}
      selectable
      searchPlaceholder="Buscar projetos..."
      filters={[
        {
          columnId: "tags",
          title: "Tags",
          options: ["SaaS", "TI", "Tecnologia", "B2B", "E-commerce", "Loja", "Mobile"].map((tag) => ({
            label: tag,
            value: tag,
          })),
        },
      ]}
    />
  ),
}

/* ------------------------------------------------------------------ */
/* Publicações: miniatura, título e metadados                          */
/* ------------------------------------------------------------------ */

type Publicacao = {
  id: string
  titulo: string
  autor: string
  data: string
  icone: React.ReactNode
  status: "Publicado" | "Rascunho"
}

const publicacoes: Publicacao[] = [
  { id: "1", titulo: "Boas práticas de marketing em vídeo", autor: "Lisa Andrade", data: "11 mar. 2025", icone: <VideoCameraIcon />, status: "Publicado" },
  { id: "2", titulo: "Técnicas de crescimento", autor: "Daniel Pires", data: "10 mar. 2025", icone: <PlantIcon />, status: "Publicado" },
  { id: "3", titulo: "Conteúdo gerado com IA", autor: "Alex Moura", data: "14 mar. 2025", icone: <KeyboardIcon />, status: "Rascunho" },
  { id: "4", titulo: "10 dicas para posts que engajam", autor: "Joana Souza", data: "24 mar. 2025", icone: <NotePencilIcon />, status: "Publicado" },
]

const colunasPublicacoes: ColumnDef<Publicacao>[] = [
  {
    accessorKey: "titulo",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Título" />,
    cell: ({ row }) => (
      <TableCellMedia media={<TableCellThumbnail fallback={row.original.icone} />}>
        <TableCellTitle className="typo-sans-md-semibold">{row.original.titulo}</TableCellTitle>
        <TableCellMeta>
          <span>
            Por <strong>{row.original.autor}</strong>
          </span>
          {row.original.data}
        </TableCellMeta>
      </TableCellMedia>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="light" color={row.original.status === "Publicado" ? "green" : "neutral"}>
        {row.original.status}
      </Badge>
    ),
  },
]

export const Publicacoes: Story = {
  name: "Publicações (miniatura)",
  render: () => (
    <DataTable
      columns={colunasPublicacoes}
      data={publicacoes}
      getRowId={(publicacao) => publicacao.id}
      searchPlaceholder="Buscar publicações..."
    />
  ),
}

export const Vazia: Story = {
  name: "Sem resultados",
  render: () => <DataTable columns={colunasPublicacoes} data={[]} searchPlaceholder="Buscar publicações..." />,
}

/* ------------------------------------------------------------------ */
/* Testes de interação                                                 */
/* ------------------------------------------------------------------ */

const argsDeTeste = Playground.args as PlaygroundArgs

export const TesteSelecao: Story = {
  name: "Teste: marcar todas e marcar uma",
  tags: ["!autodocs"],
  render: () => <TabelaDeUsuarios {...argsDeTeste} />,
  play: async ({ canvas, userEvent }) => {
    const todas = canvas.getByRole("checkbox", { name: "Selecionar todas as linhas" })
    await userEvent.click(todas)
    await expect(canvas.getByText(`${usuarios.length} selecionadas`)).toBeInTheDocument()
    await userEvent.click(canvas.getAllByRole("checkbox", { name: "Selecionar linha" })[0])
    await expect(todas).toHaveAttribute("aria-checked", "mixed")
    await userEvent.click(canvas.getByRole("button", { name: "Limpar seleção" }))
    await expect(todas).toHaveAttribute("aria-checked", "false")
  },
}

export const TesteBusca: Story = {
  name: "Teste: busca",
  tags: ["!autodocs"],
  render: () => <TabelaDeUsuarios {...argsDeTeste} />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("searchbox"), "Nicolas")
    await expect(canvas.getByText("Nicolas Prado")).toBeInTheDocument()
    await expect(canvas.queryByText("Antônio Dias")).not.toBeInTheDocument()
    await userEvent.clear(canvas.getByRole("searchbox"))
    await userEvent.type(canvas.getByRole("searchbox"), "xyz")
    await expect(canvas.getByText("Nenhum resultado encontrado.")).toBeInTheDocument()
  },
}

export const TesteFiltro: Story = {
  name: "Teste: filtro por status",
  tags: ["!autodocs"],
  render: () => <TabelaDeUsuarios {...argsDeTeste} />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /Filtros/ }))
    const painel = within(canvasElement.ownerDocument.body)
    await userEvent.click(await painel.findByRole("checkbox", { name: "Recusado" }))
    await expect(canvas.getByText("Eduardo Paiva")).toBeInTheDocument()
    await expect(canvas.queryByText("Nicolas Prado")).not.toBeInTheDocument()
    await expect(canvas.getByLabelText("1 filtro ativo")).toBeInTheDocument()
    await userEvent.click(painel.getByRole("button", { name: "Limpar filtros" }))
    await expect(canvas.getByText("Nicolas Prado")).toBeInTheDocument()
  },
}

export const TesteExpandir: Story = {
  name: "Teste: expandir linha",
  tags: ["!autodocs"],
  render: () => <TabelaDeUsuarios {...argsDeTeste} />,
  play: async ({ canvas, userEvent }) => {
    const botao = canvas.getAllByRole("button", { name: "Expandir linha" })[0]
    await userEvent.click(botao)
    await expect(canvas.getByText("antonio@exemplo.com")).toBeInTheDocument()
    await userEvent.click(canvas.getByRole("button", { name: "Recolher linha" }))
    await expect(canvas.queryByText("antonio@exemplo.com")).not.toBeInTheDocument()
  },
}
