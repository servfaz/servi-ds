import { formatUpdatedDate } from "@/lib/content"
import { textMuted } from "@/lib/doc-styles"
import { CopyMarkdownButton } from "@/components/docs/copy-markdown-button"

export function PageHeader({
  title,
  description,
  updated,
  raw,
}: {
  title: string
  description?: string
  updated?: string
  raw: string
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <CopyMarkdownButton raw={raw} />
      </div>
      {updated && (
        <p className={`text-xs ${textMuted}`}>
          Atualizado em {formatUpdatedDate(updated)}
        </p>
      )}
      {description && (
        <p className={`max-w-2xl text-base ${textMuted}`}>{description}</p>
      )}
    </div>
  )
}
