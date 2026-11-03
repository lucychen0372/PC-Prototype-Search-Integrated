# ViewSwitcher

## Figma

- **Library name:** View Switcher (page: Navigation, frame: Navigation)
- Icon-based or label-based toggle between different views (e.g. grid vs list, chart vs table).
- Figma spec: design 23.4, https://www.figma.com/file/KVbKkR0QAFRbTVpwysQLWw/Spec-Library?version-id=3368532166&node-id=21031-171055

## React

Import: `import { ViewSwitcher } from '@nutanix-ui/prism-reactjs'`

`ViewSwitcher` is a thin wrapper around `Tabs` that forces `type={Tabs.TYPE.VIEW_SWITCHERS}`,
`underline={false}`, and `itemSpacing="0px"`. All `TabsProps` / `FlexLayoutProps` not explicitly
overridden are passed through via spread.

---

### ViewSwitcher-specific Props

| Prop         | Type                        | Default                      | Required | Notes                                                                        |
| ------------ | --------------------------- | ---------------------------- | -------- | ---------------------------------------------------------------------------- |
| `background` | `BackgroundTypeWithoutBody` | auto-contrasted from context | No       | Overrides automatic background detection. Values: `'base'` \| `'alt'`.       |
| `borderless` | `boolean`                   | `false`                      | No       | **Deprecated.** Equivalent to `background="base"`. Prefer `background` prop. |
| `className`  | `string`                    | —                            | No       | Additional CSS class on the root element.                                    |

### Inherited TabsProps (all supported on ViewSwitcher)

| Prop               | Type                                                     | Default        | Required                          | Notes                                                                                                              |
| ------------------ | -------------------------------------------------------- | -------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `data`             | `DataTabItem[]`                                          | `[]`           | Strongly recommended              | Array of tab/view items. See **DataTabItem shape** below.                                                          |
| `defaultActiveKey` | `string \| number`                                       | —              | No                                | Uncontrolled: initial active key.                                                                                  |
| `activeKey`        | `string \| number`                                       | —              | No                                | Controlled: active key. Must be paired with `onTabClick`.                                                          |
| `onTabClick`       | `(key, index, tab, event) => void`                       | —              | Required when `activeKey` is used | See signature below.                                                                                               |
| `id`               | `string`                                                 | auto-generated | Strongly recommended              | Required for accessibility: used to build per-item `id` attributes.                                                |
| `panelIdPrefix`    | `string`                                                 | —              | Strongly recommended              | Required for accessibility: prefix for `aria-controls` / panel `id` links. Use `uniqueId('view-switcher-panel-')`. |
| `fullWidth`        | `boolean`                                                | `false`        | No                                | Stretch tabs to fill parent width equally.                                                                         |
| `adaptive`         | `boolean`                                                | `false`        | No                                | Overflow items collapse into a "More" dropdown.                                                                    |
| `role`             | `string`                                                 | `'tablist'`    | No                                | Override ARIA role (e.g. `'group'` for switch semantics).                                                          |
| `tabItemProps`     | `Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>` | —              | No                                | Props applied to every tab item (useful for overriding ARIA attributes).                                           |
| `underline`        | `boolean`                                                | `false`        | No                                | Always forced to `false` by ViewSwitcher internals; do not set manually.                                           |

> **Note:** `ViewSwitcher` also spreads remaining props onto the underlying `FlexLayout`, so standard
> HTML attributes (`aria-label`, `data-test-id`, `style`, etc.) are all supported.

#### `onTabClick` signature

```ts
onTabClick(
  key: string | number,   // the clicked tab's key
  index: number,          // index in the data array
  tab: DataTabItem,       // the full tab item object
  event: React.MouseEvent
) => void
```

---

### DataTabItem shape

Each entry in the `data` array is a `TabItemProps` object (plus an optional `separator` field).

| Field            | Type                             | Notes                                                                                                            |
| ---------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `key`            | `string \| number`               | **Required.** Unique identifier for the view.                                                                    |
| `title`          | `React.ReactNode`                | Label or icon to display. String titles are styled automatically; non-string titles require `ariaLabel`.         |
| `ariaLabel`      | `string`                         | Required when `title` is a non-string node. Announced by assistive technologies instead of the rendered content. |
| `disabled`       | `boolean`                        | Disables the item; click is ignored.                                                                             |
| `tooltipProps`   | `Omit<ToolTipProps, 'children'>` | Tooltip shown on hover. Cannot be combined with `titleSuffix`.                                                   |
| `statusIconType` | `StatusIconTypes`                | Status icon rendered alongside the title. Cannot be combined with `titleSuffix`.                                 |
| `titleSuffix`    | `React.ReactNode`                | **Deprecated.** Suffix node. Cannot be combined with `tooltipProps` / `statusIconType`.                          |
| `className`      | `string`                         | Additional class on this tab item.                                                                               |

