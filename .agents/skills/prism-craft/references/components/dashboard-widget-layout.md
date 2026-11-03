# DashboardWidgetLayout

## Figma

- **Library name:** Empty Widget (page: N/A, frame: Empty Widget)
- **Also matches:** Widget Container Footer

## React

Import: `import { DashboardWidgetLayout } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import {
  DashboardWidgetLayout,
  DashboardWidgetHeader,
} from '@nutanix-ui/prism-reactjs'
```

### Component Overview

`DashboardWidgetLayout` is a wrapper for dashboard widgets that provides a consistent
header / body / footer shell with built-in loading-overlay and error-overlay states.
Internally it renders a `HeaderFooterLayout` (which uses `FlexLayout` with
`flexDirection="column"`), so every `HeaderFooterLayout` and `FlexLayout` prop is also
accepted.

### Props Interfaces

#### `DashboardWidgetLayoutProps`

Extends: `HeaderFooterLayoutProps` → `FlexLayoutProps`

All props are optional unless marked **required**.

| Prop          | Type              | Default      | Required | Description                                                                                                                                                                         |
| ------------- | ----------------- | ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bodyContent` | `React.ReactNode` | —            | **Yes**  | The main body content of the widget. When `loading` is `true` the content is wrapped in a `Loader` overlay. When `errorMsg` is set the content is rendered behind an error overlay. |
| `className`   | `string`          | —            | No       | Additional CSS class applied to the root element.                                                                                                                                   |
| `loading`     | `boolean`         | `false`      | No       | When `true`, wraps `bodyContent` in a `Loader` with `overlay={true}`.                                                                                                               |
| `loadingTip`  | `string`          | i18n default | No       | Text displayed next to the spinner when `loading` is `true`.                                                                                                                        |
| `errorMsg`    | `React.ReactNode` | —            | No       | Error message rendered in a centred overlay on top of `bodyContent`.                                                                                                                |

#### Inherited from `HeaderFooterLayoutProps`

These props are passed through to the underlying `HeaderFooterLayout`.

| Prop               | Type              | Default | Description                                                                                |
| ------------------ | ----------------- | ------- | ------------------------------------------------------------------------------------------ |
| `header`           | `React.ReactNode` | —       | Header element. Rendered in a 40 px flex row at the top. Use `DashboardWidgetHeader` here. |
| `footer`           | `React.ReactNode` | —       | Footer element. Rendered in a 40 px flex row at the bottom.                                |
| `headerProps`      | `FlexLayoutProps` | —       | Extra props forwarded to the header `FlexLayout` wrapper.                                  |
| `footerProps`      | `FlexLayoutProps` | —       | Extra props forwarded to the footer `FlexLayout` wrapper.                                  |
| `bodyContentProps` | `FlexLayoutProps` | —       | Extra props forwarded to the body `FlexLayout` wrapper (e.g. `itemFlexBasis="100pc"`).     |

Any additional `FlexLayoutProps` (e.g. `itemSpacing`, `itemGap`, `padding`, `style`) are
spread onto the root `FlexLayout`.

---

### `DashboardWidgetHeader`

`DashboardWidgetHeader` is the canonical companion header component. Import it from the
same package.

```tsx
import { DashboardWidgetHeader } from '@nutanix-ui/prism-reactjs'
```

#### `DashboardWidgetHeaderProps`

Extends: `FlexLayoutProps` (omitting `title`)

| Prop                | Type                                                                      | Default | Required | Description                                                                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`             | `string \| React.ReactNode`                                               | —       | No       | Widget title. When a `string`, rendered as a truncating `Title` (size `h3`) with a tooltip on overflow. When a ReactNode, rendered as-is and `titleProps` must not be supplied. |
| `titleProps`        | `Omit<TitleProps, 'children'> & Omit<TruncateComponentProps, 'children'>` | —       | No       | Extra props forwarded to the `Title` component. Only valid when `title` is a `string`.                                                                                          |
| `showCloseIcon`     | `boolean`                                                                 | `true`  | No       | Whether to render the close button in the top-right corner.                                                                                                                     |
| `onClose`           | `ButtonProps['onClick']`                                                  | —       | No       | Click handler for the close button.                                                                                                                                             |
| `closeButtonProps`  | `Omit<ButtonProps, 'onClick'>`                                            | —       | No       | Extra props forwarded to the close `Button` (e.g. `innerRef` for programmatic focus).                                                                                           |
| `customInfo`        | `React.ReactNode`                                                         | —       | No       | Arbitrary node placed in the right-hand info area (separated by a `VerticalSeparator`).                                                                                         |
| `supplementaryInfo` | `string`                                                                  | —       | No       | Short string shown in the right-hand info area as a `Paragraph` with `type="supplementary"`.                                                                                    |
| `selectProps`       | `SelectProps`                                                             | —       | No       | Renders a `Select` in the right-hand info area.                                                                                                                                 |
| `paginationProps`   | `PaginationProps`                                                         | —       | No       | Renders a `Pagination` control in the right-hand info area.                                                                                                                     |
| `linkProps`         | `LinkProps`                                                               | —       | No       | Renders a `Link` in the right-hand info area.                                                                                                                                   |
| `className`         | `string`                                                                  | —       | No       | Additional CSS class on the header root.                                                                                                                                        |

