---
paths:
  - "registry.json"
  - "registry/servfaz/**"
  - "content/docs/componentes/**"
  - "CHANGELOG.md"
---

# Changelog e versionamento do Servi DS

Este arquivo define como uma mudança neste repositório, seja token ou componente, vira uma entrada de changelog, e como essas entradas geram a versão do registry (`REGISTRY_VERSION`).

## Onde mora o changelog

O changelog mora em dois lugares:

1. Um arquivo raiz `CHANGELOG.md`, com o histórico completo, em ordem cronológica, organizado por versão do registry. É o índice geral: toda entrada, de token ou de componente, aparece aqui.
2. Uma seção "Changelog" dentro da página de cada componente, em `content/docs/componentes/<nome>.md`, com só as entradas daquele componente.

Mudança de token que não afeta nenhum componente diretamente entra só no `CHANGELOG.md` raiz, numa categoria "Tokens" (token não tem página própria para referenciar). Mudança de componente entra nos dois lugares ao mesmo tempo: a entrada completa mora na seção do componente, e a linha correspondente no `CHANGELOG.md` raiz referencia essa seção (Regra 4), em vez de manter dois textos soltos e independentes.

## Regras

### Regra 1: o que gera entrada

Toda mudança publicada, de token ou de componente, que altera aparência, comportamento, prop, nome ou disponibilidade gera uma entrada de changelog, no mesmo commit que publica a mudança. Trabalho em andamento que ainda não saiu de uma branch não publicada não gera entrada.

### Regra 2: granularidade da entrada

Entrada de componente cita o nome do componente e a mudança específica (prop, variante, estado, token consumido). Entrada de token cita o nome do token, a camada (Primitivo, Semântico, Componente) e o que mudou (valor, nome, criação, depreciação).

### Regra 3: categorias fechadas

Toda entrada usa uma destas cinco categorias, sem exceção: Adicionado, Alterado, Depreciado, Removido, Corrigido. Categoria nova exige aprovação explícita da designer responsável pelo Servi DS antes de entrar em uso.

### Regra 4: formato da entrada

Cada entrada é uma linha de tabela com cinco colunas: Versão (o `REGISTRY_VERSION` que essa entrada leva, sempre o número, nunca a palavra MAJOR, MINOR ou PATCH por extenso), Data (DD/MM/AAAA), Categoria (Regra 3), Item e Descrição. Descrição é curta e direta: o mínimo de palavras que diz o quê mudou, sem explicar motivo nem benefício.

Quando o Item é um componente, o nome vem como link para a seção Changelog da página daquele componente (`content/docs/componentes/<nome>.md#changelog`). Quando o Item é um token sem componente associado, o nome fica só entre crases, sem link, porque não existe página própria para apontar.

| Versão | Data | Categoria | Item | Descrição |
| --- | --- | --- | --- | --- |
| 1.1.0 | 17/05/2026 | Alterado | [`Toggle Group`](content/docs/componentes/toggle-group.md#changelog) | `spacing` padrão: `0` para `2` |

### Regra 5: cada mudança carrega um nível, só para cálculo

O Servi DS versiona o registry inteiro em semver. Toda mudança carrega, para efeito de cálculo do número final, um nível: MAJOR, MINOR ou PATCH. Esse nível nunca aparece escrito na tabela (Regra 4); ele serve só para calcular o número que entra na coluna Versão (Regra 6, Regra 7).

**MAJOR.** Mudança que quebra um consumidor existente sem ação dele: remoção de token, prop ou componente; renomeação de qualquer um dos três; mudança de comportamento padrão que existia, sem opção de manter o anterior.

**MINOR.** Adição que não quebra nada existente: novo componente, nova variante, novo token, nova prop opcional com valor padrão igual ao comportamento atual.

**PATCH.** Correção que não muda o contrato público: ajuste de bug, correção de um token que estava com valor duplicado em vez de referência, correção de contraste dentro do que já estava documentado.

### Regra 6: a versão nasce do changelog, nunca ao contrário

O `REGISTRY_VERSION` de um release nunca é escolhido antes de escrever as entradas. A ordem é sempre: registrar todas as entradas do release na tabela, depois calcular o bump a partir delas. O nível da próxima versão é o maior nível (Regra 5) entre todas as entradas do release, na prioridade MAJOR > MINOR > PATCH. Uma única entrada MAJOR no lote força a versão inteira para MAJOR, mesmo que as demais entradas do mesmo release sejam MINOR ou PATCH. Todas as entradas do mesmo release levam o mesmo número na coluna Versão.

### Regra 7: mecânica do número

`REGISTRY_VERSION` segue sempre três posições, `MAJOR.MINOR.PATCH` (exemplo: `1.0.1`). Cada posição é um inteiro que só sobe, nunca desce, e cada bump reseta as posições à direita:

Bump MAJOR: soma 1 em MAJOR, zera MINOR e PATCH. `1.0.1` vira `2.0.0`.
Bump MINOR: soma 1 em MINOR, zera PATCH, mantém MAJOR. `1.0.1` vira `1.1.0`.
Bump PATCH: soma 1 em PATCH, mantém MAJOR e MINOR. `1.0.1` vira `1.0.2`.

Se este repositório ainda não tiver um `REGISTRY_VERSION` publicado, não escolher o número inicial sozinho. Sinalizar isso para a designer decidir (convenção usual: `0.1.0` para API instável, `1.0.0` para conjunto já estável) e não aplicar a Regra 6 até essa decisão existir.

### Regra 8: MAJOR sempre traz o caminho de migração

Toda entrada MAJOR inclui, na própria descrição, em poucas palavras, o que o consumidor precisa mudar no código dele. Curta continua sendo a regra (Regra 4), mas nunca tão curta a ponto de anunciar a quebra sem dizer o que fazer.

### Regra 9: renomear é sempre MAJOR

Renomear um token, prop ou componente é sempre MAJOR, mesmo quando o valor visual não muda. Nome é contrato, e o custo de renomear recai inteiro sobre quem consome, independente do que mudou por trás do nome.

### Regra 10: histórico não é reescrito

Uma entrada já publicada numa versão que já saiu nunca é editada ou apagada depois. Erro numa entrada gera uma nova entrada, na versão atual, corrigindo a anterior.

### Regra 11: idioma e tom

Toda entrada é curta e direta, em português, numa linha, sem adjetivo de marketing ("incrível", "muito melhor", "revolucionário") e sem explicar motivo ou benefício. Descreve só o fato da mudança.

### Regra 12: nunca dado pessoal ou de cliente

Nenhuma entrada cita nome de cliente, print de produto real com dado de uso, ou qualquer dado pessoal, nem como exemplo. Regra sem exceção, inclusive em entrada de correção de bug relatado por um cliente específico.

## Quem gera a entrada

A entrada de changelog é gerada no mesmo commit que publica a mudança, a partir do diff real: o que mudou em `registry.json`, no código do componente, ou nos tokens consumidos por ele. Nunca de memória do que provavelmente mudou. Se a categoria ou o nível (MAJOR, MINOR, PATCH) não está claro a partir do diff, sinalizar a lacuna na própria entrada e perguntar à designer, nunca preencher com um palpite.

## Quando este arquivo e a prática divergirem

Se uma entrada publicada não seguir uma destas regras, corrigir a entrada, não a regra. Mudar uma regra aqui é decisão explícita da designer responsável pelo Servi DS, nunca ajuste silencioso para acomodar um caso pontual.