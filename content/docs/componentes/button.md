---
title: Button
name: button
description: Botão com a identidade visual da Servfaz.
updated: "2026-11-08"
---

# Documentação

## Instalação

```bash
npx shadcn@latest add https://ds.servfaz.app/r/button.json
```

O comando instala junto:

- Pacotes: `@radix-ui/react-slot`, `class-variance-authority`
- Registry: [`tokens`](https://ds.servfaz.app/r/tokens.json), com as camadas Primitiva e Semântica de tokens

## Uso

O Button renderiza um `<button>` nativo e aceita todas as props dele. Use os controles abaixo do exemplo para testar variante, tamanho e estado desabilitado.

```tsx demo=Playground controls
import { Button } from "@/components/ui/button"

export function Demo() {
  return <Button>Button</Button>
}
```

## Variantes

A prop `variant` define o estilo visual. O padrão é `default`.

- `default`: fundo na cor principal da marca, com tokens de componente próprios.
- `secondary`: fundo na cor secundária da marca, com tokens de componente próprios.
- `destructive`: fundo na cor `destructive` do tema.
- `outline`: fundo do tema com borda.
- `ghost`: sem fundo até o hover.
- `link`: aparência de link, com sublinhado no hover.

```tsx demo=Variantes
import { Button } from "@/components/ui/button"

export function Demo() {
  return (
    <>
      <Button variant="default">default</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="destructive">destructive</Button>
      <Button variant="outline">outline</Button>
      <Button variant="ghost">ghost</Button>
      <Button variant="link">link</Button>
    </>
  )
}
```

## Tamanhos

A prop `size` aceita `sm`, `default` e `lg`. O tamanho `icon` gera um botão quadrado para conter só um ícone. Nesse caso, passe `aria-label` para que leitores de tela anunciem a ação.

```tsx demo=Tamanhos
import { PlusIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

export function Demo() {
  return (
    <>
      <Button size="sm">sm</Button>
      <Button size="default">default</Button>
      <Button size="lg">lg</Button>
      <Button size="icon" aria-label="Adicionar">
        <PlusIcon />
      </Button>
    </>
  )
}
```

## Com ícone

Ícones Phosphor entram como filhos, antes ou depois do texto. O Button aplica o tamanho padrão de ícone (classe `size-4`) quando o ícone não define um tamanho próprio, e reduz o espaçamento horizontal quando há ícone.

```tsx demo=ComIcone
import { ArrowRightIcon, PlusIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

export function Demo() {
  return (
    <>
      <Button>
        <PlusIcon />
        Novo pedido
      </Button>
      <Button variant="secondary">
        Continuar
        <ArrowRightIcon />
      </Button>
    </>
  )
}
```

## Desabilitado

Com `disabled`, o botão deixa de receber clique e foco. Nas variantes `default` e `secondary`, o fundo e o texto passam para os tokens de desabilitado. Nas demais, o botão fica com opacidade reduzida.

```tsx demo=Desabilitado
import { Button } from "@/components/ui/button"

export function Demo() {
  return (
    <>
      <Button variant="default" disabled>default</Button>
      <Button variant="secondary" disabled>secondary</Button>
      <Button variant="destructive" disabled>destructive</Button>
      <Button variant="outline" disabled>outline</Button>
      <Button variant="ghost" disabled>ghost</Button>
      <Button variant="link" disabled>link</Button>
    </>
  )
}
```

## Como link (asChild)

Com `asChild`, o Button não renderiza o próprio `<button>`. Ele repassa os estilos e as props para o elemento filho, usando o `Slot` do Radix. Use para links de navegação com aparência de botão.

```tsx demo=ComoLink
import { Button } from "@/components/ui/button"

export function Demo() {
  return (
    <Button asChild>
      <a href="/pedidos">Ver pedidos</a>
    </Button>
  )
}
```

Para aplicar os estilos do botão em um componente que não aceita filhos dessa forma, use a função `buttonVariants`, descrita na aba Props.

## Estados

| Estado | Como acontece | Token de componente |
| --- | --- | --- |
| Default | Estado inicial | `default` e `secondary` |
| Hover | Ponteiro sobre o botão (`:hover`) | `default` e `secondary` |
| Pressed | Botão sendo pressionado (`:active`) | `default` e `secondary` |
| Focus | Foco por teclado (`:focus-visible`) | `default` e `secondary` |
| Disabled | Prop `disabled` | `default` e `secondary` |
| Inválido | Prop `aria-invalid` | Nenhum, usa a cor `destructive` do tema |

## Acessibilidade

- O Button renderiza um `<button>` nativo, então foco por teclado e acionamento por Enter e Espaço funcionam sem configuração extra.
- Dentro de um `<form>`, o `type` padrão do HTML é `submit`. Passe `type="button"` quando o botão não deve enviar o formulário.
- Botão só com ícone (`size="icon"`) precisa de `aria-label`.
- O anel de foco aparece só na navegação por teclado (`:focus-visible`).
- Com `asChild`, o elemento filho precisa ser interativo por natureza, como `<a href>`, para manter foco e acionamento por teclado.

## Changelog

| Versão | Data | Categoria | Item | Descrição |
| --- | --- | --- | --- | --- |
| 0.2.0 | 03/09/2026 | Corrigido | `Button` | `registryDependencies` apontava para o nome puro `tokens`, que colide com um item oficial de mesmo nome no registry padrão do shadcn; o CLI resolvia a dependência errada quando o consumidor não tinha namespace `servfaz` configurado. Trocado para a URL completa `https://ds.servfaz.app/r/tokens.json`. |
| 0.2.0 | 03/09/2026 | Corrigido | `Button` | Variantes `default` e `secondary` ficavam sem cor no consumidor porque `registry.json` não publicava os tokens que o Button referencia via `var(--button-*)`. Adicionado item `tokens` (`registry:theme`) com os `cssVars` das camadas Primitiva e Semântica (light/dark), e `cssVars` da camada Componente mais `registryDependencies: ["tokens"]` ao próprio item `button`. |
| 0.2.0 | 01/09/2026 | Adicionado | `Button` | Item `button` publicado em `registry.json`, com `dependencies` (`@radix-ui/react-slot`, `class-variance-authority`) e arquivo `registry/servfaz/button.tsx`. |
| 0.2.0 | 27/08/2026 | Adicionado | `Button` | Variantes `default` e `secondary` passam a usar tokens de componente (`--button-container-color-*`, `--button-content-color-*`, `--button-border-color-*`) em vez das classes genéricas do shadcn/ui; criada a camada de Componente de tokens (`tokens/tokens-component.css`). |

# Props

## Button

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `variant` | `"default"` \| `"secondary"` \| `"destructive"` \| `"outline"` \| `"ghost"` \| `"link"` | `"default"` | Estilo visual do botão. |
| `size` | `"default"` \| `"sm"` \| `"lg"` \| `"icon"` | `"default"` | Tamanho. `icon` gera um botão quadrado para conter só um ícone. |
| `asChild` | `boolean` | `false` | Repassa estilos e props para o elemento filho em vez de renderizar um `<button>`. |
| `className` | `string` | | Classes extras, mescladas às classes da variante. |

Todas as props nativas de `<button>` também são aceitas (`React.ComponentProps<"button">`), como `type`, `disabled`, `onClick` e `aria-label`.

## buttonVariants

Além do componente, o arquivo exporta `buttonVariants`, a função que gera as classes do botão. Recebe `variant`, `size` e `className`, com os mesmos valores e padrões da tabela acima, e devolve uma string de classes.

```tsx
import { buttonVariants } from "@/components/ui/button"

export function Demo() {
  return (
    <a href="/pedidos" className={buttonVariants({ variant: "outline" })}>
      Ver pedidos
    </a>
  )
}
```

# Tokens

Pontos onde o visual do Button pode ser lido ou ajustado sem mexer no código do componente: seletor, atributos de estado e tokens de componente.

## Seletor

| Seletor | Elemento |
| --- | --- |
| `[data-slot="button"]` | Elemento raiz: o `<button>` ou, com `asChild`, o elemento filho |

## Atributos de estado

| Atributo | Quando aparece | Efeito |
| --- | --- | --- |
| `disabled` | Prop `disabled` | Tokens de desabilitado em `default` e `secondary`; opacidade reduzida nas demais variantes |
| `aria-invalid` | Prop `aria-invalid="true"` | Borda e anel de foco na cor `destructive` do tema |

## Tokens de componente

Camada Component dos tokens. Cada token referencia um token da camada Semântica, onde o tema claro e o escuro já estão resolvidos.

| Token | Referência | Uso |
| --- | --- | --- |
| `--button-container-color-primary-default` | `--color-background-brand-bold` | Fundo, `default` |
| `--button-container-color-primary-hover` | `--color-background-brand-bold-hover` | Fundo, `default`, hover |
| `--button-container-color-primary-pressed` | `--color-background-brand-bold-pressed` | Fundo, `default`, pressed |
| `--button-container-color-secondary-default` | `--color-background-brand-secondary-bold` | Fundo, `secondary` |
| `--button-container-color-secondary-hover` | `--color-background-brand-secondary-bold-hover` | Fundo, `secondary`, hover |
| `--button-container-color-secondary-pressed` | `--color-background-brand-secondary-bold-pressed` | Fundo, `secondary`, pressed |
| `--button-container-color-disabled` | `--color-background-disabled` | Fundo, desabilitado |
| `--button-content-color-primary` | `--color-text-on-brand` | Texto e ícone, `default` |
| `--button-content-color-secondary-default` | `--color-text-on-brand-secondary` | Texto e ícone, `secondary` |
| `--button-content-color-disabled` | `--color-text-disabled` | Texto e ícone, desabilitado |
| `--button-border-color-primary-focus` | `--color-border-brand-default` | Anel de foco, `default` |
| `--button-border-color-secondary-focus` | `--color-border-brand-secondary-default` | Anel de foco, `secondary` |
