import {
  ALL_ENTITIES,
  CLUSTERS,
  FAVORITE_IDS,
  PAGES,
  RECENT_IDS,
  getEntityById,
} from '@proto/data/catalog'
import type {
  CatalogEntity,
  EntityType,
  InterpretedFilter,
  QueryIntent,
  RecentItem,
  SearchModel,
  SearchSection,
  SelectableRow,
  TopMatchDestination,
  TopMatchStatus,
} from '@proto/data/types'
import {
  RESULTS_TYPE_ORDER,
  TYPE_GROUP_LABEL,
  TYPE_GROUP_ORDER,
  TYPE_PREVIEW_LIMIT,
} from '@proto/data/types'
import type { VmSort } from './destinations'
import { catalogVmId, vmsMatching } from './nc-data'
import {
  describeInterpretation,
  findClusterName,
  interpretSearch,
  isConditionQuery,
  isDiagnosticQuestion,
  isLowConfidence,
  isQuestion,
  normalize,
  topMatchTitle,
  type SearchInterpretation,
} from './query-interpreter'

export { normalize } from './query-interpreter'

export const TOP_MATCH_SECTION_ID = 'top-match'

/** Whole-word keywords that make a page a literal match ("vms" → VMs page). */
const PAGE_KEYWORDS: Record<string, RegExp> = {
  'page-vms': /\b(vms?|virtual machines?)\b/,
  'page-alerts': /\balerts?\b/,
  'page-global-settings': /\bsettings\b/,
  'page-ntp-server': /\bntp\b/,
}

export const findExactEntity = (query: string): CatalogEntity | undefined => {
  const normalized = normalize(query)
  return ALL_ENTITIES.find((entity) => normalize(entity.name) === normalized)
}

export const classifyQuery = (rawQuery: string): QueryIntent => {
  const query = normalize(rawQuery)
  if (!query) return 'empty'
  if (isDiagnosticQuestion(query)) return 'diagnostic'
  if (isQuestion(query)) {
    return isConditionQuery(query) ? 'question-condition' : 'question'
  }
  if (findExactEntity(query)) return 'exact'
  if (isConditionQuery(query)) return 'condition'
  return 'partial'
}

/** Only interpreted conditions get a Top Match; a typed entity name is a literal match. */
export const needsTopMatch = (intent: QueryIntent) =>
  intent === 'condition' || intent === 'question-condition'

/** Every Top Match, NIVA included, is a result of interpretation and shows its loading state first. */
export const topMatchLoads = (intent: QueryIntent) =>
  needsTopMatch(intent) || intent === 'diagnostic'

/** Literal matches with the exactly named entity first in its group. */
const literalEntityMatches = (query: string) => {
  const exact = findExactEntity(query)
  const matches = ALL_ENTITIES.filter((entity) => entityMatches(entity, query))
  return exact
    ? [exact, ...matches.filter((entity) => entity.id !== exact.id)]
    : matches
}

const entityMatches = (entity: CatalogEntity, query: string) => {
  const normalized = normalize(query)
  if (!normalized) return false
  return (
    normalize(entity.name).includes(normalized) ||
    normalize(entity.searchText).includes(normalized)
  )
}

/** Entities named literally in the query: the cluster, VMs/hosts by name, then pages by keyword. */
const literalMatches = (query: string): CatalogEntity[] => {
  const normalized = normalize(query)
  const clusterName = findClusterName(normalized)
  const cluster = CLUSTERS.find((item) => item.name === clusterName)
  const named = ALL_ENTITIES.filter(
    (entity) =>
      (entity.type === 'vm' || entity.type === 'host') &&
      normalized.includes(normalize(entity.name)),
  )
  const pages = PAGES.filter((page) => PAGE_KEYWORDS[page.id]?.test(normalized))
  return [...(cluster ? [cluster] : []), ...named, ...pages]
}

/**
 * How literally an entity's own name matches: exact, then prefix, then a word
 * starting with the query, then anywhere in the name. Matches only through
 * related text (a VM "in Cluster ABC") score 0. Shorter names win ties.
 */
const literalScore = (entity: CatalogEntity, normalized: string) => {
  const name = normalize(entity.name)
  const tier =
    name === normalized
      ? 4
      : name.startsWith(normalized)
        ? 3
        : ` ${name}`.includes(` ${normalized}`)
          ? 2
          : name.includes(normalized)
            ? 1
            : 0
  return tier === 0 ? 0 : tier * 1000 - name.length
}

