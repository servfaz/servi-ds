import { addons } from "storybook/manager-api"
import { create } from "storybook/theming"

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Servi DS",
    brandUrl: "/",
    brandImage: "/brand/logo-servi-complete-default.svg",
    brandTarget: "_self",
  }),
  sidebar: { showRoots: true },
})
