import type { Entity } from './types'

const clusters = ['Cluster DEF', 'Cluster ABC', 'Cluster GHI']
const primaryCluster = 'Cluster ABC'
const secondaryCluster = 'Cluster DEF'
const tertiaryCluster = 'Cluster GHI'
/** VM indices outside Cluster ABC: the first ones on DEF, the last ones on GHI. */
const SECONDARY_CLUSTER_VM_COUNT = 3
const TERTIARY_CLUSTER_FIRST_VM = 246
const clusterForVm = (i: number) =>
  i < SECONDARY_CLUSTER_VM_COUNT
    ? secondaryCluster
    : i >= TERTIARY_CLUSTER_FIRST_VM
      ? tertiaryCluster
      : primaryCluster
const hypervisors = ['AHV']
const statuses = ['Running', 'Stopped', 'Not set up', 'Paused', 'Warning']
const subnets = [
  'prod-vlan-110',
  'dev-vlan-220',
  'dmz-vlan-330',
  'backup-vlan-440',
]
const projects = ['_internal', '-']
const owners = ['admin', '-']
const cpuOptions = [13, 4, 8, 1, 3, 7, 2, 6]
const memoryOptions = [
  '52 GiB',
  '19 GiB',
  '30 GiB',
  '2 GiB',
  '1.95 GiB',
  '32 GiB',
]
const storageOptions = ['50 GB', '100 GB', '200 GB', '500 GB', '1 TB', '2 TB']
const HOST_COUNT = 24
const hostName = (i: number) => `HOST-${String(i + 1).padStart(2, '0')}`
const hostNamesInCluster = (cluster: string) =>
  Array.from({ length: HOST_COUNT }, (_, i) => i)
    .filter((i) => pick(clusters, i) === cluster)
    .map((i) => hostName(i))
/** Cluster ABC host that carries most of the high-IOPS VMs (see `busyPrimaryClusterVms`). */
const CONTENDED_HOST_INDEX = 1
const CONTENDED_HOST_CPU_PCT = 92
const performanceMetricNames = [
  'CPU Usage',
  'Memory Usage',
  'Storage IOPS',
  'Storage IO Bandwidth',
  'Storage Avg. IO Latency',
  'Network Rx Bytes',
  'Network Tx Bytes',
]
const alertDates = ['Feb 25', 'Feb 26', 'Feb 27', 'Feb 28', 'Feb 2']
const anomalyDates = ['Feb 25', 'Feb 26', 'Feb 27', 'Feb 28', 'Feb 2']
const timestampBase = 1_779_134_294_563_714
const screenshotVmNames = [
  'auto_pc_6a0b59c093602362517c6f4c0f',
  'auto_pc_6a0b59c093602362517c6f4d00',
  'NTNX-qkf790-1-CVM',
]

const pick = (items: string[], i: number): string =>
  items[i % items.length] ?? items[0] ?? ''

/** IOPS above this value counts as "high" (search interpretation uses the same number). */
export const HIGH_IOPS_THRESHOLD = 300
/** CPU / memory usage above this percentage counts as "high". */
export const HIGH_USAGE_THRESHOLD_PCT = 80

/**
 * Powered-on Cluster ABC VMs with high IOPS: exactly these remain for
 * "Cluster ABC + Power state On + IOPS > 300". Keyed by VM index.
 */
const busyPrimaryClusterVms: Record<
  number,
  { iops: number; cpuUsage: number; memoryUsage: number }
> = {
  3: { iops: 410, cpuUsage: 94, memoryUsage: 84 },
  4: { iops: 620, cpuUsage: 88, memoryUsage: 91 },
  5: { iops: 510, cpuUsage: 55, memoryUsage: 82 },
  6: { iops: 530, cpuUsage: 91, memoryUsage: 66 },
  7: { iops: 350, cpuUsage: 83, memoryUsage: 70 },
  8: { iops: 320, cpuUsage: 86, memoryUsage: 88 },
}
/** Five of the six share the contended host; VM 8 (index 7) runs elsewhere. */
const CONTENDED_HOST_VMS = new Set([3, 4, 5, 6, 8])

