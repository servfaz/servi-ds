# Content design do Servi DS

> Última atualização: 20/11/2026.
> Regras de escrita para as telas dos produtos que usam o Servi DS: voz, tom, padrões por componente e glossário. Vale para quem desenha, para quem codifica e para os exemplos e stories da documentação.

## Leitura obrigatória

Este guia é lido inteiro antes de criar ou alterar qualquer tela que use o Servi DS, no Figma ou no código. Vale também para bloco, pattern, story e componente com texto.

- Todo texto da tela usa os verbos, termos e nomes próprios do glossário.
- Termo que a tela precisa e o glossário não tem entra aqui antes de ir para a tela.
- A tela só é entregue depois de passar pelo checklist de revisão, no fim deste guia.
- Nos sistemas que usam o Servi DS, este guia chega pela atualização automática e é substituído a cada atualização. Termo novo ou mudança de regra é pedido ao time do Servi DS, nunca editado na cópia do sistema.

## Princípios

1. **Clareza primeiro.** A pessoa precisa entender o que está na tela e o que fazer em seguida, na primeira leitura.
2. **Uma palavra, um significado.** O mesmo conceito tem sempre o mesmo nome em todos os produtos. O glossário no fim deste documento é a referência.
3. **Menos texto.** Se uma palavra pode sair sem perder sentido, ela sai. Interface é lida em varredura.
4. **Ação concreta.** Botões e links dizem o que vai acontecer ("Salvar alterações"), nunca uma resposta genérica ("OK", "Sim").
5. **Respeito ao contexto de trabalho.** Quem usa os sistemas está trabalhando, muitas vezes com pressa. Sem piada, sem gíria, sem drama.

## Voz

A voz é a personalidade fixa do texto. Não muda de tela para tela.

| Traço | Como soa | O que evitar |
| --- | --- | --- |
| **Direta** | Frases curtas, verbo no início, informação mais importante primeiro | Introduções, rodeios, "Gostaríamos de informar que" |
| **Cordial** | Trata a pessoa por "você", com educação e sem formalidade excessiva | "Prezado usuário", "Vossa", excesso de "por favor" |
| **Confiável** | Diz o que aconteceu e o que fazer, com dado concreto quando houver | Promessa vaga, exagero, linguagem de marketing |
| **Simples** | Palavras do dia a dia, termos do negócio que a pessoa já usa | Jargão técnico, siglas sem explicação, anglicismos |

## Tom

O tom varia conforme o momento da pessoa. A voz continua a mesma.

| Momento | Tom | Exemplo |
| --- | --- | --- |
| Ação concluída | Neutro e breve. Confirma e some | "Tarefa salva" |
| Erro que a pessoa pode resolver | Calmo e útil. Explica e orienta | "Informe um e-mail válido, como voce@exemplo.com" |
| Erro do sistema | Responsável, sem culpar a pessoa | "Não foi possível salvar agora. Tente de novo em alguns minutos." |
| Ação destrutiva | Sério e específico. Diz o que se perde | "A tarefa e os comentários dela serão excluídos. Essa ação não pode ser desfeita." |
| Estado vazio | Encorajador e prático. Mostra o próximo passo | "Nenhuma tarefa ainda. Crie a primeira para começar." |
| Primeiro uso e orientação | Acolhedor, sem infantilizar | "Acesse seus aplicativos por aqui" |
| Gaia (IA) | Prestativo e transparente sobre ser uma IA | "Pergunte para a Gaia" |

## Regras gerais de escrita

### Língua e tratamento

- Português do Brasil, com o Acordo Ortográfico vigente.
- Trate a pessoa por **você**. Em rótulos e placeholders, use o possessivo quando ajudar ("Seu nome").
- Sistema fala em terceira pessoa ou sem sujeito ("Tarefa salva"), nunca "eu" ou "nós". A exceção é a Gaia, que pode falar em primeira pessoa dentro do chat.
- Prefira formas neutras de gênero quando existirem ("Pessoa responsável", "Equipe"). Não use "o(a)", "@" ou "x".

### Capitalização

- **Sentence case** em tudo: títulos, botões, abas, menus, rótulos. Só a primeira palavra e nomes próprios em maiúscula. "Criar nova tarefa", nunca "Criar Nova Tarefa".
- Caixa alta só em siglas ("CPF", "CNPJ") e nos títulos de grupo que o componente já estiliza em caixa alta pelo CSS. O texto fonte continua em sentence case.
- Nomes de produto e de componente seguem a grafia oficial do glossário.

