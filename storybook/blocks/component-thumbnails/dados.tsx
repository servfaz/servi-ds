import { Bar, Box, ChevronRight, Dot, Search, Stroke, Thumb } from "./parts"

function Tabela({
  x,
  y,
  w,
  rows,
  selected,
  inset = 12,
}: {
  x: number
  y: number
  w: number
  rows: number
  selected?: number
  /** Recuo da primeira coluna (maior quando há caixa de seleção). */
  inset?: number
}) {
  const linha = 20
  return (
    <>
      <Box x={x} y={y} w={w} h={20 + rows * linha} r={6} />
      <Box x={x + 0.5} y={y + 0.5} w={w - 1} h={19.5} r={5.5} tone="muted" />
      <Bar x={x + inset} y={y + 8} w={30} h={4} />
      <Bar x={x + w * 0.45} y={y + 8} w={26} h={4} />
      <Bar x={x + w * 0.75} y={y + 8} w={22} h={4} />
      {Array.from({ length: rows }, (_, i) => {
        const ry = y + 20 + i * linha
        return (
          <g key={i}>
            {i === selected && <Box x={x + 0.5} y={ry} w={w - 1} h={linha} r={0} tone="brandSoft" />}
            <Box x={x} y={ry} w={w} h={1} r={0} tone="soft" />
            <Bar x={x + inset} y={ry + 8} w={40} h={4} tone="line" />
            <Bar x={x + w * 0.45} y={ry + 8} w={30} h={4} tone="soft" />
            <Bar x={x + w * 0.75} y={ry + 8} w={20} h={4} tone="soft" />
          </g>
        )
      })}
    </>
  )
}

export function TableThumb() {
  return (
    <Thumb>
      <Tabela x={28} y={25} w={184} rows={5} />
    </Thumb>
  )
}

export function DataTableThumb() {
  return (
    <Thumb>
      <Box x={28} y={12} w={84} h={20} r={5} />
      <Search x={38} y={22} />
      <Bar x={48} y={19} w={40} h={5} tone="soft" />
      <Box x={118} y={12} w={42} h={20} r={5} />
      <Bar x={128} y={19} w={22} h={5} />
      <Tabela x={28} y={40} w={184} rows={4} selected={1} inset={24} />
      <Box x={33} y={68} w={10} h={10} r={2} tone="surface" />
      <Box x={33} y={88} w={10} h={10} r={2} tone="brand" />
      <Box x={33} y={108} w={10} h={10} r={2} tone="surface" />
      <Box x={33} y={128} w={10} h={10} r={2} tone="surface" />
    </Thumb>
  )
}

export function TableGroupThumb() {
  return (
    <Thumb>
      <Bar x={28} y={10} w={50} tone="ink" />
      <Box x={84} y={8} w={20} h={10} r={5} tone="muted" />
      <Tabela x={28} y={24} w={184} rows={2} />
      <Bar x={28} y={92} w={60} tone="ink" />
      <Box x={94} y={90} w={20} h={10} r={5} tone="muted" />
      <Tabela x={28} y={106} w={184} rows={1} />
    </Thumb>
  )
}

export function ChartThumb() {
  const barras = [46, 70, 54, 88, 62, 100, 78]
  return (
    <Thumb>
      {[40, 70, 100].map((y) => (
        <Box key={y} x={34} y={y} w={176} h={1} r={0} tone="soft" />
      ))}
      {barras.map((h, i) => (
        <Box key={i} x={42 + i * 24} y={124 - h} w={14} h={h} r={3} tone={i === 5 ? "brand" : "brandSoft"} />
      ))}
      <Box x={34} y={124} w={176} h={1.5} r={0} tone="line" />
    </Thumb>
  )
}

