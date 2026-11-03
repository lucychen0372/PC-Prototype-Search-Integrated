# Status Indicator

Source: [https://ds.nutanix.design/components/status-indicator](https://ds.nutanix.design/components/status-indicator)
React: `Badge` (with status variants), `StatusIcon`

---

## Overview

Status Indicators visually communicate the state or condition of an element using standard semantic colors and/or corresponding status icons.

---

## Variants & Props

- **Icon Variants**: Icons are used as a primary visual indicator next to colors to represent status. Icons are required so we do not use color alone to convey status (essential for color-blind users).
- **Symbol Variants**: Used in extremely dense areas (like table cell layouts) to support already explicit text.
- **Tooltip**: By default, the status indicator displays a tooltip on hover to reveal additional information.
  - **No interactive content in tooltips**: Never place interactive elements (such as links or buttons) inside a tooltip. Tooltips are inaccessible to keyboard navigation users.
- **Popover**: If you need to include interactive elements (e.g. troubleshooting links), use a **Popover** component instead of a tooltip.

---

## Compliance Checklist

- [ ] **No color-only status**: Statuses use a descriptive status icon alongside colors.
- [ ] **No interactive tooltips**: Hover tooltips contain only plain text; interactive links or buttons are placed inside a Popover instead.
- [ ] **Dense representation**: Compact symbol dots are accompanied by adjacent, explicit text descriptions inside tables.
