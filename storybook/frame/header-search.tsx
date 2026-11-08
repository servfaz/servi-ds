import React, { useEffect, useState } from "react"
import { MagnifyingGlass } from "@phosphor-icons/react"
import { shortcutToHumanString, type API } from "storybook/manager-api"
import { useSidebarSearch } from "./sidebar-search"
import { SearchDialog } from "./search-dialog"

function searchShortcut(api: API) {
  try {
    const keys = api.getShortcutKeys().search
    return keys?.length ? shortcutToHumanString(keys) : ""
  } catch {
    return ""
  }
}

/**
 * Busca do header: um botão com cara de campo que abre o modal de busca.
 * O atalho de teclado do Storybook foca o campo escondido da barra lateral;
 * esse foco é desviado para abrir o modal.
 */
export function HeaderSearch({ api }: { api: API }) {
  const sidebarSearch = useSidebarSearch()
  const [open, setOpen] = useState(false)
  const shortcut = searchShortcut(api)

  useEffect(() => {
    if (!sidebarSearch) return
    sidebarSearch.tabIndex = -1
    const openDialog = () => {
      sidebarSearch.blur()
      setOpen(true)
    }
    sidebarSearch.addEventListener("focus", openDialog)
    return () => sidebarSearch.removeEventListener("focus", openDialog)
  }, [sidebarSearch])

  return (
    <>
      <button
        type="button"
        className="frame-header__search"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <MagnifyingGlass className="frame-header__icon" weight="regular" aria-hidden />
        <span className="frame-header__search-placeholder">Buscar</span>
        {shortcut && (
          <kbd className="frame-header__search-key" aria-hidden>
            {shortcut}
          </kbd>
        )}
      </button>
      <SearchDialog api={api} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
