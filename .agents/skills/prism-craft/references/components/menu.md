# Menu

## Figma

- **Library name:** Side Menu (page: N/A, frame: Side Menu)
- **Also matches:** Side Menu Page, Nav Menu Page

## React

Import: `import { Menu, MenuItem, MenuGroup, MenuController } from '@nutanix-ui/prism-reactjs'`

### TSX Examples

```tsx
{
  /* Sidebar navigation — primary type */
}
;<Menu
  type={Menu.MenuType.PRIMARY}
  activeKeyPath={['summary']}
  onClick={({ keyPath }) => setActivePath(keyPath)}
  role={Menu.MenuRole.MENUBAR}
>
  <MenuItem key="summary">Summary</MenuItem>
  <MenuItem key="alerts">Alerts</MenuItem>
  <MenuGroup key="settings" title="Settings">
    <MenuItem key="general">General</MenuItem>
    <MenuItem key="security">Security</MenuItem>
  </MenuGroup>
</Menu>

{
  /* Compact appearance — for dropdowns and small widgets */
}
;<Menu appearance={Menu.MenuAppearance.COMPACT} role={Menu.MenuRole.MENU}>
  <MenuItem key="edit">Edit</MenuItem>
  <MenuItem key="clone">Clone</MenuItem>
  <MenuItem key="delete">Delete</MenuItem>
</Menu>

{
  /* Collapsible sections */
}
;<Menu
  activeKeyPath={activeKeyPath}
  openKeyMap={openKeyMap}
  onClick={({ keyPath, openKeyMap }) => {
    setActiveKeyPath(keyPath)
    setOpenKeyMap(openKeyMap)
  }}
  role={Menu.MenuRole.MENUBAR}
>
  <MenuGroup key="hardware" title="Hardware" type="collapsible">
    <MenuItem key="containers">Containers</MenuItem>
    <MenuItem key="vgs">Volume Groups</MenuItem>
  </MenuGroup>
</Menu>

{
  /* Submenu (flyout on hover/focus) */
}
;<Menu type={Menu.MenuType.PRIMARY} role={Menu.MenuRole.MENUBAR}>
  <MenuGroup key="history" title="Browsing History" type="submenu">
    <MenuItem key="recent">Recent</MenuItem>
    <MenuItem key="bookmarks">Bookmarks</MenuItem>
  </MenuGroup>
</Menu>

{
  /* Link-usage items (renders <a> tags) */
}
;<Menu role={Menu.MenuRole.MENUBAR}>
  <MenuItem
    key="dashboard"
    usage={MenuItem.MenuItemUsage.LINK}
    href="/dashboard"
  >
    Dashboard
  </MenuItem>
</Menu>
```

### Anti-patterns

- Don't use `<ul>/<li>` for navigation menus — use `Menu` + `MenuItem`.
- Don't create custom sidebar navigation — use `Menu` inside `MainPageLayout.leftPanel`.
- Don't constrain `Menu` width unnecessarily; let menu items determine their own width so labels stay on one line.
- Don't assign individual `onClick` callbacks to `MenuItem` or `MenuGroup` children when they are inside a `Menu` — the `Menu`-level `onClick` prop is the single callback; child-level `onClick` is overwritten internally.
- Don't use `role="menu"` for basic site navigation (standard `<nav>` + links). Prefer `ButtonGroup` or plain links when complex keyboard interaction is not required.

<!-- SOURCE-API-START -->

### Import

```tsx
import {
  Menu,
  MenuItem,
  MenuGroup,
  MenuController,
} from '@nutanix-ui/prism-reactjs'
```

### Enums / Constants

#### `MenuAppearance`

Imported from `@nutanix-ui/prism-reactjs` or accessed via `Menu.MenuAppearance` / `Menu.APPEARANCE`.

| Value     | String      |
| --------- | ----------- |
| `COMPACT` | `'compact'` |
| `DEFAULT` | `'default'` |

#### `MenuType`

Accessed via `Menu.MenuType` / `Menu.TYPE`.

