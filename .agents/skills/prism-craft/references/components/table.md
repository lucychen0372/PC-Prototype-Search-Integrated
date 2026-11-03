# Table

## Figma

- **Library name:** Table Column (page: N/A, frame: Table Column)
- **Also matches:** Table Cell, Table Controls, Column Header, Table Empty State, Table

## React

Import: `import { Table, LocalTable, WidgetTable } from '@nutanix-ui/prism-reactjs'`

### Table Cell Composition

In Figma, "Table Cell" is a single component. In React, cell content is rendered via `column.render(cellData, rowData, rowIndex)` and composed inline using JSX helpers like `FlexLayout`.

> **Note:** `TableCellLayout` is **not** exported from `@nutanix-ui/prism-reactjs`. Use `FlexLayout` with `alignItems="center"` and `itemSpacing` for icon+text or text+badge cells instead.

**Figma Cell Content -> React mapping:**

| Figma Cell Content          | React Implementation                                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Plain text                  | No `render` needed (uses `key`/`columnKey` automatically)                                                           |
| Text + Badge                | `render: (val) => <FlexLayout alignItems="center" itemSpacing="10px"><span>{val}</span><Badge .../></FlexLayout>`   |
| Icon + Text                 | `render: (val) => <FlexLayout alignItems="center" itemSpacing="10px"><StatusIcon /><span>{val}</span></FlexLayout>` |
| Actions column (3-dot menu) | Use `rowAction` prop on Table (not a custom render)                                                                 |
| Editable text cell          | Use `editDirect.columnConfigs` with `type: Table.CELL_EDIT_TYPES.INPUT`                                             |
| Editable select cell        | Use `editDirect.columnConfigs` with `type: Table.CELL_EDIT_TYPES.SELECT`                                            |
| Cell with error/warning     | Use `cellAlerts` prop: `{ row, column, type: Table.TABLE_ALERT.ERROR, message }`                                    |

**Editable cells (editDirect):**

```tsx
<Table
  dataSource={data}
  columns={columns}
  rowKey="id"
  editDirect={{
    columnConfigs: {
      name: {
        type: Table.CELL_EDIT_TYPES.INPUT,
        inputProps: (cellData) => ({ placeholder: 'Enter name' }),
        validations: { required: true, message: 'Name is required' },
      },
      status: {
        type: Table.CELL_EDIT_TYPES.SELECT,
        selectProps: (cellData) => ({
          rowsData: [
            { key: 'active', label: 'Active' },
            { key: 'inactive', label: 'Inactive' },
          ],
        }),
      },
    },
  }}
  onBlurEditDirectData={(ds, alerts) => {
    setData(ds)
    setCellAlerts(alerts)
  }}
/>
```

**Cell alerts:**

```tsx
<Table
  dataSource={data}
  columns={columns}
  rowKey="id"
  cellAlerts={[
    {
      row: 'row-1',
      column: 'email',
      type: Table.TABLE_ALERT.ERROR,
      message: 'Invalid email',
    },
    {
      row: 'row-2',
      column: 'name',
      type: Table.TABLE_ALERT.WARNING,
      message: 'Name too short',
    },
  ]}
/>
```

**Row actions (3-dot menu in Figma):**

```tsx
<Table
  dataSource={data}
  columns={columns}
  rowKey="id"
  rowAction={{
    actions: [
      { key: 'edit', value: 'Edit' },
      { key: 'clone', value: 'Clone' },
      { key: 'delete', value: 'Delete' },
    ],
    onRowAction: (key, rowData, rowIndex) => handleAction(key, rowData),
  }}
/>
```

### TSX Examples

