import {
  Badge,
  Button,
  CheckMarkIcon,
  ChevronLeftIcon,
  CloneIcon,
  FlexLayout,
  Link,
  StackingLayout,
  Tabs,
  TextLabel,
  Title,
} from '@nutanix-ui/prism-reactjs'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate, useParams } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { VM_DETAILS_TABS } from './config/constants'
import type { VmEntity } from './config/types'
import './VmDetailsPage.css'
import { VmEbr } from './VmEbr'
import './VmPage.css'

const VM_DETAILS_ATTRIBUTES = [
  'id',
  'name',
  'description',
  'uniqueId',
  'powerState',
  'status',
  'numVcpus',
  'coresPerVcpu',
  'memory',
  'ipAddresses',
  'ipAddressList',
  'storage',
  'cluster',
  'hypervisor',
  'host',
  'hostIp',
  'domain',
  'os',
  'project',
  'owner',
  'vmUptime',
  'bootDevice',
  'bootDeviceSize',
  'bootDeviceType',
  'bootConfiguration',
  'guestCustomizationStatus',
  'secureBoot',
  'credentialGuard',
  'vTpm',
  'agentVm',
  'storagePropertiesDefinedBy',
  'storagePolicy',
  'policyCompliance',
  'totalVirtualDisks',
  'totalStorageLogical',
  'encryption',
  'replicationFactor',
  'compression',
  'qosThrottledIops',
  'externalDeviceType',
  'externalDeviceMode',
  'externalDeviceConfiguration',
  'performanceMetricNames',
  'performanceMetricCurrentValues',
  'performanceMetricPeakValues',
  'alertDates',
  'alertCriticalCounts',
  'alertWarningCounts',
  'alertInfoCounts',
  'anomalyDates',
  'anomalyMemoryValues',
  'anomalyIoValues',
  'anomalyCpuValues',
  'anomalyNetworkValues',
  'anomalyDiskValues',
  'anomalyOtherValues',
  'protectionStatus',
  'categories',
  'consistencyGroup',
  'syncStatus',
  'protectionType',
  'protectionPolicy',
  'recoveryPlans',
]

interface GroupsAttributeValue {
  values?: string[]
}

interface GroupsAttribute {
  name: string
  values?: GroupsAttributeValue[]
}

interface GroupsEntityResult {
  entity_id: string
  data: GroupsAttribute[]
}

interface GroupsResponse {
  group_results?: Array<{
    entity_results?: GroupsEntityResult[]
  }>
}

const getAttributeValues = (
  entityResult: GroupsEntityResult,
  attributeName: string,
): string[] =>
  entityResult.data.find((attribute) => attribute.name === attributeName)
    ?.values?.[0]?.values ?? []

const getStringAttribute = (
  entityResult: GroupsEntityResult,
  attributeName: string,
  fallback = '-',
) => getAttributeValues(entityResult, attributeName)[0] ?? fallback

const getNumberAttribute = (
  entityResult: GroupsEntityResult,
  attributeName: string,
  fallback = 0,
) => {
  const value = Number(
    getStringAttribute(entityResult, attributeName, String(fallback)),
  )

  return Number.isNaN(value) ? fallback : value
}

const getBooleanAttribute = (
  entityResult: GroupsEntityResult,
  attributeName: string,
) => getStringAttribute(entityResult, attributeName, 'false') === 'true'

const getNumberListAttribute = (
  entityResult: GroupsEntityResult,
  attributeName: string,
) =>
  getAttributeValues(entityResult, attributeName)
    .map(Number)
    .filter((value) => !Number.isNaN(value))

