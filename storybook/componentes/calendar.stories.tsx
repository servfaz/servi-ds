import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import type { DateRange } from "react-day-picker"

import { Calendar } from "@/registry/servfaz/calendar"

const meta = {
  title: "Componentes/Calendar",
  component: Calendar,
  args: { captionLayout: "label", showOutsideDays: true },
  argTypes: { captionLayout: { control: "inline-radio", options: ["label", "dropdown"] } },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

function Unico(props: React.ComponentProps<typeof Calendar>) {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 10, 12))
  return (
    <Calendar
      {...props}
      mode="single"
      selected={date}
      onSelect={setDate}
      defaultMonth={new Date(2026, 10, 1)}
      className="rounded-(--radius-xl) border border-(--color-border-default) shadow-xs"
    />
  )
}

/** Uma data. */
export const Playground: Story = {
  render: (args) => <Unico {...args} />,
}

function Periodo() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 10, 9),
    to: new Date(2026, 10, 18),
  })
  return (
    <Calendar
      mode="range"
      numberOfMonths={2}
      selected={range}
      onSelect={setRange}
      defaultMonth={new Date(2026, 10, 1)}
      className="rounded-(--radius-xl) border border-(--color-border-default) shadow-xs"
    />
  )
}

export const Intervalo: Story = {
  name: "Período",
  render: () => <Periodo />,
}

export const ComSeletorDeMes: Story = {
  name: "Com seletor de mês e ano",
  render: () => <Unico captionLayout="dropdown" />,
}
