"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  StatusIcon,
  controlBoxClasses,
  iconSlotClasses,
  type InputStatus,
} from "./input"

/*
 * Textarea - espelho do component set "Textarea" do Figma ([SDS] Components).
 * Mesma caixa, cores e estados do Input (default, hover, focus, filled,
 * disabled, invalid, success), com altura mínima de 96px.
 *
 * Valor sem variável no Figma (pendente): raio de 10px da caixa. Aqui usa
 * radius/lg (8px) até a variável existir.
 */

type TextareaProps = React.ComponentProps<"textarea"> & {
  /** Estado de validação. "invalid" também define aria-invalid. */
  status?: InputStatus
  /** Ícone à esquerda do texto, na primeira linha (16px). */
  leftIcon?: React.ReactNode
  /** Ícone à direita do texto, na primeira linha. Substituído pelo ícone de status. */
  rightIcon?: React.ReactNode
  /** Classe aplicada no textarea. `className` vai para a caixa. */
  textareaClassName?: string
}

function Textarea({
  className,
  textareaClassName,
  status: statusProp,
  leftIcon,
  rightIcon,
  disabled,
  "aria-invalid": ariaInvalid,
  ...props
}: TextareaProps) {
  const status: InputStatus =
    statusProp ??
    (ariaInvalid === true || ariaInvalid === "true" ? "invalid" : "default")
  const hasStatusIcon = status !== "default"

  return (
    <div
      data-slot="textarea"
      data-status={status}
      data-disabled={disabled ? true : undefined}
      className={cn(
        "flex min-h-24 items-start gap-2 px-3 pt-2.5 pb-2",
        controlBoxClasses(status, disabled),
        className
      )}
    >
      {leftIcon ? (
        <span
          data-slot="textarea-left-icon"
          className={cn("h-5", iconSlotClasses(disabled))}
        >
          {leftIcon}
        </span>
      ) : null}
      <textarea
        data-slot="textarea-control"
        disabled={disabled}
        aria-invalid={status === "invalid" ? true : ariaInvalid}
        className={cn(
          "min-w-0 flex-1 self-stretch resize-none bg-transparent p-0 outline-none field-sizing-content",
          "typo-sans-sm-regular text-(--color-foreground-emphasis) caret-(--color-foreground-emphasis)",
          "placeholder:text-(--color-foreground-default)",
          "disabled:cursor-not-allowed disabled:text-(--color-foreground-subtle) disabled:placeholder:text-(--color-foreground-subtle)",
          textareaClassName
        )}
        {...props}
      />
      {hasStatusIcon ? (
        <span
          data-slot="textarea-status-icon"
          className={cn("h-5", iconSlotClasses())}
        >
          <StatusIcon status={status} />
        </span>
      ) : rightIcon ? (
        <span
          data-slot="textarea-right-icon"
          className={cn("h-5", iconSlotClasses(disabled))}
        >
          {rightIcon}
        </span>
      ) : null}
    </div>
  )
}

export { Textarea }
export type { TextareaProps }
