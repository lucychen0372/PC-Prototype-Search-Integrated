# Input Field

Source: [https://ds.nutanix.design/components/input-field](https://ds.nutanix.design/components/input-field)
React: `Input`, `TextInput`, `CodeInput`, `InputAddon`

---

## Overview

Input fields allow users to enter, modify, and search for textual information in forms.

---

## Suffixes & Prefixes Guidelines

- **Interactive Suffixes**: Suffixes and prefixes cannot be used as dependent elements that alter the state of the main input.
- **Dependency Rule**: If there are dependencies that change the input field context, split the dependencies into separate, standard input components.

---

## Validation & States

- **No Stacking Help Text**: Active validation error messages must **replace** the help text rather than stacking vertically under the input (prevents layout shifts).
- **Inline Validation Deprecated**: Visual validation-on-the-fly _while typing_ is deprecated due to accessibility gaps. Real-time typing validation is confusing for screen-reader and motor-impaired users. _Use onBlur or onSubmit validation instead._
- **Truncation Discouraged**: Validation or error messages under the field must wrap instead of truncating with ellipses.

---

## Disabled vs. Readonly

| Attribute    | Visual Contrast | Screen Readers | Focusable | Select & Copy | Form Submit |
| ------------ | --------------- | -------------- | --------- | ------------- | ----------- |
| **Disabled** | Low Contrast    | Invisible      | No        | No            | No          |
| **Readonly** | High Contrast   | Visible        | Yes       | Yes           | Yes         |

### Usage Criteria:

- Use **Disabled** ONLY when you do not want the user to interact with the field at all, or when there is no content/value present.
- Use **Readonly** when users need to read, highlight, and copy the content, or when the value should still submit with the form without modification.

---

## Content Guidelines (Writing for Input Fields)

Every input consists of a combination of three sub-components: Field Label, Input Field (with placeholder text), and Help/Inline Text.

### 1. Field Label

- **Structure**: Write **only** the field name. Do **not** add an action word (e.g. "Enter").
- **Casing**: Title Case.
  - **Do**: `Cluster Name`
  - **Don't**: `Enter Cluster Name`

### 2. Placeholder Text

- **Structure**:
  - In standard forms: `Enter` + `[Field Label]`.
  - In searchable dropdowns: `Search list`.
- **Casing**: sentence case.
  - **Do**: `Enter cluster name`

### 3. Help Text & Inline Errors

- **Structure**: Concise, clean instructions showing formats or constraints.
- **Casing**: sentence case.
- **Punctuation**: No period for short fragments. Use full periods only if it is a complete sentence.
  - **Do**: `Cluster name must contain 3–63 characters and can include letters, numbers, and hyphens.`
- **Error Messages Formula**:
  - Manual inputs: `Enter a valid [field name]`
  - Dropdowns: `Select a [field name]`
  - **Do**: `Enter a valid cluster name`
  - **Don't**: `Invalid cluster name entered.`

---

## Compliance Checklist

- [ ] **No action words in labels**: Labels contain only nouns (e.g. `User Name`, not `Enter User Name`).
- [ ] **Standard placeholder format**: Form field placeholder reads `Enter [field label]` in sentence case.
- [ ] **Error replaces helper**: Active inline error replaces the help text.
- [ ] **Readonly vs. Disabled**: Fields whose values are submitted with forms are marked as `readOnly` instead of `disabled`.
- [ ] **Proper error messaging**: Custom error messages follow the friendly format `Enter a valid [field name]`.
- [ ] **Visible & persistent requirements**: Technical rules (like length bounds) are persistently visible in helper text, not hidden in placeholders.
