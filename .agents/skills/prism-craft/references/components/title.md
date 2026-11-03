# Title

## Figma

- **Library name:** Title / Heading (page: Data Display, frame: Typography)
- Maps to heading elements (H1-H4).

## React

Import: `import { Title } from '@nutanix-ui/prism-reactjs'`

### Enums

```ts
// Size
Title.TitleSizes.H1 // "h1"  (default)
Title.TitleSizes.H2 // "h2"
Title.TitleSizes.H3 // "h3"
Title.TitleSizes.H4 // "h4"

// Appearance
Title.TitleAppearance.DEFAULT // "default"  (default)
Title.TitleAppearance.NAVIGATION // "navigation"

// Line mode
Title.TitleLineMode.AUTO // "auto"  (default when lineMode is unset)
Title.TitleLineMode.SINGLE_LINE // "single-line"
Title.TitleLineMode.MULTI_LINE // "multi-line"
```

> **Deprecated aliases** — `Title.SIZES` and `Title.APPEARANCE` still work but are deprecated. Prefer `Title.TitleSizes` and `Title.TitleAppearance`.

### Props

`TitleProps` extends `Omit<React.HTMLProps<HTMLHeadElement>, 'ref' | 'size'>`.

| Prop              | Type                   | Default                   | Required | Notes                                                                      |
| ----------------- | ---------------------- | ------------------------- | -------- | -------------------------------------------------------------------------- |
| `children`        | `React.ReactNode`      | —                         | yes      | Heading content                                                            |
| `size`            | `TitleSizes`           | `TitleSizes.H1`           | no       | Visual size. Use `Title.TitleSizes.H1`–`H4`                                |
| `appearance`      | `TitleAppearance`      | `TitleAppearance.DEFAULT` | no       | `NAVIGATION` for dark/nav backgrounds                                      |
| `tag`             | `'span' \| TitleSizes` | same as `size`            | no       | Semantic HTML tag; decouples visual size from DOM heading level            |
| `lineMode`        | `TitleLineMode`        | `TitleLineMode.AUTO`      | no       | Controls line-height behaviour. Takes precedence over `forceSingleLine`.   |
| `forceSingleLine` | `boolean`              | `false`                   | no       | **@deprecated** — use `lineMode={Title.TitleLineMode.SINGLE_LINE}` instead |
| `className`       | `string`               | —                         | no       | Additional CSS class                                                       |
| `data-test`       | `string`               | —                         | no       | Test selector                                                              |

All other standard HTML heading element props (`id`, `style`, `aria-*`, etc.) are also accepted via the `HTMLProps` extension.

### Behaviour

- **Auto multi-line detection (`lineMode="auto"`):** On mount and whenever `children`, `size`, or `lineMode` changes, the component measures its rendered height. If the height exceeds the default single-line height for the current `size`, multi-line line-height CSS is applied automatically. Set `lineMode={Title.TitleLineMode.MULTI_LINE}` to always use multi-line styling, or `SINGLE_LINE` to always use single-line styling.
- **`tag` vs `size`:** `size` sets the visual typography style; `tag` sets the DOM element (defaulting to the same value as `size`). Use `tag` when the visual hierarchy must differ from the semantic heading level (e.g. render an `<h2>` that visually looks like H4).
- **`data-appearance` / `data-size`:** The component applies `data-appearance` and `data-size` attributes to the DOM element; useful for CSS overrides and automated testing.

### TSX Examples

```tsx
import { Title } from '@nutanix-ui/prism-reactjs'

{
  /* Page heading — H1 is the default size */
}
;<Title>Endpoints</Title>

{
  /* Section heading */
}
;<Title size={Title.TitleSizes.H2}>Configuration</Title>

{
  /* Card title */
}
;<Title size={Title.TitleSizes.H3}>GPU Metrics</Title>

{
  /* Sub-section */
}
;<Title size={Title.TitleSizes.H4}>Yesterday</Title>

{
  /* Navigation context (dark background) */
}
;<Title
  size={Title.TitleSizes.H2}
  appearance={Title.TitleAppearance.NAVIGATION}
>
  Dashboard
</Title>

{
  /* Decouple visual size from semantic level: renders <h2> with H4 visual style */
}
;<Title tag={Title.TitleSizes.H2} size={Title.TitleSizes.H4}>
  Subsection Note
</Title>

{
  /* Render as <span> with H1 visual style (no heading semantics) */
}
;<Title tag="span" size={Title.TitleSizes.H1}>
  Display-only Label
</Title>

{
  /* Force multi-line line-height without waiting for auto-detection */
}
;<Title size={Title.TitleSizes.H2} lineMode={Title.TitleLineMode.MULTI_LINE}>
  A very long heading that spans multiple lines and needs correct line-height
  applied immediately.
</Title>
```

