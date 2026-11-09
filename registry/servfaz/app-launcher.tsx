"use client"

import * as React from "react"
import type { Icon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

/*
 * AppLauncher - hub de aplicações, espelho do "App Launcher" e do "App
 * Launcher Item" do Figma ([SDS] Components, seção CUSTOM). Lista outros
 * sistemas (não módulos deste sistema) em grade de 3 colunas.
 * Item: logo de 40px e nome em Sans/xs/regular; hover em
 * palette/olive/light-hover; aplicação atual em brand/selected com o nome em
 * Sans/xs/medium.
 * A lista de aplicações chega pela prop `apps`.
 */

/*
 * Ícone customizado do gatilho (fonte: public/assets/icons/dots-nine-custom.svg).
 * Inline com currentColor para herdar o token de cor do botão e funcionar nos
 * sistemas consumidores, que não têm a pasta public do DS.
 */
function DotsNineCustomIcon(props: React.SVGProps<SVGSVGElement>) {
  const positions = [3.333, 10, 16.667]
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      {positions.map((cy) =>
        positions.map((cx) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={2.333} />
        ))
      )}
    </svg>
  )
}

type AppLauncherApp = {
  name: string
  url: string
  /** Logo do sistema (40px). Sem logo, mostra o ícone. */
  logo?: React.ReactNode
  icon?: Icon
  /** Aplicação aberta agora. */
  current?: boolean
}

type AppLauncherProps = {
  apps: AppLauncherApp[]
  /** Nome acessível do botão. */
  label?: string
  /** Título dentro do painel. */
  title?: string
  className?: string
}

function AppLauncher({
  apps,
  label = "Aplicativos",
  title = "Seus aplicativos",
  className,
}: AppLauncherProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          aria-label={label}
          title={label}
          data-slot="app-launcher-trigger"
          className={cn(
            "text-(--color-foreground-default) hover:bg-(--color-palette-olive-light-hover) active:bg-(--color-palette-olive-light-pressed) data-[state=open]:bg-(--color-palette-olive-light-hover)",
            className
          )}
        >
          <DotsNineCustomIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        data-slot="app-launcher"
        className="flex w-86.5 flex-col gap-4"
      >
        <p className="typo-sans-sm-medium text-(--color-foreground-emphasis)">
          {title}
        </p>
        <ul className="grid grid-cols-3 gap-1">
          {apps.map((app) => {
            const AppIcon = app.icon
            return (
              <li key={app.name}>
                <a
                  href={app.url}
                  aria-current={app.current ? "page" : undefined}
                  data-slot="app-launcher-item"
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-(--radius-lg) px-2 py-1 text-center outline-none",
                    "typo-sans-xs-regular text-(--color-foreground-emphasis)",
                    "transition-[background-color,box-shadow] duration-150",
                    "hover:bg-(--color-palette-olive-light-hover)",
                    "focus-visible:shadow-[inset_0_0_0_2px_var(--color-brand-border-focus)]",
                    "aria-[current=page]:bg-(--color-brand-selected) aria-[current=page]:typo-sans-xs-medium aria-[current=page]:hover:bg-(--color-brand-selected-hover)"
                  )}
                >
                  <span className="flex size-10 items-center justify-center overflow-hidden rounded-(--radius-lg) bg-(--color-brand-subtle) text-(--color-brand-foreground-default) [&_svg]:size-6">
                    {app.logo ?? (AppIcon ? <AppIcon weight="duotone" /> : null)}
                  </span>
                  <span className="line-clamp-2 w-full">{app.name}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </PopoverContent>
    </Popover>
  )
}

export { AppLauncher }
export type { AppLauncherApp, AppLauncherProps }
