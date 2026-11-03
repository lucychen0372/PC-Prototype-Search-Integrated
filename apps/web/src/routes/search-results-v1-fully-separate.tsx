import { createFileRoute } from '@tanstack/react-router'
import { SearchResultsV1Page } from '~/components/SearchResultsV1Page'
import { INVESTIGATION_QUERY } from '~/components/niva-investigation/NivaInvestigationPanel'

export const Route = createFileRoute('/search-results-v1-fully-separate')({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === 'string' ? search.q : INVESTIGATION_QUERY,
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { q } = Route.useSearch()

  return <SearchResultsV1Page query={q} />
}
