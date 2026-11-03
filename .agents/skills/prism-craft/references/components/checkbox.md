# Checkbox

## Figma

- **Library name:** Checkbox with Text (page: N/A, frame: Checkbox with Text)
- **Also matches:** Checkbox Group, Rounded Checkbox, Toggle, Toggle with Text

## React

Import: `import { Checkbox } from '@nutanix-ui/prism-reactjs'`

### TSX Examples

```tsx
// Basic checkbox
<Checkbox
  id="terms"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
  label="I agree to the terms"
/>

// Toggle switch (renders role="switch", does NOT support custom color)
<Checkbox
  id="dark-mode"
  type={Checkbox.CheckboxTypes.TOGGLE}
  checked={darkMode}
  onChange={(e) => setDarkMode(e.target.checked)}
  label="Dark Mode"
/>

// Checkbox group
<StackingLayout itemGap="S">
  <TextLabel>Capabilities</TextLabel>
  {capabilities.map((cap) => (
    <Checkbox
      key={cap.key}
      id={`cap-${cap.key}`}
      checked={selected.includes(cap.key)}
      onChange={() => toggleCapability(cap.key)}
      label={cap.label}
    />
  ))}
</StackingLayout>

// Indeterminate (partial) check — pass checked=true AND type=PARTIAL_CHECK
<Checkbox
  id="select-all"
  type={
    someChecked && !allChecked
      ? Checkbox.CheckboxTypes.PARTIAL_CHECK
      : undefined
  }
  checked={allChecked}
  onChange={toggleAll}
  label="Select All"
/>

// Rounded variant (discouraged — easily confused with Radio)
<Checkbox
  id="rounded"
  type={Checkbox.CheckboxTypes.ROUNDED}
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
  label="Rounded Checkbox"
/>

// Multi-line label
<Checkbox
  id="multi"
  label="Very long label that wraps across multiple lines..."
  checked={checked}
  multiLine={true}
  onChange={(e) => setChecked(e.target.checked)}
/>

// Custom color (hex / named / rgb / CSS design token — not supported on TOGGLE)
<Checkbox
  id="custom-color"
  color="var(--color-background-success)"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
  label="Success color"
/>

// Nested checkboxes (children prop)
<Checkbox
  id="parent"
  label="Parent"
  checked={parentChecked}
  onChange={(e) => setParentChecked(e.target.checked)}
>
  <Checkbox
    id="child"
    label="Child"
    checked={childChecked}
    disabled={!parentChecked}
    onChange={(e) => setChildChecked(e.target.checked)}
  />
</Checkbox>

// With innerRef
const ref = React.createRef<HTMLInputElement>();
<Checkbox id="cb" label="Checkbox" innerRef={ref} onChange={onChange} />

// aria-disabled (keeps element focusable, unlike disabled)
<Checkbox
  id="aria-cb"
  aria-disabled={true}
  checked={false}
  label="Aria Disabled"
/>
```

### Anti-patterns

- Don't use `<input type="checkbox">` -- use `Checkbox`
- `id` is required -- every checkbox must have one
- Don't forget `label` prop for accessibility
- Don't use `disabled` and `aria-disabled` together -- `disabled` is ignored when `aria-disabled` is set
- Don't pass `color` with `type={Checkbox.CheckboxTypes.TOGGLE}` -- the toggle variant ignores the `color` prop

<!-- SOURCE-API-START -->

### Import

```tsx
import { Checkbox } from '@nutanix-ui/prism-reactjs'
// Form-integrated wrapper:
import { FormItemCheckbox } from '@nutanix-ui/prism-reactjs'
```

### Enums / Constants

#### `CheckboxTypes`

Accessed as `Checkbox.CheckboxTypes` (or the deprecated alias `Checkbox.CHECKBOX_TYPES`).

