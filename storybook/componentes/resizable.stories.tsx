import type { Meta, StoryObj } from "@storybook/react-vite"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/registry/servfaz/resizable"

const painel = "flex h-full items-center justify-center p-6 typo-sans-sm-semibold"

const meta = {
  title: "Componentes/Resizable",
  component: ResizablePanelGroup,
  args: { direction: "horizontal" },
  argTypes: { direction: { control: "inline-radio", options: ["horizontal", "vertical"] } },
} satisfies Meta<typeof ResizablePanelGroup>

export default meta
type Story = StoryObj<typeof meta>

/** Arraste a divisória. */
export const Playground: Story = {
  render: (args) => (
    <ResizablePanelGroup {...args} className="min-h-64 max-w-md rounded-(--radius-xl) border border-(--color-border-default)">
      <ResizablePanel defaultSize={35}>
        <div className={painel}>Lista</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={65}>
        <div className={painel}>Detalhe</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}
