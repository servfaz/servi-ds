"use client"

import * as React from "react"
import { CheckIcon, WarningCircleIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

/*
 * Input - espelho do component set "Input" do Figma ([SDS] Components).
 * type default (40px) e floating (56px, label dentro da caixa).
 * Estados do Figma: default, hover, focus, filled, disabled, invalid, success.
 *
 * Valor sem variável no Figma (pendente): raio de 10px da caixa. Aqui usa
 * radius/lg (8px) até a variável existir.
 */

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

/** Caixa comum ao Input, ao Textarea e ao Search Bar. */
function controlBoxClasses(status: InputStatus, disabled?: boolean) {
  return cn(
    "w-full rounded-(--radius-lg) border",
    "transition-[border-color,box-shadow,background-color] duration-150",
    disabled
      ? "cursor-not-allowed border-(--color-border-muted) bg-(--color-background-muted)"
      : cn(
          "bg-(--color-background-default) shadow-xs",
          status === "invalid" && "border-(--color-feedback-danger-outline)",
          status === "success" && "border-(--color-feedback-success-outline)",
          status === "default" &&
            "border-(--color-border-default) hover:not-focus-within:shadow-md focus-within:border-(--color-brand-border-focus)"
        )
  )
}

/** Ícone de status (invalid e success), igual ao Figma. */
function StatusIcon({ status }: { status: InputStatus }) {
  if (status === "invalid")
    return (
      <WarningCircleIcon
        aria-hidden
        className="text-(--color-feedback-danger-foreground-default)"
      />
    )
  if (status === "success")
    return (
      <CheckIcon
        aria-hidden
        className="text-(--color-feedback-success-foreground-default)"
      />
    )
  return null
}

function iconSlotClasses(disabled?: boolean) {
  return cn(
    "flex shrink-0 items-center [&_svg]:size-4 [&_svg]:shrink-0",
    disabled
      ? "text-(--color-foreground-subtle)"
      : "text-(--color-foreground-muted)"
  )
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

  const statusIcon = <StatusIcon status={status} />
  const hasStatusIcon = status !== "default"

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
        <span data-slot="input-left-icon" className={iconSlotClasses(disabled)}>
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
          "typo-sans-sm-regular text-(--color-foreground-emphasis) caret-(--color-foreground-emphasis)",
          "placeholder:text-(--color-foreground-default)",
          "disabled:cursor-not-allowed disabled:text-(--color-foreground-subtle) disabled:placeholder:text-(--color-foreground-subtle)",
          "file:border-0 file:bg-transparent file:typo-sans-sm-medium"
        )}
        {...props}
      />
      {hasStatusIcon ? (
        <span data-slot="input-status-icon" className={iconSlotClasses()}>
          {statusIcon}
        </span>
      ) : rightIcon ? (
        <span data-slot="input-right-icon" className={iconSlotClasses(disabled)}>
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
        "flex px-3",
        controlBoxClasses(status, disabled),
        isFloating
          ? cn("h-14 flex-col justify-center py-2", floated ? "gap-0.5" : "gap-0")
          : "h-10 items-center",
        className
      )}
    >
      {isFloating ? (
        <>
          <div
            data-slot="input-header"
            className={cn(
              "flex w-full items-center justify-between gap-2",
              disabled && "opacity-50"
            )}
          >
            <label
              htmlFor={id}
              className={cn(
                "truncate transition-[font-size,line-height,color] duration-150",
                floated
                  ? "typo-sans-xs-regular text-(--color-foreground-muted)"
                  : "typo-sans-sm-regular text-(--color-foreground-default)"
              )}
            >
              {label}
            </label>
            {optional ? (
              <span
                className={cn(
                  "shrink-0 transition-[font-size,line-height] duration-150",
                  floated ? "typo-sans-xs-regular" : "typo-sans-sm-regular",
                  disabled
                    ? "text-(--color-foreground-subtle)"
                    : "text-(--color-foreground-muted)"
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

export { Input, StatusIcon, controlBoxClasses, iconSlotClasses }
export type { InputProps, InputStatus }
