# FormItemProvider

## Figma

- **Library name:** N/A
- **Use case:** React-only utility export; not usually mapped directly from a Figma component.

## React

Import: `import { FormItemProvider } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import { FormItemProvider } from '@nutanix-ui/prism-reactjs'
// TypeScript: also import the props type if needed
import type { FormItemProviderProps } from '@nutanix-ui/prism-reactjs/services/src/components/v2/Utility/FormItemProvider'
```

### HOC Pattern

`FormItemProvider` is a **higher-order component (HOC)**. It takes any React component as its argument and returns a new component that adds consistent form-item structure (label, help text, error state) around the wrapped component.

```tsx
const InputWithLabel = FormItemProvider(Input)
// InputWithLabel accepts all Input props PLUS all FormItemProviderProps
```

The HOC automatically:

- Assigns an `id` to the wrapped component (auto-generated if not provided).
- Wires `aria-describedby` on the wrapped component to the help-text element's id when `helpText` is present.
- Sets `aria-invalid={error}` on the wrapped component.
- Forwards `error` and `errorType` to the wrapped component so it can apply its own error styling.
- Renders a `<label htmlFor={id}>` that auto-focuses the wrapped input on click.
- Adds `role="alert"` on the help-text container when `error` is true.

### Enums / Constants

#### `ErrorType`

Re-exported from `Input`. Import as:

```tsx
import { Input } from '@nutanix-ui/prism-reactjs'
// Use as: Input.ErrorType.WARNING / Input.ErrorType.CRITICAL
```

Or via named import from the Input module directly (less common in app code):

```tsx
import { ErrorType } from '@nutanix-ui/prism-reactjs/services/src/components/v2/Input/Input'
```

| Value                | String       |
| -------------------- | ------------ |
| `ErrorType.WARNING`  | `'warning'`  |
| `ErrorType.CRITICAL` | `'critical'` |

### Props Interfaces

#### `FormItemProviderProps`

All props are **optional**.

| Prop                    | Type                                                                                                  | Default              | Description                                                                                                                                                                                                                          |
| ----------------------- | ----------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                    | `string \| number`                                                                                    | auto-generated       | Unique id for the label and the wrapped component. Required when using the label with an input so that clicking the label auto-focuses the input.                                                                                    |
| `label`                 | `React.ReactNode`                                                                                     | —                    | Primary description label rendered top-left. Strings are styled automatically; React elements must be styled by the application. Rendered as a `<label htmlFor={id}>`.                                                               |
| `secondaryLabel`        | `React.ReactNode`                                                                                     | —                    | Secondary label rendered next to (right of) the primary label. Often used as alternative-style help text. Strings are styled automatically. Cannot contain interactive content; cannot be combined with `helpText` (unsupported).    |
| `helpText`              | `React.ReactNode`                                                                                     | —                    | Help text rendered below the wrapped component. When `error` is true, styled in red and the container gains `role="alert"`. Strings receive automatic icon + `TextLabel` styling.                                                    |
| `helpTextProps`         | `FlexItemProps & { isTruncated?: boolean; truncateProps?: Omit<TruncateComponentProps, 'children'> }` | `{}`                 | Extra props forwarded to the help-text `FlexItem` container. Use `isTruncated` + `truncateProps` to enable truncation with a tooltip on the help-text string.                                                                        |
| `hideHelpTextIcon`      | `boolean`                                                                                             | `false`              | When `true`, suppresses the icon that is rendered to the left of the help text string.                                                                                                                                               |
| `error`                 | `boolean`                                                                                             | —                    | Activates error styling on the help text. Also forwarded to the wrapped component.                                                                                                                                                   |
| `errorType`             | `ErrorType`                                                                                           | `ErrorType.CRITICAL` | Controls the error variant. `CRITICAL` renders a red alert-triangle icon and error-coloured text; `WARNING` renders a warning icon and warning-coloured text. Forwarded to the wrapped component.                                    |
| `formItemProviderProps` | `StackingLayoutProps`                                                                                 | `{}`                 | Extra props forwarded to the outer `StackingLayout` wrapper (e.g. `data-test-id`, `className`, `style`).                                                                                                                             |
| `statusIconProps`       | `StatusIconProps`                                                                                     | —                    | When provided, renders a `StatusIcon` inline with the primary label. The icon is `aria-hidden="true"` by default (VoiceOver will not read it). Pass `aria-hidden={false}` and `aria-label` explicitly if the icon must be announced. |
| `useComponentLabel`     | `boolean`                                                                                             | —                    | **Internal.** Set only by `FormItemCheckbox`. Forwards `label` to the wrapped control and suppresses the provider label row. Do not use in application code.                                                                         |

