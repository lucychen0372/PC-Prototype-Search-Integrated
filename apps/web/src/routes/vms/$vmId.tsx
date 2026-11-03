import { createFileRoute } from '@tanstack/react-router'
import { VmDetailsPage } from '~/components/vms'

export const Route = createFileRoute('/vms/$vmId')({
  component: VmDetailsPage,
})
