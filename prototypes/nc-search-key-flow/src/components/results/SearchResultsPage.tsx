import {
  AIIcon,
  ContainerLayout,
  FlexLayout,
  Link,
  StackingLayout,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
import { useSearch } from '@tanstack/react-router'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { CLUSTERS, VM_ENTITIES } from '@proto/data/catalog'
import type {
  CatalogEntity,
  EntityType,
  InterpretedFilter,
} from '@proto/data/types'
import { TYPE_GROUP_LABEL } from '@proto/data/types'
import {
  useOpenLink,
  type ResultsSearch,
  type VmSort,
} from '@proto/lib/destinations'
import { resultsPrompts } from '@proto/lib/niva/answers'
import {
  clusterFilter,
  describeInterpretation,
  metricFilter,
  powerFilter,
  thresholdFor,
  type Metric,
  type SearchInterpretation,
} from '@proto/lib/query-interpreter'
import {
  EMPTY_FILTERS,
  SORT_LABEL,
  TYPE_NAME,
  applyFilters,
  fromInterpretation,
  hasTokens,
  isInterpreted,
  ncVmFor,
  notApplyingNote,
  parseRefinement,
  sortVms,
  touched,
  type ResultsFilters,
  type Severity,
  type TokenKey,
} from '@proto/lib/results-filters'
import {
  exactWordResults,
  getSearchResults,
  otherMatchesFor,
  resultsEntryFor,
  vmSortFor,
  type ResultsTopMatch,
} from '@proto/lib/search-engine'
import { useNiva } from '@proto/store/niva-store'
import { usePrototypeStore } from '@proto/store/prototype-store'
import {
  BREADCRUMB_TYPES,
  Breadcrumbs,
  TOP_MATCH_LABEL,
  TOP_MATCH_TAG,
  TYPE_TAG,
  TypeTag,
  emphasizeMatches,
} from '@proto/components/search/SearchResultRow'
import { mergeFilters } from '@proto/components/vms/filter-fields'
import {
  InterpretationBox,
  type InterpretationExtraToken,
} from '@proto/components/vms/InterpretationBox'
import {
  NivaBlock,
  ResultMenuItem,
  ResultsHeader,
  ResultsSection,
  SECTION_PAGE_SIZE,
} from './ResultsParts'
import { ResultsFilterMenu } from './ResultsFilterMenu'

const VM_SORT: Record<Metric, VmSort | undefined> = {
  iops: 'iops',
  cpuUsage: 'cpu',
  memoryUsage: undefined,
}

const plural = (count: number, noun: string) =>
  `${count} ${noun}${count === 1 ? '' : noun.endsWith('ch') ? 'es' : 's'}`

const vmDetails = (entity: CatalogEntity) => {
  const vm = ncVmFor(entity)
  return vm
    ? `IOPS ${String(vm.iops)} · CPU ${String(vm.cpuUsage)}% · ${String(vm.host)}`
    : entity.subtitle
}

const secondaryFor = (
  entity: CatalogEntity,
  query: string,
  withVmDetails: boolean,
): ReactNode => {
  if (entity.type === 'vm' && withVmDetails) return vmDetails(entity)
  if (BREADCRUMB_TYPES.has(entity.type)) {
    return <Breadcrumbs path={entity.subtitle} />
  }
  if ((entity.type === 'vm' || entity.type === 'host') && entity.clusterName) {
    return <>in {emphasizeMatches(entity.clusterName, query)}</>
  }
  return emphasizeMatches(entity.subtitle, query)
}

interface GroupProps {
  title: ReactNode
  ariaLabel: string
  count?: number
  entities: CatalogEntity[]
  query: string
  withVmDetails: boolean
  note?: string
  actions?: ReactNode
}

/** One results section: rows with type tags, "Show more", and an optional "doesn't apply" note. */
const ResultsGroup = ({
  title,
  ariaLabel,
  count,
  entities,
  query,
  withVmDetails,
  note,
  actions,
}: GroupProps) => {
  const openLink = useOpenLink()
  const [visible, setVisible] = useState(SECTION_PAGE_SIZE)
  const remaining = entities.length - visible

  return (
    <ResultsSection
      title={title}
      ariaLabel={ariaLabel}
      count={count}
      actions={actions}
      footer={
        note || remaining > 0 ? (
          <FlexLayout
            className="results-section-footer"
            justifyContent="space-between"
            alignItems="center"
          >
            {remaining > 0 ? (
              <Link onClick={() => setVisible((shown) => shown + 25)}>
                Show {Math.min(25, remaining)} more · {remaining} not shown
              </Link>
            ) : (
              <span />
            )}
            {note ? (
              <TextLabel
                type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
                size={TextLabel.TEXT_LABEL_SIZE.SMALL}
              >
                {note}
              </TextLabel>
            ) : undefined}
          </FlexLayout>
        ) : undefined
      }
    >
      {entities.slice(0, visible).map((entity) => (
        <ResultMenuItem
          key={entity.id}
          onClick={() => openLink({ kind: 'entity', entity })}
          tag={<TypeTag label={TYPE_TAG[entity.type]} />}
          primary={emphasizeMatches(entity.name, query)}
          secondary={secondaryFor(entity, query, withVmDetails)}
          typeLabel={entity.typeLabel}
        />
      ))}
    </ResultsSection>
  )
}

const countTitle = (label: ReactNode, countText: string) => (
  <>
    {label}
    <span className="results-section-count"> · {countText}</span>
  </>
)

const countText = (entities: CatalogEntity[]) =>
  entities.every((entity) => entity.type === 'vm')
    ? plural(entities.length, 'VM')
    : plural(entities.length, 'result')

interface ClusterSection {
  cluster?: string
  entities: CatalogEntity[]
}

/** Per cluster, most results first; results with no cluster (pages) come last. */
const groupByCluster = (entities: CatalogEntity[]): ClusterSection[] => {
  const byCluster = new Map<string, CatalogEntity[]>()
  const unclustered: CatalogEntity[] = []
  for (const entity of entities) {
    const cluster = entity.type === 'cluster' ? entity.name : entity.clusterName
    if (cluster) {
      byCluster.set(cluster, [...(byCluster.get(cluster) ?? []), entity])
    } else {
      unclustered.push(entity)
    }
  }
  const sections = [...byCluster.entries()]
    .map(([cluster, items]) => ({ cluster, entities: items }))
    .toSorted(
      (a, b) =>
        b.entities.length - a.entities.length ||
        a.cluster.localeCompare(b.cluster),
    )
  return unclustered.length > 0
    ? [...sections, { entities: unclustered }]
    : sections
}

const TopMatchCard = ({
  topMatch,
  query,
}: {
  topMatch: ResultsTopMatch
  query: string
}) => {
  const openLink = useOpenLink()
  const { openNiva } = useNiva()

  const row = (() => {
    switch (topMatch.kind) {
      case 'niva': {
        return (
          <ResultMenuItem
            onClick={() => openNiva(query)}
            tag={<AIIcon aria-hidden={true} />}
            primary={<>Ask NIVA about ‘{query}’</>}
            typeLabel="NIVA"
          />
        )
      }
      case 'filter': {
        return (
          <ResultMenuItem
            onClick={() =>
              openLink({
                kind: 'vm-list',
                search: { q: query, sort: vmSortFor(query) },
              })
            }
            tag={<TypeTag label={TOP_MATCH_TAG[topMatch.destination]} />}
            primary={emphasizeMatches(topMatch.title, query)}
            secondary={`“${query}”`}
            typeLabel={TOP_MATCH_LABEL[topMatch.destination]}
          />
        )
      }
      case 'entity': {
        return (
          <ResultMenuItem
            onClick={() =>
              openLink({ kind: 'entity', entity: topMatch.entity })
            }
            tag={<TypeTag label={TYPE_TAG[topMatch.entity.type]} />}
            primary={emphasizeMatches(topMatch.entity.name, query)}
            secondary={secondaryFor(topMatch.entity, query, false)}
            typeLabel={topMatch.entity.typeLabel}
          />
        )
      }
    }
  })()

  return <ResultsSection title="Top Match">{row}</ResultsSection>
}

/** Low confidence: offer the interpretation instead of applying it. */
const DidYouMean = ({
  suggestion,
  onSelect,
}: {
  suggestion: SearchInterpretation
  onSelect: () => void
}) => (
  <ContainerLayout
    border
    backgroundColor="white"
    padding="15px"
    className="results-suggestion"
  >
    <FlexLayout alignItems="center" itemGap="S">
      <AIIcon aria-hidden={true} />
      <TextLabel type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}>
        Did you mean:{' '}
        <Link onClick={onSelect}>{describeInterpretation(suggestion)}</Link>?
      </TextLabel>
    </FlexLayout>
  </ContainerLayout>
)

