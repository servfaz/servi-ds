# Changelog — Servi DS

Histórico completo de mudanças do Servi DS (tokens e componentes publicados via registry), em ordem cronológica, mais recente primeiro.

Categorias fechadas: **Adicionado**, **Alterado**, **Depreciado**, **Removido**, **Corrigido**.

Mudança de token que não afeta nenhum componente diretamente aparece só aqui, com `Tokens` (ou o nome da escala) na coluna Item, sem link. Mudança de componente aparece aqui e também na seção "Changelog" da página do componente em `content/docs/componentes/<nome>.md`; o Item vira link para lá, em vez de duplicar o texto.

Enquanto um release não é cortado, a coluna Versão leva `Não lançado`, e o nível (MAJOR, MINOR ou PATCH) fica registrado num comentário HTML na linha seguinte de cada entrada, invisível na renderização. Ver `.claude/skills/versionamento-e-changelog/SKILL.md` para as regras completas.

| Versão | Data | Categoria | Item | Descrição |
| --- | --- | --- | --- | --- |
| Não lançado | 03/09/2026 | Adicionado | `Tokens` | Nova escala de cor primitiva `taupe` (`--color-taupe-50` a `--color-taupe-950`) em `tokens/tokens-primitives.css`. |
<!-- nivel: MINOR -->
| Não lançado | 03/09/2026 | Corrigido | [`Button`](content/docs/componentes/button.md#changelog) | `registryDependencies` apontava para o nome puro `tokens`, que colide com um item oficial de mesmo nome no registry padrão do shadcn; o CLI resolvia a dependência errada quando o consumidor não tinha namespace `servfaz` configurado. Trocado para a URL completa `https://ds.servfaz.app/r/tokens.json`. |
<!-- nivel: PATCH -->
| Não lançado | 03/09/2026 | Corrigido | [`Button`](content/docs/componentes/button.md#changelog) | Variantes `default` e `secondary` ficavam sem cor no consumidor porque `registry.json` não publicava os tokens que o Button referencia via `var(--button-*)`. Adicionado item `tokens` (`registry:theme`) com os `cssVars` das camadas Primitiva e Semântica (light/dark), e `cssVars` da camada Componente mais `registryDependencies: ["tokens"]` ao próprio item `button`. |
<!-- nivel: PATCH -->
| Não lançado | 01/09/2026 | Adicionado | [`Button`](content/docs/componentes/button.md#changelog) | Item `button` publicado em `registry.json`, com `dependencies` (`@radix-ui/react-slot`, `class-variance-authority`) e arquivo `registry/servfaz/button.tsx`. |
<!-- nivel: MINOR -->
| Não lançado | 27/08/2026 | Adicionado | `Tokens` | Criadas as camadas Primitiva e Semântica de tokens do Servi DS (`tokens/tokens-primitives.css`, `tokens/tokens-semantic.css`). |
<!-- nivel: MINOR -->
| Não lançado | 27/08/2026 | Adicionado | [`Button`](content/docs/componentes/button.md#changelog) | Variantes `default` e `secondary` passam a usar tokens de componente (`--button-container-color-*`, `--button-content-color-*`, `--button-border-color-*`) em vez das classes genéricas do shadcn/ui; criada a camada de Componente de tokens (`tokens/tokens-component.css`). |
<!-- nivel: MINOR -->
