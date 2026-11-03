import {
  Divider,
  Favorite,
  Menu,
  MenuGroup,
  MenuItem,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'
import type { MenuItemInfo } from '@nutanix-ui/prism-reactjs/lib/components/v2/Navigation/MenuItem'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import './SideNav.css'
import { MENU_DATA } from './constants'
import type { MenuItemNode } from './types'

const SIDE_NAV_FOOTER_KEYS = new Set(['prism-central-settings'])
const SIDE_NAV_HIDDEN_KEYS = new Set(['divider-2'])

const getSideNavSectionItems = (isFooter: boolean): MenuItemNode[] => {
  const mainGroup = MENU_DATA.find((item) => item.key === 'main')

  if (mainGroup?.type !== 'group') {
    return []
  }

  return mainGroup.children.filter((item) =>
    isFooter
      ? SIDE_NAV_FOOTER_KEYS.has(item.key)
      : !SIDE_NAV_FOOTER_KEYS.has(item.key) &&
        !SIDE_NAV_HIDDEN_KEYS.has(item.key),
  )
}

export const SideNav = () => {
  const [activeKeyPath, setActiveKeyPath] = useState<string[]>([])
  // `main` only groups the items in MENU_DATA; it is not a rendered MenuGroup
  const [openKeyMap, setOpenKeyMap] = useState<string[][]>([
    ['compute'],
    ['storage'],
    ['networking'],
    ['protection'],
  ])

  const handleOnClick = (info: MenuItemInfo) => {
    const { keyPath, openKeyMap: newOpenKeyMap } = info
    setActiveKeyPath(keyPath.map(String))
    if (newOpenKeyMap) {
      setOpenKeyMap(newOpenKeyMap.map((keys) => keys.map(String)))
    }
  }

  const renderMenuItems = (items: MenuItemNode[]): React.ReactNode[] => {
    return items.map((item) => {
      switch (item.type) {
        case 'item': {
          const menuItem = item
          const hasIcon = menuItem.isFavorite

          return (
            <Link
              key={menuItem.key}
              to={menuItem.path}
              activeOptions={menuItem.exact ? { exact: true } : undefined}
              preload="intent"
              className="side-nav-link"
            >
              {({ isActive }: { isActive: boolean }) => (
                <MenuItem
                  justifyContent={hasIcon ? 'space-between' : undefined}
                  active={isActive}
                >
                  <span>{menuItem.label}</span>
                  {hasIcon && (
                    <Favorite
                      aria-label="Favorite Icon"
                      appearance={Favorite.APPEARANCE.NAVIGATION}
                      // checked={true}
                    />
                  )}
                </MenuItem>
              )}
            </Link>
          )
        }
        case 'group': {
          const menuGroup = item
          const groupProps = menuGroup.collapsible
            ? {
                title: menuGroup.title,
                type: MenuGroup.MenuGroupType.COLLAPSIBLE,
              }
            : {}

          return (
            <MenuGroup key={menuGroup.key} {...groupProps}>
              {renderMenuItems(menuGroup.children)}
            </MenuGroup>
          )
        }
        case 'divider': {
          return (
            <StackingLayout key={item.key} padding="15px-20px">
              <Divider
                type="short"
                appearance={Divider.DividerAppearance.NAVIGATION}
              />
            </StackingLayout>
          )
        }
      }
    })
  }

  const mainMenuItems = getSideNavSectionItems(false)
  const footerMenuItems = getSideNavSectionItems(true)

  return (
    <StackingLayout background="base" className="side-nav-shell" itemGap="none">
      <Menu
        className="side-nav-menu"
        padding="20px-0px"
        type={Menu.MenuType.SECONDARY}
        activeKeyPath={activeKeyPath}
        openKeyMap={openKeyMap}
        onClick={handleOnClick}
      >
        {renderMenuItems(mainMenuItems)}
      </Menu>
      <Divider appearance={Divider.DividerAppearance.NAVIGATION} />
      <Menu
        className="side-nav-footer"
        padding="10px-0px"
        type={Menu.MenuType.SECONDARY}
        activeKeyPath={activeKeyPath}
        onClick={handleOnClick}
      >
        {renderMenuItems(footerMenuItems)}
      </Menu>
    </StackingLayout>
  )
}
