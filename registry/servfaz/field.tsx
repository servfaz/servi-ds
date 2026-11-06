"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Input, type InputProps, type InputStatus } from "./input"
import { Label } from "./label"
import { Textarea, type TextareaProps } from "./textarea"

/*
 * Field - espelho do component set "Field" do Figma ([SDS] Components).
 * Compõe Label, texto opcional, descrição, o controle e a mensagem.
 * type do Figma: default e floating (Input) e textArea (Textarea).
 */

type FieldBaseProps = {
  /** Texto do Label (no floating, fica dentro da caixa). */
  label?: React.ReactNode
  /** Mostra o texto de campo opcional ao lado do label. */
  optional?: boolean
  /** Texto do indicador de campo opcional. */
  optionalText?: string
  /** Texto de apoio entre o label e o campo (default e textarea). */
  description?: React.ReactNode
  /** Mensagem abaixo do campo. Fica vermelha em invalid e verde em success. */
  message?: React.ReactNode
  status?: InputStatus
  /** Classe aplicada na caixa do controle. */
  inputClassName?: string
}

type FieldInputProps = FieldBaseProps &
  Omit<InputProps, "label" | "optional" | "optionalText" | "status"> & {
    variant?: "default" | "floating"
  }

type FieldTextareaProps = FieldBaseProps &
  Omit<TextareaProps, "status"> & {
    variant: "textarea"
  }

type FieldProps = FieldInputProps | FieldTextareaProps

function Field(props: FieldProps) {
  const {
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
    ...controlProps
  } = props

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
      className={cn("group flex w-full flex-col gap-2", className)}
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
                "shrink-0 typo-sans-sm-regular",
                disabled
                  ? "text-(--color-foreground-subtle)"
                  : "text-(--color-foreground-muted)"
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
            "typo-sans-sm-regular",
            disabled
              ? "text-(--color-foreground-subtle)"
              : "text-(--color-foreground-default)"
          )}
        >
          {description}
        </p>
      ) : null}

      {variant === "textarea" ? (
        <Textarea
          {...(controlProps as Omit<TextareaProps, "status">)}
          id={id}
          status={status}
          disabled={disabled}
          aria-describedby={describedBy}
          className={inputClassName}
        />
      ) : (
        <Input
          {...(controlProps as Omit<InputProps, "status">)}
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
      )}

      {message ? (
        <p
          id={messageId}
          data-slot="field-message"
          className={cn(
            isFloating ? "typo-sans-xs-regular" : "typo-sans-sm-regular",
            disabled
              ? "text-(--color-foreground-subtle)"
              : status === "invalid"
                ? "text-(--color-feedback-danger-foreground-default)"
                : status === "success"
                  ? "text-(--color-feedback-success-foreground-default)"
                  : "text-(--color-foreground-muted)"
          )}
        >
          {message}
        </p>
      ) : null}
    </div>
  )
}

export { Field }
export type { FieldProps, FieldInputProps, FieldTextareaProps }
