# Select

## Figma

- **Library name:** Unit Dropdown (page: N/A, frame: Unit Dropdown)
- **Also matches:** MiniSelect, Select

## React

Import: `import { Select } from '@nutanix-ui/prism-reactjs'`

### Data Shape

Select uses a **row-based** data model:

```ts
interface SelectRowData {
  key?: string | number // Unique identifier (required unless rowKeyAttribute sets a different field)
  label: string // Display text (required)
  disabled?: boolean // Disable this option
  subLabel?: string // Secondary text displayed below the label in the dropdown
  rowProps?: FlexLayoutProps // Extra props passed to the option's DOM element
  children?: SelectRowData[] // Nested child options rendered as a grouped list
}
```

**Notes on `key`:**

- `key` is optional on the interface but functionally required unless `rowKeyAttribute` is set to point to a different field (e.g. `rowKeyAttribute="id"` when items use `{ id, label }`).
- Parent rows that have `children` are rendered as non-selectable group headers in the dropdown.

### Figma Form Field Composition

In Figma, a Select with Label Top / Label Bottom is a single component. In React, compose it or use `FormItemSelect`.

**Preferred: use `FormItemSelect`** -- auto-generates label, help text, error styling, and aria:

```tsx
import { FormItemSelect } from '@nutanix-ui/prism-reactjs'
;<FormItemSelect
  id="provider"
  label="Provider" // -> Figma Label Top
  helpText={errors.provider} // -> Figma Label Bottom
  error={!!errors.provider}
  errorType={Input.ErrorType.CRITICAL}
  rowsData={[
    { key: 'openai', label: 'OpenAI' },
    { key: 'azure', label: 'Azure AI' },
  ]}
  selectedRow={selected}
  onSelectedChange={(row) => setSelected(row)}
  placeholder="Select a provider"
  required={true}
/>
```

**Manual approach** (when you need custom layout):

```tsx
<StackingLayout itemGap="XS">
  <TextLabel id="provider-label">Provider</TextLabel>
  <Select
    aria-labelledby="provider-label"
    rowsData={providers}
    selectedRow={selected}
    onSelectedChange={setSelected}
    error={!!errors.provider}
  />
  {errors.provider && (
    <TextLabel id="provider-error" type={TextLabel.TextLabelType.ERROR}>
      {errors.provider}
    </TextLabel>
  )}
</StackingLayout>
```

See `input.md` for the full Label Bottom Type -> React mapping table and `FormItemProvider` props reference.

### TSX Examples

