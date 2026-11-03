# Input

## Figma

- **Library name:** Text Input (page: N/A, frame: Text Input)
- **Also matches:** Search Input

## React

Import: `import { Input } from '@nutanix-ui/prism-reactjs'`

### Figma Form Field Composition

In Figma, a form input is a **single component** with built-in Label Top and Label Bottom sub-elements toggled via variant options. In React, this must be composed from multiple elements.

```
Figma (single component)          React (composed)
┌──────────────────────┐
│ Label Top            │  -->  <TextLabel id="x-label">         or  FormItemInput label prop
│ ┌──────────────────┐ │
│ │ Text Input       │ │  -->  <Input aria-labelledby="x-label"> or  FormItemInput (inherits InputProps)
│ └──────────────────┘ │
│ Label Bottom (Error) │  -->  <TextLabel type={...ERROR}>       or  FormItemInput helpText + error props
└──────────────────────┘
```

**Preferred: use `FormItemInput`** -- auto-generates label, help text, error styling, and aria attributes:

```tsx
import { FormItemInput } from '@nutanix-ui/prism-reactjs'
;<FormItemInput
  id="email"
  label="Email Address" // -> Figma Label Top
  secondaryLabel="(optional)" // -> secondary text next to label
  helpText={errors.email} // -> Figma Label Bottom
  error={!!errors.email} // -> red styling on input + helpText
  errorType={Input.ErrorType.CRITICAL} // -> error severity
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="user@example.com"
  required={true} // -> asterisk on label
/>
```

For `InputPassword`, use `FormItemInputPassword`:

```tsx
import { FormItemInputPassword } from '@nutanix-ui/prism-reactjs'
;<FormItemInputPassword
  id="password"
  label="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  showPasswordAriaLabel="Show password"
  hidePasswordAriaLabel="Hide password"
/>
```

**Manual approach** (when you need custom layout around the input):

```tsx
<StackingLayout itemGap="XS">
  <TextLabel id="email-label">Email Address</TextLabel>
  <Input
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    aria-labelledby="email-label"
    aria-describedby={errors.email ? 'email-error' : undefined}
    error={!!errors.email}
    errorType={Input.ErrorType.CRITICAL}
  />
  {errors.email && (
    <TextLabel id="email-error" type={TextLabel.TextLabelType.ERROR}>
      {errors.email}
    </TextLabel>
  )}
</StackingLayout>
```

**Figma Label Bottom Type -> React mapping:**

| Figma Label Bottom | React Props                                                                       |
| ------------------ | --------------------------------------------------------------------------------- |
| _(hidden)_         | Omit `helpText`                                                                   |
| Type: Default      | `helpText="hint text"`                                                            |
| Type: Error        | `helpText="error msg"` + `error={true}` + `errorType={Input.ErrorType.CRITICAL}`  |
| Type: Warning      | `helpText="warning msg"` + `error={true}` + `errorType={Input.ErrorType.WARNING}` |
| Type: Success      | `helpText="success msg"` (no error flag)                                          |

**Key `FormItemProvider` props** (available on all `FormItem*` wrappers):

| Prop                    | Type              | Notes                                                                          |
| ----------------------- | ----------------- | ------------------------------------------------------------------------------ |
| `label`                 | `ReactNode`       | Figma Label Top                                                                |
| `secondaryLabel`        | `ReactNode`       | Secondary text beside label (not announced by screen readers — avoid)          |
| `helpText`              | `ReactNode`       | Figma Label Bottom                                                             |
| `error`                 | `boolean`         | Styles helpText as error                                                       |
| `errorType`             | `ErrorType`       | `Input.ErrorType.CRITICAL` or `.WARNING`                                       |
| `hideHelpTextIcon`      | `boolean`         | Hide the default help text icon                                                |
| `required`              | renders asterisk  | Shows `*` next to label                                                        |
| `statusIconProps`       | `StatusIconProps` | Icon beside label                                                              |
| `helpTextProps`         | `object`          | Props passed to the help text element; supports `isTruncated`, `truncateProps` |
| `formItemProviderProps` | `object`          | Props passed to the outer `FormItemProvider` wrapper element                   |

### TSX Examples

