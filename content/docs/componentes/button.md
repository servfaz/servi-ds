---
title: Button
name: button
description: Botão com a identidade visual da Servfaz.
updated: "2026-11-20"
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

- `default`: cor principal da marca, com degradê no fundo e na borda. É a ação principal da tela.
- `secondary`: fundo neutro com borda, para ações de apoio.
- `destructive`: fundo na cor de perigo, para ações que excluem ou não têm volta.
- `outline`: fundo da superfície com borda; ganha fundo neutro no hover.
- `ghost`: sem fundo e com texto na cor da marca; ganha fundo suave da marca no hover.
- `link`: sem fundo e com texto na cor da marca, que escurece no hover.

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

A prop `size` aceita `xs`, `sm`, `default` e `lg`. Os tamanhos `icon-xs`, `icon-sm`, `icon` e `icon-lg` geram um botão quadrado para conter só um ícone, nas mesmas alturas. Nesse caso, passe `aria-label` para que leitores de tela anunciem a ação.

```tsx demo=Tamanhos
import { PlusIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

export function Demo() {
  return (
    <>
      <Button size="xs">xs</Button>
      <Button size="sm">sm</Button>
      <Button size="default">default</Button>
      <Button size="lg">lg</Button>
      <Button size="icon-xs" aria-label="Adicionar">
        <PlusIcon />
      </Button>
      <Button size="icon-sm" aria-label="Adicionar">
        <PlusIcon />
      </Button>
      <Button size="icon" aria-label="Adicionar">
        <PlusIcon />
      </Button>
      <Button size="icon-lg" aria-label="Adicionar">
        <PlusIcon />
      </Button>
    </>
  )
}
```

## Com ícone

Ícones Phosphor entram como filhos, antes ou depois do texto. O Button aplica o tamanho de ícone de cada tamanho de botão (`size-4` no padrão, `size-3` no `xs`) quando o ícone não define um tamanho próprio, e mantém um espaço fixo entre ícone e texto.

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

Com `disabled`, o botão deixa de receber clique e foco. Nas variantes com caixa (`default`, `secondary`, `destructive` e `outline`), fundo, borda e texto passam para os tokens neutros de desabilitado e a sombra some. Em `ghost` e `link`, só o texto muda.

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

| Estado | Como acontece |
| --- | --- |
| Default | Estado inicial |
| Hover | Ponteiro sobre o botão (`:hover`) |
| Pressed | Botão sendo pressionado (`:active`) |
| Focus | Foco por teclado (`:focus-visible`) |
| Disabled | Prop `disabled` |

# Props

## Button

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `variant` | `"default"` \| `"secondary"` \| `"destructive"` \| `"outline"` \| `"ghost"` \| `"link"` | `"default"` | Estilo visual do botão. |
| `size` | `"default"` \| `"xs"` \| `"sm"` \| `"lg"` \| `"icon"` \| `"icon-xs"` \| `"icon-sm"` \| `"icon-lg"` | `"default"` | Tamanho. Os tamanhos `icon*` geram um botão quadrado para conter só um ícone. |
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

Pontos onde o visual do Button pode ser lido ou ajustado sem mexer no código do componente: seletor, atributos e tokens semânticos que ele usa.

## Seletor

| Seletor | Elemento |
| --- | --- |
| `[data-slot="button"]` | Elemento raiz: o `<button>` ou, com `asChild`, o elemento filho |

## Atributos de estado

| Atributo | Quando aparece | Efeito |
| --- | --- | --- |
| `data-variant` | Sempre, com o valor da prop `variant` (padrão `default`) | Permite estilizar por variante a partir do seletor |
| `data-size` | Sempre, com o valor da prop `size` (padrão `default`) | Permite estilizar por tamanho a partir do seletor |
| `disabled` | Prop `disabled` | Tokens neutros de desabilitado nas variantes com caixa; só o texto muda em `ghost` e `link` |

## Tokens usados

O Button usa direto os tokens semânticos de cor, sem camada própria de componente. O tema claro e o escuro já vêm resolvidos neles.

| Token | Parte | Variante | Estado |
| --- | --- | --- | --- |
| `--color-brand-filled` | Fundo e borda (degradê), contorno | `default` | Repouso, hover |
| `--color-brand-filled-hover` | Fundo e borda (degradê) | `default` | Repouso, hover, pressed |
| `--color-brand-filled-pressed` | Fundo (degradê), contorno | `default` | Todos |
| `--color-brand-foreground-subtle` | Brilho da borda | `default` | Repouso |
| `--color-brand-foreground-on-filled` | Texto e ícone | `default` | Todos |
| `--color-background-default` | Fundo | `outline` | Repouso |
| `--color-background-default` | Espaço entre botão e anel de foco | `default` | Focus |
| `--color-border-default` | Borda | `outline`, `secondary` | Repouso, hover, pressed |
| `--color-foreground-emphasis` | Texto e ícone | `outline`, `secondary` | Repouso, hover, pressed |
| `--color-palette-olive-light` | Fundo | `outline` | Hover |
| `--color-palette-olive-light-pressed` | Fundo | `outline` | Pressed |
| `--color-palette-olive-subtle` | Fundo | `secondary` | Repouso |
| `--color-palette-olive-subtle-hover` | Fundo | `secondary` | Hover |
| `--color-palette-olive-subtle-pressed` | Fundo | `secondary` | Pressed |
| `--color-brand-subtle` | Fundo | `ghost` | Hover |
| `--color-brand-subtle-pressed` | Fundo | `ghost` | Pressed |
| `--color-brand-foreground-default` | Texto e ícone | `ghost`, `link` | Repouso |
| `--color-brand-foreground-emphasis` | Texto e ícone | `link` | Hover, pressed |
| `--color-feedback-danger-filled` | Fundo | `destructive` | Repouso |
| `--color-feedback-danger-filled-hover` | Fundo | `destructive` | Hover |
| `--color-feedback-danger-filled-pressed` | Fundo | `destructive` | Pressed |
| `--color-feedback-danger-outline` | Borda | `destructive` | Repouso, hover, pressed |
| `--color-feedback-danger-foreground-on-filled` | Texto e ícone | `destructive` | Repouso, hover, pressed |
| `--color-brand-border-focus` | Anel de foco | Todas | Focus |
| `--color-brand-light-pressed` | Halo do anel de foco | `outline`, `secondary`, `destructive` | Focus |
| `--color-background-muted` | Fundo | `default`, `secondary`, `outline`, `destructive` | Disabled |
| `--color-border-muted` | Borda | `default`, `secondary`, `outline`, `destructive` | Disabled |
| `--color-foreground-subtle` | Texto e ícone | Todas | Disabled |