### Anti-patterns

- Don't use raw `<h1>`–`<h4>` HTML tags — use `Title` with `size`.
- Don't pass string literals directly: use `Title.TitleSizes.H2` not `"h2"`.
- Maintain heading hierarchy: H1 → H2 → H3 → H4 (don't skip levels).
- Don't use the deprecated `Title.SIZES` / `Title.APPEARANCE` aliases in new code.
- Don't use `forceSingleLine` — use `lineMode={Title.TitleLineMode.SINGLE_LINE}`.

<!-- SOURCE-API-START -->

### Import

```tsx
import { Title } from '@nutanix-ui/prism-reactjs'
```

Named enum exports are also available for direct import:

```tsx
import {
  Title,
  TitleSizes,
  TitleAppearance,
  TitleLineMode,
} from '@nutanix-ui/prism-reactjs'
```

### Enums / Constants

#### `TitleSizes`

- `H1` = `"h1"` _(default for `size`)_
- `H2` = `"h2"`
- `H3` = `"h3"`
- `H4` = `"h4"`

#### `TitleAppearance`

- `DEFAULT` = `"default"` _(default)_
- `NAVIGATION` = `"navigation"`

#### `TitleLineMode`

- `AUTO` = `"auto"` _(default — measures element height to decide)_
- `SINGLE_LINE` = `"single-line"` — always use single-line line-height
- `MULTI_LINE` = `"multi-line"` — always use multi-line line-height

### Props Interface

#### `TitleProps`

Extends: `Omit<React.HTMLProps<HTMLHeadElement>, 'ref' | 'size'>`

| Prop              | Type                   | Default                   | Description                                                           |
| ----------------- | ---------------------- | ------------------------- | --------------------------------------------------------------------- |
| `children`        | `React.ReactNode`      | **required**              | Heading content                                                       |
| `size`            | `TitleSizes`           | `TitleSizes.H1`           | Visual typography size                                                |
| `appearance`      | `TitleAppearance`      | `TitleAppearance.DEFAULT` | `NAVIGATION` for dark/nav backgrounds                                 |
| `tag`             | `'span' \| TitleSizes` | same as `size`            | Semantic DOM element, independent of visual size                      |
| `lineMode`        | `TitleLineMode`        | `TitleLineMode.AUTO`      | Controls line-height styling; takes precedence over `forceSingleLine` |
| `forceSingleLine` | `boolean`              | `false`                   | **@deprecated** Use `lineMode` instead                                |
| `className`       | `string`               | —                         | Additional CSS class                                                  |
| `data-test`       | `string`               | —                         | Test automation selector                                              |

### Static Members

| Member                  | Value                    | Notes                                         |
| ----------------------- | ------------------------ | --------------------------------------------- |
| `Title.TitleSizes`      | `typeof TitleSizes`      | Preferred                                     |
| `Title.TitleAppearance` | `typeof TitleAppearance` | Preferred                                     |
| `Title.SIZES`           | `typeof TitleSizes`      | **@deprecated** — use `Title.TitleSizes`      |
| `Title.APPEARANCE`      | `typeof TitleAppearance` | **@deprecated** — use `Title.TitleAppearance` |

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Presentation

```tsx
import {
  Badge,
  FlexLayout,
  StackingLayout,
  InformationStatusIcon,
  TextLabel,
  Title,
} from '@nutanix-ui/prism-reactjs'
;<StackingLayout data-test-id="presentation">
  <FlexLayout alignItems="center" itemSpacing="10px">
    <Badge color="gray" count="H1" />
    <Title data-test-id="size-h1">Introducing Prism Xtensions</Title>
  </FlexLayout>
  <FlexLayout alignItems="center" itemSpacing="10px">
    <Badge color="gray" count="H2" />
    <Title data-test-id="size-h2" size="h2">
      Configuration
    </Title>
  </FlexLayout>
  <FlexLayout alignItems="center" itemSpacing="10px">
    <Badge color="gray" count="H3" />
    <Title data-test-id="size-h3" size="h3">
      Metric History
    </Title>
  </FlexLayout>
  <FlexLayout alignItems="center" itemSpacing="10px">
    <Badge color="gray" count="H4" />
    <Title data-test-id="size-h4" size="h4">
      Yesterday
    </Title>
  </FlexLayout>
  <FlexLayout itemSpacing="10px">
    <InformationStatusIcon
      style={{ color: 'var(--color-text-secondary-label)' }}
    />
    <TextLabel>
      When the title is in single line the line-height is set differently. This
      is by design.
    </TextLabel>
  </FlexLayout>
</StackingLayout>
```

#### HTML Tag Examples (semantic/visual decoupling)

```tsx
import {
  Badge, FlexLayout, StackingLayout,
  Paragraph, Title, UnorderedList
} from '@nutanix-ui/prism-reactjs';

{/* render <span> with H1–H4 visual styles (no heading semantics) */}
<Title tag="span" size="h1">You Are Amazing!</Title>
<Title tag="span" size="h2">You Are Amazing!</Title>
<Title tag="span" size="h3">You Are Amazing!</Title>
<Title tag="span" size="h4">You Are Amazing!</Title>

{/* mix semantic level and visual size */}
<Title tag="h1" size="h1">Coin Machine</Title>
<Title tag="h2" size="h1">Coin Machine</Title>  {/* <h2> that looks like H1 */}
<Title tag="h3" size="h2">Super Potato</Title>
<Title tag="h4" size="h2">Super Potato</Title>
<Title tag="h1" size="h3">Lumpia</Title>
<Title tag="h2" size="h3">Lumpia</Title>
<Title tag="h3" size="h4">Sweet Chili Sauce</Title>
<Title tag="h4" size="h4">Sweet Chili Sauce</Title>
```

#### Auto Multi-Line Height Example

```tsx
import { StackingLayout, Title } from '@nutanix-ui/prism-reactjs'
;<StackingLayout data-test-id="multiline" style={{ maxWidth: 800 }}>
  <Title data-test-id="multiline-size-h1">
    H1: Introducing Prism Xtensions. Maecenas posuere dui in ex placerat, sed
    tristique lorem hendrerit. Vestibulum ante ipsum primis in faucibus orci
    luctus et ultrices posuere cubilia Curae;
  </Title>
  <Title size="h2" data-test-id="multiline-size-h2">
    H2: Configuration. Maecenas posuere dui in ex placerat, sed tristique lorem
    hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
    posuere cubilia Curae;
  </Title>
</StackingLayout>
```

#### Navigation Background Example

```tsx
import { StackingLayout, Title } from '@nutanix-ui/prism-reactjs'
;<StackingLayout
  data-test-id="appearance-nav"
  className="ntnx-navigation-example"
  style={{ maxWidth: 800 }}
>
  <Title appearance={Title.TitleAppearance.NAVIGATION}>
    H1: Introducing Prism Xtensions. Maecenas posuere dui in ex placerat, sed
    tristique lorem hendrerit. Vestibulum ante ipsum primis in faucibus orci
    luctus et ultrices posuere cubilia Curae;
  </Title>
  <Title appearance={Title.TitleAppearance.NAVIGATION} size="h2">
    H2: Metric History. Maecenas posuere dui in ex placerat, sed tristique lorem
    hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
    posuere cubilia Curae;
  </Title>
  <Title appearance={Title.TitleAppearance.NAVIGATION} size="h3">
    H3: Configuration. Vestibulum ante ipsum primis in faucibus orci luctus et
    ultrices posuere cubilia Curae;
  </Title>
  <Title appearance={Title.TitleAppearance.NAVIGATION} size="h4">
    H4: Yesterday. Maecenas posuere dui in ex placerat, sed tristique lorem
    hendrerit.
  </Title>
</StackingLayout>
```

### Usage Notes

- Prefer documented enum/static values such as `Title.TitleSizes.<VALUE>` and `Title.TitleAppearance.<VALUE>` over raw strings. `Title.SIZES` and `Title.APPEARANCE` are deprecated aliases.
- `lineMode` takes precedence over `forceSingleLine`; always prefer `lineMode` in new code.
- Use the `tag` prop to decouple the rendered DOM heading level from the visual size when the design calls for it (e.g. visually an H4 but semantically an H2 in the document outline).
- Keep heading hierarchy correct for screen reader users: H1 → H2 → H3 → H4, no skipped levels.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.

<!-- SOURCE-API-END -->
