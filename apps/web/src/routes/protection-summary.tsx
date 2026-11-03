import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '~/components/common'

export const Route = createFileRoute('/protection-summary')({
  component: ProtectionSummaryPage,
})

function ProtectionSummaryPage() {
  return <PageHeader title="Protection Summary" />
}
