# Dropdown

## Figma

- **Library name:** Input Menu (page: N/A, frame: Input Menu)
- **Also matches:** Dropdown Actions, Dropdown

## React

Import: `import { Dropdown } from '@nutanix-ui/prism-reactjs'`

### TSX Examples

```tsx
{
  /* Action dropdown with menu — string child auto-wraps in a TEXT_NORMAL Button */
}
;<Dropdown
  popup={
    <Menu appearance={Menu.MenuAppearance.COMPACT}>
      <MenuItem key="edit">Edit</MenuItem>
      <MenuItem key="clone">Clone</MenuItem>
      <MenuItem key="delete">Delete</MenuItem>
    </Menu>
  }
  getPopupContainer={() => document.querySelector('.right-panel')}
>
  Actions
</Dropdown>

{
  /* Icon-button trigger with custom placement and offset */
}
;<Dropdown
  popup={
    <Menu appearance={Menu.MenuAppearance.COMPACT}>
      <MenuItem key="1">Summary</MenuItem>
      <MenuItem key="2">Alerts</MenuItem>
    </Menu>
  }
  popupPlacement="rightTop"
  popupOffset={{ x: '-10px' }}
  getPopupContainer={() => document.querySelector('.right-panel')}
>
  <Button type={Button.ButtonTypes.BORDERLESS} aria-label="Show options">
    <TripleDotVerticalIcon aria-hidden="true" />
  </Button>
</Dropdown>

{
  /* Controlled dropdown — external state drives visibility */
}
;<Dropdown
  popupVisible={dropdownVisible}
  onPopupVisibleChange={setDropdownVisible}
  popup={
    <Menu appearance={Menu.MenuAppearance.COMPACT} onClick={handleMenuClick}>
      <MenuItem key="on">Power On</MenuItem>
      <MenuItem key="off">Power Off</MenuItem>
    </Menu>
  }
  getPopupContainer={() => document.querySelector('.right-panel')}
>
  Actions
</Dropdown>

{
  /* Navigation type */
}
;<Dropdown
  type={DropdownType.NAVIGATION}
  popup={menu}
  getPopupContainer={() => document.querySelector('.right-panel')}
  buttonProps={{ type: Button.ButtonTypes.TEXT_NAVIGATION_SECONDARY }}
>
  Navigation Menu
</Dropdown>
```

### Anti-patterns

- Don't build custom dropdowns with absolute positioning — use `Dropdown`
- Always use `Menu` + `MenuItem` (with `appearance={Menu.MenuAppearance.COMPACT}`) for action lists inside a `Dropdown`
- Don't use `Dropdown` for selection or retaining a selected value — use `Select` instead
- When passing `getPopupContainer`, use it to anchor the popup to a scrollable container (e.g. `.right-panel`) so placement tracks scroll correctly
- Don't nest `Dropdown` inside another `Dropdown`

<!-- SOURCE-API-START -->

### Import

```tsx
import { Dropdown, DropdownType } from '@nutanix-ui/prism-reactjs'
```

`RightClickProvider` is exported separately (see below).

### Enums / Constants

#### `DropdownType`

Import path: `import { DropdownType } from '@nutanix-ui/prism-reactjs'`

| Value                     | String         |
| ------------------------- | -------------- |
| `DropdownType.NAVIGATION` | `'navigation'` |

Use `DropdownType.NAVIGATION` when the dropdown is part of a top-level navigation bar. Pair with `buttonProps={{ type: Button.ButtonTypes.TEXT_NAVIGATION_SECONDARY }}` or `TEXT_NAVIGATION_PRIMARY`.

### Props Interface

#### `DropdownProps`

`DropdownProps` extends `Omit<PopupProviderProps, 'popupPlacement'>`. All `PopupProviderProps` not listed here are passed through to the underlying `PopupProvider`.

