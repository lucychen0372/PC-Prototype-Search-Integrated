# MainPageLayout

## Figma

- **Library name:** Page Layout (page: Layout, frame: Layout)
- **Also matches:** LeftNavLayout, HeaderFooterLayout
- Represents the top-level page structure with header, sidebar, and body.

## React

Import: `import { MainPageLayout, LeftNavLayout, HeaderFooterLayout } from '@nutanix-ui/prism-reactjs'`

### Props (MainPageLayout)

`MainPageLayoutProps extends FlexLayoutProps`

All `FlexLayout` props (e.g. `padding`, `itemGap`, `flexDirection`, `alignItems`, etc.) are also accepted and forwarded to the root `FlexLayout`.

| Prop               | Type              | Default | Required | Notes                                                                                                                                                                             |
| ------------------ | ----------------- | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `className`        | `string`          | —       | No       | Additional CSS class on the root element.                                                                                                                                         |
| `header`           | `React.ReactNode` | —       | No       | Top bar content (typically `NavBarLayout`).                                                                                                                                       |
| `leftPanel`        | `React.ReactNode` | —       | No       | Left sidebar content (typically `Menu`). Omit entirely to render without a sidebar.                                                                                               |
| `leftPanelVisible` | `boolean`         | `true`  | No       | Toggles left panel visibility. When `false`, the panel receives `inert="true"` and `aria-hidden="true"` so it is removed from the tab order and hidden from assistive technology. |
| `body`             | `React.ReactNode` | —       | No       | Main content area. Grows to fill remaining space (`flexGrow="1"`).                                                                                                                |
| `bodyCompressed`   | `boolean`         | `false` | No       | When `true` and the left panel is visible, the body content width is compressed to stay within the viewable area rather than extending behind the panel.                          |
| `fullPage`         | `boolean`         | —       | No       | Applies absolute positioning so the layout fills all available space. Treated as a CSS style modifier (boolean), not a content node.                                              |

> **Note:** The doc previously listed `rightPanel` and `footer` props for `MainPageLayout` — these **do not exist** in the source. Use `HeaderFooterLayout` or `LeftNavLayout` for those patterns instead.

### Props (LeftNavLayout)

`LeftNavLayoutProps extends FlexLayoutProps`

| Prop               | Type              | Default | Required | Notes                                                     |
| ------------------ | ----------------- | ------- | -------- | --------------------------------------------------------- |
| `className`        | `string`          | —       | No       | Additional CSS class.                                     |
| `leftPanel`        | `React.ReactNode` | —       | No       | Left-side content (typically a `Menu`).                   |
| `rightBodyContent` | `React.ReactNode` | —       | No       | Right-side (body) content. Grows to fill remaining width. |

> **Note:** `LeftNavLayout` has no `body` or `header` prop. The right content prop is named `rightBodyContent`.

### Props (HeaderFooterLayout)

`HeaderFooterLayoutProps extends FlexLayoutProps`

| Prop               | Type              | Default | Required | Notes                                                                                               |
| ------------------ | ----------------- | ------- | -------- | --------------------------------------------------------------------------------------------------- |
| `className`        | `string`          | —       | No       | Additional CSS class.                                                                               |
| `header`           | `React.ReactNode` | —       | No       | Header element rendered at 40 px height.                                                            |
| `bodyContent`      | `React.ReactNode` | —       | **Yes**  | Body element. Scrolls on overflow. This is the **primary** content prop — there is no `body` alias. |
| `footer`           | `React.ReactNode` | —       | No       | Footer element rendered at 40 px height.                                                            |
| `headerProps`      | `FlexLayoutProps` | —       | No       | Extra `FlexLayout` props applied to the header row.                                                 |
| `footerProps`      | `FlexLayoutProps` | —       | No       | Extra `FlexLayout` props applied to the footer row.                                                 |
| `bodyContentProps` | `FlexLayoutProps` | —       | No       | Extra `FlexLayout` props applied to the body content row.                                           |

> **Note:** `bodyContent` is required. The doc previously listed a `body` / `bodyContent` alias pattern — only `bodyContent` exists in the source.

### TSX Examples

#### Minimal app shell (no left nav)

