# Select Input

Source: [https://ds.nutanix.design/components/select-input](https://ds.nutanix.design/components/select-input)
React: `Select`, `Dropdown`

---

## Overview

The Select Input component allows users to select a single option from a list of values.

---

## MiniSelect Variant

- **Visible Label Required**: Always include a label inside the MiniSelect component. The label is part of the clickable hit area. Do **not** place an external text label above or adjacent to a MiniSelect.
- **No Placeholders**: Placeholders are **not recommended** for MiniSelects.

---

## Props

- **Clear Selection Prop**: Only enable the "Clear Selection" option when the input field is optional.

---

## Accessibility & Validation

- **Screen Reader Announcements**: Search results (inside filterable selects) must be dynamically announced to screen readers.
- **Labels**: Every Select must have a visible and programmatically connected label (`htmlFor` or `aria-labelledby`).
- **Non-Visual Cues**: Validation states must not rely solely on color. Error or warning messages must always display a status icon adjacent to the text.

---

## Keyboard Navigation

- **Input triggers**:
  - `[Enter]` opens the menu.
  - Type characters to search (if search/filtering is enabled).
  - `[↑/↓]` moves focus between options.
  - `[Esc]` closes the dropdown and focuses back on the input field.
  - Clicking the trigger button while the dropdown is open closes it and refocuses the input.

---

## Compliance Checklist

- [ ] **Internal MiniSelect Label**: MiniSelect uses its built-in label and has no external label.
- [ ] **No MiniSelect Placeholders**: MiniSelect does not have a placeholder text.
- [ ] **Optional Clear Selection**: Clear Selection is disabled unless the input field is marked as optional.
- [ ] **Icons in validation**: Validation errors display a status icon with the warning/critical text.
- [ ] **Visible & connected label**: Dropdown has a programmatically connected label.
