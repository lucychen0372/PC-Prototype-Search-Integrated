# TextLabel

## Figma

- **Library name:** Label Bottom (page: N/A, frame: Label Bottom)
- **Also matches:** Label Top
- **Label Bottom variants:**
  - Type: Error | Warning | Success | Primary | Secondary | Info | Trigger
  - Size: Small | Medium

## React

Import: `import { TextLabel } from '@nutanix-ui/prism-reactjs'`

### Figma -> React Prop Mapping

| Figma Property | React Prop   | Value Mapping                                                                                                                                                                                                                                                                                                                                      |
| -------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Type           | `type`       | Error -> `TextLabel.TEXT_LABEL_TYPE.ERROR`, Warning -> `TextLabel.TEXT_LABEL_TYPE.WARNING`, Success -> `TextLabel.TEXT_LABEL_TYPE.SUCCESS`, Primary -> `TextLabel.TEXT_LABEL_TYPE.PRIMARY`, Secondary -> `TextLabel.TEXT_LABEL_TYPE.SECONDARY`, Info -> `TextLabel.TEXT_LABEL_TYPE.INFO` (default), Trigger -> `TextLabel.TEXT_LABEL_TYPE.TRIGGER` |
| Size           | `size`       | Small -> `TextLabel.TEXT_LABEL_SIZE.SMALL`, Medium -> `TextLabel.TEXT_LABEL_SIZE.MEDIUM` (default)                                                                                                                                                                                                                                                 |
| Appearance     | `appearance` | Default -> `TextLabel.APPEARANCE.DEFAULT` (default), Navigation (dark nav bar) -> `TextLabel.APPEARANCE.NAVIGATION`                                                                                                                                                                                                                                |
| Display        | `display`    | Inline -> `TextLabel.TEXT_LABEL_DISPLAY.INLINE`, Block -> `TextLabel.TEXT_LABEL_DISPLAY.BLOCK`                                                                                                                                                                                                                                                     |

### TSX Examples

```tsx
{
  /* Default info label */
}
;<TextLabel>Info</TextLabel>

{
  /* Error help text (form validation) */
}
;<TextLabel type={TextLabel.TEXT_LABEL_TYPE.ERROR}>
  Please enter a valid email address
</TextLabel>

{
  /* Warning label */
}
;<TextLabel type={TextLabel.TEXT_LABEL_TYPE.WARNING}>
  Disk usage is above 80%
</TextLabel>

{
  /* Success label */
}
;<TextLabel type={TextLabel.TEXT_LABEL_TYPE.SUCCESS}>
  Changes saved successfully
</TextLabel>

{
  /* Secondary info */
}
;<TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
  Last updated 5 minutes ago
</TextLabel>

{
  /* Small size */
}
;<TextLabel size={TextLabel.TEXT_LABEL_SIZE.SMALL}>Optional</TextLabel>

{
  /* Multi-line (wraps text; use inside FlexLayout with an icon) */
}
;<FlexLayout itemGap="S">
  <AlertTriangleIcon
    style={{
      color: 'var(--color-text-error)',
      position: 'relative',
      top: 2,
      minWidth: 12,
    }}
  />
  <TextLabel
    multiLine={true}
    size={TextLabel.TEXT_LABEL_SIZE.SMALL}
    type={TextLabel.TEXT_LABEL_TYPE.ERROR}
  >
    You should rethink your life choices. Let us help you.
  </TextLabel>
</FlexLayout>

{
  /* Navigation appearance (for use on the dark nav bar) */
}
;<TextLabel appearance={TextLabel.APPEARANCE.NAVIGATION}>Nav label</TextLabel>
```

### Anti-patterns

