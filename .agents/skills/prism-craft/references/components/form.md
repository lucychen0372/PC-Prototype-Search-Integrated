# Form

## Figma

- **Library name:** Form Item (page: Data Input, frame: Input)
- Groups: FormSection, FormItemInput, FormItemSelect, FormItemTextArea, FormItemCheckbox, FormItemRadioGroup, FormItemMultiSelect
- In Figma, form fields are single components with Label Top / Label Bottom toggled via variant options. In React, the `FormItem*` wrappers auto-compose label + input + help text.

## React

Import: `import { Form, FormSection, FormLayout, FormItemProvider, FormItemInput, FormItemInputPassword, FormItemSelect, FormItemTextArea, FormItemCodeInput, FormItemDatePicker, FormItemTimePicker, FormItemCheckbox, FormItemRadioGroup } from '@nutanix-ui/prism-reactjs'`

### All FormItem\* Wrappers

| Wrapper                 | Wraps           | Notes                                                                     |
| ----------------------- | --------------- | ------------------------------------------------------------------------- |
| `FormItemInput`         | `Input`         | Text input with label + help text                                         |
| `FormItemInputPassword` | `InputPassword` | Password input with show/hide toggle                                      |
| `FormItemSelect`        | `Select`        | Dropdown with label + help text                                           |
| `FormItemTextArea`      | `TextArea`      | Multi-line text with label + help text                                    |
| `FormItemCodeInput`     | `CodeInput`     | Monaco editor with label + help text                                      |
| `FormItemDatePicker`    | `DatePicker`    | Date/range picker with label + help text                                  |
| `FormItemTimePicker`    | `TimePicker`    | Time picker with label + help text                                        |
| `FormItemCheckbox`      | `Checkbox`      | Checkbox where `label` is forwarded to the control, not rendered above it |
| `FormItemRadioGroup`    | `RadioGroup`    | Radio group; `label` is **required** and rendered above the group         |

Each wrapper accepts **all props of the wrapped component** plus the `FormItemProvider` props below.

### FormItemProvider Props

These props are available on every `FormItem*` wrapper:

| Prop                    | Type                                                                                | Default              | Notes                                                                                                                                             |
| ----------------------- | ----------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                    | `string \| number`                                                                  | —                    | Links label to input via `htmlFor`/`aria-labelledby`. Required in practice; an internal id is generated when omitted.                             |
| `label`                 | `ReactNode`                                                                         | —                    | Figma "Label Top" text. For `FormItemCheckbox` this is forwarded to the `Checkbox` control itself. For `FormItemRadioGroup` this is **required**. |
| `secondaryLabel`        | `ReactNode`                                                                         | —                    | Secondary text rendered beside the primary label (right-aligned).                                                                                 |
| `helpText`              | `ReactNode`                                                                         | —                    | Figma "Label Bottom" text. String values are auto-styled; ReactNode overrides allow custom rendering.                                             |
| `helpTextProps`         | `FlexItemProps & { isTruncated?: boolean; truncateProps?: TruncateComponentProps }` | `{}`                 | Style/layout overrides for the help text container. `isTruncated` enables tooltip on overflow.                                                    |
| `hideHelpTextIcon`      | `boolean`                                                                           | `false`              | Suppresses the default info/warning/error icon beside help text.                                                                                  |
| `error`                 | `boolean`                                                                           | —                    | Styles input + helpText in error state. Also sets `aria-invalid` on the control.                                                                  |
| `errorType`             | `ErrorType`                                                                         | `ErrorType.CRITICAL` | `ErrorType.CRITICAL` (red) or `ErrorType.WARNING` (yellow).                                                                                       |
| `formItemProviderProps` | `StackingLayoutProps`                                                               | `{}`                 | Props for the outer `StackingLayout` container (the form-item wrapper div).                                                                       |
| `statusIconProps`       | `StatusIconProps`                                                                   | —                    | Renders a `StatusIcon` beside the label. Screen readers skip it (`aria-hidden`).                                                                  |
| `useComponentLabel`     | `boolean`                                                                           | —                    | Internal flag set by `FormItemCheckbox`; forwards `label` to the wrapped control instead of rendering a provider label row. Do not set manually.  |

### `formHelper` Prop (all wrappers)

When a `FormItem*` is used inside a `<Form>` with the render-prop pattern, pass the `formHelper` object from `Form`'s children function. When `formHelper` is present it overrides `error`, `helpText`, and `value`/`checked`/`selectedValue` from the form's internal state.

