# CLAUDE.md — servi-ds

Este arquivo orienta qualquer sessão do Claude que trabalhe neste repositório de código (servi-ds). Ele reúne as regras operacionais que já foram decididas no plano de restilização e na arquitetura de tokens, para que nenhuma sessão nova reabra uma discussão já fechada ou introduza um padrão divergente.

## O que é este repositório

Este é o repositório de referência do Servi DS: o registry de componentes shadcn/ui restilizados com a identidade visual da Servfaz. Ele nasceu do template oficial `shadcn-ui/registry-template` (Etapa 0 do plano) e ainda está com vários valores de placeholder do template original (nome `acme`, homepage `acme.com` no `registry.json`, estrutura `registry/new-york/...`). Nenhum desses placeholders deve ser tratado como definitivo, eles precisam ser substituídos pelos valores reais do Servi DS antes de qualquer publicação.

Este repositório não publica pacote npm. A distribuição para os sistemas consumidores acontece só por Registry mais CI, decisão já fechada e justificada no plano (ver seção "Decisão de arquitetura" do documento).

## Onde fica a documentação completa

Este arquivo é um resumo operacional, não a fonte de documentação do DS. A documentação completa vive em dois lugares que devem ficar sempre idênticos entre si:

Página "Design System" no ClickUp, pasta Servi DS, espaço Inovação: https://app.clickup.com/90131166285/v/f/1000440000010177/901313846553

Projeto Claude "Servi DS", nos arquivos `plano-de-restilizacao-do-design-system.md` e `arquitetura-e-regras-de-design-tokens.md`

Se uma regra deste arquivo parecer desatualizada em relação a esses dois lugares, eles têm precedência. Qualquer mudança de arquitetura precisa entrar primeiro nesses documentos, só depois vira prática de código aqui. Se algo mudar lá, atualize este CLAUDE.md na mesma sessão.

## Comandos

Gerenciador de pacotes é pnpm (há `pnpm-lock.yaml` e `pnpm-workspace.yaml`), não use npm nem yarn para instalar dependências.

`pnpm dev` sobe o projeto local. `pnpm registry:build` roda `shadcn build` e gera `public/r/` a partir de `registry/` e `registry.json`.

## Estrutura de pastas, regras que não mudam

`registry/` é a única pasta editada à mão dentro deste repositório.

`public/r/` é sempre gerado pelo comando de build, nunca editado direto. Se algo em `public/r/` está errado, o conserto é em `registry/` ou em `registry.json`, seguido de novo build.

`tokens/` (primitives.json, semantic.json, component.json) ainda não existe neste repositório, é entrega da Fase 1 do plano. Quando for criado, segue a arquitetura em três camadas descrita abaixo.

`styles/globals.css` centraliza cor e raio em variáveis CSS, nenhum componente usa valor fixo.

## Arquitetura de tokens, resumo operacional

Três camadas, nessa ordem, e uma camada nunca pula a outra: Global/Primitivo (valor bruto, sem significado de uso) → Semântico (o significado de uso) → Componente (o vínculo entre uma parte visual de um componente e o semântico que ela usa). Componente nunca referencia primitivo direto. Semântico nunca referencia outro semântico.

Nenhum componente contém valor bruto (hexadecimal, pixel solto). Se falta cobertura, a resposta é criar o token, não digitar o valor.

Dark mode é resolvido inteiramente na camada semântica. Nunca existe `if (darkMode)` nem qualquer lógica condicional de tema dentro de um componente.

Nome de token é contrato: formato semântico `categoria.propriedade.variante.estado`, formato componente `componente.parte.propriedade.variante.estado`, sempre inglês, sempre lowercase, ponto como separador. Vocabulário fechado de estado (`default`, `hover`, `pressed`, `focus`, `disabled`, `selected`, `loading`) e de feedback (`information`, `success`, `warning`, `danger`, `discovery`). Nenhum nome novo entra nesses vocabulários sem aprovação registrada no documento de arquitetura.

