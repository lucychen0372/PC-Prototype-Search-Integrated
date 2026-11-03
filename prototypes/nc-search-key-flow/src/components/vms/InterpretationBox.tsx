import {
  AIIcon,
  Button,
  CloseIcon,
  FlexLayout,
  Input,
  Link,
  StackingLayout,
  TextLabel,
  VerticalSeparator,
} from '@nutanix-ui/prism-reactjs'
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react'
import type { InterpretedFilter } from '@proto/data/types'
import { parseConditions } from '@proto/lib/query-interpreter'
import { FILTER_FIELDS, mergeFilters } from './filter-fields'
import { AddFilterPopover, EditFilterPopover } from './FilterPopovers'
import type { InterpretationPhase } from './interpretation-context'
import './InfraVmsPage.css'

const PLACEHOLDER_TOKEN_WIDTHS = [90, 105, 120]

/**
 * Markup and classes of EBR's filter-bar tag (FilterBar.jsx `filter-bar-tag basic-tag`),
 * so interpreted tokens look like the Entity Browser's own filter tags.
 */
export const FilterToken = ({
  label,
  value,
  onRemove,
  className = 'vm-interpretation-token',
}: {
  label: string
  value: string
  /** Omitted for the page's own scope ("Cluster: Cluster ABC" inside its VMs tab). */
  onRemove?: () => void
  className?: string
}) => (
  <FlexLayout
    itemGap="XS"
    alignItems="center"
    className={`filter-bar-tag basic-tag ${className}`}
    data-test={`interpreted-${label}`}
  >
    <div className="-label">
      <span className="vm-interpretation-token-key">{label}</span>
      {label === 'IOPS' || label.endsWith('%') ? ' · ' : ': '}
      {value}
    </div>
    {onRemove ? (
      <>
        <VerticalSeparator
          className="-separator"
          appearance={VerticalSeparator.VerticalSeparatorAppearance.SECONDARY}
        />
        <Button
          type={Button.ButtonTypes.ICON_DEFAULT}
          appearance="mini"
          className="-close-button"
          aria-label={`Remove ${label} filter`}
          onClick={(event: MouseEvent) => {
            // The token itself opens the edit popover
            event.stopPropagation()
            onRemove()
          }}
        >
          <CloseIcon size={CloseIcon.CloseIconSize.SMALL} />
        </Button>
      </>
    ) : undefined}
  </FlexLayout>
)

const QueryField = ({
  query,
  placeholder,
  onSearch,
}: {
  query: string
  placeholder?: string
  onSearch: (query: string) => void
}) => {
  const [value, setValue] = useState(query)

  useEffect(() => setValue(query), [query])

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const next = value.trim()
    if (event.key === 'Enter' && next) onSearch(next)
  }

  return (
    <Input
      className="vm-interpretation-query"
      search={true}
      placeholder={placeholder}
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        setValue(event.target.value)
      }
      onKeyDown={onKeyDown}
      aria-label="Search query"
    />
  )
}

const REFINE_DELAY_MS = 600

/** Plain-words refinement: "also high memory" becomes one more filter token. */
const RefineRow = ({
  onRefine,
}: {
  /** False when nothing in the phrase reads as a filter. */
  onRefine: (phrase: string) => boolean
}) => {
  const [text, setText] = useState('')
  const [status, setStatus] = useState<'idle' | 'interpreting' | 'no-match'>(
    'idle',
  )
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const interpret = () => {
    const phrase = text.trim()
    if (!phrase || status === 'interpreting') return
    setStatus('interpreting')
    timer.current = setTimeout(() => {
      if (!onRefine(phrase)) {
        setStatus('no-match')
        return
      }
      setText('')
      setStatus('idle')
    }, REFINE_DELAY_MS)
  }

  return (
    <StackingLayout itemGap="XS">
      <FlexLayout itemGap="S" alignItems="center">
        <Input
          className="vm-interpretation-refine"
          prefix={
            <TextLabel
              type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
              aria-hidden={true}
            >
              ↳
            </TextLabel>
          }
          value={text}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setText(event.target.value)
            if (status === 'no-match') setStatus('idle')
          }}
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') interpret()
          }}
          placeholder="Refine in plain words, e.g. 'also high memory'"
          aria-label="Refine in plain words"
        />
        <Button
          type={Button.ButtonTypes.SECONDARY}
          onClick={interpret}
          disabled={!text.trim() || status === 'interpreting'}
        >
          <AIIcon aria-hidden={true} />
          {status === 'interpreting' ? 'Interpreting…' : 'Interpret'}
        </Button>
      </FlexLayout>
      {status === 'no-match' ? (
        <TextLabel
          type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
          size={TextLabel.TEXT_LABEL_SIZE.SMALL}
          aria-live="polite"
        >
          No filter found in that. Try “CPU over 80%”, “powered off” or “on
          HOST-02”.
        </TextLabel>
      ) : undefined}
    </StackingLayout>
  )
}