```tsx
{/* Basic table with selection */}
const columns = [
  { key: 'name', title: 'Name' },
  { key: 'status', title: 'Status',
    render: (val) => (
      <Badge color={val === 'active' ? Badge.BadgeColorTypes.GREEN : Badge.BadgeColorTypes.GRAY}>
        {val}
      </Badge>
    )
  },
  { key: 'created', title: 'Created' },
]

<Table
  dataSource={endpoints}
  columns={columns}
  rowKey="id"
  aria-label="Endpoints table"
  sort={{ sortable: ['name', 'created'] }}
  rowSelection={{
    selected: selectedRowKeys,
    checkboxProps: (rowData) => ({ 'aria-label': `Select ${rowData.name}` }),
    onChange: (keys) => setSelectedRowKeys(keys),
  }}
/>

{/* Table with loading and error states */}
<Table
  dataSource={data}
  columns={columns}
  rowKey="id"
  loading={isLoading ? Table.LOADING_TYPE.INLINE : false}
  loadingError={hasError}
  customMessages={{
    loadingError: "Failed to load endpoints. Please try again.",
    noData: "No endpoints found.",
  }}
/>

{/* Table with pagination */}
<Table
  dataSource={data}
  columns={columns}
  rowKey="id"
  pagination={{
    total: totalCount,
    pageSize: 25,
    currentPage: page,
    onChange: (p, size) => { setPage(p); setPageSize(size); },
    pageSizeOptions: [10, 25, 50],
  }}
/>

{/* LocalTable for client-side data */}
<LocalTable
  dataSource={smallDataset}
  columns={columns}
  rowKey="id"
  sort={{ sortable: ['name'] }}
  sorters={{ name: (a, b) => a.name.localeCompare(b.name) }}
/>

{/* Expandable rows */}
<Table
  dataSource={data}
  columns={columns}
  rowKey="id"
  rowExpand={{
    render: (row) => (
      <StackingLayout padding="10px" itemGap="S">
        <Paragraph>{row.details}</Paragraph>
      </StackingLayout>
    ),
  }}
/>
```

### Anti-patterns

- **Always set `rowKey`** -- omitting it causes performance issues (default is `'key'`)
- Don't use `<table>` HTML -- use `Table`
- Don't recreate `columns` on every render -- define outside component or `useMemo`
- Use `LocalTable` for client-side datasets, `Table` for server-paginated data
- Don't build custom loading/error/empty states -- use `loading`, `loadingError`, `customMessages`
- Don't use `customMessages.empty` -- the correct prop key is `customMessages.noData`
- `TableCellLayout` is not exported from `@nutanix-ui/prism-reactjs` -- use `FlexLayout` instead

<!-- SOURCE-API-START -->

### Import

```tsx
import { Table, LocalTable, WidgetTable } from '@nutanix-ui/prism-reactjs'
```

### Enums / Constants

#### `Table.LOADING_TYPE`

- `INLINE` = `'inline'`

Usage: `loading={Table.LOADING_TYPE.INLINE}` renders the loader as a table row instead of overlaying the whole table.

#### `Table.TABLE_ALERT` (`TableCellAlertType`)

- `ERROR` = `'error'`
- `WARNING` = `'warning'`

#### `Table.CELL_EDIT_TYPES` (`TableCellEditType`)

- `INPUT_TEXT` = `'inputText'`
- `INPUT` = `'input'`
- `SELECT` = `'select'`

#### `Table.ROW_SELECTION_TYPES` (`TableRowSelectionTypes`)

- `CHECKBOX` = `'checkbox'`
- `RADIO` = `'radio'`

#### `TableHeaderContentAlignmentTypes`

- `AUTO` = `'auto'`
- `START` = `'start'`
- `CENTER` = `'center'`
- `END` = `'end'`

#### Static column-width constants (read-only px numbers)

| Constant                         | Description                                       |
| -------------------------------- | ------------------------------------------------- |
| `Table.SELECTION_COLUMN_WIDTH`   | Width of the checkbox/radio selection column      |
| `Table.DRAG_HANDLE_COLUMN_WIDTH` | Width of the drag-handle column (reorderableRows) |
| `Table.ROW_ACTION_COLUMN_WIDTH`  | Width of the row-action (3-dot) column            |
| `Table.ROW_EXPAND_COLUMN_WIDTH`  | Width of the row-expand toggle column             |

### Default Props

| Prop                       | Default |
| -------------------------- | ------- |
| `border`                   | `true`  |
| `columnKey`                | `'key'` |
| `loading`                  | `false` |
| `rowKey`                   | `'key'` |
| `showCustomScrollbar`      | `false` |
| `updateColumnsMapThrottle` | `100`   |

### Props Interfaces

#### `TableScrollProps`

| Prop    | Type     | Description           |
| ------- | -------- | --------------------- |
| `left`  | `number` | Left scroll distance  |
| `right` | `number` | Right scroll distance |

#### `TableCellAlertConfig`

| Prop           | Type                 | Required | Description                                                               |
| -------------- | -------------------- | -------- | ------------------------------------------------------------------------- |
| `row`          | `string`             | No       | Row key of the cell to alert                                              |
| `column`       | `string`             | No       | Column key of the cell to alert                                           |
| `type`         | `TableCellAlertType` | No       | Alert type — use `Table.TABLE_ALERT.ERROR` or `Table.TABLE_ALERT.WARNING` |
| `tooltipProps` | `ToolTipProps`       | No       | Props forwarded to the Tooltip component                                  |
| `message`      | `string`             | No       | Alert message text                                                        |

