import { CopyButton } from "./copy-button"

/**
 * Regra 12: toda página oferece uma ação visível de copiar o conteúdo
 * inteiro como markdown puro. Recebe o arquivo .md bruto (frontmatter
 * incluído) como fonte única.
 */
export function CopyMarkdownButton({ raw }: { raw: string }) {
  return (
    <CopyButton
      text={raw}
      label="Copiar como Markdown"
      copiedLabel="Copiado como Markdown"
    />
  )
}
