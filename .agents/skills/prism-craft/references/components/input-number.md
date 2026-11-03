# InputNumber

## Figma

- **Library name:** Number Input (page: N/A, frame: Number Input)

## React

Import: `import { InputNumber } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import { InputNumber } from '@nutanix-ui/prism-reactjs'
```

### Exported Type Aliases

#### `InputNumberProps`

```ts
type InputNumberProps = _InputNumberProps & InputWithLabelProps
```

`InputWithLabelProps` = `FormItemProvider<InputProps>` — all `FormItemProviderProps` and all `InputProps` (which itself extends `TextInputProps` / `React.HTMLProps<HTMLInputElement>`) are valid on `InputNumber`.

---

### Props Reference

#### Own props (`_InputNumberProps`)

| Prop            | Type                                                                 | Default                   | Required | Description                                                                                                                                                                                           |
| --------------- | -------------------------------------------------------------------- | ------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `className`     | `string`                                                             | —                         | No       | Custom CSS class added to the outer wrapper `<div>`.                                                                                                                                                  |
| `value`         | `string \| number`                                                   | —                         | No       | Controlled value. Must be a valid finite number. When supplied, the component is **controlled** and the app must handle `onValueChange`/`onChange`.                                                   |
| `defaultValue`  | `string \| number`                                                   | —                         | No       | Initial value for **uncontrolled** usage. Must be a valid finite number. No need to wire up change handlers.                                                                                          |
| `id`            | `string`                                                             | auto-generated            | No       | Must be unique on the page. Passed to the inner `<input>` and used by `FormItemProvider` to wire the `<label>` `htmlFor`.                                                                             |
| `min`           | `number`                                                             | `Number.MIN_SAFE_INTEGER` | No       | Minimum allowed value. The decrement (−) button is disabled when the current value reaches this boundary.                                                                                             |
| `max`           | `number`                                                             | `Number.MAX_SAFE_INTEGER` | No       | Maximum allowed value. The increment (+) button is disabled when the current value reaches this boundary.                                                                                             |
| `step`          | `number`                                                             | `1`                       | No       | Amount added/subtracted by the +/− buttons and by `ArrowUp`/`ArrowDown` keys.                                                                                                                         |
| `placeholder`   | `string`                                                             | `'Enter Number'` (i18n)   | No       | Placeholder text shown when the input is empty.                                                                                                                                                       |
| `onChange`      | `(event: React.ChangeEvent<HTMLInputElement>) => void`               | `() => null`              | No       | Standard DOM input `onChange`. Fires only when the user **types** in the field (not when +/− buttons are clicked). Prefer `onValueChange` to capture all changes.                                     |
| `onValueChange` | `(value: string, error: boolean, helpText: React.ReactNode) => void` | —                         | No       | Fired on every value change — typing, +/− button clicks, and keyboard ArrowUp/ArrowDown/Home/End. Provides the new string value, an out-of-range error flag, and an auto-generated help-text message. |
| `helpText`      | `React.ReactNode`                                                    | —                         | No       | Overrides the auto-generated range-error help text. Forwarded to `FormItemProvider`.                                                                                                                  |

#### Inherited from `FormItemProviderProps`

| Prop                    | Type                                                             | Default              | Description                                                                                      |
| ----------------------- | ---------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------ |
| `label`                 | `React.ReactNode`                                                | —                    | Primary label rendered above the input. Clicking focuses the input.                              |
| `secondaryLabel`        | `React.ReactNode`                                                | —                    | Secondary label rendered to the right of the primary label.                                      |
| `error`                 | `boolean`                                                        | `false`              | Puts the input and help text into error styling.                                                 |
| `errorType`             | `ErrorType`                                                      | `ErrorType.CRITICAL` | `'critical'` (red) or `'warning'` (yellow). Import `ErrorType` from `@nutanix-ui/prism-reactjs`. |
| `helpTextProps`         | `FlexItemProps & { isTruncated?: boolean; truncateProps?: ... }` | —                    | Extra props forwarded to the help-text wrapper `FlexItem`.                                       |
| `hideHelpTextIcon`      | `boolean`                                                        | `false`              | Hides the info/warning/error icon that normally precedes help text.                              |
| `formItemProviderProps` | `StackingLayoutProps`                                            | `{}`                 | Extra props forwarded to the `StackingLayout` that wraps label + input + help text.              |
| `statusIconProps`       | `StatusIconProps`                                                | —                    | Renders a `StatusIcon` beside the label (decorative; hidden from screen readers).                |

