import {
  Button,
  ChevronRightIcon,
  FlexLayout,
  Link,
  Title,
} from '@nutanix-ui/prism-reactjs'
import type {
  TableColumn,
  TableRowData,
} from '@nutanix-ui/prism-reactjs/lib/components/v2/Tables/Table'
import { ProgressBarVisualization } from '../progress-bar-visualization'
import { SparklineWidgetBase } from '../sparkline-widget-base'
import { MOCK_MEMORY_CLUSTERS } from './constants'
import { formatMemoryValue } from './helpers'
import type { MockMemoryCluster } from './types'

const handleClusterNameClick = (clusterId: string) => {
  // TODO: Navigate to cluster
  console.log('Navigate to cluster:', clusterId)
}

const handleRowClick = (clusterId: string) => {
  // TODO: Drilldown for cluster
  console.log('Drilldown for cluster:', clusterId)
}

export const ClusterMemoryUsageWidget = () => {
  const progressBarColor = 'var(--color-primitives-blue-600)'
  const testIdPrefix = 'cluster-memory-usage'

  const columns: TableColumn[] = [
    {
      title: 'Cluster',
      key: 'name',
      className: 'sparkline-cluster-cell',
      render: (cellData: string, rowData: TableRowData) => {
        const cluster = rowData as MockMemoryCluster
        return (
          <Link
            onClick={() => handleClusterNameClick(cluster.id)}
            data-test={`${testIdPrefix}-cluster-${cluster.id}`}
            className="sparkline-cluster-name"
            title={cellData}
          >
            {cellData}
          </Link>
        )
      },
    },
    {
      title: 'Usage',
      key: 'memoryUsage',
      textAlign: 'right' as const,
      render: (_cellData: unknown, rowData: TableRowData) => {
        const cluster = rowData as MockMemoryCluster

        if (cluster.memoryUsage.length === 0) {
          return <span>Data not available</span>
        }

        return (
          <FlexLayout
            alignItems="center"
            itemGap="S"
            className="usage-and-last-value"
          >
            <span className="sparkline-container">
              <ProgressBarVisualization
                value={cluster.lastValue}
                color={progressBarColor}
              />
            </span>
            <span className="last-value-container">
              {formatMemoryValue(cluster.lastValue)}
            </span>
          </FlexLayout>
        )
      },
    },
    {
      title: '',
      key: 'actions',
      className: 'action-col',
      textAlign: 'right' as const,
      render: (_cellData: unknown, rowData: TableRowData, rowIndex: number) => {
        const cluster = rowData as MockMemoryCluster
        return (
          <Button
            appearance="mini"
            data-test={`${testIdPrefix}-action-row-${rowIndex}`}
            onClick={() => handleRowClick(cluster.id)}
            type={Button.ButtonTypes.ICON_LINK}
            aria-label={`View details for ${cluster.name}`}
          >
            <ChevronRightIcon size="small" />
          </Button>
        )
      },
    },
  ]

  return (
    <SparklineWidgetBase
      title="Cluster Memory Usage"
      header={
        <FlexLayout
          justifyContent="space-between"
          alignItems="center"
          className="sparkline-widget-header"
        >
          <Title size={Title.SIZES.H3}>Cluster Memory Usage</Title>
        </FlexLayout>
      }
      dataSource={MOCK_MEMORY_CLUSTERS.map((cluster) => ({
        ...cluster,
        sparklineData: cluster.memoryUsage,
      }))}
      columns={columns}
      widgetId="cluster-memory-usage-table"
      widgetClassName="cluster-memory-usage-widget"
      tableClassName="cluster-memory-usage-table"
      noDataMessage="No memory usage data available"
      columnWidths={{
        name: '35%',
        actions: '15%',
      }}
    />
  )
}
