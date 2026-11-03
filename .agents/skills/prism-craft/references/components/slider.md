# Slider

## Figma

- **Library name:** Slider (page: N/A, frame: Slider)

## React

Import: `import { Slider } from '@nutanix-ui/prism-reactjs'`

### TSX Examples

```tsx
// Controlled single-value slider
const [gpuMemory, setGpuMemory] = useState(0)

;<StackingLayout itemGap="XS">
  <Slider
    label="GPU Memory Allocation"
    value={gpuMemory}
    onChange={(val) => setGpuMemory(val as number)}
    min={0}
    max={100}
    step={5}
  />
</StackingLayout>
```

> **Note:** The `marks` prop was removed in v2. Use `step` to create evenly-spaced tick marks instead.

### Anti-patterns

- Don't use `<input type="range">` — use `Slider`
- Don't pass `marks`, `dots`, `included`, `vertical`, `tipFormatter`, or `onAfterChange` — these were removed in v2

<!-- SOURCE-API-START -->

### Import

```tsx
import { Slider } from '@nutanix-ui/prism-reactjs'
```

### Type Aliases

| Type               | Definition                   | Description                                 |
| ------------------ | ---------------------------- | ------------------------------------------- |
| `SliderRangeValue` | `[number, number]`           | Tuple used for range slider values          |
| `SliderInputValue` | `number \| SliderRangeValue` | Union type for both single and range values |

### Props Interfaces

#### `SliderProps`

| Prop             | Type                                                         | Default                    | Required | Description                                                                                                                                                                                       |
| ---------------- | ------------------------------------------------------------ | -------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `className`      | `string`                                                     | —                          | No       | Additional CSS class name on the inner `FlexLayout`.                                                                                                                                              |
| `range`          | `boolean`                                                    | `false`                    | No       | When `true`, renders a dual-handle range slider; `value`/`defaultValue` must be `SliderRangeValue`.                                                                                               |
| `tooltip`        | `boolean`                                                    | `false`                    | No       | Shows a tooltip above the handle while dragging/focusing.                                                                                                                                         |
| `showInput`      | `boolean`                                                    | `true`                     | No       | When `false`, hides the numeric input box(es) alongside the rail.                                                                                                                                 |
| `InputLabel`     | `string`                                                     | —                          | No       | Unit suffix displayed inside the input box (e.g. `"GiB"`, `"MB"`). Also narrated in the handle's `aria-valuetext`.                                                                                |
| `label`          | `string`                                                     | —                          | No       | Visible legend text rendered above the slider fieldset; also used as `aria-labelledby` for the handle and input.                                                                                  |
| `minInputLabel`  | `string`                                                     | i18n `"From"`              | No       | Visible label above the min (start) input when `range` is `true`. Slider assigns stable IDs for a11y (`aria-labelledby` on inputs and handles). Use `minInputProps` for per-`<Input>` HTML props. |
| `maxInputLabel`  | `string`                                                     | i18n `"To"`                | No       | Visible label above the max (end) input when `range` is `true`. Use `maxInputProps` for per-`<Input>` HTML props.                                                                                 |
| `min`            | `number`                                                     | `0`                        | No       | Minimum value of the slider.                                                                                                                                                                      |
| `max`            | `number`                                                     | `100`                      | No       | Maximum value of the slider. Keep the difference between `max` and `min` within 1000 for pixel precision.                                                                                         |
| `step`           | `number`                                                     | —                          | No       | Integer step interval. Replaces the removed `marks` prop for creating discrete stops.                                                                                                             |
| `onChange`       | `(value: SliderInputValue) => void`                          | —                          | No       | Callback fired on every value change, passing the current `number` or `[number, number]`.                                                                                                         |
| `defaultValue`   | `SliderInputValue`                                           | `0` (or `[0,0]` for range) | No       | Uncontrolled initial value. Must be within `[min, max]`.                                                                                                                                          |
| `value`          | `SliderInputValue`                                           | —                          | No       | Controlled value. Supply `onChange` when using this prop.                                                                                                                                         |
| `disabled`       | `boolean`                                                    | `false`                    | No       | Disables the slider and all interactive elements.                                                                                                                                                 |
| `readOnly`       | `boolean`                                                    | `false`                    | No       | Makes the slider read-only (focusable but not editable).                                                                                                                                          |
| `inputProps`     | `InputProps`                                                 | —                          | No       | Props forwarded to the single (or end) `<Input>` component. Useful for `name`, `data-test-id`, `aria-describedby`.                                                                                |
| `minInputProps`  | `InputProps`                                                 | —                          | No       | Props forwarded to the start `<Input>` when `range` is `true`.                                                                                                                                    |
| `maxInputProps`  | `InputProps`                                                 | —                          | No       | Props forwarded to the end `<Input>` when `range` is `true`.                                                                                                                                      |
| `railProps`      | `React.HTMLProps<HTMLDivElement> & { 'data-test'?: string }` | —                          | No       | Props forwarded to the rail container `<div>`.                                                                                                                                                    |
| `handleProps`    | `SliderHandleProps`                                          | —                          | No       | Props forwarded to the single (or both) `SliderHandle`(s). Applied first; `minHandleProps`/`maxHandleProps` override per-handle.                                                                  |
| `minHandleProps` | `SliderHandleProps`                                          | —                          | No       | Props forwarded to the start (lower) `SliderHandle` when `range` is `true`. Merged on top of `handleProps`.                                                                                       |
| `maxHandleProps` | `SliderHandleProps`                                          | —                          | No       | Props forwarded to the end (upper) `SliderHandle` when `range` is `true`. Merged on top of `handleProps`.                                                                                         |
| `wrapperProps`   | `FlexLayoutProps`                                            | —                          | No       | Props forwarded to the outer `FlexLayout` wrapper. Useful for `data-test-id`, layout overrides.                                                                                                   |

