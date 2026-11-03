# MultiInput

## Figma

- **Library name:** Multi-Input (page: N/A, frame: Multi-Input)

## React

Import: `import { MultiInput } from '@nutanix-ui/prism-reactjs'`

### TSX Examples

```tsx
{
  /* Basic controlled multi-input */
}
const [values, setValues] = React.useState<string[]>([])
;<MultiInput
  values={values}
  onValuesChange={(newValues) => setValues(newValues as string[])}
  placeholder="Type then press Enter or Tab to add"
  addEntryKeys={['Tab', 'Enter']}
  deleteEntryKeys={['Delete']}
/>
```

```tsx
{
  /* With error state */
}
;<MultiInput
  values={ips}
  onValuesChange={setIps}
  error={true}
  errorType="critical"
  placeholder="Add IP addresses"
/>
```

### Anti-patterns

- Don't use `Input` with manual tag management — use `MultiInput`
- Don't confuse with `MultiSelect` (MultiSelect has a dropdown; MultiInput is free-form)
- Don't pass `onChange` — the correct callback is `onValuesChange`
- Don't use `separator` — there is no such prop; configure delimiters via `addEntryKeys`
- Don't use `Input.ErrorType.CRITICAL` — use the `errorType` string `"critical"` or import `ErrorType` directly

<!-- SOURCE-API-START -->

### Import

```tsx
import { MultiInput } from '@nutanix-ui/prism-reactjs'
```

To wrap with a label and help text use `FormItemProvider`:

```tsx
import { MultiInput, FormItemProvider } from '@nutanix-ui/prism-reactjs'
const MultiInputWithLabel = FormItemProvider(MultiInput)
```

### Enums / Constants

#### `MultiInputChangeTypes`

Exported directly from `@nutanix-ui/prism-reactjs` (re-exported via the `MultiInput` module). Also available as `MultiInput.CHANGE_TYPES`.

| Key         | Value         |
| ----------- | ------------- |
| `ADD`       | `'add'`       |
| `DELETE`    | `'delete'`    |
| `CLEAR_ALL` | `'clear-all'` |
| `UPDATE`    | `'update'`    |

```tsx
import { MultiInputChangeTypes } from '@nutanix-ui/prism-reactjs'
// or
MultiInput.CHANGE_TYPES.ADD // 'add'
```

#### `ErrorType` (from `Input`)

Used for `errorType` prop and for per-tag `valuesTagItemProps[n].errorType`.

| Key        | Value        |
| ---------- | ------------ |
| `WARNING`  | `'warning'`  |
| `CRITICAL` | `'critical'` |

```tsx
import { Input } from '@nutanix-ui/prism-reactjs'
// Input.ErrorType.CRITICAL  →  'critical'
// Input.ErrorType.WARNING   →  'warning'
// Or use the literal strings directly: errorType="critical"
```

### Props Interfaces

#### `MultiInputProps`

Extends: `Omit<React.HTMLProps<HTMLDivElement>, 'ref'>`

