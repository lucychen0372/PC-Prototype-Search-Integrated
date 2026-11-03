# TimePicker

## Figma

- **Library name:** Time Picker (page: N/A, frame: Time Picker)

## React

Import: `import { TimePicker } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import { TimePicker } from '@nutanix-ui/prism-reactjs'
// For form-integrated variant:
import { FormItemTimePicker } from '@nutanix-ui/prism-reactjs'
```

### Static Properties

`TimePicker` exposes static properties that should be used instead of raw strings:

| Property               | Values                                                            | Notes                                  |
| ---------------------- | ----------------------------------------------------------------- | -------------------------------------- |
| `TimePicker.ErrorType` | `TimePicker.ErrorType.CRITICAL` \| `TimePicker.ErrorType.WARNING` | Re-export of `ErrorType` from Input    |
| `TimePicker.AMPM`      | `TimePicker.AMPM.AM` (`'AM'`) \| `TimePicker.AMPM.PM` (`'PM'`)    | Used internally; exposed for reference |

`ErrorType` can also be imported directly:

```tsx
import { TimePicker } from '@nutanix-ui/prism-reactjs'
// TimePicker.ErrorType.CRITICAL  TimePicker.ErrorType.WARNING
```

### Types

#### `TimeObjectType`

Returned by `onChange`, passed to `disabledHours` / `filteredHours`, etc.

```ts
type TimeObjectType = {
  hours?: number // 0–23 (24-hour internal representation)
  minutes?: number // 0–59
  seconds?: number // 0–59
  error?: boolean
  errorMessage?: string
}
```

#### `BackgroundTypeWithoutBody`

```ts
type BackgroundTypeWithoutBody = 'base' | 'alt'
```

### Props Interfaces

#### `TimePickerProps`

All props are optional unless marked **required**.