#### `TableColumn`

| Prop            | Type                                               | Required | Description                                                                               |
| --------------- | -------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------- |
| `key`           | `string`                                           | No       | Column key — must match a property in `dataSource` rows (unless `columnKey` overrides it) |
| `title`         | `React.ReactNode`                                  | No       | Column header content                                                                     |
| `className`     | `string`                                           | No       | Extra CSS class on the column                                                             |
| `fixed`         | `boolean`                                          | No       | Fixes the column in place during horizontal scroll                                        |
| `textAlign`     | `'left' \| 'right' \| 'center'`                    | No       | Text alignment of the column cells                                                        |
| `render`        | `(cellData, rowData, rowIndex) => React.ReactNode` | No       | Custom cell renderer                                                                      |
| `group`         | `TableColumn[]`                                    | No       | Nested columns grouped under this header                                                  |
| `rowHeader`     | `boolean`                                          | No       | Renders each cell as a `<th>` row header (accessibility)                                  |
| `headerProps`   | `Record<string, any>`                              | No       | **@deprecated**                                                                           |
| `[key: string]` | `unknown`                                          | No       | Additional arbitrary keys are allowed                                                     |

#### `TableCustomMessages`

| Prop                   | Type              | Description                                       |
| ---------------------- | ----------------- | ------------------------------------------------- |
| `loadingError`         | `React.ReactNode` | Content shown when `loadingError={true}`          |
| `noData`               | `React.ReactNode` | Content shown when `dataSource` is empty          |
| `loadingMessage`       | `React.ReactNode` | Content shown when `loading` is truthy            |
| `loadingDoneSRMessage` | `string`          | Screen-reader announcement when loading completes |

#### `TableCustomProps`

| Prop          | Type                                                                               | Description                 |
| ------------- | ---------------------------------------------------------------------------------- | --------------------------- |
| `cellProps`   | `(column, rowData, rowIndex) => DataWrapperProps<HTMLProps<HTMLTableCellElement>>` | Extra props for each `<td>` |
| `headerProps` | `(column) => HTMLProps<HTMLTableHeaderCellElement>`                                | Extra props for each `<th>` |
| `rowProps`    | `(rowData, rowIndex) => DataWrapperProps<HTMLProps<HTMLTableRowElement>>`          | Extra props for each `<tr>` |

#### `TableEditColumnConfig`

| Prop          | Type                                                       | Description                                       |
| ------------- | ---------------------------------------------------------- | ------------------------------------------------- |
| `type`        | `TableCellEditType`                                        | Edit type — use `Table.CELL_EDIT_TYPES` constants |
| `inputProps`  | `(cellData, rowData, rowIndex) => InputProps`              | Props forwarded to the `Input` component          |
| `selectProps` | `(cellData, rowData, rowIndex, inputValue) => SelectProps` | Props forwarded to the `Select` component         |
| `render`      | `(cellData, rowData, rowIndex) => JSX.Element`             | Optional custom render for non-editable state     |
| `validations` | `Record<any, any>[] \| Record<any, any>`                   | Validation rules and messages                     |

#### `TableEditColumnConfigs`

```ts
interface TableEditColumnConfigs {
  [columnKey: string]: TableEditColumnConfig
}
```

#### `TableFixedProps` (internal)

| Prop           | Type               | Description                               |
| -------------- | ------------------ | ----------------------------------------- |
| `colSizeMap`   | `any[]`            | Tracked column sizes for fixed cells      |
| `colSizeProps` | `Record<any, any>` | Tracked column size props for fixed cells |
| `colRefList`   | `any[]`            | Tracked column refs for fixed cells       |

#### `TableRowAlertConfig`

| Prop           | Type                 | Description                                    |
| -------------- | -------------------- | ---------------------------------------------- |
| `row`          | `string`             | Row key to alert                               |
| `type`         | `TableCellAlertType` | Alert type — use `Table.TABLE_ALERT` constants |
| `tooltipProps` | `ToolTipProps`       | Props forwarded to the Tooltip                 |
| `message`      | `string`             | Alert message text                             |

#### `TableRowExpand`

