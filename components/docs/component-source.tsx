import { CodeBlock } from "@/components/docs/code-block"

export function ComponentSource({ code }: { code: string }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="scroll-mt-24 text-3xl font-extrabold tracking-tight">
        Código-fonte
      </h2>
      <CodeBlock code={code} language="tsx" />
    </div>
  )
}
