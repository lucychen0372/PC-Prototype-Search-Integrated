# RadioGroup

## Figma

- **Library name:** Radio Group (page: N/A, frame: Radio Group)
- **Radio Group variants:**
  - Layout: Horizontal | Vertical

## React

Import: `import { RadioGroup, Radio } from '@nutanix-ui/prism-reactjs'`

### Figma -> React Prop Mapping

| Figma Property | React Prop | Value Mapping                                                                                              |
| -------------- | ---------- | ---------------------------------------------------------------------------------------------------------- |
| Layout         | `layout`   | Horizontal -> `RadioGroup.RadioGroupLayout.HORIZONTAL`, Vertical -> `RadioGroup.RadioGroupLayout.VERTICAL` |

<!-- SOURCE-API-START -->

### Import

```tsx
import { RadioGroup, Radio } from '@nutanix-ui/prism-reactjs'
```

For form-integrated usage:

```tsx
import { FormItemRadioGroup, Radio } from '@nutanix-ui/prism-reactjs'
```

### Enums / Constants

#### `RadioGroupLayout`

Exported from `@nutanix-ui/prism-reactjs` as a static member of `RadioGroup`.

| Key          | Value          |
| ------------ | -------------- |
| `HORIZONTAL` | `"horizontal"` |
| `VERTICAL`   | `"vertical"`   |

### Exported Type Aliases

#### `RadioGroupProps`

```ts
type RadioGroupProps = CommonRadioGroupProps & ConditionalRadioGroupProps
```

`CommonRadioGroupProps` extends `FlexLayoutProps` (omitting `onChange` and `title`), so all `FlexLayout` props (e.g. `itemSpacing`, `itemGap`, `alignItems`, `justifyContent`) are valid on `RadioGroup`.

`ConditionalRadioGroupProps` is a discriminated union:

- When `title` is a `string`, `titleTag?: TitleSizes` is permitted.
- When `title` is a `React.ReactNode` (non-string), `titleTag` must not be set.

### Props

#### `RadioGroup` Props

