"use client"

import * as React from "react"
import {
  FunnelSimpleIcon,
  MagnifyingGlassIcon,
  SparkleIcon,
  XIcon,
} from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Button } from "./button"

/*
 * SearchBar - barra de busca com atalho para a Gaia (IA).
 * Mesma altura, borda e tipografia do Input. Cores, espaçamentos, alturas e
 * raios vêm só dos tokens Semantic do Servi DS. Sombras usam a escala do
 * Tailwind, como o Input.
 */

type SearchBarProps = Omit<
  React.ComponentProps<"input">,
  "size" | "type" | "placeholder"
> & {
  /** Placeholder fixo. Ignorado quando `placeholders` tem itens. */
  placeholder?: string
  /** Sugestões que se alternam no placeholder, com degradê animado. */
  placeholders?: string[]
  /** Tempo de cada sugestão do placeholder, em milissegundos. */
  placeholderInterval?: number
  /** Chamado ao apertar Enter, com o texto digitado. */
  onSearch?: (value: string) => void
  /** Chamado ao clicar no botão de limpar. */
  onClear?: () => void
  /** Mostra o botão de filtro. */
  showFilter?: boolean
  /** Indica que há filtros aplicados (ponto na cor da marca). */
  filterActive?: boolean
  /** Nome acessível do botão de filtro. */
  filterLabel?: string
  onFilterClick?: React.MouseEventHandler<HTMLButtonElement>
  /** Mostra o botão de falar com a Gaia. */
  showAi?: boolean
  /** Texto do botão da Gaia. */
  aiLabel?: string
  onAiClick?: React.MouseEventHandler<HTMLButtonElement>
  /** Classe aplicada no input. `className` vai para a caixa. */
  inputClassName?: string
}

function hasText(value: unknown) {
  if (value === undefined || value === null) return false
  return String(value).length > 0
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(query.matches)
    const onChange = () => setReduced(query.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])
  return reduced
}

// Degradê que percorre as palavras do placeholder.
const placeholderGradient = [
  "var(--color-foreground-default) 0%",
  "var(--color-foreground-default) 30%",
  "var(--color-brand-foreground-default) 45%",
  "var(--color-feedback-discovery-foreground-default) 55%",
  "var(--color-foreground-default) 70%",
  "var(--color-foreground-default) 100%",
].join(", ")

// Ação secundária dentro da barra: ícone neutro, hover neutro.
const quietAction =
  "text-(--color-foreground-muted) hover:bg-(--color-palette-olive-light-hover) hover:text-(--color-foreground-default) active:bg-(--color-palette-olive-light-pressed)"