| Prop         | Type         | Description                                                  |
| ------------ | ------------ | ------------------------------------------------------------ |
| `formHelper` | `FormHelper` | Validation helper object from `Form`'s render-prop children. |

### Figma Label Bottom Type → React Mapping

| Figma Label Bottom | React Props                                                                 |
| ------------------ | --------------------------------------------------------------------------- |
| _(hidden)_         | Omit `helpText`                                                             |
| Type: Default      | `helpText="hint text"`                                                      |
| Type: Error        | `helpText="error msg"` + `error={true}` + `errorType={ErrorType.CRITICAL}`  |
| Type: Warning      | `helpText="warning msg"` + `error={true}` + `errorType={ErrorType.WARNING}` |
| Type: Success      | `helpText="success msg"` (no `error` flag)                                  |

---

### `Form` Component Props

`Form` is a class component that manages field values, errors, and validation internally and exposes them via a render-prop children function.

`FormProps` extends `Omit<React.HTMLProps<HTMLFormElement>, 'ref'>`.

| Prop            | Type                                                  | Default | Notes                                                                                                         |
| --------------- | ----------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| `children`      | `((helper: FormHelper) => ReactNode) \| ReactNode`    | —       | Static JSX or a render-prop function that receives `FormHelper`.                                              |
| `className`     | `string`                                              | —       | Additional CSS class.                                                                                         |
| `defaultValues` | `Record<any, any>`                                    | `{}`    | Initial field values keyed by `FormItem*` `id`.                                                               |
| `defaultErrors` | `Record<any, any>`                                    | `{}`    | Initial error state keyed by field `id`.                                                                      |
| `onSubmit`      | `(values: Record<any, any>, event?: unknown) => void` | —       | Called only when all validations pass. Receives collected field values, **not** the native form submit event. |
| `validations`   | `Record<any, any> \| Record<any, any>[]`              | —       | Validation rules keyed by field `id`. Pass an array for multiple independent rule objects per field.          |
| `data-test`     | `string`                                              | —       | `data-test` attribute on the `<form>` element.                                                                |

> **Note:** `Form` intercepts native form submission (`onSubmit` on `<form>` calls `e.preventDefault()`) so pressing Enter does not submit the HTML form. Call `formHelper.handleSubmit` explicitly on a Button.

#### Static members

| Member                               | Value            | Description                                                         |
| ------------------------------------ | ---------------- | ------------------------------------------------------------------- |
| `Form.VALIDATION_RULE.REQUIRED`      | `'required'`     | Field must be non-empty.                                            |
| `Form.VALIDATION_RULE.TYPE`          | `'type'`         | Value must match a built-in type.                                   |
| `Form.VALIDATION_RULE.CUSTOM`        | `'custom'`       | Custom validator function `(value) => boolean`.                     |
| `Form.VALIDATION_RULE.MIN_LENGTH`    | `'minLength'`    | Minimum string length.                                              |
| `Form.VALIDATION_RULE.MAX_LENGTH`    | `'maxLength'`    | Maximum string length.                                              |
| `Form.VALIDATION_RULE.MIN_VALUE`     | `'minValue'`     | Minimum numeric value.                                              |
| `Form.VALIDATION_RULE.MAX_VALUE`     | `'maxValue'`     | Maximum numeric value.                                              |
| `Form.VALIDATION_RULE.REGEX`         | `'regex'`        | Value must match a `RegExp`.                                        |
| `Form.VALIDATION_TYPE.EMAIL`         | `'email'`        | Valid email address.                                                |
| `Form.VALIDATION_TYPE.NUMBER`        | `'number'`       | Numeric (passes `!isNaN`).                                          |
| `Form.VALIDATION_TYPE.INTEGER`       | `'integer'`      | Whole integer.                                                      |
| `Form.VALIDATION_TYPE.FLOAT`         | `'float'`        | Floating-point number.                                              |
| `Form.VALIDATION_TYPE.ALPHA_NUMERIC` | `'alphaNumeric'` | Letters and digits only.                                            |
| `Form.VALIDATION_TYPE.IP_ADDRESS`    | `'ipAdress'`     | Valid IPv4 address (note: typo in source, `ipAdress`).              |
| `Form.VALIDATION_TYPE.URL`           | `'url'`          | Valid URL.                                                          |
| `Form.VALIDATION_TYPE.DATE`          | `'date'`         | Valid date (uses `DatePicker` format/locale options from registry). |
| `Form.VALIDATION_TYPE.RANGE_DATE`    | `'rangeDate'`    | Valid date range (`{ startDate, endDate }`).                        |
| `Form.VALIDATION_TYPE.TIME`          | `'time'`         | Valid time string (uses `TimePicker` format options from registry). |

