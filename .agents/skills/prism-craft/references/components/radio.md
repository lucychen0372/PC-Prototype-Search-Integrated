# Radio

## Figma

- **Library name:** Radio with Text (page: N/A, frame: Radio with Text)

## React

Import: `import { Radio, RadioGroup } from '@nutanix-ui/prism-reactjs'`

**Always use `Radio` inside a `RadioGroup`.** The `RadioGroup` manages `checked`, `name`, and `onChange` for all child radios; you do not set those props yourself.

### TSX Examples

#### Minimal working example (vertical, with title)

```tsx
import React, { useState } from 'react'
import { Radio, RadioGroup } from '@nutanix-ui/prism-reactjs'

const MyGroup = () => {
  const [selectedValue, setSelectedValue] = useState('option-a')

  return (
    <RadioGroup
      name="my-group"
      title="Select an option"
      selectedValue={selectedValue}
      onChange={(nextValue) => setSelectedValue(nextValue)}
    >
      <Radio value="option-a">Option A</Radio>
      <Radio value="option-b">Option B</Radio>
      <Radio value="option-c" disabled={true}>
        Option C (disabled)
      </Radio>
    </RadioGroup>
  )
}
```

#### Horizontal layout

```tsx
<RadioGroup
  name="layout-group"
  layout={RadioGroup.RadioGroupLayout.HORIZONTAL}
  selectedValue={selectedValue}
  onChange={setSelectedValue}
  title="Horizontal Layout"
>
  <Radio value="a">Option A</Radio>
  <Radio value="b">Option B</Radio>
  <Radio value="c">Option C</Radio>
</RadioGroup>
```

> **Note:** In horizontal layout, any `additionalInfo` on child `Radio` components is automatically suppressed.

#### With additionalInfo (string)

```tsx
<RadioGroup
  name="with-info"
  title="Run Jobs"
  selectedValue={selectedValue}
  onChange={setSelectedValue}
>
  <Radio value="all-at-once" additionalInfo="Run all jobs in parallel.">
    All at once
  </Radio>
  <Radio value="one-by-one" additionalInfo="Run each job sequentially.">
    One at a time
  </Radio>
</RadioGroup>
```

#### With additionalInfo (React node) and additionalInfoId

```tsx
<RadioGroup
  name="node-info"
  title="Configuration"
  selectedValue={selectedValue}
  onChange={setSelectedValue}
>
  <Radio
    value="advanced"
    additionalInfo={
      <StackingLayout>
        <FormItemInput
          id="hostname"
          label="Hostname"
          placeholder="example.com"
        />
      </StackingLayout>
    }
    additionalInfoId="advanced-info"
  >
    Advanced
  </Radio>
  <Radio value="basic">Basic</Radio>
</RadioGroup>
```

#### Radio standalone with tooltip (aria-disabled pattern)

```tsx
import { Radio, StackingLayout, Tooltip } from '@nutanix-ui/prism-reactjs'
;<StackingLayout>
  <Tooltip
    appearance={Tooltip.APPEARANCE.SECONDARY}
    content="Tooltip for radio element"
    placement="top-start"
    oldTooltip={false}
  >
    <Radio name="standalone" value="a">
      Default
    </Radio>
  </Tooltip>
  <Tooltip
    appearance={Tooltip.APPEARANCE.SECONDARY}
    content="This radio is disabled"
    placement="top-start"
    oldTooltip={false}
  >
    <Radio checked={true} aria-disabled="true" name="standalone-disabled">
      Disabled Selected Radio
    </Radio>
  </Tooltip>
</StackingLayout>
```

#### Custom title and description (React nodes)

When passing React nodes as `title` or `description`, you must manually provide IDs and wire `aria-labelledby` / `aria-describedby` on the `RadioGroup`.

```tsx
<RadioGroup
  name="custom-title-group"
  selectedValue={selectedValue}
  onChange={setSelectedValue}
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
    <Paragraph id="custom-description">
      Select your most frequent mode of transportation.
    </Paragraph>
  }
  aria-labelledby="custom-title"
  aria-describedby="custom-description"
>
  <Radio value="transit" additionalInfo="I like being green">
    Public transport
  </Radio>
  <Radio value="bicycle" additionalInfo="I like sports">
    Bicycle
  </Radio>
  <Radio value="car">Car</Radio>
</RadioGroup>
```

### Anti-patterns