| Prop                   | Type                                          | Description                                                        |
| ---------------------- | --------------------------------------------- | ------------------------------------------------------------------ |
| `render`               | `(rowData, rowIndex) => React.ReactNode`      | Renderer for the expanded row content                              |
| `rows`                 | `string[]`                                    | Keys of currently expanded rows                                    |
| `isNestedTable`        | `boolean \| ((rowData, rowIndex) => boolean)` | When `true` applies nested-table styling                           |
| `rowExpandButtonProps` | `(expand: boolean, rowData) => ButtonProps`   | Props for the expand toggle button                                 |
| `treeStyle`            | `boolean`                                     | Renders expand toggle inside the first column (tree-style nesting) |

#### `TableRowSelection`

| Prop                     | Type                                                      | Description                                                       |
| ------------------------ | --------------------------------------------------------- | ----------------------------------------------------------------- |
| `selected`               | `string[]`                                                | Keys of selected rows                                             |
| `disabled`               | `string[]`                                                | Keys of disabled (non-selectable) rows                            |
| `unselected`             | `string[]`                                                | Keys of explicitly unselected rows (for select-all mode)          |
| `isSelectAllMode`        | `boolean`                                                 | Maintains sticky "select all" state                               |
| `type`                   | `TableRowSelectionTypes`                                  | `CHECKBOX` (default) or `RADIO` — use `Table.ROW_SELECTION_TYPES` |
| `checkboxProps`          | `CheckboxProps \| ((rowData, rowIndex) => CheckboxProps)` | Props forwarded to each row checkbox                              |
| `radioProps`             | `RadioProps \| ((rowData, rowIndex) => RadioProps)`       | Props forwarded to each row radio                                 |
| `selectAllCheckboxProps` | `CheckboxProps`                                           | Props for the select-all header checkbox                          |
| `tooltipProps`           | `(rowData, rowIndex) => Omit<ToolTipProps, 'children'>`   | Tooltip for individual row checkboxes                             |
| `selectAllTooltipProps`  | `Omit<ToolTipProps, 'children'>`                          | Tooltip for the select-all checkbox                               |

#### `InfiniteScroll`

| Prop                    | Type                                                      | Description                                                               |
| ----------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------- |
| `infiniteScrollProps`   | `InfiniteScrollProps`                                     | Props forwarded to the `InfiniteScroll` component                         |
| `scrollOffsetIndicator` | `boolean \| ((firstItem, lastItem, tailIndex) => string)` | Shows current scroll position; takes precedence over pagination indicator |

#### `TableSort`

| Prop                 | Type                          | Description                                                  |
| -------------------- | ----------------------------- | ------------------------------------------------------------ |
| `order`              | `SorterOrder`                 | Current sort order — use `Sorter.SORT_ORDER_CONST` constants |
| `column`             | `string`                      | Currently sorted column key                                  |
| `sortable`           | `string[]`                    | Column keys that should show sort controls                   |
| `type`               | `SorterTypes`                 | Sorter visual type — see Sorter component                    |
| `columnsSorterProps` | `Record<string, SorterProps>` | Per-column props forwarded to the Sorter component           |

#### `TableRowActionItem`

| Prop            | Type               | Description                                       |
| --------------- | ------------------ | ------------------------------------------------- |
| `key`           | `string \| number` | Unique action key passed to `onRowAction`         |
| `value`         | `string`           | Display label                                     |
| `disabled`      | `boolean`          | Disables the menu item                            |
| `menuItemProps` | `MenuItemProps`    | Extra props forwarded to the `MenuItem` component |

#### `TableRowAction`

| Prop                | Type                                                                                                                                               | Description                                                                                 |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `actions`           | `TableRowActionItem[] \| ((rowData, rowIndex) => TableRowActionItem[] \| null \| undefined \| { disabled: boolean, tooltipProps?: ToolTipProps })` | Static action list or function returning actions per row; return falsy to hide the dropdown |
| `renderRowAction`   | `(rowData, rowIndex) => React.ReactNode`                                                                                                           | Custom renderer for the row action slot                                                     |
| `onRowAction`       | `(key, rowData, rowIndex) => void`                                                                                                                 | Callback when an action is selected                                                         |
| `getPopupContainer` | `() => HTMLElement`                                                                                                                                | DOM container for the action dropdown overlay (required inside scrollable containers)       |

#### `TableRowRightClick`

| Prop                 | Type                                                        | Description                          |
| -------------------- | ----------------------------------------------------------- | ------------------------------------ |
| `render`             | `(rowData, rowIndex, closeMenu: () => void) => JSX.Element` | Renders the right-click context menu |
| `popupProviderProps` | `PopupProviderProps`                                        | Props forwarded to `PopupProvider`   |

