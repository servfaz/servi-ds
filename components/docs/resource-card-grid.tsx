import { ResourceCard, type ResourceCardData } from "@/components/docs/resource-card"

export function ResourceCardGrid({ cards }: { cards: ResourceCardData[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cards.map((card) => (
        <ResourceCard key={card.href + card.title} {...card} />
      ))}
    </div>
  )
}
