"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { CaretDownIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

/*
 * Accordion - base do Accordion do shadcn com os tokens Semantic do Servi DS.
 * Itens separados por borda default, título Sans/sm/medium e conteúdo que
 * abre com animação. O Figma já tem Accordion Item e Accordion.
 */

function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-(--color-border-default) last:border-b-0", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-start justify-between gap-4 rounded-(--radius-md) py-4 text-left outline-none",
          "font-(family-name:--typography-font-sans) typo-sans-sm-medium text-(--color-foreground-emphasis)",
          "transition-all hover:underline",
          "focus-visible:shadow-[inset_0_0_0_2px_var(--color-brand-border-focus)]",
          "disabled:pointer-events-none disabled:text-(--color-foreground-subtle)",
          "[&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <CaretDownIcon className="pointer-events-none size-4 shrink-0 translate-y-0.5 text-(--color-foreground-muted) transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden font-(family-name:--typography-font-sans) typo-sans-sm-regular text-(--color-foreground-default) data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
