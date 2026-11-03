import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '~/components/common'

export const Route = createFileRoute('/vm-recovery-points')({
  component: VmRecoveryPointsPage,
})

function VmRecoveryPointsPage() {
  return <PageHeader title="VM Recovery Points" />
}
