# Índice de documentação do Servi DS

Lista completa de toda a documentação que existe hoje, dividida pelos dois lugares onde ela vive: o repositório `servi-ds` (páginas publicadas e regras operacionais) e o projeto Claude "Servi DS" (documentos de processo e decisão). Cada linha traz o arquivo fonte e o link correspondente.

Quando um documento novo for criado, em qualquer um dos dois lugares, ele entra aqui na mesma hora.

## Páginas publicadas em ds.servfaz.app

Site em Storybook. As páginas de apoio e a página do Button vêm de `content/docs/`; as demais páginas de componente são as automáticas do Storybook, montadas a partir das stories em `storybook/`.

Os endereços são amigáveis e ficam sob `/docs` (`/docs/componentes/<nome>`). Somando `.md` no fim, a mesma página abre em markdown. Os endereços antigos (`/componentes/<nome>`, `/desenvolvedores`, `/sobre`, `/patterns/<nome>` e `/?path=/docs/...`) continuam funcionando e levam para a mesma página.

### Documentação

| Página | Arquivo fonte | Link |
| --- | --- | --- |
| Introdução (Comece aqui) | `content/docs/comece.md` | https://ds.servfaz.app/ |
| Desenvolvedores | `content/docs/desenvolvedores.md` | https://ds.servfaz.app/docs/desenvolvedores |
| Sobre o DS (oculta, fora do site por enquanto) | `content/docs/sobre.md` | https://ds.servfaz.app/docs/sobre |

### Componentes

| Componente | Arquivo fonte | Link |
| --- | --- | --- |
| Alert | `storybook/componentes/alert.stories.tsx` | https://ds.servfaz.app/docs/componentes/alert |
| Badge | `storybook/componentes/badge.stories.tsx` | https://ds.servfaz.app/docs/componentes/badge |
| Button | `content/docs/componentes/button.md` | https://ds.servfaz.app/docs/componentes/button |
| Checkbox | `storybook/componentes/checkbox.stories.tsx` | https://ds.servfaz.app/docs/componentes/checkbox |
| Field | `storybook/componentes/field.stories.tsx` | https://ds.servfaz.app/docs/componentes/field |
| Input | `storybook/componentes/input.stories.tsx` | https://ds.servfaz.app/docs/componentes/input |
| Popover | `storybook/componentes/popover.stories.tsx` | https://ds.servfaz.app/docs/componentes/popover |
| Radio Group | `storybook/componentes/radio-group.stories.tsx` | https://ds.servfaz.app/docs/componentes/radio-group |
| Search Bar | `storybook/componentes/search-bar.stories.tsx` | https://ds.servfaz.app/docs/componentes/search-bar |
| Separator | `storybook/componentes/separator.stories.tsx` | https://ds.servfaz.app/docs/componentes/separator |
| Sheet | `storybook/componentes/sheet.stories.tsx` | https://ds.servfaz.app/docs/componentes/sheet |
| Sidebar | `storybook/componentes/sidebar.stories.tsx` | https://ds.servfaz.app/docs/componentes/sidebar |
| Skeleton | `storybook/componentes/skeleton.stories.tsx` | https://ds.servfaz.app/docs/componentes/skeleton |
| Textarea | `storybook/componentes/textarea.stories.tsx` | https://ds.servfaz.app/docs/componentes/textarea |
| Tooltip | `storybook/componentes/tooltip.stories.tsx` | https://ds.servfaz.app/docs/componentes/tooltip |

Cada componente novo ganha a página automática assim que a story dele existe, então esta lista cresce junto com `storybook/componentes/`.

### Patterns

| Pattern | Arquivo fonte | Link |
| --- | --- | --- |
| App Shell | `storybook/blocos/app-shell.stories.tsx` | https://ds.servfaz.app/docs/patterns/app-shell |

### Versões em markdown para LLM

Toda página que vem de `content/docs/` também responde em markdown puro, gerada no build a partir do mesmo arquivo fonte. Uma página nova entra aqui sozinha. Páginas ocultas e páginas automáticas de componente ficam de fora.

| Rota | O que é | Link |
| --- | --- | --- |
| `/llms.txt` | Índice de todas as páginas, com o link da versão `.md` de cada uma | https://ds.servfaz.app/llms.txt |
| `/llms-full.txt` | Documentação inteira em um arquivo só | https://ds.servfaz.app/llms-full.txt |
| `/docs/<pagina>.md` | Página de apoio em markdown | https://ds.servfaz.app/docs/desenvolvedores.md |
| `/docs/componentes/<nome>.md` | Página de componente em markdown | https://ds.servfaz.app/docs/componentes/button.md |

## Arquivos operacionais do repositório

Não são páginas do site, são arquivos que valem como regra para quem (ou qual agente) trabalha no código. Vivem só no repositório.