function SearchBar({
  className,
  inputClassName,
  placeholder = "Buscar",
  placeholders,
  placeholderInterval = 4000,
  onSearch,
  onClear,
  showFilter = true,
  filterActive = false,
  filterLabel = "Filtros",
  onFilterClick,
  showAi = true,
  aiLabel = "Chat com GAIA",
  onAiClick,
  disabled,
  value,
  defaultValue,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  ref,
  "aria-label": ariaLabel,
  ...props
}: SearchBarProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  const [filledUncontrolled, setFilledUncontrolled] = React.useState(
    hasText(defaultValue)
  )
  const filled = value !== undefined ? hasText(value) : filledUncontrolled

  // Placeholder rotativo
  const suggestions =
    placeholders && placeholders.length > 0 ? placeholders : [placeholder]
  const rotating = suggestions.length > 1
  const [index, setIndex] = React.useState(0)
  const [focused, setFocused] = React.useState(false)

  React.useEffect(() => {
    if (!rotating || filled || focused || disabled) return
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % suggestions.length),
      placeholderInterval
    )
    return () => window.clearInterval(timer)
  }, [rotating, filled, focused, disabled, suggestions.length, placeholderInterval])

  const currentPlaceholder = suggestions[index % suggestions.length]
  const animated = !reducedMotion && !disabled

  // Entrada da sugestão e brilho em degradê, sem depender de CSS global.
  const placeholderRef = React.useCallback(
    (node: HTMLSpanElement | null) => {
      if (!node || !animated) return
      node.animate(
        [
          { opacity: 0, transform: "translateY(4px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 300, easing: "ease-out" }
      )
      const shimmer = node.animate(
        [{ backgroundPosition: "100% 0" }, { backgroundPosition: "-100% 0" }],
        { duration: 3000, iterations: Infinity, easing: "linear" }
      )
      return () => shimmer.cancel()
    },
    [animated]
  )

  const setRefs = React.useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )

  function handleClear() {
    const input = inputRef.current
    if (value === undefined && input) input.value = ""
    setFilledUncontrolled(false)
    onClear?.()
    input?.focus()
  }

  const hasActions = showFilter || showAi

  return (
    <div
      role="search"
      data-slot="search-bar"
      data-disabled={disabled ? true : undefined}
      data-filled={filled}
      className={cn(
        "flex h-10 w-full items-center gap-2 rounded-(--radius-lg) border pl-3",
        hasActions || filled
          ? "pr-1"
          : "pr-3",
        "font-(family-name:--typography-font-sans)",
        "transition-[border-color,box-shadow,background-color] duration-150",
        disabled
          ? "cursor-not-allowed border-(--color-border-muted) bg-(--color-background-muted)"
          : cn(
              "border-(--color-border-default) bg-(--color-background-default) shadow-sm",
              "hover:not-focus-within:border-(--color-border-strong) hover:shadow-md",
              "focus-within:border-(--color-brand-border-focus) focus-within:shadow-md"
            ),
        className
      )}
    >
      <span
        data-slot="search-bar-icon"
        className={cn(
          "flex shrink-0 items-center [&_svg]:size-4",
          disabled ? "text-(--color-foreground-subtle)" : "text-(--color-foreground-muted)"
        )}
      >
        <MagnifyingGlassIcon aria-hidden />
      </span>

      <div data-slot="search-bar-field" className="relative h-5 min-w-0 flex-1">
        <input
          ref={setRefs}
          type="search"
          data-slot="search-bar-input"
          enterKeyHint="search"
          autoComplete="off"
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          aria-label={ariaLabel ?? currentPlaceholder}
          onChange={(event) => {
            setFilledUncontrolled(event.currentTarget.value.length > 0)
            onChange?.(event)
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") onSearch?.(event.currentTarget.value)
            if (event.key === "Escape" && filled) handleClear()
            onKeyDown?.(event)
          }}
          onFocus={(event) => {
            setFocused(true)
            onFocus?.(event)
          }}
          onBlur={(event) => {
            setFocused(false)
            onBlur?.(event)
          }}
          className={cn(
            "absolute inset-0 size-full bg-transparent p-0 outline-none",
            "text-sm leading-5 text-(--color-foreground-emphasis) caret-(--color-foreground-emphasis)",
            "disabled:cursor-not-allowed disabled:text-(--color-foreground-subtle)",
            "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
            inputClassName
          )}
          {...props}
        />
        {!filled ? (
          <span
            key={index}
            ref={placeholderRef}
            aria-hidden
            data-slot="search-bar-placeholder"
            className={cn(
              "pointer-events-none absolute inset-0 truncate text-sm leading-5",
              disabled
                ? "text-(--color-foreground-subtle)"
                : animated
                  ? "bg-clip-text text-transparent"
                  : "text-(--color-foreground-default)"
            )}
            style={
              animated
                ? {
                    backgroundImage: `linear-gradient(90deg, ${placeholderGradient})`,
                    backgroundSize: "200% 100%",
                  }
                : undefined
            }
          >
            {currentPlaceholder}
          </span>
        ) : null}
      </div>

      {filled && !disabled ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Limpar busca"
          data-slot="search-bar-clear"
          className={quietAction}
          onClick={handleClear}
        >
          <XIcon aria-hidden />
        </Button>
      ) : null}

      {filled && !disabled && hasActions ? (
        <span
          aria-hidden
          data-slot="search-bar-divider"
          className="h-5 w-px shrink-0 bg-(--color-border-default)"
        />
      ) : null}

      {showFilter ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={filterLabel}
          aria-pressed={filterActive}
          data-slot="search-bar-filter"
          data-active={filterActive || undefined}
          disabled={disabled}
          className={cn("relative", quietAction)}
          onClick={onFilterClick}
        >
          <FunnelSimpleIcon aria-hidden />
          {filterActive ? (
            <span
              aria-hidden
              className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-(--color-brand-filled)"
            />
          ) : null}
        </Button>
      ) : null}

      {showAi ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          data-slot="search-bar-ai"
          disabled={disabled}
          onClick={onAiClick}
        >
          <SparkleIcon
            aria-hidden
            weight="fill"
            className={disabled ? undefined : "text-(--color-brand-foreground-default)"}
          />
          {aiLabel}
        </Button>
      ) : null}
    </div>
  )
}

export { SearchBar }
export type { SearchBarProps }
