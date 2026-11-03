import {
  AIIcon,
  Accordion,
  Badge,
  Button,
  CloseIcon,
  ContainerLayout,
  FlexLayout,
  Input,
  Link,
  Loader,
  SidePanel,
  StackingLayout,
  TextLabel,
  Title,
  VerticalSeparator,
} from '@nutanix-ui/prism-reactjs'
import { useRouterState } from '@tanstack/react-router'
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import '~/components/niva-investigation/NivaInvestigationPanel.css'
import { SparklineVisualization } from '~/components/widgets/sparkline-visualization'
import { getEntityById } from '@proto/data/catalog'
import { useOpenLink } from '@proto/lib/destinations'
import type { NivaAnswer, RichText } from '@proto/lib/niva/types'
import { useNiva } from '@proto/store/niva-store'
import { TYPE_TAG, TypeTag } from '@proto/components/search/SearchResultRow'
import { NivaContextMenu } from './NivaContextMenu'
import '@proto/components/search/GlobalSearch.css'
import './NivaPanel.css'

const STUB_TITLES: Record<string, string> = {
  '/settings': 'Prism Central Settings',
  '/templates': 'Templates',
  '/subnets': 'Subnets',
}

/** "Page: …" context chip, following the main page as evidence links move it. */
const usePageLabel = () =>
  useRouterState({
    select: (state) => {
      const { pathname } = state.location
      const search = state.location.search as { q?: string }
      if (pathname === '/') return 'Main Dashboard'
      if (pathname === '/search') return `Results for ‘${search.q ?? ''}’`
      if (pathname === '/vms') return search.q ? 'VMs (filtered)' : 'VMs'
      const [, section, id = ''] = pathname.split('/')
      if (section === 'vms') return getEntityById(`vm-${id}`)?.name ?? 'VM'
      if (section === 'clusters') return getEntityById(id)?.name ?? 'Cluster'
      return STUB_TITLES[pathname] ?? 'Prism Central'
    },
  })

const ContextChip = ({
  label,
  onRemove,
}: {
  label: string
  onRemove: () => void
}) => (
  <FlexLayout
    itemGap="XS"
    alignItems="center"
    className="filter-bar-tag basic-tag niva-context-chip"
  >
    <div className="-label">{label}</div>
    <VerticalSeparator
      className="-separator"
      appearance={VerticalSeparator.VerticalSeparatorAppearance.SECONDARY}
    />
    <Button
      type={Button.ButtonTypes.ICON_DEFAULT}
      appearance="mini"
      className="-close-button"
      aria-label={`Remove ${label} from context`}
      onClick={onRemove}
    >
      <CloseIcon size={CloseIcon.CloseIconSize.SMALL} />
    </Button>
  </FlexLayout>
)

const Rich = ({ text }: { text: RichText }) => {
  const openLink = useOpenLink()
  return (
    <>
      {text.map((part, index) =>
        typeof part === 'string' ? (
          <span key={index}>{part}</span>
        ) : (
          <Link
            key={index}
            type={Link.LINK_TYPE.INLINE}
            onClick={() => openLink(part.link)}
          >
            {part.text}
          </Link>
        ),
      )}
    </>
  )
}

const SectionLabel = ({ children }: { children: string }) => (
  <TextLabel
    type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
    size={TextLabel.TEXT_LABEL_SIZE.SMALL}
    className="niva-section-label"
  >
    {children}
  </TextLabel>
)

