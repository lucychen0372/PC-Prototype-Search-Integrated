import type { Entity } from '@template-api/features/groups/types'
import {
  CLUSTERS,
  HOSTS,
  VM_ENTITIES,
  getEntityById,
} from '@proto/data/catalog'
import type { CatalogEntity, InterpretedFilter } from '@proto/data/types'
import type { ProtoLink, VmSort } from '@proto/lib/destinations'
import {
  NC_ALERTS,
  NC_HOSTS,
  NC_VMS,
  alertsOnCluster,
  bySeverityThenTime,
  catalogVmId,
  hostByName,
  hostCpuPct,
  vmsMatching,
} from '@proto/lib/nc-data'
import {
  clusterFilter,
  findClusterName,
  interpretSearch,
  metricFilter,
  normalize,
  parseConditions,
  powerFilter,
  thresholdFor,
  type Metric,
} from '@proto/lib/query-interpreter'
import { getSearchResults } from '@proto/lib/search-engine'
import type { NivaAnswer, NivaEvidence } from './types'

export interface NivaAskContext {
  /** Cluster from the context chips, used when the question names none. */
  cluster?: string
  previous?: NivaAnswer
  /** Re-answering after a context change: the chips, not the question's words, set the cluster. */
  scoped?: boolean
}

const CLUSTER_MENTION = new RegExp(
  String.raw`\b(?:(?:on|in|for|at)\s+)?(?:the\s+)?(?:cluster\s+)?(?:${CLUSTERS.map(
    (cluster) => normalize(cluster.name.replace(/^Cluster\s+/i, '')),
  ).join('|')})\b(?:\s+cluster\b)?`,
  'gi',
)

/** The question without the clusters it names, e.g. "why are my vms slow". */
const withoutClusters = (question: string) =>
  question.replace(CLUSTER_MENTION, ' ').replaceAll(/\s+/g, ' ').trim()

const MOVE = /\b(move|moved|migrate|migration|rebalance|relocate|offload)\b/
const TREND =
  /\b(trends?|history|historical|over time|last \d+ (hours?|days?|weeks?)|past \d+ (hours?|days?|weeks?)|last (hour|day|week))\b/
const ALERTS =
  /\b(alerts?|alarms?|changed|changes|happened|events?|incidents?)\b/
const DIAGNOSTIC =
  /\b(why|slow|slower|slowness|sluggish|lag|laggy|latency|bottleneck|degraded|struggling|problems?|issues?|wrong|unhealthy)\b/
const REFERS_BACK = /\b(these|those|them|they|also|same ones)\b/

const STEP_RESULT_LIMIT = 8

const NUMBER_WORDS = [
  'no',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
]
const numberWord = (count: number) => NUMBER_WORDS[count] ?? String(count)
const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1)
const plural = (count: number, noun: string) =>
  `${count} ${noun}${count === 1 ? '' : 's'}`

const listJoin = (items: string[]) =>
  items.length <= 1
    ? (items[0] ?? '')
    : `${items.slice(0, -1).join(', ')} and ${items.at(-1) ?? ''}`

const METRIC_NAME: Record<Metric, string> = {
  iops: 'IOPS',
  cpuUsage: 'CPU',
  memoryUsage: 'memory',
}
const METRIC_UNIT: Record<Metric, string> = {
  iops: ' IOPS',
  cpuUsage: '%',
  memoryUsage: '%',
}

const isMetric = (attribute: string): attribute is Metric =>
  attribute === 'iops' ||
  attribute === 'cpuUsage' ||
  attribute === 'memoryUsage'

const entityLink = (
  entity: CatalogEntity | undefined,
  query: string,
): ProtoLink =>
  entity ? { kind: 'entity', entity } : { kind: 'results', query }

const vmEntity = (vm: Entity) => getEntityById(catalogVmId(vm))
const hostEntity = (name: string) => HOSTS.find((host) => host.name === name)
const clusterEntity = (name: string) =>
  CLUSTERS.find((cluster) => cluster.name === name)

const vmListLink = (
  query: string,
  filters: InterpretedFilter[],
  sort?: VmSort,
): ProtoLink => ({
  kind: 'vm-list',
  search: { q: query, f: filters, from: 'niva', ...(sort ? { sort } : {}) },
})

const clusterOf = (filters: InterpretedFilter[]) => {
  const cluster = filters.find((filter) => filter.attribute === 'cluster')
  return cluster ? String(cluster.value) : undefined
}

/** The cluster with the most open alerts, for questions that name none. */
const busiestCluster = () => {
  let best: { name: string; count: number } | undefined
  for (const cluster of CLUSTERS) {
    const count = alertsOnCluster(cluster.name).length
    if (!best || count > best.count) best = { name: cluster.name, count }
  }
  return best?.name
}

const mentionedHost = (normalized: string) =>
  NC_HOSTS.find((host) => normalized.includes(normalize(String(host.name))))

const describeMetricFilter = (filter: InterpretedFilter) => {
  if (!isMetric(filter.attribute)) return ''
  const name = METRIC_NAME[filter.attribute]
  if (filter.valueLabel.startsWith('high')) return `high ${name}`
  if (filter.valueLabel.startsWith('low')) return `low ${name}`
  return `${name} ${filter.op === 'gt' ? 'above' : 'below'} ${String(filter.value)}${METRIC_UNIT[filter.attribute]}`
}

