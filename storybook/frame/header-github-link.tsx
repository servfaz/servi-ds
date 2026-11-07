import React from "react"
import { GithubLogo } from "@phosphor-icons/react"

const REPO_URL = "https://github.com/servfaz/servi-ds"

export function HeaderGithubLink() {
  return (
    <a
      className="frame-header__icon-button"
      href={REPO_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Repositório no GitHub"
      title="GitHub"
    >
      <GithubLogo className="frame-header__icon" weight="regular" aria-hidden />
    </a>
  )
}