- Don't use `<label>` or `<span>` for form labels — use `TextLabel`
- Always set `id` on labels used with form inputs for `aria-labelledby`
- Don't use CSS colors for status text — use `TextLabel` with the appropriate `type`
- Don't use the deprecated `theme` prop — use `appearance={TextLabel.APPEARANCE.NAVIGATION}` instead
- Don't reference `TextLabel.TextLabelType` or `TextLabel.TextLabelSize` — the correct static members are `TextLabel.TEXT_LABEL_TYPE` and `TextLabel.TEXT_LABEL_SIZE`

<!-- SOURCE-API-START -->

### Import

```tsx
import { TextLabel } from '@nutanix-ui/prism-reactjs'
```

The component renders as a `<span>` element. `appearance` is applied as a `data-appearance` DOM attribute.

### Enums / Constants

#### `TextAppearance`

- `DEFAULT` = `'default'`
- `NAVIGATION` = `'navigation'` — for use in dark navigation bar

#### `TextLabelType`

- `INFO` = `'info'`
- `PRIMARY` = `'primary'`
- `SECONDARY` = `'secondary'`
- `ERROR` = `'error'`
- `WARNING` = `'warning'`
- `SUCCESS` = `'success'`
- `TRIGGER` = `'trigger'`

#### `TextLabelSize`

- `SMALL` = `'small'`
- `MEDIUM` = `'medium'`

#### `TextLabelTheme` _(deprecated)_

- `LIGHT` = `'light'`
- `DARK` = `'dark'`

#### `TextLabelDisplay`

- `INLINE` = `'inline'`
- `BLOCK` = `'block'`

### Props Interfaces

#### `TextLabelProps`

Extends: `Omit<React.HTMLProps<HTMLSpanElement>, 'ref' | 'size'>`

| Prop         | Type               | Default                  | Required | Description                                                                                                              |
| ------------ | ------------------ | ------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| `appearance` | `TextAppearance`   | `TextAppearance.DEFAULT` | No       | Visual appearance context. Use `NAVIGATION` for labels placed on the dark nav bar.                                       |
| `type`       | `TextLabelType`    | `TextLabelType.INFO`     | No       | Semantic type / color of the label.                                                                                      |
| `size`       | `TextLabelSize`    | `TextLabelSize.MEDIUM`   | No       | Text size.                                                                                                               |
| `display`    | `TextLabelDisplay` | —                        | No       | Force inline or block display.                                                                                           |
| `multiLine`  | `boolean`          | `false`                  | No       | Enable multi-line text height support. Required when label text may wrap.                                                |
| `className`  | `string`           | —                        | No       | Additional CSS class name for styling or selectors.                                                                      |
| `theme`      | `TextLabelTheme`   | —                        | No       | **Deprecated.** Use `appearance={TextLabel.APPEARANCE.NAVIGATION}` instead of `theme={TextLabel.TEXT_LABEL_THEME.DARK}`. |
| `data-test`  | `string`           | —                        | No       | Test selector attribute forwarded to the underlying `<span>`.                                                            |

All other standard `HTMLSpanElement` props (e.g. `id`, `style`, `onClick`, `aria-*`) are forwarded to the `<span>`.

### Static Members

| Member                         | Enum                            |
| ------------------------------ | ------------------------------- |
| `TextLabel.APPEARANCE`         | `TextAppearance`                |
| `TextLabel.TEXT_LABEL_TYPE`    | `TextLabelType`                 |
| `TextLabel.TEXT_LABEL_SIZE`    | `TextLabelSize`                 |
| `TextLabel.TEXT_LABEL_THEME`   | `TextLabelTheme` _(deprecated)_ |
| `TextLabel.TEXT_LABEL_DISPLAY` | `TextLabelDisplay`              |

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### UX Guidelines