```tsx
import { MainPageLayout, NavBarLayout } from '@nutanix-ui/prism-reactjs'
;<MainPageLayout header={<NavBarLayout title="My App" />} body={<Outlet />} />
```

#### Full app shell with toggleable left panel

```tsx
import React from 'react'
import {
  MainPageLayout,
  Link,
  FlexLayout,
  StackingLayout,
  Table,
  Sorter,
  AlertIcon,
  Badge,
  ThemeManager,
  NavBarLayout,
  Input,
  Favorite,
  MagGlassIcon,
  Menu,
  MenuController,
  MenuItem,
  Alert,
} from '@nutanix-ui/prism-reactjs'

const account = (
  <Link
    type={Link.LINK_TYPE.INFO}
    style={{ color: 'var(--color-text-nav-secondary-interactive)' }}
  >
    ui@nutanix.com
  </Link>
)

const alerts = (
  <FlexLayout itemSpacing="10px" alignItems="center">
    <AlertIcon size="large" color="var(--color-background-nav-error)" />
    <Badge count={8} color="var(--color-background-nav-error)" />
  </FlexLayout>
)

const leftPanel = (
  <Menu padding="20px-0px" theme="dark" activeKeyPath={['1']}>
    <MenuItem key="1">Summary</MenuItem>
    <MenuItem key="2">List</MenuItem>
    <MenuItem key="3">Alerts</MenuItem>
  </Menu>
)

const columns = [
  { title: 'Name', key: 'name' },
  { title: 'Age', key: 'age' },
  { title: 'Address', key: 'address' },
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
  { key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park' },
]

const body = (
  <StackingLayout padding="20px">
    <Table
      rowKey="key"
      dataSource={data}
      columns={columns}
      sort={{
        order: Sorter.SORT_ORDER_CONST.ASCEND,
        sortable: ['name'],
      }}
    />
  </StackingLayout>
)

class MainPageLayoutExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = { leftPanelVisible: true }
    this.handleOnClickMenuIcon = this.handleOnClickMenuIcon.bind(this)
  }

  render() {
    const header = (
      <NavBarLayout
        accountInfo={account}
        eventsTasksInfo={alerts}
        menuIcon={
          <MenuController
            open={this.state.leftPanelVisible}
            onClick={this.handleOnClickMenuIcon}
          />
        }
        searchInput={
          <Input
            placeholder="Search Input"
            theme="dark"
            suffix={<Favorite background="dark" checked={true} />}
            prefix={<MagGlassIcon color={ThemeManager.getVar('gray-2')} />}
          />
        }
      />
    )
    return (
      <MainPageLayout
        header={header}
        leftPanel={leftPanel}
        leftPanelVisible={this.state.leftPanelVisible}
        body={body}
        data-test-id="default"
      />
    )
  }

  handleOnClickMenuIcon() {
    this.setState({ leftPanelVisible: !this.state.leftPanelVisible })
  }
}
```

#### Compressed body (body stays within viewable area while left panel is open)

```tsx
// Same setup as above; add bodyCompressed={ true }
<MainPageLayout
  header={header}
  leftPanel={leftPanel}
  leftPanelVisible={this.state.leftPanelVisible}
  body={body}
  bodyCompressed={true}
  data-test-id="compressed-body"
/>
```

#### Full page (absolute positioning)

```tsx
<MainPageLayout
  fullPage={true}
  header="Header goes here"
  body="Body goes here"
/>
```

#### LeftNavLayout — basic usage

```tsx
import { LeftNavLayout, Menu, MenuItem } from '@nutanix-ui/prism-reactjs'

const leftPanel = (
  <Menu activeKeyPath={['1']}>
    <MenuItem key="1">Summary</MenuItem>
    <MenuItem key="2">List</MenuItem>
    <MenuItem key="3">Alerts</MenuItem>
  </Menu>
)

;<LeftNavLayout leftPanel={leftPanel} rightBodyContent="Body Content Here" />
```

#### HeaderFooterLayout — with header, footer, and custom section props

