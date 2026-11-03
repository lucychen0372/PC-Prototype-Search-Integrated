# Pagination

## Figma

- **Library name:** Pagination (page: Navigation, frame: Navigation)

## React

Import: `import { Pagination } from '@nutanix-ui/prism-reactjs'`

### Props

| Prop                   | Type                                                                            | Default                  | Required | Notes                                                                                                                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------- | ------------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `total`                | `number`                                                                        | —                        | **yes**  | Total number of items                                                                                                                                                                           |
| `pageSize`             | `number`                                                                        | `10`                     | no       | Items per page. Falls back to `10` when both `pageSize` and `pageSizeOptions` are unset. When `pageSizeOptions` is set and `pageSize` is unset, the first element of `pageSizeOptions` is used. |
| `currentPage`          | `number`                                                                        | `1`                      | no       | Active page (controlled). When `onChange` is provided the component syncs to this value on every render.                                                                                        |
| `onChange`             | `(currentPage: number, pageSize: number) => void`                               | —                        | no       | Called when the page or page size changes. When provided the component becomes fully controlled and will not update its internal state.                                                         |
| `pageSizeOptions`      | `number[]`                                                                      | —                        | no       | Renders a rows-per-page `Select` dropdown with these choices                                                                                                                                    |
| `getPageSizeRowProps`  | `(value: number, index: number) => DataWrapperProps<SelectRowData['rowProps']>` | —                        | no       | Extra `rowProps` to spread onto each row of the page-size `Select`                                                                                                                              |
| `showOnlyPage`         | `boolean`                                                                       | `false`                  | no       | Replaces the item-range text (e.g. `1–10 of 47`) with a page counter (e.g. `Page 1 of 5`)                                                                                                       |
| `disabled`             | `boolean`                                                                       | `false`                  | no       | Disables prev/next buttons and the page-size select                                                                                                                                             |
| `pageSizeOptionLabel`  | `string`                                                                        | `"rows per page"` (i18n) | no       | Suffix appended to each page-size option label, e.g. `"10 rows per page"`. Pass `""` to suppress the suffix.                                                                                    |
| `formatNumber`         | `(number: number) => string`                                                    | —                        | no       | Custom number formatter. Defaults to `I18nManager.formatNumber` (locale-aware).                                                                                                                 |
| `prevProps`            | `ButtonProps`                                                                   | —                        | no       | Extra props spread onto the Previous (`‹`) button                                                                                                                                               |
| `nextProps`            | `ButtonProps`                                                                   | —                        | no       | Extra props spread onto the Next (`›`) button                                                                                                                                                   |
| `pageSizeOptionsProps` | `SelectProps`                                                                   | —                        | no       | Extra props spread onto the page-size `Select`. Use `inputProps['aria-label']` or `label` for accessibility.                                                                                    |
| `wrapperProps`         | `FlexLayoutProps`                                                               | `{}`                     | no       | Props for the outermost `FlexLayout` wrapper. `flexWrap` is managed internally when `layoutMode="wrappable"`.                                                                                   |
| `layoutMode`           | `PaginationLayoutMode`                                                          | `"unwrappable"`          | no       | Controls wrapping behaviour. See enum below.                                                                                                                                                    |
| `className`            | `string`                                                                        | —                        | no       | Additional CSS class on the root element                                                                                                                                                        |

### `PaginationLayoutMode` values

`PaginationLayoutMode` is a string union exported from the component file:

```tsx
export type PaginationLayoutMode = 'wrappable' | 'unwrappable'
```

| Value           | Behaviour                                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `"unwrappable"` | Default. Single-row layout — nav + options never wrap. A `VerticalSeparator` is rendered between the nav and the options select.           |
| `"wrappable"`   | Allows the nav section and the options select to wrap onto separate lines at narrow widths. The vertical separator is hidden in this mode. |

### Behaviour notes