const toVmEntity = (entityResult: GroupsEntityResult): VmEntity => ({
  id: entityResult.entity_id,
  name: getStringAttribute(entityResult, 'name'),
  description: getStringAttribute(entityResult, 'description'),
  uniqueId: getStringAttribute(entityResult, 'uniqueId'),
  powerState: getStringAttribute(entityResult, 'powerState'),
  status: getStringAttribute(entityResult, 'status'),
  numVcpus: getNumberAttribute(entityResult, 'numVcpus', 1),
  coresPerVcpu: getNumberAttribute(entityResult, 'coresPerVcpu', 1),
  memory: getStringAttribute(entityResult, 'memory'),
  cpuUsage: getNumberAttribute(entityResult, 'cpuUsage'),
  memoryUsage: getNumberAttribute(entityResult, 'memoryUsage'),
  iops: getNumberAttribute(entityResult, 'iops'),
  createdOn: getNumberAttribute(entityResult, 'createdOn'),
  ipAddresses: getStringAttribute(entityResult, 'ipAddresses'),
  ipAddressList: getAttributeValues(entityResult, 'ipAddressList'),
  storage: getStringAttribute(entityResult, 'storage'),
  cluster: getStringAttribute(entityResult, 'cluster'),
  hypervisor: getStringAttribute(entityResult, 'hypervisor'),
  host: getStringAttribute(entityResult, 'host'),
  hostIp: getStringAttribute(entityResult, 'hostIp'),
  domain: getStringAttribute(entityResult, 'domain'),
  os: getStringAttribute(entityResult, 'os', 'Unknown'),
  project: getStringAttribute(entityResult, 'project'),
  owner: getStringAttribute(entityResult, 'owner'),
  vmUptime: getStringAttribute(entityResult, 'vmUptime'),
  bootDevice: getStringAttribute(entityResult, 'bootDevice'),
  bootDeviceSize: getStringAttribute(entityResult, 'bootDeviceSize'),
  bootDeviceType: getStringAttribute(entityResult, 'bootDeviceType'),
  bootConfiguration: getStringAttribute(entityResult, 'bootConfiguration'),
  guestCustomizationStatus: getStringAttribute(
    entityResult,
    'guestCustomizationStatus',
  ),
  secureBoot: getBooleanAttribute(entityResult, 'secureBoot'),
  credentialGuard: getBooleanAttribute(entityResult, 'credentialGuard'),
  vTpm: getBooleanAttribute(entityResult, 'vTpm'),
  agentVm: getBooleanAttribute(entityResult, 'agentVm'),
  storagePropertiesDefinedBy: getStringAttribute(
    entityResult,
    'storagePropertiesDefinedBy',
  ),
  storagePolicy: getStringAttribute(entityResult, 'storagePolicy'),
  policyCompliance: getStringAttribute(entityResult, 'policyCompliance'),
  totalVirtualDisks: getNumberAttribute(entityResult, 'totalVirtualDisks'),
  totalStorageLogical: getStringAttribute(entityResult, 'totalStorageLogical'),
  encryption: getStringAttribute(entityResult, 'encryption'),
  replicationFactor: getNumberAttribute(entityResult, 'replicationFactor'),
  compression: getStringAttribute(entityResult, 'compression'),
  qosThrottledIops: getNumberAttribute(entityResult, 'qosThrottledIops'),
  externalDeviceType: getStringAttribute(entityResult, 'externalDeviceType'),
  externalDeviceMode: getStringAttribute(entityResult, 'externalDeviceMode'),
  externalDeviceConfiguration: getStringAttribute(
    entityResult,
    'externalDeviceConfiguration',
  ),
  performanceMetricNames: getAttributeValues(
    entityResult,
    'performanceMetricNames',
  ),
  performanceMetricCurrentValues: getAttributeValues(
    entityResult,
    'performanceMetricCurrentValues',
  ),
  performanceMetricPeakValues: getAttributeValues(
    entityResult,
    'performanceMetricPeakValues',
  ),
  alertDates: getAttributeValues(entityResult, 'alertDates'),
  alertCriticalCounts: getNumberListAttribute(
    entityResult,
    'alertCriticalCounts',
  ),
  alertWarningCounts: getNumberListAttribute(
    entityResult,
    'alertWarningCounts',
  ),
  alertInfoCounts: getNumberListAttribute(entityResult, 'alertInfoCounts'),
  anomalyDates: getAttributeValues(entityResult, 'anomalyDates'),
  anomalyMemoryValues: getNumberListAttribute(
    entityResult,
    'anomalyMemoryValues',
  ),
  anomalyIoValues: getNumberListAttribute(entityResult, 'anomalyIoValues'),
  anomalyCpuValues: getNumberListAttribute(entityResult, 'anomalyCpuValues'),
  anomalyNetworkValues: getNumberListAttribute(
    entityResult,
    'anomalyNetworkValues',
  ),
  anomalyDiskValues: getNumberListAttribute(entityResult, 'anomalyDiskValues'),
  anomalyOtherValues: getNumberListAttribute(
    entityResult,
    'anomalyOtherValues',
  ),
  protectionStatus: getStringAttribute(entityResult, 'protectionStatus'),
  categories: getStringAttribute(entityResult, 'categories'),
  consistencyGroup: getStringAttribute(entityResult, 'consistencyGroup'),
  syncStatus: getStringAttribute(entityResult, 'syncStatus'),
  protectionType: getStringAttribute(entityResult, 'protectionType'),
  protectionPolicy: getStringAttribute(entityResult, 'protectionPolicy'),
  recoveryPlans: getStringAttribute(entityResult, 'recoveryPlans'),
})

