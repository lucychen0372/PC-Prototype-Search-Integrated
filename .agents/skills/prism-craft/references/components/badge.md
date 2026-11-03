# Badge

## Figma

- **Library name:** Bubble (page: N/A, frame: Bubble)
- **Also matches:** Status Indicator, Counter Badge, Tag, Badge
- **Tag variants:**
  - Color: Red | Green | Yellow | Blue | Gray

## React

Import: `import { Badge } from '@nutanix-ui/prism-reactjs'`

### Figma -> React Prop Mapping

| Figma Property | React Prop | Value Mapping                                                                                |
| -------------- | ---------- | -------------------------------------------------------------------------------------------- |
| Color          | `color`    | Red -> `"red"`, Green -> `"green"`, Yellow -> `"yellow"`, Blue -> `"blue"`, Gray -> `"gray"` |

### TSX Examples

```tsx
{
  /* Status indicator (dot style — no count prop) */
}
;<Badge
  color={Badge.BadgeColorTypes.GREEN}
  text="Success"
  statusIcon={<SuccessStatusIcon />}
/>

{
  /* Tag badge (string count auto-converts to tag style) */
}
;<Badge
  color={Badge.BadgeColorTypes.BLUE}
  count="Info"
  statusIcon={<InformationStatusIcon />}
/>

{
  /* Force tag type regardless of count value */
}
;<Badge
  type={Badge.BadgeTypes.TAG}
  color={Badge.BadgeColorTypes.GRAY}
  count="32"
/>

{
  /* Numeric counter badge (number count auto-converts to badge style) */
}
;<Badge count={5} color={Badge.BadgeColorTypes.RED} />

{
  /* Counter with overflow */
}
;<Badge count={1000} overflowCount={999} />

{
  /* With tooltip */
}
;<Badge
  color={Badge.BadgeColorTypes.RED}
  count="Critical"
  tooltipProps={{
    content: 'Something is wrong.',
    appearance: 'secondary',
    oldTooltip: false,
  }}
/>

{
  /* Multiple badges in a row */
}
;<FlexLayout itemGap="XS">
  <Badge color={Badge.BadgeColorTypes.BLUE} count="v2" />
  <Badge color={Badge.BadgeColorTypes.GRAY} count="Archived" />
</FlexLayout>
```

### Anti-patterns

- Don't use colored `<span>` elements -- use `Badge`
- Don't hardcode badge colors -- use `BadgeColorTypes` enum
- Don't rely on color alone for meaning -- always pair with `statusIcon` for semantic context

<!-- SOURCE-API-START -->

### Import

```tsx
import { Badge } from '@nutanix-ui/prism-reactjs'
```

### Enums / Constants

#### `BadgeAlign`

- `TOP` = `top`
- `MIDDLE` = `middle`
- `BOTTOM` = `bottom`

#### `BadgeAppearance`

- `DEFAULT` = `default`
- `BASE` = `base`
- `NAVIGATION` = `navigation`
- `BORDERLESS` = `borderless`
- `BREADCRUMB` = `breadcrumb`

#### `BadgeColorTypes`

- `RED` = `red`
- `GREEN` = `green`
- `YELLOW` = `yellow`
- `BLUE` = `blue`
- `GRAY` = `gray`
- `DIAGRAM_PURPLE` = `diagram-purple`
- `DIAGRAM_AQUA` = `diagram-aqua`
- `DIAGRAM_ORANGE` = `diagram-orange`
- `DIAGRAM_YELLOW` = `diagram-yellow`

> `DIAGRAM_*` colors are reserved for chart/visualization legend use only.

#### `BadgeTypes`

- `BADGE` = `badge`
- `TAG` = `tag`

#### `BadgeStyleTypes`

- `BADGE` = `badge-style`
- `DOT` = `dot-style`
- `TAG` = `tag-style`

> `BadgeStyleTypes` describes the internally-resolved visual style. Consumers set `type` and `count`; the component derives the style automatically (see Behaviour Notes).

### Props Interfaces

#### `BadgeProps`

Extends: `extends FlexLayoutProps`