| Value       | String        |
| ----------- | ------------- |
| `PRIMARY`   | `'primary'`   |
| `SECONDARY` | `'secondary'` |

#### `MenuRole`

Accessed via `Menu.MenuRole`.

| Value     | String      | Notes                                                      |
| --------- | ----------- | ---------------------------------------------------------- |
| `MENU`    | `'menu'`    | Default. Use for pop-up / contextual menus and submenus.   |
| `MENUBAR` | `'menubar'` | Use for persistent horizontal or vertical navigation bars. |
| `LIST`    | `'list'`    | **Deprecated** — use `role="menu"` instead.                |

#### `MenuChildrenType`

Accessed via `Menu.MenuChildrenType` / `Menu.MENU_CHILDREN`. Used as the `name` field in the `items` array prop.

| Value        | String        |
| ------------ | ------------- |
| `DIVIDER`    | `'Divider'`   |
| `MENU_GROUP` | `'MenuGroup'` |
| `MENU_ITEM`  | `'MenuItem'`  |

#### `MenuGroupType`

Accessed via `MenuGroup.MenuGroupType`.

| Value         | String          | Behaviour                                                         |
| ------------- | --------------- | ----------------------------------------------------------------- |
| `DEFAULT`     | `'default'`     | Static labeled group; shows a `Title` header.                     |
| `COLLAPSIBLE` | `'collapsible'` | Accordion-style; toggle to expand/collapse children.              |
| `SUBMENU`     | `'submenu'`     | Flyout panel triggered on hover or keyboard focus (`ArrowRight`). |

#### `MenuItemRole`

Accessed via `MenuItem.MenuItemRole`.

| Value              | String               |
| ------------------ | -------------------- |
| `MENUITEM`         | `'menuitem'`         |
| `MENUITEMCHECKBOX` | `'menuitemcheckbox'` |
| `MENUITEMRADIO`    | `'menuitemradio'`    |

#### `MenuItemUsage`

Accessed via `MenuItem.MenuItemUsage`.

| Value    | String     | Rendered tag | Notes                                          |
| -------- | ---------- | ------------ | ---------------------------------------------- |
| `BUTTON` | `'button'` | `<button>`   | Default. Use for actions.                      |
| `LINK`   | `'link'`   | `<a>`        | Use for routing. Pass `href` as a normal prop. |

### Props Interfaces

#### `MenuProps`

Extends: `Omit<StackingLayoutProps, 'onClick'>` (inherits all `StackingLayout` layout props such as `padding`, `itemSpacing`, `itemGap`, etc.)

| Prop            | Type                           | Default                  | Required | Description                                                                                                                   |
| --------------- | ------------------------------ | ------------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `appearance`    | `MenuAppearance`               | `MenuAppearance.DEFAULT` | No       | Visual density. Use `COMPACT` for dropdowns and small inline widgets.                                                         |
| `type`          | `MenuType`                     | —                        | No       | Color theme. `PRIMARY` is the dark sidebar style; `SECONDARY` is the light navigation style.                                  |
| `activeKeyPath` | `(string \| number)[]`         | —                        | No       | Path of keys for the currently selected item. Root is index `0`, deepest item is the last element.                            |
| `openKeyMap`    | `(string \| number)[][]`       | —                        | No       | Multidimensional array of key paths for open `collapsible` `MenuGroup`s. Updated by the `onClick` callback `info.openKeyMap`. |
| `onClick`       | `(info: MenuItemInfo) => void` | —                        | No       | Single click callback for the whole menu. Receives `{ event, key, keyPath, openKeyMap, item, type }`.                         |
| `children`      | `React.ReactNode`              | —                        | No       | Children rendered before `items`. Accepts `MenuItem`, `MenuGroup`, `Divider`, or any element.                                 |
| `items`         | `MenuItemData[]`               | —                        | No       | Alternative data-driven API. Children render first, then `items`. See `MenuItemData` shape below.                             |
| `role`          | `MenuRole`                     | `MenuRole.MENU`          | No       | ARIA role for the `<ul>` root.                                                                                                |
| `background`    | `'base' \| 'alt'`              | —                        | No       | Background color token. Also sets a `BackgroundContext` for descendants.                                                      |
| `className`     | `string`                       | —                        | No       | Additional CSS class.                                                                                                         |
| `ref`           | `React.Ref<HTMLDivElement>`    | —                        | No       | Forwarded ref to the root element.                                                                                            |
| `optionsRefs`   | `React.Ref<HTMLElement[]>`     | —                        | No       | Exposes menu item DOM refs to a parent component (e.g. for custom focus management).                                          |
| `theme`         | `'light' \| 'dark'`            | `'light'`                | No       | **Deprecated.** Use `type` instead.                                                                                           |

