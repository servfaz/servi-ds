# Templates de propagacao (Passos 4 e 5 da Fase 3)

Material de apoio para o time de dev configurar cada sistema consumidor,
descrito por extenso em `plano-de-restilizacao-do-design-system.md`
(projeto Claude "Servi DS"). Nada aqui roda neste repositorio: servi-ds e a
fonte do registry, nao um consumidor.

## Passo 4: apontar o sistema consumidor para o registry Servfaz

No `components.json` do sistema consumidor, dentro da chave `registries`
(criar se ainda nao existir), adicionar:

```json
{
  "registries": {
    "@servfaz-ds": "https://ds.servfaz.app/r/{name}.json"
  }
}
```

Se o sistema ja tiver outro registry configurado (ex. `@plate` do Plate.js),
so acrescentar a entrada `@servfaz-ds` ao lado, sem remover as existentes.

Testar antes de automatizar:

```
npx shadcn view @servfaz-ds/button
npx shadcn add @servfaz-ds/button
```

## Passo 5: workflow de atualizacao automatica

Copiar `update-servfaz-ds.yml` deste diretorio para
`.github/workflows/update-servfaz-ds.yml` no sistema consumidor. Feito uma
vez por sistema, nao se repete a cada componente novo (a lista de
componentes e lida direto do `registry.json` publicado a cada execucao).

## Passo 6 (unico manual recorrente)

Revisar o diff visual e funcional de cada PR aberto pelo workflow antes de
aprovar o merge.