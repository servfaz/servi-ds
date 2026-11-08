# DESIGN-DOC: regras para geração automática de documentação de componente

Este documento existe para operacionalizar o princípio "Documentação é gerada, não desenhada à mão" (princípio 5 do documento que define o que é o Servi DS). Define como eu (Claude) gero a página de documentação de cada componente, para que a designer não precise desenhar tela nenhuma no Figma para esse fim. O Figma continua sendo a fonte visual do componente em si (tokens e biblioteca), nunca da documentação.

## Onde mora o conteúdo

O conteúdo publicado (página de cada componente e páginas de apoio) mora só no repositório `servi-ds`, em `content/docs/`. Este projeto Claude não guarda cópia de página nenhuma, só guarda regra e processo (este documento e os demais documentos de arquitetura). Gerar uma página significa escrever ou atualizar o arquivo correspondente direto no repositório, nunca aqui.

## Regras de conteúdo

### Regra 1: quem desenha o quê

O Figma é onde o componente nasce e onde os tokens vivem. A documentação do componente não nasce lá. Quando um componente é criado ou restilizado, eu gero o arquivo de documentação correspondente a partir do que já existe (registry, código, tokens), sem pedir nem esperar uma tela desenhada para esse fim.

### Regra 2: uma página própria por componente, com nome espelhando o registry

Cada componente tem seu próprio arquivo em `content/docs/componentes/<nome>.md`, dentro do repositório `servi-ds`. Nunca uma seção dentro de um arquivo único que lista vários componentes. `<nome>` é sempre o mesmo nome usado no item do `registry.json` e no arquivo `registry/servfaz/<nome>.tsx`, para que componente, código, item do registry e página de documentação sejam a mesma string em três lugares. Um componente novo gera um arquivo novo nesse caminho, não uma entrada a mais em um arquivo existente.

### Regra 3: de onde vem o conteúdo

O conteúdo de cada página vem de três fontes, nunca inventado:

1. O item do componente no `registry.json` (nome, título, descrição, `dependencies`, `registryDependencies`, `cssVars`).
2. O código fonte real do componente, em `registry/servfaz/<nome>.tsx` (props, variantes, tamanhos, estados suportados).
3. Os tokens de componente já publicados na camada Component do Figma Variables, para confirmar quais existem, nunca para copiar um valor visual à mão.

Se uma dessas fontes não está acessível no momento da geração, a página não publica o dado nem um valor suposto no lugar dele. A falta é levada à designer, fora da documentação (Regra 19).

### Regra 4: markdown puro, copiável como está

Todo arquivo em `content/docs/` é escrito em markdown puro, sem HTML embutido nem elemento que só funcione renderizado. Isso garante que copiar a página inteira como markdown sempre resulte em conteúdo válido e completo, exatamente como reflete o próprio arquivo `.md` no repositório. Vale para todas as páginas, sem exceção: cada componente e cada página de apoio.

### Regra 5: ícone é sempre Phosphor

Todo ícone citado ou usado como exemplo em uma página de documentação vem da biblioteca Phosphor Icons, pelo nome oficial do ícone nessa biblioteca. Nenhum outro pacote de ícone (Lucide, Heroicons, Feather) aparece em exemplo de uso, e nenhum SVG solto substitui uma referência Phosphor.

Exceção, por decisão da designer em 08/11/2026: tecnologia de terceiros citada na documentação (Node.js, Next.js, Tailwind CSS, shadcn/ui, Figma) aparece com o próprio logo, em uma cor só, a partir do Simple Icons (licença CC0). Os logos ficam juntos em um arquivo só dos blocos do site.

### Regra 6: nunca hardcoded, no conteúdo

Todo valor citado em exemplo de código, tabela de props ou trecho de uso é o nome real do token (`var(--nome-do-token)`), nunca um valor bruto (hex, px, rgb) inventado para ilustrar. Se o exemplo precisa mostrar uma cor ou espaçamento, cita o token que já existe. Se o token não existe, o exemplo não usa valor solto e a falta do token é levada à designer, fora da documentação (Regra 19).

### Regra 7: fora da automação de PR

Gerar a documentação de um componente é uma ação só de conteúdo, dentro do repositório `servi-ds`, no mesmo commit que publica o componente. Isso nunca aciona o orquestrador de propagação nem abre Pull Request em repositório consumidor, e é independente de qualquer fluxo de publicação de componente (skill `publicar-componente` incluída). Documentação e propagação de código para outros repositórios são dois fluxos separados, mesmo quando nascem do mesmo componente pronto.

## Regras de implementação do site de documentação

