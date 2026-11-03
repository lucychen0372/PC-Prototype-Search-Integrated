import {
  Badge,
  DashboardWidgetHeader,
  DashboardWidgetLayout,
  FlexLayout,
  Link,
  Paragraph,
  StackingLayout,
  TextLabel,
  Title,
} from '@nutanix-ui/prism-reactjs'
import { Cell, Donut, DonutChart, DonutSector } from '@nutanix-ui/recharts'
import { useState } from 'react'
import {
  CHART_SIZES,
  CURRENT_DATE,
  MOCK_SECURITY_DATA,
  TOTAL_ISSUES,
} from './constants'
import './SecuritySummaryWidget.css'
import type { ChartData, ChartSizes, SecurityIssue } from './types'

const Chart = ({
  activeIndex,
  sizes,
  chartData,
  onChartHover,
  onChartLeave,
}: {
  activeIndex: number | undefined
  sizes: ChartSizes
  chartData: ChartData[]
  onChartHover: (data: ChartData, index: number) => void
  onChartLeave: () => void
}) => {
  const { donutSize, thickness, boxPadding } = sizes
  const chartSize = donutSize + boxPadding * 2
  const startAngle = 90
  const endAngle = -360 + startAngle

  return (
    <DonutChart width={chartSize} height={chartSize}>
      <Donut
        activeIndex={activeIndex}
        activeShape={<DonutSector type="active" />}
        data={chartData}
        innerRadius={donutSize / 2 - thickness}
        outerRadius={donutSize / 2}
        dataKey="value"
        paddingAngle={1}
        startAngle={startAngle}
        endAngle={endAngle}
        onMouseEnter={onChartHover}
        onMouseLeave={onChartLeave}
      >
        {chartData.map((entry) => (
          <Cell fill={entry.color} key={entry.key} />
        ))}
      </Donut>
    </DonutChart>
  )
}

const ChartLabel = ({
  value,
  name,
  currentDate,
}: {
  value: number
  name: string | undefined
  currentDate: string
}) => {
  return (
    <FlexLayout
      itemGap="S"
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Title size={Title.SIZES.H1} className="security-summary-title">
        {value}
      </Title>
      {name ? (
        <Paragraph className="security-summary-chart-label">{name}</Paragraph>
      ) : (
        <Paragraph className="security-summary-chart-label">
          Total Issues · {currentDate}
        </Paragraph>
      )}
    </FlexLayout>
  )
}

const SummaryLegend = ({
  data,
  activeKey,
}: {
  data: SecurityIssue[]
  activeKey?: string
}) => {
  return (
    <StackingLayout itemGap="none" className="security-summary-legend-section">
      {data.map((item, index) => (
        <FlexLayout
          key={item.key}
          justifyContent="space-between"
          padding="0px-20px"
          alignItems="center"
          className={`security-summary-legend-item ${index === 0 ? '' : 'security-summary-legend-border'}`}
        >
          <FlexLayout itemGap="S" alignItems="center">
            <Badge color={item.color} text="" />
            <TextLabel
              type={
                activeKey === item.key
                  ? TextLabel.TEXT_LABEL_TYPE.PRIMARY
                  : TextLabel.TEXT_LABEL_TYPE.SECONDARY
              }
            >
              {item.label}
            </TextLabel>
          </FlexLayout>
          <TextLabel type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}>
            {item.count}
          </TextLabel>
        </FlexLayout>
      ))}
    </StackingLayout>
  )
}

export const SecuritySummaryWidget = () => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>()
  const [activeIndexData, setActiveIndexData] = useState<
    ChartData | undefined
  >()

  // Transform to chart format
  const chartData: ChartData[] = MOCK_SECURITY_DATA.map((item) => ({
    value: item.count,
    name: item.label,
    color: item.color,
    key: item.key,
  }))

  // Format label based on hover state
  const formatForChartLabel = () => {
    if (!activeIndexData) {
      return { value: TOTAL_ISSUES, name: undefined }
    }
    return { value: activeIndexData.value, name: activeIndexData.name }
  }

  const { value, name } = formatForChartLabel()

  // Event handlers
  const onPieEnter = (data: ChartData, index: number) => {
    setActiveIndex(index)
    setActiveIndexData(data)
  }

  const onPieLeave = () => {
    setActiveIndex(undefined)
    setActiveIndexData(undefined)
  }

  return (
    <DashboardWidgetLayout
      header={<DashboardWidgetHeader title="Security" showCloseIcon={false} />}
      bodyContent={
        <FlexLayout
          flexDirection="column"
          itemGap="none"
          className="security-summary-widget-body"
          flexGrow="1"
        >
          {/* Chart section with side label */}
          <FlexLayout
            className="security-summary-chart-section"
            alignItems="center"
            itemGap="M"
          >
            <Chart
              activeIndex={activeIndex}
              sizes={CHART_SIZES}
              chartData={chartData}
              onChartHover={onPieEnter}
              onChartLeave={onPieLeave}
            />
            <ChartLabel value={value} name={name} currentDate={CURRENT_DATE} />
          </FlexLayout>

          {/* Legend section */}
          <SummaryLegend
            data={MOCK_SECURITY_DATA}
            activeKey={activeIndexData?.key}
          />
        </FlexLayout>
      }
      footer={
        <FlexLayout justifyContent="center" alignItems="center" flexGrow="1">
          <Link
            role="button"
            aria-label="View all security issues"
            onClick={() => {
              // TODO: View all security issues
            }}
            tabIndex={0}
          >
            View All Issues
          </Link>
        </FlexLayout>
      }
    />
  )
}