const AnswerView = ({ answer }: { answer: NivaAnswer }) => {
  const openLink = useOpenLink()
  const { ask } = useNiva()

  return (
    <StackingLayout itemGap="M" className="niva-answer">
      <TextLabel type={TextLabel.TEXT_LABEL_TYPE.PRIMARY} multiLine={true}>
        <Rich text={answer.summary} />
      </TextLabel>

      {answer.chart ? (
        <StackingLayout
          itemGap="XS"
          padding="10px"
          className="niva-trend"
          aria-label={answer.chart.title}
        >
          <SectionLabel>{answer.chart.title}</SectionLabel>
          <div className="niva-trend-chart">
            <SparklineVisualization
              data={answer.chart.points}
              color="var(--color-primitives-blue-700)"
            />
          </div>
          <FlexLayout justifyContent="space-between">
            <TextLabel
              type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
              size={TextLabel.TEXT_LABEL_SIZE.SMALL}
            >
              {answer.chart.startLabel}
            </TextLabel>
            <TextLabel
              type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
              size={TextLabel.TEXT_LABEL_SIZE.SMALL}
            >
              {answer.chart.endLabel}
            </TextLabel>
          </FlexLayout>
        </StackingLayout>
      ) : undefined}

      {answer.evidence.length > 0 ? (
        <ContainerLayout
          border
          backgroundColor="white"
          className="niva-evidence"
        >
          <FlexLayout
            alignItems="center"
            itemGap="S"
            className="niva-evidence-header"
          >
            <SectionLabel>Evidence</SectionLabel>
            <TextLabel
              type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
              size={TextLabel.TEXT_LABEL_SIZE.SMALL}
            >
              {answer.evidenceSource} · {answer.evidence.length} item
              {answer.evidence.length === 1 ? '' : 's'}
            </TextLabel>
          </FlexLayout>
          {answer.evidence.map((item) => (
            <FlexLayout
              key={item.id}
              alignItems="flex-start"
              itemGap="S"
              className="niva-evidence-row"
            >
              <TypeTag label={TYPE_TAG[item.type]} />
              <TextLabel
                type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}
                multiLine={true}
                className="niva-evidence-text"
              >
                <Rich text={item.text} />
              </TextLabel>
              <Link
                className="niva-evidence-link"
                onClick={() => openLink(item.link)}
              >
                {item.linkLabel}
              </Link>
            </FlexLayout>
          ))}
        </ContainerLayout>
      ) : undefined}

      {answer.inference ? (
        <StackingLayout itemGap="XS" padding="10px" className="niva-inference">
          <FlexLayout alignItems="center" justifyContent="space-between">
            <SectionLabel>Inference · Likely cause</SectionLabel>
            <Badge
              type={Badge.BadgeTypes.TAG}
              color={Badge.BadgeColorTypes.GRAY}
              count="Not confirmed"
            />
          </FlexLayout>
          <TextLabel type={TextLabel.TEXT_LABEL_TYPE.PRIMARY} multiLine={true}>
            <Rich text={answer.inference.text} />
          </TextLabel>
          <TextLabel
            type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
            size={TextLabel.TEXT_LABEL_SIZE.SMALL}
            multiLine={true}
          >
            {answer.inference.caption}
          </TextLabel>
        </StackingLayout>
      ) : undefined}

      <Accordion
        title="How I got here"
        titleProps={{ size: Title.SIZES.H4 }}
        className="niva-how"
      >
        <ol className="niva-steps">
          {answer.steps.map((step) => (
            <li key={step}>
              <TextLabel
                type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
                multiLine={true}
              >
                {step}
              </TextLabel>
            </li>
          ))}
        </ol>
      </Accordion>

      {answer.action ? (
        <FlexLayout>
          <Button
            type={Button.ButtonTypes.PRIMARY}
            onClick={() => answer.action && openLink(answer.action.link)}
          >
            {answer.action.label} →
          </Button>
        </FlexLayout>
      ) : undefined}

      {answer.followUps.length > 0 ? (
        <StackingLayout itemGap="XS">
          <SectionLabel>Follow-ups</SectionLabel>
          <FlexLayout itemGap="S" flexWrap="wrap">
            {answer.followUps.map((followUp) => (
              <Button
                key={followUp}
                type={Button.ButtonTypes.SECONDARY}
                className="niva-follow-up"
                onClick={() => ask(followUp, answer)}
              >
                {followUp}
              </Button>
            ))}
          </FlexLayout>
        </StackingLayout>
      ) : undefined}
    </StackingLayout>
  )
}

const Conversation = () => {
  const { messages, ask } = useNiva()
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const lastUserRef = useRef<HTMLDivElement | null>(null)
  // A context change re-answers like a new question: it scrolls to the top too
  const lastUserId = messages.findLast(
    (message) => message.role === 'user' || message.role === 'context',
  )?.id

  const spacerRef = useRef<HTMLDivElement | null>(null)

  // The latest exchange always gets at least a panel's height, so its question
  // can sit at the top and the answer reads from the start below it
  useLayoutEffect(() => {
    const scroller = scrollRef.current
    const question = lastUserRef.current
    const spacer = spacerRef.current
    if (!scroller || !question || !spacer) return
    spacer.style.height = '0px'
    const questionTop =
      question.getBoundingClientRect().top -
      scroller.getBoundingClientRect().top +
      scroller.scrollTop
    const below = scroller.scrollHeight - questionTop
    spacer.style.height = `${Math.max(0, scroller.clientHeight - below)}px`
  }, [messages])

  // Each new question scrolls to its own top so the answer reads from the start
  useEffect(() => {
    lastUserRef.current?.scrollIntoView({ block: 'start' })
  }, [lastUserId])

  if (messages.length === 0) {
    return (
      <div className="niva-conversation" ref={scrollRef}>
        <StackingLayout itemGap="M" padding="20px">
          <TextLabel
            type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
            multiLine={true}
          >
            Ask about VMs, clusters, hosts or alerts in DND_DEMO1. NIVA answers
            from NC data and shows its evidence.
          </TextLabel>
          <FlexLayout itemGap="S" flexWrap="wrap">
            {[
              'Running VMs on Cluster ABC with high IOPS',
              'Why are my VMs slow on Cluster ABC?',
            ].map((prompt) => (
              <Button
                key={prompt}
                type={Button.ButtonTypes.SECONDARY}
                className="niva-follow-up"
                onClick={() => ask(prompt)}
              >
                {prompt}
              </Button>
            ))}
          </FlexLayout>
        </StackingLayout>
      </div>
    )
  }

  return (
    <div className="niva-conversation" ref={scrollRef}>
      <StackingLayout itemGap="L" padding="20px">
        {messages.map((message) =>
          message.role === 'context' ? (
            <div
              key={message.id}
              ref={message.id === lastUserId ? lastUserRef : undefined}
              className="niva-user-row niva-context-note"
            >
              <FlexLayout justifyContent="center">
                <TextLabel
                  type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
                  size={TextLabel.TEXT_LABEL_SIZE.SMALL}
                >
                  {message.text} · answer updated
                </TextLabel>
              </FlexLayout>
            </div>
          ) : message.role === 'user' ? (
            <div
              key={message.id}
              ref={message.id === lastUserId ? lastUserRef : undefined}
              className="niva-user-row"
            >
              <FlexLayout justifyContent="flex-end">
                <StackingLayout
                  padding="10px"
                  background="body"
                  className="niva-user-prompt"
                >
                  <TextLabel multiLine={true}>{message.text}</TextLabel>
                </StackingLayout>
              </FlexLayout>
            </div>
          ) : message.status === 'thinking' ? (
            <StackingLayout
              key={message.id}
              itemGap="S"
              padding="15px"
              className="niva-loading-card niva-thinking"
              aria-live="polite"
              aria-busy={true}
            >
              <Loader loading={true} tip="Thinking…" />
              <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                {message.answer.thinking}
              </TextLabel>
            </StackingLayout>
          ) : (
            <AnswerView key={message.id} answer={message.answer} />
          ),
        )}
      </StackingLayout>
      <div ref={spacerRef} aria-hidden={true} />
    </div>
  )
}

