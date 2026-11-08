import * as React from "react"
import { SpinnerIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

/*
 * Spinner - base do Spinner do shadcn com os tokens Semantic do Servi DS.
 * Ícone Spinner do Phosphor (8 traços) girando, na cor do texto em volta.
 * O Figma já tem Spinner no [SDS] Components (step 1 a 8).
 */

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <SpinnerIcon
      role="status"
      aria-label="Carregando"
      className={cn("size-4 animate-spin motion-reduce:animate-[spin_2s_linear_infinite]", className)}
      {...props}
    />
  )
}

export { Spinner }
