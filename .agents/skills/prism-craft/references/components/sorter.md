# Sorter

## Figma

- **Library name:** Sorter (page: Data Display, frame: Sorter)

## React

Import: `import { Sorter } from '@nutanix-ui/prism-reactjs'`

### Enums

```ts
// SorterOrder — controls current sort direction
SorterOrder.ASCEND // "ascend"
SorterOrder.DESCEND // "descend"
SorterOrder.NONE // "none"

// SorterTypes — controls toggle behavior
SorterTypes.THREE_STATES // "3states"  cycle: ascend → none → descend → ascend
SorterTypes.TWO_STATES // "2states"  cycle: ascend ↔ descend
```

Both enums are named exports from `@nutanix-ui/prism-reactjs`. They are also re-exported
as constants:

```ts
import {
  Sorter,
  SORT_ORDER_CONST,
  TYPES_CONST,
} from '@nutanix-ui/prism-reactjs'
// SORT_ORDER_CONST === SorterOrder
// TYPES_CONST      === SorterTypes
```

The `SORT_ORDER_CONST` alias is also available as the static member `Sorter.SORT_ORDER_CONST`.
`SorterTypes` is **not** a static member of `Sorter` — use the named import or raw string literals.

### Props

| Prop                 | Type                                 | Default                  | Required | Notes                                                                                                                     |
| -------------------- | ------------------------------------ | ------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `sortOrder`          | `SorterOrder`                        | `SorterOrder.ASCEND`     | No       | Current sort direction. Controlled; syncs on every prop change via `useEffect`.                                           |
| `type`               | `SorterTypes`                        | `SorterTypes.TWO_STATES` | No       | Toggle cycle: `TWO_STATES` = ascend ↔ descend; `THREE_STATES` = ascend → none → descend → ascend.                        |
| `onSortOrderChanged` | `(sortOrder: SorterOrder) => void`   | —                        | No       | Called after every toggle with the new `SorterOrder` value.                                                               |
| `upIconProps`        | `TriangleUpIconProps`                | —                        | No       | Props forwarded to the internal `TriangleUpIcon`.                                                                         |
| `downIconProps`      | `TriangleDownIconProps`              | —                        | No       | Props forwarded to the internal `TriangleDownIcon`.                                                                       |
| `aria-label`         | `string`                             | —                        | No       | Rendered as visually-hidden `SrOnly` text appended to the button. Supplements the auto-generated sort-state announcement. |
| `id`                 | `string`                             | auto-generated           | No       | When provided, used as the button element's `id` and to derive the popup id.                                              |
| `className`          | `string`                             | —                        | No       | Additional CSS class on the root `<button>`.                                                                              |
| `tabIndex`           | `number`                             | `0`                      | No       | Required for macOS WebKit focus behaviour.                                                                                |
| `data-test`          | `string`                             | —                        | No       | Test selector on the root `<button>`.                                                                                     |
| `...rest`            | `React.HTMLProps<HTMLButtonElement>` | —                        | No       | All other button HTML props are forwarded to the root `<button>` (except `ref`, which is handled by `React.forwardRef`).  |

### Ref API (`SorterRef`)

`Sorter` accepts a `ref` via `React.forwardRef`. The ref exposes the following imperative methods:

| Method             | Signature                             | Description                                                                               |
| ------------------ | ------------------------------------- | ----------------------------------------------------------------------------------------- |
| `getSortOrder`     | `() => SorterOrder`                   | Returns the current sort order.                                                           |
| `setSortOrder`     | `(newSortOrder: SorterOrder) => void` | Sets sort order and fires `onSortOrderChanged`.                                           |
| `getNextSortOrder` | `() => SorterOrder`                   | Returns what the next sort order will be on toggle (respects `type`).                     |
| `toggleSortOrder`  | `() => void`                          | Advances to the next sort order state.                                                    |
| `getButtonId`      | `() => string`                        | Returns the button element's `id`.                                                        |
| `getPopupId`       | `() => string`                        | Returns the derived popup element `id` (useful when linking a popup via `aria-controls`). |

### TSX Examples

#### Minimal (uncontrolled, 2-state default)