##### `MenuItemData` shape (for the `items` prop)

Each entry in the `items` array can be one of three shapes identified by the `name` field (defaults to `'MenuItem'`):

```ts
// MenuItem entry
{
  name?: 'MenuItem',          // optional — 'MenuItem' is the default
  key: string,                // required
  children?: React.ReactNode, // label content
  disabled?: boolean,
  tooltipProps?: Omit<ToolTipProps, 'children'>,
  // ...any other MenuItemProps
}

// MenuGroup entry
{
  name: 'MenuGroup',
  key: string,                // required
  title?: React.ReactNode,
  type?: MenuGroupType,       // 'default' | 'collapsible' | 'submenu'
  items?: MenuItemData[],     // nested items
}

// Divider entry
{
  name: 'Divider',
  key: string,                // required
  // ...any Divider props (e.g. appearance)
}
```

---

#### `MenuItemProps`

Extends: `Omit<FlexLayoutProps, 'onClick' | 'onFocus'>`

| Prop           | Type                                | Default                 | Required | Description                                                                                                     |
| -------------- | ----------------------------------- | ----------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `children`     | `React.ReactNode`                   | —                       | No       | Label content. Can be any React node.                                                                           |
| `disabled`     | `boolean`                           | —                       | No       | Disables click and marks the item with `aria-disabled`.                                                         |
| `active`       | `boolean`                           | —                       | No       | Highlights the item as selected. Managed automatically by `Menu`.                                               |
| `usage`        | `MenuItemUsage`                     | `MenuItemUsage.BUTTON`  | No       | Renders as `<button>` (actions) or `<a>` (routing).                                                             |
| `role`         | `MenuItemRole`                      | `MenuItemRole.MENUITEM` | No       | ARIA role for the inner interactive element.                                                                    |
| `tooltipProps` | `Omit<ToolTipProps, 'children'>`    | —                       | No       | Attaches a `Tooltip` to the item. Use `oldTooltip: false` for the v2 tooltip. Default `placement` is `'right'`. |
| `onClick`      | `(info: MenuItemInfo) => void`      | —                       | No       | Direct click callback. **Overridden** when used inside `Menu`; use `Menu`'s `onClick` instead.                  |
| `onFocus`      | `(info: MenuItemFocusInfo) => void` | —                       | No       | Focus callback. **Overridden** when used inside `Menu`.                                                         |
| `onMouseEnter` | `(e: React.MouseEvent) => void`     | —                       | No       | Standard mouse-enter handler.                                                                                   |
| `onMouseLeave` | `(e: React.MouseEvent) => void`     | —                       | No       | Standard mouse-leave handler.                                                                                   |
| `focused`      | `boolean`                           | —                       | No       | Controls `tabIndex` (`0` when `true`, `-1` otherwise).                                                          |
| `className`    | `string`                            | —                       | No       | Additional CSS class.                                                                                           |
| `assignedKey`  | `string \| number`                  | —                       | No       | Internal prop — mirrors `key`. Do not set manually.                                                             |
| `type`         | `string`                            | —                       | No       | Internal style modifier (e.g. `'collapsible'` for items inside a collapsible group).                            |
| `parentType`   | `MenuGroupType`                     | —                       | No       | Injected by parent `MenuGroup`. Do not set manually.                                                            |

##### `MenuItemInfo` (onClick callback payload)