#### `TableSearch`

| Prop         | Type         | Required | Description                                     |
| ------------ | ------------ | -------- | ----------------------------------------------- |
| `inputProps` | `InputProps` | Yes      | Props forwarded to the search `Input` component |

#### `TableStructure`

| Prop                 | Type                                  | Description                                                                                                        |
| -------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `bodyMaxHeight`      | `string`                              | Max height of the table body; triggers sticky header + scrollable body                                             |
| `bodyMaxWidth`       | `string`                              | Max width of the table body (any CSS unit)                                                                         |
| `columnResize`       | `boolean \| Record<string, any>`      | `true` enables all columns; or an object `{ columnKey: true }` for specific columns. Requires `onChangeStructure`. |
| `overflowColumns`    | `boolean`                             | Allows column resize to exceed the table width                                                                     |
| `columnWidths`       | `Record<string, any>`                 | Map of `{ columnKey: width }`                                                                                      |
| `columnMinWidths`    | `Record<string, any>`                 | Map of `{ columnKey: minWidth }` (default `80px`)                                                                  |
| `columnMaxWidths`    | `Record<string, any>`                 | Map of `{ columnKey: maxWidth }` (default `400px`)                                                                 |
| `hideHeader`         | `boolean \| 'no-header'`              | `false` (default) — visible; `true` — visually hidden but in DOM; `'no-header'` — not rendered at all              |
| `stylizeRowHeaders`  | `boolean`                             | Renders row-header cells with header styling                                                                       |
| `paginationPosition` | `{ top?: boolean, bottom?: boolean }` | Where to render pagination relative to the table                                                                   |
| `showLinks`          | `boolean`                             | **@deprecated** since v2.39.0 — no styling effect                                                                  |

#### `TableTopSection`

| Prop           | Type                           | Description                                                                                                   |
| -------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `title`        | `React.ReactNode`              | Title displayed above the table                                                                               |
| `titleProps`   | `Omit<TitleProps, 'children'>` | Props forwarded to the `Title` component (string/number `title` only)                                         |
| `leftContent`  | `React.ReactNode`              | Content left of the top section (appears right of `title` if present)                                         |
| `rightContent` | `React.ReactNode`              | Content right of the top section (appears left of pagination if present)                                      |
| `appearance`   | `'classic' \| 'modern'`        | `'classic'` (default): title above table border; `'modern'`: nested inside the table, wraps on narrow layouts |

#### `TableEditRow`

| Prop            | Type                     | Description                           |
| --------------- | ------------------------ | ------------------------------------- |
| `columnConfigs` | `TableEditColumnConfigs` | Per-column edit configuration         |
| `row`           | `string`                 | Key of the row currently being edited |
| `overflow`      | `boolean`                | Forces overflow mode                  |

#### `TableEventHandlers` (internal — passed via context, not set directly)

| Handler                    | Signature                                               |
| -------------------------- | ------------------------------------------------------- |
| `handleColumnResize`       | `(structure: TableStructure) => void`                   |
| `handlePageChange`         | `(nextPage: number, pageSize: number) => void`          |
| `handleEditDataChange`     | `(value, rowData, column, eventType, onCancel) => void` |
| `handleEditRowCancelClick` | `() => void`                                            |
| `handleEditRowSubmitClick` | `() => void`                                            |
| `handleRefreshData`        | `() => void`                                            |
| `handleReorderRows`        | `(dataSource) => void`                                  |
| `handleRowExpandChange`    | `(rowKeyVal: string) => void`                           |
| `handleRowSelectAll`       | `(rowKeys, selectAll) => void`                          |
| `handleRowSelectOne`       | `(rowKeyVal: string) => void`                           |
| `handleRowSelect`          | `(e, rowKeyVal, rowIndex) => void`                      |
| `handleRowUnselectAll`     | `(rowKeys, selectAll) => void`                          |
| `handleRowUnselect`        | `(e, rowKeyVal, rowIndex) => void`                      |
| `handleSortOrderChange`    | `(order, column) => void`                               |
| `handleSearchInputChange`  | `(event?) => void`                                      |
| `handleSearchClearClick`   | `(event?) => void`                                      |

#### `TableProps`

