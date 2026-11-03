# Calendar

Source: [https://ds.nutanix.design/components/calendar](https://ds.nutanix.design/components/calendar)
React: `Calendar`

---

## Overview

The Calendar component provides a visual monthly grid interface for date selection and navigation.

---

## State Indicators

- **Day Grid States**:
  - `Normal`: Default day number.
  - `Hover`: Interactive cell hover focus.
  - `Focus`: High-contrast blue indicator for currently focused date.
  - `Day Name`: Days of week header (Sun, Mon, Tue, etc.).
  - `Today`: Distinct visual indicator for the current date.
  - `Day Other Month`: Lighter-colored numbers representing adjacent months.
- **Header States**: Month and Year scroll/nav button states include: `Idle`, `Hover`, `Active`, `Focus`, `Focus + Hover`, and `Disabled`.

---

## Accessibility & Keyboard Navigation

The Calendar is keyboard-navigable and focus-manageable:

- **Navigation Controls**:
  - `[←/↑/→/↓]` arrow keys navigate focus between days in the monthly grid.
  - `[Space]` or `[Enter]` selects the focused date.
  - Sighted users must be able to focus on month/year triggers and navigation chevrons.
- **Focus Default**: Focus starts on the currently selected date. If no date is selected, focus defaults to the current day (Today).

---

## Compliance Checklist

- [ ] **Explicit grid states**: Day headers use standard abbreviated weekday labels (Sun, Mon, Tue, etc.).
- [ ] **Focus indicator presence**: Clear visual focus state highlights exists on keyboard focus.
- [ ] **Defaults on focus**: Tab navigation into calendar starts focus on selected date or today's date.
