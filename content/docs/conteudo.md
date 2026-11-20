---
title: Conteúdo
description: Voz, tom, padrões de texto e glossário para as telas dos produtos que usam o Servi DS.
---

Como escrever o texto das telas: botões, rótulos, mensagens, estados vazios e avisos.

```callout
variant: warning
title: Leitura obrigatória
body: Leia este guia antes de criar ou alterar qualquer tela, no Figma ou no código. Todo texto segue o glossário e passa pelo checklist do fim da página.
```

## Princípios

```icon-cards columns=3
- icon: check
  title: Clareza primeiro
  description: A pessoa entende o que está na tela e o que fazer, na primeira leitura.
- icon: livro
  title: Uma palavra, um significado
  description: O mesmo conceito tem o mesmo nome em todos os produtos.
- icon: velocidade
  title: Menos texto
  description: Se uma palavra pode sair sem perder sentido, ela sai.
- icon: componente
  title: Ação concreta
  description: "Botões dizem o que acontece: \"Salvar alterações\", nunca \"OK\"."
- icon: produto
  title: Contexto de trabalho
  description: Quem usa está trabalhando. Sem piada, sem gíria, sem drama.
```

## Voz

A voz é fixa. Não muda de tela para tela.

```icon-cards columns=4
- icon: velocidade
  title: Direta
  description: Frases curtas, verbo no início, o mais importante primeiro.
- icon: ajuda
  title: Cordial
  description: "Trata por \"você\", com educação e sem formalidade."
- icon: check
  title: Confiável
  description: Diz o que aconteceu e o que fazer, com dado concreto.
- icon: livro
  title: Simples
  description: Palavras do dia a dia, sem jargão nem anglicismo.
```

## Tom

O tom muda conforme o momento da pessoa.

| Momento | Tom | Exemplo |
| --- | --- | --- |
| Ação concluída | Neutro e breve | "Tarefa salva" |
| Erro que a pessoa resolve | Calmo e útil | "Informe um e-mail válido, como voce@exemplo.com" |
| Erro do sistema | Responsável, sem culpar | "Não foi possível salvar agora. Tente de novo em alguns minutos." |
| Ação destrutiva | Sério e específico | "A tarefa e os comentários dela serão excluídos. Essa ação não pode ser desfeita." |
| Estado vazio | Prático, com próximo passo | "Nenhuma tarefa ainda. Crie a primeira para começar." |
| Gaia | Prestativo e transparente | "Pergunte para a Gaia" |

## Regras de escrita

```icon-cards columns=2
- icon: ajuda
  title: Tratamento
  description: "Português do Brasil, \"você\". O sistema não fala em \"eu\" nem \"nós\", só a Gaia no chat."
- icon: lista
  title: Sentence case
  description: "Só a primeira palavra e nomes próprios em maiúscula: \"Criar nova tarefa\"."
- icon: codigo
  title: Pontuação
  description: Sem ponto em títulos, botões, rótulos e placeholders. Com ponto em frases completas. Sem exclamação e sem travessão.
- icon: cadastro
  title: Gênero neutro
  description: "Prefira \"Pessoa responsável\" e \"Equipe\". Não use \"o(a)\", \"@\" ou \"x\"."
```

```callout
variant: info
title: Reticências
body: "Só em ação em andamento (\"Salvando...\") e em placeholder de busca (\"Buscar tarefas...\")."
```

### Números, datas e valores

| Tipo | Formato | Exemplo |
| --- | --- | --- |
| Número | Algarismo, ponto de milhar | 1.250 registros |
| Moeda | `R$` com espaço, vírgula decimal | R$ 1.234,56 |
| Data | dd/mm/aaaa | 20/11/2026 |
| Data curta | dd mmm | 20 nov |
| Hora | 24 horas, com "h" | 14h30 |
| Porcentagem | Sem espaço | 45% |

### Comprimento

| Elemento | Limite |
| --- | --- |
| Botão | 1 a 3 palavras |
| Título de página ou diálogo | Até 6 palavras |
| Rótulo de campo | 1 a 3 palavras |
| Tooltip | 1 linha |
| Mensagem de erro de campo | 1 frase |
| Descrição de diálogo ou alerta | Até 2 frases |

### Evite

| Evitar | Usar |
| --- | --- |
| "Clique aqui" | O destino no texto do link: "Ver relatório" |
| "OK", "Sim", "Não" em diálogos | O verbo da ação: "Excluir", "Manter" |
| "Ops!", "Desculpe" | O que aconteceu |
| "Inválido" sozinho | O formato esperado |
| Códigos técnicos ("Erro 500") | Mensagem humana |
| Anglicismos ("deletar", "logar") | O verbo do glossário |

## Acessibilidade no texto

```icon-cards columns=2
- icon: acessibilidade
  title: Botão só com ícone
  description: "Sempre com `aria-label` e o verbo da ação: \"Fechar painel\"."
- icon: cadastro
  title: Rótulo visível
  description: "Todo campo tem `Label`. Placeholder só mostra exemplo."
- icon: tema
  title: Além da cor
  description: Status e erro sempre têm texto. Nunca só cor, ícone ou tooltip.
- icon: arquivo
  title: Texto alternativo
  description: "Imagem informativa descreve o conteúdo. Decorativa leva `alt` vazio."
```

## Padrões por componente

### Button

- Verbo no infinitivo, mais o objeto quando o contexto não deixa claro: "Salvar tarefa".
- O botão principal repete o verbo do título: título "Excluir tarefa?", botão "Excluir".
- "Cancelar" descarta o que está sendo feito. "Fechar" só fecha.
- Carregando: gerúndio e reticências, "Salvando...".

### Field e Input