```tsx
{
  /* Basic select (no label -- standalone use only) */
}
;<Select
  rowsData={[
    { key: 'openai', label: 'OpenAI' },
    { key: 'azure', label: 'Azure AI' },
    { key: 'gemini', label: 'Google Gemini' },
  ]}
  selectedRow={selected}
  onSelectedChange={(row) => setSelected(row)}
  placeholder="Select a provider"
/>

{
  /* With label and accessibility (prefer FormItemSelect above) */
}
;<StackingLayout itemGap="XS">
  <TextLabel id="region-label">Region</TextLabel>
  <Select
    aria-labelledby="region-label"
    rowsData={regions}
    selectedRow={selectedRegion}
    onSelectedChange={setSelectedRegion}
  />
</StackingLayout>

{
  /* Searchable select (consumer filters rowsData via inputProps.onChange) */
}
;<Select
  searchable={true}
  inputProps={{ value: searchText, onChange: handleSearch }}
  rowsData={filteredCountries}
  selectedRow={country}
  onSelectedChange={setCountry}
  placeholder="Search countries..."
  noDataMessage="No countries found"
  loadingMessage="Searching..."
  loading={isSearching}
/>

{
  /* Clearable select */
}
;<Select
  clearable={true}
  rowsData={options}
  selectedRow={selected}
  onSelectedChange={setSelected}
/>

{
  /* Mini select (compact, inline; e.g. for table toolbars or widget headers) */
}
;<Select
  type="mini"
  label="Page size"
  autoSize={true}
  rowsData={[
    { key: '10', label: '10' },
    { key: '25', label: '25' },
  ]}
  selectedRow={{ key: '10', label: '10' }}
  onSelectedChange={setPageSize}
/>

{
  /* Borderless select */
}
;<Select
  type="borderless"
  rowsData={options}
  selectedRow={selected}
  onSelectedChange={setSelected}
/>

{
  /* Select with addon before/after */
}
;<Select
  rowsData={domains}
  selectedRow={selectedDomain}
  onSelectedChange={setSelectedDomain}
  addonBefore={<TextLabel>www</TextLabel>}
  addonAfter={
    <Select
      type="mini"
      autoSize={true}
      rowsData={tldOptions}
      selectedRow={tld}
      onSelectedChange={setTld}
      inputProps={{ name: 'tld', 'aria-label': 'Domain suffix' }}
    />
  }
  inputProps={{ name: 'domain-select' }}
/>

{
  /* Custom row renderer */
}
;<Select
  rowsData={clusters}
  selectedRow={selected}
  onSelectedChange={setSelected}
  rowRenderer={(row, isSelected, isFocused, isDropdownActive) => (
    <FlexLayout alignItems="center" justifyContent="space-between">
      <div>{row.label}</div>
      <div>{row.ip}</div>
    </FlexLayout>
  )}
/>

{
  /* Controlled dropdown visibility */
}
;<Select
  rowsData={options}
  selectedRow={selected}
  onSelectedChange={setSelected}
  popupProviderProps={{ popupVisible: isOpen }}
/>

{
  /* Nested options (group headers are non-selectable) */
}
;<Select
  rowsData={[
    {
      key: 1,
      label: 'Fruits',
      children: [
        { key: 11, label: 'Apple' },
        { key: 12, label: 'Peach' },
      ],
    },
    { key: 2, label: 'Vegetables' },
  ]}
  selectedRow={selected}
  onSelectedChange={setSelected}
/>

{
  /* With subLabel on options */
}
;<Select
  rowsData={[
    { key: 1, label: 'Peach', subLabel: 'A fuzzy stone fruit' },
    { key: 2, label: 'Apple' },
  ]}
  selectedRow={selected}
  onSelectedChange={setSelected}
/>
```

### Anti-patterns

- Don't use `<select>` HTML element -- use `Select`
- Don't use `{ value, label }` shape -- use `{ key, label }` for `rowsData`
- Don't set `defaultValue` -- use `selectedRow` for controlled behavior
- Don't forget `onSelectedChange` with `selectedRow` (controlled component)
- Don't render bare `Select` when Figma shows Label Top or Label Bottom -- use `FormItemSelect`
- Don't implement your own filtering logic in `rowsData` before passing to a non-searchable Select -- set `searchable={true}` and manage filtering via `inputProps.onChange`
- Don't use `readOnly` -- it is deprecated; use `aria-disabled` instead
- Don't add interactive elements (buttons, links) inside the dropdown rows -- this violates accessibility

<!-- SOURCE-API-START -->

### Import

```tsx
import { Select } from '@nutanix-ui/prism-reactjs'
```

### Props Reference

#### `SelectRowData`

| Prop       | Type               | Required    | Description                                                                                                         |
| ---------- | ------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------- |
| `key`      | `string \| number` | conditional | Unique identifier. Required unless `rowKeyAttribute` names a different field.                                       |
| `label`    | `string`           | **yes**     | Display text shown in input when selected and as default option content in dropdown.                                |
| `subLabel` | `string`           | no          | Secondary text displayed below the option label in the dropdown.                                                    |
| `disabled` | `boolean`          | no          | Prevents selection of this option. Styled only for default rendering; consumer must style for custom `rowRenderer`. |
| `rowProps` | `FlexLayoutProps`  | no          | Additional props passed to the option's DOM element.                                                                |
| `children` | `SelectRowData[]`  | no          | Nested child options. Parent row becomes a non-selectable group header rendered in the dropdown.                    |

