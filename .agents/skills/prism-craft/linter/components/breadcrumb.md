# Breadcrumb

Source: [https://ds.nutanix.design/components/breadcrumb](https://ds.nutanix.design/components/breadcrumb)
React: `Breadcrumb`, `BreadcrumbItem`

---

## Overview

The Breadcrumb component represents a horizontal sequence of navigation links to communicate the user's active page hierarchy position, offering direct shortcuts to higher-level ancestor pages.

---

## Anatomy

- **Container**: Wraps the navigation sequence.
- **Breadcrumb Items**: Selectable, hyperlinked path levels.
- **Separators**: Visual symbols (such as chevrons or slashes) separating items. Slices must be hidden from screen readers to prevent audit noise.
- **Current Page**: The last element in the path representing the active page. It is **non-interactive** (not hyperlinked) and visually styled as passive text.

---

## Accessibility

- Render using the proper `<nav>` HTML structure with a semantic ARIA label (e.g. `aria-label="Breadcrumb"`).
- Sighted keyboard users can focus and tab through the path.
- Hide divider separators using `aria-hidden="true"`.

---

## Compliance Checklist

- [ ] **Passive last element**: The active (last) breadcrumb item is non-interactive.
- [ ] **Hidden separators**: Chevrons or slash dividers are hidden from screen readers.
- [ ] **ARIA role configured**: The breadcrumb container is wrapped in a `<nav>` element with an `aria-label`.
