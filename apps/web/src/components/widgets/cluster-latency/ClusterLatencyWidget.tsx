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
import { SparklineVisualization } from '../sparkline-visualization'
import { SparklineWidgetBase } from '../sparkline-widget-base'
import { MOCK_LATENCY_CLUSTERS } from './constants'
import { formatLatencyValue } from './helpers'
import type { MockLatencyCluster } from './types'

const handleClusterNameClick = (clusterId: string) => {
  // TODO: Navigate to cluster
  console.log('Navigate to cluster:', clusterId)
}

const handleRowClick = (clusterId: string) => {
  // TODO: Drilldown for cluster
  console.log('Drilldown for cluster:', clusterId)
}

export const ClusterLatencyWidget = () => {
  const sparklineColor = 'var(--color-primitives-red-600)'
  const testIdPrefix = 'cluster-latency'

  const columns: TableColumn[] = [
    {
      title: 'Cluster',
      key: 'name',
      className: 'sparkline-cluster-cell',
      render: (cellData: string, rowData: TableRowData) => {
        const cluster = rowData as MockLatencyCluster
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
      title: 'Latency',
      key: 'latency',
      textAlign: 'right' as const,
      render: (_cellData: unknown, rowData: TableRowData) => {
        const cluster = rowData as MockLatencyCluster

        if (cluster.sparklineData.length === 0) {
          return <span>Data not available</span>
        }

        return (
          <FlexLayout
            alignItems="center"
            itemGap="S"
            className="latency-and-last-value"
          >
            <span className="sparkline-container">
              <SparklineVisualization
                data={cluster.sparklineData}
                color={sparklineColor}
              />
            </span>
            <span className="last-value-container">
              {formatLatencyValue(cluster.lastValue)}
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
        const cluster = rowData as MockLatencyCluster
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
      title="Cluster Latency"
      header={
        <FlexLayout
          justifyContent="space-between"
          alignItems="center"
          className="sparkline-widget-header"
        >
          <Title size={Title.SIZES.H3}>Cluster Latency</Title>
        </FlexLayout>
      }
      dataSource={MOCK_LATENCY_CLUSTERS.map((cluster) => ({
        ...cluster,
        sparklineData: cluster.latency,
      }))}
      columns={columns}
      widgetId="cluster-latency-table"
      widgetClassName="cluster-latency-widget"
      tableClassName="cluster-latency-table"
      noDataMessage="No latency data available"
      columnWidths={{
        name: '35%',
        actions: '15%',
      }}
    />
  )
}
