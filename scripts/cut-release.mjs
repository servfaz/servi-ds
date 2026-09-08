#!/usr/bin/env node
/**
 * cut-release.mjs
 *
 * Fecha o lote de entradas com "Não lançado" na coluna Versão, calcula o
 * bump a partir do nível marcado em cada uma (Regra 5 e Regra 6 de
 * regras-de-changelog.md) e substitui "Não lançado" pelo número real em
 * todas elas, no mesmo lote.
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
 * final. Essa é a convenção técnica adotada, já em uso.
 *
 * Escopo: fecha o lote em TODOS os arquivos onde uma entrada pendente pode
 * morar, não só no CHANGELOG.md raiz. Toda entrada "Não lançado" encontrada,
 * onde quer que esteja, pertence ao mesmo lote e recebe o mesmo número final
 * (Regra 6 de regras-de-changelog.md), porque o Servi DS tem uma única
 * versão de registry, nunca uma versão por componente. O nível de cada
 * entrada, usado para calcular o bump, é lido só do CHANGELOG.md raiz, que é
 * o índice geral e sempre recebe toda entrada nova.
 *
 * Uso: node scripts/cut-release.mjs
 * Pré-requisito: rodar da raiz do repositório servi-ds, com CHANGELOG.md e
 * REGISTRY_VERSION já existentes.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const CHANGELOG_PATH = "CHANGELOG.md";
const VERSION_PATH = "REGISTRY_VERSION";
const COMPONENTES_DIR = "content/docs/componentes";
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

function scanPendingRows(lines) {
  const rowIndexes = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("|") && line.endsWith("|") && line.slice(1).trimStart().startsWith(PENDING_MARKER)) {
      rowIndexes.push(i);
    }
  }
  return rowIndexes;
}

const changelogLines = readFileSync(CHANGELOG_PATH, "utf8").split("\n");
const currentVersion = readFileSync(VERSION_PATH, "utf8").trim();

const changelogPending = scanPendingRows(changelogLines);

if (changelogPending.length === 0) {
  fail(
    `Nenhuma linha com "${PENDING_MARKER}" encontrada em ${CHANGELOG_PATH}. Nada para lançar. ` +
    `Publique ao menos uma mudança antes de cortar um release.`
  );
}

const missingMarker = [];
const levelsFound = new Set();

for (const rowIndex of changelogPending) {
  const nextLine = (changelogLines[rowIndex + 1] || "").trim();
  const match = nextLine.match(LEVEL_COMMENT_RE);
  if (!match) {
    missingMarker.push(changelogLines[rowIndex]);
    continue;
  }
  levelsFound.add(match[1]);
}

if (missingMarker.length > 0) {
  fail(
    `${missingMarker.length} linha(s) com "${PENDING_MARKER}" não têm o comentário "<!-- nivel: MAJOR|MINOR|PATCH -->" ` +
    `na linha seguinte, em ${CHANGELOG_PATH}. Sem ele não dá para calcular o bump sem adivinhar.\n\nLinhas sem marcador:\n` +
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

// Fecha o lote num arquivo: troca "Não lançado" pelo número final em cada
// linha pendente e apaga o comentário de nível na linha seguinte, quando
// existir ali (o comentário só é obrigatório no CHANGELOG.md raiz, já
// validado acima; a cópia na página do componente pode ou não repetir o
// comentário, tratado como opcional aqui).
function closeFile(path) {
  const lines = readFileSync(path, "utf8").split("\n");
  const rowIndexes = scanPendingRows(lines);
  if (rowIndexes.length === 0) return 0;

  const markerIndexes = [];
  for (const rowIndex of rowIndexes) {
    const nextLine = (lines[rowIndex + 1] || "").trim();
    if (LEVEL_COMMENT_RE.test(nextLine)) markerIndexes.push(rowIndex + 1);
  }

  for (const rowIndex of [...rowIndexes].sort((a, b) => b - a)) {
    lines[rowIndex] = lines[rowIndex].replace(PENDING_MARKER, newVersion);
  }
  for (const markerIndex of markerIndexes.sort((a, b) => b - a)) {
    lines.splice(markerIndex, 1);
  }

  writeFileSync(path, lines.join("\n"));
  return rowIndexes.length;
}

let totalUpdated = 0;
const changedFiles = [];

totalUpdated += closeFile(CHANGELOG_PATH);
changedFiles.push(CHANGELOG_PATH);

if (existsSync(COMPONENTES_DIR)) {
  for (const entry of readdirSync(COMPONENTES_DIR)) {
    if (!entry.endsWith(".md")) continue;
    const path = join(COMPONENTES_DIR, entry);
    const updated = closeFile(path);
    if (updated > 0) {
      totalUpdated += updated;
      changedFiles.push(path);
    }
  }
}

writeFileSync(VERSION_PATH, `${newVersion}\n`);

console.log(`Bump calculado: ${bump} (${currentVersion} -> ${newVersion})`);
console.log(`${totalUpdated} entrada(s) atualizada(s) em ${changedFiles.length} arquivo(s):`);
for (const f of changedFiles) console.log(`  ${f}`);
console.log(`${VERSION_PATH} atualizado para ${newVersion}.`);
console.log(`\nPróximos passos (não executados automaticamente por este script):`);
console.log(`  git add ${CHANGELOG_PATH} ${VERSION_PATH} ${COMPONENTES_DIR}`);
console.log(`  git commit -m "chore(release): v${newVersion}"`);
console.log(`  git tag v${newVersion}`);
console.log(`  git push origin main --tags`);
console.log(`\nO push da tag "v${newVersion}" dispara .github/workflows/release.yml, que cria a GitHub Release`);
console.log(`com as notas extraídas direto das linhas de versão ${newVersion} no CHANGELOG.md.`);
console.log(`\nEsses mesmos passos, com um ponto de aprovação antes do push, também rodam sozinhos via`);
console.log(`.github/workflows/cut-release.yml, disparado todo dia 1 de cada mês.`);
