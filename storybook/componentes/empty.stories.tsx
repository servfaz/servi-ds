import type { Meta, StoryObj } from "@storybook/react-vite"
import { FolderOpenIcon, PlusIcon } from "@phosphor-icons/react"

import { Button } from "@/registry/servfaz/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/servfaz/empty"

const meta = {
  title: "Componentes/Empty",
  component: Empty,
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

/** Nenhum projeto ainda. */
export const Playground: Story = {
  render: (args) => (
    <Empty {...args} className="w-[28rem] border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpenIcon />
        </EmptyMedia>
        <EmptyTitle>Nenhum projeto ainda</EmptyTitle>
        <EmptyDescription>Crie o primeiro projeto para organizar as tarefas do time.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>
            <PlusIcon />
            Criar projeto
          </Button>
          <Button variant="outline">Importar</Button>
        </div>
      </EmptyContent>
    </Empty>
  ),
}
