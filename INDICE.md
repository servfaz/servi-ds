# Índice de documentação do Servi DS

Lista completa de toda a documentação que existe hoje, dividida pelos dois lugares onde ela vive: o repositório `servi-ds` (páginas publicadas e regras operacionais) e o projeto Claude "Servi DS" (documentos de processo e decisão). Cada linha traz o arquivo fonte e o link correspondente.

Quando um documento novo for criado, em qualquer um dos dois lugares, ele entra aqui na mesma hora.

## Páginas publicadas em ds.servfaz.app

Conteúdo em `content/docs/` neste repositório, servido pelo site Next.js.

| Página | Arquivo fonte | Link |
| --- | --- | --- |
| Comece | `content/docs/comece.md` | https://ds.servfaz.app/ |
| Desenvolvedores | `content/docs/desenvolvedores.md` | https://ds.servfaz.app/docs/desenvolvedores |
| Sobre o DS | `content/docs/sobre.md` | https://ds.servfaz.app/docs/sobre |
| Componente: Button | `content/docs/componentes/button.md` | https://ds.servfaz.app/docs/componentes/button |

Cada componente novo publicado no registry ganha automaticamente uma página nesse mesmo padrão, então esta lista cresce junto com `registry.json`.

## Arquivos operacionais do repositório

Não são páginas do site, são arquivos que valem como regra para quem (ou qual agente) trabalha no código. Vivem só aqui.

| Documento | Arquivo fonte | Link |
| --- | --- | --- |
| README | `README.md` | https://github.com/servfaz/servi-ds/blob/main/README.md |
| Regras operacionais para quem trabalha no código | `.claude/CLAUDE.md` | https://github.com/servfaz/servi-ds/blob/main/.claude/CLAUDE.md |
| Regras de geração de documentação de componente | `.claude/rules/documentacao-design.md` | https://github.com/servfaz/servi-ds/blob/main/.claude/rules/documentacao-design.md |
| Regras de changelog | `.claude/rules/regras-de-changelog.md` | https://github.com/servfaz/servi-ds/blob/main/.claude/rules/regras-de-changelog.md |
| Script de instalação manual imediata | `templates/instalar-servi-ds.sh` | https://github.com/servfaz/servi-ds/blob/main/templates/instalar-servi-ds.sh |
| Este índice | `INDICE.md` | https://github.com/servfaz/servi-ds/blob/main/INDICE.md |

## Documentos de processo e decisão

Mantidos só no projeto Claude "Servi DS", nunca copiados para nenhuma outra ferramenta, conforme a regra do próprio projeto. Registram o porquê de cada decisão, não o conteúdo publicado.

| Documento | Caminho no projeto |
| --- | --- |
| O que é o Servi DS | `claude/o-que-e-o-servi-ds.md` |
| Arquitetura e regras de design tokens | `claude/arquitetura-e-regras-de-design-tokens.md` |
| Orquestrador de propagação para consumidores | `claude/orquestrador-de-propagacao-para-consumidores.md` |
| Automação de release (GitHub Actions) | `claude/automacao-release-github.md` |

Dois documentos de processo têm uma particularidade: existem em ambos os lugares, com texto idêntico, de propósito. `claude/design-doc.md` (no projeto) e `.claude/rules/documentacao-design.md` (neste repositório) são o mesmo arquivo, assim como `claude/regras-de-changelog.md` e `.claude/rules/regras-de-changelog.md`. A cópia no projeto guarda o contexto completo da decisão, a cópia aqui é a que vale como regra operacional viva para quem trabalha no código. Uma edição em um dos dois exige a mesma edição no outro.

| Documento | Caminho no projeto | Cópia idêntica neste repositório |
| --- | --- | --- |
| Regras para geração de documentação de componente | `claude/design-doc.md` | `.claude/rules/documentacao-design.md` |
| Regras de changelog | `claude/regras-de-changelog.md` | `.claude/rules/regras-de-changelog.md` |

O script de instalação manual também tem essa mesma relação: a fonte de referência fica em `claude/instalar-servi-ds.sh` no projeto, publicada de forma idêntica em `templates/instalar-servi-ds.sh` neste repositório, único caminho que um consumidor real consegue de fato baixar e rodar.

Este próprio índice segue a mesma regra: existe em `claude/indice-de-documentacao.md` no projeto Claude e aqui, em `INDICE.md`, com texto idêntico nos dois lugares.
