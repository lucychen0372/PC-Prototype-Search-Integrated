# CodeInput

## Figma

- **Library name:** Code Input (page: N/A, frame: Code Input)
- **Code Input variants:**
  - Theme: Light | Dark

## React

Import: `import { CodeInput } from '@nutanix-ui/prism-reactjs'`

### Figma -> React Prop Mapping

| Figma Property | React Prop  | Value Mapping                        |
| -------------- | ----------- | ------------------------------------ |
| Theme          | `themeMode` | Light -> `"light"`, Dark -> `"dark"` |

### Figma Form Field Composition

In Figma, a Code Input with Label Top / Label Bottom is a single component. In React, use `FormItemCodeInput`.

**Preferred: use `FormItemCodeInput`**:

```tsx
import { FormItemCodeInput } from '@nutanix-ui/prism-reactjs'
;<FormItemCodeInput
  id="config"
  label="Configuration (JSON)" // -> Figma Label Top
  helpText={errors.config} // -> Figma Label Bottom
  error={!!errors.config}
  value={jsonConfig}
  onChange={(val) => setJsonConfig(val)}
  themeMode="dark"
  language="json"
/>
```

**Manual approach**:

```tsx
<StackingLayout itemGap="XS">
  <TextLabel id="config-label">Configuration (JSON)</TextLabel>
  <CodeInput
    value={jsonConfig}
    onChange={(val) => setJsonConfig(val)}
    themeMode="dark"
    language="json"
  />
</StackingLayout>
```

See `input.md` for the full Label Bottom Type -> React mapping table and `FormItemProvider` props reference.

### TSX Examples

```tsx
{
  /* Basic code input (no label -- standalone use only) */
}
;<CodeInput wrapperProps={{ 'data-test-id': 'basic' }} />
```

### Anti-patterns

- Don't use `<textarea>` for code -- use `CodeInput`
- Don't create custom code editors -- `CodeInput` handles syntax highlighting
- Don't render bare `CodeInput` when Figma shows Label Top or Label Bottom -- use `FormItemCodeInput`

<!-- SOURCE-API-START -->

### Import

```tsx
import { CodeInput } from '@nutanix-ui/prism-reactjs'
// For form-wrapped usage:
import { FormItemCodeInput } from '@nutanix-ui/prism-reactjs'
// ErrorType lives on Input:
import { Input } from '@nutanix-ui/prism-reactjs'
const { ErrorType } = Input
```

### Props Interfaces

#### `CodeInputProps`

Extends: `EditorProps` (from `@monaco-editor/react`)

