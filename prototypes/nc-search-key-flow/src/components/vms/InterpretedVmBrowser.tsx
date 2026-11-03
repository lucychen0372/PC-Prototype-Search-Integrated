import { useEffect, useMemo, useRef, useState } from 'react'
import { VmList, VmPage } from '~/components/vms'
import type { VmEbrOverrides } from '~/components/vms'
import { vmEntityConfig } from '~/components/vms/config/config'
import type { InterpretedFilter } from '@proto/data/types'
import { clusterFilter, interpretQuery } from '@proto/lib/query-interpreter'
import type { VmsSearch } from '@proto/lib/destinations'
import { usePrototypeStore } from '@proto/store/prototype-store'
import {
  InterpretationContext,
  type InterpretationPhase,
} from './interpretation-context'
import { searchVmFactory } from './search-vm-factory'
import './InfraVmsPage.css'

const SORT_ATTRIBUTE = { cpu: 'cpuUsage', iops: 'iops' } as const

/** Columns from the wireframe: Name, Cluster, Power state, CPU %, Memory %, IOPS, Created. */
export const VM_LIST_PERSPECTIVE = 'Performance'

/** The groups API already serves `host`; the search browser also lets it be filtered. */
const searchEntityConfig = {
  schema: {
    ...vmEntityConfig.schema,
    attributes: {
      ...vmEntityConfig.schema.attributes,
      host: { type: 'string', displayName: 'Host' },
    },
  },
  perspectives: vmEntityConfig.perspectives.map((perspective) =>
    perspective.name === '_common_'
      ? {
          ...perspective,
          entityAttributes: {
            ...perspective.entityAttributes,
            filterByAttributes: [
              ...(perspective.entityAttributes.filterByAttributes ?? []),
              'host',
            ],
          },
        }
      : perspective,
  ),
} as VmEbrOverrides['entityConfig']

interface InterpretedVmBrowserProps {
  query: string
  presetFilters?: InterpretedFilter[]
  sort?: VmsSearch['sort']
  source: 'search' | 'niva'
  ebId: string
  /** Cluster the browser is scoped to; its own cluster filter is implied, not a token. */
  scopeCluster?: string
  onSearch?: (query: string) => void
}

/**
 * The template VM Entity Browser plus the interpretation extension: query box,
 * interpreted filter tokens, + Filter, and plain-words refinement.
 */
export const InterpretedVmBrowser = ({
  query,
  presetFilters,
  sort,
  source,
  ebId,
  scopeCluster,
  onSearch,
}: InterpretedVmBrowserProps) => {
  const { interpretationDelayMs } = usePrototypeStore()
  const filters = useMemo(() => {
    const interpreted = presetFilters ?? (query ? interpretQuery(query) : [])
    return scopeCluster
      ? interpreted.filter(
          (filter) =>
            filter.attribute !== 'cluster' ||
            String(filter.value).toLowerCase() !== scopeCluster.toLowerCase(),
        )
      : interpreted
  }, [presetFilters, query, scopeCluster])
  // Preset filters (NIVA, a cluster or host link) and an empty query need no interpretation wait
  const initialDelay = presetFilters || !query ? 0 : interpretationDelayMs
  const [phase, setPhase] = useState<InterpretationPhase>(
    initialDelay > 0 ? 'interpreting' : 'done',
  )

  // One interpretation per visit; the delay is read when the participant arrives
  const delayMs = useRef(initialDelay)
  useEffect(() => {
    const timer = globalThis.setTimeout(() => setPhase('done'), delayMs.current)
    return () => globalThis.clearTimeout(timer)
  }, [])

  const interpretation = useMemo(
    () => ({
      query,
      filters,
      phase,
      source,
      sortBy: sort ? SORT_ATTRIBUTE[sort] : undefined,
      scopeName: scopeCluster,
      scopeFilters: scopeCluster ? [clusterFilter(scopeCluster)] : undefined,
      onSearch,
    }),
    [query, filters, phase, source, sort, scopeCluster, onSearch],
  )

  // Built once per visit: the phase reaches the panel and count title through
  // context, so the browser itself never re-renders while filters arrive.
  // Re-searching mounts the next browser before this one unmounts, and EBR
  // stores are per ebId, so each visit gets its own.
  const browser = useMemo(() => {
    const overrides: VmEbrOverrides = {
      ebId,
      className: 'vm-search-ebr',
      entityConfig: searchEntityConfig,
      ebComponentFactory:
        searchVmFactory as unknown as VmEbrOverrides['ebComponentFactory'],
      showFiltersBar: false,
      persistQuerySettingsToSession: false,
      scopeFilter: scopeCluster ? `cluster==${scopeCluster}` : undefined,
    }
    return scopeCluster ? (
      <VmList defaultPerspective={VM_LIST_PERSPECTIVE} overrides={overrides} />
    ) : (
      <VmPage
        defaultPerspective={VM_LIST_PERSPECTIVE}
        ebrOverrides={overrides}
      />
    )
  }, [ebId, scopeCluster])

  return (
    <InterpretationContext.Provider value={interpretation}>
      {browser}
    </InterpretationContext.Provider>
  )
}
