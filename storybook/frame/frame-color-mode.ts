import type { API } from "storybook/manager-api"
import { GLOBALS_UPDATED, SET_GLOBALS } from "storybook/internal/core-events"
import { DARK_THEME, THEME_GLOBAL } from "./docs-themes"
import { createFrameTheme, type ColorMode } from "./frame-theme"

type GlobalsEvent = { globals?: Record<string, unknown> }

/**
 * Moldura em claro e escuro: segue o mesmo global de tema do preview. Aplica
 * a classe .dark no <html> do manager, como em qualquer consumidor, e monta
 * de novo o tema do Storybook com os tokens do modo escolhido.
 */
export function syncFrameColorMode(api: API) {
  let current: ColorMode | null = null

  const apply = (theme: unknown) => {
    const mode: ColorMode = theme === DARK_THEME ? "dark" : "light"
    if (mode === current) return
    current = mode
    document.documentElement.classList.toggle("dark", mode === "dark")
    document.documentElement.style.colorScheme = mode
    api.setOptions({ theme: createFrameTheme(mode) })
  }

  apply(api.getGlobals()[THEME_GLOBAL])
  const sync = ({ globals }: GlobalsEvent) => apply(globals?.[THEME_GLOBAL])
  api.on(GLOBALS_UPDATED, sync)
  api.on(SET_GLOBALS, sync)
}