| Prop                   | Type                                     | Default                | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------- | ---------------------------------------- | ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `align`                | `BadgeAlign`                             | —                      | No       | Alignment of the badge indicator relative to its `text` when text wraps to multiple lines. enum BadgeAlign { TOP = 'top', MIDDLE = 'middle', BOTTOM = 'bottom' }                                                                                                                                                                                                                                                                                                              |
| `appearance`           | `BadgeAppearance`                        | auto (context-derived) | No       | Visual appearance context. Usually omitted — the component reads `BackgroundContext` to derive the correct appearance automatically. Pass explicitly when rendering on a navigation background (`NAVIGATION`) or inside a `Breadcrumb` (`BREADCRUMB`). enum BadgeAppearance { DEFAULT = 'default', BASE = 'base', NAVIGATION = 'navigation', BORDERLESS = 'borderless', BREADCRUMB = 'breadcrumb' }                                                                           |
| `className`            | `string`                                 | —                      | No       | Additional CSS class name(s).                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `color`                | `BadgeColorTypes \| string`              | `BadgeColorTypes.GRAY` | No       | Badge color. Use a preset from `BadgeColorTypes` whenever possible. A raw CSS color string is accepted for special cases such as chart legends, but custom colors must meet at least 4.5:1 contrast ratio.                                                                                                                                                                                                                                                                    |
| `count`                | `number \| string \| React.ReactElement` | —                      | No       | Content inside the badge indicator bubble.<br/>• `number` — shows numeric value; triggers counter (badge) style; values above `overflowCount` render as `{overflowCount}+`.<br/>• `string` — shows text label; triggers tag style automatically.<br/>• `React.ReactElement` — renders custom JSX as-is; triggers badge style. When custom content contains multiple related pieces, add `role="group"` to `<Badge>` for accessibility.<br/>If omitted, a status dot is shown. |
| `forceMultiLineHeight` | `boolean`                                | —                      | No       | Forces the `text` paragraph to always use multi-line height styling even when content fits on one line.                                                                                                                                                                                                                                                                                                                                                                       |
| `overflowCount`        | `number`                                 | `99`                   | No       | When `count` is a number larger than this value, displays `{overflowCount}+` instead of the raw number.                                                                                                                                                                                                                                                                                                                                                                       |
| `statusIcon`           | `React.ReactNode`                        | —                      | No       | Semantic icon rendered inside the badge indicator to reinforce the color's meaning. Strongly recommended — color alone must not be the only means of conveying information.                                                                                                                                                                                                                                                                                                   |
| `text`                 | `React.ReactNode`                        | —                      | No       | Label rendered to the right of the badge indicator. Used for status indicator patterns where the dot/icon sits beside a text description.                                                                                                                                                                                                                                                                                                                                     |
| `textType`             | `'primary' \| 'secondary'`               | auto                   | No       | Text style for the `text` label. Defaults to `'secondary'` when `text` is a number string, `'primary'` otherwise. Override only when the default inference is wrong.                                                                                                                                                                                                                                                                                                          |
| `tooltipProps`         | `ToolTipProps`                           | —                      | No       | When provided the badge is wrapped in a `Tooltip`, and the badge root automatically receives `role="button"` and `aria-disabled={true}`. Always include `oldTooltip: false` and `appearance: 'secondary'`. See the Tooltip component for all supported properties.                                                                                                                                                                                                            |
| `type`                 | `BadgeTypes`                             | `BadgeTypes.BADGE`     | No       | Forces the display style to badge or tag regardless of `count` value. enum BadgeTypes { BADGE = 'badge', TAG = 'tag' }                                                                                                                                                                                                                                                                                                                                                        |

### Static Members

| Member                    | Value             | Notes                                  |
| ------------------------- | ----------------- | -------------------------------------- |
| `Badge.BadgeAlign`        | `BadgeAlign`      | Preferred                              |
| `Badge.BadgeAppearance`   | `BadgeAppearance` | Preferred                              |
| `Badge.BadgeColorTypes`   | `BadgeColorTypes` | Preferred                              |
| `Badge.BadgeTypes`        | `BadgeTypes`      | Preferred                              |
| `Badge.BadgeStyleTypes`   | `BadgeStyleTypes` | Preferred                              |
| `Badge.APPEARANCE`        | `BadgeAppearance` | **Deprecated** — use `BadgeAppearance` |
| `Badge.BADGE_COLOR_TYPES` | `BadgeColorTypes` | **Deprecated** — use `BadgeColorTypes` |
| `Badge.BADGE_TYPES`       | `BadgeTypes`      | **Deprecated** — use `BadgeTypes`      |
| `Badge.BADGE_STYLE_TYPES` | `BadgeStyleTypes` | **Deprecated** — use `BadgeStyleTypes` |

