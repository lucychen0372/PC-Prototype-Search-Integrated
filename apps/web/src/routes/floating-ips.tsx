import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '~/components/common'

export const Route = createFileRoute('/floating-ips')({
  component: FloatingIpsPage,
})

function FloatingIpsPage() {
  return <PageHeader title="Floating IPs" />
}
