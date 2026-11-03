# MenuItem

## Figma

- **Library name:** Menu Row (page: N/A, frame: Menu Row)

## React

Import: `import { MenuItem } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import { MenuItem, Menu } from '@nutanix-ui/prism-reactjs'
```

### Enums / Constants

#### `MenuItemRole`

Import path: `import { MenuItem } from '@nutanix-ui/prism-reactjs'`
Access via static: `MenuItem.MenuItemRole`

| Value              | String               |
| ------------------ | -------------------- |
| `MENUITEM`         | `"menuitem"`         |
| `MENUITEMCHECKBOX` | `"menuitemcheckbox"` |
| `MENUITEMRADIO`    | `"menuitemradio"`    |

#### `MenuItemUsage`

Import path: `import { MenuItem } from '@nutanix-ui/prism-reactjs'`
Access via static: `MenuItem.MenuItemUsage`

| Value    | String     |
| -------- | ---------- |
| `BUTTON` | `"button"` |
| `LINK`   | `"link"`   |

### Props Interfaces

#### `MenuItemInfo`

Passed to `onClick`, `handleOnMouseEnter`, and `handleOnMouseLeave` callbacks.

| Prop         | Type                                  | Required | Description                                |
| ------------ | ------------------------------------- | -------- | ------------------------------------------ |
| `event`      | `React.MouseEvent`                    | Yes      | DOM mouse event                            |
| `key`        | `MenuItemProps['assignedKey']`        | Yes      | Key of the clicked item                    |
| `keyPath`    | `MenuItemProps['assignedKey'][]`      | Yes      | Path of keys from root to item             |
| `type`       | `string`                              | No       | Item type, e.g. `"collapsible-header"`     |
| `item`       | `ReactInstance`                       | Yes      | Reference to the component instance        |
| `openKeyMap` | `(string \| number \| undefined)[][]` | No       | Current open key map (populated by `Menu`) |

#### `MenuItemFocusInfo`

Passed to the `onFocus` callback.

| Prop         | Type                             | Required | Description                                 |
| ------------ | -------------------------------- | -------- | ------------------------------------------- |
| `event`      | `React.FocusEvent<HTMLElement>`  | Yes      | DOM focus event                             |
| `key`        | `MenuItemProps['assignedKey']`   | Yes      | Key of the focused item                     |
| `keyPath`    | `MenuItemProps['assignedKey'][]` | Yes      | Path of keys from root to item              |
| `parentType` | `MenuGroupType`                  | No       | Type of the parent `MenuGroup` (if present) |

#### `MenuItemProps`

Extends: `Omit<FlexLayoutProps, 'onClick' | 'onFocus'>`

All `FlexLayout` layout props (`itemSpacing`, `padding`, `alignItems`, `justifyContent`, `itemGap`, etc.) are accepted and pass through to the inner `FlexLayout`.

| Prop                 | Type                                | Default                 | Required | Description                                                                                                           |
| -------------------- | ----------------------------------- | ----------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `className`          | `string`                            | —                       | No       | Additional CSS class name.                                                                                            |
| `assignedKey`        | `string \| number`                  | —                       | No       | **(Internal use)** Must match the React `key` prop. Injected by `Menu`; do not set manually.                          |
| `children`           | `React.ReactNode`                   | —                       | No       | Content rendered inside the item.                                                                                     |
| `onClick`            | `(arg1: MenuItemInfo) => void`      | —                       | No       | Click handler. **Overridden by the parent `Menu`** — do not set when inside a `Menu`. Use `Menu`'s `onClick` instead. |
| `onFocus`            | `(item: MenuItemFocusInfo) => void` | —                       | No       | Focus handler. **Overridden by the parent `Menu`** — do not set when inside a `Menu`.                                 |
| `onMouseEnter`       | `(e: React.MouseEvent) => void`     | —                       | No       | Standard mouse-enter handler (called alongside `handleOnMouseEnter`).                                                 |
| `handleOnMouseEnter` | `(item: MenuItemInfo) => void`      | —                       | No       | **(Internal use)** Enhanced mouse-enter handler injected by `Menu`/`MenuGroup`.                                       |
| `onMouseLeave`       | `(e: React.MouseEvent) => void`     | —                       | No       | Standard mouse-leave handler.                                                                                         |
| `handleOnMouseLeave` | `(item: MenuItemInfo) => void`      | —                       | No       | **(Internal use)** Enhanced mouse-leave handler injected by `Menu`/`MenuGroup`.                                       |
| `disabled`           | `boolean`                           | `false`                 | No       | Disables click events and sets `aria-disabled`.                                                                       |
| `type`               | `string`                            | —                       | No       | Item type string (e.g. `"collapsible"` for items inside a collapsible group).                                         |
| `parentType`         | `MenuGroupType`                     | —                       | No       | **(Internal use)** Type of the parent `MenuGroup`. Injected by `Menu`.                                                |
| `tooltipProps`       | `Omit<ToolTipProps, 'children'>`    | —                       | No       | Attaches a tooltip to the item. See notes below.                                                                      |
| `active`             | `boolean`                           | `false`                 | No       | Highlights the item as the current active/selected item. Sets `aria-current` on button-usage items.                   |
| `focused`            | `boolean`                           | `false`                 | No       | Controls `tabIndex`: `0` when `true`, `-1` when `false`. Managed internally by `Menu`.                                |
| `usage`              | `MenuItemUsage`                     | `MenuItemUsage.BUTTON`  | No       | `"button"` renders as `<button>`; `"link"` renders as `<a>`.                                                          |
| `role`               | `MenuItemRole`                      | `MenuItemRole.MENUITEM` | No       | ARIA role of the inner interactive element.                                                                           |
| `htmlTag`            | `string`                            | `"li"`                  | No       | HTML tag for the outer `FlexItem` wrapper.                                                                            |