> `separator` (boolean) is available in the `Tabs` `data` prop as a group divider, but ViewSwitcher
> renders `type="view_switchers"` which suppresses separator rendering. Avoid using it here.

---

### Background values

`BackgroundTypeWithoutBody = 'base' | 'alt'`

When no `background` prop is provided, `ViewSwitcher` reads `BackgroundContext` from its ancestors
and calls `getContrastingBackground()` to choose the contrasting value automatically:

| Ancestor background | Auto-selected ViewSwitcher background |
| ------------------- | ------------------------------------- |
| `'alt'` or `'body'` | `'base'`                              |
| `'base'` (default)  | `'alt'`                               |

Wrap the component in a `<StackingLayout background="body|base|alt">` to drive the automatic
contrast without setting `background` explicitly.

---

### TSX Examples

#### Minimal functional example (controlled, icon-only)

```tsx
import React, { useState } from 'react'
import { ViewSwitcher } from '@nutanix-ui/prism-reactjs'
import { uniqueId } from 'lodash'
import ListViewIcon from '@nutanix-ui/prism-reactjs/dist/icons/ListViewIcon'
import GridViewIcon from '@nutanix-ui/prism-reactjs/dist/icons/GridViewIcon'

const panelIdPrefix = uniqueId('view-switcher-panel-')

const data = [
  { key: 'list', title: <ListViewIcon />, ariaLabel: 'List view' },
  { key: 'grid', title: <GridViewIcon />, ariaLabel: 'Grid view' },
]

const MyViewSwitcher = () => {
  const [viewMode, setViewMode] = useState('list')

  return (
    <ViewSwitcher
      id="my-view-switcher"
      panelIdPrefix={panelIdPrefix}
      activeKey={viewMode}
      onTabClick={(key) => setViewMode(key)}
      data={data}
      aria-label="Switch view"
    />
  )
}
```

#### Basic example (uncontrolled, text labels with status icon on disabled item)

```tsx
import React from 'react'
import {
  ViewSwitcher,
  StatusIcon,
  TextLabel,
  Tooltip,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'
import { uniqueId } from 'lodash'

class MyViewSwitcher extends React.Component {
  constructor(props) {
    super(props)
    const panelIdPrefix = uniqueId('view-switcher-panel-')
    this.state = { activeTab: { title: 'Chart', key: 1 }, panelIdPrefix }
    this.data = [
      { title: 'Chart', key: 1 },
      { title: 'List', key: 2 },
      { title: 'Timeline', key: 3 },
      {
        title: 'Analysis',
        tooltipProps: {
          oldTooltip: false,
          appearance: Tooltip.APPEARANCE.SECONDARY,
          content: 'Requires Pro licensing',
        },
        statusIconType: StatusIcon.StatusIconTypes.WARNING,
        key: 4,
        disabled: true,
      },
    ]
    this.handleTabClick = this.handleTabClick.bind(this)
    this.tabsId = 'basic-usage'
  }

  handleTabClick(tabKey, index, tab) {
    this.setState({ activeTab: tab })
  }

  render() {
    const { panelIdPrefix, activeTab } = this.state
    return (
      <StackingLayout>
        <ViewSwitcher
          data={this.data}
          onTabClick={this.handleTabClick}
          defaultActiveKey={1}
          panelIdPrefix={panelIdPrefix}
          id={this.tabsId}
          aria-label="Basic example"
        />
        <StackingLayout
          role="tabpanel"
          id={`${panelIdPrefix}-${activeTab.key}`}
          aria-labelledby={`${this.tabsId}-${activeTab.key}`}
          tabIndex={0}
        >
          <TextLabel>{`This is ${activeTab.title} view`}</TextLabel>
        </StackingLayout>
      </StackingLayout>
    )
  }
}
```

#### Borderless example (deprecated — use `background` instead)