| Key             | Value             | Notes                                                                                |
| --------------- | ----------------- | ------------------------------------------------------------------------------------ |
| `DEFAULT`       | `'default'`       | Standard square checkbox                                                             |
| `PARTIAL_CHECK` | `'partial-check'` | Indeterminate state; pass `checked={true}` alongside this type to show the dash mark |
| `TOGGLE`        | `'toggle'`        | Renders as a toggle switch; adds `role="switch"`; does **not** support `color` prop  |
| `ROUNDED`       | `'rounded'`       | Rounded square; not recommended (visually similar to Radio)                          |

### Props Interfaces

#### `CheckboxProps`

Extends: `Omit<React.HTMLProps<HTMLInputElement>, 'label' | 'ref'>`

| Prop                    | Type                                                     | Default                 | Required | Description                                                                                                                                                                                                                                                                  |
| ----------------------- | -------------------------------------------------------- | ----------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                    | `string`                                                 | —                       | Yes      | Unique id. Used as the `htmlFor` on the internal `<label>`.                                                                                                                                                                                                                  |
| `label`                 | `React.ReactNode`                                        | —                       | No       | Checkbox label. String values are wrapped in `<span>`; non-string nodes are rendered as-is (caller is responsible for disabled styling on custom nodes).                                                                                                                     |
| `checked`               | `boolean`                                                | `false`                 | No       | Whether the checkbox is selected.                                                                                                                                                                                                                                            |
| `type`                  | `CheckboxTypes`                                          | `CheckboxTypes.DEFAULT` | No       | Variant. See `CheckboxTypes` table above.                                                                                                                                                                                                                                    |
| `disabled`              | `boolean`                                                | `false`                 | No       | Disables the checkbox and removes focus/tab. Do not combine with `aria-disabled`.                                                                                                                                                                                            |
| `aria-disabled`         | `AriaDisabledType`                                       | —                       | No       | Disables interactions while keeping the element focusable. Takes precedence over `disabled` — `disabled` is ignored when this prop is set.                                                                                                                                   |
| `readOnly`              | `boolean`                                                | `false`                 | No       | Marks the underlying input as read-only. Prevents `onChange` from firing. Sets `aria-readonly` on the input.                                                                                                                                                                 |
| `onChange`              | `(event: React.ChangeEvent<HTMLInputElement>) => void`   | —                       | No       | Fired when the value changes. Not called when `disabled` or `aria-disabled` or `readOnly` is active.                                                                                                                                                                         |
| `onMouseDown`           | `(event: React.MouseEvent<HTMLDivElement>) => void`      | —                       | No       | Mouse-down on the wrapper div.                                                                                                                                                                                                                                               |
| `onMouseEnter`          | `(event: React.MouseEvent<HTMLDivElement>) => void`      | —                       | No       | Mouse-enter on the wrapper div.                                                                                                                                                                                                                                              |
| `onMouseLeave`          | `(event: React.MouseEvent<HTMLDivElement>) => void`      | —                       | No       | Mouse-leave on the wrapper div.                                                                                                                                                                                                                                              |
| `color`                 | `string`                                                 | —                       | No       | Custom icon color. Accepts hex (`#8A77ED`), named (`aqua`), RGB (`rgb(255,80,0)`), RGBA, HSL, or a CSS design token (`var(--color-background-success)`). **Ignored on `TOGGLE` type.** Invalid values or missing tokens fall back to browser blue and log a console warning. |
| `multiLine`             | `boolean`                                                | `false`                 | No       | Adjusts label line-height for multi-line labels.                                                                                                                                                                                                                             |
| `animation`             | `boolean`                                                | `true`                  | No       | Enables/disables the check-mark animation. Automatically disabled during mouse press.                                                                                                                                                                                        |
| `children`              | `React.ReactNode`                                        | —                       | No       | Nested checkboxes or content. A string child is rendered as a secondary `TextLabel`. Any other node is rendered in a `checkbox-nested-content` div. The `disabled` class is applied when `disabled={true}`.                                                                  |
| `className`             | `string`                                                 | —                       | No       | Extra CSS class added to the wrapper div.                                                                                                                                                                                                                                    |
| `wrapperProps`          | `DataWrapperProps<React.HTMLAttributes<HTMLDivElement>>` | —                       | No       | Additional props forwarded to the top-level wrapper `<div>` (e.g. `data-test-id`).                                                                                                                                                                                           |
| `tabIndex`              | `number`                                                 | `0`                     | No       | Tab index of the underlying `<input>`.                                                                                                                                                                                                                                       |
| `innerRef`              | `React.Ref<HTMLInputElement>`                            | —                       | No       | Ref forwarded to the inner `<input>` element.                                                                                                                                                                                                                                |
| `error`                 | `boolean`                                                | —                       | No       | Error state. Surfaced as `data-error` attribute on the wrapper for CSS styling.                                                                                                                                                                                              |
| `errorType`             | `string`                                                 | —                       | No       | Error type string. Surfaced as `data-error-type` attribute on the wrapper.                                                                                                                                                                                                   |
| `data-test`             | `string`                                                 | —                       | No       | Test selector forwarded to the inner input element via spread props.                                                                                                                                                                                                         |
| `onPointerEnterCapture` | `any`                                                    | —                       | No       | Compatibility shim for React 16 types/React 18 conflict. Remove when library upgrades to React 18 build.                                                                                                                                                                     |
| `onPointerLeaveCapture` | `any`                                                    | —                       | No       | See above.                                                                                                                                                                                                                                                                   |