- Don't use individual `Radio` components without `RadioGroup` — use `RadioGroup` for accessibility compliance
- Don't set `checked`, `name`, or `onChange` on `<Radio>` children inside `RadioGroup` — the group manages those automatically
- Don't put focusable elements (links, buttons, tooltips) inside a radio label — it breaks the tab order for keyboard users
- Don't use horizontal layout when options have `additionalInfo` — it is silently stripped
- Don't use `RadioGroup` with only a single child — the single radio is auto-selected and disabled

<!-- SOURCE-API-START -->

### Import

```tsx
import { Radio, RadioGroup } from '@nutanix-ui/prism-reactjs'
// Also available:
import { FormItemRadioGroup } from '@nutanix-ui/prism-reactjs'
```

### Props Interfaces

#### `RadioProps`

Extends: `Omit<React.HTMLProps<HTMLInputElement | HTMLDivElement>, 'ref' | 'onChange'>`

All standard HTML input attributes (except `ref` and `onChange`) are forwarded to the underlying `<input type="radio">` element.

| Prop                   | Type                                                      | Default        | Required                | Description                                                                                                                                                                                                  |
| ---------------------- | --------------------------------------------------------- | -------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `value`                | `string`                                                  | —              | Yes (inside RadioGroup) | Unique string key identifying this radio. **Must be unique** within the group.                                                                                                                               |
| `children`             | `React.ReactNode`                                         | —              | No                      | Label content. A plain `string` is automatically styled with `TextLabel`. A React element is rendered as-is (author is responsible for styling).                                                             |
| `checked`              | `boolean`                                                 | `false`        | No                      | Whether this radio is selected. **Managed by `RadioGroup`**; do not set manually when inside a group.                                                                                                        |
| `onChange`             | `(newValue: string) => void`                              | —              | No                      | Called with the new value when the radio is clicked. **Managed by `RadioGroup`**; do not set manually when inside a group.                                                                                   |
| `disabled`             | `boolean`                                                 | `false`        | No                      | Disables the radio. When `true`, `onChange` is never called.                                                                                                                                                 |
| `name`                 | `string`                                                  | —              | No                      | HTML `name` attribute. Managed automatically by `RadioGroup`; only required when using `Radio` standalone.                                                                                                   |
| `additionalInfo`       | `React.ReactNode`                                         | —              | No                      | Extra content rendered below the label. A `string` is styled as a small secondary `TextLabel`. A React node is rendered as-is (author is responsible for styling). Ignored in `RadioGroupLayout.HORIZONTAL`. |
| `additionalInfoId`     | `string`                                                  | auto-generated | No                      | Custom `id` applied to the `additionalInfo` container. **Recommended** for a11y — the component adds this to `aria-describedby` on the `<input>`.                                                            |
| `wrapperProps`         | `StackingLayoutProps`                                     | —              | No                      | Props forwarded to the top-level `StackingLayout` wrapper element.                                                                                                                                           |
| `className`            | `string`                                                  | —              | No                      | Custom CSS class added to the root element.                                                                                                                                                                  |
| `error`                | `boolean`                                                 | —              | No                      | Error state. Sets `data-error` attribute on the wrapper for CSS styling. Forwarded automatically by `FormItemRadioGroup`.                                                                                    |
| `errorType`            | `string`                                                  | —              | No                      | Error type. Sets `data-error-type` attribute on the wrapper. Forwarded automatically by `FormItemRadioGroup`.                                                                                                |
| `aria-disabled`        | `AriaDisabledType` (`"true" \| "false" \| true \| false`) | —              | No                      | Use instead of `disabled` when the radio should remain focusable and visible to screen readers (e.g. inside a `Tooltip`). When `"true"` / `true`, `onChange` is also suppressed.                             |
| `aria-describedby`     | `string`                                                  | —              | No                      | Space-separated list of IDs. Merged with the auto-generated `additionalInfo` ID.                                                                                                                             |
| `aria-label`           | `string`                                                  | —              | No                      | Accessible label for the input, required when `children` is not a plain text string.                                                                                                                         |
| `data-test`            | `string`                                                  | —              | No                      | Test ID on the input element.                                                                                                                                                                                |
| `id`                   | `string`                                                  | auto-generated | No                      | HTML `id` for the `<input>`. Auto-generated with `uniqueId('radio-')` if not provided.                                                                                                                       |
| `componentDisplayName` | `string`                                                  | `'Radio'`      | No                      | `@ignore` — internal use only.                                                                                                                                                                               |

---

#### `RadioGroupProps`

Extends: `Omit<FlexLayoutProps, 'onChange' | 'title'>` — all `FlexLayout` props are accepted and forwarded to the inner `role="radiogroup"` element.