Right-side items (`customInfo`, `supplementaryInfo`, `selectProps`, `paginationProps`,
`linkProps`) are rendered inside a `Separator` with `VerticalSeparator` dividers. A
`VerticalSeparator` is automatically placed between the right-side group and the close
button when both are present.

---

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style`
or `<div>` wrappers; when generating app code, translate layout and spacing to Prism
layout props where possible.

#### Basic example

```tsx
import {
  DashboardWidgetLayout,
  DashboardWidgetHeader,
} from '@nutanix-ui/prism-reactjs'
;<div style={{ width: 300, height: 200 }}>
  <DashboardWidgetLayout
    header={<DashboardWidgetHeader title="Nice Header" />}
    bodyContent="Body Content"
  />
</div>
```

#### Without close icon

```tsx
import {
  DashboardWidgetLayout,
  DashboardWidgetHeader,
  ContainerLayout,
} from '@nutanix-ui/prism-reactjs'
;<ContainerLayout backgroundColor="white">
  <DashboardWidgetLayout
    header={<DashboardWidgetHeader title="My Widget" showCloseIcon={false} />}
    bodyContent="Body Content"
  />
</ContainerLayout>
```

#### Loading state

```tsx
import {
  DashboardWidgetLayout,
  DashboardWidgetHeader,
} from '@nutanix-ui/prism-reactjs'
;<div style={{ width: 300, height: 200 }}>
  <DashboardWidgetLayout
    header={<DashboardWidgetHeader title="Nice Header" />}
    bodyContent="Body Content"
    loading={true}
    loadingTip="Patience is a virtue..."
  />
</div>
```

#### Error state

```tsx
import {
  DashboardWidgetLayout,
  DashboardWidgetHeader,
} from '@nutanix-ui/prism-reactjs'
;<div style={{ width: 300, height: 200 }}>
  <DashboardWidgetLayout
    header={<DashboardWidgetHeader title="Nice Header" />}
    bodyContent="Body Content"
    errorMsg="Something went wrong."
  />
</div>
```

#### With a footer and bodyContentProps

```tsx
import {
  DashboardWidgetLayout,
  DashboardWidgetHeader,
  ContainerLayout,
  Link,
} from '@nutanix-ui/prism-reactjs'
;<div style={{ width: 350 }}>
  <ContainerLayout backgroundColor="white">
    <DashboardWidgetLayout
      header={
        <DashboardWidgetHeader
          title="Protection Status"
          showCloseIcon={false}
        />
      }
      bodyContent={<div>Chart goes here</div>}
      footer={<Link>View All Policies</Link>}
      footerProps={{ justifyContent: 'center' }}
      bodyContentProps={{ itemFlexBasis: '100pc' }}
      itemSpacing="0px"
    />
  </ContainerLayout>