All remaining props from `React.HTMLProps<HTMLInputElement>` (except `label` and `ref`) are spread onto the underlying `<input>` element.

### Static Members

| Member                    | Value           | Notes                                |
| ------------------------- | --------------- | ------------------------------------ |
| `Checkbox.CheckboxTypes`  | `CheckboxTypes` | Preferred accessor                   |
| `Checkbox.CHECKBOX_TYPES` | `CheckboxTypes` | **Deprecated** — use `CheckboxTypes` |

### Behaviour Notes

- **Indeterminate state:** Set `checked={true}` and `type={Checkbox.CheckboxTypes.PARTIAL_CHECK}`. The component sets `node.indeterminate = true` on the DOM input via `useLayoutEffect`. This is re-asserted on every render because browsers clear `indeterminate` on native clicks.
- **Toggle keyboard:** The `TOGGLE` variant wraps the native `onKeyDown` with `handleFocusAction` (Space/Enter activate). `role="switch"` is set on the input.
- **Custom color states:** The `color` prop is adjusted automatically for hover (darken/lighten 20%), pressed (30%), and disabled (alpha 0.3) states. Dark-theme detection is done via the Prism theme context; design tokens are resolved through `ThemeWrapperContext`.
- **Nested children:** When `children` is provided, a `data-checkbox-nested` attribute is set on the wrapper. String children render as a styled `TextLabel`; non-string children render inside a plain `div`. The `disabled` CSS class is mirrored to both containers.
- **`readOnly`:** Prevents `onChange` from firing (same guard as `disabled`), sets `aria-readonly` on the input. Use for controlled display-only states.

### Accessibility

- Each `Checkbox` must have a unique `label` per page — duplicate labels are often skipped by screen readers.
- Prefer `aria-disabled` over `disabled` when the checkbox should remain focusable/discoverable (e.g. inside a form where the user might need to read why it is disabled).
- Do not use `disabled` and `aria-disabled` simultaneously.
- The `ROUNDED` type is not recommended — it is easily confused with a Radio button by sighted and assistive-technology users.

---

## FormItemCheckbox

`FormItemCheckbox` wraps `Checkbox` with `FormItemProvider` for use inside Prism `Form` layouts. It adds `helpText`, `secondaryLabel`, validation plumbing, and a `StatusIcon` slot.

### Import

```tsx
import { FormItemCheckbox } from '@nutanix-ui/prism-reactjs'
```

### `FormItemCheckboxProps`

Extends: `Omit<CheckboxProps, 'errorType'>` and `FormItemProviderProps`