| Prop               | Type                                                | Default                     | Required | Description                                                                                                                                                                                                |
| ------------------ | --------------------------------------------------- | --------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`         | `React.ReactNode`                                   | —                           | Yes      | One or more `<Radio>` elements. Falsy children (`null`, `undefined`, `false`, `0`) are filtered out. Throws if fewer than 1 truthy child remains or any child is not a `Radio`.                            |
| `selectedValue`    | `string`                                            | `""`                        | Yes      | The `value` of the currently selected `Radio`.                                                                                                                                                             |
| `onChange`         | `(nextSelectedValue: string) => void`               | —                           | No       | Called when a new radio is selected. The parent must update `selectedValue` in response.                                                                                                                   |
| `name`             | `string`                                            | —                           | No       | HTML `name` attribute shared across all child radios. Should be unique per page when multiple `RadioGroup`s are present. Falls back to each `Radio`'s own `name` if omitted.                               |
| `disabled`         | `boolean`                                           | —                           | No       | Disables all child radios. Overrides each child's own `disabled` prop.                                                                                                                                     |
| `layout`           | `RadioGroupLayout`                                  | `RadioGroupLayout.VERTICAL` | No       | Controls flex direction. `HORIZONTAL` removes `additionalInfo` from all children.                                                                                                                          |
| `title`            | `string \| React.ReactNode`                         | —                           | No       | Group label rendered above the radios. A string value is wrapped in `<Title size="h3">` and automatically linked via `aria-labelledby`. A React node is rendered as-is; supply `aria-labelledby` manually. |
| `titleTag`         | `TitleSizes` (`"h1"` \| `"h2"` \| `"h3"` \| `"h4"`) | —                           | No       | Overrides the heading tag when `title` is a string. Only valid when `title` is a `string`.                                                                                                                 |
| `description`      | `string \| React.ReactNode`                         | —                           | No       | Descriptive text rendered below the title. A string is wrapped in `<Paragraph>` and linked via `aria-describedby`. A React node is rendered as-is; supply `aria-describedby` manually.                     |
| `wrapperProps`     | `FlexLayoutProps`                                   | —                           | No       | Props applied to the outer `FlexLayout` wrapper (the element that holds the title, description, and the `role="radiogroup"` container).                                                                    |
| `className`        | `string`                                            | —                           | No       | CSS class appended to both the wrapper and the inner radiogroup element.                                                                                                                                   |
| `id`               | `string`                                            | Auto-generated              | No       | ID used as base for internal `aria-labelledby` / `aria-describedby` IDs.                                                                                                                                   |
| `error`            | `boolean`                                           | —                           | No       | Error state forwarded to each child `Radio` (consumed from `FormItemProvider`; not forwarded to the DOM).                                                                                                  |
| `errorType`        | `string`                                            | —                           | No       | Error type forwarded to each child `Radio` (consumed from `FormItemProvider`; not forwarded to the DOM).                                                                                                   |
| `aria-labelledby`  | `string`                                            | —                           | No       | Explicitly set `aria-labelledby` on the `role="radiogroup"` element. Use when providing a custom React node as `title`.                                                                                    |
| `aria-describedby` | `string`                                            | —                           | No       | Forwarded to each child `<input type="radio">`. Also auto-set on the radiogroup when `description` is a string.                                                                                            |
| `aria-invalid`     | `string \| boolean`                                 | —                           | No       | Forwarded to the `role="radiogroup"` element and to each child radio input.                                                                                                                                |

All other `FlexLayoutProps` (e.g. `itemSpacing`, `padding`, `flexWrap`) are spread onto the inner `role="radiogroup"` `FlexLayout`.

#### `Radio` Props

`Radio` extends `React.HTMLProps<HTMLInputElement | HTMLDivElement>` (omitting `ref` and `onChange`).

| Prop               | Type                           | Default        | Required            | Description                                                                                                                            |
| ------------------ | ------------------------------ | -------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `value`            | `string`                       | —              | Yes (in RadioGroup) | Unique key identifying this option. Must be a string.                                                                                  |
| `children`         | `React.ReactNode`              | —              | No                  | Label content. A plain string is rendered via `TextLabel`. A React element receives a generated `id` for `aria-labelledby`.            |
| `checked`          | `boolean`                      | `false`        | No                  | Controlled checked state. Managed automatically by `RadioGroup`; do not set manually when inside a `RadioGroup`.                       |
| `onChange`         | `(newValue: string) => void`   | —              | No                  | Called with `event.currentTarget.value` when the user selects this radio. Managed automatically by `RadioGroup`.                       |
| `disabled`         | `boolean`                      | `false`        | No                  | Disables the radio. Overridden by `RadioGroup.disabled`. A group with a single child is always disabled.                               |
| `aria-disabled`    | `"true" \| "false" \| boolean` | —              | No                  | Aria-only disable (does not set the HTML `disabled` attribute). Accepts `"true"`, `"false"`, `true`, or `false`.                       |
| `additionalInfo`   | `string \| React.ReactNode`    | —              | No                  | Supporting text or node rendered below the label. String values use `TextLabel` styling. Removed automatically in `HORIZONTAL` layout. |
| `additionalInfoId` | `string`                       | Auto-generated | No                  | ID for the `additionalInfo` container. Recommended for accessibility (`aria-describedby`).                                             |
| `name`             | `string`                       | —              | No                  | HTML `name` for the radio input. Overridden by `RadioGroup.name`.                                                                      |
| `className`        | `string`                       | —              | No                  | CSS class added to the root `StackingLayout`.                                                                                          |
| `wrapperProps`     | `StackingLayoutProps`          | —              | No                  | Props applied to the root `StackingLayout` wrapper.                                                                                    |
| `error`            | `boolean`                      | —              | No                  | Surfaces as `data-error` attribute for error styling.                                                                                  |
| `errorType`        | `string`                       | —              | No                  | Surfaces as `data-error-type` attribute for error styling.                                                                             |
| `aria-label`       | `string`                       | —              | No                  | Required when `children` is not plain text (e.g. a React element) to provide an accessible label.                                      |
| `aria-describedby` | `string`                       | `""`           | No                  | Appended to the auto-generated `aria-describedby` on the input.                                                                        |
| `data-test`        | `string`                       | —              | No                  | Test ID alias on the Radio input.                                                                                                      |

### Static Members

| Member                        | Value                   | Notes                                              |
| ----------------------------- | ----------------------- | -------------------------------------------------- |
| `RadioGroup.RadioGroupLayout` | `RadioGroupLayout` enum | Preferred reference                                |
| `RadioGroup.LAYOUT`           | `RadioGroupLayout` enum | **Deprecated** — use `RadioGroup.RadioGroupLayout` |

### Runtime Constraints

- `RadioGroup` throws if it receives fewer than 1 truthy child.
- `RadioGroup` throws if any truthy child is not a `Radio` element.
- `RadioGroup` throws if any `Radio` child is missing a `value` string prop.
- A `RadioGroup` with exactly **one** child automatically checks and disables that radio (no selection needed).
- `additionalInfo` on `Radio` children is silently stripped when `layout={RadioGroup.RadioGroupLayout.HORIZONTAL}`.

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Basic Example (Accessible)

```tsx
import React, { useState } from 'react'
import {
  RadioGroup,
  Radio,
  StackingLayout,
  Paragraph,
} from '@nutanix-ui/prism-reactjs'