```ts
interface MenuItemInfo {
  event: React.MouseEvent
  key: string | number
  keyPath: (string | number)[] // root-first, e.g. ['groupKey', 'itemKey']
  type?: string // e.g. 'collapsible-header'
  item: ReactInstance
  openKeyMap?: (string | number | undefined)[][]
}
```

##### `MenuItemFocusInfo` (onFocus callback payload)

```ts
interface MenuItemFocusInfo {
  event: React.FocusEvent<HTMLElement>
  key: string | number
  keyPath: (string | number)[]
  parentType?: MenuGroupType
}
```

---

#### `MenuGroupProps`

Extends: `Omit<StackingLayoutProps, 'title' | 'onClick' | 'htmlTag'>`

| Prop         | Type                           | Default     | Required | Description                                                                                                                  |
| ------------ | ------------------------------ | ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `title`      | `React.ReactNode`              | —           | No       | Header label. A `string` or JSX node. Required for `collapsible` and `submenu` types to render a clickable/hoverable header. |
| `type`       | `MenuGroupType`                | `'default'` | No       | Group behaviour: `'default'` (static), `'collapsible'` (accordion), `'submenu'` (flyout).                                    |
| `titleProps` | `Omit<TitleProps, 'children'>` | —           | No       | Custom props forwarded to the `Title` component rendered for `type="default"` headers.                                       |
| `children`   | `React.ReactNode`              | —           | No       | `MenuItem`, nested `MenuGroup`, `Divider`, or any element.                                                                   |
| `expanded`   | `boolean`                      | —           | No       | Controlled expanded state. Managed automatically by `Menu`.                                                                  |
| `openKeyMap` | `(string \| number)[][]`       | —           | No       | Passed down from `Menu`. Do not set manually.                                                                                |
| `className`  | `string`                       | —           | No       | Additional CSS class.                                                                                                        |
| `onClick`    | `(info: any) => void`          | —           | No       | Overridden by `Menu`. Do not set manually.                                                                                   |

---

#### `MenuControllerProps`

Extends: `Omit<React.HTMLProps<HTMLDivElement>, 'ref'>` (renders as a `<button>`)

| Prop        | Type      | Default | Required | Description                                                     |
| ----------- | --------- | ------- | -------- | --------------------------------------------------------------- |
| `open`      | `boolean` | `false` | No       | Controls the visual open/closed state and sets `aria-expanded`. |
| `className` | `string`  | —       | No       | Additional CSS class.                                           |
| `data-test` | `string`  | —       | No       | Test ID attribute.                                              |

### Static Members

| Access path               | Resolves to        |
| ------------------------- | ------------------ |
| `Menu.APPEARANCE`         | `MenuAppearance`   |
| `Menu.MenuAppearance`     | `MenuAppearance`   |
| `Menu.TYPE`               | `MenuType`         |
| `Menu.MenuType`           | `MenuType`         |
| `Menu.MENU_CHILDREN`      | `MenuChildrenType` |
| `Menu.MenuChildrenType`   | `MenuChildrenType` |
| `Menu.MenuRole`           | `MenuRole`         |
| `MenuItem.MenuItemRole`   | `MenuItemRole`     |
| `MenuItem.MenuItemUsage`  | `MenuItemUsage`    |
| `MenuGroup.MenuGroupType` | `MenuGroupType`    |

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Accessibility Guidelines

```tsx
import {
  Paragraph,
  StackingLayout,
  Link,
  ExternalLinkIcon,
  Title,
} from '@nutanix-ui/prism-reactjs'
;<StackingLayout style={{ maxWidth: 800 }}>
  <Title size="h3">Alternatives</Title>
  <Paragraph>
    This component uses the{' '}
    <Link
      href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/menu_role"
      iconRight={
        <ExternalLinkIcon
          aria-hidden="false"
          aria-label="Opens in a new tab"
          size="small"
        />
      }
    >
      Menu role
    </Link>{' '}
    which is intended for lists of actions that require complex functionality.
    It should not be used for basic site navigation. Whenever possible, consider
    using a <Link href="#/Components/Actions?id=buttongroup">ButtonGroup</Link>{' '}
    or a simple list of links.
  </Paragraph>
  <Title size="h3">Focus Management</Title>
  <Paragraph>
    When using a Menu to navigate without a page refresh, focus needs to be
    programmatically managed. Keyboard focus should move to the content pane
    when a menu item is selected. Focus can be placed either on a page heading
    (preferred) or on the container. If focus is placed on the container, it
    must have a role (usually either "region" or "group") and an aria-label or
    aria-labelledby.
  </Paragraph>
</StackingLayout>
```