```tsx
import {
  HeaderFooterLayout,
  Title,
  FlexLayout,
  Select,
} from '@nutanix-ui/prism-reactjs'

const header = (
  <FlexLayout justifyContent="space-between" alignItems="center">
    <Title size="h3">Widget Title</Title>
    <Select
      autoSize={true}
      type="mini"
      rowsData={menuItems}
      selectedRow={menuItems[0]}
    />
  </FlexLayout>
)

;<div style={{ height: 200 }}>
  <HeaderFooterLayout
    itemSpacing="0px"
    header={header}
    headerProps={{ itemFlexBasis: '100pc' }}
    footer=<Title size="h3">Footer</Title>
    footerProps={{ justifyContent: 'center' }}
    bodyContent="The body content goes here."
  />
</div>
```

### Accessibility & Behaviour

- When `leftPanelVisible={false}`, the left panel DOM node is kept in the tree but receives `inert="true"` and `aria-hidden="true"`, making it inert to pointer events, keyboard focus, and assistive technology.
- Tab order (with left panel open): `MenuController` → search `Input` → `Favorite` checkbox → account info `Link` → first `MenuItem` → sortable column header.
- Tab order (with left panel closed): same sequence but `MenuItem` items are skipped because the panel is inert.
- `Space` on a focused `MenuController` toggles the left panel.

### Anti-patterns

- Don't create custom page layout with `<div>` grids — use `MainPageLayout`.
- Don't nest `MainPageLayout` inside another `MainPageLayout`.
- Don't pass content to `fullPage` as a node — it is a `boolean` flag, not a slot.
- Don't use `body` or `header` as props on `LeftNavLayout` — use `rightBodyContent` for the body slot.
- Don't use a `body` alias on `HeaderFooterLayout` — the only valid prop name is `bodyContent` (required).

<!-- SOURCE-API-START -->

### Import

```tsx
import {
  MainPageLayout,
  LeftNavLayout,
  HeaderFooterLayout,
} from '@nutanix-ui/prism-reactjs'
```

### Props Interfaces

#### `MainPageLayoutProps`

Extends: `FlexLayoutProps`

| Prop               | Type              | Default | Description                                                               |
| ------------------ | ----------------- | ------- | ------------------------------------------------------------------------- |
| `className`        | `string`          | —       | Additional custom class name.                                             |
| `fullPage`         | `boolean`         | —       | Applies absolute positioning to encompass all available layout space.     |
| `header`           | `React.ReactNode` | —       | Content for the header.                                                   |
| `leftPanel`        | `React.ReactNode` | —       | Content for the left panel.                                               |
| `leftPanelVisible` | `boolean`         | `true`  | Visibility of left panel. When `false`, panel is inert and `aria-hidden`. |
| `body`             | `React.ReactNode` | —       | Content for the body.                                                     |
| `bodyCompressed`   | `boolean`         | `false` | Compress body width while left panel is visible.                          |

#### `LeftNavLayoutProps`

Extends: `FlexLayoutProps`

| Prop               | Type              | Default | Description                        |
| ------------------ | ----------------- | ------- | ---------------------------------- |
| `className`        | `string`          | —       | Additional class name.             |
| `leftPanel`        | `React.ReactNode` | —       | Content for the left panel.        |
| `rightBodyContent` | `React.ReactNode` | —       | Content for the right (body) area. |

#### `HeaderFooterLayoutProps`

Extends: `FlexLayoutProps`

| Prop               | Type              | Default | Required | Description                                             |
| ------------------ | ----------------- | ------- | -------- | ------------------------------------------------------- |
| `className`        | `string`          | —       | No       | Additional class name.                                  |
| `header`           | `React.ReactNode` | —       | No       | Header element (40 px height).                          |
| `bodyContent`      | `React.ReactNode` | —       | **Yes**  | Body element. Scrolls on overflow.                      |
| `footer`           | `React.ReactNode` | —       | No       | Footer element (40 px height).                          |
| `headerProps`      | `FlexLayoutProps` | —       | No       | Extra props applied to the header `FlexLayout` wrapper. |
| `footerProps`      | `FlexLayoutProps` | —       | No       | Extra props applied to the footer `FlexLayout` wrapper. |
| `bodyContentProps` | `FlexLayoutProps` | —       | No       | Extra props applied to the body `FlexLayout` wrapper.   |

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Basic Example

