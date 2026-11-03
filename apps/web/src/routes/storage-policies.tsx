import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '~/components/common'

export const Route = createFileRoute('/storage-policies')({
  component: StoragePoliciesPage,
})

function StoragePoliciesPage() {
  return <PageHeader title="Storage Policies" />
}