const MyRadioGroup = () => {
  const [selectedValue, setSelectedValue] = useState('value-1')

  return (
    <StackingLayout itemSpacing="30px">
      <RadioGroup
        name="my-radio-group-0"
        onChange={setSelectedValue}
        selectedValue={selectedValue}
        title="Basic Example Group Label"
        description="This example is fully accessible. Use as reference for implementation."
      >
        <Radio value="value-1" data-test-id="radio-element-0">
          This is a first option without additional info.
        </Radio>
        <Radio
          data-test-id="radio-element-1"
          aria-label="Manually inserted aria-label."
          value="value-2"
          additionalInfo='Add "aria-label" or "aria-labelledby" for non-text children.'
        >
          <span>I am wrapped by a span tag.</span>
        </Radio>
        <Radio
          data-test-id="radio-element-2"
          value="value-3"
          additionalInfo="Supporting info for this label."
          additionalInfoId="my-info"
        >
          I have additional supporting info.
        </Radio>
      </RadioGroup>
    </StackingLayout>
  )
}
```

#### OnChange / Disabled Children

```tsx
import React, { useState } from 'react'
import {
  RadioGroup,
  Radio,
  StackingLayout,
  Alert,
} from '@nutanix-ui/prism-reactjs'

const MyRadioGroup = () => {
  const [selectedValue, setSelectedValue] = useState('all-at-once')

  return (
    <StackingLayout style={{ maxWidth: 600 }}>
      <Alert
        inline={true}
        message="The application must handle onChange and set selectedValue. Do not set Radio.checked directly."
      />
      <RadioGroup
        name="my-radio-group-1"
        data-test-id="default"
        onChange={setSelectedValue}
        selectedValue={selectedValue}
        title="Run Jobs"
      >
        <Radio value="all-at-once" additionalInfo="Run all jobs in parallel.">
          All at once
        </Radio>
        <Radio value="auto" disabled={true}>
          Automatic
        </Radio>
        <Radio value="every-other-tuesday">Every other Tuesday</Radio>
        <Radio value="four-at-a-time">Run four at a time</Radio>
      </RadioGroup>
    </StackingLayout>
  )
}
```

#### String Title and Description

```tsx
import React, { useState } from 'react'
import { RadioGroup, Radio } from '@nutanix-ui/prism-reactjs'

const MyRadioGroup = () => {
  const [selectedValue, setSelectedValue] = useState('publicTransport')

  return (
    <RadioGroup
      name="my-radio-group-2"
      wrapperProps={{ 'data-test-id': 'with-title' }}
      onChange={setSelectedValue}
      selectedValue={selectedValue}
      title="Select a vehicle"
      description="What is your most favorite mode of transportation?"
    >
      <Radio value="publicTransport" additionalInfo="I like being green">
        Public transport
      </Radio>
      <Radio value="bicycle" additionalInfo="I like sports">
        Bicycle
      </Radio>
      <Radio value="motorbike">Motorbike</Radio>
      <Radio value="car">Car</Radio>
    </RadioGroup>
  )
}
```

#### Custom React Node Title and Description

When `title` or `description` are React nodes (not strings), supply `aria-labelledby` and `aria-describedby` manually pointing to the IDs of those elements.

```tsx
import React, { useState } from 'react'
import {
  FlexLayout,
  Paragraph,
  Radio,
  RadioGroup,
  StatusIcon,
  TextLabel,
  Tooltip,
} from '@nutanix-ui/prism-reactjs'