### Pontuação

- **Sem ponto final** em títulos, botões, rótulos, abas, itens de menu, badges, tooltips de uma linha e placeholders.
- **Com ponto final** em frases completas: descrições, mensagens de ajuda, mensagens de erro e corpo de alertas e diálogos.
- **Sem exclamação.** Confirmação de sucesso não precisa de entusiasmo.
- **Reticências** ("...") só em ação em andamento ("Salvando...") e em placeholder de busca ("Buscar tarefas...").
- **Sem travessão.** Use vírgula, dois-pontos ou quebre em duas frases.
- Dois-pontos só antes de lista ou valor. Rótulo de campo não leva dois-pontos.

### Números, datas e valores

| Tipo | Formato | Exemplo |
| --- | --- | --- |
| Número | Algarismo, com ponto de milhar | 3 tarefas, 1.250 registros |
| Moeda | `R$` com espaço, vírgula decimal | R$ 1.234,56 |
| Data | dd/mm/aaaa | 20/11/2026 |
| Data curta | dd mmm (mês com três letras, minúsculo) | 20 nov |
| Hora | 24 horas, com "h" | 14h30, 9h |
| Período | "de" + "a" ou "até" | 10/11 a 20/11/2026 |
| Duração | Número + unidade por extenso | 5 minutos, 2 dias |
| Porcentagem | Sem espaço | 45% |

- Datas relativas ("há 5 minutos", "ontem") são bem-vindas em listas e notificações. Mostre a data completa no tooltip.

### Comprimento

| Elemento | Limite orientativo |
| --- | --- |
| Botão | 1 a 3 palavras |
| Título de página ou diálogo | Até 6 palavras |
| Rótulo de campo | 1 a 3 palavras |
| Tooltip | Até 1 linha |
| Toast | Até 1 frase curta, mais uma ação opcional |
| Mensagem de erro de campo | 1 frase |
| Descrição de diálogo ou alerta | Até 2 frases |

### Palavras a evitar

| Evitar | Por quê | Usar |
| --- | --- | --- |
| "Clique aqui" | Não descreve o destino e falha em leitor de tela | Texto do link com o destino: "Ver relatório" |
| "OK", "Sim", "Não" em diálogos | Não diz o que acontece | Verbo da ação: "Excluir", "Manter" |
| "Ops!", "Ah, não!" | Informal demais para o contexto de trabalho | Diga o que aconteceu |
| "Inválido" sozinho | Não orienta | Diga o formato esperado |
| "Erro 500", códigos técnicos | A pessoa não sabe o que fazer com isso | Mensagem humana. Código só em detalhe técnico opcional |
| "Usuário" para falar com a pessoa | Distante | "Você" |
| "Por favor" em toda frase | Cansa e alonga | Só em pedido de espera ou de algo que depende da pessoa |
| Anglicismos ("deletar", "logar", "setar", "dashboard") | Nem todo mundo entende | Ver glossário |

## Acessibilidade no texto

- Todo botão só com ícone tem `aria-label` com o verbo da ação ("Fechar painel", "Abrir menu da conta").
- O texto do link faz sentido fora de contexto.
- Nunca dependa só da cor ou do ícone para passar informação. Status e erro sempre têm texto.
- Placeholder não substitui rótulo. Todo campo tem `Label` visível.
- Imagem informativa tem texto alternativo que descreve o conteúdo. Imagem decorativa tem `alt` vazio.
- Mensagem de erro fica ligada ao campo (o `Field` já faz isso) e é anunciada para leitor de tela.
- Evite abreviações em textos lidos por leitor de tela ("Próxima página" em vez de "Próx.").

## Padrões por componente

### Button

- Verbo no infinitivo + objeto quando o contexto não deixa claro: "Salvar tarefa", "Exportar relatório".
- Só o verbo quando o contexto já diz o objeto: "Salvar" no rodapé de um formulário de tarefa.
- O botão principal repete o verbo do título do diálogo ou da página. Título "Excluir tarefa?" leva botão "Excluir".
- Botão secundário de saída: "Cancelar" quando descarta o que está sendo feito, "Fechar" quando só fecha algo que não teve alteração.
- Estado de carregamento usa gerúndio + reticências: "Salvando...", "Enviando...".

