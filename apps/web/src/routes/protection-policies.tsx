import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '~/components/common'

export const Route = createFileRoute('/protection-policies')({
  component: ProtectionPoliciesPage,
})

function ProtectionPoliciesPage() {
  return <PageHeader title="Protection Policies" />
}
