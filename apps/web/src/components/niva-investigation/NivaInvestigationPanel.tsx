import {
  AIIcon,
  Badge,
  Button,
  FlexLayout,
  Link,
  Loader,
  SidePanel,
  StackingLayout,
  Table,
  TextArea,
  TextLabel,
  Title,
  UploadIcon,
} from '@nutanix-ui/prism-reactjs'
import type { TableColumn } from '@nutanix-ui/prism-reactjs/lib/components/v2/Tables/Table'
import { useEffect, useState } from 'react'
import './NivaInvestigationPanel.css'

export const INVESTIGATION_QUERY = 'Why are my VMs slow on Cluster ABC'

const OPEN_NIVA_INVESTIGATION_EVENT = 'niva-investigation-open'
const CLOSE_NIVA_INVESTIGATION_EVENT = 'niva-investigation-close'

type NivaPresentation = 'default' | 'expanded'

export interface NivaInvestigationOpenDetail {
  query: string
  presentation?: NivaPresentation
}

export const openNivaInvestigation = (
  query = INVESTIGATION_QUERY,
  presentation: NivaPresentation = 'default',
) => {
  globalThis.dispatchEvent(
    new CustomEvent<NivaInvestigationOpenDetail>(OPEN_NIVA_INVESTIGATION_EVENT, {
      detail: { presentation, query },
    }),
  )
}

export const closeNivaInvestigation = () => {
  globalThis.dispatchEvent(new CustomEvent(CLOSE_NIVA_INVESTIGATION_EVENT))
}

export const addNivaInvestigationListener = (
  handler: (detail: NivaInvestigationOpenDetail) => void,
) => {
  const listener = (event: Event) => {
    handler((event as CustomEvent<NivaInvestigationOpenDetail>).detail)
  }

  globalThis.addEventListener(OPEN_NIVA_INVESTIGATION_EVENT, listener)

  return () => {
    globalThis.removeEventListener(OPEN_NIVA_INVESTIGATION_EVENT, listener)
  }
}

export const addNivaInvestigationCloseListener = (handler: () => void) => {
  globalThis.addEventListener(CLOSE_NIVA_INVESTIGATION_EVENT, handler)

  return () => {
    globalThis.removeEventListener(CLOSE_NIVA_INVESTIGATION_EVENT, handler)
  }
}

interface NivaInvestigationPanelProps {
  visible: boolean
  query: string
  presentation?: NivaPresentation
  onClose: () => void
}

const StepSummary = () => (
  <FlexLayout itemGap="S" alignItems="center">
    <AIIcon aria-hidden={true} />
    <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
      4 steps · 3 sources
    </TextLabel>
  </FlexLayout>
)

interface NivaEntityRow {
  key: string
  name: string
  status: 'Warning' | 'Healthy'
  context: string
  activeAlerts: number
  signal: string
  actions: string[]
}

const NIVA_ENTITY_ROWS: NivaEntityRow[] = [
  {
    key: 'vm-prod-web-01',
    name: 'vm-prod-web-01',
    status: 'Warning',
    context: 'Cluster ABC · Host 03',
    activeAlerts: 3,
    signal: 'CPU peak 91%',
    actions: ['Open', 'View alerts', 'Compare'],
  },
  {
    key: 'vm-prod-api-05',
    name: 'vm-prod-api-05',
    status: 'Warning',
    context: 'Cluster ABC · Host 08',
    activeAlerts: 2,
    signal: 'Elevated latency',
    actions: ['Open', 'View alerts', 'Compare'],
  },
  {
    key: 'vm-prod-db-01',
    name: 'vm-prod-db-01',
    status: 'Warning',
    context: 'Cluster DEF · Host 02',
    activeAlerts: 1,
    signal: 'Storage latency warning',
    actions: ['Open', 'View alerts', 'Compare'],
  },
  {
    key: 'vm-prod-web-02',
    name: 'vm-prod-web-02',
    status: 'Healthy',
    context: 'Cluster ABC · Host 04',
    activeAlerts: 0,
    signal: 'Recently accessed',
    actions: ['Open', 'Compare'],
  },
  {
    key: 'vm-prod-cache-03',
    name: 'vm-prod-cache-03',
    status: 'Healthy',
    context: 'Cluster ABC · Host 06',
    activeAlerts: 0,
    signal: 'Name match only',
    actions: ['Open'],
  },
]

