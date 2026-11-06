import * as React from "react"

import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-(--radius-lg) bg-(--color-palette-olive-subtle)",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
