import { Controls, Story } from "@storybook/addon-docs/blocks"
import { CodeBlock } from "./code-block"
import { textMuted } from "./doc-styles"

/** Módulo de stories importado pela página .mdx (`import * as X from "./x.stories"`). */
export type StoriesModule = Record<string, unknown>

/**
 * Exemplo ao vivo no modelo do Mantine: preview da story em cima e o código
 * de uso logo abaixo, no mesmo bloco. O código vem do próprio markdown
 * (bloco ```tsx demo=<Story>```), então continua copiável (Regra 4).
 */
export function Demo({
  stories,
  storyName,
  code,
  language,
  withControls,
}: {
  stories?: StoriesModule
  storyName: string
  code: string
  language?: string
  withControls?: boolean
}) {
  const story = stories?.[storyName]

  return (
    <div className="flex flex-col">
      <div className="flex min-h-32 items-center justify-center overflow-x-auto rounded-t-lg border border-b-0 border-[var(--color-taupe-300)] bg-[var(--background)] p-8 dark:border-[var(--color-taupe-700)]">
        {story ? (
          <Story of={story as never} />
        ) : (
          <p className={`text-sm ${textMuted}`}>
            Story <code>{storyName}</code> não encontrada no arquivo de stories.
          </p>
        )}
      </div>
      <CodeBlock code={code} language={language} className="rounded-t-none" />
      {story && withControls ? (
        <div className="mt-4 overflow-hidden rounded-lg border border-[var(--color-taupe-300)] dark:border-[var(--color-taupe-700)] [&_table]:!my-0">
          <Controls of={story as never} />
        </div>
      ) : null}
    </div>
  )
}

/** Lê o meta do bloco de código: `demo=Variantes controls`. */
export function parseDemoMeta(meta: string | undefined) {
  if (!meta) return null
  const match = meta.match(/(?:^|\s)demo=([A-Za-z0-9_]+)/)
  if (!match) return null
  return {
    storyName: match[1],
    withControls: /(?:^|\s)controls(?:\s|$)/.test(meta),
  }
}
