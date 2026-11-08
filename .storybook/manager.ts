import { addons } from "storybook/manager-api"
import { createFrameTheme } from "../storybook/frame/frame-theme"
import { mountSiteHeader } from "../storybook/frame/mount-site-header"

// Moldura personalizada: tema montado com os tokens do DS e header do site
// com a marca, navegação, busca e alternância de tema.
addons.setConfig({
  theme: createFrameTheme(),
  sidebar: { showRoots: true },
  // Nas páginas de documentação a barra de ferramentas some: tema e busca
  // ficam no header. Nas stories (Storybook local) ela continua.
  layoutCustomisations: {
    showToolbar: (state, defaultValue) => (state.viewMode === "docs" ? false : defaultValue),
  },
})

addons.register("servi-ds/site-header", (api) => mountSiteHeader(api))
