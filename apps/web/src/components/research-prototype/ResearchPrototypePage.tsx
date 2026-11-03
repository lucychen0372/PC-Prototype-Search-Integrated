import {
  AIIcon,
  Alert,
  AlertIcon,
  Badge,
  Button,
  FlexLayout,
  Link,
  Loader,
  LineChartIcon,
  NavigationIcon,
  Select,
  StackingLayout,
  Table,
  TextArea,
  TextLabel,
  Title,
  UploadIcon,
  VMIcon,
} from '@nutanix-ui/prism-reactjs'
import type { TableColumn } from '@nutanix-ui/prism-reactjs/lib/components/v2/Tables/Table'
import type { SelectRowData } from '@nutanix-ui/prism-reactjs/lib/components/v2/Select/Select'
import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { PageHeader } from '~/components/common'
import { DashboardPc } from '~/components/dashboard'
import {
  closeNivaInvestigation,
  openNivaInvestigation,
} from '~/components/niva-investigation/NivaInvestigationPanel'
import { SearchResultsV1Page } from '~/components/SearchResultsV1Page'
import './ResearchPrototypePage.css'

export type ScenarioId = 'entity-lookup' | 'investigation' | 'scoped-view'
export type VariationId = 'v1' | 'v2' | 'v3'

interface PrototypeScenario {
  id: ScenarioId
  label: string
  variations: PrototypeVariation[]
}

interface PrototypeVariation {
  id: VariationId
  label: string
  description: string
  render: () => JSX.Element
}

interface ConceptPreviewOption {
  id: VariationId
  label: string
  description: string
}

interface VmResult {
  name: string
  region: 'East-1' | 'West-2'
  hasAnomaly?: boolean
}

const ENTITY_QUERY = 'vm-prod'
const SCOPED_VIEW_QUERY = 'CPU alerts in Cluster ABC'
const RESEARCH_QUERY_CHANGE_EVENT = 'research-prototype-query-change'
const EXIT_NIVA_WORKSPACE_EVENT = 'research-prototype-exit-niva-workspace'
const CONCEPT_PREVIEW_VIEW_RESULTS_EVENT =
  'research-prototype-concept-preview-view-results'

const VM_PROD_WEB_01: VmResult = { name: 'vm-prod-web-01', region: 'East-1' }
const VM_PROD_WEB_02: VmResult = { name: 'vm-prod-web-02', region: 'East-1' }
const VM_PROD_WORKER_07: VmResult = { name: 'vm-prod-worker-07', region: 'East-1' }
const VM_PROD_WORKER_10: VmResult = { name: 'vm-prod-worker-10', region: 'West-2' }
const VM_PROD_DB_01: VmResult = {
  name: 'vm-prod-db-01',
  region: 'East-1',
  hasAnomaly: true,
}
const VM_PROD_CACHE_03: VmResult = {
  name: 'vm-prod-cache-03',
  region: 'West-2',
}
const VM_PROD_API_05: VmResult = { name: 'vm-prod-api-05', region: 'West-2' }
const VM_PROD_BATCH_09: VmResult = { name: 'vm-prod-batch-09', region: 'East-1' }
const VM_PROD_JOBS_11: VmResult = { name: 'vm-prod-jobs-11', region: 'West-2' }
const VM_PROD_QUEUE_04: VmResult = { name: 'vm-prod-queue-04', region: 'East-1' }
const VM_PROD_REPORT_12: VmResult = { name: 'vm-prod-report-12', region: 'West-2' }
const VM_PROD_SEARCH_08: VmResult = { name: 'vm-prod-search-08', region: 'East-1' }

const ALPHABETICAL_VM_RESULTS: VmResult[] = [
  VM_PROD_API_05,
  VM_PROD_BATCH_09,
  VM_PROD_CACHE_03,
  VM_PROD_DB_01,
  VM_PROD_JOBS_11,
  VM_PROD_QUEUE_04,
  VM_PROD_REPORT_12,
  VM_PROD_SEARCH_08,
  VM_PROD_WEB_01,
  VM_PROD_WEB_02,
  VM_PROD_WORKER_07,
  VM_PROD_WORKER_10,
]

const VM_DETAIL_IDS_BY_NAME: Record<string, string> = {
  'vm-prod-api-05': '1',
  'vm-prod-batch-09': '2',
  'vm-prod-cache-03': '3',
  'vm-prod-db-01': '4',
  'vm-prod-jobs-11': '5',
  'vm-prod-queue-04': '6',
  'vm-prod-report-12': '7',
  'vm-prod-search-08': '8',
  'vm-prod-web-01': '9',
  'vm-prod-web-02': '10',
  'vm-prod-worker-07': '11',
  'vm-prod-worker-10': '12',
}

const getVmDetailHref = (result: VmResult) => {
  const detailId = VM_DETAIL_IDS_BY_NAME[result.name] ?? '1'
  const displayName = encodeURIComponent(result.name)

  return `/vms/${detailId}?displayName=${displayName}&fromResearch=entity-lookup-v1`
}

interface RankedVmTableRow {
  key: string
  name: string
  context: string
  status: 'Warning' | 'Healthy'
  reason: string
  lastUpdated?: string
}

const V2_RANKED_VM_ROWS: RankedVmTableRow[] = [
  {
    key: 'vm-prod-web-01',
    name: 'vm-prod-web-01',
    context: 'Cluster ABC · Host 03',
    status: 'Warning',
    reason: 'CPU anomaly detected in the last hour',
    lastUpdated: '5 min ago',
  },
  {
    key: 'vm-prod-api-05',
    name: 'vm-prod-api-05',
    context: 'Cluster ABC · Host 08',
    status: 'Warning',
    reason: '2 active alerts',
    lastUpdated: '9 min ago',
  },
  {
    key: 'vm-prod-db-01',
    name: 'vm-prod-db-01',
    context: 'Cluster DEF · Host 02',
    status: 'Warning',
    reason: 'Recent storage latency warning',
    lastUpdated: '18 min ago',
  },
  {
    key: 'vm-prod-web-02',
    name: 'vm-prod-web-02',
    context: 'Cluster ABC · Host 04',
    status: 'Healthy',
    reason: 'Recently accessed, no active alerts',
    lastUpdated: '22 min ago',
  },
  {
    key: 'vm-prod-cache-03',
    name: 'vm-prod-cache-03',
    context: 'Cluster ABC · Host 06',
    status: 'Healthy',
    reason: 'Name match only',
    lastUpdated: '31 min ago',
  },
  {
    key: 'vm-prod-batch-09',
    name: 'vm-prod-batch-09',
    context: 'Cluster ABC · Host 11',
    status: 'Healthy',
    reason: 'Name match only',
    lastUpdated: '34 min ago',
  },
  {
    key: 'vm-prod-jobs-11',
    name: 'vm-prod-jobs-11',
    context: 'Cluster DEF · Host 09',
    status: 'Healthy',
    reason: 'Name match only',
    lastUpdated: '39 min ago',
  },
  {
    key: 'vm-prod-queue-04',
    name: 'vm-prod-queue-04',
    context: 'Cluster ABC · Host 07',
    status: 'Healthy',
    reason: 'Name match only',
    lastUpdated: '43 min ago',
  },
  {
    key: 'vm-prod-report-12',
    name: 'vm-prod-report-12',
    context: 'Cluster DEF · Host 12',
    status: 'Healthy',
    reason: 'Name match only',
    lastUpdated: '48 min ago',
  },
  {
    key: 'vm-prod-search-08',
    name: 'vm-prod-search-08',
    context: 'Cluster ABC · Host 10',
    status: 'Healthy',
    reason: 'Name match only',
    lastUpdated: '52 min ago',
  },
  {
    key: 'vm-prod-worker-07',
    name: 'vm-prod-worker-07',
    context: 'Cluster ABC · Host 05',
    status: 'Healthy',
    reason: 'Name match only',
    lastUpdated: '55 min ago',
  },
  {
    key: 'vm-prod-worker-10',
    name: 'vm-prod-worker-10',
    context: 'Cluster DEF · Host 13',
    status: 'Healthy',
    reason: 'Name match only',
    lastUpdated: '58 min ago',
  },
]

const V3_METRICS = [
  { label: 'CPU peak', value: '91%', detail: 'in last hour' },
  { label: 'Memory', value: '72%', detail: 'current usage' },
  { label: 'Storage latency', value: 'Elevated', detail: 'warning signal' },
  { label: 'Active alerts', value: '3', detail: 'related alerts' },
  {
    label: 'Last event',
    value: 'Migration',
    detail: 'completed 35 min ago',
  },
]

const CPU_TREND_POINTS = [
  { time: '10:00', value: 48 },
  { time: '10:10', value: 52 },
  { time: '10:20', value: 66 },
  { time: '10:30', value: 89 },
  { time: '10:40', value: 91 },
  { time: '10:50', value: 84 },
  { time: '11:00', value: 78 },
]

interface EntityRelatedAlertRow {
  key: string
  title: string
  severity: 'Critical' | 'Warning'
  lastSeen: string
  source: string
}

const ENTITY_RELATED_ALERTS: EntityRelatedAlertRow[] = [
  {
    key: 'cpu-sustained',
    title: 'High CPU usage detected on vm-prod-web-01',
    severity: 'Critical',
    lastSeen: '5 min ago',
    source: 'CPU anomaly policy',
  },
  {
    key: 'cpu-spike',
    title: 'CPU peak exceeded production threshold',
    severity: 'Critical',
    lastSeen: '14 min ago',
    source: 'Cluster ABC alert policy',
  },
  {
    key: 'migration-correlation',
    title: 'CPU remained elevated after workload migration',
    severity: 'Warning',
    lastSeen: '35 min ago',
    source: 'Event correlation',
  },
]

function AiLabel({ children }: { children: ReactNode }) {
  return (
    <FlexLayout alignItems="center" itemGap="S">
      <AIIcon aria-hidden={true} />
      <TextLabel>{children}</TextLabel>
    </FlexLayout>
  )
}