### Behaviour Notes

#### Automatic style resolution

The component derives `BadgeStyleTypes` from `type` and `count` at render time:

| `type` prop | `count` value        | Resolved style        |
| ----------- | -------------------- | --------------------- |
| `TAG`       | any                  | `TAG` (tag-style)     |
| `BADGE`     | finite number        | `BADGE` (badge-style) |
| `BADGE`     | `React.ReactElement` | `BADGE` (badge-style) |
| `BADGE`     | non-empty string     | `TAG` (tag-style)     |
| `BADGE`     | undefined / empty    | `DOT` (dot-style)     |

#### BackgroundContext integration

`Badge` reads the nearest `BackgroundContext` to automatically set the correct `appearance`. The resolution order is:

1. If `appearance` is explicitly passed, use it as-is.
2. Else if `contextBg === 'body'`, use `BadgeAppearance.BASE`.
3. Else if the contrasting background (from `getContrastingBackground(contextBg)`) is `'body'`, use `BadgeAppearance.DEFAULT`.

Pass `appearance` explicitly only when automatic detection is wrong (e.g., navigation sidebars → `NAVIGATION`, breadcrumb containers → `BREADCRUMB`).

#### Tooltip badge accessibility

When `tooltipProps` is provided the component automatically adds `role="button"` and `aria-disabled={true}` to the badge root element so assistive technologies announce it as an interactive control. You do not need to add these attributes yourself.

#### Multi-line text detection

When the `text` prop is used the component sets up a `ResizeObserver` on the text node to detect wrapping. ResizeObserver callbacks are coalesced via `requestAnimationFrame` to avoid loop warnings. Use `align` to control the vertical alignment of the badge indicator when text wraps. Use `forceMultiLineHeight` to pre-size the text node for multi-line regardless of content.

#### `style` prop placement

The `style` prop (inherited from `FlexLayoutProps`) is forwarded to the inner `.badge-count` element, **not** the outer wrapper. This means inline `style` overrides only the indicator bubble (background color, text color, etc.). This is intentional and useful for the custom tag pattern:

```tsx
<Badge
  type="tag"
  count="VM"
  style={{
    color: 'var(--color-text-inverse)',
    backgroundColor: 'var(--color-background-tertiary)',
  }}
/>
```

#### `count` + `text` together

`count` and `text` can be used simultaneously. The indicator bubble shows `count` (or a dot if omitted) and the `text` label appears to its right. This is the canonical pattern for status indicators with numeric counters alongside a label:

```tsx
{
  /* Dot + label: no count — status indicator */
}
;<Badge color="red" text="Error" statusIcon={<AlertTriangleIcon />} />

{
  /* Dot + label (deprecated — no icon) */
}
;<Badge color="gray" text="Info" />

{
  /* Navigation counter with label */
}
;<Badge
  appearance={Badge.BadgeAppearance.NAVIGATION}
  count={50}
  text="Navigation Background"
/>
```

#### Status-dot-without-icon is deprecated

Using `text` alone (no `statusIcon`) to render a status dot is considered deprecated per the source examples. Always pair `statusIcon` with `text` in new code.

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Accessibility: use statusIcon with color

```tsx
import {
  StackingLayout,
  FlexLayout,
  FlexItem,
  Badge,
  InformationStatusIcon,
  Paragraph,
} from '@nutanix-ui/prism-reactjs'
;<StackingLayout style={{ maxWidth: 800 }}>
  <FlexLayout alignItems="center">
    <FlexItem>
      <Badge statusIcon={<InformationStatusIcon />} color="blue" count="info" />
    </FlexItem>
    <Paragraph>
      Use statusIcon to add semantic meaning to color. Color should never be the
      only way of conveying information.
    </Paragraph>
  </FlexLayout>
</StackingLayout>
```