```tsx
{
  /* Basic controlled input (no label -- standalone use only) */
}
;<Input
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Enter name"
/>

{
  /* Input with label + error (prefer FormItemInput above) */
}
;<StackingLayout itemGap="XS">
  <TextLabel id="email-label">Email</TextLabel>
  <Input
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    aria-labelledby="email-label"
    aria-describedby={error ? 'email-error' : undefined}
    error={!!error}
    errorType={Input.ErrorType.CRITICAL}
  />
  {error && (
    <TextLabel id="email-error" type={TextLabel.TextLabelType.ERROR}>
      {error}
    </TextLabel>
  )}
</StackingLayout>

{
  /* Search input -- uncontrolled */
}
;<Input search={true} placeholder="Search endpoints..." />

{
  /* Search input -- controlled with clear button */
}
;<FormItemInput
  id="search-controlled"
  label="Search"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  search={true}
  onClearButtonClick={() => setQuery('')}
/>

{
  /* Search with custom aria on icon and clear button */
}
;<Input
  name="input-accessible-search"
  placeholder="Search..."
  search={true}
  defaultValue="Default Search Value"
  searchIconProps={{
    id: 'search-icon-id',
    'aria-hidden': false,
    'aria-label': 'Search',
  }}
  clearButtonProps={{ 'aria-label': 'Clear search query' }}
  aria-labelledby="search-icon-id"
/>

{
  /* Built-in suffix for async validation */
}
;<Input
  value={url}
  onChange={(e) => setUrl(e.target.value)}
  builtInSuffix={{
    type: isValidating
      ? Input.InputBuildInSuffix.LOADING
      : isValid
        ? Input.InputBuildInSuffix.SUCCESS
        : Input.InputBuildInSuffix.FAILED,
    failMessage: 'Invalid URL',
  }}
/>

{
  /* Number input with range */
}
;<InputNumber
  label="CPUs"
  min={1}
  max={10}
  step={1}
  helpText="Enter a value between 1 and 10"
  onValueChange={(val, error, helpText) => {
    setValue(val)
    setError(error)
  }}
/>

{
  /* Input with unit addon -- text label in suffix */
}
;<FormItemInput
  id="size-input"
  label="Space to Allocate"
  placeholder="e.g. 100"
  defaultValue="100"
  prefix={<span id="prefix-hash">#</span>}
  suffix={
    <FlexLayout alignItems="center" itemSpacing="10px">
      <CheckMarkIcon color="var(--color-background-success)" />
      <TextLabel
        id="gib-text"
        style={{
          borderLeft: '1px solid var(--color-border-separator-contrast)',
          padding: '5px 0px 5px 10px',
        }}
      >
        GiB
      </TextLabel>
    </FlexLayout>
  }
  aria-labelledby="size-input prefix-hash gib-text"
/>

{
  /* addonBefore / addonAfter -- framed text flanking the input */
}
;<FormItemInput
  id="site-name"
  label="Bare Site Name"
  placeholder="site nutanix"
  addonBefore={<TextLabel id="addon-www">www.</TextLabel>}
  addonAfter={<TextLabel id="addon-com">.com</TextLabel>}
  aria-labelledby="addon-www site-name addon-com"
/>

{
  /* Nested appearance -- use inside table cells or containers */
}
;<Input
  name="nested-search"
  search={true}
  appearance="nested"
  defaultValue="e.g. VM Apache"
  placeholder="e.g. VM Apache"
  searchIconProps={{
    id: 'nested-search-icon',
    'aria-hidden': false,
    'aria-label': 'Search',
  }}
  aria-labelledby="nested-search-icon"
/>

{
  /* Password input */
}
;<InputPassword
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  showPasswordAriaLabel="Show password"
  hidePasswordAriaLabel="Hide password"
/>

{
  /* Password with custom icons */
}
;<FormItemInputPassword
  label="Password"
  defaultValue="password"
  showSuffix={<ShowIcon />}
  hideSuffix={<HideIcon />}
  showHideButtonProps={{ type: 'icon-default', appearance: 'mini' }}
  showPasswordAriaLabel="Show password"
  hidePasswordAriaLabel="Hide password"
/>
```

### Anti-patterns

- Don't use `<input>` HTML element -- use `Input`
- Don't use `errorType` without also setting `error={true}`
- Don't skip `aria-labelledby` -- all inputs should reference a label
- Don't forget `aria-describedby` for error messages
- Don't render bare `Input` when Figma shows Label Top or Label Bottom -- use `FormItemInput`
- Don't use placeholder as a substitute for a label; placeholder is unavailable once the user starts typing
- Don't use `secondaryLabel` -- screen readers generally don't announce it
- Don't use `appearance="borderless"` -- it is deprecated; use the default bordered style instead
- Don't use `showHideLinkProps` on `InputPassword` -- it is deprecated; use `showHideButtonProps` instead
- Don't pass mismatching disabled/readOnly states between an input and an interactive `addonBefore`/`addonAfter`; keep them in sync