### Default Props

| Prop      | Default                 |
| --------- | ----------------------- |
| `usage`   | `MenuItemUsage.BUTTON`  |
| `role`    | `MenuItemRole.MENUITEM` |
| `htmlTag` | `"li"`                  |

### Static Members

`MenuItem` exposes its enums as static properties, matching the pattern used by other Prism components:

```tsx
MenuItem.MenuItemRole // === MenuItemRole enum
MenuItem.MenuItemUsage // === MenuItemUsage enum
```

### Tooltip Notes

- `tooltipProps.content` must be set for the tooltip to render.
- Default `popupPlacement` / `placement` is `"right"` when not specified.
- Use `tooltipProps.oldTooltip: false` to opt into the newer Tooltip API (`placement` instead of `popupPlacement`).
- **Traditional Tooltip wrapping** (e.g. `<Tooltip><MenuItem/></Tooltip>`) does **not** work inside a `Menu`. Use `tooltipProps` instead.

### Accessibility & DOM Behaviour

- When `usage="button"` (default): renders inner element as `<button>` with `aria-current={active}`.
- When `usage="link"`: renders inner element as `<a>` with no `aria-current`.
- `disabled` items set `aria-disabled={true}` (events are suppressed in the click handler; the element remains in the DOM).
- The outer wrapper is always `<li role="none">` (controlled by `htmlTag` default and `FlexItem`), keeping the ARIA list semantics on the parent `<ul>` clean.
- `focused` drives `tabIndex` (`0` = focusable, `-1` = not in tab order). The parent `Menu` manages this to implement roving tabindex.

### Keyboard Navigation (managed by parent `Menu`)

Keyboard handling is implemented by `Menu`, not `MenuItem` itself. When `MenuItem` is used inside a `Menu`:

| Key                    | Behaviour                                                 |
| ---------------------- | --------------------------------------------------------- |
| `ArrowDown`            | Move focus to the next visible menu item                  |
| `ArrowUp`              | Move focus to the previous visible menu item              |
| `ArrowRight`           | Move focus into a submenu (when on a submenu trigger)     |
| `ArrowLeft` / `Escape` | Return focus to the submenu trigger from inside a submenu |
| `Enter` / `Space`      | Activate (click) the focused item                         |
| `Home`                 | Move focus to the first visible item                      |
| `End`                  | Move focus to the last visible item                       |

### Usage Notes

- `MenuItem` is designed to be used inside a `Menu` (or `MenuGroup`). The parent component injects `onClick`, `onFocus`, `handleOnMouseEnter`, `handleOnMouseLeave`, `active`, `assignedKey`, and `focused` automatically.
- Standalone use (outside `Menu`) is possible — supply `onClick` directly in that case.
- Prefer `MenuItem.MenuItemUsage.LINK` for navigation items that change the URL/route; prefer `MenuItem.MenuItemUsage.BUTTON` (the default) for action items.
- Use Prism layout props (`itemSpacing`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing inside the item.
- The `key` prop you pass to `MenuItem` becomes its identifier in `activeKeyPath` / `openKeyMap` — choose stable, unique string or number keys.

<!-- SOURCE-API-END -->

### Examples

#### Minimal working example (inside a stateful component)

```tsx
import React, { useState } from 'react'
import { Menu, MenuItem } from '@nutanix-ui/prism-reactjs'

function BasicMenu() {
  const [activePath, setActivePath] = useState(['1'])

  return (
    <Menu
      activeKeyPath={activePath}
      onClick={(info) => setActivePath(info.keyPath)}
      role={Menu.MenuRole.MENUBAR}
    >
      <MenuItem key="1">Summary</MenuItem>
      <MenuItem key="2">List</MenuItem>
      <MenuItem key="3">Alerts</MenuItem>
    </Menu>
  )
}
```

#### Disabled item with tooltip

```tsx
import { Menu, MenuItem } from '@nutanix-ui/prism-reactjs'
;<Menu role={Menu.MenuRole.MENUBAR}>
  <MenuItem key="1">Summary</MenuItem>
  <MenuItem
    key="2"
    disabled={true}
    tooltipProps={{
      content: 'This action is unavailable',
      oldTooltip: false,
    }}
  >
    Restricted
  </MenuItem>
</Menu>
```

#### Link-usage items (navigation)

```tsx
import { Menu, MenuItem } from '@nutanix-ui/prism-reactjs'
;<Menu role={Menu.MenuRole.MENUBAR}>
  <MenuItem key="1" usage={MenuItem.MenuItemUsage.LINK} href="/dashboard">
    Dashboard
  </MenuItem>
  <MenuItem key="2" usage={MenuItem.MenuItemUsage.LINK} href="/vms">
    VMs
  </MenuItem>
</Menu>
```

#### Item with badge content (rich children)

```tsx
import { Menu, MenuItem, FlexLayout, Badge } from '@nutanix-ui/prism-reactjs'
;<Menu role={Menu.MenuRole.MENUBAR}>
  <MenuItem key="alerts" justifyContent="space-between">
    <span>Alerts</span>
    <FlexLayout itemSpacing="10px">
      <Badge color="red" count="2" />
      <Badge color="yellow" count="25" />
    </FlexLayout>
  </MenuItem>
</Menu>
```
