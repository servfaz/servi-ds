"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  CheckIcon,
  InfoIcon,
  WarningCircleIcon,
  WarningIcon,
  XIcon,
} from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

/*
 * Alert - espelho do component set "Alert" do Figma ([SDS] Components).
 * Ícone de 24px (Phosphor, peso fill), título, descrição e botão de fechar
 * opcional (X, peso light, 16px).
 * variant do Figma: default, destructive, warning, sucess (aqui "success") e
 * information. Os variants de feedback usam o fundo subtle com um brilho em
 * degradê de background/default para transparente, como no Figma.
 */

const alertVariants = cva(
  [
    "relative flex w-full items-start gap-2 rounded-(--radius-xl) border p-3 shadow-sm",
    "[&>[data-slot=alert-icon]_svg]:size-6",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-(--color-border-default) bg-(--color-background-default)",
          "[--alert-title:var(--color-foreground-emphasis)] [--alert-text:var(--color-foreground-default)] [--alert-icon:var(--color-foreground-default)]",
        ],
        destructive: [
          "border-(--color-feedback-danger-border) [background:linear-gradient(to_right,var(--color-background-default),transparent),var(--color-feedback-danger-subtle)]",
          "[--alert-title:var(--color-feedback-danger-foreground-emphasis)] [--alert-text:var(--color-feedback-danger-foreground-default)] [--alert-icon:var(--color-feedback-danger-foreground-emphasis)]",
        ],
        warning: [
          "border-(--color-feedback-warning-border) [background:radial-gradient(circle_at_left,var(--color-background-default),transparent),var(--color-feedback-warning-subtle)]",
          "[--alert-title:var(--color-feedback-warning-foreground-emphasis)] [--alert-text:var(--color-feedback-warning-foreground-default)] [--alert-icon:var(--color-feedback-warning-foreground-emphasis)]",
        ],
        success: [
          "border-(--color-feedback-success-border) [background:linear-gradient(to_right,var(--color-background-default),transparent),var(--color-feedback-success-subtle)]",
          "[--alert-title:var(--color-feedback-success-foreground-emphasis)] [--alert-text:var(--color-feedback-success-foreground-default)] [--alert-icon:var(--color-feedback-success-foreground-emphasis)]",
        ],
        information: [
          "border-(--color-feedback-information-border) [background:linear-gradient(to_right,var(--color-background-default),transparent),var(--color-feedback-information-subtle)]",
          "[--alert-title:var(--color-feedback-information-foreground-emphasis)] [--alert-text:var(--color-feedback-information-foreground-default)] [--alert-icon:var(--color-feedback-information-foreground-emphasis)]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type AlertVariant = NonNullable<VariantProps<typeof alertVariants>["variant"]>

const defaultIcons: Record<AlertVariant, React.ReactNode> = {
  default: <InfoIcon weight="fill" />,
  destructive: <WarningIcon weight="fill" />,
  warning: <WarningCircleIcon weight="fill" />,
  success: <CheckIcon weight="fill" />,
  information: <InfoIcon weight="fill" />,
}

type AlertProps = React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & {
    /** Ícone à esquerda. Sem a prop, usa o ícone padrão do variant; `null` esconde. */
    icon?: React.ReactNode
    /** Mostra o botão de fechar e chama esta função ao clicar. */
    onClose?: React.MouseEventHandler<HTMLButtonElement>
    /** Nome acessível do botão de fechar. */
    closeLabel?: string
  }

function Alert({
  className,
  variant,
  icon,
  onClose,
  closeLabel = "Fechar",
  children,
  ...props
}: AlertProps) {
  const resolvedVariant = variant ?? "default"
  const resolvedIcon = icon === undefined ? defaultIcons[resolvedVariant] : icon

  return (
    <div
      data-slot="alert"
      data-variant={resolvedVariant}
      role={resolvedVariant === "destructive" ? "alert" : "status"}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {resolvedIcon ? (
        <span
          data-slot="alert-icon"
          aria-hidden
          className="flex shrink-0 text-(--alert-icon)"
        >
          {resolvedIcon}
        </span>
      ) : null}
      <div
        data-slot="alert-content"
        className="flex min-w-0 flex-1 flex-col gap-0.5 pt-0.5"
      >
        {children}
      </div>
      {onClose ? (
        <button
          type="button"
          data-slot="alert-close"
          aria-label={closeLabel}
          onClick={onClose}
          className={cn(
            "flex size-6 shrink-0 items-center justify-center rounded-(--radius-md) text-(--alert-icon) outline-none",
            "transition-[background-color,box-shadow] duration-150 hover:bg-(--color-palette-olive-light-hover)",
            "focus-visible:shadow-[inset_0_0_0_2px_var(--color-brand-border-focus)]"
          )}
        >
          <XIcon weight="light" className="size-4" />
        </button>
      ) : null}
    </div>
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn("typo-sans-sm-semibold text-(--alert-title)", className)}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("typo-sans-sm-regular text-(--alert-text)", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, alertVariants }
export type { AlertProps }
