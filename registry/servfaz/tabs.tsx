"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

/*
 * Tabs - base do Tabs do shadcn com os tokens Semantic do Servi DS.
 * variant "segmented": trilho em background/muted, aba ativa em
 * background/default (troca de visão, como Clientes e Funcionários).
 * variant "line": abas sobre uma linha, ativa sublinhada (navegação de
 * página). Ícone Phosphor opcional antes do texto (16px).
 * Nasceu no código (barra do Data Table); Figma depois.
 */

type TabsVariant = "segmented" | "line"

const TabsVariantContext = React.createContext<TabsVariant>("segmented")

type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root> & {
  variant?: TabsVariant
}

function Tabs({ className, variant = "segmented", ...props }: TabsProps) {
  return (
    <TabsVariantContext.Provider value={variant}>
      <TabsPrimitive.Root
        data-slot="tabs"
        data-variant={variant}
        className={cn("flex flex-col gap-4", className)}
        {...props}
      />
    </TabsVariantContext.Provider>
  )
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  const variant = React.useContext(TabsVariantContext)
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex w-fit max-w-full items-center overflow-x-auto",
        variant === "segmented" &&
          "gap-0.5 rounded-full bg-(--color-background-muted) p-1",
        variant === "line" && "w-full gap-4 border-b border-(--color-border-default)",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const variant = React.useContext(TabsVariantContext)
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap outline-none",
        "typo-sans-sm-medium text-(--color-foreground-muted) transition-[color,background-color,box-shadow,border-color] duration-150",
        "hover:text-(--color-foreground-emphasis) disabled:pointer-events-none disabled:text-(--color-foreground-subtle)",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "focus-visible:shadow-[inset_0_0_0_2px_var(--color-brand-border-focus)]",
        variant === "segmented" && [
          "h-8 rounded-full px-3",
          "data-[state=active]:bg-(--color-background-default) data-[state=active]:text-(--color-foreground-emphasis) data-[state=active]:shadow-xs",
        ],
        variant === "line" && [
          "-mb-px h-10 border-b-2 border-transparent px-0.5",
          "data-[state=active]:border-(--color-foreground-emphasis) data-[state=active]:text-(--color-foreground-emphasis)",
        ],
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
export type { TabsProps, TabsVariant }
