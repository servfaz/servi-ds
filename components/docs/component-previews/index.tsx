import type { ComponentType } from "react"
import { ButtonPreview } from "@/components/docs/component-previews/button-preview"

/**
 * Regra 8 (documentacao-design.md): "grade de estados" é um componente
 * próprio, com o(s) componente(s) real(is) do registry, não uma descrição
 * estática. Cada item publicado que tiver uma pré-visualização ao vivo
 * entra aqui pelo mesmo nome usado no registry.json.
 */
export const componentPreviews: Record<string, ComponentType> = {
  button: ButtonPreview,
}
