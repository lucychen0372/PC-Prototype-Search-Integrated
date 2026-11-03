import {
  DashboardWidgetHeader,
  DashboardWidgetLayout,
  StackingLayout,
  WidgetTable,
} from '@nutanix-ui/prism-reactjs'
import type { TableColumn } from '@nutanix-ui/prism-reactjs/lib/components/v2/Tables/Table'
import type { ReactNode } from 'react'
import './SparklineWidgetBase.css'
import type { SparklineClusterData } from './types'

export interface SparklineWidgetBaseProps<T extends SparklineClusterData> {
  title: string
  header?: ReactNode
  dataSource: T[]
  columns: TableColumn[]
  metricColumnName?: string
  metricDataKey?: string
  sparklineColor?: string
  formatValue?: (value: number) => string
  onClusterNameClick?: (clusterId: string) => void
  onRowClick?: (clusterId: string) => void
  widgetId: string
  widgetClassName?: string
  tableClassName?: string
  noDataMessage?: string
  columnWidths?: Record<string, string>
  testIdPrefix?: string
  showExpiredLicenseCheck?: boolean
  expiredLicenseTooltip?: string
}

export const SparklineWidgetBase = <T extends SparklineClusterData>({
  title,
  dataSource,
  columns,
  widgetId,
  widgetClassName,
  tableClassName,
  noDataMessage = 'No data available',
  columnWidths,
}: SparklineWidgetBaseProps<T>) => {
  return (
    <DashboardWidgetLayout
      header={<DashboardWidgetHeader title={title} showCloseIcon={false} />}
      bodyContent={
        <StackingLayout
          itemGap="none"
          className={widgetClassName || 'sparkline-widget-base'}
        >
          <StackingLayout
            background="body"
            className={tableClassName || 'sparkline-table'}
          >
            <WidgetTable
              id={widgetId}
              rowKey="id"
              dataSource={dataSource}
              columns={columns}
              customMessages={{ noData: noDataMessage }}
              border={false}
              className="widget-table sparkline-widget"
              structure={
                columnWidths
                  ? {
                      columnWidths,
                    }
                  : undefined
              }
            />
          </StackingLayout>
        </StackingLayout>
      }
    />
  )
}