| Prop                   | Type                                                                                           | Required | Default                      | Description                                                                                                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------- | -------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `values`               | `React.ReactNode[]`                                                                            | **Yes**  | `[]`                         | Array of values. Strings are wrapped in `MultiSelectedItemTag`; custom React nodes are rendered as-is (caller owns styling and interaction).                                   |
| `onValuesChange`       | `(newValues, type, index?, prevValues?) => void`                                               | **Yes**  | `() => null`                 | Fires whenever the values array changes. See signature below.                                                                                                                  |
| `assistiveMessage`     | `string`                                                                                       | No       | —                            | Overrides the internal screen-reader live-region message. Pass `''` to silence automatic announcements.                                                                        |
| `className`            | `string`                                                                                       | No       | —                            | Additional CSS class.                                                                                                                                                          |
| `valuesTagItemProps`   | `(Omit<MultiSelectedItemTagProps, 'children' \| 'highlighted'> & { highlighted?: boolean })[]` | No       | —                            | Per-tag props for `MultiSelectedItemTag`. Supports `closable`, `readOnly`, `errorType`, `deleteButtonProps`, `data-test-id`, `insertBefore`, `suffix`, etc.                    |
| `valueRenderer`        | `(value: React.ReactNode, index: number) => JSX.Element`                                       | No       | —                            | Custom renderer for each tag instead of the default `MultiSelectedItemTag`. Caller must handle all styling and interaction.                                                    |
| `disabled`             | `boolean`                                                                                      | No       | `false`                      | Fully disables the component; hides close icons on tags.                                                                                                                       |
| `aria-disabled`        | `AriaDisabledType`                                                                             | No       | —                            | Marks the component non-interactive with read-only visual styles. Prefer `disabled` for full disabling.                                                                        |
| `readOnly`             | `boolean`                                                                                      | No       | —                            | **Deprecated.** Use `aria-disabled` instead.                                                                                                                                   |
| `error`                | `boolean`                                                                                      | No       | `false`                      | Enables error border styling on the input container.                                                                                                                           |
| `errorType`            | `ErrorType` (`'warning'` \| `'critical'`)                                                      | No       | `'critical'`                 | Controls error icon/colour. Requires `error={true}`.                                                                                                                           |
| `placeholder`          | `string`                                                                                       | No       | _(i18n default)_             | Placeholder text shown when there are no tags and the input is empty.                                                                                                          |
| `inputProps`           | `MultiSelectInputProps`                                                                        | No       | `{}`                         | Props forwarded to the inner `MultiSelectInput`. Includes `background`, `noTagsNavInstruction`, `keyNavInstruction`, `inputRef`, `id`, `onKeyDown`, `onChange`, `onBlur`, etc. |
| `addEntryKeys`         | `Key[]`                                                                                        | No       | `[Space, Comma, Tab, Enter]` | Keys that commit the current input text as a new tag. For best a11y use `['Tab', 'Enter']`.                                                                                    |
| `deleteEntryKeys`      | `Key[]`                                                                                        | No       | `[Backspace, Delete]`        | Keys that delete the last tag when the input is empty. For best a11y use `['Delete']`.                                                                                         |
| `clearButtonIconProps` | `MultiSelectInputProps['clearButtonIconProps']`                                                | No       | —                            | Props for the clear-all button (e.g. `data-test-id`).                                                                                                                          |
| `data-test`            | `string`                                                                                       | No       | —                            | Test selector attribute on the outer `<div>`.                                                                                                                                  |

##### `onValuesChange` signature

```tsx
onValuesChange: (
  newValues: React.ReactNode[],   // updated values array
  type: MultiInputChangeTypes,    // 'add' | 'delete' | 'clear-all' | 'update'
  index?: number,                 // modified index; undefined for 'clear-all'
  prevValues?: React.ReactNode[]  // previous values array
) => void
```

- `ADD`: index is the position of the newly added item (end of array).
- `DELETE`: index is the removed item's position in the original array.
- `UPDATE`: index is the edited item's position.
- `CLEAR_ALL`: index is `undefined`.

### Static Members

| Member                    | Type                           | Description                                 |
| ------------------------- | ------------------------------ | ------------------------------------------- |
| `MultiInput.CHANGE_TYPES` | `typeof MultiInputChangeTypes` | Alias for the `MultiInputChangeTypes` enum. |

### Keyboard Interaction

| Shortcut                        | Input state | Tag highlighted | Action                                                                       |
| ------------------------------- | ----------- | --------------- | ---------------------------------------------------------------------------- |
| `ArrowLeft` / `ArrowRight`      | Empty       | —               | Navigate through tags; visually highlights the selected tag.                 |
| `Delete` / `Backspace`          | Empty       | No              | Delete the last tag.                                                         |
| `Delete`                        | Empty       | Yes             | Delete the highlighted tag (skipped when tag has `closable: false`).         |
| `Enter`                         | Empty       | Yes             | Enter inline edit mode for the highlighted tag.                              |
| `Enter` / `Tab` / `,` / `Space` | Filled      | No              | Commit input text as a new tag (default keys; configure via `addEntryKeys`). |
| `Escape`                        | —           | Yes             | Cancel tag highlight (or cancel in-progress edit).                           |
| `Blur`                          | Any text    | —               | Auto-commits any non-empty trimmed input value as a new tag.                 |

### Paste Behaviour

When text is pasted into the input, `MultiInput` automatically splits the clipboard text on any character that matches `addEntryKeys`. All segments except the last are committed as tags immediately; the final segment remains in the input for further editing. Screen reader live region announces the created tags.

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Basic usage (recommended keyboard config)

