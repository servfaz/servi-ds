import { addons } from "storybook/manager-api"
import { createFrameTheme } from "../storybook/frame/frame-theme"
import { mountSiteHeader } from "../storybook/frame/mount-site-header"
import { installPrettyUrls } from "../storybook/frame/pretty-urls"

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

// Site público (modo docs): endereços amigáveis, como /componentes/button.
// No Storybook local fica o endereço padrão, porque o servidor local não
// tem os redirecionamentos da Vercel.
const docsOptions = (globalThis as { DOCS_OPTIONS?: { docsMode?: boolean } }).DOCS_OPTIONS
if (docsOptions?.docsMode) installPrettyUrls(addons.getChannel())
