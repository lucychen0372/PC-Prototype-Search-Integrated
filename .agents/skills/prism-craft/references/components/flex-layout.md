# FlexLayout

## Figma

- **No direct Figma component** -- FlexLayout is used to translate Figma Auto Layout frames.
- Map Figma Auto Layout properties to FlexLayout props.

## React

Import: `import { FlexLayout, FlexItem } from '@nutanix-ui/prism-reactjs'`

### Props (FlexLayout)

`FlexLayout` extends `FlexItemProps` (all FlexItem props are also valid on FlexLayout).
It is implemented with `React.forwardRef` and accepts a `ref`.

| Prop             | Type                                                                                            | Default        | Notes                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- |
| `className`      | `string`                                                                                        | —              | Additional CSS class name                                                       |
| `display`        | `'flex' \| 'inline-flex'`                                                                       | `'flex'`       | Block flex vs inline flex container                                             |
| `flexDirection`  | `'row' \| 'row-reverse' \| 'column' \| 'column-reverse'`                                        | `'row'`        | Main axis direction                                                             |
| `justifyContent` | `'flex-start' \| 'flex-end' \| 'center' \| 'space-between' \| 'space-around' \| 'space-evenly'` | `'flex-start'` | Main axis alignment                                                             |
| `alignItems`     | `'flex-start' \| 'flex-end' \| 'center' \| 'baseline' \| 'stretch'`                             | `'stretch'`    | Cross axis alignment                                                            |
| `flexWrap`       | `'nowrap' \| 'wrap' \| 'wrap-reverse'`                                                          | `'nowrap'`     | Item wrapping                                                                   |
| `itemGap`        | `'none' \| 'XS' \| 'S' \| 'M' \| 'L' \| 'XL' \| 'XXL'`                                          | `'none'`       | Gap between items via CSS `gap`. Overrides `itemSpacing`. See size table below. |
| `itemSpacing`    | `'0px' \| '2px' \| '5px' \| '10px' \| '15px' \| '20px' \| '30px' \| '40px' \| '60px' \| '80px'` | `'20px'`       | **Deprecated** -- use `itemGap`. Spacing via CSS margins.                       |
| `itemFlexBasis`  | `'100pc'`                                                                                       | —              | Gives all children equal `flex-basis`                                           |
| `padding`        | see values below                                                                                | —              | Padding around children                                                         |
| `children`       | `React.ReactNode`                                                                               | —              |                                                                                 |
| `innerRef`       | `React.LegacyRef<any>`                                                                          | —              | Ref to the inner DOM element (legacy)                                           |

#### `padding` allowed values

`'0px' | '5px' | '10px' | '15px' | '20px' | '30px' | '40px' | '0px-5px' | '0px-10px' | '0px-15px' | '0px-20px' | '5px-0px' | '10px-0px' | '15px-0px' | '20px-0px' | '15px-20px'`

Format is `vertical-horizontal` when two values, e.g. `'0px-20px'` → 0px top/bottom, 20px left/right.

#### `itemGap` size table

| Value  | CSS gap       |
| ------ | ------------- |
| `none` | 0px (default) |
| `XS`   | 5px           |
| `S`    | 10px          |
| `M`    | 15px          |
| `L`    | 20px          |
| `XL`   | 30px          |
| `XXL`  | 40px          |

### Props (FlexItem)

`FlexItem` extends `React.HTMLProps<HTMLElement>` (all standard HTML div props are valid).

| Prop         | Type                                                                          | Default | Notes                                                                     |
| ------------ | ----------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------- |
| `className`  | `string`                                                                      | —       | Additional CSS class name                                                 |
| `flexGrow`   | `'0' \| '1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '7' \| '8' \| '9' \| '10'`  | —       | How much the item stretches into available space. **String**, not number. |
| `flexShrink` | `'0' \| '1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '7' \| '8' \| '9' \| '10'`  | —       | Whether the item shrinks. **String**, not number.                         |
| `alignSelf`  | `'auto' \| 'flex-start' \| 'flex-end' \| 'center' \| 'baseline' \| 'stretch'` | —       | Overrides container `alignItems` for this item                            |
| `background` | `'base' \| 'alt' \| 'body'`                                                   | —       | Sets background context; also provides `BackgroundContext` to children    |
| `htmlTag`    | `string`                                                                      | `'div'` | Root DOM element, e.g. `'span'`, `'label'`, `'ul'`                        |
| `innerRef`   | `React.LegacyRef<any>`                                                        | —       | Ref to the inner DOM element                                              |
| `data-test`  | `string`                                                                      | —       | Test selector                                                             |
| `children`   | `React.ReactNode`                                                             | —       |                                                                           |

### Figma Auto Layout -> React Mapping