### `FormHelper` Interface

The object passed to `Form`'s render-prop children and to each `FormItem*` via `formHelper`.

| Field                      | Type                                                                                                 | Description                                                                                                                   |
| -------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `values`                   | `{ [key: string]: any }`                                                                             | Current field values keyed by id.                                                                                             |
| `errors`                   | `{ [key: string]: { error?: boolean; message?: string } }`                                           | Current error state keyed by id.                                                                                              |
| `hasError`                 | `boolean`                                                                                            | `true` if any field currently has `error: true`.                                                                              |
| `requireMap`               | `Record<string, boolean>`                                                                            | Whether each field is marked required (derived from `validations`). Used to set `aria-required`.                              |
| `handleChange`             | `(id: string, value: string \| moment.Moment \| RangeDates, otherValues?: Record<any, any>) => void` | Update one or more field values. `otherValues` lets a single change cascade to other fields.                                  |
| `handleValidation`         | `(id: string, value: string \| boolean) => void`                                                     | Validate a single field (called on blur by the wrappers).                                                                     |
| `handleSubmit`             | `(event?: unknown) => void`                                                                          | Validate all fields; calls `onSubmit` if no errors. Wire to a Button's `onClick`.                                             |
| `handleReset`              | `() => void`                                                                                         | Resets values and errors to `defaultValues` / `defaultErrors`.                                                                |
| `updateValidationRegistry` | `(formItemId: string, getOptions?: () => Record<any, any>) => void`                                  | Used internally by `FormItemDatePicker` and `FormItemTimePicker` to register format options needed for type-based validation. |

### `FormSection` Props

`FormSectionProps` extends `StackingLayoutProps` (so all `StackingLayout` props like `itemSpacing`, `itemGap`, `id`, etc. are accepted).

The component renders as a `<fieldset>` HTML element with `aria-labelledby` when `title` is set and `aria-describedby` when `description` is set.

| Prop          | Type                                                    | Default | Notes                                                                                                                                                                                                     |
| ------------- | ------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`    | `ReactNode`                                             | —       | `FormItem*` children.                                                                                                                                                                                     |
| `className`   | `string`                                                | —       | Additional CSS class.                                                                                                                                                                                     |
| `title`       | `string`                                                | —       | Section heading rendered as `<Title size="h3">`.                                                                                                                                                          |
| `titleProps`  | `Omit<TitleProps, 'children'>`                          | —       | Props forwarded to the `Title` element (e.g. custom `id`, `size` override).                                                                                                                               |
| `description` | `ReactNode`                                             | —       | Description rendered as `<Paragraph>` below the title.                                                                                                                                                    |
| `topSection`  | `{ leftContent?: ReactNode; rightContent?: ReactNode }` | —       | Optional content row above the form fields. `leftContent` appears after the title (if any); `rightContent` is right-aligned. If only `rightContent` is provided it renders `flex-direction: row-reverse`. |
| `data-test`   | `string`                                                | —       | `data-test` attribute.                                                                                                                                                                                    |

### `FormLayout` Component

`FormLayout` is a layout wrapper used inside `Form` for wizard/modal forms that need constrained width.

```tsx
import { FormLayout } from '@nutanix-ui/prism-reactjs'
;<FormLayout contentWidth="560px">
  <FormSection title="Details">
    <FormItemInput id="name" label="Name" />
  </FormSection>
</FormLayout>
```

### `FormItemProvider` HOC (advanced)

Use `FormItemProvider` to wrap any custom component and give it full label + help-text + error rendering:

```tsx
import { FormItemProvider, MultiSelect } from '@nutanix-ui/prism-reactjs'

const MultiSelectWithLabel = FormItemProvider(MultiSelect)

;<MultiSelectWithLabel
  id="clusters"
  label="Clusters"
  helpText="Select one or more clusters"
  rowsData={clusterData}
  selectedRows={selected}
  onSelectedChange={setSelected}
