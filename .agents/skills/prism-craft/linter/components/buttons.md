# Buttons

Source: [https://ds.nutanix.design/components/buttons](https://ds.nutanix.design/components/buttons)
React: `Button`, `ButtonGroup`

---

## Overview

Buttons trigger events or actions upon click/tap.

---

## Usage & Weights

- **Sizing Constraints**: Minimum button width is strictly **72px**.
- **Button Groups Spacing**: Spacing between buttons in a group is strictly **10px** (`itemGap="S"`).
- **Primary Buttons (Blue)**: Calls for action. Only use **one primary action per page/workflow** to highlight the highest-priority goal.
- **Text Buttons**: Lowest priority actions.
  - Links adjacent to normal body text must be underlined (using the `table-nav-primary` variant).
  - Isolated text buttons or those with adjacent icons do not require underlines.

---

## Button Group Specifics

- Use **secondary buttons** inside ButtonGroups.
- Programmatic properties: developers must configure `noBackgroundFade={true}` and `separator="inset"`.

---

## Content Guidelines (Writing CTAs)

A Call To Action (CTA) must be a prompt telling users exactly what to do next.

- **Structure**: `{verb} + {noun}` (e.g., `View Usage`, `Create Policy`). The verb indicates action, and the noun provides expectations. Avoid vague single-word CTAs like "View" or "OK".
- **Casing**: **Title Case** for CTAs. Keep proper nouns capitalized. Connectors (e.g. `and`, `to`, `for`, `with`) remain in sentence case (lowercase).
- **Punctuation**: Do **not** use punctuation (periods, exclamation marks) in CTA button text.
- **Placement**: Place the Primary CTA on the right, and the Secondary CTA on the left in wizard journey pages and confirmation footers.
- **Create vs. Add**:
  - Use **Add** when inserting into an existing collection (e.g. `Add Disk`).
  - Use **Create** when fabricating a new object from scratch (e.g. `Create Volume Group`).

---

## Accessibility & Interaction

- **Disabled Buttons**: Disabled buttons are non-focusables by default. If you must display a hover tooltip explaining why the button is disabled, configure `aria-disabled={true}` instead of `disabled` to preserve keyboard focusability.
- **Icon Only Buttons**: Icon-only buttons are discouraged. If used, you **must provide an `aria-label`** describing the action for screen readers and display an on-hover tooltip.
- **Buttons vs. Links**: Text buttons complete actions (e.g., `Add Category`), while Links are reserved for navigational URLs. Do not mix their semantic elements.

---

## Compliance Checklist

- [ ] **Max 1 primary button**: Only one primary action is present in a single view context.
- [ ] **CTA Case (Title Case)**: CTA buttons are written in Title Case.
- [ ] **CTA Phrasing Verb+Noun**: Button copy uses the {verb} + {noun} structure (e.g. `Add Disk`, not `OK` or `Add`).
- [ ] **Button Groups Gaps**: Multi-button groups use 10px spacing.
- [ ] **No punctuation in CTA**: CTA button text contains no ending punctuation.
- [ ] **Icon-only aria labels**: Icon-only buttons have explicit `aria-label` and matching tooltips configured.
- [ ] **Create vs. Add usage**: Phrasing uses "Add" for existing sets and "Create" for new objects.