export function BadgeThumb() {
  return (
    <Thumb>
      <Box x={36} y={50} w={50} h={20} r={10} tone="brand" />
      <Bar x={48} y={57} w={26} tone="onBrand" />
      <Box x={94} y={50} w={56} h={20} r={10} tone="brandSoft" />
      <Bar x={106} y={57} w={32} tone="brand" />
      <Box x={158} y={50} w={46} h={20} r={10} />
      <Bar x={170} y={57} w={22} />
      <Box x={62} y={80} w={58} h={20} r={10} />
      <Dot cx={75} cy={90} r={3.5} tone="success" />
      <Bar x={84} y={87} w={26} />
      <Box x={128} y={80} w={50} h={20} r={10} tone="muted" />
      <Bar x={140} y={87} w={26} />
    </Thumb>
  )
}

function Pessoa({ cx, cy }: { cx: number; cy: number }) {
  return (
    <>
      <Dot cx={cx} cy={cy} r={16} tone="surface" />
      <Dot cx={cx} cy={cy} r={15} tone="muted" />
      <Dot cx={cx} cy={cy - 4} r={5} tone="line" />
      <Stroke d={`M${cx - 8} ${cy + 10} Q${cx} ${cy + 1} ${cx + 8} ${cy + 10}`} tone="line" w={3} />
    </>
  )
}

export function AvatarThumb() {
  return (
    <Thumb>
      <Pessoa cx={78} cy={75} />
      <Pessoa cx={104} cy={75} />
      <Pessoa cx={130} cy={75} />
      <Dot cx={158} cy={75} r={16} tone="surface" />
      <Dot cx={158} cy={75} r={15} tone="brandSoft" />
      <Bar x={150} y={72} w={16} tone="brand" />
    </Thumb>
  )
}

function Tecla({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <>
      <Box x={x} y={y + 3} w={w} h={34} r={6} tone="muted" />
      <Box x={x} y={y} w={w} h={34} r={6} />
      <Bar x={x + w / 2 - 8} y={y + 14} w={16} />
    </>
  )
}

export function KbdThumb() {
  return (
    <Thumb>
      <Tecla x={62} y={56} w={48} />
      <Stroke d="M120 69 L120 79 M115 74 L125 74" tone="ink" w={1.5} />
      <Tecla x={132} y={56} w={40} />
    </Thumb>
  )
}

export function ItemThumb() {
  return (
    <Thumb>
      {[18, 60, 102].map((y, i) => (
        <g key={y}>
          <Box x={36} y={y} w={168} h={32} r={6} />
          <Box x={44} y={y + 7} w={18} h={18} r={4} tone={i === 0 ? "brandSoft" : "muted"} />
          <Bar x={70} y={y + 9} w={60} h={5} />
          <Bar x={70} y={y + 19} w={44} h={4} tone="soft" />
          <ChevronRight x={190} y={y + 16} />
        </g>
      ))}
    </Thumb>
  )
}

export function CardThumb() {
  return (
    <Thumb>
      <Box x={54} y={14} w={132} h={122} r={10} />
      <Bar x={66} y={28} w={60} />
      <Bar x={66} y={40} w={84} h={4} tone="soft" />
      <Dot cx={170} cy={32} r={6} tone="muted" />
      <Box x={66} y={54} w={108} h={46} r={6} tone="muted" />
      <Box x={66} y={110} w={44} h={16} r={4} />
      <Box x={130} y={110} w={44} h={16} r={4} tone="brand" />
    </Thumb>
  )
}

export function CarouselThumb() {
  return (
    <Thumb>
      <Box x={14} y={40} w={44} h={62} r={8} tone="muted" opacity={0.5} />
      <Box x={182} y={40} w={44} h={62} r={8} tone="muted" opacity={0.5} />
      <Box x={68} y={26} w={104} h={90} r={8} tone="muted" />
      <Dot cx={68} cy={71} r={11} tone="surface" />
      <Stroke d="M70 66 L65 71 L70 76" tone="ink" w={1.5} />
      <Dot cx={172} cy={71} r={11} tone="surface" />
      <ChevronRight x={173} y={71} />
      <Bar x={102} y={128} w={14} h={5} tone="brand" />
      <Dot cx={126} cy={130.5} r={2.5} tone="line" />
      <Dot cx={136} cy={130.5} r={2.5} tone="line" />
    </Thumb>
  )
}
