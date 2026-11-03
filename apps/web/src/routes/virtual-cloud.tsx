import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '~/components/common'

export const Route = createFileRoute('/virtual-cloud')({
  component: VirtualCloudPage,
})

function VirtualCloudPage() {
  return <PageHeader title="Virtual Private Cloud" />
}
