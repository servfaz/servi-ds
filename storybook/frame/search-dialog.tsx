import React, { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react"
import { MagnifyingGlass } from "@phosphor-icons/react"
import type { API } from "storybook/manager-api"
import {
  KIND_LABELS,
  distinct,
  loadSearchEntries,
  searchEntries,
  type SearchEntry,
  type SearchKind,
} from "./search-index"
import { SearchFilterGroup } from "./search-filters"
import { SearchResults, resultId } from "./search-results"

const RESULTS_ID = "frame-search-results"
// Mesma duração da transição de saída no CSS; a espera de reserva usa um
// pouco mais, para o caso de o navegador não disparar transitionend.
const CLOSE_FALLBACK_MS = 240

/**
 * Modal de busca: campo, filtros de seção e de tipo e a lista de
 * resultados. Os filtros de tipo só aparecem no Storybook local, onde
 * existem stories e testes além das páginas.
 */
export function SearchDialog({
  api,
  open,
  onClose,
}: {
  api: API
  open: boolean
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [entries, setEntries] = useState<SearchEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")
  const [sections, setSections] = useState<string[]>([])
  const [kinds, setKinds] = useState<SearchKind[]>([])
  const [active, setActive] = useState(0)
  const docsOnly = document.body.classList.contains("servi-docs-mode")

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      delete dialog.dataset.closing
      dialog.showModal()
      inputRef.current?.select()
      setLoading(true)
      loadSearchEntries(docsOnly)
        .then(setEntries)
        .catch(() => setEntries([]))
        .finally(() => setLoading(false))
    } else if (!open && dialog.open) {
      // Saída animada: marca o modal como fechando, espera a transição do CSS
      // terminar e só então fecha de verdade.
      dialog.dataset.closing = ""
      let done = false
      const finish = () => {
        if (done) return
        done = true
        dialog.removeEventListener("transitionend", onEnd)
        delete dialog.dataset.closing
        dialog.close()
      }
      const onEnd = (event: TransitionEvent) => {
        if (event.target === dialog && event.propertyName === "opacity") finish()
      }
      dialog.addEventListener("transitionend", onEnd)
      const fallback = window.setTimeout(finish, CLOSE_FALLBACK_MS)
      return () => {
        window.clearTimeout(fallback)
        finish()
      }
    }
  }, [open, docsOnly])

  const results = useMemo(
    () => searchEntries(entries, query, { sections, kinds }),
    [entries, query, sections, kinds],
  )

  useEffect(() => setActive(0), [query, sections, kinds])

  const select = (entry: SearchEntry) => {
    api.selectStory(entry.id)
    onClose()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault()
      const step = event.key === "ArrowDown" ? 1 : -1
      setActive((index) => Math.min(Math.max(index + step, 0), results.length - 1))
    } else if (event.key === "Enter" && results[active]) {
      event.preventDefault()
      select(results[active])
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="frame-search"
      aria-label="Buscar na documentação"
      onClose={onClose}
      // Esc: em vez do fechamento seco do navegador, passa pela saída animada.
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      // Clique fora da caixa (no fundo escurecido) fecha o modal.
      onClick={(event) => event.target === dialogRef.current && onClose()}
    >
      <div className="frame-search__box">
        <div className="frame-search__field">
          <MagnifyingGlass className="frame-header__icon" weight="regular" aria-hidden />
          <input
            ref={inputRef}
            type="text"
            className="frame-search__input"
            placeholder="Buscar páginas e componentes"
            autoComplete="off"
            spellCheck={false}
            role="combobox"
            aria-expanded="true"
            aria-controls={RESULTS_ID}
            aria-activedescendant={results[active] ? resultId(active) : undefined}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
          />
          <kbd className="frame-header__search-key">Esc</kbd>
        </div>

        <div className="frame-search__filters">
          <SearchFilterGroup
            label="Seção"
            options={distinct(entries.map((entry) => entry.section))}
            selected={sections}
            onChange={setSections}
          />
          {!docsOnly && (
            <SearchFilterGroup
              label="Tipo"
              options={distinct(entries.map((entry) => entry.kind))}
              selected={kinds}
              getLabel={(kind) => KIND_LABELS[kind]}
              onChange={setKinds}
            />
          )}
        </div>

        <SearchResults
          id={RESULTS_ID}
          results={results}
          active={active}
          loading={loading}
          onHover={setActive}
          onSelect={select}
        />

        <p className="frame-search__hint" aria-hidden>
          <span><kbd className="frame-header__search-key">↑</kbd> <kbd className="frame-header__search-key">↓</kbd> navegar</span>
          <span><kbd className="frame-header__search-key">Enter</kbd> abrir</span>
        </p>
      </div>
    </dialog>
  )
}
