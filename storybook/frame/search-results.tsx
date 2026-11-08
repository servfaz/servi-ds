import React, { useEffect, useRef } from "react"
import { Bookmark, FileText, Flask } from "@phosphor-icons/react"
import type { SearchEntry, SearchKind } from "./search-index"

const KIND_ICONS: Record<SearchKind, typeof FileText> = {
  docs: FileText,
  story: Bookmark,
  test: Flask,
}

export const resultId = (index: number) => `frame-search-result-${index}`

/** Lista de resultados da busca, navegável pelas setas a partir do campo. */
export function SearchResults({
  id,
  results,
  active,
  loading,
  onHover,
  onSelect,
}: {
  id: string
  results: SearchEntry[]
  active: number
  loading: boolean
  onHover: (index: number) => void
  onSelect: (entry: SearchEntry) => void
}) {
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`#${resultId(active)}`)
      ?.scrollIntoView({ block: "nearest" })
  }, [active])

  if (loading) return <p className="frame-search__empty">Carregando…</p>
  if (results.length === 0) return <p className="frame-search__empty">Nenhum resultado.</p>

  return (
    <ul ref={listRef} id={id} role="listbox" aria-label="Resultados" className="frame-search__results">
      {results.map((entry, index) => {
        const Icon = KIND_ICONS[entry.kind]
        return (
          <li
            key={entry.id}
            id={resultId(index)}
            role="option"
            aria-selected={index === active}
            className="frame-search__result"
            onMouseMove={() => onHover(index)}
            onClick={() => onSelect(entry)}
          >
            <Icon className="frame-header__icon" weight="regular" aria-hidden />
            <span className="frame-search__result-text">
              <span className="frame-search__result-label">{entry.label}</span>
              <span className="frame-search__result-path">{entry.path}</span>
            </span>
          </li>
        )
      })}
    </ul>
  )
}
