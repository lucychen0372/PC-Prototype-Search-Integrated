import {
  Dropdown,
  FlexLayout,
  Link,
  Menu,
  MenuItem,
  StackingLayout,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
import type { MenuItemInfo } from '@nutanix-ui/prism-reactjs/lib/components/v2/Navigation/MenuItem'
import { useState } from 'react'
import { CLUSTERS, HOSTS, getEntityById } from '@proto/data/catalog'
import type { CatalogEntity } from '@proto/data/types'
import '@proto/components/vms/FilterPopovers.css'

const CATEGORIES: Array<{
  key: string
  label: string
  entities: CatalogEntity[]
}> = [
  { key: 'clusters', label: 'Clusters', entities: CLUSTERS },
  { key: 'hosts', label: 'Hosts', entities: HOSTS },
]

/** NIVA's "+ Add" context: the results page "+ Filter" layout, listing clusters and hosts. */
export const NivaContextMenu = ({
  activeIds,
  onAdd,
}: {
  activeIds: Set<string>
  onAdd: (entity: CatalogEntity) => void
}) => {
  const [open, setOpen] = useState(false)
  const [categoryKey, setCategoryKey] = useState(CATEGORIES[0]?.key ?? '')
  const category =
    CATEGORIES.find((item) => item.key === categoryKey) ?? CATEGORIES[0]

  const popup = (
    <FlexLayout
      itemGap="none"
      className="vm-filter-popover -add"
      data-test="niva-context-add"
    >
      <StackingLayout itemGap="XS" className="vm-filter-field-list">
        <TextLabel
          type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
          size={TextLabel.TEXT_LABEL_SIZE.SMALL}
          className="vm-filter-section-label"
        >
          Context
        </TextLabel>
        <Menu
          appearance={Menu.MenuAppearance.COMPACT}
          onClick={(item: MenuItemInfo) => setCategoryKey(String(item.key))}
          aria-label="Context categories"
        >
          {CATEGORIES.map((item) => (
            <MenuItem key={item.key} active={item.key === category?.key}>
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </StackingLayout>
      <StackingLayout itemGap="XS" className="vm-filter-form">
        <TextLabel
          type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
          size={TextLabel.TEXT_LABEL_SIZE.SMALL}
          className="vm-filter-section-label"
        >
          {category?.label}
        </TextLabel>
        <Menu
          appearance={Menu.MenuAppearance.COMPACT}
          onClick={(item: MenuItemInfo) => {
            setOpen(false)
            const entity = getEntityById(String(item.key))
            if (entity) onAdd(entity)
          }}
          aria-label={category?.label}
          className="results-filter-options"
        >
          {(category?.entities ?? []).map((entity) => (
            <MenuItem
              key={entity.id}
              active={activeIds.has(entity.id)}
              disabled={activeIds.has(entity.id)}
            >
              {entity.name}
            </MenuItem>
          ))}
        </Menu>
      </StackingLayout>
    </FlexLayout>
  )

  return (
    <Dropdown
      popupVisible={open}
      onPopupVisibleChange={setOpen}
      popup={popup}
      popupPlacement="bottomLeft"
      getPopupContainer={() => document.body}
      focusOnOpen={false}
      disableKeyboardNavigation
      popupClassName="vm-filter-popup niva-context-popup"
    >
      <div className="vm-filter-trigger">
        <Link
          type={Link.LINK_TYPE.INLINE_SECONDARY}
          size={Link.LINK_SIZE.SMALL}
          underline={false}
          className="niva-context-add"
          aria-label="Add context"
        >
          + Add
        </Link>
      </div>
    </Dropdown>
  )
}
