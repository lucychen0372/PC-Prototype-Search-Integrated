import {
  HIGH_IOPS_THRESHOLD,
  HIGH_USAGE_THRESHOLD_PCT,
} from '@template-api/features/groups/data'
import { CLUSTER_NAMES } from '@proto/data/catalog'
import type { FilterAttribute, InterpretedFilter } from '@proto/data/types'

export const normalize = (value: string) =>
  value.trim().toLowerCase().replaceAll(/\s+/g, ' ')

const VM_WORDS = /\b(vms?|virtual machines?|machines?|guests?)\b/
const QUESTION_START =
  /^(why|how|what|which|where|who|when|whats|what's|is|are|do|does|can|could|should)\b/

const POWER_OFF =
  /\b(powered[\s-]*off|power(?:ed)?\s+off|turned\s+off|switched\s+off|shut\s*down|stopped|off)\b/
const POWER_ON =
  /\b(running|powered[\s-]*on|power\s+on|turned\s+on|switched\s+on|active)\b/
/** Words after "on" that make it a preposition ("vms on cluster abc"), not a power state. */
const ON_PREPOSITION_NEXT = new Set([
  'cluster',
  'clusters',
  'host',
  'hosts',
  'node',
  'nodes',
  'domain',
  'all',
  'every',
  'each',
  'any',
  'the',
  'a',
  'an',
  'my',
  'our',
  'this',
  'that',
])

const METRIC_PATTERNS: Record<'iops' | 'cpuUsage' | 'memoryUsage', RegExp> = {
  iops: /\b(iops|ops|i\/o|io|disk activity|throughput)\b/g,
  cpuUsage: /\b(cpu|processor)\b/g,
  memoryUsage: /\b(memory|mem|ram)\b/g,
}
const HIGH_WORDS = /\b(high|higher|heavy|a lot of|lots of|busy|hot)\b/
/** Superlatives: the same "high" filter, plus sort high to low. */
const SORT_WORDS = /\b(highest|top|busiest|most)\b/
/** The query spans clusters (or asks which ones): group the results by cluster. */
const ACROSS_CLUSTERS =
  /\b(all|every|each|any) (the )?clusters?\b|\bacross (all )?(the )?clusters?\b|\bwhich clusters?\b|\b(by|per) clusters?\b/
/** Only these question openers go to NIVA; "which / what / show …" route by their conditions. */
// A bare "why" names nothing to diagnose yet, so it stays a plain question
const DIAGNOSTIC_QUESTION =
  /^(why|how come)\s+\w|\bwhat(?:'s| is| are|s)? causing\s+\w/
const LOW_WORDS = /\b(low|lower|light|idle|quiet)\b/
/** Slowness with no metric named reads as CPU pressure (what NIVA checks for "slow"). */
const SLOW_WORDS = /\b(slow|slower|sluggish|laggy|lagging)\b/
const COMPARISON =
  /(over|above|greater than|more than|higher than|exceeding|at least|>=?|under|below|less than|lower than|at most|<=?)\s*(\d+(?:\.\d+)?)\s*%?/g
const LESS_THAN_WORDS = /^(under|below|less than|lower than|at most|<=?)$/

const GENERIC_CLUSTER_WORDS = new Set(['cluster', 'clusters', 'pe', 'pc'])

const clusterNameWords = (name: string) =>
  normalize(name)
    .split(/[\s_-]+/)
    .filter((word) => word.length >= 3 && !GENERIC_CLUSTER_WORDS.has(word))

/** Full cluster name, or one distinctive word that matches exactly one cluster ("abc"). */
export const findClusterName = (query: string): string | undefined => {
  const normalized = normalize(query)
  const fullMatch = CLUSTER_NAMES.find((name) =>
    normalized.includes(normalize(name)),
  )
  if (fullMatch) return fullMatch

  const queryWords = new Set(normalized.split(/[^a-z0-9_]+/))
  for (const word of queryWords) {
    if (word.length < 3 || GENERIC_CLUSTER_WORDS.has(word)) continue
    const matches = CLUSTER_NAMES.filter((name) =>
      clusterNameWords(name).includes(word),
    )
    if (matches.length === 1) return matches[0]
  }
  return undefined
}

const hasStandalonePowerOn = (normalized: string) => {
  const words = normalized.split(/[^a-z0-9_]+/).filter(Boolean)
  const clusterWords = new Set(
    CLUSTER_NAMES.flatMap((name) => clusterNameWords(name)),
  )
  return words.some((word, index) => {
    if (word !== 'on') return false
    const next = words[index + 1]
    return !next || (!ON_PREPOSITION_NEXT.has(next) && !clusterWords.has(next))
  })
}

const parsePowerState = (normalized: string): 'On' | 'Off' | undefined => {
  if (POWER_OFF.test(normalized)) return 'Off'
  if (POWER_ON.test(normalized) || hasStandalonePowerOn(normalized)) return 'On'
  return undefined
}

export type Metric = keyof typeof METRIC_PATTERNS

const metricMentions = (normalized: string) =>
  (Object.keys(METRIC_PATTERNS) as Metric[]).flatMap((metric) =>
    [...normalized.matchAll(METRIC_PATTERNS[metric])].map((match) => ({
      metric,
      index: match.index ?? 0,
    })),
  )

const METRIC_LABEL: Record<Metric, string> = {
  iops: 'IOPS',
  cpuUsage: 'CPU %',
  memoryUsage: 'Memory %',
}

export const thresholdFor = (metric: Metric) =>
  metric === 'iops' ? HIGH_IOPS_THRESHOLD : HIGH_USAGE_THRESHOLD_PCT

const unitFor = (metric: Metric) => (metric === 'iops' ? '' : '%')

export const metricFilter = (
  metric: Metric,
  op: 'gt' | 'lt',
  value: number,
  qualifier?: 'high' | 'low',
): InterpretedFilter => {
  const comparison = `${op === 'gt' ? '>' : '<'} ${value}${unitFor(metric)}`
  return {
    id: `interp-${metric}`,
    attribute: metric as FilterAttribute,
    op,
    value,
    label: METRIC_LABEL[metric],
    valueLabel: qualifier ? `${qualifier} (${comparison})` : comparison,
  }
}

const nearestMetric = (
  mentions: ReturnType<typeof metricMentions>,
  position: number,
): Metric | undefined => {
  let nearest: (typeof mentions)[number] | undefined
  for (const mention of mentions) {
    if (
      !nearest ||
      Math.abs(mention.index - position) < Math.abs(nearest.index - position)
    ) {
      nearest = mention
    }
  }
  return nearest?.metric
}

const parseMetrics = (normalized: string): InterpretedFilter[] => {
  const mentions = metricMentions(normalized)
  const filters = new Map<Metric, InterpretedFilter>()

  // Explicit numbers ("iops over 500", "> 500") win over the default threshold
  for (const match of normalized.matchAll(COMPARISON)) {
    const [, word = '', rawValue = '0'] = match
    const position = match.index ?? 0
    const metric = nearestMetric(mentions, position) ?? 'iops'
    filters.set(
      metric,
      metricFilter(
        metric,
        LESS_THAN_WORDS.test(word) ? 'lt' : 'gt',
        Number(rawValue),
      ),
    )
  }

  const isLow = LOW_WORDS.test(normalized) && !HIGH_WORDS.test(normalized)
  const qualified =
    HIGH_WORDS.test(normalized) || SORT_WORDS.test(normalized) || isLow
  const slow = SLOW_WORDS.test(normalized)
  const mentioned = [...new Set(mentions.map((mention) => mention.metric))]
  const fallback: Metric[] = qualified ? ['iops'] : slow ? ['cpuUsage'] : []
  const targets: Metric[] = mentioned.length > 0 ? mentioned : fallback

  for (const metric of targets) {
    if (filters.has(metric)) continue
    filters.set(
      metric,
      metricFilter(
        metric,
        isLow ? 'lt' : 'gt',
        thresholdFor(metric),
        isLow ? 'low' : 'high',
      ),
    )
  }

  return [...filters.values()]
}

export const clusterFilter = (name: string): InterpretedFilter => ({
  id: 'interp-cluster',
  attribute: 'cluster',
  op: 'eq',
  value: name,
  label: 'Cluster',
  valueLabel: name.replace(/^Cluster\s+/i, ''),
})

export const powerFilter = (state: 'On' | 'Off'): InterpretedFilter => ({
  id: 'interp-powerState',
  attribute: 'powerState',
  op: 'eq',
  value: state,
  label: 'Power state',
  valueLabel: state,
})

export const hostFilter = (name: string): InterpretedFilter => ({
  id: 'interp-host',
  attribute: 'host',
  op: 'eq',
  value: name,
  label: 'Host',
  valueLabel: name,
})

const HOST_MENTION = /\bhost[\s-]?(\d{1,2})\b/

const findHostName = (normalized: string) => {
  const number = HOST_MENTION.exec(normalized)?.[1]
  return number ? `HOST-${number.padStart(2, '0')}` : undefined
}

/** Demo fallback when a condition-style query yields nothing parseable. */
export const DEMO_FILTERS: InterpretedFilter[] = [
  clusterFilter('Cluster ABC'),
  powerFilter('On'),
  metricFilter('iops', 'gt', HIGH_IOPS_THRESHOLD, 'high'),
]

export const parseConditions = (query: string): InterpretedFilter[] => {
  const normalized = normalize(query)
  const filters: InterpretedFilter[] = []
  const cluster = findClusterName(normalized)
  if (cluster) filters.push(clusterFilter(cluster))
  const host = findHostName(normalized)
  if (host) filters.push(hostFilter(host))
  const power = parsePowerState(normalized)
  if (power) filters.push(powerFilter(power))
  filters.push(...parseMetrics(normalized))
  return filters
}

export const isQuestion = (query: string) => {
  const normalized = normalize(query)
  return QUESTION_START.test(normalized) || normalized.endsWith('?')
}

/** "Why / how come / what's causing …": the only questions NIVA takes as the Top Match. */
export const isDiagnosticQuestion = (query: string) =>
  DIAGNOSTIC_QUESTION.test(normalize(query))

/** Hedged wording ("kind of busy", "sort of slow"): the conditions are a guess, not what was asked. */
const HEDGE_WORDS =
  /\b(kind of|kinda|sort of|sorta|somewhat|a bit|a little|maybe|probably|ish)\b/

export const isLowConfidence = (query: string) =>
  HEDGE_WORDS.test(normalize(query))

/** Mentions VMs plus at least one condition (cluster, power state, metric, qualifier) or a grouping. */
export const isConditionQuery = (query: string) => {
  const normalized = normalize(query)
  if (!VM_WORDS.test(normalized)) return false
  return (
    parseConditions(normalized).length > 0 ||
    HIGH_WORDS.test(normalized) ||
    LOW_WORDS.test(normalized) ||
    SLOW_WORDS.test(normalized) ||
    SORT_WORDS.test(normalized) ||
    ACROSS_CLUSTERS.test(normalized)
  )
}

/** Everything a condition query asks for: filters, an optional sort, and an optional grouping. */
export interface SearchInterpretation {
  /** Includes the cluster filter only when the query is scoped to one cluster. */
  filters: InterpretedFilter[]
  /** Sorted high to low by this metric. */
  sortBy?: Metric
  groupBy?: 'cluster'
  /** Names no cluster, or spans / compares clusters: opens the grouped results page. */
  acrossClusters: boolean
}

export const interpretSearch = (query: string): SearchInterpretation => {
  const normalized = normalize(query)
  const conditions = parseConditions(normalized)
  const named = conditions.some((filter) => filter.attribute === 'cluster')
  const acrossClusters = !named || ACROSS_CLUSTERS.test(normalized)
  const filters = acrossClusters
    ? conditions.filter((filter) => filter.attribute !== 'cluster')
    : conditions
  const metric = filters
    .map((filter) => filter.attribute)
    .find((attribute): attribute is Metric => attribute in METRIC_PATTERNS)
  // The across-clusters task asks for the busiest VMs, so rows rank by the metric asked about
  const sortBy =
    SORT_WORDS.test(normalized) || (acrossClusters && metric)
      ? (metric ?? 'iops')
      : undefined
  // Without a condition, only an explicit "by / which / all clusters" asks for a grouping
  const grouped =
    acrossClusters && (filters.length > 0 || ACROSS_CLUSTERS.test(normalized))
  return {
    filters,
    sortBy,
    groupBy: grouped ? 'cluster' : undefined,
    acrossClusters,
  }
}

const METRIC_PHRASE: Record<Metric, string> = {
  iops: 'IOPS',
  cpuUsage: 'CPU',
  memoryUsage: 'memory',
}

const metricPhrase = (filter: InterpretedFilter) => {
  const name = METRIC_PHRASE[filter.attribute as Metric]
  if (filter.valueLabel.startsWith('high')) return `high ${name}`
  if (filter.valueLabel.startsWith('low')) return `low ${name}`
  const unit = filter.attribute === 'iops' ? '' : '%'
  return `${name} ${filter.op === 'gt' ? 'over' : 'under'} ${String(filter.value)}${unit}`
}

/** Top Match title for the grouped results page: "Running VMs with high IOPS, grouped by cluster". */
export const describeInterpretation = ({
  filters,
  groupBy,
}: SearchInterpretation) => {
  const power = filters.find((filter) => filter.attribute === 'powerState')
  const subject =
    power?.value === 'On'
      ? 'Running VMs'
      : power?.value === 'Off'
        ? 'Powered-off VMs'
        : 'VMs'
  const host = filters.find((filter) => filter.attribute === 'host')
  const metrics = filters
    .filter((filter) => filter.attribute in METRIC_PATTERNS)
    .map((filter) => metricPhrase(filter))
  return [
    subject,
    host ? ` on ${String(host.value)}` : '',
    metrics.length > 0 ? ` with ${metrics.join(' and ')}` : '',
    groupBy ? ', grouped by cluster' : '',
  ].join('')
}

export const interpretQuery = (query: string): InterpretedFilter[] => {
  const filters = parseConditions(query)
  return filters.length > 0 ? filters : DEMO_FILTERS
}

/** "Cluster ABC › VMs" when the query names one cluster, otherwise "VMs". */
export const topMatchTitle = (filters: InterpretedFilter[]) => {
  const cluster = filters.find((filter) => filter.attribute === 'cluster')
  return cluster ? `${String(cluster.value)} › VMs` : 'VMs'
}
