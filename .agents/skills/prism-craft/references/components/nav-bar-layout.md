# NavBarLayout

## Figma

- **Library name:** App Bar (page: Navigation, frame: Navigation)
- **Figma spec:** https://www.figma.com/file/KVbKkR0QAFRbTVpwysQLWw/Spec-Library?version-id=3368532166&node-id=21246-165857
- Represents the top application header/navigation bar.

## React

Import: `import { NavBarLayout } from '@nutanix-ui/prism-reactjs'`

### Enums

```ts
NavBarLayoutTypes.CENTER // "center"
NavBarLayoutTypes.LEFT // "left"

// Accessed as static members:
NavBarLayout.NavBarLayoutTypes.CENTER
NavBarLayout.NavBarLayoutTypes.LEFT

// Deprecated alias (do not use in new code):
NavBarLayout.LAYOUTS.CENTER
NavBarLayout.LAYOUTS.LEFT
```

### Props

`NavBarLayoutProps` extends `Omit<FlexLayoutProps, 'title'>`, so all `FlexLayout` props (except `title`) are also valid and are forwarded to the root `FlexLayout` element (including arbitrary HTML attributes like `data-test`).

| Prop              | Type                                  | Default                                                     | Required | Notes                                                                                                                                                   |
| ----------------- | ------------------------------------- | ----------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `layout`          | `NavBarLayoutTypes`                   | `NavBarLayoutTypes.CENTER`                                  | No       | Controls cell order/arrangement. `CENTER` puts the logo in the center; `LEFT` puts it on the left.                                                      |
| `logoIcon`        | `ReactNode`                           | `<NutanixLogoIcon aria-label="Logo Icon" color="gray-1" />` | No       | App logo cell. Position depends on `layout`.                                                                                                            |
| `menuIcon`        | `ReactNode`                           | `<MenuIcon aria-label="Menu Icon" color="dark" />`          | No       | Left-most cell. Only visible when `layout="center"`.                                                                                                    |
| `searchInput`     | `ReactNode`                           | —                                                           | No       | 2nd cell from the left. Only visible when `layout="center"`.                                                                                            |
| `title`           | `ReactNode`                           | —                                                           | No       | App name cell. 2nd cell from the left. Only visible when `layout="left"`.                                                                               |
| `menuItems`       | `{ key: string; label: ReactNode }[]` | —                                                           | No       | Top-nav links rendered as a `<ul>` landmark. Only rendered when `layout="left"`.                                                                        |
| `eventsTasksInfo` | `ReactNode`                           | —                                                           | No       | Events/alerts/tasks summary cell. Position depends on `layout`.                                                                                         |
| `accountActions`  | `ReactNode`                           | —                                                           | No       | Action icon cell (search, help, settings, etc.). Position depends on `layout`. In `LEFT` layout, separated from `accountInfo` by a `VerticalSeparator`. |
| `accountInfo`     | `ReactNode`                           | —                                                           | No       | Right-most cell. Always present in both layouts.                                                                                                        |
| `className`       | `string`                              | —                                                           | No       | Additional CSS class name on the root element.                                                                                                          |
| `aria-label`      | `string`                              | —                                                           | No       | Accessible name for the `role="navigation"` landmark. Only applied when `menuItems` are present and `layout="left"`.                                    |

### Layout Behaviour

#### `CENTER` layout (default)

Left region (left-to-right): `menuIcon` → `searchInput`  
Center region: `logoIcon`  
Right region: `eventsTasksInfo` → `accountInfo`

- `menuIcon` and `searchInput` are only visible in this layout.
- `title`, `menuItems`, and `accountActions` are **not rendered** in CENTER layout.

#### `LEFT` layout

Left region (left-to-right): `logoIcon` → (VerticalSeparator) → `title` → `menuItems` → `eventsTasksInfo`  
Right region: `accountActions` → (VerticalSeparator) → `accountInfo`

- `menuIcon` and `searchInput` are **not rendered** in LEFT layout.
- `title`, `eventsTasksInfo`, and `accountActions` are conditionally rendered — each slot is omitted when its prop is `undefined`.
- `menuItems` renders a `<ul class="horizontal-menu-list">` of `<li class="menu-item">` elements inside a `role="navigation"` landmark.

### Accessibility

