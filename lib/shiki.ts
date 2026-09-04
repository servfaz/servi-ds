import { codeToHtml, createCssVariablesTheme } from "shiki"

/**
 * Tema Shiki que não carrega cores próprias: cada tipo de token vira uma
 * var(--shiki-token-*), definida em app/globals.css referenciando os
 * primitivos do Servi DS (Regra 9, documentacao-design.md).
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
