# design-sync: notas do Servi DS

Notas para a próxima sincronização com o Claude Design. Cada item: sintoma -> causa -> correção.

## Como o repositório foi adaptado

- [GENERAL] O Servi DS não tem `dist/` nem um ponto de entrada de pacote: é um registry shadcn (`registry/servfaz/*.tsx`). -> O conversor precisa de uma entrada e de uma árvore `.d.ts`. -> `.design-sync/pkg/` é um pacote sintético: `index.ts` reexporta todo `registry/servfaz/*.tsx`, `package.json` aponta `types` para `types/.design-sync/pkg/index.d.ts`, e `tsconfig.dts.json` gera esses tipos com `tsc` (primeiro passo do `buildCmd`). `types/` é gerado e fica no `.gitignore`. Componente novo no registry: regenerar `index.ts` com uma linha `export * from "../../registry/servfaz/<nome>"`.
- [GENERAL] O leitor de tsconfig do conversor remove "comentários" com uma regex que confunde globs como `**/*.ts` com `/* */` e devolve `paths` vazio. -> Os atalhos `@/...` não resolviam nas previews. -> `cfg.tsconfig` aponta para `.design-sync/pkg/tsconfig.paths.json`, que só tem `baseUrl` e `paths`. Manter os aliases iguais aos do `tsconfig.json` da raiz.
- [GENERAL] Os arquivos do registry são kebab-case (`app-launcher.tsx`), então o conversor não reconhece o import como componente da biblioteca e empacotava uma cópia por preview. -> `cfg.storyImports.shim: ["/registry/servfaz/"]` manda esses imports para `window.ServiDS`.
- [GENERAL] Primeira tentativa travou por mais de 1h sem erro: cada preview que importa `@phosphor-icons/react` empacotava os 1.500 ícones (e a cópia SSR), arquivo por arquivo, passando pelo plugin assíncrono de imports. -> `cfg.storyImports.shim` inclui `@phosphor-icons/react` e os ícones entram no bundle por `cfg.extraEntries: ["./icons.ts"]`.
- [GENERAL] Com o Phosphor inteiro no bundle (8 MB) toda preview levava cerca de 1 s só para executar o script, e o validador lia a página antes da montagem (`[RENDER] root empty` em todas). -> `.design-sync/pkg/icons.ts` exporta só os ícones `*Icon` que o DS usa mais um conjunto comum de interface (cerca de 240), a partir de `@phosphor-icons/react/dist/csr/<Nome>`. Bundle caiu para 2,7 MB. Ícone novo usado num componente ou story precisa entrar nessa lista, senão vira `undefined` na preview.
- Títulos sem export de mesmo nome: `cfg.titleMap` liga Chart -> ChartContainer, Resizable -> ResizablePanelGroup, Sonner -> Toaster.
- Cards: `cardMode: "column"` para stories mais largas que a célula da grade, `cardMode: "single"` (story Playground) para App Shell, App Sidebar, Sidebar, Popover e Tooltip, que posicionam conteúdo fora da célula. Sugestões do próprio validador (`[GRID_OVERFLOW]`).

## Como avaliar as comparações

