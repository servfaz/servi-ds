import React, { type ReactNode } from "react"

export function HeaderNavLink({
  href,
  current = false,
  children,
}: {
  href: string
  current?: boolean
  children: ReactNode
}) {
  return (
    <a
      className="frame-header__item"
      href={href}
      aria-current={current ? "page" : undefined}
    >
      {children}
    </a>
  )
}