```tsx
import { Sorter } from '@nutanix-ui/prism-reactjs'
;<Sorter />
```

#### Inline with a column label

```tsx
import { FlexLayout, TextLabel, Sorter } from '@nutanix-ui/prism-reactjs'
;<FlexLayout alignItems="center" itemGap="XS">
  <TextLabel>Name</TextLabel>
  <Sorter
    sortOrder={sortOrder}
    type={Sorter.SORT_ORDER_CONST.ASCEND /* TWO_STATES is default */}
    onSortOrderChanged={(order) => setSortOrder(order)}
  />
</FlexLayout>
```

#### 3-state toggle (ascend → none → descend → ascend)

```tsx
import { Sorter, SorterOrder, SorterTypes } from '@nutanix-ui/prism-reactjs'
;<Sorter
  type={SorterTypes.THREE_STATES}
  sortOrder={SorterOrder.ASCEND}
  onSortOrderChanged={(order) => console.log(order)}
/>
```

#### Initialized to descend

```tsx
import { Sorter, SorterOrder } from '@nutanix-ui/prism-reactjs'
;<Sorter sortOrder={SorterOrder.DESCEND} />
```

#### With aria-label for screen readers

```tsx
import { Sorter, SorterOrder } from '@nutanix-ui/prism-reactjs'
;<Sorter
  aria-label="Sort by CPU usage"
  sortOrder={SorterOrder.ASCEND}
  onSortOrderChanged={(order) => setSortOrder(order)}
/>
```

#### Using the imperative ref

```tsx
import React from 'react'
import { Sorter, SorterOrder, SorterRef } from '@nutanix-ui/prism-reactjs'

function MyColumn() {
  const sorterRef = React.useRef<SorterRef>(null)

  const resetSort = () => {
    sorterRef.current?.setSortOrder(SorterOrder.ASCEND)
  }

  return (
    <>
      <Sorter ref={sorterRef} onSortOrderChanged={(o) => console.log(o)} />
      <button onClick={resetSort}>Reset</button>
    </>
  )
}
```

### Accessibility & Behaviour Notes

- Renders as a native `<button type="button">` — keyboard-activatable with `Space` / `Enter`.
- The triangle icons are `aria-hidden="true"`; sort state is communicated via a `SrOnly` element that renders a localised string (e.g. "Ascending sorter", "Descending sorter", "Sortable").
- `aria-live="assertive"` is set on the button when `sortOrder !== 'none'`, so screen readers announce the new state on every toggle.
- When `sortOrder` is `NONE` (3-state only), `aria-live` is omitted and the SrOnly text reads "Sortable".
- Providing `aria-label` appends extra visually-hidden text before the auto-generated announcement — useful for identifying which column the sorter belongs to.
- `tabIndex` defaults to `0` to work around a macOS WebKit focus bug.
- The `id` prop (or auto-generated id) is used to build a stable popup id via `getPopupId()`, which follows the pattern `sorter-popup-<id>`.

### Anti-patterns

- Don't use custom up/down arrow buttons for sorting — use `Sorter`.
- Table columns have built-in sorting via the `sorter` prop — prefer that for tables; use `<Sorter>` directly only when building custom column headers or non-table sortable labels.
- Don't reference `Sorter.SorterTypes` — `SorterTypes` is not a static member. Use the named import `SorterTypes` or `TYPES_CONST` instead.

<!-- SOURCE-API-START -->

### Import

```tsx
import {
  Sorter,
  SorterOrder,
  SorterTypes,
  SORT_ORDER_CONST,
  TYPES_CONST,
} from '@nutanix-ui/prism-reactjs'
```

### Enums / Constants

#### `SorterOrder`

- `ASCEND` = `"ascend"`
- `DESCEND` = `"descend"`
- `NONE` = `"none"`

Also exported as `SORT_ORDER_CONST` and as the static member `Sorter.SORT_ORDER_CONST`.

#### `SorterTypes`

- `THREE_STATES` = `"3states"` — cycle: ascend → none → descend → ascend
- `TWO_STATES` = `"2states"` — cycle: ascend ↔ descend