/>
```

---

### TSX Examples

#### Minimal presentation form (no validation)

```tsx
import { Form, FormSection, FormItemInput } from '@nutanix-ui/prism-reactjs'
;<Form style={{ minWidth: 200, maxWidth: 400 }}>
  <FormSection>
    <FormItemInput
      id="email"
      label="Email"
      error={true}
      helpText="Email is required"
      aria-required={true}
    />
    <FormItemInput id="description" label="Description (Optional)" />
  </FormSection>
</Form>
```

#### Basic validation with render-prop pattern

```tsx
import {
  Form,
  FormSection,
  FormItemInput,
  FormItemSelect,
  FormItemTextArea,
  FormItemDatePicker,
  FormItemTimePicker,
  Button,
} from '@nutanix-ui/prism-reactjs'

const projectData = [
  { key: 'eng', label: 'ENG' },
  { key: 'ep', label: 'EP' },
  { key: 'dial', label: 'DIAL' },
]

const validations = {
  email: {
    [Form.VALIDATION_RULE.TYPE]: Form.VALIDATION_TYPE.EMAIL,
    message: 'Email is not valid',
  },
  description: {
    [Form.VALIDATION_RULE.REQUIRED]: true,
    message: 'Description is required',
  },
  project: {
    [Form.VALIDATION_RULE.REQUIRED]: true,
    message: 'Project is required',
  },
  notes: {
    [Form.VALIDATION_RULE.REQUIRED]: true,
    message: 'Notes is required',
  },
  date: {
    [Form.VALIDATION_RULE.TYPE]: Form.VALIDATION_TYPE.DATE,
    message: 'Date is not valid',
  },
  time: {
    [Form.VALIDATION_RULE.TYPE]: Form.VALIDATION_TYPE.TIME,
    message: 'Time is not valid',
  },
}

;<Form
  validations={validations}
  onSubmit={(values) => console.log(values)}
  defaultValues={{ description: 'default' }}
  style={{ minWidth: 200, maxWidth: 400 }}
>
  {(formHelper) => (
    <FormSection>
      <FormItemInput id="email" label="Email" formHelper={formHelper} />
      <FormItemInput
        id="description"
        label="Description"
        formHelper={formHelper}
      />
      <FormItemSelect
        id="project"
        label="Project"
        rowsData={projectData}
        formHelper={formHelper}
      />
      <FormItemTextArea id="notes" label="Notes" formHelper={formHelper} />
      <FormItemDatePicker
        id="date"
        label="Date"
        oldDatePicker={false}
        formHelper={formHelper}
      />
      <FormItemTimePicker
        id="time"
        label="Time"
        format12Hours={false}
        formHelper={formHelper}
      />
      <Button onClick={formHelper.handleSubmit}>Submit</Button>
    </FormSection>
  )}
</Form>
```

#### Multiple validation rules per field (array syntax)

```tsx
import {
  Form,
  FormSection,
  FormItemInput,
  Button,
} from '@nutanix-ui/prism-reactjs'

const validations = [
  {
    age: { [Form.VALIDATION_RULE.REQUIRED]: true, message: 'Age is required' },
  },
  {
    age: {
      [Form.VALIDATION_RULE.TYPE]: Form.VALIDATION_TYPE.NUMBER,
      message: 'Age must be a number',
    },
  },
  {
    age: {
      [Form.VALIDATION_RULE.MIN_VALUE]: 0,
      message: 'Age cannot be negative',
    },
  },
  {
    age: { [Form.VALIDATION_RULE.MAX_VALUE]: 150, message: 'Age is too large' },
  },
]

;<Form validations={validations} onSubmit={(values) => console.log(values)}>
  {(formHelper) => (
    <FormSection>
      <FormItemInput id="age" label="Age" formHelper={formHelper} />
      <Button onClick={formHelper.handleSubmit}>Submit</Button>
    </FormSection>
  )}
</Form>
```

#### Custom validation rule

```tsx
const validations = {
  ipAddress: {
    [Form.VALIDATION_RULE.CUSTOM]: (val: string) => {
      if (!val) return false
      const ipv4 = /^(\d{1,3}\.){3}\d{1,3}$/
      return ipv4.test(val.trim())
    },
    message: 'Enter a valid IPv4 address',
  },
}
```

#### Password field with FormItemInputPassword

```tsx
import {
  Form,
  FormSection,
  FormItemInput,
  FormItemInputPassword,
  Button,
} from '@nutanix-ui/prism-reactjs'