```tsx
import {
  Alert,
  FlexLayout,
  InformationStatusIcon,
  Paragraph,
  StackingLayout,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
;<StackingLayout style={{ maxWidth: 700 }}>
  <Paragraph>Anatomy of a Text Label</Paragraph>
  <FlexLayout itemGap="XXL">
    <StackingLayout itemGap="XS" style={{ minWidth: 220, maxWidth: 220 }}>
      <StackingLayout itemGap="XS" style={{ textAlign: 'center' }}>
        <TextLabel multiLine={true} size={TextLabel.TEXT_LABEL_SIZE.SMALL}>
          220px
        </TextLabel>
        <div
          style={{
            borderTop: '1px solid var(--color-text-nav-tertiary-label)',
            borderLeft: '1px solid var(--color-text-nav-tertiary-label)',
            borderRight: '1px solid var(--color-text-nav-tertiary-label)',
            height: 10,
            marginBottom: 5,
          }}
        />
      </StackingLayout>
      <div
        style={{
          height: 32,
          borderRadius: 4,
          background: 'var(--color-background-body)',
        }}
      />
      <FlexLayout itemGap="S">
        <InformationStatusIcon
          style={{
            color: 'var(--color-text-tertiary-label)',
            position: 'relative',
            top: 2,
            minWidth: 12,
          }}
        />
        <TextLabel multiLine={true} size={TextLabel.TEXT_LABEL_SIZE.SMALL}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </TextLabel>
      </FlexLayout>
    </StackingLayout>
  </FlexLayout>
  <Alert
    inline={true}
    type={Alert.AlertTypes.INFO}
    showCloseIcon={false}
    message="We recommend limiting the text label to not exceed more than two lines."
  />
</StackingLayout>
```

#### Basic Example

```tsx
import { FlexLayout, TextLabel } from '@nutanix-ui/prism-reactjs'
;<FlexLayout data-test-id="basic">
  <TextLabel data-test-id="type-info">Info</TextLabel>
  <TextLabel
    type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}
    data-test-id="type-primary"
  >
    Primary
  </TextLabel>
  <TextLabel
    type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
    data-test-id="type-secondary"
  >
    Secondary
  </TextLabel>
</FlexLayout>
```

#### Status Example

```tsx
import { FlexLayout, TextLabel } from '@nutanix-ui/prism-reactjs'
;<FlexLayout data-test-id="status">
  <TextLabel type={TextLabel.TEXT_LABEL_TYPE.ERROR} data-test-id="type-error">
    Error
  </TextLabel>
  <TextLabel
    type={TextLabel.TEXT_LABEL_TYPE.WARNING}
    data-test-id="type-warning"
  >
    Warning
  </TextLabel>
  <TextLabel
    type={TextLabel.TEXT_LABEL_TYPE.SUCCESS}
    data-test-id="type-success"
  >
    Success
  </TextLabel>
</FlexLayout>
```

#### Small Size Example

```tsx
import { FlexLayout, TextLabel } from '@nutanix-ui/prism-reactjs'
;<FlexLayout data-test-id="small">
  <TextLabel
    size={TextLabel.TEXT_LABEL_SIZE.SMALL}
    type={TextLabel.TEXT_LABEL_TYPE.ERROR}
  >
    Error
  </TextLabel>
  <TextLabel
    size={TextLabel.TEXT_LABEL_SIZE.SMALL}
    type={TextLabel.TEXT_LABEL_TYPE.WARNING}
  >
    Warning
  </TextLabel>
  <TextLabel
    size={TextLabel.TEXT_LABEL_SIZE.SMALL}
    type={TextLabel.TEXT_LABEL_TYPE.SUCCESS}
  >
    Success
  </TextLabel>
  <TextLabel
    size={TextLabel.TEXT_LABEL_SIZE.SMALL}
    type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}
  >
    Primary
  </TextLabel>
  <TextLabel
    size={TextLabel.TEXT_LABEL_SIZE.SMALL}
    type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
  >
    Secondary
  </TextLabel>
  <TextLabel size={TextLabel.TEXT_LABEL_SIZE.SMALL}>Info</TextLabel>
</FlexLayout>
```

#### Navigation Appearance Example

