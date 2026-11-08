import { Bar, Box, Check, Close, Dot, Stroke, Thumb } from "./parts"

export function AlertThumb() {
  return (
    <Thumb>
      <Box x={28} y={48} w={184} h={54} r={8} tone="infoSoft" />
      <Dot cx={46} cy={64} r={7} tone="info" />
      <Bar x={60} y={60} w={70} tone="ink" />
      <Bar x={60} y={74} w={120} h={4} tone="line" />
      <Bar x={60} y={84} w={90} h={4} tone="line" />
      <Close x={198} y={63} />
    </Thumb>
  )
}

export function SonnerThumb() {
  return (
    <Thumb>
      <Box x={66} y={36} w={108} h={30} r={8} opacity={0.6} />
      <Box x={58} y={46} w={124} h={32} r={8} opacity={0.85} />
      <Box x={48} y={58} w={144} h={44} r={8} />
      <Dot cx={66} cy={80} r={7} tone="success" />
      <Check x={59} y={73} />
      <Bar x={80} y={72} w={56} tone="ink" />
      <Bar x={80} y={84} w={40} h={4} tone="soft" />
      <Box x={150} y={72} w={32} h={16} r={4} tone="muted" />
    </Thumb>
  )
}

export function ProgressThumb() {
  return (
    <Thumb>
      <Bar x={40} y={54} w={52} h={5} />
      <Bar x={178} y={54} w={22} h={5} tone="ink" />
      <Bar x={40} y={66} w={160} h={8} tone="muted" />
      <Bar x={40} y={66} w={104} h={8} tone="brand" />
      <Bar x={40} y={90} w={160} h={8} tone="muted" />
      <Bar x={40} y={90} w={56} h={8} tone="success" />
    </Thumb>
  )
}

export function SpinnerThumb() {
  return (
    <Thumb>
      <circle cx={120} cy={75} r={22} fill="none" className="stroke-[var(--color-background-muted)]" strokeWidth={6} />
      <Stroke d="M120 53 A22 22 0 0 1 142 75" tone="brand" w={6} />
    </Thumb>
  )
}

export function SkeletonThumb() {
  return (
    <Thumb>
      <Dot cx={58} cy={42} r={14} tone="muted" />
      <Bar x={80} y={34} w={90} h={8} tone="muted" />
      <Bar x={80} y={48} w={60} h={8} tone="muted" />
      <Box x={44} y={70} w={152} h={60} r={8} tone="muted" />
    </Thumb>
  )
}

export function EmptyThumb() {
  return (
    <Thumb>
      <Box x={44} y={14} w={152} h={122} r={10} tone="dashed" />
      <Dot cx={120} cy={42} r={14} tone="brandSoft" />
      <Box x={113} y={36} w={14} h={12} r={2} tone="brand" />
      <Bar x={88} y={66} w={64} />
      <Bar x={74} y={80} w={92} h={4} tone="soft" />
      <Bar x={84} y={90} w={72} h={4} tone="soft" />
      <Box x={98} y={104} w={44} h={18} r={5} tone="brand" />
      <Bar x={108} y={110} w={24} tone="onBrand" />
    </Thumb>
  )
}
