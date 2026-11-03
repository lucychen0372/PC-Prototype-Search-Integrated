# Tabs

## Figma

- **Library name:** Tabs (page: N/A, frame: Tabs)

## React

Import: `import { Tabs } from '@nutanix-ui/prism-reactjs'`

### DataTabItem Shape

Each entry in the `data` array is a `DataTabItem`. A `DataTabItem` is either a normal tab item or a separator.

```ts
// Normal tab item
interface TabItemProps {
  key: string | number // Unique identifier (required for tab items)
  title?: React.ReactNode | (() => React.ReactNode) // Tab label; string or render function
  titleSuffix?: React.ReactNode // Element placed to the right of title (deprecated; use tooltipProps + statusIconType)
  disabled?: boolean // Disables this tab
  ariaLabel?: string // Required when title is a non-string React node
  tooltipProps?: Omit<TooltipProps, 'children'> // Tooltip shown on the status icon
  statusIconType?: StatusIconTypes // Renders a StatusIcon next to the title
  subTabs?: SubTabItemProps[] // Nested sub-tabs shown in a dropdown (max 2 levels deep)
  role?: string // Tab role, default 'tab'; use 'menu' for dropdown tabs
  ariaExpanded?: boolean // Required when role='menu'
  ariaControls?: string // aria-controls for the associated panel
  // Any additional FlexLayout or HTML div attributes (e.g. 'data-test-id', 'onFocus')
}

// Separator — renders a VerticalSeparator between tab groups (type='tabs' only)
interface DataTabItemSeparator {
  separator: true
}

type DataTabItem = TabItemProps & { separator?: React.ReactNode }
```

#### `SubTabItemProps`

Sub-tabs appear in a dropdown when a tab item has `subTabs`. Nesting is limited to 2 levels.

```ts
interface SubTabItemProps
  extends Omit<
    TabItemProps,
    'subTabs' | 'role' | 'children' | 'onFocus' | 'onClick'
  > {
  isSelected?: boolean // Managed internally by Tabs
  subTabs?: Omit<SubTabItemProps, 'subTabs'>[] // Second-level nesting (max 1 more level)
}
```

### TSX Examples

