# DashboardWidgetHeader

## Figma

- **Library name:** Widget Header (page: N/A, frame: Widget Header)

## React

Import: `import { DashboardWidgetHeader } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import { DashboardWidgetHeader } from '@nutanix-ui/prism-reactjs'
```

### Exported Type Aliases

#### `DashboardWidgetHeaderProps`

The component uses a discriminated union to prevent `titleProps` from being used when `title` is a React node (non-string).

```ts
type DashboardWidgetHeaderProps = CommonDashboardWidgetHeaderProps &
  ConditionalDashboardWidgetHeaderProps
```

Where:

```ts
// String title — titleProps is allowed
type ConditionalDashboardWidgetHeaderProps =
  | {
      title?: string
      titleProps?: Omit<TitleProps, 'children'> &
        Omit<TruncateComponentProps, 'children'>
    }
  // ReactNode title — titleProps must NOT be set
  | { title?: React.ReactNode; titleProps?: never }
```

---

### Props

`DashboardWidgetHeader` extends `FlexLayoutProps` (omitting `title`). All `FlexLayout` props (e.g. `itemGap`, `alignItems`, `justifyContent`) are forwarded to the root element.

| Prop                | Type                                                                         | Default | Required | Description                                                                                                                                                   |
| ------------------- | ---------------------------------------------------------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`             | `string \| React.ReactNode`                                                  | —       | No       | Header title. When a `string`, the text is automatically truncated with a tooltip. When a `ReactNode`, you own the full layout; `titleProps` must not be set. |
| `titleProps`        | `Omit<TitleProps, 'children'> & Omit<TruncateComponentProps, 'children'>`    | —       | No       | Extra props forwarded to the internal `Truncate(Title)` component. Only valid when `title` is a `string`; a propTypes error is thrown otherwise.              |
| `showCloseIcon`     | `boolean`                                                                    | `true`  | No       | Whether to render the close button. When `true` and right-side content is present, a `VerticalSeparator` is inserted before the button.                       |
| `onClose`           | `ButtonProps['onClick']` (i.e. `React.MouseEventHandler<HTMLButtonElement>`) | —       | No       | Click handler for the close button.                                                                                                                           |
| `closeButtonProps`  | `Omit<ButtonProps, 'onClick'>`                                               | —       | No       | Extra props forwarded to the close `Button` (type is always `ButtonTypes.ICON_SECONDARY`).                                                                    |
| `customInfo`        | `React.ReactNode`                                                            | —       | No       | Arbitrary content rendered in the right-side `Separator` group. A missing `key` is added automatically via `React.cloneElement`.                              |
| `supplementaryInfo` | `string`                                                                     | —       | No       | Short supplementary text rendered as a `Paragraph` with `type="supplementary"` in the right-side group.                                                       |
| `selectProps`       | `SelectProps`                                                                | —       | No       | When provided, renders a `Select` in the right-side group.                                                                                                    |
| `paginationProps`   | `PaginationProps`                                                            | —       | No       | When provided, renders a `Pagination` in the right-side group.                                                                                                |
| `linkProps`         | `LinkProps`                                                                  | —       | No       | When provided, renders a `Link` in the right-side group.                                                                                                      |
| `className`         | `string`                                                                     | —       | No       | Additional CSS class appended to the root element.                                                                                                            |

> **Right-side group ordering:** `customInfo` → `supplementaryInfo` → `Select` → `Pagination` → `Link`. Each item is separated by a `VerticalSeparator` via the `Separator` component with `spacing="spacing-20px"`.

---

### Behaviour Notes

- The root element is a `FlexLayout` with `justifyContent="space-between"` and `alignItems="center"`. The BEM class `ntnx-dashboard-widget-header` is always applied; `show-close` is added when `showCloseIcon` is `true`.
- When `title` is a `string`, it is rendered with `Truncate(Title)` at size `Title.SIZES.H3` (`"h3"`) with `forceSingleLine={true}`. The tooltip defaults to `placement="top"`, `oldTooltip: false`, and `appearance: Tooltip.APPEARANCE.SECONDARY`. Any `tooltipProps` passed via `titleProps` are merged on top of these defaults.
- When `title` is a `ReactNode`, it is rendered as-is — the consumer is responsible for layout, truncation, and tooltip.
- The close button uses `Button.ButtonTypes.ICON_SECONDARY` and its accessible label is resolved via `I18nManager` (key: `DashboardWidgetHeader` / `close`).
- `data-*` attributes and any other `FlexLayoutProps` are spread to the root `FlexLayout` element (confirmed in tests: `data-test="test"` appears on the root `div.ntnx-dashboard-widget-header`).

---

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Basic Usage — with close handler

```tsx
import {
  DashboardWidgetHeader,
  ContainerLayout,
} from '@nutanix-ui/prism-reactjs'