Also exported as `TYPES_CONST`. **Not** available as `Sorter.SorterTypes`.

### Props Interfaces

#### `SorterProps`

Extends: `Omit<React.HTMLProps<HTMLButtonElement>, 'ref'>`

| Prop                 | Type                               | Default                  | Description                                                              |
| -------------------- | ---------------------------------- | ------------------------ | ------------------------------------------------------------------------ |
| `className`          | `string`                           | —                        | Additional CSS class on the root `<button>`.                             |
| `sortOrder`          | `SorterOrder`                      | `SorterOrder.ASCEND`     | Current sort direction.                                                  |
| `type`               | `SorterTypes`                      | `SorterTypes.TWO_STATES` | Toggle cycle behavior.                                                   |
| `onSortOrderChanged` | `(sortOrder: SorterOrder) => void` | —                        | Callback fired after each toggle with the new `SorterOrder`.             |
| `upIconProps`        | `TriangleUpIconProps`              | —                        | Props forwarded to the internal `TriangleUpIcon`.                        |
| `downIconProps`      | `TriangleDownIconProps`            | —                        | Props forwarded to the internal `TriangleDownIcon`.                      |
| `aria-label`         | `string`                           | —                        | Rendered as `SrOnly` text inside the button for screen reader context.   |
| `id`                 | `string`                           | auto                     | Sets the button `id`; used to derive `getButtonId()` and `getPopupId()`. |
| `data-test`          | `string`                           | —                        | Test selector.                                                           |
| `tabIndex`           | `number`                           | `0`                      | Tab index; defaults to `0` for macOS WebKit compatibility.               |

#### `SorterRef`

Imperative handle exposed via `React.forwardRef`.

| Member             | Type                                  | Description                                                    |
| ------------------ | ------------------------------------- | -------------------------------------------------------------- |
| `getSortOrder`     | `() => SorterOrder`                   | Returns current sort order.                                    |
| `setSortOrder`     | `(newSortOrder: SorterOrder) => void` | Sets sort order and fires `onSortOrderChanged`.                |
| `getNextSortOrder` | `() => SorterOrder`                   | Returns the next order that will result from a toggle.         |
| `toggleSortOrder`  | `() => void`                          | Advances to the next sort order.                               |
| `getButtonId`      | `() => string`                        | Returns the button element `id`.                               |
| `getPopupId`       | `() => string`                        | Returns the popup element `id` (pattern: `sorter-popup-<id>`). |

#### `SorterComponentType`

Extends: `React.ForwardRefExoticComponent<SorterProps & React.RefAttributes<SorterRef>>`

| Static member      | Type                 | Description                       |
| ------------------ | -------------------- | --------------------------------- |
| `SORT_ORDER_CONST` | `typeof SorterOrder` | Alias for the `SorterOrder` enum. |

### Source Examples

These are adapted from the Prism source. Prefer enum/constant imports over raw string literals in app code.

#### Default usage — 2-state toggle

```tsx
<Sorter data-test-id="default-2-states" />
```

#### 3-state toggle type

```tsx
import { Sorter, SorterTypes } from '@nutanix-ui/prism-reactjs'
;<Sorter data-test-id="three-states" type={SorterTypes.THREE_STATES} />
```

#### Initialize sortOrder to descend

```tsx
import { Sorter, SorterOrder } from '@nutanix-ui/prism-reactjs'
;<Sorter sortOrder={SorterOrder.DESCEND} />
```

#### Using onSortOrderChanged

```tsx
import { Sorter } from '@nutanix-ui/prism-reactjs'
;<Sorter onSortOrderChanged={(newSortOrder) => console.log(newSortOrder)} />
```

### Usage Notes

- Prefer `SorterOrder` / `SorterTypes` named imports (or `Sorter.SORT_ORDER_CONST`) over raw strings.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing when embedding `Sorter` in a label row.
- `Sorter` is a controlled component when `sortOrder` is passed — update the prop in `onSortOrderChanged` to keep state in sync.
- The `ref` API (`SorterRef`) is useful when a parent (e.g. a column header) needs to programmatically reset or read sort state without managing it in React state.

<!-- SOURCE-API-END -->
