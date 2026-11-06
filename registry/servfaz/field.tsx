"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Input, type InputProps } from "./input"
import { Label } from "./label"

type FieldProps = InputProps & {
  /** Texto de apoio entre o label e o campo (só no variant "default"). */
  description?: React.ReactNode
  /** Mensagem abaixo do campo. Fica vermelha em invalid e verde em success. */
  message?: React.ReactNode
  /** Classe aplicada na caixa do Input. */
  inputClassName?: string
}

function Field({
  className,
  inputClassName,
  variant = "default",
  label,
  optional = false,
  optionalText = "Opcional",
  description,
  message,
  status = "default",
  disabled,
  id: idProp,
  "aria-describedby": ariaDescribedBy,
  ...inputProps
}: FieldProps) {
  const autoId = React.useId()
  const id = idProp ?? autoId
  const descriptionId = `${id}-description`
  const messageId = `${id}-message`
  const isFloating = variant === "floating"

  const showHeader = !isFloating && (label || optional)
  const showDescription = !isFloating && Boolean(description)

  const describedBy =
    [
      ariaDescribedBy,
      showDescription ? descriptionId : null,
      message ? messageId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined

  return (
    <div
      data-slot="field"
      data-variant={variant}
      data-status={status}
      data-disabled={disabled ? true : undefined}
      className={cn(
        "group flex w-full flex-col gap-2 font-(family-name:--typography-font-sans)",
        className
      )}
    >
      {showHeader ? (
        <div
          data-slot="field-header"
          className="flex w-full items-center justify-between gap-2"
        >
          {label ? <Label htmlFor={id}>{label}</Label> : <span />}
          {optional ? (
            <span
              className={cn(
                "shrink-0 text-sm leading-5",
                disabled
                  ? "text-(--color-foreground-subtle)"
                  : "text-(--color-foreground-subtle)"
              )}
            >
              {optionalText}
            </span>
          ) : null}
        </div>
      ) : null}

      {showDescription ? (
        <p
          id={descriptionId}
          data-slot="field-description"
          className={cn(
            "text-sm leading-5",
            disabled ? "text-(--color-foreground-subtle)" : "text-(--color-foreground-default)"
          )}
        >
          {description}
        </p>
      ) : null}

      <Input
        {...inputProps}
        id={id}
        variant={variant}
        status={status}
        disabled={disabled}
        label={isFloating ? label : undefined}
        optional={isFloating ? optional : false}
        optionalText={optionalText}
        aria-describedby={describedBy}
        className={inputClassName}
      />

      {message ? (
        <p
          id={messageId}
          data-slot="field-message"
          className={cn(
            isFloating ? "text-xs leading-4.5" : "text-sm leading-5",
            disabled
              ? "text-(--color-foreground-subtle)"
              : status === "invalid"
                ? "text-(--color-feedback-danger-foreground-default)"
                : status === "success"
                  ? "text-(--color-feedback-success-foreground-default)"
                  : "text-(--color-foreground-subtle)"
          )}
        >
          {message}
        </p>
      ) : null}
    </div>
  )
}

export { Field }
export type { FieldProps }
