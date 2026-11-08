import { CopyPageMenu } from "./copy-page-menu"
import { ComponentMeta } from "./component-meta"
import { PageHero } from "./page-hero"
import { formatUpdatedDate, type DocFrontmatter } from "./frontmatter"
import { textMuted } from "./doc-styles"

export function PageHeader({
  frontmatter,
  raw,
  markdownActions = true,
}: {
  frontmatter: DocFrontmatter
  raw: string
  /** false tira o botão agrupado de markdown (Copiar página e menu). */
  markdownActions?: boolean
}) {
  const { title, description, updated, name, figma, hero, heroPoster, heroAnimated } = frontmatter

  const actions = markdownActions ? <CopyPageMenu raw={raw} /> : null

  if (hero) {
    return (
      <PageHero
        title={title}
        description={description}
        image={hero}
        poster={heroPoster}
        animated={heroAnimated}
        actions={actions}
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h1 className="typo-serif-3xl-regular sm:typo-serif-4xl-regular">
          {title}
        </h1>
        {actions}
      </div>
      {description && (
        <p className={`max-w-2xl text-base ${textMuted}`}>{description}</p>
      )}
      {name && <ComponentMeta name={name} title={title} figma={figma} />}
      {updated && (
        <p className={`text-xs ${textMuted}`}>
          Atualizado em {formatUpdatedDate(updated)}
        </p>
      )}
    </div>
  )
}
