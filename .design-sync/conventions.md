# Servi DS: como construir com ele

Servi DS é o design system da Servfaz: componentes React (base shadcn/ui + Radix), Tailwind v4 e tokens CSS próprios. Textos de interface em português do Brasil.

## Montagem

- Carregue `styles.css` uma vez. Ele traz os tokens, as fontes (Figtree, Libre Baskerville, Geist Mono, via Google Fonts) e o CSS de todos os componentes. Sem ele, tudo renderiza sem estilo.
- Componentes ficam em `window.ServiDS.*`. Não há provider global obrigatório.
- Tema escuro: coloque a classe `dark` no `<html>`. Os tokens semânticos já trocam sozinhos; nunca escreva cor condicional por tema.
- Layout de sistema (cabeçalho, rail de módulos, sidebar, painéis de IA e notificações): use `AppShell`. Ele já inclui o `SidebarProvider`. Use `Sidebar` solto só dentro de um `SidebarProvider`.
- `Toaster` precisa estar montado uma vez na página para as notificações aparecerem.

## Estilo: tokens primeiro

As classes Tailwind disponíveis são só as que os componentes já usam (o CSS é compilado, não há gerador em tempo de execução). Uma classe inventada, como `bg-primary` ou `text-2xl`, não existe aqui e falha em silêncio. Para o seu próprio layout:

- Estrutura com as utilitárias comuns, que existem: `flex`, `grid`, `grid-cols-3`, `items-center`, `justify-between`, `gap-1` a `gap-8`, `p-4`, `p-6`, `px-4`, `py-2`, `w-full`, `h-full`, `max-w-sm`, `rounded-md`, `rounded-lg`, `text-xs`, `text-sm`, `text-base`, `text-lg`, `font-medium`, `font-semibold`, `font-bold`, `bg-background`, `bg-card`, `text-card-foreground`, `text-muted-foreground`.
- Para cor, tipografia e raio, use `style` com `var(--token)`:
  - Fundo: `--color-background-default`, `--color-background-subtle`, `--color-background-muted`
  - Texto: `--color-foreground-default`, `--color-foreground-emphasis`, `--color-foreground-muted`, `--color-foreground-subtle`
  - Borda: `--color-border-default`, `--color-border-muted`, `--color-border-strong`
  - Marca (verde Servfaz): `--color-brand-filled`, `--color-brand-foreground-on-filled`, `--color-brand-foreground-default`, `--color-brand-subtle`
  - Feedback: `--color-feedback-danger-*`, `--color-feedback-information-*`, `--color-feedback-discovery-*` (sufixos `filled`, `subtle`, `border`, `foreground-default`)
  - Tipografia: `--typography-font-sans`, `--typography-font-serif`, `--typography-font-mono`; tamanhos `--typography-{xs,sm,md,lg,xl,2xl,3xl}-font-size` com `-line-height` e `-letter-spacing` do mesmo nível
  - Raio: `--radius-sm`, `--radius-md`, `--radius-lg`
- Nunca escreva hex, rgb ou px solto para cor; sempre um token.
- Variante de componente vem por prop (`variant`, `size`), não por classe: `<Button variant="outline" size="sm">`.

## Ícones

Sempre Phosphor, pelos nomes `*Icon` em `window.ServiDS` (por exemplo `PlusIcon`, `MagnifyingGlassIcon`, `TrashIcon`, `GearIcon`, `UserIcon`, `CaretDownIcon`, `CheckIcon`, `XIcon`). Cerca de 240 ícones estão no bundle; confira o nome antes de usar. Nunca use outra biblioteca de ícones nem SVG solto.

## Onde ler

- `styles.css` e `_ds_bundle.css`: os tokens e as classes que existem de fato.
- `components/componentes/<Nome>/<Nome>.prompt.md`: props e exemplos de cada componente. Ignore as variantes chamadas `Teste: ...` (são testes de interação).

## Exemplo

```jsx
const { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input, PlusIcon } = window.ServiDS;

function NovoCliente() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Novo cliente</CardTitle>
        <CardDescription>Preencha os dados básicos.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Input placeholder="Nome completo" />
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm" style={{ color: "var(--color-foreground-muted)" }}>Campos obrigatórios</span>
          <Button><PlusIcon /> Adicionar</Button>
        </div>
      </CardContent>
    </Card>
  );
}
```
