"use client"

import * as React from "react"
import {
  ChartLineIcon,
  ChatsCircleIcon,
  CurrencyCircleDollarIcon,
  DotsNineIcon,
  FolderIcon,
  GlobeIcon,
  LifebuoyIcon,
  PackageIcon,
  TruckIcon,
  type Icon,
} from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

/*
 * AppLauncher - hub de aplicações, no modelo do menu de apps do Google.
 * Lista outros sistemas (não módulos deste sistema) em grade de 3 colunas.
 * Arquivo de bloco: o sistema copia e edita a lista de aplicações.
 */

type AppLauncherApp = {
  name: string
  url: string
  icon: Icon
  /** Aplicação aberta agora. */
  current?: boolean
}

type AppLauncherProps = {
  apps?: AppLauncherApp[]
  label?: string
  className?: string
}

const defaultApps: AppLauncherApp[] = [
  { name: "Conecta", url: "#", icon: ChatsCircleIcon, current: true },
  { name: "Chamados", url: "#", icon: LifebuoyIcon },
  { name: "Financeiro", url: "#", icon: CurrencyCircleDollarIcon },
  { name: "Suprimentos", url: "#", icon: PackageIcon },
  { name: "Frota", url: "#", icon: TruckIcon },
  { name: "Documentos", url: "#", icon: FolderIcon },
  { name: "Relatórios", url: "#", icon: ChartLineIcon },
  { name: "Portal", url: "#", icon: GlobeIcon },
]

const quietAction =
  "text-(--color-icon-subtle) hover:bg-(--color-background-neutral-default-hover) hover:text-(--color-icon-default) active:bg-(--color-background-neutral-default-pressed) data-[state=open]:bg-(--color-background-neutral-default-hover) data-[state=open]:text-(--color-icon-default)"

function AppLauncher({
  apps = defaultApps,
  label = "Aplicativos",
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
          className={cn(quietAction, className)}
        >
          <DotsNineIcon weight="bold" className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        data-slot="app-launcher"
        className="w-80 p-(--space-inset-sm)"
      >
        <p className="px-2 pt-1 pb-2 text-xs font-medium text-(--color-text-subtle)">
          {label}
        </p>
        <ul className="grid grid-cols-3 gap-1">
          {apps.map((app) => {
            const AppIcon = app.icon
            return (
              <li key={app.name}>
                <a
                  href={app.url}
                  aria-current={app.current ? "page" : undefined}
                  className={cn(
                    "flex flex-col items-center gap-(--space-stack-sm) rounded-(--radius-control-md) px-2 py-3 text-center text-xs text-(--color-text-default) outline-none",
                    "hover:bg-(--color-background-neutral-subtle-hover) active:bg-(--color-background-neutral-subtle-pressed)",
                    "focus-visible:shadow-[inset_0_0_0_2px_var(--color-border-focus)]",
                    "aria-[current=page]:bg-(--color-background-selected) aria-[current=page]:font-medium"
                  )}
                >
                  <span className="flex size-10 items-center justify-center rounded-(--radius-control-md) bg-(--color-background-brand-subtle) text-(--color-icon-brand)">
                    <AppIcon className="size-5" />
                  </span>
                  <span className="line-clamp-2">{app.name}</span>
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
