import { Bar, Box, Thumb } from "./parts"

export function ButtonThumb() {
  return (
    <Thumb>
      <Box x={60} y={58} w={120} h={34} r={8} tone="brand" />
      <Bar x={88} y={72} w={64} tone="onBrand" />
    </Thumb>
  )
}

export function ButtonGroupThumb() {
  return (
    <Thumb>
      <Box x={40} y={58} w={160} h={34} r={8} />
      <Box x={93} y={58} w={1} h={34} r={0} tone="soft" />
      <Box x={146} y={58} w={1} h={34} r={0} tone="soft" />
      <Bar x={52} y={72} w={30} />
      <Bar x={105} y={72} w={30} />
      <Bar x={158} y={72} w={30} />
    </Thumb>
  )
}

export function ToggleThumb() {
  return (
    <Thumb>
      <Box x={72} y={55} w={40} h={40} r={8} tone="brandSoft" />
      <Box x={84} y={67} w={16} h={16} r={3} tone="brand" />
      <Box x={128} y={55} w={40} h={40} r={8} />
      <Box x={140} y={67} w={16} h={16} r={3} tone="line" />
    </Thumb>
  )
}

export function ToggleGroupThumb() {
  return (
    <Thumb>
      <Box x={48} y={56} w={144} h={38} r={8} />
      <Box x={98} y={60} w={44} h={30} r={6} tone="brandSoft" />
      <Box x={65} y={67} w={16} h={16} r={3} tone="line" />
      <Box x={112} y={67} w={16} h={16} r={3} tone="brand" />
      <Box x={159} y={67} w={16} h={16} r={3} tone="line" />
    </Thumb>
  )
}
