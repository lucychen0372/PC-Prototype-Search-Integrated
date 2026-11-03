import { Hono } from 'hono'

import { getEntitiesForType } from './data'
import { applyFiqlFilter } from './fiql'
import { getGroupResults } from './results'
import type { Entity } from './types'
import type { GroupRequestBody } from './types'

const DEFAULT_ATTRIBUTES = [
  'id',
  'name',
  'description',
  'uniqueId',
  'cluster',
  'status',
  'createdOn',
  'powerState',
  'cpu',
  'numVcpus',
  'coresPerVcpu',
  'memory',
  'cpuUsage',
  'memoryUsage',
  'iops',
  'ipAddresses',
  'ipAddressList',
  'storage',
  'hypervisor',
  'host',
  'hostIp',
  'domain',
  'os',
  'project',
  'owner',
  'vmUptime',
  'bootDevice',
  'bootDeviceSize',
  'bootDeviceType',
  'bootConfiguration',
  'guestCustomizationStatus',
  'secureBoot',
  'credentialGuard',
  'vTpm',
  'agentVm',
  'storagePropertiesDefinedBy',
  'storagePolicy',
  'policyCompliance',
  'totalVirtualDisks',
  'totalStorageLogical',
  'encryption',
  'replicationFactor',
  'compression',
  'qosThrottledIops',
  'externalDeviceType',
  'externalDeviceMode',
  'externalDeviceConfiguration',
  'performanceMetricNames',
  'performanceMetricCurrentValues',
  'performanceMetricPeakValues',
  'alertDates',
  'alertCriticalCounts',
  'alertWarningCounts',
  'alertInfoCounts',
  'anomalyDates',
  'anomalyMemoryValues',
  'anomalyIoValues',
  'anomalyCpuValues',
  'anomalyNetworkValues',
  'anomalyDiskValues',
  'anomalyOtherValues',
  'protectionStatus',
  'categories',
  'consistencyGroup',
  'syncStatus',
  'protectionType',
  'protectionPolicy',
  'recoveryPlans',
]

const groupsRoutes = new Hono()

const compareEntityValues = (
  a: Entity,
  b: Entity,
  attribute: string,
): number => {
  const va = a[attribute]
  const vb = b[attribute]

  if (typeof va === 'number' && typeof vb === 'number') return va - vb

  return String(va ?? '').localeCompare(String(vb ?? ''))
}

const filterByEntityIds = (
  list: Entity[],
  entityIds: string[] = [],
): Entity[] => {
  if (entityIds.length === 0) return list

  const ids = new Set(entityIds)
  return list.filter(
    (entity) => ids.has(entity.id) || ids.has(String(entity.uuid ?? '')),
  )
}

groupsRoutes.post('/', async (c) => {
  const body = (await c.req.json()) as GroupRequestBody
  const entityType = body.entity_type || 'vm'
  const offset = body.group_member_offset || 0
  const count = body.group_member_count || 20
  const requestedAttrs = (body.group_member_attributes || []).map(
    (a) => a.attribute,
  )
  const filterCriteria = body.filter_criteria || ''
  const sortAttr = body.group_member_sort_attribute
  const sortOrder = body.group_member_sort_order
  const groupingAttribute = body.grouping_attribute
  const groupOffset = body.group_offset || 0
  const groupCount = body.group_count || Number.POSITIVE_INFINITY

  const entities = getEntitiesForType(entityType)
  const scopedEntities = filterByEntityIds(entities, body.entity_ids)
  let filtered = applyFiqlFilter(scopedEntities, filterCriteria)

  if (sortAttr) {
    // eslint-disable-next-line unicorn/no-array-sort -- es2022 target lacks toSorted
    filtered = [...filtered].sort((a, b) => {
      const cmp = compareEntityValues(a, b, sortAttr)
      return sortOrder === 'DESCENDING' ? -cmp : cmp
    })
  }

  const attrs = requestedAttrs.length > 0 ? requestedAttrs : DEFAULT_ATTRIBUTES
  const groupResults = getGroupResults(
    filtered,
    attrs,
    groupingAttribute,
    offset,
    count,
    body.group_attributes,
  )
  const pagedGroupResults = groupResults.slice(
    groupOffset,
    groupOffset + groupCount,
  )

  return c.json({
    entity_type: entityType,
    group_results: pagedGroupResults,
    total_group_count: groupResults.length,
    filtered_group_count: groupResults.length,
    filtered_entity_count: filtered.length,
    total_entity_count: scopedEntities.length,
  })
})

export default groupsRoutes
