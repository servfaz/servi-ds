"use client"

import * as React from "react"
import { BellIcon, MagnifyingGlassIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SearchBar, type SearchBarProps } from "@/components/ui/search-bar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { AppLauncher, type AppLauncherApp } from "@/components/app-launcher"

/*
 * AppHeader - cabeçalho do bloco App Shell, fora do painel e por cima da
 * Sidebar, no modelo do GitLab: logo à esquerda, busca no centro e, à direita,
 * notificações, hub de aplicações (modelo do Google) e avatar.
 * Altura em --header-height, definida no page.tsx (mesmo padrão do bloco
 * sidebar-16 do shadcn).
 */

type AppHeaderBrand = {
  name: string
  url?: string
  /** Logo do sistema. Sem logo, mostra as iniciais do nome. */
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

const insetFocus =
  "outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--color-border-focus)]"

const quietAction =
  "text-(--color-icon-subtle) hover:bg-(--color-background-neutral-default-hover) hover:text-(--color-icon-default) active:bg-(--color-background-neutral-default-pressed)"

function AppHeader({
  className,
  brand = defaultBrand,
  search,
  showSearch = true,
  onMobileSearchClick,
  searchLabel = "Buscar",
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
        "sticky top-0 z-50 flex h-(--header-height) w-full shrink-0 items-center gap-(--space-inline-md) bg-(--color-background-sunken) px-(--space-inset-md)",
        className
      )}
      {...props}
    >
      {/* No celular a Sidebar vira Sheet e abre por este botão. */}
      <SidebarTrigger className="md:hidden" />

      <a
        href={brand.url ?? "/"}
        data-slot="app-header-brand"
        className={cn(
          "flex shrink-0 items-center gap-(--space-inline-sm) rounded-(--radius-control-md) p-1",
          insetFocus
        )}
      >
        <span
          aria-hidden
          className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-(--radius-control-md) bg-(--color-background-brand-bold) text-xs font-bold text-(--color-text-on-brand)"
        >
          {brand.logo ?? initials(brand.name)}
        </span>
        <span className="hidden text-sm font-semibold text-(--color-text-default) lg:inline">
          {brand.name}
        </span>
      </a>

      <div className="hidden min-w-0 flex-1 justify-center sm:flex">
        {showSearch ? (
          <SearchBar
            {...search}
            className={cn("max-w-(--size-container-md)", search?.className)}
          />
        ) : null}
      </div>
      <div className="flex-1 sm:hidden" />

      {/* Ações à direita nunca encolhem: quem diminui é a busca. */}
      <div className="flex shrink-0 items-center gap-(--space-inline-xs)">
        {showSearch ? (
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label={searchLabel}
            title={searchLabel}
            className={cn("sm:hidden", quietAction)}
            onClick={onMobileSearchClick}
          >
            <MagnifyingGlassIcon className="size-5" />
          </Button>
        ) : null}
        <Button
          variant="ghost"
          size="icon-lg"
          aria-label={notificationsText}
          title={notificationsText}
          data-slot="app-header-notifications"
          className={cn("relative", quietAction)}
          onClick={onNotificationsClick}
        >
          <BellIcon className="size-5" />
          {notifications > 0 ? (
            <span
              aria-hidden
              className="absolute -top-0.5 -right-0.5 min-w-5 rounded-full bg-(--color-background-danger-bold) px-1 text-center text-[11px] leading-5 font-semibold text-(--color-text-on-bold) ring-2 ring-(--color-background-sunken)"
            >
              {notifications > 9 ? "9+" : notifications}
            </span>
          ) : null}
        </Button>

        <AppLauncher apps={apps} label={appsLabel} />

        <Button
          variant="ghost"
          size="icon-lg"
          data-slot="app-header-account"
          aria-label={`${accountLabel}: ${user.name}`}
          title={user.name}
          className="rounded-full hover:bg-(--color-background-neutral-default-hover)"
          onClick={onAccountClick}
        >
          <span
            aria-hidden
            className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-(--color-background-brand-bold) text-xs font-semibold text-(--color-text-on-brand)"
          >
            {user.avatar ?? initials(user.name)}
          </span>
        </Button>
      </div>
    </header>
  )
}

export { AppHeader }
export type { AppHeaderProps, AppHeaderUser, AppHeaderBrand }
