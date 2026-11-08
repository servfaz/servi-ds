import { Bar, Box, Check, Chevron, ChevronRight, Dot, Search, Stroke, Thumb } from "./parts"

export function InputThumb() {
  return (
    <Thumb>
      <Bar x={50} y={46} w={44} h={5} />
      <Box x={50} y={58} w={140} h={32} />
      <Bar x={62} y={71} w={76} tone="soft" />
    </Thumb>
  )
}

export function InputGroupThumb() {
  return (
    <Thumb>
      <Box x={36} y={58} w={168} h={34} />
      <Box x={36} y={58} w={46} h={34} tone="muted" />
      <Bar x={47} y={72} w={24} />
      <Bar x={94} y={72} w={56} tone="soft" />
      <Box x={160} y={63} w={38} h={24} r={5} tone="brand" />
      <Bar x={170} y={72} w={18} tone="onBrand" />
    </Thumb>
  )
}

export function InputOtpThumb() {
  const casas = [0, 1, 2, 3, 4, 5]
  return (
    <Thumb>
      {casas.map((i) => (
        <Box key={i} x={28 + i * 32} y={58} w={24} h={34} r={6} tone={i === 2 ? "focus" : "surface"} />
      ))}
      <Dot cx={40} cy={75} r={4} tone="ink" />
      <Dot cx={72} cy={75} r={4} tone="ink" />
      <Box x={103} y={67} w={2} h={16} r={1} tone="brand" />
    </Thumb>
  )
}

export function TextareaThumb() {
  return (
    <Thumb>
      <Bar x={50} y={30} w={44} h={5} />
      <Box x={50} y={42} w={140} h={74} />
      <Bar x={62} y={55} w={112} tone="soft" />
      <Bar x={62} y={68} w={96} tone="soft" />
      <Bar x={62} y={81} w={64} tone="soft" />
      <Stroke d="M182 104 L178 108 M184 108 L182 110" tone="line" w={1.5} />
    </Thumb>
  )
}

export function FieldThumb() {
  return (
    <Thumb>
      <Bar x={50} y={34} w={48} h={5} />
      <Bar x={50} y={45} w={86} h={4} tone="soft" />
      <Box x={50} y={56} w={140} h={32} />
      <Bar x={62} y={69} w={70} tone="soft" />
      <Bar x={50} y={98} w={100} h={4} tone="soft" />
    </Thumb>
  )
}

export function FormThumb() {
  return (
    <Thumb>
      <Bar x={50} y={22} w={40} h={5} />
      <Box x={50} y={32} w={140} h={24} />
      <Bar x={50} y={66} w={52} h={5} />
      <Box x={50} y={76} w={140} h={24} />
      <Box x={126} y={110} w={64} h={24} r={6} tone="brand" />
      <Bar x={140} y={119} w={36} tone="onBrand" />
    </Thumb>
  )
}

export function CheckboxThumb() {
  const linhas = [
    { y: 44, marcado: true, w: 76 },
    { y: 68, marcado: true, w: 60 },
    { y: 92, marcado: false, w: 70 },
  ]
  return (
    <Thumb>
      {linhas.map(({ y, marcado, w }) => (
        <g key={y}>
          <Box x={66} y={y} w={14} h={14} r={3} tone={marcado ? "brand" : "surface"} />
          {marcado && <Check x={66} y={y} />}
          <Bar x={90} y={y + 4} w={w} />
        </g>
      ))}
    </Thumb>
  )
}

export function RadioGroupThumb() {
  const linhas = [
    { y: 51, w: 76 },
    { y: 75, w: 60 },
    { y: 99, w: 70 },
  ]
  return (
    <Thumb>
      {linhas.map(({ y, w }, i) => (
        <g key={y}>
          <Dot cx={73} cy={y} r={7} tone={i === 0 ? "focus" : "surface"} />
          {i === 0 && <Dot cx={73} cy={y} r={3.5} tone="brand" />}
          <Bar x={90} y={y - 3} w={w} />
        </g>
      ))}
    </Thumb>
  )
}

