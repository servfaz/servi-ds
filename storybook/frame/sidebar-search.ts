import { useEffect, useState } from "react"

/**
 * Ponte com o campo de busca da barra lateral do Storybook. O campo visível
 * fica no header (HeaderSearch), mas quem busca e lista os resultados
 * continua sendo o Storybook: o header escreve neste campo, que fica fora de
 * vista na barra lateral, e repassa as teclas de navegação.
 */
export const SIDEBAR_SEARCH_ID = "storybook-explorer-searchfield"

const findSidebarSearch = () =>
  document.getElementById(SIDEBAR_SEARCH_ID) as HTMLInputElement | null

/**
 * Devolve o campo da barra lateral e acompanha quando o Storybook o recria
 * (troca entre desktop e mobile, recarga da barra lateral).
 */
export function useSidebarSearch() {
  const [input, setInput] = useState(findSidebarSearch)

  useEffect(() => {
    const root = document.getElementById("root")
    if (!root) return
    const check = () => setInput(findSidebarSearch())
    const observer = new MutationObserver(check)
    observer.observe(root, { childList: true, subtree: true })
    check()
    return () => observer.disconnect()
  }, [])

  return input
}

/**
 * Escreve no campo controlado pelo React do Storybook. O setter nativo passa
 * por fora do controle do React, e o evento "input" faz o Storybook buscar.
 */
export function writeSidebarSearch(input: HTMLInputElement, value: string) {
  const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set
  setValue?.call(input, value)
  input.dispatchEvent(new Event("input", { bubbles: true }))
}

/** Repassa uma tecla (setas, Enter, Escape) para a lista de resultados. */
export function pressSidebarSearchKey(input: HTMLInputElement, key: string) {
  input.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }))
}
