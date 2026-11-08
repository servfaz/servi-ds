"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon, MinusIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Label } from "./label"

/*
 * Checkbox - espelho do component set "Checkbox" do Figma ([SDS] Components).
 * Controle de 16px com o Check do Phosphor (peso bold). Com `label`, monta o
 * conjunto do Figma: controle, label e descrição opcional.
 * type do Figma: default (sem caixa) e box (com borda e hover na cor da marca).
 * Estados do Figma: default, hover (box), focus, disabled, invalid, checked.
 * Estado indeterminate (checked="indeterminate"): mesma caixa do checked, com
 * traço no lugar do check. Usado no "marcar todas" do Data Table.
 */

// Controle sozinho. Usado também pelo Radio Group (mesma caixa e estados).
const controlClasses = [
  "peer size-4 shrink-0 border shadow-xs outline-none",
  "transition-[background-color,border-color,box-shadow] duration-150",
  "border-(--color-border-strong) bg-(--color-background-default)",
  "focus-visible:border-transparent focus-visible:shadow-[0_0_0_1px_var(--color-brand-border-focus),0_0_0_4px_var(--color-brand-light-pressed)]",
  "aria-invalid:border-(--color-feedback-danger-outline)",
  "disabled:cursor-not-allowed disabled:border-(--color-border-muted) disabled:bg-(--color-background-muted) disabled:shadow-none",
]

// Caixa em volta do conjunto (type box).
const boxClasses = [
  "rounded-(--radius-lg) border border-(--color-border-default) p-2.5 transition-[background-color,border-color] duration-150",
  "has-[button:enabled]:hover:border-(--color-brand-outline) has-[button:enabled]:hover:bg-(--color-brand-light)",
  "has-[button:disabled]:border-(--color-border-muted)",
]

type ChoiceLayoutProps = {
  /** Texto do label. Sem label, renderiza só o controle. */
  label?: React.ReactNode
  /** Texto de apoio abaixo do label. */
  description?: React.ReactNode
  /** "box" envolve o conjunto em uma caixa com borda. */
  variant?: "default" | "box"
  /** Classe aplicada no conjunto (label, descrição e controle). */
  containerClassName?: string
}

/** Conjunto controle + label + descrição, comum ao Checkbox e ao Radio Group. */
function ChoiceField({
  id,
  control,
  label,
  description,
  variant = "default",
  disabled,
  controlSide = "start",
  containerClassName,
}: ChoiceLayoutProps & {
  id: string
  control: React.ReactNode
  disabled?: boolean
  controlSide?: "start" | "end"
}) {
  const descriptionId = description ? `${id}-description` : undefined
  const content = (
    <div data-slot="field-content" className="flex min-w-0 flex-1 flex-col gap-1">
      <Label
        htmlFor={id}
        className={cn(
          "text-(--color-foreground-emphasis)",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        {label}
      </Label>
      {description ? (
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
    </div>
  )

  return (
    <div
      data-slot="choice-field"
      data-variant={variant}
      className={cn(
        "flex items-start gap-3",
        variant === "box" && boxClasses,
        containerClassName
      )}
    >
      {controlSide === "start" ? control : null}
      {content}
      {controlSide === "end" ? control : null}
    </div>
  )
}

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> &
  ChoiceLayoutProps

function Checkbox({
  className,
  containerClassName,
  label,
  description,
  variant = "default",
  id: idProp,
  disabled,
  ...props
}: CheckboxProps) {
  const autoId = React.useId()
  const id = idProp ?? autoId

  const control = (
    <CheckboxPrimitive.Root
      id={id}
      data-slot="checkbox"
      disabled={disabled}
      aria-describedby={description ? `${id}-description` : undefined}
      className={cn(
        controlClasses,
        "mt-0.5 flex items-center justify-center rounded-(--radius-sm)",
        "data-[state=checked]:border-(--color-brand-outline) data-[state=checked]:bg-(--color-brand-filled)",
        "data-[state=indeterminate]:border-(--color-brand-outline) data-[state=indeterminate]:bg-(--color-brand-filled)",
        "aria-invalid:data-[state=checked]:border-(--color-feedback-danger-outline) aria-invalid:data-[state=checked]:bg-transparent",
        "disabled:data-[state=checked]:border-(--color-border-muted) disabled:data-[state=checked]:bg-(--color-background-muted)",
        !label && "mt-0",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={cn(
          "group/indicator flex items-center justify-center text-(--color-brand-foreground-on-filled)",
          "[[aria-invalid=true]_&]:text-(--color-feedback-danger-foreground-default)",
          "[[data-disabled]_&]:text-(--color-foreground-subtle)"
        )}
      >
        <CheckIcon weight="bold" className="size-3.5 group-data-[state=indeterminate]/indicator:hidden" />
        <MinusIcon weight="bold" className="hidden size-3.5 group-data-[state=indeterminate]/indicator:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )

  if (!label) return control

  return (
    <ChoiceField
      id={id}
      control={control}
      label={label}
      description={description}
      variant={variant}
      disabled={disabled}
      containerClassName={containerClassName}
    />
  )
}

export { Checkbox, ChoiceField, controlClasses }
export type { CheckboxProps, ChoiceLayoutProps }
