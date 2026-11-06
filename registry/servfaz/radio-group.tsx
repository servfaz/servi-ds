"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"
import { ChoiceField, controlClasses, type ChoiceLayoutProps } from "./checkbox"

/*
 * Radio Group - espelho dos componentes "Radio Group" e "Radio Group Item" do
 * Figma ([SDS] Components). Mesma caixa e estados do Checkbox, com controle
 * redondo e indicador de 8px. Com `label`, o item monta o conjunto do Figma
 * (controle, label e descrição). No type box o controle fica à direita.
 */

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

type RadioGroupItemProps = React.ComponentProps<typeof RadioGroupPrimitive.Item> &
  ChoiceLayoutProps

function RadioGroupItem({
  className,
  containerClassName,
  label,
  description,
  variant = "default",
  id: idProp,
  disabled,
  ...props
}: RadioGroupItemProps) {
  const autoId = React.useId()
  const id = idProp ?? autoId

  const control = (
    <RadioGroupPrimitive.Item
      id={id}
      data-slot="radio-group-item"
      disabled={disabled}
      aria-describedby={description ? `${id}-description` : undefined}
      className={cn(
        controlClasses,
        "mt-0.5 flex aspect-square items-center justify-center rounded-full",
        !label && "mt-0",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className={cn(
          "size-2 rounded-full bg-(--color-brand-foreground-default)",
          "[[aria-invalid=true]_&]:bg-(--color-feedback-danger-foreground-default)",
          "[[data-disabled]_&]:bg-(--color-foreground-subtle)"
        )}
      />
    </RadioGroupPrimitive.Item>
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
      controlSide={variant === "box" ? "end" : "start"}
      containerClassName={containerClassName}
    />
  )
}

export { RadioGroup, RadioGroupItem }
export type { RadioGroupItemProps }
