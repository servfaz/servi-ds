import fs from "node:fs"
import path from "node:path"

/**
 * <head> da moldura do Storybook (manager). O manager não passa pelo
 * Tailwind, então recebe aqui, como CSS puro: as variáveis do tema padrão do
 * Tailwind que os tokens referenciam (cores, espaçamento e peso de fonte), os
 * tokens primitivos e semânticos do DS e o CSS do header.
 */
const TAILWIND_VARS = /^\s*--(color|spacing|font-weight)[a-z0-9-]*\s*:/

export function frameHead(root: string) {
  const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8")

  const tailwindVars = read("node_modules/tailwindcss/theme.css")
    .split(/\r?\n/)
    .filter((line) => TAILWIND_VARS.test(line))
    .join("\n")

  return [
    '<style id="servi-frame">',
    `:root {\n${tailwindVars}\n}`,
    read("tokens/tokens-primitives.css"),
    read("tokens/tokens-semantic.css"),
    read("storybook/frame/frame.css"),
    "</style>",
  ].join("\n")
}