| Prop                    | Type                                                             | Default | Required | Description                                                                                                                       |
| ----------------------- | ---------------------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `id`                    | `string`                                                         | —       | Yes      | Unique field id. Also used as the `formHelper` key.                                                                               |
| `label`                 | `React.ReactNode`                                                | —       | No       | Forwarded directly to the inner `Checkbox` label (beside the control). Does **not** render in the provider label column.          |
| `secondaryLabel`        | `React.ReactNode`                                                | —       | No       | Optional secondary label rendered in the provider label column.                                                                   |
| `helpText`              | `React.ReactNode`                                                | —       | No       | Help/validation text below the control. Styled red when `error={true}`.                                                           |
| `helpTextProps`         | `FlexItemProps & { isTruncated?: boolean; truncateProps?: ... }` | —       | No       | Additional props forwarded to the help text `FlexItem`.                                                                           |
| `hideHelpTextIcon`      | `boolean`                                                        | `false` | No       | Hides the default warning/info icon next to `helpText`.                                                                           |
| `statusIconProps`       | `StatusIconProps`                                                | —       | No       | Props for an optional `StatusIcon` rendered next to the label. Not read by VoiceOver.                                             |
| `formHelper`            | `FormHelper`                                                     | —       | No       | Validation object provided by the `Form` render-prop. Populates `checked`, `error`, and `helpText` from form state automatically. |
| `formItemProviderProps` | `StackingLayoutProps`                                            | `{}`    | No       | Additional props forwarded to the outer `StackingLayout` wrapper (always receives `className="checkbox-wrapper"`).                |
| `error`                 | `boolean`                                                        | —       | No       | Overrides error state when not using `formHelper`.                                                                                |
| `children`              | `React.ReactNode`                                                | —       | No       | Nested `Checkbox` elements (same semantics as `Checkbox` `children`).                                                             |

All other `CheckboxProps` (except `errorType`) are forwarded to the inner `Checkbox`.

### FormItemCheckbox Examples

```tsx
// Standalone (no Form)
import { FormItemCheckbox } from '@nutanix-ui/prism-reactjs'

const [checked, setChecked] = useState(false)
;<FormItemCheckbox
  id="terms"
  label="I agree to the terms and conditions"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
  helpText="Optional help text"
/>
```

```tsx
// With Form validation
import {
  Form,
  FormSection,
  FormItemCheckbox,
  Button,
} from '@nutanix-ui/prism-reactjs'

const validations = {
  terms: {
    [Form.VALIDATION_RULE.REQUIRED]: true,
    message: 'You must agree to the terms',
  },
}

;<Form validations={validations} onSubmit={(values) => console.log(values)}>
  {(formHelper) => (
    <FormSection>
      <FormItemCheckbox
        id="terms"
        label="I agree to the terms and conditions"
        formHelper={formHelper}
      />
      <Button onClick={formHelper.handleSubmit}>Submit</Button>
    </FormSection>
  )}
</Form>
```

```tsx
// Nested checkboxes inside FormItemCheckbox
import { FormItemCheckbox, Checkbox } from '@nutanix-ui/prism-reactjs'
;<FormItemCheckbox
  id="parent"
  label="Email me product updates"
  checked={parentChecked}
  onChange={(e) => setParentChecked(e.target.checked)}
  helpText="Nested levels apply when this option is enabled."
>
  <Checkbox
    id="child-1"
    label="Weekly digest"
    checked={child1}
    disabled={!parentChecked}
    onChange={(e) => setChild1(e.target.checked)}
  />
  <Checkbox
    id="child-2"
    label="Product announcements"
    checked={child2}
    disabled={!parentChecked}
    onChange={(e) => setChild2(e.target.checked)}
  />
</FormItemCheckbox>
```

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### All Checkbox States (Default, Toggle, Rounded)

