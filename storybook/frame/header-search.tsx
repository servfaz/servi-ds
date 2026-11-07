import React, { useEffect, useRef, useState, type KeyboardEvent } from "react"
import { MagnifyingGlass } from "@phosphor-icons/react"
import { shortcutToHumanString, type API } from "storybook/manager-api"
import { pressSidebarSearchKey, useSidebarSearch, writeSidebarSearch } from "./sidebar-search"

// Teclas que navegam e escolhem na lista de resultados da barra lateral.
const RESULT_KEYS = ["ArrowDown", "ArrowUp", "Enter"]

function searchShortcut(api: API) {
  try {
    const keys = api.getShortcutKeys().search
    return keys?.length ? shortcutToHumanString(keys) : ""
  } catch {
    return ""
  }
}

/**
 * Campo de busca do header. Comanda a busca do Storybook pela ponte com o
 * campo da barra lateral: os resultados aparecem na barra lateral, como
 * antes, e o atalho de teclado do Storybook passa a focar este campo.
 */
export function HeaderSearch({ api }: { api: API }) {
  const sidebarSearch = useSidebarSearch()
  const fieldRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState("")
  const [focused, setFocused] = useState(false)
  const shortcut = searchShortcut(api)

  useEffect(() => {
    if (!sidebarSearch) return
    // Fora da ordem de tabulação: quem recebe o foco é o campo do header.
    sidebarSearch.tabIndex = -1
    setQuery(sidebarSearch.value)

    // O Storybook limpa ou mantém a busca sozinho (ao escolher um resultado,
    // por exemplo). O React espelha o valor no atributo, então dá para seguir.
    const sync = new MutationObserver(() => setQuery(sidebarSearch.value))
    sync.observe(sidebarSearch, { attributes: true, attributeFilter: ["value"] })

    const redirectFocus = () => fieldRef.current?.focus()
    sidebarSearch.addEventListener("focus", redirectFocus)

    return () => {
      sync.disconnect()
      sidebarSearch.removeEventListener("focus", redirectFocus)
    }
  }, [sidebarSearch])

  const search = (value: string) => {
    setQuery(value)
    if (!sidebarSearch) return
    if (value.trim()) api.toggleNav(true)
    writeSidebarSearch(sidebarSearch, value)
    // Campo vazio: a barra lateral volta para a árvore de páginas.
    if (!value.trim()) pressSidebarSearchKey(sidebarSearch, "Escape")
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!sidebarSearch) return
    if (RESULT_KEYS.includes(event.key)) {
      event.preventDefault()
      pressSidebarSearchKey(sidebarSearch, event.key)
    } else if (event.key === "Escape") {
      event.preventDefault()
      if (query) search("")
      else fieldRef.current?.blur()
    }
  }

  return (
    <div className="frame-header__search" role="search">
      <MagnifyingGlass className="frame-header__icon" weight="regular" aria-hidden />
      <input
        ref={fieldRef}
        type="search"
        className="frame-header__search-input"
        placeholder="Buscar"
        aria-label="Buscar na documentação"
        autoComplete="off"
        spellCheck={false}
        value={query}
        onChange={(event) => search(event.target.value)}
        onKeyDown={onKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {shortcut && !query && !focused && (
        <kbd className="frame-header__search-key" aria-hidden>
          {shortcut}
        </kbd>
      )}
    </div>
  )
}