#### `PartialSelectProps` (all variants)

| Prop                       | Type                                                                        | Default              | Description                                                                                                                                                                                                        |
| -------------------------- | --------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `rowsData`                 | `SelectRowData[]`                                                           | **required**         | Array of option rows.                                                                                                                                                                                              |
| `selectedRow`              | `SelectRowData`                                                             | —                    | The currently selected row (controlled).                                                                                                                                                                           |
| `onSelectedChange`         | `(selectedRow: SelectRowData) => void`                                      | —                    | Callback when a row is selected. Called with `undefined` when selection is cleared.                                                                                                                                |
| `rowRenderer`              | `(rowData, isSelected, isRowFocused, isDropdownActive) => JSX.Element`      | —                    | Custom renderer for each dropdown option.                                                                                                                                                                          |
| `rowKeyAttribute`          | `string`                                                                    | `'key'`              | The field in each row item used as a unique identifier.                                                                                                                                                            |
| `noDataMessage`            | `string`                                                                    | i18n default         | Message displayed when `rowsData` is empty.                                                                                                                                                                        |
| `loading`                  | `boolean`                                                                   | —                    | Indicates that `rowsData` is being loaded. Shows a loading row in the dropdown.                                                                                                                                    |
| `loadingMessage`           | `string`                                                                    | i18n default         | Text displayed while `loading` is true. For screen reader support, include the search term in the message.                                                                                                         |
| `showOptionsWhileLoading`  | `boolean`                                                                   | —                    | When `true`, shows current options alongside the loading indicator (instead of replacing them).                                                                                                                    |
| `id`                       | `string`                                                                    | —                    | Unique id for the select input element.                                                                                                                                                                            |
| `listBoxId`                | `string`                                                                    | auto-generated       | Explicit id for the listbox element. Useful for stable Jest/Playwright snapshots.                                                                                                                                  |
| `inputProps`               | `InputProps`                                                                | `{}`                 | Props forwarded to the internal `Input` component. Use `inputProps.name` for form submission, `inputProps.value` + `inputProps.onChange` for searchable selects, `inputProps.suffix` for custom suffix icons.      |
| `dropdownProps`            | `Omit<StackingLayoutProps, 'children'> & { showCustomScrollbar?: boolean }` | `{}`                 | Props forwarded to the dropdown container. Set `showCustomScrollbar: true` to use Prism's custom scrollbar.                                                                                                        |
| `searchable`               | `boolean`                                                                   | `false`              | Enables search mode. The input becomes editable; the consumer is responsible for filtering `rowsData` based on `inputProps.value`.                                                                                 |
| `dropdownMatchSelectWidth` | `boolean`                                                                   | `true`               | When `false`, the dropdown can extend beyond the input width. Ignored when `autoSize` is `true`.                                                                                                                   |
| `autoSize`                 | `boolean`                                                                   | —                    | Input width auto-adjusts to fit the selected label. Overrides `dropdownMatchSelectWidth`.                                                                                                                          |
| `error`                    | `boolean`                                                                   | `false`              | Applies error styling to the input.                                                                                                                                                                                |
| `errorType`                | `ErrorType`                                                                 | `ErrorType.CRITICAL` | Error severity. `Select.ErrorType.WARNING` or `Select.ErrorType.CRITICAL`.                                                                                                                                         |
| `type`                     | `'default' \| 'borderless' \| 'mini'`                                       | `'default'`          | Visual variant.                                                                                                                                                                                                    |
| `background`               | `'base' \| 'alt'`                                                           | —                    | Override the background context used to pick contrasting styles.                                                                                                                                                   |
| `placeholder`              | `string`                                                                    | i18n default         | Placeholder text when nothing is selected.                                                                                                                                                                         |
| `disabled`                 | `boolean`                                                                   | `false`              | Fully disables the select (no focus, no dropdown).                                                                                                                                                                 |
| `aria-disabled`            | `boolean \| 'true' \| 'false'`                                              | —                    | Marks the select as non-interactive with custom styling while remaining focusable. Prefer over `readOnly`.                                                                                                         |
| `readOnly`                 | `boolean`                                                                   | —                    | **Deprecated.** Use `aria-disabled` instead.                                                                                                                                                                       |
| `getPopupContainer`        | `() => HTMLElement`                                                         | —                    | Function that returns the DOM element to which the dropdown portal is appended. E.g. `() => document.querySelector('.right-panel')`. Required for correct scroll-tracking inside scrollable containers.            |
| `zIndex`                   | `number`                                                                    | `1610`               | Z-index of the dropdown portal.                                                                                                                                                                                    |
| `popupProviderProps`       | `PopupProviderProps \| Omit<DropdownProps, 'children'>`                     | `{}`                 | Props forwarded to the underlying `PopupProvider` (default/borderless) or `Dropdown` (mini). Pass `{ popupVisible: bool }` to control dropdown open state externally. Pass `{ action: 'hover' }` to open on hover. |
| `addonBefore`              | `React.ReactNode`                                                           | —                    | Node placed before the select input (e.g. a `TextLabel`).                                                                                                                                                          |
| `addonAfter`               | `React.ReactNode`                                                           | —                    | Node placed after the select input (e.g. a mini `Select`).                                                                                                                                                         |
| `truncatedTooltipProps`    | `ToolTipProps`                                                              | —                    | Customize the tooltip that appears when selected text is truncated.                                                                                                                                                |
| `clearable`                | `boolean`                                                                   | —                    | Shows a clear (×) button when a row is selected. Hidden when disabled, `aria-disabled`, or `readOnly`.                                                                                                             |
| `onClearAllIconClick`      | `ButtonProps['onClick']`                                                    | —                    | Callback for the clear button click.                                                                                                                                                                               |
| `clearButtonIconProps`     | `Omit<ButtonProps, 'onClick'>`                                              | —                    | Additional props for the clear button.                                                                                                                                                                             |
| `label`                    | `string`                                                                    | —                    | Label text displayed horizontally next to the select for `type="mini"`.                                                                                                                                            |
| `hidePlaceholder`          | `boolean`                                                                   | —                    | Hides placeholder text. Only applies to `type="mini"`.                                                                                                                                                             |
| `className`                | `string`                                                                    | —                    | Custom CSS class on the outer wrapper.                                                                                                                                                                             |
| `aria-label`               | `string`                                                                    | —                    | **Deprecated.** Use `inputProps['aria-label']` instead.                                                                                                                                                            |
| `data-test`                | `string`                                                                    | —                    | Test id forwarded to the input wrapper.                                                                                                                                                                            |

