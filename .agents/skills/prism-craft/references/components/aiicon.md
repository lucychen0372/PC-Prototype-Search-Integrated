# AIIcon

## Figma

- **Library name:** Domain Switcher ✅ (page: N/A, frame: Domain Switcher ✅)
- **Figma spec:** [24.12 design](https://www.figma.com/design/KVbKkR0QAFRbTVpwysQLWw/branch/qU6J6pqUnAZ6cmB87C620g/Spec-Doc?node-id=21620-174159&p=f&m=dev)

## React

Import: `import { AIIcon } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import { AIIcon } from '@nutanix-ui/prism-reactjs'
```

`AIIcon` is the default export from `components/v2/Icons/AIIcon.tsx` and is re-exported as a named export from the package root (`index.ts`, line 155). The `AIIconProps` interface is a named export from the source file but is **not** re-exported from the package index.

### Props Interfaces

#### `AIIconProps`

Extends: `Omit<StandardIconWrapperProps, 'size'>`

`StandardIconWrapperProps` itself extends `Omit<React.SVGProps<SVGSVGElement>, 'ref'>`, so all standard SVG element props are accepted in addition to the props listed below.

| Prop          | Type                           | Default       | Required | Description                                                                                                                                                                                                                                                                          |
| ------------- | ------------------------------ | ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `color`       | `string`                       | `'inherit'`   | No       | Fill color applied uniformly to all three sparkle `<path>` elements via their `fill` attribute. Accepts any CSS color value (named color, hex, `rgb()`, etc.) or a CSS class name paired attr selector. When unset or set to `'inherit'`, each path inherits the current font color. |
| `className`   | `string`                       | —             | No       | Additional CSS class name(s) appended to the root `<svg>` element alongside the always-present internal classes (`ai-icon`, theme-prefixed `standard-icon`, `size-medium`).                                                                                                          |
| `viewBox`     | `string`                       | `'0 0 12 12'` | No       | SVG `viewBox` attribute forwarded to the root `<svg>`. Override only when a non-standard viewport is required.                                                                                                                                                                       |
| `data-test`   | `string`                       | —             | No       | Test selector attribute forwarded to the root `<svg>`.                                                                                                                                                                                                                               |
| `innerRef`    | `React.Ref<any>`               | —             | No       | Ref forwarded to the root `<svg>` element.                                                                                                                                                                                                                                           |
| `aria-hidden` | `boolean \| 'true' \| 'false'` | `true`        | No       | Hides the icon from assistive technology without visually hiding it. Set to `false` (or `'false'`) when the icon conveys meaning not available from surrounding context.                                                                                                             |

> **Note:** `size` is omitted from `AIIconProps` — consumers cannot set it. `StandardIconWrapper` internally defaults `size` to `'medium'`, so the CSS class `size-medium` is always applied to the root `<svg>`. To resize the icon use CSS (`width`/`height`) or a wrapping element.

All remaining `React.SVGProps<SVGSVGElement>` attributes (e.g. `onClick`, `style`, `id`, `aria-label`) are forwarded to the root `<svg>`.

### Rendered output

The component renders a `StandardIconWrapper` (`<svg role="img" xmlns="http://www.w3.org/2000/svg" ...>`) containing three `<path>` elements that form a three-star AI sparkle glyph occupying a 12 × 12 viewport. Each path receives its `fill` directly from the `color` prop.

CSS classes always present on the root `<svg>` (in the order classnames applies them):

- Any `className` passed by the consumer
- `{themePrefix} {themePrefix}-icon standard-icon` — theme-prefixed classes from `ThemeManager` (e.g. `ntnx ntnx-icon standard-icon`)
- `size-medium` — fixed; `size` prop is not exposed on `AIIcon`
- `ai-icon` — always added internally by `AIIcon`

The root `<svg>` also receives `role="img"` from `StandardIconWrapper`.

### Usage Notes

- `aria-hidden` defaults to `true`. When the icon is the sole indicator of meaning, set `aria-hidden={false}` and provide an `aria-label` or surrounding accessible text.
- `color` is forwarded as the `fill` attribute on each individual `<path>`, not as a CSS `color` property on the `<svg>`. Omitting `color` (or setting it to `'inherit'`) lets each path inherit the text color of its parent, which is the recommended default for adaptive theming.
- The icon always renders at `viewBox="0 0 12 12"`. Visual size is controlled entirely by CSS; the `size-medium` class applied by `StandardIconWrapper` provides default dimensions.
- No static enum constants are exposed on `AIIcon` itself; there are no variant or size enumerations to import.

### Examples

#### Minimal (default)

```tsx
import { AIIcon } from '@nutanix-ui/prism-reactjs'
;<AIIcon />
```

#### Custom color

```tsx
import { AIIcon } from '@nutanix-ui/prism-reactjs'
;<AIIcon color="#6B48FF" />
```

#### Decorative icon alongside text (accessible)

```tsx
import { AIIcon } from '@nutanix-ui/prism-reactjs'
;<span>
  <AIIcon aria-hidden={true} />
  AI-generated summary
</span>
```

#### Standalone meaningful icon

```tsx
import { AIIcon } from '@nutanix-ui/prism-reactjs'
;<AIIcon aria-hidden={false} aria-label="AI feature" />
```

#### With a test selector and custom class

```tsx
import { AIIcon } from '@nutanix-ui/prism-reactjs'
;<AIIcon className="my-ai-icon" data-test="ai-icon" />
```

#### Resized via CSS (size prop is not available)

```tsx
import { AIIcon } from '@nutanix-ui/prism-reactjs'

{
  /* Use style or a CSS class — the size prop is stripped from AIIconProps */
}
;<AIIcon style={{ width: 24, height: 24 }} />
```

<!-- SOURCE-API-END -->
