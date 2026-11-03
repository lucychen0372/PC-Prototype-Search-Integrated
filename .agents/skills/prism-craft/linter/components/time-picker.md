# Time Picker

Source: [https://ds.nutanix.design/components/time-picker](https://ds.nutanix.design/components/time-picker)
React: `TimePicker`

---

## Overview

The Time Picker component is a specialized input box designed to let users select or type precise time values.

---

## Anatomy

1. **Input Field**: Displays and accepts typed time.
2. **Clear Cross Button**: Instantly wipes the value.
3. **Time Clock Icon**: Triggers the dropdown time selection sheet.
4. **Time Selection Menu**: Scrollable selectors for hours, minutes, seconds, and AM/PM.

---

## Accessibility & Validation

- **Visible Labels**: An explicit visible label must be programmatically connected to the Time Picker.
- **No Color-Only Semantics**:
  - Selected menu states must be indicated by shapes or visual indicators beyond color alone.
  - Active error states must display a status icon with validation text.

---

## Keyboard Navigation

- **Tab Order**: flows logically from: `Input Field` → `Clear Cross` → `Time Icon`.
- **Dropdown triggers**:
  - Focus on input or Time Icon + pressing `[↓]`, `[Space]`, or `[Enter]` opens the menu.
  - Pressing `[Enter]` or `[Space]` on the Clear Cross clears the text and refocuses the input field.
- **Dropdown Listbox Navigation**:
  - Use `[↓/↑]` to scroll through list hours, minutes, seconds, and AM/PM options.
  - Use `[Tab]` to cycle focus columns between hour, minute, second, and AM/PM blocks.
  - Use `[Esc]` to close the dropdown menu and return focus directly to the main input field.
  - Use `[Enter]` or `[Space]` to select the active option.