const thresholdNote = (filter: InterpretedFilter) => {
  if (!isMetric(filter.attribute)) return ''
  const qualified =
    filter.valueLabel.startsWith('high') || filter.valueLabel.startsWith('low')
  if (!qualified) return describeMetricFilter(filter)
  const side = filter.op === 'gt' ? 'above' : 'below'
  return `${describeMetricFilter(filter)} (${side} ${String(filter.value)}${METRIC_UNIT[filter.attribute]})`
}

const conditionPhrase = (filters: InterpretedFilter[], count: number) => {
  const power = filters.find((filter) => filter.attribute === 'powerState')
  const metrics = filters
    .filter((filter) => isMetric(filter.attribute))
    .map((filter) => thresholdNote(filter))
  const verb = count === 1 ? 'is' : 'are'
  if (power) {
    const state = power.value === 'On' ? 'powered on' : 'powered off'
    return metrics.length > 0
      ? `${verb} ${state} with ${listJoin(metrics)}`
      : `${verb} ${state}`
  }
  if (metrics.length > 0)
    return `${count === 1 ? 'has' : 'have'} ${listJoin(metrics)}`
  return 'match'
}

const filterTokens = (filters: InterpretedFilter[]) =>
  filters.map((filter) => `${filter.label} = ${filter.valueLabel}`).join(', ')

const vmMetricText = (vm: Entity, metrics: Metric[]) =>
  [
    String(vm.name),
    ...metrics.map(
      (metric) =>
        `${METRIC_NAME[metric]} ${String(vm[metric])}${metric === 'iops' ? '' : '%'}`,
    ),
  ].join(' · ')

const mergeFilters = (
  base: InterpretedFilter[],
  added: InterpretedFilter[],
) => {
  const byAttribute = new Map(base.map((filter) => [filter.attribute, filter]))
  for (const filter of added) byAttribute.set(filter.attribute, filter)
  return [...byAttribute.values()]
}

const alertsEvidence = (cluster: string): NivaEvidence[] => {
  const count = alertsOnCluster(cluster).length
  return count > 0
    ? [
        {
          id: 'alerts',
          type: 'alert',
          text: [`${plural(count, 'open alert')} on ${cluster}.`],
          linkLabel: 'Alerts',
          link: { kind: 'alerts', search: { cluster } },
        },
      ]
    : []
}

const listAnswer = (
  question: string,
  filters: InterpretedFilter[],
): NivaAnswer => {
  const cluster = clusterOf(filters)
  const metrics = filters
    .map((filter) => filter.attribute)
    .filter((attribute): attribute is Metric => isMetric(attribute))
  const sortMetric: Metric = metrics[0] ?? 'cpuUsage'
  const vms = vmsMatching(filters).toSorted(
    (a, b) => Number(b[sortMetric]) - Number(a[sortMetric]),
  )
  const count = vms.length
  const link = vmListLink(question, filters)
  const scope = cluster ? ` on ${cluster}` : ''

  const evidence: NivaEvidence[] = vms.slice(0, STEP_RESULT_LIMIT).map(
    (vm): NivaEvidence => ({
      id: `vm-${vm.id}`,
      type: 'vm',
      text: [vmMetricText(vm, metrics.length > 0 ? metrics : ['cpuUsage'])],
      linkLabel: 'VM',
      link: entityLink(vmEntity(vm), question),
    }),
  )
  if (count > STEP_RESULT_LIMIT) {
    evidence.push({
      id: 'vm-more',
      type: 'vm',
      text: [`${count - STEP_RESULT_LIMIT} more VMs match.`],
      linkLabel: `All ${count} VMs`,
      link,
    })
  }
  if (cluster) evidence.push(...alertsEvidence(cluster))

  const clusterVmCount = cluster
    ? NC_VMS.filter((vm) => vm.cluster === cluster).length
    : NC_VMS.length
  const metricLabels = filters
    .filter((filter) => isMetric(filter.attribute))
    .map((filter) => describeMetricFilter(filter))
  const actionTarget =
    metricLabels.length > 0
      ? `filtered by ${listJoin(metricLabels)}`
      : 'filtered'

  const followUps = [
    cluster ? `Why is ${cluster} slow?` : undefined,
    metrics.includes('cpuUsage')
      ? metrics.includes('memoryUsage')
        ? undefined
        : 'Which of these also have high memory?'
      : 'Which of these also have high CPU?',
    `Show ${METRIC_NAME[sortMetric]} trend, last 24 hours`,
  ].filter((item): item is string => item !== undefined)

  return {
    kind: 'list',
    thinking: `Filtering VMs${scope}…`,
    summary: [
      {
        text: `${count === 0 ? 'No' : count} VM${count === 1 ? '' : 's'}`,
        link,
      },
      `${scope} ${conditionPhrase(filters, count)}.`,
    ],
    evidenceSource: 'From NC data',
    evidence,
    steps: [
      `Read your question as: ${filterTokens(filters)}.`,
      cluster
        ? `Checked ${clusterVmCount} VMs on ${cluster}.`
        : `Checked all ${clusterVmCount} VMs.`,
      `Kept the ${count} that match every condition, sorted by ${METRIC_NAME[sortMetric]}.`,
      ...(cluster
        ? [
            `Looked up open alerts on ${cluster}: ${alertsOnCluster(cluster).length}.`,
          ]
        : []),
    ],
    action: {
      label: `Open ${cluster ? `${cluster} › ` : ''}VMs ${actionTarget}`,
      link,
    },
    followUps,
    filters,
  }
}

