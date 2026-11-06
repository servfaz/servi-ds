import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

/**
 * Tabs do shadcn/ui (Radix), com o estilo sublinhado usado nas páginas de
 * componente (Documentação, Props, Tokens). Uso exclusivo do site de
 * documentação (Regra 11): nunca entra em registry.json.
 */
function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-8", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "flex w-full items-end gap-1 overflow-x-auto border-b border-[var(--color-taupe-300)] dark:border-[var(--color-taupe-700)]",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "-mb-px inline-flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent px-3 py-2.5 text-sm sm:px-4 font-semibold text-[var(--color-taupe-600)] transition-colors outline-none hover:text-[var(--color-taupe-950)] focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-brand-outline)] data-[state=active]:border-[var(--color-brand-outline)] data-[state=active]:text-[var(--color-taupe-950)] dark:text-[var(--color-taupe-400)] dark:hover:text-[var(--color-taupe-50)] dark:data-[state=active]:text-[var(--color-taupe-50)] [&_svg]:size-4 [&_svg]:shrink-0 max-sm:[&_svg]:hidden",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