#### Basic usage (PRIMARY and SECONDARY types)

```tsx
import React from 'react'
import { Menu, FlexLayout, MenuItem } from '@nutanix-ui/prism-reactjs'

class MenuExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = { m1Path: ['1'], m2Path: ['1'] }
    this.m1OnClick = this.m1OnClick.bind(this)
    this.m2OnClick = this.m2OnClick.bind(this)
  }

  render() {
    const demoMenuSize = { width: '240px', height: '300px' }
    return (
      <FlexLayout itemSpacing="40px">
        {/* PRIMARY (dark sidebar) */}
        <Menu
          padding="10px-0px"
          activeKeyPath={this.state.m1Path}
          onClick={this.m1OnClick}
          style={demoMenuSize}
          role={Menu.MenuRole.MENUBAR}
        >
          <MenuItem key="1">Summary</MenuItem>
          <MenuItem key="2">List</MenuItem>
          <MenuItem key="3">Alerts</MenuItem>
          <MenuItem key="4">Anomalies</MenuItem>
          <MenuItem key="5">Topology</MenuItem>
          <MenuItem key="6">Trend</MenuItem>
        </Menu>

        {/* SECONDARY (light navigation) */}
        <Menu
          padding="10px-0px"
          type={Menu.MenuType.SECONDARY}
          activeKeyPath={this.state.m2Path}
          onClick={this.m2OnClick}
          style={demoMenuSize}
          role={Menu.MenuRole.MENUBAR}
        >
          <MenuItem key="1">Summary</MenuItem>
          <MenuItem key="2">List</MenuItem>
          <MenuItem key="3">Alerts</MenuItem>
          <MenuItem key="4">Anomalies</MenuItem>
          <MenuItem key="5">Topology</MenuItem>
          <MenuItem key="6">Trend</MenuItem>
        </Menu>
      </FlexLayout>
    )
  }

  m1OnClick(info) {
    this.setState({ m1Path: info.keyPath })
  }
  m2OnClick(info) {
    this.setState({ m2Path: info.keyPath })
  }
}
```

#### Disabled MenuItem with Tooltip

```tsx
import React from 'react'
import { Menu, FlexLayout, MenuItem } from '@nutanix-ui/prism-reactjs'
;<Menu
  padding="10px-0px"
  activeKeyPath={['1']}
  onClick={(info) => console.log(info)}
  style={{ width: '240px', height: '300px' }}
  role={Menu.MenuRole.MENUBAR}
>
  <MenuItem key="1">Summary</MenuItem>
  <MenuItem key="2">List</MenuItem>
  <MenuItem key="3">Alerts</MenuItem>
  <MenuItem
    key="4"
    disabled={true}
    tooltipProps={{
      content: 'There is no cow level...',
      oldTooltip: false, // use v2 Tooltip
    }}
  >
    Anomalies
  </MenuItem>
  <MenuItem key="5">Topology</MenuItem>
</Menu>
```

#### onClick Handling with focus management