```tsx
{
  /* Uncontrolled tabs (Tabs manages active state) */
}
import React, { useState, useCallback } from 'react'
import {
  Tabs,
  FlexLayout,
  StackingLayout,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
import { uniqueId } from 'lodash'

const panelIdPrefix = uniqueId('tab-panel-')

const MyTabs = (props = {}) => {
  const [activeTab, setActiveTab] = useState(1)
  const handleTabClick = useCallback((tabKey) => setActiveTab(tabKey), [])

  return (
    <StackingLayout>
      <Tabs
        id="basic-tabs"
        data={[
          { key: 1, title: 'Overview' },
          { key: 2, title: 'Performance' },
          { key: 3, title: 'Logs' },
          { key: 4, title: 'Settings', disabled: true },
        ]}
        defaultActiveKey={1}
        onTabClick={handleTabClick}
        panelIdPrefix={panelIdPrefix}
        aria-label="Basic tabs"
      />
      <FlexLayout
        padding="20px"
        id={`${panelIdPrefix}-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`basic-tabs-${activeTab}`}
        tabIndex={0}
      >
        <TextLabel>{`This is tab ${activeTab}`}</TextLabel>
      </FlexLayout>
    </StackingLayout>
  )
}
```

```tsx
{
  /* Controlled tabs — use activeKey + onTabClick (e.g. async loading gate) */
}
import React, { useState, useCallback } from 'react'
import {
  Tabs,
  FlexLayout,
  StackingLayout,
  Loader,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
import { uniqueId } from 'lodash'

const panelIdPrefix = uniqueId('tab-panel-')

const MyTabs = () => {
  const [activeTab, setActiveTab] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleTabClick = useCallback((tabKey) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setActiveTab(tabKey)
    }, 2000)
  }, [])

  return (
    <StackingLayout>
      <Loader aria-live="polite" loading={loading} tip="Loading...">
        <StackingLayout>
          <Tabs
            id="controlled-tabs"
            data={[
              { key: 1, title: 'Overview' },
              { key: 2, title: 'Performance', 'data-test-id': 'loading-click' },
              { key: 3, title: 'Topology' },
            ]}
            activeKey={activeTab}
            onTabClick={handleTabClick}
            panelIdPrefix={panelIdPrefix}
            aria-label="Controlled tabs"
          />
          <FlexLayout
            padding="20px"
            id={`${panelIdPrefix}-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`controlled-tabs-${activeTab}`}
            tabIndex={0}
          >
            <TextLabel>{`This is tab ${activeTab}`}</TextLabel>
          </FlexLayout>
        </StackingLayout>
      </Loader>
    </StackingLayout>
  )
}
```

### Anti-patterns

- Don't create custom tab bars with buttons — use `Tabs`
- When using `activeKey`, you MUST also provide `onTabClick`
- For view switching (icon-based), use `ViewSwitcher` instead
- Do NOT nest `<Link>` or `<Dropdown>` inside a `title` function — this violates accessibility (tabs are buttons, nesting interactive elements is invalid). Use `subTabs` instead.
- `subTabs` nesting is limited to 2 levels; deeper nesting will throw a PropTypes error.
- Keys must be unique across all tab items and sub-tab items, not just within the same level.

<!-- SOURCE-API-START -->

### Import

```tsx
import { Tabs } from '@nutanix-ui/prism-reactjs'
```

### Props Interfaces

#### `TabsProps`

Extends: `extends Omit<FlexLayoutProps, 'data' | 'role'>`

All `FlexLayout` props (e.g. `padding`, `justifyContent`, `background`, `itemSpacing`) are also accepted.

| Prop               | Type                                                                                                         | Default            | Required                        | Description                                                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `data`             | `DataTabItem[]`                                                                                              | `[]`               | No                              | Array of tab items. Each item needs a `key` and `title`. Pass `{ separator: true }` (no `key`) to insert a `VerticalSeparator` divider between groups.             |
| `defaultActiveKey` | `string \| number`                                                                                           | —                  | No                              | Key of the initially active tab. Use for uncontrolled mode (Tabs manages the active state).                                                                        |
| `activeKey`        | `string \| number`                                                                                           | —                  | No                              | Key of the currently active tab. Use for controlled mode; **must** be paired with `onTabClick`.                                                                    |
| `onTabClick`       | `(key: string \| number, index: number, tab: Omit<DataTabItem, 'subTabs'>, event: React.MouseEvent) => void` | —                  | Required when using `activeKey` | Callback invoked on tab click. `key` is `tab.key`; `index` is position in `data`; `tab` is the full item object.                                                   |
| `id`               | `string`                                                                                                     | auto-generated     | Strongly recommended            | Unique id for the tablist. Used to generate per-tab ids (`${id}-${key}`). Required for accessibility.                                                              |
| `panelIdPrefix`    | `string`                                                                                                     | —                  | Strongly recommended            | Prefix for the controlled tab panel's `id`. Use `uniqueId('tabs-panel-')` from lodash. Required for accessibility.                                                 |
| `underline`        | `boolean`                                                                                                    | `true`             | No                              | Renders the visual underline below the tab bar. Pass `underline={false}` for header-embedded tabs.                                                                 |
| `fullWidth`        | `boolean`                                                                                                    | `false`            | No                              | Expands the tab bar to fill its parent; each tab gets equal width.                                                                                                 |
| `adaptive`         | `boolean`                                                                                                    | `false`            | No                              | Enables responsive overflow: tabs that don't fit are collected into a "More" dropdown. The selected tab is always kept visible.                                    |
| `role`             | `string`                                                                                                     | `'tablist'`        | No                              | ARIA role of the tab container. Override only when context demands a different role; always pair with correct ARIA attributes.                                     |
| `tabItemProps`     | `Omit<DataWrapperProps<React.HTMLAttributes<HTMLDivElement>>, 'children'>`                                   | —                  | No                              | Extra props merged onto every tab item element (useful for adding/overriding ARIA attributes). Also applied to the adaptive "More" tab. `children` is not allowed. |
| `type`             | `TabItemType`                                                                                                | `TabItemType.TABS` | No                              | Internal — controls styling mode. Use `ViewSwitcher` component instead of setting this. `@ignore`                                                                  |

#### `DataTabItem` fields (per item in `data`)

| Field            | Type                                         | Required                            | Description                                                                                                                                    |
| ---------------- | -------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `key`            | `string \| number`                           | Yes (for tab items)                 | Unique key across all tab and sub-tab items.                                                                                                   |
| `title`          | `React.ReactNode \| (() => React.ReactNode)` | No                                  | Tab label. Can be a string, JSX, or a render function.                                                                                         |
| `titleSuffix`    | `React.ReactNode`                            | No                                  | **Deprecated.** Element placed to the right of `title`. Use `tooltipProps` + `statusIconType` instead.                                         |
| `disabled`       | `boolean`                                    | No                                  | Disables the tab (not clickable, `aria-disabled` set).                                                                                         |
| `ariaLabel`      | `string`                                     | Required when `title` is non-string | Accessible label for assistive technologies. Mandatory when `title` is a React element or function.                                            |
| `tooltipProps`   | `Omit<TooltipProps, 'children'>`             | No                                  | Tooltip shown on the status icon. Cannot be combined with `titleSuffix`.                                                                       |
| `statusIconType` | `StatusIconTypes`                            | No                                  | Renders a `StatusIcon` next to the tab title. Cannot be combined with `titleSuffix`.                                                           |
| `subTabs`        | `SubTabItemProps[]`                          | No                                  | Nested sub-tab items shown in a dropdown. Max 2 levels deep. Clicks on the parent tab do not fire `onTabClick`; only `subTabs` clicks fire it. |
| `separator`      | `true`                                       | —                                   | When set, renders a `VerticalSeparator` divider (ignores all other fields). Only renders for `type='tabs'`.                                    |
| `role`           | `string`                                     | No                                  | Tab role; default `'tab'`. Use `'menu'` for custom dropdown tabs.                                                                              |
| `ariaExpanded`   | `boolean`                                    | Required when `role='menu'`         | Expanded state for dropdown tabs.                                                                                                              |
| `ariaControls`   | `string`                                     | No                                  | `aria-controls` pointing to the managed panel's `id`.                                                                                          |

### Static Members

- `Tabs.TYPE` — alias for `TabItemType` enum:

| Key                        | Value              |
| -------------------------- | ------------------ |
| `Tabs.TYPE.TABS`           | `'tabs'`           |
| `Tabs.TYPE.VIEW_SWITCHERS` | `'view_switchers'` |

### Enums

```tsx
import { TabItemType, TabItemAppearance } from '@nutanix-ui/prism-reactjs'

// Or via static members:
Tabs.TYPE.TABS // 'tabs'
Tabs.TYPE.VIEW_SWITCHERS // 'view_switchers'

TabItemAppearance.NORMAL // 'normal'
TabItemAppearance.ACTIVE // 'active'
TabItemAppearance.DISABLED // 'disabled'
```

`TabItemAppearance` is managed internally by `Tabs` — you do not set it directly via the `data` array.

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Accessibility Guidelines

```tsx
<StackingLayout style={{ maxWidth: 800 }}>
  <Paragraph>
    The container that is revealed when a tab is selected should have
    role="tabpanel", tabindex="0" and an aria-labelledby that points back to the
    id of the tab. See examples for correct usage.
  </Paragraph>
  <Paragraph>
    The tablist element needs a label for accessibility. This can be
    accomplished with either an aria-labelledby referencing the id of a visible
    label or using an aria-label. If there are multiple tabs elements on a page,
    make sure the labels are unique.
  </Paragraph>
</StackingLayout>
```

#### Basic Example

```tsx
const panelIdPrefix = uniqueId('tab-panel-')
const data = [
  {
    title: 'Performance',
    'data-test-id': 'performance-tab',
    key: 1,
  },
  {
    title: 'Networking',
    'data-test-id': 'networking-tab',
    key: 2,
  },
  {
    title: 'Controller',
    'data-test-id': 'controller-tab',
    key: 3,
  },
]
const MyTabs = (props = {}) => {
  const [activeTab, setActiveTab] = useState(1)
  const handleTabClick = useCallback((tabKey) => {
    setActiveTab(tabKey)
  }, [])

  const renderTabContent = () => (
    <TextLabel>{`This is tab ${activeTab}`}</TextLabel>
  )

  return (
    <StackingLayout data-test-id="default">
      <Tabs
        data={data}
        onTabClick={handleTabClick}
        defaultActiveKey={1}
        panelIdPrefix={panelIdPrefix}
        data-test-id="default-active"
        aria-label="Basic example"
        {...props}
      />
      <FlexLayout
        padding="20px"
        id={`${panelIdPrefix}-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`${props.id}-${activeTab}`}
        tabIndex={0}
      >
        {renderTabContent()}
      </FlexLayout>
    </StackingLayout>
  )
}

