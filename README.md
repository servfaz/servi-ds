# Servi DS: Registry

Registry de componentes shadcn/ui com a identidade visual da Servfaz. Este repositório é a fonte única dos componentes restilizados e o ponto de partida da distribuição deles para os sistemas internos que já usam shadcn/ui em produção.

Regras operacionais para quem (ou qual agente) for trabalhar neste código estão em [`.claude/CLAUDE.md`](./.claude/CLAUDE.md). Este README explica o que é o projeto e como ele é organizado. Para o link de cada página e cada documento que existe hoje, ver o [índice de documentação](./INDICE.md).

## Contexto

Os sistemas de produto da Servfaz já usam shadcn/ui. shadcn não é uma biblioteca instalada via npm, é um gerador de código: o CLI copia o código-fonte de cada componente direto para dentro do repositório de quem instala. A partir da cópia, aquele arquivo passa a ser código do próprio projeto, sem vínculo automático com nenhuma fonte externa. A camada visual de cada componente foi escrita pelo shadcn, o Radix Primitives por trás entrega só comportamento (foco, teclado, ARIA), nenhuma camada de estilo.

Esse repositório existe para a designer aplicar a identidade visual da Servfaz sobre esses componentes, sem publicar pacote no npm, opção descartada por reintroduzir dependência real de versão entre React, Tailwind e Radix nos sistemas consumidores.

## Objetivo

Aplicar cor, tipografia, espaçamento, raio de borda e ajustes estruturais pontuais de tamanho em todos os sistemas que usam shadcn/ui, sem publicar pacote npm e sem quebrar nenhuma tela existente.

## Escopo

O que muda: cores, tipografia, espaçamento, tamanhos de componente (altura, padding, raio).

O que se mantém: nomes e estrutura das variantes existentes (`variant`, `size`). O contrato de props de cada componente não muda, nenhuma tela precisa alterar código para receber a atualização visual.

O que não entra neste repositório: reescrita de comportamento (a camada do Radix não é tocada), publicação de pacote npm de componentes.

## Arquitetura de distribuição, Registry mais CI

O processo de propagação, para cor, raio, tipografia, espaçamento e ajustes estruturais, é único: Registry mais CI. Não existe rota alternativa em paralelo.

1. A designer organiza os componentes restilizados em `registry/servfaz/` e descreve cada um em `registry.json`, no formato `registry-item` do shadcn.
2. O comando `shadcn build` (rodado no `prebuild`/`build` a cada deploy) lê `registry.json` e gera os arquivos estáticos de `public/r/`, publicados em `https://ds.servfaz.app/r/{name}.json`.
3. Cada sistema consumidor aponta para esse endereço no próprio `components.json`, na chave `registries`.
4. Um workflow de CI em cada sistema consumidor (`.github/workflows/propagate-to-consumers.yml`, disparado deste repositório) roda o comando de atualização para os componentes do Servi DS e abre um Pull Request quando algo muda.
5. Um desenvolvedor revisa o diff do PR e aprova o merge. Esse é o único passo manual recorrente depois de tudo configurado.

Rollout é gradual, componente por componente: um componente ausente do `registry.json` continua no padrão shadcn original no sistema consumidor, sem risco de quebra. A qualquer momento um mesmo sistema pode ter parte dos componentes no padrão Servfaz e parte ainda no padrão shadcn original.

## Estrutura do repositório

```
servi-ds/
├── app/                        (site de documentação, Next.js App Router)
│   ├── docs/
│   │   ├── componentes/[nome]/page.tsx
│   │   ├── desenvolvedores/page.tsx
│   │   └── sobre/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── automation/
│   └── consumers.json          (lista de repositórios que recebem propagação automática)
├── components/
│   ├── docs/                   (blocos do site: tabela de props, bloco de código, navegação etc.)
│   └── docs-shell.tsx
├── content/
│   └── docs/                   (markdown puro, fonte de cada página do site)
│       ├── comece.md
│       ├── desenvolvedores.md
│       ├── sobre.md
│       └── componentes/
│           └── button.md
├── lib/                        (leitura de conteúdo, geração de índice, utilitários do site)
├── public/
│   ├── brand/                  (logo Servfaz)
│   └── r/                      (saída gerada por "shadcn build", nunca editada à mão)
│       ├── registry.json
│       ├── button.json
│       └── tokens.json
├── registry/
│   └── servfaz/
│       └── button.tsx          (único componente publicado até aqui)
├── scripts/
│   ├── sync-registry-tokens.cjs  (gera cssVars de registry.json a partir de tokens/*.css)
│   ├── cut-release.mjs           (fecha o lote "Não lançado" do CHANGELOG e calcula o bump)
│   └── extract-release-notes.mjs (extrai as notas de uma versão para a GitHub Release)
├── templates/
│   └── instalar-servi-ds.sh    (script opcional de instalação manual imediata, sem esperar o ciclo de PR)
├── tokens/
│   ├── tokens-primitives.css   (camada 1)
│   ├── tokens-semantic.css     (camada 2)
│   └── tokens-component.css    (camada 3)
├── .github/
│   └── workflows/
│       ├── release.yml                  (publica a GitHub Release a partir da tag)
│       └── propagate-to-consumers.yml   (abre PR nos consumidores)
├── CHANGELOG.md
├── REGISTRY_VERSION
├── registry.json                (catálogo fonte, editado à mão)
├── components.json
└── package.json
```

`registry/` é a única pasta de componente editada à mão. `public/r/` é sempre gerado a partir de `registry/` e `registry.json` via `shadcn build`, nunca editado direto.

`tokens/` segue a arquitetura em três camadas (Primitivo, Semântico, Componente). Resumo: um token é uma decisão de design nomeada, nunca um valor bruto. Componente referencia semântico, semântico referencia primitivo, uma camada nunca pula a outra. Dark mode é resolvido inteiramente na camada semântica, nunca dentro do componente. A taxonomia completa, com o porquê de cada regra, vive no projeto Claude "Servi DS" (`arquitetura-e-regras-de-design-tokens.md`).

## Rodando localmente

Gerenciador de pacotes é npm.

```
npm install
npm run dev            # sobe o site de documentação em http://localhost:3000
npm run sync-tokens    # regenera registry.json a partir de tokens/*.css, sem buildar
npm run registry:build # roda sync-tokens e depois "shadcn build", gera public/r/
npm run build          # build completo do site (roda prebuild, shadcn build e next build)
```

Antes de publicar um item novo, teste sem gravar nenhum arquivo:

```
npx shadcn view http://localhost:3000/r/button.json
npx shadcn add http://localhost:3000/r/button.json --dry-run
```

## Documentação completa

Este README cobre o essencial para orientar quem chega ao repositório. As regras completas, o plano de fases e as decisões de arquitetura, com o porquê de cada uma, vivem no projeto Claude "Servi DS", fora deste repositório por decisão do projeto (ver [`.claude/CLAUDE.md`](./.claude/CLAUDE.md)). Este repositório guarda só o que é publicado: código, tokens, documentação de componente e as regras operacionais em `.claude/rules/`.

O [índice completo de toda a documentação](./INDICE.md), com o link de cada página e de cada documento, fica em `INDICE.md`, na raiz deste repositório.