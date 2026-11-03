# NavigationIcon

## Figma

- **Library name:** Navigation (page: N/A, frame: Navigation)

## React

Import: `import { NavigationIcon } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import { NavigationIcon } from '@nutanix-ui/prism-reactjs'
```

### Props Interfaces

#### `NavigationIconProps`

Extends: `StandardIconWrapperProps` (which itself extends `Omit<React.SVGProps<SVGSVGElement>, 'ref'>`)

| Prop          | Type                           | Default       | Required | Description                                                                                                                                                          |
| ------------- | ------------------------------ | ------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `color`       | `string`                       | `'inherit'`   | No       | Color of the icon. Accepts any CSS color name, hex code, RGB value, or CSS class name paired attr selector. When unset the icon inherits the surrounding text color. |
| `className`   | `string`                       | —             | No       | Additional CSS class name(s) applied to the root `<svg>` element.                                                                                                    |
| `size`        | `IconSize`                     | `'medium'`    | No       | Controls the icon size via a CSS size class. One of `'small'`, `'medium'`, `'large'`, `'none'`. `'none'` omits the size class entirely.                              |
| `viewBox`     | `string`                       | `'0 0 12 12'` | No       | SVG `viewBox` attribute. Override only when a non-standard coordinate space is required.                                                                             |
| `aria-hidden` | `boolean \| 'true' \| 'false'` | `true`        | No       | Hides the icon from assistive technology without visually hiding it. Set to `false` when the icon conveys meaning that screen readers should announce.               |
| `innerRef`    | `React.Ref<any>`               | —             | No       | Ref forwarded to the inner `<svg>` DOM element.                                                                                                                      |
| `data-test`   | `string`                       | —             | No       | Test selector attribute passed through to the `<svg>` element.                                                                                                       |

All remaining `React.SVGProps<SVGSVGElement>` attributes (e.g. `onClick`, `style`, `title`, `aria-label`) are forwarded to the underlying `<svg>` element.

#### `IconSize` type

```tsx
type IconSize = 'small' | 'medium' | 'large' | 'none'
```

### Minimal Example

```tsx
import { NavigationIcon } from '@nutanix-ui/prism-reactjs'
;<NavigationIcon />
```

### Variant Examples

**Custom color:**

```tsx
import { NavigationIcon } from '@nutanix-ui/prism-reactjs'
;<NavigationIcon color="#5B8FF9" />
```

**Small size:**

```tsx
import { NavigationIcon } from '@nutanix-ui/prism-reactjs'
;<NavigationIcon size="small" />
```

**Large size:**

```tsx
import { NavigationIcon } from '@nutanix-ui/prism-reactjs'
;<NavigationIcon size="large" />
```

**No size class (custom sizing via CSS):**

```tsx
import { NavigationIcon } from '@nutanix-ui/prism-reactjs'
;<NavigationIcon size="none" className="my-custom-size" />
```

**Accessible icon with label:**

```tsx
import { NavigationIcon } from '@nutanix-ui/prism-reactjs'
;<NavigationIcon aria-hidden={false} aria-label="Navigation menu" />
```

**With ref and data-test:**

```tsx
import React, { useRef } from 'react'
import { NavigationIcon } from '@nutanix-ui/prism-reactjs'

const ref = useRef<SVGSVGElement>(null)

;<NavigationIcon innerRef={ref} data-test="nav-icon" />
```

### Behaviour Notes

- Renders a 12 × 12 SVG (default `viewBox="0 0 12 12"`) depicting a three-line hamburger / navigation menu icon.
- The `color` prop maps directly to the SVG `fill` attribute of the icon path. The default value `'inherit'` means the icon adopts the CSS `color` of its parent element.
- Size classes (`size-small`, `size-medium`, `size-large`) are defined in the shared `IconWrapper.less` stylesheet and map to fixed pixel dimensions.
- The component is wrapped in `React.memo` (via `StandardIconWrapper`) so it will not re-render unless props change.
- By default `aria-hidden={true}` suppresses the icon from the accessibility tree. When using the icon as the sole accessible label for an interactive element, set `aria-hidden={false}` and provide a descriptive `aria-label`.
- The root element always receives the CSS class `navigation-icon` in addition to any `className` passed by the consumer.

### Usage Notes

- Prefer documented enum/static values such as `NavigationIcon.<EnumName>.<VALUE>` over raw strings when the component exposes them.
- Keep labels, help text, and validation visible and persistent for form controls; use `FormItem*` wrappers where available.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.

<!-- SOURCE-API-END -->
