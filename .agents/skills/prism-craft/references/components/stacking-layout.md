# StackingLayout

## Figma

- **No direct Figma component** -- maps to vertical Auto Layout frames.
- Use for any vertical stack of elements.

## React

Import: `import { StackingLayout } from '@nutanix-ui/prism-reactjs'`

### Props

| Prop           | Type                                                               | Default  | Notes                                                                                                                       |
| -------------- | ------------------------------------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `itemGap`      | `"none" \| "XS" \| "S" \| "M" \| "L" \| "XL" \| "XXL"`             | —        | Flex gap between children: none=0px, XS=5px, S=10px, M=15px, L=20px, XL=30px, XXL=40px. Overrides `itemSpacing` when set.   |
| `itemSpacing`  | `"0px" \| "5px" \| "10px" \| "15px" \| "20px" \| "30px" \| "40px"` | `"20px"` | Margin-based child spacing. **Deprecated** -- prefer `itemGap`. Ignored when `itemGap` is set.                              |
| `itemDisplay`  | `"block" \| "flex"`                                                | —        | Forces a display type on all direct children. Useful for inline elements (checkboxes, buttons) that don't stack by default. |
| `display`      | `"block" \| "inline-block" \| "flex" \| "inline-flex"`             | —        | Display value for the root element itself.                                                                                  |
| `padding`      | See padding values below                                           | —        | Padding applied around all children. Accepts uniform values (`"20px"`) or vertical-horizontal pairs (`"10px-20px"`).        |
| `background`   | `"body" \| "base" \| "alt"`                                        | —        | Theme-aware background. Also sets a `BackgroundContext` provider for descendant components.                                 |
| `htmlTag`      | `string`                                                           | `"div"`  | Override the root HTML element. Any valid DOM tag, e.g. `"ul"`, `"section"`, `"label"`.                                     |
| `className`    | `string`                                                           | —        | Additional CSS class on the root element.                                                                                   |
| `parentDivRef` | `LegacyRef<HTMLDivElement>`                                        | —        | Ref attached to the root element. The component also accepts a standard `ref` via `forwardRef`.                             |
| `data-test`    | `string`                                                           | —        | Test selector attached to the root element.                                                                                 |
| `children`     | `ReactNode`                                                        | —        | Children stacked vertically.                                                                                                |

#### `padding` accepted values

Uniform (same on all sides): `"0px"` `"5px"` `"10px"` `"15px"` `"20px"` `"30px"` `"40px"`

Vertical-horizontal pairs (`"<vertical>-<horizontal>"`):

```
"0px-5px"  "0px-10px" "0px-15px" "0px-20px" "0px-30px" "0px-40px"
"5px-0px"  "5px-10px" "5px-15px" "5px-20px" "5px-30px" "5px-40px"
"10px-0px" "10px-5px" "10px-15px" "10px-20px" "10px-30px" "10px-40px"
"15px-0px" "15px-5px" "15px-10px" "15px-20px" "15px-30px" "15px-40px"
"20px-0px" "20px-5px" "20px-10px" "20px-15px" "20px-30px" "20px-40px"
"30px-0px" "30px-5px" "30px-10px" "30px-15px" "30px-20px" "30px-40px"
"40px-0px" "40px-5px" "40px-10px" "40px-15px" "40px-20px" "40px-30px"
```

### TSX Examples

```tsx
{
  /* Page section */
}
;<StackingLayout itemGap="L" padding="20px">
  <Title size={Title.SIZES.H2}>Settings</Title>
  <Paragraph>Configure your application settings below.</Paragraph>
  <Divider />
  <FormSection title="General" />
</StackingLayout>

{
  /* Card-like container */
}
;<StackingLayout itemGap="S" padding="20px" background="base">
  <Title size={Title.SIZES.H3}>CPU Usage</Title>
  <Paragraph>Average: 45%</Paragraph>
</StackingLayout>
```

### Anti-patterns

- Don't use `<div>` with flex-direction column -- use `StackingLayout`
- Don't use `itemSpacing` (deprecated) -- use `itemGap`

<!-- SOURCE-API-START -->

### Import

```tsx
import { StackingLayout } from '@nutanix-ui/prism-reactjs'
```

### Props Interfaces

#### `StackingLayoutProps`

Extends: `extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'>`

The component is wrapped in `forwardRef`, so it accepts both a standard `ref` and the legacy `parentDivRef` prop; both are merged and attached to the root element.

