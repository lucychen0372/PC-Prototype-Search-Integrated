import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '~/components/common'

export const Route = createFileRoute('/ovas')({
  component: OvasPage,
})

function OvasPage() {
  return <PageHeader title="OVAs" />
}
