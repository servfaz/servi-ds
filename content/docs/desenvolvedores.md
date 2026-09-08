---
title: Começando um projeto novo com o Servi DS
description: Guia para devs que estão configurando um produto novo (ou um repositório novo) para consumir o Servi DS pela primeira vez.
---

Este guia cobre o caminho do zero: projeto sem nenhum componente instalado até um projeto com os tokens carregados, o primeiro componente instalado e o tema (light/dark) funcionando. Não repete as regras de arquitetura de tokens (ver `arquitetura-e-regras-de-design-tokens`) nem a lista de componentes disponíveis, o foco aqui é só o passo a passo de configuração.

## Pré-requisitos

- Node.js na versão LTS atual.
- Projeto com Next.js (App Router) e Tailwind CSS já configurados. Os produtos Servfaz de hoje (`dossie-front`, `faturamento_front`, `servauth_frontend`) seguem esse padrão, então é o caminho recomendado para um projeto novo.
- Acesso de leitura ao registry do Servi DS (`ds.servfaz.app`).

Se o projeto novo não usa Next.js, os passos abaixo ainda se aplicam na mesma ordem, só muda o comando de criação do projeto no Passo 1.

## Passo 1: criar o projeto

Se o repositório ainda não existe:

```bash
npx create-next-app@latest nome-do-projeto --typescript --tailwind --app
```

Se o repositório já existe e só falta configurar o design system, pule para o Passo 2.

## Passo 2: inicializar o shadcn/ui no projeto

O Servi DS é publicado como um registry compatível com a CLI do shadcn/ui (ver `resumo-shadcn-registry`). O primeiro passo em qualquer projeto novo é inicializar essa CLI, que cria o arquivo `components.json` com os aliases de import (`@/components`, `@/lib`, `@/hooks` etc.) e o estilo base:

```bash
npx shadcn@latest init
```

Esse comando pergunta o estilo, a cor base e os aliases. Manter os aliases padrão (`@components`, `@ui`, `@lib`, `@hooks`) evita divergência entre os produtos.

## Passo 3: carregar os tokens do Servi DS

Antes de instalar qualquer componente, o projeto precisa ter as variáveis CSS das camadas Primitiva e Semântica disponíveis (ver `arquitetura-e-regras-de-design-tokens`, seção 2). É essa camada que resolve light e dark mode.

> **Pendência a confirmar com o time de design:** este guia assume que existe (ou vai existir) um item do tipo `registry:base` ou `registry:theme` no registry do Servi DS que instala de uma vez as variáveis das camadas Primitiva e Semântica, por exemplo `npx shadcn@latest add https://ds.servfaz.app/r/theme.json`. Se esse item ainda não existe, o passo real hoje é confirmar com o time se os tokens chegam via `registryDependencies` de cada componente instalado individualmente, ou se precisam ser copiados manualmente. Assim que a resposta estiver confirmada, este passo deve ser reescrito com o comando exato e essa nota removida.

## Passo 4: instalar um componente

Cada componente do Servi DS é instalado pela URL do item, direto do registry:

```bash
npx shadcn@latest add https://ds.servfaz.app/r/button.json
```

Troque `button` pelo nome do componente. Esse é o mesmo comando que aparece na seção de instalação da página de cada componente em `ds.servfaz.app/docs`, então o caminho mais confiável para pegar o comando certo é abrir a página do componente e copiar de lá, em vez de adivinhar o nome.

O comando já resolve sozinho as dependências de pacote (`dependencies`) e de outros itens do registry (`registryDependencies`) que esse componente precisar, incluindo tokens de componente específicos dele.

Repita para cada componente que o projeto for usar. Os mais usados hoje nos produtos Servfaz são button, badge, input, card, skeleton, dialog e label (ver `levantamento-uso-componentes-frontend`), bons candidatos a instalar já nas primeiras telas.

## Passo 5: configurar a alternância de tema (light/dark)

O Servi DS resolve dark mode inteiramente na camada semântica dos tokens (nenhuma lógica condicional dentro do componente). O que falta, do lado do projeto consumidor, é o mecanismo que aplica a classe ou atributo de tema na raiz da página e permite ao usuário alternar entre os modos.

> **Pendência a confirmar com o time de design:** confirmar se o Servi DS publica um componente ou provider padrão para isso (por exemplo um `theme-provider` no registry, construído sobre `next-themes`), ou se cada produto implementa esse provider por conta própria hoje. Se não existir um item padrão no registry, vale considerar publicar um, para que a alternância de tema não seja reimplementada de forma diferente em cada repositório.

## Passo 6: ícones

Todo ícone usado no projeto vem da biblioteca Phosphor Icons, pelo nome oficial do ícone nessa biblioteca (ver `design-doc`, Regra 5). Nenhum outro pacote de ícone é usado em conjunto com componentes do Servi DS.

> **Pendência a confirmar com o time de design:** qual pacote npm exato do Phosphor é o padrão adotado (`@phosphor-icons/react` ou outra variante), para que este guia traga o comando de instalação certo em vez de um nome genérico.

## Boas práticas ao integrar o Servi DS num projeto novo

Antes de escrever qualquer CSS ou componente próprio no projeto novo, vale confirmar:

- **O componente já existe no Servi DS?** Se existir, instalar pelo registry em vez de recriar. Um componente "parecido, mas construído do zero" no projeto é exatamente o tipo de cópia paralela que o Servi DS existe para eliminar.
- **O valor visual que a tela precisa já é um token?** Cor, espaçamento, raio, sombra, tudo isso deve vir de `var(--nome-do-token)`, nunca de um valor bruto digitado direto no CSS ou no componente (ver `arquitetura-e-regras-de-design-tokens`, R1).
- **O componente ou token realmente não existe?** Se depois de checar a biblioteca em `ds.servfaz.app/docs` e as coleções do Figma Variables o componente ou o token não existir, o caminho correto é sinalizar isso ao time de design para que nasça dentro do Servi DS, nunca criar uma versão isolada só para aquele projeto. Variável ou componente encontrado fora dos dois arquivos Figma oficiais (Variables e Components) é sempre considerado pendência de migração, nunca uma alternativa válida.

## Onde continuar

A partir daqui, a página de cada componente em `ds.servfaz.app/docs/componentes/<nome>` traz a lista completa de props, estados suportados, tokens consumidos e dependências. Toda página do site tem uma ação de copiar o conteúdo inteiro como markdown, útil para colar direto num prompt ou numa outra ferramenta.

## Pendências deste guia

As três notas marcadas acima ao longo do texto, reunidas num só lugar para facilitar o acompanhamento:

1. Confirmar se existe (ou definir) um item `registry:base`/`registry:theme` que instala as camadas Primitiva e Semântica de uma vez, e qual é a URL exata desse item.
2. Confirmar se existe um provider padrão de tema (light/dark) publicado no registry, ou se cada produto resolve isso por conta própria hoje.
3. Confirmar o nome exato do pacote Phosphor Icons adotado como padrão.

Este guia deve ser atualizado assim que essas três respostas estiverem confirmadas, substituindo cada nota pelo comando ou informação real, nunca um valor supondo o que provavelmente seria (ver `design-doc`, Regra 3).
