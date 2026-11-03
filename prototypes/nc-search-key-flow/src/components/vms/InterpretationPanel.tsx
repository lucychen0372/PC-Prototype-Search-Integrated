import { connect } from '@nutanix-ui/ebr-ui'
import { useEffect, useRef, type ComponentType } from 'react'
import type { InterpretedFilter } from '@proto/data/types'
import { useRunSearch } from '@proto/components/search/use-run-search'
import { useOpenLink, type VmSort } from '@proto/lib/destinations'
import type { EBRFilterCondition } from '~/types/ebr'
import { conditionToFilter } from './filter-fields'
import { InterpretationBox } from './InterpretationBox'
import { toFilterExpression, useInterpretation } from './interpretation-context'

const VM_ENTITY_TYPE = 'vm'

const SORT_PARAM: Record<string, VmSort> = { cpuUsage: 'cpu', iops: 'iops' }

type FilterState = Record<string, Record<string, unknown>>

interface PanelProps {
  conditions: EBRFilterCondition[]
  setFilterExpression: (
    expression: Record<string, EBRFilterCondition[]>,
  ) => void
  sortDescending: (attribute: string) => void
}

const mapStateToProps = (state: { ebFilters?: FilterState }) => ({
  // Not every entry is a condition list (EBR's own getters skip non-arrays)
  conditions: Object.values(state.ebFilters?.[VM_ENTITY_TYPE] ?? {})
    .filter((value): value is (EBRFilterCondition | undefined)[] =>
      Array.isArray(value),
    )
    .flat()
    .filter((condition): condition is EBRFilterCondition =>
      Boolean(condition?.isChecked),
    ),
})

// Same action payloads EBR's own filter bar dispatches (actions/ebFilters)
const mapDispatchToProps = (dispatch: (action: unknown) => void) => ({
  setFilterExpression: (
    filterExpression: Record<string, EBRFilterCondition[]>,
  ) =>
    dispatch({
      type: 'setFilterExpression',
      payload: { entityType: VM_ENTITY_TYPE, filterExpression },
    }),
  // EBR ebState `selectSortBy`; the grid header shows the same sort
  sortDescending: (attribute: string) =>
    dispatch({
      type: 'selectSortBy',
      entityType: VM_ENTITY_TYPE,
      sortBy: attribute,
      sortOrder: 'DESCENDING',
    }),
})

/** The shared interpretation box, reading and writing EBR's own filter state. */
const InterpretationPanelView = ({
  conditions,
  setFilterExpression,
  sortDescending,
}: PanelProps) => {
  const {
    query,
    filters,
    phase,
    source,
    sortBy,
    scopeName,
    scopeFilters,
    onSearch,
  } = useInterpretation()
  const runSearch = useRunSearch()
  const openLink = useOpenLink()
  const applied = useRef(false)

  // Filters "arrive" once interpretation finishes: hand them to EBR's own filter state
  useEffect(() => {
    if (phase !== 'done' || applied.current) return
    applied.current = true
    if (sortBy) sortDescending(sortBy)
    setFilterExpression(toFilterExpression(filters))
  }, [phase, filters, setFilterExpression, sortBy, sortDescending])

  // Interpreted filters keep their "high (> 80%)" wording until the participant edits them
  const current = conditions.flatMap((condition): InterpretedFilter[] => {
    const interpreted = filters.find(
      (filter) =>
        filter.id === condition.id &&
        filter.op === condition.op &&
        String(filter.value) === String(condition.value1),
    )
    const filter = interpreted ?? conditionToFilter(condition)
    return filter ? [filter] : []
  })

  return (
    <InterpretationBox
      query={query}
      queryPlaceholder={
        scopeName ? `Describe VMs in ${scopeName}, e.g. 'slow VMs'` : undefined
      }
      onSearch={onSearch ?? runSearch}
      phase={phase}
      source={source}
      filters={current}
      onChange={(next) => setFilterExpression(toFilterExpression(next))}
      scopeFilters={scopeFilters}
      // Another cluster opens its own VMs tab; no cluster opens the global VM list
      onScopeChange={(scope, next) =>
        openLink({
          kind: 'vm-list',
          search: {
            q: query,
            f: [...scope, ...next],
            ...(source === 'niva' ? { from: 'niva' } : {}),
            ...(sortBy ? { sort: SORT_PARAM[sortBy] } : {}),
          },
        })
      }
    />
  )
}

export const InterpretationPanel = (
  connect as unknown as (
    mapState: typeof mapStateToProps,
    mapDispatch: typeof mapDispatchToProps,
  ) => (component: ComponentType<PanelProps>) => ComponentType
)(
  mapStateToProps,
  mapDispatchToProps,
)(InterpretationPanelView)
