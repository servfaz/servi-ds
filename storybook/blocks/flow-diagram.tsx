import { Fragment } from "react"
import { ArrowDownIcon, ArrowRightIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { docIcon } from "./doc-icons"
import { InlineMarkdown } from "./inline-markdown"
import { textMuted } from "./doc-styles"

export type FlowStepData = {
  icon?: string
  title: string
  description?: string
}

function FlowNode({ icon, title, description, last }: FlowStepData & { last: boolean }) {
  const IconComponent = docIcon(icon)
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center gap-2 rounded-xl border p-4 text-center",
        last
          ? "border-[var(--color-brand-border)] bg-[var(--color-brand-subtle)]"
          : "border-[var(--color-border-default)] bg-[var(--color-background-default)]"
      )}
    >
      {IconComponent && (
        <span
          className={cn(
            "flex size-10 items-center justify-center rounded-full",
            last
              ? "bg-[var(--color-brand-filled)] text-[var(--color-brand-foreground-on-filled)]"
              : "bg-[var(--color-brand-subtle)] text-[var(--color-brand-foreground-default)]"
          )}
        >
          <IconComponent weight="duotone" className="size-5" />
        </span>
      )}
      <span className="text-sm font-semibold text-[var(--color-foreground-emphasis)]">{title}</span>
      {description && (
        <span className={cn("text-xs leading-relaxed", textMuted)}>
          <InlineMarkdown>{description}</InlineMarkdown>
        </span>
      )}
    </div>
  )
}

/**
 * Diagrama de fluxo em etapas, no bloco ```flow do markdown. Em linha no
 * desktop, em coluna em telas estreitas (Regra 18). A última etapa é o
 * resultado e ganha a cor da marca.
 */
export function FlowDiagram({ steps }: { steps: FlowStepData[] }) {
  return (
    <div className="flex flex-col items-stretch gap-2 rounded-2xl border border-dashed border-[var(--color-brand-border)] p-4 md:flex-row md:items-center">
      {steps.map((step, index) => (
        <Fragment key={step.title}>
          {index > 0 && (
            <span className="flex shrink-0 justify-center text-[var(--color-brand-foreground-muted)]">
              <ArrowDownIcon weight="bold" className="size-4 md:hidden" />
              <ArrowRightIcon weight="bold" className="hidden size-4 md:block" />
            </span>
          )}
          <FlowNode {...step} last={index === steps.length - 1} />
        </Fragment>
      ))}
    </div>
  )
}