| Prop                       | Type                                                 | Required | Default | Description                                                                               |
| -------------------------- | ---------------------------------------------------- | -------- | ------- | ----------------------------------------------------------------------------------------- |
| `columns`                  | `TableColumn[]`                                      | **Yes**  | —       | Column definitions                                                                        |
| `dataSource`               | `Record<string, any>[]`                              | **Yes**  | —       | Row data array                                                                            |
| `rowKey`                   | `string`                                             | No       | `'key'` | Property name used as unique row identifier                                               |
| `columnKey`                | `'key' \| string`                                    | No       | `'key'` | Property in each column object used as the column identifier                              |
| `border`                   | `boolean`                                            | No       | `true`  | Show/hide outer table border                                                              |
| `background`               | `BackgroundTypeWithoutBody`                          | No       | —       | Background context for the table (`'base'` \| `'alt'`)                                    |
| `cellAlerts`               | `TableCellAlertConfig[]`                             | No       | —       | Per-cell error/warning indicators                                                         |
| `className`                | `string`                                             | No       | —       | Extra CSS class                                                                           |
| `customFooter`             | `React.ReactNode`                                    | No       | —       | Custom content rendered below the last row                                                |
| `customHeader`             | `React.ReactNode`                                    | No       | —       | Custom content rendered above the column headers                                          |
| `customMessages`           | `TableCustomMessages`                                | No       | —       | Override loading/error/empty messages                                                     |
| `customProps`              | `TableCustomProps`                                   | No       | —       | Custom props for `<td>`, `<th>`, `<tr>` elements                                          |
| `editDirect`               | `{ columnConfigs?: TableEditColumnConfigs }`         | No       | —       | Enables inline cell editing; keyed by column key                                          |
| `editRow`                  | `TableEditRow`                                       | No       | —       | Enables row-level editing for one row at a time                                           |
| `headerContentAlignment`   | `TableHeaderContentAlignmentTypes`                   | No       | —       | Alignment of header cell content                                                          |
| `id`                       | `string`                                             | No       | —       | HTML `id` attribute on the table wrapper                                                  |
| `infiniteScroll`           | `InfiniteScroll`                                     | No       | —       | Infinite scroll configuration                                                             |
| `lastRow`                  | `boolean`                                            | No       | —       | Marks the last row (styling)                                                              |
| `loading`                  | `boolean \| 'inline'`                                | No       | `false` | `true` = overlay loader; `Table.LOADING_TYPE.INLINE` = loader row                         |
| `loadingError`             | `boolean`                                            | No       | —       | Shows the loading error state                                                             |
| `onBlurEditDirectData`     | `(dataSource, cellAlerts, rowData) => void`          | No       | —       | Fired on blur in `editDirect` mode                                                        |
| `onChangeEditDirectData`   | `(dataSource, cellAlerts, rowData) => void`          | No       | —       | Fired on change in `editDirect` mode                                                      |
| `onChangePagination`       | `(pagination, nextPage, pageSize) => void`           | No       | —       | Fired when pagination changes                                                             |
| `onChangeRowExpand`        | `(rowExpand, expanded, collapsed) => void`           | No       | —       | Fired when a row is expanded/collapsed                                                    |
| `onChangeRowSelection`     | `(rowSelection, selected, unselected) => void`       | No       | —       | Fired when row selection changes                                                          |
| `onChangeSort`             | `(sort, order, column) => void`                      | No       | —       | Fired when sort state changes                                                             |
| `onChangeStructure`        | `(structure) => void`                                | No       | —       | Fired when column resize changes structure; **required** when `columnResize` is enabled   |
| `onClickEditRowCancel`     | `(dataSource, editRow, cellAlerts) => void`          | No       | —       | Fired when edit-row cancel is clicked                                                     |
| `onClickEditRowSubmit`     | `(dataSource, editRow, cellAlerts, rowData) => void` | No       | —       | Fired when edit-row submit is clicked                                                     |
| `onColumnsOrderChange`     | `(columns) => void`                                  | No       | —       | Enables drag-and-drop column reordering (first-level columns only)                        |
| `onFocus`                  | `(event) => void`                                    | No       | —       | Fired when the table receives focus                                                       |
| `onRefreshData`            | `(state) => void`                                    | No       | —       | Fired when the user triggers a data refresh                                               |
| `onReorderRows`            | `(dataSource) => void`                               | No       | —       | Fired after rows are reordered via drag-and-drop                                          |
| `onScroll`                 | `(event, scrollContext?) => 0`                       | No       | —       | Fired on table scroll                                                                     |
| `pagination`               | `PaginationProps`                                    | No       | —       | Pagination configuration                                                                  |
| `reorderableRows`          | `boolean`                                            | No       | —       | Enables row drag-and-drop reordering. Incompatible with `infiniteScroll` and `rowExpand`. |
| `rowAction`                | `TableRowAction`                                     | No       | —       | 3-dot action menu per row                                                                 |
| `rowAlerts`                | `TableRowAlertConfig[]`                              | No       | —       | Per-row error/warning indicators                                                          |
| `rowExpand`                | `TableRowExpand`                                     | No       | —       | Expandable row configuration                                                              |
| `rowRightClick`            | `TableRowRightClick`                                 | No       | —       | Right-click context menu per row                                                          |
| `rowSelection`             | `TableRowSelection`                                  | No       | —       | Row checkbox/radio selection configuration                                                |
| `search`                   | `TableSearch`                                        | No       | —       | Adds a search input. Hidden when `structure.hideHeader` is truthy.                        |
| `showCustomScrollbar`      | `boolean`                                            | No       | `false` | Show a styled custom scrollbar                                                            |
| `sort`                     | `TableSort`                                          | No       | —       | Sort state and sortable column configuration                                              |
| `structure`                | `TableStructure`                                     | No       | —       | Layout/structural options (heights, widths, header visibility, resize)                    |
| `tableBodyWrapperProps`    | `DataWrapperProps<HTMLProps<HTMLDivElement>>`        | No       | —       | Props for the table body wrapper `<div>`                                                  |
| `testProps`                | `Record<any, any>`                                   | No       | —       | For test utilities only (`@ignore`)                                                       |
| `topSection`               | `TableTopSection`                                    | No       | —       | Title and toolbar above the table                                                         |
| `updateColumnsMapThrottle` | `number`                                             | No       | `100`   | Throttle ms for fixed-column map updates                                                  |
| `wrapperProps`             | `DataWrapperProps<HTMLProps<HTMLDivElement>>`        | No       | —       | Props for the outermost wrapper `<div>`                                                   |