#### Counter badge — all colors

```tsx
import {
  FlexLayout,
  StackingLayout,
  Badge,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
;<StackingLayout itemSpacing="40px">
  <FlexLayout>
    <Badge color="red" count="22" />
    <Badge color="yellow" count="22" />
    <Badge color="green" count="22" />
    <Badge color="blue" count="22" />
    <Badge color="gray" count="22" />
  </FlexLayout>
  <StackingLayout>
    <TextLabel type="primary">
      Special colors for visualizations only.
    </TextLabel>
    <FlexLayout>
      <Badge color="diagram-purple" count="22" />
      <Badge color="diagram-aqua" count="22" />
      <Badge color="diagram-orange" count="22" />
      <Badge color="diagram-yellow" count="22" />
    </FlexLayout>
  </StackingLayout>
</StackingLayout>
```

#### Counter with overflow limit

```tsx
<Badge count={1000} overflowCount={999} />
```

#### Counter with dynamic count (interactive)

```tsx
import React, { useState } from 'react'
import {
  PlusIcon,
  FlexLayout,
  Button,
  Badge,
  StackingLayout,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'

function BadgeExample() {
  const [count, setCount] = useState<number | undefined>()

  return (
    <StackingLayout itemGap="S">
      <FlexLayout>
        <Button onClick={() => setCount((c = 0) => c + 1)} count={count}>
          <PlusIcon size="small" /> Add Token
        </Button>
        <Badge
          onClick={() => setCount((c = 0) => c + 1)}
          className="yellow"
          count={count}
        />
      </FlexLayout>
      <TextLabel
        display={TextLabel.TEXT_LABEL_DISPLAY.BLOCK}
        size={TextLabel.TEXT_LABEL_SIZE.SMALL}
      >
        {count != null && count > 99
          ? 'You getting tired of clicking yet?'
          : 'Click button to increase count.'}
      </TextLabel>
    </StackingLayout>
  )
}
```

#### Tag badge — string count auto-converts to tag style

```tsx
import { FlexLayout, Badge } from '@nutanix-ui/prism-reactjs'
;<FlexLayout>
  <Badge color="red" count="Red" />
  <Badge color="yellow" count="Yellow" />
  <Badge color="green" count="Green" />
  <Badge color="blue" count="Blue" />
  <Badge color="gray" count="Gray" />
</FlexLayout>
```

#### Tag badge — force TAG type (overrides count type detection)

```tsx
import { FlexLayout, TextLabel, Badge } from '@nutanix-ui/prism-reactjs'
;<FlexLayout itemSpacing="40px">
  <FlexLayout alignItems="center" itemSpacing="10px">
    <TextLabel type="secondary">Windows 10</TextLabel>
    <Badge type={Badge.BadgeTypes.TAG} count="32" />
  </FlexLayout>
  <FlexLayout alignItems="center" itemSpacing="10px">
    <TextLabel type="secondary">Ubuntu</TextLabel>
    <Badge type={Badge.BadgeTypes.TAG} count="8" />
  </FlexLayout>
</FlexLayout>
```

#### Tag badge with semantic icons

```tsx
import {
  Badge,
  InformationStatusIcon,
  SuccessStatusIcon,
  WarningStatusIcon,
  AlertTriangleIcon,
} from '@nutanix-ui/prism-reactjs'
;<>
  <Badge
    appearance={Badge.BadgeAppearance.DEFAULT}
    statusIcon={<InformationStatusIcon />}
    color="blue"
    count="Info"
  />
  <Badge
    appearance={Badge.BadgeAppearance.DEFAULT}
    statusIcon={<SuccessStatusIcon />}
    color="green"
    count="Success"
  />
  <Badge
    appearance={Badge.BadgeAppearance.DEFAULT}
    statusIcon={<WarningStatusIcon />}
    color="yellow"
    count="Warning"
  />
  <Badge
    appearance={Badge.BadgeAppearance.DEFAULT}
    statusIcon={<AlertTriangleIcon />}
    color="red"
    count="Critical"
  />
</>
```

#### Tag badge with tooltip

