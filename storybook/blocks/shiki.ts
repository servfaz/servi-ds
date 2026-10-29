import { createCssVariablesTheme } from "shiki/core"
import { codeToHtml } from "shiki/bundle/web"

/**
 * Tema Shiki sem cores próprias: cada tipo de token vira uma
 * var(--shiki-token-*), definida em storybook/styles/globals.css
 * referenciando os primitivos do Servi DS (Regra 9).
 */
const theme = createCssVariablesTheme({ name: "servfaz" })

export async function highlightCode(
  code: string,
  language?: string
): Promise<string> {
  try {
    return await codeToHtml(code, { lang: language || "text", theme })
  } catch {
    return codeToHtml(code, { lang: "text", theme })
  }
}
