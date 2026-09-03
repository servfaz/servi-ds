#!/usr/bin/env node
/**
 * Gera o cssVars de registry.json a partir dos arquivos-fonte em tokens/.
 *
 * Fonte unica de verdade: os .css em tokens/. Ninguem edita cssVars em
 * registry.json a mao. Para mudar um token: editar o .css correspondente
 * e rodar "npm run build" (ou "npm run sync-tokens" so para regenerar o
 * registry.json sem buildar).
 *
 * Mapeamento:
 *   tokens-primitives.css (:root)         -> item "tokens", cssVars.light
 *   tokens-semantic.css   (:root)         -> item "tokens", cssVars.light
 *   tokens-semantic.css   (.dark)         -> item "tokens", cssVars.dark
 *   tokens-component.css  (:root)         -> agrupado por prefixo (nome
 *                                            antes do primeiro hifen, ex.
 *                                            "button-container-color-x"
 *                                            -> prefixo "button") no item
 *                                            de mesmo nome, cssVars.light
 *
 * Roda sozinho via "prebuild" em todo "npm run build" (inclui o build da
 * Vercel). Um prefixo em tokens-component.css sem item correspondente em
 * registry.json gera um warning e e ignorado, nao quebra o build: o item
 * do componente ainda nao foi cadastrado, cadastrar antes de propagar.
 *
 * Parser por regex, assume :root/.dark sem chaves aninhadas, estrutura
 * atual dos arquivos em tokens/. Se isso mudar, trocar por um parser CSS
 * de verdade (ex. postcss) em vez de estender a regex.
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

function groupByPrefix(vars) {
  const groups = {};
  for (const [name, value] of Object.entries(vars)) {
    const prefix = name.split("-")[0];
    groups[prefix] = groups[prefix] || {};
    groups[prefix][name] = value;
  }
  return groups;
}

function main() {
  const primitives = readCssBlocks("tokens-primitives.css");
  const semantic = readCssBlocks("tokens-semantic.css");
  const component = readCssBlocks("tokens-component.css");

  const tokensLight = { ...primitives.root, ...semantic.root };
  const tokensDark = { ...semantic.dark };
  const componentGroups = groupByPrefix(component.root);

  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));

  const tokensItem = registry.items.find((item) => item.name === "tokens");
  if (!tokensItem) {
    throw new Error(
      'sync-registry-tokens: item "tokens" nao existe em registry.json. ' +
        'Crie o item (type "registry:theme") antes de rodar este script.'
    );
  }
  tokensItem.cssVars = { light: tokensLight, dark: tokensDark };

  const matched = [];
  const unmatched = [];
  for (const [prefix, vars] of Object.entries(componentGroups)) {
    const item = registry.items.find((i) => i.name === prefix);
    if (!item) {
      unmatched.push(prefix);
      continue;
    }
    item.cssVars = { ...(item.cssVars || {}), light: vars };
    matched.push(prefix);
  }

  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + "\n");

  console.log(
    `sync-registry-tokens: registry.json atualizado a partir de tokens/*.css. ` +
      `Item "tokens": ${Object.keys(tokensLight).length} vars light, ${Object.keys(tokensDark).length} vars dark. ` +
      `Componentes atualizados: ${matched.length ? matched.join(", ") : "nenhum"}.`
  );
  if (unmatched.length) {
    console.warn(
      `sync-registry-tokens: aviso, tokens-component.css tem variaveis com prefixo ${unmatched
        .map((p) => `"${p}"`)
        .join(", ")} sem item correspondente em registry.json. Nao propagado ate o item existir.`
    );
  }
}

main();
