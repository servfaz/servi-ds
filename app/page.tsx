import * as React from "react"
import { OpenInV0Button } from "@/components/open-in-v0-button"
import { HelloWorld } from "@/registry/new-york/blocks/hello-world/hello-world"
import { ExampleForm } from "@/registry/new-york/blocks/example-form/example-form"
import PokemonPage from "@/registry/new-york/blocks/complex-component/page"
import { ExampleCard } from "@/registry/new-york/blocks/example-with-css/example-card"
import { Button } from "@/registry/servfaz/button"
import registry from "@/registry.json"

// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
  return (
    <div className="flex h-svh overflow-hidden bg-background text-foreground">
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border">
        <div className="px-4 py-5 border-b border-border">
          <span className="text-base font-semibold tracking-tight">
            Servi DS
          </span>
          <p className="text-xs text-muted-foreground">Registry Servfaz</p>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <p className="px-2 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Componentes
          </p>
          <ul className="flex flex-col gap-1">
            {registry.items.map((item) => (
              <li key={item.name}>
                <a
                  href={`#${item.name}`}
                  className="block rounded-md px-2 py-1.5 text-sm text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {item.title ?? item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="flex items-center justify-between border-b border-border px-4 py-4 md:hidden">
          <span className="text-base font-semibold tracking-tight">
            Servi DS
          </span>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-8 md:px-8">
          <div className="max-w-3xl mx-auto flex flex-col gap-8">
            <div
              id="button"
              className="flex flex-col gap-4 border rounded-lg p-4 relative scroll-mt-8"
            >
              <h2 className="text-sm text-muted-foreground sm:pl-3">
                Button — teste dos tokens Servfaz (default e secondary)
              </h2>
              <div className="flex flex-wrap items-center gap-4 p-3">
                <Button variant="default">Default</Button>
                <Button variant="default" disabled>
                  Default disabled
                </Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="secondary" disabled>
                  Secondary disabled
                </Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            <div
              id="hello-world"
              className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative scroll-mt-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-muted-foreground sm:pl-3">
                  A simple hello world component
                </h2>
                <OpenInV0Button name="hello-world" className="w-fit" />
              </div>
              <div className="flex items-center justify-center min-h-[400px] relative">
                <HelloWorld />
              </div>
            </div>

            <div
              id="example-form"
              className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative scroll-mt-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-muted-foreground sm:pl-3">
                  A contact form with Zod validation.
                </h2>
                <OpenInV0Button name="example-form" className="w-fit" />
              </div>
              <div className="flex items-center justify-center min-h-[500px] relative">
                <ExampleForm />
              </div>
            </div>

            <div
              id="complex-component"
              className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative scroll-mt-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-muted-foreground sm:pl-3">
                  A complex component showing hooks, libs and components.
                </h2>
                <OpenInV0Button name="complex-component" className="w-fit" />
              </div>
              <div className="flex items-center justify-center min-h-[400px] relative">
                <PokemonPage />
              </div>
            </div>

            <div
              id="example-with-css"
              className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative scroll-mt-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-muted-foreground sm:pl-3">
                  A login form with a CSS file.
                </h2>
                <OpenInV0Button name="example-with-css" className="w-fit" />
              </div>
              <div className="flex items-center justify-center min-h-[400px] relative">
                <ExampleCard />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