| Prop                        | Type                                                                                                                                                                       | Default   | Required | Description                                                                                                                                                                                                                            |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`                  | `React.ReactNode`                                                                                                                                                          | —         | yes      | Trigger element. When a `string` is passed, it is automatically wrapped in a `Button` of type `TEXT_NORMAL` with a chevron icon. When a React element is passed, `disabled`, `onKeyDown`, `onBlur`, and ARIA props are cloned onto it. |
| `popup`                     | `React.ReactNode`                                                                                                                                                          | —         | no       | Content to display in the floating panel. Inherited from `PopupProviderProps`.                                                                                                                                                         |
| `type`                      | `DropdownType`                                                                                                                                                             | —         | no       | Visual variant. Only `DropdownType.NAVIGATION` (`'navigation'`) is defined.                                                                                                                                                            |
| `buttonProps`               | `ButtonProps`                                                                                                                                                              | —         | no       | Extra props merged onto the auto-generated `Button` wrapper when `children` is a string (e.g. `data-test-id`, `type`, `className`).                                                                                                    |
| `action`                    | `'hover' \| 'click' \| 'focus' \| 'contextMenu'` or an array of those                                                                                                      | `'click'` | no       | Trigger event(s) that open/close the popup.                                                                                                                                                                                            |
| `disabled`                  | `boolean`                                                                                                                                                                  | —         | no       | Disables the dropdown. The trigger is rendered as-is but `PopupProvider` is removed entirely. The `disabled` prop is also forwarded to the child element.                                                                              |
| `popupOffset`               | `{ x?: string; y?: string }`                                                                                                                                               | —         | no       | Shifts the popup container. Accepts any CSS length (`px`, `vh`, `em`). The caret is not included in the offset calculation.                                                                                                            |
| `popupPlacement`            | `'auto' \| 'leftTop' \| 'left' \| 'leftBottom' \| 'topLeft' \| 'top' \| 'topRight' \| 'rightTop' \| 'right' \| 'rightBottom' \| 'bottomLeft' \| 'bottom' \| 'bottomRight'` | `'auto'`  | no       | Placement of the popup relative to the trigger. `'auto'` resolves to `'bottomRight'` for string children and `'bottom'` for element children.                                                                                          |
| `wrapComponent`             | `boolean`                                                                                                                                                                  | `true`    | no       | When `true`, wraps `popup` in the styled `.popup-wrapper` container with arrow, keyboard handling, and click-to-close. When `false`, renders `popup` raw and disables automatic event-driven visibility.                               |
| `zIndex`                    | `number`                                                                                                                                                                   | `1610`    | no       | CSS `z-index` of the popup container.                                                                                                                                                                                                  |
| `background`                | `'base' \| 'alt'`                                                                                                                                                          | —         | no       | Background variant for the popup container. Inferred from `BackgroundContext` when not set; prefer the context approach over this prop.                                                                                                |
| `disableKeyboardNavigation` | `boolean`                                                                                                                                                                  | —         | no       | Disables the built-in keyboard navigation inside the open popup.                                                                                                                                                                       |
| `id`                        | `string`                                                                                                                                                                   | auto      | no       | `id` of the popup wrapper `div`. Used as the `aria-controls` target on the trigger. Auto-generated when omitted.                                                                                                                       |
| `noAriaOnChildren`          | `boolean`                                                                                                                                                                  | `false`   | no       | Suppresses injection of `aria-controls`, `aria-expanded`, and `aria-haspopup` onto the trigger element. Use when the child component manages its own ARIA attributes.                                                                  |
| `focusOnOpen`               | `boolean`                                                                                                                                                                  | `true`    | no       | Automatically focuses the first focusable element inside the popup after it opens. Only works when `wrapComponent` is `true`.                                                                                                          |
| `popupVisible`              | `boolean`                                                                                                                                                                  | —         | no       | Controlled visibility. When set, the component is fully controlled and `onPopupVisibleChange` must update it. Inherited from `PopupProviderProps`.                                                                                     |
| `onPopupVisibleChange`      | `(visible: boolean) => void`                                                                                                                                               | —         | no       | Callback fired when popup visibility changes (uncontrolled) or must change (controlled). Inherited from `PopupProviderProps`.                                                                                                          |
| `afterPopupVisibleChange`   | `(visible: boolean) => void`                                                                                                                                               | —         | no       | Callback fired after the transition completes. Inherited from `PopupProviderProps`.                                                                                                                                                    |
| `popupClassName`            | `string`                                                                                                                                                                   | —         | no       | Additional CSS class on the popup root. Inherited from `PopupProviderProps`.                                                                                                                                                           |
| `popupStyle`                | `React.CSSProperties`                                                                                                                                                      | —         | no       | Additional inline styles on the popup root. `zIndex` is merged in automatically. Inherited from `PopupProviderProps`.                                                                                                                  |
| `getPopupContainer`         | `() => HTMLElement \| null`                                                                                                                                                | —         | no       | DOM node that acts as the popup's scroll ancestor. Required whenever the trigger sits inside a scrollable container. Inherited from `PopupProviderProps`.                                                                              |
| `destroyPopupOnHide`        | `boolean`                                                                                                                                                                  | —         | no       | Unmount popup DOM when hidden instead of hiding it with CSS. Inherited from `PopupProviderProps`.                                                                                                                                      |
| `mouseEnterDelay`           | `number`                                                                                                                                                                   | —         | no       | Seconds to delay show on mouse enter (used with `action="hover"`). Inherited from `PopupProviderProps`.                                                                                                                                |
| `mouseLeaveDelay`           | `number`                                                                                                                                                                   | —         | no       | Seconds to delay hide on mouse leave (used with `action="hover"`). Inherited from `PopupProviderProps`.                                                                                                                                |
| `mask`                      | `boolean`                                                                                                                                                                  | —         | no       | Render a backdrop mask behind the popup. Inherited from `PopupProviderProps`.                                                                                                                                                          |
| `maskClosable`              | `boolean`                                                                                                                                                                  | —         | no       | Close popup when mask is clicked. Inherited from `PopupProviderProps`.                                                                                                                                                                 |
| `alignPoint`                | `boolean`                                                                                                                                                                  | —         | no       | Align popup to the cursor position (useful with `action="contextMenu"`). Inherited from `PopupProviderProps`.                                                                                                                          |

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Keyboard Support

The built-in keyboard behaviour follows the [ARIA Menu Button pattern](https://www.w3.org/WAI/ARIA/apg/example-index/menu-button/menu-button-links.html). Keyboard navigation only applies when the popup content uses the `Menu` component.

| Key          | Behaviour                                                                   |
| ------------ | --------------------------------------------------------------------------- |
| `Down Arrow` | Opens menu; moves focus to first menu item                                  |
| `Up Arrow`   | Opens menu; moves focus to last menu item                                   |
| `Space`      | Opens menu; moves focus to first menu item                                  |
| `Enter`      | Opens menu; moves focus to first menu item. If menu already open, closes it |
| `Tab`        | Closes dropdown and shifts focus to the next focusable element              |
| `Escape`     | Closes dropdown and restores focus to the trigger                           |

Focus is automatically restored to the trigger element when the dropdown closes, unless the user has already moved focus elsewhere.

#### Basic Example

```tsx
import { Menu, MenuItem, Dropdown, FlexLayout } from '@nutanix-ui/prism-reactjs'

