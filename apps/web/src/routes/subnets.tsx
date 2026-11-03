import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '~/components/common'

export const Route = createFileRoute('/subnets')({
  component: SubnetsPage,
})

function SubnetsPage() {
  return <PageHeader title="Subnets" />
}