- **Uncontrolled by default:** if `onChange` is not provided, the component manages `currentPage` and `pageSize` in internal state.
- **Controlled:** when `onChange` is provided, the component syncs its internal state to `currentPage` and `pageSize` props on every render. You must update those props in your `onChange` handler.
- **Out-of-range guard:** if `currentPage` exceeds `totalPages`, the component resets to the last valid page.
- **Page-size change preserves position:** when the user picks a different page size the component computes the new current page so that the first visible item stays in view.
- **Aria-live:** the range/page text has `aria-live="polite"` after the first navigation action (it is `"off"` initially to avoid announcing on mount).

### Accessibility

- When rendering `pageSizeOptions`, provide an accessible label for the page-size `Select` via `pageSizeOptionsProps`:
  - `pageSizeOptionsProps={{ inputProps: { 'aria-label': 'Select rows per page' } }}` — when there is no visible label
  - `pageSizeOptionsProps={{ label: 'Rows per page' }}` — renders a visible label above the select and wires `aria-labelledby` automatically
- Prev/Next buttons already carry `aria-label` values from the i18n bundle (`"Previous page"` / `"Next page"`). Override via `prevProps`/`nextProps` only if the locale needs it.
- The range text region is `aria-live="polite"` so screen readers announce changes after the first interaction.

### TSX Examples

#### Minimal (uncontrolled)

```tsx
import { Pagination } from '@nutanix-ui/prism-reactjs'
;<Pagination total={47} />
```

#### Controlled with page change handler

```tsx
import React, { useState } from 'react'
import { Pagination } from '@nutanix-ui/prism-reactjs'

function MyList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  return (
    <Pagination
      total={100}
      currentPage={currentPage}
      pageSize={pageSize}
      onChange={(page, size) => {
        setCurrentPage(page)
        setPageSize(size)
      }}
    />
  )
}
```

#### Show only page number

```tsx
import { Pagination } from '@nutanix-ui/prism-reactjs'
;<Pagination total={50} currentPage={1} pageSize={10} showOnlyPage={true} />
```

#### With page-size options and accessible label

```tsx
import { Pagination } from '@nutanix-ui/prism-reactjs'
;<Pagination
  total={1000}
  pageSizeOptions={[10, 25, 50, 100]}
  pageSizeOptionsProps={{
    label: 'Rows per page',
    inputProps: { 'aria-label': 'Select rows per page' },
  }}
/>
```

#### With page-size options, custom row props, and data-test-ids

```tsx
import { Pagination } from '@nutanix-ui/prism-reactjs'
;<Pagination
  total={1000}
  pageSizeOptions={[5, 10, 25, 50, 100]}
  pageSizeOptionsProps={{
    'data-test-id': 'my-select',
    inputProps: { 'aria-label': 'Select table row' },
  }}
  prevProps={{ 'data-test-id': 'my-prev-button' }}
  nextProps={{ 'data-test-id': 'my-next-button' }}
  getPageSizeRowProps={(value) => ({ 'data-test-id': `pagesize-${value}` })}
  wrapperProps={{ 'data-test-id': 'pagination' }}
/>
```

#### Custom page-size label suffix

```tsx
import { Pagination } from '@nutanix-ui/prism-reactjs';

// Each option reads "5 items", "10 items", etc.
<Pagination
  total={100}
  pageSizeOptions={[5, 10, 15, 20]}
  pageSizeOptionLabel="items"
/>

// Suppress the suffix entirely (use pageSizeOptionsProps.label for the visible label)
<Pagination
  total={1000}
  pageSizeOptions={[5, 10, 15, 20]}
  pageSizeOptionLabel=""
  pageSizeOptionsProps={{ label: 'Rows per page' }}
/>
```

#### Disabled state

```tsx
import { Pagination } from '@nutanix-ui/prism-reactjs'
;<Pagination total={100} pageSizeOptions={[5, 10, 15, 20]} disabled={true} />
```

#### Wrappable layout mode (responsive)

```tsx
import { Pagination } from '@nutanix-ui/prism-reactjs'

// nav and options select wrap at narrow container widths
;<Pagination
  total={1000}
  pageSizeOptions={[5, 10, 15, 20]}
  pageSizeOptionLabel=""
  pageSizeOptionsProps={{ label: 'Rows per page' }}
  layoutMode="wrappable"
/>
```

