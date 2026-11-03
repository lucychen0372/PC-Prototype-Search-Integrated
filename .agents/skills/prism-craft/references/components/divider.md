# Divider

## Figma

- **Library name:** Divider (page: Layout, frame: Layout)
- Simple horizontal line separator.

## React

Import: `import { Divider } from '@nutanix-ui/prism-reactjs'`

### Props

| Prop         | Type                      | Default        | Required | Notes                                                                       |
| ------------ | ------------------------- | -------------- | -------- | --------------------------------------------------------------------------- |
| `appearance` | `DividerAppearance`       | —              | No       | Controls visual style. Use static member `Divider.DividerAppearance.<VAL>`. |
| `children`   | `React.ReactNode`         | —              | No       | When provided, content is centred between two divider lines.                |
| `className`  | `string`                  | —              | No       | Additional CSS class name.                                                  |
| `type`       | `'full-width' \| 'short'` | `'full-width'` | No       | `'short'` renders a narrower line.                                          |
| `theme`      | `'light' \| 'dark'`       | `'light'`      | No       | **Deprecated.** Use `appearance` instead.                                   |
| `data-test`  | `string`                  | —              | No       | Test selector attribute.                                                    |

All other standard `HTMLDivElement` props are forwarded via spread (`extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'>`).

### Behaviour

- **No children:** renders a single `<div>` with the divider class and `data-appearance` attribute.
- **With children:** wraps the content node between two divider lines inside a `FlexLayout alignItems="center"` so the label appears centred on the rule.

### Anti-patterns

- Don't use `<hr>` — use `Divider`.
- Don't use `border-bottom` CSS for section dividers — use `Divider`.

<!-- SOURCE-API-START -->

### Import

```tsx
import { Divider } from '@nutanix-ui/prism-reactjs'
```

### Enums / Constants

#### `DividerAppearance`

Exported both as a named export and as static members on `Divider`.

| Key          | Value          |
| ------------ | -------------- |
| `DEFAULT`    | `'default'`    |
| `SECONDARY`  | `'secondary'`  |
| `NAVIGATION` | `'navigation'` |

```tsx
import { DividerAppearance } from '@nutanix-ui/prism-reactjs'
// or via static member:
Divider.DividerAppearance.NAVIGATION
```

### Props Interface

#### `DividerProps`

Extends: `Omit<React.HTMLProps<HTMLDivElement>, 'ref'>`

| Prop         | Type                      | Default        | Description                                                                  |
| ------------ | ------------------------- | -------------- | ---------------------------------------------------------------------------- |
| `appearance` | `DividerAppearance`       | —              | Visual appearance. Prefer `Divider.DividerAppearance.<VAL>` over raw string. |
| `children`   | `React.ReactNode`         | —              | Content node centred between two divider rules.                              |
| `className`  | `string`                  | —              | Additional CSS class name.                                                   |
| `type`       | `'full-width' \| 'short'` | `'full-width'` | Full-width or short (narrower) line.                                         |
| `theme`      | `'light' \| 'dark'`       | `'light'`      | **@deprecated** — use `appearance` instead.                                  |
| `data-test`  | `string`                  | —              | Automated-test selector.                                                     |

### Static Members

| Member                      | Value                                 |
| --------------------------- | ------------------------------------- |
| `Divider.DividerAppearance` | `DividerAppearance`                   |
| `Divider.APPEARANCE`        | `DividerAppearance` (**@deprecated**) |

### TSX Examples

#### Basic usage

```tsx
import { Divider } from '@nutanix-ui/prism-reactjs'
;<Divider />
```

#### Usage with layout

```tsx
import { Divider, StackingLayout, Title } from '@nutanix-ui/prism-reactjs'
;<StackingLayout itemGap="L">
  <Title size={Title.SIZES.H2}>Section One</Title>
  <Divider />
  <Title size={Title.SIZES.H2}>Section Two</Title>
</StackingLayout>
```

#### Usage with centred content

When `children` is supplied the component renders the child node between two divider lines.

```tsx
import { Divider, Link } from '@nutanix-ui/prism-reactjs'
;<Divider>
  <Link type={Link.LINK_TYPE.EXPANDABLE}>Show More</Link>
</Divider>
```

