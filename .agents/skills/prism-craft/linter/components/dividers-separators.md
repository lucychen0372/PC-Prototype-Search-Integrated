# Dividers & Separators

Source: [https://ds.nutanix.design/components/dividers-separators](https://ds.nutanix.design/components/dividers-separators)
React: `Divider`, `Separator`

---

## Overview

Dividers and separators are horizontal or vertical lines used to visually isolate content sections, establish relationships between layouts, and improve scannability.

---

## Types

- **Divider**: A full-width horizontal line spanning the entire container width. Used to separate major sections with distinct purposes or meanings.
  - Typical thickness: 1px.
  - Color: `--color-border-separator`.
- **Separator**: A shorter, customizable horizontal line used to distinguish small content elements.
- **Vertical Separator**: Used to separate elements arranged horizontally.
- **Color Variables**:
  - Default: `--Separator` (CSS: `var(--color-border-separator)`)
  - Grey background: `--Separator-Contrast` (CSS: `var(--color-border-separator-contrast)`)

---

## Guidelines & Whitespace Alternative

- **Do's**:
  - Use dividers to separate distinct content sections that are understandable on their own.
  - Use them intentionally to reinforce hierarchical structures.
- **Don'ts**:
  - Do **not** overuse dividers; excessive lines create visual clutter.
  - Do **not** use dividers to compensate for weak structural layouts or bad labeling.
  - Do **not** place dividers between closely related text lines.
- **Whitespace First**: When elements are closely related, prefer **whitespace/padding** over physical dividers. This maintains a clean visual flow without adding cognitive load.

---

## Accessibility

- **Hide from Screen Readers**: Since dividers are purely decorative elements, they **must be hidden from screen readers** using `aria-hidden="true"` or implemented as CSS pseudo-elements.
- **Color Contrast**: Maintain a minimum **3:1 contrast ratio** between the divider line and its container background.
- **No Semantic Replacement**: Do not use dividers as a replacement for logical heading/outline structures.
