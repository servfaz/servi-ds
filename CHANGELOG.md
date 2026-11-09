# Changelog — Servi DS

Histórico completo de mudanças do Servi DS (tokens e componentes publicados via registry), em ordem cronológica, mais recente primeiro.

Categorias fechadas: **Adicionado**, **Alterado**, **Depreciado**, **Removido**, **Corrigido**.

Mudança de token que não afeta nenhum componente diretamente aparece só aqui, com `Tokens` (ou o nome da escala) na coluna Item, sem link. Mudança de componente aparece aqui e também na seção "Changelog" da página do componente em `content/docs/componentes/<nome>.md`; o Item vira link para lá, em vez de duplicar o texto.

Enquanto um release não é cortado, a coluna Versão leva `Não lançado`, e o nível (MAJOR, MINOR ou PATCH) fica registrado num comentário HTML na linha seguinte de cada entrada, invisível na renderização. Ver as regras de changelog do repositório para os detalhes completos.

| Versão | Data | Categoria | Item | Descrição |
| --- | --- | --- | --- | --- |
| Não lançado | 08/11/2026 | Adicionado | `App Sidebar` | Item `app-sidebar` publicado em `registry.json`, com arquivo `registry/servfaz/app-sidebar.tsx`. |
<!-- nivel: MINOR -->
| Não lançado | 08/11/2026 | Adicionado | `App Launcher` | Item `app-launcher` publicado em `registry.json`, com arquivo `registry/servfaz/app-launcher.tsx`. |
<!-- nivel: MINOR -->
| Não lançado | 08/11/2026 | Adicionado | `App Side Panel` | Item `app-side-panel` publicado em `registry.json`, com arquivo `registry/servfaz/app-side-panel.tsx`. |
<!-- nivel: MINOR -->
| Não lançado | 08/11/2026 | Adicionado | `App Header` | Item `app-header` publicado em `registry.json`, com arquivo `registry/servfaz/app-header.tsx`. |
<!-- nivel: MINOR -->
| Não lançado | 08/11/2026 | Alterado | `App Shell` | Item `app-shell` deixa de ser bloco e vira componente (`registry:ui`) configurado por props, com `linkComponent` e `currentPath` para o menu. A página de exemplo passa ao bloco `app-shell-exemplo`. |
<!-- nivel: MINOR -->
| Não lançado | 08/11/2026 | Adicionado | `Skeleton` | Item `skeleton` publicado em `registry.json` e arquivo `registry/servfaz/skeleton.tsx`. |
<!-- nivel: MINOR -->
| Não lançado | 08/11/2026 | Adicionado | `Tooltip` | Item `tooltip` publicado em `registry.json`, com `dependencies` (`@radix-ui/react-tooltip`) e arquivo `registry/servfaz/tooltip.tsx`. |
<!-- nivel: MINOR -->
| Não lançado | 08/11/2026 | Adicionado | `Sheet` | Item `sheet` publicado em `registry.json`, com `dependencies` (`@radix-ui/react-dialog`, `@phosphor-icons/react`) e arquivo `registry/servfaz/sheet.tsx`. |
<!-- nivel: MINOR -->
| Não lançado | 08/11/2026 | Adicionado | `Search Bar` | Item `search-bar` publicado em `registry.json`, com `dependencies` (`@phosphor-icons/react`) e arquivo `registry/servfaz/search-bar.tsx`. |
<!-- nivel: MINOR -->
| Não lançado | 08/11/2026 | Adicionado | `Sidebar` | Item `sidebar` publicado em `registry.json`, com `dependencies` (`@radix-ui/react-slot`, `class-variance-authority`, `@phosphor-icons/react`) e arquivo `registry/servfaz/sidebar.tsx`. |
<!-- nivel: MINOR -->
| Não lançado | 08/11/2026 | Adicionado | `App Shell` | Bloco `app-shell` (`registry:block`) publicado em `registry.json`, com os componentes `app-header`, `app-launcher`, `app-side-panel` e `app-sidebar` e a página em `app/app-shell/page.tsx`. Fora da propagação automática, salvo para quem pede no cadastro. |
<!-- nivel: MINOR -->
| Não lançado | 08/11/2026 | Corrigido | `Dependências` | Pacotes npm de todos os itens passam a levar a faixa de versão do `package.json` do Servi DS (ex. `@tanstack/react-table@^8.21.3`). |
<!-- nivel: PATCH -->
| Não lançado | 08/11/2026 | Adicionado | `Popover` | Item `popover` publicado em `registry.json`, com `dependencies` (`@radix-ui/react-popover`) e arquivo `registry/servfaz/popover.tsx`. |
<!-- nivel: MINOR -->
| Não lançado | 08/11/2026 | Adicionado | `Separator` | Item `separator` publicado em `registry.json`, com `dependencies` (`@radix-ui/react-separator`) e arquivo `registry/servfaz/separator.tsx`. |
<!-- nivel: MINOR -->
| Não lançado | 08/11/2026 | Alterado | `Tokens` | `--typography-font-serif` (Primitivo): família serifada de `Instrument Serif` para `Libre Baskerville`. |
<!-- nivel: MINOR -->
| 0.2.0 | 03/09/2026 | Adicionado | `Tokens` | Nova escala de cor primitiva `taupe` (`--color-taupe-50` a `--color-taupe-950`) em `tokens/tokens-primitives.css`. |
| 0.2.0 | 03/09/2026 | Corrigido | [`Button`](content/docs/componentes/button.md#changelog) | `registryDependencies` apontava para o nome puro `tokens`, que colide com um item oficial de mesmo nome no registry padrão do shadcn; o CLI resolvia a dependência errada quando o consumidor não tinha namespace `servfaz` configurado. Trocado para a URL completa `https://ds.servfaz.app/r/tokens.json`. |
| 0.2.0 | 03/09/2026 | Corrigido | [`Button`](content/docs/componentes/button.md#changelog) | Variantes `default` e `secondary` ficavam sem cor no consumidor porque `registry.json` não publicava os tokens que o Button referencia via `var(--button-*)`. Adicionado item `tokens` (`registry:theme`) com os `cssVars` das camadas Primitiva e Semântica (light/dark), e `cssVars` da camada Componente mais `registryDependencies: ["tokens"]` ao próprio item `button`. |
| 0.2.0 | 01/09/2026 | Adicionado | [`Button`](content/docs/componentes/button.md#changelog) | Item `button` publicado em `registry.json`, com `dependencies` (`@radix-ui/react-slot`, `class-variance-authority`) e arquivo `registry/servfaz/button.tsx`. |
| 0.2.0 | 27/08/2026 | Adicionado | `Tokens` | Criadas as camadas Primitiva e Semântica de tokens do Servi DS (`tokens/tokens-primitives.css`, `tokens/tokens-semantic.css`). |
| 0.2.0 | 27/08/2026 | Adicionado | [`Button`](content/docs/componentes/button.md#changelog) | Variantes `default` e `secondary` passam a usar tokens de componente (`--button-container-color-*`, `--button-content-color-*`, `--button-border-color-*`) em vez das classes genéricas do shadcn/ui; criada a camada de Componente de tokens (`tokens/tokens-component.css`). |
