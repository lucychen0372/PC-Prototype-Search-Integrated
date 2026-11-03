# Steps

Source: [https://ds.nutanix.design/components/steps](https://ds.nutanix.design/components/steps)
React: `Steps`, `StepItem`

---

## Overview

The Steps component provides a horizontal or vertical visual representation of progress through a sequence of connected stages or tasks, helping users understand where they are in a multi-step process.

---

## Anatomy & Variants

- **Step indicators & Labels**: Show the active, completed, and upcoming steps with numeric or icon-based indicators.
- **Orientations**: Horizontal (default) or vertical layout.
- **Navigation**: Sighted users can navigate backwards to already completed steps to make adjustments.

---

## Content Guidelines

- **Length**: Keep step labels short, ideally **2–3 words**. Avoid long phrases.
- **Casing**: Title Case (e.g., `Select Protection Domains`, `Run Prechecks`).
- **Punctuation**: Do **not** use punctuation at the end of step labels.
- **Action Consistency**: Be consistent in action phrasing. Either start all step labels with an action word, or use none. Avoid mixing action-led and noun-led steps in the same flow.
  - _Do_: `Select Protection Domains` | `Run Prechecks` | `Create Categories`
  - _Don't_: `Select Protection Domains` | `Prechecks` | `Create Categories`

---

## Accessibility & Responsiveness

- **Keyboard Interaction**:
  - Focus enters the listbox via `[Tab]`.
  - Use arrow keys `[↑/↓]` or `[←/→]` to move focus between steps.
  - Select a step using `[Enter]` or `[Space]`.
  - Focused steps with tooltips automatically display the tooltip content.
- **Status announcement**: Completed, active, and remaining step counts are programmatically announced.
- **Responsiveness**: Steps wrap by default. Use the condensed/mini steps component when content overflows single-line breakpoints.

---

## Compliance Checklist

- [ ] **Title Case step labels**: All steps are in Title Case.
- [ ] **Consistent action structures**: Step actions either all begin with action verbs or none do.
- [ ] **Short step lengths**: Step labels do not exceed 3 words.
- [ ] **No ending punctuation**: Step labels do not have ending punctuation.
- [ ] **Arrow keys navigation**: Key events map to standard arrow keys.
