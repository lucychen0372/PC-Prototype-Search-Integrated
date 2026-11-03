# Number Input

Source: [https://ds.nutanix.design/components/number-input](https://ds.nutanix.design/components/number-input)
React: `InputNumber`

---

## Overview

The Number Input component is a specialized input field designed specifically for numerical data entry. It includes built-in buttons for incrementing or decrementing values.

---

## Usage Guidelines

Use `InputNumber` when:

- Gathering exact numeric data (limits, quantities, sizes, thresholds).
- Restricting input within a strict minimum/maximum numeric range.
- Precise step increments/decrements (e.g. step of 1, 10, or 0.5) improve efficiency.

---

## Content Guidelines

- **Labels**: Use clear, concise labels that explicitly describe what number needs to be entered.
- **Units of Measurement**:
  - Integrate units of measurement as a suffix or within the label (e.g., GB, vCPUs, ms).
  - Do **not** spell out units unless explicitly requested.
- **Constraints Display**: If there is a numeric range restriction, display the allowed bounds persistently in the helper text or label, **not** as transient placeholder text.
- **Number Formatting**: Do **not** use leading zeros for single-digit integers.
  - **Do**: `5`
  - **Don't**: `05`

---

## Accessibility & Interaction

- **Programmatic Labels**: The main text input must have a programmatically linked label.
- **Controls Access**: Provide localized screen-reader labels for the increase and decrease increment buttons.
- **No Color-Only Errors**: Error/warning bounds must be accompanied by descriptive validation text and warning icons, not color alone.
- **Keyboard Interaction**:
  - `[↑/↓]` arrow keys increment/decrement the current value.
  - `[Home/End]` keys instantly set the value to the minimum/maximum allowed limit.
  - Sighted users must be able to focus and tab between input fields and stepper triggers.

---

## Compliance Checklist

- [ ] **No leading zeros**: Single-digit integers are written without leading zeros (e.g. `5` instead of `05`).
- [ ] **Persistent constraint helpers**: Minimum/maximum value limits are displayed permanently in helper text, not hidden inside placeholders.
- [ ] **Abbreviated units**: Measurement suffixes use standardized abbreviations (GB, ms) rather than fully spelled-out words (Gigabytes).
- [ ] **Programmatic link label**: Connected label is configured via `htmlFor`.
- [ ] **Keyboard arrow handlers**: Up/down arrow key inputs increment or decrement values.
