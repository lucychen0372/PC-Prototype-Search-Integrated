# WidgetTable

## Figma

- **Library name:** Widget Table (page: N/A, frame: Widget Table)

## React

Import: `import { WidgetTable } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import { WidgetTable } from '@nutanix-ui/prism-reactjs'
```

### Overview

`WidgetTable` is a borderless, header-hidden variant of `Table` designed for compact widget-like layouts (e.g. dashboard property panels). It forwards all `TableProps` to the underlying `Table` with `border={false}` hardcoded and `hideHeader` defaulting to `true`.

> **Advanced features** (infinite scroll, drag-and-drop, row selection, sorting, pagination, editable cells) are available via the shared `TableProps` but are rare in widget usage. See the `Table` component for those features.

---

### Own Props

These are the props added (or defaulted differently) by `WidgetTable` on top of `TableProps`:

| Prop         | Type                     | Default | Required | Description                                                                                                                               |
| ------------ | ------------------------ | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `hideHeader` | `boolean \| 'no-header'` | `true`  | No       | Shorthand to control column-header visibility without nesting inside `structure`. When set, takes precedence over `structure.hideHeader`. |

`border` is always `false` and cannot be overridden.

---

### Inherited Props (`TableProps`)

`WidgetTable` accepts all props from `TableProps`. The most relevant ones for widget usage are:

| Prop                    | Type                                                | Default | Required | Description                                                                                                  |
| ----------------------- | --------------------------------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `columns`               | `TableColumn[]`                                     | —       | **Yes**  | Column definitions.                                                                                          |
| `dataSource`            | `Record<string, any>[]`                             | —       | **Yes**  | Row data array.                                                                                              |
| `rowKey`                | `string`                                            | —       | No       | Property name in each row object used as the unique row key.                                                 |
| `columnKey`             | `'key' \| string`                                   | `'key'` | No       | Property name in each column object used as the column identifier.                                           |
| `className`             | `string`                                            | —       | No       | Additional CSS class applied to the root element.                                                            |
| `background`            | `'base' \| 'alt'`                                   | —       | No       | Surface context for the table. Use `'base'` inside a widget body.                                            |
| `structure`             | `TableStructure`                                    | —       | No       | Object controlling layout features (scroll height, column resize, header, row headers, pagination position). |
| `customProps`           | `TableCustomProps`                                  | —       | No       | Per-element prop callbacks for `cellProps`, `headerProps`, and `rowProps`.                                   |
| `customMessages`        | `TableCustomMessages`                               | —       | No       | Override the loading, loading-error, and no-data messages.                                                   |
| `customHeader`          | `React.ReactNode`                                   | —       | No       | Custom content rendered above the column header row.                                                         |
| `customFooter`          | `React.ReactNode`                                   | —       | No       | Custom content rendered below the last data row.                                                             |
| `loading`               | `boolean \| 'inline'`                               | —       | No       | Show the loading state. `'inline'` renders it as a table row.                                                |
| `loadingError`          | `boolean`                                           | —       | No       | Show the loading-error state.                                                                                |
| `wrapperProps`          | `React.HTMLProps<HTMLDivElement>`                   | —       | No       | Props forwarded to the outermost wrapper `<div>`, including `data-test-id`.                                  |
| `tableBodyWrapperProps` | `React.HTMLProps<HTMLDivElement>`                   | —       | No       | Props forwarded to the table body wrapper `<div>`.                                                           |
| `showCustomScrollbar`   | `boolean`                                           | —       | No       | Show a custom-styled scrollbar on the table body.                                                            |
| `topSection`            | `TableTopSection`                                   | —       | No       | Title and auxiliary content rendered above the table.                                                        |
| `onFocus`               | `(event: React.FocusEvent<HTMLDivElement>) => void` | —       | No       | Focus handler on the outer wrapper.                                                                          |
| `onScroll`              | `(event, scrollContext?) => 0`                      | —       | No       | Scroll callback for the table body.                                                                          |
| `aria-label`            | `string`                                            | —       | No       | Accessible name for the table (native HTML attribute).                                                       |
| `aria-labelledby`       | `string`                                            | —       | No       | ID of an external element that labels the table.                                                             |
| `aria-describedby`      | `string`                                            | —       | No       | ID of an external element that describes the table.                                                          |