### Label, Field e Input

- **Rótulo:** substantivo curto, sem dois-pontos e sem ponto: "Nome completo", "E-mail".
- **Campo opcional:** marque o opcional, não o obrigatório. Use "(opcional)" depois do rótulo. Se a maioria for opcional, inverta e marque "(obrigatório)".
- **Placeholder:** exemplo de formato, nunca instrução essencial: "voce@exemplo.com", "exemplo.com". Para seleção: "Escolha uma opção", "Escolha uma unidade".
- **Texto de ajuda:** frase completa, com ponto, que explica regra ou formato antes do erro acontecer: "Use pelo menos 8 caracteres."
- **Erro de validação:** diga o que corrigir, no presente, sem culpar:

| Situação | Usar | Evitar |
| --- | --- | --- |
| Campo vazio | "Informe o nome completo." | "Campo obrigatório." |
| Formato errado | "Informe um e-mail no formato voce@exemplo.com." | "E-mail inválido." |
| Valor fora do limite | "Use até 200 caracteres." | "Limite excedido." |
| Data impossível | "Escolha uma data a partir de hoje." | "Data inválida." |

### Mensagens de erro do sistema

Fórmula: **o que aconteceu + por que (se ajudar) + o que fazer.**

- "Não foi possível salvar a tarefa. Verifique sua conexão e tente de novo."
- "Você não tem permissão para editar este registro. Peça acesso à pessoa responsável pela unidade."
- "Não encontramos esta página. Ela pode ter sido movida ou excluída."

Comece por "Não foi possível" ou pelo fato. Não comece por "Erro", "Falha" ou "Desculpe".

### Toast (Sonner)

- Confirma uma ação que acabou de acontecer. Particípio no fim: "Tarefa salva", "Relatório exportado".
- Sem ponto final quando for uma frase nominal curta. Com ponto quando for frase completa.
- Ação opcional com verbo curto: "Desfazer", "Ver".
- Erro que exige ação não vai em toast. Use `Alert` ou o erro do campo.

### Alert

- **Título:** o fato, em poucas palavras: "Sessão expira em 5 minutos".
- **Descrição:** consequência e próximo passo, em até duas frases.
- A variante de cor acompanha o tom: `danger` para erro, `warning` para risco, `success` para conclusão, `information` para aviso neutro, `discovery` para novidade.

### Alert Dialog e confirmações

- **Título:** pergunta com o verbo e o objeto: "Excluir tarefa?", "Sair sem salvar?".
- **Descrição:** o que se perde e se dá para desfazer: "As alterações feitas nesta tela serão perdidas."
- **Botão de confirmação:** o mesmo verbo do título ("Excluir", "Sair sem salvar"). Em ação destrutiva, variante `destructive`.
- **Botão de saída:** "Cancelar".
- Não use "Tem certeza?" como título.

### Empty

- **Título:** o que não tem: "Nenhuma tarefa ainda", "Nenhum resultado encontrado".
- **Descrição:** por que está vazio e o que fazer, em uma frase.
- **Ação:** o verbo que resolve: "Criar tarefa", "Limpar filtros".
- Diferencie vazio de primeiro uso ("Nenhuma tarefa ainda") de vazio por filtro ou busca ("Nenhum resultado para esses filtros").

### Tooltip

- Nome da ação ou complemento curto. Sem ponto final.
- Inclua o atalho quando houver, com `Kbd`: "Buscar Ctrl K".
- Não coloque informação essencial só no tooltip.

### Badge e status

- Uma palavra ou duas, de preferência adjetivo ou particípio: "Ativo", "Pendente", "Em andamento", "Concluído", "Em breve".
- Mesmo status, mesma palavra e mesma cor em todos os produtos.
- Gênero concorda com o item da lista. Se a lista mistura itens, prefira o masculino genérico do substantivo implícito ("registro").

### Carregamento (Spinner, Skeleton, Progress)

- Skeleton não leva texto.
- Spinner com texto quando a espera passa de alguns segundos: "Carregando tarefas...".
- `aria-label` padrão do Spinner: "Carregando".
- Progress com tempo longo mostra o que está acontecendo: "Importando 120 de 500 registros".

### Tabela e Data Table

