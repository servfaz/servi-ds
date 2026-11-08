#!/usr/bin/env bash
# Propaga o Servi DS para um repositório consumidor hospedado no GitLab.
#
# Roda dentro do orquestrador de propagação (.github/workflows/propagate-to-consumers.yml),
# a partir de um checkout do servi-ds. Faz para o GitLab o mesmo que o job do
# GitHub faz: instala o catálogo publicado no consumidor, corrige o alias de
# import e abre (ou atualiza) uma Merge Request na branch chore/update-servfaz-ds.
#
# A instalação e a correção de alias usam templates/instalar-servi-ds.sh, o
# mesmo script da instalação manual, para que as duas formas nunca divirjam.
#
# Variáveis de ambiente:
#   GITLAB_PROJECT  obrigatória. Caminho do projeto, ex.: "servfaz/faturamento-front".
#   GITLAB_TOKEN    obrigatória. Token com escopos api e write_repository.
#   GITLAB_HOST     opcional. Padrão: gitlab.com.
#   TARGET_BRANCH   opcional. Padrão: a branch padrão do projeto no GitLab.
#
# Requisitos: bash, curl, jq, git, node/npx, sed.

set -euo pipefail

GITLAB_HOST="${GITLAB_HOST:-gitlab.com}"
GITLAB_PROJECT="${GITLAB_PROJECT:?Defina GITLAB_PROJECT (ex.: servfaz/meu-sistema)}"
BRANCH="chore/update-servfaz-ds"
COMMIT_MESSAGE="chore: atualiza componentes do Servfaz DS"
MR_TITLE="Atualizacao automatica: Servfaz DS"

# Mostra o erro no resumo da execução do GitHub Actions (anotação) e encerra.
falha() {
  echo "::error title=Propagação GitLab (${GITLAB_PROJECT})::$1"
  exit 1
}

if [ -z "${GITLAB_TOKEN:-}" ]; then
  falha "GITLAB_TOKEN vazio. Configure o secret SERVFAZ_DS_GITLAB_TOKEN (ou o definido em token_secret) no servi-ds."
fi

for bin in curl jq git npx sed; do
  command -v "$bin" >/dev/null 2>&1 || falha "Comando obrigatório não encontrado: $bin"
done

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INSTALLER="$SCRIPT_DIR/../templates/instalar-servi-ds.sh"
[ -f "$INSTALLER" ] || falha "Não encontrei $INSTALLER"

API="https://${GITLAB_HOST}/api/v4"
PROJECT_ID="$(jq -rn --arg p "$GITLAB_PROJECT" '$p|@uri')"

api() {
  # api METODO CAMINHO [args extras do curl]
  local method="$1" path="$2"; shift 2
  curl -fsS -X "$method" -H "PRIVATE-TOKEN: ${GITLAB_TOKEN}" "$API$path" "$@"
}

echo "Consumidor GitLab: ${GITLAB_HOST}/${GITLAB_PROJECT}"

project_json="$(api GET "/projects/${PROJECT_ID}")" ||
  falha "Não consegui ler o projeto no GitLab. Confira o caminho, o host e se o token tem acesso ao projeto, com escopo api, e não expirou."
TARGET_BRANCH="${TARGET_BRANCH:-$(jq -r '.default_branch // "main"' <<<"$project_json")}"
echo "Branch de destino: $TARGET_BRANCH"

WORKDIR="$(mktemp -d "${RUNNER_TEMP:-/tmp}/consumer-XXXXXX")"
git clone --quiet --depth 1 --branch "$TARGET_BRANCH" \
  "https://oauth2:${GITLAB_TOKEN}@${GITLAB_HOST}/${GITLAB_PROJECT}.git" "$WORKDIR" ||
  falha "Não consegui clonar o projeto. Confira se o token tem escopo read_repository ou write_repository."
cd "$WORKDIR"

bash "$INSTALLER" ||
  falha "A instalação dos componentes falhou no consumidor. O componente que falhou aparece no log do passo. Causas comuns: falta components.json na raiz (npx shadcn@latest init) ou um item do registry depende de outro que não foi publicado."

if [ -z "$(git status --porcelain)" ]; then
  echo "Nada mudou no consumidor. Nenhuma Merge Request aberta."
  exit 0
fi

git config user.name "Servi DS"
git config user.email "servi-ds-bot@noreply.${GITLAB_HOST}"
git checkout --quiet -B "$BRANCH"
git add -A
git commit --quiet -m "$COMMIT_MESSAGE"
# A branch é recriada a cada execução a partir da branch de destino, como no job do GitHub.
git push --quiet --force origin "$BRANCH" ||
  falha "Não consegui enviar a branch $BRANCH. Confira se o token tem escopo write_repository e papel Developer ou maior."
echo "Branch $BRANCH enviada."

open_mr="$(api GET "/projects/${PROJECT_ID}/merge_requests?state=opened&source_branch=$(jq -rn --arg b "$BRANCH" '$b|@uri')" | jq -r '.[0].web_url // empty')"

if [ -n "$open_mr" ]; then
  echo "Merge Request já aberta e atualizada: $open_mr"
  exit 0
fi

DESCRIPTION="Atualização automática dos componentes do Servi DS a partir de https://ds.servfaz.app/r/registry.json.

Antes do merge:
- revise o diff (visual e funcional);
- confira no CHANGELOG do Servi DS se alguma mudança MAJOR pede migração.

Aberta pelo orquestrador de propagação do Servi DS."

created_url="$(api POST "/projects/${PROJECT_ID}/merge_requests" \
  --data-urlencode "source_branch=${BRANCH}" \
  --data-urlencode "target_branch=${TARGET_BRANCH}" \
  --data-urlencode "title=${MR_TITLE}" \
  --data-urlencode "description=${DESCRIPTION}" \
  --data-urlencode "remove_source_branch=true" | jq -r '.web_url')"

echo "Merge Request aberta: $created_url"
