import React from "react"
import { ServiLogo } from "./servi-logo"
import { ServiSymbol } from "./servi-symbol"

/**
 * Marca do header: completa no desktop e só o símbolo em telas estreitas
 * (a troca fica no CSS responsivo da moldura). Cores pelos tokens da marca.
 */
export function HeaderLogo() {
  return (
    <a className="frame-header__logo" href="/" aria-label="Servi DS, página inicial">
      <ServiLogo className="frame-header__logo-full" aria-hidden />
      <ServiSymbol className="frame-header__logo-mark" aria-hidden />
    </a>
  )
}
