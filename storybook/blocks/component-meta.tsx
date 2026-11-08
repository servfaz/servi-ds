import type { ReactNode } from "react"
import {
  ArrowSquareOutIcon,
  FigmaLogoIcon,
  GithubLogoIcon,
  PackageIcon,
} from "@phosphor-icons/react"
import { CopyButton } from "./copy-button"
import { linkProps } from "./links"
import { textMuted } from "./doc-styles"

const REPO = "https://github.com/servfaz/servi-ds/blob/main"
const REGISTRY = "https://ds.servfaz.app/r"

/** Nome exportado pelo componente: "Toggle Group" vira "ToggleGroup". */
function exportName(title: string) {
  return title.replace(/\s+/g, "")
}

function MetaRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] items-center gap-4 text-sm max-sm:grid-cols-1 max-sm:gap-1">
      <dt className={`font-medium ${textMuted}`}>{label}</dt>
      <dd className="flex min-w-0 items-center gap-2">{children}</dd>
    </div>
  )
}

function MetaLink({
  href,
  icon,
  children,
}: {
  href: string
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <a
      {...linkProps(href)}
      className="inline-flex min-w-0 items-center gap-1.5 text-[var(--color-foreground-emphasis)] underline-offset-4 hover:underline [&_svg]:size-4 [&_svg]:shrink-0"
    >
      {icon}
      <span className="truncate">{children}</span>
      <ArrowSquareOutIcon className={`!size-3 ${textMuted}`} />
    </a>
  )
}

/**
 * Metadados do topo da página de componente, no modelo do Mantine
 * (Import, Source, Docs, Package). Tudo derivado do `name` do frontmatter,
 * que espelha o nome do item no registry.json (Regra 2).
 */
export function ComponentMeta({
  name,
  title,
  figma,
}: {
  name: string
  title: string
  figma?: string
}) {
  const importLine = `import { ${exportName(title)} } from "@/components/ui/${name}"`

  return (
    <dl className="flex flex-col gap-3 rounded-lg border border-[var(--color-border-default)] p-4">
      <MetaRow label="Importar">
        <code className="min-w-0 truncate rounded bg-[var(--color-background-muted)] px-1.5 py-0.5 font-[family-name:var(--typography-font-mono)] text-[0.85em]">
          {importLine}
        </code>
        <CopyButton text={importLine} label="Copiar" copiedLabel="Copiado" />
      </MetaRow>
      <MetaRow label="Código-fonte">
        <MetaLink
          href={`${REPO}/registry/servfaz/${name}.tsx`}
          icon={<GithubLogoIcon />}
        >
          {`registry/servfaz/${name}.tsx`}
        </MetaLink>
      </MetaRow>
      <MetaRow label="Registry">
        <MetaLink href={`${REGISTRY}/${name}.json`} icon={<PackageIcon />}>
          {`ds.servfaz.app/r/${name}.json`}
        </MetaLink>
      </MetaRow>
      {figma && (
        <MetaRow label="Figma">
          <MetaLink href={figma} icon={<FigmaLogoIcon />}>
            Abrir na biblioteca de componentes
          </MetaLink>
        </MetaRow>
      )}
    </dl>
  )
}
