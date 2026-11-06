"use client"

import * as React from "react"
import { BellIcon, MagnifyingGlassIcon, RobotIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SearchBar, type SearchBarProps } from "@/components/ui/search-bar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { AppLauncher, type AppLauncherApp } from "@/components/app-launcher"

/*
 * AppHeader - espelho do "App Header" do Figma ([SDS] Components, página App
 * Shell). Fica fora do painel e por cima das sidebars, no modelo do GitLab:
 * logo e nome do sistema à esquerda; busca e botão "Chat com GAIA" no centro;
 * notificações, hub de aplicações (modelo do Google) e avatar à direita.
 * Fundo background/muted, 56px de altura (--header-height, definida no
 * page.tsx).
 */

type AppHeaderBrand = {
  name: string
  url?: string
  /** Logo do sistema (24px). Sem logo, mostra as iniciais do nome. */
  logo?: React.ReactNode
}

type AppHeaderUser = {
  name: string
  /** Imagem do avatar. Sem imagem, mostra as iniciais. */
  avatar?: React.ReactNode
}

type AppHeaderProps = React.ComponentProps<"header"> & {
  brand?: AppHeaderBrand
  /** Props repassadas ao Search Bar. */
  search?: SearchBarProps
  showSearch?: boolean
  /** No celular a barra de busca não cabe: vira um botão que chama esta função. */
  onMobileSearchClick?: React.MouseEventHandler<HTMLButtonElement>
  searchLabel?: string
  /** Mostra o botão de chat com a IA (Gaia) ao lado da busca. */
  showAi?: boolean
  aiLabel?: string
  aiIcon?: React.ReactNode
  onAiClick?: React.MouseEventHandler<HTMLButtonElement>
  notifications?: number
  notificationsLabel?: string
  onNotificationsClick?: React.MouseEventHandler<HTMLButtonElement>
  /** Aplicações do hub. Sem a prop, usa a lista de exemplo do bloco. */
  apps?: AppLauncherApp[]
  appsLabel?: string
  user?: AppHeaderUser
  accountLabel?: string
  onAccountClick?: React.MouseEventHandler<HTMLButtonElement>
}

const defaultBrand: AppHeaderBrand = { name: "Nome do sistema", url: "/" }
const defaultUser: AppHeaderUser = { name: "Nome Sobrenome" }

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const first = parts[0]?.[0] ?? ""
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ""
  return (first + last).toUpperCase()
}

// Ações de ícone do cabeçalho: ghost com ícone neutro e hover neutro.
const headerAction =
  "text-(--color-foreground-default) hover:bg-(--color-palette-olive-light-hover) active:bg-(--color-palette-olive-light-pressed)"

function AppHeader({
  className,
  brand = defaultBrand,
  search,
  showSearch = true,
  onMobileSearchClick,
  searchLabel = "Buscar",
  showAi = true,
  aiLabel = "Chat com GAIA",
  aiIcon,
  onAiClick,
  notifications = 0,
  notificationsLabel = "Notificações",
  onNotificationsClick,
  apps,
  appsLabel,
  user = defaultUser,
  accountLabel = "Abrir menu da conta",
  onAccountClick,
  ...props
}: AppHeaderProps) {
  const notificationsText =
    notifications > 0
      ? `${notificationsLabel}: ${notifications} não lidas`
      : notificationsLabel

  return (
    <header
      data-slot="app-header"
      className={cn(
        "sticky top-0 z-50 flex h-(--header-height) w-full shrink-0 items-center gap-4 bg-(--color-background-muted) px-4",
        className
      )}
      {...props}
    >
      {/* No celular a Sidebar vira Sheet e abre por este botão. */}
      <SidebarTrigger className="md:hidden" />

      <a
        href={brand.url ?? "/"}
        data-slot="app-header-brand"
        className="flex shrink-0 items-center gap-1 rounded-(--radius-lg) outline-none focus-visible:shadow-[0_0_0_2px_var(--color-brand-border-focus)]"
      >
        <span
          aria-hidden
          className="flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-(--radius-md) bg-(--color-brand-filled) typo-sans-xxs-bold text-(--color-brand-foreground-on-filled)"
        >
          {brand.logo ?? initials(brand.name)}
        </span>
        <span className="hidden typo-sans-sm-semibold text-(--color-foreground-emphasis) lg:inline">
          {brand.name}
        </span>
      </a>

      <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 sm:flex">
        {showSearch ? (
          <SearchBar
            {...search}
            className={cn("max-w-80", search?.className)}
          />
        ) : null}
        {showAi ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="icon-lg"
                aria-label={aiLabel}
                data-slot="app-header-ai"
                onClick={onAiClick}
              >
                {aiIcon ?? <RobotIcon weight="fill" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{aiLabel}</TooltipContent>
          </Tooltip>
        ) : null}
      </div>
      <div className="flex-1 sm:hidden" />

      {/* Ações à direita nunca encolhem: quem diminui é a busca. */}
      <div className="flex shrink-0 items-center gap-1">
        {showSearch ? (
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label={searchLabel}
            title={searchLabel}
            className={cn("sm:hidden", headerAction)}
            onClick={onMobileSearchClick}
          >
            <MagnifyingGlassIcon />
          </Button>
        ) : null}
        <Button
          variant="ghost"
          size="icon-lg"
          aria-label={notificationsText}
          title={notificationsText}
          data-slot="app-header-notifications"
          className={cn("relative", headerAction)}
          onClick={onNotificationsClick}
        >
          <BellIcon />
          {notifications > 0 ? (
            <span
              aria-hidden
              className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-(--color-feedback-danger-filled) px-1 typo-sans-xs-medium text-(--color-feedback-danger-foreground-on-filled) ring-2 ring-(--color-border-muted)"
            >
              {notifications > 9 ? "9+" : notifications}
            </span>
          ) : null}
        </Button>

        <AppLauncher apps={apps} label={appsLabel} />

        <button
          type="button"
          data-slot="app-header-account"
          aria-label={`${accountLabel}: ${user.name}`}
          title={user.name}
          className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-(--color-border-default) bg-(--color-brand-filled) typo-sans-sm-semibold text-(--color-brand-foreground-on-filled) outline-none focus-visible:shadow-[0_0_0_1px_var(--color-brand-border-focus),0_0_0_4px_var(--color-brand-light-pressed)]"
          onClick={onAccountClick}
        >
          {user.avatar ?? initials(user.name)}
        </button>
      </div>
    </header>
  )
}

export { AppHeader }
export type { AppHeaderProps, AppHeaderUser, AppHeaderBrand }
