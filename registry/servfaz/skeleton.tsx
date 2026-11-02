import * as React from "react"

import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-(--radius-control-md) bg-(--color-background-neutral-default)",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