;<MyTabs id="basic-usage" />
```

#### Select on click

```tsx
const panelIdPrefix = uniqueId('tab-panel-')
const data = [
  {
    title: 'Performance',
    key: 1,
  },
  {
    title: 'Networking',
    key: 2,
  },
  {
    title: 'Controller',
    key: 3,
  },
]
const MyTabs = (props = {}) => {
  const [activeTab, setActiveTab] = useState(1)
  const handleTabClick = useCallback((tabKey) => {
    setActiveTab(tabKey)
  }, [])

  const renderTabContent = () => (
    <TextLabel>{`This is tab ${activeTab}`}</TextLabel>
  )

  return (
    <StackingLayout data-test-id="select-on-click">
      <Tabs
        data={data}
        onTabClick={handleTabClick}
        defaultActiveKey={1}
        panelIdPrefix={panelIdPrefix}
        data-test-id="select-on-click-active"
        aria-label="Select on click example"
        {...props}
      />
      <FlexLayout
        padding="20px"
        id={`${panelIdPrefix}-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`${props.id}-${activeTab}`}
        tabIndex={0}
      >
        {renderTabContent()}
      </FlexLayout>
    </StackingLayout>
  )
}

;<MyTabs id="basic-usage" />
```

#### Without Underline Example

```tsx
const MyTabs = (props) => {
  const panelIdPrefix = uniqueId('tab-panel-')
  const [activeTab, setActiveTab] = useState(1)

  const data = [
    {
      title: 'Performance',
      key: 1,
    },
    {
      title: 'Networking',
      key: 2,
    },
    {
      title: 'Controller',
      key: 3,
    },
  ]

  const handleTabClick = useCallback((tabKey) => {
    setActiveTab(tabKey)
  }, [])

  const renderTabContent = () => (
    <TextLabel>{`This is tab ${activeTab}`}</TextLabel>
  )

  return (
    <StackingLayout data-test-id="without-underline">
      <Tabs
        background="base"
        data={data}
        onTabClick={handleTabClick}
        defaultActiveKey={1}
        panelIdPrefix={panelIdPrefix}
        underline={false}
        aria-label="Without underline example"
        id={props.id}
      />
      <FlexLayout
        background="base"
        padding="20px"
        id={`${panelIdPrefix}-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`${props.id}-${activeTab}`}
        tabIndex={0}
      >
        {renderTabContent()}
      </FlexLayout>
    </StackingLayout>
  )
}