/**
 * Most literal match first: entities ranked inside each type group, and the
 * group holding the best match leads; the other groups keep `baseOrder`.
 */
const rankLiteral = (
  entities: CatalogEntity[],
  query: string,
  baseOrder: EntityType[],
) => {
  const normalized = normalize(query)
  const scored = entities
    .map((entity) => ({ entity, score: literalScore(entity, normalized) }))
    .toSorted((a, b) => b.score - a.score)
  const best = scored[0]
  const order =
    best && best.score > 0
      ? [
          best.entity.type,
          ...baseOrder.filter((type) => type !== best.entity.type),
        ]
      : baseOrder
  return order.map((type) => ({
    type,
    entities: scored
      .filter(({ entity }) => entity.type === type)
      .map(({ entity }) => entity),
  }))
}

const toEntityRow = (entity: CatalogEntity): SelectableRow => ({
  id: `entity-${entity.id}`,
  kind: 'entity',
  entity,
})

const groupedSections = (
  entities: CatalogEntity[],
  query: string,
): { sections: SearchSection[]; seeAll?: SelectableRow } => {
  const sections: SearchSection[] = []
  let total = 0

  for (const { type, entities: group } of rankLiteral(
    entities,
    query,
    TYPE_GROUP_ORDER,
  )) {
    if (group.length === 0) continue
    total += group.length
    const preview = group.slice(0, TYPE_PREVIEW_LIMIT[type])
    const title =
      group.length > 1
        ? `${TYPE_GROUP_LABEL[type]} · ${group.length}`
        : TYPE_GROUP_LABEL[type]

    sections.push({
      id: `group-${type}`,
      title,
      rows: preview.map((entity) => toEntityRow(entity)),
    })
  }

  const seeAll: SelectableRow | undefined =
    total > 0
      ? { id: 'see-all', kind: 'see-all', query, count: total }
      : undefined

  return { sections, seeAll }
}

const entitiesByIds = (ids: string[]) =>
  ids
    .map((id) => getEntityById(id))
    .filter((entity): entity is CatalogEntity => entity !== undefined)

const askNivaRow = (query: string): SelectableRow => ({
  id: 'ask-niva',
  kind: 'ask-niva',
  query,
})

const flattenSelectable = (sections: SearchSection[]): SelectableRow[] =>
  sections.flatMap((section) =>
    section.rows.filter(
      (row): row is SelectableRow => row.kind !== 'top-match-loading',
    ),
  )

const filterTopMatchSection = (
  query: string,
  status: TopMatchStatus,
): SearchSection | undefined => {
  if (status === 'failed') return undefined
  if (status !== 'ready') {
    return {
      id: TOP_MATCH_SECTION_ID,
      title: 'Top Match',
      rows: [{ id: 'top-match-loading', kind: 'top-match-loading' }],
    }
  }
  // The slot was reserved by keyword rules; collapse it when nothing interprets
  const topMatch = topMatchFor(query)
  if (!topMatch) return undefined
  return {
    id: TOP_MATCH_SECTION_ID,
    title: 'Top Match',
    rows: [
      {
        id: 'top-match-filter',
        kind: 'top-match-filter',
        query,
        ...topMatch,
      },
    ],
  }
}

/** Diagnostic questions: NIVA is the destination, so it takes the Top Match slot. */
const nivaTopMatchSection = (query: string): SearchSection => ({
  id: TOP_MATCH_SECTION_ID,
  title: 'Top Match',
  rows: [askNivaRow(query)],
})

const matchesSection = (entities: CatalogEntity[]): SearchSection[] =>
  entities.length > 0
    ? [
        {
          id: 'matches',
          title: 'Matches',
          rows: entities.map((entity) => toEntityRow(entity)),
        },
      ]
    : []

const MAX_RECENT_ROWS = 5

