export type EntityType = 'vm' | 'cluster' | 'host' | 'alert' | 'page' | 'domain'

export interface CatalogEntity {
  id: string
  type: EntityType
  name: string
  subtitle: string
  typeLabel: string
  hasChildren?: boolean
  clusterName?: string
  searchText: string
}

/** VM attributes the interpreter can filter on (template Entity Browser schema names). */
export type FilterAttribute =
  | 'cluster'
  | 'host'
  | 'powerState'
  | 'iops'
  | 'cpuUsage'
  | 'memoryUsage'

/** One condition read out of the participant's query; maps 1:1 to an EBR filter condition. */
export interface InterpretedFilter {
  id: string
  attribute: FilterAttribute
  op: 'eq' | 'gt' | 'lt'
  value: string | number
  /** Token key, e.g. "Cluster" */
  label: string
  /** Token value, e.g. "ABC" or "high (> 300)" */
  valueLabel: string
}

export type QueryIntent =
  | 'empty'
  /** why / how come / what's causing: Ask NIVA is the Top Match */
  | 'diagnostic'
  | 'question'
  | 'question-condition'
  | 'condition'
  | 'exact'
  | 'partial'

export type TopMatchStatus = 'idle' | 'loading' | 'ready' | 'failed'

export type SelectableRow =
  | { id: string; kind: 'entity'; entity: CatalogEntity }
  | {
      id: string
      kind: 'top-match-filter'
      title: string
      query: string
      filters: InterpretedFilter[]
      /** One cluster: its Entity Browser. Across clusters: the grouped results page. */
      destination: TopMatchDestination
    }
  | { id: string; kind: 'ask-niva'; query: string }
  | { id: string; kind: 'see-all'; query: string; count: number }
  | {
      id: string
      kind: 'recent-query'
      query: string
      target: RecentQueryTarget
    }

export type TopMatchDestination = 'entity-browser' | 'grouped-results'

/** Where a past search went: its Top Match (VM list or grouped results) or the results page. */
export type RecentQueryTarget = 'vm-list' | 'grouped-results' | 'results'

/** What the participant opened from search this session, newest first. */
export type RecentItem =
  | { kind: 'entity'; entityId: string }
  | { kind: 'query'; query: string; target: RecentQueryTarget }

export type DisplayRow =
  | SelectableRow
  | { id: string; kind: 'top-match-loading' }

export interface SearchSection {
  id: string
  title?: string
  rows: DisplayRow[]
}

export interface SearchModel {
  intent: QueryIntent
  sections: SearchSection[]
  selectable: SelectableRow[]
  /** Row highlighted before the participant moves; none means Enter opens See all. */
  defaultId?: string
}

export const TYPE_GROUP_ORDER: EntityType[] = [
  'cluster',
  'vm',
  'host',
  'alert',
  'page',
  'domain',
]

/** Results page section order (Results_Page.jpg); domains follow pages. */
export const RESULTS_TYPE_ORDER: EntityType[] = [
  'vm',
  'cluster',
  'host',
  'alert',
  'page',
  'domain',
]

export const TYPE_GROUP_LABEL: Record<EntityType, string> = {
  cluster: 'Clusters',
  vm: 'VMs',
  host: 'Hosts',
  alert: 'Alerts',
  page: 'Pages',
  domain: 'Domains',
}

export const TYPE_PREVIEW_LIMIT: Record<EntityType, number> = {
  cluster: 3,
  vm: 3,
  host: 3,
  alert: 2,
  page: 3,
  domain: 3,
}