| Prop               | Type                                                                            | Default              | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------- | -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`               | `string`                                                                        | —                    | No       | The id of the CodeInput. Also sets the `id` attribute on the inner Monaco textarea for `<label for="">` association.                                                                                                                                                                                                                                                                                               |
| `aria-labelledby`  | `string`                                                                        | —                    | No       | The id of the associated label element. Forwarded to the Monaco textarea for screen readers.                                                                                                                                                                                                                                                                                                                       |
| `aria-describedby` | `string`                                                                        | —                    | No       | The id of the associated description element. Combined with the internal hint id and forwarded to the Monaco textarea.                                                                                                                                                                                                                                                                                             |
| `className`        | `string`                                                                        | —                    | No       | Custom class name on the outer wrapper.                                                                                                                                                                                                                                                                                                                                                                            |
| `height`           | `string \| number`                                                              | `200`                | No       | Height of the outer editor container (e.g. `'400px'`, `400`).                                                                                                                                                                                                                                                                                                                                                      |
| `width`            | `string \| number`                                                              | `'100%'`             | No       | Width of the outer editor container (e.g. `'100%'`, `700`).                                                                                                                                                                                                                                                                                                                                                        |
| `wrapperProps`     | `DataWrapperProps<React.HTMLAttributes<HTMLDivElement>>`                        | —                    | No       | Additional HTML attributes for the outer wrapper `<div>`. Useful for `data-test-id`.                                                                                                                                                                                                                                                                                                                               |
| `value`            | `string`                                                                        | —                    | No       | Controlled value. Makes the editor controlled; pair with `onChange`. Use `defaultValue` for uncontrolled.                                                                                                                                                                                                                                                                                                          |
| `defaultValue`     | `string`                                                                        | —                    | No       | Uncontrolled initial value. Use when you do not need to track changes in React state.                                                                                                                                                                                                                                                                                                                              |
| `language`         | `string`                                                                        | —                    | No       | Language mode for syntax highlighting (e.g. `'javascript'`, `'json'`, `'yaml'`, `'typescript'`, `'html'`, `'shell'`). Enables Monaco's built-in diagnostics for the language.                                                                                                                                                                                                                                      |
| `defaultLanguage`  | `string`                                                                        | —                    | No       | Default language mode for uncontrolled usage.                                                                                                                                                                                                                                                                                                                                                                      |
| `readOnly`         | `boolean`                                                                       | `false`              | No       | Puts the editor in read-only mode. Also suppresses the exit-editor hint region.                                                                                                                                                                                                                                                                                                                                    |
| `disabled`         | `boolean`                                                                       | `false`              | No       | Disables the editor and applies disabled styling. Also suppresses the exit-editor hint region.                                                                                                                                                                                                                                                                                                                     |
| `loaderProps`      | `LoaderProps`                                                                   | —                    | No       | Props forwarded to the `<Loader>` shown while Monaco initialises. Supports `size`, `color`, `className`.                                                                                                                                                                                                                                                                                                           |
| `options`          | `MonacoEditorOptions`                                                           | —                    | No       | Raw Monaco editor options merged over the Prism defaults. See [Monaco Editor Options](https://microsoft.github.io/monaco-editor/docs.html#variables/editor.EditorOptions.html). Common overrides: `lineNumbers`, `minimap`, `tabSize`, `wordWrap`, `ariaLabel`.                                                                                                                                                    |
| `themeMode`        | `'light' \| 'dark' \| 'auto'`                                                   | `'auto'`             | No       | Controls editor colour theme. `'auto'` follows the app's `ThemeWrapperContext` (`'vs'` in light, `'vs-dark'` in dark). `'light'` forces `'vs'`; `'dark'` forces `'vs-dark'`. **Note:** Monaco applies themes globally — all editors on a page share the same theme. Use `'auto'` unless all editors intentionally differ from the app theme.                                                                       |
| `beforeMount`      | `BeforeMount`                                                                   | —                    | No       | Called before Monaco mounts. Receives the `monaco` instance. Useful for registering languages or themes.                                                                                                                                                                                                                                                                                                           |
| `onMount`          | `OnMount`                                                                       | —                    | No       | Called after Monaco mounts. Receives `(editor, monaco)`. Useful for imperative editor configuration.                                                                                                                                                                                                                                                                                                               |
| `onChange`         | `(value: string \| undefined, event: editor.IModelContentChangedEvent) => void` | —                    | No       | Fired on every content change. The first argument is the current editor string value.                                                                                                                                                                                                                                                                                                                              |
| `onBlur`           | `React.FocusEventHandler<HTMLDivElement>`                                       | —                    | No       | Fired when the outer wrapper div loses focus.                                                                                                                                                                                                                                                                                                                                                                      |
| `error`            | `boolean`                                                                       | `false`              | No       | When `true`, applies error border styling.                                                                                                                                                                                                                                                                                                                                                                         |
| `errorType`        | `ErrorType`                                                                     | `ErrorType.CRITICAL` | No       | Controls which error style is applied when `error={true}`. See `ErrorType` below.                                                                                                                                                                                                                                                                                                                                  |
| `editorHint`       | `React.ReactNode`                                                               | `undefined`          | No       | Content for the hint strip displayed above the editor (visible only when not `readOnly` and not `disabled`). `undefined` (default) → shows the default i18n exit-editor hint with an info icon. `string` → shown with the information icon. `null` → hint region is hidden entirely. Any other `ReactNode` → rendered as-is inside the hint container. For accessibility, keeping the default hint is recommended. |

#### `ErrorType` enum

Imported via `Input.ErrorType` or `const { ErrorType } = Input`.

| Constant             | Value        |
| -------------------- | ------------ |
| `ErrorType.CRITICAL` | `'critical'` |
| `ErrorType.WARNING`  | `'warning'`  |

#### `FormItemCodeInputProps`

Extends: `CodeInputProps` + `FormItemProviderProps`

`FormItemCodeInput` wraps `CodeInput` with `FormItemProvider`, adding a label row, help text row, and form validation integration.

| Prop                    | Type                                                             | Default              | Required | Description                                                                                                      |
| ----------------------- | ---------------------------------------------------------------- | -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `id`                    | `string`                                                         | —                    | **Yes**  | Unique id. Links the label (`for` attribute) to the editor and scopes `formHelper` field keys.                   |
| `label`                 | `React.ReactNode`                                                | —                    | No       | Primary label displayed top-left above the editor (Figma: Label Top).                                            |
| `secondaryLabel`        | `React.ReactNode`                                                | —                    | No       | Secondary label / action area displayed top-right (e.g. icon buttons for copy, fullscreen).                      |
| `helpText`              | `React.ReactNode`                                                | —                    | No       | Help or error text displayed below the editor (Figma: Label Bottom). Styled in error colour when `error={true}`. |
| `helpTextProps`         | `FlexItemProps & { isTruncated?: boolean; truncateProps?: ... }` | —                    | No       | Extra props for the help text container.                                                                         |
| `hideHelpTextIcon`      | `boolean`                                                        | `false`              | No       | Hides the default warning/info icon shown alongside `helpText`.                                                  |
| `error`                 | `boolean`                                                        | `false`              | No       | Applies error styling to the label, help text, and the wrapped `CodeInput`.                                      |
| `errorType`             | `ErrorType`                                                      | `ErrorType.CRITICAL` | No       | Controls the error style variant passed to `CodeInput`.                                                          |
| `formItemProviderProps` | `StackingLayoutProps`                                            | —                    | No       | Extra props for the outer `StackingLayout` wrapper.                                                              |
| `statusIconProps`       | `StatusIconProps`                                                | —                    | No       | Renders a `StatusIcon` next to the label (decorative — not announced by VoiceOver).                              |
| `formHelper`            | `FormHelper`                                                     | —                    | No       | Validation helper object injected by `<Form>`. See `FormHelper` interface below.                                 |

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
  handleSubmit?: () => void
}
```

