---
title: Servi DS
updated: "2026-09-03"
---

O Servi DS é o design system da Servfaz. Reúne, em um único lugar, as decisões visuais e de interação que os produtos da empresa usam: cores, espaçamentos, tipografia, ícones e os componentes de interface prontos para consumo.

## As partes do sistema de design

O Servi DS tem duas partes, com fonte única cada uma:

```card-grid
- title: Design tokens
  href: "https://www.figma.com/design/FJY9bl17wrv2Qy6faoib66/-SF-DS--Variables?node-id=2004-602&t=OzRX4u7mSzVEce3Y-1"
  description: "Valores de design organizados em três camadas (Primitiva, Semântica e de Componente), detalhados em arquitetura-e-regras-de-design-tokens.md."
- title: Biblioteca de componentes
  href: "https://www.figma.com/design/ipQKV07jFEBsLxIv5tt1qI/-SF-DS--Components?node-id=2004-602&t=OhPikNWzHu2LaE8I-1"
  description: "Componentes de interface prontos, construídos sobre a base do shadcn/ui e adaptados aos tokens da Servfaz. Publicados como código através de um registry, consumido pelos produtos via ds.servfaz.app."
```

> Nenhuma variável ou componente novo nasce fora desses dois arquivos. O que for encontrado fora deles é migrado para lá, e a versão paralela é descontinuada.

## Benefícios do uso

- **Consistência entre produtos.** Uma decisão de design tomada uma vez no Servi DS se propaga para todos os produtos que o consomem, sem retrabalho manual em cada tela.
- **Velocidade.** Times de produto instalam componentes prontos em vez de desenhar e codificar os mesmos padrões de novo a cada projeto.
- **Acessibilidade garantida por padrão.** Todo par de cor do sistema de tokens já nasce validado contra WCAG 2.1 AA. Um time que usa o Servi DS corretamente não precisa reconferir contraste manualmente.
- **Manutenção centralizada.** Corrigir ou evoluir um componente ou token em um lugar atualiza automaticamente todos os produtos que o consomem, em vez de exigir correção repetida em cada repositório.
- **Vocabulário comum.** Design e engenharia falam da mesma interface com os mesmos nomes (tokens, componentes, variantes), o que reduz ambiguidade na passagem de design para código.

## Visão

Ser a fonte única de padrões visuais e de interação de todos os produtos da Servfaz, usada por padrão desde o primeiro dia de qualquer novo produto ou feature, sem a necessidade de recriar, adaptar ou aprovar variações informais de componentes básicos.

## Valores

- **Fonte única de verdade.** Cada decisão de design existe em um único lugar. Cópia paralela é sempre um erro a corrigir, nunca uma alternativa aceitável.
- **Acessibilidade não é opcional.** WCAG 2.1 AA é piso mínimo, validado no momento em que o token nasce, não auditado depois que componentes já o usam.
- **Simplicidade sobre flexibilidade irrestrita.** Vocabulário fechado (nomes de estado, de ênfase, de feedback) é preferível a permitir qualquer variação ad-hoc que pareça resolver um caso pontual.
- **Transparência entre design e código.** O que está desenhado no Figma é o que existe em código, e vice-versa. Divergência entre os dois é tratada como bug do sistema.
- **Consistência antes de customização.** Uma tela que "precisa" de uma versão exclusiva de um componente é, na maioria dos casos, sinal de um token ou variante faltando no sistema, não uma exceção legítima.

## Princípios

1. **Token é decisão nomeada, nunca valor solto.** Nenhum componente contém um valor bruto (hexadecimal, pixel, espaçamento fixo). Se um componente precisa de um valor que nenhum token cobre, a resposta é criar o token.
2. **A camada certa, sempre.** Componente referencia semântico, semântico referencia primitivo. Nenhuma camada pula a outra, e nenhuma quarta camada informal é criada "só para esse caso".
3. **Nome é contrato.** Renomear um token ou componente já em uso tem custo real. O nome precisa estar certo antes de entrar em uso, não depois.
4. **Dark mode se resolve na camada semântica.** Nunca no primitivo, nunca com lógica condicional dentro do componente.
5. **Documentação é gerada, não desenhada à mão.** A documentação de um componente nasce dos mesmos dados publicados no registry e do código fonte real, não de uma tela desenhada separadamente.
6. **Toda mudança propaga, nenhuma se isola.** Um componente ou token corrigido no Servi DS chega a todos os produtos consumidores pelo mesmo fluxo de publicação, sem exceção caso a caso.