const NIVA_SUMMARY_CARDS = [
  { label: 'Matching VMs', value: '12' },
  { label: 'VMs with active issues', value: '3' },
  { label: 'Total active alerts', value: '6' },
  { label: 'Highest CPU', value: 'vm-prod-web-01', detail: '91%' },
]

const NIVA_FILTERS = [
  'Only Cluster ABC',
  'Only unhealthy VMs',
  'Sort by severity',
  'Sort alphabetically',
  'Group by cluster',
  'Recently accessed',
]

const NIVA_FOLLOW_UP_PROMPTS = [
  'Which VM has the highest CPU?',
  'Compare vm-prod-web-01 and vm-prod-web-02.',
  'Show only VMs in Cluster ABC.',
  'Show related events from the last hour.',
  'Open the VM with active alerts.',
]

function NivaStatusBadge({ status }: { status: NivaEntityRow['status'] }) {
  return (
    <Badge
      color={
        status === 'Warning'
          ? Badge.BadgeColorTypes.YELLOW
          : Badge.BadgeColorTypes.GREEN
      }
      count={status}
      type={Badge.BadgeTypes.TAG}
    />
  )
}

const nivaEntityColumns: TableColumn[] = [
  {
    title: 'VM name',
    key: 'name',
    render: (name) => <Link href="/vms">{name}</Link>,
  },
  {
    title: 'Status',
    key: 'status',
    render: (status: NivaEntityRow['status']) => <NivaStatusBadge status={status} />,
  },
  {
    title: 'Cluster / host',
    key: 'context',
  },
  {
    title: 'Active alerts',
    key: 'activeAlerts',
  },
  {
    title: 'Key signal',
    key: 'signal',
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (actions: string[]) => (
      <FlexLayout itemGap="S" flexWrap="wrap">
        {actions.map((action) => (
          <Link key={action} href="/vms">
            {action}
          </Link>
        ))}
      </FlexLayout>
    ),
  },
]

const EntityLookupResponse = () => (
  <StackingLayout itemGap="XL" className="niva-assistant-response">
    <FlexLayout itemGap="S" alignItems="center">
      <AIIcon aria-hidden={true} />
      <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
        NIVA dashboard · 12 matches · 6 active alerts
      </TextLabel>
    </FlexLayout>

    <TextLabel>
      I found 12 VMs matching "vm-prod." Three have active issues.
      vm-prod-web-01 appears most urgent because it has a CPU anomaly and 3
      related alerts in the last hour. You can open it, compare it with other
      matches, or narrow the results.
    </TextLabel>

    <FlexLayout itemGap="M" flexWrap="wrap">
      {NIVA_SUMMARY_CARDS.map((card) => (
        <StackingLayout
          key={card.label}
          itemGap="XS"
          padding="15px"
          background="base"
          className="niva-summary-card"
        >
          <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
            {card.label}
          </TextLabel>
          <Title size={Title.SIZES.H3}>{card.value}</Title>
          {card.detail ? (
            <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
              {card.detail}
            </TextLabel>
          ) : undefined}
        </StackingLayout>
      ))}
    </FlexLayout>

    <StackingLayout itemGap="S">
      <TextLabel>Refine results</TextLabel>
      <FlexLayout itemGap="S" flexWrap="wrap">
        {NIVA_FILTERS.map((filter) => (
          <Badge
            key={filter}
            color={Badge.BadgeColorTypes.GRAY}
            count={filter}
            type={Badge.BadgeTypes.TAG}
          />
        ))}
      </FlexLayout>
    </StackingLayout>

    <Table
      aria-label="Prioritized matching VMs"
      border={true}
      columns={nivaEntityColumns}
      dataSource={NIVA_ENTITY_ROWS}
      rowKey="key"
      className="niva-dashboard-table"
    />

    <StackingLayout
      itemGap="S"
      padding="15px-20px"
      background="base"
      className="niva-next-steps"
    >
      <Title size={Title.SIZES.H4}>Top matching VMs by active alerts</Title>
      <FlexLayout alignItems="flex-end" itemGap="M" className="niva-bar-chart">
        {NIVA_ENTITY_ROWS.map((row) => (
          <FlexLayout
            key={row.key}
            flexDirection="column"
            itemGap="XS"
            alignItems="center"
          >
            <StackingLayout
              aria-label={`${row.name}: ${row.activeAlerts} active alerts`}
              className={`niva-alert-bar niva-alert-bar--${row.activeAlerts}`}
            />
            <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
              {row.name.replace('vm-prod-', '')}
            </TextLabel>
          </FlexLayout>
        ))}
      </FlexLayout>
    </StackingLayout>

    <StackingLayout itemGap="S">
      <Title size={Title.SIZES.H4}>Suggested follow-up prompts</Title>
      <FlexLayout itemGap="S" flexWrap="wrap">
        {NIVA_FOLLOW_UP_PROMPTS.map((prompt) => (
          <Button key={prompt} type={Button.ButtonTypes.SECONDARY}>
            {prompt}
          </Button>
        ))}
      </FlexLayout>
    </StackingLayout>
  </StackingLayout>
)

