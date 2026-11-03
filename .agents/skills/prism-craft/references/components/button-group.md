# ButtonGroup

## Figma

- **Library name:** Split Button (page: N/A, frame: Split Button)

## React

Import: `import { ButtonGroup, AdaptiveButtonGroup, TextButtonGroup } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import {
  ButtonGroup,
  AdaptiveButtonGroup,
  TextButtonGroup,
} from '@nutanix-ui/prism-reactjs'
```

---

## `ButtonGroup`

The base component. Renders children inside an inline `FlexLayout` with `itemGap="none"` so adjacent buttons share a collapsed border, producing a visually connected group. Use this when you need full manual control over the button composition.

### `ButtonGroupProps`

Extends: `FlexLayoutProps`

| Prop        | Type                         | Required | Default | Description                                                                                                                            |
| ----------- | ---------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `children`  | `React.ReactNode`            | yes      | —       | Direct children must be `Button`, `Dropdown`, `Tooltip`, or `Popover`. Any other child type raises a PropTypes error. Cannot be empty. |
| `className` | `string`                     | no       | —       | Additional CSS class appended to the root element.                                                                                     |
| `onKeyDown` | `React.KeyboardEventHandler` | no       | —       | Extended with internal ArrowLeft / ArrowRight focus-management before calling the user handler.                                        |
| …           | `FlexLayoutProps`            | no       | —       | All other `FlexLayout` props are forwarded to the root element.                                                                        |

**Allowed child types:** `Button`, `Dropdown`, `Tooltip` (wrapping a `Button`), `Popover` (wrapping a `Button`).

### Keyboard Behaviour

| Key          | Action                                                |
| ------------ | ----------------------------------------------------- |
| `ArrowRight` | Moves focus to the next focusable sibling button.     |
| `ArrowLeft`  | Moves focus to the previous focusable sibling button. |

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Primary

```tsx
import {
  Menu,
  ButtonGroup,
  Button,
  MenuItem,
  StackingLayout,
  SettingsIcon,
  Tooltip,
  Dropdown,
  PlusIcon,
} from '@nutanix-ui/prism-reactjs'

const menu = (
  <Menu appearance={Menu.MenuAppearance.COMPACT}>
    <MenuItem key="1">Option 1</MenuItem>
    <MenuItem key="2">Option 2</MenuItem>
    <MenuItem key="3">Option 3</MenuItem>
  </Menu>
)

;<StackingLayout>
  <ButtonGroup>
    <Tooltip
      oldTooltip={false}
      content={'content'}
      contentProps={{ style: { maxWidth: 300 } }}
      getPopupContainer={() => document.querySelector('.right-panel')}
    >
      <Button>Save</Button>
    </Tooltip>
    <Button aria-label="Settings">
      <SettingsIcon aria-hidden="true" />
    </Button>
    <Button>Cancel</Button>
    <Button disabled={true}>Deploy</Button>
    <Button>Update</Button>
    <Dropdown popup={menu}>
      <Button aria-label="More options">
        <PlusIcon size="small" aria-hidden="true" />
      </Button>
    </Dropdown>
  </ButtonGroup>
</StackingLayout>
```

#### Secondary

```tsx
import {
  Menu,
  ButtonGroup,
  Button,
  MenuItem,
  StackingLayout,
  SettingsIcon,
  Dropdown,
  PlusIcon,
} from '@nutanix-ui/prism-reactjs'

const menu = (
  <Menu appearance={Menu.MenuAppearance.COMPACT}>
    <MenuItem key="1">Option 1</MenuItem>
    <MenuItem key="2">Option 2</MenuItem>
    <MenuItem key="3">Option 3</MenuItem>
  </Menu>
)

;<StackingLayout>
  <ButtonGroup>
    <Button type={Button.ButtonTypes.SECONDARY}>Save</Button>
    <Button aria-label="Settings" type={Button.ButtonTypes.SECONDARY}>
      <SettingsIcon />
    </Button>
    <Button type={Button.ButtonTypes.SECONDARY}>Cancel</Button>
    <Button disabled={true} type={Button.ButtonTypes.SECONDARY}>
      Deploy
    </Button>
    <Button type={Button.ButtonTypes.SECONDARY}>Update</Button>
    <Dropdown popup={menu}>
      <Button type={Button.ButtonTypes.SECONDARY} aria-label="More">
        <PlusIcon size="small" aria-hidden="true" />
      </Button>
    </Dropdown>
  </ButtonGroup>
</StackingLayout>
```

