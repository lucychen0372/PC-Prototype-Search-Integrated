# TextArea

## Figma

- **Library name:** Text Area (page: Data Input, frame: Input)
- **Variants:**
  - State: Default | Hover | Active | Disabled | Error

## React

Import: `import { TextArea } from '@nutanix-ui/prism-reactjs'`

### Props

`TextAreaProps` extends `Omit<React.HTMLProps<HTMLTextAreaElement>, 'ref'>` — all standard `<textarea>` HTML attributes (`value`, `onChange`, `placeholder`, `rows`, `maxLength`, `readOnly`, `name`, `id`, `aria-*`, etc.) are accepted in addition to the Prism-specific props below.

| Prop         | Type                                             | Default              | Required | Notes                                                                                                                                                             |
| ------------ | ------------------------------------------------ | -------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `className`  | `string`                                         | —                    | No       | Custom CSS class name.                                                                                                                                            |
| `inputRef`   | `React.LegacyRef<HTMLTextAreaElement>`           | —                    | No       | Ref forwarding to the underlying `<textarea>` DOM node. Accepts a callback or `React.createRef()` object. Prefer `TextAreaWithRef` when using `React.forwardRef`. |
| `error`      | `boolean`                                        | `false`              | No       | Applies error highlight styling.                                                                                                                                  |
| `errorType`  | `ErrorType`                                      | `ErrorType.CRITICAL` | No       | Controls the error style variant. See enum below.                                                                                                                 |
| `disabled`   | `boolean`                                        | `false`              | No       | Disables the textarea.                                                                                                                                            |
| `borderless` | `boolean`                                        | `false`              | No       | Removes the border but keeps the focus ring. Use on darker contrasted backgrounds.                                                                                |
| `resize`     | `'both' \| 'none' \| 'horizontal' \| 'vertical'` | `'both'`             | No       | Controls CSS resize behaviour.                                                                                                                                    |
| `background` | `'base' \| 'alt'`                                | —                    | No       | Explicitly sets the background context for the textarea. When omitted the component infers the contrasting background from `BackgroundContext`.                   |
| `data-test`  | `string`                                         | —                    | No       | Test selector attribute.                                                                                                                                          |

### `ErrorType` enum

Imported from `@nutanix-ui/prism-reactjs` (re-exported via `Input`).

```tsx
import { Input } from '@nutanix-ui/prism-reactjs'

Input.ErrorType.CRITICAL // 'critical' — red error styling (default)
Input.ErrorType.WARNING // 'warning'  — yellow/orange warning styling
```

### `TextAreaWithRef`

A `React.forwardRef` wrapper around `TextArea`. Use this when a parent needs a ref via the standard `ref` prop.

```tsx
import { TextAreaWithRef } from '@nutanix-ui/prism-reactjs'

const ref = React.createRef<HTMLTextAreaElement>()
;<TextAreaWithRef ref={ref} placeholder="..." />
```

---

### Figma Form Field Composition

In Figma, a Text Area with Label Top / Label Bottom is a single component. In React, use `FormItemTextArea`.

**Preferred: use `FormItemTextArea`**:

```tsx
import { FormItemTextArea } from '@nutanix-ui/prism-reactjs'
;<FormItemTextArea
  id="description"
  label="Description"
  helpText={errors.description}
  error={!!errors.description}
  errorType={Input.ErrorType.CRITICAL}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={4}
  placeholder="Enter description..."
/>
```

**Manual approach** (when `FormItemTextArea` cannot be used):

```tsx
<StackingLayout itemSpacing="10px">
  <TextLabel id="desc-label">Description</TextLabel>
  <TextArea
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    aria-labelledby="desc-label"
    rows={4}
    placeholder="Enter description..."
  />
  {errors.description && (
    <TextLabel id="desc-error" type={TextLabel.TEXT_LABEL_TYPE.ERROR}>
      {errors.description}
    </TextLabel>
  )}
</StackingLayout>
```

See `input.md` for the full Label Bottom Type -> React mapping table and `FormItemProvider` props reference.

---

