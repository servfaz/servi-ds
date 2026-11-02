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
 *   tokens-semantic.css   (:root)       -> cssVars.light (Light + Product)
 *   tokens-semantic.css   (.dark)       -> cssVars.dark
 *   tokens-semantic.css   (.editorial)  -> css[".editorial"] (mode Editorial
 *                                          da colecao Semantic / Scale)
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

// O campo "css" do registry espera o nome completo da propriedade (com "--").
function prefixed(vars) {
  const out = {};
  for (const [name, value] of Object.entries(vars)) out[`--${name}`] = value;
  return out;
}

function readCssBlocks(fileName) {
  const filePath = path.join(TOKENS_DIR, fileName);
  const css = fs.readFileSync(filePath, "utf8");
  return {
    root: parseBlock(css, ":root"),
    dark: parseBlock(css, ".dark"),
    editorial: parseBlock(css, ".editorial"),
  };
}

function main() {
  const primitives = readCssBlocks("tokens-primitives.css");
  const semantic = readCssBlocks("tokens-semantic.css");

  const tokensLight = { ...primitives.root, ...semantic.root };
  const tokensDark = { ...semantic.dark };
  const editorial = prefixed(semantic.editorial);

  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));

  const tokensItem = registry.items.find((item) => item.name === "tokens");
  if (!tokensItem) {
    throw new Error(
      'sync-registry-tokens: item "tokens" nao existe em registry.json. ' +
        'Crie o item (type "registry:theme") antes de rodar este script.'
    );
  }
  tokensItem.cssVars = { light: tokensLight, dark: tokensDark };
  if (Object.keys(editorial).length) {
    tokensItem.css = { ".editorial": editorial };
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
      `${Object.keys(editorial).length} vars editorial.` +
      (cleaned.length ? ` cssVars removido de: ${cleaned.join(", ")}.` : "")
  );
}

main();
