import { Button } from "@/registry/servfaz/button"
import { textMuted } from "@/lib/doc-styles"

const variants = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
  "link",
] as const

const labels: Record<(typeof variants)[number], string> = {
  default: "Default",
  secondary: "Secondary",
  destructive: "Destructive",
  outline: "Outline",
  ghost: "Ghost",
  link: "Link",
}

export function ButtonPreview() {
  return (
    <div className="flex flex-col gap-6 rounded-lg border border-[var(--color-taupe-300)] bg-[var(--color-white)] p-6 dark:bg-[var(--color-taupe-900)]">
      <div className="flex flex-col gap-2">
        <span className={`text-xs uppercase tracking-wide ${textMuted}`}>
          Variantes
        </span>
        <div className="flex flex-wrap items-center gap-3">
          {variants.map((variant) => (
            <Button key={variant} variant={variant}>
              {labels[variant]}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className={`text-xs uppercase tracking-wide ${textMuted}`}>
          Disabled
        </span>
        <div className="flex flex-wrap items-center gap-3">
          {variants.map((variant) => (
            <Button key={variant} variant={variant} disabled>
              {labels[variant]}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