export function SwitchThumb() {
  return (
    <Thumb>
      <Box x={66} y={61} w={52} h={28} r={14} tone="brand" />
      <Dot cx={104} cy={75} r={10} tone="onBrand" />
      <Box x={130} y={61} w={52} h={28} r={14} tone="muted" />
      <Dot cx={144} cy={75} r={10} tone="surface" />
    </Thumb>
  )
}

export function SelectThumb() {
  return (
    <Thumb>
      <Box x={55} y={22} w={130} h={28} />
      <Bar x={66} y={33} w={60} />
      <Chevron x={172} y={36} />
      <Box x={55} y={56} w={130} h={72} />
      <Bar x={66} y={68} w={70} tone="soft" />
      <Box x={60} y={81} w={120} h={20} r={4} tone="brandSoft" />
      <Bar x={66} y={88} w={56} />
      <Bar x={66} y={110} w={64} tone="soft" />
    </Thumb>
  )
}

export function ComboboxThumb() {
  return (
    <Thumb>
      <Box x={55} y={18} w={130} h={26} />
      <Bar x={66} y={28} w={54} />
      <Chevron x={172} y={31} />
      <Box x={55} y={50} w={130} h={82} />
      <Search x={68} y={63} />
      <Bar x={80} y={60} w={50} tone="soft" />
      <Box x={55} y={74} w={130} h={1} r={0} tone="soft" />
      <Bar x={66} y={84} w={60} />
      <Check x={162} y={80} tone="brand" />
      <Bar x={66} y={100} w={70} tone="soft" />
      <Bar x={66} y={116} w={50} tone="soft" />
    </Thumb>
  )
}

export function SliderThumb() {
  return (
    <Thumb>
      <Bar x={40} y={72} w={160} h={6} tone="muted" />
      <Bar x={40} y={72} w={96} h={6} tone="brand" />
      <Dot cx={136} cy={75} r={9} tone="focus" />
    </Thumb>
  )
}

function MiniCalendar({ x, y, cols = 7, rows = 5, cell = 14, selected = 17 }: { x: number; y: number; cols?: number; rows?: number; cell?: number; selected?: number }) {
  const dias = Array.from({ length: cols * rows }, (_, i) => i)
  return (
    <>
      {dias.map((i) => {
        const cx = x + (i % cols) * cell + cell / 2
        const cy = y + Math.floor(i / cols) * cell + cell / 2
        return i === selected ? (
          <Box key={i} x={cx - 6} y={cy - 6} w={12} h={12} r={3} tone="brand" />
        ) : (
          <Box key={i} x={cx - 3} y={cy - 2} w={6} h={4} r={2} tone={i < 2 ? "soft" : "line"} />
        )
      })}
    </>
  )
}

export function CalendarThumb() {
  return (
    <Thumb>
      <Box x={62} y={16} w={116} h={118} r={8} />
      <Bar x={98} y={28} w={44} />
      <Stroke d="M76 27 L72 31 L76 35" tone="ink" w={1.5} />
      <ChevronRight x={166} y={31} />
      <MiniCalendar x={71} y={44} />
    </Thumb>
  )
}

export function DatePickerThumb() {
  return (
    <Thumb>
      <Box x={44} y={16} w={152} h={28} />
      <Box x={54} y={24} w={12} h={12} r={2} tone="line" />
      <Bar x={74} y={27} w={64} />
      <Box x={60} y={50} w={120} h={86} r={8} />
      <Bar x={98} y={60} w={44} h={5} />
      <MiniCalendar x={71} y={72} cell={14} rows={4} selected={11} />
    </Thumb>
  )
}

export function SearchBarThumb() {
  return (
    <Thumb>
      <Box x={36} y={58} w={168} h={34} r={8} />
      <Search x={53} y={75} />
      <Bar x={68} y={72} w={64} tone="soft" />
      <Box x={164} y={66} w={30} h={18} r={4} tone="muted" />
      <Bar x={171} y={72} w={16} h={5} />
    </Thumb>
  )
}
