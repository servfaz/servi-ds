# Servi DS

Design system da Servfaz. Reúne as decisões visuais e de interação dos produtos da empresa em um só lugar: cores, tipografia, espaçamento, ícones e componentes de interface prontos para uso.

**Documentação:** [ds.servfaz.app](https://ds.servfaz.app/)

> O Servi DS é de uso exclusivo dos sistemas da Servfaz. Não é destinado a projetos externos ou de terceiros.

## O que tem aqui

- **Design tokens.** Valores de design nomeados, em duas camadas: primitiva (paleta base do Tailwind) e semântica (intenção de uso, com tema claro e escuro).
- **Componentes.** Componentes de interface construídos sobre o shadcn/ui, com a identidade visual da Servfaz aplicada.
- **Blocos.** Composições maiores, como o App Shell, que cada sistema copia e adapta.
- **Documentação.** Site em Storybook, publicado em [ds.servfaz.app](https://ds.servfaz.app/).

## Como funciona

1. O design nasce no Figma, nos dois arquivos oficiais: [Variables](https://www.figma.com/design/FJY9bl17wrv2Qy6faoib66/-SF-DS--Variables) (tokens) e [Components](https://www.figma.com/design/ipQKV07jFEBsLxIv5tt1qI/-SF-DS--Components) (biblioteca de componentes).
2. Tokens e componentes são implementados neste repositório.
3. Cada mudança publicada gera uma entrada no [CHANGELOG](./CHANGELOG.md). No dia 1 de cada mês, essas entradas viram uma nova versão no GitHub Releases.
4. Os sistemas cadastrados como consumidores recebem as atualizações por Pull Request automática (Merge Request, quando o repositório está no GitLab). O time do sistema só revisa e aprova.

Os componentes mantêm o mesmo contrato de props do shadcn/ui (`variant`, `size` etc.). Uma tela existente recebe a atualização visual sem mudar código.

## Como instalar

### Pré-requisitos

- Node.js LTS
- Next.js com App Router
- Tailwind CSS
- shadcn/ui inicializado (`npx shadcn@latest init`)

### Opção 1: cadastro como consumidor (recomendado)

Peça ao time do Servi DS para cadastrar o repositório do seu sistema. Depois do cadastro:

- um robô abre uma Pull Request com todos os componentes publicados;
- cada atualização nova chega como uma nova Pull Request, com o diff da mudança;
- o único passo manual é revisar e aprovar.

Repositórios no GitHub e no GitLab entram no mesmo cadastro. No GitLab, as atualizações chegam como Merge Request.

### Opção 2: instalação imediata

Para ter os componentes na hora, rode o script na raiz do projeto, com o `components.json` já criado:

```bash
bash instalar-servi-ds.sh
```

O script fica em [`templates/instalar-servi-ds.sh`](./templates/instalar-servi-ds.sh) e exige `curl`, `jq`, `node` e `sed`. Ele instala o catálogo publicado até o momento, mas não traz atualizações futuras. Para isso, use a opção 1.

### Ícones

O Servi DS usa só [Phosphor Icons](https://phosphoricons.com/):

```bash
npm install @phosphor-icons/react
```

O passo a passo completo está no [guia para desenvolvedores](https://ds.servfaz.app/docs/desenvolvedores).

## Regras de uso

- Use sempre tokens (`var(--nome-do-token)`). Nada de hexadecimal ou pixel solto.
- O tema escuro já vem resolvido nos tokens. Não escreva lógica de tema dentro do componente.
- Faltou um token, variante ou componente? Fale com o time do Servi DS antes de criar uma versão própria.

## Componentes publicados

Todos os componentes do catálogo e o bloco App Shell estão em [ds.servfaz.app](https://ds.servfaz.app/).

O App Shell não entra nas atualizações automáticas, porque cada sistema adapta a página e os componentes dele. Um sistema novo pode pedir para recebê-lo junto com o cadastro. Um sistema que já existe instala uma vez e adapta:

```bash
npx shadcn@latest add https://ds.servfaz.app/r/app-shell.json
```

## Documentação

| O quê | Link |
| --- | --- |
| Site do Servi DS | [ds.servfaz.app](https://ds.servfaz.app/) |
| Guia para desenvolvedores | [Desenvolvedores](https://ds.servfaz.app/docs/desenvolvedores) |
| Sobre o Servi DS | [Sobre](https://ds.servfaz.app/docs/sobre) |
| Documentação para IA | [llms.txt](https://ds.servfaz.app/llms.txt) e [llms-full.txt](https://ds.servfaz.app/llms-full.txt) |
| Figma: tokens | [SF DS Variables](https://www.figma.com/design/FJY9bl17wrv2Qy6faoib66/-SF-DS--Variables) |
| Figma: componentes | [SF DS Components](https://www.figma.com/design/ipQKV07jFEBsLxIv5tt1qI/-SF-DS--Components) |
| Histórico de mudanças | [CHANGELOG.md](./CHANGELOG.md) |
| Índice completo da documentação | [INDICE.md](./INDICE.md) |

## Desenvolvimento local

```bash
npm install
npm run dev        # Storybook em http://localhost:6006
npm run build      # build completo do site
npm run typecheck  # checagem de tipos
```

Regras para quem trabalha no código deste repositório: [`.claude/CLAUDE.md`](./.claude/CLAUDE.md).