```tsx
import { Checkbox, StackingLayout, Title } from '@nutanix-ui/prism-reactjs';

// Default states
<StackingLayout itemSpacing="10px" itemDisplay="block">
  <Checkbox id="pc1" checked={false} label="Unchecked" />
  <Checkbox id="pc2" checked={true} label="Checked" />
  <Checkbox id="pc3" checked={true} type={Checkbox.CheckboxTypes.PARTIAL_CHECK} label="Indeterminate" />
  <Checkbox id="pc4" disabled={true} checked={false} label="Disabled Unchecked" />
  <Checkbox id="pc5" disabled={true} checked={true} label="Disabled Checked" />
  <Checkbox id="pc6" disabled={true} checked={true} type={Checkbox.CheckboxTypes.PARTIAL_CHECK} label="Disabled Indeterminate" />
  <Checkbox id="pc7" aria-disabled={true} checked={false} label="Aria Disabled Unchecked" />
  <Checkbox id="pc8" aria-disabled={true} checked={true} label="Aria Disabled Checked" />
</StackingLayout>

// Toggle states
<StackingLayout itemSpacing="10px" itemDisplay="block">
  <Checkbox id="pt1" type={Checkbox.CheckboxTypes.TOGGLE} checked={false} label="Toggle Off" />
  <Checkbox id="pt2" type={Checkbox.CheckboxTypes.TOGGLE} checked={true} label="Toggle On" />
  <Checkbox id="pt3" disabled={true} type={Checkbox.CheckboxTypes.TOGGLE} checked={false} label="Disabled Toggle Off" />
  <Checkbox id="pt4" disabled={true} type={Checkbox.CheckboxTypes.TOGGLE} checked={true} label="Disabled Toggle On" />
</StackingLayout>

// Rounded states
<StackingLayout itemSpacing="10px" itemDisplay="block">
  <Checkbox id="pr1" type={Checkbox.CheckboxTypes.ROUNDED} checked={false} label="Unchecked" />
  <Checkbox id="pr2" type={Checkbox.CheckboxTypes.ROUNDED} checked={true} label="Checked" />
  <Checkbox id="pr3" disabled={true} type={Checkbox.CheckboxTypes.ROUNDED} checked={false} label="Disabled Unchecked" />
  <Checkbox id="pr4" disabled={true} type={Checkbox.CheckboxTypes.ROUNDED} checked={true} label="Disabled Checked" />
</StackingLayout>
```

#### Custom Checkbox Colors

```tsx
import { Checkbox, FlexLayout, FlexItem } from '@nutanix-ui/prism-reactjs';

// Hex color
<Checkbox id="hex" color="#8A77ED" checked={checked} onChange={onChange} label="Hex: #8A77ED" />

// Named color
<Checkbox id="named" color="aqua" checked={checked} onChange={onChange} label='Named: "aqua"' />

// RGB
<Checkbox id="rgb" color="rgb(255, 80, 0)" checked={checked} onChange={onChange} label="RGB: rgb(255, 80, 0)" />

// Design token (recommended — theme-compatible)
<Checkbox
  id="token"
  color="var(--color-background-success)"
  checked={checked}
  onChange={onChange}
  label="Design Token: var(--color-background-success)"
/>
// Note: toggle type does NOT support custom colors.
// Note: invalid values/tokens fall back to browser blue and log a console warning.
```

#### Indeterminate Stable Example

```tsx
import { Checkbox, StackingLayout } from '@nutanix-ui/prism-reactjs'

// checked=true + PARTIAL_CHECK = indeterminate dash mark
// The indeterminate DOM property is re-asserted every render (browsers clear it on clicks)
;<Checkbox
  id="indeterminate-stable"
  checked={true}
  type={Checkbox.CheckboxTypes.PARTIAL_CHECK}
  label="Indeterminate"
  onChange={() => setTick(tick + 1)}
/>
```

### Usage Notes

- Prefer documented enum/static values such as `Checkbox.CheckboxTypes.<VALUE>` over raw strings when the component exposes them.
- Keep labels, help text, and validation visible and persistent for form controls; use `FormItemCheckbox` (with `FormItemProvider` plumbing) where form layout, validation, or help text is needed.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.
- The `ROUNDED` type is accessibility-discouraged. Prefer `DEFAULT` unless the design explicitly calls for it.
- Use `color` with design tokens (`var(--...)`) rather than hard-coded hex values for theme compatibility.

<!-- SOURCE-API-END -->