### Exported Type Aliases

#### `TableRowData`

```ts
type TableRowData = Record<any, any>
```

#### `TableCellData`

```ts
type TableCellData = any
```

### Subcomponents

#### `LocalTable`

```tsx
import { LocalTable } from '@nutanix-ui/prism-reactjs'
```

A `Table` wrapper with built-in client-side pagination, sorting, and row selection state management. Use when **all data is available locally**. Accepts all `TableProps` plus:

| Prop      | Type                                         | Description                                                      |
| --------- | -------------------------------------------- | ---------------------------------------------------------------- |
| `sorters` | `Record<string, (a: any, b: any) => number>` | Map of column-key → comparator functions for client-side sorting |

`LocalTable` syncs internal state when `pagination`, `rowSelection`, and `sort` props change externally (via `useEffect`). Pass `sort.sortable` to declare which columns show sort controls; pass `sorters` with matching keys for the actual sort logic.

```tsx
<LocalTable
  columns={columns}
  dataSource={data}
  rowKey="key"
  aria-label="Table with sort and pagination"
  sort={{ sortable: ['name', 'age'] }}
  sorters={{
    name: (a, b) => a.name.localeCompare(b.name),
    age: (a, b) => a.age - b.age,
  }}
  pagination={{ total: data.length, currentPage: 1, pageSize: 10 }}
  rowSelection={{
    selected: [],
    checkboxProps: (rowData) => ({ 'aria-label': `Select ${rowData.name}` }),
  }}
/>
```

#### `WidgetTable`

```tsx
import { WidgetTable } from '@nutanix-ui/prism-reactjs'
```

A borderless, headerless `Table` variant for compact widgets. Sets `border={false}` and `structure.hideHeader={true}` by default. Accepts all `TableProps` plus a top-level convenience prop:

| Prop         | Type                     | Default | Description                        |
| ------------ | ------------------------ | ------- | ---------------------------------- |
| `hideHeader` | `boolean \| 'no-header'` | `true`  | Shortcut to `structure.hideHeader` |

> **Accessibility:** `WidgetTable` hides column headers by default. Use `rowHeader: true` on a label column together with `structure.stylizeRowHeaders` for key:value widgets, or pass `aria-label` / `aria-labelledby` on the table.