/** Non-filter parts of an interpretation, e.g. "Sort: IOPS high to low", "Group by: Cluster". */
export interface InterpretationExtraToken {
  key: string
  label: string
  value: string
  onRemove: () => void
}

interface InterpretationBoxProps {
  query: string
  queryPlaceholder?: string
  /** Shows the editable query field above the card (Entity Browser). */
  onSearch?: (query: string) => void
  phase: InterpretationPhase
  source: 'search' | 'niva'
  /** Current filters, editable and removable. */
  filters: InterpretedFilter[]
  onChange: (filters: InterpretedFilter[]) => void
  /** Set by the page ("Cluster ABC" inside its VMs tab); locked unless `onScopeChange` is given. */
  scopeFilters?: InterpretedFilter[]
  /** Editing or removing a scope tag leaves the page: the page decides where to go. */
  onScopeChange?: (
    scope: InterpretedFilter[],
    filters: InterpretedFilter[],
  ) => void
  extraTokens?: InterpretationExtraToken[]
  /** Replaces the computed caption ("Interpreted from your search", "Filters", …). */
  caption?: string
  /** Replaces the VM-field "+ Filter" popover, e.g. the results page's filter menu. */
  addFilter?: ReactNode
  /** Replaces the default plain-words parsing into VM filters; false when nothing was read. */
  onRefine?: (phrase: string) => boolean
  /** Clears every token, not only `filters`. */
  onClearAll?: () => void
  className?: string
}

/**
 * The interpretation box every interpreted Top Match lands on, in the Entity
 * Browser or on the results page: query (EB only), "Interpreting…", then tokens with
 * edit / remove, + Filter, Clear all and the plain-words refine row.
 */