| Prop                   | Type                                                                        | Default                                    | Description                                                                                                                                                                                                        |
| ---------------------- | --------------------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `format12Hours`        | `boolean`                                                                   | `true`                                     | Display time in 12-hour format with AM/PM selector. Set to `false` for 24-hour format.                                                                                                                             |
| `showSeconds`          | `boolean`                                                                   | —                                          | Show a seconds column in the popup.                                                                                                                                                                                |
| `value`                | `string`                                                                    | —                                          | Controlled time string. Format: `h:mm a` / `h:mm:ss a` (12h) or `HH:mm` / `HH:mm:ss` (24h). Setting this makes the component controlled.                                                                           |
| `defaultValue`         | `string`                                                                    | —                                          | Initial time string for uncontrolled usage. Same format as `value`.                                                                                                                                                |
| `defaultSelectedValue` | `string`                                                                    | —                                          | Pre-selects a column position in the popup when no `value` or `defaultValue` is provided.                                                                                                                          |
| `placeholder`          | `string`                                                                    | Auto-generated from `defaultSelectedValue` | Placeholder text shown in the input.                                                                                                                                                                               |
| `error`                | `boolean`                                                                   | `false`                                    | Show error styling on the input.                                                                                                                                                                                   |
| `errorType`            | `ErrorType`                                                                 | `TimePicker.ErrorType.CRITICAL`            | Visual error severity. Use `TimePicker.ErrorType.CRITICAL` or `TimePicker.ErrorType.WARNING`.                                                                                                                      |
| `errorMessage`         | `string`                                                                    | —                                          | Error message displayed beneath the input.                                                                                                                                                                         |
| `id`                   | `string`                                                                    | Auto-generated                             | Unique id applied to the popup wrapper element; also propagated to the input. Must be unique across the page for label-focus to work.                                                                              |
| `disabled`             | `boolean`                                                                   | —                                          | Disables the entire TimePicker (input + open button).                                                                                                                                                              |
| `readOnly`             | `boolean`                                                                   | —                                          | Makes the TimePicker read-only; popup cannot be opened.                                                                                                                                                            |
| `background`           | `BackgroundTypeWithoutBody`                                                 | Derived from `BackgroundContext`           | Override background contrast for the input and popup. Prefer `BackgroundContext` over this prop.                                                                                                                   |
| `className`            | `string`                                                                    | —                                          | Extra class applied to the root wrapper `<div>`.                                                                                                                                                                   |
| `inputProps`           | `InputProps`                                                                | `{}`                                       | Props forwarded to the inner `Input` component. Supports `label`, `inputRef`, `readOnly`, `data-test-id`, ARIA attributes, and all other `InputProps`.                                                             |
| `inputWrapperProps`    | `DataWrapperProps<React.HTMLAttributes<HTMLDivElement>>`                    | `{}`                                       | Props forwarded to the outer `<div>` wrapper (root element).                                                                                                                                                       |
| `clearButtonProps`     | `ButtonProps`                                                               | —                                          | Props forwarded to the clear (×) button (e.g. `aria-label`, `data-test-id`).                                                                                                                                       |
| `popupWrapperProps`    | `DataWrapperProps<React.HTMLAttributes<HTMLDivElement>>`                    | `{}`                                       | Props forwarded to the popup wrapper element (e.g. `aria-describedby`, `data-test-id`).                                                                                                                            |
| `popupClassName`       | `string`                                                                    | —                                          | Extra class applied to the popup overlay.                                                                                                                                                                          |
| `popupPlacement`       | `PopupProviderProps['popupPlacement']`                                      | `'bottomLeft'`                             | Popup placement relative to the trigger. One of: `'leftTop'`, `'left'`, `'leftBottom'`, `'topLeft'`, `'top'`, `'topRight'`, `'rightTop'`, `'right'`, `'rightBottom'`, `'bottomLeft'`, `'bottom'`, `'bottomRight'`. |
| `getPopupContainer`    | `PopupProviderProps['getPopupContainer']`                                   | `() => document.body`                      | Returns a DOM element to mount the popup into. Required when TimePicker is inside a scrollable container other than `<body>`.                                                                                      |
| `disabledHours`        | `(timeObj: TimeObjectType) => number[]`                                     | —                                          | Returns an array of hour values (0–23) to render as disabled in the hours column.                                                                                                                                  |
| `disabledMinutes`      | `(timeObj: TimeObjectType) => number[]`                                     | —                                          | Returns an array of minute values (0–59) to render as disabled in the minutes column.                                                                                                                              |
| `disabledSeconds`      | `(timeObj: TimeObjectType) => number[]`                                     | —                                          | Returns an array of second values (0–59) to render as disabled in the seconds column.                                                                                                                              |
| `filteredHours`        | `(timeObj: TimeObjectType) => number[]`                                     | —                                          | Returns the only hour values (0–23) that should appear in the hours column.                                                                                                                                        |
| `filteredMinutes`      | `(timeObj: TimeObjectType) => number[]`                                     | —                                          | Returns the only minute values (0–59) that should appear in the minutes column.                                                                                                                                    |
| `filteredSeconds`      | `(timeObj: TimeObjectType) => number[]`                                     | —                                          | Returns the only second values (0–59) that should appear in the seconds column.                                                                                                                                    |
| `parseInputValue`      | `(value: string) => TimeObjectType`                                         | —                                          | Custom parser for the text input value. Return `{ error: true, errorMessage: '...' }` on failure. Overrides built-in regex parsing.                                                                                |
| `renderInputValue`     | `(timeObj: TimeObjectType) => string`                                       | —                                          | Custom renderer that converts a `TimeObjectType` back to a display string. Used when an option is selected in the popup.                                                                                           |
| `onChange`             | `(value: string, timeObj: TimeObjectType) => void`                          | —                                          | Fired when time changes (typing or popup selection). `timeObj` is `undefined` when input is cleared.                                                                                                               |
| `onErrorChange`        | `(hasError: boolean, errorMessage: TimeObjectType['errorMessage']) => void` | —                                          | Fired when the error state changes (e.g. on blur validation).                                                                                                                                                      |
| `onBlur`               | `(e: React.FocusEvent<HTMLInputElement \| HTMLDivElement>) => void`         | —                                          | Fired when focus leaves both the input and the popup.                                                                                                                                                              |

