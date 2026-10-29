import type { ReactNode } from "react"
import { slugify } from "./slugify"

/** Seção com título no mesmo estilo dos h2 vindos do markdown. */
export function DocSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2
        id={slugify(title)}
        className="scroll-mt-24 text-3xl font-extrabold tracking-tight"
      >
        {title}
      </h2>
      {children}
    </section>
  )
}
