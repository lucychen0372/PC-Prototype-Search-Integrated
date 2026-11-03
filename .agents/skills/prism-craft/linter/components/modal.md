# Modal

Source: [https://ds.nutanix.design/components/modal](https://ds.nutanix.design/components/modal)
React: `Modal`, `ModalContent`, `ModalHeader`, `ConfirmModal`, `FullPageModal`

---

## Overview

Modals present critical, temporary context or request immediate response. Use sparingly to limit workflow disruption.

---

## Anatomy & Sizing

- **Anatomy**: Contains a Header (Title, icons), Content Area, Footer (Primary and Secondary CTA buttons), and an overlay backdrop.
- **Standard Sizing**: Standard modals must use a maximum width of **500px** (`width-max-form`).
- **Footer Sticky Behavior**:
  - **Floating (Default)**: Footer buttons remain close to the content bounds.
  - **Fixed (Overflowing)**: If form content overflows the viewport height, the footer automatically sticks to the bottom of the page so action buttons remain visible at all times.

---

## Modal Categories

### 1. FullPage Modal

Immersive full-screen overlay for complex tasks, wizards, or data visualizations.

### 2. Confirmation Modal

Standard dialog used to confirm critical decisions or alert actions.

- **Text Alignment**: Title/description are center-aligned by default, but automatically switch to left-align when multi-line text is rendered.

---

## Content Guidelines (Writing for Modals)

- **Casing**:
  - FullPage Modals: Title in **Title Case**, description in **sentence case**.
  - Confirmation Modals: Both Title and description in **sentence case**.
  - Action buttons/CTAs: Always in **Title Case**.
- **Punctuation**: No ending periods for short titles or button labels. Complete sentences in description paragraphs require standard periods. Do **not** use exclamation marks (`!`), ellipses (`…`), or ending question marks (`?`).
- **Words to avoid**: `Please`, `successfully`, `oops`, `sorry`, `uh-oh`, `something went wrong`, `you shall`, `you can`.

---

## Structure of Confirmation Modals

- **Title**: Explicitly define the action being confirmed. Align the title phrasing with the primary CTA text.
  - **Heavily Forbidden**: **Never ask "Are you sure?"** in modal titles. This reduces accessibility, lacks context, and sounds unprofessional.
- **Description**: State what will happen (and if it is irreversible).
- **Primary CTA**: Action verb confirming the choice (e.g., `Delete`).
- **Secondary CTA**: Standard dismiss button (labeled `Cancel`).

### Scenario Example (Deleting external storage):

- **Title**: `Delete external storage Dell PF 1`
- **Description**: `If you continue with the delete, this storage configuration cannot be recovered.`
- **Primary CTA**: `Delete`
- **Secondary CTA**: `Cancel`

---

## Accessibility

- **Focus Management**:
  - Opening the modal must trap keyboard focus inside.
  - Tab order must logically move from top-to-bottom and left-to-right.
  - Pressing `[Esc]` must close the modal.
  - Closing the modal must return focus back to the triggering page button. If the trigger button no longer exists, move focus to the adjacent element.

---

## Compliance Checklist

- [ ] **No "Are you sure?" titles**: Confirmation titles describe the exact action (e.g. `Delete external storage Dell PF 1`, not `Are you sure?`).
- [ ] **Standard sizing constraint**: Normal modals do not exceed 500px maximum width.
- [ ] **Proper punctuation**: Modal titles contain no question marks, ellipses, or exclamation marks.
- [ ] **CTAs in Title Case**: Bottom action buttons are written in Title Case.
- [ ] **Keyboard escape enabled**: Pressing `[Esc]` closes the modal dialog.
- [ ] **Confirmation sentence case**: Confirmation titles and descriptions use sentence case.