```tsx
import { FlexLayout, Badge } from '@nutanix-ui/prism-reactjs'
;<FlexLayout>
  <Badge
    tooltipProps={{
      content: 'Remove 5 filters',
      appearance: 'secondary',
      oldTooltip: false,
    }}
    color="red"
    count="Remove Filter"
  />
  <Badge
    tooltipProps={{
      content: 'Remove 10 filters',
      appearance: 'secondary',
      oldTooltip: false,
    }}
    color="blue"
    count="Remove Filter"
  />
</FlexLayout>
```

#### Borderless tag

```tsx
import { FlexLayout, StackingLayout, Badge } from '@nutanix-ui/prism-reactjs'
;<StackingLayout className="nsg-example-borderless-content">
  <FlexLayout>
    <Badge
      appearance={Badge.BadgeAppearance.BORDERLESS}
      color="red"
      count="Red"
    />
    <Badge
      appearance={Badge.BadgeAppearance.BORDERLESS}
      color="yellow"
      count="Yellow"
    />
    <Badge
      appearance={Badge.BadgeAppearance.BORDERLESS}
      color="green"
      count="Green"
    />
    <Badge
      appearance={Badge.BadgeAppearance.BORDERLESS}
      color="blue"
      count="Blue"
    />
    <Badge
      appearance={Badge.BadgeAppearance.BORDERLESS}
      color="gray"
      count="Gray"
    />
  </FlexLayout>
</StackingLayout>
```

#### Navigation appearance

```tsx
import { FlexLayout, Badge } from '@nutanix-ui/prism-reactjs'
;<FlexLayout className="ntnx-navigation-example">
  <Badge
    appearance={Badge.BadgeAppearance.NAVIGATION}
    count={50}
    text="Navigation Background"
  />
  <Badge
    appearance={Badge.BadgeAppearance.NAVIGATION}
    color="red"
    text="Navigation Background"
  />
  <Badge
    appearance={Badge.BadgeAppearance.NAVIGATION}
    color="red"
    type={Badge.BadgeTypes.TAG}
    count="Red"
  />
</FlexLayout>
```

#### Status indicator (dot + text label, no count)

```tsx
import { FlexLayout, StackingLayout, Badge } from '@nutanix-ui/prism-reactjs'
;<StackingLayout itemSpacing="40px">
  <FlexLayout flexDirection="column">
    <Badge color="blue" text="Processing" />
    <Badge color="green" text="Success" />
    <Badge color="red" text="Error" />
    <Badge color="yellow" text="Warning" />
    <Badge color="gray" text="Info" />
  </FlexLayout>
</StackingLayout>
```

#### Status indicator with diagram colors (chart legend)

```tsx
import { FlexLayout, StackingLayout, Badge } from '@nutanix-ui/prism-reactjs'
;<StackingLayout>
  <FlexLayout flexDirection="column">
    <Badge color="diagram-purple" text="Purple" />
    <Badge color="diagram-aqua" text="Aqua" />
    <Badge color="diagram-orange" text="Orange" />
    <Badge color="diagram-yellow" text="Yellow" />
  </FlexLayout>
</StackingLayout>
```

#### Vertical alignment with multi-line text

```tsx
import {
  FlexLayout,
  FlexItem,
  StackingLayout,
  Badge,
} from '@nutanix-ui/prism-reactjs'
;<StackingLayout style={{ maxWidth: 600 }}>
  <FlexLayout alignItems="center">
    <FlexItem style={{ minWidth: 50 }}>
      <Badge color="gray" count="Top" />
    </FlexItem>
    <Badge
      align="top"
      color="green"
      text="Long text that wraps to demonstrate top alignment..."
    />
  </FlexLayout>
  <FlexLayout alignItems="center">
    <FlexItem style={{ minWidth: 50 }}>
      <Badge color="gray" count="Middle" />
    </FlexItem>
    <Badge
      align="middle"
      color="yellow"
      text="Long text that wraps to demonstrate middle alignment..."
    />
  </FlexLayout>
  <FlexLayout alignItems="center">
    <FlexItem style={{ minWidth: 50 }}>
      <Badge color="gray" count="Bottom" />
    </FlexItem>
    <Badge
      align="bottom"
      color="red"
      text="Long text that wraps to demonstrate bottom alignment..."
    />
  </FlexLayout>
</StackingLayout>
```