```tsx
import React from 'react'
import {
  Menu,
  FlexLayout,
  FlexItem,
  Table,
  MenuItem,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'

class MenuExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = { m1Path: ['1'], pageKey: 'table' }
    this.pageHeadingRef = React.createRef()
    this.menuOnClick = this.menuOnClick.bind(this)
  }

  render() {
    const isTablePage = this.state.pageKey === 'table'
    return (
      <FlexLayout itemSpacing="40px">
        <Menu
          padding="10px-0px"
          activeKeyPath={this.state.m1Path}
          onClick={this.menuOnClick}
          style={{ width: '240px', minWidth: '240px', height: '300px' }}
          role={Menu.MenuRole.MENUBAR}
        >
          <MenuItem key="1">Table</MenuItem>
          <MenuItem key="2">Chart</MenuItem>
          <MenuItem key="3" disabled={true}>
            Forbidden Content
          </MenuItem>
        </Menu>

        <FlexItem flexGrow="1">
          <StackingLayout itemSpacing="20px">
            {/* Move focus here on navigation for accessibility */}
            <h2 ref={this.pageHeadingRef} tabIndex={-1}>
              {isTablePage ? 'Table' : 'Chart'}
            </h2>
            {isTablePage ? (
              <Table rowKey="key" dataSource={data} columns={columns} />
            ) : (
              <div>No chart data available</div>
            )}
          </StackingLayout>
        </FlexItem>
      </FlexLayout>
    )
  }

  menuOnClick(info) {
    const pageMap = { '1': 'table', '2': 'chart' }
    const pageKey = pageMap[info.key]
    if (!pageKey) return
    this.setState({ m1Path: info.keyPath, pageKey }, () => {
      this.pageHeadingRef.current?.focus()
    })
  }
}
```

#### Usage with named MenuGroups (sub-sections)

```tsx
import React from 'react'
import {
  Menu,
  FlexLayout,
  MenuItem,
  MenuGroup,
  StackingLayout,
  Divider,
} from '@nutanix-ui/prism-reactjs'
;<Menu
  itemSpacing="20px"
  padding="20px-0px"
  activeKeyPath={['general', '3']}
  onClick={(info) => console.log(info.keyPath)}
  style={{ width: '240px' }}
  role={Menu.MenuRole.MENUBAR}
>
  <MenuGroup key="general" title="General">
    <MenuItem key="1">Licensing</MenuItem>
    <MenuItem key="2">Local User Management</MenuItem>
    <MenuItem key="3">Role Mapping</MenuItem>
  </MenuGroup>
  <StackingLayout padding="0px-20px">
    <Divider type="short" />
  </StackingLayout>
  <MenuGroup key="network" title="Network">
    <MenuItem key="4">HTTP Proxy</MenuItem>
    <MenuItem key="5">Name Servers</MenuItem>
    <MenuItem key="6">NTP Servers</MenuItem>
  </MenuGroup>
</Menu>
```

#### Usage with collapsible sections

```tsx
import React from 'react'
import {
  Menu,
  FlexLayout,
  MenuItem,
  MenuGroup,
  Badge,
} from '@nutanix-ui/prism-reactjs'

class MenuExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeKeyPath: ['1', '1'],
      openKeyMap: [
        ['1', '4'],
        ['1', '5'],
      ],
    }
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick(info) {
    this.setState({ activeKeyPath: info.keyPath, openKeyMap: info.openKeyMap })
  }

  render() {
    const { activeKeyPath, openKeyMap } = this.state
    return (
      <Menu
        itemSpacing="10px"
        padding="30px-0px"
        activeKeyPath={activeKeyPath}
        openKeyMap={openKeyMap}
        onClick={this.handleOnClick}
        style={{ width: '240px' }}
        role={Menu.MenuRole.MENUBAR}
      >
        <MenuGroup key="1">
          <MenuItem key="1">Summary</MenuItem>
          <MenuItem key="2">List</MenuItem>
          <MenuItem key="3" justifyContent="space-between">
            <span>Alerts</span>
            <FlexLayout itemSpacing="10px">
              <Badge color="red" count="2" />
              <Badge color="yellow" count="25" />
            </FlexLayout>
          </MenuItem>
          <MenuGroup key="4" title="Hardware" type="collapsible">
            <MenuItem key="1" type="collapsible">
              Containers
            </MenuItem>
            <MenuItem key="2" type="collapsible">
              Volume Groups
            </MenuItem>
          </MenuGroup>
          <MenuGroup key="5" title="Storage" type="collapsible">
            <MenuItem key="1" type="collapsible">
              Giraffes
            </MenuItem>
            <MenuItem key="2" type="collapsible">
              Lions
            </MenuItem>
          </MenuGroup>
        </MenuGroup>
      </Menu>
    )
  }
}
```

