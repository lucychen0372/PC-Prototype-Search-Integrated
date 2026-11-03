import {
  AIIcon,
  AlertIcon,
  AlertTriangleIcon,
  Badge,
  Button,
  FlexLayout,
  MenuController,
  SettingsIcon,
  TaskIcon,
} from '@nutanix-ui/prism-reactjs'
import type { SelectRowData } from '@nutanix-ui/prism-reactjs/lib/components/v2/Select/Select'
import { useRouterState } from '@tanstack/react-router'
import { useState } from 'react'
import { AppSwitcher } from '~/components/layout/header/app-switcher'
import '~/components/layout/header/Header.css'
import { UserProfileDropdown } from '~/components/layout/header/user-profile-dropdown'
import { GlobalSearch } from '@proto/components/search/GlobalSearch'
import { useNiva } from '@proto/store/niva-store'

const INFRASTRUCTURE_APP: SelectRowData = { key: 21, label: 'Infrastructure' }

export interface PrototypeHeaderProps {
  leftPanelVisible: boolean
  handleOnClickMenuIcon: () => void
}

/**
 * Same shell header as apps/web Header — AppSwitcher, alerts, tasks,
 * settings, user menu — with GlobalSearch swapped in for NavSearch.
 */
export const PrototypeHeader = ({
  leftPanelVisible,
  handleOnClickMenuIcon,
}: PrototypeHeaderProps) => {
  const [selectedApp, setSelectedApp] = useState<SelectRowData | undefined>({
    label: 'Apps & Marketplace',
    key: 'apps-marketplace',
  })
  const inVmPages = useRouterState({
    select: (state) => state.location.pathname.startsWith('/vms'),
  })
  const { openNiva } = useNiva()
  // Compute › VMs lives in the Infrastructure app (template APPS_DATA key 21)
  const shownApp = inVmPages ? INFRASTRUCTURE_APP : selectedApp

  return (
    <FlexLayout
      className="navigation-header"
      alignItems="center"
      justifyContent="space-between"
      itemGap="L"
      padding="15px-20px"
    >
      <FlexLayout itemGap="L" alignItems="center">
        <MenuController
          open={leftPanelVisible}
          onClick={handleOnClickMenuIcon}
        />
        <AppSwitcher selectedApp={shownApp} onAppChange={setSelectedApp} />
      </FlexLayout>

      <FlexLayout padding="0px-20px">
        <GlobalSearch />
      </FlexLayout>

      <FlexLayout itemGap="L" alignItems="center">
        <FlexLayout itemGap="S" alignItems="center">
          <AlertIcon aria-label="Alert Icon" size="large" />
          <Badge
            count={6}
            color={Badge.BadgeColorTypes.RED}
            statusIcon={<AlertTriangleIcon />}
            appearance={Badge.BadgeAppearance.NAVIGATION}
          />
        </FlexLayout>
        <FlexLayout itemGap="S" alignItems="center">
          <TaskIcon aria-label="Task Icon" size="large" />
          <Badge
            count={1}
            color={Badge.BadgeColorTypes.BLUE}
            appearance={Badge.BadgeAppearance.NAVIGATION}
          />
        </FlexLayout>
        <Button
          type={Button.ButtonTypes.ICON_DEFAULT}
          aria-label="Ask NIVA"
          onClick={() => openNiva()}
        >
          <AIIcon aria-hidden={true} />
        </Button>
        <SettingsIcon aria-label="Settings" size="large" />
        <UserProfileDropdown />
      </FlexLayout>
    </FlexLayout>
  )
}
