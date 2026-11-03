# Separator / VerticalSeparator

## Figma

- **Library name:** Separator (page: Layout, frame: Layout)
- Inserts a visual separator between multiple children.

## React

Import: `import { Separator, VerticalSeparator } from '@nutanix-ui/prism-reactjs'`

### Enums (VerticalSeparator)

```ts
// Attached as static properties on the VerticalSeparator component:
VerticalSeparator.VerticalSeparatorTypes.INFO // "info"
VerticalSeparator.VerticalSeparatorTypes.ERROR // "error"
VerticalSeparator.VerticalSeparatorTypes.SUCCESS // "success"
VerticalSeparator.VerticalSeparatorTypes.WARNING // "warning"

VerticalSeparator.VerticalSeparatorSizes.SMALL // "small"
VerticalSeparator.VerticalSeparatorSizes.LARGE // "large"

VerticalSeparator.VerticalSeparatorAppearance.DEFAULT // "default"
VerticalSeparator.VerticalSeparatorAppearance.SECONDARY // "secondary"
VerticalSeparator.VerticalSeparatorAppearance.NAVIGATION // "navigation"

VerticalSeparator.VerticalSeparatorThemes.LIGHT // "light"
VerticalSeparator.VerticalSeparatorThemes.DARK // "dark"

// Shorthand aliases (same values as above):
VerticalSeparator.APPEARANCE // alias for VerticalSeparatorAppearance
VerticalSeparator.TYPE // alias for VerticalSeparatorTypes
```

### Props (Separator)

Renders as `<ul>`. Extends `Omit<React.HTMLProps<HTMLUListElement>, 'ref'>`.

| Prop        | Type                                                                  | Default          | Required | Notes                                                                                                                                                                                     |
| ----------- | --------------------------------------------------------------------- | ---------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`  | `React.ReactNode`                                                     | —                | **yes**  | Two or more items; falsy children are filtered out automatically                                                                                                                          |
| `separator` | `React.ReactNode`                                                     | —                | **yes**  | Separator element inserted between each child (e.g. `<VerticalSeparator />`, any icon)                                                                                                    |
| `spacing`   | `'spacing-0px' \| 'spacing-10px' \| 'spacing-15px' \| 'spacing-20px'` | `'spacing-15px'` | no       | Gap between the separator and its adjacent items. `spacing-0px` lets items manage their own spacing; `spacing-10px` for small/menu separators; `spacing-20px` for large button separators |
| `className` | `string`                                                              | —                | no       | Additional CSS class on the root `<ul>`                                                                                                                                                   |
| `data-test` | `string`                                                              | —                | no       | Test selector (also accepts `data-test-id` via HTML prop spread)                                                                                                                          |

### Props (VerticalSeparator)

Renders as `<div>`. Extends `Omit<React.HTMLProps<HTMLDivElement>, 'ref' | 'size'>`.

| Prop         | Type                          | Default                                     | Required | Notes                                                                    |
| ------------ | ----------------------------- | ------------------------------------------- | -------- | ------------------------------------------------------------------------ |
| `size`       | `VerticalSeparatorSizes`      | `VerticalSeparatorSizes.SMALL` (`"small"`)  | no       | Height of the separator line                                             |
| `appearance` | `VerticalSeparatorAppearance` | —                                           | no       | Background-context variant; controls color token. Use instead of `theme` |
| `type`       | `VerticalSeparatorTypes`      | —                                           | no       | Semantic color variant (info / error / success / warning)                |
| `theme`      | `VerticalSeparatorThemes`     | `VerticalSeparatorThemes.LIGHT` (`"light"`) | no       | **Deprecated** — use `appearance` instead                                |
| `className`  | `string`                      | —                                           | no       | Additional CSS class                                                     |
| `data-test`  | `string`                      | —                                           | no       | Test selector                                                            |
| `innerRef`   | `React.LegacyRef<any>`        | —                                           | no       | Ref forwarded to the inner `<div>`                                       |

### TSX Examples

```tsx
import {
  Separator,
  VerticalSeparator,
  Button,
  TextLabel,
  FlexLayout,
  QuestionIcon,
  CloseIcon,
  MagGlassIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  DotIcon,
  PlusIcon,
} from '@nutanix-ui/prism-reactjs'

{
  /* Basic: icons separated by a VerticalSeparator */
}
;<Separator separator={<VerticalSeparator />}>
  <QuestionIcon aria-hidden="false" aria-label="Help" />
  <CloseIcon aria-hidden="false" aria-label="Close" />
  <MagGlassIcon aria-hidden="false" aria-label="Search" />
</Separator>