#### Destructive

```tsx
import {
  Menu,
  ButtonGroup,
  Button,
  MenuItem,
  StackingLayout,
  SettingsIcon,
  Dropdown,
  PlusIcon,
} from '@nutanix-ui/prism-reactjs'

const menu = (
  <Menu appearance={Menu.MenuAppearance.COMPACT}>
    <MenuItem key="1">Option 1</MenuItem>
    <MenuItem key="2">Option 2</MenuItem>
    <MenuItem key="3">Option 3</MenuItem>
  </Menu>
)

;<StackingLayout>
  <ButtonGroup>
    <Button type={Button.ButtonTypes.DESTRUCTIVE}>Save</Button>
    <Button aria-label="Settings" type={Button.ButtonTypes.DESTRUCTIVE}>
      <SettingsIcon />
    </Button>
    <Button type={Button.ButtonTypes.DESTRUCTIVE}>Cancel</Button>
    <Button disabled={true} type={Button.ButtonTypes.DESTRUCTIVE}>
      Deploy
    </Button>
    <Button type={Button.ButtonTypes.DESTRUCTIVE}>Update</Button>
    <Dropdown popup={menu}>
      <Button type={Button.ButtonTypes.DESTRUCTIVE} aria-label="More">
        <PlusIcon size="small" aria-hidden="true" />
      </Button>
    </Dropdown>
  </ButtonGroup>
</StackingLayout>
```

---

## `AdaptiveButtonGroup`

A responsive toolbar composed of an optional **primary** action and an optional **secondary** `ButtonGroup`. Secondary buttons that no longer fit the container width, or exceed `maxVisibleButtons`, automatically collapse into a "More" overflow dropdown (`TripleDotHorizontalIcon` trigger). The overflow preserves per-item behaviour: dropdown items become `MenuGroup`s, tooltip-bearing items keep their tooltips on the `MenuItem`.

Renders with `role="toolbar"` on the root element.

### `AdaptiveButtonGroupProps`

Extends: `Omit<FlexLayoutProps, 'children' | 'itemSpacing'>` and `MoreButtonHostProps`

| Prop                      | Type                                                          | Required | Default | Description                                                                                                                                                                                  |
| ------------------------- | ------------------------------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `primaryAction`           | `AdaptivePrimaryAction`                                       | no       | —       | Optional primary (blue) action rendered first. Plain, dropdown-trigger, or split-button variant. `dropdownProps` and `splitButtonProps` are mutually exclusive.                              |
| `secondaryActions`        | `AdaptiveSecondaryAction[]`                                   | no       | `[]`    | Optional secondary (grey) actions rendered in a `ButtonGroup`. Tail items collapse into the "More" dropdown when the container is too narrow.                                                |
| `maxVisibleButtons`       | `number`                                                      | no       | `5`     | Hard cap on total visible buttons (primary counts as 1). Secondary section is capped at `maxVisibleButtons - 1` when a primary is present. Width-based overflow still applies independently. |
| `className`               | `string`                                                      | no       | —       | Additional CSS class on the root container.                                                                                                                                                  |
| `aria-label`              | `string`                                                      | no       | —       | Accessible label for the `role="toolbar"` container.                                                                                                                                         |
| `data-test`               | `string`                                                      | no       | —       | Test selector on the root container.                                                                                                                                                         |
| `moreButtonProps`         | `Omit<ButtonProps, 'type' \| 'children'>`                     | no       | —       | Additional props for the "More" overflow trigger button. `type` and `children` are managed internally.                                                                                       |
| `moreButtonTooltipProps`  | `Omit<ToolTipProps, 'children' \| 'content' \| 'oldTooltip'>` | no       | —       | Props for the Tooltip wrapping the "More" button. Tooltip `content` defaults to the localized "More" label. `mouseEnterDelay` defaults to `300`.                                             |
| `moreButtonDropdownProps` | `Omit<DropdownProps, 'children' \| 'popup'>`                  | no       | —       | Props for the Dropdown wrapping the "More" button. Popup contents are computed from overflowed items.                                                                                        |
| …                         | `FlexLayoutProps`                                             | no       | —       | Other `FlexLayout` props are forwarded. `itemGap` defaults to `'S'`.                                                                                                                         |