#### `SelectProps` (discriminated union)

```ts
type SelectProps = PartialSelectProps &
  (
    | {
        type?: 'default' | 'borderless'
        popupProviderProps?: PopupProviderProps
      }
    | { type?: 'mini'; popupProviderProps?: Omit<DropdownProps, 'children'> }
  )
```

When `type` is `'mini'`, `popupProviderProps` accepts `DropdownProps` (not `PopupProviderProps`).

#### `PopupProps` (internal, for reference)

| Prop                 | Type                 | Description                          |
| -------------------- | -------------------- | ------------------------------------ |
| `rowsData`           | `SelectRowData[]`    | Options for the popup                |
| `popupProviderProps` | `PopupProviderProps` | Provider props                       |
| `isChild`            | `boolean`            | Whether this popup is a nested child |
| `parentRow`          | `SelectRowData`      | Parent row for nested menus          |

### Static Members

- `Select.ErrorType` = `ErrorType` from `Input`
  - `Select.ErrorType.CRITICAL` — `'critical'`
  - `Select.ErrorType.WARNING` — `'warning'`

### `SelectTypes` constants (internal — use string literals in props)

| Constant                 | Value          |
| ------------------------ | -------------- |
| `SelectTypes.DEFAULT`    | `'default'`    |
| `SelectTypes.BORDERLESS` | `'borderless'` |
| `SelectTypes.MINI`       | `'mini'`       |