#### Usage with submenus (flyout on hover/focus)

```tsx
import {
  Menu,
  MenuItem,
  MenuGroup,
  FlexLayout,
  StackingLayout,
  Divider,
  DashboardIcon,
  StarIcon,
  TimeIcon,
  QuestionIcon,
} from '@nutanix-ui/prism-reactjs'

const linkMenuProps = {
  href: '#/dashboard',
  usage: MenuItem.MenuItemUsage.LINK,
}

;<Menu
  type={Menu.MenuType.PRIMARY}
  itemSpacing="10px"
  padding="20px-0px"
  style={{ width: '240px' }}
  role={Menu.MenuRole.MENUBAR}
>
  <MenuGroup key="1">
    <MenuItem key="1" itemSpacing="10px" {...linkMenuProps}>
      <DashboardIcon /> <span>Dashboard</span>
    </MenuItem>
    <MenuItem key="2" itemSpacing="10px" {...linkMenuProps}>
      <StarIcon /> <span>Bookmarks</span>
    </MenuItem>
    <MenuGroup
      key="3"
      title={
        <FlexLayout itemSpacing="10px" alignItems="center">
          <TimeIcon /> <span>Browsing History</span>
        </FlexLayout>
      }
      type="submenu"
    >
      <MenuItem key="1" {...linkMenuProps}>
        Apples
      </MenuItem>
      <MenuItem key="2" {...linkMenuProps}>
        Bananas
      </MenuItem>
    </MenuGroup>
  </MenuGroup>
  <StackingLayout padding="0px-20px">
    <Divider type="short" />
  </StackingLayout>
  <MenuItem key="4" itemSpacing="10px" {...linkMenuProps}>
    <QuestionIcon /> <span>Help</span>
  </MenuItem>
</Menu>
```

#### Compact appearance (for dropdowns)

```tsx
import { Menu, MenuItem } from '@nutanix-ui/prism-reactjs'
;<Menu
  appearance={Menu.MenuAppearance.COMPACT}
  style={{ width: '240px' }}
  role={Menu.MenuRole.MENU}
>
  <MenuItem key="1">Summary</MenuItem>
  <MenuItem key="2">List</MenuItem>
  <MenuItem key="3">Alerts</MenuItem>
  <MenuItem key="4">Anomalies</MenuItem>
  <MenuItem key="5">Topology</MenuItem>
  <MenuItem key="6">Trend</MenuItem>
</Menu>
```

#### Data-driven menu with `items` prop

```tsx
import React from 'react'
import {
  FlexLayout,
  Menu,
  MenuItem,
  MenuGroup,
  StackingLayout,
  Divider,
} from '@nutanix-ui/prism-reactjs'

const menuItems = [
  {
    name: 'MenuGroup',
    key: '1',
    items: [
      { key: '1', children: 'Summary' },
      { key: '2', children: 'List' },
    ],
  },
  { name: 'Divider', key: '2' },
  {
    name: 'MenuGroup',
    title: 'Collapsible Section',
    type: 'collapsible',
    key: '3',
    items: [
      { key: '1', children: 'Item A' },
      { key: '2', children: 'Item B' },
    ],
  },
  {
    name: 'MenuGroup',
    title: 'Flyout',
    type: 'submenu',
    key: '4',
    items: [
      { key: '1', children: 'Submenu Item 1' },
      {
        key: '2',
        children: 'Submenu Item 2',
        disabled: true,
        tooltipProps: { content: "Can't touch this!" },
      },
    ],
  },
]

class MenuExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = { activeKeyPath: ['1', '1'], openKeyMap: [] }
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick(info) {
    this.setState({ activeKeyPath: info.keyPath, openKeyMap: info.openKeyMap })
  }

  render() {
    const { activeKeyPath, openKeyMap } = this.state
    return (
      <Menu
        items={menuItems}
        itemSpacing="10px"
        padding="20px-0px"
        activeKeyPath={activeKeyPath}
        openKeyMap={openKeyMap}
        onClick={this.handleOnClick}
        type={Menu.MenuType.PRIMARY}
        style={{ width: '240px' }}
        role={Menu.MenuRole.MENUBAR}
      >
        {/* children render before items */}
        <StackingLayout padding="0px-20px">
          <Divider type="short" />
        </StackingLayout>
      </Menu>
    )
  }
}
```