function handleOnClose() {
  alert('Handle OnClose')
}

;<div
  className="nsg-example-borderless-content"
  style={{ width: 400 }}
  data-test-id="basic-usage"
>
  <ContainerLayout backgroundColor="white">
    <DashboardWidgetHeader title="My Title" onClose={handleOnClose} />
  </ContainerLayout>
</div>
```

#### Hide close icon

```tsx
import {
  DashboardWidgetHeader,
  ContainerLayout,
} from '@nutanix-ui/prism-reactjs'
;<div
  className="nsg-example-borderless-content"
  style={{ width: 400 }}
  data-test-id="show-close-icon"
>
  <ContainerLayout backgroundColor="white">
    <DashboardWidgetHeader title="My Title" showCloseIcon={false} />
  </ContainerLayout>
</div>
```

#### Long title with tooltip

When the title string overflows its container, the component truncates it and shows a `Tooltip`. Pass `titleProps.tooltipProps` to customise the tooltip.

```tsx
import {
  DashboardWidgetHeader,
  ContainerLayout,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'
;<div
  className="nsg-example-borderless-content"
  style={{ width: 400 }}
  data-test-id="long-name"
>
  <StackingLayout>
    <ContainerLayout backgroundColor="white">
      <DashboardWidgetHeader
        title="Very Very Long.  sldsjdklf sdfklsjdfk sdf sdf sdf sdf sdf sdf"
        showCloseIcon={true}
        data-test-id="long-name-title"
        titleProps={{
          tooltipProps: {
            contentProps: {
              'data-test-id': 'long-name-tooltip',
            },
          },
        }}
      />
    </ContainerLayout>
    <ContainerLayout backgroundColor="white">
      <DashboardWidgetHeader
        title="Very Very Long.  sldsjdklf sdfklsjdfk sdf sdf sdf sdf sdf sdf"
        showCloseIcon={false}
      />
    </ContainerLayout>
  </StackingLayout>
</div>
```

#### Custom ReactNode title with icon buttons

When `title` is a `ReactNode`, set `showCloseIcon={false}` or keep the default. `titleProps` must not be passed.

```tsx
import {
  DashboardWidgetHeader,
  FlexLayout,
  FilterIcon,
  TimeIcon,
  SettingsIcon,
  Button,
  Title,
  ContainerLayout,
} from '@nutanix-ui/prism-reactjs'

const IconBtn = ({ icon, ...props }) => (
  <Button
    type={Button.ButtonTypes.ICON_SECONDARY}
    aria-label="action"
    {...props}
  >
    {icon}
  </Button>
)

const title = (
  <FlexLayout justifyContent="space-between" style={{ width: '100%' }}>
    <FlexLayout alignItems="center" itemSpacing="10px">
      <Title size="h3">Title</Title>
      <IconBtn icon={<FilterIcon />} aria-label="Filter" />
      <IconBtn icon={<TimeIcon />} aria-label="Time Picker" />
    </FlexLayout>
    <FlexLayout alignItems="center" itemSpacing="10px">
      <IconBtn icon={<SettingsIcon />} aria-label="Settings" />
    </FlexLayout>
  </FlexLayout>
)

;<div
  className="nsg-example-borderless-content"
  style={{ width: 400 }}
  data-test-id="custom-title"
>
  <ContainerLayout backgroundColor="white">
    <DashboardWidgetHeader title={title} showCloseIcon={false} />
  </ContainerLayout>
</div>
```

#### Custom ReactNode title with Truncate

Use `Truncate(Title)` manually inside a custom title node when you need both a truncated title and extra action icons.

```tsx
import {
  DashboardWidgetHeader,
  FlexLayout,
  FilterIcon,
  TimeIcon,
  SettingsIcon,
  Button,
  Title,
  Truncate,
  ContainerLayout,
} from '@nutanix-ui/prism-reactjs'

const TTitle = Truncate(Title)

const IconBtn = ({ icon, ...props }) => (
  <Button
    type={Button.ButtonTypes.ICON_SECONDARY}
    aria-label="action"
    {...props}
  >
    {icon}
  </Button>
)

const title = (
  <FlexLayout justifyContent="space-between" style={{ width: '100%' }}>
    <FlexLayout alignItems="center" itemGap="S" style={{ minWidth: 0 }}>
      <TTitle size="h3">
        Some very long text. Lkdjflskd sdflkjsdl kjsdfs df sdlfksjd lfkjsdl fkj
      </TTitle>
      <IconBtn icon={<FilterIcon />} aria-label="Filter" />
      <IconBtn icon={<TimeIcon />} aria-label="Time Picker" />
    </FlexLayout>
    <FlexLayout alignItems="center" itemSpacing="10px">
      <IconBtn icon={<SettingsIcon />} aria-label="Settings" />
    </FlexLayout>
  </FlexLayout>
)

;<div
  className="nsg-example-borderless-content"
  style={{ width: 600 }}
  data-test-id="custom-with-truncate"
>
  <ContainerLayout backgroundColor="white">
    <DashboardWidgetHeader title={title} showCloseIcon={false} />
  </ContainerLayout>
</div>
```

#### Right-side controls — Select, Pagination, Link, customInfo

```tsx
import {
  DashboardWidgetHeader,
  FlexLayout,
  Badge,
} from '@nutanix-ui/prism-reactjs'

const selectProps = {
  rowsData: [
    { label: 'This Week', key: '0' },
    { label: 'This Month', key: '1' },
  ],
  autoSize: true,
  type: 'mini',
  selectedRow: { label: 'This Week', key: '0' },
}

const paginationProps = {
  total: 50,
  currentPage: 1,
  pageSize: 10,
  showOnlyPage: true,
}

const linkProps = { children: 'View all' }

const alertCount = (
  <FlexLayout>
    <Badge color="red" text="20" />
    <Badge color="yellow" text="5" />
    <Badge color="gray" text="0" />
  </FlexLayout>
)

// selectProps, paginationProps, linkProps, and customInfo are all optional and independent.
;<DashboardWidgetHeader
  title="Multiple header options example"
  selectProps={selectProps}
  showCloseIcon={true}
  supplementaryInfo="Supplementary info"
  customInfo={alertCount}
/>
```

---

### Migration from v1

The `defaultSelectProps` prop was removed. Replace it with `selectProps`, updating the option shape from `{ label, value }` to `{ label, key }` and using `selectedRow` instead of `selectedValue`.

```tsx
// Before (1.x)
<DashboardWidgetHeader defaultSelectProps={{ selectOptions: [...], type: 'mini', selectedValue: '0' }} />

// After (2.x)
<DashboardWidgetHeader selectProps={{ rowsData: [...], autoSize: true, type: 'mini', selectedRow: rowsData[0] }} />
```

### Usage Notes

- `titleProps` is only valid when `title` is a `string`. Passing `titleProps` alongside a `ReactNode` title raises a propTypes error at runtime.
- Prefer documented enum/static values such as `Title.SIZES.H3` over raw strings for `titleProps.size`.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.
- Keep labels, help text, and validation visible and persistent for form controls; use `FormItem*` wrappers where available.

<!-- SOURCE-API-END -->