const VM_SORT: Partial<Record<Metric, VmSort>> = {
  iops: 'iops',
  cpuUsage: 'cpu',
}

const topHostOf = (vms: Entity[]) => {
  const counts = new Map<string, number>()
  for (const vm of vms) {
    counts.set(String(vm.host), (counts.get(String(vm.host)) ?? 0) + 1)
  }
  let top: { name: string; count: number } | undefined
  for (const [name, count] of counts) {
    if (!top || count > top.count) top = { name, count }
  }
  return top
}

/** A condition with no cluster named: how many match, and how they spread across clusters. */
const acrossClustersAnswer = (
  question: string,
  filters: InterpretedFilter[],
  options: { resultsQuery?: string; diagnostic?: boolean } = {},
): NivaAnswer => {
  const metricFilters = filters.filter((filter) => isMetric(filter.attribute))
  const metrics = metricFilters.map((filter) => filter.attribute as Metric)
  const sortMetric: Metric = metrics[0] ?? 'iops'
  const vms = vmsMatching(filters).toSorted(
    (a, b) => Number(b[sortMetric]) - Number(a[sortMetric]),
  )
  const count = vms.length
  const byCluster = new Map<string, Entity[]>()
  for (const vm of vms) {
    const cluster = String(vm.cluster)
    byCluster.set(cluster, [...(byCluster.get(cluster) ?? []), vm])
  }
  const groups = [...byCluster.entries()]
    .map(([cluster, clusterVms]) => ({ cluster, vms: clusterVms }))
    .toSorted(
      (a, b) =>
        b.vms.length - a.vms.length || a.cluster.localeCompare(b.cluster),
    )
  const top = groups[0]
  const others = groups.slice(1)
  const topHost = top ? topHostOf(top.vms) : undefined
  const power = filters.find((filter) => filter.attribute === 'powerState')
  const subject =
    power?.value === 'On'
      ? 'running VM'
      : power?.value === 'Off'
        ? 'powered-off VM'
        : 'VM'
  const condition = listJoin(
    metricFilters.map((filter) => thresholdNote(filter)),
  )
  const shortCondition = listJoin(
    metricFilters.map((filter) => describeMetricFilter(filter)),
  )
  const resultsLink: ProtoLink = {
    kind: 'results',
    query: options.resultsQuery ?? question,
  }
  const sort = VM_SORT[sortMetric]
  const latencyAlert =
    top && metrics.includes('iops')
      ? alertsOnCluster(top.cluster).find((alert) =>
          String(alert.title).toLowerCase().includes('latency'),
        )
      : undefined
  const hostNote =
    topHost && topHost.count > 1
      ? `, ${numberWord(topHost.count)} of them on ${topHost.name}`
      : ''

  const spread = top
    ? others.length === 0
      ? ` All of them are on ${top.cluster}${hostNote ? ` (${hostNote.slice(2)})` : ''}.`
      : ` Most are on ${top.cluster} (${top.vms.length}${hostNote}); ${listJoin(
          others.map((group) => `${group.cluster} has ${group.vms.length}`),
        )}.`
    : ''

  const evidence: NivaEvidence[] = groups.map((group, index) => ({
    id: `cluster-${group.cluster}`,
    type: 'cluster',
    text: [
      `${group.cluster} · ${plural(group.vms.length, 'VM')} with ${shortCondition}${
        index === 0 && hostNote ? ` (${hostNote.slice(2)})` : ''
      }`,
    ],
    linkLabel: plural(group.vms.length, 'VM'),
    link: vmListLink(
      question,
      [clusterFilter(group.cluster), ...filters],
      sort,
    ),
  }))
  if (latencyAlert && top) {
    evidence.push({
      id: 'latency-alert',
      type: 'alert',
      text: [
        `${String(latencyAlert.severity)}: ${String(latencyAlert.title)} (${String(latencyAlert.detail)}) · ${String(latencyAlert.time)}`,
      ],
      linkLabel: 'Alert',
      link: { kind: 'alerts', search: { alert: latencyAlert.id } },
    })
  }

  const topHostEntity =
    topHost && topHost.count > 1 ? hostByName(topHost.name) : undefined
  const inference =
    options.diagnostic && top && latencyAlert
      ? {
          text: [
            `${top.cluster} stands out: ${numberWord(top.vms.length)} of the ${numberWord(count)}${
              topHostEntity
                ? `, ${numberWord(topHost?.count ?? 0)} on ${String(topHostEntity.name)}`
                : ''
            }, and its disk latency rose above baseline at ${String(latencyAlert.time)}. Add ${top.cluster} to the context to check it.`,
          ],
          caption:
            'Correlation across alerts and metrics; not a confirmed root cause.',
        }
      : undefined

  return {
    kind: options.diagnostic ? 'diagnostic' : 'list',
    thinking: options.diagnostic
      ? 'Checking disk activity across all clusters…'
      : 'Filtering VMs across all clusters…',
    summary: [
      count > 0
        ? {
            text: `${capitalize(numberWord(count))} ${subject}${count === 1 ? '' : 's'}`,
            link: resultsLink,
          }
        : `No ${subject}s`,
      ` ${count === 1 ? 'has' : 'have'} ${condition}.${spread}`,
    ],
    evidenceSource: 'From NC data',
    evidence,
    inference,
    steps: [
      ...(options.diagnostic
        ? [
            'No cluster in context: read your question as a performance check across all clusters.',
          ]
        : []),
      power
        ? `Filtered to ${power.value === 'On' ? 'running' : 'powered-off'} VMs (Power state = ${String(power.value)}): ${vmsMatching([power]).length} of ${NC_VMS.length}.`
        : `Checked all ${NC_VMS.length} VMs.`,
      ...metricFilters.map(
        (filter) =>
          `Kept the ones with ${thresholdNote(filter)}: ${
            vmsMatching(mergeFilters(power ? [power] : [], [filter])).length
          }.`,
      ),
      `Grouped them by cluster and ranked clusters by count: ${groups
        .map((group) => `${group.cluster} ${group.vms.length}`)
        .join(', ')}.`,
      ...(latencyAlert && top
        ? [
            `Checked open alerts on ${top.cluster}: ${String(latencyAlert.title).toLowerCase()}.`,
          ]
        : []),
    ],
    action: { label: 'Open results grouped by cluster', link: resultsLink },
    followUps: options.diagnostic
      ? [
          ...(top ? [`Why is ${top.cluster} slow?`] : []),
          ...(topHostEntity
            ? [`Which VMs could move off ${String(topHostEntity.name)}?`]
            : []),
          `IOPS on ${top?.cluster ?? 'Cluster ABC'}, last 24 hours`,
        ]
      : [
          ...(top ? [`Why is ${top.cluster} slow?`] : []),
          metrics.includes('cpuUsage')
            ? 'Which of these also have high memory?'
            : 'Which of these also have high CPU?',
          `Show ${METRIC_NAME[sortMetric]} trend, last 24 hours`,
        ],
    filters,
  }
}