#### Wrapping text

```tsx
import { Badge, InformationStatusIcon } from '@nutanix-ui/prism-reactjs'
;<div style={{ maxWidth: '200px', padding: '5px' }}>
  <Badge
    color="gray"
    statusIcon={<InformationStatusIcon />}
    text="Lorem ipsum dolor sit amet consectetur adipiscing elit."
  />
</div>
```

#### Custom React element as count

```tsx
import { Badge, FlexLayout, TextLabel } from '@nutanix-ui/prism-reactjs'
;<FlexLayout alignItems="center" itemGap="M">
  <Badge
    count={
      <TextLabel
        size={TextLabel.TEXT_LABEL_SIZE.SMALL}
        type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}
      >
        Active
      </TextLabel>
    }
  />
</FlexLayout>
```

#### Custom element with accessibility grouping

When `count` contains multiple related pieces, add `role="group"` to `<Badge>`:

```tsx
import {
  Badge,
  FlexLayout,
  TextLabel,
  VerticalSeparator,
} from '@nutanix-ui/prism-reactjs'
;<Badge
  role="group"
  count={
    <FlexLayout alignItems="center" itemGap="XS">
      <TextLabel
        size={TextLabel.TEXT_LABEL_SIZE.SMALL}
        type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}
      >
        200 Filtered
      </TextLabel>
      <VerticalSeparator
        appearance={VerticalSeparator.VerticalSeparatorAppearance.SECONDARY}
      />
      <TextLabel
        size={TextLabel.TEXT_LABEL_SIZE.SMALL}
        type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}
      >
        10 Selected
      </TextLabel>
    </FlexLayout>
  }
/>
```

#### Usage inside Breadcrumb

```tsx
import { Badge, Breadcrumb, BreadcrumbItem } from '@nutanix-ui/prism-reactjs'

const items = ['Section', 'Current Page']

;<Breadcrumb>
  {items.map((label, i) => (
    <BreadcrumbItem key={label}>
      <Badge
        appearance={
          i === 0
            ? Badge.BadgeAppearance.BREADCRUMB
            : Badge.BadgeAppearance.BORDERLESS
        }
        type={Badge.BadgeTypes.TAG}
        count={label}
      />
    </BreadcrumbItem>
  ))}
</Breadcrumb>
```

#### Custom color (chart legend use case)

```tsx
import { FlexLayout, Badge } from '@nutanix-ui/prism-reactjs'

{
  /* Only use custom colors when chart/visualization requires it.
    Ensure ≥4.5:1 contrast ratio for any custom color. */
}
;<FlexLayout>
  <Badge color="#ed5fb4" count="22" />
  <Badge color="#ed5fb4" text="Category Custom" />
</FlexLayout>
```

### Usage Notes

- Prefer documented enum/static values such as `Badge.<EnumName>.<VALUE>` over raw strings when the component exposes them.
- `Badge` extends `FlexLayout` — all `FlexLayoutProps` (`itemGap`, `padding`, `alignItems`, `justifyContent`, etc.) are valid. `Badge` does **not** accept `children`; use `count` or `text` for content.
- The `appearance` prop is usually **not needed** — `BackgroundContext` handles it automatically. Only set it explicitly for navigation sidebars (`NAVIGATION`) or breadcrumb containers (`BREADCRUMB`).
- Always pair color with `statusIcon` to satisfy accessibility requirements (WCAG 1.4.1 — color must not be the sole means of conveying information).
- Use `role="group"` on `<Badge>` when the `count` prop renders a `React.ReactElement` containing multiple related data points. This also applies when `type={BadgeTypes.TAG}` with a custom-element `count`.
- The `style` prop is forwarded to the inner indicator bubble (`.badge-count`), not the outer FlexLayout wrapper. Use `FlexLayoutProps` (e.g. `padding`, `className`) for outer layout control.
- Using `text` alone without `statusIcon` for a status dot is **deprecated**. Always pair `statusIcon` with `text` in new code.

<!-- SOURCE-API-END -->
