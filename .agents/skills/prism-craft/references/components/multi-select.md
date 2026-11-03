# MultiSelect

## Figma

- **Library name:** Multi-Select (page: N/A, frame: Multi-Select)

## React

Import: `import { MultiSelect } from '@nutanix-ui/prism-reactjs'`

### Data Shape

```ts
type MultiSelectRowData = {
  /** Unique identifier. Required unless rowIdAttribute overrides the key. */
  id?: string | number
  /** Label shown in the input tag and dropdown option. */
  label: string
  /** Secondary text shown below the label inside the dropdown. */
  subLabel?: string
  /** Disabled option — styled only for default rendering. */
  disabled?: boolean
  /** Props forwarded to the option's FlexLayout DOM element. */
  rowProps?: FlexLayoutProps
  /** Props forwarded to the option's Checkbox. */
  checkboxProps?: CheckboxProps
  /** Props forwarded to the selected-item tag. */
  multiSelectedItemTagProps?: MultiSelectedItemTagProps
  /** Nested child options. Only a single level of nesting is supported. */
  nestedRows?: MultiSelectRowData[]
  /** @ignore — internal grouping marker. */
  isGrouped?: boolean
}
```

### Figma Form Field Composition

In Figma, a Multi-Select with Label Top / Label Bottom is a single component. There is no built-in `FormItemMultiSelect` wrapper, so use either `FormItemProvider` (HOC) or the manual composition approach:

**`FormItemProvider` HOC (preferred when a label is needed):**

```tsx
import { FormItemProvider, MultiSelect } from '@nutanix-ui/prism-reactjs'

const SelectWithLabel = FormItemProvider(MultiSelect)

;<SelectWithLabel
  label="Clusters"
  rowsData={data}
  selectedRows={selectedRows}
  onSelectedChange={setSelectedRows}
/>
```

**Manual composition (label + error):**

```tsx
<StackingLayout itemGap="XS">
  <TextLabel id="caps-label">Capabilities</TextLabel>
  <MultiSelect
    aria-labelledby="caps-label"
    selectedRows={selectedTags}
    rowsData={capabilities}
    onSelectedChange={(rows) => setSelectedTags(rows)}
    error={!!errors.capabilities}
    errorType={Input.ErrorType.CRITICAL}
    placeholder="Select capabilities"
  />
  {errors.capabilities && (
    <TextLabel id="caps-error" type={TextLabel.TextLabelType.ERROR}>
      {errors.capabilities}
    </TextLabel>
  )}
</StackingLayout>
```

See `input.md` for the full Label Bottom Type -> React mapping table.

### TSX Examples

```tsx
{
  /* Basic multi-select (no label -- standalone use only) */
}
;<MultiSelect
  selectedRows={selectedTags}
  rowsData={[
    { id: 'gpu', label: 'GPU' },
    { id: 'cpu', label: 'CPU' },
    { id: 'tpu', label: 'TPU' },
  ]}
  onSelectedChange={(rows) => setSelectedTags(rows)}
  placeholder="Select capabilities"
/>
```

```tsx
{
  /* With overflow limit (numeric) and ellipsis variant */
}
;<MultiSelect
  selectedRows={selectedItems}
  rowsData={items}
  onSelectedChange={(rows) => setSelectedItems(rows)}
  overflowLimit={3}
  overflowTagVariant={MultiSelect.OverflowTagVariant.ELLIPSIS}
/>
```

```tsx
{
  /* Responsive overflow — tags clamp to a single row */
}
;<MultiSelect
  selectedRows={selectedItems}
  rowsData={items}
  onSelectedChange={(rows) => setSelectedItems(rows)}
  overflowLimit="responsive"
/>
```

```tsx
{
  /* Select All + nested groups */
}
import { FormItemProvider, MultiSelect } from '@nutanix-ui/prism-reactjs'

const SelectWithLabel = FormItemProvider(MultiSelect)

const data = [
  { id: 'flat-item', label: 'Flat Item' },
  {
    id: 'fruits-group',
    label: 'Fruits',
    nestedRows: [
      { id: 'peach', label: 'Peach' },
      { id: 'orange', label: 'Orange' },
    ],
  },
]

function MySelect() {
  const [selectedRows, setSelectedRows] = React.useState([])
  return (
    <SelectWithLabel
      label="Categories"
      rowsData={data}
      selectedRows={selectedRows}
      onSelectedChange={setSelectedRows}
      selectAllOption={true}
      allOptionLabel="Select All Categories"
      groupNestedItemsTag={true}
      treeViewProps={{ treeItemIdPrefix: 'cat-' }}
      getPopupContainer={() => document.querySelector('.right-panel')}
    />
  )
}
```

