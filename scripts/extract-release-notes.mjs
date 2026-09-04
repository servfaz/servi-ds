#!/usr/bin/env node
/**
 * extract-release-notes.mjs
 *
 * Lê CHANGELOG.md e imprime, em markdown, só as linhas da tabela cuja coluna
 * Versão bate com a versão pedida. Usado por .github/workflows/release.yml
 * para gerar o corpo da GitHub Release sem duplicar texto escrito à mão.
 *
 * Uso: node scripts/extract-release-notes.mjs 0.2.0 > release-notes.md
 */

import { readFileSync } from "node:fs";

const version = process.argv[2];
if (!version) {
  console.error("Uso: node scripts/extract-release-notes.mjs <versão>");
  process.exit(1);
}

const lines = readFileSync("CHANGELOG.md", "utf8").split("\n");

const matched = lines.filter((line) => {
  const trimmed = line.trim();
  if (!trimmed.startsWith("|") || !trimmed.endsWith("|")) return false;
  const firstCol = trimmed.slice(1).split("|")[0].trim();
  return firstCol === version;
});

if (matched.length === 0) {
  console.error(`Nenhuma linha com Versão = "${version}" encontrada em CHANGELOG.md.`);
  process.exit(1);
}

console.log(`## ${version}\n`);
console.log("| Versão | Data | Categoria | Item | Descrição |");
console.log("| --- | --- | --- | --- | --- |");
for (const line of matched) console.log(line.trim());