#### `TableColumn` shape

| Field       | Type                                               | Description                                                                                                           |
| ----------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `key`       | `string`                                           | Column identifier (matches property name in row data by default).                                                     |
| `title`     | `React.ReactNode`                                  | Column header label.                                                                                                  |
| `render`    | `(cellData, rowData, rowIndex) => React.ReactNode` | Custom cell renderer.                                                                                                 |
| `textAlign` | `'left' \| 'right' \| 'center'`                    | Cell text alignment.                                                                                                  |
| `fixed`     | `boolean`                                          | Pin column horizontally.                                                                                              |
| `rowHeader` | `boolean`                                          | Render every cell in this column as a `<th>` instead of `<td>`. Use for property-name columns to help screen readers. |
| `group`     | `TableColumn[]`                                    | Nested columns rendered under a grouped header.                                                                       |
| `className` | `string`                                           | Class added to each cell in this column.                                                                              |

#### `TableStructure` shape (relevant fields)

| Field                | Type                                  | Description                                                                                                                       |
| -------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `hideHeader`         | `boolean \| 'no-header'`              | `true` = visually hidden but in DOM; `false` = visible; `'no-header'` = not rendered at all. WidgetTable defaults this to `true`. |
| `stylizeRowHeaders`  | `boolean`                             | Apply header styling to row-header cells (columns with `rowHeader: true`).                                                        |
| `bodyMaxHeight`      | `string`                              | Max height of the table body; enables scrolling with a sticky column header.                                                      |
| `bodyMaxWidth`       | `string`                              | Max width of the table body (any CSS unit).                                                                                       |
| `columnResize`       | `boolean \| Record<string, any>`      | Enable column resizing (requires `onChangeStructure`).                                                                            |
| `overflowColumns`    | `boolean`                             | Allow resized columns to overflow the table width.                                                                                |
| `columnWidths`       | `Record<string, any>`                 | Initial column width map `{ [columnKey]: width }`.                                                                                |
| `columnMinWidths`    | `Record<string, any>`                 | Min-width map per column (default 80 px).                                                                                         |
| `columnMaxWidths`    | `Record<string, any>`                 | Max-width map per column (default 400 px).                                                                                        |
| `paginationPosition` | `{ top?: boolean, bottom?: boolean }` | Where to render pagination relative to the table.                                                                                 |

#### `TableCustomProps` shape

| Field         | Type                                                                   | Description                                |
| ------------- | ---------------------------------------------------------------------- | ------------------------------------------ |
| `cellProps`   | `(column, rowData, rowIndex) => React.HTMLProps<HTMLTableCellElement>` | Extra props for each `<td>`.               |
| `headerProps` | `(column) => React.HTMLProps<HTMLTableHeaderCellElement>`              | Extra props for each `<th>` in the header. |
| `rowProps`    | `(rowData, rowIndex) => React.HTMLProps<HTMLTableRowElement>`          | Extra props for each `<tr>`.               |

#### `TableCustomMessages` shape

| Field                  | Type              | Description                                        |
| ---------------------- | ----------------- | -------------------------------------------------- |
| `loadingError`         | `React.ReactNode` | Custom loading-error content.                      |
| `noData`               | `React.ReactNode` | Custom empty-state content.                        |
| `loadingMessage`       | `React.ReactNode` | Custom loading content.                            |
| `loadingDoneSRMessage` | `string`          | Screen-reader announcement when loading completes. |

---

### `hideHeader` Behaviour