```tsx
{
  /* Async search */
}
import { MultiSelect } from '@nutanix-ui/prism-reactjs'

function AsyncSelect() {
  const [rowsData, setRowsData] = React.useState([])
  const [selectedRows, setSelectedRows] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const handleInputChange = (value: string) => {
    if (!value) {
      setRowsData([])
      return
    }
    setLoading(true)
    fetchOptions(value).then((results) => {
      setRowsData(results)
      setLoading(false)
    })
  }

  return (
    <MultiSelect
      rowsData={rowsData}
      selectedRows={selectedRows}
      onSelectedChange={setSelectedRows}
      loading={loading}
      inputProps={{
        onChange: handleInputChange,
        placeholder: 'Type to search',
      }}
      dropdownProps={{
        loadingMessage: 'Searching…',
        startTypingMessage: 'Start typing to search',
      }}
      clearInputValueOnRowSelected={false}
      getPopupContainer={() => document.querySelector('.right-panel')}
    />
  )
}
```

### Anti-patterns

- Don't use multiple `Checkbox` components to simulate multi-select
- Use `selectedRows` (array), not `selectedRow` (that's for `Select`)
- Don't render bare `MultiSelect` when Figma shows Label Top or Label Bottom — wrap with `FormItemProvider` or `StackingLayout` + `TextLabel`
- Don't use `readOnly` — it is deprecated; use `aria-disabled` instead
- Don't set `overflowLimit="responsive"` if you apply custom styles to `MultiSelectedItemTag` — responsive overflow only works with default styling

<!-- SOURCE-API-START -->

### Import

```tsx
import { MultiSelect } from '@nutanix-ui/prism-reactjs'

// Named type exports (not re-exported from the package root; import from the component path or use inline)
import type {
  MultiSelectProps,
  MultiSelectRowData,
} from '@nutanix-ui/prism-reactjs/...'

// Static enum available on the class:
MultiSelect.OverflowTagVariant.NORMAL // 'normal'
MultiSelect.OverflowTagVariant.ELLIPSIS // 'ellipsis'
```

Sub-components also exported from `@nutanix-ui/prism-reactjs`:

```tsx
import {
  MultiSelectInput, // internal input wrapper (rare direct use)
  MultiSelectDropdown, // internal dropdown (rare direct use)
  MultiSelectedItemTag, // selected-item tag chip
  FormItemProvider, // HOC to add a label to any form control
} from '@nutanix-ui/prism-reactjs'
```

### Enums & Constants

#### `OverflowTagVariant` (`MultiSelectConstants.ts`)

```ts
import { OverflowTagVariant } from '@nutanix-ui/prism-reactjs/...'
// Or access via the static property:
MultiSelect.OverflowTagVariant.NORMAL // 'normal'  (default)
MultiSelect.OverflowTagVariant.ELLIPSIS // 'ellipsis'
```

#### `OverflowLimit` type

```ts
type OverflowLimit = number | 'responsive'
// number — max visible tags; 0 = no limit (default)
// 'responsive' — clamps tags to a single row (do not use with custom tag styles)
```

### Props Interfaces

#### `MultiSelectProps`

Extends: `Omit<React.HTMLProps<HTMLDivElement>, 'ref'>`

| Prop                           | Type                                                                                                                 | Default                      | Required | Description                                                                                                                              |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------- | ---------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `selectedRows`                 | `MultiSelectRowData[]`                                                                                               | `[]`                         | **Yes**  | Currently selected rows.                                                                                                                 |
| `onSelectedChange`             | `(selectedRows: MultiSelectRowData[]) => void`                                                                       | `() => 0`                    | **Yes**  | Fired when selection changes. Receives the full new selection array.                                                                     |
| `rowsData`                     | `MultiSelectRowData[] \| any[]`                                                                                      | `[]`                         | No       | All available options. Each item must have a unique `id` (or the field named by `rowIdAttribute`). See `MultiSelectRowData` shape below. |
| `className`                    | `string`                                                                                                             | —                            | No       | Custom CSS class on the root `<div>`.                                                                                                    |
| `rowIdAttribute`               | `string \| 'id'`                                                                                                     | `'id'`                       | No       | The field in each `rowsData` item used as the unique key.                                                                                |
| `overflowLimit`                | `number \| 'responsive'`                                                                                             | `0` (no limit)               | No       | Max number of visible tags. `0` = no limit. `'responsive'` = clamp to one row (default styling only).                                    |
| `overflowTagVariant`           | `OverflowTagVariant`                                                                                                 | `OverflowTagVariant.NORMAL`  | No       | How hidden tags are indicated. `NORMAL` shows a count tag; `ELLIPSIS` shows an ellipsis tag.                                             |
| `disabled`                     | `boolean`                                                                                                            | `false`                      | No       | Fully disables the control.                                                                                                              |
| `aria-disabled`                | `AriaDisabledType` (`boolean`)                                                                                       | —                            | No       | Marks control as non-interactive with read-only styling. Prefer over `readOnly`.                                                         |
| `readOnly`                     | `boolean`                                                                                                            | —                            | No       | **Deprecated.** Use `aria-disabled` instead.                                                                                             |
| `error`                        | `boolean`                                                                                                            | `false`                      | No       | Applies error styling to the input.                                                                                                      |
| `errorType`                    | `ErrorType`                                                                                                          | —                            | No       | Sets the severity of the error state (e.g. `Input.ErrorType.CRITICAL`).                                                                  |
| `rowRenderer`                  | `(rowData: MultiSelectRowData, isSelected: boolean, isHover: boolean, isFocus: boolean) => JSX.Element`              | —                            | No       | Custom render function for each dropdown option.                                                                                         |
| `rowFilterer`                  | `(rowData: MultiSelectRowData, inputValue: string) => boolean`                                                       | —                            | No       | Custom filter predicate for dropdown options. `inputValue` is case-sensitive. Return `true` to include the row.                          |
| `inputProps`                   | `InputProps` (see below)                                                                                             | `{}`                         | No       | Props forwarded to the internal `<input>`. `onChange` here takes `(value: string, event?)` not the raw event.                            |
| `clearButtonIconProps`         | `Omit<ButtonProps, 'onClick'>`                                                                                       | `{}`                         | No       | Props for the clear-all icon button.                                                                                                     |
| `dropdownProps`                | `React.HTMLProps<HTMLDivElement> & { loadingMessage?: string; noDataMessage?: string; startTypingMessage?: string }` | `{}`                         | No       | Props for the dropdown container element plus custom message strings.                                                                    |
| `getPopupContainer`            | `PopupProviderProps['getPopupContainer']`                                                                            | —                            | No       | Returns the DOM node the dropdown portal attaches to. Use to fix scroll-context issues.                                                  |
| `zIndex`                       | `number`                                                                                                             | `ZIndexes['select-z-index']` | No       | Z-index override for the dropdown.                                                                                                       |
| `clearInputValueOnRowSelected` | `boolean`                                                                                                            | `true`                       | No       | Whether to clear the filter input after selecting a row.                                                                                 |
| `loading`                      | `boolean`                                                                                                            | `false`                      | No       | Show loading state in dropdown.                                                                                                          |
| `showOptionsWhileLoading`      | `boolean`                                                                                                            | `false`                      | No       | Keep existing options visible while new data loads.                                                                                      |
| `groupNestedItemsTag`          | `boolean`                                                                                                            | —                            | No       | When all items in a nested group are selected, show the group label tag instead of individual item tags.                                 |
| `selectAllOption`              | `boolean`                                                                                                            | —                            | No       | Show a "Select All" option at the top of the dropdown.                                                                                   |
| `selectAllCheckboxProps`       | `CheckboxProps`                                                                                                      | —                            | No       | Props forwarded to the Select All checkbox.                                                                                              |
| `allOptionLabel`               | `string`                                                                                                             | `'All'`                      | No       | Label text for the Select All option.                                                                                                    |
| `background`                   | `'base' \| 'alt'` (`BackgroundTypeWithoutBody`)                                                                      | —                            | No       | Background context for the input field.                                                                                                  |
| `treeViewProps`                | `TreeViewProps`                                                                                                      | —                            | No       | Props forwarded to the internal `TreeView`. Use `treeViewProps.treeItemIdPrefix` to namespace tree item IDs for accessibility.           |
| `data-test`                    | `string`                                                                                                             | —                            | No       | Test selector on the root element.                                                                                                       |
| `testProps`                    | `Record<any, any>`                                                                                                   | —                            | No       | Internal test props. `@ignore`.                                                                                                          |

#### `InputProps` (for `inputProps`)

Extends `MultiSelectInputProps` with a modified `onChange` signature:

```ts
interface InputProps extends Omit<MultiSelectInputProps, 'onChange'> {
  onChange?: (
    value: string,
    event?: React.ChangeEvent<HTMLInputElement>,
  ) => void
}
```

Note: `inputProps.onChange` receives `(value, event)` instead of the standard React `(event)`.

#### `MultiSelectRowData`

```ts
type MultiSelectRowData = {
  /** Unique identifier. Required unless rowIdAttribute overrides the key. */
  id?: string | number
  /** Label shown as the tag text and default dropdown content. */
  label: string
  /** Secondary text shown below the label in the dropdown. */
  subLabel?: string
  /** Disabled option. Styled only for default rendering. */
  disabled?: boolean
  /** Props forwarded to the option row's FlexLayout element. */
  rowProps?: FlexLayoutProps
  /** Props forwarded to the option's Checkbox. */
  checkboxProps?: CheckboxProps
  /** Props forwarded to the selected-item tag component. */
  multiSelectedItemTagProps?: MultiSelectedItemTagProps
  /** Nested child options. One level of nesting only. */
  nestedRows?: MultiSelectRowData[]
  /** @ignore — internal. */
  isGrouped?: boolean
}
```

#### `MultiSelectedItemTagProps`

| Prop                | Type                                     | Default | Description                                 |
| ------------------- | ---------------------------------------- | ------- | ------------------------------------------- |
| `id`                | `string \| number`                       | —       | Identifier matching the row's `id`.         |
| `children`          | `string`                                 | —       | **Required.** The tag label text.           |
| `highlighted`       | `boolean`                                | `false` | Highlighted styling (keyboard-focused tag). |
| `disabled`          | `boolean`                                | `false` | Disabled styling; hides the close icon.     |
| `closable`          | `boolean`                                | `true`  | Show/hide the close (delete) icon.          |
| `onClose`           | `(id, event: React.MouseEvent) => void`  | —       | Called when the delete icon is clicked.     |
| `deleteButtonProps` | `ButtonProps`                            | —       | Props for the delete button.                |
| `errorType`         | `ErrorType`                              | —       | Error styling on the tag.                   |
| `insertBefore`      | `React.ReactNode`                        | —       | Element rendered before the tag content.    |
| `suffix`            | `React.ReactNode`                        | —       | Element rendered after the tag label.       |
| `onEditChange`      | `(newValue: string, id) => void`         | —       | Callback when a tag is edited inline.       |
| `inputProps`        | `TextInputProps`                         | `{}`    | Props for the inline edit `<input>`.        |
| `isEditing`         | `boolean`                                | `false` | Put the tag into edit mode.                 |
| `tooltipProps`      | `TruncateComponentProps['tooltipProps']` | —       | Tooltip shown when label is truncated.      |
| `className`         | `string`                                 | —       | Custom CSS class.                           |

### Static Properties

```ts
MultiSelect.OverflowTagVariant.NORMAL // 'normal'  (default)
MultiSelect.OverflowTagVariant.ELLIPSIS // 'ellipsis'
```

### Default Props

| Prop                           | Default                      |
| ------------------------------ | ---------------------------- |
| `rowIdAttribute`               | `'id'`                       |
| `selectedRows`                 | `[]`                         |
| `rowsData`                     | `[]`                         |
| `disabled`                     | `false`                      |
| `error`                        | `false`                      |
| `clearInputValueOnRowSelected` | `true`                       |
| `inputProps`                   | `{}`                         |
| `dropdownProps`                | `{}`                         |
| `loading`                      | `false`                      |
| `showOptionsWhileLoading`      | `false`                      |
| `zIndex`                       | `ZIndexes['select-z-index']` |
| `overflowLimit`                | `0` (no limit)               |
| `overflowTagVariant`           | `OverflowTagVariant.NORMAL`  |
| `clearButtonIconProps`         | `{}`                         |

### Keyboard Behaviour

| Key                        | Action                                                                            |
| -------------------------- | --------------------------------------------------------------------------------- |
| `ArrowDown` / `ArrowUp`    | Opens dropdown (if closed); moves focus through options via `TreeView`.           |
| `Home` / `End`             | Moves focus to first/last option when dropdown is open.                           |
| `Enter`                    | Selects the focused option; or deletes the highlighted tag (if a tag is focused). |
| `Space`                    | Selects the focused option when dropdown is open and input is empty.              |
| `Escape`                   | Closes the dropdown; or deselects the highlighted tag.                            |
| `ArrowLeft` / `ArrowRight` | When input is empty, moves keyboard focus across selected tags.                   |
| `Backspace`                | Not bound by default — navigation is via `ArrowLeft`.                             |

### Accessibility

- Root renders as `role="combobox"` with `aria-haspopup="tree"`, `aria-expanded`, and `aria-controls` pointing to the `TreeView` dropdown.
- `aria-activedescendant` tracks the focused tree item (prefixed by `treeViewProps.treeItemIdPrefix`).
- `aria-describedby` and `aria-invalid` are set automatically when `error` is true.
- An `aria-live="assertive"` `SrOnly` region announces selection and deletion actions to screen readers.
- Set `treeViewProps.treeItemIdPrefix` to a unique string to avoid duplicate IDs when multiple `MultiSelect` instances appear on the same page.
- Use `aria-disabled` (not `readOnly`) to mark read-only instances — it preserves tab focus while suppressing interaction.

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Here we are using MultiSelect along with simulating asynchronous search.

```tsx
const data = [
  {
    id: 1,
    label: 'puppyfood',
    rowProps: {
      'data-test-id': 'async-row-puppyfood'
    }
  },
  {
    id: 2,
    label: 'Peach'
  },
  {
    id: 3,
    label: 'galesbure'
  }
];

class MySelect extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      rowsData: [],
      value: '',
      selectedRows: [],
      loading: false
    };

    this.handleOnSelectedChange = this.handleOnSelectedChange.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);

    this.multiSelectProps = {
      inputProps: {
        onChange: this.handleOnChange,
        placeholder: 'Type to search',
        'data-test-id': 'async-input'
      },
      onSelectedChange: this.handleOnSelectedChange,
      // We attached to the right-panel to handle the scrolling placement properly.
      getPopupContainer: () => document.querySelector('.right-panel'),
      dropdownProps: {
        loadingMessage: 'Searching...',
        startTypingMessage: 'My custom message to start typing'
      }
    }
  }

  handleOnSelectedChange(selectedRows) {
    this.setState({ selectedRows });
  }

  handleOnChange(value) {
    if (!value) {
      this.setState({
        value,
        rowsData: []
      });
      return;
    }
    this.setState({
      value,
      loading: true
    });
    setTimeout(() => {
      const rowsData = [];
      data.forEach((item) => {
        if (_.includes(item.label, value)) {
          rowsData.push(item);
        }
      });
      this.setState({
        rowsData,
        loading: false
      });
    }, 1000);
  }

  render() {
    const { value, ..._state } = this.state;
    this.multiSelectProps.inputProps.value = value;

    return (
      <div data-test-id="multiselect-async-search"
        style={
// ...see source examples for the full sample
```

#### Basic Usage.

```tsx
const data = [
  {
    id: 1,
    label: 'puppyfood',
    ip: '10.10.10.1'
  },
  {
    id: 2,
    label: 'Peach',
    ip: '10.10.2.2'
  },
  {
    id: 3,
    label: 'galesbure',
    ip: '10.10.2.3'
  },
  {
    id: 4,
    label: 'purcellville',
    ip: '10.10.10.11'
  },
  {
    id: 5,
    label: 'kechi',
    ip: '10.10.2.21'
  },
  {
    id: 6,
    label: 'combee-settlement',
    ip: '10.10.2.31'
  }
];

class MySelect extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedRows: [
        data[0],
        data[2]
      ]
    };

    this.handleOnSelectedChange = this.handleOnSelectedChange.bind(this);
  }

  handleOnSelectedChange(selectedRows) {
    this.setState({ selectedRows });
  }

  rowRenderer(rowData, isSelected, isHover) {
    const { label, ip } = rowData;
    const ipStyle = isHover ? { color: 'var(--color-text-secondary-label)' } : undefined;
    return (
      <FlexItem flexGrow="1">
        <FlexLayout justifyContent="space-between">
          <TextLabel
            type={ TextLabel.TEXT_LABEL_TYPE.PRIMARY }>{ label }</TextLabel>
          <TextLabel
            type={ TextLabel.TEXT_LABEL_TYPE.TERTIARY }
            style={ ipStyle }
          >{ ip }</TextLabel>
        </FlexLayout>
      </FlexItem>
    );
  }

  rowFilterer(rowData, inputValue) {
    const { label, ip } = rowData;
    const lowerCaseSearchString = inputValue.toLowerCase();
    return (_.includes(label.toLowerCase(), lowerCaseSearchString) ||
      _.includes(ip.toLowerCase(), lowerCaseSearchString));
  }

  render() {
    const props = {
      rowsData: data,
      selectedRows: this.state.selectedRows,
      onSelectedChange: this.handleOnSelectedChange,
      rowRenderer: this.rowRenderer,
      rowFilterer: this.rowFilterer,
      inputPr
// ...see source examples for the full sample
```

#### Here we are overwriting the default checkbox props of each option

```tsx
const data = [
  {
    id: 1,
    label: 'puppyfood',
  },
  {
    id: 2,
    label: 'Peach',
    checkboxProps: { wrapperProps: { classname: 'checkboxCustomClass' } },
  },
  {
    id: 3,
    label: 'galesbure',
  },
  {
    id: 4,
    label: 'purcellville',
  },
  {
    id: 5,
    label: 'kechi',
  },
  {
    id: 6,
    label: 'combee-settlement',
  },
]

class MySelect extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedRows: [data[0], data[2]],
    }

    this.handleOnSelectedChange = this.handleOnSelectedChange.bind(this)
  }

  handleOnSelectedChange(selectedRows) {
    this.setState({ selectedRows })
  }

  render() {
    const props = {
      rowsData: data,
      selectedRows: this.state.selectedRows,
      onSelectedChange: this.handleOnSelectedChange,
      inputProps: {
        'aria-label': 'Options',
      },
      // We attached to the right-panel to handle the scrolling placement properly.
      getPopupContainer: () => document.querySelector('.right-panel'),
    }

    return (
      <div style={{ maxWidth: '440px' }}>
        <MultiSelect {...props} />
      </div>
    )
  }
}

;<MySelect />
```

#### Aria Disabled Example

```tsx
const SelectWithLabel = FormItemProvider(MultiSelect)

const data = [
  {
    id: 'aria-disabled-1',
    label: 'puppyfood',
  },
  {
    id: 'aria-disabled-2',
    label: 'Peach',
  },
  {
    id: 'aria-disabled-3',
    label: 'galesbure',
  },
]

const MySelect = () => {
  const [selectedRows, setSelectedRows] = useState([data[2]])
  const props = {
    'data-test-id': 'aria-disabled',
    rowsData: data,
    selectedRows,
    onSelectedChange: setSelectedRows,
    // We attached to the right-panel to handle the scrolling placement properly.
    getPopupContainer: () => document.querySelector('.right-panel'),
    'aria-disabled': true,
  }

  return (
    <div style={{ maxWidth: '440px' }}>
      <SelectWithLabel label="Aria Disabled" {...props} />
    </div>
  )
}

;<MySelect />
```

#### Overflow Tags Example

```tsx
import { FormItemProvider, MultiSelect } from '@nutanix-ui/prism-reactjs';

const SelectWithLabel = FormItemProvider(MultiSelect);

// overflowLimit=4 with NORMAL variant (count tag)
<SelectWithLabel
  label="Colors"
  rowsData={data}
  selectedRows={selectedRows1}
  onSelectedChange={(rows) => setSelectedRows1(rows)}
  overflowLimit={4}
/>

// overflowLimit=4 with ELLIPSIS variant
<SelectWithLabel
  label="Colors"
  rowsData={data}
  selectedRows={selectedRows2}
  onSelectedChange={(rows) => setSelectedRows2(rows)}
  overflowLimit={4}
  overflowTagVariant={MultiSelect.OverflowTagVariant.ELLIPSIS}
/>

// Responsive overflow (single-row clamp, default styling only)
<SelectWithLabel
  label="Colors"
  rowsData={data}
  selectedRows={selectedRows3}
  onSelectedChange={(rows) => setSelectedRows3(rows)}
  overflowLimit="responsive"
/>
```

### Usage Notes

- Prefer `MultiSelect.OverflowTagVariant.ELLIPSIS` / `MultiSelect.OverflowTagVariant.NORMAL` over raw strings.
- Keep labels, help text, and validation visible and persistent for form controls; use `FormItemProvider` wrapping where a label is needed.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.
- Always set `treeViewProps.treeItemIdPrefix` to a page-unique string when rendering more than one `MultiSelect` on the same page, to prevent duplicate DOM IDs.
- `inputProps.onChange` receives `(value: string, event?)` — not the raw React change event. This differs from standard `Input` usage.
- Use `getPopupContainer` to anchor the dropdown inside a scrollable panel so the dropdown follows the scroll position correctly.

<!-- SOURCE-API-END -->
