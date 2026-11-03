import type { Entity, EntityValue, GroupRequestBody } from './types'

const DEFAULT_TIME_USECS = 1_779_134_294_563_714

const getEntityTimeUsecs = (entity: Entity): number => {
  const rawTime =
    entity._created_timestamp_usecs_ ??
    entity.created_time_usecs ??
    entity.createdOn

  return typeof rawTime === 'number' ? rawTime : DEFAULT_TIME_USECS
}

const getDataType = (value: EntityValue | undefined): string => {
  if (typeof value === 'number')
    return Number.isInteger(value) ? 'uint64' : 'double'
  if (typeof value === 'boolean') return 'bool'
  if (Array.isArray(value)) return 'string_list'
  return 'string'
}

const toGroupsValues = (value: EntityValue | undefined): string[] => {
  if (value === undefined || value === '') return []
  if (Array.isArray(value)) return value.map(String)
  return [String(value)]
}

const getSummaryValue = (
  entities: Entity[],
  attribute: string,
  operation = 'COUNT',
): string => {
  const values = entities
    .map((entity) => entity[attribute])
    .filter((value): value is EntityValue => value !== undefined)
  const numericValues = values
    .map(Number)
    .filter((value) => !Number.isNaN(value))

  switch (operation.toUpperCase()) {
    case 'AVG':
      return String(
        numericValues.reduce((sum, value) => sum + value, 0) /
          Math.max(numericValues.length, 1),
      )
    case 'MAX':
      return String(Math.max(...numericValues, 0))
    case 'MIN':
      return String(Math.min(...numericValues, 0))
    case 'SUM':
      return String(numericValues.reduce((sum, value) => sum + value, 0))
    case 'LAST':
      return String(values.at(-1) ?? '')
    default:
      return String(values.length)
  }
}

const getGroupSummaries = (
  entities: Entity[],
  groupAttributes: GroupRequestBody['group_attributes'] = [],
) =>
  Object.fromEntries(
    groupAttributes.map(({ attribute, operation = 'COUNT' }) => {
      const name = `${operation.toLowerCase()}:${attribute}`
      const summaryValue = getSummaryValue(entities, attribute, operation)

      return [
        name,
        {
          data_type: Number.isNaN(Number(summaryValue)) ? 'string' : 'uint64',
          name: attribute,
          values: [
            {
              time: getEntityTimeUsecs(entities[0] ?? { id: 'summary' }),
              values: [summaryValue],
            },
          ],
        },
      ]
    }),
  )

export const getEntityResults = (list: Entity[], attrs: string[]) => {
  return list.map((entity) => ({
    entity_id: entity.id,
    data: attrs.map((attr) => {
      const value = entity[attr]

      return {
        data_type: getDataType(value),
        name: attr,
        values: [
          {
            time: getEntityTimeUsecs(entity),
            values: toGroupsValues(value),
          },
        ],
      }
    }),
  }))
}

export const getGroupResults = (
  list: Entity[],
  attrs: string[],
  groupingAttribute: string | undefined,
  offset: number,
  count: number,
  groupAttributes: GroupRequestBody['group_attributes'] = [],
) => {
  if (!groupingAttribute) {
    return [
      {
        group_by_column_value: '',
        entity_results: getEntityResults(
          list.slice(offset, offset + count),
          attrs,
        ),
        group_summaries: getGroupSummaries(list, groupAttributes),
        total_entity_count: list.length,
      },
    ]
  }

  const groupsByValue = new Map<string, Entity[]>()
  for (const entity of list) {
    const groupValue = String(entity[groupingAttribute] ?? '')
    const groupEntities = groupsByValue.get(groupValue) || []
    groupEntities.push(entity)
    groupsByValue.set(groupValue, groupEntities)
  }

  return Array.from(groupsByValue, ([groupValue, groupEntities]) => ({
    group_by_column_value: groupValue,
    entity_results: getEntityResults(
      groupEntities.slice(offset, offset + count),
      attrs,
    ),
    group_summaries: getGroupSummaries(groupEntities, groupAttributes),
    total_entity_count: groupEntities.length,
  }))
}