#### Inherited from `InputProps`

| Prop                    | Type                                                                                     | Default              | Description                                                                                                                                                     |
| ----------------------- | ---------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`              | `boolean`                                                                                | `false`              | Disables the input and both +/− buttons.                                                                                                                        |
| `readOnly`              | `boolean`                                                                                | —                    | Makes the input read-only. +/− buttons are visually disabled and ignored on click.                                                                              |
| `appearance`            | `'normal' \| 'inline' \| 'borderless' \| 'nested'`                                       | `'normal'`           | Visual style of the underlying text input. `'borderless'` replaces the removed `border` prop from v1.                                                           |
| `background`            | `'base' \| 'alt' \| 'body'`                                                              | auto-contrast        | Background context for the input. Prefer `BackgroundContext` over passing this directly.                                                                        |
| `suffix`                | `React.ReactNode`                                                                        | —                    | Element rendered inside the input, after the text, before the + button.                                                                                         |
| `suffixProps`           | `InputAddonProps`                                                                        | —                    | Extra props for the suffix wrapper.                                                                                                                             |
| `prefix`                | `React.ReactNode`                                                                        | —                    | Element rendered inside the input, before the text, after the − button.                                                                                         |
| `prefixProps`           | `InputAddonProps`                                                                        | —                    | Extra props for the prefix wrapper.                                                                                                                             |
| `addonBefore`           | `React.ReactNode`                                                                        | − button (auto)      | Content placed outside the input border, before it. `InputNumber` pre-populates this with the decrement button; override only if needed.                        |
| `addonBeforeProps`      | `InputAddonProps`                                                                        | `{ padding: '0px' }` | Props for the addonBefore wrapper. Set `addonBeforeProps.disabled = true` to independently disable the − button without affecting the input or max value logic. |
| `addonAfter`            | `React.ReactNode`                                                                        | + button (auto)      | Content placed outside the input border, after it. `InputNumber` pre-populates this with the increment button.                                                  |
| `addonAfterProps`       | `InputAddonProps`                                                                        | `{ padding: '0px' }` | Props for the addonAfter wrapper. Set `addonAfterProps.disabled = true` to independently disable the + button.                                                  |
| `builtInSuffix`         | `{ type: InputBuildInSuffix; failMessage?: string; tooltipProps?: PortalProviderProps }` | —                    | Predefined suffix states: `loading`, `success`, or `failed`. When set, `suffix` is ignored.                                                                     |
| `search`                | `boolean`                                                                                | `false`              | Adds a search icon prefix.                                                                                                                                      |
| `inputRef`              | `React.Ref<HTMLInputElement>`                                                            | —                    | Ref forwarded to the underlying `<input>` DOM element.                                                                                                          |
| `wrapperProps`          | `FlexLayoutProps`                                                                        | —                    | Extra props on the outermost `FlexLayout` rendered by `Input`.                                                                                                  |
| `textInputWrapperProps` | `FlexLayoutProps`                                                                        | —                    | Extra props on the inner `FlexLayout` that wraps the text input + prefix/suffix.                                                                                |
| `clearButtonProps`      | `ButtonProps`                                                                            | —                    | Props for the clear (×) button shown when `search={true}`.                                                                                                      |
| `onClearButtonClick`    | `(event: React.MouseEvent) => void`                                                      | —                    | **Deprecated.** Use `clearButtonProps.onClick` instead.                                                                                                         |
| `searchIconProps`       | `Partial<MagGlassIconProps>`                                                             | —                    | Props forwarded to the default search icon when `search={true}`.                                                                                                |
| `onBlur`                | `React.FocusEventHandler<HTMLInputElement>`                                              | —                    | Blur handler. Called after internal blur logic (negative-sign restoration).                                                                                     |
| `onKeyDown`             | `React.KeyboardEventHandler<HTMLInputElement>`                                           | —                    | Keydown handler. Called after internal keyboard logic.                                                                                                          |
| `onPressEnter`          | `(event: React.KeyboardEvent<HTMLInputElement>) => void`                                 | —                    | Called when the Enter key is pressed inside the input.                                                                                                          |

All other standard `React.HTMLProps<HTMLInputElement>` attributes (e.g. `name`, `aria-*`, `data-*`) are forwarded to the underlying `<input>` element.

---

### Enum / Constant Values

```tsx
import { ErrorType, InputBuildInSuffix } from '@nutanix-ui/prism-reactjs'