<!-- SOURCE-API-START -->

### Import

```tsx
import {
  Input,
  InputAddon,
  InputNumber,
  InputPassword,
  FormItemInput,
  FormItemInputPassword,
} from '@nutanix-ui/prism-reactjs'
```

### Enums / Constants

#### `ErrorType`

Exported from both `Input` and `TextInput`; accessible as a static on `Input`:

- `WARNING` = `'warning'`
- `CRITICAL` = `'critical'`

```tsx
import { Input } from '@nutanix-ui/prism-reactjs'
// Input.ErrorType.WARNING
// Input.ErrorType.CRITICAL
```

#### `InputBuildInSuffix`

Accessible as statics on `Input`:

- `LOADING` = `'loading'`
- `SUCCESS` = `'success'`
- `FAILED` = `'failed'`

```tsx
// Input.InputBuildInSuffix.LOADING   (preferred)
// Input.BUILT_IN_SUFFIX.LOADING      (deprecated alias -- same values)
```

#### `InputAddonType`

Accessible as a static on `InputAddon`:

- `PREFIX` = `'prefix'`
- `SUFFIX` = `'suffix'`
- `ADDON_BEFORE` = `'addonBefore'`
- `ADDON_AFTER` = `'addonAfter'`

```tsx
// InputAddon.InputAddonType.PREFIX
// InputAddon.TYPE  (deprecated alias)
```

### Props Interfaces

#### `InputProps`

Extends: `Omit<TextInputProps, 'prefix' | 'suffix' | 'addonBefore' | 'addonAfter'>`

`TextInputProps` itself extends `Omit<React.HTMLProps<HTMLInputElement>, 'prefix' | 'ref' | ...>`, so all standard HTML input attributes (`name`, `type`, `readOnly`, `placeholder`, `autoFocus`, `maxLength`, `aria-*`, etc.) are valid.

