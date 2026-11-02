import path from "node:path"
import { fileURLToPath } from "node:url"
import type { StorybookConfig } from "@storybook/react-vite"
import tailwindcss from "@tailwindcss/vite"
import { mergeConfig } from "vite"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
// Caminho com barra normal: no Windows o alias com "\\" não resolve.
const rootPosix = root.split(path.sep).join("/")

const config: StorybookConfig = {
  stories: [
    // A página Sobre (paginas/sobre.mdx) está oculta. Para voltar, troque
    // "!(sobre).mdx" por "*.mdx" e reative o card em content/docs/comece.md.
    "../storybook/paginas/!(sobre).mdx",
    "../storybook/!(paginas)/**/*.mdx",
    "../storybook/**/*.stories.@(ts|tsx)",
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-themes",
    "@storybook/addon-a11y",
  ],
  framework: { name: "@storybook/react-vite", options: {} },
  // public/ é servido na raiz do build: o registry continua em /r/<nome>.json
  // e a marca e os favicons continuam nos mesmos caminhos de antes.
  staticDirs: ["../public"],
  core: { disableTelemetry: true },
  viteFinal: async (viteConfig) =>
    mergeConfig(viteConfig, {
      plugins: [tailwindcss()],
      resolve: {
        // Mesmos caminhos que o projeto consumidor usa depois do "shadcn add":
        // ui em components/ui e arquivos de bloco em components/.
        alias: [
          {
            find: /^@\/components\/ui\//,
            replacement: `${rootPosix}/registry/servfaz/`,
          },
          {
            find: /^@\/components\//,
            replacement: `${rootPosix}/registry/servfaz/blocks/app-shell/components/`,
          },
          { find: "@", replacement: root },
        ],
      },
    }),
}

export default config
