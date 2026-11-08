import { Unstyled } from "@storybook/addon-docs/blocks"
import { textMuted } from "./doc-styles"

/**
 * Rodapé de todas as páginas de documentação, com a autoria e os direitos
 * autorais da Servfaz. Peça exclusiva do site (Regra 11).
 */
export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <Unstyled>
      <footer
        className={`mt-16 flex flex-col gap-1 border-t border-[var(--color-border-default)] pt-6 pb-2 font-[family-name:var(--typography-font-sans)] text-xs sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${textMuted}`}
      >
        <p>
          <span className="font-semibold text-[var(--color-foreground-emphasis)]">Servi DS</span>
          {" · "}o design system da Servfaz
        </p>
        <p>© {year} Servfaz. Todos os direitos reservados.</p>
      </footer>
    </Unstyled>
  )
}
