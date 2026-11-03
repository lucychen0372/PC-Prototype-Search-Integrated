import {
  Button,
  ChevronLeftIcon,
  FlexLayout,
  Link,
  StackingLayout,
  Tabs,
  TextLabel,
  Title,
} from '@nutanix-ui/prism-reactjs'
import { useNavigate, useParams, useSearch } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { MOCK_CPU_CLUSTERS } from '~/components/widgets/cluster-cpu-usage/constants'
import { MOCK_LATENCY_CLUSTERS } from '~/components/widgets/cluster-latency/constants'
import { MOCK_MEMORY_CLUSTERS } from '~/components/widgets/cluster-memory-usage/constants'
import { MOCK_IOPS_CLUSTERS } from '~/components/widgets/controller-iops/constants'
import type { Entity } from '@template-api/features/groups/types'
import { useOpenLink } from '@proto/lib/destinations'
import { ClusterVmsTab } from './ClusterVmsTab'
import {
  alertsOnCluster,
  bySeverityThenTime,
  hostCpuPct,
  NC_CLUSTERS,
  NC_HOSTS,
} from '@proto/lib/nc-data'
import '~/components/vms/VmDetailsPage.css'
import './ClusterDetailsPage.css'

/** Infrastructure-entity tab set from the Cluster Summary reference (prism-patterns detail-cluster-summary). */
export const CLUSTER_DETAILS_TABS = [
  { key: 'summary', title: 'Summary' },
  { key: 'alerts', title: 'Alerts' },
  { key: 'events', title: 'Events' },
  { key: 'metrics', title: 'Metrics' },
  { key: 'storage-usage', title: 'Storage Usage' },
  { key: 'hardware', title: 'Hardware' },
  { key: 'vms', title: 'VMs' },
  { key: 'capacity', title: 'Capacity' },
  { key: 'security', title: 'Security' },
]

const TIB = 1024 ** 4

const lastValue = (
  clusters: { name: string; lastValue: number }[],
  name: string,
) => clusters.find((cluster) => cluster.name === name)?.lastValue

const formatMetric = (value: number | undefined, unit: string) =>
  value === undefined ? '-' : `${value}${unit}`

const SummaryCard = ({
  title,
  headerAction,
  footerAction,
  children,
}: {
  title: string
  headerAction?: ReactNode
  footerAction?: ReactNode
  children: ReactNode
}) => (
  <div className="widget-card">
    <div className="widget-header">
      <FlexLayout justifyContent="space-between" alignItems="center">
        <Title size={Title.SIZES.H3}>{title}</Title>
        {headerAction}
      </FlexLayout>
    </div>
    <div className="widget-content">{children}</div>
    {footerAction && <div className="widget-footer">{footerAction}</div>}
  </div>
)

const SummaryRow = ({ label, value }: { label: string; value: ReactNode }) => (
  <div className="widget-row">
    <div className="widget-row-label">
      <TextLabel>{label}</TextLabel>
    </div>
    <div className="widget-row-value">{value}</div>
  </div>
)

const NoAlerts = () => (
  <div className="policies-empty-state">
    <TextLabel>No open alerts.</TextLabel>
  </div>
)

const SeverityLabel = ({ alert }: { alert: Entity }) => (
  <FlexLayout itemGap="XS" alignItems="center">
    <span
      className={`legend-dot legend-${String(alert.severity).toLowerCase()}`}
    />
    {String(alert.severity)}
  </FlexLayout>
)

/** Narrow Summary column: title over severity and time, so titles never squeeze into a grid cell. */
const AlertsList = ({ alerts }: { alerts: Entity[] }) => {
  const openLink = useOpenLink()
  if (alerts.length === 0) return <NoAlerts />
  return (
    <StackingLayout itemGap="none">
      {alerts.map((alert) => (
        <div key={alert.id} className="widget-row">
          <StackingLayout itemGap="XS" className="cluster-alert-item">
            <Link
              onClick={() =>
                openLink({ kind: 'alerts', search: { alert: alert.id } })
              }
            >
              {String(alert.title)}
            </Link>
            <FlexLayout itemGap="S" alignItems="center">
              <SeverityLabel alert={alert} />
              <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                Today {String(alert.time)}
              </TextLabel>
            </FlexLayout>
          </StackingLayout>
        </div>
      ))}
    </StackingLayout>
  )
}