| Prop                    | Type                                                                                     | Default              | Description                                                                                                                                                                                 |
| ----------------------- | ---------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `className`             | `string`                                                                                 | —                    | Applied to both the wrapper and the DOM `<input>`.                                                                                                                                          |
| `appearance`            | `'inline' \| 'normal' \| 'borderless' \| 'nested'`                                       | `'normal'`           | Visual style. `'borderless'` is **deprecated**. `'nested'` removes border and focus ring — useful inside table cells.                                                                       |
| `background`            | `'base' \| 'alt' \| 'body'`                                                              | auto                 | Override background context for the input. Prefer `BackgroundContext` or a layout's `background` prop instead.                                                                              |
| `error`                 | `boolean`                                                                                | `false`              | Highlights the input in red. Must be `true` when `errorType` is set.                                                                                                                        |
| `errorType`             | `ErrorType`                                                                              | `ErrorType.CRITICAL` | Error severity. `Input.ErrorType.WARNING` or `Input.ErrorType.CRITICAL`.                                                                                                                    |
| `id`                    | `string`                                                                                 | —                    | Unique id; used for label association.                                                                                                                                                      |
| `disabled`              | `boolean`                                                                                | `false`              | Disables the input.                                                                                                                                                                         |
| `readOnly`              | `boolean`                                                                                | —                    | Inherited from HTML input. Makes the input read-only.                                                                                                                                       |
| `name`                  | `string`                                                                                 | —                    | Inherited from HTML input. Form field name.                                                                                                                                                 |
| `inputRef`              | `React.Ref<HTMLInputElement>`                                                            | —                    | Ref forwarded to the underlying `<input>` DOM node. Can be a callback or `React.createRef()`.                                                                                               |
| `onPressEnter`          | `(event: React.KeyboardEvent<HTMLInputElement>) => void`                                 | —                    | Callback fired when the Enter key is pressed.                                                                                                                                               |
| `suffix`                | `React.ReactNode`                                                                        | —                    | Element appended inside the input after the text. Ignored when `builtInSuffix` is set.                                                                                                      |
| `suffixProps`           | `InputAddonProps`                                                                        | —                    | Props for the suffix wrapper element.                                                                                                                                                       |
| `prefix`                | `React.ReactNode`                                                                        | —                    | Element prepended inside the input before the text. Overrides the search icon when `search={true}`.                                                                                         |
| `prefixProps`           | `InputAddonProps`                                                                        | —                    | Props for the prefix wrapper element.                                                                                                                                                       |
| `search`                | `boolean`                                                                                | `false`              | Prepends a magnifying-glass icon. If `prefix` is also provided, `search` is ignored. When the input has a value, a clear (×) button is appended as suffix automatically.                    |
| `searchIconProps`       | `Partial<MagGlassIconProps>`                                                             | —                    | Props passed to the default search icon when `search={true}`. Use to set `aria-hidden`, `aria-label`, or `id` for label association.                                                        |
| `clearButtonProps`      | `ButtonProps`                                                                            | —                    | Props passed to the auto-rendered clear button on search inputs. Use `onClick` to handle clear; supersedes the deprecated `onClearButtonClick`.                                             |
| `onClearButtonClick`    | `(event: React.MouseEvent) => void`                                                      | —                    | **Deprecated** — use `clearButtonProps.onClick` instead. Callback for the clear button; app must reset value state manually. Only works for controlled usage (`value`, not `defaultValue`). |
| `addonBefore`           | `React.ReactNode`                                                                        | —                    | Element attached before the input box (outside the border).                                                                                                                                 |
| `addonBeforeProps`      | `InputAddonProps`                                                                        | `{}`                 | Props for the `addonBefore` wrapper.                                                                                                                                                        |
| `addonAfter`            | `React.ReactNode`                                                                        | —                    | Element attached after the input box (outside the border).                                                                                                                                  |
| `addonAfterProps`       | `InputAddonProps`                                                                        | `{}`                 | Props for the `addonAfter` wrapper.                                                                                                                                                         |
| `defaultValue`          | `string \| number`                                                                       | —                    | Uncontrolled initial value. Does not require `onChange`.                                                                                                                                    |
| `value`                 | `string \| number`                                                                       | —                    | Controlled value. Requires `onChange` to be handled by the app.                                                                                                                             |
| `builtInSuffix`         | `{ type: InputBuildInSuffix; failMessage?: string; tooltipProps?: PortalProviderProps }` | `{}`                 | Predefined suffix state indicator. When set, `suffix` is ignored. `failMessage` is required when `type` is `FAILED`.                                                                        |
| `wrapperProps`          | `FlexLayoutProps`                                                                        | —                    | Props added to the outermost `FlexLayout` wrapper.                                                                                                                                          |
| `textInputWrapperProps` | `FlexLayoutProps`                                                                        | —                    | Props added to the inner `FlexLayout` wrapping the `TextInput` and prefix/suffix.                                                                                                           |

#### `TextInputProps` (base — selected notable props)

`Input` inherits all of these via the `extends` chain:

| Prop                                    | Type                                                     | Description                                                                                                   |
| --------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `inputRef`                              | `React.Ref<HTMLInputElement>`                            | Ref to the raw `<input>` DOM node.                                                                            |
| `onPressEnter`                          | `(event: React.KeyboardEvent<HTMLInputElement>) => void` | Fired on Enter key.                                                                                           |
| `appearance`                            | `'inline' \| 'normal' \| 'borderless' \| 'nested'`       | See `InputProps.appearance`.                                                                                  |
| `background`                            | `BackgroundType`                                         | Background context override.                                                                                  |
| All `React.HTMLProps<HTMLInputElement>` | —                                                        | `name`, `type`, `readOnly`, `placeholder`, `autoFocus`, `maxLength`, `autoComplete`, `aria-*`, `data-*`, etc. |

#### `InputAddonProps`

Extends `FlexLayoutProps` (all `FlexLayout` props are valid).

| Prop         | Type                                               | Default                 | Description                            |
| ------------ | -------------------------------------------------- | ----------------------- | -------------------------------------- |
| `className`  | `string`                                           | —                       | Custom class name.                     |
| `type`       | `InputAddonType`                                   | `InputAddonType.SUFFIX` | Position role of the addon.            |
| `appearance` | `'inline' \| 'normal' \| 'borderless' \| 'nested'` | `'normal'`              | Matches the parent `Input` appearance. |
| `background` | `BackgroundType`                                   | —                       | Background override.                   |
| `error`      | `boolean`                                          | `false`                 | Error styling.                         |
| `errorType`  | `ErrorType`                                        | `ErrorType.CRITICAL`    | Error type.                            |
| `disabled`   | `boolean`                                          | `false`                 | Disabled styling.                      |
| `readOnly`   | `boolean`                                          | `false`                 | Read-only styling.                     |

