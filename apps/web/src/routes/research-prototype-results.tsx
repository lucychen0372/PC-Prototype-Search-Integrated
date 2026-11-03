import { createFileRoute } from '@tanstack/react-router'
import { ResearchPrototypeResultsPage } from '~/components/research-prototype/ResearchPrototypePage'
import type {
  ScenarioId,
  VariationId,
} from '~/components/research-prototype/ResearchPrototypePage'

const isScenario = (value: unknown): value is ScenarioId =>
  value === 'entity-lookup' ||
  value === 'investigation' ||
  value === 'scoped-view'

const isVariation = (value: unknown): value is VariationId =>
  value === 'v1' || value === 'v2' || value === 'v3'

export const Route = createFileRoute('/research-prototype-results')({
  validateSearch: (search: Record<string, unknown>) => ({
    scenario: isScenario(search.scenario) ? search.scenario : 'entity-lookup',
    variation: isVariation(search.variation) ? search.variation : 'v1',
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { scenario, variation } = Route.useSearch()

  return (
    <ResearchPrototypeResultsPage scenario={scenario} variation={variation} />
  )
}
