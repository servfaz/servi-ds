import type { ReactNode } from "react"

/**
 * Peças das ilustrações esquemáticas da página Componentes. Cada ilustração
 * é um SVG desenhado numa área de 240 x 150 (proporção da capa do card) e
 * pintado só com tokens semânticos, por isso acompanha o claro e o escuro.
 * As coordenadas são desenho, como o traço de um ícone: cor, borda e fundo
 * vêm sempre de var(--token) (Regra 9).
 */

const FILL = {
  /** Superfície com borda: campo, caixa, card. */
  surface: "fill-[var(--color-background-default)] stroke-[var(--color-border-default)]",
  /** Superfície com a borda de foco da marca. */
  focus: "fill-[var(--color-background-default)] stroke-[var(--color-brand-filled)]",
  /** Superfície tracejada (área vazia). */
  dashed: "fill-[var(--color-background-default)] stroke-[var(--color-border-strong)] [stroke-dasharray:4_4]",
  muted: "fill-[var(--color-background-muted)]",
  /** Texto principal. */
  line: "fill-[var(--color-border-strong)]",
  /** Texto de apoio. */
  soft: "fill-[var(--color-border-default)]",
  ink: "fill-[var(--color-foreground-subtle)]",
  brand: "fill-[var(--color-brand-filled)]",
  brandSoft: "fill-[var(--color-brand-light)]",
  onBrand: "fill-[var(--color-brand-foreground-on-filled)]",
  inverse: "fill-[var(--color-background-inverse)]",
  onInverse: "fill-[var(--color-foreground-inverse)]",
  danger: "fill-[var(--color-feedback-danger-filled)]",
  success: "fill-[var(--color-feedback-success-filled)]",
  info: "fill-[var(--color-feedback-information-filled)]",
  infoSoft: "fill-[var(--color-feedback-information-light)] stroke-[var(--color-feedback-information-border)]",
} as const

const STROKE = {
  line: "stroke-[var(--color-border-strong)]",
  soft: "stroke-[var(--color-border-default)]",
  ink: "stroke-[var(--color-foreground-subtle)]",
  muted: "stroke-[var(--color-background-muted)]",
  brand: "stroke-[var(--color-brand-filled)]",
  onBrand: "stroke-[var(--color-brand-foreground-on-filled)]",
  onInverse: "stroke-[var(--color-foreground-inverse)]",
} as const

export type FillTone = keyof typeof FILL
export type StrokeTone = keyof typeof STROKE

/** Área de desenho da capa. */
export function Thumb({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 240 150" className="size-full" aria-hidden="true" focusable="false">
      {children}
    </svg>
  )
}

/** Retângulo: caixa, campo, botão. */
export function Box({
  x,
  y,
  w,
  h,
  r = 6,
  tone = "surface",
  opacity,
}: {
  x: number
  y: number
  w: number
  h: number
  r?: number
  tone?: FillTone
  opacity?: number
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={r}
      className={FILL[tone]}
      strokeWidth={1}
      vectorEffect="non-scaling-stroke"
      opacity={opacity}
    />
  )
}

/** Linha de texto: barra com as pontas arredondadas. */
export function Bar({
  x,
  y,
  w,
  h = 6,
  tone = "line",
}: {
  x: number
  y: number
  w: number
  h?: number
  tone?: FillTone
}) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} className={FILL[tone]} />
}

export function Dot({
  cx,
  cy,
  r,
  tone = "muted",
}: {
  cx: number
  cy: number
  r: number
  tone?: FillTone
}) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      className={FILL[tone]}
      strokeWidth={1}
      vectorEffect="non-scaling-stroke"
    />
  )
}

/** Traço livre: seta, check, ícone. */
export function Stroke({
  d,
  tone = "ink",
  w = 2,
}: {
  d: string
  tone?: StrokeTone
  w?: number
}) {
  return (
    <path
      d={d}
      fill="none"
      className={STROKE[tone]}
      strokeWidth={w}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  )
}

/** Seta para baixo, centrada em (x, y). */
export function Chevron({ x, y, tone = "ink", up = false }: { x: number; y: number; tone?: StrokeTone; up?: boolean }) {
  const d = up ? `M${x - 4} ${y + 2} L${x} ${y - 2} L${x + 4} ${y + 2}` : `M${x - 4} ${y - 2} L${x} ${y + 2} L${x + 4} ${y - 2}`
  return <Stroke d={d} tone={tone} w={1.5} />
}

/** Seta para a direita, centrada em (x, y). */
export function ChevronRight({ x, y, tone = "ink" }: { x: number; y: number; tone?: StrokeTone }) {
  return <Stroke d={`M${x - 2} ${y - 4} L${x + 2} ${y} L${x - 2} ${y + 4}`} tone={tone} w={1.5} />
}

/** Check dentro de uma caixa de 14 x 14 com canto em (x, y). */
export function Check({ x, y, tone = "onBrand" }: { x: number; y: number; tone?: StrokeTone }) {
  return <Stroke d={`M${x + 3.5} ${y + 7} L${x + 6} ${y + 9.5} L${x + 10.5} ${y + 4.5}`} tone={tone} w={1.75} />
}

/** Lupa centrada em (x, y). */
export function Search({ x, y, tone = "ink" }: { x: number; y: number; tone?: StrokeTone }) {
  return (
    <>
      <circle cx={x - 1} cy={y - 1} r={4} fill="none" className={STROKE[tone]} strokeWidth={1.5} />
      <Stroke d={`M${x + 2} ${y + 2} L${x + 5} ${y + 5}`} tone={tone} w={1.5} />
    </>
  )
}

/** X de fechar centrado em (x, y). */
export function Close({ x, y, tone = "ink" }: { x: number; y: number; tone?: StrokeTone }) {
  return <Stroke d={`M${x - 3} ${y - 3} L${x + 3} ${y + 3} M${x + 3} ${y - 3} L${x - 3} ${y + 3}`} tone={tone} w={1.5} />
}