```tsx
import React, { useState } from 'react'
import { MultiInput, FormItemProvider } from '@nutanix-ui/prism-reactjs'

const MultiInputWithLabel = FormItemProvider(MultiInput)

const MyInput = () => {
  const [values, setValues] = useState<string[]>([])

  return (
    <div>
      <MultiInputWithLabel
        data-test-id="default"
        label="MultiInput Demo"
        helpText="Type some text and use 'Tab', or 'Enter' to add a new entry"
        values={values}
        onValuesChange={(newValues) => setValues(newValues as string[])}
        addEntryKeys={['Tab', 'Enter']}
        deleteEntryKeys={['Delete']}
        placeholder="Type text then press enter, or tab key to add tag"
        inputProps={{
          noTagsNavInstruction:
            'Type text then press enter, or tab key to add tag',
          keyNavInstruction:
            'Use left and right arrow keys to navigate, enter or tab key to create, delete key to delete tags.',
        }}
        id="multi-input-custom-id-default-case"
        style={{ maxWidth: '600px' }}
      />
    </div>
  )
}
```

#### Error styles and adding custom `data-test` attributes to tags

```tsx
import React from 'react'
import {
  MultiInput,
  FormItemProvider,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'

const MultiInputWithLabel = FormItemProvider(MultiInput)

const values = [
  'apple',
  'pear',
  'bad apple',
  'this is really a long text, when there is a long text, you can notice getting the ellipses at the end of the text and shows the tooltip',
  'thisisreallyalongtextwhenthereisalongtextyoucannoticegettingtheellipsesattheendofthetextandshowsthetooltip',
]

const valuesTagItemProps = [
  {
    'data-test-id': 'apple-test-id',
    deleteButtonProps: { 'data-test-id': 'apple-delete-test-id' },
  },
  {
    'data-test-id': 'pear-test-id',
    deleteButtonProps: { 'data-test-id': 'pear-delete-test-id' },
  },
  { 'data-test-id': 'bad-apple-test-id', errorType: 'critical' },
  { 'data-test-id': 'long-text-with-word-gap-test-id', errorType: 'critical' },
  {
    'data-test-id': 'long-text-without-word-gap-test-id',
    errorType: 'critical',
  },
]

;<StackingLayout data-test-id="error-container" style={{ paddingTop: '100px' }}>
  <MultiInputWithLabel
    label="Error example"
    data-test-id="error"
    error={true}
    errorType="critical"
    values={values}
    valuesTagItemProps={valuesTagItemProps}
    helpText="Apple is bad!"
    clearButtonIconProps={{ 'data-test-id': 'my-clear-all-button' }}
    style={{ maxWidth: '600px' }}
  />
  <MultiInputWithLabel
    label="Warning example"
    data-test-id="warning"
    error={true}
    errorType="warning"
    values={['warning']}
    valuesTagItemProps={[{ errorType: 'warning' }]}
    helpText="something isn't quite right"
    style={{ maxWidth: '600px' }}
  />
</StackingLayout>
```

#### Aria Disabled style

```tsx
import React from 'react'
import { MultiInput, FormItemProvider } from '@nutanix-ui/prism-reactjs'

const MultiInputWithLabel = FormItemProvider(MultiInput)

const values = [
  'apple',
  'pear',
  'bad apple',
  'this is really a long text, when there is a long text, you can notice getting the ellipses at the end of the text and shows the tooltip',
  'thisisreallyalongtextwhenthereisalongtextyoucannoticegettingtheellipsesattheendofthetextandshowsthetooltip',
]

;<MultiInputWithLabel
  style={{ maxWidth: '600px' }}
  label="Aria Disabled"
  data-test-id="aria-disabled"
  aria-disabled={true}
  values={values}
/>
```

#### Disabled style

```tsx
import React from 'react'
import { MultiInput, FormItemProvider } from '@nutanix-ui/prism-reactjs'

const MultiInputWithLabel = FormItemProvider(MultiInput)

const values = [
  'apple',
  'pear',
  'bad apple',
  'this is really a long text, when there is a long text, you can notice getting the ellipses at the end of the text and shows the tooltip',
  'thisisreallyalongtextwhenthereisalongtextyoucannoticegettingtheellipsesattheendofthetextandshowsthetooltip',
]

;<MultiInputWithLabel
  style={{ maxWidth: '600px' }}
  label="Disabled"
  data-test-id="disabled"
  disabled={true}
  values={values}
/>
```

#### Per-tag non-closable and read-only via `valuesTagItemProps`