- When `menuItems` is provided and `layout="left"`, the menu container receives `role="navigation"`.
- `aria-label` is applied to that `role="navigation"` element. Without it, the landmark has no accessible name; always provide a meaningful value (e.g. `"Main"`).
- Individual menu items should use native anchor/link elements to ensure keyboard navigability.

### TSX Examples

#### Minimal working example (CENTER layout — default)

```tsx
import { NavBarLayout } from '@nutanix-ui/prism-reactjs'
;<NavBarLayout />
```

#### CENTER layout with search, alerts, and account info

```tsx
import {
  NavBarLayout,
  Link,
  FlexLayout,
  AlertIcon,
  Badge,
  Input,
  Favorite,
  MagGlassIcon,
  ThemeManager,
} from '@nutanix-ui/prism-reactjs'

const account = <Link type={Link.LINK_TYPE.INFO}>van@nutanix.com</Link>

const alerts = (
  <FlexLayout itemSpacing="10px" alignItems="center">
    <AlertIcon
      aria-label="Alert Icon"
      size="large"
      color={ThemeManager.getVar('red-1')}
    />
    <Badge count={8} color="red" />
  </FlexLayout>
)

;<NavBarLayout
  accountInfo={account}
  eventsTasksInfo={alerts}
  searchInput={
    <Input
      title="Search Input"
      placeholder="Search Input"
      suffix={
        <Favorite aria-label="Favorite Icon" background="dark" checked={true} />
      }
      prefix={
        <MagGlassIcon
          aria-label="Search Icon"
          color={ThemeManager.getVar('gray-2')}
        />
      }
    />
  }
/>
```

#### CENTER layout with custom logo (PrismLogoIcon) and search

```tsx
import {
  NavBarLayout,
  Link,
  FlexLayout,
  AlertIcon,
  Badge,
  Input,
  Favorite,
  MagGlassIcon,
  ThemeManager,
  Progress,
  Menu,
  MenuItem,
  Dropdown,
  PrismLogoIcon,
} from '@nutanix-ui/prism-reactjs'

const linkWithDropDown = (
  <Dropdown
    popup={
      <Menu appearance={Menu.MenuAppearance.COMPACT}>
        <MenuItem key="1">Summary</MenuItem>
        <MenuItem key="2">Alerts</MenuItem>
        <MenuItem key="3">Metrics</MenuItem>
      </Menu>
    }
  >
    <FlexLayout>
      <Link type={Link.LINK_TYPE.EXPANDABLE}>Name</Link>
    </FlexLayout>
  </Dropdown>
)

const alerts = (
  <FlexLayout alignItems="center">
    <FlexLayout itemSpacing="10px" alignItems="center">
      <AlertIcon
        aria-label="Alert icon"
        size="large"
        color={ThemeManager.getVar('red-1')}
      />
      <Badge count={1} color="red" />
    </FlexLayout>
    <FlexLayout itemSpacing="10px" alignItems="center">
      <Progress percent={50} type={Progress.TYPE.CIRCLE} />
      <Badge count={2} color="blue" />
    </FlexLayout>
  </FlexLayout>
)

;<NavBarLayout
  accountInfo={linkWithDropDown}
  eventsTasksInfo={alerts}
  logoIcon={
    <Link
      type="with-icon"
      icon={<PrismLogoIcon color={ThemeManager.getVar('gray-3')} />}
      style={{ display: 'flex' }}
    >
      Prism
    </Link>
  }
  searchInput={
    <div className="theme-dark">
      <Input
        title="Search here..."
        placeholder="Search here..."
        suffix={
          <Favorite
            aria-label="Favorite icon"
            background="dark"
            checked={true}
          />
        }
        prefix={
          <MagGlassIcon
            aria-label="MagGlass icon"
            color={ThemeManager.getVar('gray-2')}
          />
        }
      />
    </div>
  }
/>
```

#### LEFT layout with logo, title, menu items, account actions, and account info

