export type EntityValue = string | number | boolean | string[] | number[]

export interface Entity {
  id: string
  [key: string]: EntityValue
}

export interface FiqlClause {
  attr: string
  op: string
  value: string
}

export interface GroupRequestBody {
  entity_type?: string
  entity_ids?: string[]
  group_member_offset?: number
  group_member_count?: number
  group_member_attributes?: Array<{ attribute: string }>
  filter_criteria?: string
  group_member_sort_attribute?: string
  group_member_sort_order?: 'ASCENDING' | 'DESCENDING'
  grouping_attribute?: string
  group_attributes?: Array<{
    attribute: string
    operation?: string
    ancestor_entity_type?: string
  }>
  group_offset?: number
  group_count?: number
}