### Keyboard Behaviour

| Key                 | Action                                                                              |
| ------------------- | ----------------------------------------------------------------------------------- |
| `Enter` / `Space`   | Open dropdown (if closed); select focused option (if open and not disabled)         |
| `ArrowDown`         | Open dropdown (if closed) and focus first option; cycle to next option when open    |
| `ArrowUp`           | Open dropdown (if closed) and focus last option; cycle to previous option when open |
| `Alt + ArrowDown`   | Open dropdown without focusing the first item                                       |
| `Escape`            | Close dropdown; dismiss overflow tooltip if visible                                 |
| `Tab` / `Shift+Tab` | Close dropdown and move focus                                                       |

### ARIA / Accessibility

- The input renders with `role="combobox"`, `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls` (pointing to the listbox id), and `aria-activedescendant` (pointing to the focused option id during keyboard navigation).
- The dropdown renders with `role="listbox"`; each option renders with `role="option"` and `aria-selected`.
- Nested child items automatically receive an `aria-label` like `"<parent> (group) - <child>"` unless `rowProps['aria-label']` is set explicitly on the child.
- A `aria-live="polite"` region announces loading/no-data messages to screen readers.
- All selects **must** have a visible label. Use `FormItemSelect` with `label` prop (preferred), or manually associate a `TextLabel` via `aria-labelledby` on `inputProps`.
- A select dropdown must not contain buttons or other interactive elements.
- For mini selects, always supply `label` prop or `inputProps['aria-label']` for screen reader support.

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Accessibility Guidelines

```tsx
<StackingLayout style={{ maxWidth: 800 }}>
  <Alert
    inline={true}
    type={Alert.AlertTypes.WARNING}
    showCloseIcon={false}
    message={
      <AlertLayout type={AlertLayout.AlertLayoutTypes.INLINE}>
        All inputs need a visible label. Please use
        <Link
          type={Link.LINK_TYPE.INLINE}
          href="http://prism-styleguide.eng.nutanix.com/v2/#/Components/Form?id=formitemselect"
        >
          {' '}
          FormItemSelect
        </Link>{' '}
        with the label prop.
      </AlertLayout>
    }
  />
  <Paragraph>
    A select dropdown cannot contain buttons or other interactive elements.
  </Paragraph>
</StackingLayout>
```

#### Basic Example

```tsx
import { Select } from '@nutanix-ui/prism-reactjs'

const MySelect = () => {
  const [selectedRow, setSelectedRow] = useState(null)

  return (
    <Select
      inputProps={{ name: 'basic-select' }}
      style={{ maxWidth: '440px' }}
      rowsData={[
        { key: 1, label: 'puppyfood' },
        { key: 2, label: 'Peach' },
        { key: 3, label: 'galesbure' },
        { key: 6, label: 'Orange', disabled: true },
        { key: 7, label: 'Green' },
      ]}
      label="Clusters"
      selectedRow={selectedRow}
      onSelectedChange={setSelectedRow}
      dropdownProps={{ showCustomScrollbar: false }}
      getPopupContainer={() => document.querySelector('.right-panel')}
    />
  )
}
```

#### Controlled Select (externally toggled open state)

