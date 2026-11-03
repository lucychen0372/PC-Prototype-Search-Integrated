import { getEntitiesForType } from '@template-api/features/groups/data'
import type { CatalogEntity } from './types'

/** Template mock data (apps/api groups data) is the single source for every entity name. */
const templateVms = getEntitiesForType('vm')
const templateClusters = getEntitiesForType('cluster')
const templateHosts = getEntitiesForType('host')

const plural = (count: number, noun: string) =>
  `${count} ${noun}${count === 1 ? '' : 's'}`

export const CLUSTERS: CatalogEntity[] = templateClusters.map((cluster) => {
  const name = String(cluster.name)
  return {
    id: String(cluster.id),
    type: 'cluster',
    name,
    subtitle: `${plural(Number(cluster.num_hosts), 'host')} · ${Number(cluster.num_vms)} VMs`,
    typeLabel: 'Cluster',
    hasChildren: true,
    searchText: `${name} cluster`,
  }
})

export const CLUSTER_NAMES = CLUSTERS.map((cluster) => cluster.name)

export const VM_ENTITIES: CatalogEntity[] = templateVms.map((vm) => {
  const clusterName = String(vm.cluster)
  return {
    id: `vm-${String(vm.id)}`,
    type: 'vm',
    name: String(vm.name),
    subtitle: clusterName,
    typeLabel: 'VM',
    clusterName,
    searchText: `${String(vm.name)} ${clusterName} vm`,
  }
})

export const HOSTS: CatalogEntity[] = templateHosts.map((host) => {
  const clusterName = String(host.cluster_name)
  return {
    id: String(host.id),
    type: 'host',
    name: String(host.name),
    subtitle: clusterName,
    typeLabel: 'Host',
    clusterName,
    searchText: `${String(host.name)} host ${clusterName}`,
  }
})

export const ALERTS: CatalogEntity[] = getEntitiesForType('alert').map(
  (alert) => {
    const clusterName = String(alert.cluster_name)
    const title = String(alert.title)
    return {
      id: String(alert.id),
      type: 'alert',
      name: title,
      subtitle: `${String(alert.severity)} · Today ${String(alert.time)}`,
      typeLabel: 'Alert',
      clusterName,
      searchText: `${title} ${clusterName} alert ${String(alert.severity)}`,
    }
  },
)

export const PAGES: CatalogEntity[] = [
  {
    id: 'page-vms',
    type: 'page',
    name: 'VMs',
    subtitle: 'Infrastructure › Compute',
    typeLabel: 'Page',
    searchText: 'vms vm virtual machines infrastructure compute',
  },
  {
    id: 'page-alerts',
    type: 'page',
    name: 'Alerts',
    subtitle: 'Global Overview › Alerts',
    typeLabel: 'Page',
    searchText: 'alerts global overview',
  },
  {
    id: 'page-global-settings',
    type: 'page',
    name: 'Global Settings',
    subtitle: 'Admin Center › Global Settings',
    typeLabel: 'Page',
    hasChildren: true,
    searchText: 'global settings admin center',
  },
  {
    id: 'page-ntp-server',
    type: 'page',
    name: 'NTP Server',
    subtitle: 'Admin Center › Global Settings › NTP Server',
    typeLabel: 'Page',
    searchText: 'ntp server admin center global settings',
  },
]

export const SCOPES = [
  { key: 'dnd-demo1', label: 'DND_DEMO1' },
  { key: 'dnd-demo2', label: 'DND_DEMO2' },
  { key: 'dnd-lab', label: 'DND_LAB' },
]

export const DOMAINS: CatalogEntity[] = SCOPES.map((scope) => ({
  id: `domain-${scope.key}`,
  type: 'domain',
  name: scope.label,
  subtitle: 'Global Overview › Domains',
  typeLabel: 'Domain',
  searchText: `${scope.label} ${scope.label.replaceAll('_', ' ')} domain`,
}))

export const ALL_ENTITIES: CatalogEntity[] = [
  ...CLUSTERS,
  ...VM_ENTITIES,
  ...HOSTS,
  ...ALERTS,
  ...PAGES,
  ...DOMAINS,
]

export const getEntityById = (id: string) =>
  ALL_ENTITIES.find((entity) => entity.id === id)

const idByName = (entities: CatalogEntity[], name: string) =>
  entities.find((entity) => entity.name === name)?.id ?? ''

/** Seeded history; what the participant searches this session is listed above it. */
export const RECENT_IDS = [
  idByName(VM_ENTITIES, 'NTNX-qkf790-1-CVM'),
  'page-ntp-server',
]

export const FAVORITE_IDS = ['page-global-settings', 'domain-dnd-demo1']
