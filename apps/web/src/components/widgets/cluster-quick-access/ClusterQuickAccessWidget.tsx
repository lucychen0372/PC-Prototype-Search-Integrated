import {
  DashboardWidgetHeader,
  DashboardWidgetLayout,
  FlexLayout,
  Link,
  StackingLayout,
  StatusIcon,
  WidgetTable,
} from '@nutanix-ui/prism-reactjs'
import type {
  TableColumn,
  TableRowData,
} from '@nutanix-ui/prism-reactjs/lib/components/v2/Tables/Table'
import { MOCK_CLUSTERS } from './constants'
import type { MockCluster } from './types'

const handleClusterNameClick = (clusterId: string) => {
  // TODO: Navigate to cluster
  console.log('Navigate to cluster:', clusterId)
}

export const ClusterQuickAccessWidget = () => {
  const columns: TableColumn[] = [
    {
      title: 'Name',
      key: 'name',
      render: (cellData: string, rowData: TableRowData) => {
        const cluster = rowData as MockCluster
        return (
          <FlexLayout alignItems="center" justifyContent="space-between">
            <Link
              onClick={() => handleClusterNameClick(cluster.id)}
              data-test={`clusterquickaccessvantagepointview_a_${cellData}`}
            >
              {cellData}
            </Link>
            {cluster.hasExpiredLicense && (
              <StatusIcon
                data-test="clusterquickaccessvantagepointview_expiredLicenseIcon"
                type={StatusIcon.StatusIconTypes.ALERT}
                tooltipProps={{
                  content: 'Cluster has expired licenses',
                }}
              />
            )}
          </FlexLayout>
        )
      },
    },
  ]

  return (
    <DashboardWidgetLayout
      header={
        <DashboardWidgetHeader
          title="Cluster Quick Access"
          showCloseIcon={false}
        />
      }
      bodyContent={
        <StackingLayout itemGap="none" className="cluster-quick-access-widget">
          <StackingLayout
            background="body"
            className="cluster-quick-access-table"
          >
            <WidgetTable
              id="cluster-quick-access-vantage-point-table"
              rowKey="id"
              dataSource={MOCK_CLUSTERS}
              columns={columns}
              customMessages={{ noData: 'No clusters found' }}
              border={false}
              className="widget-table"
            />
          </StackingLayout>
        </StackingLayout>
      }
    />
  )
}
