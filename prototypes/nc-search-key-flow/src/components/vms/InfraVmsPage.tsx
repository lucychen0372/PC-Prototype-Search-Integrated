import { useRouterState } from '@tanstack/react-router'
import { useRef } from 'react'
import { VmPage } from '~/components/vms'
import type { VmsSearch } from '@proto/lib/destinations'
import {
  InterpretedVmBrowser,
  VM_LIST_PERSPECTIVE,
} from './InterpretedVmBrowser'

/** Infrastructure › Compute › VMs. `?q=` arrives from the search Top Match or a NIVA link. */
interface VmsVisit extends VmsSearch {
  key: string
}

export const InfraVmsPage = () => {
  // The location moves on before this page unmounts; swapping browsers in that
  // last render breaks EBR's grid store, so keep showing the last /vms visit
  const current = useRouterState({
    select: (state) =>
      state.location.pathname === '/vms'
        ? JSON.stringify({
            ...(state.location.search as VmsSearch),
            key: state.location.state.__TSR_key ?? '',
          })
        : undefined,
  })
  const lastVisit = useRef<VmsVisit>({ key: '' })
  if (current !== undefined) {
    lastVisit.current = JSON.parse(current) as VmsVisit
  }
  const { key, q, f, sort, from } = lastVisit.current
  const query = q?.trim()

  if (!query && !f) {
    return <VmPage defaultPerspective={VM_LIST_PERSPECTIVE} />
  }

  return (
    <InterpretedVmBrowser
      key={key}
      ebId={`vm-search-${key}`}
      query={query ?? ''}
      presetFilters={f}
      sort={sort}
      source={from === 'niva' ? 'niva' : 'search'}
    />
  )
}
