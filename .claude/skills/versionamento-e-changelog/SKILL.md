---
name: versionamento-e-changelog
description: Como gerar entrada de changelog e versionar o REGISTRY_VERSION do Servi DS ao publicar componente ou token. Usar sempre que uma mudança de token ou componente for publicada (junto da skill publicar-componente) ou ao cortar um release.
---

# VERSIONAMENTO E CHANGELOG DO SERVI DS

> Este arquivo é a fonte canônica de versionamento e changelog do Servi DS dentro deste repositório. Qualquer mudança nestas regras é decisão explícita da designer (ver "Regras que nunca mudam sem a designer" abaixo).

## Quando usar isto

Toda vez que uma mudança de token ou componente é publicada, seja aparência, comportamento, prop, nome ou disponibilidade. Trabalho que ainda não saiu do Figma ou de uma branch não publicada não gera entrada.

A entrada nasce no mesmo commit que publica a mudança, a partir do diff real (o que mudou no `registry.json`, no código do componente ou nos tokens do Figma). Nunca de memória do que provavelmente mudou.

## Onde a entrada é escrita

Duas colocações, nunca fora do repositório `servi-ds`:

1. `CHANGELOG.md`, na raiz: histórico completo, em ordem cronológica.
2. Seção "Changelog" da página do componente, em `content/docs/componentes/<nome>.md`, só quando a mudança é de componente. É lá que mora a entrada completa; a linha correspondente no `CHANGELOG.md` raiz só referencia essa seção pelo link no Item, não duplica o texto.

Mudança de token que não afeta nenhum componente diretamente entra só no `CHANGELOG.md`, numa categoria "Tokens" (token não tem página própria para linkar).

## Formato da entrada

Uma linha de tabela com cinco colunas, nesta ordem: Versão, Data, Categoria, Item, Descrição.

| Versão | Data | Categoria | Item | Descrição |
| --- | --- | --- | --- | --- |
| 1.1.0 | 17/05/2026 | Alterado | [`Toggle Group`](content/docs/componentes/toggle-group.md#changelog) | `spacing` padrão: `0` para `2` |

- **Versão**: o `REGISTRY_VERSION` que essa entrada leva, sempre o número (`1.1.0`), nunca a palavra MAJOR, MINOR ou PATCH por extenso. Enquanto o release ainda não foi cortado, ver "Entrada pendente" abaixo.
- **Data**: `DD/MM/AAAA`.
- **Categoria**: uma destas cinco, sem exceção: Adicionado, Alterado, Depreciado, Removido, Corrigido. Categoria nova exige aprovação explícita da designer.
- **Item**: nome do componente ou token. Se for componente, vira link para a seção Changelog da página dele (`content/docs/componentes/<nome>.md#changelog`). Se for token sem componente associado, fica só entre crases, sem link.
- **Descrição**: curta e direta, em português, o mínimo de palavras que diz o que mudou. Sem adjetivo de marketing, sem explicar motivo ou benefício.

Nunca cite nome de cliente, print de produto real com dado de uso, ou qualquer dado pessoal, mesmo em entrada de correção de bug relatado por um cliente específico.

## Entrada pendente: como registrar antes do release ser cortado

Regra 6 exige registrar a entrada antes de calcular a versão; a versão só existe depois. Mas a coluna Versão não pode ficar vazia nem conter a palavra MAJOR/MINOR/PATCH (Regra 5 proíbe o nível aparecer escrito na tabela). Solução: a coluna Versão leva o texto `Não lançado`, e o nível fica num comentário HTML na linha seguinte, invisível quando o markdown é renderizado:

```
| Não lançado | 04/09/2026 | Alterado | [`Toggle Group`](content/docs/componentes/toggle-group.md#changelog) | `spacing` padrão: `0` para `2` |
<!-- nivel: MINOR -->
```

Isso é a peça técnica que faltava para o processo funcionar. Use como convenção operacional até a designer confirmar ou pedir outra.

## Como decidir o nível (para o comentário, nunca para a tabela)

**MAJOR**: quebra um consumidor existente sem ação dele. Remoção de token, prop ou componente. Renomeação de qualquer um dos três (renomear é sempre MAJOR, mesmo sem mudança visual). Mudança de comportamento padrão sem opção de manter o anterior.

**MINOR**: adição que não quebra nada existente. Novo componente, nova variante, novo token, nova prop opcional com valor padrão igual ao comportamento atual.

**PATCH**: correção que não muda o contrato público. Ajuste de bug, correção de token com valor duplicado em vez de referência, correção de contraste dentro do já documentado.

Se o diff não deixar claro o nível ou a categoria, pare e pergunte à designer. Nunca preencha com um palpite.

Toda entrada MAJOR inclui, na própria descrição, em poucas palavras, o que o consumidor precisa mudar no código dele. Continua curta, nunca tão curta a ponto de anunciar a quebra sem dizer o que fazer.

## Como o REGISTRY_VERSION é calculado

O número mora no arquivo `REGISTRY_VERSION` na raiz do repositório (texto puro, uma linha, ex.: `0.1.0`). Se esse arquivo ainda não existir, **não o crie com um valor palpitado**: o número inicial é decisão da designer (convenção usual é `0.1.0` para API instável ou `1.0.0` para API estável), pergunte antes.

A versão nasce do changelog, nunca ao contrário. Ordem sempre: registrar todas as entradas do lote com `Não lançado` na coluna Versão, só depois calcular o bump a partir do nível marcado no comentário de cada uma. O nível da versão é o maior entre as entradas do lote, na prioridade MAJOR > MINOR > PATCH. Uma única entrada MAJOR no lote força a versão inteira para MAJOR. Todas as entradas do mesmo lote levam o mesmo número na coluna Versão.

Mecânica de três posições, `MAJOR.MINOR.PATCH`, cada posição só sobe:

- Bump MAJOR: soma 1 em MAJOR, zera MINOR e PATCH (`1.0.1` → `2.0.0`).
- Bump MINOR: soma 1 em MINOR, zera PATCH, mantém MAJOR (`1.0.1` → `1.1.0`).
- Bump PATCH: soma 1 em PATCH, mantém MAJOR e MINOR (`1.0.1` → `1.0.2`).

O cálculo do bump e o corte de release rodam via `scripts/cut-release.mjs`, que substitui `Não lançado` pelo número final em todas as linhas do lote e apaga os comentários de nível. `.github/workflows/release.yml` dispara na tag criada depois disso e publica a GitHub Release com as notas extraídas via `scripts/extract-release-notes.mjs`, direto das linhas já com o número certo. Nenhum desses dois arquivos decide uma entrada de changelog sozinho, só fecham um lote já escrito.

**Pendência conhecida**: `cut-release.mjs`, na versão atual, só atualiza o `CHANGELOG.md` raiz. A mesma substituição ainda não é replicada automaticamente na seção Changelog de `content/docs/componentes/<nome>.md`. Até isso ser resolvido, confira manualmente se as duas cópias ficaram com o mesmo número depois de cortar um release.

## Regras que nunca mudam sem a designer

- Uma entrada já publicada numa versão que já saiu nunca é editada ou apagada depois. Erro gera nova entrada, corrigindo a anterior, na versão atual.
- Categoria nova, coluna nova no formato, ou qualquer regra deste arquivo só muda por decisão explícita da designer. Se a prática e a regra divergirem, corrija a prática, não a regra.
