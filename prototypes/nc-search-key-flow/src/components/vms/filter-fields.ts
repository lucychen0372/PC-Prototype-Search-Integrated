import type { FilterAttribute, InterpretedFilter } from '@proto/data/types'
import { NC_VMS } from '@proto/lib/nc-data'
import {
  clusterFilter,
  hostFilter,
  metricFilter,
  type Metric,
} from '@proto/lib/query-interpreter'
import type { EBRFilterCondition } from '~/types/ebr'

export type FilterOp = InterpretedFilter['op']

export interface FilterField {
  attribute: FilterAttribute
  label: string
  /** Enum fields pick from the values present in the template VMs. */
  options?: string[]
}

const distinctValues = (attribute: FilterAttribute) =>
  [...new Set(NC_VMS.map((vm) => String(vm[attribute])))].toSorted((a, b) =>
    a.localeCompare(b, undefined, { numeric: true }),
  )

/** "VM fields" in the + Filter popover, in the wireframe's order. */
export const FILTER_FIELDS: FilterField[] = [
  {
    attribute: 'powerState',
    label: 'Power state',
    options: distinctValues('powerState'),
  },
  {
    attribute: 'cluster',
    label: 'Cluster',
    options: distinctValues('cluster'),
  },
  { attribute: 'host', label: 'Host', options: distinctValues('host') },
  { attribute: 'cpuUsage', label: 'CPU %' },
  { attribute: 'memoryUsage', label: 'Memory %' },
  { attribute: 'iops', label: 'IOPS' },
]

export const fieldFor = (attribute: string) =>
  FILTER_FIELDS.find((field) => field.attribute === attribute)

export const OP_LABEL: Record<FilterOp, string> = {
  eq: 'is',
  gt: 'greater than',
  lt: 'less than',
}

export const opsFor = (field: FilterField): FilterOp[] =>
  field.options ? ['eq'] : ['gt', 'lt']

/** Builds the same filter shape the interpreter produces, so labels stay consistent. */
export const buildFilter = (
  attribute: FilterAttribute,
  op: FilterOp,
  value: string | number,
): InterpretedFilter => {
  switch (attribute) {
    case 'cluster': {
      return clusterFilter(String(value))
    }
    case 'host': {
      return hostFilter(String(value))
    }
    case 'powerState': {
      return {
        id: 'interp-powerState',
        attribute,
        op: 'eq',
        value: String(value),
        label: 'Power state',
        valueLabel: String(value),
      }
    }
    default: {
      return metricFilter(
        attribute as Metric,
        op === 'lt' ? 'lt' : 'gt',
        Number(value),
      )
    }
  }
}

export const conditionToFilter = (
  condition: EBRFilterCondition,
): InterpretedFilter | undefined =>
  fieldFor(condition.attribute)
    ? buildFilter(
        condition.attribute as FilterAttribute,
        condition.op as FilterOp,
        condition.value1 as string | number,
      )
    : undefined

/** One condition per attribute: a new filter on the same field replaces the old one. */
export const mergeFilters = (
  current: InterpretedFilter[],
  added: InterpretedFilter[],
) => [
  ...current.filter((filter) =>
    added.every((next) => next.attribute !== filter.attribute),
  ),
  ...added,
]