const InvestigationResponse = () => (
  <StackingLayout itemGap="XL" className="niva-assistant-response">
    <StepSummary />

    <TextLabel>
      Cluster ABC is most likely slowing VMs because multiple workloads are
      contending for storage and CPU on the same hosts. I also found recent
      warning signals that line up with the reported slowdown window.
    </TextLabel>

    <StackingLayout itemGap="M">
      <Title size={Title.SIZES.H4}>Likely contributors</Title>
      <FindingRow
        clusterSignal="Storage latency"
        impact="High"
        detail="Datastore write latency is elevated on hosts running the busiest VMs."
      />
      <FindingRow
        clusterSignal="CPU ready"
        impact="Medium"
        detail="Several VMs are waiting for scheduler time during peak activity."
      />
      <FindingRow
        clusterSignal="Noisy neighbor"
        impact="Medium"
        detail="A small set of backup and analytics VMs are consuming disproportionate IO."
      />
    </StackingLayout>

    <StackingLayout
      itemGap="S"
      padding="15px-20px"
      background="base"
      className="niva-next-steps"
    >
      <Title size={Title.SIZES.H4}>Recommended next steps</Title>
      <TextLabel>
        Move the top IO consumers away from Cluster ABC, then recheck VM latency
        after the next polling interval.
      </TextLabel>
      <FlexLayout itemGap="S" alignItems="center">
        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
          View in Prism:
        </TextLabel>
        <Link href="/vms">VMs</Link>
        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>|</TextLabel>
        <Link href="/vms">Cluster details</Link>
      </FlexLayout>
    </StackingLayout>

    <FlexLayout itemGap="S" justifyContent="flex-end">
      <Button type={Button.ButtonTypes.TEXT_SECONDARY}>Not helpful</Button>
      <Button type={Button.ButtonTypes.TEXT_PRIMARY}>Helpful</Button>
    </FlexLayout>
  </StackingLayout>
)

const FindingRow = ({
  clusterSignal,
  impact,
  detail,
}: {
  clusterSignal: string
  impact: string
  detail: string
}) => (
  <StackingLayout
    itemGap="S"
    padding="15px-20px"
    background="base"
    className="niva-finding-row"
  >
    <FlexLayout alignItems="center" justifyContent="space-between" itemGap="M">
      <TextLabel>{clusterSignal}</TextLabel>
      <Badge color={Badge.BadgeColorTypes.YELLOW} count={impact} />
    </FlexLayout>
    <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>{detail}</TextLabel>
  </StackingLayout>
)