### `AdaptivePrimaryAction`

Extends `Omit<ButtonProps, 'type' | 'children' | 'ref'>` and `DropdownOrSplitVariant`.

| Field              | Type                                             | Required | Description                                                                                                                |
| ------------------ | ------------------------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| `children`         | `React.ReactNode`                                | yes      | Primary action label.                                                                                                      |
| `tooltipProps`     | `Omit<ToolTipProps, 'children' \| 'oldTooltip'>` | no       | Wraps the entire primary section in a Tooltip.                                                                             |
| `dropdownProps`    | `Omit<DropdownProps, 'children'>`                | no       | Makes the primary button a dropdown trigger with a trailing `ChevronDownIcon`. Mutually exclusive with `splitButtonProps`. |
| `splitButtonProps` | `AdaptiveSplitButtonProps`                       | no       | Renders a split-button arrangement (main action + separate chevron button). Mutually exclusive with `dropdownProps`.       |

### `AdaptiveSplitButtonProps` (`SplitButtonConfig`)

| Field           | Type                                      | Required | Description                                                                                                  |
| --------------- | ----------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `dropdownProps` | `Omit<DropdownProps, 'children'>`         | yes      | Dropdown props for the trailing chevron button. Supply `popup` with a `Menu`.                                |
| `icon`          | `React.ReactNode`                         | no       | Icon inside the chevron button. Defaults to `<ChevronDownIcon />`.                                           |
| `aria-label`    | `string`                                  | no       | Accessible label for the chevron button (required for screen-reader users; the button only has an icon).     |
| `buttonProps`   | `Omit<ButtonProps, 'type' \| 'children'>` | no       | Additional props for the chevron button. `type` is inherited from the primary; `children` comes from `icon`. |

### `AdaptiveSecondaryAction`

Extends `Omit<ButtonProps, 'type' | 'children' | 'ref' | 'key'>`.

| Field             | Type                                             | Required | Description                                                                                                                    |
| ----------------- | ------------------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `key`             | `string \| number`                               | yes      | Stable identifier used as the React key and for overflow-menu click dispatch.                                                  |
| `children`        | `React.ReactNode`                                | yes      | Button label / icon.                                                                                                           |
| `overflowLabel`   | `React.ReactNode`                                | no       | Label used as the `MenuItem` / `MenuGroup` title when overflowed. Falls back to `children` (when string), then `aria-label`.   |
| `dropdownOptions` | `DropdownOption[]`                               | no       | Structured list of dropdown options. Visible button is wrapped in a `Dropdown`; when overflowed, options become a `MenuGroup`. |
| `dropdownProps`   | `Omit<DropdownProps, 'children' \| 'popup'>`     | no       | Extra props for the visible `Dropdown` wrapper. `popup` is managed internally.                                                 |
| `tooltipProps`    | `Omit<ToolTipProps, 'children' \| 'oldTooltip'>` | no       | Wraps the visible button in a `Tooltip`; forwarded to `MenuItem.tooltipProps` when overflowed.                                 |

### `DropdownOption` (shared)

Used in `AdaptiveSecondaryAction.dropdownOptions` and `TextButtonGroupItem.dropdownOptions`.