/** Powered-off Cluster ABC VMs whose last observed IOPS is high (power filter matters). */
const offPrimaryClusterHighIops: Record<number, number> = {
  25: 560,
  30: 480,
}

/**
 * Powered-on high-IOPS VMs on the other clusters (cluster filter matters, and
 * "across all clusters" groups to ABC 6 · DEF 2 · GHI 1).
 */
const busyOtherClusterVms: Record<
  number,
  { iops: number; cpuUsage: number; memoryUsage: number }
> = {
  0: { iops: 450, cpuUsage: 72, memoryUsage: 60 },
  1: { iops: 380, cpuUsage: 45, memoryUsage: 51 },
  248: { iops: 440, cpuUsage: 52, memoryUsage: 47 },
}

const getUsage = (i: number, powerState: string) => {
  const busy = busyPrimaryClusterVms[i] ?? busyOtherClusterVms[i]
  if (busy) return busy
  if (powerState !== 'On') {
    return {
      iops: offPrimaryClusterHighIops[i] ?? 0,
      cpuUsage: 0,
      memoryUsage: 0,
    }
  }
  return {
    iops: 40 + ((i * 37) % 250),
    cpuUsage: 8 + ((i * 29) % 60),
    memoryUsage: 15 + ((i * 17) % 60),
  }
}

const getCategory = (i: number) => {
  if (i % 11 === 0) return 'Environment: Production, App: Prism Central'
  if (i % 7 === 0) return 'Environment: Staging'
  if (i % 3 === 0) return 'Environment: Dev'
  return '-'
}

