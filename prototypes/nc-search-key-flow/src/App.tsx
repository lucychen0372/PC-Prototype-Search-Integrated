import { ThemeWrapper } from '@nutanix-core/prism-ui-themes-common'
import {
  FlexLayout,
  MainPageLayout,
  Notification,
  StackingLayout,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { useState } from 'react'
import { PageHeader } from '~/components/common'
import { SideNav } from '~/components/layout/side-nav'
import { VmDetailsPage } from '~/components/vms'
import * as TanStackQueryProvider from '~/integrations/tanstack-query/root-provider'
import { ClusterDetailsPage } from '@proto/components/clusters/ClusterDetailsPage'
import { MainDashboardPage } from '@proto/components/dashboard/MainDashboardPage'
import { NivaPanel } from '@proto/components/niva/NivaPanel'
import { SearchResultsPage } from '@proto/components/results/SearchResultsPage'
import { PrototypeHeader } from '@proto/components/layout/PrototypeHeader'
import { InfraVmsPage } from '@proto/components/vms/InfraVmsPage'
import { ModeratorPanel } from '@proto/components/moderator/ModeratorPanel'
import { ModeratorResetButton } from '@proto/components/moderator/ModeratorResetButton'
import type { InterpretedFilter } from '@proto/data/types'
import type {
  ClusterSearch,
  ResultsSearch,
  VmsSearch,
} from '@proto/lib/destinations'
import { NivaProvider } from '@proto/store/niva-store'
import { PrototypeProvider } from '@proto/store/prototype-store'

/**
 * Mirrors apps/web `routes/__root.tsx` shell:
 * ThemeWrapper → MainPageLayout → Header + SideNav + body canvas.
 * Only the search field and moderator panel are prototype-specific.
 */
function RootShell() {
  const [leftPanelVisible, setLeftPanelVisible] = useState(true)

  return (
    <ThemeWrapper onThemeChange={() => ({})}>
      <NivaProvider>
        <MainPageLayout
          className="main-page-layout"
          bodyCompressed
          header={
            <PrototypeHeader
              leftPanelVisible={leftPanelVisible}
              handleOnClickMenuIcon={() =>
                setLeftPanelVisible((visible) => !visible)
              }
            />
          }
          leftPanel={
            <StackingLayout itemGap="none" className="proto-left-panel">
              <SideNav />
              <ModeratorResetButton />
            </StackingLayout>
          }
          leftPanelVisible={leftPanelVisible}
          body={
            <FlexLayout className="main-page-content" itemGap="none">
              <StackingLayout background="body" className="main-page-body">
                <Outlet />
              </StackingLayout>
              <NivaPanel />
            </FlexLayout>
          }
        />
        <Notification>
          <FlexLayout className="notification-anchor" />
        </Notification>
        <ModeratorPanel />
      </NivaProvider>
    </ThemeWrapper>
  )
}

/** Stub for SideNav destinations that exist in the template menu but are out of Phase 1 scope. */
function StubPage({ title }: { title: string }) {
  return (
    <StackingLayout itemGap="none">
      <PageHeader title={title} />
      <StackingLayout padding="20px">
        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}>
          This page exists in the template shell navigation. Content is not
          wired for this search-key-flow study.
        </TextLabel>
      </StackingLayout>
    </StackingLayout>
  )
}

const optionalString = (value: unknown) =>
  typeof value === 'string' && value ? value : undefined

// `q` is the search text (Top Match) or NIVA question; `f` carries NIVA's filters
const validateVmsSearch = (search: Record<string, unknown>): VmsSearch => ({
  q: optionalString(search.q),
  f: Array.isArray(search.f) ? (search.f as InterpretedFilter[]) : undefined,
  sort:
    search.sort === 'cpu' || search.sort === 'iops' ? search.sort : undefined,
  from: search.from === 'niva' ? 'niva' : undefined,
})

const rootRoute = createRootRoute({
  component: RootShell,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: MainDashboardPage,
})

const vmsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/vms',
  validateSearch: validateVmsSearch,
  component: InfraVmsPage,
})

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/search',
  validateSearch: (search: Record<string, unknown>): ResultsSearch => ({
    q: optionalString(search.q),
  }),
  component: SearchResultsPage,
})

const clusterDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/clusters/$clusterId',
  validateSearch: (search: Record<string, unknown>): ClusterSearch => ({
    tab: optionalString(search.tab),
    ...validateVmsSearch(search),
  }),
  component: ClusterDetailsPage,
})

const vmDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/vms/$vmId',
  component: VmDetailsPage,
})

const stubPaths = [
  { path: '/templates', title: 'Templates' },
  { path: '/kubernetes', title: 'Kubernetes Clusters' },
  { path: '/ovas', title: 'OVAs' },
  { path: '/images', title: 'Images' },
  { path: '/storage-containers', title: 'Storage Containers' },
  { path: '/volume-groups', title: 'Volume Groups' },
  { path: '/storage-policies', title: 'Storage Policies' },
  { path: '/external-storage', title: 'External Storage' },
  { path: '/virtual-switches', title: 'Virtual Switches' },
  { path: '/subnets', title: 'Subnets' },
  { path: '/virtual-cloud', title: 'Virtual Private Cloud' },
  { path: '/floating-ips', title: 'Floating IPs' },
  { path: '/protection-summary', title: 'Protection Summary' },
  { path: '/protection-policies', title: 'Protection Policies' },
  { path: '/recovery-plans', title: 'Recovery Plans' },
  { path: '/vm-recovery-points', title: 'VM Recovery Points' },
  { path: '/settings', title: 'Prism Central Settings' },
] as const

const stubRoutes = stubPaths.map(({ path, title }) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path,
    component: () => <StubPage title={title} />,
  }),
)

const routeTree = rootRoute.addChildren([
  indexRoute,
  vmsRoute,
  vmDetailRoute,
  searchRoute,
  clusterDetailRoute,
  ...stubRoutes,
])

const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProvider.getContext(),
  },
  defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const App = () => {
  return (
    <PrototypeProvider>
      <TanStackQueryProvider.Provider>
        <RouterProvider router={router} />
      </TanStackQueryProvider.Provider>
    </PrototypeProvider>
  )
}
