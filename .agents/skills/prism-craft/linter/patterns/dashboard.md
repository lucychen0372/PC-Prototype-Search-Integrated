# Dashboard

Source: [https://ds.nutanix.design/patterns/dashboard](https://ds.nutanix.design/patterns/dashboard)

---

## Overview

A Dashboard is a high-level visual pattern that provides a simple and digestible way to display summarized telemetry, status, and analytical data for an application or system.

---

## Guidelines

- **Summarized Information**: Dashboards should aggregate dense transactional data and present it in highly scannable layouts (e.g., widgets, widgets with mini tables, donut charts, area charts).
- **Layout Grid**: Place widgets within a structured grid (e.g. `<DashboardWidgetLayout>`) that supports consistent alignment.
- **Card/Widget Headers**: Every dashboard widget must have a distinct, standard header (`<DashboardWidgetHeader>`) to present its title, status indicators, or action buttons.
- **Responsiveness**: Arrange visual components using flexible columns that re-layout smoothly on smaller viewing areas.

---

## Visual Linter Checklist

- [ ] **Data Visualization Placeholders**: Because actual charts are implemented outside the core Prism library, verify that all charts are mocked up as placeholders (`ChartPlaceholder`) with proper comments detailing expected recharts/visx implementations.
- [ ] **No Custom Layout Divs**: Verification that widget cards are organized using `<FlexLayout>` with equal-width bases (`itemFlexBasis="100pc"`) or grid systems, avoiding generic styled layout wrappers.
- [ ] **Semantic Spacing**: Widget-to-widget spacing and section spacing must use spacing tokens (`itemGap="M"` or `itemGap="L"`).
