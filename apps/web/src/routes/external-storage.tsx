import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '~/components/common'

export const Route = createFileRoute('/external-storage')({
  component: ExternalStoragePage,
})

function ExternalStoragePage() {
  return <PageHeader title="External Storage" />
}
