# Dashboard Widget

## Figma

- **Library name:** Widget Header (page: Dashboard, frame: Widget) -> `DashboardWidgetHeader`
- **Also matches:** Empty Widget, Widget Container Footer -> `DashboardWidgetLayout`; Widget Table -> `WidgetTable`

## React

Import:

```tsx
import {
  Dashboard,
  DashboardWidgetLayout,
  DashboardWidgetHeader,
  WidgetActionButton,
  WidgetTable,
} from '@nutanix-ui/prism-reactjs'
```

---

### `Dashboard`

A responsive grid-based dashboard container powered by `react-grid-layout`. Widgets are placed left-to-right, top-to-bottom and adapt to breakpoints automatically.

#### Props (`DashboardProps`)

Extends `ResponsiveProps` from `react-grid-layout`.

| Prop             | Type                                           | Default                                           | Required | Notes                                                                            |
| ---------------- | ---------------------------------------------- | ------------------------------------------------- | -------- | -------------------------------------------------------------------------------- |
| `layouts`        | `ResponsiveProps['layouts']`                   | —                                                 | **yes**  | Map of breakpoint → `Layout[]`. At least one breakpoint key is required.         |
| `children`       | `React.ReactNode`                              | —                                                 | **yes**  | Each child must carry a unique `key` matching a `layout.i` value.                |
| `className`      | `string`                                       | —                                                 | no       | Additional class name.                                                           |
| `gridComponent`  | `React.ElementType`                            | internal `WidthProvider(Responsive)`              | no       | Override the grid component (e.g. custom `ResizeObserver`-based width provider). |
| `rowHeight`      | `number`                                       | `295`                                             | no       | Height (px) per grid-row unit.                                                   |
| `cols`           | `ResponsiveProps['cols']`                      | `{ lg:4, md:4, sm:3, xsm:2, xxsm:1 }`             | no       | Column count per breakpoint.                                                     |
| `breakpoints`    | `ResponsiveProps['breakpoints']`               | `{ lg:1700, md:1280, sm:965, xsm:650, xxsm:439 }` | no       | Pixel breakpoints.                                                               |
| `margin`         | `[number, number]`                             | `[20, 20]`                                        | no       | `[horizontal, vertical]` margin in px between widgets.                           |
| `onLayoutChange` | `(layout: Layout[], layouts: Layouts) => void` | —                                                 | no       | Fired when any breakpoint layout changes.                                        |
| `wrapperProps`   | `React.HTMLProps<HTMLDivElement>`              | —                                                 | no       | Extra props for the outer `<div>` (e.g. `data-test-id`).                         |

**Layout item shape** (each entry in a breakpoint array):

| Key      | Type      | Default | Notes                                       |
| -------- | --------- | ------- | ------------------------------------------- |
| `i`      | `string`  | —       | **Required.** Must match a child `key`.     |
| `w`      | `number`  | `1`     | Width in column units.                      |
| `h`      | `number`  | `1`     | Height in row units.                        |
| `x`      | `number`  | `0`     | Column position (hint only; auto-arranged). |
| `y`      | `number`  | `0`     | Row position (hint only; auto-arranged).    |
| `static` | `boolean` | `true`  | Prevents drag/resize by default.            |

> **Accessibility:** Ensure the widget DOM order matches the visual order so keyboard tab sequence is logical.

---

### `DashboardWidgetLayout`

Wrapper component for dashboard widgets providing consistent header / body / footer / loading / error structure.

Extends `HeaderFooterLayoutProps` (which itself extends `FlexLayoutProps`).

#### Props (`DashboardWidgetLayoutProps`)

| Prop               | Type              | Default           | Required | Notes                                                                     |
| ------------------ | ----------------- | ----------------- | -------- | ------------------------------------------------------------------------- |
| `bodyContent`      | `React.ReactNode` | —                 | **yes**  | Widget body. Wrapped in a `Loader` overlay when `loading=true`.           |
| `className`        | `string`          | —                 | no       | Additional class name.                                                    |
| `loading`          | `boolean`         | `false`           | no       | Shows a `Loader` overlay over `bodyContent`.                              |
| `loadingTip`       | `string`          | i18n `"Loading…"` | no       | Text displayed next to the loading spinner.                               |
| `errorMsg`         | `React.ReactNode` | —                 | no       | Error message centred over `bodyContent`. Shown instead of loading state. |
| `header`           | `React.ReactNode` | —                 | no       | Inherited from `HeaderFooterLayoutProps`. Renders in a 40 px header band. |
| `footer`           | `React.ReactNode` | —                 | no       | Inherited. Renders in a 40 px footer band.                                |
| `headerProps`      | `FlexLayoutProps` | —                 | no       | Inherited. Extra `FlexLayout` props for the header wrapper.               |
| `footerProps`      | `FlexLayoutProps` | —                 | no       | Inherited. Extra `FlexLayout` props for the footer wrapper.               |
| `bodyContentProps` | `FlexLayoutProps` | —                 | no       | Inherited. Extra `FlexLayout` props for the body wrapper.                 |

