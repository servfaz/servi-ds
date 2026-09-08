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
# Requisitos: curl, jq, node/npx, sed.

set -euo pipefail

REGISTRY_URL="https://ds.servfaz.app/r/registry.json"
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

echo "Buscando lista de componentes publicados em $REGISTRY_URL..."
components="$(curl -fsSL "$REGISTRY_URL" | jq -r '.items[].name')"

if [ -z "$components" ]; then
  echo "Nenhum componente encontrado no registry." >&2
  exit 1
fi

echo "Instalando componentes:"
while IFS= read -r name; do
  [ -z "$name" ] && continue
  echo "  -> $name"
  npx shadcn@latest add "https://ds.servfaz.app/r/${name}.json" --yes --overwrite
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

echo "Instalação concluída. Revise o diff antes de commitar."
