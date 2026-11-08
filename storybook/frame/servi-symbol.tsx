import React from "react"

/*
 * Símbolo horizontal da marca (fonte: public/brand/servi-symbol-horizontal.svg),
 * usado no header em telas estreitas. Inline para herdar a cor do token por
 * currentColor e acompanhar claro e escuro.
 *
 * © 2026 Servfaz. Todos os direitos reservados.
 */
const SHAPES = [
  "M16 116C16 60.7715 60.7715 16 116 16H222V116H16V116Z",
  "M222 132C222 187.228 177.228 232 122 232H16V132H222V132Z",
  "M444 116C444 60.7715 399.228 16 344 16H238V116H444V116Z",
  "M444 132C444 187.228 399.228 232 344 232H238V132H444V132Z",
  "M460 116C460 60.7715 504.772 16 560 16H666V116H460V116Z",
  "M666 132C666 187.228 621.228 232 566 232H460V132H666V132Z",
]

export function ServiSymbol(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 682 248" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      {SHAPES.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}