#### Custom number formatting

```tsx
import { Pagination } from '@nutanix-ui/prism-reactjs'
;<Pagination total={1000000} formatNumber={(n) => n.toLocaleString('en-US')} />
```

### Anti-patterns

- Don't build custom pagination with prev/next buttons — use `Pagination`.
- Table has built-in pagination support via its `pagination` prop — prefer that for table pages.
- Don't omit `aria-label` / `label` on `pageSizeOptionsProps` when `pageSizeOptions` is set — the Select has no implicit label.
- Don't mix controlled and uncontrolled usage: if you pass `onChange`, you must also keep `currentPage` and `pageSize` up to date in your state.

<!-- SOURCE-API-START -->

### Import

```tsx
import { Pagination } from '@nutanix-ui/prism-reactjs'
```

`PaginationLayoutMode` is not re-exported from the package root; use the string literals `'wrappable'` and `'unwrappable'` directly.

### Props Interfaces

#### `PaginationProps`

| Prop                   | Type                                                                            | Description                                                                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `total`                | `number`                                                                        | **Required.** Total number of items.                                                                                                                        |
| `className`            | `string`                                                                        | Additional CSS class on the root element.                                                                                                                   |
| `showOnlyPage`         | `boolean`                                                                       | Show only the page count (e.g. "Page 1 of 5") instead of the item range (e.g. "1–10 of 47").                                                                |
| `onChange`             | `(currentPage: number, pageSize: number) => void`                               | Called when page or page size changes. When provided the component becomes controlled and syncs to `currentPage` / `pageSize` props.                        |
| `pageSize`             | `number`                                                                        | Items per page. Defaults to `10` when `pageSizeOptions` is also unset.                                                                                      |
| `pageSizeOptions`      | `number[]`                                                                      | Renders a rows-per-page Select. The first element is used as the initial page size when `pageSize` is unset.                                                |
| `getPageSizeRowProps`  | `(value: number, index: number) => DataWrapperProps<SelectRowData['rowProps']>` | Extra `rowProps` for each row in the page-size Select. `value` is the option value; `index` is its position in `pageSizeOptions`.                           |
| `currentPage`          | `number`                                                                        | Active page number. Defaults to `1`. Synced from props when `onChange` is set.                                                                              |
| `disabled`             | `boolean`                                                                       | Disables prev/next buttons and the page-size Select.                                                                                                        |
| `pageSizeOptionLabel`  | `string`                                                                        | Suffix appended to each page-size option (e.g. `"rows per page"`). Pass `""` to suppress.                                                                   |
| `formatNumber`         | `(number: number) => string`                                                    | Custom number formatter; defaults to `I18nManager.formatNumber` (locale-aware).                                                                             |
| `prevProps`            | `ButtonProps`                                                                   | Extra props spread onto the Previous button.                                                                                                                |
| `nextProps`            | `ButtonProps`                                                                   | Extra props spread onto the Next button.                                                                                                                    |
| `pageSizeOptionsProps` | `SelectProps`                                                                   | Extra props spread onto the page-size Select. Use `label` or `inputProps['aria-label']` for accessibility.                                                  |
| `wrapperProps`         | `FlexLayoutProps`                                                               | Props for the outermost `FlexLayout`. `flexWrap` is managed internally when `layoutMode="wrappable"`.                                                       |
| `layoutMode`           | `PaginationLayoutMode`                                                          | `'unwrappable'` (default) — single row, with a `VerticalSeparator` between nav and options. `'wrappable'` — allows wrapping at narrow widths, no separator. |

### Source Examples

These are adapted from the Prism source examples.

#### Accessibility Guidelines

```tsx
import { Pagination } from '@nutanix-ui/prism-reactjs';

// Option A: visible label rendered by the Select component
<Pagination
  total={100}
  pageSizeOptions={[10, 25, 50]}
  pageSizeOptionsProps={{
    label: 'Rows per page'
  }}
/>

// Option B: aria-label on the hidden input (no visible label)
<Pagination
  total={100}
  pageSizeOptions={[10, 25, 50]}
  pageSizeOptionsProps={{
    inputProps: { 'aria-label': 'Select rows per page' }
  }}
/>
```

