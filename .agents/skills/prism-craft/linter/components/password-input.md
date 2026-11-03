# Password Input

Source: [https://ds.nutanix.design/components/password-input](https://ds.nutanix.design/components/password-input)
React: `InputPassword`

---

## Overview

The Password Input component is a specialized input field designed specifically for secure entry of passwords and sensitive information, masking characters by default and offering a toggle to temporarily reveal them.

---

## Anatomy & Requirements

- **Show/Hide Toggle**: Sighted and screen-reader users must be able to focus, tab to, and activate the reveal toggle.
- **Label**: Explicit programmatic label is required.
- **Persistent Requirements**: Display password complexity guidelines **persistently and upfront**, before validation begins. **Never hide guidelines inside placeholders or wait for an error state to display requirements.**
- **Validation Messages**: Error alerts must clearly specify and highlight which complexity requirements have not been met.

---

## Accessibility

- Do **not** rely on color alone to indicate invalid password criteria. Use descriptive warning text and status icons.
- Ensure proper focus management when users trigger the show/hide password text toggle.

---

## Compliance Checklist

- [ ] **Persistent guidelines display**: Complexity guidelines are permanently visible beneath the input field, not hidden inside placeholder text.
- [ ] **Connected label**: Form label is connected programmatically to the password field.
- [ ] **No color-only errors**: Validation errors use status icons alongside red text.
- [ ] **Keyboard-accessible toggle**: Sighted and screen-reader users can focus and toggle the show/hide button via keyboard.
