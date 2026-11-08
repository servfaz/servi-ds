---
title: Desenvolvedores
description: Como instalar o Servi DS em um projeto e receber as atualizações.
---

```callout
variant: danger
title: Uso exclusivo
body: O Servi DS é de uso exclusivo dos sistemas da Servfaz. Não pode ser usado em projetos externos ou de terceiros.
```

## Antes de começar

O projeto precisa ter:

```icon-cards columns=4
- icon: node
  title: Node.js
  description: Versão LTS.
- icon: next
  title: Next.js
  description: Com App Router.
- icon: tailwind
  title: Tailwind CSS
  description: Já configurado.
- icon: shadcn
  title: shadcn/ui
  description: Inicializado no projeto.
```

Se o shadcn/ui ainda não foi inicializado:

```bash
npx shadcn@latest init
```

## Instalação

Escolha como trazer os componentes para o projeto.

```icon-cards columns=2
- icon: cadastro
  title: Cadastro como consumidor
  badge: Recomendado
  description: Instala tudo e mantém o projeto atualizado por Pull Request.
  href: "#cadastro-como-consumidor"
- icon: terminal
  title: Instalação manual
  description: Instala o catálogo agora, antes do cadastro. Não traz atualizações.
  href: "#instalacao-manual"
```

### Cadastro como consumidor

Peça ao time do Servi DS o cadastro do repositório. Depois disso, tudo chega por Pull Request:

```flow
- icon: cadastro
  title: Cadastro
  description: O time adiciona o seu repositório.
- icon: pr
  title: Primeira PR
  description: Traz todos os componentes publicados.
- icon: publicar
  title: Novas publicações
  description: Cada mudança vira uma PR, sempre na mesma branch.
- icon: check
  title: Você aprova
  description: Revise e faça o merge.
```

```callout
variant: info
title: Repositório no GitLab
body: O cadastro vale para GitHub e GitLab. No GitLab, cada atualização chega como Merge Request, no mesmo fluxo.
```

```callout
variant: warning
title: Componentes customizados
body: Componentes shadcn/ui alterados à mão são substituídos na primeira PR. Reaplique a customização ou peça um token ou uma variante ao time.
```

### Instalação manual

```steps
- title: Baixe o script
  body: "Pegue o [script de instalação](https://github.com/servfaz/servi-ds/blob/main/templates/instalar-servi-ds.sh) no repositório do Servi DS."
- title: Rode na raiz do projeto
  body: "Precisa de `curl`, `jq`, `node`/`npx` e `sed`. O script instala todo o catálogo publicado."
  code: sh instalar-servi-ds.sh
  language: bash
- title: Confira os imports
  body: "Se o alias em `components.json` for diferente do padrão, revise os imports dos arquivos instalados. O script corrige isso sozinho só em projetos com pasta `src`."
```

Para instalar um componente só, troque `button` pelo nome dele:

```bash
npx shadcn@latest add https://ds.servfaz.app/r/button.json
```

## Regras de uso

```icon-cards columns=2
- icon: tema
  title: Tema claro e escuro
  description: "Os tokens já resolvem os dois modos. Basta alternar a classe `.dark`, por exemplo com `next-themes`."
- icon: icones
  title: Só Phosphor Icons
  description: "Instale `@phosphor-icons/react`. Outras bibliotecas e SVG solto não são compatíveis."
- icon: tokens
  title: Sempre token
  description: "Nada de hex, px ou rgb soltos. Use `var(--nome-do-token)`."
- icon: ajuda
  title: Faltou algo?
  description: Fale com o time do Servi DS antes de criar uma versão própria de componente, variante ou token.
```

Exemplo com ícone e token:

```tsx
import { CheckCircleIcon } from "@phosphor-icons/react"

export function Confirmacao() {
  return (
    <p className="flex items-center gap-2 text-[var(--color-brand-foreground-default)]">
      <CheckCircleIcon weight="duotone" />
      Tudo certo
    </p>
  )
}
```

## Atualizações

As mudanças viram uma release mensal no GitHub e chegam ao seu projeto pela PR automática.

```callout
variant: tip
title: Antes de aprovar a PR
body: Confira as notas da versão, principalmente em versão MAJOR. Se a PR não abriu, confirme com o time se o repositório está cadastrado.
```

## Documentação para IA

Entregue ao assistente a versão em markdown em vez do link da página.

```icon-cards columns=3
- icon: arquivo
  title: Uma página
  description: "Use **Abrir Markdown** no menu do topo da página."
- icon: lista
  title: Índice
  description: Todas as páginas, com o link em markdown de cada uma.
  href: https://ds.servfaz.app/llms.txt
- icon: livro
  title: Tudo em um arquivo
  description: A documentação inteira, para usar como contexto fixo.
  href: https://ds.servfaz.app/llms-full.txt
```