All other `FlexLayoutProps` are forwarded to the root `HeaderFooterLayout`.

---

### `DashboardWidgetHeader`

Header component for dashboard widgets. Supports title, close button, supplementary info, a filter `Select`, pagination, a link action, and fully custom content. Extends `FlexLayoutProps`.

#### Props (`DashboardWidgetHeaderProps`)

| Prop                | Type                                                    | Default | Required | Notes                                                                                                              |
| ------------------- | ------------------------------------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `title`             | `string \| React.ReactNode`                             | —       | no       | When `string`, rendered as a truncating `Title` (H3) with tooltip. When a node, rendered as-is.                    |
| `titleProps`        | `Omit<TitleProps & TruncateComponentProps, 'children'>` | —       | no       | Only valid when `title` is a `string`. Pass `tooltipProps` to customize the truncation tooltip.                    |
| `showCloseIcon`     | `boolean`                                               | `true`  | no       | Shows the close `Button` (icon-secondary style). A `VerticalSeparator` is added when right-side items are present. |
| `onClose`           | `ButtonProps['onClick']`                                | —       | no       | Click handler for the close button.                                                                                |
| `closeButtonProps`  | `Omit<ButtonProps, 'onClick'>`                          | —       | no       | Extra props forwarded to the close `Button` (e.g. `innerRef` for programmatic focus).                              |
| `customInfo`        | `React.ReactNode`                                       | —       | no       | Arbitrary content in the right-hand section (e.g. `Badge` counts).                                                 |
| `supplementaryInfo` | `string`                                                | —       | no       | Secondary text rendered as a `Paragraph` with `type="supplementary"`.                                              |
| `selectProps`       | `SelectProps`                                           | —       | no       | Renders a `Select` (mini type recommended) in the right-hand section.                                              |
| `paginationProps`   | `PaginationProps`                                       | —       | no       | Renders a `Pagination` control in the right-hand section.                                                          |
| `linkProps`         | `LinkProps`                                             | —       | no       | Renders a `Link` in the right-hand section (e.g. `type="with-icon"` for an action link).                           |
| `className`         | `string`                                                | —       | no       | Additional class name.                                                                                             |

All other `FlexLayoutProps` are forwarded to the root `FlexLayout`.

> **Note:** `titleProps` is mutually exclusive with a ReactNode `title`. Passing `titleProps` when `title` is not a string causes a PropTypes error.

> **Migration note:** The old `defaultSelectProps` prop (v1.x) was removed. Use `selectProps` instead.

---

### `WidgetActionButton`

A lightweight icon-only `<button>` for actions overlaid on a dashboard widget (e.g. close, resize). **Use only inside dashboard widget items.**

Extends `ButtonHTMLAttributes<HTMLButtonElement>` (except `type`, which is always `"button"`).

#### Props (`WidgetActionButtonProps`)

| Prop         | Type                | Default         | Required | Notes                                                              |
| ------------ | ------------------- | --------------- | -------- | ------------------------------------------------------------------ |
| `children`   | `React.ReactNode`   | —               | **yes**  | Must be an SVG icon component.                                     |
| `aria-label` | `string`            | i18n `"action"` | no       | Provide a descriptive label for screen readers.                    |
| `className`  | `string`            | —               | no       | Additional class name.                                             |
| `disabled`   | `boolean`           | —               | no       | Disables the button and suppresses `onClick`.                      |
| `onClick`    | `MouseEventHandler` | —               | no       | Inherited from `ButtonHTMLAttributes`. Suppressed when `disabled`. |

---

### `WidgetTable`

A borderless `Table` variant designed for compact widget layouts. Wraps `Table` with `border={false}` and hides the column header by default.

Accepts all `TableProps` plus:

| Prop         | Type                     | Default | Required | Notes                                                            |
| ------------ | ------------------------ | ------- | -------- | ---------------------------------------------------------------- |
| `hideHeader` | `boolean \| "no-header"` | `true`  | no       | Hides the table column header. Overrides `structure.hideHeader`. |
| `className`  | `string`                 | —       | no       | Additional class name.                                           |

---

## TSX Examples

### Minimal widget

```tsx
<DashboardWidgetLayout
  header={<DashboardWidgetHeader title="CPU Usage" />}
  bodyContent={<span>Widget body content</span>}
/>
```

### Widget with close button and supplementary info

```tsx
<DashboardWidgetLayout
  header={
    <DashboardWidgetHeader
      title="CPU Usage"
      supplementaryInfo="Last 24 hours"
      showCloseIcon={true}
      onClose={handleRemoveWidget}
    />
  }
  bodyContent={<span>Chart goes here</span>}
  loading={isLoading}
  loadingTip="Loading metrics..."
  errorMsg={error ? 'Failed to load metrics' : undefined}
/>
```

### Widget with footer and WidgetTable

```tsx
import {
  DashboardWidgetLayout,
  DashboardWidgetHeader,
  WidgetTable,
  Link,
} from '@nutanix-ui/prism-reactjs'

const columns = [
  { title: 'Name', key: 'name' },
  { title: 'Status', key: 'status' },
]

const data = [
  { key: '1', name: 'apache', status: 'Active' },
  { key: '2', name: 'nginx', status: 'Warning' },
]

;<DashboardWidgetLayout
  header={<DashboardWidgetHeader title="Top Policies" showCloseIcon={false} />}
  bodyContent={<WidgetTable rowKey="key" dataSource={data} columns={columns} />}
  footer={<Link>View All Policies</Link>}
  footerProps={{ justifyContent: 'center' }}
/>
```

### Widget header with select filter and close

```tsx
import {
  DashboardWidgetLayout,
  DashboardWidgetHeader,
} from '@nutanix-ui/prism-reactjs'

const selectOptions = [
  { label: 'This Week', key: '0' },
  { label: 'This Month', key: '1' },
]

;<DashboardWidgetLayout
  header={
    <DashboardWidgetHeader
      title="Alert Summary"
      showCloseIcon={true}
      onClose={handleClose}
      selectProps={{
        rowsData: selectOptions,
        autoSize: true,
        type: 'mini',
        selectedRow: selectOptions[0],
      }}
    />
  }
  bodyContent={<span>Chart goes here</span>}
/>
```

### Widget header with link action

```tsx
import {
  DashboardWidgetHeader,
  DashboardWidgetLayout,
  PlusIcon,
} from '@nutanix-ui/prism-reactjs'
;<DashboardWidgetLayout
  header={
    <DashboardWidgetHeader
      title="VMs"
      showCloseIcon={false}
      linkProps={{
        type: 'with-icon',
        icon: <PlusIcon size="small" />,
        children: 'Create',
      }}
    />
  }
  bodyContent={<span>VM list here</span>}
/>
```

### Programmatic focus on close button

```tsx
import React from 'react'
import {
  DashboardWidgetLayout,
  DashboardWidgetHeader,
  StackingLayout,
  Button,
} from '@nutanix-ui/prism-reactjs'

const ProgrammaticalFocus = () => {
  const [visible, setVisible] = React.useState(false)
  const closeButtonRef = React.useRef<HTMLButtonElement>(null)
  const openButtonRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (closeButtonRef.current) closeButtonRef.current.focus()
  }, [visible])

  return (
    <StackingLayout padding="20px">
      <Button onClick={() => setVisible(true)} innerRef={openButtonRef}>
        Show widget
      </Button>
      {visible && (
        <div style={{ width: 300, height: 200 }}>
          <DashboardWidgetLayout
            header={
              <DashboardWidgetHeader
                title="Nice Header"
                onClose={() => {
                  setVisible(false)
                  openButtonRef.current?.focus()
                }}
                closeButtonProps={{ innerRef: closeButtonRef }}
              />
            }
            bodyContent="Focus is on close button"
          />
        </div>
      )}
    </StackingLayout>
  )
}
```

### Responsive Dashboard with multiple widgets

