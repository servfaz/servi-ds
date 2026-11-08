import type { ComponentType } from "react"
import type { IconWeight } from "@phosphor-icons/react"
import {
  ArrowsClockwiseIcon,
  AtomIcon,
  BookOpenTextIcon,
  ChatCircleDotsIcon,
  CheckCircleIcon,
  CircleHalfIcon,
  CodeIcon,
  CubeIcon,
  DevicesIcon,
  FileTextIcon,
  GitPullRequestIcon,
  LightningIcon,
  ListBulletsIcon,
  PersonArmsSpreadIcon,
  RocketLaunchIcon,
  ShapesIcon,
  StackIcon,
  SwatchesIcon,
  TerminalWindowIcon,
  UserPlusIcon,
} from "@phosphor-icons/react"
import { FigmaLogo, NextLogo, NodeLogo, ShadcnLogo, TailwindLogo } from "./brand-icons"

type DocIcon = ComponentType<{ className?: string; weight?: IconWeight }>

/**
 * Ícones que os blocos visuais do markdown (icon-cards, flow) aceitam pelo
 * nome, no campo `icon`. Nome desconhecido não mostra ícone. As tecnologias
 * citadas (node, next, tailwind, shadcn, figma) usam o próprio logo.
 */
const DOC_ICONS: Record<string, DocIcon> = {
  acessibilidade: PersonArmsSpreadIcon,
  ajuda: ChatCircleDotsIcon,
  arquivo: FileTextIcon,
  cadastro: UserPlusIcon,
  camadas: StackIcon,
  check: CheckCircleIcon,
  codigo: CodeIcon,
  componente: CubeIcon,
  figma: FigmaLogo,
  icones: ShapesIcon,
  livro: BookOpenTextIcon,
  lista: ListBulletsIcon,
  next: NextLogo,
  node: NodeLogo,
  pr: GitPullRequestIcon,
  produto: DevicesIcon,
  publicar: RocketLaunchIcon,
  react: AtomIcon,
  shadcn: ShadcnLogo,
  sincronizar: ArrowsClockwiseIcon,
  tailwind: TailwindLogo,
  tema: CircleHalfIcon,
  terminal: TerminalWindowIcon,
  tokens: SwatchesIcon,
  velocidade: LightningIcon,
}

export function docIcon(name?: string): DocIcon | null {
  return name ? DOC_ICONS[name] ?? null : null
}