| Figma Property              | React Prop                                         |
| --------------------------- | -------------------------------------------------- |
| Direction: Horizontal       | `flexDirection="row"`                              |
| Direction: Vertical         | `flexDirection="column"` (or use `StackingLayout`) |
| Gap                         | `itemGap` (map pixel value to t-shirt size)        |
| Padding                     | `padding` (use closest allowed value)              |
| Alignment: Center           | `justifyContent="center"` + `alignItems="center"`  |
| Primary axis: Space Between | `justifyContent="space-between"`                   |
| Counter axis: Start         | `alignItems="flex-start"`                          |
| Wrap                        | `flexWrap="wrap"`                                  |

### TSX Examples

```tsx
import { FlexLayout, FlexItem, Button, Title } from '@nutanix-ui/prism-reactjs'

{
  /* Horizontal row with gap */
}
;<FlexLayout itemGap="S" alignItems="center">
  <Button type={Button.ButtonTypes.PRIMARY}>Save</Button>
  <Button type={Button.ButtonTypes.SECONDARY}>Cancel</Button>
</FlexLayout>

{
  /* Space-between header */
}
;<FlexLayout justifyContent="space-between" alignItems="center" padding="20px">
  <Title size="h2">Endpoints</Title>
  <Button type={Button.ButtonTypes.PRIMARY}>Create</Button>
</FlexLayout>

{
  /* Equal-width children */
}
;<FlexLayout itemGap="L" itemFlexBasis="100pc">
  <Card>One</Card>
  <Card>Two</Card>
  <Card>Three</Card>
</FlexLayout>

{
  /* Wrapping icon grid */
}
;<FlexLayout alignItems="center" flexWrap="wrap">
  <PlusIcon />
  <CloseIcon />
  <EditIcon />
</FlexLayout>

{
  /* Float left/right */
}
;<FlexLayout justifyContent="space-between">
  <Title>Left Item</Title>
  <Title>Right Item</Title>
</FlexLayout>
```

#### FlexItem: grow to fill remaining space (row)

```tsx
import {
  FlexLayout,
  FlexItem,
  FormItemInput,
  Button,
  PlusIcon,
} from '@nutanix-ui/prism-reactjs'
;<FlexLayout alignItems="flex-end">
  <FlexItem flexGrow="1">
    <FormItemInput id="ip" label="IP Address" placeholder="IP Address" />
  </FlexItem>
  <Button>
    <PlusIcon size="small" aria-hidden="true" /> Add
  </Button>
</FlexLayout>
```

#### FlexItem: grow to fill remaining space (column)

```tsx
import { FlexLayout, FlexItem, Title } from '@nutanix-ui/prism-reactjs'
;<FlexLayout flexDirection="column" style={{ height: 200 }}>
  <Title size="h3">Header</Title>
  <FlexItem flexGrow="1">Body content fills remaining height.</FlexItem>
  <Title size="h3">Footer</Title>
</FlexLayout>
```

#### FlexItem: per-item alignment override

```tsx
import { FlexLayout, FlexItem } from '@nutanix-ui/prism-reactjs'
;<FlexLayout style={{ height: 100 }}>
  <FlexItem alignSelf="flex-end">Bottom</FlexItem>
  <FlexItem alignSelf="center">Center</FlexItem>
  <FlexItem alignSelf="flex-start">Top</FlexItem>
</FlexLayout>
```

#### Centering content vertically and horizontally

```tsx
import {
  FlexLayout,
  StackingLayout,
  Button,
  Title,
} from '@nutanix-ui/prism-reactjs'
;<FlexLayout
  style={{ height: '500px' }}
  alignItems="center"
  justifyContent="center"
>
  <StackingLayout style={{ width: '280px' }} itemSpacing="30px">
    <Title>Welcome</Title>
    <Button fullWidth={true}>Log In</Button>
  </StackingLayout>
</FlexLayout>
```

### Anti-patterns

- Don't use `<div style={{ display: 'flex' }}>` -- use `FlexLayout`
- Don't use `itemSpacing` (deprecated) -- use `itemGap`
- Don't use CSS gap/margin -- use `itemGap` prop
- Don't use `alignContent` -- it is **not** a supported prop on FlexLayout
- Use `StackingLayout` instead of `FlexLayout flexDirection="column"` for simple vertical stacking
- `flexGrow` and `flexShrink` values are **strings** (`'1'`, `'0'`), not numbers
- `itemFlexBasis` only accepts `'100pc'` (the only supported value)

<!-- SOURCE-API-START -->

### Import

```tsx
import { FlexLayout, FlexItem } from '@nutanix-ui/prism-reactjs'
```

### Props Interfaces

#### `FlexLayoutProps`

Extends: `FlexItemProps` (which extends `React.HTMLProps<HTMLElement>`)