```tsx
import { FlexLayout, TextLabel } from '@nutanix-ui/prism-reactjs'
;<FlexLayout data-test-id="appearance-nav" className="ntnx-navigation-example">
  <TextLabel appearance={TextLabel.APPEARANCE.NAVIGATION}>Info</TextLabel>
  <TextLabel
    type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}
    appearance={TextLabel.APPEARANCE.NAVIGATION}
  >
    Primary
  </TextLabel>
  <TextLabel
    type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
    appearance={TextLabel.APPEARANCE.NAVIGATION}
  >
    Secondary
  </TextLabel>
</FlexLayout>
```

#### Multi-line Example (Table Cell)

```tsx
import {
  ContainerLayout,
  HeaderFooterLayout,
  StackingLayout,
  Table,
  TextLabel,
  Title,
} from '@nutanix-ui/prism-reactjs'

const columns = [
  {
    key: 'name',
    title: 'Configuration Item',
    render: (value) => <TextLabel multiLine={true}>{value}</TextLabel>,
  },
  {
    key: 'value',
    title: 'Configuration Value',
    render: (value) => (
      <TextLabel multiLine={true} type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}>
        {value}
      </TextLabel>
    ),
  },
]

const data = [
  { key: '1', name: 'Replication Factor', value: 2 },
  { key: '2', name: 'Encryption', value: 'Inherit from Cluster' },
  { key: '3', name: 'QOS Metric (Throttled IOPS)', value: '-' },
]

;<StackingLayout background="body" style={{ minWidth: 400, maxWidth: 600 }}>
  <ContainerLayout
    backgroundColor="white"
    style={{ maxWidth: 400, minWidth: 220 }}
  >
    <HeaderFooterLayout
      itemSpacing="0px"
      header={
        <StackingLayout padding="0px-20px">
          <Title size="h3">Configuration</Title>
        </StackingLayout>
      }
      bodyContent={
        <Table
          structure={{ hideHeader: true }}
          rowKey="key"
          dataSource={data}
          columns={columns}
          border={false}
        />
      }
    />
  </ContainerLayout>
</StackingLayout>
```

#### Multi-line Small with Error Icon

```tsx
import {
  AlertTriangleIcon,
  FlexLayout,
  FormItemInput,
  StackingLayout,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
;<StackingLayout itemGap="XS" style={{ minWidth: 220, maxWidth: 220 }}>
  <FormItemInput
    id="id-1-1"
    label="Life choices"
    placeholder="Enter new life choices here"
  />
  <FlexLayout itemGap="S">
    <AlertTriangleIcon
      style={{
        color: 'var(--color-text-error)',
        position: 'relative',
        top: 2,
        minWidth: 12,
      }}
    />
    <TextLabel
      multiLine={true}
      size={TextLabel.TEXT_LABEL_SIZE.SMALL}
      type={TextLabel.TEXT_LABEL_TYPE.ERROR}
    >
      You should rethink your life choices. Let us help you.
    </TextLabel>
  </FlexLayout>
</StackingLayout>
```

### Usage Notes

- Prefer static enum members (`TextLabel.TEXT_LABEL_TYPE.*`, `TextLabel.TEXT_LABEL_SIZE.*`, `TextLabel.APPEARANCE.*`, `TextLabel.TEXT_LABEL_DISPLAY.*`) over raw string literals.
- Use `multiLine={true}` whenever label text may wrap to multiple lines; omitting it on wrapping text will cause clipped line heights.
- Keep validation labels, help text, and status text visible and persistent alongside form controls; use `FormItemInput` or other `FormItem*` wrappers where available.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.
- The `theme` prop is deprecated; replace all usages with `appearance={TextLabel.APPEARANCE.NAVIGATION}`.
- Limit label text to two lines or fewer in proportion to nearby input heights (per Prism UX guidelines).

<!-- SOURCE-API-END -->