| Prop               | Type                                          | Default                     | Required | Description                                                                                                                                                                                     |
| ------------------ | --------------------------------------------- | --------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`         | `React.ReactNode`                             | —                           | **Yes**  | One or more `<Radio>` elements. All children must be `Radio`; each must have a unique `value` string. Falsy children (`null`, `undefined`, `false`, `0`) are filtered out.                      |
| `selectedValue`    | `string`                                      | `''`                        | **Yes**  | The `value` of the currently selected `Radio`.                                                                                                                                                  |
| `onChange`         | `(nextSelectedValue: string) => void`         | —                           | No       | Called with the new value when a radio is selected. The parent must update `selectedValue` in response.                                                                                         |
| `name`             | `string`                                      | —                           | No       | HTML `name` shared across all child radio inputs. Should be unique per page when multiple `RadioGroup` components exist.                                                                        |
| `layout`           | `RadioGroupLayout`                            | `RadioGroupLayout.VERTICAL` | No       | Layout direction. See `RadioGroupLayout` enum below.                                                                                                                                            |
| `title`            | `string \| React.ReactNode`                   | —                           | No       | Group heading. A `string` is rendered as `<Title size="h3">` and auto-wired to `aria-labelledby`. A React node is rendered as-is — you must provide an `id` and set `aria-labelledby` manually. |
| `titleTag`         | `TitleSizes` (`'h1' \| 'h2' \| 'h3' \| 'h4'`) | —                           | No       | Override the heading tag when `title` is a `string`. Only valid when `title` is a string; not allowed when `title` is a React node.                                                             |
| `description`      | `React.ReactNode`                             | —                           | No       | Descriptive text below the title. A `string` is auto-wired to `aria-describedby`. A React node is rendered as-is — provide an `id` and set `aria-describedby` manually.                         |
| `disabled`         | `boolean`                                     | —                           | No       | Disables **all** radios in the group. Overrides individual `Radio.disabled` props.                                                                                                              |
| `wrapperProps`     | `FlexLayoutProps`                             | —                           | No       | Props forwarded to the outer `FlexLayout` wrapper (not the `role="radiogroup"` element).                                                                                                        |
| `className`        | `string`                                      | —                           | No       | Custom CSS class applied to both the wrapper and the inner group element.                                                                                                                       |
| `id`               | `string`                                      | auto-generated              | No       | HTML `id` for the group. Used to generate stable IDs for title and description.                                                                                                                 |
| `error`            | `boolean`                                     | —                           | No       | Error state from `FormItemProvider`. Forwarded to each child `Radio` and consumed so it is not passed to the DOM.                                                                               |
| `errorType`        | `string`                                      | —                           | No       | Error type from `FormItemProvider`. Forwarded to each child `Radio` and consumed.                                                                                                               |
| `aria-describedby` | `string`                                      | —                           | No       | Forwarded to each child `<input type="radio">`.                                                                                                                                                 |
| `aria-invalid`     | `string \| boolean`                           | —                           | No       | Forwarded to the `role="radiogroup"` element and each child input.                                                                                                                              |
| `aria-labelledby`  | `string`                                      | —                           | No       | Overrides the auto-generated label association when a custom React-node `title` is used.                                                                                                        |

---

### Enums & Static Values

#### `RadioGroupLayout`

Exported from `RadioGroup` as a static property.

```tsx
import { RadioGroup } from '@nutanix-ui/prism-reactjs'

RadioGroup.RadioGroupLayout.HORIZONTAL // 'horizontal'
RadioGroup.RadioGroupLayout.VERTICAL // 'vertical'

// Deprecated alias — use RadioGroupLayout instead
RadioGroup.LAYOUT.HORIZONTAL
RadioGroup.LAYOUT.VERTICAL
```

You can also import the enum directly (it is not re-exported from the package root):

```tsx
import { RadioGroupLayout } from '@nutanix-ui/prism-reactjs/components/v2/Radio/RadioGroup'
```

---

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### All radio states (standalone)

```tsx
import {
  StackingLayout,
  Radio,
  FlexLayout,
  TextLabel,
  WarningStatusIcon,
} from '@nutanix-ui/prism-reactjs'
;<StackingLayout itemSpacing="15px">
  <Radio id="radio-default" name="abc" value="a">
    Default
  </Radio>
  <Radio id="radio-disabled" disabled={true}>
    Disabled
  </Radio>
  <Radio
    id="radio-disabled-custom"
    disabled={true}
    additionalInfo="More info goes here"
  >
    <FlexLayout itemSpacing="10px" alignItems="center">
      <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>Disabled</TextLabel>
      <WarningStatusIcon aria-hidden="false" aria-label="Warning" />
    </FlexLayout>
  </Radio>
  <Radio id="radio-selected" name="abc" value="b" checked={true}>
    Selected
  </Radio>
  <Radio id="radio-disabled-selected" checked={true} disabled={true}>
    Disabled Selected
  </Radio>
  <Radio id="radio-aria-disabled-selected" checked={true} aria-disabled="true">
    Aria Disabled Selected
  </Radio>
