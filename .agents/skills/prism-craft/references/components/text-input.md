# TextInput

## Figma

- **Library name:** Nested Input (page: N/A, frame: Nested Input)

## React

Import: `import { TextInput } from '@nutanix-ui/prism-reactjs'`

> **Note:** `TextInput` is a low-level primitive. In product UI, prefer [`Input`](#!/Input) (which adds label, help text, and clear button) or [`FormItemInput`](#!/FormItemInput) (which integrates with form validation). Use `TextInput` directly only when building a custom wrapper component.

<!-- SOURCE-API-START -->

### Import

```tsx
import { TextInput } from '@nutanix-ui/prism-reactjs'
```

A secondary ref-forwarding variant is also exported directly from the component file (not re-exported from the package index):

```tsx
import { TextInputWithRef } from '@nutanix-ui/prism-reactjs/services/src/components/v2/Input/TextInput'
// TextInputWithRef forwards its ref to the underlying <input> via inputRef internally.
```

### Enums / Constants

#### `ErrorType`

Import path (re-exported via component): `import { ErrorType } from '@nutanix-ui/prism-reactjs/…/TextInput'`

| Constant             | Value        |
| -------------------- | ------------ |
| `ErrorType.WARNING`  | `'warning'`  |
| `ErrorType.CRITICAL` | `'critical'` |

#### `BackgroundType` (from BackgroundContext)

Used by the `background` prop. Valid string literals:

| Value    | Description                     |
| -------- | ------------------------------- |
| `'base'` | Base (light) background         |
| `'alt'`  | Alternative (medium) background |
| `'body'` | Body (page-level) background    |

### Props Interfaces

#### `TextInputProps`

Extends: `Omit<React.HTMLProps<HTMLInputElement>, 'prefix' | 'ref' | 'onPointerEnterCapture' | 'onPointerLeaveCapture'>`

All native `<input>` attributes (e.g. `value`, `defaultValue`, `onChange`, `placeholder`, `readOnly`, `name`, `type`, `onKeyDown`, `aria-*`) are valid and are spread onto the underlying `<input>` element.

| Prop                    | Type                                                     | Default              | Required | Description                                                                                                                                                             |
| ----------------------- | -------------------------------------------------------- | -------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `className`             | `string`                                                 | —                    | No       | Custom class name appended to the root `<input>`.                                                                                                                       |
| `inputRef`              | `React.Ref<HTMLInputElement>`                            | —                    | No       | Ref forwarded to the underlying `<input>` DOM node. Accepts a callback ref or a `React.createRef()` object.                                                             |
| `disabled`              | `boolean`                                                | `false`              | No       | Disables the input when `true`.                                                                                                                                         |
| `appearance`            | `'inline' \| 'normal' \| 'borderless' \| 'nested'`       | `'normal'`           | No       | Visual style variant. See details below.                                                                                                                                |
| `background`            | `'base' \| 'alt' \| 'body'`                              | derived from context | No       | Overrides the background context used for colour adaptation. **Avoid setting directly**; prefer wrapping with a layout component that sets `BackgroundContext` instead. |
| `prefix`                | `boolean`                                                | `false`              | No       | Adds left-side spacing/styling to accommodate a prefix add-on element. Pair with [`InputAddOn`](#!/InputAddOn).                                                         |
| `suffix`                | `boolean`                                                | `false`              | No       | Adds right-side spacing/styling to accommodate a suffix add-on element. Pair with [`InputAddOn`](#!/InputAddOn).                                                        |
| `addonBefore`           | `boolean`                                                | `false`              | No       | Adds left-side styling to accommodate a before add-on element. Pair with [`InputAddOn`](#!/InputAddOn).                                                                 |
| `addonAfter`            | `boolean`                                                | `false`              | No       | Adds right-side styling to accommodate an after add-on element. Pair with [`InputAddOn`](#!/InputAddOn).                                                                |
| `error`                 | `boolean`                                                | `false`              | No       | Applies error highlight styling to the input border.                                                                                                                    |
| `errorType`             | `ErrorType`                                              | `ErrorType.CRITICAL` | No       | Controls the error colour: `ErrorType.WARNING` (amber) or `ErrorType.CRITICAL` (red). Only meaningful when `error={true}`.                                              |
| `onPressEnter`          | `(event: React.KeyboardEvent<HTMLInputElement>) => void` | —                    | No       | Called when the **Enter** key is pressed. Fires inside the same `onKeyDown` handler; if you also pass `onKeyDown`, both will fire.                                      |
| `data-test`             | `string`                                                 | —                    | No       | `data-test` attribute placed on the `<input>` element. Note: examples also use the native `data-test-id` attribute, which passes through as a standard HTML attribute.  |
| `onPointerEnterCapture` | `any`                                                    | —                    | No       | Compatibility shim for React 18 (types/react 16 build artefact). Will be removed when Prism upgrades to React 18 types.                                                 |
| `onPointerLeaveCapture` | `any`                                                    | —                    | No       | Compatibility shim — see `onPointerEnterCapture`.                                                                                                                       |

##### `appearance` values

| Value                | Border | Focus ring | Background               | Use case                                                                   |
| -------------------- | ------ | ---------- | ------------------------ | -------------------------------------------------------------------------- |
| `'normal'` (default) | Yes    | Yes        | Contrasting from context | Standard form input                                                        |
| `'inline'`           | No     | No         | None                     | Inline/nested with no chrome                                               |
| `'borderless'`       | No     | Yes        | `'base'` (forced)        | **Deprecated.** Dark-background contexts only                              |
| `'nested'`           | No     | No         | `'body'` (forced)        | Input inside another interactive component (e.g. table cell, multi-select) |

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Minimal / Default

```tsx
import { TextInput } from '@nutanix-ui/prism-reactjs'
;<TextInput
  name="text-input-normal"
  data-test-id="default"
  placeholder="default usage"
/>
```

#### Placeholder (long text truncation)

```tsx
import { TextInput, StackingLayout } from '@nutanix-ui/prism-reactjs'
;<StackingLayout>
  <TextInput
    name="text-input"
    data-test-id="placeholder"
    placeholder="Please Type"
  />
  <TextInput
    name="text-input-long-text"
    data-test-id="placeholder-ellipsis"
    placeholder="This is a very long sentence that aims to show how an ellipsis appears at the end of the text when it exceeds the display or container limits."
  />
</StackingLayout>
```

#### Truncated value (long defaultValue)

```tsx
import { TextInput } from '@nutanix-ui/prism-reactjs'
;<TextInput
  name="text-input"
  data-test-id="truncate-default"
  placeholder="Please Type"
  defaultValue="This is a very long sentence that aims to show how an ellipsis appears at the end of the text when it exceeds the display or container limits."
/>
```

#### Read Only

```tsx
import { StackingLayout, TextInput } from '@nutanix-ui/prism-reactjs'
;<StackingLayout>
  <TextInput
    name="text-input-read-only"
    data-test-id="read-only"
    readOnly={true}
    placeholder="Read Only"
  />
  <TextInput
    name="text-input-read-only-with-long-text"
    data-test-id="read-only-ellipsis"
    readOnly={true}
    placeholder="Read Only"
    value="This is a very long sentence that aims to show how an ellipsis appears at the end of the text when it exceeds the display or container limits."
  />
  <TextInput
    appearance="inline"
    name="text-input-read-only"
    data-test-id="read-only-inline"
    readOnly={true}
    placeholder="Read Only (inline)"
  />
  <TextInput
    appearance="borderless"
    name="text-input-read-only"
    data-test-id="read-only-borderless"
    readOnly={true}
    placeholder="Read Only (borderless)"
  />
  <TextInput
    appearance="nested"
    name="text-input-read-only"
    data-test-id="read-only-nested"
    readOnly={true}
    placeholder="Read Only (nested)"
  />
</StackingLayout>
```

#### Disabled

```tsx
import { StackingLayout, TextInput } from '@nutanix-ui/prism-reactjs'
;<StackingLayout>
  <TextInput
    name="text-input-disabled"
    data-test-id="disabled"
    disabled={true}
    placeholder="Disabled"
  />
  <TextInput
    name="text-input-disabled-long"
    data-test-id="disabled-ellipsis"
    disabled={true}
    placeholder="Disabled"
    value="This is a very long sentence that aims to show how an ellipsis appears at the end of the text when it exceeds the display or container limits."
  />
  <TextInput
    appearance="inline"
    name="text-input-disabled"
    data-test-id="disabled-inline"
    disabled={true}
    placeholder="Disabled (inline)"
  />
  <TextInput
    appearance="borderless"
    name="text-input-disabled"
    data-test-id="disabled-borderless"
    disabled={true}
    placeholder="Disabled (borderless)"
  />
  <TextInput
    appearance="nested"
    name="text-input-disabled"
    data-test-id="disabled-nested"
    disabled={true}
    placeholder="Disabled (nested)"
  />
</StackingLayout>
```

#### Appearance: borderless (dark background)

```tsx
import { StackingLayout, TextInput } from '@nutanix-ui/prism-reactjs'

// Wrap in a dark-background container; borderless forces background='base'
;<StackingLayout className="nsg-example-borderless-content">
  <TextInput
    name="text-input-borderless"
    data-test-id="borderless"
    placeholder="Please Type"
    appearance="borderless"
  />
</StackingLayout>
```

#### Appearance: nested (inside another component)

```tsx
import { TextInput } from '@nutanix-ui/prism-reactjs'

// Use appearance="nested" when embedding inside a table cell, multi-select, etc.
;<TextInput
  name="text-input-nested"
  data-test-id="nested"
  placeholder="Please Type"
  appearance="nested"
/>
```

#### Error styling

```tsx
import { TextInput } from '@nutanix-ui/prism-reactjs'

// Critical error (default)
;<TextInput
  name="text-input-error"
  data-test-id="error"
  placeholder="Please Type"
  error={true}
/>
```

#### Error with warning type

```tsx
import { TextInput, ErrorType } from '@nutanix-ui/prism-reactjs'
;<TextInput
  name="text-input-warning"
  placeholder="Please Type"
  error={true}
  errorType={ErrorType.WARNING}
/>
```

#### Prefix and suffix add-on slots

```tsx
import { TextInput } from '@nutanix-ui/prism-reactjs';

// prefix only
<TextInput name="text-input-prefix" data-test-id="prefix" placeholder="Please Type" prefix={true} />

// suffix only
<TextInput name="text-input-suffix" data-test-id="suffix" placeholder="Please Type" suffix={true} />

// prefix + suffix
<TextInput name="text-input-prefix-suffix" placeholder="Please Type" prefix={true} suffix={true} />

// prefix + suffix + error
<TextInput name="text-input-prefix-suffix-error" placeholder="Please Type" prefix={true} suffix={true} error={true} />
```

#### Ref access via inputRef

```tsx
import React, { useRef } from 'react'
import { TextInput } from '@nutanix-ui/prism-reactjs'

function FocusExample() {
  const ref = useRef<HTMLInputElement>(null)
  return <TextInput name="ref-example" inputRef={ref} placeholder="Focus me" />
}
```

#### onPressEnter callback

```tsx
import { TextInput } from '@nutanix-ui/prism-reactjs'
;<TextInput
  name="text-input-enter"
  placeholder="Press Enter"
  onPressEnter={(event) => console.log('Enter pressed', event)}
/>
```

### Usage Notes

- `TextInput` renders a plain `<input type="text">`. In product forms, prefer `Input` or `FormItemInput` which add label, clear button, and validation integration.
- Prefer `ErrorType.WARNING` / `ErrorType.CRITICAL` constants over raw strings for `errorType`.
- `onPressEnter` and `onKeyDown` can coexist — both fire on every keydown; `onPressEnter` additionally gates on `event.key === 'Enter'`.
- The `background` prop is a manual escape hatch. Prefer letting `BackgroundContext` (set by a parent layout component with a `background` prop) drive the input's background adaptation automatically.
- `appearance="borderless"` is **deprecated**. Use `appearance="nested"` for no-chrome inputs inside other components.
- `prefix`, `suffix`, `addonBefore`, and `addonAfter` are styling flags only — they do not render the add-on elements. Use `InputAddOn` alongside `TextInput` to render the actual add-on content.
- Keep labels, help text, and validation visible and persistent for form controls; use `FormItemInput` wrappers where available.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.

<!-- SOURCE-API-END -->
