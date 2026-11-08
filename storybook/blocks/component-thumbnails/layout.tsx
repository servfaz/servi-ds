import { Bar, Box, Chevron, Dot, Stroke, Thumb } from "./parts"

export function AccordionThumb() {
  return (
    <Thumb>
      <Box x={36} y={18} w={168} h={114} r={8} />
      <Bar x={48} y={30} w={70} />
      <Chevron x={190} y={33} up />
      <Bar x={48} y={46} w={130} h={4} tone="soft" />
      <Bar x={48} y={56} w={110} h={4} tone="soft" />
      <Box x={36} y={72} w={168} h={1} r={0} tone="soft" />
      <Bar x={48} y={84} w={60} />
      <Chevron x={190} y={87} />
      <Box x={36} y={102} w={168} h={1} r={0} tone="soft" />
      <Bar x={48} y={114} w={80} />
      <Chevron x={190} y={117} />
    </Thumb>
  )
}

export function CollapsibleThumb() {
  return (
    <Thumb>
      <Bar x={48} y={26} w={80} />
      <Box x={164} y={18} w={26} h={22} r={5} />
      <Chevron x={177} y={26} up />
      <Chevron x={177} y={32} />
      <Box x={48} y={48} w={142} h={24} r={6} />
      <Bar x={58} y={57} w={60} h={5} />
      <Box x={48} y={78} w={142} h={24} r={6} />
      <Bar x={58} y={87} w={74} h={5} />
      <Box x={48} y={108} w={142} h={24} r={6} />
      <Bar x={58} y={117} w={52} h={5} />
    </Thumb>
  )
}

export function AspectRatioThumb() {
  return (
    <Thumb>
      <Box x={44} y={32} w={152} h={86} r={8} tone="muted" />
      <Dot cx={166} cy={54} r={8} tone="line" />
      <path d="M44 118 L44 104 L88 66 L122 96 L142 80 L196 118 Z" className="fill-[var(--color-border-strong)]" />
      <Stroke d="M36 40 L36 26 L50 26" tone="brand" w={1.5} />
      <Stroke d="M204 110 L204 124 L190 124" tone="brand" w={1.5} />
    </Thumb>
  )
}

export function ResizableThumb() {
  return (
    <Thumb>
      <Box x={24} y={18} w={192} h={114} r={8} />
      <Box x={100} y={18} w={1} h={114} r={0} tone="soft" />
      <Box x={101} y={74} w={115} h={1} r={0} tone="soft" />
      <Box x={95} y={64} w={11} h={22} r={4} tone="surface" />
      <Dot cx={100.5} cy={70} r={1.25} tone="ink" />
      <Dot cx={100.5} cy={75} r={1.25} tone="ink" />
      <Dot cx={100.5} cy={80} r={1.25} tone="ink" />
      <Bar x={36} y={32} w={44} />
      <Bar x={36} y={46} w={52} h={4} tone="soft" />
      <Bar x={116} y={32} w={60} />
      <Bar x={116} y={88} w={50} />
    </Thumb>
  )
}

export function ScrollAreaThumb() {
  return (
    <Thumb>
      <Box x={48} y={16} w={144} h={118} r={8} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <Bar x={60} y={30 + i * 17} w={i % 2 ? 70 : 90} h={5} tone={i % 2 ? "soft" : "line"} />
        </g>
      ))}
      <Bar x={180} y={24} w={4} h={102} tone="muted" />
      <Bar x={180} y={34} w={4} h={36} tone="line" />
    </Thumb>
  )
}

export function SeparatorThumb() {
  return (
    <Thumb>
      <Bar x={44} y={38} w={80} />
      <Bar x={44} y={52} w={120} h={4} tone="soft" />
      <Box x={44} y={70} w={152} h={1.5} r={0} tone="line" />
      <Bar x={44} y={92} w={30} />
      <Box x={86} y={86} w={1.5} h={18} r={0} tone="line" />
      <Bar x={98} y={92} w={30} />
      <Box x={140} y={86} w={1.5} h={18} r={0} tone="line" />
      <Bar x={152} y={92} w={36} />
    </Thumb>
  )
}