| Prop             | Type                                                                                                                                                                                            | Description                                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `className`      | `string`                                                                                                                                                                                        | Customize additional class name.                                                                                                  |
| `display`        | `'flex' \| 'inline-flex'`                                                                                                                                                                       | Display the layout in flex (block style) or as inline container.                                                                  |
| `children`       | `React.ReactNode`                                                                                                                                                                               | Items (child nodes).                                                                                                              |
| `padding`        | `'0px' \| '5px' \| '10px' \| '15px' \| '20px' \| '30px' \| '40px' \| '0px-5px' \| '0px-10px' \| '0px-15px' \| '0px-20px' \| '5px-0px' \| '10px-0px' \| '15px-0px' \| '20px-0px' \| '15px-20px'` | Padding to wrap all children.                                                                                                     |
| `itemSpacing`    | `'0px' \| '2px' \| '5px' \| '10px' \| '15px' \| '20px' \| '30px' \| '40px' \| '60px' \| '80px'`                                                                                                 | Set spacing between items using CSS margins. Default `'20px'`. **@deprecated** Use `itemGap` instead.                             |
| `itemGap`        | `'none' \| 'XS' \| 'S' \| 'M' \| 'L' \| 'XL' \| 'XXL'`                                                                                                                                          | Set spacing between items using flex `gap`. Overrides `itemSpacing`. none=0px, XS=5px, S=10px, M=15px, L=20px, XL=30px, XXL=40px. |
| `itemFlexBasis`  | `'100pc'`                                                                                                                                                                                       | Give all items equal `flex-basis` share.                                                                                          |
| `flexDirection`  | `'row' \| 'row-reverse' \| 'column' \| 'column-reverse'`                                                                                                                                        | Main axis direction. Default `'row'`.                                                                                             |
| `alignItems`     | `'flex-start' \| 'flex-end' \| 'center' \| 'baseline' \| 'stretch'`                                                                                                                             | Cross-axis alignment. Default `'stretch'`.                                                                                        |
| `justifyContent` | `'flex-start' \| 'flex-end' \| 'center' \| 'space-between' \| 'space-around' \| 'space-evenly'`                                                                                                 | Main-axis alignment. Default `'flex-start'`.                                                                                      |
| `flexWrap`       | `'nowrap' \| 'wrap' \| 'wrap-reverse'`                                                                                                                                                          | Item wrapping. Default `'nowrap'`.                                                                                                |
| `innerRef`       | `React.LegacyRef<any>`                                                                                                                                                                          | Ref to inner HTML element (merged with forwardRef).                                                                               |

#### `FlexItemProps`

Extends: `Omit<React.HTMLProps<HTMLElement>, 'ref'>`

| Prop         | Type                                                                          | Description                                                                  |
| ------------ | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `className`  | `string`                                                                      | Additional custom class name.                                                |
| `flexGrow`   | `'0' \| '1' \| ... \| '10'`                                                   | Stretch factor (string). Default `'0'`.                                      |
| `flexShrink` | `'0' \| '1' \| ... \| '10'`                                                   | Shrink factor (string). Default `'1'`.                                       |
| `alignSelf`  | `'auto' \| 'flex-start' \| 'flex-end' \| 'center' \| 'baseline' \| 'stretch'` | Per-item cross-axis alignment override.                                      |
| `background` | `'base' \| 'alt' \| 'body'`                                                   | Sets the background context and provides `BackgroundContext` to descendants. |
| `htmlTag`    | `string`                                                                      | Root DOM element tag. Default `'div'`.                                       |
| `innerRef`   | `React.LegacyRef<any>`                                                        | Ref to the inner HTML element.                                               |
| `data-test`  | `string`                                                                      | Test ID selector.                                                            |
| `children`   | `React.ReactNode`                                                             | Child content.                                                               |

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Basic usage

```tsx
<FlexLayout>
  <FlexLayout alignItems="center" itemGap="S">
    <StatusIcon
      type={StatusIcon.StatusIconTypes.WARNING}
      tooltipProps={{ content: 'message (warning)', oldTooltip: false }}
    />
    <Title size="h3">You have a new software update.</Title>
  </FlexLayout>
  <Button>Download</Button>
</FlexLayout>
```

### Usage Notes

- Prefer documented enum/static values such as `FlexLayout.<EnumName>.<VALUE>` over raw strings when the component exposes them.
- Keep labels, help text, and validation visible and persistent for form controls; use `FormItem*` wrappers where available.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.
- `FlexLayout` renders via `React.forwardRef` — pass `ref` to get the underlying DOM element.
- `FlexItem.background` sets a `BackgroundContext` provider for all descendants, enabling contrast-aware child components.
- `itemFlexBasis="100pc"` is the only valid value; it sets `flex-basis: 100%` on every direct child for equal-width columns.
- `alignContent` is **not** a prop of `FlexLayout` — do not use it.

<!-- SOURCE-API-END -->
