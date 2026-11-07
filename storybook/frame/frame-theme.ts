import { create } from "storybook/theming"
import { tokenColor, tokenPx, tokenValue } from "./read-token"

/**
 * Tema da moldura do Storybook (barra lateral, barra de ferramentas e painel
 * de controles), montado a partir dos tokens semânticos do DS no modo claro.
 */
export function createFrameTheme() {
  return create({
    base: "light",
    brandTitle: "Servi DS",
    brandUrl: "/",
    brandImage: "/brand/servi-logo-horizontal.svg",
    brandTarget: "_self",

    colorPrimary: tokenColor("--color-brand-filled"),
    colorSecondary: tokenColor("--color-brand-filled"),

    appBg: tokenColor("--color-background-default"),
    appContentBg: tokenColor("--color-background-default"),
    appPreviewBg: tokenColor("--color-background-default"),
    appHoverBg: tokenColor("--color-brand-subtle"),
    appBorderColor: tokenColor("--color-border-default"),
    appBorderRadius: tokenPx("--radius-md"),

    fontBase: tokenValue("--typography-font-sans"),
    fontCode: tokenValue("--typography-font-mono"),

    textColor: tokenColor("--color-foreground-default"),
    textInverseColor: tokenColor("--color-foreground-inverse"),
    textMutedColor: tokenColor("--color-foreground-muted"),

    barTextColor: tokenColor("--color-foreground-muted"),
    barHoverColor: tokenColor("--color-brand-foreground-default"),
    barSelectedColor: tokenColor("--color-brand-foreground-default"),
    barBg: tokenColor("--color-background-default"),

    buttonBg: tokenColor("--color-background-default"),
    buttonBorder: tokenColor("--color-border-default"),
    booleanBg: tokenColor("--color-background-muted"),
    booleanSelectedBg: tokenColor("--color-background-default"),

    inputBg: tokenColor("--color-background-default"),
    inputBorder: tokenColor("--color-border-strong"),
    inputTextColor: tokenColor("--color-foreground-default"),
    inputBorderRadius: tokenPx("--radius-md"),
  })
}
