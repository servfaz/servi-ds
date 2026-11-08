"use client"

import * as React from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { DateRange } from "react-day-picker"
import { CalendarBlankIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

/*
 * DatePicker - composição do shadcn (Popover + Calendar) com os tokens
 * Semantic do Servi DS. Gatilho com a caixa do Select. DatePicker escolhe
 * uma data; DateRangePicker escolhe um intervalo. Datas em dd/MM/yyyy.
 * O Figma já tem Date Picker no [SDS] Components.
 */

const triggerClasses = cn(
  "flex h-10 w-full min-w-56 items-center justify-between gap-2 rounded-(--radius-lg) border px-3 whitespace-nowrap outline-none",
  "border-(--color-border-default) bg-(--color-background-default) shadow-xs",
  "typo-sans-sm-regular text-(--color-foreground-emphasis) data-[empty=true]:text-(--color-foreground-default)",
  "transition-[border-color,box-shadow] duration-150 hover:shadow-md",
  "focus-visible:border-(--color-brand-border-focus) focus-visible:shadow-[0_0_0_3px_var(--color-brand-light-pressed)]",
  "aria-invalid:border-(--color-feedback-danger-outline)",
  "disabled:cursor-not-allowed disabled:border-(--color-border-muted) disabled:bg-(--color-background-muted) disabled:text-(--color-foreground-subtle) disabled:shadow-none",
  "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-(--color-foreground-muted)"
)

type BaseProps = {
  /** Texto quando não há data. */
  placeholder?: string
  disabled?: boolean
  className?: string
  id?: string
  "aria-invalid"?: boolean
}

type DatePickerProps = BaseProps & {
  value?: Date
  onValueChange?: (date: Date | undefined) => void
  /** Formato da data no gatilho (date-fns). */
  dateFormat?: string
}

function DatePicker({
  value,
  onValueChange,
  placeholder = "Escolha uma data",
  dateFormat = "dd/MM/yyyy",
  disabled,
  className,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [internal, setInternal] = React.useState<Date | undefined>(value)
  const selected = value ?? internal

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          data-slot="date-picker"
          data-empty={!selected}
          disabled={disabled}
          className={cn(triggerClasses, className)}
          {...props}
        >
          {selected ? format(selected, dateFormat, { locale: ptBR }) : placeholder}
          <CalendarBlankIcon aria-hidden />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          defaultMonth={selected}
          onSelect={(date) => {
            setInternal(date)
            onValueChange?.(date)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

type DateRangePickerProps = BaseProps & {
  value?: DateRange
  onValueChange?: (range: DateRange | undefined) => void
  /** Quantos meses aparecem lado a lado. */
  numberOfMonths?: number
}

function DateRangePicker({
  value,
  onValueChange,
  placeholder = "Escolha um período",
  numberOfMonths = 2,
  disabled,
  className,
  ...props
}: DateRangePickerProps) {
  const [internal, setInternal] = React.useState<DateRange | undefined>(value)
  const range = value ?? internal
  const label = range?.from
    ? range.to
      ? `${format(range.from, "dd/MM/yyyy")} a ${format(range.to, "dd/MM/yyyy")}`
      : format(range.from, "dd/MM/yyyy")
    : placeholder

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          data-slot="date-range-picker"
          data-empty={!range?.from}
          disabled={disabled}
          className={cn(triggerClasses, "min-w-64", className)}
          {...props}
        >
          {label}
          <CalendarBlankIcon aria-hidden />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="range"
          selected={range}
          defaultMonth={range?.from}
          numberOfMonths={numberOfMonths}
          onSelect={(next) => {
            setInternal(next)
            onValueChange?.(next)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker, DateRangePicker }
export type { DatePickerProps, DateRangePickerProps }
