# Multi-Select Input

Source: [https://ds.nutanix.design/components/multi-select-input](https://ds.nutanix.design/components/multi-select-input)
React: `MultiSelect`, `MultiInput`

---

## Overview

The Multi-Select Input allows users to select multiple options from a list of values, rendering selections as compact, removable tags inside the input field.

---

## Selection Limits Guidelines

When a Multi-Select component implements a selection limit constraint (e.g., maximum of 5 selections):

- **Keep input enabled**: **Never disable the primary input field or close the dropdown** when a selection limit is reached. Disabling the input unexpectedly traps focus or cuts off navigation, preventing the user from deselecting items.
- **Disable remaining items**: Slices/options exceeding the selection limit inside the dropdown list should be disabled, while already checked items remain interactive and deselectable.
- **Explaining limit constraints**:
  - If the limit is **static**, persistently display the selection limit in the helper text under the input field.
  - If the limit is **dynamic**, render the explanation helper text immediately after the limit has been reached.

---

## Compliance Checklist

- [ ] **Input remains active at limit**: The main input field remains enabled even when the selection limit has been fully met.
- [ ] **Checked items remain interactive**: Already selected option rows inside the dropdown remain active and deselectable at the limit.
- [ ] **Visible limit helpers**: Dynamic/static limit warnings are displayed visibly in the helper text space.
