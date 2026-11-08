---
title: Sobre o Servi DS
description: O que é o design system da Servfaz e como ele funciona, do Figma até os produtos.
---

O Servi DS é o design system da Servfaz. Ele reúne em um só lugar o que os produtos da empresa usam para ter a mesma cara e o mesmo comportamento.

## O que ele reúne

```icon-cards columns=3
- icon: tokens
  title: Tokens
  description: Cores, tipografia, espaçamentos e raios, cada um com um nome.
- icon: componente
  title: Componentes
  description: Peças de interface prontas, com estados e tema claro e escuro.
- icon: camadas
  title: Padrões
  description: Telas e estruturas montadas com os componentes, como o App Shell.
```

## Como funciona

### Do Figma ao produto

Tudo nasce no Figma e chega aos produtos sem retrabalho manual.

```flow
- icon: figma
  title: Figma
  description: Tokens e componentes são desenhados nos arquivos oficiais.
- icon: codigo
  title: Código
  description: Viram componentes React, com os mesmos nomes do Figma.
- icon: publicar
  title: Publicação
  description: Cada mudança aprovada vai ao ar sozinha, junto com esta documentação.
- icon: produto
  title: Produtos
  description: Os sistemas da Servfaz recebem a atualização por Pull Request.
```

```callout
variant: info
title: Fonte única
body: "Tokens e componentes só existem em dois arquivos do Figma: [Variables](https://www.figma.com/design/FJY9bl17wrv2Qy6faoib66/-SF-DS--Variables) e [Components](https://www.figma.com/design/ipQKV07jFEBsLxIv5tt1qI/-SF-DS--Components). O que nasce fora deles é migrado para lá."
```

### Tokens em três camadas

Cada token aponta só para a camada de baixo.

```flow
- icon: tokens
  title: Primitivo
  description: "A paleta e as escalas. Ex.: um tom de verde."
- icon: tema
  title: Semântico
  description: "O significado: fundo, texto, marca. Resolve o claro e o escuro."
- icon: componente
  title: Componente
  description: "Onde o token é aplicado. Ex.: o fundo do botão."
```

```callout
variant: tip
title: Por que em camadas
body: Ao trocar um primitivo, todos os tokens e componentes que dependem dele mudam juntos. O componente nunca carrega um valor solto.
```

## Por que usar

```icon-cards columns=2
- icon: componente
  title: Consistência
  description: Uma decisão tomada uma vez vale para todos os produtos.
- icon: velocidade
  title: Velocidade
  description: Os times usam peças prontas em vez de desenhar e codificar de novo.
- icon: acessibilidade
  title: Acessibilidade
  description: Todo par de cor já nasce validado no padrão WCAG 2.1 AA.
- icon: sincronizar
  title: Manutenção central
  description: Corrigiu no Servi DS, corrigiu em todos os produtos.
```

## Por onde começar

```icon-cards columns=2
- icon: figma
  title: Design
  description: Use a biblioteca oficial no Figma.
  href: https://www.figma.com/design/ipQKV07jFEBsLxIv5tt1qI/-SF-DS--Components
- icon: terminal
  title: Desenvolvimento
  description: Instale o Servi DS no seu projeto.
  href: /docs/desenvolvedores
```
