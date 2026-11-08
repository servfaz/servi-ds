"use client"

import * as React from "react"
import { CaretUpDownIcon, CheckIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

/*
 * Combobox - composição do shadcn (Popover + Command) com os tokens Semantic
 * do Servi DS. Select com busca: gatilho com a caixa do Select e lista que
 * filtra enquanto a pessoa digita. `multiple` permite escolher vários.
 * O Figma já tem Combobox no [SDS] Components.
 */

type ComboboxOption = {
  value: string
  label: string
  /** Ícone Phosphor antes do texto. */
  icon?: React.ReactNode
  disabled?: boolean
}

type ComboboxBaseProps = {
  options: ComboboxOption[]
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: React.ReactNode
  disabled?: boolean
  className?: string
  id?: string
  "aria-invalid"?: boolean
}

type ComboboxSingleProps = ComboboxBaseProps & {
  multiple?: false
  value?: string
  onValueChange?: (value: string) => void
}

type ComboboxMultipleProps = ComboboxBaseProps & {
  multiple: true
  value?: string[]
  onValueChange?: (value: string[]) => void
}

type ComboboxProps = ComboboxSingleProps | ComboboxMultipleProps

function Combobox(props: ComboboxProps) {
  const {
    options,
    placeholder = "Escolha uma opção",
    searchPlaceholder = "Buscar...",
    emptyMessage = "Nenhuma opção encontrada.",
    disabled,
    className,
    id,
    "aria-invalid": ariaInvalid,
  } = props
  const [open, setOpen] = React.useState(false)
  const [internal, setInternal] = React.useState<string[]>(() =>
    props.value === undefined ? [] : Array.isArray(props.value) ? props.value : [props.value]
  )
  const selected =
    props.value === undefined ? internal : Array.isArray(props.value) ? props.value : props.value ? [props.value] : []

  const labels = options.filter((option) => selected.includes(option.value)).map((option) => option.label)
  const triggerLabel =
    labels.length === 0 ? placeholder : labels.length <= 2 ? labels.join(", ") : `${labels.length} selecionadas`

  function choose(value: string) {
    if (props.multiple) {
      const next = selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]
      setInternal(next)
      props.onValueChange?.(next)
    } else {
      const next = selected[0] === value ? "" : value
      setInternal(next ? [next] : [])
      props.onValueChange?.(next)
      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-invalid={ariaInvalid}
          id={id}
          disabled={disabled}
          data-slot="combobox"
          data-empty={labels.length === 0}
          className={cn(
            "flex h-10 w-full min-w-56 items-center justify-between gap-2 rounded-(--radius-lg) border px-3 whitespace-nowrap outline-none",
            "border-(--color-border-default) bg-(--color-background-default) shadow-xs",
            "typo-sans-sm-regular text-(--color-foreground-emphasis) data-[empty=true]:text-(--color-foreground-default)",
            "transition-[border-color,box-shadow] duration-150 hover:shadow-md",
            "focus-visible:border-(--color-brand-border-focus) focus-visible:shadow-[0_0_0_3px_var(--color-brand-light-pressed)]",
            "aria-invalid:border-(--color-feedback-danger-outline)",
            "disabled:cursor-not-allowed disabled:border-(--color-border-muted) disabled:bg-(--color-background-muted) disabled:text-(--color-foreground-subtle) disabled:shadow-none",
            className
          )}
        >
          <span className="truncate">{triggerLabel}</span>
          <CaretUpDownIcon aria-hidden className="size-4 shrink-0 text-(--color-foreground-muted)" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) min-w-56 p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selected.includes(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    disabled={option.disabled}
                    onSelect={() => choose(option.value)}
                    aria-selected={isSelected}
                  >
                    {option.icon}
                    <span className="flex-1 truncate">{option.label}</span>
                    <CheckIcon
                      weight="bold"
                      className={cn(
                        "size-3.5 text-(--color-brand-foreground-default)",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { Combobox }
export type { ComboboxProps, ComboboxOption }
