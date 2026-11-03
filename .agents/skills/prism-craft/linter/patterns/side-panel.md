# Side Panel

Source: [https://ds.nutanix.design/patterns/side-panel](https://ds.nutanix.design/patterns/side-panel)

---

## Overview

The Side Panel component slides in from the right-hand side of the screen, providing additional space for displaying entity-specific details without disrupting the main workflow or navigating away from the page.

It is **primarily used in entity list pages (EBR)** to display detail widgets and metrics, instead of forcing a page redirection.

---

## Restricted Side Panel Content

Do NOT use the side panel for representing:

- **Forms and wizards** (use modals or wizards instead).
- **Settings configurations** (use standard settings pages or modals).
- **Heavy visualizations** (limit visual charts inside side panels).
- **Bulk Actions Replications**: Do not replicate the tables' bulk actions within the side panel.
- **Excessive detail duplication**: Do not dump all information from a full-page view into the side panel.

---

## Interaction & Behavior

### 1. Entity Selection

- Clicking an entity's name in a table opens the side panel.
- Clicking another entity's name switches the side panel focus to the new entity.

### 2. Full Page View Link

- Include a link icon (using standard icons) next to the entity name in the side panel header to navigate to the entity's dedicated full detail page.

### 3. Mutual Exclusivity with Filter Panel

- **The Filter Panel and Side Panel cannot be shown at the same time.**
- Opening the Filter Panel automatically closes/hides the Side Panel.
- Opening the Side Panel (by clicking an entity) automatically closes/hides the Filter Panel.

---

## Sizing Guidelines

- **Small Side Panel (30%)**: Default size. Supports a single-column layout of widgets.
- **Large Side Panel (50%)**: Stacks widgets side-by-side.
  - **Screen Width Constraint**: The large side panel must **not be available** on screen resolutions narrower than **1400px** to avoid squishing content.
- **Table Resize Behavior**: When the panel opens, the adjacent table must either activate horizontal scrolling with a fixed first column, or reduce visible columns to a maximum of four to avoid layout breakage.

---

## Content & Tab Composition

The side panel supports three distinct tab layouts:

1. **Summary + Tabs**: For extensive entities (like VMs). Summarized metric widgets are on the main panel canvas, with granular details in additional tabs.
2. **Only Tabs**: For secondary entities (like Alerts). Displays tabs but no standalone summary page.
3. **No Tabs**: For minimal entities (like Tasks). Displays a simple single-view list without tab selectors.

### Tab Contents Constraints

- **Simple Widget Tabs**: Max **4 widgets per tab**. Each widget is recommended to have **5 or fewer rows**.
- **Extensive Metrics/Charts Tabs**: Max 4 charts widgets per tab. Include a quick-search field that filters content as you type. Group metric selectors instead of exposing them all.
- **Tabs with Small Tables**: Use a long two-column properties list table and a single widget. No row limit.
- **Tabs with Large Tables** (e.g. Alerts tab):
  - Limit table to **max 4 columns** (use horizontal scrolling for more).
  - Bulk actions in tabs must reside in a dropdown instead of inline buttons, unless only one action exists.
  - Tab filters should be placed inside a dropdown adjacent to the action button.

---

## Compliance Checklist

- [ ] **No Forms inside Side Panel**: The panel is read-only for metrics and properties; no configuration forms are rendered inside it.
- [ ] **Mutual Exclusivity Enforced**: Opening the filter panel closes the side panel (and vice versa).
- [ ] **Full Page Link in Header**: Header has the entity title and a link to the full-page view.
- [ ] **Sizing Limit (1400px)**: The 50% (large) side panel layout disables or falls back to small under 1400px screen resolutions.
- [ ] **Tab Widget Max Bounds**: Simple summary tabs contain no more than 4 widgets, with max 5 rows each.
- [ ] **Table Columns Constraints**: Side panel child tables are limited to max 4 columns.
