#!/usr/bin/env node
/**
 * cut-release.mjs
 *
 * Fecha o lote de entradas com "Não lançado" na coluna Versão do CHANGELOG.md,
 * calcula o bump a partir do nível marcado em cada uma (Regra 5 e Regra 6 de
 * regras-de-changelog.md) e substitui "Não lançado" pelo número real em todas
 * elas, no mesmo lote.
 *
 * A versão nasce do changelog, nunca ao contrário: este script nunca pede
 * qual versão lançar, ele calcula a partir do que já está escrito.
 *
 * Como uma entrada pendente marca o nível: a Regra 5 de regras-de-changelog.md
 * proíbe escrever MAJOR/MINOR/PATCH na tabela. Por isso, cada linha pendente
 * é seguida, na linha seguinte do arquivo, por um comentário HTML invisível
 * na renderização:
 *
 *   | Não lançado | 04/09/2026 | Alterado | [`Toggle Group`](...) | `spacing` padrão: `0` para `2` |
 *   <!-- nivel: MINOR -->
 *
 * Esse comentário nunca aparece renderizado (é comentário HTML dentro de
 * markdown) e este script o remove ao substituir "Não lançado" pelo número
 * final. Esse mecanismo é uma proposta técnica pendente de revisão da
 * designer, não uma regra já formalizada.
 *
 * Uso: node scripts/cut-release.mjs
 * Pré-requisito: rodar da raiz do repositório servi-ds, com CHANGELOG.md e
 * REGISTRY_VERSION já existentes.
 *
 * Escopo atual: só atualiza o CHANGELOG.md raiz. Ainda não replica a mesma
 * substituição na seção "Changelog" de content/docs/componentes/<nome>.md
 * (onde a Regra "Onde mora o changelog" diz que a entrada completa também
 * mora). Isso fica como pendência explícita, não como algo já coberto.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const CHANGELOG_PATH = "CHANGELOG.md";
const VERSION_PATH = "REGISTRY_VERSION";
const PENDING_MARKER = "Não lançado";
const LEVEL_COMMENT_RE = /^<!--\s*nivel:\s*(MAJOR|MINOR|PATCH)\s*-->$/;
const LEVEL_PRIORITY = ["MAJOR", "MINOR", "PATCH"];

function fail(msg) {
  console.error(`\nErro: ${msg}\n`);
  process.exit(1);
}

if (!existsSync(CHANGELOG_PATH)) fail(`${CHANGELOG_PATH} não encontrado. Rode da raiz do repositório.`);
if (!existsSync(VERSION_PATH)) {
  fail(
    `${VERSION_PATH} não encontrado. O número inicial do REGISTRY_VERSION é decisão pendente da designer ` +
    `(Regra 7 de regras-de-changelog.md) e não é inferido automaticamente. Crie o arquivo com a versão inicial ` +
    `decidida (ex.: "0.1.0") antes de rodar este script.`
  );
}

const lines = readFileSync(CHANGELOG_PATH, "utf8").split("\n");
const currentVersion = readFileSync(VERSION_PATH, "utf8").trim();

const pendingRowIndexes = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.startsWith("|") && line.endsWith("|") && line.slice(1).trimStart().startsWith(PENDING_MARKER)) {
    pendingRowIndexes.push(i);
  }
}

if (pendingRowIndexes.length === 0) {
  fail(
    `Nenhuma linha com "${PENDING_MARKER}" encontrada em ${CHANGELOG_PATH}. Nada para lançar. ` +
    `Publique ao menos uma mudança antes de cortar um release.`
  );
}

const missingMarker = [];
const levelsFound = new Set();
const markerLineIndexes = [];

for (const rowIndex of pendingRowIndexes) {
  const nextLine = (lines[rowIndex + 1] || "").trim();
  const match = nextLine.match(LEVEL_COMMENT_RE);
  if (!match) {
    missingMarker.push(lines[rowIndex]);
    continue;
  }
  levelsFound.add(match[1]);
  markerLineIndexes.push(rowIndex + 1);
}

if (missingMarker.length > 0) {
  fail(
    `${missingMarker.length} linha(s) com "${PENDING_MARKER}" não têm o comentário "<!-- nivel: MAJOR|MINOR|PATCH -->" ` +
    `na linha seguinte. Sem ele não dá para calcular o bump sem adivinhar.\n\nLinhas sem marcador:\n` +
    missingMarker.map((r) => `  ${r}`).join("\n")
  );
}

const bump = LEVEL_PRIORITY.find((l) => levelsFound.has(l)); // MAJOR > MINOR > PATCH

function bumpVersion(version, level) {
  const [major, minor, patch] = version.split(".").map(Number);
  if ([major, minor, patch].some(Number.isNaN)) {
    fail(`REGISTRY_VERSION atual ("${version}") não está no formato MAJOR.MINOR.PATCH.`);
  }
  if (level === "MAJOR") return `${major + 1}.0.0`;
  if (level === "MINOR") return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}

const newVersion = bumpVersion(currentVersion, bump);

// Substitui "Não lançado" pelo número final em todas as linhas do lote,
// na ordem inversa para não bagunçar os índices ao remover os comentários.
for (const rowIndex of [...pendingRowIndexes].sort((a, b) => b - a)) {
  lines[rowIndex] = lines[rowIndex].replace(PENDING_MARKER, newVersion);
}
for (const markerIndex of markerLineIndexes.sort((a, b) => b - a)) {
  lines.splice(markerIndex, 1);
}

writeFileSync(CHANGELOG_PATH, lines.join("\n"));
writeFileSync(VERSION_PATH, `${newVersion}\n`);

console.log(`Bump calculado: ${bump} (${currentVersion} -> ${newVersion})`);
console.log(`${pendingRowIndexes.length} entrada(s) atualizada(s) em ${CHANGELOG_PATH}.`);
console.log(`${VERSION_PATH} atualizado para ${newVersion}.`);
console.log(`\nPendência: as mesmas entradas, se forem de componente, também precisam ser atualizadas em`);
console.log(`content/docs/componentes/<nome>.md. Este script ainda não faz isso automaticamente.`);
console.log(`\nPróximos passos (não executados automaticamente por este script):`);
console.log(`  git add ${CHANGELOG_PATH} ${VERSION_PATH} content/docs/componentes/`);
console.log(`  git commit -m "chore(release): v${newVersion}"`);
console.log(`  git tag v${newVersion}`);
console.log(`  git push origin main --tags`);
console.log(`\nO push da tag "v${newVersion}" dispara .github/workflows/release.yml, que cria a GitHub Release`);
console.log(`com as notas extraídas direto das linhas de versão ${newVersion} no CHANGELOG.md.`);