const BUSY_VMS_QUERY = 'running vms with high iops'

const diagnosticAnswer = (question: string, cluster: string): NivaAnswer => {
  const ioFilters = [
    clusterFilter(cluster),
    powerFilter('On'),
    metricFilter('iops', 'gt', thresholdFor('iops'), 'high'),
  ]
  const busyVms = vmsMatching(ioFilters).toSorted(
    (a, b) => Number(b.iops) - Number(a.iops),
  )
  const alerts = alertsOnCluster(cluster).toSorted(bySeverityThenTime)
  const latencyAlert = alerts.find((alert) =>
    String(alert.title).toLowerCase().includes('latency'),
  )
  const hostCounts = new Map<string, number>()
  for (const vm of busyVms) {
    const host = String(vm.host)
    hostCounts.set(host, (hostCounts.get(host) ?? 0) + 1)
  }
  let topHost: { name: string; count: number } | undefined
  for (const [name, count] of hostCounts) {
    if (!topHost || count > topHost.count) topHost = { name, count }
  }
  const host = topHost ? hostByName(topHost.name) : undefined
  const sortLink = vmListLink(question, [clusterFilter(cluster)], 'iops')
  const ioLink = vmListLink(question, ioFilters, 'iops')
  const count = busyVms.length
  const threshold = thresholdFor('iops')

  if (count === 0 && !latencyAlert) {
    return {
      kind: 'diagnostic',
      thinking: `Checking disk activity, alerts and hosts on ${cluster}…`,
      summary: [
        `I don't see sustained high IOPS or a disk latency alert on ${cluster} right now, so NC data doesn't explain the slowness.`,
      ],
      evidenceSource: 'From NC data',
      evidence: [
        {
          id: 'cluster',
          type: 'cluster',
          text: [
            `${cluster}: no running VMs above ${threshold} IOPS and no latency alerts.`,
          ],
          linkLabel: 'Cluster',
          link: entityLink(clusterEntity(cluster), question),
        },
      ],
      steps: [
        `Checked open alerts on ${cluster}: no disk latency alert.`,
        `Checked IOPS of running VMs on ${cluster}: none above ${threshold}.`,
      ],
      action: { label: `Open ${cluster} › VMs sorted by IOPS`, link: sortLink },
      followUps: [`What changed on ${cluster} today?`],
    }
  }

  const evidence: NivaEvidence[] = []
  if (latencyAlert) {
    evidence.push({
      id: 'latency-alert',
      type: 'alert',
      text: [
        `${String(latencyAlert.severity)}: ${String(latencyAlert.title)} (${String(latencyAlert.detail)}), since ${String(latencyAlert.time)}.`,
      ],
      linkLabel: 'Alert',
      link: { kind: 'alerts', search: { alert: latencyAlert.id } },
    })
  }
  if (count > 0) {
    evidence.push({
      id: 'iops-vms',
      type: 'vm',
      text: [
        `${capitalize(numberWord(count))} running VM${count === 1 ? '' : 's'} with high IOPS (above ${threshold}): ${listJoin(
          busyVms.map((vm) => `${String(vm.name)} (${String(vm.iops)})`),
        )}.`,
      ],
      linkLabel: `${plural(count, 'VM')} with high IOPS`,
      link: ioLink,
    })
  }
  if (host && topHost && count > 1) {
    const share =
      topHost.count === count
        ? `All ${numberWord(count)} run`
        : `${capitalize(numberWord(topHost.count))} of them run`
    evidence.push({
      id: 'host',
      type: 'host',
      text: [`${share} on ${String(host.name)}.`],
      linkLabel: 'Host',
      link: entityLink(hostEntity(String(host.name)), question),
    })
  }

  const inference =
    host && topHost && topHost.count > 1 && latencyAlert
      ? {
          text: [
            `Likely storage contention on ${String(host.name)}: ${numberWord(topHost.count)} high-IOPS VMs share it, and disk latency on ${cluster} rose above baseline at ${String(latencyAlert.time)}.`,
          ],
          caption:
            'Correlation across alerts and metrics; not a confirmed root cause.',
        }
      : undefined

  return {
    kind: 'diagnostic',
    thinking: `Checking disk activity, alerts and hosts on ${cluster}…`,
    summary: [
      count > 0
        ? {
            text: `${capitalize(numberWord(count))} VM${count === 1 ? '' : 's'}`,
            link: ioLink,
          }
        : 'No VMs',
      ` on ${cluster} ${count === 1 ? 'has' : 'have'} sustained high IOPS${
        latencyAlert
          ? ', and disk latency on the cluster is above its baseline'
          : ''
      }.`,
    ],
    evidenceSource: 'From NC data',
    evidence,
    inference,
    steps: [
      `Read your question as a performance check on ${cluster}.`,
      `Pulled ${plural(alerts.length, 'open alert')} on ${cluster}${latencyAlert ? `, including ${String(latencyAlert.title).toLowerCase()}` : ''}.`,
      `Ranked running VMs on ${cluster} by IOPS; ${count} ${count === 1 ? 'is' : 'are'} above ${threshold}.`,
      ...(host && topHost
        ? [
            `Matched those VMs to their hosts: ${topHost.count} of ${count} on ${String(host.name)}.`,
          ]
        : []),
    ],
    action:
      count > 0
        ? { label: `Open ${cluster} › VMs with high IOPS`, link: ioLink }
        : { label: `Open ${cluster} › VMs sorted by IOPS`, link: sortLink },
    followUps: [
      ...(host ? [`Which VMs could move off ${String(host.name)}?`] : []),
      'Show latency, last 7 days',
      `What changed on ${cluster} today?`,
    ],
    filters: ioFilters,
    host: host ? String(host.name) : undefined,
  }
}

