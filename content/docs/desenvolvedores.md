---
title: Começando um projeto novo com o Servi DS
description: Guia completo para desenvolvedores que estão configurando um produto, novo ou existente, para consumir o Servi DS.
---

O Servi DS é de uso exclusivo dos sistemas da Servfaz. Ele não é destinado a projetos externos, de terceiros ou fora da empresa, sob nenhuma circunstância.

## Pré-requisitos

- Node.js na versão LTS.
- Next.js com App Router.
- Tailwind CSS configurado.
- Acesso ao registry público em `ds.servfaz.app`.

O Servi DS é construído sobre o shadcn/ui.

## Passo 1: preparar o projeto

Em um projeto novo:

```bash
npx create-next-app@latest nome-do-projeto --typescript --tailwind --app
```

Em um projeto existente, confirme que ele já atende aos pré-requisitos acima antes de seguir para o próximo passo.

## Passo 2: inicializar o shadcn/ui

```bash
npx shadcn@latest init
```

Esse comando cria três coisas:

- `components.json`, com a configuração do projeto (aliases de import, estilo, diretório dos componentes).
- `lib/utils.ts`, com a função auxiliar usada pelos componentes.
- As variáveis CSS base em `app/globals.css`.

Mantenha os aliases padrão sugeridos pela CLI (`@components`, `@ui`, `@lib`, `@hooks`) sempre que possível. Se o projeto já usa uma convenção de alias diferente, tudo bem seguir com ela, só preste atenção no Passo 4.

## Passo 3: trazer os componentes para o projeto

Existem dois caminhos, e eles não competem entre si: o primeiro resolve a instalação imediata, o segundo é o que mantém o projeto atualizado depois.

### Caminho A: instalação imediata (bootstrap local)

Use quando quiser os componentes agora, sem esperar o cadastro do repositório no fluxo automático.

Rode o script `instalar-servi-ds.sh`, disponível em `templates/` neste repositório, a partir da raiz do projeto consumidor, com `components.json` já criado (Passo 2 concluído). Ele exige `curl`, `jq`, `node`/`npx` e `sed` instalados.

O que o script faz:

1. Busca a lista de componentes já publicados em `registry.json`.
2. Instala cada um deles com o CLI do shadcn, apontando direto para a URL pública de cada item.
3. Confere o alias de import declarado em `components.json`. Se for diferente do padrão gravado pela CLI, corrige automaticamente os arquivos instalados. Essa correção automática só funciona em projetos com uma pasta `src` na raiz. Fora desse caso, revise o alias manualmente.

Isso instala o catálogo inteiro publicado até aquele momento. É um ponto de partida, não a forma de receber atualizações futuras.

### Caminho B: cadastro como consumidor oficial (fluxo automático)

É o que mantém o projeto atualizado depois da instalação inicial, sem rodar nada manualmente.

1. Solicite ao time do Servi DS o cadastro do repositório como consumidor.
2. O time adiciona o repositório na lista de consumidores do Servi DS.
3. Esse cadastro já dispara sozinho a primeira instalação completa: um robô entra no repositório, instala todos os componentes publicados e abre uma Pull Request com o resultado.
4. A partir daí, toda vez que um componente novo for publicado ou um existente for atualizado, o mesmo robô abre uma PR nova no repositório, sempre na mesma branch, com o diff da mudança.
5. O único passo manual recorrente de todo o fluxo é revisar e aprovar essa PR.

Se o repositório já foi cadastrado, as atualizações seguintes chegam só por esse caminho. Rodar o script do Caminho A depois do cadastro não é necessário e não substitui o fluxo automático.

Se o projeto já tinha algum componente shadcn/ui customizado à mão antes desse cadastro, essa primeira PR substitui esse componente pela versão do Servi DS, e a customização se perde. Reaplique a customização por cima do componente novo, ou peça um token ou uma variante nova ao time do Servi DS, em vez de perder o que já existia sem perceber.

## Passo 4: confirmar que os imports não quebraram

O CLI do shadcn grava import apontando para um caminho padrão. Se o alias real do projeto for outro, confira se algum arquivo instalado ficou com import quebrado antes de seguir. O Caminho A corrige isso sozinho quando o projeto tem pasta `src` na raiz; nos demais casos, ou quando a instalação veio pela PR automática, revise manualmente os arquivos alterados.

## Passo 5: tema claro e escuro

Todo token semântico do Servi DS já resolve os dois valores, claro e escuro, sem que o componente precise de lógica condicional de tema. O trabalho do projeto consumidor é só ligar o mecanismo de alternância de tema, por exemplo com a biblioteca `next-themes`, e deixar que os tokens façam o resto.

Nunca escreva `if (darkMode)` ou equivalente dentro de um componente do Servi DS. Se um componente parecer precisar de dois desenhos diferentes por modo, o problema é a falta de um token semântico, não algo para resolver no código do consumidor.

## Passo 6: ícones

O Servi DS usa exclusivamente a biblioteca [Phosphor Icons](https://phosphoricons.com/).

```bash
npm install @phosphor-icons/react
```

Use sempre o nome oficial do ícone na biblioteca Phosphor. Nenhum outro pacote de ícones (Lucide, Heroicons, Feather ou qualquer outro) é compatível com os componentes do Servi DS, e nenhum SVG solto substitui uma referência Phosphor.

## Passo 7: usar tokens corretamente ao estender uma tela

Nenhum valor bruto (hexadecimal, pixel solto, cor em RGB) deve aparecer em código de produto que usa o Servi DS. Toda cor, espaçamento, raio ou sombra é uma variável de token: `var(--nome-do-token)`.

Se a tela que você está construindo parece precisar de um valor que nenhum token cobre, a resposta não é digitar o valor direto. É verificar com o time do Servi DS se falta um token no sistema.

## Como as atualizações continuam chegando

Toda mudança publicada no Servi DS vira uma entrada de changelog no mesmo commit que a publica. Uma vez por mês, no dia 1, essas entradas viram uma versão nova, publicada como Release no GitHub. Como consumidor, você não precisa acompanhar esse calendário: a atualização real chega pelo fluxo do Caminho B, como uma PR no seu repositório. Antes de aprovar essa PR, vale conferir as notas da versão para saber se alguma mudança quebra algo no seu projeto, principalmente quando for uma versão MAJOR.

## Quando o componente ou token que você precisa não existe

Não crie uma versão isolada do componente para resolver o caso, mesmo que pareça mais rápido no momento. Fale com o time do Servi DS antes. Na maioria das vezes, uma tela que "precisa" de uma versão exclusiva de um componente é sinal de que falta um token ou uma variante no sistema, não uma exceção legítima do seu projeto.

## Problemas comuns

**Import quebrado depois da instalação.** Confira o alias declarado em `components.json` contra o import gravado nos arquivos instalados. Se o projeto não tem pasta `src` na raiz, a correção automática do script não se aplica e o ajuste precisa ser manual.

**Componente que parece faltar.** Confirme com o time do Servi DS se ele já existe antes de recriar algo parecido por conta própria.

**PR de atualização não abriu.** Confirme com o time do Servi DS se o repositório está mesmo cadastrado como consumidor. Sem esse cadastro, nenhuma atualização chega automaticamente, mesmo que o Servi DS tenha publicado algo novo.

## Onde continuar

Cada componente publicado tem sua própria página de documentação, com props, estados suportados e os tokens que ele usa. As páginas de tokens e a biblioteca de componentes completa vivem no Figma, nos dois arquivos de referência do Servi DS.