### Exported Type Aliases

```ts
// Full Monaco standalone editor options type
type MonacoEditorOptions =
  import('monaco-editor').editor.IStandaloneEditorConstructionOptions

// Re-exported from @monaco-editor/react for typing callbacks
type MonacoEditor = import('monaco-editor').editor.IStandaloneCodeEditor
type CodeInputOnMountArgs = Parameters<NonNullable<CodeInputProps['onMount']>>

// Also re-exported from @monaco-editor/react:
// Monaco, OnMount, BeforeMount, MonacoReactEditorProps
```

### Monaco Default Options (set by Prism)

Prism sets these defaults; they can be overridden via the `options` prop:

| Option                             | Prism Default |
| ---------------------------------- | ------------- |
| `accessibilitySupport`             | `'on'`        |
| `lineHeight`                       | `18`          |
| `fontSize`                         | `13`          |
| `fontFamily`                       | `'menlo'`     |
| `minimap.enabled`                  | `false`       |
| `lineNumbers`                      | `'on'`        |
| `scrollBeyondLastLine`             | `false`       |
| `padding.top` / `padding.bottom`   | `10`          |
| `scrollbar.horizontalSliderSize`   | `6`           |
| `scrollbar.verticalSliderSize`     | `6`           |
| `hideCursorInOverviewRuler`        | `true`        |
| `lineNumbersMinChars`              | `4`           |
| `renderLineHighlightOnlyWhenFocus` | `true`        |

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Accessibility Guidelines

```tsx
<StackingLayout style={{ maxWidth: 800 }}>
  <Paragraph>
    CodeInput enables Monaco's accessibility support by default. This includes
    keyboard navigation, screen reader announcements, and focus management. For
    more advanced configuration and screen reader usage tips, see the
    <Link
      href="https://github.com/Microsoft/monaco-editor/wiki/Monaco-Editor-Accessibility-Guide"
      target="_blank"
      rel="noopener noreferrer"
      type="primary"
    >
      Monaco Editor Accessibility Guide
    </Link>
    .
  </Paragraph>
  <Paragraph>
    To move focus out of the editor, press Ctrl+M (or Ctrl+Shift+M on Mac) to
    toggle accessibility mode. These keyboard instructions are displayed by
    default above the editor, and screen readers announce it when focus enters
    the editor. If you hide them, provide equivalent instructions outside the
    editor and reference it with aria-describedby.
  </Paragraph>
  <Paragraph>
    You can provide an ariaLabel option to the editor for standalone use, giving
    a descriptive label for screen readers. However, in most cases, especially
    when used in forms like with FormItemCodeInput, a visible label should be
    used and linked via aria-labelledby.
  </Paragraph>
</StackingLayout>
```

#### Basic Example

```tsx
<CodeInput wrapperProps={{ 'data-test-id': 'basic' }} />
```

#### Controlled Example

