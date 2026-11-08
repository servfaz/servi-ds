import type { ComponentType } from "react"
import type { IconWeight } from "@phosphor-icons/react"
import {
  AtomIcon,
  BookOpenTextIcon,
  ChatCircleDotsIcon,
  CheckCircleIcon,
  CircleHalfIcon,
  CubeIcon,
  FileTextIcon,
  GitPullRequestIcon,
  ListBulletsIcon,
  RocketLaunchIcon,
  ShapesIcon,
  SwatchesIcon,
  TerminalWindowIcon,
  UserPlusIcon,
} from "@phosphor-icons/react"
import { NextLogo, NodeLogo, ShadcnLogo, TailwindLogo } from "./brand-icons"

type DocIcon = ComponentType<{ className?: string; weight?: IconWeight }>

/**
 * Ícones que os blocos visuais do markdown (icon-cards, flow) aceitam pelo
 * nome, no campo `icon`. Nome desconhecido não mostra ícone. As tecnologias
 * citadas (node, next, tailwind, shadcn) usam o próprio logo.
 */
const DOC_ICONS: Record<string, DocIcon> = {
  ajuda: ChatCircleDotsIcon,
  arquivo: FileTextIcon,
  cadastro: UserPlusIcon,
  check: CheckCircleIcon,
  componente: CubeIcon,
  icones: ShapesIcon,
  livro: BookOpenTextIcon,
  lista: ListBulletsIcon,
  next: NextLogo,
  node: NodeLogo,
  pr: GitPullRequestIcon,
  publicar: RocketLaunchIcon,
  react: AtomIcon,
  shadcn: ShadcnLogo,
  tailwind: TailwindLogo,
  tema: CircleHalfIcon,
  terminal: TerminalWindowIcon,
  tokens: SwatchesIcon,
}

export function docIcon(name?: string): DocIcon | null {
  return name ? DOC_ICONS[name] ?? null : null
}
