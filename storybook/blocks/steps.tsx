import { CodeBlock } from "./code-block"
import { InlineMarkdown } from "./inline-markdown"
import { textMuted } from "./doc-styles"

export type StepData = {
  title: string
  body?: string
  /** Comando ou trecho de código mostrado logo abaixo do passo. */
  code?: string
  language?: string
}

/**
 * Passo a passo numerado, no bloco ```steps do markdown: número em círculo,
 * linha ligando os passos e código opcional em cada um.
 */
export function Steps({ steps }: { steps: StepData[] }) {
  return (
    <ol className="flex flex-col">
      {steps.map((step, index) => (
        <li key={step.title} className="relative flex gap-4 pb-8 last:pb-0">
          {index < steps.length - 1 && (
            <span
              aria-hidden
              className="absolute top-9 bottom-1 left-4 w-px -translate-x-1/2 bg-[var(--color-border-default)]"
            />
          )}
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-brand-border)] bg-[var(--color-brand-subtle)] text-sm font-semibold text-[var(--color-brand-foreground-default)]">
            {index + 1}
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-2 pt-1">
            <p className="font-semibold text-[var(--color-foreground-emphasis)]">{step.title}</p>
            {step.body && (
              <div className={`max-w-2xl text-base leading-relaxed ${textMuted}`}>
                <InlineMarkdown>{step.body}</InlineMarkdown>
              </div>
            )}
            {step.code && (
              <CodeBlock code={step.code.replace(/\n$/, "")} language={step.language} className="mt-1" />
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
