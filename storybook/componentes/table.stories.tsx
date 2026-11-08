import type { Meta, StoryObj } from "@storybook/react-vite"
import { FileTextIcon, ImageIcon } from "@phosphor-icons/react"

import { Avatar, AvatarFallback } from "@/registry/servfaz/avatar"
import { Badge } from "@/registry/servfaz/badge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableCellDescription,
  TableCellMedia,
  TableCellMeta,
  TableCellThumbnail,
  TableCellTitle,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/servfaz/table"

const linhas = [
  { nome: "Ana Ribeiro", email: "ana@exemplo.com", perfil: "Administradora", status: "Ativo" },
  { nome: "Caio Quintela", email: "caio@exemplo.com", perfil: "Financeiro", status: "Ativo" },
  { nome: "Elisa Lauda", email: "elisa@exemplo.com", perfil: "Usuária", status: "Inativo" },
]

const meta = {
  title: "Componentes/Table",
  component: Table,
  parameters: { layout: "padded" },
  args: { variant: "card" },
  argTypes: { variant: { control: "inline-radio", options: ["card", "plain"] } },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

/** Exemplo editável pelos controles abaixo. */
export const Playground: Story = {
  render: (args) => (
    <Table {...args}>
      <TableCaption>Usuários com acesso ao sistema.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Perfil</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {linhas.map((linha) => (
          <TableRow key={linha.nome} muted={linha.status === "Inativo"}>
            <TableCell>
              {linha.nome}
              <TableCellDescription>{linha.email}</TableCellDescription>
            </TableCell>
            <TableCell>{linha.perfil}</TableCell>
            <TableCell>
              <Badge variant="dot-ghost" size="lg" color={linha.status === "Ativo" ? "green" : "neutral"}>
                {linha.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const EstadosDaLinha: Story = {
  name: "Estados da linha",
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>Estado</TableHead>
          <TableHead>Uso</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Default</TableCell>
          <TableCell>Passe o mouse para ver o hover.</TableCell>
        </TableRow>
        <TableRow data-state="selected">
          <TableCell>Selecionada</TableCell>
          <TableCell>Linha marcada na seleção.</TableCell>
        </TableRow>
        <TableRow muted>
          <TableCell>Apagada</TableCell>
          <TableCell>Registro inativo ou cancelado.</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

export const CelulasCompostas: Story = {
  name: "Células compostas",
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>Com avatar</TableHead>
          <TableHead>Com miniatura</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <TableCellMedia media={<Avatar><AvatarFallback>AR</AvatarFallback></Avatar>}>
              <TableCellTitle>Ana Ribeiro</TableCellTitle>
              <TableCellMeta>
                ana@exemplo.com
                Membro desde 14 mar. 2025
              </TableCellMeta>
            </TableCellMedia>
          </TableCell>
          <TableCell>
            <TableCellMedia media={<TableCellThumbnail fallback={<ImageIcon />} />}>
              <TableCellTitle>Capa da campanha</TableCellTitle>
              <TableCellMeta>
                <span>Por <strong>Lisa Andrade</strong></span>
                11 mar. 2025
              </TableCellMeta>
            </TableCellMedia>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <TableCellMedia media={<Avatar size="sm"><AvatarFallback>CQ</AvatarFallback></Avatar>}>
              <TableCellTitle>Caio Quintela</TableCellTitle>
              <TableCellDescription>caio@exemplo.com</TableCellDescription>
            </TableCellMedia>
          </TableCell>
          <TableCell>
            <TableCellMedia media={<TableCellThumbnail size="sm" fallback={<FileTextIcon />} />}>
              <TableCellTitle>Contrato.pdf</TableCellTitle>
              <TableCellDescription>2,4 MB</TableCellDescription>
            </TableCellMedia>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}