#### `SliderHandleProps` (passed via `handleProps` / `minHandleProps` / `maxHandleProps`)

| Prop          | Type                              | Default | Description                                                                              |
| ------------- | --------------------------------- | ------- | ---------------------------------------------------------------------------------------- |
| `data-test`   | `string`                          | —       | Test selector on the handle element.                                                     |
| `tabIndex`    | `number`                          | `0`     | Tab index for the handle div.                                                            |
| `handleProps` | `React.HTMLProps<HTMLDivElement>` | —       | Additional HTML props spread onto the inner handle `<div>`.                              |
| Any `aria-*`  | `string`                          | —       | Extra ARIA attributes are extracted and merged onto the handle (via `extractAriaProps`). |

> `offset`, `value`, `min`, `max`, `tooltip`, `disabled`, `readOnly`, `InputLabel`, `label`, `labelId` are managed internally by `SliderRail` and should not be passed from application code.

### Source Examples

These are adapted from the Prism source examples. Translate `<div style={...}>` wrappers to Prism layout components in application code where possible.

#### Accessibility Guidelines

All sliders must have an accessible label. Always supply `label` (renders a visible `<legend>`) **or** set `aria-label`/`aria-labelledby` on `handleProps` and `inputProps` when the visual label is provided externally.

The component internally builds stable IDs and wires `aria-labelledby`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and `aria-valuetext` onto each handle. For linked help text, pass matching `id` via `helpTextProps` and reference it with `aria-describedby` on both `handleProps` and `inputProps`.

#### Slider Basic Usage

```tsx
import { Slider } from '@nutanix-ui/prism-reactjs'
;<div style={{ width: '500px', margin: '0 auto' }}>
  <Slider
    min={0}
    max={1}
    label="Slider"
    wrapperProps={{ 'data-test-id': 'basic-slider-with-label' }}
    inputProps={{
      'data-test-id': 'input-slider-example-1',
      name: 'slider-input',
      'aria-label': 'Value',
    }}
    railProps={{ 'data-test-id': 'slider-example-1' }}
  />
</div>
```

