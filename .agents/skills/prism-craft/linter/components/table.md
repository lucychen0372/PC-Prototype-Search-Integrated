# Table

Source: [https://ds.nutanix.design/components/table](https://ds.nutanix.design/components/table)
React: `Table`, `LocalTable`, `WidgetTable`, `Sorter`, `Pagination`

---

## Overview

The Table component organizes structured data in rows and columns to help users scan, compare, and analyze collections of items.

---

## Background & Border Tokens

The background and border colors must automatically adapt to the containing background wrapper to preserve contrast:

- Placed on **color-background-body**: Use `color-background-base` (no border).
- Placed on **color-background-base**: Use `color-background-base-alt` + `color-border-interactive`.
- Placed on **color-background-base-alt**: Use `color-background-base` + `color-border-interactive`.

---

## Table Layout Elements

### 1. Top Title Area

Format table count titles dynamically based on states:

- _Example_: `Viewing 3 clusters`, `1 selected out of 3 clusters`, `Viewing 1 grouped out of 3 VMs`.
- Right-aligned section is strictly reserved for actions and pagination controls.

### 2. Column Headers

- **Multi-line Title**: Long column headers can wrap to **max 2 lines** to save horizontal space. Slicing headers into 3 lines is forbidden.
- **Sorting**: Optional trigger. Default sorting must be bound to a logical column.

### 3. Row ID Headers

- Mark ID or main Name columns as Row Headers to allow screen readers to associate adjacent data cells with the entity ID.
- Use lighter text color (`color-text-secondary-label`) for properties list tables. Use standard color for list views.

### 4. Columns & Scroll Behavior

- **Fixed Columns**: Fix the first ("Name") or last columns when horizontal scrolling is active.
- Column header rows must remain **sticky** at the top during scrolling.

---

## Widgets and empty states

- **Widget Tables**: Left padding of cells in the first column is strictly **20px** (instead of standard 15px). Most widget tables use the first column as a row header.
- **Empty States in Forms**: Render a centered primary action button to allow users to add items. After rows are added, relocate the "Add" trigger as a text link on the top right.

---

## Accessibility

- **Table Links**: **Always underlined** using the `table-nav-primary` variant to meet contrast and interactive WCAG requirements.
- **No Truncation**: Text truncation is heavily discouraged inside table cells due to accessibility and performance limits. **Content must wrap.** Other cells in the row automatically vertical-align to the middle when rows expand.
- **Sorter controls**: Sorters must expose proper roles and active states to screen readers.
- **Keyboard navigation order**: Logical tab order flows: `Pagination controls` → `Column headers` → `Data rows`.

---

## Compliance Checklist

- [ ] **Container token pairing**: Table background and borders follow correct token pairings based on parent body/base backgrounds.
- [ ] **First column widget padding**: First column cells in WidgetTable have 20px padding instead of 15px.
- [ ] **No table cell truncation**: Text wraps inside cells; truncation is not used.
- [ ] **Table links underlined**: Hyperlinks inside table cells are underlined and use the correct text weight.
- [ ] **Column header limit**: Column titles wrap to a maximum of 2 lines.
- [ ] **Empty form add button**: Empty form tables display a prominent centered add button.
