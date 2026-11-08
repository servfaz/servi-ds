import { Bar, Box, Chevron, ChevronRight, Dot, Search, Stroke, Thumb } from "./parts"

export function BreadcrumbThumb() {
  return (
    <Thumb>
      <Bar x={36} y={72} w={32} />
      <ChevronRight x={80} y={75} />
      <Bar x={92} y={72} w={40} />
      <ChevronRight x={144} y={75} />
      <Bar x={156} y={72} w={48} tone="ink" />
    </Thumb>
  )
}

export function TabsThumb() {
  return (
    <Thumb>
      <Bar x={44} y={36} w={40} tone="ink" />
      <Bar x={102} y={36} w={40} />
      <Bar x={160} y={36} w={36} />
      <Box x={36} y={53} w={168} h={1} r={0} tone="soft" />
      <Box x={36} y={51} w={56} h={3} r={1.5} tone="brand" />
      <Bar x={36} y={70} w={150} tone="soft" />
      <Bar x={36} y={84} w={120} tone="soft" />
      <Bar x={36} y={98} w={140} tone="soft" />
      <Bar x={36} y={112} w={90} tone="soft" />
    </Thumb>
  )
}

export function PaginationThumb() {
  const casas = [0, 1, 2, 3, 4, 5, 6]
  return (
    <Thumb>
      {casas.map((i) => {
        const x = 25 + i * 28
        const ativa = i === 2
        return (
          <g key={i}>
            <Box x={x} y={64} w={22} h={22} r={5} tone={ativa ? "brand" : "surface"} />
            {i === 0 && <Stroke d={`M${x + 13} ${71} L${x + 9} ${75} L${x + 13} ${79}`} tone="ink" w={1.5} />}
            {i === 6 && <ChevronRight x={x + 11} y={75} />}
            {i > 0 && i < 6 && i !== 4 && <Bar x={x + 8} y={72} w={6} tone={ativa ? "onBrand" : "line"} />}
            {i === 4 && (
              <>
                <Dot cx={x + 7} cy={75} r={1.5} tone="ink" />
                <Dot cx={x + 11} cy={75} r={1.5} tone="ink" />
                <Dot cx={x + 15} cy={75} r={1.5} tone="ink" />
              </>
            )}
          </g>
        )
      })}
    </Thumb>
  )
}

export function NavigationMenuThumb() {
  return (
    <Thumb>
      <Bar x={44} y={22} w={36} tone="ink" />
      <Chevron x={88} y={25} up />
      <Bar x={104} y={22} w={36} />
      <Bar x={156} y={22} w={36} />
      <Box x={36} y={38} w={168} h={96} r={8} />
      {[0, 1].map((col) =>
        [0, 1, 2].map((row) => {
          const x = 48 + col * 80
          const y = 50 + row * 26
          return (
            <g key={`${col}-${row}`}>
              <Box x={x} y={y} w={14} h={14} r={3} tone={col === 0 && row === 0 ? "brandSoft" : "muted"} />
              <Bar x={x + 20} y={y + 1} w={40} h={5} />
              <Bar x={x + 20} y={y + 9} w={30} h={4} tone="soft" />
            </g>
          )
        }),
      )}
    </Thumb>
  )
}

export function MenubarThumb() {
  return (
    <Thumb>
      <Box x={30} y={18} w={180} h={26} />
      <Box x={34} y={22} w={40} h={18} r={4} tone="brandSoft" />
      <Bar x={42} y={28} w={24} tone="ink" />
      <Bar x={84} y={28} w={28} />
      <Bar x={124} y={28} w={24} />
      <Bar x={160} y={28} w={30} />
      <Box x={34} y={48} w={104} h={84} r={6} />
      {[60, 80, 108].map((y) => (
        <g key={y}>
          <Bar x={44} y={y} w={44} />
          <Bar x={108} y={y} w={20} h={5} tone="soft" />
        </g>
      ))}
      <Box x={34} y={96} w={104} h={1} r={0} tone="soft" />
    </Thumb>
  )
}

export function SidebarThumb() {
  return (
    <Thumb>
      <Box x={24} y={14} w={192} h={122} r={8} />
      <Box x={24} y={14} w={66} h={122} r={8} tone="muted" />
      <Box x={32} y={24} w={50} h={8} r={4} tone="line" />
      {[0, 1, 2, 3, 4].map((i) => {
        const y = 46 + i * 15
        return (
          <g key={i}>
            {i === 1 && <Box x={30} y={y - 5} w={54} h={14} r={4} tone="brandSoft" />}
            <Dot cx={39} cy={y + 2} r={3} tone={i === 1 ? "brand" : "line"} />
            <Bar x={47} y={y} w={30} h={4} tone={i === 1 ? "ink" : "line"} />
          </g>
        )
      })}
      <Dot cx={38} cy={124} r={5} tone="line" />
      <Bar x={48} y={122} w={28} h={4} tone="line" />
      <Box x={100} y={24} w={106} h={30} r={6} tone="muted" />
      <Box x={100} y={62} w={106} h={64} r={6} tone="muted" />
    </Thumb>
  )
}

export function DropdownMenuThumb() {
  return (
    <Thumb>
      <Box x={50} y={16} w={76} h={26} />
      <Bar x={60} y={26} w={40} />
      <Chevron x={113} y={29} />
      <Box x={50} y={48} w={120} h={86} r={6} />
      <Bar x={60} y={58} w={36} h={4} tone="soft" />
      <Box x={54} y={68} w={112} h={18} r={4} tone="brandSoft" />
      <Bar x={62} y={74} w={56} tone="ink" />
      <Bar x={62} y={94} w={48} />
      <Box x={50} y={108} w={120} h={1} r={0} tone="soft" />
      <Bar x={62} y={118} w={60} />
      <ChevronRight x={156} y={121} />
    </Thumb>
  )
}

export function ContextMenuThumb() {
  return (
    <Thumb>
      <Box x={24} y={16} w={192} h={118} r={8} tone="dashed" />
      <Stroke d="M86 44 L86 60 L90 56 L93 63 L96 62 L93 55 L98 55 Z" tone="ink" w={1.25} />
      <Box x={96} y={58} w={104} h={66} r={6} />
      {[68, 84, 108].map((y) => (
        <g key={y}>
          <Bar x={106} y={y} w={48} />
          <Bar x={172} y={y} w={18} h={5} tone="soft" />
        </g>
      ))}
      <Box x={96} y={98} w={104} h={1} r={0} tone="soft" />
    </Thumb>
  )
}

export function CommandThumb() {
  return (
    <Thumb>
      <Box x={36} y={14} w={168} h={122} r={8} />
      <Search x={50} y={30} />
      <Bar x={62} y={27} w={70} tone="soft" />
      <Box x={36} y={44} w={168} h={1} r={0} tone="soft" />
      <Bar x={46} y={54} w={30} h={4} tone="soft" />
      {[0, 1, 2].map((i) => {
        const y = 64 + i * 22
        return (
          <g key={i}>
            {i === 0 && <Box x={40} y={y} w={160} h={20} r={4} tone="brandSoft" />}
            <Box x={48} y={y + 5} w={10} h={10} r={2} tone={i === 0 ? "brand" : "line"} />
            <Bar x={66} y={y + 7} w={56} tone={i === 0 ? "ink" : "line"} />
            <Box x={170} y={y + 4} w={22} h={12} r={3} tone="muted" />
          </g>
        )
      })}
    </Thumb>
  )
}