#### `InputPasswordProps`

Extends `InputProps` (all `Input` props are valid).

| Prop                    | Type                         | Default                  | Description                                                                         |
| ----------------------- | ---------------------------- | ------------------------ | ----------------------------------------------------------------------------------- |
| `disabled`              | `boolean`                    | —                        | Disables both the input and the show/hide toggle.                                   |
| `showSuffix`            | `React.ReactNode`            | `'Show'` (i18n)          | Toggle label shown when password is hidden.                                         |
| `hideSuffix`            | `React.ReactNode`            | `'Hide'` (i18n)          | Toggle label shown when password is visible.                                        |
| `showPassword`          | `boolean`                    | `false`                  | Controlled visibility state.                                                        |
| `onVisibilityChange`    | `(visible: boolean) => void` | —                        | Callback fired when visibility toggles.                                             |
| `showPasswordAriaLabel` | `string`                     | `'Show password'` (i18n) | `aria-label` for the show button.                                                   |
| `hidePasswordAriaLabel` | `string`                     | `'Hide password'` (i18n) | `aria-label` for the hide button.                                                   |
| `showHideButtonProps`   | `ButtonProps`                | —                        | Props passed to the show/hide `Button`. Use instead of `showHideLinkProps`.         |
| `showHideLinkProps`     | `LinkProps`                  | —                        | **Deprecated** — renders a `Link` as the toggle; use `showHideButtonProps` instead. |
| `className`             | `string`                     | —                        | Custom class name.                                                                  |

#### `InputNumberProps`

Extends `InputWithLabelProps` (which is `FormItemProvider<InputProps>`, so `FormItemProvider` label/helpText/error props and all `InputProps` props are valid).

| Prop               | Type                                                           | Default          | Description                                                                                             |
| ------------------ | -------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------- |
| `className`        | `string`                                                       | —                | Custom class name.                                                                                      |
| `value`            | `string \| number`                                             | —                | Controlled value.                                                                                       |
| `defaultValue`     | `string \| number`                                             | —                | Uncontrolled initial value.                                                                             |
| `id`               | `string`                                                       | —                | Unique id; forwarded to the inner input for label association.                                          |
| `min`              | `number`                                                       | —                | Minimum allowed value.                                                                                  |
| `max`              | `number`                                                       | —                | Maximum allowed value.                                                                                  |
| `step`             | `number`                                                       | —                | Increment/decrement step for +/- buttons.                                                               |
| `onChange`         | `InputProps['onChange']`                                       | —                | Standard input `onChange` (typing only). Use `onValueChange` to capture both typing and button changes. |
| `onValueChange`    | `(value: string, error: boolean, helpText: ReactNode) => void` | —                | Fired on both typing and +/- button click. Preferred over `onChange` for controlled usage.              |
| `helpText`         | `FormItemProviderProps['helpText']`                            | —                | Help text below the input. Overridden with a validation message when min/max is violated.               |
| `placeholder`      | `string`                                                       | `'Enter Number'` | Input placeholder.                                                                                      |
| `addonBeforeProps` | `InputAddonProps`                                              | —                | Props for the minus (−) button addon. Use `disabled: true` to disable the button independently.         |
| `addonAfterProps`  | `InputAddonProps`                                              | —                | Props for the plus (+) button addon. Use `disabled: true` to disable the button independently.          |

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Accessibility Guidelines

