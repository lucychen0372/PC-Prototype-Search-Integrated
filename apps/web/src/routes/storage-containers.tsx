import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '~/components/common'

export const Route = createFileRoute('/storage-containers')({
  component: StorageContainersPage,
})

function StorageContainersPage() {
  return <PageHeader title="Storage Containers" />
}
