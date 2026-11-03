# Badge

Source: [https://ds.nutanix.design/components/badge](https://ds.nutanix.design/components/badge)
React: `Badge`

---

## Overview

A Badge is a visual text label that displays numeric values to quantify adjacent data elements.

---

## Usage Guidelines

- **Numeric Counts Only**: Use a badge **only** for displaying numerical counts (e.g. counting entities, alerts, or tasks). Do **not** write arbitrary non-numeric text inside badges (use Tags instead).
- **Positioning**: Place the badge immediately **after (to the right of)** the label or text of the object it is quantifying.
- **Casing**: Ensure counts are clearly legible.

---

## Accessibility & Semantics

- **No Color-Only Semantics**: If a badge uses semantic colors (e.g. green for success, red for critical error) to convey state changes, **it must include a corresponding status icon**. Color alone must never be used to convey information.
- **Alt Text**: Ensure the associated status icon inside a semantic badge has appropriate programmatic alt text describing its state (e.g. "Critical", "Warning", "Success").

---

## Compliance Checklist

- [ ] **Badges are strictly numeric**: Badges contain only numbers, never text labels.
- [ ] **Positioned to the right**: Badges are placed immediately to the right of the associated text labels.
- [ ] **Icons in semantic states**: Badges representing error/success/warning states include an inline status icon.
- [ ] **Icon alt text configured**: Programmatic alternative text exists on semantic badge icons.