const CONCEPT_PREVIEW_OPTIONS: ConceptPreviewOption[] = [
  {
    id: 'v1',
    label: 'V1',
    description: 'Fully Separate',
  },
  {
    id: 'v2',
    label: 'V2',
    description: 'AI Summary',
  },
  {
    id: 'v3',
    label: 'V3',
    description: 'Fully Merged',
  },
]

function ConceptDashboardSearchStage() {
  return (
    <StackingLayout
      itemGap="none"
      background="body"
      className="research-concept-dashboard-step"
    >
      <PageHeader title="Main Dashboard" />
      <StackingLayout itemGap="none" className="research-concept-dashboard-canvas">
        <DashboardPc />
      </StackingLayout>
    </StackingLayout>
  )
}

function ConceptResultRows() {
  return (
    <StackingLayout itemGap="S">
      {[
        ['Matching entity A', 'Entity metadata · Context'],
        ['Matching entity B', 'Entity metadata · Context'],
        ['Matching entity C', 'Entity metadata · Context'],
      ].map(([title, metadata]) => (
        <FlexLayout
          key={title}
          alignItems="center"
          itemGap="M"
          padding="15px-20px"
          background="base"
          className="research-result-row"
        >
          <NavigationIcon aria-hidden={true} className="research-neutral-icon" />
          <StackingLayout itemGap="XS">
            <TextLabel>{title}</TextLabel>
            <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
              {metadata}
            </TextLabel>
          </StackingLayout>
        </FlexLayout>
      ))}
    </StackingLayout>
  )
}

function ConceptPreviewV1() {
  const [previewStage, setPreviewStage] = useState<'search' | 'results'>('search')

  useEffect(() => {
    const handleViewResults = (event: Event) => {
      const detail = (event as CustomEvent<{ variation: VariationId }>).detail

      if (detail.variation === 'v1') {
        setPreviewStage('results')
      }
    }

    globalThis.addEventListener(
      CONCEPT_PREVIEW_VIEW_RESULTS_EVENT,
      handleViewResults,
    )

    return () => {
      globalThis.removeEventListener(
        CONCEPT_PREVIEW_VIEW_RESULTS_EVENT,
        handleViewResults,
      )
    }
  }, [])

  if (previewStage === 'results') {
    return (
      <StackingLayout itemGap="none">
        <EntityCanvas>
          <Alert
            className="research-niva-alert"
            type={Alert.AlertTypes.SUPPLEMENTARY}
            showCloseIcon={false}
            contentWrapperProps={{ className: 'research-niva-alert-content' }}
            message={
              <FlexLayout
                alignItems="center"
                justifyContent="flex-start"
                itemGap="M"
                className="research-niva-alert-row"
              >
                <AiLabel>Optional Ask NIVA entry</AiLabel>
                <Button
                  type={Button.ButtonTypes.PRIMARY}
                  onClick={() => openNivaInvestigation('[search query]')}
                >
                  Ask NIVA
                </Button>
              </FlexLayout>
            }
          />
          <TextLabel>Matching entities</TextLabel>
          <ConceptResultRows />
        </EntityCanvas>
      </StackingLayout>
    )
  }

  return <ConceptDashboardSearchStage />
}

function ConceptPreviewV2() {
  const [previewStage, setPreviewStage] = useState<'search' | 'results'>('search')

  useEffect(() => {
    const handleViewResults = (event: Event) => {
      const detail = (event as CustomEvent<{ variation: VariationId }>).detail

      if (detail.variation === 'v2') {
        setPreviewStage('results')
      }
    }

    globalThis.addEventListener(
      CONCEPT_PREVIEW_VIEW_RESULTS_EVENT,
      handleViewResults,
    )

    return () => {
      globalThis.removeEventListener(
        CONCEPT_PREVIEW_VIEW_RESULTS_EVENT,
        handleViewResults,
      )
    }
  }, [])

  if (previewStage === 'results') {
    return (
      <StackingLayout itemGap="none">
        <EntityCanvas>
          <StackingLayout
            itemGap="L"
            padding="20px"
            background="base"
            className="research-ai-container research-ai-container--folded"
          >
            <FlexLayout alignItems="center" justifyContent="space-between" itemGap="M">
              <AiLabel>AI summary box</AiLabel>
              <Badge
                color={Badge.BadgeColorTypes.BLUE}
                count="AI Summary"
                type={Badge.BadgeTypes.TAG}
              />
            </FlexLayout>
            <TextLabel>
              Placeholder summary explains the interpreted query, important
              context, and why some matches may be prioritized.
            </TextLabel>
            <FlexLayout itemGap="M" flexWrap="wrap">
              {['Interpreted query', 'Prioritized signal', 'Suggested scope'].map(
                (label) => (
                  <StackingLayout
                    key={label}
                    itemGap="XS"
                    padding="15px"
                    background="body"
                    className="research-metric-card"
                  >
                    <TextLabel>{label}</TextLabel>
                    <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                      Placeholder
                    </TextLabel>
                  </StackingLayout>
                ),
              )}
            </FlexLayout>
          </StackingLayout>
          <TextLabel>Matching entries</TextLabel>
          <ConceptResultRows />
        </EntityCanvas>
      </StackingLayout>
    )
  }

  return <ConceptDashboardSearchStage />
}

