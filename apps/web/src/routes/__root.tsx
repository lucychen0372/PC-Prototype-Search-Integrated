import { ThemeWrapper } from '@nutanix-core/prism-ui-themes-common'
import { FlexLayout, MainPageLayout, StackingLayout } from '@nutanix-ui/prism-reactjs'
import type { QueryClient } from '@tanstack/react-query'
import {
  Outlet,
  createRootRouteWithContext,
  useLocation,
} from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Header } from '~/components/layout/header'
import {
  INVESTIGATION_QUERY,
  NivaInvestigationPanel,
  addNivaInvestigationCloseListener,
  addNivaInvestigationListener,
} from '~/components/niva-investigation/NivaInvestigationPanel'
import { SideNav } from '~/components/layout/side-nav'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: App,
})

function App() {
  const location = useLocation()
  const [leftPanelVisible, setLeftPanelVisible] = useState(true)
  const [nivaPanelVisible, setNivaPanelVisible] = useState(false)
  const [nivaQuery, setNivaQuery] = useState(INVESTIGATION_QUERY)
  const [nivaPresentation, setNivaPresentation] = useState<
    'default' | 'expanded'
  >('default')

  const handleOnClickMenuIcon = () => {
    setLeftPanelVisible(!leftPanelVisible)
  }

  useEffect(
    () =>
      addNivaInvestigationListener(({ presentation = 'default', query }) => {
        setNivaQuery(query)
        setNivaPresentation(presentation)
        setNivaPanelVisible(true)
      }),
    [],
  )

  useEffect(
    () =>
      addNivaInvestigationCloseListener(() => {
        setNivaPanelVisible(false)
        setNivaPresentation('default')
      }),
    [],
  )

  useEffect(() => {
    setNivaPanelVisible(false)
    setNivaPresentation('default')
  }, [location.href])

  return (
    <ThemeWrapper onThemeChange={() => ({})}>
      <MainPageLayout
        className="main-page-layout"
        bodyCompressed
        header={
          <Header
            leftPanelVisible={leftPanelVisible}
            handleOnClickMenuIcon={handleOnClickMenuIcon}
          />
        }
        leftPanel={<SideNav />}
        leftPanelVisible={leftPanelVisible}
        body={
          <FlexLayout className="main-page-content" itemGap="none">
            <StackingLayout background="body" className="main-page-body">
              <Outlet />
            </StackingLayout>
            <NivaInvestigationPanel
              visible={nivaPanelVisible}
              query={nivaQuery}
              presentation={nivaPresentation}
              onClose={() => setNivaPanelVisible(false)}
            />
          </FlexLayout>
        }
      />
      {/* <TanStackRouterDevtools /> */}
    </ThemeWrapper>
  )
}
