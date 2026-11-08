import { useEffect, useState } from "react"

/**
 * Campo de busca da barra lateral do Storybook. Ele fica fora de vista: a
 * busca visível é o modal do header. O campo continua no DOM só porque é ele
 * que o atalho de teclado do Storybook foca, e esse foco abre o modal.
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
