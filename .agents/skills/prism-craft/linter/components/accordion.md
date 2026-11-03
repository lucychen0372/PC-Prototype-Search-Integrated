# Accordion

Source: [https://ds.nutanix.design/components/accordion](https://ds.nutanix.design/components/accordion)
React: `Accordion`

---

## Overview

The Accordion component is used to show and hide vertical sections of content to keep user interfaces clean and organized.

---

## Usage Guidelines

- **Use cases**:
  - Show/hide optional, advanced, or less critical information blocks.
  - Group and organize a large number of sections when space is tight.

---

## Anatomy

1. **Title + Chevron**: The entire header area functions as the click target to expand or collapse the panel.
2. **Extra Header Content**: Supplementary inline details or controls (e.g., status badges, action links) that remain persistently visible even when the accordion is collapsed.

---

## Variants & Customization

### 1. Title

- Title typography styles can be customized to match adjacent section headers on the parent page.

### 2. Chevron

- **Positioning**: Supports Right, Left, or Far Right positions. Keep the chevron position consistent within a user flow; do **not** mix different chevron alignments on the same page.
- **Visual Style**: The blue circle chevron style is heavily recommended. Avoid other custom chevron visual indicators unless strongly justified.

### 3. Padded Accordions

Padded accordions provide higher separation and visual weight. Align backgrounds with parent container colors:

- Placed on `color-background-body`: Use `color-background-base` background.
- Placed on `color-background-base`: Use `color-background-body` background.
- Placed on `color-background-base-alt`: Use `color-background-base` background + `color-border-separator` border.

### 4. Extra Header Content Height

- Ensure any elements placed in the extra header space are equal to or shorter than the height of the main title text to avoid vertical misalignment.

---

## Do's & Don'ts (Nesting Accordions)

- **Nesting accordions is highly discouraged**. It creates deep, confusing progressive drills that degrade usability.
- Accordions are section-hiders, not parent structural layers. If deep nesting is required, rethink the page layout.

---

## Compliance Checklist

- [ ] **No nested accordions**: Ensure accordion contents do not contain nested child accordions.
- [ ] **Chevron consistency**: Chevron positions (Left, Right, Far Right) are uniform across all panels in the layout.
- [ ] **Blue circle chevron**: Standard blue circle chevron style is applied.
- [ ] **Balanced extra header height**: Extra header elements do not exceed the height of the main title.
- [ ] **Adaptive padded backgrounds**: Background colors conform to standard parent body/base container rules.
