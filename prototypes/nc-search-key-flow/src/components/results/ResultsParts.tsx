import {
  AIIcon,
  Badge,
  Button,
  ContainerLayout,
  FlexLayout,
  Input,
  Menu,
  MenuItem,
  StackingLayout,
  TextLabel,
  Title,
} from '@nutanix-ui/prism-reactjs'
import { useState, type KeyboardEvent, type ReactNode } from 'react'
import { useNiva } from '@proto/store/niva-store'
import { ScopeSwitcher } from '@proto/components/search/ScopeSwitcher'
import { RowLayout } from '@proto/components/search/SearchResultRow'
import '@proto/components/search/GlobalSearch.css'
import './SearchResultsPage.css'

/** Rows shown per section before "Show more"; VMs can run to hundreds for a cluster name. */
export const SECTION_PAGE_SIZE = 7

/** "Results for ‘q’ in [scope] · N results" with Ask NIVA on the right (Results_Page.jpg). */
export const ResultsHeader = ({
  query,
  summary,
}: {
  query: string
  summary: string
}) => {
  const { openNiva } = useNiva()
  return (
    <FlexLayout alignItems="center" justifyContent="space-between">
      <FlexLayout alignItems="center" itemGap="S" className="results-title">
        <Title size={Title.SIZES.H2}>Results for</Title>
        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
          ‘{query}’ in
        </TextLabel>
        <ScopeSwitcher variant="canvas" />
        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
          · {summary}
        </TextLabel>
      </FlexLayout>
      <Button
        type={Button.ButtonTypes.SECONDARY}
        onClick={() => openNiva(query)}
      >
        <AIIcon aria-hidden={true} />
        Ask NIVA
      </Button>
    </FlexLayout>
  )
}

interface ResultsSectionProps {
  title: ReactNode
  count?: number
  /** Right side of the section header, e.g. "Open in Entity Browser". */
  actions?: ReactNode
  children: ReactNode
  footer?: ReactNode
  ariaLabel?: string
}

export const ResultsSection = ({
  title,
  count,
  actions,
  children,
  footer,
  ariaLabel,
}: ResultsSectionProps) => (
  <ContainerLayout border backgroundColor="white" className="results-section">
    <FlexLayout
      alignItems="center"
      justifyContent="space-between"
      className="results-section-header"
    >
      <FlexLayout alignItems="center" itemGap="S">
        <Title size={Title.SIZES.H4}>{title}</Title>
        {count === undefined ? undefined : (
          <Badge
            type={Badge.BadgeTypes.TAG}
            color={Badge.BadgeColorTypes.GRAY}
            count={String(count)}
          />
        )}
      </FlexLayout>
      {actions}
    </FlexLayout>
    <Menu
      className="search-menu results-menu"
      aria-label={ariaLabel ?? (typeof title === 'string' ? title : undefined)}
    >
      {children}
    </Menu>
    {footer}
  </ContainerLayout>
)

interface ResultMenuItemProps {
  onClick: () => void
  tag: ReactNode
  primary: ReactNode
  secondary?: ReactNode
  typeLabel?: string
}

/** Menu wires clicks only into direct MenuItem children, so the item takes its own onClick. */
export const ResultMenuItem = ({ onClick, ...row }: ResultMenuItemProps) => (
  <MenuItem onClick={onClick} className="search-menu-item results-menu-item">
    <RowLayout {...row} />
  </MenuItem>
)

/** "Didn't find your intended destination?" with an Ask NIVA input and two suggestions. */
export const NivaBlock = ({ suggestions }: { suggestions: string[] }) => {
  const { openNiva } = useNiva()
  const [draft, setDraft] = useState('')

  const submit = () => {
    if (!draft.trim()) return
    openNiva(draft)
    setDraft('')
  }

  return (
    <StackingLayout itemGap="S" padding="15px" className="results-niva-block">
      <FlexLayout alignItems="center" itemGap="S">
        <AIIcon aria-hidden={true} />
        <Title size={Title.SIZES.H4}>
          Didn&apos;t find your intended destination?
        </Title>
      </FlexLayout>
      <Input
        className="results-niva-input"
        value={draft}
        placeholder="Ask NIVA"
        aria-label="Ask NIVA"
        prefix={<AIIcon aria-hidden={true} />}
        onChange={(event) => setDraft(event.currentTarget.value)}
        onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
          if (event.key === 'Enter') submit()
        }}
      />
      <FlexLayout itemGap="S" flexWrap="wrap">
        {suggestions.map((suggestion) => (
          <Button
            key={suggestion}
            type={Button.ButtonTypes.SECONDARY}
            className="results-niva-chip"
            onClick={() => openNiva(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </FlexLayout>
    </StackingLayout>
  )
}