| Field          | Type                                             | Required | Description                                                                                                 |
| -------------- | ------------------------------------------------ | -------- | ----------------------------------------------------------------------------------------------------------- |
| `key`          | `string \| number`                               | yes      | React key and click-dispatch identifier.                                                                    |
| `children`     | `React.ReactNode`                                | yes      | Option label.                                                                                               |
| `onClick`      | `(event: React.MouseEvent) => void`              | no       | Invoked when the option is selected, regardless of whether it rendered in a Dropdown or overflow MenuGroup. |
| `disabled`     | `boolean`                                        | no       | Disables the option in both the visible Dropdown and the overflow MenuGroup.                                |
| `tooltipProps` | `Omit<ToolTipProps, 'children' \| 'oldTooltip'>` | no       | Forwarded to `MenuItem.tooltipProps` in both rendering paths. `oldTooltip` is locked to `false`.            |
| `aria-label`   | `string`                                         | no       | Accessible label for the option's `MenuItem`.                                                               |
| `data-test`    | `string`                                         | no       | Test selector for the option's `MenuItem`.                                                                  |

### Source Examples — `AdaptiveButtonGroup`

#### Basic usage (primary + secondaries)

```tsx
import { AdaptiveButtonGroup, StackingLayout } from '@nutanix-ui/prism-reactjs'

const getPopupContainer = () => document.querySelector('.right-panel')

const secondary = [
  { key: 'edit', children: 'Edit' },
  { key: 'duplicate', children: 'Duplicate' },
  { key: 'download', children: 'Download' },
  { key: 'share', children: 'Share' },
]

;<StackingLayout>
  <AdaptiveButtonGroup
    aria-label="Document actions"
    primaryAction={{ children: 'Save' }}
    secondaryActions={secondary}
    moreButtonDropdownProps={{ getPopupContainer }}
  />
</StackingLayout>
```

#### Split primary button

```tsx
import {
  AdaptiveButtonGroup,
  Menu,
  MenuItem,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'

const getPopupContainer = () => document.querySelector('.right-panel')

const saveMenu = (
  <Menu appearance={Menu.MenuAppearance.COMPACT}>
    <MenuItem key="save-and-new">Save and New</MenuItem>
    <MenuItem key="save-and-close">Save and Close</MenuItem>
    <MenuItem key="save-draft">Save as Draft</MenuItem>
  </Menu>
)

const secondary = [
  { key: 'edit', children: 'Edit' },
  { key: 'duplicate', children: 'Duplicate' },
  { key: 'delete', children: 'Delete' },
]

;<StackingLayout>
  <AdaptiveButtonGroup
    aria-label="Save actions"
    primaryAction={{
      children: 'Save',
      splitButtonProps: {
        'aria-label': 'More save options',
        dropdownProps: { popup: saveMenu, getPopupContainer },
      },
    }}
    secondaryActions={secondary}
    moreButtonDropdownProps={{ getPopupContainer }}
  />
</StackingLayout>
```

#### Dropdown primary button

```tsx
import {
  AdaptiveButtonGroup,
  Menu,
  MenuItem,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'

const getPopupContainer = () => document.querySelector('.right-panel')

const actionsMenu = (
  <Menu appearance={Menu.MenuAppearance.COMPACT}>
    <MenuItem key="create-cluster">Create Cluster</MenuItem>
    <MenuItem key="create-vm">Create VM</MenuItem>
    <MenuItem key="create-snapshot">Create Snapshot</MenuItem>
  </Menu>
)

;<StackingLayout>
  <AdaptiveButtonGroup
    aria-label="Resource actions"
    primaryAction={{
      children: 'Actions',
      dropdownProps: { popup: actionsMenu, getPopupContainer },
    }}
    secondaryActions={[
      { key: 'import', children: 'Import' },
      { key: 'export', children: 'Export' },
      { key: 'refresh', children: 'Refresh' },
    ]}
    moreButtonDropdownProps={{ getPopupContainer }}
  />
</StackingLayout>
```

#### Secondary actions with dropdown options

