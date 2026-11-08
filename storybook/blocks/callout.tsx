import type { Icon } from "@phosphor-icons/react"
import { InfoIcon, LightbulbIcon, ProhibitIcon, WarningIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { InlineMarkdown } from "./inline-markdown"

export type CalloutVariant = "tip" | "info" | "warning" | "danger"

export type CalloutData = {
  variant?: CalloutVariant
  title?: string
  body?: string
}

// Cada variante só troca as cores semânticas e o ícone.
const VARIANTS: Record<CalloutVariant, { icon: Icon; className: string }> = {
  tip: {
    icon: LightbulbIcon,
    className:
      "border-[var(--color-brand-border)] bg-[var(--color-brand-subtle)] text-[var(--color-brand-foreground-emphasis)] [--callout-icon:var(--color-brand-foreground-default)]",
  },
  info: {
    icon: InfoIcon,
    className:
      "border-[var(--color-feedback-information-border)] bg-[var(--color-feedback-information-subtle)] text-[var(--color-feedback-information-foreground-emphasis)] [--callout-icon:var(--color-feedback-information-foreground-default)]",
  },
  warning: {
    icon: WarningIcon,
    className:
      "border-[var(--color-feedback-warning-border)] bg-[var(--color-feedback-warning-subtle)] text-[var(--color-feedback-warning-foreground-emphasis)] [--callout-icon:var(--color-feedback-warning-foreground-default)]",
  },
  danger: {
    icon: ProhibitIcon,
    className:
      "border-[var(--color-feedback-danger-border)] bg-[var(--color-feedback-danger-subtle)] text-[var(--color-feedback-danger-foreground-emphasis)] [--callout-icon:var(--color-feedback-danger-foreground-default)]",
  },
}

/** Aviso curto no meio do texto, no bloco ```callout do markdown. */
export function Callout({ variant = "tip", title, body }: CalloutData) {
  const { icon: IconComponent, className } = VARIANTS[variant] ?? VARIANTS.tip
  return (
    <div
      role="note"
      className={cn("flex max-w-3xl gap-3 rounded-xl border px-4 py-3.5 text-sm", className)}
    >
      <IconComponent weight="duotone" className="mt-0.5 size-5 shrink-0 text-[var(--callout-icon)]" />
      <div className="flex flex-col gap-0.5 leading-relaxed">
        {title && <p className="font-semibold">{title}</p>}
        <InlineMarkdown>{body}</InlineMarkdown>
      </div>
    </div>
  )
}
