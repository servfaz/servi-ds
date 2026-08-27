# Servi DS — Registry

Registry de componentes shadcn/ui com a identidade visual da Servfaz. Este repositório é a fonte única dos componentes restilizados e o ponto de partida da distribuição deles para os sistemas internos que já usam shadcn/ui em produção.

Regras operacionais para quem (ou qual agente) for trabalhar neste código estão em [`CLAUDE.md`](./CLAUDE.md). Este README explica o que é o projeto e como ele é organizado.

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
2. O comando `shadcn build` gera os arquivos estáticos de `public/r/`, publicados em `https://ds.servfaz.com.br/r/{name}.json`.
3. Cada sistema consumidor aponta para esse endereço no próprio `components.json`, na chave `registries`.
4. Um workflow de CI, em cada sistema, roda em agenda fixa, executa o comando de atualização para os componentes do Servi DS e abre um Pull Request quando algo muda.
5. Um desenvolvedor revisa o diff do PR e aprova o merge. Esse é o único passo manual recorrente depois de tudo configurado.

Rollout é gradual, componente por componente: um componente ausente do `registry.json` continua no padrão shadcn original no sistema consumidor, sem risco de quebra. A qualquer momento um mesmo sistema pode ter parte dos componentes no padrão Servfaz e parte ainda no padrão shadcn original.

## Estrutura do repositório

```
servi-ds/
├── registry/
│   └── servfaz/
│       ├── button.tsx
│       ├── input.tsx
│       ├── select.tsx
│       └── ...              (demais componentes priorizados)
├── public/
│   └── r/
│       ├── registry.json    (índice com a lista de todos os componentes)
│       ├── button.json
│       ├── input.json
│       └── select.json
├── tokens/
│   ├── primitives.json
│   ├── semantic.json
│   └── component.json
├── styles/
│   └── globals.css
├── scripts/
│   └── build-registry.ts
├── .github/
│   └── workflows/
│       └── publish-registry.yml
├── components.json
└── package.json
```

`registry/` é a única pasta editada à mão. `public/r/` é sempre gerado a partir de `registry/` via `shadcn build`, nunca editado direto.

`tokens/` segue a arquitetura em três camadas (Primitivo, Semântico, Componente), documentada por completo em "Arquitetura e Regras de Design Tokens" (link abaixo). Resumo: um token é uma decisão de design nomeada, nunca um valor bruto. Componente referencia semântico, semântico referencia primitivo, uma camada nunca pula a outra. Dark mode é resolvido inteiramente na camada semântica, nunca dentro do componente.

> A estrutura acima é a arquitetura alvo do repositório. Ele ainda está com a organização padrão do template `shadcn-ui/registry-template` do qual foi criado (`registry/new-york/...`, `registry.json` com valores de exemplo), a migração para `registry/servfaz/` e para os metadados reais do Servi DS é trabalho em andamento da Fase 1 e 2 do plano.

## Rodando localmente

Gerenciador de pacotes é pnpm.

```
pnpm install
pnpm dev              # sobe o projeto em http://localhost:3000
pnpm registry:build   # roda "shadcn build" e gera public/r/ a partir de registry/ e registry.json
```

Antes de publicar um item novo, teste sem gravar nenhum arquivo:

```
npx shadcn view http://localhost:3000/r/button.json
npx shadcn add http://localhost:3000/r/button.json --dry-run
```
e nem o 
## Documentação completa

Este README cobre o essencial para orientar quem chega ao repositório. O plano completo (fases, decisão de arquitetura, guia passo a passo, perguntas abertas para o time de dev) e a arquitetura de tokens (taxonomia, regras de nomenclatura, regras de dark mode, validação de contraste) vivem na documentação oficial do Design System, nos arquivos `plano-de-restilizacao-do-design-system.md` e `arquitetura-e-regras-de-design-tokens.md`.

Os arquivos de fonte visual (Figma) ficam em dois projetos separados: [Variables](https://www.figma.com/design/FJY9bl17wrv2Qy6faoib66/-SF-DS--Variables), com as coleções de tokens, e [Components](https://www.figma.com/design/ipQKV07jFEBsLxIv5tt1qI/-SF-DS--Components), com a biblioteca de componentes.