const MyRadioGroup = () => {
  const [selectedValue, setSelectedValue] = useState('publicTransport')

  return (
    <RadioGroup
      name="my-radio-group-3"
      onChange={setSelectedValue}
      selectedValue={selectedValue}
      title={
        <FlexLayout alignItems="baseline" itemGap="XS" id="custom-title">
          <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
            Mode of transportation
          </TextLabel>
          <StatusIcon
            type={StatusIcon.StatusIconTypes.INFO}
            aria-label="We need it to calculate your carbon footprint"
            tooltipProps={{
              oldTooltip: false,
              appearance: Tooltip.APPEARANCE.SECONDARY,
              content: 'We need it to calculate your carbon footprint',
              contentProps: { 'aria-hidden': 'true' },
            }}
          />
        </FlexLayout>
      }
      description={
        <Paragraph id="custom-description" maxLines={1}>
          Different means of transportation generate a different amount of CO2.
        </Paragraph>
      }
      aria-labelledby="custom-title"
      aria-describedby="custom-description"
    >
      <Radio value="publicTransport" additionalInfo="I like being green">
        Public transport
      </Radio>
      <Radio value="bicycle" additionalInfo="I like sports">
        Bicycle
      </Radio>
      <Radio value="motorbike">Motorbike</Radio>
      <Radio value="car">Car</Radio>
    </RadioGroup>
  )
}
```

#### All Disabled

```tsx
import React, { useState } from 'react'
import { RadioGroup, Radio } from '@nutanix-ui/prism-reactjs'

const MyRadioGroup = () => {
  const [selectedValue, setSelectedValue] = useState('all-at-once')

  return (
    <RadioGroup
      disabled={true}
      name="my-radio-group-4"
      onChange={setSelectedValue}
      selectedValue={selectedValue}
      title="No options available"
    >
      <Radio value="all-at-once" additionalInfo="Run all jobs in parallel.">
        All at once
      </Radio>
      <Radio value="one-by-one">One at a time (custom order)</Radio>
      <Radio value="auto">Automatic</Radio>
    </RadioGroup>
  )
}
```

#### Single Radio (Auto-selected and Auto-disabled)

A single-child `RadioGroup` is automatically checked and disabled. This is supported but not recommended.

```tsx
import React from 'react'
import { RadioGroup, Radio } from '@nutanix-ui/prism-reactjs'
;<RadioGroup name="my-radio-group-5" title="All alone...">
  <Radio value="only-option">Only One Option</Radio>
</RadioGroup>
```

#### Horizontal Layout

`additionalInfo` props on child radios are silently stripped in horizontal layout.

```tsx
import React, { useState } from 'react'
import { RadioGroup, Radio } from '@nutanix-ui/prism-reactjs'

const MyRadioGroup = () => {
  const [selectedValue, setSelectedValue] = useState('all-at-once')

  return (
    <RadioGroup
      name="my-radio-group-6"
      layout={RadioGroup.RadioGroupLayout.HORIZONTAL}
      onChange={setSelectedValue}
      selectedValue={selectedValue}
      title="Execution mode"
      description="This is a test description"
    >
      <Radio value="all-at-once" additionalInfo="Ignored in horizontal layout.">
        All at once
      </Radio>
      <Radio wrapperProps={{ 'data-test-id': 'radio-2' }} value="one-by-one">
        One at a time
      </Radio>
      <Radio disabled={true} value="auto">
        Automatic
      </Radio>
    </RadioGroup>
  )
}
```

#### Form Integration (`FormItemRadioGroup`)

Use `FormItemRadioGroup` instead of a bare `RadioGroup` when the group is inside a Prism `Form`. It wraps `RadioGroup` with `FormItemProvider` to supply a label, help text, error state, and optional `formHelper` validation.

```tsx
import React, { useState } from 'react'
import {
  FormItemRadioGroup,
  Radio,
  RadioGroup,
} from '@nutanix-ui/prism-reactjs'