```tsx
import { AdaptiveButtonGroup, StackingLayout } from '@nutanix-ui/prism-reactjs'

const getPopupContainer = () => document.querySelector('.right-panel')

;<StackingLayout>
  <AdaptiveButtonGroup
    aria-label="Document actions"
    primaryAction={{ children: 'Save' }}
    secondaryActions={[
      { key: 'edit', children: 'Edit', onClick: () => console.log('Edit') },
      {
        key: 'duplicate',
        children: 'Duplicate',
        onClick: () => console.log('Duplicate'),
      },
      {
        key: 'export',
        children: 'Export',
        overflowLabel: 'Export as',
        dropdownProps: { getPopupContainer },
        dropdownOptions: [
          {
            key: 'export-csv',
            children: 'Export as CSV',
            onClick: () => console.log('Export CSV'),
          },
          {
            key: 'export-json',
            children: 'Export as JSON',
            onClick: () => console.log('Export JSON'),
          },
          {
            key: 'export-pdf',
            children: 'Export as PDF',
            onClick: () => console.log('Export PDF'),
          },
        ],
      },
    ]}
    moreButtonDropdownProps={{ getPopupContainer }}
  />
</StackingLayout>
```

#### Count-based overflow cap

```tsx
import { AdaptiveButtonGroup, StackingLayout } from '@nutanix-ui/prism-reactjs'

// maxVisibleButtons=3: primary + 2 secondaries visible; the rest collapse into "More"
;<StackingLayout>
  <AdaptiveButtonGroup
    aria-label="Resource actions capped at 3"
    primaryAction={{ children: 'Save' }}
    secondaryActions={[
      { key: 'edit', children: 'Edit' },
      { key: 'duplicate', children: 'Duplicate' },
      { key: 'share', children: 'Share' },
      { key: 'download', children: 'Download' },
      { key: 'delete', children: 'Delete' },
    ]}
    maxVisibleButtons={3}
    moreButtonDropdownProps={{
      getPopupContainer: () => document.querySelector('.right-panel'),
    }}
  />
</StackingLayout>
```

---

## `TextButtonGroup`

Responsive group of text-type buttons (`TEXT_*` and `TEXT_NAVIGATION_*` types) that collapses overflowing items into a "More" dropdown. Unlike `AdaptiveButtonGroup`, all items are the same visual weight — there is no primary/secondary split. Items are rendered once and pulled off-screen via CSS when they overflow, so `offsetWidth` measurements stay accurate without maintaining measurement clones.

Renders with `role="toolbar"` on the root element.

### `TextButtonGroupProps`

Extends: `Omit<FlexLayoutProps, 'children'>` and `MoreButtonHostProps`

| Prop                      | Type                                                          | Required | Default | Description                                                                                                                                      |
| ------------------------- | ------------------------------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `items`                   | `TextButtonGroupItem[]`                                       | yes      | —       | Ordered list of button configurations. All items must share the same button-type family (standard text or navigation text).                      |
| `className`               | `string`                                                      | no       | —       | Additional CSS class on the root container.                                                                                                      |
| `aria-label`              | `string`                                                      | no       | —       | Accessible label for the `role="toolbar"` container.                                                                                             |
| `data-test`               | `string`                                                      | no       | —       | Test selector.                                                                                                                                   |
| `moreButtonProps`         | `Omit<ButtonProps, 'type' \| 'children'>`                     | no       | —       | Additional props for the "More" overflow trigger button. Set `type` here to match the item button type (e.g. `Button.ButtonTypes.TEXT_PRIMARY`). |
| `moreButtonTooltipProps`  | `Omit<ToolTipProps, 'children' \| 'content' \| 'oldTooltip'>` | no       | —       | Tooltip props for the "More" button. `mouseEnterDelay` defaults to `300`.                                                                        |
| `moreButtonDropdownProps` | `Omit<DropdownProps, 'children' \| 'popup'>`                  | no       | —       | Dropdown props for the "More" button. Popup is computed from overflowed items.                                                                   |
| …                         | `FlexLayoutProps`                                             | no       | —       | Other `FlexLayout` props are forwarded. `itemGap` defaults to `'S'`; `padding` defaults to `'5px'`.                                              |

### `TextButtonGroupItem`

Extends `Omit<ButtonProps, 'type'>`.