/** Session searches first (newest on top), then the seeded history. */
const recentRows = (recents: RecentItem[]): SelectableRow[] => {
  const items: RecentItem[] = [
    ...recents,
    ...RECENT_IDS.map((entityId) => ({ kind: 'entity' as const, entityId })),
  ]
  const seen = new Set<string>()
  const rows: SelectableRow[] = []
  for (const item of items) {
    const id =
      item.kind === 'entity'
        ? `entity-${item.entityId}`
        : `recent-query-${normalize(item.query)}`
    if (seen.has(id)) continue
    if (item.kind === 'entity') {
      const entity = getEntityById(item.entityId)
      if (!entity) continue
      rows.push(toEntityRow(entity))
    } else {
      rows.push({
        id,
        kind: 'recent-query',
        query: item.query,
        target: item.target,
      })
    }
    seen.add(id)
  }
  return rows.slice(0, MAX_RECENT_ROWS)
}

export const buildSearchModel = (
  rawQuery: string,
  topMatchStatus: TopMatchStatus,
  recents: RecentItem[] = [],
): SearchModel => {
  const intent = classifyQuery(rawQuery)
  const query = rawQuery.trim()
  // See all is highlighted until the participant moves, so Enter opens the results page
  const build = (sections: Array<SearchSection | undefined>): SearchModel => {
    const present = sections.filter(
      (section): section is SearchSection => section !== undefined,
    )
    const selectable = flattenSelectable(present)
    return {
      intent,
      sections: present,
      selectable,
      defaultId: selectable.find((row) => row.kind === 'see-all')?.id,
    }
  }
  const seeAllSection = (): SearchSection | undefined => {
    const { total } = getSearchResults(query)
    return total > 0
      ? {
          id: 'see-all',
          rows: [{ id: 'see-all', kind: 'see-all', query, count: total }],
        }
      : undefined
  }

  if (intent === 'empty') {
    return build([
      {
        id: 'recent',
        title: 'Recent',
        rows: recentRows(recents),
      },
      {
        id: 'favorites',
        title: 'Favorites',
        rows: entitiesByIds(FAVORITE_IDS).map((entity) => toEntityRow(entity)),
      },
      { id: 'ask-niva', rows: [askNivaRow('')] },
    ])
  }

  // NIVA is the Top Match once interpreted, so there is no second Ask NIVA row at the bottom
  if (intent === 'diagnostic') {
    if (topMatchStatus !== 'ready') {
      return build([
        filterTopMatchSection(query, topMatchStatus),
        ...matchesSection(literalMatches(query)),
        seeAllSection(),
        { id: 'ask-niva', rows: [askNivaRow(query)] },
      ])
    }
    return build([
      nivaTopMatchSection(query),
      ...matchesSection(literalMatches(query)),
      seeAllSection(),
    ])
  }

  // Ask NIVA stays last for questions too: moving it while typing interrupts the flow
  if (
    intent === 'question' ||
    intent === 'question-condition' ||
    intent === 'condition'
  ) {
    return build([
      intent === 'question'
        ? undefined
        : filterTopMatchSection(query, topMatchStatus),
      ...matchesSection(literalMatches(query)),
      seeAllSection(),
      { id: 'ask-niva', rows: [askNivaRow(query)] },
    ])
  }

  const ask: SearchSection = { id: 'ask-niva', rows: [askNivaRow(query)] }
  const { sections: grouped, seeAll } = groupedSections(
    literalEntityMatches(query),
    query,
  )
  return build([
    ...grouped,
    seeAll ? { id: 'see-all', rows: [seeAll] } : undefined,
    ask,
  ])
}

/** "highest / top / busiest / most" open the Entity Browser sorted by that metric. */
export const vmSortFor = (query: string): VmSort | undefined => {
  const { sortBy } = interpretSearch(query)
  if (sortBy === 'iops') return 'iops'
  if (sortBy === 'cpuUsage') return 'cpu'
  return undefined
}

/** Top Match for a condition query, or nothing when no condition or grouping was read. */
export const topMatchFor = (
  query: string,
):
  | {
      title: string
      filters: InterpretedFilter[]
      destination: TopMatchDestination
    }
  | undefined => {
  // Hedged wording gets "Did you mean …?" on the results page instead
  if (isLowConfidence(query)) return undefined
  const interpretation = interpretSearch(query)
  const { filters, groupBy, acrossClusters } = interpretation
  if (filters.length === 0 && !groupBy) return undefined
  return acrossClusters
    ? {
        title: describeInterpretation(interpretation),
        filters,
        destination: 'grouped-results',
      }
    : {
        title: topMatchTitle(filters),
        filters,
        destination: 'entity-browser',
      }
}

