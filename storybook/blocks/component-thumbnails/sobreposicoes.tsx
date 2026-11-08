import { Bar, Box, Close, Dot, Stroke, Thumb } from "./parts"

/** Página ao fundo, apagada, atrás de modais e painéis. */
function PaginaAoFundo() {
  return (
    <g opacity={0.5}>
      <Bar x={20} y={18} w={70} />
      <Bar x={20} y={34} w={140} tone="soft" />
      <Bar x={20} y={48} w={120} tone="soft" />
      <Box x={20} y={64} w={200} h={68} r={6} tone="muted" />
    </g>
  )
}

export function DialogThumb() {
  return (
    <Thumb>
      <PaginaAoFundo />
      <Box x={54} y={26} w={132} h={98} r={10} />
      <Bar x={66} y={40} w={60} />
      <Close x={172} y={43} />
      <Bar x={66} y={56} w={104} h={4} tone="soft" />
      <Bar x={66} y={66} w={86} h={4} tone="soft" />
      <Box x={66} y={78} w={108} h={14} r={4} tone="surface" />
      <Box x={92} y={102} w={38} h={14} r={4} tone="surface" />
      <Box x={136} y={102} w={38} h={14} r={4} tone="brand" />
    </Thumb>
  )
}

export function AlertDialogThumb() {
  return (
    <Thumb>
      <PaginaAoFundo />
      <Box x={58} y={32} w={124} h={86} r={10} />
      <Bar x={70} y={46} w={70} />
      <Bar x={70} y={62} w={100} h={4} tone="soft" />
      <Bar x={70} y={72} w={80} h={4} tone="soft" />
      <Box x={90} y={94} w={40} h={14} r={4} tone="surface" />
      <Box x={136} y={94} w={36} h={14} r={4} tone="danger" />
    </Thumb>
  )
}

export function DrawerThumb() {
  return (
    <Thumb>
      <PaginaAoFundo />
      <Box x={24} y={58} w={192} h={110} r={14} />
      <Bar x={105} y={67} w={30} h={4} tone="line" />
      <Bar x={40} y={84} w={70} />
      <Bar x={40} y={98} w={150} h={4} tone="soft" />
      <Bar x={40} y={108} w={120} h={4} tone="soft" />
      <Box x={40} y={122} w={160} h={18} r={5} tone="brand" />
    </Thumb>
  )
}

export function SheetThumb() {
  return (
    <Thumb>
      <PaginaAoFundo />
      <Box x={136} y={-1} w={110} h={152} r={0} />
      <Bar x={148} y={18} w={50} />
      <Close x={226} y={21} />
      <Bar x={148} y={34} w={70} h={4} tone="soft" />
      <Box x={148} y={50} w={76} h={18} r={4} />
      <Box x={148} y={76} w={76} h={18} r={4} />
      <Box x={180} y={124} w={44} h={16} r={4} tone="brand" />
    </Thumb>
  )
}

export function PopoverThumb() {
  return (
    <Thumb>
      <Box x={60} y={20} w={120} h={66} r={8} />
      <Stroke d="M114 86 L120 92 L126 86" tone="soft" w={1} />
      <Bar x={72} y={32} w={50} />
      <Bar x={72} y={46} w={90} h={4} tone="soft" />
      <Box x={72} y={58} w={96} h={16} r={4} />
      <Box x={84} y={100} w={72} h={28} r={6} />
      <Bar x={100} y={111} w={40} />
    </Thumb>
  )
}

export function HoverCardThumb() {
  return (
    <Thumb>
      <Box x={44} y={18} w={152} h={78} r={8} />
      <Dot cx={64} cy={40} r={11} tone="muted" />
      <Bar x={82} y={33} w={50} />
      <Bar x={82} y={43} w={36} h={4} tone="soft" />
      <Bar x={56} y={62} w={124} h={4} tone="soft" />
      <Bar x={56} y={72} w={96} h={4} tone="soft" />
      <Bar x={88} y={110} w={64} tone="brand" />
      <Box x={88} y={119} w={64} h={1.5} r={0} tone="brand" />
    </Thumb>
  )
}

export function TooltipThumb() {
  return (
    <Thumb>
      <Box x={76} y={44} w={88} h={26} r={6} tone="inverse" />
      <path d="M114 70 L120 76 L126 70 Z" className="fill-[var(--color-background-inverse)]" />
      <Bar x={92} y={54} w={56} tone="onInverse" />
      <Box x={88} y={88} w={64} h={28} r={6} />
      <Bar x={102} y={99} w={36} />
    </Thumb>
  )
}