```tsx
{
  /* Default: no header, no border */
}
;<WidgetTable
  rowKey="key"
  dataSource={clusterProps}
  columns={columns}
  aria-label="Cluster properties"
/>

{
  /* With visible header */
}
;<WidgetTable
  rowKey="key"
  dataSource={data}
  columns={columns}
  aria-label="Widget with header"
  hideHeader={false}
/>

{
  /* Recommended label:value pattern */
}
const columns = [
  { key: 'label', title: 'Property', rowHeader: true },
  { key: 'value', title: 'Value' },
]

;<WidgetTable
  rowKey="key"
  dataSource={data}
  columns={columns}
  aria-label="Cluster properties widget"
  structure={{ stylizeRowHeaders: true }}
/>
```

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Accessibility Guidelines

```tsx
<StackingLayout style={{ maxWidth: 800 }}>
  <Paragraph>
    Tables should be used to display data in rows and columns. Do not use tables
    to visually layout unrelated content. Content that represents connected data
    (such as key:value pairs) should use the table component to semantically
    represent that relationship.
  </Paragraph>
  <Paragraph>
    Every table needs a programmatic name that is unique to the page. If the
    table has a visual heading, it should be linked to the table using
    aria-labelledby. If there is no visual heading, add a name for screen reader
    users by adding an aria-label.
  </Paragraph>
  <Paragraph>
    Tables should have headers that describe the purpose of the row or column.
    Header cells should never be empty and should usually contain visible text.
  </Paragraph>
  <Paragraph>
    All inputs need visible and programmatic labels. Labels should be unique to
    the page, concise, and descriptive. For inputs within a table, the visible
    label can be something like the column header + a unique row cell (such as a
    Name or Id column). The input would then be given an aria-labelledby that
    references both.
  </Paragraph>
  <Paragraph>
    For row selection checkboxes, use checkboxProps to set a unique aria-label
    for each checkbox. checkboxProps accepts a function with rowData as a
    parameter.
  </Paragraph>
</StackingLayout>
```

#### Using Row Headers in combination with Column Headers

```tsx
const columns = [
  {
    title: 'Feature',
    key: 'feature',
    rowHeader: true,
  },
  {
    title: 'Apples',
    key: 'apple',
  },
  {
    title: 'Oranges',
    key: 'orange',
  },
]

const dataSource = [
  { key: '1', feature: 'Color', apple: 'Green, Yellow, Red', orange: 'Orange' },
  { key: '2', feature: 'Shape', apple: 'Round', orange: 'Round' },
  { key: '3', feature: 'Sugar', apple: '10%', orange: '9%' },
  { key: '4', feature: 'Dietary Fiber', apple: '2.4%', orange: '2.4%' },
]

const TableExample = () => (
  <Table
    showCustomScrollbar={true}
    dataSource={dataSource}
    columns={columns}
    aria-labelledby="row-and-header-title"
    structure={{
      stylizeRowHeaders: true,
    }}
    wrapperProps={{
      'data-test-id': 'column-and-row-headers',
    }}
  />
)
```

#### Using only Row Headers

```tsx
const columns = [
  { title: 'Label', key: 'label', rowHeader: true },
  { title: 'Value', key: 'value' },
]

const TableExample = () => (
  <Table
    showCustomScrollbar={true}
    dataSource={dataSource}
    columns={columns}
    aria-label="Table using only row headers"
    structure={{
      stylizeRowHeaders: true,
      hideHeader: 'no-header',
    }}
    wrapperProps={{
      'data-test-id': 'row-headers',
    }}
  />
)
```

#### Headerless Table Example

```tsx
const TableExample = () => (
  <Table
    showCustomScrollbar={true}
    dataSource={dataSource}
    columns={columns}
    aria-label="Table with visually-hidden column headers"
    structure={{ hideHeader: true }}
    wrapperProps={{ 'data-test-id': 'hide-header' }}
  />
)
```

### Usage Notes

- Prefer documented enum/static values such as `Table.<EnumName>.<VALUE>` over raw strings when the component exposes them.
- Keep labels, help text, and validation visible and persistent for form controls; use `FormItem*` wrappers where available.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.
- `TableCellLayout` is **not** exported from `@nutanix-ui/prism-reactjs` — use `FlexLayout` for icon+text or text+badge cell layouts.
- The `customMessages.noData` key replaces what was previously documented as `customMessages.empty` (the latter does not exist in the source).
- `reorderableRows` is incompatible with `infiniteScroll` and `rowExpand`.
- `onColumnsOrderChange` enables drag-and-drop column reordering but only for first-level columns (not nested column groups).
- `structure.columnResize` requires `onChangeStructure` to persist resized values.

<!-- SOURCE-API-END -->
