import { getEntitiesForType } from '@template-api/features/groups/data'
import type { Entity } from '@template-api/features/groups/types'
import type { InterpretedFilter } from '@proto/data/types'

/** Template API records, read directly so answers agree with what the Entity Browser returns. */
export const NC_VMS = getEntitiesForType('vm')
export const NC_HOSTS = getEntitiesForType('host')
export const NC_CLUSTERS = getEntitiesForType('cluster')
export const NC_ALERTS = getEntitiesForType('alert')

const matchesFilter = (vm: Entity, filter: InterpretedFilter) => {
  const actual = vm[filter.attribute]
  if (filter.op === 'eq') return String(actual) === String(filter.value)
  const value = Number(actual)
  return filter.op === 'gt'
    ? value > Number(filter.value)
    : value < Number(filter.value)
}

export const vmsMatching = (filters: InterpretedFilter[]) =>
  NC_VMS.filter((vm) => filters.every((filter) => matchesFilter(vm, filter)))

export const catalogVmId = (vm: Entity) => `vm-${vm.id}`

export const hostByName = (name: string) =>
  NC_HOSTS.find((host) => host.name === name)

export const clusterByName = (name: string) =>
  NC_CLUSTERS.find((cluster) => cluster.name === name)

export const hostCpuPct = (host: Entity) =>
  Math.round(Number(host.cpu_usage_ppm) / 10_000)

export const alertsOnCluster = (clusterName?: string) =>
  NC_ALERTS.filter(
    (alert) => !clusterName || alert.cluster_name === clusterName,
  )

export const SEVERITY_RANK: Record<string, number> = {
  Critical: 0,
  Warning: 1,
  Info: 2,
}

export const bySeverityThenTime = (a: Entity, b: Entity) =>
  (SEVERITY_RANK[String(a.severity)] ?? 9) -
    (SEVERITY_RANK[String(b.severity)] ?? 9) ||
  String(a.time).localeCompare(String(b.time))