- Cabeçalho de coluna: substantivo curto, sentence case, sem ponto: "Prazo", "Pessoa responsável".
- Célula sem valor: "Não informado" ou célula vazia, conforme o padrão do produto, e o mesmo em toda a tabela. Nunca travessão ou hífen solto.
- Ações de linha: `aria-label` "Ações da linha"; itens do menu com verbo: "Editar", "Duplicar", "Excluir".
- Seleção: "Selecionar todas as linhas", "Selecionar linha".

### Busca, Command e Search Bar

- Placeholder com o objeto da busca: "Buscar tarefas...", "Buscar clientes...". Genérico só quando a busca é global: "Buscar...".
- Paleta de comandos: "Digite um comando ou busque...".
- Sem resultado: "Nenhum resultado encontrado." Em combobox: "Nenhuma opção encontrada."
- Botão de limpar: `aria-label` "Limpar busca".

### Navegação (App Shell, Sidebar, Breadcrumb, Paginação)

- Itens de menu: substantivo no plural para listas ("Tarefas", "Relatórios"), verbo só para ação direta ("Criar tarefa").
- O título da página repete o nome do item de menu que leva até ela.
- Breadcrumb usa os mesmos nomes do menu, sem o item atual como link.
- Paginação: "Anterior", "Próxima"; `aria-label` "Ir para a página anterior", "Ir para a próxima página".
- Hub de aplicações: "Aplicativos" no `aria-label` do botão e "Seus aplicativos" no título do painel.

### Gaia

- Nome sempre "Gaia", com só a inicial maiúscula.
- Botão de entrada: "Chat com a Gaia". Placeholder: "Pergunte para a Gaia...".
- A Gaia se apresenta como assistente de IA e não finge ser uma pessoa.
- Resposta que pode conter erro leva aviso curto: "A Gaia pode cometer erros. Confira as informações importantes."
- Mesma voz do sistema: direta, cordial, sem gíria e sem emoji.

## Glossário

### Verbos de ação

O verbo escolhido aqui é o único usado para aquela ação em todos os produtos.

| Usar | Quando | Evitar |
| --- | --- | --- |
| **Adicionar** | Incluir um item existente em algo (pessoa na equipe, arquivo no registro) | Inserir, incluir |
| **Criar** | Gerar algo novo do zero (tarefa, relatório) | Novo (como verbo), cadastrar, gerar |
| **Editar** | Abrir para alterar | Alterar, modificar, atualizar (como botão) |
| **Salvar** | Gravar alterações | Gravar, confirmar, aplicar |
| **Excluir** | Apagar de forma definitiva | Deletar, apagar |
| **Remover** | Tirar um item de um grupo sem apagá-lo do sistema | Excluir (nesse caso), retirar |
| **Arquivar** | Tirar de circulação mantendo o registro | Ocultar, desativar |
| **Cancelar** | Desistir do que está sendo feito, sem salvar | Descartar, voltar |
| **Fechar** | Fechar painel, diálogo ou aviso sem efeito | Sair, cancelar |
| **Voltar** | Retornar à tela anterior | Retornar |
| **Enviar** | Mandar para outra pessoa ou etapa | Submeter, mandar |
| **Concluir** | Finalizar uma tarefa ou fluxo | Finalizar, terminar |
| **Buscar** | Procurar por texto | Pesquisar, procurar |
| **Filtrar** | Restringir uma lista por critérios | Refinar |
| **Exportar** | Gerar arquivo a partir dos dados do sistema | Extrair, baixar (nesse caso) |
| **Baixar** | Salvar um arquivo que já existe no computador | Download, fazer download |
| **Importar** | Trazer dados de um arquivo para o sistema | Carregar, subir |
| **Enviar arquivo** | Mandar um arquivo do computador para o sistema | Upload, anexar (quando não é anexo) |
| **Anexar** | Ligar um arquivo a um registro | Vincular arquivo |
| **Copiar** | Copiar para a área de transferência | Copiar link (só quando for link) |
| **Duplicar** | Criar cópia de um item dentro do sistema | Clonar, copiar (nesse caso) |
| **Entrar** | Acessar a conta | Logar, login, acessar |
| **Sair** | Encerrar a sessão | Deslogar, logout |
| **Tentar de novo** | Repetir ação que falhou | Tentar novamente, reenviar |
| **Desfazer** | Reverter a última ação | Reverter |