```tsx
const inputWidth = 200
const inputStyle = {
  maxWidth: inputWidth,
  minWidth: inputWidth,
  width: inputWidth,
}

;<StackingLayout style={{ maxWidth: 800 }}>
  <Title size="h3">Labels</Title>
  <StackingLayout>
    <FlexLayout alignItems="center" justifyContent="flex-start">
      <FormItemInput
        style={inputStyle}
        id="id-1-1"
        label="I am a label. You need me."
        placeholder="e.g. VM Apache"
        defaultValue="VM Apache"
      />
      <Paragraph>
        All inputs need a visible & persistent label for accessibility.
      </Paragraph>
    </FlexLayout>
  </StackingLayout>
  <StackingLayout itemGap="S">
    <Title size="h4">Placeholder</Title>
    <FlexLayout alignItems="center" justifyContent="flex-start">
      <FormItemInput
        style={inputStyle}
        id="id-1-2"
        label="VM"
        placeholder="Who's place am I holding?"
      />
      <Paragraph>
        Placeholder text is <strong>not</strong> a replacement for a label.
        Screen readers don't consistently support them and they're unavailable
        for users after they've started typing.
      </Paragraph>
    </FlexLayout>
  </StackingLayout>
  <StackingLayout itemGap="S">
    <Title size="h4">Secondary Label</Title>
    <FlexLayout alignItems="center" justifyContent="flex-start">
      <FormItemInput
        style={inputStyle}
        id="id-1-4"
        label="VM"
        defaultValue="VM Apache"
        disabled={true}
        secondaryLabel="I'm usually not recommended."
      />
      <Paragraph>
        Secondary labels are generally <strong>not</strong> supported by screen
        readers and should be avoided.
      </Paragraph>
    </FlexLayout>
  </StackingLayout>
  <TextGroup>
    <Title size="h3">Instructions</Title>
    <Paragraph>
      Be sure to include any instructions a user might need to successfully
      input data in either the input's label or help text. This includes any
      formatting requirements or an example value. Placeholder text is not
      sufficient since it disappears when a user begins to type.
    </Paragraph>
  </TextGroup>
</StackingLayout>
```

#### Presentation

```tsx
<StackingLayout
  itemSpacing="40px"
  style={{
    minWidth: 500,
    maxWidth: 950,
  }}
>
  <FlexLayout itemFlexBasis="100pc">
    <Input
      placeholder="e.g. VM Apache"
      wrapperProps={{ 'data-test-id': 'default' }}
      name="input-placeholder"
    />
    <Input
      placeholder="e.g. VM Apache"
      defaultValue="VM Apache"
      wrapperProps={{ 'data-test-id': 'default-value' }}
      name="input-default-value"
    />
    <Input
      disabled={true}
      placeholder="e.g. VM Apache"
      defaultValue="Disabled"
      wrapperProps={{ 'data-test-id': 'disabled' }}
      name="input-disabled"
    />
    <Input
      placeholder="e.g. VM Apache"
      defaultValue="Read Only"
      wrapperProps={{ 'data-test-id': 'read-only' }}
      name="input-readonly"
      readOnly={true}
    />
  </FlexLayout>
  <FlexLayout itemFlexBasis="100pc">
    <FormItemInput
      id="id-1"
      label="Name"
      placeholder="e.g. VM Apache"
      defaultValue="VM Apache"
      helpText="Enter a unique name."
    />
    <FormItemInput
      id="id-2"
      label="Name"
      placeholder="e.g. VM Apache"
      defaultValue="VM Apache"
      secondaryLabel="Enter a unique name."
    />
    <FormItemInput
      id="id-3"
      error={true}
      errorType={Input.ErrorType.WARNING}
      label="Name"
      placeholder="e.g. VM Apache"
      defaultValue="VM Apache"
      helpText="VM name already exists."
    />
    <FormItemInput
      id="id-4"
      error={true}
      label="Name"
      placeholder="e.g. VM Apache"
      defaultValue="VM Apache"
      helpText="VM name already exists."
    />
  </FlexLayout>
</StackingLayout>
```

#### Anatomy of a Help Text

```tsx
const inputWidth = 330

;<StackingLayout
  style={{
    minWidth: inputWidth,
    maxWidth: 700,
  }}
>
  <FlexLayout itemGap="XXL" justifyContent="center">
    <StackingLayout
      itemGap="XS"
      style={{
        minWidth: inputWidth,
        maxWidth: inputWidth,
        position: 'relative',
      }}
    >
      <StackingLayout itemGap="XS" style={{ textAlign: 'center' }}>
        <TextLabel multiLine={true} size={TextLabel.TEXT_LABEL_SIZE.SMALL}>
          {inputWidth}px
        </TextLabel>
        <div
          style={{
            borderTop: '1px solid var(--color-text-nav-tertiary-label)',
            borderLeft: '1px solid var(--color-text-nav-tertiary-label)',
            borderRight: '1px solid var(--color-text-nav-tertiary-label)',
            height: 10,
            marginBottom: 5,
          }}
        />
      </StackingLayout>
      <StackingLayout itemGap="none">
        <div
          style={{
            height: 32,
            borderRadius: 4,
            background: 'var(--color-background-body)',
          }}
        />
        <FlexLayout itemGap="S" style={{ marginTop: 8 }}>
          <InformationStatusIcon
            style={{
              color: 'var(--color-text-tertiary-label)',
              position: 'relative',
              top: 2,
              minWidth: 12,
            }}
          />
          <TextLabel multiLine={true} size={TextLabel.TEXT_LABEL_SIZE.SMALL}>
            Curabitur aliquet quam id dui posuere blandit. Curabitur aliquet
            quam id dui posuere blandit. Nulla quis lorem ut.
          </TextLabel>
        </FlexLayout>
      </StackingLayout>
    </StackingLayout>
  </FlexLayout>
</StackingLayout>
```