const moveAnswer = (question: string, hostName: string): NivaAnswer => {
  const host = hostByName(hostName)
  const cluster = String(host?.cluster_name ?? '')
  const vms = NC_VMS.filter(
    (vm) => vm.host === hostName && vm.powerState === 'On',
  ).toSorted((a, b) => Number(b.cpuUsage) - Number(a.cpuUsage))
  const candidates = vms.slice(0, 2)
  const targets = NC_HOSTS.filter(
    (item) => item.cluster_name === cluster && item.name !== hostName,
  )
    .toSorted((a, b) => Number(a.cpu_usage_ppm) - Number(b.cpu_usage_ppm))
    .slice(0, 3)
  const names = candidates.map((vm) => String(vm.name))

  return {
    kind: 'move',
    thinking: `Comparing host load on ${cluster}…`,
    summary: [
      `${listJoin(names)} ${names.length === 1 ? 'is' : 'are'} the busiest VM${names.length === 1 ? '' : 's'} on ${hostName}; moving ${names.length === 1 ? 'it' : 'them'} frees the most CPU. ${listJoin(targets.map((item) => String(item.name)))} have the most headroom on ${cluster}.`,
    ],
    evidenceSource: 'From NC data',
    evidence: [
      ...candidates.map(
        (vm): NivaEvidence => ({
          id: `vm-${vm.id}`,
          type: 'vm',
          text: [
            `${String(vm.name)} · CPU ${String(vm.cpuUsage)}% on ${hostName}`,
          ],
          linkLabel: 'VM',
          link: entityLink(vmEntity(vm), question),
        }),
      ),
      ...targets.map(
        (item): NivaEvidence => ({
          id: `host-${item.id}`,
          type: 'host',
          text: [`${String(item.name)} · CPU ${hostCpuPct(item)}%`],
          linkLabel: 'Host',
          link: entityLink(hostEntity(String(item.name)), question),
        }),
      ),
    ],
    steps: [
      `Listed the powered-on VMs on ${hostName}: ${vms.length}.`,
      `Picked the ${numberWord(candidates.length)} with the highest CPU.`,
      `Ranked the other ${cluster} hosts by current CPU.`,
      'NIVA does not move VMs; review placement before migrating.',
    ],
    action: {
      label: `Open ${hostName}`,
      link: entityLink(hostEntity(hostName), question),
    },
    followUps: ['Summarize CPU alerts'],
  }
}

