import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '~/components/common'

export const Route = createFileRoute('/volume-groups')({
  component: VolumeGroupsPage,
})

function VolumeGroupsPage() {
  return <PageHeader title="Volume Groups" />
}