```tsx
import { Select, Checkbox, FlexLayout } from '@nutanix-ui/prism-reactjs'

const MySelect = () => {
  const [selectedRow, setSelectedRow] = useState(null)
  const [openDropdown, setOpenDropdown] = useState(false)

  return (
    <FlexLayout
      flexDirection="column"
      style={{ height: 400, paddingTop: '100px' }}
    >
      <Checkbox
        id="toggle_unchecked"
        type={Checkbox.CheckboxTypes.TOGGLE}
        label="Toggle Select"
        checked={openDropdown}
        onChange={() => setOpenDropdown(!openDropdown)}
      />
      <Select
        inputProps={{
          name: 'basic-select',
          'data-test-id': 'controlled-select',
        }}
        style={{ maxWidth: '440px' }}
        rowsData={[
          { key: 1, label: 'puppyfood' },
          { key: 2, label: 'Peach' },
        ]}
        label="Clusters"
        selectedRow={selectedRow}
        onSelectedChange={setSelectedRow}
        dropdownProps={{ showCustomScrollbar: false }}
        getPopupContainer={() => document.querySelector('.right-panel')}
        popupProviderProps={{ popupVisible: openDropdown }}
      />
    </FlexLayout>
  )
}
```

#### Clearable Select

```tsx
import { Select } from '@nutanix-ui/prism-reactjs'

const MySelect = () => {
  const [selectedRow, setSelectedRow] = useState({
    key: 5,
    label: 'galesbure2',
  })

  return (
    <Select
      inputProps={{ name: 'clearable-select' }}
      style={{ maxWidth: '440px' }}
      rowsData={[
        { key: 1, label: 'puppyfood' },
        { key: 5, label: 'galesbure2' },
        { key: 6, label: 'Orange', disabled: true },
      ]}
      label="Clusters"
      selectedRow={selectedRow}
      onSelectedChange={setSelectedRow}
      clearable={true}
      getPopupContainer={() => document.querySelector('.right-panel')}
    />
  )
}
```

#### Searchable Select (async filter)

```tsx
import { Select } from '@nutanix-ui/prism-reactjs'

const data = [
  { key: 1, label: 'carrot', ip: '10.10.10.1' },
  { key: 2, label: 'broccoli', ip: '10.10.20.2' },
  { key: 3, label: 'spinach', ip: '10.10.30.3' },
]

const SearchableSelect = () => {
  const [selectedRow, setSelectedRow] = useState(null)
  const [rowsData, setRowsData] = useState(data)
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (event) => {
    const value = event.currentTarget.value
    setInputValue(value)
    setLoading(true)
    setTimeout(() => {
      setRowsData(
        data.filter((r) => r.label.toLowerCase().includes(value.toLowerCase())),
      )
      setLoading(false)
    }, 500)
  }

  const handleSelectedChange = (row) => {
    setSelectedRow(row)
    setInputValue(row ? row.label : '')
    setRowsData(data)
  }

  return (
    <Select
      style={{ maxWidth: '440px' }}
      searchable={true}
      clearable={true}
      rowsData={rowsData}
      selectedRow={selectedRow}
      onSelectedChange={handleSelectedChange}
      loading={loading}
      noDataMessage={`Nothing found for "${inputValue}"`}
      loadingMessage={`Searching ${inputValue}...`}
      inputProps={{
        value: inputValue,
        onChange: handleInputChange,
        name: 'searchable-select',
      }}
      getPopupContainer={() => document.querySelector('.right-panel')}
    />
  )
}
```

#### Nested Items (grouped options)

```tsx
import { Select } from '@nutanix-ui/prism-reactjs'

const data = [
  {
    key: 1,
    label: 'Fruits',
    children: [
      { key: 11, label: 'Apple' },
      {
        key: 12,
        label: 'Peach',
        rowProps: { 'aria-label': 'Peach (custom label)' },
      },
    ],
  },
  { key: 2, label: 'Vegetables' },
  { key: 3, label: 'Grains', disabled: true },
]

const NestedSelect = () => {
  const [selectedRow, setSelectedRow] = useState(null)
  return (
    <Select
      inputProps={{ name: 'nested-select' }}
      style={{ maxWidth: '440px' }}
      rowsData={data}
      selectedRow={selectedRow}
      onSelectedChange={setSelectedRow}
      getPopupContainer={() => document.querySelector('.right-panel')}
    />
  )
}
```