- [GENERAL] A folha de comparação encolhe a preview (a captura dela tem 900x700, a do Storybook é recortada no componente), então tudo parece menor à direita. Não é diferença de tamanho: confira nos PNGs de `raw/` antes de concluir qualquer coisa sobre escala.
- [GENERAL] Stories `Teste: ...` são testes de interação: o Storybook captura depois do `play()` (módulo trocado, foco, menu aberto) e a preview mostra o estado inicial. Quando a única diferença é essa, a nota é `close` com essa justificativa. Não mexer no `.tsx` para imitar o pós-interação.
- [GENERAL] A preview tem uma margem de página em volta do card e às vezes fica mais estreita que o canvas do Storybook. Isso é enquadramento, não diferença.
- [GENERAL] O Storybook usa `layout: "centered"` em todas as stories; a preview monta num bloco normal no canto superior esquerdo. Efeitos aceitos como enquadramento (`close`): Menubar ocupa a largura toda em vez de encolher no conteúdo; Popover e Tooltip abrem deslocados (o Radix desvia da borda, o Tooltip `side="top"` vira para baixo). Conteúdo e estilo são idênticos. Não há correção por config sem colocar um wrapper falso no bundle.
- [GENERAL] Sidebar e AppSidebar têm altura de viewport (`h-svh`): a margem de 24px da preview corta a base na captura de 700px. Enquadramento.
- [GENERAL] Overlays: o lado Storybook da folha é recortado em `#storybook-root`, então conteúdo em portal (popover, tooltip, toast aberto) não aparece no PNG. Para avaliar, tire uma captura de viewport inteira do iframe do `sb-reference`.
- [GENERAL] InputOTP voltava `sb-error` "no storybook root content" nas 3 stories, mas elas renderizam: o `input-otp` põe um `<noscript>` como primeiro filho de `#storybook-root` e o `compare.mjs` esperava por ele. -> Correção local na cópia `.ds-sync/storybook/compare.mjs` (linha do `SB_CONTENT`): incluir `noscript` na lista excluída. Nunca usar `skip` aqui: os componentes renderizam.
- Field: a story "Estados" tem 748px de altura -> `cfg.overrides.Field.viewport: "900x900"`.
- ChartContainer: a animação de entrada do Recharts (JavaScript, 1,5 s) ignora o congelamento de animações da captura, e as séries saíam pela metade, num ponto diferente a cada execução. -> Preview própria em `.design-sync/previews/ChartContainer.tsx` que desliga `isAnimationActive` em `Area`, `Bar` e `Line` na hora de renderizar. Os imports do Recharts têm alias (`RArea` etc.) porque o wrapper já exporta uma story chamada `Area`, que sombreava o import. O lado Storybook ainda pode sair no meio da animação: avaliar pela forma, cor e eixos.
- TableGroup: stories com cerca de 790px de altura e 868px de largura -> `cfg.overrides.TableGroup.viewport: "960x900"`.
- DatePicker e ResizablePanelGroup: o `layout: "centered"` encolhe o componente no Storybook e a preview usa a largura toda. Enquadramento.
- Carousel: as setas ficam 48px para fora do carrossel; o recorte do Storybook as esconde e a margem da preview corta a da esquerda. Enquadramento.
- Fora o ChartContainer, nenhum componente das ondas precisou de preview própria (`.design-sync/previews/` vazio): as previews geradas a partir das stories bateram com o Storybook.

## Avisos já avaliados

- `! preview decorator bundle failed: Could not resolve "tailwindcss"`: o `.storybook/preview.tsx` importa o CSS global com `@import "tailwindcss"`. O único decorator é a troca de tema por classe, e o padrão é claro, então as previews não precisam dele. O CSS chega pelo `[CSS_FROM_STORYBOOK]`.
- `[TOKENS_MISSING]` com `--button-container-*`, `--button-content-*`, `--button-border-*`: vêm de classes antigas que o Tailwind ainda gera ao varrer o repositório. Nenhum componente atual usa esses tokens.
- `[FONT_REMOTE]` Figtree, Geist Mono e Libre Baskerville: vêm do Google Fonts por `@import` remoto.
- `[RENDER_THIN]` em AlertDialog, AppLauncher, ContextMenu, Sheet e Toaster: as stories mostram só o gatilho fechado, então as variantes ficam iguais no card.

## Re-sync risks

- A lista de ícones em `icons.ts` é curada: ícone novo em componente ou story precisa ser acrescentado à mão.
- `index.ts` do pacote sintético lista os arquivos do registry: componente novo precisa de uma linha nova.
- `tsconfig.paths.json` duplica os aliases do `tsconfig.json` da raiz.
- A correção do `noscript` no `compare.mjs` vive só na cópia local em `.ds-sync/`. Depois de copiar os scripts de novo, reaplicar, senão o InputOTP volta a dar `sb-error` falso.
- O teto de 6 stories por componente deixou sem avaliação a 7ª story de SearchBar e Field, e as últimas de Button (10), AppShell (8) e DataTable (9).
- O `sb-reference` precisa ser recompilado junto com qualquer mudança em componente ou story (`buildCmd`).