export const InterpretationBox = ({
  query,
  queryPlaceholder,
  onSearch,
  phase,
  source,
  filters,
  onChange,
  scopeFilters = [],
  onScopeChange,
  extraTokens = [],
  caption: captionOverride,
  addFilter,
  onRefine,
  onClearAll,
  className,
}: InterpretationBoxProps) => {
  const scopedAttributes = new Set(
    scopeFilters.map((filter) => filter.attribute),
  )
  const fields = FILTER_FIELDS.filter(
    (field) => !scopedAttributes.has(field.attribute),
  )
  const origin = source === 'niva' ? 'NIVA' : 'your search'
  const isInterpreting = phase === 'interpreting'
  const hasTokens = filters.length > 0 || extraTokens.length > 0

  const replaceFilter = (
    previous: InterpretedFilter,
    next: InterpretedFilter,
  ) =>
    onChange(
      mergeFilters(
        filters.filter((filter) => filter.attribute !== previous.attribute),
        [next],
      ),
    )

  // The scope's own attribute is fixed by the page ("on Cluster ABC" inside its VMs tab)
  const addFilters = (added: InterpretedFilter[]) =>
    onChange(
      mergeFilters(
        filters,
        added.filter((filter) => !scopedAttributes.has(filter.attribute)),
      ),
    )

  const refine =
    onRefine ??
    ((phrase: string) => {
      const parsed = parseConditions(phrase)
      if (parsed.length > 0) addFilters(parsed)
      return parsed.length > 0
    })

  const canClear =
    filters.length > 0 ||
    (onClearAll !== undefined && extraTokens.length > 0) ||
    (onScopeChange !== undefined && scopeFilters.length > 0)
  const clearAll = () => {
    if (onClearAll) onClearAll()
    else if (onScopeChange && scopeFilters.length > 0) onScopeChange([], [])
    else onChange([])
  }

  // A locked scope tag ("Cluster: ABC" on its VMs tab) is a filter too
  const caption =
    captionOverride ??
    (hasTokens || scopeFilters.length > 0
      ? source === 'niva'
        ? 'Filters from NIVA'
        : query
          ? 'Interpreted from your search'
          : 'Filters'
      : query || source === 'niva'
        ? `No filters from ${origin}`
        : 'No filters yet')

  return (
    <StackingLayout
      itemGap="S"
      className={[
        'vm-interpretation',
        isInterpreting ? '-interpreting' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {onSearch ? (
        <QueryField
          query={query}
          placeholder={queryPlaceholder}
          onSearch={onSearch}
        />
      ) : undefined}
      <StackingLayout
        itemGap="S"
        padding="10px"
        className="vm-interpretation-card"
      >
        {isInterpreting ? (
          <FlexLayout
            alignItems="center"
            itemGap="S"
            className="vm-interpretation-tokens"
            aria-busy={true}
            aria-live="polite"
          >
            <TextLabel
              type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
              size={TextLabel.TEXT_LABEL_SIZE.SMALL}
              className="vm-interpretation-caption"
            >
              Interpreting…
            </TextLabel>
            {PLACEHOLDER_TOKEN_WIDTHS.map((width) => (
              <span
                key={width}
                aria-hidden={true}
                className={`vm-interpretation-placeholder -w${width}`}
              />
            ))}
          </FlexLayout>
        ) : (
          <FlexLayout
            alignItems="center"
            itemGap="S"
            flexWrap="wrap"
            className="vm-interpretation-tokens"
          >
            <TextLabel
              type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
              size={TextLabel.TEXT_LABEL_SIZE.SMALL}
              className="vm-interpretation-caption"
            >
              {caption}
            </TextLabel>
            {scopeFilters.map((filter) =>
              onScopeChange ? (
                <EditFilterPopover
                  key={filter.id}
                  filter={filter}
                  fields={FILTER_FIELDS.filter(
                    (field) => field.attribute === filter.attribute,
                  )}
                  onApply={(next) =>
                    onScopeChange(
                      scopeFilters.map((item) =>
                        item.id === filter.id ? next : item,
                      ),
                      filters,
                    )
                  }
                >
                  <FilterToken
                    label={filter.label}
                    value={filter.valueLabel}
                    onRemove={() =>
                      onScopeChange(
                        scopeFilters.filter((item) => item.id !== filter.id),
                        filters,
                      )
                    }
                  />
                </EditFilterPopover>
              ) : (
                <FilterToken
                  key={filter.id}
                  label={filter.label}
                  value={filter.valueLabel}
                  className="vm-interpretation-token -locked"
                />
              ),
            )}
            {filters.map((filter) => (
              <EditFilterPopover
                key={filter.id}
                filter={filter}
                fields={fields}
                onApply={(next) => replaceFilter(filter, next)}
              >
                <FilterToken
                  label={filter.label}
                  value={filter.valueLabel}
                  onRemove={() =>
                    onChange(filters.filter((item) => item.id !== filter.id))
                  }
                />
              </EditFilterPopover>
            ))}
            {extraTokens.map((token) => (
              <FilterToken
                key={token.key}
                label={token.label}
                value={token.value}
                className="vm-interpretation-token -static"
                onRemove={token.onRemove}
              />
            ))}
            {addFilter ?? (
              <AddFilterPopover
                current={filters}
                scope={scopeFilters}
                fields={fields}
                onAdd={(filter) => addFilters([filter])}
              />
            )}
            {canClear ? (
              <Link
                type={Link.LINK_TYPE.INLINE_SECONDARY}
                size={Link.LINK_SIZE.SMALL}
                underline
                onClick={clearAll}
              >
                Clear all
              </Link>
            ) : undefined}
          </FlexLayout>
        )}
        <RefineRow onRefine={refine} />
      </StackingLayout>
    </StackingLayout>
  )
}