{
  /* Custom spacing — 20px gap around a large separator between buttons */
}
;<Separator
  separator={<VerticalSeparator size="large" />}
  spacing="spacing-20px"
>
  <Button>
    <PlusIcon aria-hidden="true" /> Primary
  </Button>
  <Button type={Button.ButtonTypes.SECONDARY}>
    Secondary <MagGlassIcon aria-hidden="true" />
  </Button>
</Separator>

{
  /* Null child in the middle — falsy children are filtered, separator not inserted */
}
;<Separator separator={<VerticalSeparator />}>
  <QuestionIcon aria-hidden="false" aria-label="Help" />
  {null}
  <MagGlassIcon aria-hidden="false" aria-label="Search" />
</Separator>

{
  /* Breadcrumb-style with chevron icon as separator */
}
;<Separator separator={<ChevronRightIcon />}>
  <TextLabel type="primary">VM</TextLabel>
  <TextLabel type="primary">Metrics</TextLabel>
</Separator>

{
  /* Dot separator */
}
;<Separator separator={<DotIcon />}>
  <TextLabel type="primary">255.255.255.0</TextLabel>
  <TextLabel type="primary">Cluster: Stark</TextLabel>
</Separator>

{
  /* Secondary appearance — use on non-default backgrounds */
}
;<Separator
  separator={
    <VerticalSeparator
      appearance={VerticalSeparator.VerticalSeparatorAppearance.SECONDARY}
    />
  }
>
  <MagGlassIcon color="dark" aria-hidden="false" aria-label="Search" />
  <QuestionIcon color="dark" aria-hidden="false" aria-label="Help" />
</Separator>

{
  /* Navigation appearance — use inside nav/toolbar contexts */
}
;<VerticalSeparator
  appearance={VerticalSeparator.VerticalSeparatorAppearance.NAVIGATION}
/>

{
  /* Semantic type variants */
}
;<FlexLayout>
  <VerticalSeparator type={VerticalSeparator.VerticalSeparatorTypes.SUCCESS} />
  <VerticalSeparator type={VerticalSeparator.VerticalSeparatorTypes.WARNING} />
  <VerticalSeparator type={VerticalSeparator.VerticalSeparatorTypes.INFO} />
  <VerticalSeparator type={VerticalSeparator.VerticalSeparatorTypes.ERROR} />
</FlexLayout>

{
  /* Size variants — standalone VerticalSeparator */
}
;<FlexLayout alignItems="center">
  <VerticalSeparator />
  <VerticalSeparator size={VerticalSeparator.VerticalSeparatorSizes.LARGE} />
</FlexLayout>
```

### Anti-patterns

- Don't use CSS borders as inline separators — use `Separator` + `VerticalSeparator`.
- Don't use the deprecated `theme` prop on `VerticalSeparator` — use `appearance` instead.
- Don't pass a single child to `Separator`; it will render without any separator elements.

<!-- SOURCE-API-START -->

### Import

```tsx
import { Separator, VerticalSeparator } from '@nutanix-ui/prism-reactjs'
```

### Props Interfaces

#### `SeparatorProps`

Extends: `Omit<React.HTMLProps<HTMLUListElement>, 'ref'>`

| Prop        | Type                                                                  | Description                                                                                                                                                                                                                                                         |
| ----------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`  | `React.ReactNode`                                                     | **Required.** Two or more children to add a separator in between. Falsy children are filtered out before separators are inserted.                                                                                                                                   |
| `separator` | `React.ReactNode`                                                     | **Required.** The separator element. Example: `<VerticalSeparator />`, or any icon.                                                                                                                                                                                 |
| `spacing`   | `'spacing-0px' \| 'spacing-10px' \| 'spacing-15px' \| 'spacing-20px'` | Spacing between the separator and the items adjacent to it. `spacing-0px`: no spacing, items manage their own. `spacing-10px`: smaller separators (e.g. Menu). `spacing-15px`: default, small separators. `spacing-20px`: large separators such as between buttons. |
| `className` | `string`                                                              | Additional classname on the root `<ul>`.                                                                                                                                                                                                                            |
| `data-test` | `string`                                                              | Test selector attribute.                                                                                                                                                                                                                                            |

#### `VerticalSeparatorProps`

Extends: `Omit<React.HTMLProps<HTMLDivElement>, 'ref' | 'size'>`