;<StackingLayout className="nsg-example-borderless-content">
  <MyTabs id="without-underline-example" />
</StackingLayout>
```

#### No Padding Example

The default `padding` for `type='tabs'` is `'0px-20px'` (left/right gutters). Pass `padding="0px"` to remove it entirely.

```tsx
const panelIdPrefix = uniqueId('tab-panel-')
const data = [
  { title: 'Performance', key: 1 },
  { title: 'Networking', key: 2 },
  { title: 'Controller', key: 3 },
]

const MyTabs = (props = {}) => {
  const [activeTab, setActiveTab] = useState(1)
  const handleTabClick = useCallback((tabKey) => setActiveTab(tabKey), [])

  return (
    <StackingLayout data-test-id="default-with-lr-zero">
      <Tabs
        padding="0px"
        data={data}
        onTabClick={handleTabClick}
        defaultActiveKey={1}
        data-test-id="default-with-lr-zero-active"
        panelIdPrefix={panelIdPrefix}
        aria-label="No padding example"
        id={props.id}
      />
      <FlexLayout
        padding="20px"
        id={`${panelIdPrefix}-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`${props.id}-${activeTab}`}
        tabIndex={0}
      >
        <TextLabel>{`This is tab ${activeTab}`}</TextLabel>
      </FlexLayout>
    </StackingLayout>
  )
}

;<MyTabs id="basic-left-right-padding" />
```

#### Full Width Example

```tsx
const MyTabs = () => {
  const [activeTab, setActiveTab] = useState(1)
  const panelIdPrefix = useMemo(() => uniqueId('tab-panel-'), [])
  const tabsId = 'tabs-fullwidth'
  const tabs = [
    { title: 'Performance', key: 1 },
    { title: 'Networking', key: 2 },
    { title: 'Controller', key: 3 },
  ]

  return (
    <StackingLayout style={{ width: '400px' }}>
      <Tabs
        id={tabsId}
        data={tabs}
        onTabClick={(tabId) => setActiveTab(tabId)}
        defaultActiveKey={1}
        fullWidth={true}
        data-test-id="full-width"
        panelIdPrefix={panelIdPrefix}
        aria-label="Fullwidth example"
      />
      <FlexLayout
        padding="20px"
        id={`${panelIdPrefix}-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`${tabsId}-${activeTab}`}
        tabIndex={0}
      >
        <TextLabel>{`This is tab ${activeTab}`}</TextLabel>
      </FlexLayout>
    </StackingLayout>
  )
}
```

#### Adaptive Tabs Example

When `adaptive={true}`, tabs that overflow the container are hidden behind a "More" dropdown. The selected tab is always kept visible outside the dropdown. Recommended when horizontal space is constrained.

```tsx
const data = [
  { title: 'Summary', key: 1 },
  { title: 'Software', key: 2 },
  { title: 'Firmware', key: 3 },
  { title: 'Operation', key: 4 },
  { title: 'Settings', key: 5 },
  { title: 'Uploads', key: 6 },
]

