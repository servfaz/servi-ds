import { HOME_HREF, toStorybookHref } from "../blocks/links"

/** Links principais do header (só em telas largas). */
export const NAV_LINKS = [
  { label: "Documentação", href: HOME_HREF },
  { label: "Componentes", href: toStorybookHref("/docs/componentes") },
]