#### Options with `subLabel`

```tsx
<Select
  style={{ maxWidth: '300px' }}
  rowsData={[
    { key: 1, label: 'Peach', subLabel: 'A fuzzy stone fruit' },
    { key: 2, label: 'Apple', subLabel: 'A crisp pome fruit' },
    { key: 3, label: 'Banana' },
    { key: 4, label: 'Kiwi', subLabel: 'SubLabel', disabled: true },
  ]}
  selectedRow={selected}
  onSelectedChange={setSelected}
/>
```

#### Custom `rowKeyAttribute` (items use `id` instead of `key`)

```tsx
<Select
  rowsData={[
    { id: 1, label: 'puppyfood' },
    { id: 2, label: 'Peach' },
    { id: 3, label: 'disabled galesbure', disabled: true },
  ]}
  rowKeyAttribute="id"
  selectedRow={selectedRow}
  onSelectedChange={setSelectedRow}
  inputProps={{ name: 'id-keyed-select' }}
/>
```

#### Custom Row Renderer

```tsx
<Select
  style={{ maxWidth: '440px' }}
  rowsData={clusters}
  selectedRow={selected}
  onSelectedChange={setSelected}
  rowRenderer={(row, isSelected, isFocused, dropdownActive) => (
    <FlexLayout alignItems="center" justifyContent="space-between">
      <div>{row.label}</div>
      <StatusIcon type={StatusIcon.StatusIconTypes.QUESTION} />
    </FlexLayout>
  )}
  dropdownProps={{ showCustomScrollbar: true }}
  getPopupContainer={() => document.querySelector('.right-panel')}
  inputProps={{ name: 'custom-rendering-select' }}
/>
```

#### Mini Select with Label

```tsx
import { Select } from '@nutanix-ui/prism-reactjs'

const MiniSelect = () => {
  const [selectedRow, setSelectedRow] = useState(null)
  return (
    <Select
      type="mini"
      label="Label"
      autoSize={true}
      rowsData={[
        { key: 1, label: 'This Week' },
        { key: 2, label: 'This Month' },
        { key: 3, label: 'This Year' },
      ]}
      selectedRow={selectedRow}
      onSelectedChange={setSelectedRow}
      inputProps={{ name: 'mini-select', 'aria-label': 'Select timeframe' }}
      getPopupContainer={() => document.querySelector('.right-panel')}
    />
  )
}
```

#### Mini Select without Placeholder (`hidePlaceholder`)

```tsx
<Select
  type="mini"
  label="Label"
  autoSize={true}
  hidePlaceholder={true}
  rowsData={[
    { key: 1, label: 'Avocado' },
    { key: 2, label: 'Peach' },
  ]}
  selectedRow={selectedRow}
  onSelectedChange={setSelectedRow}
  inputProps={{ name: 'mini-no-placeholder' }}
/>
```

#### Borderless Select

```tsx
<Select
  type="borderless"
  style={{ maxWidth: '440px' }}
  rowsData={options}
  selectedRow={selectedRow}
  onSelectedChange={setSelectedRow}
  inputProps={{ name: 'borderless-select' }}
  getPopupContainer={() => document.querySelector('.right-panel')}
/>
```

#### `autoSize` — Input grows/shrinks with selection

```tsx
<Select
  autoSize={true}
  rowsData={[
    {
      key: 1,
      label: 'This is a very long label that extends beyond the input width',
    },
    { key: 2, label: 'Peach' },
  ]}
  selectedRow={selectedRow}
  onSelectedChange={setSelectedRow}
  inputProps={{ name: 'autosize-select' }}
/>
```

