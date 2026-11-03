import {
  AIIcon,
  Badge,
  DottedLoader,
  FlexItem,
  FlexLayout,
  HistoryIcon,
  Link,
  MagGlassIcon,
  MenuItem,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
import type { ReactNode } from 'react'
import type {
  DisplayRow,
  EntityType,
  RecentQueryTarget,
  TopMatchDestination,
} from '@proto/data/types'
import { topMatchFor } from '@proto/lib/search-engine'

export const TYPE_TAG: Record<EntityType, string> = {
  vm: 'VM',
  page: 'PG',
  cluster: 'CL',
  host: 'HO',
  domain: 'DM',
  alert: 'AL',
}

export const BREADCRUMB_TYPES = new Set<EntityType>(['page', 'domain'])

/** TB: a table (Entity Browser); RS: the grouped results page. */
export const TOP_MATCH_TAG: Record<TopMatchDestination, string> = {
  'entity-browser': 'TB',
  'grouped-results': 'RS',
}

export const TOP_MATCH_LABEL: Record<TopMatchDestination, string> = {
  'entity-browser': 'Filter in Entity Browser',
  'grouped-results': 'Results page',
}

const recentQueryDestination = (query: string, target: RecentQueryTarget) => {
  if (target === 'results') return 'Search results'
  return topMatchFor(query)?.title ?? 'Search results'
}

/** Filler words that would light up inside unrelated names ("on" in "vm_0680"). */
const UNEMPHASIZED_WORDS = new Set(['in', 'on', 'of', 'the', 'with', 'and'])

const escapeRegExp = (value: string) =>
  value.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`)

/** Semibold every literal match of a typed term inside `text` ("clus" → "**Clus**ter ABC"). */
export const emphasizeMatches = (text: string, query: string): ReactNode => {
  const normalized = query.trim().toLowerCase()
  const words = normalized
    .split(/\s+/)
    .filter((word) => word.length >= 2 && !UNEMPHASIZED_WORDS.has(word))
  const terms = words.length > 0 ? words : normalized ? [normalized] : []
  if (terms.length === 0) return text
  const pattern = new RegExp(
    `(${terms
      .toSorted((a, b) => b.length - a.length)
      .map((term) => escapeRegExp(term))
      .join('|')})`,
    'gi',
  )
  return text.split(pattern).map((part, index) =>
    index % 2 === 1 ? (
      <span key={`${part}-${index}`} className="search-row-match">
        {part}
      </span>
    ) : (
      part
    ),
  )
}

/** ↵ chip, only on the hovered / keyboard-highlighted row; the type label moves left for it */
const EnterChip = () => (
  <Badge
    className="search-row-enter"
    type={Badge.BadgeTypes.TAG}
    color={Badge.BadgeColorTypes.GRAY}
    count="↵"
    aria-hidden={true}
  />
)

/** Neutral type tag — Badge TAG + GRAY (DEFAULT appearance; light popup) */
export const TypeTag = ({ label }: { label: string }) => (
  <Badge
    className="search-row-tag"
    type={Badge.BadgeTypes.TAG}
    color={Badge.BadgeColorTypes.GRAY}
    count={label}
  />
)

export const Breadcrumbs = ({ path }: { path: string }) => {
  const segments = path.split('›').map((segment) => segment.trim())

  return (
    <span className="search-row-breadcrumbs">
      {segments.map((segment, index) => (
        <span key={`${segment}-${index}`} className="search-row-crumb">
          {index > 0 ? (
            <span className="search-row-crumb-separator" aria-hidden={true}>
              ›
            </span>
          ) : undefined}
          <Link
            type={Link.LINK_TYPE.INLINE_SECONDARY}
            size={Link.LINK_SIZE.SMALL}
            underline
            tabIndex={-1}
          >
            {segment}
          </Link>
        </span>
      ))}
    </span>
  )
}

interface RowLayoutProps {
  tag?: ReactNode
  primary: ReactNode
  secondary?: ReactNode
  typeLabel?: string
  /** Hovered or keyboard-highlighted: shows the ↵ chip at the far right */
  active?: boolean
  /** Icons start at the tags' left edge instead of centering in the slot */
  tagAlignStart?: boolean
}

/**
 * Wireframe row anatomy:
 * [type tag] [primary + secondary] [type label]
 * Colors only via TextLabel PRIMARY / SECONDARY (no CSS color overrides).
 * multiLine restores DS line-heights (22px / 16px) — default false is 10px / 8px.
 */
export const RowLayout = ({
  tag,
  primary,
  secondary,
  typeLabel,
  active = false,
  tagAlignStart = false,
}: RowLayoutProps) => (
  <FlexLayout
    className="search-row"
    alignItems="center"
    itemGap="S"
    justifyContent="flex-start"
  >
    <FlexLayout
      className={
        tagAlignStart ? 'search-row-tag-slot -start' : 'search-row-tag-slot'
      }
      alignItems="center"
      justifyContent={tagAlignStart ? 'flex-start' : 'center'}
      flexShrink="0"
    >
      {tag}
    </FlexLayout>
    <FlexItem className="search-row-text" flexGrow="1" flexShrink="1">
      <FlexLayout
        className="search-row-text-stack"
        flexDirection="column"
        itemGap="none"
        alignItems="flex-start"
      >
        <TextLabel
          className="search-row-primary"
          type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}
          display={TextLabel.TEXT_LABEL_DISPLAY.BLOCK}
          multiLine={true}
        >
          {primary}
        </TextLabel>
        {secondary ? (
          <TextLabel
            className="search-row-secondary"
            type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
            size={TextLabel.TEXT_LABEL_SIZE.SMALL}
            display={TextLabel.TEXT_LABEL_DISPLAY.BLOCK}
            multiLine={true}
          >
            {secondary}
          </TextLabel>
        ) : undefined}
      </FlexLayout>
    </FlexItem>
    {typeLabel ? (
      <TextLabel
        className="search-row-type"
        type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
        size={TextLabel.TEXT_LABEL_SIZE.SMALL}
      >
        {typeLabel}
      </TextLabel>
    ) : undefined}
    {active ? <EnterChip /> : undefined}
  </FlexLayout>
)

interface SearchResultRowProps {
  row: DisplayRow
  query: string
  active: boolean
  /** The participant hasn't moved yet, so this row is the default highlight Enter opens */
  isEnterDefault?: boolean
  selectableIndex: number | null
  onMouseEnter: (index: number) => void
  onSelect: (row: DisplayRow) => void
}

/**
 * Menu only wires clicks into direct MenuItem children, and this wrapper is the
 * direct child, so each row's MenuItem reports its own selection.
 */
export const SearchResultRow = ({
  row,
  query,
  active,
  isEnterDefault = false,
  selectableIndex,
  onMouseEnter,
  onSelect,
}: SearchResultRowProps) => {
  const handleClick = () => {
    onSelect(row)
  }

  const handleMouseEnter = () => {
    if (selectableIndex !== null) {
      onMouseEnter(selectableIndex)
    }
  }

  if (row.kind === 'top-match-loading') {
    return (
      <MenuItem key={row.id} disabled className="search-menu-item">
        <RowLayout
          tag={<DottedLoader loading aria-label="Loading top match" />}
          primary="Finding the best match…"
          secondary="Matches below are ready"
        />
      </MenuItem>
    )
  }

  if (row.kind === 'ask-niva') {
    return (
      <MenuItem
        key={row.id}
        onClick={handleClick}
        active={active}
        onMouseEnter={handleMouseEnter}
        className="search-menu-item search-niva-item"
      >
        <div className="search-niva-card">
          <RowLayout
            tag={<AIIcon aria-hidden={true} />}
            tagAlignStart={true}
            primary={
              <>
                Ask NIVA
                {row.query ? (
                  <>
                    {' about '}
                    <span className="search-niva-query">‘{row.query}’</span>
                  </>
                ) : undefined}
              </>
            }
            active={active}
          />
        </div>
      </MenuItem>
    )
  }

  if (row.kind === 'recent-query') {
    return (
      <MenuItem
        key={row.id}
        onClick={handleClick}
        active={active}
        onMouseEnter={handleMouseEnter}
        className="search-menu-item"
      >
        <RowLayout
          tag={<HistoryIcon aria-hidden={true} />}
          primary={row.query}
          secondary={recentQueryDestination(row.query, row.target)}
          typeLabel="Search"
          active={active}
        />
      </MenuItem>
    )
  }

  if (row.kind === 'see-all') {
    return (
      <MenuItem
        key={row.id}
        onClick={handleClick}
        active={active || isEnterDefault}
        onMouseEnter={handleMouseEnter}
        className="search-menu-item"
      >
        <RowLayout
          tag={<MagGlassIcon aria-hidden={true} />}
          primary={`See all ${row.count} result${row.count === 1 ? '' : 's'} for '${row.query}'`}
          active={active || isEnterDefault}
        />
      </MenuItem>
    )
  }

  if (row.kind === 'top-match-filter') {
    return (
      <MenuItem
        key={row.id}
        onClick={handleClick}
        active={active}
        onMouseEnter={handleMouseEnter}
        className="search-menu-item"
      >
        <RowLayout
          tag={<TypeTag label={TOP_MATCH_TAG[row.destination]} />}
          primary={emphasizeMatches(row.title, query)}
          secondary={`“${row.query}”`}
          typeLabel={TOP_MATCH_LABEL[row.destination]}
          active={active}
        />
      </MenuItem>
    )
  }

  const { entity } = row
  return (
    <MenuItem
      key={row.id}
      onClick={handleClick}
      active={active}
      onMouseEnter={handleMouseEnter}
      className="search-menu-item"
    >
      <RowLayout
        tag={<TypeTag label={TYPE_TAG[entity.type]} />}
        primary={emphasizeMatches(entity.name, query)}
        secondary={
          BREADCRUMB_TYPES.has(entity.type) ? (
            <Breadcrumbs path={entity.subtitle} />
          ) : (
            emphasizeMatches(entity.subtitle, query)
          )
        }
        typeLabel={entity.typeLabel}
        active={active}
      />
    </MenuItem>
  )
}
