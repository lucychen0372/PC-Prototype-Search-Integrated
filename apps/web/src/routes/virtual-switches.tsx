import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '~/components/common'

export const Route = createFileRoute('/virtual-switches')({
  component: VirtualSwitchesPage,
})

function VirtualSwitchesPage() {
  return <PageHeader title="Virtual Switches" />
}