```tsx
import React, { useState } from 'react'
import { CodeInput } from '@nutanix-ui/prism-reactjs'

const ControlledExample = () => {
  const [value, setValue] = useState('Initial Value')

  return <CodeInput value={value} onChange={(newValue) => setValue(newValue)} />
}
```

#### With Language Example

```tsx
import React, { useState } from 'react'
import { CodeInput } from '@nutanix-ui/prism-reactjs'

const CODE = `function hello() {
  console.log("Hello, world!");
}

hello();
`

const LanguageExample = () => {
  const [value, setValue] = useState(CODE)

  return (
    <CodeInput
      value={value}
      onChange={(val) => setValue(val)}
      language="javascript"
      wrapperProps={{ 'data-test-id': 'language' }}
    />
  )
}
```

#### Read Only Example

```tsx
import { CodeInput } from '@nutanix-ui/prism-reactjs'

const CODE = `{
  "name": "Stardew Valley",
  "genre": "Farming Sim"
}`

;<CodeInput
  language="json"
  value={CODE}
  readOnly={true}
  wrapperProps={{ 'data-test-id': 'read-only' }}
  options={{ ariaLabel: 'Read only editor' }}
/>
```

#### Disabled Example

```tsx
import { CodeInput } from '@nutanix-ui/prism-reactjs'
;<CodeInput
  language="yaml"
  value={`system:\n  status: stable\n  version: "1.1.9"\n`}
  disabled={true}
  wrapperProps={{ 'data-test-id': 'disabled' }}
/>
```

#### Error / Warning Style Example

```tsx
import React, { useState } from 'react'
import { CodeInput, Input } from '@nutanix-ui/prism-reactjs'

const { ErrorType } = Input

const WarningExample = () => {
  const [value, setValue] = useState('Warning!')

  return (
    <CodeInput
      error={true}
      errorType={ErrorType.WARNING}
      value={value}
      onChange={(val) => setValue(val)}
      wrapperProps={{ 'data-test-id': 'warning' }}
    />
  )
}
```

#### Custom Height and Width Example

```tsx
import { CodeInput, StackingLayout } from '@nutanix-ui/prism-reactjs'

const CODE = `<main>
  <h1>Hey</h1>
  <p>Compact editor example.</p>
</main>`

;<StackingLayout padding="20px" background="body">
  <CodeInput
    language="html"
    defaultValue={CODE}
    height="300px"
    width="455px"
    wrapperProps={{ 'data-test-id': 'custom-height-and-width' }}
  />
</StackingLayout>
```

#### Theme Override Example

```tsx
import React, { useState } from 'react'
import { CodeInput, Checkbox, FlexLayout } from '@nutanix-ui/prism-reactjs'

// Monaco applies theming globally — all editors on the page share the same theme.
// Use themeMode="auto" (default) to match the app theme.
// If you pin a theme, set the same themeMode on all editor instances.

const ThemedExample = () => {
  const [isDark, setIsDark] = useState(false)
  const [codeVal, setCodeVal] = useState('Change my theming mode.')

  return (
    <FlexLayout flexDirection="column">
      <Checkbox
        id="theme-override"
        type={Checkbox.CheckboxTypes.TOGGLE}
        label={isDark ? 'Dark' : 'Light'}
        checked={isDark}
        onChange={(e) => setIsDark(e.target.checked)}
      />
      <CodeInput
        value={codeVal}
        onChange={(value) => setCodeVal(value)}
        themeMode={isDark ? 'dark' : 'light'}
        wrapperProps={{ 'data-test-id': 'theme-override' }}
      />
    </FlexLayout>
  )
}
```

#### Custom Editor Options Example

```tsx
import { CodeInput } from '@nutanix-ui/prism-reactjs'
;<CodeInput
  language="yaml"
  defaultValue={`# config\nkey: value\n`}
  options={{
    lineNumbers: 'off',
    minimap: { enabled: true },
    tabSize: 2,
    wordWrap: 'on',
    wrappingIndent: 'indent',
    scrollBeyondLastLine: false,
    smoothScrolling: true,
  }}
  wrapperProps={{ 'data-test-id': 'custom-options' }}
/>
```

#### Custom `editorHint` Example

```tsx
import { CodeInput } from '@nutanix-ui/prism-reactjs'

// Suppress the default hint:
;<CodeInput editorHint={null} />

// Replace with a custom string (shown with info icon):
;<CodeInput editorHint="Press Escape then Tab to exit the editor." />
```

#### `FormItemCodeInput` — Basic Example

```tsx
import React, { useState } from 'react'
import { FormItemCodeInput } from '@nutanix-ui/prism-reactjs'