```tsx
<ViewSwitcher
  borderless={true} // deprecated; prefer background="base" on alt background
  data={data}
  onTabClick={handleTabClick}
  defaultActiveKey={1}
  panelIdPrefix={panelIdPrefix}
  id="tabs-borderless"
  aria-label="Borderless Example"
/>
```

#### Background placement — auto-contrast from context

```tsx
import { StackingLayout, ViewSwitcher } from '@nutanix-ui/prism-reactjs';

// ViewSwitcher reads BackgroundContext and picks the contrasting background automatically.
<StackingLayout background="body" padding="20px">
  <ViewSwitcher data={data} defaultActiveKey={1} id="using-body" panelIdPrefix={panelIdPrefix} aria-label="Body bg example" />
</StackingLayout>

<StackingLayout background="base" padding="20px">
  <ViewSwitcher data={data} defaultActiveKey={1} id="using-base" panelIdPrefix={panelIdPrefix} aria-label="Base bg example" />
</StackingLayout>

<StackingLayout background="alt" padding="20px">
  <ViewSwitcher data={data} defaultActiveKey={1} id="using-alt" panelIdPrefix={panelIdPrefix} aria-label="Alt bg example" />
</StackingLayout>
```

#### Badges as titles (non-string `title` — requires `ariaLabel`)

```tsx
import React, { useState } from 'react'
import { Badge, ViewSwitcher, StackingLayout } from '@nutanix-ui/prism-reactjs'
import { uniqueId } from 'lodash'

const data = [
  {
    key: 1,
    title: <Badge color="red" text="Critical (0)" />,
    ariaLabel: 'Critical (0)',
  },
  {
    key: 2,
    title: <Badge color="yellow" text="Warning (0)" />,
    ariaLabel: 'Warning (0)',
  },
  {
    key: 3,
    title: <Badge color="gray" text="Notice (0)" />,
    ariaLabel: 'Notice (0)',
  },
]

const panelIdPrefix = uniqueId('view-switcher-panel-')

const MyViewSwitcher = () => {
  const [, setActiveTab] = useState(data[0])
  return (
    <ViewSwitcher
      data={data}
      defaultActiveKey={1}
      id="badge-switcher"
      panelIdPrefix={panelIdPrefix}
      onTabClick={(tabKey, index, tab) => setActiveTab(tab)}
      aria-label="Badge view switcher"
    />
  )
}
```

#### Custom role — switch semantics

```tsx
import React, { useState } from 'react'
import { ViewSwitcher, StackingLayout } from '@nutanix-ui/prism-reactjs'
import { uniqueId } from 'lodash'

const SwitchViewSwitcher = () => {
  const [activeTab, setActiveTab] = useState({ title: 'On', key: 'on' })
  const panelIdPrefix = uniqueId('view-switcher-panel-')

  const data = [
    { title: 'On', key: 'on', ariaLabel: 'Currently on!' },
    { title: 'Off', key: 'off', ariaLabel: 'Currently off!' },
  ]

  return (
    <StackingLayout>
      <ViewSwitcher
        data={data}
        onTabClick={(tabKey, index, tab) => setActiveTab(tab)}
        defaultActiveKey="on"
        panelIdPrefix={panelIdPrefix}
        id="view-switcher-group-tabs"
        role="group"
        aria-label="Switch between On and Off"
        tabItemProps={{
          role: 'switch',
          'aria-checked': activeTab.key === 'on' ? 'true' : 'false',
        }}
      />
    </StackingLayout>
  )
}
```

---

### Keyboard & Accessibility

- Default ARIA role is `tablist`; each item is `role="tab"`.
- `id` and `panelIdPrefix` are required for a complete ARIA tab pattern. In development mode,
  missing these props logs a console warning.
- Wire the panel element: `role="tabpanel"`, `id="{panelIdPrefix}-{activeKey}"`,
  `aria-labelledby="{id}-{activeKey}"`, `tabIndex={0}`.
- When `title` is a non-string node (icon, `<Badge>`, etc.), always set `ariaLabel` on the item.

| Key          | Behaviour                                               |
| ------------ | ------------------------------------------------------- |
| `ArrowRight` | Focus + activate next view                              |
| `ArrowLeft`  | Focus + activate previous view                          |
| `Home`       | Focus + activate first view                             |
| `End`        | Focus + activate last view                              |
| `Tab`        | Move focus out of the ViewSwitcher (standard tab order) |

