import {
  ChevronDownIcon,
  Dropdown,
  FlexLayout,
  Menu,
  MenuGroup,
  MenuItem,
} from '@nutanix-ui/prism-reactjs'
import { DropdownType } from '@nutanix-ui/prism-reactjs/lib/components/v2/Dropdown/Dropdown'
import type { MenuItemInfo } from '@nutanix-ui/prism-reactjs/lib/components/v2/Navigation/MenuItem'
import type { ThemeId } from '~/hooks/use-theme'
import { useTheme } from '~/hooks/use-theme'
import './UserProfileDropdown.css'

export const UserProfileDropdown = () => {
  const { setTheme } = useTheme()

  const handleMenuClick = (item: MenuItemInfo) => {
    switch (item.key) {
      case 'profile': {
        // TODO: Navigate to profile settings
        break
      }
      case 'light':
      case 'dark':
      case 'auto': {
        setTheme(item.key as ThemeId)
        break
      }
      case 'logout': {
        // TODO: Handle logout
        break
      }
    }
  }

  const userMenu = (
    <Menu
      appearance={Menu.MenuAppearance.COMPACT}
      type={Menu.MenuType.SECONDARY}
      onClick={handleMenuClick}
      className="user_menu"
    >
      <MenuGroup key="user_menu_group" className="user_menu_group">
        <MenuItem key="profile">Profile</MenuItem>
        <MenuItem key="logout">Log Out</MenuItem>
      </MenuGroup>

      <MenuGroup
        key="theme"
        title="Theme"
        type={MenuGroup.MenuGroupType.DEFAULT}
        className="theme_menu_group"
      >
        <MenuItem key="light">Light</MenuItem>
        <MenuItem key="dark">Dark</MenuItem>
        <MenuItem key="auto">Auto</MenuItem>
      </MenuGroup>
    </Menu>
  )

  return (
    <Dropdown
      popup={userMenu}
      type={DropdownType.NAVIGATION}
      popupPlacement="bottomLeft"
    >
      <FlexLayout
        itemGap="S"
        alignItems="center"
        className="user_profile_dropdown"
      >
        <span className="user_profile_dropdown_text">admin</span>
        <ChevronDownIcon />
      </FlexLayout>
    </Dropdown>
  )
}
