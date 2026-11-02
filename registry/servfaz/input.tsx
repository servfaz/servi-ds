"use client"

import * as React from "react"
import { CheckIcon, WarningCircleIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

type InputStatus = "default" | "invalid" | "success"

type InputProps = Omit<React.ComponentProps<"input">, "size"> & {
  /** "floating" coloca o label dentro da caixa, acima do valor. */
  variant?: "default" | "floating"
  /** Estado de validação. "invalid" também define aria-invalid. */
  status?: InputStatus
  /** Ícone à esquerda do valor (16px). */
  leftIcon?: React.ReactNode
  /** Ícone à direita do valor (16px). Substituído pelo ícone de status. */
  rightIcon?: React.ReactNode
  /** Label interno. Usado só no variant "floating". */
  label?: React.ReactNode
  /** Mostra o texto de campo opcional ao lado do label (floating). */
  optional?: boolean
  /** Texto do indicador de campo opcional. */
  optionalText?: string
}

function hasText(value: unknown) {
  if (value === undefined || value === null) return false
  return String(value).length > 0
}

function Input({
  className,
  variant = "default",
  status: statusProp,
  leftIcon,
  rightIcon,
  label,
  optional = false,
  optionalText = "Opcional",
  id: idProp,
  disabled,
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  "aria-invalid": ariaInvalid,
  ...props
}: InputProps) {
  const autoId = React.useId()
  const id = idProp ?? autoId
  const isFloating = variant === "floating"

  const status: InputStatus =
    statusProp ??
    (ariaInvalid === true || ariaInvalid === "true" ? "invalid" : "default")

  const [focused, setFocused] = React.useState(false)
  const [hovered, setHovered] = React.useState(false)
  const [filledUncontrolled, setFilledUncontrolled] = React.useState(
    hasText(defaultValue)
  )
  const filled = value !== undefined ? hasText(value) : filledUncontrolled

  // No floating, o label sobe e o valor aparece em qualquer estado diferente
  // do repouso vazio (igual ao Figma: hover, focus, filled, disabled e status).
  const floated =
    !isFloating ||
    focused ||
    hovered ||
    filled ||
    Boolean(disabled) ||
    status !== "default"

  const statusIcon =
    status === "invalid" ? (
      <WarningCircleIcon aria-hidden className="text-(--color-icon-danger)" />
    ) : status === "success" ? (
      <CheckIcon aria-hidden className="text-(--color-icon-success)" />
    ) : null

  const iconSlot = cn(
    "flex shrink-0 items-center [&_svg]:size-(--size-icon-sm) [&_svg]:shrink-0",
    disabled ? "text-(--color-icon-disabled)" : "text-(--color-icon-subtle)"
  )

  const row = (
    <div
      data-slot="input-row"
      className={cn(
        "flex w-full items-center gap-2",
        isFloating &&
          "overflow-hidden transition-[height,opacity] duration-150",
        isFloating && (floated ? "h-5 opacity-100" : "h-0 opacity-0")
      )}
    >
      {leftIcon ? (
        <span data-slot="input-left-icon" className={iconSlot}>
          {leftIcon}
        </span>
      ) : null}
      <input
        id={id}
        data-slot="input-control"
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        aria-invalid={status === "invalid" ? true : ariaInvalid}
        onChange={(event) => {
          setFilledUncontrolled(event.currentTarget.value.length > 0)
          onChange?.(event)
        }}
        onFocus={(event) => {
          setFocused(true)
          onFocus?.(event)
        }}
        onBlur={(event) => {
          setFocused(false)
          onBlur?.(event)
        }}
        className={cn(
          "h-5 min-w-0 flex-1 bg-transparent p-0 outline-none",
          "text-sm leading-5 text-(--color-text-default) caret-(--color-text-default)",
          "placeholder:text-(--color-text-subtle)",
          "disabled:cursor-not-allowed disabled:text-(--color-text-disabled) disabled:placeholder:text-(--color-text-disabled)",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium"
        )}
        {...props}
      />
      {statusIcon ? (
        <span data-slot="input-status-icon" className={iconSlot}>
          {statusIcon}
        </span>
      ) : rightIcon ? (
        <span data-slot="input-right-icon" className={iconSlot}>
          {rightIcon}
        </span>
      ) : null}
    </div>
  )

  return (
    <div
      data-slot="input"
      data-variant={variant}
      data-status={status}
      data-disabled={disabled ? true : undefined}
      data-floated={floated}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "flex w-full rounded-(--radius) border px-3",
        "font-(family-name:--typography-font-family)",
        "transition-[border-color,box-shadow,background-color] duration-150",
        isFloating
          ? cn("h-14 flex-col justify-center py-2", floated ? "gap-0.5" : "gap-0")
          : "h-(--size-control-lg) items-center",
        disabled
          ? "cursor-not-allowed border-(--color-border-disabled) bg-(--color-background-disabled)"
          : cn(
              "bg-(--color-background-default) shadow-xs",
              status === "invalid" && "border-(--color-border-danger)",
              status === "success" && "border-(--color-border-success)",
              status === "default" &&
                "border-(--color-border-input) hover:not-focus-within:border-(--color-border-strong) hover:not-focus-within:shadow-md focus-within:border-(--color-border-focus)"
            ),
        className
      )}
    >
      {isFloating ? (
        <>
          <div
            data-slot="input-header"
            className="flex w-full items-center justify-between gap-2"
          >
            <label
              htmlFor={id}
              className={cn(
                "truncate transition-[font-size,line-height,color] duration-150",
                floated
                  ? "text-xs leading-4.5 text-(--color-text-subtlest)"
                  : "text-sm leading-5 text-(--color-text-subtle)",
                disabled && "opacity-50"
              )}
            >
              {label}
            </label>
            {optional ? (
              <span
                className={cn(
                  "shrink-0 transition-[font-size,line-height] duration-150",
                  floated ? "text-xs leading-4.5" : "text-sm leading-5",
                  disabled
                    ? "text-(--color-text-disabled)"
                    : "text-(--color-text-subtlest)"
                )}
              >
                {optionalText}
              </span>
            ) : null}
          </div>
          {row}
        </>
      ) : (
        row
      )}
    </div>
  )
}

export { Input }
export type { InputProps, InputStatus }