For custom roles (e.g. `role="group"` + `tabItemProps={{ role: 'switch' }}`), supply all required
ARIA attributes manually. Refer to the [Tabs Accessibility Guidelines](#/Layouts/Navigation?id=tabs:~:text=Accessibility%20Guidelines).

---

### Anti-patterns

- Don't use `Tabs` directly for icon-only or view-switching UI — use `ViewSwitcher`.
- Don't omit `aria-label` / `ariaLabel` when tab titles are icon nodes.
- Don't omit `id` and `panelIdPrefix` — they are required for correct ARIA labelling.
- Don't combine `tooltipProps` / `statusIconType` with `titleSuffix` on the same item (`titleSuffix` is deprecated and mutually exclusive).
- Don't use `borderless` for new work — use `background="base"` on an `alt` background context instead.

<!-- SOURCE-API-START -->

### Import

```tsx
import { ViewSwitcher } from '@nutanix-ui/prism-reactjs'
```

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Accessibility Guidelines

```tsx
<StackingLayout style={{ maxWidth: 800 }}>
  <Paragraph>
    Note: the ViewSwitcher component is a specialized type of the Tabs
    component. Please refer to the
    <Link href="#/Layouts/Navigation?id=tabs:~:text=Accessibility%20Guidelines">
      Tabs Accessibility Guidelines
    </Link>
    .
  </Paragraph>
</StackingLayout>
```

#### Basic Example

```tsx
class MyViewSwitcher extends React.Component {
  constructor(props) {
    super(props)

    const panelIdPrefix = uniqueId('view-switcher-panel-')
    this.state = {
      activeTab: {
        title: 'Chart',
        key: 1,
      },
      panelIdPrefix,
    }

    this.data = [
      {
        title: 'Chart',
        key: 1,
      },
      {
        title: 'List',
        key: 2,
      },
      {
        title: 'Timeline',
        key: 3,
      },
      {
        title: 'Analysis',
        tooltipProps: {
          oldTooltip: false,
          appearance: Tooltip.APPEARANCE.SECONDARY,
          content: 'Requires Pro licensing',
        },
        statusIconType: StatusIcon.StatusIconTypes.WARNING,
        key: 4,
        disabled: true,
      },
    ]

    this.handleTabClick = this.handleTabClick.bind(this)
    this.tabsId = 'basic-usage'
  }

  renderTabContent() {
    return <TextLabel>{`This is ${this.state.activeTab.title} view`}</TextLabel>
  }

  handleTabClick(tabKey, index, tab) {
    this.setState({
      activeTab: tab,
    })
  }

  render() {
    const { panelIdPrefix, activeTab } = this.state
    return (
      <StackingLayout>
        <ViewSwitcher
          data={this.data}
          onTabClick={this.handleTabClick}
          defaultActiveKey={1}
          panelIdPrefix={panelIdPrefix}
          id={this.tabsId}
          aria-label="Basic example"
        />
        <StackingLayout
          role="tabpanel"
          id={`${panelIdPrefix}-${activeTab.key}`}
          aria-labelledby={`${this.tabsId}-${activeTab.key}`}
          tabIndex={0}
        >
          {this.renderTabContent()}
        </StackingLayout>
      </StackingLayout>
    )
  }
}
;<MyViewSwitcher />
```

#### Background Placement Examples

```tsx
<StackingLayout>
  <Paragraph>Using background="body"</Paragraph>
  <StackingLayout
    data-test-id="secondary-bg-body"
    background="body"
    style={{ padding: 20 }}
  >
    <ViewSwitcher
      data={data}
      defaultActiveKey={1}
      id="using-body"
      panelIdPrefix={panelIdPrefix}
      aria-label="body bg example"
    />
  </StackingLayout>
  <Paragraph>Using background="base"</Paragraph>
  <StackingLayout
    data-test-id="secondary-bg-base"
    background="base"
    style={{ padding: 20 }}
  >
    <ViewSwitcher
      data={data}
      defaultActiveKey={1}
      id="using-base"
      panelIdPrefix={panelIdPrefix}
      aria-label="base bg example"
    />
  </StackingLayout>
  <Paragraph>Using background="alt"</Paragraph>
  <StackingLayout
    data-test-id="secondary-bg-alt"
    background="alt"
    style={{ padding: 20 }}
  >
    <ViewSwitcher
      data={data}
      defaultActiveKey={1}
      id="using-alt"
      panelIdPrefix={panelIdPrefix}
      aria-label="alt bg example"
    />
  </StackingLayout>
</StackingLayout>
```

#### Borderless Example. Use with off white background.

```tsx
<ViewSwitcher
  data-test-id="borderless"
  borderless={true}
  data={data}
  onTabClick={handleTabClick}
  defaultActiveKey={1}
  panelIdPrefix={panelIdPrefix}
  id="tabs-borderless"
  aria-label="Borderless Example"
/>
```

#### Custom Role Example

```tsx
// @example-id custom-role
const SwitchViewSwitcher = () => {
  const [activeTab, setActiveTab] = useState({
    title: 'On',
    key: 'on',
  })

  const panelIdPrefix = uniqueId('view-switcher-panel-')

  const data = [
    {
      title: 'On',
      key: 'on',
      ariaLabel: 'Currently on!',
    },
    {
      title: 'Off',
      key: 'off',
      ariaLabel: 'Currently off!',
    },
  ]

  const handleTabClick = (tabKey, index, tab) => {
    setActiveTab(tab)
  }

  return (
    <StackingLayout>
      <ViewSwitcher
        data-test-id="custom-role"
        data={data}
        onTabClick={handleTabClick}
        defaultActiveKey="on"
        panelIdPrefix={panelIdPrefix}
        id="view-switcher-group-tabs"
        role="group"
        aria-label="Switch between On and Off"
        tabItemProps={{
          role: 'switch',
          'aria-checked': activeTab.key === 'on' ? 'true' : 'false',
        }}
      />
    </StackingLayout>
  )
}
;<SwitchViewSwitcher />
```

#### ViewSwitcher with colored Badges on different backgrounds

```tsx
const data = [
  {
    key: 1,
    title: <Badge color="red" text="Critical (0)" />,
    ariaLabel: 'Critical (0)',
  },
  {
    key: 2,
    title: <Badge color="yellow" text="Warning (0)" />,
    ariaLabel: 'Warning (0)',
  },
  {
    key: 3,
    title: <Badge color="gray" text="Notice (0)" />,
    ariaLabel: 'Notice (0)',
  },
]

const MyViewSwitcher = () => {
  const [, setActiveTab] = useState(data[0])
  const backgrounds = ['body', 'base', 'alt']
  const panelIdPrefix = uniqueId('view-switcher-panel-')

  const handleTabClick = (tabKey, index, tab) => setActiveTab(tab)

  return (
    <StackingLayout>
      {backgrounds.map((bg) => (
        <React.Fragment key={bg}>
          <Paragraph>Using background="{bg}"</Paragraph>
          <StackingLayout
            padding="20px"
            background={bg}
            data-test-id={`bg-${bg}`}
          >
            <ViewSwitcher
              data={data}
              defaultActiveKey={1}
              id={`background-${bg}`}
              data-test-id={`context-${bg}`}
              onTabClick={handleTabClick}
              panelIdPrefix={panelIdPrefix}
              aria-label={`Badges with background ${bg} example`}
            />
          </StackingLayout>
        </React.Fragment>
      ))}
    </StackingLayout>
  )
}
;<MyViewSwitcher />
```

### Usage Notes

- Prefer `background` prop values (`'base'` | `'alt'`) over the deprecated `borderless` boolean.
- `background` on `ViewSwitcher` accepts `BackgroundTypeWithoutBody` (`'base'` | `'alt'`), not `'body'`; wrap in a layout with `background="body"` to drive auto-contrast instead.
- When `title` contains non-string content (icons, badges, etc.) always supply `ariaLabel` on the item so screen readers announce it correctly.
- `id` and `panelIdPrefix` are optional at the type level for backwards compatibility but are **required for accessibility**. Missing them emits a dev-mode console warning.
- Use `tabItemProps` to add or override ARIA attributes across all items uniformly (e.g. `role="switch"`, `aria-checked`).
- For purely icon-based toggles, avoid icon-only buttons without `ariaLabel`; this violates WCAG SC 4.1.2.
- Use Prism layout props (`padding`, `background`, `alignItems`, etc.) on wrapper layouts rather than inline `style` for spacing and background context.

<!-- SOURCE-API-END -->