const validations = {
  username: {
    [Form.VALIDATION_RULE.REQUIRED]: true,
    message: 'Username is required',
  },
  password: {
    [Form.VALIDATION_RULE.REQUIRED]: true,
    message: 'Password is required',
  },
}

;<Form validations={validations} onSubmit={(values) => console.log(values)}>
  {(formHelper) => (
    <FormSection title="Credentials">
      <FormItemInput id="username" label="Username" formHelper={formHelper} />
      <FormItemInputPassword
        id="password"
        label="Password"
        formHelper={formHelper}
      />
      <Button onClick={formHelper.handleSubmit}>Login</Button>
    </FormSection>
  )}
</Form>
```

#### FormItemCheckbox (standalone and with Form)

```tsx
import React, { useState } from 'react'
import { FormItemCheckbox } from '@nutanix-ui/prism-reactjs'

// Standalone
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
import {
  Form,
  FormSection,
  FormItemCheckbox,
  Button,
} from '@nutanix-ui/prism-reactjs'

// With Form validation
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

#### FormItemRadioGroup (standalone and with Form)

```tsx
import React, { useState } from 'react'
import { FormItemRadioGroup, Radio } from '@nutanix-ui/prism-reactjs'

// Standalone
const [value, setValue] = useState('option1')
;<FormItemRadioGroup
  id="choice"
  name="choice"
  label="Choose an option"
  selectedValue={value}
  onChange={setValue}
  helpText="Optional help text"
>
  <Radio value="option1">Option 1</Radio>
  <Radio value="option2">Option 2</Radio>
</FormItemRadioGroup>
```

```tsx
import {
  Form,
  FormSection,
  FormItemRadioGroup,
  Radio,
  Button,
} from '@nutanix-ui/prism-reactjs'

// With Form validation — label is required
const validations = {
  choice: {
    [Form.VALIDATION_RULE.REQUIRED]: true,
    message: 'Please select an option',
  },
}

;<Form validations={validations} onSubmit={(values) => console.log(values)}>
  {(formHelper) => (
    <FormSection>
      <FormItemRadioGroup
        id="choice"
        name="choice"
        label="Choose an option"
        formHelper={formHelper}
      >
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
      </FormItemRadioGroup>
      <Button onClick={formHelper.handleSubmit}>Submit</Button>
    </FormSection>
  )}
</Form>
```

#### FormSection with topSection for inline actions

```tsx
import {
  FormSection,
  FormItemInput,
  Title,
  Button,
} from '@nutanix-ui/prism-reactjs'
;<FormSection
  title="Advanced"
  description="Configure advanced settings."
  topSection={{
    leftContent: <Title size={Title.SIZES.H4}>Advanced Settings</Title>,
    rightContent: <Button type={Button.ButtonTypes.SECONDARY}>Reset</Button>,
  }}
>
  <FormItemInput id="timeout" label="Timeout (ms)" />
</FormSection>
```

#### Wizard / multi-step form with FormLayout

```tsx
import {
  Form,
  FormSection,
  FormItemInput,
  FormItemInputPassword,
  FormLayout,
  FlexLayout,
  Button,
} from '@nutanix-ui/prism-reactjs'

const validations = {
  name: { [Form.VALIDATION_RULE.REQUIRED]: true, message: 'Name is required' },
  password: {
    [Form.VALIDATION_RULE.REQUIRED]: true,
    message: 'Password is required',
  },
}

;<Form validations={validations} onSubmit={(values) => console.log(values)}>
  {(formHelper) => (
    <FormLayout contentWidth="560px">
      <FormSection title="Basic Details">
        <FormItemInput id="name" label="Name" formHelper={formHelper} />
      </FormSection>
      <FormSection title="Credentials">
        <FormItemInputPassword
          id="password"
          label="Password"
          formHelper={formHelper}
        />
      </FormSection>
      <FormSection>
        <FlexLayout justifyContent="flex-end">
          <Button
            type={Button.ButtonTypes.SECONDARY}
            onClick={formHelper.handleReset}
          >
            Reset
          </Button>
          <Button onClick={formHelper.handleSubmit}>Next</Button>
        </FlexLayout>
      </FormSection>
    </FormLayout>
  )}
</Form>
```

#### Cascading field updates via `handleChange` `otherValues`

