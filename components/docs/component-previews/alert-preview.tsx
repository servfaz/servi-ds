import { WarningCircleIcon } from "@phosphor-icons/react/dist/ssr"
import { Alert, AlertDescription, AlertTitle } from "@/registry/servfaz/alert"
import { textMuted } from "@/lib/doc-styles"

export function AlertPreview() {
  return (
    <div className="flex flex-col gap-6 rounded-lg border border-[var(--color-taupe-300)] bg-[var(--color-white)] p-6 dark:bg-[var(--color-taupe-900)]">
      <div className="flex flex-col gap-2">
        <span className={`text-xs uppercase tracking-wide ${textMuted}`}>
          Warning
        </span>
        <Alert variant="warning">
          <WarningCircleIcon />
          <AlertTitle>Uso exclusivo</AlertTitle>
          <AlertDescription>
            O Servi DS é de uso exclusivo dos sistemas da Servfaz.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