#### MenuController (hamburger toggle)

```tsx
import React from 'react'
import {
  MenuController,
  Menu,
  MenuItem,
  StackingLayout,
  FlexLayout,
} from '@nutanix-ui/prism-reactjs'

class MenuControllerExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: true }
    this.toggleMenuState = this.toggleMenuState.bind(this)
  }

  render() {
    const menu = (
      <Menu type={Menu.MenuType.PRIMARY} activeKeyPath={['1']}>
        <MenuItem key="1">Summary</MenuItem>
        <MenuItem key="2">Alerts</MenuItem>
        <MenuItem key="3">Metrics</MenuItem>
      </Menu>
    )
    return (
      <StackingLayout itemSpacing="0px">
        <FlexLayout alignItems="center" itemSpacing="10px" padding="20px">
          <MenuController
            open={this.state.open}
            onClick={this.toggleMenuState}
          />
          <span>Menu</span>
        </FlexLayout>
        {this.state.open ? menu : null}
      </StackingLayout>
    )
  }

  toggleMenuState() {
    this.setState((s) => ({ open: !s.open }))
  }
}
```

### Keyboard Behaviour

The `Menu` component implements full ARIA keyboard navigation. These interactions are built into the component and require no additional code.

| Key                              | Action                                                           |
| -------------------------------- | ---------------------------------------------------------------- |
| `ArrowDown`                      | Move focus to the next visible menu item (wraps).                |
| `ArrowUp`                        | Move focus to the previous visible menu item (wraps).            |
| `ArrowRight`                     | Open a `submenu` and focus its first item.                       |
| `ArrowLeft` / `Escape`           | Close the active `submenu` and return focus to the trigger item. |
| `Enter` / `Space`                | Activate the focused item (equivalent to click).                 |
| `Home`                           | Move focus to the first visible menu item.                       |
| `End`                            | Move focus to the last visible menu item.                        |
| `Tab` (Shift+Tab inside submenu) | Close the submenu and return focus to the trigger item.          |

- Items inside collapsed `collapsible` groups are excluded from keyboard traversal until expanded.
- Items inside `submenu` groups are excluded from vertical traversal of the parent; use `ArrowRight` to enter them.
- On initial focus (tab into the menu), focus moves to the active item or the first item.
- Focus returns to the first item when the menu is re-focused after blur.

### Usage Notes

- **`activeKeyPath` is root-first.** For a `MenuItem` inside a `MenuGroup`, the path is `[groupKey, itemKey]`. This was reversed in v2.1 (breaking change from v1.x).
- **`openKeyMap` is managed by `Menu`.** The updated map is passed back in `info.openKeyMap` from the `onClick` callback. Store it in state and pass it back as `openKeyMap`.
- **`children` renders before `items`.** When mixing both APIs, children appear at the top.
- **Dividers inside the menu** should be wrapped in `<StackingLayout padding="0px-20px">` to match the horizontal padding of menu items.
- **`MenuItem` with `usage="link"`** renders an `<a>` tag and sets `aria-current` only for button usage. Pass `href` as a normal prop.
- **`MenuGroup` with `type="default"`** renders a `Title` (h4) as a non-interactive section label.
- **`MenuGroup` with `type="collapsible"`** renders a `ChevronDownIcon` header toggle.
- **`MenuGroup` with `type="submenu"`** renders a `ChevronRightIcon` and a flyout panel activated on hover or `ArrowRight`.
- **Do not set width constraints** unless necessary; content-driven width prevents truncated labels.
- Prefer `Menu.<EnumName>.<VALUE>` (e.g. `Menu.MenuRole.MENUBAR`) over raw strings.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS.

<!-- SOURCE-API-END -->