### `FormItemTextArea` Props

`FormItemTextArea` accepts all `TextAreaProps` (except `label`, which is taken over by `FormItemProviderProps`) plus the `FormItemProviderProps` below.

| Prop                    | Type                                                             | Default              | Required | Notes                                                                                                                                |
| ----------------------- | ---------------------------------------------------------------- | -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                    | `string`                                                         | —                    | **Yes**  | Wires the `<label>` `htmlFor` and the textarea `id`.                                                                                 |
| `label`                 | `React.ReactNode`                                                | —                    | No       | Primary label above the textarea. String values are auto-styled.                                                                     |
| `secondaryLabel`        | `React.ReactNode`                                                | —                    | No       | Secondary label rendered to the right of `label` (e.g. a "Show/Hide" link).                                                          |
| `helpText`              | `React.ReactNode`                                                | —                    | No       | Help or validation text below the textarea. Styled as error/warning when `error` is set.                                             |
| `helpTextProps`         | `FlexItemProps & { isTruncated?: boolean; truncateProps?: ... }` | —                    | No       | Extra props forwarded to the help-text `FlexItem` wrapper.                                                                           |
| `hideHelpTextIcon`      | `boolean`                                                        | `false`              | No       | Suppresses the info/warning/error icon beside `helpText`.                                                                            |
| `error`                 | `boolean`                                                        | —                    | No       | Activates error styling on both the textarea and `helpText`.                                                                         |
| `errorType`             | `ErrorType`                                                      | `ErrorType.CRITICAL` | No       | `CRITICAL` (red) or `WARNING` (yellow).                                                                                              |
| `formItemProviderProps` | `StackingLayoutProps`                                            | `{}`                 | No       | Props forwarded to the outer `StackingLayout` wrapper.                                                                               |
| `statusIconProps`       | `StatusIconProps`                                                | —                    | No       | Renders a `StatusIcon` inline with the label (hidden from VoiceOver).                                                                |
| `formHelper`            | `FormHelper`                                                     | —                    | No       | Validation object provided by the `Form` component. Overrides `error`, `helpText`, and `value` from form state. See interface below. |

#### `FormHelper` interface

```ts
interface FormHelper {
  errors?: {
    [key: string]: {
      error?: boolean
      message?: string
    }
  }
  values?: { [key: string]: any }
  handleChange?: (id: string, value: string) => void
  handleValidation?: (id: string, value: string) => void
  requireMap?: { [key: string]: boolean }
}
```

When `formHelper` is provided:

- `formHelper.values[id]` is used as the controlled `value`.
- `formHelper.errors[id].error` / `.message` override `error` / `helpText`.
- `formHelper.requireMap[id]` sets `aria-required` on the textarea.

---

### TSX Examples

#### Basic (standalone, no label)

```tsx
import { TextArea } from '@nutanix-ui/prism-reactjs'
;<TextArea name="notes" placeholder="Enter notes..." rows={4} />
```

#### Read Only

```tsx
import { TextArea } from '@nutanix-ui/prism-reactjs'
;<TextArea name="text-area-readonly" readOnly={true} placeholder="Read Only" />
```

#### Disabled

```tsx
import { TextArea } from '@nutanix-ui/prism-reactjs'
;<TextArea name="text-area-disabled" disabled={true} placeholder="Disabled" />
```

#### Error — critical (default)

```tsx
import { TextArea, Input } from '@nutanix-ui/prism-reactjs'
;<TextArea
  name="text-area-error"
  placeholder="Please Type"
  error={true}
  errorType={Input.ErrorType.CRITICAL}
/>
```

#### Error — warning

```tsx
import { TextArea, Input } from '@nutanix-ui/prism-reactjs'
;<TextArea
  name="text-area-warning"
  placeholder="Please Type"
  error={true}
  errorType={Input.ErrorType.WARNING}
/>
```

#### Borderless (for darker backgrounds)

```tsx
import { StackingLayout, TextArea } from '@nutanix-ui/prism-reactjs'
;<StackingLayout style={{ padding: '40px' }}>
  <TextArea
    name="text-area-borderless"
    placeholder="Please Type"
    borderless={true}
  />
</StackingLayout>
```