#### Help text truncation

```tsx
<FlexLayout data-test-id="truncation-example">
  <div style={{ width: '150px' }}>
    <FormItemInput
      id="help-text-truncation-1"
      label="Name"
      placeholder="e.g. VM Apache"
      defaultValue="VM Apache"
      error={true}
      errorType={Input.ErrorType.CRITICAL}
      helpTextProps={{
        isTruncated: true,
      }}
      helpText="This is loooooooooooong error message."
    />
  </div>
  <div style={{ width: '150px' }}>
    <FormItemInput
      id="help-text-truncation-2"
      label="Name"
      placeholder="e.g. VM Apache"
      defaultValue="VM Apache"
      error={true}
      errorType={Input.ErrorType.CRITICAL}
      hideHelpTextIcon={true}
      helpTextProps={{
        isTruncated: true,
        truncateProps: {
          tooltipProps: {
            placement: 'bottom',
          },
        },
      }}
      helpText="This is loooooooooooong error message."
    />
  </div>
</FlexLayout>
```

#### Built-in prefix/suffix states (loading, success, failed)

```tsx
<FlexLayout itemFlexBasis="100pc">
  <FormItemInput
    id="id-prefix-1"
    label="Loading label"
    name="input-loading-suffix"
    placeholder="e.g. VM Apache"
    defaultValue="VM Apache"
    builtInSuffix={{ type: Input.InputBuildInSuffix.LOADING }}
  />
  <FormItemInput
    id="id-prefix-2"
    label="Success label"
    name="input-success-suffix"
    placeholder="e.g. VM Apache"
    defaultValue="VM Apache"
    builtInSuffix={{ type: Input.InputBuildInSuffix.SUCCESS }}
  />
  <FormItemInput
    id="id-prefix-3"
    label="Warning label"
    name="input-warning-suffix"
    error={true}
    errorType={Input.ErrorType.WARNING}
    placeholder="e.g. VM Apache"
    defaultValue="VM Apache"
    builtInSuffix={{
      type: Input.InputBuildInSuffix.FAILED,
      failMessage: 'VM name already exists',
      tooltipProps: {
        contentProps: {
          style: { maxWidth: 150 },
        },
      },
    }}
  />
  <FormItemInput
    id="id-error-1"
    label="Error label"
    name="input-error-suffix"
    error={true}
    placeholder="e.g. VM Apache"
    defaultValue="VM Apache"
    builtInSuffix={{
      type: Input.InputBuildInSuffix.FAILED,
      failMessage: 'VM name already exists',
    }}
  />
</FlexLayout>
```

#### Custom prefix and suffix

```tsx
const customSuffix = (
  <FlexLayout alignItems="center" itemSpacing="10px">
    <CheckMarkIcon color="var(--color-background-success)" />
    <TextLabel
      id="gib-text"
      style={{
        borderLeft: '1px solid var(--color-border-separator-contrast)',
        padding: '5px 0px 5px 10px',
      }}
    >
      GiB
    </TextLabel>
  </FlexLayout>
)

;<FormItemInput
  id="id-11"
  label="Space to Allocate"
  placeholder="e.g. 100"
  defaultValue="100"
  prefix={<span id="number">#</span>}
  suffix={customSuffix}
  aria-labelledby="id-11 number gib-text"
  helpText="Screen reader will announce the label + prefix + suffix value when the input is focused."
/>
```

#### addonBefore and addonAfter

```tsx
<FormItemInput
  id="id-addon-default"
  label="Bare Site Name"
  placeholder="site nutanix"
  addonBefore={<TextLabel id="addon-1">www.</TextLabel>}
  addonAfter={<TextLabel id="addon-2">.com</TextLabel>}
  aria-labelledby="addon-1 id-addon-default addon-2"
/>
```

#### Search customizations (searchIconProps, clearButtonProps)

```tsx
<Input
  name="input-accessible-search"
  placeholder="Search..."
  search={true}
  defaultValue="Default Search Value"
  searchIconProps={{
    id: 'search-icon-id',
    'aria-hidden': false,
    'aria-label': 'Custom Label',
  }}
  clearButtonProps={{ 'aria-label': 'Clear search query' }}
  aria-labelledby="search-icon-id"
/>
```

