import type { Preview } from "@storybook/react-vite"
import { withThemeByClassName } from "@storybook/addon-themes"
import "../storybook/styles/globals.css"

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    options: {
      storySort: {
        order: ["Comece", "Sobre", "Desenvolvedores", "Componentes"],
      },
    },
  },
  // Dark mode resolvido na camada semântica: o tema só alterna a classe
  // .dark no <html>, igual a qualquer consumidor do registry.
  decorators: [
    withThemeByClassName({
      themes: { Claro: "", Escuro: "dark" },
      defaultTheme: "Claro",
    }),
  ],
}

export default preview
