import { StackingLayout } from '@nutanix-ui/prism-reactjs'
import { PageHeader } from '~/components/common'
import { DashboardPc } from '~/components/dashboard'

/** Same Global Overview body as the template dashboard pattern. */
export const MainDashboardPage = () => {
  return (
    <StackingLayout itemGap="none">
      <PageHeader title="Dashboard" />
      <DashboardPc />
    </StackingLayout>
  )
}