const MyTabs = (props = {}) => {
  const panelIdPrefix = useMemo(
    () => uniqueId(`'tab-panel-'${props.id}`),
    [props.id],
  )
  const [activeTab, setActiveTab] = useState(1)
  const handleTabClick = useCallback((tabKey) => setActiveTab(tabKey), [])

  return (
    <React.Fragment>
      <Tabs
        id={props.id}
        adaptive={true}
        data={data}
        onTabClick={handleTabClick}
        activeKey={activeTab}
        panelIdPrefix={panelIdPrefix}
        aria-label="Adaptive tabs example"
      />
      <FlexLayout
        padding="20px"
        id={`${panelIdPrefix}-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`${props.id}-${activeTab}`}
        tabIndex={0}
      >
        <TextLabel>{`This is tab ${activeTab}`}</TextLabel>
      </FlexLayout>
    </React.Fragment>
  )
}
```

#### Tooltips, Status Icons, Disabled Tab, and Separator

Use `tooltipProps` + `statusIconType` for accessible status indicators. Use `{ separator: true }` (no `key`) to create a visual divider between tab groups.

```tsx
import {
  Tabs,
  StatusIcon,
  StackingLayout,
  FlexLayout,
  TextLabel,
  Title,
} from '@nutanix-ui/prism-reactjs'

const data = [
  {
    title: 'Overview',
    tooltipProps: { content: 'Required Pro licensing' },
    statusIconType: StatusIcon.StatusIconTypes.ALERT,
    key: 1,
  },
  { title: 'Performance', key: 2 },
  { title: 'Topology', key: 3 },
  { separator: true }, // VerticalSeparator divider
  {
    title: 'Analysis',
    tooltipProps: { content: 'Required Pro licensing' },
    statusIconType: StatusIcon.StatusIconTypes.WARNING,
    key: 4,
    disabled: true,
  },
]

const tabsId = 'tabs-with-tooltip-status'

const TabsExample = () => {
  const defaultActiveTabKey = 1
  const [activeTab, setActiveTab] = useState(defaultActiveTabKey)
  const panelIdPrefix = useMemo(() => uniqueId('tab-panel-'), [])

  return (
    <StackingLayout>
      <Title size="h3" id="complex-tabs-title">
        Complex example
      </Title>
      <Tabs
        data={data}
        onTabClick={(tabId) => setActiveTab(tabId)}
        defaultActiveKey={defaultActiveTabKey}
        panelIdPrefix={panelIdPrefix}
        id={tabsId}
        aria-labelledby="complex-tabs-title"
      />
      <FlexLayout
        padding="20px"
        id={`${panelIdPrefix}-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`${tabsId}-${activeTab}`}
        tabIndex={0}
      >
        <TextLabel>{`This is tab ${activeTab}`}</TextLabel>
      </FlexLayout>
    </StackingLayout>
  )
}
```

#### Nested Sub-Tabs Example

`subTabs` renders a dropdown beneath the parent tab. Keys must be unique across the entire flat list. This pattern is A11y-compliant (no nested interactive elements).

```tsx
import {
  Tabs,
  TextLabel,
  StackingLayout,
  FlexLayout,
  StatusIcon,
  Badge,
} from '@nutanix-ui/prism-reactjs'