### FormItemTimePicker

`FormItemTimePicker` wraps `TimePicker` with `FormItemProvider`, adding label support, integrated validation, and `Form` interop. Use it in forms instead of bare `TimePicker`.

```tsx
import { FormItemTimePicker } from '@nutanix-ui/prism-reactjs'
```

**Additional props** (on top of all `TimePickerProps`):

| Prop         | Type         | Required | Description                                                                |
| ------------ | ------------ | -------- | -------------------------------------------------------------------------- |
| `id`         | `string`     | **Yes**  | Unique field identifier; links label, validation, and `Form` state.        |
| `formHelper` | `FormHelper` | No       | Injected by `<Form>` to wire validation, errors, and values automatically. |
| `label`      | `string`     | No       | Field label (from `FormItemProviderProps`).                                |
| `helpText`   | `string`     | No       | Help / error text displayed below the field.                               |

### Source Examples

These are adapted from the Prism source examples. When generating app code, translate layout and spacing to Prism layout props where possible.

#### Default (12-hour AM/PM):

```tsx
import { TimePicker } from '@nutanix-ui/prism-reactjs'
;<div
  style={{ width: '250px', height: '275px' }}
  data-test-id="default-container"
>
  <TimePicker
    inputWrapperProps={{ 'data-test-id': 'default-wrapper' }}
    popupWrapperProps={{ 'data-test-id': 'default-popup' }}
    getPopupContainer={() =>
      document.getElementById('timepicker-container-example')
    }
    inputProps={{
      label: 'Default Usage',
      'data-test-id': 'default',
    }}
    clearButtonProps={{
      'data-test-id': 'default-clear-button',
    }}
  />
  <div id="timepicker-container-example" />
</div>
```

#### 24-hour format:

```tsx
import { TimePicker } from '@nutanix-ui/prism-reactjs'
;<div style={{ width: '250px' }}>
  <TimePicker placeholder="Select Time" format12Hours={false} />
</div>
```

#### 24-hour format with seconds:

```tsx
import { TimePicker } from '@nutanix-ui/prism-reactjs'
;<div style={{ width: '250px' }}>
  <TimePicker format12Hours={false} showSeconds={true} />
</div>
```

#### Controlled component with onChange / onErrorChange:

```tsx
import React, { useState } from 'react'
import { TimePicker } from '@nutanix-ui/prism-reactjs'

function ControlledExample() {
  const [value, setValue] = useState('12:34 PM')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <div style={{ width: '250px' }}>
      <TimePicker
        value={value}
        error={error}
        errorMessage={errorMessage}
        onChange={(timeValue, timeObj) => {
          setValue(timeValue)
        }}
        onErrorChange={(hasError, msg) => {
          setError(hasError)
          setErrorMessage(msg || '')
        }}
        inputProps={{ label: 'Time' }}
        popupWrapperProps={{ 'aria-describedby': 'hours-paragraph' }}
      />
    </div>
  )
}
```

#### Read-only:

```tsx
import { TimePicker } from '@nutanix-ui/prism-reactjs'
;<div style={{ width: '250px' }}>
  <TimePicker
    readOnly={true}
    placeholder="Select Time"
    inputProps={{ label: 'Read only' }}
  />
</div>
```

#### Disabled:

```tsx
import { TimePicker } from '@nutanix-ui/prism-reactjs'
;<div style={{ width: '250px' }}>
  <TimePicker
    disabled={true}
    placeholder="Select Time"
    inputProps={{ label: 'Disabled' }}
  />
</div>
```

