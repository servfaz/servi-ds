import React from "react"
import { createRoot } from "react-dom/client"
import type { API } from "storybook/manager-api"
import { SiteHeader } from "./site-header"
import { fitLayoutToRoot } from "./fit-layout"
import { syncFrameColorMode } from "./frame-color-mode"

const HEADER_ROOT_ID = "frame-header-root"

/** Monta o header do site acima da interface do Storybook. */
export function mountSiteHeader(api: API) {
  if (document.getElementById(HEADER_ROOT_ID)) return

  const container = document.createElement("div")
  container.id = HEADER_ROOT_ID
  document.body.prepend(container)
  document.body.classList.add("servi-frame")
  // Site público (modo docs): a barra lateral ganha o estilo de árvore.
  const docsOptions = (globalThis as { DOCS_OPTIONS?: { docsMode?: boolean } }).DOCS_OPTIONS
  if (docsOptions?.docsMode) document.body.classList.add("servi-docs-mode")
  syncFrameColorMode(api)
  createRoot(container).render(<SiteHeader api={api} />)

  const root = document.getElementById("root")
  if (root) fitLayoutToRoot(root)
}
