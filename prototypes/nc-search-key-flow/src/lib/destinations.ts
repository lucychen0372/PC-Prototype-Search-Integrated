import { useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'
import type { CatalogEntity, InterpretedFilter } from '@proto/data/types'
import { NC_ALERTS, NC_CLUSTERS } from '@proto/lib/nc-data'
import { hostFilter, parseConditions } from '@proto/lib/query-interpreter'

export interface VmsSearch {
  q?: string
  /** Filters already interpreted elsewhere (NIVA); skips re-reading `q`. */
  f?: InterpretedFilter[]
  sort?: VmSort
  from?: 'niva'
}

/** Metric the VM list opens sorted by, high to low. */
export type VmSort = 'cpu' | 'iops'

/** `/search`: the query alone decides interpreted vs keyword results (`resultsEntryFor`). */
export interface ResultsSearch {
  q?: string
}

/** `/clusters/$id`: the VMs tab takes the same search as `/vms`. */
export interface ClusterSearch extends VmsSearch {
  tab?: string
}

export interface AlertsSearch {
  cluster?: string
  alert?: string
}

/** Where a result row, evidence item, or NIVA action takes the participant. */
export type ProtoLink =
  | { kind: 'entity'; entity: CatalogEntity }
  | { kind: 'vm-list'; search: VmsSearch }
  | { kind: 'alerts'; search: AlertsSearch }
  | { kind: 'results'; query: string }

type TemplatePath = '/' | '/vms' | '/settings'

/*
 * The template ships no Alerts or Host pages, so those links land on the
 * template page that shows that data: the cluster's Alerts tab, the VM details
 * Alerts widget, or the VM browser scoped to the host.
 */
const PAGE_PATHS: Record<string, TemplatePath> = {
  'page-vms': '/vms',
  'page-alerts': '/',
  'page-global-settings': '/settings',
  'page-ntp-server': '/settings',
}

const clusterInSearch = (search: VmsSearch) => {
  const filters = search.f ?? (search.q ? parseConditions(search.q) : [])
  const named = filters.filter(
    (filter) => filter.attribute === 'cluster' && filter.op === 'eq',
  )
  if (named.length !== 1) return
  const name = String(named[0]?.value).toLowerCase()
  return NC_CLUSTERS.find(
    (cluster) => String(cluster.name).toLowerCase() === name,
  )
}

const scopedVms = (filter: InterpretedFilter): VmsSearch => ({
  q: String(filter.value),
  f: [filter],
})

export const useOpenLink = () => {
  const navigate = useNavigate()

  return useCallback(
    (link: ProtoLink) => {
      const openVm = (vmId: string) =>
        void navigate({
          to: '/vms/$vmId',
          params: { vmId: vmId.replace(/^vm-/, '') },
        })
      // A VM list on one cluster is that cluster's own VMs tab
      const openVms = (search: VmsSearch) => {
        const cluster = clusterInSearch(search)
        if (cluster) {
          void navigate({
            to: '/clusters/$clusterId',
            params: { clusterId: String(cluster.id) },
            search: { tab: 'vms', ...search },
          })
          return
        }
        void navigate({ to: '/vms', search })
      }

      const openCluster = (clusterId: string, tab?: 'alerts') =>
        void navigate({
          to: '/clusters/$clusterId',
          params: { clusterId },
          search: tab ? { tab } : {},
        })
      const openClusterAlerts = (clusterName?: string) => {
        const cluster = NC_CLUSTERS.find((entry) => entry.name === clusterName)
        if (cluster) {
          openCluster(cluster.id, 'alerts')
        } else {
          void navigate({ to: '/' })
        }
      }

      const openAlert = (search: AlertsSearch) => {
        const alert = NC_ALERTS.find((entry) => entry.id === search.alert)
        switch (alert?.source_entity_type) {
          case 'vm': {
            openVm(String(alert.source_entity_id))
            return
          }
          case 'host': {
            openVms(scopedVms(hostFilter(String(alert.source_entity_name))))
            return
          }
          default: {
            openClusterAlerts(
              alert ? String(alert.cluster_name) : search.cluster,
            )
          }
        }
      }

      switch (link.kind) {
        case 'vm-list': {
          openVms(link.search)
          return
        }
        case 'alerts': {
          openAlert(link.search)
          return
        }
        case 'results': {
          void navigate({
            to: '/search',
            search: { q: link.query },
          })
          return
        }
        case 'entity': {
          break
        }
      }

      const { entity } = link
      switch (entity.type) {
        case 'vm': {
          openVm(entity.id)
          return
        }
        case 'cluster': {
          openCluster(entity.id)
          return
        }
        case 'host': {
          openVms(scopedVms(hostFilter(entity.name)))
          return
        }
        case 'alert': {
          openAlert({ alert: entity.id })
          return
        }
        case 'page': {
          void navigate({ to: PAGE_PATHS[entity.id] ?? '/' })
          return
        }
        case 'domain': {
          void navigate({ to: '/' })
        }
      }
    },
    [navigate],
  )
}
