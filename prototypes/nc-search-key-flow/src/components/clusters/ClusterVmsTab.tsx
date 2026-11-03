import { StackingLayout } from '@nutanix-ui/prism-reactjs'
import { useNavigate, useRouterState } from '@tanstack/react-router'
import { useCallback, useRef } from 'react'
import type { ClusterSearch } from '@proto/lib/destinations'
import { InterpretedVmBrowser } from '@proto/components/vms/InterpretedVmBrowser'

interface ClusterVmsVisit extends ClusterSearch {
  key: string
}

/** Cluster › VMs: the cluster-scoped template VM browser with the interpretation extension. */
export const ClusterVmsTab = ({
  clusterId,
  clusterName,
}: {
  clusterId: string
  clusterName: string
}) => {
  const navigate = useNavigate()
  // Same as /vms: keep the last visit while the location moves on, so the
  // browser is never swapped in the render before this page unmounts
  const current = useRouterState({
    select: (state) =>
      state.location.pathname === `/clusters/${clusterId}`
        ? JSON.stringify({
            ...(state.location.search as ClusterSearch),
            key: state.location.state.__TSR_key ?? '',
          })
        : undefined,
  })
  const lastVisit = useRef<ClusterVmsVisit>({ key: '' })
  if (current !== undefined) {
    lastVisit.current = JSON.parse(current) as ClusterVmsVisit
  }
  const { key, q, f, sort, from } = lastVisit.current

  const onSearch = useCallback(
    (query: string) =>
      void navigate({
        to: '/clusters/$clusterId',
        params: { clusterId },
        search: { tab: 'vms', q: query },
      }),
    [navigate, clusterId],
  )

  return (
    <StackingLayout className="vm-content cluster-vms">
      <InterpretedVmBrowser
        key={key}
        ebId={`cluster-vms-${clusterId}-${key}`}
        query={q?.trim() ?? ''}
        presetFilters={f}
        sort={sort}
        source={from === 'niva' ? 'niva' : 'search'}
        scopeCluster={clusterName}
        onSearch={onSearch}
      />
    </StackingLayout>
  )
}
