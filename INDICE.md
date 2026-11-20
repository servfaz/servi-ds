# Índice de documentação do Servi DS

Lista de toda a documentação que existe hoje, dividida pelos dois lugares onde ela vive: o repositório `servi-ds` (páginas publicadas e regras operacionais) e o projeto Claude "Servi DS" (documentos de processo e decisão). Cada linha traz o arquivo fonte e o link correspondente.

Quando um documento novo for criado, em qualquer um dos dois lugares, ele entra aqui na mesma hora.

Última revisão: 20/11/2026.

## Páginas publicadas em ds.servfaz.app

Site em Storybook. As páginas de apoio e a página do Button vêm de `content/docs/`; as demais páginas de componente são as automáticas do Storybook, montadas a partir das stories em `storybook/componentes/`.

Os endereços são amigáveis e ficam sob `/docs` (`/docs/componentes/<nome>`). Somando `.md` no fim, a mesma página abre em markdown. Os endereços antigos (`/componentes/<nome>`, `/desenvolvedores`, `/sobre`, `/conteudo`, `/patterns/<nome>` e `/?path=/docs/...`) continuam funcionando e levam para a mesma página.

### Documentação

| Página | Arquivo fonte | Link |
| --- | --- | --- |
| Introdução (Comece aqui) | `content/docs/comece.md` | https://ds.servfaz.app/ |
| Desenvolvedores | `content/docs/desenvolvedores.md` | https://ds.servfaz.app/docs/desenvolvedores |
| Sobre o Servi DS | `content/docs/sobre.md` | https://ds.servfaz.app/docs/sobre |
| Conteúdo (voz, tom, padrões de texto e glossário) | `content/docs/conteudo.md` | https://ds.servfaz.app/docs/conteudo |
| Componentes (visão geral, cards por categoria) | `content/docs/componentes.md` | https://ds.servfaz.app/docs/componentes |

### Componentes

Todo item `registry:ui` do `registry.json` tem página no site, no endereço `https://ds.servfaz.app/docs/componentes/<nome>`, com `<nome>` igual ao do registry. A fonte é `storybook/componentes/<nome>.stories.tsx` (página automática). A exceção é o Button, com página própria em `content/docs/componentes/button.md`. O `label` não tem página: é usado dentro de outros componentes.

Componentes publicados em 16/11/2026 (63):

