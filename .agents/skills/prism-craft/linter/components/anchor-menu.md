# Anchor Menu

Source: [https://ds.nutanix.design/components/anchor-menu](https://ds.nutanix.design/components/anchor-menu)
React: `Anchor`, `AnchorLink`

---

## Overview

The Anchor Menu component provides orienting page-jump anchor links, allowing users to navigate long or heavy content pages easily.

---

## Usage Guidelines

- **Heavy Content Pages**: Use the anchor menu **only** on pages containing long scrolling sections or highly detailed documentation.
- **Quick Access**: Allows users to quickly jump between sections without losing page context.

---

## Variants & States

Anchor items are rendered in distinct states:

1. **Active**: The currently selected section (indicated by a blue dot and highlighted text).
2. **Inactive**: Unselected sections (indicated by a gray dot).
3. **Inactive + Error**: Unselected section containing validation errors (indicated by a gray dot and an adjacent red error icon).
4. **Disabled**: Non-interactive sections.
5. **Disabled + Error**: Non-interactive section with active validation errors.

---

## Accessibility & Navigation

- Sighted keyboard users can focus and tab `[Tab]` between anchor list items.
- Activating an anchor link via `[Enter]` or `[Space]` must **move focus directly to the target section container** for screen readers and keyboard users.

---

## Compliance Checklist

- [ ] **Jump focus configured**: Activating an anchor link shifts programmatic keyboard focus directly to the target content section.
- [ ] **Active states indicators**: The active section displays a blue indicator dot.
- [ ] **No unnecessary usage**: Used only on long, content-heavy scrolling pages.
