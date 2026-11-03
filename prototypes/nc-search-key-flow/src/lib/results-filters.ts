import type {
  CatalogEntity,
  EntityType,
  InterpretedFilter,
} from '@proto/data/types'
import { TYPE_GROUP_LABEL } from '@proto/data/types'
import type { Entity } from '@template-api/features/groups/types'
import { NC_ALERTS, NC_VMS } from './nc-data'
import {
  parseConditions,
  type Metric,
  type SearchInterpretation,
} from './query-interpreter'

export type Severity = 'Critical' | 'Warning' | 'Info'
export const SEVERITIES: Severity[] = ['Critical', 'Warning', 'Info']

/** Types the "+ Filter" menu offers (domains are scopes, not results to filter to). */
export const FILTERABLE_TYPES: EntityType[] = [
  'vm',
  'cluster',
  'host',
  'alert',
  'page',
]

export const TYPE_NAME: Record<EntityType, string> = {
  vm: 'VM',
  cluster: 'Cluster',
  host: 'Host',
  alert: 'Alert',
  page: 'Page',
  domain: 'Domain',
}

export const SORT_LABEL: Record<Metric, string> = {
  iops: 'IOPS high to low',
  cpuUsage: 'CPU high to low',
  memoryUsage: 'Memory high to low',
}

/** Every token in the results-page filter section, wherever it came from. */
export interface ResultsFilters {
  /** Cluster plus VM conditions (power state, host, CPU / memory / IOPS). */
  filters: InterpretedFilter[]
  type?: EntityType
  severity?: Severity
  /** Type is the default and shows no token. */
  groupBy: 'type' | 'cluster'
  sortBy?: Metric
  /** Keys of tokens the system filled in; any left means "Interpreted from your search". */
  interpreted: TokenKey[]
}

export const EMPTY_FILTERS: ResultsFilters = {
  filters: [],
  groupBy: 'type',
  interpreted: [],
}

export type TokenKey =
  | InterpretedFilter['attribute']
  | 'type'
  | 'severity'
  | 'group'
  | 'sort'

export const tokenKeys = (state: ResultsFilters): TokenKey[] => [
  ...state.filters.map((filter) => filter.attribute),
  ...(state.type ? (['type'] as const) : []),
  ...(state.severity ? (['severity'] as const) : []),
  ...(state.groupBy === 'cluster' ? (['group'] as const) : []),
  ...(state.sortBy ? (['sort'] as const) : []),
]

export const hasTokens = (state: ResultsFilters) => tokenKeys(state).length > 0

export const isInterpreted = (state: ResultsFilters) =>
  tokenKeys(state).some((key) => state.interpreted.includes(key))

export const fromInterpretation = ({
  filters,
  sortBy,
  groupBy,
}: SearchInterpretation): ResultsFilters => {
  const state: ResultsFilters = {
    filters,
    sortBy,
    groupBy: groupBy ?? 'type',
    interpreted: [],
  }
  return { ...state, interpreted: tokenKeys(state) }
}

/** A participant change: the touched token is no longer the system's. */
export const touched = (
  state: ResultsFilters,
  key: TokenKey,
  next: Partial<ResultsFilters>,
): ResultsFilters => ({
  ...state,
  ...next,
  interpreted: state.interpreted.filter((item) => item !== key),
})

const SEVERITY_WORDS = /\b(critical|warning|warnings|info)\b/

/** "Refine in plain words": the search parser's conditions, plus alert severity. */
export const parseRefinement = (
  phrase: string,
): { filters: InterpretedFilter[]; severity?: Severity } => {
  const word = SEVERITY_WORDS.exec(phrase.toLowerCase())?.[1]
  const severity = word
    ? (SEVERITIES.find((item) => word.startsWith(item.toLowerCase())) ??
      undefined)
    : undefined
  return { filters: parseConditions(phrase), severity }
}

// ---- Which groups each filter applies to ----

const VM_ATTRIBUTES = new Set(['powerState', 'cpuUsage', 'memoryUsage', 'iops'])

const filterAppliesTo = (filter: InterpretedFilter, type: EntityType) => {
  if (filter.attribute === 'cluster') {
    return (
      type === 'vm' || type === 'host' || type === 'alert' || type === 'cluster'
    )
  }
  if (filter.attribute === 'host') return type === 'vm' || type === 'host'
  return VM_ATTRIBUTES.has(filter.attribute) && type === 'vm'
}

const ncVmById = new Map(NC_VMS.map((vm) => [`vm-${String(vm.id)}`, vm]))
const ncAlertById = new Map(NC_ALERTS.map((alert) => [String(alert.id), alert]))

export const ncVmFor = (entity: CatalogEntity): Entity | undefined =>
  ncVmById.get(entity.id)

const compare = (actual: unknown, filter: InterpretedFilter) => {
  if (filter.op === 'eq') return String(actual) === String(filter.value)
  const value = Number(actual)
  return filter.op === 'gt'
    ? value > Number(filter.value)
    : value < Number(filter.value)
}

const matchesFilter = (entity: CatalogEntity, filter: InterpretedFilter) => {
  switch (entity.type) {
    case 'vm': {
      const vm = ncVmFor(entity)
      return vm ? compare(vm[filter.attribute], filter) : false
    }
    case 'cluster': {
      return entity.name === String(filter.value)
    }
    case 'host': {
      return filter.attribute === 'cluster'
        ? entity.clusterName === String(filter.value)
        : entity.name === String(filter.value)
    }
    default: {
      return entity.clusterName === String(filter.value)
    }
  }
}

const alertSeverity = (entity: CatalogEntity) =>
  String(ncAlertById.get(entity.id)?.severity ?? '')

/** Type excludes groups outright; every other filter narrows only the groups it applies to. */
export const applyFilters = (
  entities: CatalogEntity[],
  state: ResultsFilters,
): CatalogEntity[] =>
  entities.filter((entity) => {
    if (state.type && entity.type !== state.type) return false
    if (
      state.severity &&
      entity.type === 'alert' &&
      alertSeverity(entity) !== state.severity
    ) {
      return false
    }
    return state.filters.every(
      (filter) =>
        !filterAppliesTo(filter, entity.type) || matchesFilter(entity, filter),
    )
  })

export const sortVms = (entities: CatalogEntity[], metric?: Metric) =>
  metric
    ? entities.toSorted(
        (a, b) =>
          Number(ncVmFor(b)?.[metric] ?? 0) - Number(ncVmFor(a)?.[metric] ?? 0),
      )
    : entities

/** "Doesn't apply to hosts: Power state, IOPS", for a type group the active tokens skip. */
export const notApplyingNote = (
  type: EntityType,
  state: ResultsFilters,
): string | undefined => {
  const skipped = [
    ...state.filters
      .filter((filter) => !filterAppliesTo(filter, type))
      .map((filter) => filter.label.replace(/ %$/, '')),
    ...(state.severity && type !== 'alert' ? ['Severity'] : []),
    ...(state.sortBy && type !== 'vm' ? ['Sort'] : []),
  ]
  const group =
    type === 'vm' ? TYPE_GROUP_LABEL.vm : TYPE_GROUP_LABEL[type].toLowerCase()
  return skipped.length > 0
    ? `Doesn't apply to ${group}: ${skipped.join(', ')}`
    : undefined
}
