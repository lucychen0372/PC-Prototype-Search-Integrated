# Tabs

Source: [https://ds.nutanix.design/components/tabs](https://ds.nutanix.design/components/tabs)
React: `Tabs`, `TabItem`

---

## Overview

The Tabs component organizes related content into distinct views that users can switch between without leaving the active page, displaying only one panel of content at a time.

---

## Variants & Props

- **Grouped Tabs**: Use to nest multiple sub-pages inside an action dropdown when there is a close, logical relation between those views.
- **Adaptive Tabs**: Programmatic prop (`adaptive`) that automatically groups and collapses tabs that cannot fit on the current screen into a "More" dropdown tab.

---

## Content Guidelines

- **Character Limit**: Keep tab names short and concise. Tabs must be **30 characters or fewer** to prevent overflow.
- **Clarity**: Tab labels must clearly describe the content panel they represent; avoid generic terms.
- **Casing**: **Title Case** for all tab labels. Keep proper nouns capitalized.

---

## Keyboard Navigation

- Tab into the tablistbox via `[Tab]`. Focus defaults to the first active/selected tab.
- Use horizontal arrow keys `[←/→]` to move focus and **instantly select** adjacent tabs.
- Focused tabs with tooltips automatically display the tooltip.
- Press `[Tab]` again to move focus directly into the active tab content area.
