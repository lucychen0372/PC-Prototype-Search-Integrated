import { useCallback } from 'react'
import type { RecentQueryTarget } from '@proto/data/types'
import { useOpenLink } from '@proto/lib/destinations'
import { topMatchFor, vmSortFor } from '@proto/lib/search-engine'
import { usePrototypeStore } from '@proto/store/prototype-store'

/** Opens a query's destination and records it in Recent. */
export const useOpenQuery = () => {
  const openLink = useOpenLink()
  const { addRecent } = usePrototypeStore()
  return useCallback(
    (query: string, target: RecentQueryTarget) => {
      addRecent({ kind: 'query', query, target })
      switch (target) {
        case 'vm-list': {
          openLink({
            kind: 'vm-list',
            search: { q: query, sort: vmSortFor(query) },
          })
          return
        }
        case 'grouped-results': {
          openLink({ kind: 'results', query })
          return
        }
        case 'results': {
          openLink({ kind: 'results', query })
        }
      }
    },
    [openLink, addRecent],
  )
}

/**
 * Re-searching from an interpretation box lands where the dropdown's Top Match
 * would: one cluster's VMs, the grouped results page, or keyword results.
 */
export const useRunSearch = () => {
  const openQuery = useOpenQuery()
  return useCallback(
    (query: string) => {
      const match = topMatchFor(query)
      openQuery(
        query,
        match
          ? match.destination === 'grouped-results'
            ? 'grouped-results'
            : 'vm-list'
          : 'results',
      )
    },
    [openQuery],
  )
}
