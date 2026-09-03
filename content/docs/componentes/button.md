---
title: Button
description: Botao com a identidade visual da Servfaz.
updated: "2026-09-03"
---

## Instalação

```bash
npx shadcn@latest add https://ds.servfaz.app/r/button.json
```

## Props

| Nome | Valores aceitos | Obrigatório |
| --- | --- | --- |
| `variant` | `default` \| `destructive` \| `outline` \| `secondary` \| `ghost` \| `link` | Não (padrão: `default`) |
| `size` | `default` \| `sm` \| `lg` \| `icon` | Não (padrão: `default`) |
| `asChild` | `boolean` | Não (padrão: `false`) |
| ...demais props nativas de `<button>` | — | Não |

## Estados suportados

- Default
- Hover
- Pressed (`active`)
- Focus (`focus-visible`)
- Disabled

> Pressed e Focus têm token de componente dedicado (`--button-border-color-primary-focus`, `--button-border-color-secondary-focus`) só nas variantes `default` e `secondary`. As variantes `destructive`, `outline`, `ghost` e `link` ainda usam o comportamento padrão do Tailwind para esses estados, sem token de componente próprio.

## Tokens usados

- `--button-container-color-primary-default`
- `--button-container-color-primary-hover`
- `--button-container-color-primary-pressed`
- `--button-container-color-secondary-default`
- `--button-container-color-secondary-hover`
- `--button-container-color-secondary-pressed`
- `--button-container-color-disabled`
- `--button-content-color-primary`
- `--button-content-color-secondary-default`
- `--button-content-color-disabled`
- `--button-border-color-primary-focus`
- `--button-border-color-secondary-focus`

## Dependências

- Pacotes: `@radix-ui/react-slot`, `class-variance-authority`
- Registry: [`tokens`](https://ds.servfaz.app/r/tokens.json)

## Status da identidade visual

Ainda não totalmente restilizado. Duas lacunas conhecidas:

- `--color-background-disabled` e `--color-text-disabled` (usados no estado `disabled`) ainda são valor hexadecimal solto em `tokens-semantic.css`, light e dark, porque o primitivo de neutro correspondente ainda não existe no Figma.
- O contraste WCAG 2.1 AA dos pares de cor criados para o botão primário e secundário (fundo/texto, hover, pressed, disabled) ainda não foi validado e registrado formalmente.