// ErrorType (from Input / FormItemProvider)
ErrorType.CRITICAL // 'critical' — red error styling (default)
ErrorType.WARNING // 'warning'  — yellow warning styling

// Input.InputBuildInSuffix / InputBuildInSuffix
InputBuildInSuffix.LOADING // 'loading'
InputBuildInSuffix.SUCCESS // 'success'
InputBuildInSuffix.FAILED // 'failed' — requires builtInSuffix.failMessage
```

---

### Controlled vs. Uncontrolled

| Mode             | When                                                  | What to wire                                                                                 |
| ---------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Uncontrolled** | `value` is `undefined`; use `defaultValue` or nothing | Optionally `onChange` or `onValueChange` to observe changes                                  |
| **Controlled**   | `value` is supplied                                   | Must handle `onValueChange` (or `onChange`) to update `value`, `error`, and `helpText` state |

In controlled mode `InputNumber` manages the transient "negative sign" display internally using its own `uncontrolledState`; the app never needs to handle this edge case.

---

### Keyboard Behaviour

| Key           | Action                               |
| ------------- | ------------------------------------ |
| `ArrowUp`     | Increment by `step`; clamps to `max` |
| `ArrowDown`   | Decrement by `step`; clamps to `min` |
| `Home`        | Set value to `min`                   |
| `End`         | Set value to `max`                   |
| Any other key | Forwarded to `onKeyDown` handler     |

---

### Accessibility

- `aria-live="polite"` + `aria-atomic="true"` announce the current value and label to screen readers after every change via a visually hidden `<SrOnly>` element.
- The − and + buttons receive descriptive `aria-label` values (e.g. "Decrease CPUs by 1") generated from `label` and `step`.
- `FormItemProvider` wires `aria-describedby` to the help-text element and sets `aria-invalid` when `error={true}`.
- Inform users of `min`/`max` constraints upfront via `helpText` or the `label` — do not rely solely on the auto-generated out-of-range error message.

---

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Minimal working example (uncontrolled)

```tsx
import React, { useRef } from 'react'
import { InputNumber } from '@nutanix-ui/prism-reactjs'

const MyInputNumber = () => {
  const myInputRef = useRef<HTMLInputElement>(null)

  return (
    <div style={{ width: 250 }}>
      <InputNumber
        label="CPUs"
        min={1}
        max={10}
        step={1}
        helpText="Enter a value between 1 and 10"
        inputRef={myInputRef}
      />
    </div>
  )
}
```

#### Observing changes in uncontrolled mode

```tsx
import React, { useRef } from 'react'
import { InputNumber } from '@nutanix-ui/prism-reactjs'

const MyInputNumber = () => {
  const myInputRef = useRef<HTMLInputElement>(null)

  // onValueChange fires for typing AND +/- button clicks.
  const handleOnChange = (
    value: string,
    error: boolean,
    helpText: React.ReactNode,
  ) => {
    console.log(`New value is ${value}`)
  }

  return (
    <div data-test-id="basic-usage" style={{ width: 250 }}>
      <InputNumber
        label="CPUs"
        min={1}
        max={10}
        step={1}
        helpText="Enter a value between 1 and 10"
        onValueChange={handleOnChange}
        inputRef={myInputRef}
      />
    </div>
  )
}
```

#### Controlled mode with custom validation

```tsx
import React, { useState } from 'react'
import { InputNumber } from '@nutanix-ui/prism-reactjs'

const MyInputNumber = () => {
  const [value, setValue] = useState(5)
  const [error, setError] = useState(false)
  const [helpText, setHelpText] = useState<React.ReactNode>(undefined)

  const handleOnChange = (
    newValue: string,
    newError: boolean,
    newHelpText: React.ReactNode,
  ) => {
    // Intercept here to apply custom validation or transformations.
    setValue(Number(newValue))
    setError(newError)
    setHelpText(newHelpText)
  }

  return (
    <div style={{ width: 250 }}>
      <InputNumber
        min={1}
        max={10}
        step={1}
        value={value}
        error={error}
        helpText={helpText}
        onValueChange={handleOnChange}
      />
    </div>
  )
}
```

#### Disabled

```tsx
import React from 'react'
import { InputNumber } from '@nutanix-ui/prism-reactjs'