const fetchVmEntity = async (vmId: string) => {
  const response = await fetch('/api/nutanix/v3/groups', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      entity_type: 'vm',
      entity_ids: [vmId],
      group_member_count: 1,
      group_member_attributes: VM_DETAILS_ATTRIBUTES.map((attribute) => ({
        attribute,
      })),
    }),
  })

  if (!response.ok) {
    throw new Error('Unable to load VM details.')
  }

  const groupsResponse = (await response.json()) as GroupsResponse
  const entityResult = groupsResponse.group_results?.[0]?.entity_results?.[0]

  return entityResult ? toVmEntity(entityResult) : undefined
}

export function VmDetailsPage() {
  const { vmId } = useParams({ strict: false })
  const { displayName, fromResearch } = useLocation({
    select: (location) => {
      const search = location.search as {
        displayName?: unknown
        fromResearch?: unknown
      }

      return {
        displayName:
          typeof search.displayName === 'string'
            ? search.displayName
            : undefined,
        fromResearch:
          typeof search.fromResearch === 'string'
            ? search.fromResearch
            : undefined,
      }
    },
  })
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('summary')
  const {
    data: vmEntity,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['vm-detail', vmId],
    queryFn: () => fetchVmEntity(vmId ?? ''),
    enabled: Boolean(vmId),
  })
  const handleBack = () => {
    if (fromResearch === 'entity-lookup-v1') {
      navigate({
        to: '/research-prototype-results',
        search: {
          scenario: 'entity-lookup',
          variation: 'v1',
        },
      })
      return
    }

    navigate({ to: '/vms' })
  }

  if (isLoading) {
    return (
      <StackingLayout padding="20px" itemGap="M">
        <Title size={Title.SIZES.H2}>Loading VM Details</Title>
        <TextLabel>Fetching VM details from Groups API.</TextLabel>
      </StackingLayout>
    )
  }

  if (isError || !vmEntity) {
    return (
      <StackingLayout padding="20px" itemGap="M">
        <Button type={Button.ButtonTypes.SECONDARY} onClick={handleBack}>
          Back to VMs
        </Button>
        <Title size={Title.SIZES.H2}>VM Not Found</Title>
        <TextLabel>The VM with ID "{vmId}" could not be found.</TextLabel>
      </StackingLayout>
    )
  }

  return (
    <StackingLayout itemGap="none" className="vm-details-page">
      <div className="vm-details-header">
        <FlexLayout itemGap="M" alignItems="center">
          <Button
            type={Button.ButtonTypes.ICON_DEFAULT}
            onClick={handleBack}
            aria-label="Back to VMs"
          >
            <ChevronLeftIcon />
          </Button>
          <span className="vm-details-tag">VM</span>
          <Title size={Title.SIZES.H3}>{displayName ?? vmEntity.name}</Title>
          <FlexLayout itemGap="XS" alignItems="center">
            <span className="vm-details-separator">|</span>
            <span className="vm-details-tag">Cluster</span>
            <span className="vm-details-breadcrumb">{vmEntity.cluster}</span>
            <span className="vm-details-separator">|</span>
            <span className="vm-details-tag">Host</span>
            <span className="vm-details-breadcrumb">{vmEntity.host}</span>
          </FlexLayout>
        </FlexLayout>
      </div>

      <Tabs
        data={VM_DETAILS_TABS}
        activeKey={activeTab}
        onTabClick={(key) => setActiveTab(key as string)}
        aria-label="VM details tabs"
      />

      {activeTab === 'summary' ? (
        <StackingLayout
          itemGap="L"
          className="vm-details-content"
          padding="20px"
        >
          <VmEbr detailsEntity={vmEntity} />
          <FlexLayout itemGap="L" alignItems="flex-start">
            <StackingLayout itemGap="L" className="vm-details-column">
              <DetailsWidget vm={vmEntity} />
              <ComputeWidget vm={vmEntity} />
              <StorageWidget vm={vmEntity} />
            </StackingLayout>
            <StackingLayout itemGap="L" className="vm-details-column">
              <PoliciesWidget vm={vmEntity} />
              <InfrastructureWidget vm={vmEntity} />
              <ExternalDevicesWidget vm={vmEntity} />
            </StackingLayout>
            <StackingLayout itemGap="L" className="vm-details-column">
              <PerformanceWidget vm={vmEntity} />
              <AlertsWidget vm={vmEntity} />
              <AnomaliesWidget vm={vmEntity} />
            </StackingLayout>
          </FlexLayout>
        </StackingLayout>
      ) : (
        <StackingLayout
          className="vm-details-content"
          padding="20px"
          itemGap="L"
        >
          <Title size={Title.SIZES.H3}>
            {VM_DETAILS_TABS.find((tab) => tab.key === activeTab)?.title}
          </Title>
        </StackingLayout>
      )}
    </StackingLayout>
  )
}