const MyTabs = ({ id }) => {
  const panelIdPrefix = uniqueId('tab-panel-')
  const [activeTab, setActiveTab] = useState(1)
  const [panelLabelId, setPanelLabelId] = useState(`${id}-1`)

  const data = [
    { title: 'Performance', key: 1 },
    { title: 'Networking', key: 2 },
    {
      key: 3,
      title: 'Metrics',
      subTabs: [
        { key: 4, title: 'Summary', 'data-test-id': 'metrics-summary-tab' },
        {
          key: 5,
          title: 'Alerts',
          statusIconType: StatusIcon.StatusIconTypes.ALERT,
        },
        {
          key: 6,
          title: 'Tasks',
          statusIconType: StatusIcon.StatusIconTypes.WARNING,
        },
        {
          key: 7,
          title: (
            <FlexLayout flexDirection="row" alignItems="center" itemGap="S">
              <span>Security</span>
              <Badge color="blue" count="New" />
            </FlexLayout>
          ),
          'data-test-id': 'metrics-security-tab',
        },
      ],
    },
  ]

  const handleTabClick = useCallback((tabKey, index, tab, event) => {
    setActiveTab(tabKey)
    setPanelLabelId(event.currentTarget.id)
  }, [])

  return (
    <StackingLayout>
      <Tabs
        data={data}
        onTabClick={handleTabClick}
        activeKey={activeTab}
        panelIdPrefix={panelIdPrefix}
        adaptive={true}
        id={id}
        aria-label="Nested tabs example"
      />
      <FlexLayout
        padding="20px"
        id={`${panelIdPrefix}-${activeTab}`}
        role="tabpanel"
        aria-labelledby={panelLabelId}
        tabIndex={0}
      >
        <TextLabel>{`This is tab ${activeTab}`}</TextLabel>
      </FlexLayout>
    </StackingLayout>
  )
}
```

#### Custom Node Titles (non-string `title`)

When `title` is a React element or function, you **must** supply `ariaLabel` on the data item so assistive technologies can announce the tab correctly.

```tsx
import {
  Tabs,
  Badge,
  TextLabel,
  StackingLayout,
  FlexLayout,
} from '@nutanix-ui/prism-reactjs'

const panelIdPrefix = uniqueId('tab-panel-')
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

const MyTabs = (props = {}) => {
  const [activeTab, setActiveTab] = useState(1)
  const handleTabClick = useCallback((tabKey) => setActiveTab(tabKey), [])

  return (
    <StackingLayout data-test-id="node-titles-with-aria-label">
      <Tabs
        data={data}
        onTabClick={handleTabClick}
        defaultActiveKey={1}
        panelIdPrefix={panelIdPrefix}
        aria-label="Node titles example"
        {...props}
      />
      <FlexLayout
        padding="20px"
        id={`${panelIdPrefix}-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`${props.id}-${activeTab}`}
        tabIndex={0}
      >
        <TextLabel>{`This is tab ${activeTab}`}</TextLabel>
      </FlexLayout>
    </StackingLayout>
  )
}

;<MyTabs id="node-titles-example" />
```

### Keyboard Navigation

The `Tabs` component implements the ARIA tablist keyboard pattern:

| Key          | Behaviour                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `ArrowRight` | Focus and activate the next tab (wraps to first).                                                                           |
| `ArrowLeft`  | Focus and activate the previous tab (wraps to last).                                                                        |
| `Home`       | Focus and activate the first visible tab.                                                                                   |
| `End`        | Focus and activate the last visible tab.                                                                                    |
| `Tab`        | Exits the tablist into the page flow (does not cycle through tabs). While the "More" dropdown is open, `Tab` is suppressed. |

When a tab moves from the overflow dropdown back into the visible row (adaptive mode), it receives focus automatically.

### Accessibility Notes

- The `<Tabs>` element itself renders with `role="tablist"` by default. Supply `aria-label` or `aria-labelledby` (pointing at a visible heading) on `<Tabs>`.
- Each tab panel (`role="tabpanel"`) must carry:
  - `id` equal to `${panelIdPrefix}-${key}` (matches `ariaControls` auto-set on the tab item)
  - `aria-labelledby` equal to `${id}-${key}` (matches the tab item's `id`)
  - `tabIndex={0}` to make it keyboard-reachable
- `id` and `panelIdPrefix` are optional for backward compatibility but **required in practice** — omitting them logs a console warning in development and breaks accessibility.
- When `title` is a non-string node, `ariaLabel` on the data item is mandatory (PropTypes will throw an error if it is missing).

### Usage Notes

- Prefer documented enum/static values such as `Tabs.TYPE.TABS` over raw strings when the component exposes them.
- Keep labels, help text, and validation visible and persistent for form controls; use `FormItem*` wrappers where available.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.
- `Tabs` wraps `FlexLayout`, so all `FlexLayout` props (`justifyContent`, `background`, `padding`, etc.) are accepted directly on `<Tabs>`.

<!-- SOURCE-API-END -->