As regras abaixo valem para o código do próprio site de documentação em `ds.servfaz.app`, não para o conteúdo em markdown. O site é um Storybook: a configuração mora em `.storybook/`, e as páginas (`.mdx`), as stories e as peças exclusivas do site moram em `storybook/`. Cada página `.mdx` só monta a exibição: lê o arquivo correspondente de `content/docs/` e acrescenta, nas páginas de componente, os exemplos ao vivo e o código-fonte do registry. O site que exibe a documentação segue as mesmas regras de qualidade que os componentes que ele documenta.

### Regra 8: componentização é obrigatória

Nenhuma página do site é implementada inteira em um arquivo só. Toda página é quebrada em componentes menores (por exemplo: bloco de instalação, tabela de props, grade de estados, exemplo de uso, botão de copiar como markdown), cada um no seu próprio arquivo, e a página é o arquivo que importa e reúne esses componentes. Um arquivo de página que cresce virando um bloco único de JSX é sinal de que faltou quebrar em componente, não uma exceção aceitável para "essa página é simples".

### Regra 9: nunca hardcoded, no código do site

Vale para o código do site exatamente como vale para o conteúdo: nenhum valor bruto de cor, espaçamento, raio ou tipografia no CSS ou nos componentes do site. Toda referência visual usa `var(--nome-do-token)`, na mesma hierarquia de camadas do restante do Servi DS.

### Regra 10: sempre usar o tema do DS

O site de documentação não tem tema visual próprio. Ele consome o mesmo tema (tokens e componentes) do Servi DS que está documentando, incluindo dark mode resolvido na camada semântica, como qualquer outro consumidor do registry. O site é, ele mesmo, uma vitrine do DS em uso real, não uma implementação visual paralela. No Storybook, o conteúdo de cada página e cada story usa os tokens do DS, e a alternância entre claro e escuro só troca a classe `.dark`, como em qualquer consumidor. A moldura da ferramenta (header do site, barra lateral, barra de ferramentas e blocos das páginas de docs) é personalizada com os tokens semânticos do DS e acompanha o botão de tema, em claro e escuro. A marca do Servi DS fica no header: completa no desktop e só o símbolo em telas estreitas, pintada com os tokens da marca. A barra lateral é organizada em grupos, nesta ordem: Documentação, Foundations, Componentes, Patterns e Resources, com o título de cada grupo em fonte mono e caixa alta.

### Regra 11: nunca publicar o que é exclusivo da documentação

Componente construído só para o site de documentação funcionar (tabela de props, botão de copiar como markdown, grade de estados, navegação lateral) nunca entra no `registry.json` nem fica disponível para instalação por `npx shadcn add`. Publicável é só o que faz parte do Servi DS em si, nunca a ferramenta que existe apenas para exibi-lo.

### Regra 12: copiar como markdown em toda página

Toda página do site, sem exceção, oferece uma ação visível e funcional de copiar o conteúdo inteiro como markdown puro, disponível diretamente na página, não escondida em outro lugar. Não basta o conteúdo por trás ser markdown (Regra 4): a pessoa lendo precisa conseguir copiar isso com uma ação direta, em qualquer rota do site, incluindo as páginas de apoio e cada página de componente.

Exceção, por decisão da designer em 07/11/2026: a página Comece não mostra os botões de copiar como markdown nem de abrir a versão `.md`. A versão `.md` dela continua publicada (Regra 16).

Exceção, por decisão da designer em 08/11/2026: a página Componentes (visão geral) também não mostra esses botões nem o índice "Nesta página", porque é só uma grade de links. A versão `.md` dela continua publicada (Regra 16).

### Regra 13: sempre componente shadcn quando existir

Antes de construir qualquer peça de interface do site do zero, verificar se já existe um componente shadcn/ui, de preferência já restilizado como item do Servi DS, que cubra a necessidade (tabela, abas, acordeão, botão, campo, tooltip). Usar esse componente existente, nunca recriar o mesmo padrão com HTML e CSS próprio. Construir algo do zero só quando nenhum componente disponível resolve o caso. Vale tanto para os componentes exclusivos do site (Regra 11, tabela de props, grade de estados, botão de copiar) quanto para qualquer outra peça de interface do repositório.

### Regra 14: nunca citar outro documento pelo nome do arquivo

Nenhum documento deste projeto, nem página publicada, cita outro documento pelo nome do arquivo (por exemplo, `arquitetura-e-regras-de-design-tokens.md`). Referência a outro conteúdo é feita em prosa, pelo assunto, nunca por um nome de arquivo entre crases. Se a referência não for essencial ao ponto sendo feito, o mais simples é não citar nada.

### Regra 15: a página de componente é a automática do Storybook