```tsx
import {
  Dashboard,
  DashboardWidgetLayout,
  DashboardWidgetHeader,
  StackingLayout,
  Paragraph,
} from '@nutanix-ui/prism-reactjs'
;<Dashboard
  layouts={{
    sm: [{ i: 'widget1' }, { i: 'widget2' }, { i: 'widget3', w: 2 }],
  }}
>
  <div key="widget1">
    <DashboardWidgetLayout
      header={<DashboardWidgetHeader title="Widget 1" />}
      bodyContent={<Paragraph>Content A</Paragraph>}
    />
  </div>
  <div key="widget2">
    <DashboardWidgetLayout
      header={<DashboardWidgetHeader title="Widget 2" />}
      bodyContent={<Paragraph>Content B</Paragraph>}
    />
  </div>
  <StackingLayout padding="20px" key="widget3">
    Double-width widget
  </StackingLayout>
</Dashboard>
```

### WidgetActionButton positioned on a widget

```tsx
import {
  WidgetActionButton,
  ContainerLayout,
  CloseIcon,
  TriangleUpDownIcon,
} from '@nutanix-ui/prism-reactjs'

const { CloseIconSize } = CloseIcon

;<ContainerLayout
  backgroundColor="white"
  style={{ position: 'relative', width: 300, height: 400 }}
>
  Widget content
  <WidgetActionButton
    aria-label="Close"
    style={{ position: 'absolute', top: -10, right: -10 }}
  >
    <CloseIcon size={CloseIconSize.SMALL} />
  </WidgetActionButton>
  <WidgetActionButton
    aria-label="Resize"
    style={{
      position: 'absolute',
      bottom: -10,
      left: '50%',
      transform: 'translateX(-50%)',
      cursor: 'ns-resize',
    }}
  >
    <TriangleUpDownIcon />
  </WidgetActionButton>
</ContainerLayout>
```

---

## Anti-patterns

- Don't create custom widget wrappers — use `DashboardWidgetLayout`.
- Use `WidgetTable` (not `Table`) for tables inside dashboard widgets.
- Don't generate actual chart rendering code — emit `ChartPlaceholder` and let the developer wire up their charting library.
- Don't pass `titleProps` when `title` is a `ReactNode` (not a string) — it will throw a PropTypes error.
- Don't use the removed `defaultSelectProps` prop (v1.x) — use `selectProps` instead.
- `WidgetActionButton` is only for overlaid icon actions on widget containers; use `Button` with `ButtonTypes.ICON_SECONDARY` for actions inside `DashboardWidgetHeader`.

---

<!-- SOURCE-API-START -->

### Import

```tsx
import {
  Dashboard,
  DashboardWidgetLayout,
  DashboardWidgetHeader,
  WidgetActionButton,
  WidgetTable,
} from '@nutanix-ui/prism-reactjs'
```

### Props Interfaces

#### `DashboardProps`

Extends: `ResponsiveProps` (react-grid-layout)

| Prop             | Type                                           | Description                                                                           |
| ---------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------- |
| `className`      | `string`                                       | Additional class name.                                                                |
| `layouts`        | `ResponsiveProps['layouts']`                   | **Required.** Breakpoint-keyed layout arrays. At minimum define one breakpoint.       |
| `children`       | `React.ReactNode`                              | **Required.** Each child must have a `key` matching a `layout.i`.                     |
| `gridComponent`  | `React.ElementType`                            | Override internal `WidthProvider(Responsive)` (e.g. custom `ResizeObserver` wrapper). |
| `rowHeight`      | `number`                                       | Height in px per row unit. Default `295`.                                             |
| `cols`           | `ResponsiveProps['cols']`                      | Column count per breakpoint. Default `{ lg:4, md:4, sm:3, xsm:2, xxsm:1 }`.           |
| `breakpoints`    | `ResponsiveProps['breakpoints']`               | Pixel breakpoints. Default `{ lg:1700, md:1280, sm:965, xsm:650, xxsm:439 }`.         |
| `margin`         | `[number, number]`                             | `[horizontal, vertical]` gap in px. Default `[20, 20]`.                               |
| `onLayoutChange` | `(layout: Layout[], layouts: Layouts) => void` | Fired when layout changes.                                                            |
| `wrapperProps`   | `React.HTMLProps<HTMLDivElement>`              | Props for the outer wrapper `<div>`.                                                  |

#### `DashboardWidgetLayoutProps`

Extends: `HeaderFooterLayoutProps` (which extends `FlexLayoutProps`)