export function NivaInvestigationPanel({
  visible,
  query,
  presentation = 'default',
  onClose,
}: NivaInvestigationPanelProps) {
  const [loading, setLoading] = useState(false)
  const [draftMessage, setDraftMessage] = useState('')
  const isEntityLookup = query.toLowerCase().includes('vm-prod')
  const isExpanded = presentation === 'expanded'

  useEffect(() => {
    if (!visible) {
      return
    }

    setLoading(true)
    const timer = globalThis.setTimeout(() => setLoading(false), 1400)

    return () => globalThis.clearTimeout(timer)
  }, [query, visible])

  return (
    <SidePanel
      visible={visible}
      title={
        <FlexLayout alignItems="center" itemGap="S">
          <AIIcon aria-hidden={true} />
          <span>{isExpanded ? 'NIVA dashboard' : 'NIVA investigation'}</span>
        </FlexLayout>
      }
      onClose={onClose}
      size={SidePanel.SidePanelSize.SMALL}
      sizeStyleMap={{
        small: { width: isExpanded ? '50vw' : '30vw' },
        large: { width: isExpanded ? '50vw' : '30vw' },
      }}
      enableFocusTrap={true}
      restoreFocus={true}
      className={
        isExpanded
          ? 'niva-investigation-panel niva-investigation-panel--expanded'
          : 'niva-investigation-panel'
      }
      closeBtnProps={{ 'aria-label': 'Close NIVA investigation' }}
    >
      <StackingLayout itemGap="none" className="niva-panel-body">
        <StackingLayout itemGap="XL" padding="20px" className="niva-conversation">
          <FlexLayout justifyContent="flex-end">
            <StackingLayout
              padding="15px"
              background="body"
              className="niva-user-prompt"
            >
              <TextLabel>{query}</TextLabel>
            </StackingLayout>
          </FlexLayout>

          {loading ? (
            <StackingLayout
              itemGap="M"
              padding="20px"
              background="base"
              className="niva-loading-card"
            >
              <Loader
                loading={true}
                tip={
                  isEntityLookup
                    ? 'Checking matching VMs and current signals...'
                    : 'Investigating Cluster ABC signals...'
                }
              />
              <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                {isEntityLookup
                  ? 'Looking at matching VM names, anomaly status, and recent CPU metrics.'
                  : 'Checking VM latency, host contention, storage latency, and recent alerts.'}
              </TextLabel>
            </StackingLayout>
          ) : (
            <>
              {isEntityLookup ? <EntityLookupResponse /> : <InvestigationResponse />}
            </>
          )}
        </StackingLayout>
        <StackingLayout itemGap="S" className="niva-chat-composer-shell">
          <StackingLayout padding="10px" background="base" className="niva-chat-composer">
            <TextArea
              value={draftMessage}
              onChange={(event) => setDraftMessage(event.currentTarget.value)}
              placeholder={
                isEntityLookup
                  ? 'Ask NIVA to narrow, compare, or investigate these VMs...'
                  : 'Ask or search for anything'
              }
              aria-label="Ask NIVA"
              rows={3}
              resize="none"
              borderless={true}
              className="niva-chat-composer-input"
            />
            <FlexLayout alignItems="center" justifyContent="space-between">
              <TextLabel
                className="niva-chat-mention"
                type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
              >
                @
              </TextLabel>
              <Button
                type={Button.ButtonTypes.PRIMARY}
                aria-label="Send message"
                disabled={!draftMessage}
              >
                <UploadIcon aria-hidden={true} />
              </Button>
            </FlexLayout>
          </StackingLayout>
          <TextLabel
            aria-hidden={true}
            className="niva-chat-disclaimer-placeholder"
            type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
          >
            &nbsp;
          </TextLabel>
        </StackingLayout>
      </StackingLayout>
    </SidePanel>
  )
}