const ALERT_TOPICS: Array<{ pattern: RegExp; word: string; label: string }> = [
  { pattern: /\b(cpu|processor)\b/, word: 'cpu', label: 'CPU' },
  { pattern: /\b(iops|io|storage)\b/, word: 'iops', label: 'IOPS' },
  { pattern: /\b(latency|disk)\b/, word: 'latency', label: 'latency' },
]

const alertsAnswer = (
  normalized: string,
  cluster: string | undefined,
): NivaAnswer => {
  const topic = ALERT_TOPICS.find((item) => item.pattern.test(normalized))
  const alerts = alertsOnCluster(cluster)
    .filter(
      (alert) => !topic || normalize(String(alert.title)).includes(topic.word),
    )
    .toSorted(bySeverityThenTime)
  const where = cluster ?? 'NC'
  const critical = alerts.filter(
    (alert) => alert.severity === 'Critical',
  ).length
  const times = alerts.map((alert) => String(alert.time)).toSorted()
  const kind = topic ? `${topic.label} alert` : 'open alert'
  const changed = /\b(changed|changes|happened|today)\b/.test(normalized)
  const window =
    times.length > 1
      ? `between ${times[0]} and ${times.at(-1)}`
      : `at ${times[0]}`

  const summary =
    alerts.length === 0
      ? `No ${kind}s on ${where} right now.`
      : changed
        ? `Today on ${where}: ${plural(alerts.length, 'alert')} raised ${window}, ${critical} critical and ${alerts.length - critical} warning. Nothing else changed in NC data.`
        : `${where} has ${plural(alerts.length, kind)}: ${critical} critical and ${alerts.length - critical} warning, all raised today ${window}.`

  return {
    kind: 'alerts',
    thinking: `Reading alerts on ${where}…`,
    summary: [summary],
    evidenceSource: 'From NC data',
    evidence: alerts.map(
      (alert): NivaEvidence => ({
        id: alert.id,
        type: 'alert',
        text: [
          `${String(alert.severity)}: ${String(alert.title)} (${String(alert.detail)}) · ${String(alert.time)}`,
        ],
        linkLabel: 'Alert',
        link: { kind: 'alerts', search: { alert: alert.id } },
      }),
    ),
    steps: [
      `Pulled open alerts${cluster ? ` on ${cluster}` : ''}: ${alertsOnCluster(cluster).length}.`,
      ...(topic ? [`Kept the ${topic.label} alerts: ${alerts.length}.`] : []),
      'Sorted by severity, then time raised.',
    ],
    action: {
      // A cluster's alerts open its Alerts tab; without one, the dashboard's Open Alerts Summary
      label: cluster ? `Open Alerts › ${cluster}` : 'Open Alerts summary',
      link: { kind: 'alerts', search: cluster ? { cluster } : {} },
    },
    followUps: [
      `Why are my VMs slow on ${cluster ?? 'Cluster ABC'}?`,
      ...(topic?.word === 'cpu' ? [] : ['Summarize CPU alerts']),
    ],
  }
}