### Automatic Accessibility Wiring

The HOC handles several a11y concerns automatically:

| Concern                  | Mechanism                                                                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Label–input association  | `<label htmlFor={id}>` rendered; `id` set on wrapped component                                                                           |
| Help text association    | `aria-describedby` set on wrapped component pointing to help-text element id                                                             |
| Invalid state            | `aria-invalid={error}` forwarded to wrapped component                                                                                    |
| Error announcement       | Help-text container gets `role="alert"` when `error` is true                                                                             |
| Error/warning icon label | Icon gets `aria-label="Error:"` or `aria-label="Warning:"` when error is active; decorative icon gets `aria-hidden="true"` when no error |

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Accessibility Guidelines

```tsx
<StackingLayout style={{ maxWidth: 800 }}>
  <Title size="h3">Accessible error and helpText</Title>
  <Paragraph>
    When the helpText indicates an error, the associated icon will include an
    appropriate aria-label, such as "Error" or "Warning", so that screen readers
    can announce it. This ensures that screen reader users receive the same
    error context as sighted users, since the icon provides a visual cue that
    would otherwise be missed.
  </Paragraph>
  <Paragraph>
    If the helpText is the default informational (non-error), the icon is
    considered decorative and will have aria-hidden="true". If you choose to
    remove the icon with the showIcon prop, make sure the helpText itself
    clearly communicates that it is an error or warning.
  </Paragraph>
  <Title size="h3">Using FormItemProvider with secondaryLabel</Title>
  <Paragraph>
    Use the secondaryLabel prop to provide extra information for the input
    field. Think of it as an alternative style for help text. You'll need to
    include the aria-describedby prop and an id for screen reader support.
  </Paragraph>
  <Paragraph>
    The secondaryLabel cannot include interactive content and using the
    secondaryLabel prop and the helpText prop at the same time is not currently
    supported.
  </Paragraph>
</StackingLayout>
```

#### Adding a label to the Input component (basic usage)

```tsx
import { FormItemProvider, Input } from '@nutanix-ui/prism-reactjs'

const InputWithLabel = FormItemProvider(Input)
;<InputWithLabel
  label="Input Label"
  defaultValue="Basic Usage"
  helpText="Help text"
  formItemProviderProps={{ 'data-test-id': 'default-usage' }}
/>
```

#### Adding a secondary label to the Input component

```tsx
import { FormItemProvider, Input, TextLabel } from '@nutanix-ui/prism-reactjs'

const InputWithLabel = FormItemProvider(Input)
;<InputWithLabel
  label="Input Label"
  defaultValue="Basic Usage"
  secondaryLabel={
    <TextLabel
      id="secondary-label-id"
      size={TextLabel.TEXT_LABEL_SIZE.SMALL}
      type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
    >
      Description
    </TextLabel>
  }
  aria-describedby="secondary-label-id"
  formItemProviderProps={{ 'data-test-id': 'secondary-label' }}
/>
```

#### Adding a status icon to the primary label

```tsx
import { FormItemProvider, Input, StatusIcon } from '@nutanix-ui/prism-reactjs'

const InputWithLabel = FormItemProvider(Input)
;<InputWithLabel
  label="Input Label"
  defaultValue="Basic Usage"
  helpText="Help text"
  formItemProviderProps={{ 'data-test-id': 'status-icon-usage' }}
  statusIconProps={{
    type: StatusIcon.StatusIconTypes.WARNING,
    'aria-hidden': false,
    'aria-label': 'Warning',
  }}
/>
```

#### Showing a warning help text

```tsx
import { FormItemProvider, Input } from '@nutanix-ui/prism-reactjs'

const InputWithLabel = FormItemProvider(Input)
;<InputWithLabel
  label="Input Label"
  helpText="Help Text"
  error={true}
  errorType={Input.ErrorType.WARNING}
  formItemProviderProps={{ 'data-test-id': 'helptext-warning' }}
/>
```

