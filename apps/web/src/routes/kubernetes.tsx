import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '~/components/common'

export const Route = createFileRoute('/kubernetes')({
  component: KubernetesPage,
})

function KubernetesPage() {
  return <PageHeader title="Kubernetes Clusters" />
}
