import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '~/components/common'

export const Route = createFileRoute('/images')({
  component: ImagesPage,
})

function ImagesPage() {
  return <PageHeader title="Images" />
}