#### Input read-only (selection-only, popup still works):

```tsx
import { TimePicker } from '@nutanix-ui/prism-reactjs'

// Prevents manual typing; the popup still allows selection.
;<div style={{ width: '250px' }}>
  <TimePicker
    placeholder="Select Time"
    inputProps={{
      readOnly: true,
      label: 'Only selection allowed',
    }}
  />
</div>
```

#### Error state:

```tsx
import { TimePicker } from '@nutanix-ui/prism-reactjs'
;<div style={{ width: '250px' }}>
  <TimePicker
    value="abc"
    format12Hours={false}
    error={true}
    errorMessage="ABC is not a time"
    inputProps={{ label: 'Error styling' }}
    placeholder="Select Time"
  />
</div>
```

#### Disabled options (all times before 8:15 AM):

```tsx
import { TimePicker } from '@nutanix-ui/prism-reactjs'

function disabledHours(timeObj) {
  return [0, 1, 2, 3, 4, 5, 6, 7]
}

function disabledMinutes(timeObj) {
  if (timeObj.hours === 8) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  }
  return []
}

;<div style={{ width: '250px' }}>
  <TimePicker
    defaultValue="8:15 AM"
    disabledHours={disabledHours}
    disabledMinutes={disabledMinutes}
    inputProps={{ label: 'Time' }}
  />
</div>
```

#### Filtered options (quarter-hour intervals):

```tsx
import { TimePicker } from '@nutanix-ui/prism-reactjs'

const filteredMinutes = (timeObj) => [0, 15, 30, 45]
const filteredSeconds = (timeObj) => [0]

;<div style={{ width: '250px' }}>
  <TimePicker
    defaultValue="1:30:00 AM"
    showSeconds={true}
    filteredMinutes={filteredMinutes}
    filteredSeconds={filteredSeconds}
    inputProps={{ label: 'Time' }}
  />
</div>
```

#### Custom parse/render (moment integration):

```tsx
import React, { useState } from 'react'
import moment from 'moment'
import { TimePicker } from '@nutanix-ui/prism-reactjs'

function getTime(momentObj) {
  return momentObj.locale('zh_cn').format('h:mm A')
}

function renderInputValue(timeObj) {
  return getTime(moment().set({ hour: timeObj.hours, minute: timeObj.minutes }))
}

function parseInputValue(value) {
  const m = moment(value, 'h:mm A', 'zh_cn', true)
  if (m.isValid()) {
    return { hours: m.hours(), minutes: m.minutes() }
  }
  return { error: true, errorMessage: '错误' }
}

function MomentExample() {
  const [value, setValue] = useState(getTime(moment('12:34 AM', 'h:mm A')))
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <div style={{ width: '250px' }}>
      <TimePicker
        value={value}
        error={error}
        errorMessage={errorMessage}
        renderInputValue={renderInputValue}
        parseInputValue={parseInputValue}
        onChange={(timeValue) => setValue(timeValue)}
        onErrorChange={(hasError, msg) => {
          setError(hasError)
          setErrorMessage(msg || '')
        }}
        inputProps={{ label: 'Time' }}
      />
    </div>
  )
}
```

#### Imperative focus via inputRef:

```tsx
import { useRef } from 'react'
import { Button, TimePicker, StackingLayout } from '@nutanix-ui/prism-reactjs'

function Example() {
  const timePickerInputRef = useRef()
  return (
    <StackingLayout>
      <div style={{ width: '250px' }}>
        <TimePicker
          inputProps={{
            label: 'Select time',
            inputRef: timePickerInputRef,
          }}
          placeholder="Select Time"
        />
      </div>
      <Button onClick={() => timePickerInputRef.current.focus()}>
        Focus Input
      </Button>
    </StackingLayout>
  )
}
```

#### Inside a Modal:

```tsx
import React, { useState, useRef } from 'react'
import {
  Modal,
  Button,
  StackingLayout,
  TimePicker,
} from '@nutanix-ui/prism-reactjs'

function ModalExample() {
  const [visible, setVisible] = useState(false)
  const triggerRef = useRef()

  const handleClose = () => {
    setVisible(false)
    triggerRef.current?.focus()
  }

  return (
    <>
      <Button
        innerRef={triggerRef}
        type={Button.ButtonTypes.PRIMARY}
        onClick={() => setVisible(true)}
      >
        Open Modal
      </Button>
      <Modal
        visible={visible}
        title="Modal"
        onClose={handleClose}
        primaryButtonOnClick={handleClose}
      >
        <StackingLayout padding="20px">
          <TimePicker
            placeholder="Select Time"
            inputProps={{ 'data-test-id': 'modal-timepicker' }}
            popupWrapperProps={{ 'data-test-id': 'modal-time-popup' }}
          />
        </StackingLayout>
      </Modal>
    </>
  )
}
```

#### FormItemTimePicker (preferred in forms):

```tsx
import { FormItemTimePicker } from '@nutanix-ui/prism-reactjs'
;<FormItemTimePicker
  id="start-time"
  label="Start Time"
  placeholder="Select Time"
  format12Hours={true}
/>
```

### Keyboard & Accessibility

- The input renders as `role="combobox"` with `aria-haspopup="dialog"` and `aria-expanded`.
- `aria-controls` links the input to the popup wrapper by ID.
- `aria-live="polite"` is set on the input so changes are announced.
- **Open popup:** Click the clock icon button, or press `ArrowDown` / `ArrowUp` while the input is focused.
- **Close popup:** `Escape` key, `Tab` key, or click the "Close" button inside the popup.
- **Navigate columns:** `ArrowLeft` / `ArrowRight` moves focus between the hours, minutes, seconds, and AM/PM columns.
- **Select an option:** `Enter` or `Space` while focused on an option; or click the option.
- The clear (×) button is only rendered when the input has a value and is not `readOnly`.
- Use `id` to ensure `label` → input association works correctly when multiple TimePickers appear on the same page.

### Behaviour Notes

- **Controlled vs uncontrolled:** Providing `value` makes the component controlled. Use `defaultValue` for uncontrolled. Mixing both is not supported.
- **Value formats:**
  - 12-hour without seconds: `h:mm a` e.g. `"1:30 PM"`
  - 12-hour with seconds: `h:mm:ss a` e.g. `"1:30:00 PM"`
  - 24-hour without seconds: `HH:mm` e.g. `"13:30"`
  - 24-hour with seconds: `HH:mm:ss` e.g. `"13:30:00"`
- **Error validation** runs on blur (after typing). Selecting an option from the popup always produces a valid value and clears any error.
- **Disabled vs read-only:** `disabled` prevents all interaction and greys out the control. `readOnly` prevents opening the popup (clock icon is dimmed) but still shows the value. `inputProps.readOnly` keeps the popup functional but prevents manual text input.
- **`getPopupContainer`** must be set when the TimePicker is inside a scrollable container other than `<body>`; omitting it causes the popup to not scroll with its container.
- **Background:** The popup background adapts to `BackgroundContext` automatically. Only use the `background` prop to override when the component cannot read context correctly (legacy usage — see the source examples note).
- **`parseInputValue` / `renderInputValue`:** Override the default regex-based parse/render cycle for custom locale or third-party date-library integration (e.g. moment.js).

### Usage Notes

- Prefer `FormItemTimePicker` over bare `TimePicker` in form contexts; it handles labels, help text, and `Form` validation automatically.
- Use `TimePicker.ErrorType.CRITICAL` / `TimePicker.ErrorType.WARNING` rather than raw strings for `errorType`.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for surrounding layout and spacing.
- Keep `id` unique across all input elements on the page; it is used by both the popup wrapper and the label-click focus mechanism.

<!-- SOURCE-API-END -->