interface SummaryCardProps {
  title: string
  children: ReactNode
  headerAction?: ReactNode
  footerAction?: ReactNode
}

function SummaryCard({
  title,
  children,
  headerAction,
  footerAction,
}: SummaryCardProps) {
  return (
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
}

interface SummaryRowProps {
  label: string
  value: ReactNode
  labelTag?: string
}

function SummaryRow({ label, value, labelTag }: SummaryRowProps) {
  return (
    <div className="widget-row">
      <div className="widget-row-label">
        <TextLabel>{label}</TextLabel>
        {labelTag && <span className="widget-row-tag">{labelTag}</span>}
      </div>
      <div className="widget-row-value">{value}</div>
    </div>
  )
}

function DetailsWidget({ vm }: { vm: VmEntity }) {
  return (
    <SummaryCard title="Details">
      <StackingLayout itemGap="none">
        <SummaryRow label="Power State" value={vm.powerState} />
        <SummaryRow label="Description" value={vm.description} />
        <SummaryRow label="VM Uptime" value={vm.vmUptime} />
        <SummaryRow
          label="Boot Device"
          labelTag={vm.bootDeviceType}
          value={`${vm.bootDevice} (${vm.bootDeviceSize})`}
        />
        <SummaryRow label="Boot Configuration" value={vm.bootConfiguration} />
        <SummaryRow
          label="Guest OS"
          value={
            <span>
              <span className="text-secondary">
                {vm.os === 'Unknown' ? 'Info not available' : vm.os}.
              </span>{' '}
              <Link>Set up NGT</Link>
            </span>
          }
        />
        <SummaryRow
          label="Guest Customization Status"
          value={vm.guestCustomizationStatus}
        />
        <SummaryRow
          label="Secure Boot"
          value={vm.secureBoot ? 'Enabled' : 'Disabled'}
        />
        <SummaryRow
          label="Windows® Defender Credential"
          value={vm.credentialGuard ? 'Enabled' : 'Disabled'}
        />
        <SummaryRow
          label="Virtual Trusted Platform Module"
          value={vm.vTpm ? 'Attached' : 'Not Attached'}
        />
        <SummaryRow label="Owner" value={vm.owner} />
        <SummaryRow label="Agent VM" value={vm.agentVm ? 'Yes' : 'No'} />
      </StackingLayout>
    </SummaryCard>
  )
}

function ComputeWidget({ vm }: { vm: VmEntity }) {
  return (
    <SummaryCard title="Compute">
      <StackingLayout itemGap="none">
        <SummaryRow
          label="vCPU Configuration"
          value={`${vm.numVcpus} vCPUs | ${vm.coresPerVcpu} core per CPU`}
        />
        <SummaryRow label="Memory" value={vm.memory} />
        <SummaryRow label="Memory Overcommit" value="-" />
        <SummaryRow label="Advanced processor co..." value="-" />
      </StackingLayout>
    </SummaryCard>
  )
}

function StorageWidget({ vm }: { vm: VmEntity }) {
  return (
    <SummaryCard title="Storage">
      <StackingLayout itemGap="none">
        <SummaryRow
          label="Storage Properties Defined By"
          value={vm.storagePropertiesDefinedBy}
        />
        <SummaryRow
          label="Storage Policy"
          value={<Link>{vm.storagePolicy}</Link>}
        />
        <SummaryRow
          label="Policy Compliance"
          value={
            <FlexLayout itemGap="XS" alignItems="center">
              <CheckMarkIcon className="widget-icon-success" />
              <span>{vm.policyCompliance}</span>
            </FlexLayout>
          }
        />
        <SummaryRow
          label="Total Virtual Disks"
          value={<Link>{vm.totalVirtualDisks}</Link>}
        />
        <SummaryRow
          label="Total Storage (Logical)"
          value={vm.totalStorageLogical}
        />
        <SummaryRow label="Encryption" value={vm.encryption} />
        <SummaryRow label="Replication Factor" value={vm.replicationFactor} />
        <SummaryRow label="Compression" value={vm.compression} />
        <SummaryRow
          label="QoS Metric - Throttled IOPS"
          value={vm.qosThrottledIops}
        />
      </StackingLayout>
    </SummaryCard>
  )
}

function PoliciesWidget({ vm }: { vm: VmEntity }) {
  if (vm.categories === '-') {
    return (
      <SummaryCard
        title="Policies and Management"
        footerAction={<Link>View Mapping</Link>}
      >
        <div className="policies-empty-state">
          <TextLabel>No categories.</TextLabel>
          <TextLabel className="policies-empty-description">
            This entity doesn't have any categories associated with it yet.
          </TextLabel>
        </div>
      </SummaryCard>
    )
  }

  return (
    <SummaryCard
      title="Policies and Management"
      footerAction={<Link>View Mapping</Link>}
    >
      <StackingLayout itemGap="none">
        <SummaryRow label="Categories" value={vm.categories} />
        <SummaryRow label="Protection Policy" value={vm.protectionPolicy} />
        <SummaryRow label="Consistency Group" value={vm.consistencyGroup} />
        <SummaryRow
          label="Recovery Plans"
          value={<Link>{vm.recoveryPlans}</Link>}
        />
      </StackingLayout>
    </SummaryCard>
  )
}

function InfrastructureWidget({ vm }: { vm: VmEntity }) {
  return (
    <SummaryCard title="Infrastructure">
      <StackingLayout itemGap="none">
        <SummaryRow label="Domain" value={vm.domain} />
        <SummaryRow label="Cluster" value={<Link>{vm.cluster}</Link>} />
        <SummaryRow label="Host" value={<Link>{vm.host}</Link>} />
        <SummaryRow
          label="Host IP"
          value={
            <FlexLayout itemGap="XS" alignItems="center">
              <span>{vm.hostIp}</span>
              <CloneIcon className="widget-icon-action" />
            </FlexLayout>
          }
        />
      </StackingLayout>
    </SummaryCard>
  )
}

function ExternalDevicesWidget({ vm }: { vm: VmEntity }) {
  return (
    <SummaryCard
      title="External Devices (1 of 1)"
      headerAction={<span className="device-badge">GPU #1</span>}
    >
      <StackingLayout itemGap="none">
        <SummaryRow label="Type" value={vm.externalDeviceType} />
        <SummaryRow label="Mode" value={vm.externalDeviceMode} />
        <SummaryRow
          label="GPU Configuration"
          value={vm.externalDeviceConfiguration}
        />
      </StackingLayout>
    </SummaryCard>
  )
}

function PerformanceWidget({ vm }: { vm: VmEntity }) {
  return (
    <SummaryCard
      title="Performance"
      footerAction={<Link>View All Metrics</Link>}
    >
      <div className="performance-table">
        <div className="performance-header">
          <div className="performance-cell metric-name">Metric Name</div>
          <div className="performance-cell metric-value">Current</div>
          <div className="performance-cell metric-value">Peak</div>
        </div>
        {vm.performanceMetricNames.map((metricName, index) => (
          <div key={metricName} className="performance-row">
            <div className="performance-cell metric-name">{metricName}</div>
            <div className="performance-cell metric-value">
              {vm.performanceMetricCurrentValues[index] ?? '-'}
            </div>
            <div className="performance-cell metric-value">
              {vm.performanceMetricPeakValues[index] ?? '-'}
            </div>
          </div>
        ))}
      </div>
    </SummaryCard>
  )
}

function AlertsWidget({ vm }: { vm: VmEntity }) {
  const totalCritical = vm.alertCriticalCounts.reduce(
    (sum, count) => sum + count,
    0,
  )
  const totalWarning = vm.alertWarningCounts.reduce(
    (sum, count) => sum + count,
    0,
  )
  const totalInfo = vm.alertInfoCounts.reduce((sum, count) => sum + count, 0)

  return (
    <SummaryCard title="Alerts" headerAction={<Link>Last Week</Link>}>
      <div className="chart-placeholder">
        <div className="bar-chart">
          {vm.alertDates.map((date, index) => (
            <div key={date} className="bar-group">
              <div className="bar-stack">
                <div
                  className="bar bar-critical"
                  style={{
                    height: `${(vm.alertCriticalCounts[index] ?? 0) * 5}px`,
                  }}
                />
                <div
                  className="bar bar-warning"
                  style={{
                    height: `${(vm.alertWarningCounts[index] ?? 0) * 5}px`,
                  }}
                />
                <div
                  className="bar bar-info"
                  style={{
                    height: `${(vm.alertInfoCounts[index] ?? 0) * 5}px`,
                  }}
                />
              </div>
              <span className="bar-label">{date}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="chart-legend">
        <FlexLayout itemGap="M" justifyContent="center">
          <LegendItem
            className="legend-critical"
            label="Critical"
            count={totalCritical}
          />
          <LegendItem
            className="legend-warning"
            label="Warning"
            count={totalWarning}
          />
          <LegendItem className="legend-info" label="Info" count={totalInfo} />
        </FlexLayout>
      </div>
    </SummaryCard>
  )
}

function AnomaliesWidget({ vm }: { vm: VmEntity }) {
  return (
    <SummaryCard title="Anomalies" headerAction={<Link>Last Week</Link>}>
      <div className="chart-placeholder">
        <div className="bar-chart">
          {vm.anomalyDates.map((date, index) => (
            <div key={date} className="bar-group">
              <div className="bar-stack">
                <div
                  className="bar bar-memory"
                  style={{
                    height: `${(vm.anomalyMemoryValues[index] ?? 0) / 20}px`,
                  }}
                />
                <div
                  className="bar bar-io"
                  style={{
                    height: `${(vm.anomalyIoValues[index] ?? 0) / 20}px`,
                  }}
                />
                <div
                  className="bar bar-cpu"
                  style={{
                    height: `${(vm.anomalyCpuValues[index] ?? 0) / 20}px`,
                  }}
                />
                <div
                  className="bar bar-network"
                  style={{
                    height: `${(vm.anomalyNetworkValues[index] ?? 0) / 20}px`,
                  }}
                />
                <div
                  className="bar bar-disk"
                  style={{
                    height: `${(vm.anomalyDiskValues[index] ?? 0) / 20}px`,
                  }}
                />
                <div
                  className="bar bar-other"
                  style={{
                    height: `${(vm.anomalyOtherValues[index] ?? 0) / 20}px`,
                  }}
                />
              </div>
              <span className="bar-label">{date}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="chart-legend">
        <FlexLayout itemGap="S" justifyContent="center" flexWrap="wrap">
          <LegendItem className="legend-memory" label="Memory" />
          <LegendItem className="legend-io" label="IO" />
          <LegendItem className="legend-cpu" label="CPU" />
          <LegendItem className="legend-network" label="Network" />
          <LegendItem className="legend-disk" label="Disk" />
          <LegendItem className="legend-other" label="Other" />
        </FlexLayout>
      </div>
    </SummaryCard>
  )
}

interface LegendItemProps {
  className: string
  label: string
  count?: number
}

function LegendItem({ className, label, count }: LegendItemProps) {
  return (
    <FlexLayout itemGap="XS" alignItems="center">
      <span className={`legend-dot ${className}`} />
      <span className="legend-label">{label}</span>
      {count !== undefined && <Badge count={count} />}
    </FlexLayout>
  )
}
