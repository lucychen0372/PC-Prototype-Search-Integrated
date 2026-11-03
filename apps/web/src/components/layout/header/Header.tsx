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
import { useState } from 'react'
import { AppSwitcher } from './app-switcher'
import './Header.css'
import { NavSearch } from './nav-search'
import { openNivaInvestigation } from '~/components/niva-investigation/NivaInvestigationPanel'
import { UserProfileDropdown } from './user-profile-dropdown'

export interface HeaderProps {
  leftPanelVisible: boolean
  handleOnClickMenuIcon: () => void
}

const AlertsSection = () => {
  return (
    <FlexLayout itemGap="S" alignItems="center">
      <AlertIcon aria-label="Alert Icon" size="large" />
      <Badge
        count={100}
        color={Badge.BadgeColorTypes.RED}
        statusIcon={<AlertTriangleIcon />}
        appearance={Badge.BadgeAppearance.NAVIGATION}
      />
    </FlexLayout>
  )
}

const TasksSection = () => {
  return (
    <FlexLayout itemGap="S" alignItems="center">
      <TaskIcon aria-label="Task Icon" size="large" />
      <Badge
        count={1}
        color={Badge.BadgeColorTypes.BLUE}
        appearance={Badge.BadgeAppearance.NAVIGATION}
      />
    </FlexLayout>
  )
}

export const Header = ({
  leftPanelVisible,
  handleOnClickMenuIcon,
}: HeaderProps) => {
  const [selectedApp, setSelectedApp] = useState<SelectRowData | undefined>({
    label: 'Apps & Marketplace',
    key: 'apps-marketplace',
  })

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
        <AppSwitcher selectedApp={selectedApp} onAppChange={setSelectedApp} />
      </FlexLayout>

      <FlexLayout padding="0px-20px">
        <NavSearch />
      </FlexLayout>

      <FlexLayout itemGap="L" alignItems="center">
        <AlertsSection />
        <TasksSection />
        <Button
          type={Button.ButtonTypes.ICON_DEFAULT}
          aria-label="Ask NIVA"
          onClick={() => openNivaInvestigation()}
        >
          <AIIcon aria-hidden={true} />
        </Button>
        <SettingsIcon aria-label="Settings" size="large" />
        <UserProfileDropdown />
      </FlexLayout>
    </FlexLayout>
  )
}
