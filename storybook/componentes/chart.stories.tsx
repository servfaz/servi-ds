import type { Meta, StoryObj } from "@storybook/react-vite"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/registry/servfaz/chart"

const dados = [
  { mes: "Jun", presencial: 186, online: 80 },
  { mes: "Jul", presencial: 305, online: 200 },
  { mes: "Ago", presencial: 237, online: 120 },
  { mes: "Set", presencial: 173, online: 190 },
  { mes: "Out", presencial: 209, online: 230 },
  { mes: "Nov", presencial: 214, online: 260 },
]

const config = {
  presencial: { label: "Presencial", color: "var(--color-brand-filled)" },
  online: { label: "Online", color: "var(--color-palette-sky-filled)" },
} satisfies ChartConfig

const meta = {
  title: "Componentes/Chart",
  component: ChartContainer,
  args: { config, children: <></> },
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChartContainer>

export default meta
type Story = StoryObj<typeof meta>

/** Barras agrupadas, com tooltip e legenda. */
export const Playground: Story = {
  render: () => (
    <ChartContainer config={config} className="h-64 w-full max-w-xl">
      <BarChart accessibilityLayer data={dados}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="mes" tickLine={false} tickMargin={10} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="presencial" fill="var(--color-presencial)" radius={4} />
        <Bar dataKey="online" fill="var(--color-online)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
}

export const Linha: Story = {
  render: () => (
    <ChartContainer config={config} className="h-64 w-full max-w-xl">
      <LineChart accessibilityLayer data={dados} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <Line dataKey="presencial" type="monotone" stroke="var(--color-presencial)" strokeWidth={2} dot={false} />
        <Line dataKey="online" type="monotone" stroke="var(--color-online)" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  ),
}

export const Area_: Story = {
  name: "Área",
  render: () => (
    <ChartContainer config={config} className="h-64 w-full max-w-xl">
      <AreaChart accessibilityLayer data={dados} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <Area dataKey="online" type="natural" fill="var(--color-online)" fillOpacity={0.3} stroke="var(--color-online)" stackId="a" />
        <Area dataKey="presencial" type="natural" fill="var(--color-presencial)" fillOpacity={0.3} stroke="var(--color-presencial)" stackId="a" />
      </AreaChart>
    </ChartContainer>
  ),
}
