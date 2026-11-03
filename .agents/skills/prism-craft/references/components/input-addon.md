# InputAddon

## Figma

- **Library name:** Unit Input (page: N/A, frame: Unit Input)

## React

Import: `import { InputAddon } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import { InputAddon } from '@nutanix-ui/prism-reactjs'
```

> **Internal component.** `InputAddon` is a private helper intended for use
> inside Prism library components (e.g. `Input`, `TextInput`). Do not use it
> directly in application code unless you are building a library component.

### Enums / Constants

#### `ErrorType`

Import path: `@nutanix-ui/prism-reactjs` (re-exported from the `InputAddon` module)

| Key        | Value        |
| ---------- | ------------ |
| `WARNING`  | `'warning'`  |
| `CRITICAL` | `'critical'` |

#### `InputAddonType`

Import path: `@nutanix-ui/prism-reactjs` (re-exported from the `InputAddon` module)

| Key            | Value           | Notes                                                        |
| -------------- | --------------- | ------------------------------------------------------------ |
| `PREFIX`       | `'prefix'`      | Renders inline inside the input field on the left            |
| `SUFFIX`       | `'suffix'`      | Renders inline inside the input field on the right (default) |
| `ADDON_BEFORE` | `'addonBefore'` | Renders as a separate block attached before the input        |
| `ADDON_AFTER`  | `'addonAfter'`  | Renders as a separate block attached after the input         |

#### `BackgroundType` (for the `background` prop)

Defined in `@nutanix-ui/prism-reactjs` utility internals.

| Value    | Notes              |
| -------- | ------------------ |
| `'base'` | Base-level surface |
| `'alt'`  | Alternate surface  |
| `'body'` | Body-level surface |

### Props Interface

#### `InputAddonProps`

Extends: `FlexLayoutProps` — all `FlexLayout` props are valid and forwarded.

| Prop         | Type                                               | Default                          | Required | Description                                                                                                                                                                                                   |
| ------------ | -------------------------------------------------- | -------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `className`  | `string`                                           | —                                | No       | Additional CSS class name appended to the root element.                                                                                                                                                       |
| `type`       | `InputAddonType`                                   | `InputAddonType.SUFFIX`          | No       | The addon variant. Controls positioning, border radius, and background logic.                                                                                                                                 |
| `appearance` | `'inline' \| 'normal' \| 'borderless' \| 'nested'` | `'normal'`                       | No       | Visual style of the surrounding input. Must match the `appearance` used on the paired `TextInput`. `'borderless'` is **deprecated** — replace with a bordered type in existing code.                          |
| `background` | `BackgroundType` (`'base' \| 'alt' \| 'body'`)     | Derived from `BackgroundContext` | No       | Surface background. For `addonBefore`/`addonAfter` types, background is automatically derived from `BackgroundContext` when not explicitly set; avoid passing this prop directly and rely on context instead. |
| `error`      | `boolean`                                          | `false`                          | No       | Applies the error visual style.                                                                                                                                                                               |
| `errorType`  | `ErrorType` (`'warning' \| 'critical'`)            | `ErrorType.CRITICAL`             | No       | Controls which error style is applied. Only meaningful when `error={true}`.                                                                                                                                   |
| `disabled`   | `boolean`                                          | `false`                          | No       | Applies disabled visual style.                                                                                                                                                                                |
| `readOnly`   | `boolean`                                          | `false`                          | No       | Applies read-only visual style.                                                                                                                                                                               |

### Static Members

| Member                      | Value            | Notes                                                     |
| --------------------------- | ---------------- | --------------------------------------------------------- |
| `InputAddon.InputAddonType` | `InputAddonType` | Preferred enum accessor.                                  |
| `InputAddon.TYPE`           | `InputAddonType` | **Deprecated** — use `InputAddon.InputAddonType` instead. |

### Behaviour Notes

- `InputAddon` renders as a `FlexLayout` with `alignItems="center"` and
  `display="inline-flex"`. All extra props are forwarded to `FlexLayout`.
- State is communicated to CSS via `data-*` attributes on the root element:
  `data-type`, `data-border-type` (appearance), `data-error`, `data-error-type`,
  `data-disabled`, `data-read-only`, `data-background`.
- For `addonBefore` / `addonAfter` types, the component reads
  `BackgroundContext` and automatically picks a contrasting background unless
  `background` is explicitly supplied:
  - `appearance="borderless"` → `background="base"`
  - `appearance="nested"` → `background="body"`
  - Otherwise → contrasting background derived from the nearest
    `BackgroundContext` ancestor.
