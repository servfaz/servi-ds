import React from "react"
import type { API } from "storybook/manager-api"
import { HeaderLogo } from "./header-logo"
import { HeaderNavLink } from "./header-nav-link"
import { HeaderSearch } from "./header-search"
import { HeaderThemeButton } from "./header-theme-button"
import { HeaderGithubLink } from "./header-github-link"
import { HeaderMenu } from "./header-menu"
import { NAV_LINKS } from "./header-links"

/**
 * Header do site. Em telas estreitas os links principais vão para o menu e a
 * busca vira só o ícone; tema e GitHub continuam sempre à mostra.
 */
export function SiteHeader({ api }: { api: API }) {
  return (
    <header className="frame-header">
      <div className="frame-header__inner">
        <HeaderLogo />
        <div className="frame-header__end">
          <nav className="frame-header__nav" aria-label="Principal">
            {NAV_LINKS.map((link) => (
              <HeaderNavLink key={link.href} href={link.href}>
                {link.label}
              </HeaderNavLink>
            ))}
          </nav>
          <HeaderSearch api={api} />
          <span className="frame-header__divider" aria-hidden />
          <HeaderThemeButton api={api} />
          <HeaderGithubLink />
          <HeaderMenu />
        </div>
      </div>
    </header>
  )
}
