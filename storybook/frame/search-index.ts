/**
 * Dados da busca do header: lê o índice que o Storybook publica (index.json)
 * e filtra por texto, seção e tipo. Não depende da busca da barra lateral.
 */
export type SearchKind = "docs" | "story" | "test"

export type SearchEntry = {
  id: string
  /** Nome principal mostrado no resultado. */
  label: string
  /** Caminho do item, mostrado abaixo do nome. */
  path: string
  section: string
  kind: SearchKind
}

export type SearchFilters = {
  sections: string[]
  kinds: SearchKind[]
}

type IndexEntry = {
  id: string
  type: "docs" | "story"
  title: string
  name: string
}

// Página sem grupo no título (Comece, Desenvolvedores) entra nesta seção.
const PAGES_SECTION = "Páginas"
const MAX_RESULTS = 50

export const KIND_LABELS: Record<SearchKind, string> = {
  docs: "Documentação",
  story: "Stories",
  test: "Testes",
}

function toSearchEntry({ id, type, title, name }: IndexEntry): SearchEntry {
  const parts = title.split("/")
  const section = parts.length > 1 ? parts[0] : PAGES_SECTION
  const last = parts[parts.length - 1]
  const kind: SearchKind = type === "docs" ? "docs" : name.startsWith("Teste:") ? "test" : "story"
  return {
    id,
    label: kind === "docs" ? last : name,
    path: kind === "docs" ? section : parts.join(" / "),
    section,
    kind,
  }
}

/**
 * Lê o index.json a cada abertura, para refletir stories novas no
 * Storybook local. No site público (modo docs) só entram as páginas.
 */
export async function loadSearchEntries(docsOnly: boolean): Promise<SearchEntry[]> {
  const response = await fetch(new URL("index.json", window.location.href))
  if (!response.ok) return []
  const data = (await response.json()) as { entries?: Record<string, IndexEntry> }
  return Object.values(data.entries ?? {})
    .map(toSearchEntry)
    .filter((entry) => !docsOnly || entry.kind === "docs")
}

/** Valores distintos, na ordem em que aparecem no índice. */
export function distinct<T>(values: T[]): T[] {
  return [...new Set(values)]
}

const normalize = (text: string) =>
  text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()

/** Quanto menor, mais relevante. Infinity quando não combina. */
function rank(entry: SearchEntry, query: string) {
  const label = normalize(entry.label)
  if (label.startsWith(query)) return 0
  if (label.includes(query)) return 1
  if (normalize(entry.path).includes(query)) return 2
  return Infinity
}

export function searchEntries(entries: SearchEntry[], query: string, filters: SearchFilters) {
  const text = normalize(query.trim())
  const filtered = entries.filter(
    (entry) =>
      (filters.sections.length === 0 || filters.sections.includes(entry.section)) &&
      (filters.kinds.length === 0 || filters.kinds.includes(entry.kind)),
  )
  if (!text) return filtered.slice(0, MAX_RESULTS)
  return filtered
    .map((entry) => ({ entry, score: rank(entry, text) }))
    .filter(({ score }) => score !== Infinity)
    .sort((a, b) => a.score - b.score)
    .slice(0, MAX_RESULTS)
    .map(({ entry }) => entry)
}