#### Slider with onChange Callback (controlled) + FormItemProvider

```tsx
import React, { useState } from 'react'
import {
  Slider,
  StackingLayout,
  FormItemProvider,
} from '@nutanix-ui/prism-reactjs'

const FormSlider = FormItemProvider(Slider)
const defaultHelpText = 'Enter a value between -10 and 10 megabytes.'

const SliderExample = () => {
  const [value, setValue] = useState(0)

  return (
    <div style={{ width: '500px', margin: '0 auto' }}>
      <FormSlider
        className="my-slider-classname"
        wrapperProps={{ 'data-test-id': 'slider-onchange' }}
        handleProps={{
          'data-test-id': 'slider-onchange-handle',
          'aria-describedby': 'slider-helptext-id',
        }}
        inputProps={{
          name: 'slider-input-callback',
          'aria-describedby': 'slider-helptext-id',
        }}
        min={-10}
        max={10}
        label="Enter A Value"
        helpText={defaultHelpText}
        InputLabel="MB"
        helpTextProps={{ id: 'slider-helptext-id' }}
        value={value}
        onChange={setValue}
      />
    </div>
  )
}

const SliderRangeExample = () => {
  const [value, setValue] = useState<[number, number]>([-1, 1])

  return (
    <div style={{ width: '500px', margin: '0 auto' }}>
      <FormSlider
        wrapperProps={{ 'data-test-id': 'slider-range-onchange' }}
        minHandleProps={{ 'data-test-id': 'left-handle' }}
        maxHandleProps={{ 'data-test-id': 'right-handle' }}
        minInputProps={{ 'data-test-id': 'left-input' }}
        maxInputProps={{ 'data-test-id': 'right-input' }}
        min={-10}
        max={10}
        range={true}
        label="Enter A Value"
        helpText={defaultHelpText}
        value={value}
        onChange={setValue}
      />
    </div>
  )
}

;<StackingLayout itemGap="XXL">
  <SliderExample />
  <SliderRangeExample />
</StackingLayout>
```

#### Slider with Input Label and Default Value

```tsx
import { Slider } from '@nutanix-ui/prism-reactjs'
;<div style={{ width: '500px', margin: '0 auto' }}>
  <Slider
    min={0}
    max={512}
    InputLabel="GiB"
    label="Storage"
    defaultValue={367}
    inputProps={{
      name: 'slider-input-with-label',
      'aria-label': 'Value',
    }}
  />
</div>
```

#### Slider with Range and Tooltips

```tsx
import { Slider } from '@nutanix-ui/prism-reactjs'
;<div style={{ width: '500px', margin: '0 auto' }}>
  <Slider
    min={-50}
    max={50}
    defaultValue={[-20, 20]}
    range={true}
    tooltip={true}
    InputLabel="MiB"
    label="Provisioning for VM Storage"
    inputProps={{ name: 'slider-input-range' }}
  />
</div>
```

#### Slider with Range and without Input Boxes

```tsx
import { Slider } from '@nutanix-ui/prism-reactjs'
;<div style={{ width: '500px', margin: '0 auto' }}>
  <Slider
    min={0}
    max={100}
    label="Label"
    defaultValue={[20, 50]}
    range={true}
    tooltip={true}
    showInput={false}
  />
</div>
```

#### Slider with Step

```tsx
import { Slider } from '@nutanix-ui/prism-reactjs'
;<div style={{ width: '500px', margin: '0 auto' }}>
  <Slider
    label="Slider With Step - Increments of Ten"
    inputProps={{ name: 'slider-input-step' }}
    min={0}
    max={100}
    step={10}
    defaultValue={40}
  />
</div>
```

#### Slider Disabled