const BasicFormItemCodeInputExample = () => {
  const [value, setValue] = useState('')

  return (
    <FormItemCodeInput
      id="basic-code-input"
      label="Label"
      helpText="Help Text"
      value={value}
      onChange={(newValue) => setValue(newValue)}
      wrapperProps={{ 'data-test-id': 'basic' }}
    />
  )
}
```

#### `FormItemCodeInput` — With Actions (secondary label slot)

```tsx
import React, { useState } from 'react'
import {
  FormItemCodeInput,
  Button,
  Tooltip,
  FlexLayout,
  CloneIcon,
} from '@nutanix-ui/prism-reactjs'

const CodeInputWithActions = () => {
  const [value, setValue] = useState('')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const inputActions = (
    <FlexLayout itemGap="M" alignItems="center" justifyContent="flex-end">
      <Tooltip
        oldTooltip={false}
        appearance={Tooltip.APPEARANCE.SECONDARY}
        size="mini"
        content={copied ? 'Copied' : 'Copy'}
      >
        <Button
          type={Button.ButtonTypes.ICON_SECONDARY}
          appearance="mini"
          onClick={handleCopy}
          aria-label="Copy content."
        >
          <CloneIcon />
        </Button>
      </Tooltip>
    </FlexLayout>
  )

  return (
    <FormItemCodeInput
      id="code-input-with-actions"
      label="Configuration"
      secondaryLabel={inputActions}
      value={value}
      onChange={(val) => setValue(val)}
      language="yaml"
      wrapperProps={{ 'data-test-id': 'with-actions' }}
    />
  )
}
```

#### `FormItemCodeInput` — With Form Validation

```tsx
import {
  Form,
  FormSection,
  FormItemCodeInput,
  Button,
} from '@nutanix-ui/prism-reactjs'

const validations = {
  'code-editor': {
    [Form.VALIDATION_RULE.REQUIRED]: true,
    message: 'Code is required.',
  },
}

const FormValidationExample = () => (
  <Form validations={validations} onSubmit={(values) => console.log(values)}>
    {(formHelper) => (
      <FormSection>
        <FormItemCodeInput
          id="code-editor"
          label="Code"
          formHelper={formHelper}
          options={{ ariaLabel: 'Code editor' }}
          wrapperProps={{ 'data-test-id': 'validation-with-form' }}
        />
        <Button onClick={formHelper.handleSubmit}>Submit</Button>
      </FormSection>
    )}
  </Form>
)
```

### Keyboard Behaviour

| Key                           | Action                                                 |
| ----------------------------- | ------------------------------------------------------ |
| Tab (inside editor)           | Inserts a tab character (does not leave editor)        |
| Ctrl+M / Ctrl+Shift+M (macOS) | Toggles accessibility mode; allows Tab to navigate out |
| Standard Monaco shortcuts     | Undo, redo, find, replace, multi-cursor, etc.          |

### Accessibility Notes

- `accessibilitySupport` is forced `'on'` by Prism defaults — screen reader announcements and keyboard navigation are always enabled.
- When `id` is provided, Prism sets it on the inner Monaco `<textarea>` so `<label for="...">` click-to-focus works.
- `aria-labelledby` and `aria-describedby` are forwarded to the inner `<textarea>` on mount.
- The exit-editor hint (`editorHint`) is rendered with its own `id` and included in the composed `aria-describedby` so screen readers announce it when focus enters.
- In `readOnly` or `disabled` mode the hint region is suppressed automatically.
- For critical error messages in forms, complement `helpText` with an `<Alert>` — `aria-describedby` is not reliably announced on change in all browser/AT combinations.
- `CodeInput` bundles Monaco locally (no CDN). When running Jest tests, mock `monaco-editor` and `@monaco-editor/react` to avoid load failures.

### Usage Notes

- Prefer documented enum/static values such as `Input.ErrorType.WARNING` over raw strings when the component exposes them.
- Keep labels, help text, and validation visible and persistent for form controls; use `FormItem*` wrappers where available.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.
- Monaco applies theming **globally** — all editor instances on the page share the same theme. Use `themeMode="auto"` unless you explicitly want to pin a theme. If you pin a theme, do so consistently across all instances.
- For optimal performance with large files, configure your bundler to handle Monaco web workers (e.g. `monaco-editor-webpack-plugin` for Webpack). Without this, Monaco runs on the main thread and may cause brief UI pauses.

<!-- SOURCE-API-END -->