`accordion`, `alert`, `alert-dialog`, `app-header`, `app-launcher`, `app-shell`, `app-side-panel`, `app-sidebar`, `aspect-ratio`, `avatar`, `badge`, `breadcrumb`, `button`, `button-group`, `calendar`, `card`, `carousel`, `chart`, `checkbox`, `collapsible`, `combobox`, `command`, `context-menu`, `data-table`, `date-picker`, `dialog`, `drawer`, `dropdown-menu`, `empty`, `field`, `form`, `hover-card`, `input`, `input-group`, `input-otp`, `item`, `kbd`, `label`, `menubar`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `search-bar`, `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `slider`, `sonner`, `spinner`, `switch`, `table`, `table-group`, `tabs`, `textarea`, `toggle`, `toggle-group`, `tooltip`.

A lista de referência é sempre o `registry.json`. Componente novo ganha a página automática assim que a story existe.

Além dos componentes, o registry publica o item `regras-de-conteudo`, sem página no site: leva o guia de content design aos sistemas consumidores.

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
| `/docs/componentes/<nome>.md` | Página de componente em markdown (hoje, só o Button) | https://ds.servfaz.app/docs/componentes/button.md |

## Arquivos operacionais do repositório

Não são páginas do site. Valem como regra ou automação para quem (ou qual agente) trabalha no código. Vivem só no repositório.

| Documento | Arquivo fonte | Link |
| --- | --- | --- |
| README | `README.md` | https://github.com/servfaz/servi-ds/blob/main/README.md |
| Changelog | `CHANGELOG.md` | https://github.com/servfaz/servi-ds/blob/main/CHANGELOG.md |
| Versão atual do registry | `REGISTRY_VERSION` | https://github.com/servfaz/servi-ds/blob/main/REGISTRY_VERSION |
| Regras operacionais para quem trabalha no código | `.claude/CLAUDE.md` | https://github.com/servfaz/servi-ds/blob/main/.claude/CLAUDE.md |
| Regras do site de documentação | `.claude/rules/documentacao-design.md` | https://github.com/servfaz/servi-ds/blob/main/.claude/rules/documentacao-design.md |
| Content design (voz, tom, padrões de texto e glossário) | `.claude/rules/content-design.md` | https://github.com/servfaz/servi-ds/blob/main/.claude/rules/content-design.md |
| Regras de changelog | `.claude/rules/regras-de-changelog.md` | https://github.com/servfaz/servi-ds/blob/main/.claude/rules/regras-de-changelog.md |
| Cadastro dos sistemas consumidores | `automation/consumers.json` | https://github.com/servfaz/servi-ds/blob/main/automation/consumers.json |
| Script de instalação manual imediata | `templates/instalar-servi-ds.sh` | https://github.com/servfaz/servi-ds/blob/main/templates/instalar-servi-ds.sh |
| Workflow que corta o release automaticamente | `.github/workflows/cut-release.yml` | https://github.com/servfaz/servi-ds/blob/main/.github/workflows/cut-release.yml |
| Workflow que publica a GitHub Release | `.github/workflows/release.yml` | https://github.com/servfaz/servi-ds/blob/main/.github/workflows/release.yml |
| Script que corta o release | `scripts/cut-release.mjs` | https://github.com/servfaz/servi-ds/blob/main/scripts/cut-release.mjs |
| Script que extrai as notas da release | `scripts/extract-release-notes.mjs` | https://github.com/servfaz/servi-ds/blob/main/scripts/extract-release-notes.mjs |
| Workflow que abre PR (GitHub) ou MR (GitLab) nos sistemas consumidores | `.github/workflows/propagate-to-consumers.yml` | https://github.com/servfaz/servi-ds/blob/main/.github/workflows/propagate-to-consumers.yml |
| Script que atualiza um consumidor no GitLab e abre a Merge Request | `scripts/propagate-gitlab.sh` | https://github.com/servfaz/servi-ds/blob/main/scripts/propagate-gitlab.sh |
| Script que barra a publicação de registry inválido | `scripts/validar-registry.cjs` | https://github.com/servfaz/servi-ds/blob/main/scripts/validar-registry.cjs |
| Workflow que roda essa validação em toda PR e push na main | `.github/workflows/validar-registry.yml` | https://github.com/servfaz/servi-ds/blob/main/.github/workflows/validar-registry.yml |
| Script que gera o `cssVars` do item `tokens` a partir de `tokens/*.css` | `scripts/sync-registry-tokens.cjs` | https://github.com/servfaz/servi-ds/blob/main/scripts/sync-registry-tokens.cjs |
| Script que gera as rotas `.md`, o `llms.txt` e o `llms-full.txt` no build | `scripts/build-llm-docs.cjs` | https://github.com/servfaz/servi-ds/blob/main/scripts/build-llm-docs.cjs |
| Deploy do site e redirecionamentos dos endereços amigáveis | `vercel.json` | https://github.com/servfaz/servi-ds/blob/main/vercel.json |
| Este índice | `INDICE.md` | https://github.com/servfaz/servi-ds/blob/main/INDICE.md |

## Documentos de processo e decisão

Mantidos só no projeto Claude "Servi DS". Registram o porquê de cada decisão e o estado de cada frente de trabalho, não o conteúdo publicado.

| Documento | Caminho no projeto |
| --- | --- |
| O que é o Servi DS (visão, valores e princípios) | `claude/o-que-e-o-servi-ds.md` |
| Arquitetura e regras de design tokens | `claude/arquitetura-e-regras-de-design-tokens.md` |
| Sincronização entre Figma e código, com o histórico do import do shadcn/ui no Figma | `claude/sincronizacao-figma-codigo.md` |
| Orquestrador de propagação para consumidores | `claude/orquestrador-de-propagacao-para-consumidores.md` |
| Passo a passo para conectar um repositório do GitLab | `claude/conectar-consumidor-gitlab.md` |
| Automação de release (GitHub Actions) | `claude/automacao-release-github.md` |
| Guia rápido para devs, em formato de mensagem de WhatsApp | `claude/guia-devs-whatsapp.md` |

## Documentos que existem nos dois lugares

Alguns documentos existem no projeto e no repositório, de propósito. A cópia no repositório é a que vale como regra viva para quem trabalha no código. Uma edição em um dos dois exige a mesma edição no outro.

| Documento | Caminho no projeto | Cópia no repositório | Relação |
| --- | --- | --- | --- |
| Regras do site de documentação | `claude/design-doc.md` | `.claude/rules/documentacao-design.md` | Texto idêntico |
| Regras de changelog | `claude/regras-de-changelog.md` | `.claude/rules/regras-de-changelog.md` | Texto idêntico |
| Content design: regras de escrita, voz e tom, padrões por componente e glossário. Leitura obrigatória antes de criar ou alterar tela | `claude/content-design.md` | `.claude/rules/content-design.md` | Texto idêntico. A página Conteúdo do site é um resumo visual dele |
| Script de instalação manual | `claude/instalar-servi-ds.sh` | `templates/instalar-servi-ds.sh` | Texto idêntico |
| Guia para desenvolvedores | `claude/guia-para-desenvolvedores.md` | `content/docs/desenvolvedores.md` | Mesmo conteúdo. O projeto guarda o texto da página, sem o frontmatter |
| Este índice | `claude/indice-de-documentacao.md` | `INDICE.md` | Texto idêntico |
