# Notification

Source: [https://ds.nutanix.design/components/notification](https://ds.nutanix.design/components/notification)
React: `Notification`

---

## Overview

Toast notifications provide brief, non-blocking feedback about system operations in a small popup. They fill only the space required for the message, allowing the main screen content to remain fully visible and interactive.

---

## Usage & Slices

Use toast notifications immediately after system events or user actions that do not relate to a specific visual block on the active page.

- **Dark Notification theme**: The new dark notification (replaces the white one) is implemented on the core React library.
- **Legacy alert warning**: Avoid legacy notification boxes sliding under the header without full support.

---

## Positioning & Gaps

- **Location**: Position exactly **20px from the right** and **20px from the top** of the screen (under the main header).
- **Stacking**: Notifications stack vertically. Ensure a **10px gap** between stacked notifications, pushing older cards downwards.

---

## Severities & Colors

- **Task (Blue)**: Task initiated icon.
- **Critical (Red Alert)**: Critical alerts requiring immediate user concern.
- **Error (Red Failure)**: Standard operational failures and processing errors.
- **Success (Green)**: Operation completed successfully.

---

## Props & Behaviors

- **Timer (Auto Dismissal)**: By default, notifications should **automatically dismiss after 5 seconds**. Auto-dismiss can be disabled if critical attention is needed.
- **Actions Slots**: Supports up to **two button triggers** (one can be configured as an action dropdown).
- **Long message truncation**: By default, only the first **2 lines** of text are visible. Longer copy must hide behind an interactive expand button.

---

## Content Guidelines (Error Toast Formulation)

Write error messages using the formula:
`{problem} + {cause of error} + {solution}`

- **Do**:
  - Provide a direct action link/button to route the user to a solution page.
  - Be humble, clear, and explain the error as if talking aloud.
  - Disclose technical details progressively.
- **Don't**:
  - Use technical jargon or raw database error codes.
  - Use exclamation marks (`!`).
  - Blame the user or use negative words (e.g., use constructive text instead of `"Access denied"`).

---

## Accessibility

- **Icons compulsory**: Do not rely on background color alone to signal severity. Descriptive icons must always be present.
- **No Duplicate Alt Text**: Alt text is built into the icons. Do not repeat the status icon's alt text in the main body message of the toast.

---

## Compliance Checklist

- [ ] **Standard 5s Auto-dismiss**: Notifications automatically fade after 5 seconds by default.
- [ ] **Message formulation check**: Critical error toasts state what happened, why, and how to resolve it.
- [ ] **Maintains standard position**: Placed 20px from top/right with a 10px spacing gap.
- [ ] **No exclamation marks**: The message text contains no exclamation marks.
- [ ] **Visual status icons**: Color is accompanied by a severe/status icon.
- [ ] **Expand button on long text**: Messages longer than 2 lines use the expand disclosure pattern.
