import { CopyPageMenu } from "./copy-page-menu"
import { ComponentMeta } from "./component-meta"
import { formatUpdatedDate, type DocFrontmatter } from "./frontmatter"
import { textMuted } from "./doc-styles"

export function PageHeader({
  frontmatter,
  raw,
}: {
  frontmatter: DocFrontmatter
  raw: string
}) {
  const { title, description, updated, name, figma } = frontmatter

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <CopyPageMenu raw={raw} />
      </div>
      {updated && (
        <p className={`text-xs ${textMuted}`}>
          Atualizado em {formatUpdatedDate(updated)}
        </p>
      )}
      {description && (
        <p className={`max-w-2xl text-base ${textMuted}`}>{description}</p>
      )}
      {name && <ComponentMeta name={name} title={title} figma={figma} />}
    </div>
  )
}
