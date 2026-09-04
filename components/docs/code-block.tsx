import { highlightCode } from "@/lib/shiki"
import { CodeBlockView } from "@/components/docs/code-block-view"

const COLLAPSE_LINE_THRESHOLD = 12

export async function CodeBlock({
  code,
  language,
}: {
  code: string
  language?: string
}) {
  const html = await highlightCode(code, language)
  const lineCount = code.split("\n").length

  return (
    <CodeBlockView
      html={html}
      code={code}
      language={language}
      collapsible={lineCount > COLLAPSE_LINE_THRESHOLD}
    />
  )
}