#### Default Pagination

```tsx
<Pagination total={47} wrapperProps={{ 'data-test-id': 'default' }} />
```

#### Show Only Page

```tsx
<Pagination
  total={50}
  currentPage={1}
  pageSize={10}
  showOnlyPage={true}
  wrapperProps={{ 'data-test-id': 'show-only-page' }}
/>
```

#### Page Change Handler

```tsx
const onChange = (page: number, pageSize: number) => {
  console.log(`Page: ${page}, PageSize: ${pageSize}`)
}

;<Pagination total={3} currentPage={1} pageSize={1} onChange={onChange} />
```

#### With Page Size Options

```tsx
<Pagination
  total={1000}
  pageSizeOptions={[5, 10, 25, 50, 100]}
  pageSizeOptionsProps={{
    'data-test-id': 'my-select',
    inputProps: { 'aria-label': 'Select table row' },
  }}
  prevProps={{ 'data-test-id': 'my-prev-button' }}
  nextProps={{ 'data-test-id': 'my-next-button' }}
  getPageSizeRowProps={(value) => ({ 'data-test-id': `my-pagesize-${value}` })}
  wrapperProps={{ 'data-test-id': 'with-page-size' }}
/>
```

#### With Page Size Options and Initial pageSize

```tsx
// pageSize=50 pre-selects "50" in the dropdown
<Pagination total={1000} pageSize={50} pageSizeOptions={[5, 10, 25, 50, 100]} />
```

#### Custom Page Size Label

```tsx
<Pagination
  total={100}
  pageSizeOptions={[5, 10, 15, 20]}
  pageSizeOptionLabel="items"
  wrapperProps={{ 'data-test-id': 'page-size-label' }}
/>
```

#### Disabled Pagination

```tsx
<Pagination
  total={100}
  pageSizeOptions={[5, 10, 15, 20]}
  pageSizeOptionLabel="items"
  disabled={true}
  wrapperProps={{ 'data-test-id': 'disabled' }}
/>
```

#### Wrappable Layout with Visible Label

```tsx
import React, { useState } from 'react'
import { Pagination } from '@nutanix-ui/prism-reactjs'

function ResponsivePagination() {
  return (
    <Pagination
      total={1000}
      layoutMode="wrappable"
      pageSizeOptions={[5, 10, 15, 20]}
      pageSizeOptionLabel=""
      pageSizeOptionsProps={{
        label: 'Rows per page',
        'data-test-id': 'my-select',
      }}
      wrapperProps={{ 'data-test-id': 'with-label' }}
    />
  )
}
```

#### Controlled Pagination with Dynamic Item List

```tsx
import React, { useState } from 'react'
import { Pagination, FlexLayout } from '@nutanix-ui/prism-reactjs'

function PaginatedList() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4'])
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 3

  const handleChange = (page: number) => setCurrentPage(page)

  const startIdx = (currentPage - 1) * pageSize
  const visibleItems = items.slice(startIdx, startIdx + pageSize)

  return (
    <FlexLayout flexDirection="column" itemGap="M">
      {/* ...render visibleItems... */}
      <Pagination
        total={items.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onChange={handleChange}
        wrapperProps={{ 'data-test-id': 'with-add-remove-items' }}
        prevProps={{ 'data-test-id': 'pagination-prev' }}
        nextProps={{ 'data-test-id': 'pagination-next' }}
      />
    </FlexLayout>
  )
}
```

### Usage Notes

- `PaginationLayoutMode` is not exported from `@nutanix-ui/prism-reactjs`. Use the string literals `'wrappable'` and `'unwrappable'` directly.
- Use `wrapperProps` to attach `data-test-id` to the root element for testing.
- Use `prevProps` / `nextProps` to attach `data-test-id` or custom `aria-label` to nav buttons.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.
- When `total` is `0` or `totalPages` is `0`, the displayed page number is `0` to avoid misleading "1 of 0" output.

<!-- SOURCE-API-END -->
