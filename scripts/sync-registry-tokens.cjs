#!/usr/bin/env node
/**
 * Gera o cssVars de registry.json a partir dos arquivos-fonte em tokens/.
 *
 * Fonte unica de verdade: os .css em tokens/, que espelham o Figma Variables.
 * Ninguem edita cssVars em registry.json a mao. Para mudar um token: mudar a
 * variavel no Figma, refletir no .css correspondente e rodar "npm run build"
 * (ou "npm run sync-tokens" so para regenerar o registry.json sem buildar).
 *
 * Mapeamento (item "tokens"):
 *   tokens-primitives.css (:root)       -> cssVars.light
 *   tokens-semantic.css   (:root)       -> cssVars.light (mode Light)
 *   tokens-semantic.css   (.dark)       -> cssVars.dark (mode Dark)
 *   tokens-typography.css (@utility)    -> css["@utility typo-..."] (estilos
 *                                          de texto do Figma)
 *
 * O Servi DS tem duas camadas (Primitivo e Semantic). Nao existe mais
 * tokens-component.css: componentes consomem o Semantic direto. Por isso o
 * script remove qualquer cssVars que tenha sobrado em itens registry:ui.
 *
 * Roda sozinho via "prebuild" em todo "npm run build" (inclui o build da
 * Vercel).
 *
 * Parser por regex, assume blocos sem chaves aninhadas, estrutura atual dos
 * arquivos em tokens/. Se isso mudar, trocar por um parser CSS de verdade
 * (ex. postcss) em vez de estender a regex.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const TOKENS_DIR = path.join(ROOT, "tokens");
const REGISTRY_PATH = path.join(ROOT, "registry.json");

function parseBlock(css, selector) {
  const escaped = selector.replace(/\./g, "\\.");
  const re = new RegExp(escaped + "\\s*{([^}]*)}", "s");
  const match = css.match(re);
  if (!match) return {};
  const body = match[1];
  const vars = {};
  const varRe = /--([a-zA-Z0-9-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = varRe.exec(body))) {
    vars[m[1].trim()] = m[2].trim();
  }
  return vars;
}

function readCssBlocks(fileName) {
  const filePath = path.join(TOKENS_DIR, fileName);
  const css = fs.readFileSync(filePath, "utf8");
  return {
    root: parseBlock(css, ":root"),
    dark: parseBlock(css, ".dark"),
  };
}

// Estilos de texto: cada "@utility nome { ... }" vira css["@utility nome"].
function readUtilities(fileName) {
  const filePath = path.join(TOKENS_DIR, fileName);
  if (!fs.existsSync(filePath)) return {};
  const css = fs.readFileSync(filePath, "utf8");
  const out = {};
  const re = /@utility\s+([a-zA-Z0-9-]+)\s*{([^}]*)}/g;
  let m;
  while ((m = re.exec(css))) {
    const props = {};
    const propRe = /([a-z-]+)\s*:\s*([^;]+);/g;
    let p;
    while ((p = propRe.exec(m[2]))) props[p[1].trim()] = p[2].trim();
    out[`@utility ${m[1]}`] = props;
  }
  return out;
}

function main() {
  const primitives = readCssBlocks("tokens-primitives.css");
  const semantic = readCssBlocks("tokens-semantic.css");
  const utilities = readUtilities("tokens-typography.css");

  const tokensLight = { ...primitives.root, ...semantic.root };
  const tokensDark = { ...semantic.dark };

  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));

  const tokensItem = registry.items.find((item) => item.name === "tokens");
  if (!tokensItem) {
    throw new Error(
      'sync-registry-tokens: item "tokens" nao existe em registry.json. ' +
        'Crie o item (type "registry:theme") antes de rodar este script.'
    );
  }
  tokensItem.cssVars = { light: tokensLight, dark: tokensDark };
  if (Object.keys(utilities).length) {
    tokensItem.css = utilities;
  } else {
    delete tokensItem.css;
  }

  const cleaned = [];
  for (const item of registry.items) {
    if (item.type === "registry:ui" && item.cssVars) {
      delete item.cssVars;
      cleaned.push(item.name);
    }
  }

  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + "\n");

  console.log(
    `sync-registry-tokens: registry.json atualizado a partir de tokens/*.css. ` +
      `Item "tokens": ${Object.keys(tokensLight).length} vars light, ` +
      `${Object.keys(tokensDark).length} vars dark, ` +
      `${Object.keys(utilities).length} estilos de texto.` +
      (cleaned.length ? ` cssVars removido de: ${cleaned.join(", ")}.` : "")
  );
}

main();
