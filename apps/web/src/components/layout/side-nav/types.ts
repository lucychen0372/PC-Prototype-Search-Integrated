import type { FileRouteTypes } from '~/routeTree.gen'

export interface BaseMenuItem {
  key: string
  type: 'item' | 'group' | 'divider'
}

export interface MenuItemType extends BaseMenuItem {
  type: 'item'
  label: string
  path: FileRouteTypes['to']
  isFavorite?: boolean
  exact?: boolean
}

export interface MenuGroupType extends BaseMenuItem {
  type: 'group'
  title?: string
  collapsible?: boolean
  children: MenuItemNode[]
}

export interface MenuDividerType extends BaseMenuItem {
  type: 'divider'
}

export type MenuItemNode = MenuItemType | MenuGroupType | MenuDividerType
