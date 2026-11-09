# Servi DS

Design system da Servfaz. Registry shadcn publicado em ds.servfaz.app.

## Onde cada coisa vive

Componente: `registry/servfaz/<nome>.tsx`
Catálogo: `registry.json`
Token (CSS): `tokens/`
Páginas de apoio e a página do Button: `content/docs/`
Site de documentação (Storybook): configuração em `.storybook/`, páginas, stories e peças do site em `storybook/`
Story de componente: `storybook/componentes/<nome>.stories.tsx`. A página de docs é a automática do Storybook (autodocs); só o Button tem página própria em `.mdx`
Regras completas, com o porquê de cada uma: projeto Claude "Servi DS"

## Nunca fazer

Valor bruto (hex, px) em componente ou token acima da camada primitiva. Token semântico referenciando outro semântico. Lógica condicional de tema dentro de um componente. Mais de um lockfile de pacote no repositório.

Item do registry que depende de componente não publicado. Quando um componente importa outro (`./popover`), o outro precisa estar no `registry.json` e declarado em `registryDependencies` com a URL completa (`https://ds.servfaz.app/r/<nome>.json`), nunca com nome puro. Pacote npm em `dependencies` sempre com a faixa de versão do `package.json` do Servi DS (`@tanstack/react-table@^8.21.3`), nunca sem versão. Bloco (`registry:block`) só chega a um consumidor que o liste em `blocos` no `automation/consumers.json`. Componente novo ou alterado: rodar `npm run validar-registry` antes do commit. O mesmo script roda no build da Vercel e em toda PR, e barra a publicação se falhar.

## Publicação

Push em `main` builda e publica o registry e o Storybook automaticamente na Vercel, sem passo manual. O registry continua em `ds.servfaz.app/r/<nome>.json`. Quando o deploy de produção termina com sucesso, o workflow "Propagar Servi DS para consumidores" roda sozinho e abre PR ou MR em cada sistema cadastrado; nunca dispará-lo no push, que leria o registry anterior. Documentação de componente é gerada, nunca desenhada à mão no Figma. Regras completas de geração em `.claude/rules/documentacao-design.md`.

Nunca adicione Co-Authored-By nem qualquer atribuição ao Claude em commits e PRs.