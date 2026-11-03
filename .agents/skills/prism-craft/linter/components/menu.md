# Menu

Source: [https://ds.nutanix.design/components/menu](https://ds.nutanix.design/components/menu)
React: `Menu`, `MenuItem`, `MenuGroup`

---

## Overview

The Menu component displays a structured list of navigation options or actions, helping users move across application sections or configure contextual options.

---

## Variants

- **Standard Menu (Main)**: Persistent lateral layout for major pages.
- **Collapsible Menu**: Sections that can be expanded or collapsed to group nested links.
- **Fly-out Menu**: Horizontal popover submenu triggered on hover or click.

---

## Content Guidelines

- **Casing**: Use **Title Case** for all menu items and section headers. Keep proper nouns as is.
- **Length**: Keep menu labels short, direct, and highly scannable. Avoid qualifiers.
- **Prefix Repetition**: Avoid starting multiple adjacent menu items with the same leading word. Repetitive prefixes degrade scanning speed.
  - _Don't_: `Policy Overview`, `Policy Categories`, `Policy Creation`
  - _Do_: `Overview`, `Categories`, `Creation` (nested under a `Policies` group)

---

## Accessibility & Interaction

- **Visual Indicators**: Actively selected menu items must use a clear visual indicator (such as an accent bar or shaded block) **other than color alone** to signal selection.
- **States**: Expandable/collapsible states must be programmatically announced.

### Keyboard Navigation (Standard Listbox)

- Focus enters via `[Tab]`.
- Move focus between menu items using arrow keys `[↑/↓]`.
- Select an item using `[Enter]` or `[Space]`.

### Keyboard Navigation (Fly-out & Collapsible)

- `[Enter]` or `[Space]` expands/collapses collapsible folders.
- `[←/→]` enters/exits horizontal fly-out submenus.
- `[Esc]` or `[←]` returns to the parent menu list.

---

## Compliance Checklist

- [ ] **Title Case menu labels**: All menu text uses Title Case.
- [ ] **No repetitive word prefixes**: Adjacent menu list labels do not repeat the same first word.
- [ ] **Selection indicators (non-color)**: Selected menu states display visual indicators beyond just text color changes.
- [ ] **Arrow keys navigation mapping**: Core menu lists utilize `[↑/↓]` arrow keys for focus moving instead of forcing tab sequences.
- [ ] **Tooltip on collapsed nav**: If navigation is collapsed to icons, focused items display corresponding tooltips with tooltips removable via `[Esc]`.