export type ResultsTopMatch =
  | {
      kind: 'filter'
      title: string
      filters: InterpretedFilter[]
      destination: TopMatchDestination
    }
  | { kind: 'entity'; entity: CatalogEntity }
  | { kind: 'niva' }

export interface SearchResults {
  intent: QueryIntent
  topMatch?: ResultsTopMatch
  groups: Array<{ type: EntityType; entities: CatalogEntity[] }>
  /** Results excluding the Top Match; the dropdown "See all N results" uses the same number. */
  total: number
}

const uniqueEntities = (entities: CatalogEntity[]) => [
  ...new Map(entities.map((entity) => [entity.id, entity])).values(),
]

export const catalogVms = (filters: InterpretedFilter[]) =>
  vmsMatching(filters)
    .map((vm) => getEntityById(catalogVmId(vm)))
    .filter((entity): entity is CatalogEntity => entity !== undefined)

/**
 * Full result set for the results page. When the Top Match is the grouped
 * results page itself, the result set is the VMs it lists plus the literal
 * matches; otherwise it is the literal matches for the words typed.
 */
export const getSearchResults = (rawQuery: string): SearchResults => {
  const query = rawQuery.trim()
  const intent = classifyQuery(query)
  let topMatch: ResultsTopMatch | undefined
  let entities: CatalogEntity[] = []

  switch (intent) {
    case 'condition':
    case 'question-condition': {
      const match = topMatchFor(query)
      if (match?.destination === 'grouped-results') {
        entities = uniqueEntities([
          ...literalMatches(query),
          ...catalogVms(match.filters),
        ])
      } else {
        if (match) topMatch = { kind: 'filter', ...match }
        entities = literalMatches(query)
      }
      break
    }
    case 'diagnostic': {
      topMatch = { kind: 'niva' }
      entities = literalMatches(query)
      break
    }
    case 'question': {
      entities = literalMatches(query)
      break
    }
    case 'exact':
    case 'partial': {
      entities = literalEntityMatches(query)
      break
    }
    case 'empty': {
      break
    }
  }

  // Interpreted results are VMs, so VMs lead; literal searches lead with the closest name
  const groups = (
    resultsEntryFor(query).mode === 'interpreted'
      ? RESULTS_TYPE_ORDER.map((type) => ({
          type,
          entities: entities.filter((entity) => entity.type === type),
        }))
      : rankLiteral(entities, query, TYPE_GROUP_ORDER)
  ).filter((group) => group.entities.length > 0)

  return { intent, topMatch, groups, total: entities.length }
}

/**
 * How the results page opens a query, from the same classification and Top
 * Match the dropdown showed, so both always agree:
 * - `interpreted`: the Top Match is this page (grouped results across clusters);
 * - `keyword` with `topMatch`: the Top Match is elsewhere (Entity Browser, NIVA);
 * - `keyword` with `suggestion`: condition-like but hedged, offered as "Did you mean";
 * - plain `keyword`: literal words.
 */
export interface ResultsEntry {
  mode: 'interpreted' | 'keyword'
  interpretation?: SearchInterpretation
  topMatch?: ResultsTopMatch
  suggestion?: SearchInterpretation
}

export const resultsEntryFor = (rawQuery: string): ResultsEntry => {
  const query = rawQuery.trim()
  const intent = classifyQuery(query)
  if (intent === 'diagnostic') {
    return { mode: 'keyword', topMatch: { kind: 'niva' } }
  }
  if (!needsTopMatch(intent)) return { mode: 'keyword' }

  if (isLowConfidence(query)) {
    const guess = interpretSearch(query)
    return guess.filters.length > 0 || guess.groupBy
      ? { mode: 'keyword', suggestion: guess }
      : { mode: 'keyword' }
  }
  const match = topMatchFor(query)
  if (match?.destination === 'grouped-results') {
    return { mode: 'interpreted', interpretation: interpretSearch(query) }
  }
  return match
    ? { mode: 'keyword', topMatch: { kind: 'filter', ...match } }
    : { mode: 'keyword' }
}

/** Entities whose names (or page keywords) match the words typed. */
export const otherMatchesFor = (query: string) => literalMatches(query)

/** An interpreted query with every token removed: the literal matches only, grouped by type. */
export const exactWordResults = (rawQuery: string) =>
  rankLiteral(
    literalMatches(rawQuery.trim()),
    rawQuery,
    TYPE_GROUP_ORDER,
  ).filter((group) => group.entities.length > 0)