Decisão da designer em 07/11/2026, para reduzir o tempo gasto com documentação. Todo componente usa a página automática do Storybook (autodocs), ligada para todos de uma vez em `.storybook/preview.tsx`. A página traz o Playground com controles, todas as stories com o código e a tabela de props, sem texto escrito à mão.

Para cada componente publicado no registry, o único arquivo de documentação obrigatório é `storybook/componentes/<nome>.stories.tsx`, com o mesmo `<nome>` do registry, uma story `Playground` editável pelos controles e uma story por grupo de variação que o código real do componente suporta (variantes, tamanhos, estados, uso com ícone). Story nunca entra em `registry.json` (Regra 11).

Componente com comportamento (clique, teclado, abrir e fechar, digitação) ganha também stories de teste, com nome começando por `Teste:`, uma função `play` que simula a interação e confere o resultado, e a tag `!autodocs`. Elas rodam no Run tests e no Vitest, aparecem só no Storybook local e ficam fora das páginas de docs. Componente só visual não precisa de story de teste.

Componente novo não ganha mais `content/docs/componentes/<nome>.md` nem `storybook/componentes/<nome>.mdx`. O Button, que já tinha página completa, mantém a dele, com `tags: ["!autodocs"]` na story, até decisão contrária.

Nas páginas automáticas deixam de valer a Regra 2 (arquivo markdown próprio), as Regras 4, 12 e 16 (markdown copiável e versão `.md`) e a estrutura padrão descrita mais abaixo. Essas regras continuam valendo para as páginas de apoio e para o Button.

O site público é gerado no modo docs do Storybook (`storybook build --docs`, no script `build`) e mostra só as páginas. O Storybook local (`npm run dev`) mostra tudo: stories, testes e acessibilidade.

### Regra 16: toda página tem versão em markdown para LLM

Toda página publicada responde também em markdown puro, em uma rota própria terminada em `.md`, com o mesmo caminho amigável do site: `/docs/<pagina>.md` para páginas de apoio e `/docs/componentes/<nome>.md` para componentes, com `<nome>` igual ao do registry (Regra 2). A raiz do site publica ainda `/llms.txt`, o índice dessas rotas no padrão llmstxt.org, e `/llms-full.txt`, com a documentação inteira em um arquivo só.

Essas rotas são geradas no build a partir de `content/docs/`, nunca escritas à mão: uma página nova entra nas rotas e nos dois índices sozinha, no mesmo deploy que a publica. A versão publicada é o próprio arquivo de `content/docs/`, com só duas mudanças: quebra de linha normalizada e links internos do site trocados pela URL absoluta da versão `.md`, para que a LLM navegue entre páginas sem cair no HTML do Storybook. Página oculta no site também fica fora das rotas `.md` e dos índices.

As duas ações ficam num botão agrupado no topo da página: a parte principal, "Copiar página", copia o markdown (Regra 12), e a seta abre um menu com "Copiar página como Markdown", "Abrir Markdown" (a versão `.md`, o endereço entregue a uma LLM) e "Conversar no Claude.ai" (abre uma conversa já pedindo a leitura da versão `.md`).

### Regra 17: o Servi DS é apresentado como design system

Decisão da designer em 07/11/2026. Toda página trata o Servi DS como um design system: componentes, tokens e padrões de interface da Servfaz. Como ele é feito e distribuído (base no shadcn/ui, registry, comando de instalação) aparece em um lugar só, a página Desenvolvedores. As outras páginas não descrevem o DS como "registry do shadcn" nem repetem esse detalhe técnico. A página do Button mantém a instalação e as dependências, que fazem parte da estrutura padrão de página de componente.

### Regra 18: a documentação é sempre responsiva

Toda página e toda peça do site funciona em tela estreita, sem rolagem horizontal da página. Em telas abaixo do breakpoint md, o header leva os links principais para um menu, a busca vira só o ícone e o tema e o GitHub continuam à mostra; a página reduz a margem lateral; grades de cards, hero e tabelas se reorganizam ou rolam dentro do próprio bloco. Peça nova do site já nasce responsiva.

### Regra 19: a documentação não mostra lacunas nem status da identidade visual

Decisão da designer em 08/11/2026. Nenhuma página publica seção de status da identidade visual, lista de lacunas conhecidas, pendência de token ou de Figma, nem aviso de que um componente ainda não está totalmente restilizado. A documentação mostra só o que o DS já entrega. O que falta resolver fica registrado nos documentos de processo e decisão e chega à designer por lá.

### Regra 20: páginas de apoio usam recursos visuais

Decisão da designer em 08/11/2026. Toda página de apoio (qualquer página de `content/docs/` que não seja de componente) é uma documentação direta, no modelo das documentações do Claude: frases curtas e recursos visuais no lugar de texto corrido. Parágrafo só para introduzir um bloco. A página Desenvolvedores é a referência.

