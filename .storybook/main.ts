import path from "node:path"
import { fileURLToPath } from "node:url"
import type { StorybookConfig } from "@storybook/react-vite"
import tailwindcss from "@tailwindcss/vite"
import { mergeConfig } from "vite"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

const config: StorybookConfig = {
  stories: ["../storybook/**/*.mdx", "../storybook/**/*.stories.@(ts|tsx)"],
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
      resolve: { alias: { "@": root } },
    }),
}

export default config