const trendAnswer = (
  question: string,
  normalized: string,
  context: NivaAskContext,
): NivaAnswer => {
  const latency = /\b(latency|disk)\b/.test(normalized)
  const cluster =
    findClusterName(normalized) ??
    clusterOf(context.previous?.filters ?? []) ??
    context.cluster ??
    busiestCluster() ??
    ''

  if (latency) {
    const alert = NC_ALERTS.find(
      (item) =>
        item.cluster_name === cluster &&
        String(item.title).toLowerCase().includes('latency'),
    )
    return {
      kind: 'trend',
      thinking: `Reading latency on ${cluster}…`,
      summary: [
        alert
          ? `Disk latency on ${cluster} is ${String(alert.detail)}. It crossed its baseline today at ${String(alert.time)}; it was within baseline before that.`
          : `Disk latency on ${cluster} is within its baseline.`,
      ],
      evidenceSource: 'From NC data',
      evidence: alert
        ? [
            {
              id: alert.id,
              type: 'alert',
              text: [`Warning: ${String(alert.title)} · ${String(alert.time)}`],
              linkLabel: 'Alert',
              link: { kind: 'alerts', search: { alert: alert.id } },
            },
          ]
        : [],
      steps: [
        `Read latency for ${cluster} from its alert baseline.`,
        'NC keeps the 7-day latency chart on the cluster page.',
      ],
      action: {
        label: `Open ${cluster}`,
        link: entityLink(clusterEntity(cluster), question),
      },
      followUps: ['Summarize CPU alerts'],
    }
  }

  const metricEntry = (
    Object.entries({
      iops: /\b(iops|io)\b/,
      cpuUsage: /\b(cpu|processor)\b/,
      memoryUsage: /\b(memory|mem|ram)\b/,
    }) as Array<[Metric, RegExp]>
  ).find(([, pattern]) => pattern.test(normalized))
  const metric: Metric = metricEntry?.[0] ?? 'iops'
  const filters = context.previous?.filters ?? [
    clusterFilter(cluster),
    powerFilter('On'),
    metricFilter(metric, 'gt', thresholdFor(metric), 'high'),
  ]
  const matching = vmsMatching(filters).toSorted(
    (a, b) => Number(b[metric]) - Number(a[metric]),
  )
  const vms = matching.slice(0, 5)
  const peakIndex = { cpuUsage: 0, memoryUsage: 1, iops: 2 }[metric]
  const top = vms[0]
  const points = trendSeries(matching, metric, peakIndex)
  const unit = metric === 'iops' ? '' : '%'
  const format = (value: number) => Math.round(value).toLocaleString('en-US')
  const first = format(points[0] ?? 0)
  const last = format(points.at(-1) ?? 0)
  const peak = format(Math.max(...points, 0))
  const combined = metric === 'iops' ? 'Combined' : 'Average'
  const subject = `${combined} ${METRIC_NAME[metric]} of ${matching.length === 1 ? 'this VM' : `these ${numberWord(matching.length)} VMs`}`

  return {
    kind: 'trend',
    thinking: `Reading ${METRIC_NAME[metric]} for these VMs…`,
    summary: [
      matching.length === 0
        ? `No VMs match ${filterTokens(filters)}, so there is no ${METRIC_NAME[metric]} trend to show.`
        : `${subject} rose from about ${first}${unit} 24 hours ago to ${last}${unit} now, peaking at ${peak}${unit} about 3 hours ago. Per-VM peaks are below; each VM's Performance card has the details.`,
    ],
    chart:
      matching.length > 0
        ? {
            title: `${combined} ${METRIC_NAME[metric]} · last 24 hours`,
            points,
            startLabel: '24 h ago',
            endLabel: 'Now',
          }
        : undefined,
    evidenceSource: 'From NC data',
    evidence: vms.map(
      (vm): NivaEvidence => ({
        id: `vm-${vm.id}`,
        type: 'vm',
        text: [
          `${String(vm.name)} · ${METRIC_NAME[metric]} ${String(vm[metric])}${unit} now, peak ${String((vm.performanceMetricPeakValues as string[])[peakIndex] ?? '')}`,
        ],
        linkLabel: 'VM',
        link: entityLink(vmEntity(vm), question),
      }),
    ),
    steps: [
      context.previous?.filters
        ? `Used the VMs from the previous answer: ${filterTokens(filters)}.`
        : `Used ${filterTokens(filters)}.`,
      `Read current and 24-hour peak ${METRIC_NAME[metric]} for each of the ${matching.length} VMs.`,
      `Charted the ${combined.toLowerCase()} per hour.`,
    ],
    action: top
      ? {
          label: `Open ${String(top.name)} › Performance`,
          link: entityLink(vmEntity(top), question),
        }
      : undefined,
    followUps: [
      `Why is ${clusterOf(filters) ?? (top ? String(top.cluster) : cluster)} slow?`,
      'Which of these also have high CPU?',
    ].filter((item) => !(metric === 'cpuUsage' && item.includes('CPU'))),
    filters,
  }
}

const TREND_HOURS = 24
const PEAK_HOUR = 20

/**
 * Hourly series ending at each VM's current value and touching its recorded
 * 24-hour peak: a quiet night, a morning climb, the peak, then today's level.
 */
const trendSeries = (vms: Entity[], metric: Metric, peakIndex: number) => {
  const perVm = vms.map((vm) => {
    const current = Number(vm[metric])
    const peak =
      Number.parseFloat(
        String((vm.performanceMetricPeakValues as string[])[peakIndex] ?? ''),
      ) || current
    return Array.from({ length: TREND_HOURS }, (_, hour) => {
      const climb = Math.min(1, Math.max(0, (hour - 12) / (PEAK_HOUR - 12)))
      const eased = climb * climb * (3 - 2 * climb)
      const base = current * (0.45 + 0.55 * eased)
      if (hour < PEAK_HOUR) return base
      const settle = (hour - PEAK_HOUR) / (TREND_HOURS - 1 - PEAK_HOUR)
      return peak + (current - peak) * settle
    })
  })
  return Array.from({ length: TREND_HOURS }, (_, hour) => {
    const values = perVm.map((series) => series[hour] ?? 0)
    const total = values.reduce((sum, value) => sum + value, 0)
    return metric === 'iops' ? total : total / Math.max(1, values.length)
  })
}

const DEFAULT_PROMPTS = [
  'Running VMs with the highest IOPS across all clusters',
  'Why is Cluster ABC slow?',
]

/** Honest about what NIVA can't answer; points back to questions it can. */
const fallbackAnswer = (
  question: string,
  previous: NivaAnswer | undefined,
): NivaAnswer => {
  const results = getSearchResults(question)
  const suggestions =
    previous && previous.followUps.length > 0
      ? previous.followUps
      : DEFAULT_PROMPTS
  return {
    kind: 'fallback',
    thinking: 'Checking NC data…',
    summary: [
      `I can't answer that from NC data. I can answer questions like ${listJoin(
        suggestions.slice(0, 2).map((item) => `“${item}”`),
      )}.`,
    ],
    evidenceSource: 'From search',
    evidence: [],
    steps: [
      'No answer rule matched your question.',
      `Ran it as a search: ${plural(results.total, 'result')}.`,
    ],
    action:
      results.total > 0
        ? {
            label: `See all ${plural(results.total, 'result')} for '${question}'`,
            link: { kind: 'results', query: question },
          }
        : undefined,
    followUps: suggestions,
  }
}

