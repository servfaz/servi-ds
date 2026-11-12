import * as React from 'react';
import * as S from "@ds-stories/storybook/componentes/chart.stories";
import { Area as RArea, Bar as RBar, Line as RLine } from "recharts";

// A animação de entrada do Recharts roda em JavaScript (1,5 s) e ignora o
// congelamento de animações da captura: a comparação pegava a série pela
// metade. Sem animação, o gráfico renderiza já completo. Ver NOTES.md.
let semAnimacao = false;
function desligarAnimacao() {
  if (semAnimacao) return;
  semAnimacao = true;
  for (const C of [RArea, RBar, RLine] as any[]) if (C) C.defaultProps = { ...(C.defaultProps ?? {}), isAnimationActive: false };
}

function compose(S: any, key: string) {
  desligarAnimacao();
  const meta: any = S.default ?? {};
  const st: any = S[key];
  const args: any = { ...(meta.args ?? {}), ...(st && st.args ? st.args : {}) };
  // Storybook resolves argTypes.mapping (control value -> real arg) before
  // rendering; mirror that so mapped args don't render raw.
  const at: any = { ...(meta.argTypes ?? {}), ...(st && st.argTypes ? st.argTypes : {}) };
  for (const k of Object.keys(args)) {
    const m = at[k] && at[k].mapping;
    if (m && typeof m === 'object' && args[k] in m) args[k] = m[args[k]];
  }
  const title: string = typeof meta.title === 'string' ? meta.title : '';
  const ctx: any = {
    args, name: key, title, kind: title, id: '', componentId: '',
    globals: {}, viewMode: 'story',
    parameters: (st && st.parameters) ?? meta.parameters ?? {},
  };
  let render: (() => any) | null = null;
  if (st && typeof st.render === 'function') render = () => st.render(args, ctx);
  else if (typeof st === 'function') render = () => st(args, ctx);
  else if (typeof meta.render === 'function') render = () => meta.render(args, ctx);
  else {
    const C = (st && st.component) || meta.component;
    if (C) render = () => React.createElement(C, args);
  }
  if (!render) return () => null;
  // [].concat: a single function is legal CSF decorator shorthand. A
  // decorator returning undefined (stubbed addon) falls through to the inner
  // render — otherwise one unrecognized addon blanks the cell silently.
  const decorators: any[] = ([] as any[]).concat((st && st.decorators) ?? []).concat(meta.decorators ?? []);
  return decorators.reduce((inner: any, dec: any) => () => {
    const out = dec(inner, ctx);
    return out === undefined ? inner() : out;
  }, render);
}

export const Playground = /* Playground */ compose(S, "Playground");
export const Linha = /* Linha */ compose(S, "Linha");
export const Area = /* Área */ compose(S, "Area_");