- Rótulo curto, sem dois-pontos: "Nome completo".
- Marque o opcional com "(opcional)", não o obrigatório.
- Placeholder é exemplo de formato: "voce@exemplo.com".
- Texto de ajuda explica a regra antes do erro: "Use pelo menos 8 caracteres."

| Erro | Usar | Evitar |
| --- | --- | --- |
| Campo vazio | "Informe o nome completo." | "Campo obrigatório." |
| Formato errado | "Informe um e-mail no formato voce@exemplo.com." | "E-mail inválido." |
| Fora do limite | "Use até 200 caracteres." | "Limite excedido." |

### Mensagens de erro

```flow
- icon: ajuda
  title: O que aconteceu
  description: "\"Não foi possível salvar a tarefa.\""
- icon: lista
  title: Por que
  description: Só quando ajuda a resolver.
- icon: check
  title: O que fazer
  description: "\"Verifique sua conexão e tente de novo.\""
```

Não comece por "Erro", "Falha" ou "Desculpe".

### Avisos e confirmações

| Componente | Título | Corpo | Ação |
| --- | --- | --- | --- |
| Sonner (toast) | Particípio: "Tarefa salva" | Sem corpo | "Desfazer", "Ver" |
| Alert | O fato: "Sessão expira em 5 minutos" | Consequência e próximo passo | Opcional |
| Alert Dialog | Pergunta: "Excluir tarefa?" | O que se perde e se dá para desfazer | Mesmo verbo do título e "Cancelar" |
| Empty | O que falta: "Nenhuma tarefa ainda" | Por que e o que fazer | "Criar tarefa", "Limpar filtros" |

Erro que exige ação não vai em toast. Não use "Tem certeza?" como título.

### Outros componentes

| Componente | Padrão |
| --- | --- |
| Tooltip | Nome da ação, sem ponto, com atalho quando houver |
| Badge | Uma ou duas palavras: "Ativo", "Pendente", "Em andamento", "Concluído" |
| Spinner | `aria-label` "Carregando"; texto quando a espera é longa |
| Tabela | Cabeçalho com substantivo curto; célula sem valor com "Não informado" ou vazia |
| Busca | Placeholder com o objeto: "Buscar tarefas..."; sem resultado: "Nenhum resultado encontrado." |
| Navegação | Menu no plural ("Tarefas"); título da página igual ao item do menu |
| Gaia | Sempre "Gaia". Botão "Chat com a Gaia". Se apresenta como IA |

## Glossário

### Verbos de ação

| Usar | Quando | Evitar |
| --- | --- | --- |
| Adicionar | Incluir item existente em algo | Inserir, incluir |
| Criar | Gerar algo novo | Cadastrar, gerar, "Novo" como verbo |
| Editar | Abrir para alterar | Alterar, modificar |
| Salvar | Gravar alterações | Gravar, aplicar |
| Excluir | Apagar de forma definitiva | Deletar, apagar |
| Remover | Tirar de um grupo sem apagar | Retirar |
| Arquivar | Tirar de circulação mantendo o registro | Ocultar, desativar |
| Cancelar | Desistir sem salvar | Descartar |
| Fechar | Fechar sem efeito | Sair |
| Voltar | Ir à tela anterior | Retornar |
| Enviar | Mandar para pessoa ou etapa | Submeter |
| Concluir | Finalizar tarefa ou fluxo | Finalizar, terminar |
| Buscar | Procurar por texto | Pesquisar, procurar |
| Filtrar | Restringir uma lista | Refinar |
| Exportar | Gerar arquivo a partir dos dados | Extrair |
| Baixar | Salvar arquivo que já existe | Download |
| Importar | Trazer dados de um arquivo | Carregar, subir |
| Enviar arquivo | Mandar arquivo para o sistema | Upload |
| Anexar | Ligar arquivo a um registro | Vincular arquivo |
| Duplicar | Copiar item dentro do sistema | Clonar |
| Entrar | Acessar a conta | Logar, login |
| Sair | Encerrar a sessão | Deslogar, logout |
| Tentar de novo | Repetir o que falhou | Tentar novamente |
| Desfazer | Reverter a última ação | Reverter |

### Termos de interface

| Usar | Evitar | Nota |
| --- | --- | --- |
| Painel | Dashboard | Tela de indicadores |
| Notificações | Alertas, avisos | |
| Configurações | Preferências, ajustes | |
| Conta | Perfil | "Perfil" só para dados públicos da pessoa |
| Aplicativos | Apps, sistemas | Produtos do hub de aplicações |
| Módulo | Seção, área | Grupo de funcionalidades de um aplicativo |
| E-mail | Email | Sempre com hífen |
| Pessoa responsável | Owner | |
| Equipe | Time, squad | |
| Prazo | Deadline | |
| Em breve | Coming soon | |

### Nomes próprios

| Grafia oficial | Evitar |
| --- | --- |
| Servfaz | ServFaz, SERVFAZ |
| Servi DS | ServiDS, Servi Ds |
| Gaia | GAIA, gaia |

## Checklist de revisão

```steps
- title: Forma
  body: Sentence case, pontuação certa, sem exclamação e sem travessão.
- title: Palavras
  body: Verbos e termos batem com o glossário. Botões dizem o que acontece.
- title: Mensagens
  body: Erros dizem o que aconteceu e o que fazer. Datas e valores no formato brasileiro.
- title: Acessibilidade
  body: "Botão só com ícone tem `aria-label`. Todo campo tem rótulo. Nada depende só de cor ou tooltip."
- title: Tamanho
  body: O texto cabe no limite do elemento.
```

```callout
variant: tip
title: Faltou um termo?
body: Termo novo entra no glossário antes de ir para a tela. Fale com o time do Servi DS.
```
