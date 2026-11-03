import { createFileRoute } from '@tanstack/react-router'
import { VmPage } from '~/components/vms'

export const Route = createFileRoute('/vms/')({
  component: VmPage,
})