```tsx
import { Slider } from '@nutanix-ui/prism-reactjs'
;<div
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '500px',
    margin: '0 auto',
  }}
>
  <Slider
    min={0}
    max={512}
    defaultValue={320}
    InputLabel="GiB"
    label="Storage"
    disabled={true}
    wrapperProps={{ 'data-test-id': 'disabled-slider-with-label' }}
    inputProps={{ name: 'disabled-slider-input-with-label' }}
  />
  <Slider
    min={0}
    max={512}
    step={32}
    defaultValue={320}
    InputLabel="GiB"
    label="Storage - Increments of 32"
    disabled={true}
    showInput={false}
    wrapperProps={{ 'data-test-id': 'disabled-slider-without-label' }}
  />
</div>
```

#### Slider Read-Only

```tsx
import { Slider } from '@nutanix-ui/prism-reactjs'
;<div
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '500px',
    margin: '0 auto',
  }}
>
  <Slider
    min={0}
    max={512}
    defaultValue={320}
    InputLabel="GiB"
    label="Storage"
    readOnly={true}
    wrapperProps={{ 'data-test-id': 'readonly-slider-with-label' }}
    inputProps={{ name: 'readonly-slider-input-with-label' }}
  />
  <Slider
    min={0}
    max={512}
    step={32}
    defaultValue={320}
    label="Storage - Increments of 32"
    readOnly={true}
    showInput={false}
    wrapperProps={{ 'data-test-id': 'readonly-slider-without-label' }}
  />
</div>
```

### Keyboard Behaviour

#### When the slider handle has focus

| Key                                 | Action                               |
| ----------------------------------- | ------------------------------------ |
| `ArrowRight` / `ArrowUp`            | Increase value by `step` (default 1) |
| `ArrowLeft` / `ArrowDown`           | Decrease value by `step` (default 1) |
| `Shift` + `ArrowUp/Down/Right/Left` | Increase/decrease by `step × 10`     |
| `PageUp`                            | Increase by `step × 10`              |
| `PageDown`                          | Decrease by `step × 10`              |
| `Home`                              | Jump to `min`                        |
| `End`                               | Jump to `max`                        |

For range sliders, when dragging one handle past the other, focus automatically transfers to the new active handle.

#### When the numeric input has focus

| Key                      | Action                           |
| ------------------------ | -------------------------------- |
| `ArrowUp`                | Increase by `step` (default 1)   |
| `ArrowDown`              | Decrease by `step` (default 1)   |
| `Shift` + `ArrowUp/Down` | Increase/decrease by `step × 10` |

Values are clamped to `[min, max]` on blur.

### Migration from v1 (AntD-based Slider)

The following props were **removed** in v2 and have no replacement unless noted:

| Removed prop    | v2 alternative                                |
| --------------- | --------------------------------------------- |
| `marks`         | Use `step` to create discrete stops           |
| `dots`          | Use `step`                                    |
| `included`      | Removed                                       |
| `vertical`      | Removed                                       |
| `tipFormatter`  | Use `tooltip={true}` + `InputLabel` for units |
| `onAfterChange` | Use `onChange`                                |

CSS class overrides targeting `.ant-slider-*` must be updated. The v2 class prefix is controlled by `ThemeManager` (e.g. `ntnx-slider-handle`, `ntnx-slider-ctr`).

### Usage Notes

- Prefer `label` over manual `aria-label` on `handleProps`/`inputProps` — the component wires `aria-labelledby` automatically when `label` is set.
- Keep `max - min` within 1000 for pixel-accurate handle positioning.
- `step` must be an integer; it is also used as the keyboard increment unit.
- For form integration, wrap with `FormItemProvider(Slider)` to gain `helpText`, `helpTextProps`, and validation state props.
- Use `showInput={false}` with `tooltip={true}` for compact display contexts where the numeric input would be redundant.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`) instead of custom CSS for surrounding layout.

<!-- SOURCE-API-END -->
