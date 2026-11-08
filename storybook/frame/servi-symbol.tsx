import React from "react"

/*
 * Símbolo da marca (fonte: public/brand/servi-symbol-icon.svg), inline para
 * herdar a cor do token por currentColor e acompanhar claro e escuro. A grade
 * de pontos é recortada da forma de cima, como na versão horizontal da marca.
 */
const SHAPES = [
  "M16 116C16 60.7715 60.7715 16 116 16H222V116H16V116Z",
  "M222 132C222 187.228 177.228 232 122 232H16V132H222V132Z",
]

const DOTS = [
  [134, 32],
  [146, 32],
  [158, 32],
  [170, 32],
  [182, 32],
  [194, 32],
  [206, 32],
  [146, 46],
  [158, 46],
  [170, 46],
  [182, 46],
  [194, 46],
  [206, 46],
  [146, 60],
  [158, 60],
  [170, 60],
  [182, 60],
  [194, 60],
  [206, 60],
]

export function ServiSymbol(props: React.SVGProps<SVGSVGElement>) {
  // Id fixo: o símbolo aparece uma vez só, no header.
  const maskId = "servi-symbol-dots"
  return (
    <svg viewBox="0 0 240 248" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask id={maskId}>
        <rect width="240" height="248" fill="white" />
        {DOTS.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={4} fill="black" />
        ))}
      </mask>
      <g mask={`url(#${maskId})`}>
        {SHAPES.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  )
}