const menu = (
  <Menu appearance={Menu.MenuAppearance.COMPACT} data-test-id="my-menu">
    <MenuItem key="1">Summary</MenuItem>
    <MenuItem key="2">Alerts</MenuItem>
    <MenuItem key="3">Metrics</MenuItem>
    <MenuItem key="4">Network</MenuItem>
  </Menu>
)

;<FlexLayout data-test-id="default">
  <Dropdown
    popup={menu}
    getPopupContainer={() => document.querySelector('.right-panel')}
    buttonProps={{ 'data-test-id': 'my-action-button' }}
  >
    Actions
  </Dropdown>
</FlexLayout>
```

#### With Disabled Menu Item

```tsx
import { Menu, MenuItem, Dropdown } from '@nutanix-ui/prism-reactjs'

const menu = (
  <Menu appearance={Menu.MenuAppearance.COMPACT}>
    <MenuItem key="1">Summary</MenuItem>
    <MenuItem key="2">Alerts</MenuItem>
    <MenuItem disabled={true} key="3">
      Metrics
    </MenuItem>
    <MenuItem key="4">Network</MenuItem>
    <MenuItem key="5">Health</MenuItem>
  </Menu>
)

;<Dropdown
  popup={menu}
  getPopupContainer={() => document.querySelector('.right-panel')}