```tsx
import {
  NavBarLayout,
  Link,
  FlexLayout,
  AlertIcon,
  Badge,
  MagGlassIcon,
  ThemeManager,
  QuestionIcon,
  SettingsIcon,
  NutanixLogoIcon,
} from '@nutanix-ui/prism-reactjs'

const alerts = (
  <FlexLayout itemSpacing="10px" alignItems="center">
    <AlertIcon
      aria-label="Alert Icon"
      size="large"
      color={ThemeManager.getVar('red-1')}
    />
    <Badge count={8} color="red" />
  </FlexLayout>
)

const accountActions = (
  <FlexLayout itemSpacing="15px">
    <MagGlassIcon aria-label="MagGlass Icon" color="dark" />
    <QuestionIcon aria-label="Question Icon" color="dark" />
    <SettingsIcon aria-label="Settings Icon" color="dark" />
  </FlexLayout>
)

const account = <Link type={Link.LINK_TYPE.INFO}>van@nutanix.com</Link>

const menuItems = [
  { key: 'home', label: <Link href="#">Home</Link> },
  { key: 'analysis', label: <Link href="#">Analysis</Link> },
  { key: 'history', label: <Link href="#">History</Link> },
]

;<NavBarLayout
  accountActions={accountActions}
  accountInfo={account}
  eventsTasksInfo={alerts}
  layout={NavBarLayout.NavBarLayoutTypes.LEFT}
  logoIcon={
    <Link href="#" aria-label="Introduction page" style={{ display: 'flex' }}>
      <NutanixLogoIcon color="gray-1" />
    </Link>
  }
  menuItems={menuItems}
  title="Xi-Sense"
/>
```

#### LEFT layout with dropdown menu items and badge alerts

```tsx
import {
  NavBarLayout,
  Link,
  FlexLayout,
  AlertIcon,
  Badge,
  MagGlassIcon,
  ThemeManager,
  QuestionIcon,
  SettingsIcon,
  Menu,
  MenuItem,
  Dropdown,
  Progress,
} from '@nutanix-ui/prism-reactjs'

const menu = (
  <Menu appearance={Menu.MenuAppearance.COMPACT}>
    <MenuItem key="1">Summary</MenuItem>
    <MenuItem key="2">Alerts</MenuItem>
    <MenuItem key="3">Metrics</MenuItem>
    <MenuItem key="4">Network</MenuItem>
    <MenuItem key="5">Health</MenuItem>
  </Menu>
)

const linkWithDropDown = (
  <Dropdown popup={menu}>
    <FlexLayout>
      <Link type={Link.LINK_TYPE.EXPANDABLE}>Link</Link>
    </FlexLayout>
  </Dropdown>
)

const alerts = (
  <FlexLayout alignItems="center">
    <FlexLayout itemSpacing="10px" alignItems="center">
      <AlertIcon
        aria-label="Alert Icon"
        size="large"
        color={ThemeManager.getVar('red-1')}
      />
      <Badge count={1} color="red" />
    </FlexLayout>
    <FlexLayout itemSpacing="10px" alignItems="center">
      <Progress percent={50} type={Progress.TYPE.CIRCLE} />
      <Badge count={2} color="blue" />
    </FlexLayout>
  </FlexLayout>
)

const accountActions = (
  <FlexLayout itemSpacing="15px">
    <MagGlassIcon aria-label="MagGlass Icon" color="dark" />
    <QuestionIcon aria-label="Question Icon" color="dark" />
    <SettingsIcon aria-label="Settings Icon" color="dark" />
  </FlexLayout>
)

const menuItems = [{ key: 'link', label: linkWithDropDown }]

;<NavBarLayout
  accountActions={accountActions}
  accountInfo={linkWithDropDown}
  eventsTasksInfo={alerts}
  layout={NavBarLayout.NavBarLayoutTypes.LEFT}
  menuItems={menuItems}
  title="demo-ahv"
/>
```

#### LEFT layout with accessible navigation landmark

```tsx
import { NavBarLayout, Link } from '@nutanix-ui/prism-reactjs'

const menuItems = [
  { key: 'dashboard', label: <Link href="#">Dashboard</Link> },
  { key: 'clusters', label: <Link href="#">Clusters</Link> },
  { key: 'storage', label: <Link href="#">Storage</Link> },
  { key: 'settings', label: <Link href="#">Settings</Link> },
]

// aria-label value will appear as "Main navigation" in landmarks tools.
;<NavBarLayout
  aria-label="Main"
  layout={NavBarLayout.NavBarLayoutTypes.LEFT}
  menuItems={menuItems}
  title="Prism Central"
/>
```

### Anti-patterns