#### Short divider

```tsx
import { Divider, StackingLayout, Title } from '@nutanix-ui/prism-reactjs'
;<StackingLayout>
  <Title size="h3">Section A</Title>
  <Divider type="short" />
  <Title size="h3">Section B</Title>
  <Divider type="short" />
</StackingLayout>
```

#### Navigation appearance

Used inside dark navigation panels (e.g. alert drawers).

```tsx
import {
  Divider,
  StackingLayout,
  Title,
  ChevronRightIcon,
  FlexLayout,
  Badge,
  Paragraph,
} from '@nutanix-ui/prism-reactjs'

const chevronRightIcon = <ChevronRightIcon color="white" />

;<StackingLayout padding="20px-0px" className="ntnx-navigation-example">
  <StackingLayout padding="0px-20px">
    <Title appearance={Title.TitleAppearance.NAVIGATION} size="h3">
      July 3, 2017, 3:45:05 pm
    </Title>
    <FlexLayout>
      <Badge
        appearance={Badge.BadgeAppearance.NAVIGATION}
        color="red"
        text="1"
      />
      <Badge
        appearance={Badge.BadgeAppearance.NAVIGATION}
        color="gray"
        text="0"
      />
      <Badge
        appearance={Badge.BadgeAppearance.NAVIGATION}
        color="yellow"
        text="21"
      />
    </FlexLayout>
  </StackingLayout>
  <Divider appearance={Divider.DividerAppearance.NAVIGATION} />
  <FlexLayout
    padding="0px-20px"
    alignItems="center"
    justifyContent="space-between"
  >
    <Badge
      color="red"
      text={
        <Paragraph appearance={Paragraph.APPEARANCE.NAVIGATION}>
          Some glorious alert is found at this moment, sad and terrifying.
        </Paragraph>
      }
    />
    {chevronRightIcon}
  </FlexLayout>
  <Divider appearance={Divider.DividerAppearance.NAVIGATION} />
</StackingLayout>
```

#### Navigation appearance — short variant

```tsx
import { Divider, StackingLayout, Title } from '@nutanix-ui/prism-reactjs'
;<StackingLayout className="ntnx-navigation-example">
  <Title size="h3" appearance={Title.TitleAppearance.NAVIGATION}>
    Section A
  </Title>
  <Divider appearance={Divider.DividerAppearance.NAVIGATION} type="short" />
  <Title size="h3" appearance={Title.TitleAppearance.NAVIGATION}>
    Section B
  </Title>
  <Divider appearance={Divider.DividerAppearance.NAVIGATION} type="short" />
</StackingLayout>
```

#### Secondary appearance (side panel / detail view)

Use `SECONDARY` inside panels with a secondary background (e.g. `var(--background-secondary)`).

```tsx
import { Divider, StackingLayout, Accordion } from '@nutanix-ui/prism-reactjs'
;<StackingLayout padding="20px">
  <Accordion title="Bio" expandedByDefault={true}>
    {/* ... content ... */}
  </Accordion>
  <Divider appearance={Divider.DividerAppearance.SECONDARY} />
  <Accordion title="Stats" expandedByDefault={false} />
  <Divider appearance={Divider.DividerAppearance.SECONDARY} />
  <Accordion title="Achievements" expandedByDefault={false} />
</StackingLayout>
```

### Migration: RowDivider → Divider

`RowDivider` (prism-reactjs v1) was renamed to `Divider` in v2. The `isDeprecated` prop was removed; `type` was added.

```tsx
// v1
import { RowDivider } from 'prism-reactjs'
;<RowDivider isDeprecated={false} />

// v2
import { Divider } from '@nutanix-ui/prism-reactjs'
;<Divider />
```

### Usage Notes

- Prefer `Divider.DividerAppearance.<VALUE>` over raw strings for `appearance`.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for spacing around the divider.
- `theme` is deprecated; migrate to `appearance`.
- `SECONDARY` appearance is designed for panels using `var(--background-secondary)`.
- `NAVIGATION` appearance is designed for dark navigation/alert drawers.

<!-- SOURCE-API-END -->
