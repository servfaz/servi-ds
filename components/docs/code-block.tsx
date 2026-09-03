import { textMuted } from "@/lib/doc-styles"
import { CopyButton } from "@/components/docs/copy-button"

export function CodeBlock({
  code,
  language,
}: {
  code: string
  language?: string
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-[var(--color-taupe-300)] bg-[var(--color-taupe-100)] dark:bg-[var(--color-taupe-900)]">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-taupe-300)] px-4 py-2">
        <span className={`text-xs uppercase tracking-wide ${textMuted}`}>
          {language ?? "código"}
        </span>
        <CopyButton text={code} label="Copiar" copiedLabel="Copiado" />
      </div>
      <pre className="overflow-x-auto p-4 text-sm">
        <code>{code}</code>
      </pre>
    </div>
  )
}