```tsx
import React from 'react'
import {
  MainPageLayout,
  Link,
  FlexLayout,
  StackingLayout,
  Table,
  Sorter,
  AlertIcon,
  Badge,
  ThemeManager,
  NavBarLayout,
  Input,
  Favorite,
  MagGlassIcon,
  Menu,
  MenuController,
  MenuItem,
  Alert,
} from '@nutanix-ui/prism-reactjs'

const account = (
  <Link
    type={Link.LINK_TYPE.INFO}
    style={{ color: 'var(--color-text-nav-secondary-interactive)' }}
  >
    ui@nutanix.com
  </Link>
)

const alerts = (
  <FlexLayout itemSpacing="10px" alignItems="center">
    <AlertIcon size="large" color="var(--color-background-nav-error)" />
    <Badge count={8} color="var(--color-background-nav-error)" />
  </FlexLayout>
)

const leftPanel = (
  <Menu padding="20px-0px" theme="dark" activeKeyPath={['1']}>
    <MenuItem key="1">Summary</MenuItem>
    <MenuItem key="2">List</MenuItem>
    <MenuItem key="3">Alerts</MenuItem>
  </Menu>
)

const columns = [
  { title: 'Name', key: 'name' },
  { title: 'Age', key: 'age' },
  { title: 'Address', key: 'address' },
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
  { key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park' },
]

const body = (
  <StackingLayout padding="20px">
    <Table
      rowKey="key"
      dataSource={data}
      columns={columns}
      sort={{
        order: Sorter.SORT_ORDER_CONST.ASCEND,
        sortable: ['name'],
      }}
    />
  </StackingLayout>
)

class MainPageLayoutExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = { leftPanelVisible: true }
    this.handleOnClickMenuIcon = this.handleOnClickMenuIcon.bind(this)
  }

  render() {
    const header = (
      <NavBarLayout
        accountInfo={account}
        eventsTasksInfo={alerts}
        menuIcon={
          <MenuController
            open={this.state.leftPanelVisible}
            onClick={this.handleOnClickMenuIcon}
          />
        }
        searchInput={
          <Input
            placeholder="Search Input"
            theme="dark"
            suffix={<Favorite background="dark" checked={true} />}
            prefix={<MagGlassIcon color={ThemeManager.getVar('gray-2')} />}
          />
        }
      />
    )
    return (
      <MainPageLayout
        header={header}
        leftPanel={leftPanel}
        leftPanelVisible={this.state.leftPanelVisible}
        body={body}
        data-test-id="default"
      />
    )
  }

  handleOnClickMenuIcon() {
    this.setState({ leftPanelVisible: !this.state.leftPanelVisible })
  }
}

;<StackingLayout>
  <Alert
    inline={true}
    type={Alert.AlertTypes.INFO}
    showCloseIcon={false}
    message="Click the hamburger menu icon on the top left corner of the header to open and close the left navigation panel."
  />
  <MainPageLayoutExample />
</StackingLayout>
```

#### Compressed Body Example

```tsx
// Same as Basic Example but with bodyCompressed={ true }
<MainPageLayout
  header={header}
  leftPanel={leftPanel}
  leftPanelVisible={this.state.leftPanelVisible}
  body={body}
  bodyCompressed={true}
  data-test-id="compressed-body"
/>
```

#### Basic Structure Example

```tsx
import React from 'react'
import { Badge, MainPageLayout } from '@nutanix-ui/prism-reactjs'

const DevNote = ({ color, label }) => (
  <div style={{ padding: 5 }}>
    <Badge count={label} color={color} />
  </div>
)

;<MainPageLayout
  header={
    <div style={{ height: '50px', color: 'white' }}>
      <DevNote color="blue" label="Header Content Goes Here" />
    </div>
  }
  leftPanel={
    <div style={{ height: '50px', color: 'white' }}>
      <DevNote color="gray" label="Left Panel Content Goes Here" />
    </div>
  }
  body={
    <div style={{ height: '50px' }}>
      <DevNote color="green" label="Body Content Goes Here" />
    </div>
  }
/>
```

#### Basic Structure without Left Panel Example