const BasicFormItemRadioGroupExample = () => {
  const [selectedValue, setSelectedValue] = useState('option-1')

  return (
    <FormItemRadioGroup
      id="my-form-radio-group"
      label="Select an option"
      selectedValue={selectedValue}
      onChange={setSelectedValue}
    >
      <Radio value="option-1">Option 1</Radio>
      <Radio value="option-2">Option 2</Radio>
      <Radio value="option-3">Option 3</Radio>
    </FormItemRadioGroup>
  )
}
```

`FormItemRadioGroup` accepts all `RadioGroupProps` (except `title` and `errorType`, which are managed internally) plus:

| Prop                    | Type              | Required | Description                                                                                                                         |
| ----------------------- | ----------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `id`                    | `string`          | Yes      | Links the label to the radiogroup via `aria-labelledby="${id}-label"`.                                                              |
| `label`                 | `React.ReactNode` | Yes      | Rendered by `FormItemProvider` as the visible group label.                                                                          |
| `helpText`              | `React.ReactNode` | No       | Help or error message shown below the group.                                                                                        |
| `error`                 | `boolean`         | No       | Toggles error styling.                                                                                                              |
| `secondaryLabel`        | `React.ReactNode` | No       | Secondary label rendered by `FormItemProvider`.                                                                                     |
| `statusIconProps`       | `object`          | No       | Props for the status icon in the label area.                                                                                        |
| `hideHelpTextIcon`      | `boolean`         | No       | Hides the icon prepended to `helpText`.                                                                                             |
| `helpTextProps`         | `object`          | No       | Additional props for the help text element.                                                                                         |
| `formHelper`            | `FormHelper`      | No       | Validation object from a Prism `Form` component. Provides `errors`, `values`, `handleChange`, `handleValidation`, and `requireMap`. |
| `formItemProviderProps` | `object`          | No       | Props passed directly to `FormItemProvider`.                                                                                        |

### Accessibility Guidelines

- **Labeling:** All `RadioGroup`s must have a descriptive label. Pass a `title` string (auto-sets `aria-labelledby`) or provide `wrapperProps['aria-label']` as a hidden label when a visible title is not present.
- **Description:** Pass a `description` string to auto-set `aria-describedby` on the radiogroup. For custom React node descriptions, set `aria-describedby` manually with the node's `id`.
- **Custom React node titles:** When `title` is a React node (not a string), automatic `aria-labelledby` is not set. Add `id` to the title element and pass `aria-labelledby` to `RadioGroup`.
- **Non-text labels on Radio:** When `children` is a React element (not a string), set `aria-label` on the `Radio` manually.
- **`additionalInfo` accessibility:** Provide `additionalInfoId` on each `Radio` that uses `additionalInfo` to ensure the supporting text is linked via `aria-describedby`.
- **Focus order:** Avoid placing focusable elements (links, buttons, tooltips) inside radio labels — this breaks the natural keyboard tab order.
- **Disabled inputs:** Browser focus behavior for disabled radios is native and may differ across browsers; see Prism's [DisabledInputsText] guidelines.
- **`aria-disabled` vs `disabled`:** `aria-disabled="true"` marks the radio as unavailable to screen readers without preventing focus, whereas `disabled` removes it from tab order. Use `aria-disabled` when a tooltip needs to be accessible on a disabled radio.

### Keyboard Behaviour

- `Tab` moves focus into the radio group (to the checked radio, or to the first radio if none are checked).
- `Arrow keys` (`↑` `↓` / `←` `→`) cycle selection within the group.
- `Space` selects the focused radio.
- Cross-browser focus behaviour on `Tab` (moving to the next focusable element after the group) is native and may vary.

### Usage Notes

- Prefer `RadioGroup.RadioGroupLayout.HORIZONTAL` / `RadioGroup.RadioGroupLayout.VERTICAL` over raw strings.
- Do not set `Radio.checked` directly when using `RadioGroup` — let the group manage selection via `selectedValue` and `onChange`.
- Use `FormItemRadioGroup` (not bare `RadioGroup`) when the group is part of a Prism `Form` for automatic label, help text, and error wiring.
- Keep labels, help text, and validation visible and persistent for form controls; use `FormItem*` wrappers where available.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.

<!-- SOURCE-API-END -->