| Prop         | Type                          | Default                         | Description                                                                                           |
| ------------ | ----------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `size`       | `VerticalSeparatorSizes`      | `VerticalSeparatorSizes.SMALL`  | Height of the vertical separator line.                                                                |
| `appearance` | `VerticalSeparatorAppearance` | —                               | Background-context variant. Controls which color token is used. Replaces the deprecated `theme` prop. |
| `type`       | `VerticalSeparatorTypes`      | —                               | Semantic color variant (info, error, success, warning). Applied as `data-type` attribute.             |
| `theme`      | `VerticalSeparatorThemes`     | `VerticalSeparatorThemes.LIGHT` | **Deprecated.** Use `appearance` instead.                                                             |
| `className`  | `string`                      | —                               | Additional classname.                                                                                 |
| `data-test`  | `string`                      | —                               | Test selector attribute.                                                                              |
| `innerRef`   | `React.LegacyRef<any>`        | —                               | Ref forwarded to the inner `<div>` element.                                                           |

### Behaviour Notes

- `Separator` renders a `<ul>` where each child and each separator are `<li>` elements.
- Separator `<li>` elements have `aria-hidden="true"` — purely decorative.
- Falsy children (`null`, `undefined`, `false`) are filtered before separators are inserted, so no orphaned separators appear adjacent to a missing child.
- A single child renders without any separator (no separator `<li>` is inserted).
- `VerticalSeparator` applies `size` and `theme` as CSS class names; `appearance` is applied as a `data-appearance` attribute; `type` is applied as a `data-type` attribute.

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Basic usage.

```tsx
<Separator separator={<VerticalSeparator />} data-test-id="basic-usage">
  <QuestionIcon aria-hidden="false" aria-label="Help" />
  <CloseIcon aria-hidden="false" aria-label="Close" />
  <MagGlassIcon aria-hidden="false" aria-label="Search" />
</Separator>
```

#### Null child in the middle.

```tsx
<Separator separator={<VerticalSeparator />} data-test-id="null-child">
  <QuestionIcon aria-hidden="false" aria-label="Help" />
  {null}
  <MagGlassIcon aria-hidden="false" aria-label="Search" />
</Separator>
```

#### Custom separator with 20px spacing.

```tsx
<Separator
  separator={<VerticalSeparator size="large" />}
  spacing="spacing-20px"
  data-test-id="custom-spacing"
>
  <Button>
    <PlusIcon aria-hidden="true" /> Primary
  </Button>
  <Button type={Button.ButtonTypes.SECONDARY}>
    Secondary <MagGlassIcon aria-hidden="true" />
  </Button>
</Separator>
```

#### Chevron right (breadcrumb).

```tsx
<Separator separator={<ChevronRightIcon />} data-test-id="chevron-right">
  <TextLabel type="primary">VM</TextLabel>
  <TextLabel type="primary">Metrics</TextLabel>
</Separator>
```

#### Dot separator.

```tsx
<Separator separator={<DotIcon />} data-test-id="dot-separator">
  <TextLabel type="primary">255.255.255.0</TextLabel>
  <TextLabel type="primary">Cluster: Stark</TextLabel>
</Separator>
```

#### Chevron left.

```tsx
<Separator separator={<ChevronLeftIcon />} data-test-id="chevron-left">
  <TextLabel type="primary">Metrics</TextLabel>
  <TextLabel type="primary">CPU</TextLabel>
</Separator>
```

#### VerticalSeparator standalone — basic.

```tsx
<VerticalSeparator />
```

#### VerticalSeparator sizes.

```tsx
<FlexLayout alignItems="center">
  <VerticalSeparator />
  <VerticalSeparator size="large" />
</FlexLayout>
```

#### VerticalSeparator appearance variants.

```tsx
<VerticalSeparator appearance={VerticalSeparator.VerticalSeparatorAppearance.SECONDARY} />
<VerticalSeparator appearance={VerticalSeparator.VerticalSeparatorAppearance.NAVIGATION} />
```

#### VerticalSeparator type variants.

```tsx
<FlexLayout>
  <VerticalSeparator type={VerticalSeparator.VerticalSeparatorTypes.SUCCESS} />
  <VerticalSeparator type={VerticalSeparator.VerticalSeparatorTypes.WARNING} />
  <VerticalSeparator type={VerticalSeparator.VerticalSeparatorTypes.INFO} />
  <VerticalSeparator type={VerticalSeparator.VerticalSeparatorTypes.ERROR} />
</FlexLayout>
```

### Usage Notes

- Prefer documented enum/static values such as `VerticalSeparator.VerticalSeparatorTypes.SUCCESS` over raw strings.
- Use `appearance` (not the deprecated `theme`) to match the background context of the separator.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.
- `VerticalSeparator` can be used standalone as a decorative divider or passed as the `separator` prop of `Separator`.

<!-- SOURCE-API-END -->
