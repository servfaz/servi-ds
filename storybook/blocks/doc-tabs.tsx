import type { ReactNode } from "react"
import { BookOpenTextIcon, ListBulletsIcon, PaletteIcon } from "@phosphor-icons/react"
import type { DocTab } from "./frontmatter"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

/** Ícone Phosphor de cada aba conhecida da estrutura padrão. */
const TAB_ICONS: Record<string, ReactNode> = {
  documentacao: <BookOpenTextIcon />,
  props: <ListBulletsIcon />,
  tokens: <PaletteIcon />,
}

/**
 * Abas da página de componente (Documentação, Props, Tokens), no modelo
 * Documentation / Props / Styles API do Mantine. Cada aba é um título de
 * nível 1 do markdown; `renderTab` decide o que exibir dentro de cada uma.
 */
export function DocTabs({
  tabs,
  renderTab,
}: {
  tabs: DocTab[]
  renderTab: (tab: DocTab, index: number) => ReactNode
}) {
  return (
    <Tabs defaultValue={tabs[0]?.value}>
      <TabsList aria-label="Seções da página">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {TAB_ICONS[tab.value]}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, index) => (
        <TabsContent key={tab.value} value={tab.value}>
          {renderTab(tab, index)}
        </TabsContent>
      ))}
    </Tabs>
  )
}