| Value            | DOM result                                                                      | Screen-reader impact                                |
| ---------------- | ------------------------------------------------------------------------------- | --------------------------------------------------- |
| `true` (default) | `<thead>` rendered with `visually-hidden-header` class and `aria-hidden="true"` | Column headers are hidden from assistive technology |
| `false`          | `<thead>` rendered normally, no `aria-hidden`                                   | Column headers are visible and announced            |
| `'no-header'`    | `<thead>` present but empty (no `<tr>` or `<th>` rendered)                      | No column headers in accessibility tree             |

**Precedence rule:** The top-level `hideHeader` prop wins over `structure.hideHeader`. If neither is provided, the default is `true`.

---

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Accessibility Guidelines

```tsx
import {
  Alert,
  AlertLayout,
  Link,
  Paragraph,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'
;<StackingLayout style={{ maxWidth: 800 }}>
  <Paragraph>
    Tables should generally have visual and programmatic headers that describe
    the purpose of the row or column. Header cells should never be empty and
    should usually contain visible text.
  </Paragraph>
  <Paragraph>
    By default, the WidgetTable does not include visual headers, which may
    impact accessibility. Consider using a
    <Link
      href="#!/Components/Table/Table/row-headers"
      type={Link.LINK_TYPE.INLINE}
    >
      table with row headers
    </Link>{' '}
    instead.
  </Paragraph>
</StackingLayout>
```

> `WidgetTable` is a headerless, borderless, minimal version of `Table`, designed for compact widget-like interfaces. For advanced features such as infinite scroll, drag-and-drop, and others, use the `Table` component directly.

#### Default

```tsx
import { WidgetTable } from '@nutanix-ui/prism-reactjs'

const columns = [
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Age',
    key: 'age',
  },
  {
    title: 'Address',
    key: 'address',
  },
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
]

;<WidgetTable
  rowKey="key"
  dataSource={data}
  columns={columns}
  aria-label="Demo table"
/>
```

#### With external title and description

When the page has surrounding text that labels or describes the table, use `aria-labelledby` / `aria-describedby` to associate them.

```tsx
import {
  Paragraph,
  StackingLayout,
  Title,
  WidgetTable,
} from '@nutanix-ui/prism-reactjs'

const columns = [
  /* same as above */
]
const data = [
  /* same as above */
]

;<StackingLayout>
  <Title id="widget-table-title" size="h2">
    Widget Table
  </Title>
  <WidgetTable
    rowKey="key"
    dataSource={data}
    columns={columns}
    aria-labelledby="widget-table-title"
    aria-describedby="widget-table-desc"
  />
  <Paragraph id="widget-table-desc">This table is just an example</Paragraph>
</StackingLayout>
```

#### With visible column headers

Pass `hideHeader={false}` to show the column header row.

```tsx
import { WidgetTable } from '@nutanix-ui/prism-reactjs'

const columns = [
  /* same as above */
]
const data = [
  /* same as above */
]

;<WidgetTable
  rowKey="key"
  dataSource={data}
  columns={columns}
  aria-label="Widget table with header"
  hideHeader={false}
/>
```

#### With row headers (recommended for property panels)

Use `rowHeader: true` on the label column and `structure={{ stylizeRowHeaders: true }}` so screen readers announce the property name with every value cell.