>
  Actions
</Dropdown>
```

#### With Divider

```tsx
import {
  Menu,
  MenuItem,
  Dropdown,
  Divider,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'

const menu = (
  <Menu appearance={Menu.MenuAppearance.COMPACT}>
    <MenuItem key="1">Summary</MenuItem>
    <MenuItem key="2">Alerts</MenuItem>
    <StackingLayout style={{ margin: '7px 0', padding: '0 20px 0 10px' }}>
      <Divider type="short" />
    </StackingLayout>
    <MenuItem key="4">Network</MenuItem>
    <MenuItem key="5">Health</MenuItem>
  </Menu>
)

;<Dropdown
  popup={menu}
  getPopupContainer={() => document.querySelector('.right-panel')}
>
  Actions
</Dropdown>
```

#### Icon-Button Trigger with `popupOffset` and `popupPlacement`

```tsx
import {
  Menu,
  MenuItem,
  Button,
  TripleDotVerticalIcon,
  Dropdown,
} from '@nutanix-ui/prism-reactjs'

const menu = (
  <Menu appearance={Menu.MenuAppearance.COMPACT}>
    <MenuItem key="1">Summary</MenuItem>
    <MenuItem key="2">Alerts</MenuItem>
    <MenuItem key="3">Metrics</MenuItem>
  </Menu>
)

;<Dropdown
  popup={menu}
  popupPlacement="rightTop"
  popupOffset={{ x: '-10px' }}
  getPopupContainer={() => document.querySelector('.right-panel')}
>
  <Button type={Button.ButtonTypes.BORDERLESS} aria-label="Show options">
    <TripleDotVerticalIcon aria-hidden="true" />
  </Button>
</Dropdown>
```

#### Disabled Dropdown

```tsx
import {
  Menu,
  MenuItem,
  Button,
  FlexLayout,
  TripleDotVerticalIcon,
  Dropdown,
} from '@nutanix-ui/prism-reactjs'

const menu = (
  <Menu appearance={Menu.MenuAppearance.COMPACT}>
    <MenuItem key="1">Summary</MenuItem>
    <MenuItem key="2">Alerts</MenuItem>
  </Menu>
)

;<FlexLayout alignItems="center">
  <Dropdown disabled={true} popup={menu}>
    Actions
  </Dropdown>
  <Dropdown
    disabled={true}
    popup={menu}
    popupPlacement="rightTop"
    popupOffset={{ x: '-10px' }}
    getPopupContainer={() => document.querySelector('.right-panel')}
  >
    <Button type={Button.ButtonTypes.BORDERLESS} aria-label="Show options">
      <TripleDotVerticalIcon aria-hidden="true" />
    </Button>
  </Dropdown>
</FlexLayout>
```

#### Controlled Dropdown

Use `popupVisible` + `onPopupVisibleChange` to drive visibility from external state.

```tsx
import React from 'react'
import { Menu, MenuItem, Dropdown, FlexLayout } from '@nutanix-ui/prism-reactjs'

function MyDropdown() {
  const [visible, setVisible] = React.useState(false)

  const handleMenuClick = React.useCallback((o) => {
    console.log('clicked', o.key)
    setVisible(false)
  }, [])

  const menu = (
    <Menu onClick={handleMenuClick} appearance={Menu.MenuAppearance.COMPACT}>
      <MenuItem key="on">Power On</MenuItem>
      <MenuItem key="off">Power Off</MenuItem>
      <MenuItem key="migrate">Migrate</MenuItem>
    </Menu>
  )

  return (
    <FlexLayout>
      <Dropdown
        popupVisible={visible}
        onPopupVisibleChange={setVisible}
        popup={menu}
        getPopupContainer={() => document.querySelector('.right-panel')}
      >
        Actions
      </Dropdown>
    </FlexLayout>
  )
}
```

#### Navigation Type

Use `type={DropdownType.NAVIGATION}` (or the string `"navigation"`) for dropdowns inside a top navigation bar. Pair with navigation-specific `Button` types.

```tsx
import React from 'react'
import {
  Button,
  Menu,
  MenuItem,
  Dropdown,
  DropdownType,
  FlexLayout,
} from '@nutanix-ui/prism-reactjs'

const menu = (
  <Menu
    type={Menu.MenuType.SECONDARY}
    appearance={Menu.MenuAppearance.COMPACT}
    role={Menu.MenuRole.MENUBAR}
  >
    <MenuItem key="1">MenuItem 1</MenuItem>
    <MenuItem key="2">MenuItem 2</MenuItem>
    <MenuItem key="3">MenuItem 3</MenuItem>
  </Menu>
)

;<FlexLayout itemGap="XL">
  <Dropdown
    type={DropdownType.NAVIGATION}
    popup={menu}
    getPopupContainer={() => document.querySelector('.right-panel')}
    buttonProps={{ type: Button.ButtonTypes.TEXT_NAVIGATION_SECONDARY }}
  >
    Navigation Menu
  </Dropdown>
</FlexLayout>
```

For alt-background nav bars, wrap in `<StackingLayout background="alt">` — `BackgroundContext` propagates the `alt` value automatically without needing the `background` prop on `Dropdown`.

#### Nested Menus

Use `MenuGroup` with `type="submenu"` for nested menu structures.

```tsx
import {
  Menu,
  MenuItem,
  MenuGroup,
  Dropdown,
  FlexLayout,
} from '@nutanix-ui/prism-reactjs'

const menu = (
  <Menu appearance={Menu.MenuAppearance.COMPACT}>
    <MenuGroup key="main_group">
      <MenuGroup key="power_operations" title="Power Operations" type="submenu">
        <MenuItem key="power_on">Power On</MenuItem>
        <MenuItem key="power_off">Power Off</MenuItem>
        <MenuItem key="restart">Restart</MenuItem>
      </MenuGroup>
      <MenuItem key="clone">Clone</MenuItem>
      <MenuGroup key="migrate" title="Migrate" type="submenu">
        <MenuItem key="across_clusters">Across Clusters</MenuItem>
        <MenuItem key="within_clusters">Within Clusters</MenuItem>
      </MenuGroup>
    </MenuGroup>
  </Menu>
)

;<Dropdown
  popup={menu}
  getPopupContainer={() => document.querySelector('.right-panel')}
  buttonProps={{ 'data-test-id': 'nested-menu-primary' }}
>
  Actions
</Dropdown>
```

### `RightClickProvider`

A companion component for context-menu (right-click) anchoring. It wraps `PopupProvider` with `action="contextMenu"`, `alignPoint={true}`, and `destroyPopupOnHide={true}` pre-configured.

```tsx
import { RightClickProvider, Menu, MenuItem } from '@nutanix-ui/prism-reactjs'
;<RightClickProvider
  popup={
    <Menu appearance={Menu.MenuAppearance.COMPACT}>
      <MenuItem key="1">Summary</MenuItem>
      <MenuItem key="2">Alerts</MenuItem>
    </Menu>
  }
>
  <div>Right-click here</div>
</RightClickProvider>
```

`RightClickProvider` accepts the same `PopupProviderProps` as `Dropdown` (excluding the Dropdown-specific props). By design, right-click is a mouse-only shortcut — always provide a primary keyboard-accessible path for the same actions.

### Usage Notes

- Always set `appearance={Menu.MenuAppearance.COMPACT}` on `Menu` when it is used inside a `Dropdown`.
- Prefer `DropdownType.NAVIGATION` constant over the raw string `'navigation'`.
- Use `getPopupContainer` whenever the trigger is inside a scrollable container to prevent misaligned popups.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing inside the popup.
- The `background` prop is discouraged for direct use; rely on `BackgroundContext` via a parent layout component with the `background` prop instead.
- `wrapComponent={false}` disables the styled container and all automatic event handling — only use this for fully custom popup rendering.

<!-- SOURCE-API-END -->
