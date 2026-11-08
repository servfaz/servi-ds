import React, { useEffect, useMemo, useState, type ComponentProps } from "react"
import { DocsContainer } from "@storybook/addon-docs/blocks"
import { addons } from "storybook/preview-api"
import { GLOBALS_UPDATED } from "storybook/internal/core-events"
import { createFrameTheme } from "../frame/frame-theme"
import { DARK_THEME, THEME_GLOBAL } from "../frame/docs-themes"

type DocsContainerProps = ComponentProps<typeof DocsContainer>
type GlobalsEvent = { globals?: Record<string, unknown> }

function initialTheme(context: DocsContainerProps["context"]) {
  try {
    const store = (context as { store?: { userGlobals?: { get(): Record<string, unknown> } } }).store
    return store?.userGlobals?.get()[THEME_GLOBAL]
  } catch {
    return undefined
  }
}

/**
 * Container das páginas de docs com o tema do Storybook (tabela de props,
 * blocos de código, controles) montado com os tokens do modo escolhido no
 * botão de tema, para os blocos acompanharem claro e escuro.
 */
export function ThemedDocsContainer({ context, children }: DocsContainerProps) {
  const [theme, setTheme] = useState(() => initialTheme(context))

  useEffect(() => {
    const channel = addons.getChannel()
    const sync = ({ globals }: GlobalsEvent) => setTheme(globals?.[THEME_GLOBAL])
    channel.on(GLOBALS_UPDATED, sync)
    return () => channel.off(GLOBALS_UPDATED, sync)
  }, [])

  const mode = theme === DARK_THEME ? "dark" : "light"
  const docsTheme = useMemo(() => {
    // Os tokens são lidos do <html>: a classe precisa estar certa antes da
    // leitura. É a mesma classe que o addon de temas aplica.
    document.documentElement.classList.toggle("dark", mode === "dark")
    return createFrameTheme(mode)
  }, [mode])

  return (
    <DocsContainer context={context} theme={docsTheme}>
      {children}
    </DocsContainer>
  )
}
