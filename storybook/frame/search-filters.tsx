import React from "react"

/** Grupo de filtros em chips: nenhum marcado mostra tudo. */
export function SearchFilterGroup<T extends string>({
  label,
  options,
  selected,
  getLabel = (option) => option,
  onChange,
}: {
  label: string
  options: T[]
  selected: T[]
  getLabel?: (option: T) => string
  onChange: (selected: T[]) => void
}) {
  if (options.length < 2) return null

  const toggle = (option: T) =>
    onChange(
      selected.includes(option)
        ? selected.filter((value) => value !== option)
        : [...selected, option],
    )

  return (
    <div className="frame-search__filter" role="group" aria-label={label}>
      <span className="frame-search__filter-label">{label}</span>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className="frame-search__chip"
          aria-pressed={selected.includes(option)}
          onClick={() => toggle(option)}
        >
          {getLabel(option)}
        </button>
      ))}
    </div>
  )
}