const Composer = () => {
  const { ask, focusToken, messages, open } = useNiva()
  const [draft, setDraft] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!open || focusToken === 0) return
    // SidePanel mounts its body on the next frame
    const timer = globalThis.setTimeout(() => inputRef.current?.focus(), 50)
    return () => globalThis.clearTimeout(timer)
  }, [focusToken, open])

  const submit = () => {
    if (!draft.trim()) return
    ask(draft)
    setDraft('')
  }

  return (
    <FlexLayout className="niva-composer-shell">
      <Input
        inputRef={inputRef}
        className="niva-composer"
        value={draft}
        placeholder={messages.length > 0 ? 'Ask a follow-up…' : 'Ask NIVA…'}
        aria-label="Ask NIVA"
        onChange={(event) => setDraft(event.currentTarget.value)}
        onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
          if (event.key === 'Enter') submit()
        }}
        suffix={
          <Badge
            className="search-row-enter"
            type={Badge.BadgeTypes.TAG}
            color={Badge.BadgeColorTypes.GRAY}
            count="↵"
            aria-hidden={true}
          />
        }
      />
    </FlexLayout>
  )
}

/** One NIVA side panel for every entry point; it compresses the page and stays open across navigation. */
export const NivaPanel = () => {
  const { open, close, context, pageChipRemoved, removeContext, addContext } =
    useNiva()
  const pageLabel = usePageLabel()
  const [size, setSize] = useState(SidePanel.SidePanelSize.SMALL)

  return (
    <SidePanel
      visible={open}
      title={
        <FlexLayout alignItems="center" itemGap="S">
          <AIIcon aria-hidden={true} />
          <span>NIVA</span>
          <Badge
            type={Badge.BadgeTypes.TAG}
            color={Badge.BadgeColorTypes.GRAY}
            count="AI"
          />
        </FlexLayout>
      }
      onClose={close}
      size={size}
      onSizeChange={setSize}
      sizeStyleMap={{
        small: { width: '30vw' },
        large: { width: '50vw' },
      }}
      enableFocusTrap={false}
      className={
        open
          ? 'niva-investigation-panel niva-panel -open'
          : 'niva-investigation-panel niva-panel'
      }
      closeBtnProps={{ 'aria-label': 'Close NIVA' }}
      sizeBtnProps={{
        'aria-label':
          size === SidePanel.SidePanelSize.SMALL
            ? 'Expand NIVA'
            : 'Shrink NIVA',
      }}
    >
      <StackingLayout itemGap="none" className="niva-panel-body">
        <StackingLayout
          itemGap="XS"
          padding="10px-20px"
          className="niva-context"
        >
          <SectionLabel>Context</SectionLabel>
          <FlexLayout itemGap="S" flexWrap="wrap" alignItems="center">
            {pageChipRemoved ? undefined : (
              <ContextChip
                label={`Page: ${pageLabel}`}
                onRemove={() => removeContext('page')}
              />
            )}
            {context.map((chip) => (
              <ContextChip
                key={chip.id}
                label={chip.label}
                onRemove={() => removeContext(chip.id)}
              />
            ))}
            <NivaContextMenu
              activeIds={new Set(context.map((chip) => chip.id))}
              onAdd={addContext}
            />
          </FlexLayout>
        </StackingLayout>
        <Conversation />
        <Composer />
      </StackingLayout>
    </SidePanel>
  )
}