function ConceptPreviewV3() {
  const [previewStage, setPreviewStage] = useState<'search' | 'niva'>('search')
  const [firstAnswer, setFirstAnswer] = useState<string | undefined>()
  const [secondAnswer, setSecondAnswer] = useState<string | undefined>()
  const [draftMessage, setDraftMessage] = useState('')

  useEffect(() => {
    const handleViewResults = (event: Event) => {
      const detail = (event as CustomEvent<{ variation: VariationId }>).detail

      if (detail.variation === 'v3') {
        setPreviewStage('niva')
      }
    }

    globalThis.addEventListener(
      CONCEPT_PREVIEW_VIEW_RESULTS_EVENT,
      handleViewResults,
    )

    return () => {
      globalThis.removeEventListener(
        CONCEPT_PREVIEW_VIEW_RESULTS_EVENT,
        handleViewResults,
      )
    }
  }, [])

  if (previewStage === 'search') {
    return <ConceptDashboardSearchStage />
  }

  const handleConceptOption = (option: string) => {
    if (!firstAnswer) {
      setFirstAnswer(option)
      return
    }

    if (!secondAnswer) {
      setSecondAnswer(option)
    }
  }

  const handleConceptMessageSend = () => {
    const message = draftMessage.trim()

    if (!message) {
      return
    }

    handleConceptOption(message)
    setDraftMessage('')
  }

  return (
    <StackingLayout itemGap="none" className="research-screen research-niva-workspace">
      <FlexLayout
        alignItems="center"
        itemGap="M"
        padding="0px-20px"
        className="page-header research-niva-workspace-header"
      >
        <Button
          type={Button.ButtonTypes.SECONDARY}
          onClick={() => setPreviewStage('search')}
        >
          Exit preview
        </Button>
        <Title size={Title.SIZES.H2}>NIVA</Title>
        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
          Concept preview - fully merged
        </TextLabel>
      </FlexLayout>
      <FlexLayout itemGap="none" className="research-niva-workspace-body">
        <StackingLayout
          itemGap="L"
          padding="20px"
          background="body"
          className="research-niva-dashboard-pane"
        >
          <StackingLayout itemGap="XS">
            <AiLabel>NIVA dashboard overlay</AiLabel>
            <Title size={Title.SIZES.H3}>
              {secondAnswer
                ? 'Generated dashboard with follow-up section'
                : firstAnswer
                ? 'Generating dashboard from clarification'
                : 'Waiting for clarification'}
            </Title>
            <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
              {secondAnswer
                ? 'The dashboard keeps the original query context and adds a second generated placeholder section.'
                : firstAnswer
                ? 'NIVA used the selected option to generate the first placeholder dashboard section.'
                : 'NIVA will ask questions in the side panel before generating dashboard content.'}
            </TextLabel>
          </StackingLayout>
          <StackingLayout
            itemGap="S"
            padding="15px"
            background="base"
            className="research-generation-card"
          >
            <Title size={Title.SIZES.H4}>Progress</Title>
            <FlexLayout itemGap="S" flexWrap="wrap">
              <Badge
                color={Badge.BadgeColorTypes.GREEN}
                count="Search query received"
                type={Badge.BadgeTypes.TAG}
              />
              <Badge
                color={
                  firstAnswer
                    ? Badge.BadgeColorTypes.GREEN
                    : Badge.BadgeColorTypes.GRAY
                }
                count="Clarification 1"
                type={Badge.BadgeTypes.TAG}
              />
              <Badge
                color={
                  secondAnswer
                    ? Badge.BadgeColorTypes.GREEN
                    : Badge.BadgeColorTypes.GRAY
                }
                count="Clarification 2"
                type={Badge.BadgeTypes.TAG}
              />
            </FlexLayout>
          </StackingLayout>
          {firstAnswer ? (
            <StackingLayout
              itemGap="M"
              padding="20px"
              background="base"
              className="research-highlight-card"
            >
              <Title size={Title.SIZES.H4}>Generated section 1</Title>
              <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                Placeholder content generated after the first clarification.
              </TextLabel>
              <FlexLayout itemGap="M" flexWrap="wrap">
                {['Summary placeholder', 'Result placeholder', 'Context placeholder'].map((label) => (
                  <StackingLayout
                    key={label}
                    itemGap="XS"
                    padding="15px"
                    background="body"
                    className="research-metric-card"
                  >
                    <TextLabel>{label}</TextLabel>
                    <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                      Generated
                    </TextLabel>
                  </StackingLayout>
                ))}
              </FlexLayout>
            </StackingLayout>
          ) : (
            <StackingLayout
              itemGap="M"
              padding="20px"
              background="base"
              className="research-generation-card"
            >
              <Loader loading={true} tip="Waiting for option..." />
              <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                Dashboard content appears after the user answers NIVA.
              </TextLabel>
            </StackingLayout>
          )}
          {secondAnswer ? (
            <StackingLayout
              itemGap="M"
              padding="20px"
              background="base"
              className="research-highlight-card"
            >
              <Title size={Title.SIZES.H4}>Generated section 2</Title>
              <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                A second placeholder section is added after the next NIVA option.
              </TextLabel>
              <StackingLayout
                itemGap="S"
                padding="15px"
                background="body"
                className="research-chart-card"
              >
                <Title size={Title.SIZES.H4}>Placeholder visualization</Title>
                <FlexLayout alignItems="flex-end" itemGap="M" className="research-scoped-bar-chart">
                  {[3, 2, 1].map((value) => (
                    <FlexLayout
                      key={`${secondAnswer}-${value}`}
                      flexDirection="column"
                      alignItems="center"
                      itemGap="XS"
                    >
                      <StackingLayout
                        aria-label={`${value} generated blocks`}
                        className={`research-scoped-alert-bar research-scoped-alert-bar--${value}`}
                      />
                      <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                        Block {value}
                      </TextLabel>
                    </FlexLayout>
                  ))}
                </FlexLayout>
              </StackingLayout>
            </StackingLayout>
          ) : undefined}
        </StackingLayout>

        <StackingLayout
          itemGap="none"
          background="base"
          className="research-niva-conversation-pane research-concept-niva-chat"
        >
          <StackingLayout itemGap="L" padding="20px" className="research-niva-messages">
            <FlexLayout justifyContent="flex-end">
              <StackingLayout
                padding="15px"
                background="body"
                className="research-user-bubble"
              >
                <TextLabel>[search console query]</TextLabel>
              </StackingLayout>
            </FlexLayout>
            <StackingLayout
              itemGap="M"
              className="research-assistant-bubble research-concept-assistant-bubble"
            >
              <AiLabel>NIVA</AiLabel>
              <TextLabel>
                I want to ask several more questions before I proceed.
              </TextLabel>
              {firstAnswer ? undefined : (
                <FlexLayout
                  flexDirection="column"
                  itemGap="XS"
                >
                  {['Option 1', 'Option 2', 'Option 3'].map((option) => (
                    <Button
                      key={option}
                      type={Button.ButtonTypes.SECONDARY}
                      onClick={() => handleConceptOption(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </FlexLayout>
              )}
            </StackingLayout>
            {firstAnswer ? (
              <FlexLayout justifyContent="flex-end">
                <StackingLayout
                  padding="15px"
                  background="body"
                  className="research-user-bubble"
                >
                  <TextLabel>{firstAnswer}</TextLabel>
                </StackingLayout>
              </FlexLayout>
            ) : undefined}
            {firstAnswer ? (
              <StackingLayout
                itemGap="M"
                className="research-assistant-bubble research-concept-assistant-bubble"
              >
                <AiLabel>NIVA</AiLabel>
                <TextLabel>
                  Thanks. One more question before I generate the next section.
                </TextLabel>
                {secondAnswer ? undefined : (
                  <FlexLayout flexDirection="column" itemGap="XS">
                    {['Option 1', 'Option 2', 'Option 3'].map((option) => (
                      <Button
                        key={`second-${option}`}
                        type={Button.ButtonTypes.SECONDARY}
                        onClick={() => handleConceptOption(option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </FlexLayout>
                )}
              </StackingLayout>
            ) : undefined}
            {secondAnswer ? (
              <>
                <FlexLayout justifyContent="flex-end">
                  <StackingLayout
                    padding="15px"
                    background="body"
                    className="research-user-bubble"
                  >
                    <TextLabel>{secondAnswer}</TextLabel>
                  </StackingLayout>
                </FlexLayout>
                <StackingLayout
                  itemGap="M"
                  className="research-assistant-bubble research-concept-assistant-bubble"
                >
                  <AiLabel>NIVA</AiLabel>
                  <TextLabel>
                    Got it. I added another generated placeholder section to the
                    dashboard.
                  </TextLabel>
                </StackingLayout>
              </>
            ) : undefined}
          </StackingLayout>
          <StackingLayout itemGap="S" className="research-niva-chat-composer-shell">
            <StackingLayout
              padding="10px"
              background="base"
              className="research-chat-composer"
            >
              <TextArea
                value={draftMessage}
                onChange={(event) => setDraftMessage(event.currentTarget.value)}
                placeholder="Ask NIVA or answer with a custom option..."
                aria-label="Ask NIVA in concept preview"
                rows={3}
                resize="none"
                borderless={true}
                className="research-niva-chat-input"
              />
              <FlexLayout alignItems="center" justifyContent="space-between">
                <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>@</TextLabel>
                <Button
                  type={Button.ButtonTypes.PRIMARY}
                  aria-label="Send concept preview message"
                  disabled={!draftMessage.trim()}
                  onClick={handleConceptMessageSend}
                >
                  <UploadIcon aria-hidden={true} />
                </Button>
              </FlexLayout>
            </StackingLayout>
          </StackingLayout>
        </StackingLayout>
      </FlexLayout>
    </StackingLayout>
  )
}

function ConceptPreviewPage({ activePreviewId }: { activePreviewId: VariationId }) {
  return (
    <StackingLayout itemGap="none" className="research-screen">
      {activePreviewId === 'v1' ? (
        <ConceptPreviewV1 />
      ) : activePreviewId === 'v2' ? (
        <ConceptPreviewV2 />
      ) : (
        <ConceptPreviewV3 />
      )}
    </StackingLayout>
  )
}

function StatusBadge({ status }: { status: RankedVmTableRow['status'] }) {
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

const v2RankedColumns: TableColumn[] = [
  {
    title: 'VM name',
    key: 'name',
    render: (name) => <Link href="/vms">{name}</Link>,
  },
  {
    title: 'Location / context',
    key: 'context',
  },
  {
    title: 'Status',
    key: 'status',
    render: (status: RankedVmTableRow['status']) => <StatusBadge status={status} />,
  },
  {
    title: 'Reason for ranking',
    key: 'reason',
  },
  {
    title: 'Last updated',
    key: 'lastUpdated',
  },
]

const entityRelatedAlertColumns: TableColumn[] = [
  {
    title: 'Alert',
    key: 'title',
    render: (title) => <Link href="/vms">{title}</Link>,
  },
  {
    title: 'Severity',
    key: 'severity',
    render: (severity: EntityRelatedAlertRow['severity']) => (
      <Badge
        color={
          severity === 'Critical'
            ? Badge.BadgeColorTypes.RED
            : Badge.BadgeColorTypes.YELLOW
        }
        count={severity}
        type={Badge.BadgeTypes.TAG}
      />
    ),
  },
  {
    title: 'Last seen',
    key: 'lastSeen',
  },
  {
    title: 'Source',
    key: 'source',
  },
]

interface ScopedDestination {
  key: string
  title: string
  breadcrumb: string
  type: string
  icon: 'cluster' | 'alert' | 'metrics' | 'page' | 'scoped'
  reason?: string
}

interface ScopedAlertRow {
  key: string
  title: string
  vm: string
  severity: 'Critical' | 'Warning'
  cpuPeak: string
  activeAlerts: number
  lastAlert: string
  reason: string
  signal?: string
}

const SCOPED_DESTINATIONS: ScopedDestination[] = [
  {
    key: 'cluster-abc',
    title: 'Cluster ABC',
    breadcrumb: 'Infrastructure · East-1',
    type: 'Cluster',
    icon: 'cluster',
  },
  {
    key: 'alerts',
    title: 'Alerts',
    breadcrumb: 'Monitoring · Alerts',
    type: 'Page',
    icon: 'alert',
  },
  {
    key: 'cluster-abc-alerts',
    title: 'Cluster ABC › Alerts',
    breadcrumb: 'Infrastructure · East-1',
    type: 'Cluster view',
    icon: 'scoped',
  },
]

const SCOPED_ALERT_ROWS: ScopedAlertRow[] = [
  {
    key: 'vm-prod-web-01',
    title: 'High CPU alert on production web workload',
    vm: 'vm-prod-web-01',
    severity: 'Critical',
    cpuPeak: '91%',
    activeAlerts: 3,
    lastAlert: '5 min ago',
    reason: 'Repeated CPU spikes in the last hour',
    signal: 'Repeated CPU spikes',
  },
  {
    key: 'vm-prod-api-05',
    title: 'Sustained CPU utilization above policy threshold',
    vm: 'vm-prod-api-05',
    severity: 'Critical',
    cpuPeak: '87%',
    activeAlerts: 2,
    lastAlert: '9 min ago',
    reason: 'Sustained high CPU usage',
    signal: 'Sustained high CPU',
  },
  {
    key: 'vm-prod-worker-07',
    title: 'CPU baseline exceeded on worker node',
    vm: 'vm-prod-worker-07',
    severity: 'Warning',
    cpuPeak: '78%',
    activeAlerts: 2,
    lastAlert: '18 min ago',
    reason: 'CPU usage above normal baseline',
    signal: 'Above baseline',
  },
  {
    key: 'vm-prod-cache-03',
    title: 'Short CPU spike detected on cache service',
    vm: 'vm-prod-cache-03',
    severity: 'Warning',
    cpuPeak: '74%',
    activeAlerts: 1,
    lastAlert: '22 min ago',
    reason: 'Short CPU spike detected',
    signal: 'Short spike',
  },
]

const SCOPED_FILTER_CHIPS = [
  'Cluster ABC',
  'CPU alerts',
  'Production',
  'Last 24h',
]

function SeverityBadge({ severity }: { severity: ScopedAlertRow['severity'] }) {
  return (
    <Badge
      color={
        severity === 'Critical'
          ? Badge.BadgeColorTypes.RED
          : Badge.BadgeColorTypes.YELLOW
      }
      count={severity}
      type={Badge.BadgeTypes.TAG}
    />
  )
}

const scopedAlertColumns: TableColumn[] = [
  {
    title: 'Affected VM',
    key: 'vm',
    render: (vm) => <Link href="/vms">{vm}</Link>,
  },
  {
    title: 'Severity',
    key: 'severity',
    render: (severity: ScopedAlertRow['severity']) => (
      <SeverityBadge severity={severity} />
    ),
  },
  {
    title: 'CPU peak',
    key: 'cpuPeak',
  },
  {
    title: 'Active alerts',
    key: 'activeAlerts',
  },
  {
    title: 'Last alert',
    key: 'lastAlert',
  },
  {
    title: 'Reason',
    key: 'reason',
  },
]

const scopedAlertPreviewColumns: TableColumn[] = [
  {
    title: 'Title',
    key: 'title',
  },
  ...scopedAlertColumns,
]

const scopedDashboardColumns: TableColumn[] = [
  ...scopedAlertColumns.slice(0, 5),
  {
    title: 'Key signal',
    key: 'signal',
  },
  {
    title: 'Actions',
    key: 'key',
    render: () => (
      <FlexLayout itemGap="S" flexWrap="wrap">
        <Link href="/vms">Open</Link>
        <Link href="/vms">View alerts</Link>
        <Link href="/vms">Investigate</Link>
      </FlexLayout>
    ),
  },
]

function VmResultRow({
  result,
  reason,
  action,
  linkToDetails,
}: {
  result: VmResult
  reason?: string
  action?: JSX.Element
  linkToDetails?: boolean
}) {
  return (
    <FlexLayout
      alignItems="center"
      itemGap="M"
      padding="15px-20px"
      background="base"
      className="research-result-row"
    >
      <VMIcon aria-hidden={true} className="research-neutral-icon" />
      <StackingLayout itemGap="XS" className="research-result-row-content">
        <FlexLayout alignItems="center" itemGap="S">
          {linkToDetails ? (
            <Link href={getVmDetailHref(result)}>{result.name}</Link>
          ) : (
            <TextLabel>{result.name}</TextLabel>
          )}
          {result.hasAnomaly && reason ? (
            <Badge color={Badge.BadgeColorTypes.YELLOW} count="Anomaly" />
          ) : undefined}
        </FlexLayout>
        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
          Infrastructure · {result.region}
        </TextLabel>
        {reason ? (
          <FlexLayout alignItems="center" itemGap="S">
            <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
              {reason}
            </TextLabel>
            {action}
          </FlexLayout>
        ) : undefined}
      </StackingLayout>
    </FlexLayout>
  )
}

function VmResultList({
  results,
  flagged,
  linkToDetails,
}: {
  results: VmResult[]
  flagged?: boolean
  linkToDetails?: boolean
}) {
  return (
    <StackingLayout itemGap="S">
      {results.map((result) => (
        <VmResultRow
          key={result.name}
          result={result}
          linkToDetails={linkToDetails}
          reason={
            flagged && result.hasAnomaly
              ? 'Showing anomalies in the last hour'
              : undefined
          }
          action={
            flagged && result.hasAnomaly ? (
              <Link href="/vms">View anomaly</Link>
            ) : undefined
          }
        />
      ))}
    </StackingLayout>
  )
}

function ScopedDestinationRow({ destination }: { destination: ScopedDestination }) {
  const Icon =
    destination.icon === 'cluster'
      ? NavigationIcon
      : destination.icon === 'alert'
      ? AlertIcon
      : destination.icon === 'metrics'
      ? LineChartIcon
      : NavigationIcon

  return (
    <FlexLayout
      alignItems="center"
      itemGap="M"
      padding="15px-20px"
      background="base"
      className="research-result-row"
    >
      <Icon aria-hidden={true} className="research-neutral-icon" />
      <StackingLayout itemGap="XS" className="research-result-row-content">
        <FlexLayout alignItems="center" itemGap="S" flexWrap="wrap">
          <TextLabel>{destination.title}</TextLabel>
          <Badge
            color={Badge.BadgeColorTypes.GRAY}
            count={destination.type}
            type={Badge.BadgeTypes.TAG}
          />
        </FlexLayout>
        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
          {destination.breadcrumb}
        </TextLabel>
      </StackingLayout>
    </FlexLayout>
  )
}

function ScopedDestinationList({
  destinations,
}: {
  destinations: ScopedDestination[]
}) {
  return (
    <StackingLayout itemGap="S">
      {destinations.map((destination) => (
        <ScopedDestinationRow key={destination.key} destination={destination} />
      ))}
    </StackingLayout>
  )
}

function FilterChipList({ chips }: { chips: string[] }) {
  return (
    <FlexLayout itemGap="S" flexWrap="wrap">
      {chips.map((chip) => (
        <Badge
          key={chip}
          color={Badge.BadgeColorTypes.GRAY}
          count={chip}
          type={Badge.BadgeTypes.TAG}
        />
      ))}
    </FlexLayout>
  )
}

function EditableInterpretationSelect({
  label,
  rowsData,
}: {
  label: string
  rowsData: SelectRowData[]
}) {
  const [selectedRow, setSelectedRow] = useState<SelectRowData | undefined>(
    rowsData[0],
  )

  return (
    <FlexLayout alignItems="center" itemGap="XS">
      <TextLabel>{label}:</TextLabel>
      <Select
        type="mini"
        autoSize={true}
        rowsData={rowsData}
        selectedRow={selectedRow}
        onSelectedChange={(row) => setSelectedRow(row)}
      />
    </FlexLayout>
  )
}

function EntityCanvas({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StackingLayout itemGap="none" className="research-screen">
      <PageHeader title="Search Results" />
      <StackingLayout itemGap="L" padding="20px">
        {children}
      </StackingLayout>
    </StackingLayout>
  )
}

const handleEntityAskNiva = () => {
  openNivaInvestigation(ENTITY_QUERY)
}

const exitNivaWorkspace = () => {
  globalThis.dispatchEvent(new CustomEvent(EXIT_NIVA_WORKSPACE_EVENT))
}

function EntityLookupV1() {
  return (
    <EntityCanvas>
      <Alert
        className="research-niva-alert"
        type={Alert.AlertTypes.SUPPLEMENTARY}
        showCloseIcon={false}
        contentWrapperProps={{
          className: 'research-niva-alert-content',
        }}
        message={
          <FlexLayout
            alignItems="center"
            justifyContent="flex-start"
            itemGap="M"
            className="research-niva-alert-row"
          >
            <FlexLayout alignItems="center" itemGap="S">
              <Badge
                color={Badge.BadgeColorTypes.BLUE}
                count="AI"
                type={Badge.BadgeTypes.TAG}
              />
              <TextLabel>Want to ask NIVA about these VMs?</TextLabel>
            </FlexLayout>
            <Button
              type={Button.ButtonTypes.PRIMARY}
              onClick={handleEntityAskNiva}
            >
              <AIIcon aria-hidden={true} />
              Ask NIVA
            </Button>
          </FlexLayout>
        }
      />
      <TextLabel>12 matching VMs</TextLabel>
      <VmResultList results={ALPHABETICAL_VM_RESULTS} linkToDetails={true} />
    </EntityCanvas>
  )
}

function EntityLookupV2() {
  return (
    <EntityCanvas>
      <StackingLayout
        itemGap="L"
        padding="20px"
        background="base"
        className="research-ai-container research-ai-container--folded"
      >
        <FlexLayout alignItems="center" justifyContent="space-between" itemGap="M">
          <AiLabel>AI interpretation</AiLabel>
          <Button type={Button.ButtonTypes.PRIMARY} onClick={handleEntityAskNiva}>
            <AIIcon aria-hidden={true} />
            Ask NIVA
          </Button>
        </FlexLayout>
        <TextLabel>
          I found 12 VMs matching "vm-prod." Results are prioritized by current
          status, active alerts, and recent activity.
        </TextLabel>

        <Table
          aria-label="AI-ranked matching VMs"
          border={true}
          columns={v2RankedColumns}
          dataSource={V2_RANKED_VM_ROWS}
          rowKey="key"
          className="research-ai-table"
        />

        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
          Multiple close matches found. AI prioritized VMs with active alerts or
          recent anomalies, but you can still choose any matching VM.
        </TextLabel>
      </StackingLayout>
      <TextLabel>Alphabetical matching entities</TextLabel>
      <VmResultList results={ALPHABETICAL_VM_RESULTS} />
    </EntityCanvas>
  )
}

function EntityLookupV4GeneratingDashboard() {
  return (
    <StackingLayout
      itemGap="L"
      padding="20px"
      background="base"
      className="research-generation-card"
    >
      <FlexLayout alignItems="center" justifyContent="space-between" itemGap="M">
        <StackingLayout itemGap="S">
          <AiLabel>Generating dashboard</AiLabel>
          <Title size={Title.SIZES.H3}>Building vm-prod-web-01 view</Title>
          <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
            Pulling current metrics, active alerts, recent events, and matching
            entity context into this workspace.
          </TextLabel>
        </StackingLayout>
        <Loader loading={true} tip="Generating..." />
      </FlexLayout>

      <FlexLayout itemGap="M" flexWrap="wrap">
        <StackingLayout
          itemGap="S"
          padding="15px"
          background="body"
          className="research-generation-preview"
        >
          <TextLabel>Metric cards</TextLabel>
          <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
            CPU, memory, storage latency, alerts
          </TextLabel>
        </StackingLayout>
        <StackingLayout
          itemGap="S"
          padding="15px"
          background="body"
          className="research-generation-preview"
        >
          <TextLabel>Trend chart</TextLabel>
          <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
            CPU usage over the last hour
          </TextLabel>
        </StackingLayout>
        <StackingLayout
          itemGap="S"
          padding="15px"
          background="body"
          className="research-generation-preview"
        >
          <TextLabel>Traceability</TextLabel>
          <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
            Related alerts and workload migration event
          </TextLabel>
        </StackingLayout>
      </FlexLayout>
    </StackingLayout>
  )
}

function EntityLookupV4() {
  const [selectedFirstEntry, setSelectedFirstEntry] = useState(false)
  const [isGeneratingDashboard, setIsGeneratingDashboard] = useState(false)
  const [showRelatedAlerts, setShowRelatedAlerts] = useState(false)
  const [draftMessage, setDraftMessage] = useState('')
  const [additionalDetails, setAdditionalDetails] = useState<string[]>([])

  useEffect(() => {
    closeNivaInvestigation()
  }, [])

  useEffect(() => {
    if (!isGeneratingDashboard) {
      return
    }

    const timer = globalThis.setTimeout(() => {
      setIsGeneratingDashboard(false)
      setSelectedFirstEntry(true)
    }, 1600)

    return () => globalThis.clearTimeout(timer)
  }, [isGeneratingDashboard])

  const handleChooseFirstEntry = () => {
    setSelectedFirstEntry(false)
    setIsGeneratingDashboard(true)
    setShowRelatedAlerts(false)
    setDraftMessage('')
  }

  const handleViewRelatedAlerts = () => {
    setShowRelatedAlerts(true)
  }

  const handleSendMessage = () => {
    const message = draftMessage.trim()

    if (!message) {
      return
    }

    if (message.toLowerCase().includes('first')) {
      handleChooseFirstEntry()
      return
    }

    setAdditionalDetails((currentDetails) => [...currentDetails, message])
    setDraftMessage('')
  }

  return (
    <StackingLayout itemGap="none" className="research-screen research-niva-workspace">
      <FlexLayout
        alignItems="center"
        itemGap="M"
        padding="0px-20px"
        className="page-header research-niva-workspace-header"
      >
        <Button type={Button.ButtonTypes.SECONDARY} onClick={exitNivaWorkspace}>
          Exit
        </Button>
        <Title size={Title.SIZES.H2}>NIVA</Title>
      </FlexLayout>
      <FlexLayout itemGap="none" className="research-niva-workspace-body">
        <StackingLayout
          itemGap="L"
          padding="20px"
          background="body"
          className="research-niva-dashboard-pane"
        >
          <StackingLayout itemGap="XS">
            <AiLabel>NIVA search workspace</AiLabel>
            <Title size={Title.SIZES.H3}>
              {isGeneratingDashboard
                ? 'Generating vm-prod-web-01 dashboard'
                : selectedFirstEntry
                ? 'vm-prod-web-01 operational view'
                : 'Matching VMs for “vm-prod”'}
            </Title>
            <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
              {isGeneratingDashboard
                ? 'NIVA is assembling a GenUI dashboard in this workspace from live entity context, alerts, and metrics.'
                : selectedFirstEntry
                ? 'Important signals for the selected VM are shown below. Continue the conversation to narrow or investigate further.'
                : 'I found 12 matching VMs. Three have active issues. Start from the ranked list, or tell NIVA which entry to inspect.'}
            </TextLabel>
          </StackingLayout>

          {isGeneratingDashboard ? (
            <EntityLookupV4GeneratingDashboard />
          ) : selectedFirstEntry ? (
            <StackingLayout itemGap="L">
              <StackingLayout
                itemGap="L"
                padding="20px"
                background="base"
                className="research-highlight-card"
              >
                <FlexLayout alignItems="center" justifyContent="space-between" itemGap="M">
                  <StackingLayout itemGap="XS">
                    <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                      Highest-priority match
                    </TextLabel>
                    <Title size={Title.SIZES.H3}>vm-prod-web-01</Title>
                    <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                      Cluster ABC · Host 03 · Production
                    </TextLabel>
                  </StackingLayout>
                  <FlexLayout itemGap="S" flexWrap="wrap">
                    <Badge color={Badge.BadgeColorTypes.YELLOW} count="Warning" />
                    <Badge
                      color={Badge.BadgeColorTypes.YELLOW}
                      count="3 active alerts"
                    />
                    <Badge
                      color={Badge.BadgeColorTypes.YELLOW}
                      count="CPU anomaly"
                    />
                  </FlexLayout>
                </FlexLayout>

                <FlexLayout itemGap="M" flexWrap="wrap">
                  {V3_METRICS.map((metric) => (
                    <StackingLayout
                      key={metric.label}
                      itemGap="XS"
                      padding="15px"
                      background="body"
                      className="research-metric-card"
                    >
                      <TextLabel>{metric.label}</TextLabel>
                      <Title size={Title.SIZES.H3}>{metric.value}</Title>
                      <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                        {metric.detail}
                      </TextLabel>
                    </StackingLayout>
                  ))}
                </FlexLayout>

                <StackingLayout
                  itemGap="S"
                  padding="15px"
                  background="body"
                  className="research-chart-card"
                >
                  <Title size={Title.SIZES.H4}>CPU usage · last hour</Title>
                  <FlexLayout
                    alignItems="flex-end"
                    itemGap="S"
                    className="research-line-chart"
                  >
                    {CPU_TREND_POINTS.map((point) => (
                      <FlexLayout
                        key={point.time}
                        flexDirection="column"
                        itemGap="XS"
                        alignItems="center"
                      >
                        <StackingLayout
                          aria-label={`${point.time}: ${point.value}%`}
                          className={`research-chart-bar research-chart-bar--${point.value}`}
                        />
                        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                          {point.time}
                        </TextLabel>
                      </FlexLayout>
                    ))}
                  </FlexLayout>
                </StackingLayout>
              </StackingLayout>

              {showRelatedAlerts ? (
                <StackingLayout
                  itemGap="M"
                  padding="20px"
                  background="base"
                  className="research-highlight-card"
                >
                  <FlexLayout alignItems="center" justifyContent="space-between" itemGap="M">
                    <StackingLayout itemGap="XS">
                      <Title size={Title.SIZES.H4}>Related alerts</Title>
                      <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                        Traceable alerts connected to vm-prod-web-01 and its CPU
                        anomaly.
                      </TextLabel>
                    </StackingLayout>
                    <Badge
                      color={Badge.BadgeColorTypes.YELLOW}
                      count="3 related"
                      type={Badge.BadgeTypes.TAG}
                    />
                  </FlexLayout>
                  <Table
                    aria-label="Related alerts for vm-prod-web-01"
                    border={true}
                    columns={entityRelatedAlertColumns}
                    dataSource={ENTITY_RELATED_ALERTS}
                    rowKey="key"
                    className="research-ai-table"
                  />
                </StackingLayout>
              ) : undefined}

            </StackingLayout>
          ) : (
            <StackingLayout itemGap="L">
              <Table
                aria-label="NIVA-ranked matching VMs"
                border={true}
                columns={v2RankedColumns}
                dataSource={V2_RANKED_VM_ROWS}
                rowKey="key"
                className="research-ai-table"
              />
              <FlexLayout itemGap="S" flexWrap="wrap">
                <Badge
                  color={Badge.BadgeColorTypes.GRAY}
                  count="Only Cluster ABC"
                  type={Badge.BadgeTypes.TAG}
                />
                <Badge
                  color={Badge.BadgeColorTypes.GRAY}
                  count="Only unhealthy VMs"
                  type={Badge.BadgeTypes.TAG}
                />
                <Badge
                  color={Badge.BadgeColorTypes.GRAY}
                  count="Sort by severity"
                  type={Badge.BadgeTypes.TAG}
                />
                <Badge
                  color={Badge.BadgeColorTypes.GRAY}
                  count="Recently accessed"
                  type={Badge.BadgeTypes.TAG}
                />
              </FlexLayout>
            </StackingLayout>
          )}
        </StackingLayout>

        <StackingLayout
          itemGap="none"
          background="base"
          className="research-niva-conversation-pane"
        >
          <StackingLayout itemGap="L" padding="20px" className="research-niva-messages">
            <FlexLayout justifyContent="flex-end">
              <StackingLayout
                padding="15px"
                background="body"
                className="research-user-bubble"
              >
                <TextLabel>{ENTITY_QUERY}</TextLabel>
              </StackingLayout>
            </FlexLayout>

            <StackingLayout itemGap="M" className="research-assistant-bubble">
              <AiLabel>NIVA</AiLabel>
              <TextLabel>
                I found 12 VMs matching "vm-prod." Three have active issues.
                vm-prod-web-01 appears most urgent because it has a CPU anomaly
                and 3 related alerts in the last hour. You can pick an entry,
                compare matches, or narrow the list.
              </TextLabel>
            </StackingLayout>

            {isGeneratingDashboard || selectedFirstEntry ? (
              <>
                <FlexLayout justifyContent="flex-end">
                  <StackingLayout
                    padding="15px"
                    background="body"
                    className="research-user-bubble"
                  >
                    <TextLabel>I want the first entry</TextLabel>
                  </StackingLayout>
                </FlexLayout>
                {isGeneratingDashboard ? (
                  <StackingLayout itemGap="M" className="research-assistant-bubble">
                    <AiLabel>NIVA</AiLabel>
                    <TextLabel>
                      Generating an operational dashboard for vm-prod-web-01 from
                      current metrics, alerts, and recent events.
                    </TextLabel>
                  </StackingLayout>
                ) : (
                  <StackingLayout itemGap="M" className="research-assistant-bubble">
                    <AiLabel>NIVA</AiLabel>
                    <TextLabel>
                      Showing the operational view for vm-prod-web-01. CPU peaked
                      at 91% in the last hour, with 3 related alerts and a workload
                      migration event 35 minutes ago.
                    </TextLabel>
                    <FlexLayout itemGap="S" flexWrap="wrap">
                      <Button type={Button.ButtonTypes.PRIMARY}>Open VM details</Button>
                      <Button
                        type={Button.ButtonTypes.SECONDARY}
                        onClick={handleViewRelatedAlerts}
                      >
                        View related alerts
                      </Button>
                      <Button type={Button.ButtonTypes.SECONDARY}>
                        Compare matches
                      </Button>
                      <Button
                        type={Button.ButtonTypes.SECONDARY}
                        onClick={() => setSelectedFirstEntry(false)}
                      >
                        Back to matching list
                      </Button>
                    </FlexLayout>
                  </StackingLayout>
                )}
              </>
            ) : (
              <StackingLayout itemGap="S">
                <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                  Suggested follow-up
                </TextLabel>
                <Button
                  type={Button.ButtonTypes.SECONDARY}
                  onClick={handleChooseFirstEntry}
                >
                  I want the first entry
                </Button>
                <Button type={Button.ButtonTypes.SECONDARY}>
                  Show only unhealthy VMs
                </Button>
                <Button type={Button.ButtonTypes.SECONDARY}>
                  Compare the top 3 matches
                </Button>
              </StackingLayout>
            )}

            {showRelatedAlerts ? (
              <>
                <FlexLayout justifyContent="flex-end">
                  <StackingLayout
                    padding="15px"
                    background="body"
                    className="research-user-bubble"
                  >
                    <TextLabel>View related alerts</TextLabel>
                  </StackingLayout>
                </FlexLayout>
                <StackingLayout itemGap="M" className="research-assistant-bubble">
                  <AiLabel>NIVA</AiLabel>
                  <TextLabel>
                    Added related alerts to the dashboard without removing the VM
                    metrics. You can trace each alert back to its source policy or
                    correlated event.
                  </TextLabel>
                </StackingLayout>
              </>
            ) : undefined}

            {additionalDetails.map((detail, detailIndex) => (
              <FlexLayout key={`${detail}-${detailIndex}`} justifyContent="flex-end">
                <StackingLayout
                  padding="15px"
                  background="body"
                  className="research-user-bubble"
                >
                  <TextLabel>{detail}</TextLabel>
                </StackingLayout>
              </FlexLayout>
            ))}

            {additionalDetails.length > 0 ? (
              <StackingLayout itemGap="M" className="research-assistant-bubble">
                <AiLabel>NIVA</AiLabel>
                <TextLabel>
                  Got it. I will use those details to refine the matching VMs and
                  keep vm-prod-web-01, vm-prod-api-05, and vm-prod-db-01 visible
                  because they still have active signals.
                </TextLabel>
              </StackingLayout>
            ) : undefined}
          </StackingLayout>

          <StackingLayout itemGap="S" className="research-niva-chat-composer-shell">
            <StackingLayout
              padding="10px"
              background="base"
              className="research-chat-composer"
            >
              <TextArea
                value={draftMessage}
                onChange={(event) => setDraftMessage(event.currentTarget.value)}
                placeholder="Ask NIVA to narrow, compare, or investigate these VMs..."
                aria-label="Ask NIVA about matching VMs"
                rows={3}
                resize="none"
                borderless={true}
                className="research-niva-chat-input"
              />
              <FlexLayout alignItems="center" justifyContent="space-between">
                <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>@</TextLabel>
                <Button
                  type={Button.ButtonTypes.PRIMARY}
                  aria-label="Send NIVA message"
                  disabled={!draftMessage.trim()}
                  onClick={handleSendMessage}
                >
                  <UploadIcon aria-hidden={true} />
                </Button>
              </FlexLayout>
            </StackingLayout>
          </StackingLayout>
        </StackingLayout>
      </FlexLayout>
    </StackingLayout>
  )
}

const handleScopedAskNiva = () => {
  openNivaInvestigation(SCOPED_VIEW_QUERY)
}

function ScopedViewV1() {
  return (
    <EntityCanvas>
      <Alert
        className="research-niva-alert"
        type={Alert.AlertTypes.SUPPLEMENTARY}
        showCloseIcon={false}
        contentWrapperProps={{ className: 'research-niva-alert-content' }}
        message={
          <FlexLayout
            alignItems="center"
            justifyContent="flex-start"
            itemGap="M"
            className="research-niva-alert-row"
          >
            <FlexLayout alignItems="center" itemGap="S">
              <Badge
                color={Badge.BadgeColorTypes.BLUE}
                count="AI"
                type={Badge.BadgeTypes.TAG}
              />
              <TextLabel>Want to ask NIVA about these scoped alerts?</TextLabel>
            </FlexLayout>
            <Button type={Button.ButtonTypes.PRIMARY} onClick={handleScopedAskNiva}>
              <AIIcon aria-hidden={true} />
              Ask NIVA
            </Button>
          </FlexLayout>
        }
      />
      <TextLabel>Keyword-matched destinations</TextLabel>
      <ScopedDestinationList destinations={SCOPED_DESTINATIONS} />
      <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
        Select a result to continue. Filters can be applied after opening a page.
      </TextLabel>
    </EntityCanvas>
  )
}

function ScopedViewV3() {
  return (
    <EntityCanvas>
      <StackingLayout
        itemGap="L"
        padding="20px"
        background="base"
        className="research-ai-container research-ai-container--folded"
      >
        <FlexLayout alignItems="center" justifyContent="space-between" itemGap="M">
          <AiLabel>AI alert preview</AiLabel>
          <Button type={Button.ButtonTypes.PRIMARY} onClick={handleScopedAskNiva}>
            <AIIcon aria-hidden={true} />
            Ask NIVA
          </Button>
        </FlexLayout>
        <StackingLayout itemGap="XS">
          <Title size={Title.SIZES.H3}>CPU alerts in Cluster ABC</Title>
          <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
            Interpreted as alerts scoped to Cluster ABC with CPU-related alert
            category.
          </TextLabel>
        </StackingLayout>
        <FlexLayout itemGap="S" flexWrap="wrap">
          <EditableInterpretationSelect
            label="Scope"
            rowsData={[
              { key: 'cluster-abc', label: 'Cluster ABC' },
              { key: 'all-clusters', label: 'All clusters' },
            ]}
          />
          <EditableInterpretationSelect
            label="Category"
            rowsData={[
              { key: 'cpu-alerts', label: 'CPU alerts' },
              { key: 'memory-alerts', label: 'Memory alerts' },
            ]}
          />
          <EditableInterpretationSelect
            label="Environment"
            rowsData={[
              { key: 'production', label: 'Production' },
              { key: 'all-environments', label: 'All environments' },
            ]}
          />
          <EditableInterpretationSelect
            label="Time"
            rowsData={[
              { key: 'last-24h', label: 'Last 24h' },
              { key: 'last-1h', label: 'Last 1h' },
            ]}
          />
        </FlexLayout>

        <StackingLayout itemGap="S">
          <Title size={Title.SIZES.H4}>Alerts needing attention</Title>
          <Table
            aria-label="Scoped CPU alerts needing attention"
            border={true}
            columns={scopedAlertPreviewColumns}
            dataSource={SCOPED_ALERT_ROWS}
            rowKey="key"
            className="research-ai-table"
          />
        </StackingLayout>

        <FlexLayout itemGap="S" flexWrap="wrap">
          <Link href="/vms">View alert source</Link>
          <Link href="/vms">View CPU metric</Link>
          <Link href="/vms">View affected VM</Link>
          <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
            Last updated 5 min ago
          </TextLabel>
        </FlexLayout>

        <StackingLayout itemGap="S" padding="15px" background="body" className="research-highlight-card">
          <Title size={Title.SIZES.H4}>Recommended destination</Title>
          <TextLabel>Cluster ABC › Alerts › CPU alerts</TextLabel>
          <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
            This route keeps cluster context visible while showing CPU-related
            alerts and affected entities.
          </TextLabel>
          <Link href="/vms">Open Alerts with Cluster ABC + CPU alerts filters instead</Link>
        </StackingLayout>

        <FlexLayout itemGap="M" flexWrap="wrap">
          {[
            ['CPU alerts', '8'],
            ['Critical', '3'],
            ['Affected VMs', '4'],
            ['Highest CPU', '91%'],
          ].map(([label, value]) => (
            <StackingLayout
              key={label}
              itemGap="XS"
              padding="15px"
              background="body"
              className="research-metric-card"
            >
              <TextLabel>{label}</TextLabel>
              <Title size={Title.SIZES.H3}>{value}</Title>
            </StackingLayout>
          ))}
        </FlexLayout>

      </StackingLayout>

      <StackingLayout itemGap="S">
        <Title size={Title.SIZES.H4}>Other matching routes</Title>
        <ScopedDestinationList destinations={SCOPED_DESTINATIONS} />
      </StackingLayout>
    </EntityCanvas>
  )
}

function ScopedViewV4() {
  const [draftMessage, setDraftMessage] = useState('')
  const [followUps, setFollowUps] = useState<string[]>([])
  const [scopedStage, setScopedStage] = useState<
    'clarifying' | 'generating' | 'dashboard' | 'refining'
  >('clarifying')

  useEffect(() => {
    if (scopedStage !== 'generating' && scopedStage !== 'refining') {
      return
    }

    const timer = globalThis.setTimeout(() => {
      setScopedStage('dashboard')
    }, scopedStage === 'generating' ? 1600 : 1200)

    return () => globalThis.clearTimeout(timer)
  }, [scopedStage])

  const handleConfirmScopedDashboard = () => {
    setScopedStage('generating')
  }

  const handleSendScopedMessage = () => {
    const message = draftMessage.trim()

    if (!message) {
      return
    }

    setFollowUps((currentFollowUps) => [...currentFollowUps, message])
    setScopedStage(scopedStage === 'clarifying' ? 'generating' : 'refining')
    setDraftMessage('')
  }

  return (
    <StackingLayout itemGap="none" className="research-screen research-niva-workspace">
      <FlexLayout
        alignItems="center"
        itemGap="M"
        padding="0px-20px"
        className="page-header research-niva-workspace-header"
      >
        <Button type={Button.ButtonTypes.SECONDARY} onClick={exitNivaWorkspace}>
          Exit
        </Button>
        <Title size={Title.SIZES.H2}>NIVA</Title>
        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
          Generated operational workspace
        </TextLabel>
      </FlexLayout>
      <FlexLayout itemGap="none" className="research-niva-workspace-body">
        <StackingLayout
          itemGap="L"
          padding="20px"
          background="body"
          className="research-niva-dashboard-pane"
        >
          {scopedStage === 'clarifying' ? (
            <StackingLayout
              itemGap="L"
              padding="20px"
              background="base"
              className="research-generation-card"
            >
              <AiLabel>NIVA clarification</AiLabel>
              <Title size={Title.SIZES.H3}>Confirm workspace scope</Title>
              <TextLabel>
                I can generate a scoped dashboard for CPU alerts in Cluster ABC.
                Should I use Production, CPU alerts, and Last 24h as the default
                scope?
              </TextLabel>
              <FilterChipList chips={SCOPED_FILTER_CHIPS} />
            </StackingLayout>
          ) : scopedStage === 'generating' ? (
            <StackingLayout
              itemGap="L"
              padding="20px"
              background="base"
              className="research-generation-card"
            >
              <FlexLayout alignItems="center" justifyContent="space-between" itemGap="M">
                <StackingLayout itemGap="S">
                  <AiLabel>Generating dashboard</AiLabel>
                  <Title size={Title.SIZES.H3}>Building CPU alert workspace</Title>
                  <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                    Pulling cluster context, CPU alert counts, affected VMs, and
                    recent alert patterns into this workspace.
                  </TextLabel>
                </StackingLayout>
                <Loader loading={true} tip="Generating..." />
              </FlexLayout>
              <FlexLayout itemGap="M" flexWrap="wrap">
                {['Alert table', 'Summary cards', 'Pattern insight'].map((label) => (
                  <StackingLayout
                    key={label}
                    itemGap="S"
                    padding="15px"
                    background="body"
                    className="research-generation-preview"
                  >
                    <TextLabel>{label}</TextLabel>
                    <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                      Preparing scoped data
                    </TextLabel>
                  </StackingLayout>
                ))}
              </FlexLayout>
            </StackingLayout>
          ) : (
            <>
              {scopedStage === 'refining' ? (
                <StackingLayout
                  itemGap="S"
                  padding="15px"
                  background="base"
                  className="research-generation-card"
                >
                  <Loader loading={true} tip="Updating dashboard..." />
                  <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                    Applying your follow-up to the generated workspace.
                  </TextLabel>
                </StackingLayout>
              ) : undefined}

              <StackingLayout itemGap="XS">
                <AiLabel>Generated from search query</AiLabel>
                <Title size={Title.SIZES.H3}>CPU alerts in Cluster ABC</Title>
                <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                  NIVA generated this workspace from your search query. Scope and
                  filters can be adjusted.
                </TextLabel>
              </StackingLayout>
              <FilterChipList chips={SCOPED_FILTER_CHIPS} />

              <FlexLayout itemGap="M" flexWrap="wrap">
                {[
                  ['CPU alerts', '8'],
                  ['Critical', '3'],
                  ['Warnings', '5'],
                  ['Affected VMs', '4'],
                  ['Highest CPU', '91%'],
                ].map(([label, value]) => (
              <StackingLayout
                key={label}
                itemGap="XS"
                padding="15px"
                background="base"
                className="research-metric-card"
              >
                <TextLabel>{label}</TextLabel>
                <Title size={Title.SIZES.H3}>{value}</Title>
              </StackingLayout>
                ))}
              </FlexLayout>

              <StackingLayout itemGap="S">
                <Title size={Title.SIZES.H4}>Prioritized CPU alerts</Title>
                <Table
                  aria-label="Prioritized CPU alerts"
                  border={true}
                  columns={scopedDashboardColumns}
                  dataSource={SCOPED_ALERT_ROWS}
                  rowKey="key"
                  className="research-ai-table"
                />
              </StackingLayout>

              <StackingLayout itemGap="S" padding="20px" background="base" className="research-highlight-card">
                <Title size={Title.SIZES.H4}>Most urgent pattern</Title>
                <TextLabel>
                  vm-prod-web-01 triggered 3 CPU alerts in the last hour, with CPU
                  peaking at 91%. This is the highest alert concentration among
                  affected VMs in Cluster ABC.
                </TextLabel>
                <FlexLayout itemGap="S" flexWrap="wrap">
                  <Link href="/vms">View alert source</Link>
                  <Link href="/vms">View CPU metric</Link>
                  <Link href="/vms">Open VM</Link>
                </FlexLayout>
              </StackingLayout>

              <StackingLayout itemGap="S" padding="15px" background="base" className="research-chart-card">
                <Title size={Title.SIZES.H4}>CPU alerts by affected VM</Title>
                <FlexLayout alignItems="flex-end" itemGap="M" className="research-scoped-bar-chart">
                  {SCOPED_ALERT_ROWS.map((row) => (
                    <FlexLayout
                      key={row.key}
                      flexDirection="column"
                      itemGap="XS"
                      alignItems="center"
                    >
                      <StackingLayout
                        aria-label={`${row.vm}: ${row.activeAlerts} active alerts`}
                        className={`research-scoped-alert-bar research-scoped-alert-bar--${row.activeAlerts}`}
                      />
                      <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                        {row.vm.replace('vm-prod-', '')}
                      </TextLabel>
                    </FlexLayout>
                  ))}
                </FlexLayout>
              </StackingLayout>

              <StackingLayout itemGap="S">
                <TextLabel>Refine controls</TextLabel>
                <FilterChipList
                  chips={[
                    'Critical only',
                    'Group by VM',
                    'Group by host',
                    'Last 1h',
                    'Last 24h',
                    'Show related events',
                    'Show affected VMs',
                  ]}
                />
              </StackingLayout>

              <FlexLayout itemGap="S" flexWrap="wrap">
                <Button type={Button.ButtonTypes.PRIMARY}>Open Cluster ABC &gt; Alerts</Button>
                <Button type={Button.ButtonTypes.SECONDARY}>Open Alerts with filters</Button>
                <Button type={Button.ButtonTypes.SECONDARY}>Open affected VM list</Button>
              </FlexLayout>
            </>
          )}
        </StackingLayout>

        <StackingLayout
          itemGap="none"
          background="base"
          className="research-niva-conversation-pane"
        >
          <StackingLayout itemGap="L" padding="20px" className="research-niva-messages">
            <FlexLayout justifyContent="flex-end">
              <StackingLayout padding="15px" background="body" className="research-user-bubble">
                <TextLabel>{SCOPED_VIEW_QUERY}</TextLabel>
              </StackingLayout>
            </FlexLayout>
            <StackingLayout itemGap="M" className="research-assistant-bubble">
              <AiLabel>NIVA</AiLabel>
              {scopedStage === 'clarifying' ? (
                <>
                  <TextLabel>
                    I can generate a scoped workspace for CPU alerts in Cluster ABC.
                    Should I use Production, CPU alerts, and Last 24h as the scope?
                  </TextLabel>
                  <FlexLayout itemGap="S" flexWrap="wrap">
                    <Button
                      type={Button.ButtonTypes.PRIMARY}
                      onClick={handleConfirmScopedDashboard}
                    >
                      Yes, generate it
                    </Button>
                    <Button type={Button.ButtonTypes.SECONDARY}>
                      Critical only
                    </Button>
                  </FlexLayout>
                </>
              ) : scopedStage === 'generating' ? (
                <TextLabel>
                  Generating the workspace now with Cluster ABC, CPU alerts,
                  Production, and Last 24h applied.
                </TextLabel>
              ) : (
                <TextLabel>
                  I found 8 CPU-related alerts in Cluster ABC. Three are critical,
                  and four VMs are affected. I generated this workspace to show the
                  alert pattern, affected VMs, and the fastest routes to investigate.
                  vm-prod-web-01 appears most urgent because it triggered 3 CPU alerts
                  in the last hour.
                </TextLabel>
              )}
            </StackingLayout>
            {scopedStage === 'dashboard' || scopedStage === 'refining' ? (
              <StackingLayout itemGap="S">
                <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                  Suggested follow-up
                </TextLabel>
                {[
                  'Show only critical alerts',
                  'Group by VM',
                  'Group by host',
                  'Why is vm-prod-web-01 most urgent?',
                  'Show related events',
                  'Compare affected VMs',
                  'Open Cluster ABC alerts',
                ].map((prompt) => (
                  <Button
                    key={prompt}
                    type={Button.ButtonTypes.SECONDARY}
                    onClick={() => {
                      setFollowUps((currentFollowUps) => [
                        ...currentFollowUps,
                        prompt,
                      ])
                      setScopedStage('refining')
                    }}
                  >
                    {prompt}
                  </Button>
                ))}
              </StackingLayout>
            ) : undefined}
            {followUps.map((followUp, index) => (
              <FlexLayout key={`${followUp}-${index}`} justifyContent="flex-end">
                <StackingLayout padding="15px" background="body" className="research-user-bubble">
                  <TextLabel>{followUp}</TextLabel>
                </StackingLayout>
              </FlexLayout>
            ))}
            {scopedStage === 'refining' ? (
              <StackingLayout itemGap="M" className="research-assistant-bubble">
                <AiLabel>NIVA</AiLabel>
                <TextLabel>
                  Updating the generated workspace based on your follow-up.
                </TextLabel>
              </StackingLayout>
            ) : followUps.length > 0 && scopedStage === 'dashboard' ? (
              <StackingLayout itemGap="M" className="research-assistant-bubble">
                <AiLabel>NIVA</AiLabel>
                <TextLabel>
                  I updated the workspace and kept the scoped CPU alert context
                  visible so you can continue refining from here.
                </TextLabel>
              </StackingLayout>
            ) : undefined}
          </StackingLayout>
          <StackingLayout itemGap="S" className="research-niva-chat-composer-shell">
            <StackingLayout padding="10px" background="base" className="research-chat-composer">
              <TextArea
                value={draftMessage}
                onChange={(event) => setDraftMessage(event.currentTarget.value)}
                placeholder="Ask NIVA to refine, explain, or investigate these alerts..."
                aria-label="Ask NIVA about scoped CPU alerts"
                rows={3}
                resize="none"
                borderless={true}
                className="research-niva-chat-input"
              />
              <FlexLayout alignItems="center" justifyContent="space-between">
                <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>@</TextLabel>
                <Button
                  type={Button.ButtonTypes.PRIMARY}
                  aria-label="Send NIVA message"
                  disabled={!draftMessage.trim()}
                  onClick={handleSendScopedMessage}
                >
                  <UploadIcon aria-hidden={true} />
                </Button>
              </FlexLayout>
            </StackingLayout>
          </StackingLayout>
        </StackingLayout>
      </FlexLayout>
    </StackingLayout>
  )
}

function InvestigationUnavailable({ variation }: { variation: VariationId }) {
  return (
    <StackingLayout itemGap="L">
      <SearchResultsV1Page />
      <StackingLayout
        itemGap="S"
        padding="20px"
        background="base"
        className="research-placeholder"
      >
        <AiLabel>Investigation {variation.toUpperCase()}</AiLabel>
        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
          Only the existing Investigation V1 prototype is available. This keeps
          the prior investigation work preserved instead of inventing new
          variants.
        </TextLabel>
      </StackingLayout>
    </StackingLayout>
  )
}

const SCENARIOS: PrototypeScenario[] = [
  {
    id: 'entity-lookup',
    label: 'Entity Lookup',
    variations: [
      {
        id: 'v1',
        label: 'V1',
        description: 'Fully Separate (Ask NIVA)',
        render: () => <EntityLookupV1 />,
      },
      {
        id: 'v2',
        label: 'V2',
        description: 'AI Summary',
        render: () => <EntityLookupV2 />,
      },
      {
        id: 'v3',
        label: 'V3',
        description: 'Fully Merged (Dashboard)',
        render: () => <EntityLookupV4 />,
      },
    ],
  },
  {
    id: 'investigation',
    label: 'Investigation',
    variations: [
      {
        id: 'v1',
        label: 'V1',
        description: 'Fully Separate (Ask NIVA)',
        render: () => <SearchResultsV1Page />,
      },
      {
        id: 'v2',
        label: 'V2',
        description: 'AI Summary',
        render: () => <InvestigationUnavailable variation="v2" />,
      },
      {
        id: 'v3',
        label: 'V3',
        description: 'Fully Merged (Dashboard)',
        render: () => <InvestigationUnavailable variation="v3" />,
      },
    ],
  },
  {
    id: 'scoped-view',
    label: 'Scoped View',
    variations: [
      {
        id: 'v1',
        label: 'V1',
        description: 'Fully Separate (Ask NIVA)',
        render: () => <ScopedViewV1 />,
      },
      {
        id: 'v2',
        label: 'V2',
        description: 'AI Summary',
        render: () => <ScopedViewV3 />,
      },
      {
        id: 'v3',
        label: 'V3',
        description: 'Fully Merged (Dashboard)',
        render: () => <ScopedViewV4 />,
      },
    ],
  },
]

const DEFAULT_SCENARIO = SCENARIOS[0]

const getScenarioFallback = () => {
  if (!DEFAULT_SCENARIO) {
    throw new Error('Research prototype requires at least one scenario.')
  }

  return DEFAULT_SCENARIO
}

const getInitialVariation = (scenario: PrototypeScenario) => {
  const initialVariation = scenario.variations[0]

  if (!initialVariation) {
    throw new Error(`Scenario ${scenario.id} requires at least one variation.`)
  }

  return initialVariation.id
}

const getActiveVariation = (
  scenario: PrototypeScenario,
  variationId: VariationId,
) => {
  const activeVariation =
    scenario.variations.find((variation) => variation.id === variationId) ??
    scenario.variations[0]

  if (!activeVariation) {
    throw new Error(`Scenario ${scenario.id} requires at least one variation.`)
  }

  return activeVariation
}

interface ResearchPrototypePageProps {
  mode?: 'dashboard' | 'results'
  initialScenarioId?: ScenarioId
  initialVariationId?: VariationId
}

export function ResearchPrototypePage({
  mode = 'dashboard',
  initialScenarioId = 'entity-lookup',
  initialVariationId = 'v1',
}: ResearchPrototypePageProps) {
  const [activeScenarioId, setActiveScenarioId] =
    useState<ScenarioId>(initialScenarioId)
  const [activeVariationId, setActiveVariationId] =
    useState<VariationId>(initialVariationId)
  const [activePanelMode, setActivePanelMode] = useState<'scenario' | 'concept'>(
    'scenario',
  )
  const [activeConceptPreviewId, setActiveConceptPreviewId] =
    useState<VariationId>('v1')
  const [switcherCollapsed, setSwitcherCollapsed] = useState(false)

  const activeScenario = useMemo(
    () =>
      SCENARIOS.find((scenario) => scenario.id === activeScenarioId) ??
      getScenarioFallback(),
    [activeScenarioId],
  )
  const activeVariation = getActiveVariation(activeScenario, activeVariationId)
  const activeConceptPreview =
    CONCEPT_PREVIEW_OPTIONS.find(
      (preview) => preview.id === activeConceptPreviewId,
    ) ?? CONCEPT_PREVIEW_OPTIONS[0]

  if (!activeConceptPreview) {
    throw new Error('Research prototype requires at least one concept preview.')
  }

  useEffect(() => {
    globalThis.dispatchEvent(
      new CustomEvent(RESEARCH_QUERY_CHANGE_EVENT, {
        detail:
          activePanelMode === 'concept'
            ? {
                mode: 'concept',
                variation: activeConceptPreviewId,
              }
            : {
                mode: 'scenario',
                scenario: activeScenario.id,
                variation: activeVariation.id,
              },
      }),
    )
  }, [
    activeConceptPreviewId,
    activePanelMode,
    activeScenario.id,
    activeVariation.id,
  ])

  useEffect(() => {
    closeNivaInvestigation()
  }, [activeScenario.id, activeVariation.id])

  useEffect(() => {
    const handleExitNivaWorkspace = () => {
      setActivePanelMode('scenario')
      setActiveScenarioId('entity-lookup')
      setActiveVariationId('v1')
    }

    globalThis.addEventListener(
      EXIT_NIVA_WORKSPACE_EVENT,
      handleExitNivaWorkspace,
    )

    return () => {
      globalThis.removeEventListener(
        EXIT_NIVA_WORKSPACE_EVENT,
        handleExitNivaWorkspace,
      )
    }
  }, [])

  const handleScenarioChange = (scenario: PrototypeScenario) => {
    setActivePanelMode('scenario')
    setActiveScenarioId(scenario.id)
    setActiveVariationId(getInitialVariation(scenario))
  }

  return (
    <>
      <StackingLayout
        itemGap="none"
        className={
          switcherCollapsed
            ? 'research-moderator-switcher research-moderator-switcher--collapsed'
            : 'research-moderator-switcher'
        }
        background="base"
      >
        {switcherCollapsed ? (
          <Button
            type={Button.ButtonTypes.SECONDARY}
            onClick={() => setSwitcherCollapsed(false)}
          >
            Show switcher
          </Button>
        ) : (
          <StackingLayout
            itemGap="L"
            padding="20px"
            className="research-control-panel"
          >
            <FlexLayout alignItems="center" justifyContent="space-between">
              <Title size={Title.SIZES.H3}>Prototype switcher</Title>
              <Button
                type={Button.ButtonTypes.ICON_SECONDARY}
                aria-label="Collapse prototype switcher"
                onClick={() => setSwitcherCollapsed(true)}
              >
                -
              </Button>
            </FlexLayout>
          <StackingLayout itemGap="XS">
            <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
              Moderator-only control. Not part of the tested product screen.
            </TextLabel>
          </StackingLayout>

          <StackingLayout itemGap="S">
            <TextLabel>Concept Preview</TextLabel>
            {CONCEPT_PREVIEW_OPTIONS.map((preview) => (
              <Button
                key={preview.id}
                type={
                  activePanelMode === 'concept' &&
                  preview.id === activeConceptPreviewId
                    ? Button.ButtonTypes.PRIMARY
                    : Button.ButtonTypes.SECONDARY
                }
                onClick={() => {
                  setActivePanelMode('concept')
                  setActiveConceptPreviewId(preview.id)
                }}
              >
                {preview.label} — {preview.description}
              </Button>
            ))}
          </StackingLayout>

          <StackingLayout itemGap="S">
            <TextLabel>Scenario</TextLabel>
            {SCENARIOS.map((scenario) => (
              <Button
                key={scenario.id}
                type={
                  activePanelMode === 'scenario' && scenario.id === activeScenario.id
                    ? Button.ButtonTypes.PRIMARY
                    : Button.ButtonTypes.SECONDARY
                }
                onClick={() => handleScenarioChange(scenario)}
              >
                {scenario.label}
              </Button>
            ))}
          </StackingLayout>

          <StackingLayout itemGap="S">
            <TextLabel>Variation</TextLabel>
            {activeScenario.variations.map((variation) => (
              <Button
                key={variation.id}
                type={
                  activePanelMode === 'scenario' &&
                  variation.id === activeVariation.id
                    ? Button.ButtonTypes.PRIMARY
                    : Button.ButtonTypes.SECONDARY
                }
                onClick={() => {
                  setActivePanelMode('scenario')
                  setActiveVariationId(variation.id)
                }}
              >
                {variation.label} — {variation.description}
              </Button>
            ))}
          </StackingLayout>

          <StackingLayout itemGap="XS" className="research-active-state">
            <TextLabel>Active selection</TextLabel>
            <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
              {activePanelMode === 'concept'
                ? `Concept Preview · ${activeConceptPreview.label} — ${activeConceptPreview.description}`
                : `${activeScenario.label} · ${activeVariation.label} — ${activeVariation.description}`}
            </TextLabel>
          </StackingLayout>
          </StackingLayout>
        )}
      </StackingLayout>
      <StackingLayout itemGap="none" className="research-prototype-page">
        {activePanelMode === 'concept' ? (
          <ConceptPreviewPage activePreviewId={activeConceptPreviewId} />
        ) : mode === 'dashboard' ? (
          <>
            <PageHeader title="Main Dashboard" />
            <DashboardPc />
          </>
        ) : (
          activeVariation.render()
        )}
      </StackingLayout>
    </>
  )
}

export function ResearchPrototypeResultsPage({
  scenario,
  variation,
}: {
  scenario: ScenarioId
  variation: VariationId
}) {
  return (
    <ResearchPrototypePage
      mode="results"
      initialScenarioId={scenario}
      initialVariationId={variation}
    />
  )
}
