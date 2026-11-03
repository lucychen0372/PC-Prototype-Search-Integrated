import { createContext, useContext } from 'react'
import type { InterpretedFilter } from '@proto/data/types'

export type InterpretationPhase = 'interpreting' | 'done'

/** Search-driven Entity Browser state, read by components rendered inside the EBR. */
export interface SearchInterpretation {
  query: string
  filters: InterpretedFilter[]
  phase: InterpretationPhase
  source: 'search' | 'niva'
  /** Attribute to sort high-to-low once filters land (NIVA "sorted by CPU"). */
  sortBy?: 'cpuUsage' | 'iops'
  /** Parent entity the browser is scoped to (a cluster's VMs tab). */
  scopeName?: string
  /** Filters implied by the scope; counts include them, tokens never show them. */
  scopeFilters?: InterpretedFilter[]
  /** Re-search from the query box; defaults to the global VM list. */
  onSearch?: (query: string) => void
}

export const InterpretationContext = createContext<
  SearchInterpretation | undefined
>(undefined)

export const useInterpretation = () => {
  const interpretation = useContext(InterpretationContext)
  if (!interpretation) {
    throw new Error(
      'useInterpretation must be used inside InterpretationContext',
    )
  }
  return interpretation
}

/** EBR filter conditions use the same ids, so tokens map back to their labels. */
export const toFilterCondition = (filter: InterpretedFilter) => ({
  id: filter.id,
  attribute: filter.attribute,
  op: filter.op,
  value1: filter.value,
  isChecked: true,
})

export const toFilterExpression = (filters: InterpretedFilter[]) =>
  Object.fromEntries(
    filters.map((filter) => [filter.attribute, [toFilterCondition(filter)]]),
  )
