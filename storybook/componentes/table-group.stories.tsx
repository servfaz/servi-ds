import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import type { ColumnDef } from "@tanstack/react-table"
import {
  BugIcon,
  ClipboardTextIcon,
  KanbanIcon,
  MagnifyingGlassIcon,
  RocketLaunchIcon,
  SlidersHorizontalIcon,
  TestTubeIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react"

import { Avatar, AvatarFallback, AvatarGroup } from "@/registry/servfaz/avatar"
import { Badge, type BadgeProps } from "@/registry/servfaz/badge"
import { Button } from "@/registry/servfaz/button"
import { DataTable, DataTableColumnHeader } from "@/registry/servfaz/data-table"
import { Input } from "@/registry/servfaz/input"
import { Progress, type ProgressProps } from "@/registry/servfaz/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/servfaz/table"
import {
  TableGroup,
  TableGroupActions,
  TableGroupContent,
  TableGroupCount,
  TableGroupHeader,
  TableGroupItem,
  TableGroupTitle,
} from "@/registry/servfaz/table-group"
import { Tabs, TabsList, TabsTrigger } from "@/registry/servfaz/tabs"

type Tipo = "Funcionalidade" | "Bug" | "Revisão" | "Teste"
type Prioridade = "Alta" | "Média" | "Baixa"

type Tarefa = {
  id: string
  nome: string
  pessoas: string[]
  tipo: Tipo
  periodo: string
  prioridade: Prioridade
  progresso: number
}

type Grupo = { id: string; titulo: string; tarefas: Tarefa[] }

const grupos: Grupo[] = [
  {
    id: "login",
    titulo: "Refatorar o fluxo de login",
    tarefas: [
      { id: "1", nome: "Separar a interface da lógica de autenticação", pessoas: ["Ana Lins", "Rui Lopes", "Iris Sá", "Otto Reis"], tipo: "Funcionalidade", periodo: "24 jun. a 3 jul. 2026", prioridade: "Alta", progresso: 40 },
      { id: "2", nome: "Migrar a sessão para token", pessoas: ["Leo Brito", "Lara Mota"], tipo: "Bug", periodo: "29 jun. a 7 jul. 2026", prioridade: "Alta", progresso: 30 },
      { id: "3", nome: "Tratar erro de login que falhou", pessoas: ["Iris Sá", "Ana Lins", "Rui Lopes"], tipo: "Revisão", periodo: "2 a 5 jul. 2026", prioridade: "Média", progresso: 20 },
      { id: "4", nome: "Atualizar os testes do módulo de login", pessoas: ["Otto Reis", "Lara Mota"], tipo: "Teste", periodo: "6 a 8 jul. 2026", prioridade: "Baixa", progresso: 40 },
    ],
  },
  {
    id: "desempenho",
    titulo: "Otimizar a lista de tarefas",
    tarefas: [
      { id: "5", nome: "Rolagem virtual em listas grandes", pessoas: ["Rui Lopes", "Leo Brito", "Iris Sá", "Ana Lins"], tipo: "Funcionalidade", periodo: "5 a 6 jul. 2026", prioridade: "Alta", progresso: 40 },
      { id: "6", nome: "Atrasar a busca enquanto a pessoa digita", pessoas: ["Lara Mota", "Otto Reis"], tipo: "Bug", periodo: "5 a 6 jul. 2026", prioridade: "Alta", progresso: 30 },
      { id: "7", nome: "Carregar comentários sob demanda", pessoas: ["Ana Lins", "Iris Sá", "Leo Brito"], tipo: "Revisão", periodo: "8 a 9 jul. 2026", prioridade: "Média", progresso: 20 },
      { id: "8", nome: "Reduzir renderizações das linhas", pessoas: ["Rui Lopes", "Otto Reis"], tipo: "Teste", periodo: "10 a 12 jul. 2026", prioridade: "Baixa", progresso: 40 },
      { id: "9", nome: "Wireframes do novo layout", pessoas: ["Lara Mota", "Iris Sá", "Ana Lins"], tipo: "Teste", periodo: "6 a 8 jul. 2026", prioridade: "Baixa", progresso: 40 },
    ],
  },
]

const iconeDoTipo: Record<Tipo, React.ReactNode> = {
  Funcionalidade: <RocketLaunchIcon />,
  Bug: <BugIcon />,
  Revisão: <MagnifyingGlassIcon />,
  Teste: <TestTubeIcon />,
}

const corDaPrioridade: Record<Prioridade, NonNullable<BadgeProps["color"]>> = {
  Alta: "red",
  Média: "amber",
  Baixa: "pink",
}

function corDoProgresso(valor: number): NonNullable<ProgressProps["color"]> {
  if (valor >= 40) return "success"
  if (valor >= 30) return "warning"
  return "danger"
}

function iniciais(nome: string) {
  return nome
    .split(" ")
    .map((parte) => parte[0])
    .join("")
}

/* Células reaproveitadas pelas duas stories. */

function Pessoas({ pessoas }: { pessoas: string[] }) {
  return (
    <AvatarGroup size="xs" aria-label={pessoas.join(", ")}>
      {pessoas.map((pessoa) => (
        <Avatar key={pessoa}>
          <AvatarFallback>{iniciais(pessoa)}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  )
}

function TipoBadge({ tipo }: { tipo: Tipo }) {
  return (
    <Badge variant="outline">
      {iconeDoTipo[tipo]}
      {tipo}
    </Badge>
  )
}

function PrioridadeBadge({ prioridade }: { prioridade: Prioridade }) {
  return (
    <Badge variant="light" color={corDaPrioridade[prioridade]}>
      {prioridade}
    </Badge>
  )
}

function Avanco({ valor }: { valor: number }) {
  return (
    <Progress
      value={valor}
      label={`${valor}%`}
      color={corDoProgresso(valor)}
      aria-label={`${valor}% concluído`}
      containerClassName="w-28"
    />
  )
}

const meta = {
  title: "Componentes/Table Group",
  component: TableGroup,
  parameters: { layout: "padded" },
} satisfies Meta<typeof TableGroup>

export default meta
type Story = StoryObj<typeof meta>

/** Tabelas agrupadas com o Table simples: o conteúdo de cada seção é livre. */
export const Playground: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Tabs variant="line" defaultValue="tarefas">
        <TabsList aria-label="Visões do time">
          <TabsTrigger value="quadro">
            <KanbanIcon />
            Quadro
          </TabsTrigger>
          <TabsTrigger value="time">
            <UsersThreeIcon />
            Visão do time
          </TabsTrigger>
          <TabsTrigger value="tarefas">
            <ClipboardTextIcon />
            Todas as tarefas
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <TableGroup>
        {grupos.map((grupo) => (
          <TableGroupItem key={grupo.id} aria-labelledby={`grupo-${grupo.id}`}>
            <TableGroupHeader>
              <TableGroupTitle id={`grupo-${grupo.id}`}>{grupo.titulo}</TableGroupTitle>
              <TableGroupCount icon={<ClipboardTextIcon />} aria-label={`${grupo.tarefas.length} tarefas`}>
                {grupo.tarefas.length}
              </TableGroupCount>
              <TableGroupActions>
                <Button variant="outline" size="sm">
                  <SlidersHorizontalIcon />
                  Filtrar
                </Button>
              </TableGroupActions>
            </TableGroupHeader>
            <TableGroupContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tarefa</TableHead>
                    <TableHead>Pessoas</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead>Prioridade</TableHead>
                    <TableHead>Progresso</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grupo.tarefas.map((tarefa) => (
                    <TableRow key={tarefa.id}>
                      <TableCell>{tarefa.nome}</TableCell>
                      <TableCell>
                        <Pessoas pessoas={tarefa.pessoas} />
                      </TableCell>
                      <TableCell>
                        <TipoBadge tipo={tarefa.tipo} />
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{tarefa.periodo}</TableCell>
                      <TableCell>
                        <PrioridadeBadge prioridade={tarefa.prioridade} />
                      </TableCell>
                      <TableCell>
                        <Avanco valor={tarefa.progresso} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableGroupContent>
          </TableGroupItem>
        ))}
      </TableGroup>
    </div>
  ),
}

const colunas: ColumnDef<Tarefa>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tarefa" />,
  },
  {
    accessorKey: "pessoas",
    header: "Pessoas",
    enableSorting: false,
    cell: ({ row }) => <Pessoas pessoas={row.original.pessoas} />,
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
    cell: ({ row }) => <TipoBadge tipo={row.original.tipo} />,
  },
  {
    accessorKey: "periodo",
    header: "Período",
    enableSorting: false,
    meta: { cellClassName: "whitespace-nowrap" },
  },
  {
    accessorKey: "prioridade",
    header: "Prioridade",
    cell: ({ row }) => <PrioridadeBadge prioridade={row.original.prioridade} />,
  },
  {
    accessorKey: "progresso",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Progresso" />,
    enableGlobalFilter: false,
    cell: ({ row }) => <Avanco valor={row.original.progresso} />,
  },
]

function GruposComBusca() {
  const [busca, setBusca] = React.useState("")
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="typo-sans-lg-medium text-(--color-foreground-emphasis)">Todas as tarefas</h2>
        <Input
          role="searchbox"
          aria-label="Buscar tarefas"
          placeholder="Buscar tarefas..."
          value={busca}
          onChange={(event) => setBusca(event.currentTarget.value)}
          leftIcon={<MagnifyingGlassIcon />}
          className="w-full sm:w-64"
        />
      </div>
      <TableGroup>
        {grupos.map((grupo) => (
          <TableGroupItem key={grupo.id}>
            <DataTable
              columns={colunas}
              data={grupo.tarefas}
              getRowId={(tarefa) => tarefa.id}
              globalFilter={busca}
              selectable
              className="gap-2"
              toolbarClassName="px-2"
              toolbarStart={
                <>
                  <TableGroupTitle>{grupo.titulo}</TableGroupTitle>
                  <TableGroupCount icon={<ClipboardTextIcon />}>{grupo.tarefas.length}</TableGroupCount>
                </>
              }
              filters={[
                {
                  columnId: "prioridade",
                  title: "Prioridade",
                  options: (["Alta", "Média", "Baixa"] as const).map((p) => ({ label: p, value: p })),
                },
                {
                  columnId: "tipo",
                  title: "Tipo",
                  options: (Object.keys(iconeDoTipo) as Tipo[]).map((tipo) => ({
                    label: tipo,
                    value: tipo,
                    icon: iconeDoTipo[tipo],
                  })),
                },
              ]}
            />
          </TableGroupItem>
        ))}
      </TableGroup>
    </div>
  )
}

/**
 * Cada seção com um Data Table: filtros, ordenação e seleção por grupo,
 * e uma busca só que filtra todos os grupos.
 */
export const ComDataTable: Story = {
  name: "Com Data Table (busca única e filtro por grupo)",
  render: () => <GruposComBusca />,
}