Use `valuesTagItemProps` to control individual tags: `closable: false` prevents deletion; `readOnly: true` prevents editing.

```tsx
import React, { useState } from 'react'
import { MultiInput, FormItemProvider } from '@nutanix-ui/prism-reactjs'

const MultiInputWithLabel = FormItemProvider(MultiInput)

const initialValues = ['editable tag', 'non-closable tag', 'read-only tag']

const valuesTagItemProps = [{}, { closable: false }, { readOnly: true }]

const MyInput = () => {
  const [values, setValues] = useState(initialValues)

  return (
    <MultiInputWithLabel
      label="Tags using valuesTagItemProps"
      data-test-id="non-closable-and-read-only"
      values={values}
      valuesTagItemProps={valuesTagItemProps}
      onValuesChange={setValues}
      addEntryKeys={['Tab', 'Enter']}
      deleteEntryKeys={['Delete']}
      placeholder="Type text then press enter, or tab key to add tag"
      inputProps={{
        noTagsNavInstruction:
          'Type text then press enter, or tab key to add tag',
        keyNavInstruction:
          'Use left and right arrow keys to navigate, enter or tab key to create, delete key to delete tags.',
      }}
      style={{ maxWidth: '600px' }}
    />
  )
}
```

#### Screen Reader: Custom Assertive Message

```tsx
import React, { useState } from 'react'
import { MultiInput, FormItemProvider } from '@nutanix-ui/prism-reactjs'

const MultiInputWithLabel = FormItemProvider(MultiInput)

const MyInput = () => {
  const [values, setValues] = useState([])
  // Pass assistiveMessage='' to disable the default announcements.
  const [assistiveMessage, setAssistiveMessage] = useState('')

  // Highly recommended to use your own i18n strings here.
  const getCustomMessage = (values, action, position, prevValues) => {
    if (action === 'clear-all') return 'All tags cleared.'
    const list = action === 'delete' ? prevValues : values
    if (list && position in list) {
      return `Tag "${list[position]}" was ${action === 'add' ? 'added' : action === 'delete' ? 'removed' : 'updated'}.`
    }
    return ''
  }

  const handleOnValuesChange = (newValues, action, position, prevValues) => {
    setValues(newValues)
    setAssistiveMessage(
      getCustomMessage(newValues, action, position, prevValues),
    )
  }

  return (
    <div data-test-id="multi-input-custom-assistive-wrapper-id">
      <MultiInputWithLabel
        assistiveMessage={assistiveMessage}
        data-test-id="custom-assistive"
        label="MultiInput Demo"
        helpText="Type some text and hit 'Tab', or 'Enter' key to add a new entry."
        values={values}
        onValuesChange={handleOnValuesChange}
        addEntryKeys={['Tab', 'Enter']}
        deleteEntryKeys={['Delete']}
        placeholder="Type text then press enter, or tab key to add tag"
        inputProps={{
          noTagsNavInstruction:
            'Type text then press enter, or tab key to add tag',
          keyNavInstruction:
            'Use left and right arrow keys to navigate, enter or tab key to create, delete key to delete tags.',
        }}
        id="multi-input-custom-assistive-case"
        style={{ maxWidth: '600px' }}
      />
    </div>
  )
}
```

#### Alt background via `inputProps`

Pass `background` on `inputProps` to match the surface the component sits on:

```tsx
<MultiInput
  values={values}
  onValuesChange={setValues}
  inputProps={{ background: 'alt' }}
/>
// or for a base background on an alt surface:
<MultiInput
  values={values}
  onValuesChange={setValues}
  inputProps={{ background: 'base' }}
/>
```

### Usage Notes

- `values` and `onValuesChange` are both **required**. The component is fully controlled.
- For best accessibility override the default `addEntryKeys` / `deleteEntryKeys` and pass `inputProps.noTagsNavInstruction` + `inputProps.keyNavInstruction` with localised strings.
- Use `valuesTagItemProps` to attach per-tag metadata (`errorType`, `closable`, `readOnly`, `deleteButtonProps`) rather than managing it outside the component.
- Prefer `aria-disabled` over the deprecated `readOnly` prop.
- Wrap with `FormItemProvider(MultiInput)` to get label, helpText, and inline error message support.
- Prefer `errorType="critical"` / `errorType="warning"` literal strings over `Input.ErrorType.*` in new code; both work at runtime.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.

<!-- SOURCE-API-END -->