```tsx
// When selecting a project, auto-populate the notes field
const handleProjectChange = (selectedRow) => {
  formHelper.handleChange('project', selectedRow, {
    notes: `Project ${selectedRow.label} selected`,
  })
}

;<FormItemSelect
  id="project"
  label="Project"
  rowsData={projectData}
  onSelectedChange={handleProjectChange}
  formHelper={formHelper}
/>
```

#### Dynamic validations (fields toggled at runtime)

```tsx
// When validations change after the form has errors, Form automatically re-validates
const [showTime, setShowTime] = useState(false)

const validations = {
  email: {
    [Form.VALIDATION_RULE.TYPE]: Form.VALIDATION_TYPE.EMAIL,
    message: 'Invalid email',
  },
  ...(showTime
    ? {
        time: {
          [Form.VALIDATION_RULE.TYPE]: Form.VALIDATION_TYPE.TIME,
          message: 'Invalid time',
        },
      }
    : {}),
}

;<Form validations={validations} onSubmit={(values) => console.log(values)}>
  {(formHelper) => (
    <FormSection>
      <FormItemInput id="email" label="Email" formHelper={formHelper} />
      {showTime && (
        <FormItemTimePicker
          id="time"
          label="Time"
          format12Hours={false}
          formHelper={formHelper}
        />
      )}
      <Button onClick={formHelper.handleSubmit}>Submit</Button>
    </FormSection>
  )}
</Form>
```

---

### Accessibility & Behaviour Notes

- `FormSection` renders as `<fieldset>` with `aria-labelledby` pointing at the title element and `aria-describedby` pointing at the description element.
- `FormItemProvider` sets `aria-describedby` on the wrapped control to point at the help text element, and `aria-invalid` when `error={true}`.
- When `error={true}`, the help text container gets `role="alert"` so screen readers announce the error message immediately.
- Error icon (`AlertTriangleIcon`) gets `aria-label="Error:"` when `errorType` is `CRITICAL`; warning icon gets `aria-label="Warning:"`.
- `statusIconProps` icon is rendered with `aria-hidden="true"` — do not rely on it to convey required information.
- **Avoid** `disabled` on submit buttons; use `aria-disabled` instead. A disabled button is invisible to screen readers, and users cannot discover why submission is blocked. See source accessibility notes in `Form.examples.md`.
- Fields tracked by `validations` with `REQUIRED: true` automatically receive `aria-required` on the underlying `<input>` via `requireMap`.
- `FormItemCheckbox` and `FormItemRadioGroup` link their control to the label via `aria-labelledby` (`${id}-label`).
- `FormItemCodeInput` explicitly sets `aria-labelledby={`${id}-label`}` and `aria-describedby` for the help text on the Monaco editor wrapper.

---

### Anti-patterns

- Don't manually compose `TextLabel` + `Input` + error `TextLabel` — use `FormItemInput`.
- Don't skip `id` — it is required for label-input association and `aria-*` wiring.
- Don't use `disabled` on the submit button to prevent invalid submission; use `aria-disabled` with a visible explanation.
- Use `FormSection` to group related fields; it renders semantic `<fieldset>` markup.
- Don't render bare `Input`/`Select`/`TextArea` when Figma shows Label Top or Label Bottom — use the corresponding `FormItem*` wrapper.
- Don't change field values unexpectedly without announcing the change to screen readers (see "Change multiple values" example note in source).

<!-- SOURCE-API-START -->

### Import

```tsx
import {
  Form,
  FormSection,
  FormLayout,
  FormItemProvider,
  FormItemInput,
  FormItemInputPassword,
  FormItemSelect,
  FormItemTextArea,
  FormItemCodeInput,
  FormItemDatePicker,
  FormItemTimePicker,
  FormItemCheckbox,
  FormItemRadioGroup,
} from '@nutanix-ui/prism-reactjs'
```

### Props Interfaces

#### `FormHelper`

| Prop                       | Type                                                                                                 | Description                                                                   |
| -------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `errors`                   | `{ [key: string]: { error?: boolean; message?: string } }`                                           | Current error state keyed by field id.                                        |
| `values`                   | `{ [key: string]: any }`                                                                             | Current field values keyed by field id.                                       |
| `handleChange`             | `(id: string, value: string \| moment.Moment \| RangeDates, otherValues?: Record<any, any>) => void` | Update one or more field values.                                              |
| `handleValidation`         | `(id: string, value: string \| boolean) => void`                                                     | Validate a single field on blur.                                              |
| `updateValidationRegistry` | `(formItemId: string, getOptions?: () => Record<any, any>) => void`                                  | Register extra validation options (used internally by DatePicker/TimePicker). |
| `handleReset`              | `() => void`                                                                                         | Reset form to initial state.                                                  |
| `handleSubmit`             | `(event?: unknown) => void`                                                                          | Run full validation; call `onSubmit` if clean.                                |
| `hasError`                 | `boolean`                                                                                            | True if any field currently has an error.                                     |
| `requireMap`               | `Record<string, boolean>`                                                                            | Maps field id → whether it is required (from `validations`).                  |

