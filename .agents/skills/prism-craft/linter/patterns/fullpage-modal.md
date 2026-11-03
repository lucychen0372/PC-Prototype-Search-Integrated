# FullPage Modal

Source: [https://ds.nutanix.design/patterns/fullpage-modal](https://ds.nutanix.design/patterns/fullpage-modal)

---

## Overview

A FullPage Modal represents an immersive overlay workflow that completely covers the parent page to help users concentrate on complex, multi-step configurations (such as VM Creation Wizards or cluster installations) without losing their primary workspace context.

---

## Core Guidelines

- **Immersive Content**: Use `<FullPageModal>` only for complex operations requiring multiple tabs, steps, or nested layouts.
- **Header & Title**: The modal must contain a structured header displaying the workflow title, subtitle (contextual state), and a prominent close button.
- **Standard Controls**: Placing action buttons (such as "Cancel", "Back", and "Create/Save") in a sticky footer layout to ensure they are always reachable.
- **Focus & Esc Close**: Must support closing via the Escape key and trap keyboard focus inside the active modal container for accessibility.

---

## Visual Linter Checklist

- [ ] **Aria Attributes**: The modal must include proper ARIA wrappers (`role="dialog"`, `aria-modal="true"`, and `aria-labelledby`).
- [ ] **Escape and Close Handler**: Verify that `closeOnEscape` is configured on the React wrapper and the close button maps to the `onClose` state.
- [ ] **No Unnecessary Overlays**: Confirm that nested dialogs inside a FullPage Modal are modeled as standard small modals or confirmation modals instead of stacking multiple full-page components.
- [ ] **Clean Footer Actions Alignment**: Action buttons must align to the bottom right of the page using `<FlexLayout justifyContent="flex-end" itemGap="S">`.
