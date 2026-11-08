"use client"

import * as React from "react"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import {
  CheckCircleIcon,
  InfoIcon,
  SpinnerIcon,
  WarningIcon,
  XCircleIcon,
} from "@phosphor-icons/react"

/*
 * Toaster (Sonner) - base do Sonner do shadcn com os tokens Semantic do
 * Servi DS. Coloque um <Toaster /> na raiz e chame toast() de "sonner".
 * Caixa em background/default; ícones Phosphor na cor de feedback de cada
 * tipo. O Figma já tem Toast (6 tipos) e Toaster no [SDS] Components.
 */

function Toaster({ toastOptions, ...props }: ToasterProps) {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: <CheckCircleIcon weight="fill" className="size-4 text-(--color-feedback-success-foreground-default)" />,
        info: <InfoIcon weight="fill" className="size-4 text-(--color-feedback-information-foreground-default)" />,
        warning: <WarningIcon weight="fill" className="size-4 text-(--color-feedback-warning-foreground-default)" />,
        error: <XCircleIcon weight="fill" className="size-4 text-(--color-feedback-danger-foreground-default)" />,
        loading: <SpinnerIcon className="size-4 animate-spin text-(--color-foreground-muted)" />,
      }}
      style={
        {
          "--normal-bg": "var(--color-background-default)",
          "--normal-text": "var(--color-foreground-emphasis)",
          "--normal-border": "var(--color-border-default)",
          "--border-radius": "var(--radius-xl)",
        } as React.CSSProperties
      }
      toastOptions={{
        ...toastOptions,
        classNames: {
          toast: "font-(family-name:--typography-font-sans) typo-sans-sm-medium shadow-lg",
          description: "typo-sans-sm-regular text-(--color-foreground-muted)!",
          actionButton: "bg-(--color-brand-filled)! text-(--color-brand-foreground-on-filled)! rounded-(--radius-md)!",
          cancelButton: "bg-(--color-background-muted)! text-(--color-foreground-default)! rounded-(--radius-md)!",
          ...toastOptions?.classNames,
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