- For `prefix` / `suffix` types, `background` has no effect (resolved to
  `undefined`).

### Source Examples

These are adapted from the Prism source examples. Some older examples use
inline `style` or `<div>` wrappers; when generating app code, translate layout
and spacing to Prism layout props where possible.

#### Default — `appearance="normal"`, `type="suffix"`

```tsx
import { FlexLayout, InputAddon } from '@nutanix-ui/prism-reactjs'
;<FlexLayout>
  <InputAddon />
  <InputAddon error={true} />
  <InputAddon readOnly={true} />
  <InputAddon disabled={true} />
</FlexLayout>
```

#### `type="prefix"`

```tsx
import { FlexLayout, InputAddon } from '@nutanix-ui/prism-reactjs'
;<FlexLayout>
  <InputAddon type={InputAddon.InputAddonType.PREFIX} />
  <InputAddon type={InputAddon.InputAddonType.PREFIX} error={true} />
  <InputAddon type={InputAddon.InputAddonType.PREFIX} readOnly={true} />
  <InputAddon type={InputAddon.InputAddonType.PREFIX} disabled={true} />
</FlexLayout>
```

#### `type="addonBefore"` and `type="addonAfter"` standalone

Addon types render with a distinct block style and automatically receive a
contrasting background from context.

```tsx
import { FlexLayout, InputAddon } from '@nutanix-ui/prism-reactjs'
;<FlexLayout>
  <InputAddon type={InputAddon.InputAddonType.ADDON_BEFORE} />
  <InputAddon type={InputAddon.InputAddonType.ADDON_AFTER} />
</FlexLayout>
```

#### `addonBefore` + `addonAfter` with `TextInput` (quantity input pattern)

```tsx
import {
  FlexLayout,
  InputAddon,
  MinusIcon,
  PlusIcon,
  TextInput,
} from '@nutanix-ui/prism-reactjs'
;<FlexLayout itemSpacing="0px">
  <InputAddon type={InputAddon.InputAddonType.ADDON_BEFORE}>
    <MinusIcon />
  </InputAddon>
  <TextInput
    name="text-input-with-addon"
    addonBefore={true}
    addonAfter={true}
    aria-label="Quantity"
  />
  <InputAddon type={InputAddon.InputAddonType.ADDON_AFTER}>
    <PlusIcon />
  </InputAddon>
</FlexLayout>
```

#### `appearance="nested"` (for inputs inside table cells or other components)

```tsx
import { FlexLayout, InputAddon } from '@nutanix-ui/prism-reactjs'
;<FlexLayout>
  <InputAddon appearance="nested" />
  <InputAddon appearance="nested" error={true} />
  <InputAddon appearance="nested" readOnly={true} />
  <InputAddon appearance="nested" disabled={true} />
</FlexLayout>
```

#### `appearance="borderless"` (deprecated)

> **Deprecated.** Replace with a bordered appearance in new code.

```tsx
import { FlexLayout, InputAddon } from '@nutanix-ui/prism-reactjs'
;<FlexLayout>
  <InputAddon appearance="borderless" />
  <InputAddon appearance="borderless" error={true} />
  <InputAddon appearance="borderless" readOnly={true} />
  <InputAddon appearance="borderless" disabled={true} />
</FlexLayout>
```

#### Explicit `background` prop (avoid — prefer `BackgroundContext`)

> **Avoid** passing `background` directly. Use a `FlexLayout` ancestor with a
> `background` prop or a `BackgroundContext` provider instead so the entire
> subtree receives consistent theming.

```tsx
import { FlexLayout, InputAddon } from '@nutanix-ui/prism-reactjs'

{
  /* On a base-background surface */
}
;<FlexLayout background="alt">
  <InputAddon type={InputAddon.InputAddonType.ADDON_BEFORE} />
</FlexLayout>
```

### Usage Notes

- Prefer static enum accessors (`InputAddon.InputAddonType.SUFFIX`) over raw
  strings when referencing `type` values.
- Always pass the same `appearance` value to `InputAddon` and its sibling
  `TextInput` so state-driven styles stay in sync.
- For `addonBefore`/`addonAfter` layouts, set `itemSpacing="0px"` on the
  wrapping `FlexLayout` to keep the addon and input visually joined.
- Keep labels, help text, and validation visible and persistent for form
  controls; use `FormItem*` wrappers where available.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`)
  instead of custom CSS for layout and spacing.

<!-- SOURCE-API-END -->
