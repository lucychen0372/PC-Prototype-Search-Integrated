import { createFileRoute } from '@tanstack/react-router'
import { NivaChatStubPage } from '~/components/SearchResultsV1Page'
import { INVESTIGATION_QUERY } from '~/components/niva-investigation/NivaInvestigationPanel'

export const Route = createFileRoute('/niva-chat')({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === 'string' ? search.q : INVESTIGATION_QUERY,
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { q } = Route.useSearch()

  return <NivaChatStubPage query={q} />
}