| Prop           | Type                                                               | Default  | Description                                                                                                                                         |
| -------------- | ------------------------------------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `display`      | `'block' \| 'inline-block' \| 'flex' \| 'inline-flex'`             | —        | Display value for the root element.                                                                                                                 |
| `className`    | `string`                                                           | —        | Customize additional class name.                                                                                                                    |
| `itemDisplay`  | `'block' \| 'flex'`                                                | —        | Change display type of children. Convenient for stacking children that won't normally stack by themselves, e.g. checkboxes or buttons.              |
| `itemSpacing`  | `'0px' \| '5px' \| '10px' \| '15px' \| '20px' \| '30px' \| '40px'` | `'20px'` | Distance to space children apart (margin-based). Ignored when `itemGap` is set.                                                                     |
| `itemGap`      | `'none' \| 'XS' \| 'S' \| 'M' \| 'L' \| 'XL' \| 'XXL'`             | —        | Distance to space children apart using CSS flex `gap`. Overrides `itemSpacing`. none=0px, XS=5px, S=10px, M=15px, L=20px, XL=30px, XXL=40px.        |
| `padding`      | exhaustive union — see above                                       | —        | Padding to wrap all children. Uniform or vertical-horizontal pair format.                                                                           |
| `children`     | `React.ReactNode`                                                  | —        | Children that will stack vertically.                                                                                                                |
| `data-test`    | `string`                                                           | —        | Test selector attached to the root element.                                                                                                         |
| `parentDivRef` | `LegacyRef<HTMLDivElement>`                                        | —        | Ref attached to the root node. Merged with the forwarded `ref`.                                                                                     |
| `background`   | `'body' \| 'base' \| 'alt'`                                        | —        | Theme-aware background colour. When set, wraps the element in a `BackgroundContext.Provider` so descendant components receive the background value. |
| `htmlTag`      | `string`                                                           | `'div'`  | Override the root HTML element with any valid DOM tag, e.g. `'label'`, `'span'`, `'ul'`.                                                            |

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Basic usage

```tsx
import { StackingLayout, FormItemInput } from '@nutanix-ui/prism-reactjs'
;<StackingLayout>
  <FormItemInput id="name" label="Project Name" placeholder="Name" />
  <FormItemInput
    id="priority"
    label="Project Priority"
    placeholder="Priority"
  />
  <FormItemInput id="duedate" label="Project Due Date" placeholder="Date" />
</StackingLayout>
```

#### StackingLayout + FlexLayout

```tsx
import {
  StackingLayout,
  FlexLayout,
  FormItemInput,
} from '@nutanix-ui/prism-reactjs'
;<StackingLayout>
  <FormItemInput id="email" label="Email Address" placeholder="Email Address" />
  <FlexLayout itemFlexBasis="100pc">
    <FormItemInput
      id="countrycode"
      label="Country Code"
      placeholder="Country Code"
    />
    <FormItemInput id="state" label="State" placeholder="State" />
    <FormItemInput id="city" label="City" placeholder="City" />
  </FlexLayout>

  <FlexLayout itemFlexBasis="100pc">
    <FormItemInput id="org" label="Organization" placeholder="Organization" />
    <FormItemInput
      id="orgunit"
      label="Organization Unit"
      placeholder="Organization Unit"
    />
  </FlexLayout>
</StackingLayout>
```

#### Stacking inline elements (legacy `itemSpacing`)

```tsx
import {
  StackingLayout,
  Checkbox,
  Link,
  PlusIcon,
} from '@nutanix-ui/prism-reactjs'

function handleOnChange(event) {
  // Do something.
}

;<StackingLayout itemDisplay="block" itemSpacing="10px">
  <Checkbox id="6" label="Host Apache CPU" onChange={handleOnChange} />
  <Checkbox id="7" label="Host Apache VMs" onChange={handleOnChange} />
  <Checkbox id="8" label="Widget Cluster" onChange={handleOnChange} />
  <Link type={Link.LINK_TYPE.WITH_ICON} icon={<PlusIcon size="small" />}>
    Add Diagram
  </Link>
</StackingLayout>
```

#### Stacking inline elements (preferred `itemGap`)

```tsx
import {
  StackingLayout,
  Checkbox,
  Link,
  PlusIcon,
} from '@nutanix-ui/prism-reactjs'

function handleOnChange(event) {
  // Do something.
}

;<StackingLayout itemDisplay="block" itemGap="S">
  <Checkbox id="6" label="Host Apache CPU" onChange={handleOnChange} />
  <Checkbox id="7" label="Host Apache VMs" onChange={handleOnChange} />
  <Checkbox id="8" label="Widget Cluster" onChange={handleOnChange} />
  <Link type={Link.LINK_TYPE.WITH_ICON} icon={<PlusIcon size="small" />}>
    Add Diagram
  </Link>
</StackingLayout>
```

#### Using `ref` / `parentDivRef`

```tsx
import React, { useRef } from 'react'
import { StackingLayout } from '@nutanix-ui/prism-reactjs'

function MyComponent() {
  const myRef = useRef<HTMLDivElement>(null)
  return (
    <StackingLayout parentDivRef={myRef} itemGap="M">
      {/* children */}
    </StackingLayout>
  )
}
```

#### Custom root element (`htmlTag`)

```tsx
import { StackingLayout } from '@nutanix-ui/prism-reactjs'
;<StackingLayout htmlTag="ul" itemGap="S">
  <li>Item one</li>
  <li>Item two</li>
  <li>Item three</li>
</StackingLayout>
```

### Usage Notes

- Prefer `itemGap` over `itemSpacing`; `itemSpacing` is legacy and is ignored when `itemGap` is provided.
- `itemGap` maps to CSS `gap` (flex gap); `itemSpacing` uses margins.
- Default `itemSpacing` is `'20px'` when neither `itemGap` nor an explicit `itemSpacing` is set.
- Setting `background` wraps the root element in a `BackgroundContext.Provider`, propagating the value to all descendant Prism components that read background context.
- Use `htmlTag` to emit semantic HTML (e.g. `"ul"`, `"section"`, `"nav"`) without wrapping in an extra `<div>`.
- The component supports both `ref` (via `forwardRef`) and the legacy `parentDivRef` prop; both are merged onto the root node.
- Use Prism layout props (`itemGap`, `padding`, `display`) instead of custom CSS for layout and spacing.

<!-- SOURCE-API-END -->