#### Showing a critical error help text

```tsx
import { FormItemProvider, Input } from '@nutanix-ui/prism-reactjs'

const InputWithLabel = FormItemProvider(Input)
;<InputWithLabel
  label="Input Label"
  helpText="Help Text"
  error={true}
  formItemProviderProps={{ 'data-test-id': 'helptext-error' }}
/>
```

#### Hiding the help text icon

```tsx
import { FormItemProvider, FlexItem } from '@nutanix-ui/prism-reactjs'

const InputWithLabel = FormItemProvider(FlexItem)
;<InputWithLabel
  label="Example Label"
  hideHelpTextIcon={true}
  helpText="Example helpText without an icon."
  formItemProviderProps={{ 'data-test-id': 'no-helptext-icon' }}
>
  helpText icon is hidden now.
</InputWithLabel>
```

#### Wrapping any custom component

`FormItemProvider` can wrap any React component, not just Prism inputs. `error` and `errorType` are forwarded as props, so the wrapped component must handle them if needed.

```tsx
import { FormItemProvider, FlexItem } from '@nutanix-ui/prism-reactjs'

const InputWithLabel = FormItemProvider(FlexItem)
;<InputWithLabel label="Example Label" helpText="Example helpText">
  This is just showing that the form provider can be wrapped around anything
</InputWithLabel>
```

#### Wrapping a Select with custom aria labels

For components like `Select` whose trigger element is not a native `<input>`, pass accessibility attributes via `inputProps` on the wrapped component. Note: all inputs must have visible labels in production.

```tsx
import { FormItemProvider, Select } from '@nutanix-ui/prism-reactjs'

const FormItemSelect = FormItemProvider(Select)

const data = [
  { id: 'optionOne', key: 'optionOne', label: 'Option 1' },
  { id: 'optionTwo', key: 'optionTwo', label: 'Option 2' },
]

;<FormItemSelect
  helpText="Help Text"
  selectedRow={data[0]}
  rowsData={data}
  inputProps={{
    'aria-label': 'Custom aria label',
  }}
/>
```

#### Wrapping a MultiSelect with custom aria labels

```tsx
import { FormItemProvider, MultiSelect } from '@nutanix-ui/prism-reactjs'

const FormItemMultiSelect = FormItemProvider(MultiSelect)

const data = [
  { id: 'optionOne', key: 'optionOne', label: 'Option 1' },
  { id: 'optionTwo', key: 'optionTwo', label: 'Option 2' },
]

;<FormItemMultiSelect
  helpText="Help Text"
  selectedRows={[data[0]]}
  rowsData={data}
  inputProps={{
    'aria-label': 'Custom aria label',
  }}
/>
```

#### Wrapping a fully custom component with manual aria wiring

When wrapping a custom component that manages its own ARIA attributes (e.g. a `Select` with `inputProps`), pass `aria-labelledby` and `aria-describedby` explicitly inside `inputProps` to ensure screen readers pick up both the label and help text:

```tsx
import { FormItemProvider, Select } from '@nutanix-ui/prism-reactjs'

const LabelWithMySelect = FormItemProvider(Select)
;<LabelWithMySelect
  label={<span id="label-id">Choose One</span>}
  helpText={
    <span id="help-id">If you need help please consult your admin</span>
  }
  formItemProviderProps={{ 'data-test-id': 'wrap-anything' }}
  inputProps={{
    'aria-labelledby': 'label-id',
    'aria-describedby': 'help-id',
  }}
/>
```

### Usage Notes

- These exports are React-only helpers or lower-level utilities. Prefer higher-level Prism components when they satisfy the design.
- Use these docs when existing component docs mention the provider/helper by name or when implementing advanced accessibility, popup, portal, upload, truncation, or notification behavior.
- Keep generated app code aligned with repository rules: Prism layout components for layout, persistent accessible labels, and no custom CSS for spacing.
- `secondaryLabel` and `helpText` cannot be used together — this is an unsupported combination.
- The `useComponentLabel` prop is `@internal` and used only by `FormItemCheckbox`; never set it in application code.
- When the wrapped component manages its own ARIA (e.g. `Select`, `MultiSelect`), pass `aria-labelledby`/`aria-describedby` through `inputProps` on the child to supplement the automatic wiring.

<!-- SOURCE-API-END -->
