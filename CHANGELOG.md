# Changelog — Servi DS

> **Versão inicial: pendente de decisão.** Este registry ainda não tem um `REGISTRY_VERSION` definido. As entradas abaixo estão todas sob "Não lançado" até que a primeira versão seja decidida; quando isso acontecer, elas devem ser agrupadas sob o número de versão correspondente.

Histórico completo de mudanças do Servi DS (tokens e componentes publicados via registry), em ordem cronológica, mais recente primeiro dentro de cada versão.

Categorias fechadas: **Adicionado**, **Alterado**, **Depreciado**, **Removido**, **Corrigido**. Nível por entrada: **MAJOR** (quebra consumidor), **MINOR** (adição que não quebra nada), **PATCH** (correção sem mudança de contrato público).

Mudança de token que não afeta nenhum componente diretamente aparece só aqui, com `Tokens` (ou o nome da escala) na coluna Item. Mudança de componente aparece aqui e também na seção "Changelog" da página do componente em `content/docs/componentes/<nome>.md`.

## [Não lançado]

| Data | Categoria | Nível | Item | Descrição |
| --- | --- | --- | --- | --- |
| 2026-09-03 | Adicionado | MINOR | `Tokens` | Nova escala de cor primitiva `taupe` (`--color-taupe-50` a `--color-taupe-950`) em `tokens/tokens-primitives.css`. |
| 2026-09-03 | Corrigido | PATCH | `Button` | `registryDependencies` apontava para o nome puro `tokens`, que colide com um item oficial de mesmo nome no registry padrão do shadcn; o CLI resolvia a dependência errada quando o consumidor não tinha namespace `servfaz` configurado. Trocado para a URL completa `https://ds.servfaz.app/r/tokens.json`. |
| 2026-09-03 | Corrigido | PATCH | `Button` | Variantes `default` e `secondary` ficavam sem cor no consumidor porque `registry.json` não publicava os tokens que o Button referencia via `var(--button-*)`. Adicionado item `tokens` (`registry:theme`) com os `cssVars` das camadas Primitiva e Semântica (light/dark), e `cssVars` da camada Componente mais `registryDependencies: ["tokens"]` ao próprio item `button`. |
| 2026-09-01 | Adicionado | MINOR | `Button` | Item `button` publicado em `registry.json`, com `dependencies` (`@radix-ui/react-slot`, `class-variance-authority`) e arquivo `registry/servfaz/button.tsx`. |
| 2026-08-27 | Adicionado | MINOR | `Tokens` | Criadas as camadas Primitiva e Semântica de tokens do Servi DS (`tokens/tokens-primitives.css`, `tokens/tokens-semantic.css`). |
| 2026-08-27 | Adicionado | MINOR | `Button` | Variantes `default` e `secondary` passam a usar tokens de componente (`--button-container-color-*`, `--button-content-color-*`, `--button-border-color-*`) em vez das classes genéricas do shadcn/ui; criada a camada de Componente de tokens (`tokens/tokens-component.css`). |
