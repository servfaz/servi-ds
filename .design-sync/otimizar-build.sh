#!/usr/bin/env bash
# Ajusta a cópia local dos scripts do design-sync (.ds-sync/) para gerar o
# artefato do Claude Design em modo produção e minificado.
# Rodar depois de copiar os scripts do design-sync de novo e antes do resync.
# Só mexe em .ds-sync/, que fica fora do Git; não altera o repositório.
set -euo pipefail
cd "$(dirname "$0")/../.ds-sync"
sed -i "s/'process.env.NODE_ENV': '\"development\"'/'process.env.NODE_ENV': '\"production\"'/; s/__DEV__: 'true'/__DEV__: 'false'/" \
  lib/bundle.mjs lib/emit.mjs lib/previews.mjs lib/source-storybook.mjs
grep -q "minify: true" lib/bundle.mjs || sed -i "s/    minify: false,/    minify: true, legalComments: 'none',/" lib/bundle.mjs
grep -q "minify: true" lib/emit.mjs || sed -i "s/      bundle: true, format: 'iife', outfile: join(out, '_vendor', 'react.js'),/      bundle: true, format: 'iife', outfile: join(out, '_vendor', 'react.js'), minify: true, legalComments: 'none',/" lib/emit.mjs
grep -q "minify: true" lib/previews.mjs || sed -i "s/        bundle: true, format: 'iife', globalName: '__dsPreview',/        bundle: true, format: 'iife', globalName: '__dsPreview', minify: true, legalComments: 'none',/" lib/previews.mjs
grep -q "minify: true" lib/source-storybook.mjs || sed -i "s/      bundle: true, format: 'iife', platform: 'browser', target: 'es2020',/      bundle: true, format: 'iife', platform: 'browser', target: 'es2020', minify: true, legalComments: 'none',/" lib/source-storybook.mjs
echo "Conferência (devem aparecer 4 linhas com production e 4 com minify: true):"
grep -n "\"production\"" lib/bundle.mjs lib/emit.mjs lib/previews.mjs lib/source-storybook.mjs
grep -n "minify: true" lib/bundle.mjs lib/emit.mjs lib/previews.mjs lib/source-storybook.mjs
