---
title: Começando um projeto novo com o Servi DS
description: Guia para times de desenvolvimento que estão configurando um produto novo (ou um repositório novo) para consumir o Servi DS pela primeira vez.
---

## O que é o Servi DS

O Servi DS é o design system da Servfaz: a biblioteca shadcn/ui restilizada com os tokens visuais da empresa (cor, espaçamento, tipografia, ícones), publicada como um registry próprio e instalada pela CLI do shadcn/ui, apontada para `ds.servfaz.app`. O objetivo é ser a fonte única de padrões visuais e de interação de todos os produtos da empresa, usada desde o primeiro dia de qualquer projeto novo.

Isso traz consistência entre produtos, mais velocidade (componente pronto em vez de recriado), acessibilidade já validada em WCAG 2.1 AA e manutenção centralizada: corrigir um componente ou token num lugar atualiza todos os produtos que o usam.

## Pré-requisitos

- Node.js na versão LTS.
- Projeto com Next.js (App Router) e Tailwind CSS.
- Acesso ao registry (`ds.servfaz.app`).

## Passo 1: criar o projeto

Se o projeto ainda não existe, crie com:

```bash
npx create-next-app@latest nome-do-projeto --typescript --tailwind --app
```

Se já existe, vá direto para o Passo 2.

## Passo 2: iniciar o shadcn/ui

Rode:

```bash
npx shadcn@latest init
```

Esse comando prepara o projeto para receber componentes do Servi DS. Ele pergunta o estilo, a cor base e os aliases, e altera o projeto em três pontos:

- cria o arquivo `components.json`, com a configuração usada por todos os comandos seguintes;
- cria o arquivo `lib/utils.ts`, com uma função auxiliar usada pelos componentes;
- adiciona ao seu CSS global (`app/globals.css`) a estrutura base de variáveis CSS, que os tokens do Servi DS vão preencher a partir do próximo passo.

Mantenha os aliases padrão (`@components`, `@ui`, `@lib`, `@hooks`) para não divergir dos outros produtos.

## Passo 3: do cadastro à PR, o fluxo completo

Depois do cadastro, o time consumidor faz o mínimo possível: revisar e aprovar uma Pull Request quando ela chega. Nenhum comando de instalação é responsabilidade do dev a partir daqui, nem no primeiro dia nem depois. É uma corrente com seis elos, e só um deles é manual:

1. Alguém do projeto pede o cadastro. Peça ao time do Servi DS para cadastrar o repositório do projeto na lista de consumidores.
2. O time do Servi DS cadastra o repositório nessa lista.
3. O cadastro dispara o robô do Servi DS sozinho, sem ninguém rodar comando nenhum.
4. O robô instala tudo no repositório do projeto: todos os componentes já publicados, com os tokens (cor, espaçamento, tipografia) inclusos, e corrige o alias de import do projeto quando necessário.
5. O robô abre uma Pull Request no repositório do projeto, com esse resultado.
6. Alguém do time do projeto revisa e aprova essa PR. Esse é o único passo manual recorrente de toda a corrente, de propósito, para sempre ter alguém olhando antes do código entrar.

Se o projeto já tinha algum componente shadcn/ui customizado à mão, essa primeira PR substitui esse componente pela versão do Servi DS, e a customização se perde. Vale reaplicar a customização por cima ou pedir um token ou variante nova para o Servi DS, em vez de perder silenciosamente o que já existia.

Depois dessa primeira vez, toda nova mudança publicada no Servi DS (componente ou token) repete os elos 3 a 6 sozinha, gerando uma nova PR. A descrição da PR hoje não traz automaticamente o que precisa mudar no código do projeto quando a mudança quebra algo em uso: antes de aprovar, conferir a entrada correspondente no `CHANGELOG.md` do Servi DS, principalmente quando for uma versão MAJOR.

### Atalho: instalar sem esperar o cadastro

Quer o resultado do elo 4 sem esperar o cadastro? O Servi DS também disponibiliza um script (`templates/instalar-servi-ds.sh`, neste repositório) que roda essa mesma instalação localmente, de uma vez. Copie o arquivo para a raiz do projeto consumidor e rode a partir de lá, já com `components.json` criado.

Depois de rodá-lo, siga com o elo 1 do mesmo jeito, para continuar recebendo as próximas atualizações pela PR automática.

## Problemas comuns

**Import quebrado.** A instalação grava `@/app/lib/utils` por padrão. Se o alias do projeto for outro, o ajuste automático tenta corrigir, mas só funciona em projetos com pasta `src/` na raiz, e mesmo assim não cobre todo caso. Se algum arquivo ficar com import quebrado, troque pelo alias real do projeto (`aliases.utils` ou `aliases.lib` em `components.json`).

**Componente que ainda não existe no Servi DS.** Confirme com o time do Servi DS se já está no roadmap antes de construir uma versão própria.

## Passo 4: tema claro e escuro

Os tokens já têm valor para os dois modos. Falta só o mecanismo que alterna entre eles, por exemplo com `next-themes`, trocando a classe `dark` na página.

## Passo 5: ícones

Use sempre a biblioteca [Phosphor Icons](https://phosphoricons.com/).

```bash
npm install @phosphor-icons/react
```

## Boas práticas

Antes de criar CSS ou componente próprio, confirme três coisas:

- **O componente já existe no Servi DS?** Se sim, ele já chega pela PR automática. Não recrie por conta própria.
- **O valor já é um token?** Cor, espaço, raio, sombra: sempre `var(--nome-do-token)`, nunca um valor solto.
- **Não existe mesmo?** Avise o time de design antes de criar algo isolado. Nada nasce fora do Figma oficial.

## Onde continuar

Cada componente tem sua própria página em `ds.servfaz.app/docs/componentes/<nome>`, com props, estados e tokens. Toda página tem um botão para copiar o conteúdo como markdown.