/** Scripted, keyword-matched answers computed from template data. */
export const answerQuestion = (
  rawQuestion: string,
  context: NivaAskContext,
): NivaAnswer => {
  const question = context.scoped
    ? withoutClusters(rawQuestion.trim())
    : rawQuestion.trim()
  const normalized = normalize(question)
  const named = context.scoped ? context.cluster : findClusterName(normalized)
  const asksForVms = /\b(vms?|virtual machines?|machines?)\b/.test(normalized)
  const refersBack = REFERS_BACK.test(normalized) && context.previous

  if (MOVE.test(normalized)) {
    const host = mentionedHost(normalized)?.name ?? context.previous?.host
    if (host) return moveAnswer(question, String(host))
  }
  if (TREND.test(normalized)) return trendAnswer(question, normalized, context)
  if (ALERTS.test(normalized)) {
    return alertsAnswer(normalized, named ?? context.cluster)
  }
  if (DIAGNOSTIC.test(normalized)) {
    const cluster = named ?? context.cluster
    if (cluster) return diagnosticAnswer(question, cluster)
    // No cluster anywhere: the same view as the results page for busy VMs
    if (asksForVms) {
      return acrossClustersAnswer(
        question,
        [
          powerFilter('On'),
          metricFilter('iops', 'gt', thresholdFor('iops'), 'high'),
        ],
        { resultsQuery: BUSY_VMS_QUERY, diagnostic: true },
      )
    }
    const busiest = busiestCluster()
    if (busiest) return diagnosticAnswer(question, busiest)
  }

  const conditions = mergeFilters(
    parseConditions(normalized),
    context.scoped && named ? [clusterFilter(named)] : [],
  )
  if (refersBack && context.previous?.filters && conditions.length > 0) {
    return listAnswer(
      question,
      mergeFilters(context.previous.filters, conditions),
    )
  }
  const search = interpretSearch(normalized)
  if (
    (asksForVms || search.groupBy) &&
    search.acrossClusters &&
    !(context.scoped && named) &&
    search.filters.some((filter) => isMetric(filter.attribute))
  ) {
    return acrossClustersAnswer(question, search.filters)
  }
  if (asksForVms && conditions.length > 0) {
    return listAnswer(question, conditions)
  }

  return fallbackAnswer(question, context.previous)
}

/** The name that occurs most often, e.g. the host most busy VMs sit on. */
const mostCommon = (names: string[]) => {
  const counts = new Map<string, number>()
  for (const name of names) counts.set(name, (counts.get(name) ?? 0) + 1)
  return [...counts.entries()].toSorted((a, b) => b[1] - a[1])[0]?.[0]
}

export interface ResultsPromptContext {
  query: string
  /** Metric the page filters or sorts VMs by. */
  metric?: Metric
  /** Cluster the page is scoped to, or the one leading its VM results. */
  cluster?: string
}

/**
 * Two prompts for the results page "Didn't find…" block: next questions NIVA
 * can answer about what the page shows, never the query itself again.
 */
export const resultsPrompts = ({
  query,
  metric: pageMetric,
  cluster: pageCluster,
}: ResultsPromptContext): string[] => {
  const normalized = normalize(query)
  const named = pageCluster ?? findClusterName(normalized)
  const metric =
    pageMetric ??
    interpretSearch(normalized)
      .filters.map((filter) => filter.attribute)
      .find((attribute): attribute is Metric => isMetric(attribute))

  const prompts = (() => {
    if (/\b(why|how come|causing)\b/.test(normalized)) {
      const cluster = named ?? busiestCluster() ?? 'Cluster ABC'
      return [
        `What changed on ${cluster} today?`,
        `Latency on ${cluster}, last 7 days`,
      ]
    }
    if (metric) {
      const busy = vmsMatching([
        ...(named ? [clusterFilter(named)] : []),
        powerFilter('On'),
        metricFilter(metric, 'gt', thresholdFor(metric), 'high'),
      ])
      const cluster =
        named ?? mostCommon(busy.map((vm) => String(vm.cluster))) ?? ''
      return [`${capitalize(METRIC_NAME[metric])} on ${cluster}, last 24 hours`]
    }
    if (named) {
      const short = named.replace(/^Cluster\s+/i, '')
      return [`Show alerts across ${short} entities`, `Why is ${named} slow?`]
    }
    return ['Show open alerts', 'What changed today?']
  })()
  return prompts.filter((prompt) => normalize(prompt) !== normalized)
}

/** Entities named in a question, for the context chips. */
export const mentionedEntities = (question: string): CatalogEntity[] => {
  const normalized = normalize(question)
  const cluster = clusterEntity(findClusterName(normalized) ?? '')
  const named = [...VM_ENTITIES, ...HOSTS].filter((entity) =>
    new RegExp(String.raw`\b${entity.name.toLowerCase()}\b`).test(normalized),
  )
  return [...(cluster ? [cluster] : []), ...named]
}