const createVmEntities = (): Entity[] =>
  Array.from({ length: 250 }, (_, i) => {
    const id = String(i + 1)
    const uuid = `vm-${id.padStart(4, '0')}`
    const powerState =
      i > 20 && i % 13 === 0
        ? 'Suspended'
        : i > 20 && i % 5 === 0
          ? 'Off'
          : 'On'
    const status =
      powerState === 'Off'
        ? 'Stopped'
        : (statuses[i % statuses.length] ?? 'Running')
    const cluster = clusterForVm(i)
    const { iops, cpuUsage, memoryUsage } = getUsage(i, powerState)
    const createdOn = timestampBase + i * 8_640_000_000
    const name = screenshotVmNames[i] ?? `vm_0680_${i + 1}`
    const host = CONTENDED_HOST_VMS.has(i)
      ? hostName(CONTENDED_HOST_INDEX)
      : pick(hostNamesInCluster(cluster), i)
    const ipAddressList = [
      `10.45.${246 + (i % 4)}.${35 + (i % 30)}`,
      `fe80::a299:9bff:fe18:${(50 + i).toString(16)}`,
      `10.45.${246 + (i % 4)}.${36 + (i % 30)}`,
    ]
    const ipAddress =
      i < 3
        ? `10.103.176.${24 + i} + ${i === 0 ? 1 : 2} more`
        : `192.168.${Math.floor((i + 4) / 255)}.${(47 + i * 17) % 255}`

    return {
      id,
      uuid,
      name,
      vm_name: name,
      uniqueId: `9b6a67ae-647f-42f0-81d8-${String(2_837_628_443 + i).padStart(12, '0')}`,
      description: `VM ${id} sample entity for development and testing.`,
      cluster,
      cluster_name: cluster,
      createdOn,
      created_time_usecs: createdOn,
      _created_timestamp_usecs_: createdOn,
      status,
      powerState,
      power_state: powerState.toUpperCase(),
      cpu: cpuOptions[i % cpuOptions.length] ?? 1,
      num_cpus: cpuOptions[i % cpuOptions.length] ?? 1,
      numVcpus: cpuOptions[i % cpuOptions.length] ?? 1,
      memory: memoryOptions[i % memoryOptions.length] ?? '4 GB',
      memory_size_mib: (i % 6 === 0 ? 128 : 4 * 2 ** (i % 6)) * 1024,
      cpuUsage,
      memoryUsage,
      iops,
      ipAddresses: ipAddress,
      ipAddressList,
      ip_addresses: ipAddress,
      storage: storageOptions[i % storageOptions.length] ?? '100 GB',
      storage_capacity_bytes: (50 + (i % 12) * 50) * 1024 ** 3,
      hypervisor: pick(hypervisors, i),
      hypervisor_type: pick(hypervisors, i),
      host,
      hostIp: `10.45.32.${12 + (i % 40)}`,
      domain: `pc_${cluster.toLowerCase().replaceAll('-', '_')}`,
      os: 'Unknown',
      vmUptime: `${112 + i} hrs ${57 - (i % 40)} mins ${23 + (i % 30)} s`,
      bootDevice: i % 2 === 0 ? 'centos-5.4.iso' : 'ubuntu-22.04.iso',
      bootDeviceSize: i % 2 === 0 ? '786.01 MiB' : '1.4 GiB',
      bootDeviceType: 'CD-ROM',
      bootConfiguration: i % 2 === 0 ? 'UEFI BIOS Mode' : 'Legacy BIOS Mode',
      guestCustomizationStatus: i % 3 === 0 ? 'Pending' : 'Succeeded',
      secureBoot: i % 2 === 0,
      credentialGuard: i % 4 === 0,
      vTpm: i % 4 === 0,
      agentVm: i % 7 === 0,
      coresPerVcpu: i % 3 === 0 ? 2 : 1,
      storagePropertiesDefinedBy: 'Storage Policy',
      storagePolicy: i % 2 === 0 ? 'Waterbus' : 'Gold Storage',
      policyCompliance: i % 5 === 0 ? 'Non-compliant' : 'Compliant',
      totalVirtualDisks: 2 + (i % 4),
      totalStorageLogical: `${640 + i * 12}.3 GiB`,
      encryption: 'Inherit from Cluster',
      replicationFactor: i % 2 === 0 ? 2 : 3,
      compression: i % 3 === 0 ? 'Inline' : 'Post-process',
      qosThrottledIops: 1000 + i * 10,
      externalDeviceType: 'GPU',
      externalDeviceMode: i % 2 === 0 ? 'Passthrough' : 'Virtual GPU',
      externalDeviceConfiguration:
        i % 2 === 0 ? 'Nvidia Quadro RTX 6000/8000' : 'Nvidia A16-4Q',
      performanceMetricNames,
      performanceMetricCurrentValues: [
        `${cpuUsage}%`,
        `${memoryUsage}%`,
        `${iops} IOPS`,
        `${212 + i * 3} KBps`,
        `${(0.43 + (i % 4) / 10).toFixed(2)} ms`,
        `${(0.04 + (i % 3) / 100).toFixed(2)} MiB`,
        `${(0.49 + (i % 5) / 100).toFixed(2)} MiB`,
      ],
      performanceMetricPeakValues: [
        `${Math.min(100, cpuUsage + 6 + (i % 12))}%`,
        `${Math.min(100, memoryUsage + 4 + (i % 11))}%`,
        `${iops + 40 + (i % 60)} IOPS`,
        `${409 + i * 4} KBps`,
        `${(2.27 + (i % 5) / 10).toFixed(2)} ms`,
        `${(0.05 + (i % 3) / 100).toFixed(2)} MiB`,
        `${(0.51 + (i % 5) / 100).toFixed(2)} MiB`,
      ],
      alertDates,
      alertCriticalCounts: [5 + (i % 3), 8 + (i % 4), 12 + (i % 5), 6, 4],
      alertWarningCounts: [3, 4 + (i % 3), 5, 7 + (i % 2), 2],
      alertInfoCounts: [2, 3, 4 + (i % 2), 2, 1],
      anomalyDates,
      anomalyMemoryValues: [800, 1200 + i * 5, 2500, 1800, 1000],
      anomalyIoValues: [400, 600 + i * 3, 1000, 700, 500],
      anomalyCpuValues: [300, 500, 800 + i * 2, 600, 400],
      anomalyNetworkValues: [200, 300, 500, 400 + i, 250],
      anomalyDiskValues: [150, 200, 400, 300, 180 + i],
      anomalyOtherValues: [100, 150, 300, 200, 120],
      protectionStatus: i % 4 === 0 ? 'Protected' : 'Unprotected',
      protection_status: i % 4 === 0 ? 'Protected' : 'Unprotected',
      categories: getCategory(i),
      category_name: i % 3 === 0 ? 'Environment' : '',
      category_value:
        i % 11 === 0 ? 'Production' : i % 7 === 0 ? 'Staging' : 'Dev',
      consistencyGroup: i % 9 === 0 ? `CG-${(i % 4) + 1}` : '-',
      syncStatus: i % 4 === 0 ? 'In sync' : i % 9 === 0 ? 'Lagging' : '-',
      protectionType: i % 4 === 0 ? 'Async DR' : '-',
      protectionPolicy: i % 4 === 0 ? 'Gold Policy' : '-',
      recoveryPlans: i % 4 === 0 ? String((i % 3) + 1) : '-',
      alert_count: 0,
      subnet_name: pick(subnets, i),
      project: i < 3 ? '_internal' : '-',
      project_name: pick(projects, i),
      owner: i < 3 ? 'admin' : '-',
      owner_username: pick(owners, i),
      migration_state: i % 19 === 0 ? 'MIGRATING' : '',
    }
  })

