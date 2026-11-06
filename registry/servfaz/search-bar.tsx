"use client"

import * as React from "react"
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Button } from "./button"

/*
 * SearchBar - espelho do component set "Search Bar" do Figma ([SDS] Components).
 * Estados do Figma: default, hover e typing (foco). Lupa Phosphor (peso light),
 * placeholder e atalho de teclado (Ctrl K) à direita.
 * O atalho foca a busca de qualquer lugar da página. Com texto digitado, o
 * atalho dá lugar ao botão de limpar.
 * O botão "Chat com GAIA" fica fora da barra, no App Header.
 *
 * Valor sem variável no Figma (pendente): raio de 10px da caixa. Aqui usa
 * radius/lg (8px) até a variável existir.
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
  /** Tecla que, com Ctrl (ou Cmd no Mac), foca a busca. `null` desliga o atalho. */
  shortcutKey?: string | null
  /** Texto do atalho mostrado na barra. */
  shortcutLabel?: string
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

// Degradê que percorre as palavras do placeholder rotativo.
const placeholderGradient = [
  "var(--color-foreground-subtle) 0%",
  "var(--color-foreground-subtle) 30%",
  "var(--color-brand-foreground-default) 45%",
  "var(--color-feedback-discovery-foreground-default) 55%",
  "var(--color-foreground-subtle) 70%",
  "var(--color-foreground-subtle) 100%",
].join(", ")

function SearchBar({
  className,
  inputClassName,
  placeholder = "Busca",
  placeholders,
  placeholderInterval = 4000,
  onSearch,
  onClear,
  shortcutKey = "k",
  shortcutLabel = "Ctrl K",
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

  // Atalho de teclado (Ctrl K / Cmd K) para focar a busca.
  React.useEffect(() => {
    if (!shortcutKey || disabled) return
    function onWindowKeyDown(event: KeyboardEvent) {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === shortcutKey!.toLowerCase()
      ) {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener("keydown", onWindowKeyDown)
    return () => window.removeEventListener("keydown", onWindowKeyDown)
  }, [shortcutKey, disabled])

  const currentPlaceholder = suggestions[index % suggestions.length]
  const animated = rotating && !reducedMotion && !disabled

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

  return (
    <div
      role="search"
      data-slot="search-bar"
      data-disabled={disabled ? true : undefined}
      data-filled={filled}
      className={cn(
        "flex h-10 w-full items-center gap-2 rounded-(--radius-lg) border pr-1.5 pl-3",
        "transition-[border-color,background-color] duration-150",
        disabled
          ? "cursor-not-allowed border-(--color-border-muted) bg-(--color-background-muted)"
          : cn(
              "border-(--color-border-default) bg-(--color-background-default)",
              "hover:not-focus-within:border-(--color-border-strong) hover:not-focus-within:bg-(--color-palette-olive-light-hover)",
              "focus-within:border-(--color-brand-border-focus)"
            ),
        className
      )}
    >
      <span
        data-slot="search-bar-icon"
        className={cn(
          "flex shrink-0 items-center [&_svg]:size-4",
          disabled
            ? "text-(--color-foreground-subtle)"
            : "text-(--color-foreground-muted)"
        )}
      >
        <MagnifyingGlassIcon aria-hidden weight="light" />
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
          aria-keyshortcuts={shortcutKey ? `Control+${shortcutKey.toUpperCase()}` : undefined}
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
            "typo-sans-sm-medium text-(--color-foreground-emphasis) caret-(--color-foreground-emphasis)",
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
              "pointer-events-none absolute inset-0 truncate typo-sans-sm-medium",
              animated
                ? "bg-clip-text text-transparent"
                : "text-(--color-foreground-subtle)"
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
          size="icon-xs"
          aria-label="Limpar busca"
          data-slot="search-bar-clear"
          className="text-(--color-foreground-muted) hover:bg-(--color-palette-olive-light-hover) active:bg-(--color-palette-olive-light-pressed)"
          onClick={handleClear}
        >
          <XIcon aria-hidden />
        </Button>
      ) : shortcutKey ? (
        <kbd
          data-slot="search-bar-shortcut"
          className="flex h-6 shrink-0 items-center gap-1 rounded-(--radius-md) bg-(--color-background-muted) px-2 typo-sans-xs-semibold text-(--color-foreground-subtle)"
        >
          {shortcutLabel}
        </kbd>
      ) : null}
    </div>
  )
}

export { SearchBar }
export type { SearchBarProps }
