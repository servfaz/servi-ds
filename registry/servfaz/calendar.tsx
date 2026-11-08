"use client"

import * as React from "react"
import { DayPicker, getDefaultClassNames, type DayButton } from "react-day-picker"
import { ptBR } from "react-day-picker/locale"
import { CaretDownIcon, CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "./button"

/*
 * Calendar - base do Calendar do shadcn (react-day-picker 9) com os tokens
 * Semantic do Servi DS. Português do Brasil por padrão. Dia escolhido em
 * brand/filled, hoje em background/muted, intervalo em brand/selected.
 * O Figma já tem Calendar Day e Calendar (single, range) no [SDS] Components.
 */

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale = ptBR,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={locale}
      className={cn(
        "group/calendar bg-(--color-background-default) p-3 [--cell-size:--spacing(8)]",
        "font-(family-name:--typography-font-sans) text-(--color-foreground-emphasis)",
        "[[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString("pt-BR", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", defaultClassNames.nav),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 text-(--color-foreground-muted) select-none aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 text-(--color-foreground-muted) select-none aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 typo-sans-sm-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative rounded-(--radius-md) border border-(--color-border-default) shadow-xs has-focus:border-(--color-brand-border-focus)",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn("absolute inset-0 bg-(--color-background-default) opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "typo-sans-sm-medium capitalize select-none",
          captionLayout === "label"
            ? ""
            : "flex h-8 items-center gap-1 rounded-(--radius-md) pr-1 pl-2 [&>svg]:size-3.5 [&>svg]:text-(--color-foreground-muted)",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "flex-1 rounded-(--radius-md) typo-sans-xs-regular text-(--color-foreground-muted) capitalize select-none",
          defaultClassNames.weekday
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
        week_number: cn("typo-sans-xs-regular text-(--color-foreground-muted) select-none", defaultClassNames.week_number),
        day: cn(
          "group/day relative aspect-square h-full w-full p-0 text-center select-none",
          "[&:first-child[data-selected=true]_button]:rounded-l-(--radius-md) [&:last-child[data-selected=true]_button]:rounded-r-(--radius-md)",
          defaultClassNames.day
        ),
        range_start: cn("rounded-l-(--radius-md) bg-(--color-brand-selected)", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-(--radius-md) bg-(--color-brand-selected)", defaultClassNames.range_end),
        today: cn(
          "rounded-(--radius-md) bg-(--color-background-muted) data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-(--color-foreground-subtle) aria-selected:text-(--color-foreground-subtle)",
          defaultClassNames.outside
        ),
        disabled: cn("text-(--color-foreground-subtle) opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => (
          <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />
        ),
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") return <CaretLeftIcon className={cn("size-4", className)} {...props} />
          if (orientation === "right") return <CaretRightIcon className={cn("size-4", className)} {...props} />
          return <CaretDownIcon className={cn("size-4", className)} {...props} />
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => (
          <td {...props}>
            <div className="flex size-(--cell-size) items-center justify-center text-center">{children}</div>
          </td>
        ),
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()
  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString("pt-BR")}
      data-selected-single={
        modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 rounded-(--radius-md) border-0",
        "typo-sans-sm-regular text-(--color-foreground-emphasis) hover:bg-(--color-palette-olive-light) hover:text-(--color-foreground-emphasis)",
        "data-[selected-single=true]:bg-(--color-brand-filled) data-[selected-single=true]:text-(--color-brand-foreground-on-filled)",
        "data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-(--color-brand-selected) data-[range-middle=true]:text-(--color-brand-foreground-emphasis)",
        "data-[range-start=true]:rounded-(--radius-md) data-[range-start=true]:bg-(--color-brand-filled) data-[range-start=true]:text-(--color-brand-foreground-on-filled)",
        "data-[range-end=true]:rounded-(--radius-md) data-[range-end=true]:bg-(--color-brand-filled) data-[range-end=true]:text-(--color-brand-foreground-on-filled)",
        "group-data-[outside=true]/day:text-(--color-foreground-subtle) group-data-[disabled=true]/day:text-(--color-foreground-subtle)",
        "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10",
        "[&>span]:typo-sans-xs-regular [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
