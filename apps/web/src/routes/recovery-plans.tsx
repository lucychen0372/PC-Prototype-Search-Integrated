import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '~/components/common'

export const Route = createFileRoute('/recovery-plans')({
  component: RecoveryPlansPage,
})

function RecoveryPlansPage() {
  return <PageHeader title="Recovery Plans" />
}
