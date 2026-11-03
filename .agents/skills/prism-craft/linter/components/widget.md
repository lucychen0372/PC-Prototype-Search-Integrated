# Widget

Source: [https://ds.nutanix.design/components/widget](https://ds.nutanix.design/components/widget)
React: `DashboardWidget`, `DashboardWidgetHeader`, `DashboardWidgetLayout`

---

## Overview

The Widget component is a modular, flexible card container used to display related metrics, summaries, tables, or charts on dashboards and side panels.

---

## Anatomy

- **Widget Header**:
  1. `Title`: Identifies the metric or card content.
  2. `Badge or Tag (Optional)`: Conveys status levels or category info.
  3. `Extra Header Content`: Reserved for localized controls (such as compact pagination, select filters, action icons, or close triggers).
- **Content Area**: The main body of the card rendering charts, tables, or details.
- **Widget Footer**: Used for non-primary actions, chart legends, or interactive hyperlinks.

---

## Sizing & Layout

- Widgets should resize smoothly to fit within flex/grid layouts.
- Spacing inside and around widgets must be managed using standard spacing variables.

---

## Compliance Checklist

- [ ] **Structured layout**: Widget contains a defined header, body, and optionally a footer.
- [ ] **Header-specific elements**: Badges/Controls reside strictly within the extra header container of the widget layout.
- [ ] **No custom padding styles**: Spacing inside widgets matches standard padding props of Prism UI layout variables.