```tsx
import {
  Alert,
  AlertLayout,
  Paragraph,
  StackingLayout,
  WidgetTable,
} from '@nutanix-ui/prism-reactjs'

const columns = [
  {
    title: 'Property',
    key: 'label',
    rowHeader: true,
  },
  {
    title: 'Value',
    key: 'value',
  },
]

const data = [
  { key: 'cluster_type', label: 'Cluster Type', value: 'Hyperconverged' },
  { key: 'health', label: 'Health', value: 'Critical' },
  { key: 'vm_count', label: 'VM Count', value: '4' },
  { key: 'host_count', label: 'Host Count', value: '1' },
]

;<StackingLayout>
  <Alert
    inline={true}
    message={
      <AlertLayout type={AlertLayout.AlertLayoutTypes.INLINE}>
        <Paragraph>
          Use row headers for label/value widgets so assistive technologies
          announce the property name with every value cell.
        </Paragraph>
      </AlertLayout>
    }
    type={Alert.AlertTypes.INFO}
    showCloseIcon={false}
  />
  <WidgetTable
    aria-label="Cluster properties widget"
    rowKey="key"
    dataSource={data}
    columns={columns}
    structure={{ stylizeRowHeaders: true }}
    wrapperProps={{ 'data-test-id': 'widget-table-row-headers' }}
  />
</StackingLayout>
```

#### Inside a scrollable dashboard widget

Use `background="base"` and `customProps` to align value cells, and wrap in `DashboardWidgetLayout` for the widget chrome.

```tsx
import {
  ContainerLayout,
  DashboardWidgetHeader,
  DashboardWidgetLayout,
  WidgetTable,
} from '@nutanix-ui/prism-reactjs'

const columns = [
  { title: 'Property', key: 'label', rowHeader: true },
  { title: 'Value', key: 'value' },
]

const data = [
  { key: 'cluster_type', label: 'Cluster Type', value: 'Hyperconverged' },
  { key: 'health', label: 'Health', value: 'Critical' },
  { key: 'storage_usage', label: 'Storage Usage', value: '284.32 GiB' },
  { key: 'vm_count', label: 'VM Count', value: '4' },
]

const bodyContent = (
  <WidgetTable
    background="base"
    dataSource={data}
    columns={columns}
    structure={{ stylizeRowHeaders: true }}
    customProps={{
      rowProps: (row) => ({ 'data-test': `cluster_props_row_${row.key}` }),
      cellProps: (column) => ({
        style: {
          ...(column.key === 'value' && { textAlign: 'left' }),
        },
      }),
    }}
  />
)

;<ContainerLayout
  backgroundColor="white"
  data-test-id="cluster-properties-widget"
  style={{ width: 400, height: 320, overflow: 'hidden' }}
>
  <DashboardWidgetLayout
    header={
      <DashboardWidgetHeader title="Cluster Properties" showCloseIcon={false} />
    }
    bodyContent={bodyContent}
  />
</ContainerLayout>
```

---

### Accessibility

- **Always provide an accessible name.** Use `aria-label` for a self-contained label, or `aria-labelledby` pointing to an existing heading when one is visible on the page.
- **Always use `aria-describedby`** when supplementary description text exists in the page.
- **Column headers are hidden by default** (`hideHeader={true}`). Hidden headers are still rendered in the DOM but marked `aria-hidden="true"` and visually hidden, so screen readers do not announce them. This is intentional for widget tables where column structure is implied.
- **Row headers** (`rowHeader: true` on a column) convert data cells in that column to `<th scope="row">` elements. This is strongly recommended for label/value property panels because screen readers will announce the label for each value cell.
- `'no-header'` removes the `<thead>` content entirely. Use only when there are no meaningful column semantics and row headers are present to provide context.
- Header cells should never be empty; even when visually hidden the `title` field on each column helps screen readers.

### Usage Notes

- Prefer documented enum/static values such as `WidgetTable.<EnumName>.<VALUE>` over raw strings when the component exposes them.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.
- `WidgetTable` is a thin wrapper — for advanced table features (sorting, selection, pagination, infinite scroll, editable rows, drag-and-drop), use the `Table` component directly.
- The `hideHeader` top-level shorthand is equivalent to passing `structure={{ hideHeader: ... }}`; both can be used, but the top-level prop takes precedence.
- When passing `structure` for other purposes (e.g. `stylizeRowHeaders`), the default `hideHeader=true` is still applied unless you explicitly override it in `structure.hideHeader` or via the top-level `hideHeader` prop.

<!-- SOURCE-API-END -->