</StackingLayout>
```

#### Using additionalInfo with all variants

```tsx
import React, { useState } from 'react'
import { StackingLayout, Radio, FormItemInput } from '@nutanix-ui/prism-reactjs'

const AdditionalInfoExample = () => {
  const [selectedValue, setSelectedValue] = useState<string>()

  const additionalInfoNode = (
    <StackingLayout>
      <FormItemInput id="fullname" label="Name" placeholder="John Doe" />
      <FormItemInput
        id="priority"
        label="Project Priority"
        placeholder="High"
      />
    </StackingLayout>
  )

  const multilineText =
    'When a long string of text is passed in, it will automatically apply multiline spacing and formatting.'

  return (
    <StackingLayout>
      <Radio
        additionalInfo="Additional text goes here"
        name="additional-info-radio"
        value="option1"
        checked={selectedValue === 'option1'}
        onChange={setSelectedValue}
      >
        Using Additional Info
      </Radio>
      <Radio
        additionalInfo="This is selected style"
        name="additional-info-radio"
        value="option2"
        checked={true}
        onChange={setSelectedValue}
      >
        Using Additional Info (checked)
      </Radio>
      <Radio
        additionalInfo="This is disabled style"
        name="additional-info-radio"
        value="option3"
        checked={selectedValue === 'option3'}
        onChange={setSelectedValue}
        disabled={true}
      >
        Using Additional Info (disabled)
      </Radio>
      <Radio
        additionalInfo={multilineText}
        value="option4"
        checked={selectedValue === 'option4'}
        onChange={setSelectedValue}
      >
        Passing in Multiline Text
      </Radio>
      <Radio
        additionalInfo={additionalInfoNode}
        additionalInfoId="react-node-info"
        name="additional-info-radio"
        value="option5"
        checked={selectedValue === 'option5'}
        onChange={setSelectedValue}
      >
        Passing in a React node for additionalInfo
      </Radio>
    </StackingLayout>
  )
}
```

#### RadioGroup with single child (auto-selected and disabled)

```tsx
<RadioGroup name="single" title="All alone...">
  <Radio value="only-option">Only One Option</Radio>
</RadioGroup>
```

### Accessibility Notes

- **Always prefer `RadioGroup`** over managing individual `Radio` components — the group provides correct `role="radiogroup"`, `aria-labelledby`, and `aria-describedby` wiring automatically.
- When `title` is a plain `string`, `RadioGroup` sets `aria-labelledby` automatically. When passing a React node as `title`, you must add an `id` to the node and pass `aria-labelledby` to `RadioGroup` manually.
- When `description` is a plain `string`, `RadioGroup` sets `aria-describedby` automatically. Same manual wiring applies for React-node descriptions.
- When using `additionalInfo`, always supply `additionalInfoId` for a11y compliance — without it the ID is auto-generated but may not be stable across renders.
- Use `aria-disabled="true"` instead of `disabled` when wrapping a `Radio` in a `Tooltip`, so the element remains focusable and the tooltip is reachable by keyboard users.
- Avoid placing focusable elements (links, buttons, tooltips on icons) inside a radio label — this breaks the natural tab order for keyboard users.
- When `children` is not a plain string (e.g. a `<span>`), you must set `aria-label` on the `Radio` to give screen readers an accessible name.

### Keyboard Behaviour

- **Tab**: moves focus into the radio group (to the selected radio, or the first if none selected).
- **Arrow keys (Up/Down or Left/Right)**: cycle selection within the group — native browser behaviour.
- **Space**: selects the focused radio.
- Behaviour across browsers is native; some browsers move focus without selecting on arrow keys.

### Usage Notes

- Prefer documented enum/static values such as `RadioGroup.RadioGroupLayout.HORIZONTAL` over raw strings.
- Keep labels, help text, and validation visible and persistent; use `FormItemRadioGroup` for form-integrated usage with error state wiring.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) on `wrapperProps` instead of custom CSS for layout and spacing.
- A `RadioGroup` with a single child auto-selects and disables that child — this is supported but not recommended.
- `selectedValue` defaults to `''`; always provide an initial value matching one of the child `Radio.value` props to avoid an uncontrolled-to-controlled transition.

<!-- SOURCE-API-END -->