const createSubnetEntities = (): Entity[] =>
  subnets.map((name, i) => ({
    id: `subnet-${i + 1}`,
    uuid: `subnet-${String(i + 1).padStart(4, '0')}`,
    name,
    subnet_name: name,
    vlan_id: 110 * (i + 1),
    network_address: `10.${i + 10}.0.0/24`,
    cluster_name: pick(clusters, i),
    migration_state: i === 1 ? 'MIGRATING' : '',
    ip_usage_count: 24 + i * 18,
    ip_capacity: 254,
    status: i === 2 ? 'Warning' : 'Running',
    _created_timestamp_usecs_: timestampBase + i * 2_000_000,
  }))

const createHostEntities = (vms: Entity[]): Entity[] =>
  Array.from({ length: HOST_COUNT }, (_, i) => {
    const id = String(i + 1)
    const cluster = pick(clusters, i)
    const name = hostName(i)
    const contended = i === CONTENDED_HOST_INDEX

    return {
      id: `host-${id}`,
      uuid: `host-${id.padStart(4, '0')}`,
      name,
      host_name: name,
      cluster_name: cluster,
      hypervisor_type: pick(hypervisors, i),
      status: contended ? 'Warning' : 'Running',
      cpu_usage_ppm: contended
        ? CONTENDED_HOST_CPU_PCT * 10_000
        : 120_000 + i * 18_000,
      memory_usage_ppm: 210_000 + i * 12_000,
      num_vms: vms.filter((vm) => vm.host === name).length,
      alert_count: 0,
      _created_timestamp_usecs_: timestampBase - i * 4_000_000,
    }
  })

/**
 * Open alerts derived from the metrics above, so every alert agrees with the
 * VM / host / cluster numbers the UI shows. All are on Cluster ABC, raised today.
 */