#### Controlled search with clear

```tsx
class InputExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: 'Some value here...' }
    this.onChange = this.onChange.bind(this)
    this.onPressEnter = this.onPressEnter.bind(this)
    this.onClearButtonClick = this.onClearButtonClick.bind(this)
  }

  render() {
    return (
      <FormItemInput
        id="id-32"
        label="Value"
        placeholder="Search for something"
        value={this.state.value}
        onChange={this.onChange}
        onPressEnter={this.onPressEnter}
        search={true}
        onClearButtonClick={this.onClearButtonClick}
      />
    )
  }

  onClearButtonClick() {
    this.setState({ value: '' })
  }
  onChange(event) {
    this.setState({ value: event.target.value })
  }
  onPressEnter(event) {
    alert(`Current Value is ${event.target.value}`)
  }
}
```

#### Nested appearance (embed in container)

```tsx
<Input
  name="input-nested-appearance"
  search={true}
  searchIconProps={{
    id: 'search-icon-id',
    'aria-hidden': false,
    'aria-label': 'Search',
  }}
  aria-labelledby="search-icon-id"
  appearance="nested"
  defaultValue="e.g. VM Apache"
  placeholder="e.g. VM Apache"
/>
```

#### InputNumber — basic and controlled

```tsx
{
  /* Uncontrolled */
}
;<InputNumber
  label="CPUs"
  min={1}
  max={10}
  step={1}
  helpText="Enter a value between 1 and 10"
/>

{
  /* Controlled */
}
const [value, setValue] = useState(5)
const [error, setError] = useState(false)
const [helpText, setHelpText] = useState(undefined)

;<InputNumber
  min={1}
  max={10}
  step={1}
  value={value}
  error={error}
  helpText={helpText}
  onValueChange={(newValue, newError, newHelpText) => {
    setValue(newValue)
    setError(newError)
    setHelpText(newHelpText)
  }}
/>

{
  /* With custom suffix */
}
;<InputNumber
  id="with-suffix"
  label="Using Suffix"
  suffix={
    <TextLabel
      id="suffix"
      style={{
        borderLeft: '1px solid var(--color-border-separator-contrast)',
        padding: '5px 0 5px 10px',
      }}
    >
      GiB
    </TextLabel>
  }
  aria-labelledby="with-suffix suffix"
/>

{
  /* Disable +/− buttons individually */
}
;<InputNumber
  label="Value"
  min={1}
  max={10}
  step={1}
  defaultValue={5}
  addonBeforeProps={{ disabled: true }}
  addonAfterProps={{ disabled: true }}
/>
```

#### InputPassword

```tsx
{
  /* Minimal */
}
;<FormItemInputPassword
  label="User password"
  helpText="Must be more than 8 characters"
  defaultValue="password"
/>

{
  /* With custom aria labels */
}
;<FormItemInputPassword
  label="User password"
  helpText="Must be more than 8 characters"
  defaultValue="password"
  showPasswordAriaLabel="Show password custom text"
  hidePasswordAriaLabel="Hide password custom text"
/>

{
  /* With custom icons */
}
;<FormItemInputPassword
  label="User password"
  helpText="Must be more than 8 characters"
  defaultValue="password"
  showSuffix={<ShowIcon />}
  hideSuffix={<HideIcon />}
  showHideButtonProps={{ type: 'icon-default', appearance: 'mini' }}
  showPasswordAriaLabel="Show password"
  hidePasswordAriaLabel="Hide password"
/>
```

### Usage Notes

- Prefer documented enum/static values such as `Input.<EnumName>.<VALUE>` over raw strings when the component exposes them.
- Keep labels, help text, and validation visible and persistent for form controls; use `FormItem*` wrappers where available.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.
- When using `addonBefore`/`addonAfter` with interactive elements (e.g. `Select`), keep the disabled/readOnly state in sync with the main input.
- `InputNumber` exposes `onValueChange(value, error, helpText)` — capture all three arguments when using controlled mode; the component computes range-validation error and help text for you.
- Always set `aria-labelledby` to chain prefix/suffix `id` values when those elements provide semantic context (e.g. `"www."` before and `".com"` after a domain input).
- The caret position across `InputPassword` type toggling (password ↔ text) is preserved automatically by `Input.componentDidUpdate`.

<!-- SOURCE-API-END -->