const AlertsTable = ({ alerts }: { alerts: Entity[] }) => {
  const openLink = useOpenLink()
  if (alerts.length === 0) return <NoAlerts />
  return (
    <div className="performance-table">
      <div className="performance-header">
        <div className="performance-cell metric-name">Alert</div>
        <div className="performance-cell metric-value">Severity</div>
        <div className="performance-cell metric-value">Raised</div>
      </div>
      {alerts.map((alert) => (
        <div key={alert.id} className="performance-row">
          <div className="performance-cell metric-name">
            <Link
              onClick={() =>
                openLink({ kind: 'alerts', search: { alert: alert.id } })
              }
            >
              {String(alert.title)}
            </Link>
          </div>
          <div className="performance-cell metric-value">
            <SeverityLabel alert={alert} />
          </div>
          <div className="performance-cell metric-value">
            Today {String(alert.time)}
          </div>
        </div>
      ))}
    </div>
  )
}

export const ClusterDetailsPage = () => {
  const { clusterId } = useParams({ strict: false })
  const { tab = 'summary' } = useSearch({ strict: false }) as { tab?: string }
  const navigate = useNavigate()
  const cluster = NC_CLUSTERS.find((item) => item.id === clusterId)

  const setTab = (key: string) =>
    void navigate({
      to: '/clusters/$clusterId',
      params: { clusterId: clusterId ?? '' },
      search: key === 'summary' ? {} : { tab: key },
      replace: true,
    })

  if (!cluster) {
    return (
      <StackingLayout padding="20px" itemGap="M">
        <Title size={Title.SIZES.H2}>Cluster Not Found</Title>
        <TextLabel>
          The cluster with ID "{clusterId}" could not be found.
        </TextLabel>
      </StackingLayout>
    )
  }

  const name = String(cluster.name)
  const hosts = NC_HOSTS.filter((host) => host.cluster_name === name).toSorted(
    (a, b) => hostCpuPct(b) - hostCpuPct(a),
  )
  const alerts = alertsOnCluster(name).toSorted(bySeverityThenTime)
  const storageUsed = Number(cluster.storage_usage_bytes) / TIB
  const storageCapacity = Number(cluster.storage_capacity_bytes) / TIB
  const openVms = () => setTab('vms')

  return (
    <StackingLayout itemGap="none" className="vm-details-page">
      <div className="vm-details-header">
        <FlexLayout itemGap="M" alignItems="center">
          <Button
            type={Button.ButtonTypes.ICON_DEFAULT}
            onClick={() => void navigate({ to: '/' })}
            aria-label="Back to Dashboard"
          >
            <ChevronLeftIcon />
          </Button>
          <span className="vm-details-tag">Cluster</span>
          <Title size={Title.SIZES.H3}>{name}</Title>
          <FlexLayout itemGap="XS" alignItems="center">
            <span className="vm-details-separator">|</span>
            <span className="vm-details-tag">Host</span>
            <TextLabel>{hosts.length} Hosts</TextLabel>
            <span className="vm-details-separator">|</span>
            <span className="vm-details-tag">VM</span>
            <Link className="vm-details-breadcrumb" onClick={openVms}>
              {Number(cluster.num_vms)} VMs
            </Link>
          </FlexLayout>
        </FlexLayout>
      </div>

      <Tabs
        data={CLUSTER_DETAILS_TABS}
        activeKey={tab}
        onTabClick={(key) => setTab(String(key))}
        aria-label="Cluster details tabs"
      />

      {tab === 'summary' ? (
        <StackingLayout
          itemGap="L"
          className="vm-details-content"
          padding="20px"
        >
          <FlexLayout itemGap="L" alignItems="flex-start">
            <StackingLayout itemGap="L" className="vm-details-column">
              <SummaryCard title="Properties">
                <StackingLayout itemGap="none">
                  <SummaryRow label="Cluster Type" value="Hyperconverged" />
                  <SummaryRow label="Health" value={String(cluster.status)} />
                  <SummaryRow
                    label="Hypervisor"
                    value={String(cluster.hypervisor)}
                  />
                  <SummaryRow label="Host Count" value={hosts.length} />
                  <SummaryRow
                    label="VM Count"
                    value={
                      <Link onClick={openVms}>{Number(cluster.num_vms)}</Link>
                    }
                  />
                  <SummaryRow
                    label="Storage Usage"
                    value={`${storageUsed.toFixed(0)} TiB`}
                  />
                  <SummaryRow
                    label="Storage Capacity"
                    value={`${storageCapacity.toFixed(0)} TiB`}
                  />
                </StackingLayout>
              </SummaryCard>
            </StackingLayout>
            <StackingLayout itemGap="L" className="vm-details-column">
              <SummaryCard
                title="Metrics"
                headerAction={
                  <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                    Last 15 mins avg
                  </TextLabel>
                }
              >
                <StackingLayout itemGap="none">
                  <SummaryRow
                    label="CPU Usage"
                    value={formatMetric(
                      lastValue(MOCK_CPU_CLUSTERS, name),
                      '%',
                    )}
                  />
                  <SummaryRow
                    label="Memory Usage"
                    value={formatMetric(
                      lastValue(MOCK_MEMORY_CLUSTERS, name),
                      '%',
                    )}
                  />
                  <SummaryRow
                    label="Controller IOPS"
                    value={formatMetric(
                      lastValue(MOCK_IOPS_CLUSTERS, name),
                      ' IOPS',
                    )}
                  />
                  <SummaryRow
                    label="IO Latency"
                    value={formatMetric(
                      lastValue(MOCK_LATENCY_CLUSTERS, name),
                      ' ms',
                    )}
                  />
                </StackingLayout>
              </SummaryCard>
              <SummaryCard title="Hosts">
                <div className="performance-table">
                  <div className="performance-header">
                    <div className="performance-cell metric-name">Host</div>
                    <div className="performance-cell metric-value">CPU</div>
                    <div className="performance-cell metric-value">VMs</div>
                  </div>
                  {hosts.map((host) => (
                    <div key={host.id} className="performance-row">
                      <div className="performance-cell metric-name">
                        {String(host.name)}
                      </div>
                      <div className="performance-cell metric-value">
                        {hostCpuPct(host)}%
                      </div>
                      <div className="performance-cell metric-value">
                        {Number(host.num_vms)}
                      </div>
                    </div>
                  ))}
                </div>
              </SummaryCard>
            </StackingLayout>
            <StackingLayout itemGap="L" className="vm-details-column">
              <SummaryCard
                title={`Alerts (${alerts.length})`}
                footerAction={
                  <Link onClick={() => setTab('alerts')}>View All Alerts</Link>
                }
              >
                <AlertsList alerts={alerts} />
              </SummaryCard>
            </StackingLayout>
          </FlexLayout>
        </StackingLayout>
      ) : tab === 'vms' ? (
        <ClusterVmsTab clusterId={String(cluster.id)} clusterName={name} />
      ) : (
        <StackingLayout
          className="vm-details-content"
          padding="20px"
          itemGap="L"
        >
          <Title size={Title.SIZES.H3}>
            {CLUSTER_DETAILS_TABS.find((item) => item.key === tab)?.title}
          </Title>
          {tab === 'alerts' ? (
            <div className="widget-card">
              <AlertsTable alerts={alerts} />
            </div>
          ) : undefined}
        </StackingLayout>
      )}
    </StackingLayout>
  )
}
