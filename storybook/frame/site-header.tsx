import React from "react"
import type { API } from "storybook/manager-api"
import { HeaderLogo } from "./header-logo"
import { HeaderNavLink } from "./header-nav-link"
import { HeaderSearch } from "./header-search"
import { HeaderThemeButton } from "./header-theme-button"
import { HeaderGithubLink } from "./header-github-link"

export function SiteHeader({ api }: { api: API }) {
  return (
    <header className="frame-header">
      <div className="frame-header__inner">
        <HeaderLogo />
        <nav className="frame-header__nav" aria-label="Principal">
          <HeaderNavLink href="/?path=/docs/comece--docs">Documentação</HeaderNavLink>
          <HeaderNavLink href="/?path=/docs/componentes-button--docs">Componentes</HeaderNavLink>
          <HeaderSearch api={api} />
          <span className="frame-header__divider" aria-hidden />
          <HeaderThemeButton api={api} />
          <HeaderGithubLink />
        </nav>
      </div>
    </header>
  )
}
