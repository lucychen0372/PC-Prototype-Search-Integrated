# Favorite

## Figma

- **Library name:** Favorite (page: N/A, frame: Favorite)
- **Spec Doc:** [Figma 24.1](https://www.figma.com/design/KVbKkR0QAFRbTVpwysQLWw/branch/SHoco2a3udD1Utqf7rq1sn/Spec-Doc?node-id=21620-174159)

## React

Import: `import { Favorite } from '@nutanix-ui/prism-reactjs'`

> **Note:** `FavoriteAppearance` and `FavoriteProps` are **not** re-exported from `@nutanix-ui/prism-reactjs`. Access the enum via the static member `Favorite.FavoriteAppearance` (or `Favorite.APPEARANCE`), and type the props interface directly if needed by importing from the component path.

### TSX Examples

#### Minimal working example (uncontrolled)

```tsx
import { Favorite } from '@nutanix-ui/prism-reactjs'
;<Favorite />
```

#### Controlled toggle

```tsx
import { Favorite } from '@nutanix-ui/prism-reactjs'

const [checked, setChecked] = React.useState(false)

;<Favorite
  checked={checked}
  onClick={(newChecked) => setChecked(newChecked)}
  label={checked ? 'Remove from favorites' : 'Add to favorites'}
/>
```

#### Checked state

```tsx
import { Favorite } from '@nutanix-ui/prism-reactjs'
;<Favorite checked={true} />
```

#### Navigation appearance

```tsx
import { Favorite, FlexLayout } from '@nutanix-ui/prism-reactjs'
;<FlexLayout
  alignItems="center"
  flexWrap="wrap"
  className="ntnx-navigation-example"
>
  <Favorite appearance={Favorite.FavoriteAppearance.NAVIGATION} />
  <Favorite
    appearance={Favorite.FavoriteAppearance.NAVIGATION}
    checked={true}
  />
</FlexLayout>
```

#### Disabled and aria-disabled

```tsx
import { Favorite, FlexLayout } from '@nutanix-ui/prism-reactjs'
;<FlexLayout alignItems="stretch" flexDirection="column" flexWrap="wrap">
  {/* disabled — cannot receive focus */}
  <FlexLayout alignItems="center" flexWrap="wrap">
    <Favorite disabled={true} checked={false} />
    <Favorite disabled={true} checked={true} />
  </FlexLayout>
  {/* aria-disabled — can still receive focus */}
  <FlexLayout alignItems="center" flexWrap="wrap">
    <Favorite aria-disabled={true} checked={false} />
    <Favorite aria-disabled={true} checked={true} />
  </FlexLayout>
</FlexLayout>
```

#### Disabled with navigation appearance

```tsx
import { Favorite, FlexLayout } from '@nutanix-ui/prism-reactjs'
;<FlexLayout
  alignItems="center"
  flexWrap="wrap"
  className="ntnx-navigation-example"
>
  <Favorite
    disabled={true}
    checked={true}
    appearance={Favorite.FavoriteAppearance.NAVIGATION}
  />
  <Favorite
    disabled={true}
    checked={false}
    appearance={Favorite.FavoriteAppearance.NAVIGATION}
  />
  <Favorite
    aria-disabled={true}
    checked={true}
    appearance={Favorite.FavoriteAppearance.NAVIGATION}
  />
  <Favorite
    aria-disabled={true}
    checked={false}
    appearance={Favorite.FavoriteAppearance.NAVIGATION}
  />
</FlexLayout>
```

### Anti-patterns

- Don't use `StarIcon` / `EmptyStarIcon` with custom click handlers — use `Favorite`.
- Always provide a meaningful `label` prop for accessibility (default is `"Favorite"`).
- Do **not** pass `aria-label` directly on `<Favorite>` — use the `label` prop; it maps to `aria-label` on the underlying `<input>`.
- Do **not** use `onChange` or `selected` — the correct props are `onClick` and `checked`.

<!-- SOURCE-API-START -->

### Import

```tsx
import { Favorite } from '@nutanix-ui/prism-reactjs'
```

### Enums / Constants

#### `FavoriteAppearance`

Not exported from the package root. Access via static members on `Favorite`.

| Key          | Value          |
| ------------ | -------------- |
| `DEFAULT`    | `'default'`    |
| `NAVIGATION` | `'navigation'` |

### Props Interfaces

#### `FavoriteProps`

Extends: `Omit<StarIconProps, 'onClick'>` → `StarIconProps` extends `StandardIconWrapperProps` which extends `Omit<React.SVGProps<SVGSVGElement>, 'ref'>`.

All own props are optional.

| Prop            | Type                                                                 | Default             | Description                                                                                                                                         |
| --------------- | -------------------------------------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `appearance`    | `FavoriteAppearance`                                                 | —                   | Visual appearance. Use `Favorite.FavoriteAppearance.DEFAULT` or `Favorite.FavoriteAppearance.NAVIGATION`.                                           |
| `checked`       | `boolean`                                                            | `false`             | Whether the favorite is currently selected (filled star).                                                                                           |
| `onClick`       | `(checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void` | —                   | Called when the component is clicked. First argument is the **new** value (inverse of `props.checked`).                                             |
| `label`         | `string`                                                             | `'Favorite'` (i18n) | `aria-label` for the underlying `<input>`. Required for accessibility.                                                                              |
| `id`            | `string`                                                             | auto-generated      | ID for the underlying `<input>`. Auto-generated via `uniqueId('favorite-')` if not provided.                                                        |
| `tabIndex`      | `number`                                                             | `0`                 | Tab index of the underlying `<input>`.                                                                                                              |
| `className`     | `string`                                                             | —                   | Additional CSS class applied to the icon element.                                                                                                   |
| `inputProps`    | `Record<any, any>`                                                   | —                   | Extra props spread onto the underlying `<input>` element. `disabled` and `aria-disabled` inside `inputProps` are also respected by the click guard. |
| `disabled`      | `boolean`                                                            | —                   | Disables the favorite. Prevents focus.                                                                                                              |
| `aria-disabled` | `boolean`                                                            | —                   | Marks as disabled while still allowing focus (useful for tooltips on disabled state).                                                               |
| `background`    | `'white' \| 'dark'`                                                  | `'white'`           | **Deprecated.** Use `appearance` instead.                                                                                                           |
| `data-test`     | `string`                                                             | —                   | Test hook attribute placed on the outer `<div>` wrapper (inherited from `StandardIconWrapperProps`).                                                |
| `color`         | `string`                                                             | `'inherit'`         | Icon fill color. Inherited from `StarIconProps → StandardIconWrapperProps`. Any CSS color value.                                                    |
| `size`          | `'small' \| 'medium' \| 'large' \| 'none'`                           | `'medium'`          | Icon size. Inherited from `StandardIconWrapperProps`.                                                                                               |

All other `SVGProps` not listed here are also accepted and forwarded to the underlying SVG (minus `ref`).

### Static Members

| Member                        | Value                             |
| ----------------------------- | --------------------------------- |
| `Favorite.FavoriteAppearance` | `FavoriteAppearance` enum         |
| `Favorite.APPEARANCE`         | `FavoriteAppearance` enum (alias) |

### DOM Structure

```
<div class="favorite-container [themePrefix]" data-test="..." data-disabled="...">
  <input type="checkbox" id="favorite-{n}" aria-label="..." tabIndex={0} ... />
  <label htmlFor="favorite-{n}" data-appearance="...">
    <StarIcon | EmptyStarIcon aria-hidden role="presentation" className="..." />
  </label>
</div>
```

- The outer `<div>` receives `data-test` and `data-disabled`.
- The `<label>` and icon receive `data-appearance`.
- `StarIcon` is rendered when `checked={true}`; `EmptyStarIcon` when `checked={false}`.

### Behaviour

- Click calls `onClick(!checked, event)` — the **new** checked state is passed, not the old.
- Clicks are suppressed (no `onClick` call) when any of the following are truthy: `disabled`, `aria-disabled`, `inputProps.disabled`, `inputProps['aria-disabled']`.
- `aria-disabled` differs from `disabled`: with `aria-disabled`, the `<input>` can still receive keyboard focus (useful for tooltips).
- Enter/Space on the focused input triggers the change (via `onKeyDown` + `handleFocusAction`).
- `id` is auto-generated with `uniqueId('favorite-')` if not supplied, keeping `<input>`/`<label>` linkage stable.

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Accessibility Guidelines

```tsx
import { Paragraph, StackingLayout } from '@nutanix-ui/prism-reactjs'
;<StackingLayout style={{ maxWidth: 800 }}>
  <Paragraph>
    The Favorite component should always have a clear label (the default is
    "Favorite"). This label is used by screen readers to announce the purpose of
    the control.
  </Paragraph>
</StackingLayout>
```

#### Handling onClick()

```tsx
import React from 'react'
import { Favorite } from '@nutanix-ui/prism-reactjs'

class FavoriteExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = { checked: false }
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  render() {
    return (
      <Favorite
        checked={this.state.checked}
        onClick={this.handleOnClick}
        data-test="toggle-test"
      />
    )
  }

  handleOnClick(checked, event) {
    this.setState({ checked })
  }
}

;<FavoriteExample />
```

#### Checked. Hover and click to see the style changes.

```tsx
import { Favorite } from '@nutanix-ui/prism-reactjs'
;<Favorite checked={true} />
```

#### Navigation background. Hover and click to see the style changes.

```tsx
import { FlexLayout, Favorite } from '@nutanix-ui/prism-reactjs'
;<FlexLayout
  alignItems="center"
  flexWrap="wrap"
  className="ntnx-navigation-example"
>
  <Favorite
    data-test="nav-style"
    appearance={Favorite.FavoriteAppearance.NAVIGATION}
  />
  <Favorite
    data-test="nav-style-checked"
    appearance={Favorite.FavoriteAppearance.NAVIGATION}
    checked={true}
  />
</FlexLayout>
```

#### Disabled and Aria-Disabled Favorites

```tsx
import React from 'react'
import { Favorite, FlexLayout } from '@nutanix-ui/prism-reactjs'

const FavoriteDisabledExample = () => (
  <FlexLayout alignItems="stretch" flexDirection="column" flexWrap="wrap">
    <FlexLayout alignItems="center" flexWrap="wrap">
      <Favorite
        disabled={true}
        checked={false}
        data-test="disabled-favorite-regular-unchecked"
      />
      <Favorite
        disabled={true}
        checked={true}
        data-test="disabled-favorite-regular-checked"
      />
    </FlexLayout>
    <FlexLayout alignItems="center" flexWrap="wrap">
      <Favorite
        aria-disabled={true}
        checked={false}
        data-test="aria-disabled-favorite-regular-unchecked"
      />
      <Favorite
        aria-disabled={true}
        checked={true}
        data-test="aria-disabled-favorite-regular-checked"
      />
    </FlexLayout>
  </FlexLayout>
)

;<FavoriteDisabledExample />
```

#### Disabled and Aria-Disabled Favorites with Navigation Appearance

```tsx
import React from 'react'
import { Favorite, FlexLayout } from '@nutanix-ui/prism-reactjs'

const FavoriteNavDisabledExample = () => (
  <FlexLayout alignItems="stretch" flexDirection="column" flexWrap="wrap">
    <FlexLayout
      alignItems="center"
      flexWrap="wrap"
      className="ntnx-navigation-example"
    >
      <Favorite
        disabled={true}
        checked={true}
        appearance={Favorite.FavoriteAppearance.NAVIGATION}
        data-test="disabled-favorite-navigation-unchecked"
      />
      <Favorite
        disabled={true}
        checked={false}
        appearance={Favorite.FavoriteAppearance.NAVIGATION}
        data-test="disabled-favorite-navigation-checked"
      />
      <Favorite
        aria-disabled={true}
        checked={true}
        appearance={Favorite.FavoriteAppearance.NAVIGATION}
        data-test="aria-disabled-favorite-navigation-unchecked"
      />
      <Favorite
        aria-disabled={true}
        checked={false}
        appearance={Favorite.FavoriteAppearance.NAVIGATION}
        data-test="aria-disabled-favorite-navigation-checked"
      />
    </FlexLayout>
  </FlexLayout>
)

;<FavoriteNavDisabledExample />
```

### Usage Notes

- Prefer documented enum/static values such as `Favorite.FavoriteAppearance.NAVIGATION` over raw strings.
- Use `label` (not `aria-label`) for accessibility text — it maps to `aria-label` on the inner `<input>`.
- Use `disabled` to block interaction and focus entirely; use `aria-disabled` when you still need focus (e.g., to show a tooltip explaining why the item is not favoritable).
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.
- The `background` prop is deprecated — migrate to `appearance`.

<!-- SOURCE-API-END -->