const filtersChanged = (
  previous: InterpretedFilter[],
  next: InterpretedFilter[],
): TokenKey[] => {
  const same = (a: InterpretedFilter, b?: InterpretedFilter) =>
    b !== undefined && a.op === b.op && String(a.value) === String(b.value)
  const attributes = new Set(
    [...previous, ...next].map((filter) => filter.attribute),
  )
  return [...attributes].filter((attribute) => {
    const before = previous.find((filter) => filter.attribute === attribute)
    const after = next.find((filter) => filter.attribute === attribute)
    return !before || !after || !same(before, after)
  })
}

const ResultsPage = ({ query }: { query: string }) => {
  const entry = useMemo(() => resultsEntryFor(query), [query])
  const { interpretationDelayMs } = usePrototypeStore()
  const openLink = useOpenLink()
  const [mode, setMode] = useState(entry.mode)
  const [state, setState] = useState<ResultsFilters>(() =>
    entry.interpretation
      ? fromInterpretation(entry.interpretation)
      : EMPTY_FILTERS,
  )
  const [interpreting, setInterpreting] = useState(
    entry.mode === 'interpreted' && interpretationDelayMs > 0,
  )

  useEffect(() => {
    if (!interpreting) return
    const timer = setTimeout(
      () => setInterpreting(false),
      interpretationDelayMs,
    )
    return () => clearTimeout(timer)
  }, [interpreting, interpretationDelayMs])

  const interpret = (interpretation: SearchInterpretation) => {
    setMode('interpreted')
    setState(fromInterpretation(interpretation))
    setInterpreting(interpretationDelayMs > 0)
  }
  const showExactWords = () => {
    setMode('keyword')
    setState(EMPTY_FILTERS)
  }
  // Removing the last interpreted token leaves nothing interpreted: show the exact words
  const update = (next: ResultsFilters) => {
    if (mode === 'interpreted' && !hasTokens(next)) showExactWords()
    else setState(next)
  }

  const setFilters = (next: InterpretedFilter[]) =>
    update({
      ...state,
      filters: next,
      interpreted: state.interpreted.filter(
        (key) => !filtersChanged(state.filters, next).includes(key),
      ),
    })
  const addFilters = (added: InterpretedFilter[]) =>
    setFilters(mergeFilters(state.filters, added))

  const onMenuSelect = (key: string) => {
    const [kind = '', value = ''] = key.split(/:(.*)/)
    switch (kind) {
      case 'type': {
        update(touched(state, 'type', { type: value as EntityType }))
        return
      }
      case 'cluster': {
        addFilters([clusterFilter(value)])
        return
      }
      case 'power': {
        addFilters([powerFilter(value as 'On' | 'Off')])
        return
      }
      case 'high': {
        const metric = value as Metric
        addFilters([metricFilter(metric, 'gt', thresholdFor(metric), 'high')])
        return
      }
      case 'severity': {
        update(touched(state, 'severity', { severity: value as Severity }))
        return
      }
      case 'group': {
        update(
          touched(state, 'group', { groupBy: value as 'type' | 'cluster' }),
        )
        return
      }
      case 'sort': {
        update(touched(state, 'sort', { sortBy: value as Metric }))
        return
      }
    }
  }

  const refine = (phrase: string) => {
    const { filters, severity } = parseRefinement(phrase)
    if (filters.length === 0 && !severity) return false
    const merged = mergeFilters(state.filters, filters)
    const changed = filtersChanged(state.filters, merged)
    update({
      ...state,
      filters: merged,
      ...(severity ? { severity } : {}),
      interpreted: state.interpreted.filter(
        (item) => !changed.includes(item) && !(severity && item === 'severity'),
      ),
    })
    return true
  }

  const extraTokens: InterpretationExtraToken[] = [
    ...(state.type
      ? [
          {
            key: 'type',
            label: 'Type',
            value: TYPE_NAME[state.type],
            onRemove: () => update(touched(state, 'type', { type: undefined })),
          },
        ]
      : []),
    ...(state.severity
      ? [
          {
            key: 'severity',
            label: 'Severity',
            value: state.severity,
            onRemove: () =>
              update(touched(state, 'severity', { severity: undefined })),
          },
        ]
      : []),
    ...(state.sortBy
      ? [
          {
            key: 'sort',
            label: 'Sort',
            value: SORT_LABEL[state.sortBy],
            onRemove: () =>
              update(touched(state, 'sort', { sortBy: undefined })),
          },
        ]
      : []),
    ...(state.groupBy === 'cluster'
      ? [
          {
            key: 'group',
            label: 'Group by',
            value: 'Cluster',
            onRemove: () =>
              update(touched(state, 'group', { groupBy: 'type' })),
          },
        ]
      : []),
  ]

  // ---- Result sets ----

  // A query that opened interpreted falls back to its exact words, not its VMs
  const keywordGroups = useMemo(
    () =>
      entry.mode === 'interpreted'
        ? exactWordResults(query)
        : getSearchResults(query).groups,
    [entry.mode, query],
  )
  const keywordEntities = useMemo(
    () => keywordGroups.flatMap((group) => group.entities),
    [keywordGroups],
  )
  const interpretedVms = useMemo(
    () => sortVms(applyFilters(VM_ENTITIES, state), state.sortBy),
    [state],
  )
  const otherMatches = useMemo(() => {
    const listed = new Set(interpretedVms.map((entity) => entity.id))
    return applyFilters(otherMatchesFor(query), state).filter(
      (entity) => !listed.has(entity.id),
    )
  }, [query, state, interpretedVms])
  const keywordShown = useMemo(
    () => applyFilters(keywordEntities, state),
    [keywordEntities, state],
  )

  const interpretedMode = mode === 'interpreted'
  const shown = interpretedMode ? interpretedVms : keywordShown
  const sortedShown = useMemo(
    () => [
      ...sortVms(
        shown.filter((entity) => entity.type === 'vm'),
        state.sortBy,
      ),
      ...shown.filter((entity) => entity.type !== 'vm'),
    ],
    [shown, state.sortBy],
  )
  const withVmDetails = interpretedMode || state.groupBy === 'cluster'
  const vmFilters = state.filters.filter(
    (filter) => filter.attribute !== 'cluster',
  )
  const sort = state.sortBy ? VM_SORT[state.sortBy] : undefined

  const openInEntityBrowser = (cluster?: string) =>
    openLink({
      kind: 'vm-list',
      search: {
        f: cluster ? [clusterFilter(cluster), ...vmFilters] : state.filters,
        ...(sort ? { sort } : {}),
      },
    })

  const signature = JSON.stringify({ ...state, interpreted: [] })
  const sections: ReactNode[] = []

  if (state.groupBy === 'cluster') {
    for (const section of groupByCluster(sortedShown)) {
      const { cluster, entities } = section
      const clusterEntity = CLUSTERS.find((item) => item.name === cluster)
      const hasVms = entities.some((entity) => entity.type === 'vm')
      sections.push(
        <ResultsGroup
          key={`${cluster ?? 'none'}-${signature}`}
          ariaLabel={`${cluster ?? 'Not in a cluster'} · ${countText(entities)}`}
          title={countTitle(
            cluster && clusterEntity ? (
              <Link
                underline={false}
                className="results-section-title-link"
                onClick={() =>
                  openLink({ kind: 'entity', entity: clusterEntity })
                }
              >
                {cluster}
              </Link>
            ) : (
              (cluster ?? 'Not in a cluster')
            ),
            countText(entities),
          )}
          entities={entities}
          query={query}
          withVmDetails={withVmDetails}
          note={
            entities.every((entity) => entity.type === 'vm')
              ? notApplyingNote('vm', state)
              : undefined
          }
          actions={
            cluster && hasVms ? (
              <Link onClick={() => openInEntityBrowser(cluster)}>
                Open in Entity Browser
              </Link>
            ) : undefined
          }
        />,
      )
    }
  } else if (interpretedMode) {
    if (interpretedVms.length > 0) {
      sections.push(
        <ResultsGroup
          key={`vms-${signature}`}
          ariaLabel="VMs"
          title={countTitle('VMs', plural(interpretedVms.length, 'VM'))}
          entities={interpretedVms}
          query={query}
          withVmDetails
          note={notApplyingNote('vm', state)}
          actions={
            <Link onClick={() => openInEntityBrowser()}>
              Open in Entity Browser
            </Link>
          }
        />,
      )
    }
  } else {
    for (const group of keywordGroups) {
      const entities = sortedShown.filter(
        (entity) => entity.type === group.type,
      )
      if (entities.length === 0) continue
      sections.push(
        <ResultsGroup
          key={`${group.type}-${signature}`}
          ariaLabel={TYPE_GROUP_LABEL[group.type]}
          title={TYPE_GROUP_LABEL[group.type]}
          count={entities.length}
          entities={entities}
          query={query}
          withVmDetails={withVmDetails}
          note={notApplyingNote(group.type, state)}
        />,
      )
    }
  }

  const clusterCount = new Set(
    interpretedVms.map((entity) => entity.clusterName),
  ).size
  const summary = interpreting
    ? 'Interpreting…'
    : interpretedMode && interpretedVms.length === 0
      ? plural(otherMatches.length, 'result')
      : interpretedMode
        ? `${plural(interpretedVms.length, 'VM')} across ${plural(clusterCount, 'cluster')}${
            otherMatches.length > 0
              ? ` · ${plural(otherMatches.length, 'other match')}`
              : ''
          }`
        : plural(keywordShown.length, 'result')

  const topCluster = interpretedMode
    ? groupByCluster(interpretedVms)[0]?.cluster
    : undefined
  const filteredMetric = state.filters
    .map((filter) => filter.attribute)
    .find((attribute): attribute is Metric =>
      ['iops', 'cpuUsage', 'memoryUsage'].includes(attribute),
    )
  const filteredCluster = state.filters.find(
    (filter) => filter.attribute === 'cluster',
  )
  const suggestions = resultsPrompts({
    query,
    metric: filteredMetric ?? state.sortBy,
    cluster: filteredCluster ? String(filteredCluster.value) : topCluster,
  })

  const nothingShown =
    !interpreting &&
    sections.length === 0 &&
    (interpretedMode
      ? otherMatches.length === 0
      : hasTokens(state) || (!entry.topMatch && !entry.suggestion))

  return (
    <StackingLayout padding="20px" itemGap="M" className="results-page">
      <ResultsHeader query={query} summary={summary} />

      <InterpretationBox
        className="results-interpretation"
        query={query}
        phase={interpreting ? 'interpreting' : 'done'}
        source="search"
        caption={
          hasTokens(state) && isInterpreted(state)
            ? 'Interpreted from your search'
            : 'Filters'
        }
        filters={state.filters}
        onChange={setFilters}
        extraTokens={extraTokens}
        addFilter={<ResultsFilterMenu state={state} onSelect={onMenuSelect} />}
        onRefine={refine}
        onClearAll={() =>
          interpretedMode ? showExactWords() : setState(EMPTY_FILTERS)
        }
      />

      {!interpretedMode && entry.topMatch ? (
        <TopMatchCard topMatch={entry.topMatch} query={query} />
      ) : undefined}

      {!interpretedMode && entry.suggestion ? (
        <DidYouMean
          suggestion={entry.suggestion}
          onSelect={() => {
            if (entry.suggestion) interpret(entry.suggestion)
          }}
        />
      ) : undefined}

      {interpreting ? undefined : sections}

      {interpretedMode && !interpreting && otherMatches.length > 0 ? (
        <ResultsGroup
          key={`other-${signature}`}
          ariaLabel="Other matches for your words"
          title="Other matches for your words"
          count={otherMatches.length}
          entities={otherMatches}
          query={query}
          withVmDetails={false}
        />
      ) : undefined}

      {nothingShown ? (
        <ContainerLayout border backgroundColor="white" padding="20px">
          <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
            {hasTokens(state)
              ? 'No results match these filters. Remove a filter to see more.'
              : `No results for ‘${query}’ in DND_DEMO1.`}
          </TextLabel>
        </ContainerLayout>
      ) : undefined}

      <NivaBlock suggestions={suggestions} />
    </StackingLayout>
  )
}

/** "See all N results" and the across-clusters Top Match both land here; the query decides the mode. */
export const SearchResultsPage = () => {
  const { q = '' } = useSearch({ strict: false }) as ResultsSearch
  const query = q.trim()
  return <ResultsPage key={query} query={query} />
}
