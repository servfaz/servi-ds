# Servi DS

Design system da Servfaz. Registry shadcn publicado em ds.servfaz.app.

## Onde cada coisa vive

Componente: `registry/servfaz/<nome>.tsx`
Catálogo: `registry.json`
Token (CSS): `tokens/`
Documentação de componente e páginas de apoio: `content/docs/`
Regras completas, com o porquê de cada uma: projeto Claude "Servi DS"

## Nunca fazer

Valor bruto (hex, px) em componente ou token acima da camada primitiva. Token semântico referenciando outro semântico. Lógica condicional de tema dentro de um componente. Mais de um lockfile de pacote no repositório.

## Publicação

Push em `main` builda e publica o registry automaticamente, sem passo manual. Documentação de componente é gerada, nunca desenhada à mão no Figma. Regras completas de geração em `.claude/rules/documentacao-design.md`.