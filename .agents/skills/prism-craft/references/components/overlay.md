# Overlay

## Figma

- **Library name:** Modal Underlay (page: N/A, frame: Modal Underlay)

## React

Import: `import { Overlay } from '@nutanix-ui/prism-reactjs'`

### Purpose

`Overlay` wraps any content to cover it with a semi-transparent backdrop and optionally display a tip message on top. It is used to communicate a loading, error, or "data unavailable" state on top of a table, card, or widget body.

### Anti-patterns

- Don't create custom backdrop `<div>` with opacity — use `Overlay`.
- In most cases, `Modal` and `SidePanel` already include their own overlay; don't nest `Overlay` inside those.
- Don't use the non-existent `visible` or `onClick` props — the toggle prop is `showOverlay`.

<!-- SOURCE-API-START -->

### Import

```tsx
import { Overlay } from '@nutanix-ui/prism-reactjs'
```

The named type `OverlayProps` is also exported for TypeScript consumers:

```tsx
import { Overlay, type OverlayProps } from '@nutanix-ui/prism-reactjs'
```

### Props Interface

#### `OverlayProps`

Extends: `Omit<React.HTMLProps<HTMLDivElement>, 'ref'>`

All standard HTML `<div>` attributes are accepted (e.g. `style`, `id`, `aria-*`) in addition to the props below.

| Prop          | Type              | Default | Required | Description                                                                                                          |
| ------------- | ----------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| `showOverlay` | `boolean`         | `true`  | No       | Show (`true`) or hide (`false`) the overlay cover.                                                                   |
| `tip`         | `React.ReactNode` | —       | No       | Content rendered centred on top of the overlay cover when it is visible. Typically a string message or a `<Loader>`. |
| `stretch`     | `boolean`         | `false` | No       | When `true`, the component expands to `height: 100%; width: 100%` so it fills the nearest positioned ancestor.       |
| `children`    | `React.ReactNode` | —       | No       | Content that the overlay sits on top of.                                                                             |
| `className`   | `string`          | —       | No       | Additional CSS class name appended to the root element.                                                              |
| `data-test`   | `string`          | —       | No       | Test selector placed on the root `<div>`.                                                                            |

> **Implementation note:** `showOverlay` and `stretch` are forwarded to the root `<div>` as the HTML data attributes `data-show-overlay` and `data-stretch` respectively, which the component's stylesheet uses to apply the cover and sizing styles.

### Source Examples

These are adapted from the Prism source examples. When generating app code, translate layout and spacing to Prism layout props where possible.

#### Accessibility Guidance

When `showOverlay` is `true` the covered content should be hidden from assistive technology. Apply `aria-hidden="true"` to the children so screen readers skip the inert content.

```tsx
import { Paragraph, StackingLayout } from '@nutanix-ui/prism-reactjs'
;<StackingLayout style={{ maxWidth: 800 }}>
  <Paragraph>
    Make sure that any content behind the overlay is completely hidden from
    screen readers by adding <code>aria-hidden="true"</code> to the covered
    child when <code>showOverlay</code> is true.
  </Paragraph>
</StackingLayout>
```

#### Basic Usage — overlay on / off

Default `showOverlay` is `true`, so `<Overlay>` with no props renders the cover immediately.

```tsx
import {
  Overlay,
  Title,
  Table,
  StackingLayout,
  FlexLayout,
} from '@nutanix-ui/prism-reactjs'

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

;<FlexLayout>
  <StackingLayout>
    <Title size="h3">Overlay On</Title>
    {/* showOverlay defaults to true */}
    <Overlay>
      <Table aria-hidden="true" dataSource={data} columns={columns} />
    </Overlay>
  </StackingLayout>
  <StackingLayout>
    <Title size="h3">Overlay Off</Title>
    <Overlay showOverlay={false}>
      <Table dataSource={data} columns={columns} />
    </Overlay>
  </StackingLayout>
</FlexLayout>
```

#### Show a tip

Pass any `React.ReactNode` to `tip`. A plain string is the most common value. The tip is centred over the overlay cover.

```tsx
import { Overlay, Table } from '@nutanix-ui/prism-reactjs'

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

;<Overlay tip="Hi! I am a very exciting overlay tip! Are you happy to see me?">
  <Table aria-hidden="true" dataSource={data} columns={columns} />
</Overlay>
```

#### Dashboard Widget Pattern (stretch + tip)

Use `stretch={false}` (the default) when the `Overlay` wraps only part of a larger container. The tip message communicates a data-quality or loading condition without covering the entire widget.

```tsx
import {
  Overlay,
  Title,
  DashboardWidgetHeader,
  FlexLayout,
  StackingLayout,
  Progress,
  Link,
  ContainerLayout,
  Divider,
  DashboardWidgetLayout,
  Table,
} from '@nutanix-ui/prism-reactjs'

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

const header = (
  <DashboardWidgetHeader title="Protection Status" showCloseIcon={false} />
)

const prSection = (
  <FlexLayout alignItems="center" itemSpacing="20px" padding="20px">
    <Progress percent={20} status="active" type="circle" />
    <Title size="h2">65 / 128 VMs Currently Protected</Title>
  </FlexLayout>
)

const bodyContent = (
  <StackingLayout itemSpacing="0px">
    <Overlay
      stretch={false}
      tip="Data inconclusive. Please wait a few minutes for an update."
    >
      <StackingLayout aria-hidden="true" padding="0px-20px">
        <Table dataSource={data} columns={columns} />
      </StackingLayout>
    </Overlay>
    <Divider />
    {prSection}
  </StackingLayout>
)

const footer = <Link>View All Policies</Link>

;<div style={{ padding: '40px' }}>
  <ContainerLayout backgroundColor="white" style={{ width: '400px' }}>
    <DashboardWidgetLayout
      header={header}
      bodyContent={bodyContent}
      footer={footer}
      footerProps={{ justifyContent: 'center' }}
      bodyContentProps={{ itemFlexBasis: '100pc' }}
      style={{ flexBasis: '100%' }}
      itemSpacing="0px"
    />
  </ContainerLayout>
</div>
```

### Behaviour Notes

- When `showOverlay` is `true` (the default), a `.overlay-cover` child `<div>` is rendered between the component root and `children`. The cover uses flexbox centering so `tip` content is centred both horizontally and vertically.
- When `showOverlay` is `false`, no cover div is rendered; `children` are rendered normally.
- The cover `::before` pseudo-element provides the semi-transparent backdrop using the design-token variables `--color-background-base` and `--opacity-loading-underlay`.
- `stretch={true}` sets `height: 100%; width: 100%` on the root element, making it fill a positioned ancestor (useful for full-panel loading states).
- `stretch={false}` (default) lets the root element size naturally with its content.
- There are no keyboard interaction or focus-trap behaviours on `Overlay` itself — it is a visual cover only. Use `Modal` or `SidePanel` when focus management is required.

### Usage Notes

- `Overlay` has no static enum constants. All props accept primitive values.
- Apply `aria-hidden="true"` to children whenever `showOverlay` is `true` so the covered content is skipped by screen readers.
- Use Prism layout props (`itemSpacing`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for spacing inside and around the overlay.

<!-- SOURCE-API-END -->