const InputNumberWithDisabled = () => (
  <div style={{ width: 250 }} data-test-id="basic-usage-with-disabled">
    <InputNumber
      disabled={true}
      label="Value between 1-10"
      min={1}
      max={10}
      step={1}
    />
  </div>
)
```

#### Read-only

```tsx
import React from 'react'
import { InputNumber } from '@nutanix-ui/prism-reactjs'

const InputNumberReadOnly = () => (
  <div style={{ width: 250 }} data-test-id="basic-usage-with-readonly">
    <InputNumber
      readOnly={true}
      label="Value between 1-10"
      min={1}
      max={10}
      step={1}
      value={5}
    />
  </div>
)
```

#### Borderless appearance

```tsx
import { InputNumber } from '@nutanix-ui/prism-reactjs'
;<div style={{ width: 300 }}>
  <InputNumber label="I have no border" appearance="borderless" />
</div>
```

#### With a unit suffix

```tsx
import React from 'react'
import { FlexLayout, TextLabel, InputNumber } from '@nutanix-ui/prism-reactjs'

const customSuffix = (
  <FlexLayout alignItems="center" itemSpacing="10px">
    <TextLabel
      id="suffix"
      style={{
        borderLeft: '1px solid var(--color-border-separator-contrast)',
        padding: '5px 0 5px 10px',
      }}
    >
      GiB
    </TextLabel>
  </FlexLayout>
)

;<div style={{ width: 240 }} data-test-id="suffix-example">
  <InputNumber
    id="with-suffix"
    suffix={customSuffix}
    label="Memory"
    aria-labelledby="with-suffix suffix"
  />
</div>
```

#### Independently disabled +/− buttons

```tsx
import React from 'react'
import { InputNumber } from '@nutanix-ui/prism-reactjs'

// Disable just the increment button while keeping the input and decrement usable.
const InputNumberWithDisabledAddons = () => (
  <div style={{ width: 250 }} data-test-id="disabled-addons">
    <InputNumber
      label="Value"
      min={1}
      max={10}
      step={1}
      defaultValue={5}
      addonBeforeProps={{ disabled: true }}
      addonAfterProps={{ disabled: true }}
    />
  </div>
)
```

#### Built-in suffix states

```tsx
import { InputNumber, InputBuildInSuffix } from '@nutanix-ui/prism-reactjs';

// Loading state
<InputNumber label="Memory" builtInSuffix={{ type: InputBuildInSuffix.LOADING }} />

// Success state
<InputNumber label="Memory" builtInSuffix={{ type: InputBuildInSuffix.SUCCESS }} />

// Failed state (requires failMessage)
<InputNumber
  label="Memory"
  builtInSuffix={{
    type: InputBuildInSuffix.FAILED,
    failMessage: 'Value could not be validated'
  }}
/>
```

#### Warning error type

```tsx
import { InputNumber, ErrorType } from '@nutanix-ui/prism-reactjs'
;<InputNumber
  label="Replicas"
  min={1}
  max={100}
  value={0}
  error={true}
  errorType={ErrorType.WARNING}
  helpText="Value is outside the recommended range"
/>
```

---

### Usage Notes

- **`onChange` vs `onValueChange`**: `onChange` mirrors the native DOM input event and fires only on direct typing. `onValueChange` fires on both typing and +/− button clicks and is the correct handler for capturing all value changes.
- **Removed v1 props**: `border`, `formatter`, `parser`, `precision`, `size`. Use `appearance="borderless"` in place of `border={false}`.
- **Uncontrolled first**: Prefer uncontrolled usage (`defaultValue`) for simple forms. Switch to controlled (`value` + `onValueChange`) only when you need to intercept or transform the value before it is displayed.
- **Labels and constraints**: Always communicate `min`/`max` constraints to the user before they interact — not only on error. Pass them via `helpText` or embed them in the `label` (e.g. `"CPUs (1–10)"`).
- **`FormItemProvider` in forms**: When composing multi-field forms, wrap each field with `FormItemProvider` for consistent label/error layout, or rely on the fact that `InputNumber` already uses `FormItemProvider` internally.
- **Layout**: Wrap `InputNumber` in a Prism layout component and control width on the wrapper. Do not set `width` on the component itself.

<!-- SOURCE-API-END -->
