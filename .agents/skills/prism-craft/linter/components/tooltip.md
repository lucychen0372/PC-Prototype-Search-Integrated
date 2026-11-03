# Tooltip

Source: [https://ds.nutanix.design/components/tootlip](https://ds.nutanix.design/components/tootlip)
React: `Tooltip`, `Popover`

---

## Overview

Tooltips are floating, non-disruptive contextual labels that describe or add supporting information when users hover over, focus on, or tap an interactive element.

---

## Slices & Caret Rules

- **Caret Default (Figma Library 25.8+)**: **By default, tooltip carets must be hidden.**
  - _Exception_: You can show the caret in special cases where there is no clear visual indicator on hover for the triggering element.
- **Spacing**: Leave exactly **10px** between the trigger component and the tooltip body/caret bounds.
- **Alignment**: Align the tooltip container to the top, bottom, left, or right of the trigger to prevent it from covering important screen data or bleeding off the viewport.
- **Transition Delay**: Tooltips support an optional **300ms transition delay**. This is highly recommended on truncation-heavy components (like tables) to prevent accidental hover triggers while scrolling.

---

## Tooltip Themes & Variants

- **Light Tooltip / Light Tooltip + Title [RECOMMENDED]**: Standard theme. Matches the clean visual extensions of the design system and supports theming logic.
- **Dark Tooltip [DEPRECATED]**: Heavy inverse dark tooltips are deprecated. They contradict theming logic and degrade brand extensibility. Avoid them unless used within header nav elements.

---

## Content Guidelines

Tooltips provide clarity, definitions, or help text. They must **never** be used to hide information that is critical for the user to complete a task.

- **Casing**: Both the header title and the description use **sentence case**. Keep proper nouns capitalized.
- **Punctuation**: No ending periods for short fragments or titles. Complete description sentences require standard periods. Do not use exclamation marks (`!`), ellipses (`…`), or rhetorical questions (such as `"Did you know?"`).
- **Words to avoid**: `Please`, `successfully`, `oops`, `sorry`, `uh-oh`, `something went wrong`, `you shall`, `you can`, `did you know?`.

### Message Structures:

1. **Normal Tooltip**: Explains why an action is disabled or provides helper info.
   - _Example (Disabled action)_: `Configure at least one VLAN to enable network segmentation`
2. **Title Tooltip**: For onboarding walkthroughs and feature introductions requiring both a heading and a description.
   - _Example_:
     - _Heading_: `Choose inventory type`
     - _Description_: `Run 'Full Inventory' for a complete check. Use 'Targeted Inventory' to scan specific parts of the cluster faster.`

---

## Accessibility & Popovers

- Tooltips must never obscure active focus or critical screen data.
- **No Interactive Content in Tooltips**: Hover tooltips must not contain links or buttons. Hovering makes them inaccessible to keyboard users. If links/buttons are required, use a **Popover** component instead.
- Sighted keyboard users must be able to dismiss an active tooltip via the `[Esc]` key.
