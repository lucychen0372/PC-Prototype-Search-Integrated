# Entity Browser

Source: [https://ds.nutanix.design/patterns/eb](https://ds.nutanix.design/patterns/eb)

---

## Overview

Entity Browser (EBR) is a highly standardized table pattern used for displaying, filtering, and managing collections of entities across Nutanix applications. It enforces visual and behavioral consistency for listing, selecting, grouping, and performing actions on large datasets.

---

## Layout & Structure

EBR uses a strict, rigid layout. You cannot place custom elements in restricted areas (e.g. between the buttons and the filter bar, above buttons, or to the left of the table).

---

## Action Bar Guidelines

- **Primary Actions**: Up to **1 primary button** (Normal, Split, or Dropdown).
- **Secondary Actions**: Up to **4 secondary buttons** (or 3 secondary + "More Actions" dropdown).
  - Use 10px spacing (`itemGap="S"`) between buttons.
  - **No separators** are allowed in the button lineup.
  - Use the ButtonGroup component when grouping multiple secondary actions.
  - Truncate secondary actions into a dropdown menu when space is constrained.
- **Action Selection**: Frequently used actions are exposed directly. Less common actions must reside in dropdowns. Actions must automatically disable/enable based on active row selections.

---

## Filtering Guidelines

### 1. Filter Bar

Allows users to quickly filter by search queries, select views, or apply grouping. Modified filters are edited via a tag-triggered dropdown.

### 2. Filter Panel

Triggered via the "Modify Filters" button.

- **Opening the filter panel automatically closes any active details side panel** (and vice versa).
- Users can sort the filters alphabetically (A-Z or Z-A).

### 3. Supported Filter Types

Custom filter controls on a feature-by-feature level are strictly forbidden. The panel supports _only_ these types:

- **String Filter**: Rule-based (e.g. name search). Multiple rules function as an "OR" query.
- **Numeral Filter**: Used for counts, capacity, etc. Supports pre-defined or custom ranges.
- **Static Select Filter**: Predefined lists of options (e.g., Power States, Hypervisor Type).
- **Dynamic Select Filter**: Dynamic API-loaded lists (e.g., Clusters, Categories).
- **Radio Filter**: Single selection. By default, no value is selected. A selection can be cleared.
- **Time Range Filter**: Standardized date/time selection.

---

## Table Top & Meta Info Area

The title of the entity list must use standard, dynamic formatting:

- **Idle**: `Viewing all 24 VMs`
- **Idle Filtered**: `Viewing 6 filtered VMs`
- **Selected**: `6 selected out of 24 VMs`
- **Selected Filtered**: `6 selected out of 6 filtered VMs`
- **Filters Empty (No Matches)**: `No VMs match your filter`
- **Table Empty**: `There are no Templates available.`

---

## Exporting & Pagination

- **Export**: Users can export "All", "Selected", or "Filtered" entities in **CSV format**.
- **Pagination**:
  - Default size is **20 rows**, with user options for 10, 20, 30, 40, 50, and 60.
  - Row selections can only persist and be made on one page at a time.
  - Hide pagination controls if total items are less than or equal to the page size.
  - EBR relies on page-height-constrained inline scrolling, so pagination should not be stacked under the table unless it's an unconstrained, scrolling table extending below the fold.

---

## Table Behavior & Columns

- **Content Refresh**: Refreshes automatically every _n_ seconds. A hidden manual refresh button exists next to the title.
- **Locked First Column**: The "Name" column is locked in the first position.
- **Column Limits**: Users can toggle and select up to **20 columns** at a time. Minimum column width is 100px.
- **Horizontal Scrolling**: Activated when columns exceed container width. The first column remains fixed during scroll unless screen width drops below 480px (where it unfixes).
- **Null Content**: Empty or null cells must display a dash (`"-"`) with hidden accessibility text (`"null"`).

---

## Group By Guidelines

- **Tabs Group By (Legacy default)**: Groups entities into tabs above the table (max limit of **7 groups** due to backend limitations).
- **Menu Group By (New Opt-in)**: Side-menu-based, supports search, loading more entities, and second-level grouping. Allows badges and subtext meta-renderers inside group items.

---

## Compliance Checklist

- [ ] **Strict Button Counts**: Confirm no more than 1 primary and 4 secondary buttons are visible on the action bar.
- [ ] **Standardized Header Title**: Title matches the dynamic string format (`Viewing all X [entities]`, etc.).
- [ ] **Filter Controls Compliance**: No custom, unsupported filters (only use the 7 standard EBR filters).
- [ ] **Null Values Representation**: Verification that empty cells display `"-"` with hidden text `"null"`.
- [ ] **Panel Mutual Exclusivity**: Opening the Filter Panel must automatically close the Detail Side Panel.
- [ ] **No Custom EBR Layouts**: Ensure no buttons, banners, or inputs are injected between standard EBR layout lines.