| Field             | Type                                             | Required | Description                                                                                                                       |
| ----------------- | ------------------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `key`             | `string \| number`                               | yes      | Stable React key and overflow-menu click-dispatch identifier (React-reserved, validated at JSX level not PropTypes).              |
| `children`        | `React.ReactNode`                                | yes      | Button label.                                                                                                                     |
| `type`            | `TextButtonType \| TextNavigationButtonType`     | no       | Button variant. All items in a single `TextButtonGroup` must use either standard text types or navigation text types — not a mix. |
| `overflowLabel`   | `React.ReactNode`                                | no       | Label used as the `MenuItem` / `MenuGroup` title when overflowed. Falls back to `children` (when string), then `aria-label`.      |
| `dropdownOptions` | `DropdownOption[]`                               | no       | When provided, the visible button is wrapped in a `Dropdown`; when overflowed the options become a `MenuGroup`.                   |
| `dropdownProps`   | `Omit<DropdownProps, 'children' \| 'popup'>`     | no       | Extra props for the visible `Dropdown` wrapper.                                                                                   |
| `tooltipProps`    | `Omit<ToolTipProps, 'children' \| 'oldTooltip'>` | no       | Wraps the visible button in a `Tooltip`; forwarded to `MenuItem.tooltipProps` when overflowed.                                    |

### Allowed `TextButtonType` values

```tsx
import { Button } from '@nutanix-ui/prism-reactjs'

// Standard text types
Button.ButtonTypes.TEXT_NORMAL
Button.ButtonTypes.TEXT_PRIMARY
Button.ButtonTypes.TEXT_SECONDARY
Button.ButtonTypes.TEXT_DESTRUCTIVE
Button.ButtonTypes.TEXT_ALERT_INFO
Button.ButtonTypes.TEXT_ALERT_SUCCESS
Button.ButtonTypes.TEXT_ALERT_WARNING
Button.ButtonTypes.TEXT_ALERT_ERROR

// Navigation text types (must not be mixed with standard types in the same group)
Button.ButtonTypes.TEXT_NAVIGATION_PRIMARY
Button.ButtonTypes.TEXT_NAVIGATION_SECONDARY
Button.ButtonTypes.TEXT_NAVIGATION_INFO
```

When any item uses a navigation type, the component automatically switches the internal `Menu`, `Dropdown`, and "More" button to their navigation-themed variants.

### Source Examples — `TextButtonGroup`

#### Standard text buttons

```tsx
import {
  TextButtonGroup,
  Button,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'

const items = [
  { key: '1', children: 'Overview', type: Button.ButtonTypes.TEXT_PRIMARY },
  { key: '2', children: 'Details', type: Button.ButtonTypes.TEXT_PRIMARY },
  { key: '3', children: 'Settings', type: Button.ButtonTypes.TEXT_PRIMARY },
  { key: '4', children: 'Monitoring', type: Button.ButtonTypes.TEXT_PRIMARY },
  { key: '5', children: 'Diagnostics', type: Button.ButtonTypes.TEXT_PRIMARY },
  { key: '6', children: 'Config', type: Button.ButtonTypes.TEXT_PRIMARY },
]

;<StackingLayout>
  <TextButtonGroup
    items={items}
    aria-label="Section navigation"
    moreButtonProps={{ type: Button.ButtonTypes.TEXT_PRIMARY }}
  />
</StackingLayout>
```

#### Navigation text buttons

```tsx
import {
  TextButtonGroup,
  Button,
  FlexLayout,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'

const items = [
  {
    key: '1',
    children: 'Dashboard',
    type: Button.ButtonTypes.TEXT_NAVIGATION_PRIMARY,
  },
  {
    key: '2',
    children: 'Analytics',
    type: Button.ButtonTypes.TEXT_NAVIGATION_PRIMARY,
  },
  {
    key: '3',
    children: 'Reports',
    type: Button.ButtonTypes.TEXT_NAVIGATION_PRIMARY,
  },
  {
    key: '4',
    children: 'Users',
    type: Button.ButtonTypes.TEXT_NAVIGATION_PRIMARY,
  },
  {
    key: '5',
    children: 'Integrations',
    type: Button.ButtonTypes.TEXT_NAVIGATION_PRIMARY,
  },
]

;<StackingLayout>
  <FlexLayout className="ntnx-navigation-example">
    <TextButtonGroup items={items} aria-label="App navigation" />
  </FlexLayout>
</StackingLayout>
```