#### Resize options

```tsx
import { TextArea, FlexLayout, TextLabel } from '@nutanix-ui/prism-reactjs'
;<FlexLayout flexDirection="column" itemSpacing="20px">
  <TextArea name="resize-both" placeholder="Both (default)" resize="both" />
  <TextArea
    name="resize-vertical"
    placeholder="Vertical only"
    resize="vertical"
  />
  <TextArea
    name="resize-horizontal"
    placeholder="Horizontal only"
    resize="horizontal"
  />
  <TextArea name="resize-none" placeholder="No resize" resize="none" />
</FlexLayout>
```

#### Background prop (explicit contrast override)

```tsx
import { FlexLayout, StackingLayout, TextArea } from '@nutanix-ui/prism-reactjs'
;<FlexLayout flexDirection="row">
  <StackingLayout style={{ flexGrow: 1 }}>
    {/* On a base (light) background, use background="alt" */}
    <TextArea name="ta-on-base" placeholder="alt style" background="alt" />
  </StackingLayout>
  <StackingLayout style={{ flexGrow: 1 }}>
    {/* On an alt (dark) background, use background="base" */}
    <TextArea name="ta-on-alt" placeholder="base style" background="base" />
  </StackingLayout>
</FlexLayout>
```

#### `FormItemTextArea` — basic

```tsx
import { FormItemTextArea } from '@nutanix-ui/prism-reactjs'
;<FormItemTextArea
  id="description"
  label="Description"
  helpText="Help text"
  placeholder="This is a placeholder"
/>
```

#### `FormItemTextArea` — with validation

```tsx
import { FormItemTextArea, Input } from '@nutanix-ui/prism-reactjs'
;<FormItemTextArea
  id="description"
  label="Description"
  helpText={errors.description}
  error={!!errors.description}
  errorType={Input.ErrorType.CRITICAL}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={4}
  placeholder="Enter description..."
/>
```

#### `FormItemTextArea` — with `secondaryLabel` and custom label node

```tsx
import {
  FormItemTextArea,
  FlexLayout,
  TextLabel,
  InformationStatusIcon,
  Link,
} from '@nutanix-ui/prism-reactjs'

const [visible, setVisible] = React.useState(false)

;<FormItemTextArea
  id="secret-key"
  label={
    <FlexLayout itemSpacing="10px" alignItems="center">
      <TextLabel size={TextLabel.TEXT_LABEL_SIZE.SMALL}>Secret Key</TextLabel>
      <InformationStatusIcon />
    </FlexLayout>
  }
  secondaryLabel={
    <Link size="small" onClick={() => setVisible(!visible)}>
      {visible ? 'Hide' : 'Show'}
    </Link>
  }
  placeholder="Enter your secret key"
  style={{ height: 150, WebkitTextSecurity: visible ? 'none' : 'disc' }}
/>
```

---

### Accessibility & Behaviour Notes

- `FormItemProvider` automatically wires `aria-describedby` on the textarea to the rendered `helpText` element id, and sets `aria-invalid` when `error` is `true`.
- When `error` is set and `helpText` is rendered, the help-text container receives `role="alert"` so screen readers announce the message.
- The help-text icon (`InformationStatusIcon`, `WarningStatusIcon`, or `AlertTriangleIcon`) is rendered with `aria-hidden` when there is no error, and with an `aria-label` of `"Error:"` or `"Warning:"` when there is an error.
- `formHelper.requireMap[id]` causes `aria-required="true"` to be set on the textarea.
- Use `inputRef` (or `TextAreaWithRef` with a `ref` prop) to programmatically focus the textarea.
- All standard `<textarea>` attributes (`rows`, `maxLength`, `readOnly`, `name`, `autoFocus`, etc.) pass through via the HTML props spread.

### Anti-patterns