### Termos de interface

| Usar | Evitar | Nota |
| --- | --- | --- |
| Painel | Dashboard | Tela de indicadores |
| Notificações | Alertas, avisos | Central de notificações do App Shell |
| Configurações | Preferências, settings, ajustes | |
| Conta | Perfil (para dados de acesso) | "Perfil" só para dados públicos da pessoa |
| Aplicativos | Apps, sistemas, módulos | Os produtos que aparecem no hub de aplicações |
| Módulo | Seção, área | Grupo de funcionalidades dentro de um aplicativo (rail da sidebar dupla) |
| E-mail | Email, e-mail address | Sempre com hífen |
| Senha | Password | |
| Arquivo | Documento (quando é só o arquivo) | |
| Pessoa responsável | Responsável (sozinho como sujeito), owner | |
| Equipe | Time, squad | Para grupos de pessoas no produto |
| Prazo | Deadline, data limite | |
| Status | Situação, estado | Rótulo da coluna ou campo |
| Filtros | Refinamento | |
| Atalho | Shortcut, hotkey | |
| Em breve | Coming soon, em construção | Para funcionalidade ainda não disponível |

### Nomes próprios

| Grafia oficial | Evitar | Nota |
| --- | --- | --- |
| Servfaz | ServFaz, SERVFAZ, Serv Faz | |
| Servi DS | ServiDS, Servi Ds, servi-ds (em texto corrido) | `servi-ds` só como nome do repositório |
| Gaia | GAIA, gaia | IA dos sistemas |

### Termos do design system

Para documentação, discussões entre design e engenharia e comentários no código. Não aparecem nas telas dos produtos.

| Termo | Definição |
| --- | --- |
| **Design token** (ou token) | Decisão de design nomeada, como cor, espaçamento ou raio, usada no lugar de um valor solto |
| **Primitivo** | Camada de tokens com os valores brutos (escala de cores, espaçamentos) |
| **Semântico** | Camada de tokens com significado de uso e tema claro e escuro. É a única que os componentes consomem |
| **Família** | Grupo de tokens semânticos por intenção: brand, feedback, palette, background, foreground, border |
| **Tratamento** | Forma de aplicar uma cor: filled, subtle, light, outline |
| **Componente** | Peça de interface pronta, publicada no Servi DS e instalada pelos produtos |
| **Variante** | Versão visual de um componente definida por prop (`variant`, `size`) |
| **Estado** | Condição de interação do componente: hover, foco, desabilitado, selecionado, erro |
| **Bloco** | Composição pronta que cada produto copia e edita, como o App Shell |
| **Pattern** | Padrão de tela ou fluxo documentado, montado com componentes do DS |
| **Registry** | Endereço de onde os produtos instalam componentes e tokens do Servi DS |
| **Consumidor** | Repositório de produto que usa o Servi DS e recebe as atualizações |
| **Propagação** | Envio automático de uma atualização do Servi DS aos consumidores, por Pull Request ou Merge Request |
| **Story** | Exemplo de um componente no Storybook, base da página de documentação |
| **Content design** | Disciplina que decide o texto da interface junto com o design visual |

## Checklist de revisão

Antes de entregar uma tela, uma story ou um componente com texto:

- [ ] Está em sentence case.
- [ ] Botões têm verbo e dizem o que acontece.
- [ ] Os verbos e termos batem com o glossário.
- [ ] Erros dizem o que aconteceu e o que fazer.
- [ ] Botões só com ícone têm `aria-label`.
- [ ] Todo campo tem rótulo visível; placeholder só mostra exemplo.
- [ ] Pontuação segue as regras: sem ponto em títulos e botões, com ponto em frases completas, sem exclamação, sem travessão.
- [ ] Datas, horas e valores seguem o formato brasileiro.
- [ ] O texto cabe no limite de comprimento do elemento.
- [ ] Nada importante depende só de cor, ícone ou tooltip.

## Como evoluir este guia

- Termo novo, verbo novo ou padrão de mensagem novo entra aqui antes de ir para a tela.
- Quando um produto precisar de um termo de negócio próprio, ele entra no glossário com a definição e a grafia.
- Divergência entre este guia e um texto já publicado é tratada como bug: corrige-se o texto, não a regra. Mudar uma regra é decisão explícita da designer.