- Don't build custom nav bars with `<header>` — use `NavBarLayout`.
- Use `ICON_NAVIGATION` button types for icons placed in the nav bar.
- Don't use `NavBarLayout.LAYOUTS` in new code — it is deprecated; use `NavBarLayout.NavBarLayoutTypes`.
- Don't pass `title` or `menuItems` when using `layout="center"` — those slots are not rendered in CENTER layout.
- Don't omit `aria-label` when providing `menuItems` in LEFT layout — the navigation landmark will be unlabelled.

<!-- SOURCE-API-START -->

### Import

```tsx
import { NavBarLayout } from '@nutanix-ui/prism-reactjs'
```

### Enums / Constants

#### `NavBarLayoutTypes`

- `CENTER` = `"center"` — logo centered, menu/search on left, events/account on right
- `LEFT` = `"left"` — logo left-aligned, title + horizontal menu in left region

### Props Interfaces

#### `NavBarLayoutProps`

Extends: `Omit<FlexLayoutProps, 'title'>`

All props are optional.

| Prop              | Type                                        | Default                                                     | Description                                                                                                                                                                                |
| ----------------- | ------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `accountActions`  | `React.ReactNode`                           | —                                                           | Cell reserved for displaying account action icons (search, help, settings). Position depends on `layout` value. Only separated from `accountInfo` by a `VerticalSeparator` in LEFT layout. |
| `accountInfo`     | `React.ReactNode`                           | —                                                           | Cell reserved for displaying account info. Always the right-most cell.                                                                                                                     |
| `className`       | `string`                                    | —                                                           | Additional custom class name on the root element.                                                                                                                                          |
| `eventsTasksInfo` | `React.ReactNode`                           | —                                                           | Cell reserved for displaying events/alert/tasks summaries. Position depends on `layout` value. Conditionally omitted in LEFT layout when undefined.                                        |
| `layout`          | `NavBarLayoutTypes`                         | `NavBarLayoutTypes.CENTER`                                  | Controls the order of the cells.                                                                                                                                                           |
| `logoIcon`        | `React.ReactNode`                           | `<NutanixLogoIcon aria-label="Logo Icon" color="gray-1" />` | Cell reserved for displaying the app's logo. Position depends on `layout` value.                                                                                                           |
| `menuIcon`        | `React.ReactNode`                           | `<MenuIcon aria-label="Menu Icon" color="dark" />`          | Left-most cell. Only visible when `layout="center"`.                                                                                                                                       |
| `menuItems`       | `{ key: string; label: React.ReactNode }[]` | —                                                           | Navigation menu items rendered as a `<ul>` inside a `role="navigation"` landmark. Only rendered in LEFT layout.                                                                            |
| `aria-label`      | `string`                                    | —                                                           | Accessible name for the `role="navigation"` landmark. Only applied when `menuItems` are present and `layout="left"`.                                                                       |
| `searchInput`     | `React.ReactNode`                           | —                                                           | 2nd cell from the left. Only visible when `layout="center"`.                                                                                                                               |
| `title`           | `React.ReactNode`                           | —                                                           | App title cell. 2nd cell from the left. Only visible when `layout="left"`. Conditionally omitted when undefined.                                                                           |

### Static Members

- `NavBarLayout.NavBarLayoutTypes` = `NavBarLayoutTypes` — use for layout enum values
- `NavBarLayout.LAYOUTS` = `NavBarLayoutTypes` — **deprecated**; use `NavBarLayout.NavBarLayoutTypes`

### DOM / CSS Notes

- Root element receives class `ntnx-nav-bar-layout` (prefixed by `ThemeManager.getVar('classPrefix')`).
- In LEFT layout, `menuItems` renders as `div.horizontal-menu[role="navigation"] > ul.horizontal-menu-list > li.menu-item`.
- Arbitrary HTML attributes (e.g. `data-test`) are forwarded to the root `FlexLayout` element via `...props` spread.

### Usage Notes

- Prefer `NavBarLayout.NavBarLayoutTypes.<VALUE>` over raw strings when setting `layout`.
- In LEFT layout, `title`, `eventsTasksInfo`, and `accountActions` are conditionally rendered — they are omitted entirely when their prop is `undefined`.
- In CENTER layout, `menuIcon` and `searchInput` cells are always rendered even if the props are `undefined` (the cells exist but are empty).
- Use Prism layout props (`itemSpacing`, `alignItems`, `justifyContent`) inside slot content instead of custom CSS.

<!-- SOURCE-API-END -->
