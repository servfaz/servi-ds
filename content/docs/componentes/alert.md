---
title: Alert
description: Alerta com a identidade visual da Servfaz, variante de aviso.
updated: "2026-09-08"
---

## Instalação

```bash
npx shadcn@latest add https://ds.servfaz.app/r/alert.json
```

## Props

| Nome | Valores aceitos | Obrigatório |
| --- | --- | --- |
| `variant` | `warning` | Não (padrão: `warning`) |
| ...demais props nativas de `<div>` | — | Não |

## Estados suportados

- Default

> Alert não tem estados de interação (hover, pressed, focus, disabled): é um contêiner estático de aviso, não um controle. Estados adicionais entram só se uma variante interativa for adicionada no futuro.

## Tokens usados

- `--alert-container-color-warning`
- `--alert-content-color-warning`
- `--alert-icon-color-warning`
- `--alert-border-color-warning`

## Dependências

- Pacotes: `class-variance-authority`
- Registry: [`tokens`](https://ds.servfaz.app/r/tokens.json)

## Status da identidade visual

Só a variante `warning` existe hoje. As demais categorias do vocabulário fechado de feedback (`information`, `success`, `danger`, `discovery`) ainda não têm token semântico nem variante correspondente; entram quando houver necessidade concreta, nunca antecipadas sem uso real.

## Changelog

| Versão | Data | Categoria | Item | Descrição |
| --- | --- | --- | --- | --- |
| Não lançado | 08/09/2026 | Adicionado | `Alert` | Item `alert` publicado em `registry.json`, com variante `warning`, arquivo `registry/servfaz/alert.tsx` e dependência `class-variance-authority`. <!-- nivel: MINOR --> |