| Documento | Arquivo fonte | Link |
| --- | --- | --- |
| README | `README.md` | https://github.com/servfaz/servi-ds/blob/main/README.md |
| Changelog | `CHANGELOG.md` | https://github.com/servfaz/servi-ds/blob/main/CHANGELOG.md |
| Regras operacionais para quem trabalha no código | `.claude/CLAUDE.md` | https://github.com/servfaz/servi-ds/blob/main/.claude/CLAUDE.md |
| Regras do site de documentação | `.claude/rules/documentacao-design.md` | https://github.com/servfaz/servi-ds/blob/main/.claude/rules/documentacao-design.md |
| Regras de changelog | `.claude/rules/regras-de-changelog.md` | https://github.com/servfaz/servi-ds/blob/main/.claude/rules/regras-de-changelog.md |
| Script de instalação manual imediata | `templates/instalar-servi-ds.sh` | https://github.com/servfaz/servi-ds/blob/main/templates/instalar-servi-ds.sh |
| Workflow que corta o release automaticamente | `.github/workflows/cut-release.yml` | https://github.com/servfaz/servi-ds/blob/main/.github/workflows/cut-release.yml |
| Workflow que publica a GitHub Release | `.github/workflows/release.yml` | https://github.com/servfaz/servi-ds/blob/main/.github/workflows/release.yml |
| Workflow que abre PR (GitHub) ou MR (GitLab) nos sistemas consumidores | `.github/workflows/propagate-to-consumers.yml` | https://github.com/servfaz/servi-ds/blob/main/.github/workflows/propagate-to-consumers.yml |
| Script que atualiza um consumidor no GitLab e abre a Merge Request | `scripts/propagate-gitlab.sh` | https://github.com/servfaz/servi-ds/blob/main/scripts/propagate-gitlab.sh |
| Script que barra a publicação de registry inválido (dependência não publicada, import ou pacote não declarado) | `scripts/validar-registry.cjs` | https://github.com/servfaz/servi-ds/blob/main/scripts/validar-registry.cjs |
| Workflow que roda essa validação em toda PR e push na main | `.github/workflows/validar-registry.yml` | https://github.com/servfaz/servi-ds/blob/main/.github/workflows/validar-registry.yml |
| Script que gera as rotas `.md`, o `llms.txt` e o `llms-full.txt` no build | `scripts/build-llm-docs.cjs` | https://github.com/servfaz/servi-ds/blob/main/scripts/build-llm-docs.cjs |
| Deploy do site e redirecionamentos dos endereços amigáveis | `vercel.json` | https://github.com/servfaz/servi-ds/blob/main/vercel.json |
| Este índice | `INDICE.md` | https://github.com/servfaz/servi-ds/blob/main/INDICE.md |

## Documentos de processo e decisão

Mantidos só no projeto Claude "Servi DS", nunca copiados para nenhuma outra ferramenta, conforme a regra do próprio projeto. Registram o porquê de cada decisão, não o conteúdo publicado.

| Documento | Caminho no projeto |
| --- | --- |
| O que é o Servi DS | `claude/o-que-e-o-servi-ds.md` |
| Guia completo para desenvolvedores, consumindo o Servi DS | `claude/guia-para-desenvolvedores.md` |
| Arquitetura e regras de design tokens | `claude/arquitetura-e-regras-de-design-tokens.md` |
| Sincronização do Figma para o código | `claude/sincronizacao-figma-codigo.md` |
| Progresso da importação dos componentes do shadcn/ui no Figma | `claude/progresso-import-shadcn.md` |
| Orquestrador de propagação para consumidores | `claude/orquestrador-de-propagacao-para-consumidores.md` |
| Passo a passo para conectar um repositório do GitLab | `claude/conectar-consumidor-gitlab.md` |
| Automação de release (GitHub Actions) | `claude/automacao-release-github.md` |

Dois documentos de processo existem nos dois lugares, de propósito. `claude/design-doc.md` (no projeto) e `.claude/rules/documentacao-design.md` (no repositório) guardam as mesmas regras, assim como `claude/regras-de-changelog.md` e `.claude/rules/regras-de-changelog.md`. A cópia no projeto guarda o contexto completo da decisão, a cópia no repositório é a que vale como regra operacional viva para quem trabalha no código. Uma edição em um dos dois exige a mesma edição no outro.

| Documento | Caminho no projeto | Cópia no repositório |
| --- | --- | --- |
| Regras do site de documentação | `claude/design-doc.md` | `.claude/rules/documentacao-design.md` |
| Regras de changelog | `claude/regras-de-changelog.md` | `.claude/rules/regras-de-changelog.md` |

O script de instalação manual também tem essa mesma relação: a fonte de referência fica em `claude/instalar-servi-ds.sh` no projeto, publicada de forma idêntica em `templates/instalar-servi-ds.sh` no repositório, único caminho que um consumidor real consegue de fato baixar e rodar.

O guia completo para desenvolvedores segue relação parecida, de conteúdo: `claude/guia-para-desenvolvedores.md` no projeto é a fonte do texto publicado em `content/docs/desenvolvedores.md`, no repositório. Uma mudança de conteúdo do guia é feita no projeto primeiro e replicada no repositório antes de valer como página oficial.

Este próprio índice segue a mesma regra: existe em `claude/indice-de-documentacao.md` no projeto Claude e em `INDICE.md`, na raiz do repositório, com texto idêntico nos dois lugares.
