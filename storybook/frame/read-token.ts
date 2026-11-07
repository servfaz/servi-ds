/**
 * Lê os tokens do DS já injetados no <head> do manager e devolve o valor
 * resolvido. O tema do Storybook precisa de cor em formato que ele consiga
 * manipular (rgb), então a cor do token é desenhada num canvas de 1px e lida
 * de volta já convertida para sRGB.
 */
const canvas = document.createElement("canvas")
canvas.width = 1
canvas.height = 1
const context = canvas.getContext("2d", { willReadFrequently: true })

function probe(property: string, value: string) {
  const element = document.createElement("span")
  element.style.setProperty(property, value)
  element.style.position = "absolute"
  element.style.visibility = "hidden"
  document.documentElement.appendChild(element)
  const computed = getComputedStyle(element).getPropertyValue(property)
  element.remove()
  return computed
}

export function tokenValue(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

export function tokenColor(name: string) {
  const computed = probe("color", `var(${name})`)
  if (!context) return computed
  context.clearRect(0, 0, 1, 1)
  context.fillStyle = computed
  context.fillRect(0, 0, 1, 1)
  const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data
  return a === 255 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${(a / 255).toFixed(3)})`
}

export function tokenPx(name: string) {
  return parseFloat(probe("width", `var(${name})`)) || 0
}