const createAlertEntities = (vms: Entity[], hosts: Entity[]): Entity[] => {
  const vmAt = (i: number) => vms[i] as Entity
  const contendedHost = hosts[CONTENDED_HOST_INDEX] as Entity
  const vmAlert = (
    i: number,
    severity: string,
    title: string,
    detail: string,
    time: string,
  ) => ({
    severity,
    title: `${title} on ${String(vmAt(i).name)}`,
    detail,
    time,
    source_entity_type: 'vm',
    source_entity_id: vmAt(i).id,
    source_entity_name: String(vmAt(i).name),
  })
  const records = [
    vmAlert(
      3,
      'Critical',
      'CPU usage high',
      `${String(vmAt(3).cpuUsage)}% CPU, threshold 90%`,
      '09:38',
    ),
    vmAlert(
      6,
      'Critical',
      'CPU usage high',
      `${String(vmAt(6).cpuUsage)}% CPU, threshold 90%`,
      '09:40',
    ),
    {
      severity: 'Warning',
      title: `CPU usage high on ${String(contendedHost.name)}`,
      detail: `${CONTENDED_HOST_CPU_PCT}% CPU, threshold 85%`,
      time: '09:40',
      source_entity_type: 'host',
      source_entity_id: contendedHost.id,
      source_entity_name: String(contendedHost.name),
    },
    {
      severity: 'Warning',
      title: `Disk latency above baseline on ${primaryCluster}`,
      detail: '18 ms average, baseline 4 ms',
      time: '09:41',
      source_entity_type: 'cluster',
      source_entity_id: `cluster-${clusters.indexOf(primaryCluster) + 1}`,
      source_entity_name: primaryCluster,
    },
    vmAlert(
      4,
      'Warning',
      'Storage IOPS high',
      `${String(vmAt(4).iops)} IOPS, threshold ${HIGH_IOPS_THRESHOLD}`,
      '09:12',
    ),
  ]

  return records.map((record, i) => ({
    id: `alert-${i + 1}`,
    name: record.title,
    ...record,
    cluster_name: primaryCluster,
    status: 'Open',
    created_today: record.time,
  }))
}

const countAlertsFor = (alerts: Entity[], type: string, id: string) =>
  alerts.filter(
    (alert) =>
      alert.source_entity_type === type && alert.source_entity_id === id,
  ).length

const createClusterEntities = (
  vms: Entity[],
  hosts: Entity[],
  alerts: Entity[],
): Entity[] =>
  clusters.map((name, i) => ({
    id: `cluster-${i + 1}`,
    uuid: `cluster-${String(i + 1).padStart(4, '0')}`,
    name,
    cluster_name: name,
    status: i === 1 ? 'Warning' : 'Running',
    hypervisor: pick(hypervisors, i),
    hypervisor_type: pick(hypervisors, i),
    num_hosts: hosts.filter((host) => host.cluster_name === name).length,
    num_vms: vms.filter((vm) => vm.cluster === name).length,
    storage_capacity_bytes: (200 + i * 150) * 1024 ** 4,
    storage_usage_bytes: (120 + i * 80) * 1024 ** 4,
    alert_count: alerts.filter((alert) => alert.cluster_name === name).length,
    createdOn: timestampBase - i * 86_400_000_000,
    _created_timestamp_usecs_: timestampBase - i * 86_400_000_000,
  }))

const vmEntities = createVmEntities()
const hostEntities = createHostEntities(vmEntities)
const alertEntities = createAlertEntities(vmEntities, hostEntities)
for (const entity of [...vmEntities, ...hostEntities]) {
  entity.alert_count = countAlertsFor(
    alertEntities,
    entity.id.startsWith('host-') ? 'host' : 'vm',
    entity.id,
  )
}

const entityDataByType: Record<string, Entity[]> = {
  alert: alertEntities,
  cluster: createClusterEntities(vmEntities, hostEntities, alertEntities),
  host: hostEntities,
  sample_entity: createVmEntities(),
  subnet: createSubnetEntities(),
  vm: vmEntities,
}

export const getEntitiesForType = (entityType: string): Entity[] =>
  entityDataByType[entityType] ?? entityDataByType.vm ?? []

export const entities = getEntitiesForType('vm')