Os recursos são blocos de código com linguagem própria, preenchidos em YAML. Continuam sendo markdown puro (Regra 4): no markdown copiado e na versão `.md` aparecem como bloco de código comum.

| Bloco | Quando usar | Campos |
| --- | --- | --- |
| `callout` | Aviso curto no meio do texto | `variant` (`tip`, `info`, `warning`, `danger`), `title`, `body` |
| `steps` | Passo a passo em ordem | `title`, `body`, `code` e `language` (opcionais) |
| `flow` | Processo ou fluxo entre etapas, como diagrama | `icon`, `title`, `description`. A última etapa é o resultado e ganha a cor da marca |
| `icon-cards` | Itens paralelos: pré-requisitos, regras, caminhos para escolher, links | `icon`, `title`, `description`, `href` e `badge` (opcionais). Colunas no meta: ` ```icon-cards columns=3 ` (1 a 4) |
| `card-grid` | Cards com imagem de capa | `title`, `href`, `description`, `image`, `imageHover`, `thumbnail` |
| `component-cards` | Grade de componentes com ilustração esquemática de capa, usada na página Componentes | `name` (o mesmo do registry e da story, escolhe a ilustração), `title`, `description`, `href`. Colunas no meta: ` ```component-cards columns=4 ` (2 a 4, padrão 3) |
| Código (` ```bash `, ` ```tsx `) | Comando ou exemplo de uso | Linguagem no meta |

Como montar a página:

- Uma ideia por bloco. Grade ou fluxo com até seis itens.
- `steps` quando a ordem importa; `icon-cards` quando não importa; `flow` para mostrar o que acontece sozinho entre uma etapa e outra.
- Os campos de texto aceitam markdown de linha (código, link e negrito). Valor com crase ou dois-pontos vai entre aspas.
- `icon` usa um nome da lista de ícones dos blocos do site: `acessibilidade`, `ajuda`, `arquivo`, `cadastro`, `camadas`, `check`, `codigo`, `componente`, `icones`, `livro`, `lista`, `pr`, `produto`, `publicar`, `react`, `sincronizar`, `tema`, `terminal`, `tokens`, `velocidade`, mais os logos `node`, `next`, `tailwind`, `shadcn` e `figma` (Regra 5). Ícone que falta entra nessa lista, sempre Phosphor.
- Aviso de página nova usa `callout`. O bloco `alert` fica só onde já existe.
- O bloco de código tem superfície verde-escura, igual em claro e escuro, com amarelo vivo, verdes e pêssego no destaque de sintaxe. As cores ficam em `.code-surface`, no CSS do site, sempre referenciando primitivos (Regra 9).
- Recurso visual novo vira bloco: peça em arquivo próprio em `storybook/blocks/` (Regra 8), ligada no renderizador de markdown e acrescentada à tabela acima.
- A página Componentes lista todo componente que tem página no site, em seções por categoria. Componente novo entra lá no mesmo commit que o publica, com uma ilustração própria em `storybook/blocks/component-thumbnails/`: desenho esquemático em SVG, pintado só com tokens semânticos.

## Estrutura padrão de cada página de componente

Vale só para o Button e para componente que ganhar página própria por decisão explícita da designer. Os demais usam a página automática (Regra 15).

Todo arquivo em `content/docs/componentes/` segue a mesma ordem de seções, para consistência entre componentes:

1. **Título e uma linha de descrição.**

No Storybook, logo depois do título, entram os exemplos ao vivo (stories) e o código-fonte, montados pela página `.mdx` (Regra 15). As seções abaixo vêm do markdown.

2. **Instalação**, com o comando `npx shadcn@latest add https://ds.servfaz.app/r/<nome>.json`.
3. **Props**, em tabela: nome, valores aceitos, obrigatório ou não.
4. **Estados suportados** (default, hover, pressed, focus, disabled, e outros que o componente tiver).
5. **Tokens usados**, listando os tokens de componente que o item consome.
6. **Dependências**, de pacote e de outros itens do registry.
7. **Changelog**, com só as entradas daquele componente (ver regras de changelog). Seção suspensa por enquanto, por decisão da designer em 08/11/2026: a página não mostra changelog, e as entradas ficam só no `CHANGELOG.md` raiz.

## O que fazer quando este documento e a prática divergirem

Se, na prática, uma página de componente ou uma parte do código do site sair no ar sem seguir uma dessas regras, corrigir a página ou o código, não a regra. Mudar uma regra aqui é decisão explícita da designer, não ajuste silencioso feito para acomodar uma exceção pontual.