</div>
```

#### Programmatic focus on close button

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
    if (closeButtonRef.current) {
      closeButtonRef.current.focus()
    }
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

#### Custom title node (ReactNode title, no `titleProps`)

When `title` is a ReactNode rather than a string, `showCloseIcon` must be `false` (or
the close icon rendered separately), and `titleProps` must not be supplied.

```tsx
import {
  DashboardWidgetHeader,
  ContainerLayout,
  FlexLayout,
  Title,
  Button,
  FilterIcon,
} from '@nutanix-ui/prism-reactjs'

const customTitle = (
  <FlexLayout justifyContent="space-between" style={{ width: '100%' }}>
    <FlexLayout alignItems="center" itemGap="S">
      <Title size="h3">My Widget</Title>
      <Button type={Button.ButtonTypes.ICON_SECONDARY} aria-label="Filter">
        <FilterIcon />
      </Button>
    </FlexLayout>
  </FlexLayout>
)

;<ContainerLayout backgroundColor="white">
  <DashboardWidgetHeader title={customTitle} showCloseIcon={false} />
</ContainerLayout>
```

#### Long title with tooltip truncation

String titles auto-truncate and show a tooltip on overflow. Pass `titleProps` to
customise tooltip placement or add test IDs.

```tsx
import {
  DashboardWidgetHeader,
  ContainerLayout,
} from '@nutanix-ui/prism-reactjs'
;<ContainerLayout backgroundColor="white">
  <DashboardWidgetHeader
    title="Very long widget title that overflows the container"
    showCloseIcon={true}
    titleProps={{
      tooltipProps: {
        contentProps: { 'data-test-id': 'widget-title-tooltip' },
      },
    }}
  />
</ContainerLayout>
```

---

### Behaviour Notes

- **Loading state:** When `loading={true}`, `bodyContent` is wrapped in `<Loader loading overlay tip={loadingTip}>`. The content is still mounted but hidden behind the overlay.
- **Error state:** When `errorMsg` is set (and `loading` is `false`), `bodyContent` is rendered with an `.error-overlay` wrapper and a centred `.error-message` flex container on top. The `errorMsg` node is displayed inside that flex container.
- **Priority:** `loading` takes precedence over `errorMsg`; if both are truthy, only the loading overlay is shown.
- **Body scroll:** The body content area scrolls by default when content overflows (behaviour inherited from `HeaderFooterLayout`).
- **Title truncation:** A string `title` on `DashboardWidgetHeader` is rendered via `Truncate(Title)` with `forceSingleLine={true}` and a secondary tooltip shown on overflow.
- **Close button accessibility:** The close `Button` inside `DashboardWidgetHeader` has `aria-label` set from `I18nManager` (key `DashboardWidgetHeader.close`) and renders `<CloseIcon aria-hidden="true" />`. Use `closeButtonProps={{ innerRef }}` to programmatically focus it.
- **Right-side separator:** `VerticalSeparator` dividers between right-side items and between the right group and the close button are rendered automatically.

### Usage Notes

- Always wrap `DashboardWidgetLayout` in a sized container (explicit `width`/`height` or a grid cell); the component itself does not constrain its own dimensions.
- Use `DashboardWidgetHeader` for the `header` prop — it provides the standard 40 px header with close icon, title truncation, and optional controls.
- Pass layout and spacing through `footerProps`, `headerProps`, `bodyContentProps`, `itemSpacing`, or `itemGap` rather than custom CSS.
- Use `itemFlexBasis="100pc"` on `bodyContentProps` when the body content should stretch to fill the widget width.
- `DashboardWidgetLayout` has no static sub-keys or enum constants. `DashboardWidgetHeader` has no static sub-keys; use `Button.ButtonTypes.ICON_SECONDARY` from the `Button` import when building custom title nodes with icon buttons.

<!-- SOURCE-API-END -->