#### `FormProps`

Extends: `Omit<React.HTMLProps<HTMLFormElement>, 'ref'>`

| Prop            | Type                                                  | Description                                                     |
| --------------- | ----------------------------------------------------- | --------------------------------------------------------------- |
| `children`      | `((helper: FormHelper) => ReactNode) \| ReactNode`    | Static children or render-prop function receiving `FormHelper`. |
| `className`     | `string`                                              | Additional CSS class.                                           |
| `defaultValues` | `Record<any, any>`                                    | Initial field values.                                           |
| `defaultErrors` | `Record<any, any>`                                    | Initial error objects.                                          |
| `onSubmit`      | `(values: Record<any, any>, event?: unknown) => void` | Called when validation passes.                                  |
| `validations`   | `Record<any, any> \| Record<any, any>[]`              | Validation rule objects keyed by field id.                      |
| `data-test`     | `string`                                              | Test attribute on `<form>`.                                     |

#### `FormSectionProps`

Extends: `StackingLayoutProps`

| Prop          | Type                                                    | Description                               |
| ------------- | ------------------------------------------------------- | ----------------------------------------- |
| `children`    | `ReactNode`                                             | Form item children.                       |
| `className`   | `string`                                                | Additional CSS class.                     |
| `title`       | `string`                                                | Section heading rendered as `Title` (h3). |
| `titleProps`  | `Omit<TitleProps, 'children'>`                          | Props forwarded to the `Title` element.   |
| `description` | `ReactNode`                                             | Description paragraph below the title.    |
| `topSection`  | `{ leftContent?: ReactNode; rightContent?: ReactNode }` | Custom content row above children.        |
| `data-test`   | `string`                                                | Test attribute.                           |

#### `FormItemProviderProps`

| Prop                    | Type                                                                                | Default              | Description                                     |
| ----------------------- | ----------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------- |
| `id`                    | `string \| number`                                                                  | —                    | Links label to control.                         |
| `label`                 | `ReactNode`                                                                         | —                    | Primary label above the input.                  |
| `secondaryLabel`        | `ReactNode`                                                                         | —                    | Secondary label (right-aligned beside primary). |
| `helpText`              | `ReactNode`                                                                         | —                    | Help or error text below the input.             |
| `helpTextProps`         | `FlexItemProps & { isTruncated?: boolean; truncateProps?: TruncateComponentProps }` | `{}`                 | Props for the help text wrapper.                |
| `hideHelpTextIcon`      | `boolean`                                                                           | `false`              | Suppress the help text icon.                    |
| `error`                 | `boolean`                                                                           | —                    | Activates error styling and `aria-invalid`.     |
| `errorType`             | `ErrorType`                                                                         | `ErrorType.CRITICAL` | `CRITICAL` or `WARNING`.                        |
| `formItemProviderProps` | `StackingLayoutProps`                                                               | `{}`                 | Props for the outer `StackingLayout` wrapper.   |
| `statusIconProps`       | `StatusIconProps`                                                                   | —                    | Status icon beside the label (`aria-hidden`).   |

### Usage Notes

- Prefer documented enum/static values such as `Form.VALIDATION_RULE.<KEY>` and `Form.VALIDATION_TYPE.<KEY>` over raw strings.
- Keep labels, help text, and validation visible and persistent; use `FormItem*` wrappers where available.
- Use Prism layout props (`itemGap`, `itemSpacing`, `padding`, etc.) instead of custom CSS for layout and spacing.
- `FormItemCheckbox` and `FormItemRadioGroup` are not in the original doc's wrapper table — they are fully supported and exported.
- `FormItemProvider` is exported and can wrap any custom component that does not have a dedicated `FormItem*` wrapper.
- `FormLayout` is exported separately and is the preferred outer wrapper for wizard/modal forms with constrained content width.

<!-- SOURCE-API-END -->
