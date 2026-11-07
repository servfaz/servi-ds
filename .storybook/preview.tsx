import type { Preview } from "@storybook/react-vite"
import { withThemeByClassName } from "@storybook/addon-themes"
import "../storybook/styles/globals.css"
import { DOCS_THEMES, LIGHT_THEME } from "../storybook/frame/docs-themes"

const preview: Preview = {
  // Todo componente ganha a página automática (autodocs) do Storybook.
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    // Índice "Nesta página" à direita de cada página de documentação.
    docs: { toc: { title: "Nesta página", headingSelector: "h3" } },

    options: {
      storySort: {
        order: ["Comece", "Desenvolvedores", "Componentes"],
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    }
  },
  // Dark mode resolvido na camada semântica: o tema só alterna a classe
  // .dark no <html>, igual a qualquer consumidor do registry.
  decorators: [
    withThemeByClassName({
      themes: DOCS_THEMES,
      defaultTheme: LIGHT_THEME,
    }),
  ],
}

export default preview