| Prop               | Type              | Description                                                          |
| ------------------ | ----------------- | -------------------------------------------------------------------- |
| `className`        | `string`          | Additional custom class name.                                        |
| `bodyContent`      | `React.ReactNode` | **Required.** The widget body node.                                  |
| `loading`          | `boolean`         | Shows a `Loader` overlay. Default `false`.                           |
| `loadingTip`       | `string`          | Text beside the loading spinner. Default i18n "Loading…".            |
| `errorMsg`         | `React.ReactNode` | Error message rendered centred over `bodyContent`.                   |
| `header`           | `React.ReactNode` | From `HeaderFooterLayoutProps`. 40 px header band.                   |
| `footer`           | `React.ReactNode` | From `HeaderFooterLayoutProps`. 40 px footer band.                   |
| `headerProps`      | `FlexLayoutProps` | From `HeaderFooterLayoutProps`. Extra props for header `FlexLayout`. |
| `footerProps`      | `FlexLayoutProps` | From `HeaderFooterLayoutProps`. Extra props for footer `FlexLayout`. |
| `bodyContentProps` | `FlexLayoutProps` | From `HeaderFooterLayoutProps`. Extra props for body `FlexLayout`.   |

#### `DashboardWidgetHeaderProps`

Extends: `FlexLayoutProps` (via `CommonDashboardWidgetHeaderProps`)

| Prop                | Type                                                    | Description                                                                           |
| ------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `className`         | `string`                                                | Additional class name.                                                                |
| `title`             | `string \| React.ReactNode`                             | Header title. String → truncating `Title` H3 with tooltip. Node → rendered directly.  |
| `titleProps`        | `Omit<TitleProps & TruncateComponentProps, 'children'>` | Extra props for the `Title` component. Only valid when `title` is a string.           |
| `showCloseIcon`     | `boolean`                                               | Show the close button. Default `true`.                                                |
| `onClose`           | `ButtonProps['onClick']`                                | Handler for the close button.                                                         |
| `closeButtonProps`  | `Omit<ButtonProps, 'onClick'>`                          | Extra props for the close `Button` (e.g. `innerRef`).                                 |
| `customInfo`        | `React.ReactNode`                                       | Arbitrary right-side content (e.g. `Badge` counts). Separated by `VerticalSeparator`. |
| `supplementaryInfo` | `string`                                                | Secondary text rendered as supplementary `Paragraph`.                                 |
| `selectProps`       | `SelectProps`                                           | Renders a `Select` in the right section.                                              |
| `paginationProps`   | `PaginationProps`                                       | Renders a `Pagination` in the right section.                                          |
| `linkProps`         | `LinkProps`                                             | Renders a `Link` in the right section.                                                |

#### `WidgetActionButtonProps`

Extends: `Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>`

| Prop         | Type              | Description                                                  |
| ------------ | ----------------- | ------------------------------------------------------------ |
| `children`   | `React.ReactNode` | **Required.** SVG icon element to display.                   |
| `className`  | `string`          | Additional class name.                                       |
| `aria-label` | `string`          | Accessible label. Defaults to i18n "action" if not provided. |
| `disabled`   | `boolean`         | Disables button and suppresses `onClick`.                    |

#### `WidgetTable`

Accepts all `TableProps` plus `hideHeader` from `TableStructure`.

| Prop         | Type                     | Description                             |
| ------------ | ------------------------ | --------------------------------------- |
| `className`  | `string`                 | Additional class name.                  |
| `hideHeader` | `boolean \| "no-header"` | Hide column header row. Default `true`. |

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Basic example.

```tsx
<div style={{ width: 300, height: 200 }}>
  <DashboardWidgetLayout
    header={<DashboardWidgetHeader title="Nice Header" />}
    bodyContent="Body Content"
  />
</div>
```

#### Using close button inner ref

```tsx
const ProgrammaticalFocus = () => {
  const [visible, setVisible] = React.useState(false)
  const closeButtonRef = React.useRef()
  const openButtonRef = React.useRef()

  React.useEffect(() => {
    if (closeButtonRef.current) {
      closeButtonRef.current.focus()
    }
  }, [visible])

  return (
    <StackingLayout padding="20px">
      <Button
        data-test-id="open-dashboard-widget-layout"
        onClick={() => {
          setVisible(true)
        }}
        innerRef={openButtonRef}
      >
        Show widget
      </Button>
      {visible && (
        <div style={{ width: 300, height: 200 }}>
          <DashboardWidgetLayout
            header={
              <DashboardWidgetHeader
                title="Nice Header"
                onClose={() => {
                  setVisible(false)
                  if (openButtonRef.current) {
                    openButtonRef.current.focus()
                  }
                }}
                closeButtonProps={{
                  innerRef: closeButtonRef,
                }}
              />
            }
            bodyContent="Focus is on close button"
          />
        </div>
      )}
    </StackingLayout>
  )
}

;<ProgrammaticalFocus />
```

