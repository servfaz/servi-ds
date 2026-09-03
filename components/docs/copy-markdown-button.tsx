import { CopyButton } from "@/components/docs/copy-button"

/**
 * Regra 12 (documentacao-design.md): toda página do site oferece uma ação
 * visível e funcional de copiar o conteúdo inteiro como markdown puro.
 * Recebe o arquivo .md bruto (frontmatter incluído) como fonte única.
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
