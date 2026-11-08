import React, { useEffect, useState } from "react"
import { Moon, Sun } from "@phosphor-icons/react"
import type { API } from "storybook/manager-api"
import { GLOBALS_UPDATED, SET_GLOBALS } from "storybook/internal/core-events"
import { DARK_THEME, LIGHT_THEME, THEME_GLOBAL } from "./docs-themes"

type GlobalsEvent = { globals?: Record<string, unknown> }

/**
 * Alterna o tema da documentação (claro ou escuro). Usa o mesmo global do
 * addon-themes, então fica em sincronia com o seletor da barra de ferramentas.
 */
export function HeaderThemeButton({ api }: { api: API }) {
  const [theme, setTheme] = useState(
    () => (api.getGlobals()[THEME_GLOBAL] as string | undefined) || LIGHT_THEME,
  )

  useEffect(() => {
    const sync = ({ globals }: GlobalsEvent) =>
      setTheme((globals?.[THEME_GLOBAL] as string | undefined) || LIGHT_THEME)
    api.on(GLOBALS_UPDATED, sync)
    api.on(SET_GLOBALS, sync)
    return () => {
      api.off(GLOBALS_UPDATED, sync)
      api.off(SET_GLOBALS, sync)
    }
  }, [api])

  const isDark = theme === DARK_THEME

  return (
    <button
      type="button"
      className="frame-header__icon-button"
      aria-pressed={isDark}
      aria-label={isDark ? "Usar tema claro" : "Usar tema escuro"}
      title="Tema"
      onClick={() => api.updateGlobals({ [THEME_GLOBAL]: isDark ? LIGHT_THEME : DARK_THEME })}
    >
      {isDark ? (
        <Moon className="frame-header__icon" weight="regular" aria-hidden />
      ) : (
        <Sun className="frame-header__icon" weight="regular" aria-hidden />
      )}
    </button>
  )
}