#### `dropdownMatchSelectWidth=false` — Dropdown wider than input

```tsx
<Select
  style={{ maxWidth: '200px' }}
  dropdownMatchSelectWidth={false}
  rowsData={[
    {
      key: 1,
      label: 'This is a very long label that extends beyond the input width',
    },
    { key: 2, label: 'Peach' },
  ]}
  selectedRow={selectedRow}
  onSelectedChange={setSelectedRow}
  inputProps={{ name: 'extended-width-select' }}
/>
```

#### `listBoxId` — Stable id for testing snapshots

```tsx
<Select
  listBoxId="my-select-listbox"
  rowsData={options}
  selectedRow={selectedRow}
  onSelectedChange={setSelectedRow}
  inputProps={{ name: 'stable-id-select' }}
/>
```

#### `aria-disabled` Select (non-interactive, focusable)

```tsx
<Select
  aria-disabled={true}
  rowsData={options}
  selectedRow={selectedRow}
  onSelectedChange={setSelectedRow}
  inputProps={{ name: 'aria-disabled-select' }}
/>
```

#### Select with `addonBefore` / `addonAfter`

```tsx
<Select
  rowsData={domains}
  selectedRow={selectedDomain}
  onSelectedChange={setSelectedDomain}
  addonBefore={<TextLabel>www</TextLabel>}
  addonAfter={
    <Select
      type="mini"
      autoSize={true}
      rowsData={[
        { key: 1, label: '.com' },
        { key: 2, label: '.net' },
      ]}
      selectedRow={tld}
      onSelectedChange={setTld}
      inputProps={{ name: 'tld-select', 'aria-label': 'Select domain' }}
    />
  }
  inputProps={{ name: 'domain-select' }}
/>
```

#### Label, Help Text, and Error (via `FormItemSelect`)

```tsx
import {
  FormItemSelect,
  Input,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'
const { ErrorType } = Input

;<StackingLayout>
  <FormItemSelect
    id="cluster-critical"
    style={{ maxWidth: '440px' }}
    rowsData={data}
    selectedRow={selectedRow}
    onSelectedChange={setSelectedRow}
    label="Clusters"
    error={true}
    helpText="Please select a cluster"
    getPopupContainer={() => document.querySelector('.right-panel')}
  />
  <FormItemSelect
    id="cluster-warning"
    style={{ maxWidth: '440px' }}
    rowsData={data}
    selectedRow={selectedRow}
    onSelectedChange={setSelectedRow}
    label="Clusters"
    error={true}
    errorType={ErrorType.WARNING}
    helpText="Please select a cluster"
    getPopupContainer={() => document.querySelector('.right-panel')}
  />
</StackingLayout>
```

#### Open on Hover (via `popupProviderProps.action`)

```tsx
<Select
  style={{ maxWidth: '440px' }}
  rowsData={options}
  selectedRow={selectedRow}
  onSelectedChange={setSelectedRow}
  popupProviderProps={{ action: 'hover' }}
  inputProps={{ name: 'hover-select' }}
/>
```

### Usage Notes

- Prefer documented enum/static values such as `Select.ErrorType.CRITICAL` over raw strings when the component exposes them.
- Keep labels, help text, and validation visible and persistent for form controls; use `FormItem*` wrappers where available.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.
- Always pass `getPopupContainer` when the Select is inside a scrollable panel to ensure correct dropdown placement.
- For screen reader support in searchable selects, make `noDataMessage` and `loadingMessage` dynamic (include the search term) so `aria-live` re-announces on each keystroke.
- `readOnly` is deprecated — use `aria-disabled` for a non-interactive but focusable/copyable state.
- The clear button is automatically hidden when `disabled`, `aria-disabled`, or `readOnly` is set.
- For `type="mini"` with `hidePlaceholder={true}`, the select renders compactly with no input text until a value is selected.

<!-- SOURCE-API-END -->