- Don't use `<textarea>` HTML element — use `TextArea`.
- Don't render bare `TextArea` when Figma shows Label Top or Label Bottom — use `FormItemTextArea`.
- Don't pass raw strings like `'critical'` or `'warning'` to `errorType`; use `Input.ErrorType.CRITICAL` / `Input.ErrorType.WARNING`.
- Don't use the `background` prop as a substitute for wrapping the textarea in a layout component that provides `BackgroundContext`; only use it when you need to explicitly override the inferred background.

<!-- SOURCE-API-START -->

### Import

```tsx
import { TextArea, TextAreaWithRef } from '@nutanix-ui/prism-reactjs'
import { FormItemTextArea } from '@nutanix-ui/prism-reactjs'
```

### Props Interfaces

#### `TextAreaProps`

Extends: `Omit<React.HTMLProps<HTMLTextAreaElement>, 'ref'>`

| Prop         | Type                                             | Default              | Description                                                                          |
| ------------ | ------------------------------------------------ | -------------------- | ------------------------------------------------------------------------------------ |
| `className`  | `string`                                         | —                    | Custom class name.                                                                   |
| `inputRef`   | `React.LegacyRef<HTMLTextAreaElement>`           | —                    | Ref to the underlying `<textarea>` DOM node. Callback or `React.createRef()` object. |
| `error`      | `boolean`                                        | `false`              | Applies error highlight styling.                                                     |
| `errorType`  | `ErrorType`                                      | `ErrorType.CRITICAL` | Error style variant. `enum ErrorType { WARNING = 'warning', CRITICAL = 'critical' }` |
| `disabled`   | `boolean`                                        | `false`              | Disables the textarea.                                                               |
| `borderless` | `boolean`                                        | `false`              | No border, focus ring retained. Use on darker backgrounds.                           |
| `resize`     | `'both' \| 'none' \| 'horizontal' \| 'vertical'` | `'both'`             | CSS resize behaviour.                                                                |
| `background` | `'base' \| 'alt'`                                | —                    | Explicit background context override.                                                |
| `data-test`  | `string`                                         | —                    | Test selector.                                                                       |

#### `FormItemTextAreaProps`

Extends: `Omit<TextAreaProps, 'label'>` + `FormItemProviderProps`

| Prop                    | Type                                        | Default              | Required | Description                                   |
| ----------------------- | ------------------------------------------- | -------------------- | -------- | --------------------------------------------- |
| `id`                    | `string`                                    | —                    | **Yes**  | Wires `<label>` and textarea by id.           |
| `label`                 | `React.ReactNode`                           | —                    | No       | Primary label (top-left).                     |
| `secondaryLabel`        | `React.ReactNode`                           | —                    | No       | Secondary label (top-right).                  |
| `helpText`              | `React.ReactNode`                           | —                    | No       | Help / validation text below textarea.        |
| `helpTextProps`         | `FlexItemProps & { isTruncated?: boolean }` | —                    | No       | Props for the help-text wrapper.              |
| `hideHelpTextIcon`      | `boolean`                                   | `false`              | No       | Hides the icon beside `helpText`.             |
| `error`                 | `boolean`                                   | —                    | No       | Error state.                                  |
| `errorType`             | `ErrorType`                                 | `ErrorType.CRITICAL` | No       | Error variant.                                |
| `formItemProviderProps` | `StackingLayoutProps`                       | `{}`                 | No       | Props for the outer `StackingLayout`.         |
| `statusIconProps`       | `StatusIconProps`                           | —                    | No       | `StatusIcon` shown inline with label.         |
| `formHelper`            | `FormHelper`                                | —                    | No       | Form validation object from `Form` component. |

### Usage Notes

- Prefer `FormItemTextArea` over bare `TextArea` whenever the field has a label, help text, or validation feedback.
- Use `Input.ErrorType.CRITICAL` / `Input.ErrorType.WARNING` — not raw strings.
- Use Prism layout props (`itemSpacing`, `padding`, `alignItems`) instead of custom CSS for spacing.
- The `background` prop accepts `'base'` or `'alt'` only (`'body'` is excluded from `BackgroundTypeWithoutBody`).

<!-- SOURCE-API-END -->
