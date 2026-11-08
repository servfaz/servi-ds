import React, { useEffect, useRef, useState } from "react"
import { List, X } from "@phosphor-icons/react"
import { NAV_LINKS } from "./header-links"

const MENU_ID = "frame-header-menu"

/**
 * Menu do header em telas estreitas: os links principais saem da barra e
 * entram aqui. Fecha com Esc, clique fora ou ao escolher um link.
 */
export function HeaderMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  const Icon = open ? X : List

  return (
    <div ref={ref} className="frame-header__menu">
      <button
        type="button"
        className="frame-header__icon-button"
        aria-expanded={open}
        aria-controls={MENU_ID}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <Icon className="frame-header__icon" weight="regular" aria-hidden />
      </button>
      {open && (
        <nav id={MENU_ID} className="frame-header__menu-panel" aria-label="Menu">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              className="frame-header__menu-item"
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  )
}