#### Using loading and loadingTip.

```tsx
<div style={{ width: 300, height: 200 }}>
  <DashboardWidgetLayout
    header={<DashboardWidgetHeader title="Nice Header" />}
    bodyContent="Body Content"
    loading={true}
    loadingTip="Patience is a virtue..."
  />
</div>
```

#### With an error message.

```tsx
<div style={{ width: 300, height: 200 }}>
  <DashboardWidgetLayout
    header={<DashboardWidgetHeader title="Nice Header" />}
    bodyContent="Body Content"
    errorMsg="Ahhhhhh!"
  />
</div>
```

#### Complex widget with WidgetTable, footer, and Select.

```tsx
import {
  DashboardWidgetLayout,
  DashboardWidgetHeader,
  Separator,
  StackingLayout,
  FlexLayout,
  Badge,
  Progress,
  Title,
  TextLabel,
  Select,
  WidgetTable,
  Divider,
  Link,
  ContainerLayout,
  VerticalSeparator,
} from '@nutanix-ui/prism-reactjs'

const menuItems = [
  { label: 'This Week', value: '0' },
  { label: 'This Month', value: '1' },
]

const columns = [
  { title: 'Name', key: 'name' },
  {
    title: 'Address',
    key: 'address',
    render() {
      return (
        <Separator separator={<VerticalSeparator />} spacing="spacing-20px">
          <FlexLayout>
            <Badge color="yellow" text="5" />
            <Badge color="red" text="20" />
          </FlexLayout>
          <TextLabel type="primary">20 VMs</TextLabel>
        </Separator>
      )
    },
  },
]

const data = [
  { key: '1', name: 'apache' },
  { key: '2', name: 'gold-policy' },
  { key: '3', name: 'exchange' },
]

;<div style={{ width: '350px' }}>
  <ContainerLayout backgroundColor="white">
    <DashboardWidgetLayout
      header={
        <DashboardWidgetHeader
          title="Protection Status"
          showCloseIcon={false}
        />
      }
      bodyContent={
        <StackingLayout itemSpacing="0px">
          <FlexLayout alignItems="center" itemSpacing="20px" padding="20px">
            <Progress percent={20} status="active" type="circle" />
            <Title size="h2">65 / 128 VMs Currently Protected</Title>
          </FlexLayout>
          <Divider />
          <FlexLayout
            justifyContent="space-between"
            alignItems="center"
            padding="10px"
            style={{ paddingRight: '20px', paddingLeft: '20px' }}
          >
            <TextLabel type="secondary">Top policies with violations</TextLabel>
            <Select
              type="mini"
              autoSize={true}
              rowsData={menuItems}
              selectedRow={menuItems[0]}
            />
          </FlexLayout>
          <Divider />
          <FlexLayout padding="0px-10px">
            <WidgetTable
              structure={{ columnWidths: { name: '120px' } }}
              background="base"
              rowKey="key"
              dataSource={data}
              columns={columns}
            />
          </FlexLayout>
        </StackingLayout>
      }
      footer={<Link>View All Policies</Link>}
      footerProps={{ justifyContent: 'center' }}
      bodyContentProps={{ itemFlexBasis: '100pc' }}
      style={{ flexBasis: '100%' }}
      itemSpacing="0px"
    />
  </ContainerLayout>
</div>
```

### Usage Notes

- Prefer documented enum/static values such as `DashboardWidgetLayout.<EnumName>.<VALUE>` over raw strings when the component exposes them.
- Keep labels, help text, and validation visible and persistent for form controls; use `FormItem*` wrappers where available.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.
- When the parent container width is driven by something other than the window (e.g. a resizable panel), use a custom `gridComponent` backed by `ResizeObserver` rather than relying on `WidthProvider`.
- The DOM order of `Dashboard` children must match their visual order to preserve correct keyboard tab sequence.

<!-- SOURCE-API-END -->