#### With per-item tooltips preserved on overflow

```tsx
import {
  TextButtonGroup,
  Button,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'

const items = [
  {
    key: 'edit',
    children: 'Edit',
    type: Button.ButtonTypes.TEXT_PRIMARY,
    tooltipProps: { content: 'Modify this resource' },
  },
  {
    key: 'archive',
    children: 'Archive',
    type: Button.ButtonTypes.TEXT_PRIMARY,
    disabled: true,
    tooltipProps: { content: 'Archive is unavailable for read-only items' },
  },
  {
    key: 'duplicate',
    children: 'Duplicate',
    type: Button.ButtonTypes.TEXT_PRIMARY,
    tooltipProps: { content: 'Create a copy with the same configuration' },
  },
  {
    key: 'delete',
    children: 'Delete',
    type: Button.ButtonTypes.TEXT_DESTRUCTIVE,
    tooltipProps: { content: 'Permanently delete this resource' },
  },
]

;<StackingLayout>
  <TextButtonGroup items={items} aria-label="Resource actions" />
</StackingLayout>
```

#### With dropdown options

```tsx
import {
  TextButtonGroup,
  Button,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'

const items = [
  {
    key: 'open',
    children: 'Open',
    type: Button.ButtonTypes.TEXT_PRIMARY,
    onClick: () => console.log('Open'),
  },
  {
    key: 'export',
    children: 'Export',
    type: Button.ButtonTypes.TEXT_PRIMARY,
    overflowLabel: 'Export as',
    dropdownOptions: [
      {
        key: 'export-csv',
        children: 'Export as CSV',
        onClick: () => console.log('Export CSV'),
      },
      {
        key: 'export-json',
        children: 'Export as JSON',
        tooltipProps: { content: 'Machine-readable, preserves field types' },
        onClick: () => console.log('Export JSON'),
      },
      {
        key: 'export-pdf',
        children: 'Export as PDF',
        onClick: () => console.log('Export PDF'),
      },
    ],
  },
  {
    key: 'delete',
    children: 'Delete',
    type: Button.ButtonTypes.TEXT_DESTRUCTIVE,
    onClick: () => console.log('Delete'),
  },
]

;<StackingLayout>
  <TextButtonGroup items={items} aria-label="Document actions" />
</StackingLayout>
```

---

### Usage Notes

- **Choose the right component:**
  - `ButtonGroup` — manual composition of bordered buttons (primary, secondary, destructive), no overflow handling.
  - `AdaptiveButtonGroup` — toolbar with a prominent primary action plus responsive secondary buttons; use for entity detail pages, form footers, and toolbars.
  - `TextButtonGroup` — responsive row of text-only buttons; use for tab-bar-style navigation or in-context action rows (e.g. EBR action bars).
- **`ButtonGroup` child restriction:** only `Button`, `Dropdown`, `Tooltip`, and `Popover` are allowed as direct children. Wrapping a `Button` in `Tooltip` before placing it inside `ButtonGroup` is the correct pattern when a tooltip is needed on an individual button.
- **Enum values:** prefer `Button.ButtonTypes.SECONDARY` over the raw string `"secondary"`.
- **Toolbar accessibility:** `AdaptiveButtonGroup` and `TextButtonGroup` render with `role="toolbar"` and support `aria-label`. Always supply `aria-label` on toolbar-style usages.
- **Icon-only buttons inside `ButtonGroup`:** always supply `aria-label` on the `Button` and `aria-hidden="true"` on the icon.
- **`oldTooltip={false}`** is required on any `Tooltip` placed inside a `ButtonGroup` to opt in to the new tooltip behaviour.
- **`getPopupContainer`:** supply this on `Dropdown` and `Tooltip` when the group lives inside a scrolling or positioned container to prevent clipping.
- **Layout:** use `FlexLayout` props (`itemGap`, `padding`, `alignItems`, `justifyContent`) rather than custom CSS for spacing adjustments on `ButtonGroup`.

<!-- SOURCE-API-END -->