Todo par semântico de cor (fundo mais texto ou ícone sobre ele) precisa validar WCAG 2.1 AA no momento em que o valor é definido, não depois. Mínimo 4.5:1 para texto normal, 3:1 para texto grande e ícones.

Regras completas, tabela de categorias e exemplos ficam em `arquitetura-e-regras-de-design-tokens.md` no projeto Claude "Servi DS". Este resumo existe só para consulta rápida durante o código, não substitui aquele documento.

## Regras de componente, o que nunca muda

Nomes e estrutura das variantes existentes (`variant`, `size`) não mudam. O contrato de props de cada componente é preservado.

Nenhuma tela dos sistemas consumidores precisa alterar código para receber a atualização visual.

A camada de comportamento do Radix Primitives não é tocada, só a camada visual escrita pelo shadcn é restilizada.

## Regras do `registry.json`

O campo `content` de cada item nunca é escrito à mão, ele é preenchido pelo build a partir do arquivo indicado em `path`.

Em `files`, use os placeholders `@ui/`, `@components/`, `@lib/` ou `@hooks/` no lugar de um caminho fixo de destino, eles resolvem para o alias que cada sistema consumidor já tem configurado no próprio `components.json`.

Em `registryDependencies`, use sempre o nome puro do item (por exemplo `input`), isso aponta para o item do próprio registry Servfaz, nunca para o shadcn original.

Se o componente introduz cor ou raio que ainda não existe no sistema consumidor, declare em `cssVars.theme`, `cssVars.light` e `cssVars.dark` dentro do item, nunca deixe valor solto no componente.

## Regra de propagação

Registry mais CI é o único caminho de distribuição. Não existe rota alternativa rodando em paralelo, publicar pacote npm foi avaliado e descartado nas duas variantes possíveis (pacote só de tokens e pacote completo de componentes).

O workflow de CI de cada sistema consumidor lê a lista de componentes direto do `registry.json` publicado. Lista fixa de componentes escrita dentro do arquivo de workflow é proibida.

Rollout é gradual: um componente ausente do `registry.json` continua no padrão shadcn original no sistema consumidor, sem risco de quebra. A qualquer momento um mesmo sistema pode ter parte dos componentes no padrão Servfaz e parte ainda no padrão shadcn original, isso é esperado, não é bug.

## Ordem de trabalho da Fase 2

Onda 0, antes de qualquer restilização visual: corrigir o bug `cursor-p ointer` no Button (classe com espaço indevido que quebra o cursor de pointer), em commit separado da mudança visual, para não misturar correção de bug com mudança de identidade.

Onda 1, fazer primeiro: Button, Input, Card, Badge.

Onda 2 em diante segue `priorizacao-restilizacao-componentes.md` no projeto Claude "Servi DS". Não reordenar essa fila sem revalidar com a Milena, a ordem já pesa uso combinado, alcance por composição, visibilidade estrutural e complexidade de restilização.

## O que nunca fazer neste repositório

Publicar pacote npm de tokens ou de componentes.

Escrever valor bruto (hex, px solto) dentro de um componente.

Pular camada de token (componente referenciando primitivo direto).

Lógica condicional de dark mode dentro de um componente.

Lista fixa de componentes dentro de um arquivo de workflow de CI.

Editar `public/r/` à mão.

Renomear ou remover uma variante (`variant`, `size`) já existente sem alinhar antes com o time de dev, isso quebra contrato de props em produção.

## Antes de abrir PR ou publicar

Rodar `pnpm registry:build` e conferir que passou sem erro.

Testar o item com `npx shadcn view` e `npx shadcn add ... --dry-run` antes de publicar.

Confirmar que `variant` e `size` do componente original foram preservados.

Se algum token de cor é novo, confirmar que o contraste AA já foi validado e registrado.

Confirmar que qualquer decisão de arquitetura nova já está escrita no `.md` do plano ou da arquitetura de tokens, antes de virar código aqui.
