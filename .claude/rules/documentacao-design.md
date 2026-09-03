# DESIGN-DOC: regras para geração automática de documentação de componente

Este documento existe para operacionalizar o princípio 5 de `o-que-e-o-servi-ds.md` ("Documentação é gerada, não desenhada à mão"). Define como eu (Claude) gero a página de documentação de cada componente, para que a designer não precise desenhar tela nenhuma no Figma para esse fim. O Figma continua sendo a fonte visual do componente em si (tokens e biblioteca), nunca da documentação.

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

Se uma dessas fontes não está acessível no momento da geração, a lacuna é sinalizada no lugar do dado, nunca preenchida com um valor supondo o que provavelmente seria.

### Regra 4: markdown puro, copiável como está

Todo arquivo em `content/docs/` é escrito em markdown puro, sem HTML embutido nem elemento que só funcione renderizado. Isso garante que copiar a página inteira como markdown sempre resulte em conteúdo válido e completo, exatamente como reflete o próprio arquivo `.md` no repositório. Vale para todas as páginas, sem exceção: cada componente e cada página de apoio.

### Regra 5: ícone é sempre Phosphor

Todo ícone citado ou usado como exemplo em uma página de documentação vem da biblioteca Phosphor Icons, pelo nome oficial do ícone nessa biblioteca. Nenhum outro pacote de ícone (Lucide, Heroicons, Feather) aparece em exemplo de uso, e nenhum SVG solto substitui uma referência Phosphor.

### Regra 6: nunca hardcoded, no conteúdo

Todo valor citado em exemplo de código, tabela de props ou trecho de uso é o nome real do token (`var(--nome-do-token)`), nunca um valor bruto (hex, px, rgb) inventado para ilustrar. Se o exemplo precisa mostrar uma cor ou espaçamento, cita o token que já existe. Se o token não existe, a lacuna é sinalizada como pendência de token, não preenchida com um valor solto.

### Regra 7: fora da automação de PR

Gerar a documentação de um componente é uma ação só de conteúdo, dentro do repositório `servi-ds`, no mesmo commit que publica o componente. Isso nunca aciona o orquestrador de propagação nem abre Pull Request em repositório consumidor, e é independente de qualquer fluxo de publicação de componente (skill `publicar-componente` incluída). Documentação e propagação de código para outros repositórios são dois fluxos separados, mesmo quando nascem do mesmo componente pronto.

## Regras de implementação do site de documentação

As regras abaixo valem para o código do próprio site `ds.servfaz.app/docs`, não para o conteúdo em markdown. O site que exibe a documentação segue as mesmas regras de qualidade que os componentes que ele documenta.

### Regra 8: componentização é obrigatória

Nenhuma página do site é implementada inteira em um arquivo só. Toda página é quebrada em componentes menores (por exemplo: bloco de instalação, tabela de props, grade de estados, exemplo de uso, botão de copiar como markdown), cada um no seu próprio arquivo, e a página é o arquivo que importa e reúne esses componentes. Um arquivo de página que cresce virando um bloco único de JSX é sinal de que faltou quebrar em componente, não uma exceção aceitável para "essa página é simples".

### Regra 9: nunca hardcoded, no código do site

Vale para o código do site exatamente como vale para o conteúdo: nenhum valor bruto de cor, espaçamento, raio ou tipografia no CSS ou nos componentes do site. Toda referência visual usa `var(--nome-do-token)`, na mesma hierarquia de camadas do restante do Servi DS.

### Regra 10: sempre usar o tema do DS

O site de documentação não tem tema visual próprio. Ele consome o mesmo tema (tokens e componentes) do Servi DS que está documentando, incluindo dark mode resolvido na camada semântica, como qualquer outro consumidor do registry. O site é, ele mesmo, uma vitrine do DS em uso real, não uma implementação visual paralela.

### Regra 11: nunca publicar o que é exclusivo da documentação

Componente construído só para o site de documentação funcionar (tabela de props, botão de copiar como markdown, grade de estados, navegação lateral) nunca entra no `registry.json` nem fica disponível para instalação por `npx shadcn add`. Publicável é só o que faz parte do Servi DS em si, nunca a ferramentaria que existe apenas para exibi-lo.

### Regra 12: copiar como markdown em toda página

Toda página do site, sem exceção, oferece uma ação visível e funcional de copiar o conteúdo inteiro como markdown puro, disponível diretamente na página, não escondida em outro lugar. Não basta o conteúdo por trás ser markdown (Regra 4): a pessoa lendo precisa conseguir copiar isso com uma ação direta, em qualquer rota do site, incluindo as páginas de apoio e cada página de componente.

### Regra 13: sempre componente shadcn quando existir

Antes de construir qualquer peça de interface do site do zero, verificar se já existe um componente shadcn/ui, de preferência já restilizado como item do Servi DS, que cubra a necessidade (tabela, abas, acordeão, botão, campo, tooltip). Usar esse componente existente, nunca recriar o mesmo padrão com HTML e CSS próprio. Construir algo do zero só quando nenhum componente disponível resolve o caso. Vale tanto para os componentes exclusivos do site (Regra 11, tabela de props, grade de estados, botão de copiar) quanto para qualquer outra peça de interface do repositório.

## Estrutura padrão de cada página de componente

Todo arquivo em `content/docs/componentes/` segue a mesma ordem de seções, para consistência entre componentes:

1. **Título e uma linha de descrição.**
2. **Instalação**, com o comando `npx shadcn@latest add https://ds.servfaz.app/r/<nome>.json`.
3. **Props**, em tabela: nome, valores aceitos, obrigatório ou não.
4. **Estados suportados** (default, hover, pressed, focus, disabled, e outros que o componente tiver).
5. **Tokens usados**, listando os tokens de componente que o item consome.
6. **Dependências**, de pacote e de outros itens do registry.
7. **Status da identidade visual**, quando o componente ainda não está totalmente restilizado com os tokens da Servfaz.

## O que fazer quando este documento e a prática divergirem

Se, na prática, uma página de componente ou uma parte do código do site sair no ar sem seguir uma dessas regras, corrigir a página ou o código, não a regra. Mudar uma regra aqui é decisão explícita da designer, não ajuste silencioso feito para acomodar uma exceção pontual.