```tsx
import React from 'react'
import { Badge, MainPageLayout } from '@nutanix-ui/prism-reactjs'

const DevNote = ({ color, label }) => (
  <div style={{ padding: 5 }}>
    <Badge count={label} color={color} />
  </div>
)

;<MainPageLayout
  header={
    <div style={{ height: '50px', color: 'white' }}>
      <DevNote color="blue" label="Header Content Goes Here" />
    </div>
  }
  body={
    <div style={{ height: '50px' }}>
      <DevNote color="green" label="Body Content Goes Here" />
    </div>
  }
/>
```

#### LeftNavLayout — Basic Usage

```tsx
import { LeftNavLayout, Menu, MenuItem } from '@nutanix-ui/prism-reactjs'

const leftPanel = (
  <Menu activeKeyPath={['1']}>
    <MenuItem key="1">Summary</MenuItem>
    <MenuItem key="2">List</MenuItem>
    <MenuItem key="3">Alerts</MenuItem>
  </Menu>
)

;<LeftNavLayout leftPanel={leftPanel} rightBodyContent="Body Content Here" />
```

#### LeftNavLayout — With event handling

```tsx
import React from 'react'
import { LeftNavLayout, Menu, MenuItem } from '@nutanix-ui/prism-reactjs'

class LeftNavLayoutExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tab: 'Summary data', m1Path: ['1'] }
    this.changeToTab = this.changeToTab.bind(this)
  }

  getPage(key) {
    const pages = { '1': 'Summary data', '2': 'List data', '3': 'Alert data' }
    return pages[key]
  }

  changeToTab(info) {
    this.setState({ tab: this.getPage(info.key), m1Path: info.keyPath })
  }

  render() {
    const leftPanel = (
      <Menu onClick={this.changeToTab} activeKeyPath={this.state.m1Path}>
        <MenuItem key="1">Summary</MenuItem>
        <MenuItem key="2">List</MenuItem>
        <MenuItem key="3">Alerts</MenuItem>
      </Menu>
    )
    return (
      <LeftNavLayout leftPanel={leftPanel} rightBodyContent={this.state.tab} />
    )
  }
}

;<LeftNavLayoutExample />
```

#### HeaderFooterLayout — Basic Usage

```tsx
import { HeaderFooterLayout, Title } from '@nutanix-ui/prism-reactjs'
;<div style={{ height: 200 }}>
  <HeaderFooterLayout
    itemSpacing="0px"
    header=<Title size="h3">Header</Title>
    footer=<Title size="h3">Footer</Title>
    bodyContent="Body content goes here."
  />
</div>
```

#### HeaderFooterLayout — Body only (no header or footer)

```tsx
import { HeaderFooterLayout } from '@nutanix-ui/prism-reactjs'
;<div style={{ height: 200 }}>
  <HeaderFooterLayout bodyContent="No Header or footer." />
</div>
```

#### HeaderFooterLayout — Custom header/footer section props

```tsx
import {
  HeaderFooterLayout,
  Title,
  FlexLayout,
  Select,
} from '@nutanix-ui/prism-reactjs'

const menuItems = [
  { label: 'None', value: 'none' },
  { label: 'Hypervisor', value: 'hypervisor' },
  { label: 'VMs', value: 'vms' },
]

const header = (
  <FlexLayout justifyContent="space-between" alignItems="center">
    <Title size="h3">Header</Title>
    <Select
      autoSize={true}
      type="mini"
      rowsData={menuItems}
      selectedRow={menuItems[1]}
    />
  </FlexLayout>
)

;<div style={{ height: 200 }}>
  <HeaderFooterLayout
    itemSpacing="0px"
    header={header}
    headerProps={{ itemFlexBasis: '100pc' }}
    footer=<Title size="h3">Footer</Title>
    footerProps={{ justifyContent: 'center' }}
    bodyContent="The body content goes here."
  />
</div>
```

### Usage Notes

- Prefer documented enum/static values such as `MainPageLayout.<EnumName>.<VALUE>` over raw strings when the component exposes them.
- Keep labels, help text, and validation visible and persistent for form controls; use `FormItem*` wrappers where available.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.
- `fullPage` is a boolean CSS modifier, not a content slot — do not pass a `ReactNode` to it.
- `bodyContent` on `HeaderFooterLayout` is **required**. Passing a falsy value will trigger a PropTypes warning.

<!-- SOURCE-API-END -->
