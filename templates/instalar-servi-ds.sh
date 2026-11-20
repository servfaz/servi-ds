#!/usr/bin/env bash
# Instala de uma vez todos os componentes já publicados no Servi DS dentro do
# projeto atual, e corrige o alias de import quando o projeto usa um alias
# diferente do padrão que a CLI do shadcn grava.
#
# Uso: copiar este arquivo para a raiz do projeto consumidor e rodar a partir
# de lá, com components.json já inicializado (npx shadcn@latest init).
#
# Isto é um bootstrap local. Ele resolve o primeiro lote de componentes na
# hora, sem esperar o cadastro do repositório no orquestrador de propagação
# nem o próximo disparo dele. A partir do momento em que o repositório está
# cadastrado no Servi DS, as atualizações seguintes continuam chegando pelo
# fluxo automático de Pull Request, não por este script.
#
# Blocos (como a página de exemplo do App Shell) não entram por padrão, porque
# trazem página que cada sistema adapta. Para incluir, liste os nomes em
# SERVI_DS_BLOCOS, separados por espaço:
#   SERVI_DS_BLOCOS="app-shell-exemplo" bash instalar-servi-ds.sh
#
# Requisitos: curl, jq, node/npx, sed.

set -euo pipefail

CATALOGO_URL="https://ds.servfaz.app/r/registry.json"
COMPONENTS_JSON="components.json"
DEFAULT_IMPORT="@/app/lib/utils"

if [ ! -f "$COMPONENTS_JSON" ]; then
  echo "Não encontrei components.json na raiz do projeto." >&2
  echo "Rode 'npx shadcn@latest init' antes deste script." >&2
  exit 1
fi

for bin in curl jq npx sed; do
  if ! command -v "$bin" >/dev/null 2>&1; then
    echo "Comando obrigatório não encontrado: $bin" >&2
    exit 1
  fi
done

# Os componentes do Servi DS são feitos com Radix. Com um estilo Base UI
# ("base-...", padrão do shadcn init mais novo), a CLI troca todo `asChild` por
# `render` ao instalar, e o componente quebra. O estilo vira "new-york", o
# estilo Radix do shadcn.
style="$(jq -r '.style // ""' "$COMPONENTS_JSON")"
if [[ "$style" == base-* ]]; then
  echo "components.json usa o estilo Base UI \"$style\". Trocando para \"new-york\" (Radix), a base do Servi DS."
  [ -n "${GITHUB_ACTIONS:-}" ] && echo "::warning title=Estilo do shadcn::components.json estava com \"$style\" (Base UI) e foi trocado para \"new-york\" (Radix)."
  tmp="$(mktemp)"
  jq '.style = "new-york"' "$COMPONENTS_JSON" > "$tmp" && mv "$tmp" "$COMPONENTS_JSON"
fi

echo "Buscando lista de componentes publicados em $CATALOGO_URL..."
components="$(curl -fsSL "$CATALOGO_URL" | jq -r --arg blocos "${SERVI_DS_BLOCOS:-}" \
  '($blocos | split(" ") | map(select(. != ""))) as $b
   | .items[] | select(.type != "registry:block" or (.name as $n | $b | index($n))) | .name')"

if [ -z "$components" ]; then
  echo "Nenhum componente encontrado no registry." >&2
  exit 1
fi

echo "Instalando componentes:"
while IFS= read -r name; do
  [ -z "$name" ] && continue
  echo "  -> $name"
  if ! npx shadcn@latest add "https://ds.servfaz.app/r/${name}.json" --yes --overwrite; then
    echo "Falha ao instalar o componente ${name}." >&2
    exit 1
  fi
done <<< "$components"

echo "Conferindo alias de import do projeto..."
alias_utils="$(jq -r '.aliases.utils // .aliases.lib // empty' "$COMPONENTS_JSON")"

if [ -z "$alias_utils" ]; then
  echo "Não encontrei aliases.utils nem aliases.lib em components.json." >&2
  echo "Pulei a correção de import. Confira manualmente se algum arquivo instalado ficou com import quebrado." >&2
elif [ "$alias_utils" = "$DEFAULT_IMPORT" ]; then
  echo "Alias do projeto já é igual ao padrão gravado pela CLI ($DEFAULT_IMPORT). Nada para corrigir."
else
  echo "Corrigindo import de '$DEFAULT_IMPORT' para '$alias_utils'..."
  search_dir="src"
  if [ -d "$search_dir" ]; then
    matches="$(grep -rl --include='*.tsx' --include='*.ts' -- "$DEFAULT_IMPORT" "$search_dir" || true)"
    if [ -n "$matches" ]; then
      while IFS= read -r file; do
        [ -z "$file" ] && continue
        sed -i.bak "s|$DEFAULT_IMPORT|$alias_utils|g" "$file"
        rm -f "$file.bak"
        echo "  corrigido: $file"
      done <<< "$matches"
    else
      echo "  nenhum import com o padrão antigo encontrado em $search_dir."
    fi
  else
    echo "  diretório '$search_dir' não encontrado, pulei a correção automática. Confira o alias manualmente." >&2
  fi
fi

# Regra de content design. O item "regras-de-conteudo" do registry instala o
# guia em .claude/rules/. Aqui o CLAUDE.md do projeto ganha (uma vez só) a
# seção que torna a leitura do guia obrigatória antes de criar ou alterar tela.
# A marca no comentário impede que a seção seja repetida a cada atualização.
GUIA_CONTEUDO=".claude/rules/servi-ds-content-design.md"
MARCA_CONTEUDO="<!-- servi-ds:content-design -->"
if [ -f "$GUIA_CONTEUDO" ]; then
  if [ -f "CLAUDE.md" ]; then
    claude_md="CLAUDE.md"
  elif [ -f ".claude/CLAUDE.md" ]; then
    claude_md=".claude/CLAUDE.md"
  else
    claude_md="CLAUDE.md"
  fi
  if grep -qF "$MARCA_CONTEUDO" "$claude_md" 2>/dev/null; then
    echo "Regra de content design já está em $claude_md."
  else
    echo "Acrescentando a regra de content design em $claude_md..."
    # Linha em branco antes da seção, mesmo se o arquivo não termina em quebra de linha.
    if [ -s "$claude_md" ]; then
      if [ -n "$(tail -c1 "$claude_md")" ]; then printf '\n\n'; else printf '\n'; fi >> "$claude_md"
    fi
    cat >> "$claude_md" <<'REGRA'
<!-- servi-ds:content-design -->
## Servi DS: texto de interface

Leitura obrigatória antes de criar ou alterar qualquer tela: `.claude/rules/servi-ds-content-design.md`, inteiro. Todo texto da tela segue o glossário e os padrões desse guia, e a tela só é entregue depois de passar pelo checklist de revisão dele. O guia vem do Servi DS e é substituído a cada atualização: termo novo ou mudança de regra é pedido ao time do Servi DS, nunca editado na cópia deste projeto.
REGRA
  fi
fi

echo "Instalação concluída. Revise o diff antes de commitar."
