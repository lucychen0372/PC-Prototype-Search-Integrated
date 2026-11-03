import {
  Badge,
  DashboardWidgetHeader,
  DashboardWidgetLayout,
  FlexItem,
  FlexLayout,
  Link,
  StackingLayout,
  StatusDiamondMiniIcon,
  StatusDotMiniIcon,
  StatusTriangleMiniIcon,
  Title,
  Tooltip,
  WidgetTable,
} from '@nutanix-ui/prism-reactjs'
import {
  ALERT_COLUMN_OPTIONS,
  MOCK_DATA,
  SEVERITY_COLORS,
  SEVERITY_KEYS,
  SEVERITY_LABELS,
} from './constants'
import './AlertsWidget.css'

const getSeverityIcons = (colors: typeof SEVERITY_COLORS) => {
  return {
    critical: (
      <StatusTriangleMiniIcon
        color={colors.critical}
        aria-label="Critical severity icon"
      />
    ),
    warning: (
      <StatusDiamondMiniIcon
        color={colors.warning}
        aria-label="Warning severity icon"
      />
    ),
    info: (
      <StatusDotMiniIcon color={colors.info} aria-label="Info severity icon" />
    ),
  }
}

const getTooltipContent = (
  last24Alerts: { critical: number; warning: number; info: number },
  keys: typeof SEVERITY_KEYS,
) => {
  return (
    <StackingLayout itemGap="M">
      <Title size={Title.SIZES.H4}>New Alerts (Last 24 Hours)</Title>
      <StackingLayout itemGap="M">
        {keys.map((key) => {
          const alertCount = last24Alerts[key] || 0
          return (
            <Badge
              key={key}
              color={SEVERITY_COLORS[key]}
              text={`${alertCount} new ${key} alerts`}
              aria-label={`${alertCount} new ${key} alerts`}
            />
          )
        })}
      </StackingLayout>
    </StackingLayout>
  )
}

export const AlertsWidget = () => {
  const { openAlertsCountBySeverity, openAlertsCount, last24Alerts } = MOCK_DATA
  const totalLastDayData = Object.values(last24Alerts).reduce(
    (sum, count) => sum + count,
    0,
  )
  const total = Object.values(openAlertsCountBySeverity).reduce(
    (sum, val) => sum + val,
    0,
  )

  const getWidth = (count: number) => `${(count / total) * 100}%`

  const severityIcons = getSeverityIcons(SEVERITY_COLORS)

  const tooltipContent = getTooltipContent(last24Alerts, SEVERITY_KEYS)

  return (
    <DashboardWidgetLayout
      header={
        <DashboardWidgetHeader
          title="Open Alerts Summary"
          showCloseIcon={false}
        />
      }
      bodyContent={
        <StackingLayout itemGap="none">
          {/* Alert summaries section */}
          <FlexLayout padding="10px-0px" className="alerts-summaries">
            <FlexLayout padding="0px-20px" itemGap="S" alignItems="center">
              <Title
                size={Title.SIZES.H1}
                aria-label={`${openAlertsCount} total open alerts`}
              >
                {openAlertsCount.toLocaleString()}
              </Title>
              <Tooltip
                placement="bottom-start"
                oldTooltip={false}
                appearance={Tooltip.APPEARANCE.SECONDARY}
                mouseEnterDelay={300}
                content={tooltipContent}
                contentProps={{
                  className: 'tooltip-content',
                }}
              >
                <Badge
                  color={Badge.BadgeColorTypes.BLUE}
                  className="new-badge"
                  count={`${totalLastDayData} New`}
                  aria-label={`${totalLastDayData} new alerts in the last 24 hours`}
                  role="button"
                  tabIndex={0}
                />
              </Tooltip>
            </FlexLayout>
          </FlexLayout>
          <StackingLayout
            className="alert-widget-body-content"
            itemGap="M"
            role="region"
            aria-label="Alert widget content"
          >
            {/* Bar chart section */}
            <FlexLayout padding="0px-15px">
              <FlexLayout
                itemGap="none"
                padding="0px"
                flexDirection="row"
                className="alert-progress-container"
                role="img"
                aria-label={`Bar chart showing ${openAlertsCountBySeverity.critical} critical, ${openAlertsCountBySeverity.warning} warning, and ${openAlertsCountBySeverity.info} info alerts`}
              >
                {SEVERITY_KEYS.filter(
                  (key) => openAlertsCountBySeverity[key] > 0,
                ).map((key) => (
                  <FlexItem
                    key={`stacked-${key}`}
                    flexGrow="1"
                    className="alert-progress-segment"
                    style={
                      {
                        '--segment-width': getWidth(
                          openAlertsCountBySeverity[key],
                        ),
                        '--segment-color': SEVERITY_COLORS[key],
                      } as React.CSSProperties
                    }
                    aria-label={`${openAlertsCountBySeverity[key]} ${key} alerts`}
                  />
                ))}
              </FlexLayout>
            </FlexLayout>

            {/* Severity table section */}
            <FlexLayout
              alignItems="center"
              justifyContent="center"
              flexGrow="1"
              background="alt"
            >
              <WidgetTable
                showCustomScrollbar={true}
                border={false}
                wrapperProps={{
                  role: 'table',
                  'aria-label': 'Alerts by severity',
                }}
                dataSource={SEVERITY_KEYS.map((key) => {
                  const alertCount = openAlertsCountBySeverity[key] || 0
                  return {
                    key,
                    label: (
                      <Badge
                        statusIcon={severityIcons[key]}
                        text={
                          <Link tabIndex={0} aria-hidden="true">
                            {SEVERITY_LABELS[key]}
                          </Link>
                        }
                        aria-label={`${key} severity alerts`}
                      />
                    ),
                    value: (
                      <Title
                        size={Title.SIZES.H4}
                        aria-label={`${alertCount} alerts`}
                      >
                        {alertCount}
                      </Title>
                    ),
                  }
                })}
                columns={ALERT_COLUMN_OPTIONS}
                structure={{
                  stylizeRowHeaders: true,
                  hideHeader: 'no-header',
                }}
                customProps={{
                  rowProps: () => ({
                    className: 'alert-widget-row',
                    tabIndex: 0,
                    role: 'button',
                  }),
                }}
              />
            </FlexLayout>
          </StackingLayout>
        </StackingLayout>
      }
      footer={
        <FlexLayout justifyContent="center" alignItems="center" flexGrow="1">
          <Link role="button" aria-label="View all open alerts" tabIndex={0}>
            View All Open Alerts
          </Link>
        </FlexLayout>
      }
    />
  )
}
