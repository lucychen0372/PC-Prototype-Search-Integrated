# Input Forms

Source: [https://ds.nutanix.design/patterns/forms](https://ds.nutanix.design/patterns/forms)

---

## Validation Types

Forms must implement one of three distinct validation strategies based on workflow friction:

### 1. Inline Validation

- **How it Works**: Input is validated on the fly while typing. Errors/warnings are visually and programmatically announced using the warning/critical error variants of the input components.
- **Usage**: Good for instant feedback on strict syntax patterns (like passwords or IP formats).

### 2. onBlur Validation

- **How it Works**: Validates the input immediate when focus leaves the field (before full form submit).
- **Usage**: Catches errors early without interrupting active typing.

### 3. On-Submit Validation

- **How it Works**: Full form validation triggers on submit button click.
- **Feedback Loop**: Must follow a two-tier announcement:
  1. A high-level **alert banner** at the top summarizing form errors and helping redirect the user.
  2. Individual local validation errors announced on each input.
- **Submit Button Rule**: **Always keep the submit button enabled.** Sighted and screen-reader users need to be able to click submit to discover and process what errors need fixing. _Do not disable the submit button for form errors._

---

## Labels, Help Text & Sizing

### Help Text vs. Error Message

- **No Stacking**: An active error message must **replace** the help text (do not stack them on top of each other).
- **Layout Shifts**: Hiding the help text to show the error minimizes layout height shifting and cognitive noise.
- **Restore Rule**: As soon as the user starts typing inside an input with an active error, the local error clears and the standard help text is **restored immediately**.

### Required vs. Optional

- **Default State**: Most form fields are required by default.
- **Optional Highlight**: Highlight the label of any optional field explicitly using the word `(optional)` adjacent to the label.

### Accessibility

- Every input must have both a visible and a programmatic label.
- Any required formatting patterns or guidelines must be persistently visible.

---

## Sizing Tokens & Constants

- **Form Container Width**: `width-max-form` (**500px**).
- **Form Header-to-Form Gap**: `gap-XL` (**30px**).
- **Single vs. Pair Layouts**:
  - Use single-column layouts for spacious forms.
  - Pair related inputs side-by-side (e.g. First Name / Last Name) for high-density forms to reduce vertical scrolling.
- **Associated Tables Width**: `width-max-form` (500px). Custom wider tables must apply a uniform width across all tables in a flow.
- **Side Panel/Menus/Anchors Sizing**:
  - Width: `Container-S-pct`
  - Min Width: `Min-Container-S`
  - Max Width: `Max-Container-S`

---

## Compliance Checklist

- [ ] **No Disabling Submit Button**: The form submit button remains enabled even when fields contain invalid values.
- [ ] **Top-Level Banner on Submit Error**: On-submit failures display a top-level alert banner in addition to inline errors.
- [ ] **Error/Help Text Non-Stacking**: Inline error text replaces help text instead of stacking vertically.
- [ ] **Required/Optional Explicit Mark**: All optional fields are marked with `(optional)`.
- [ ] **Form Sizing Constraints**: Form container has maximum width of 500px, and gap from header to form is 30px.
- [ ] **Visible & Programmatic Labels**: Every input is associated with an explicit programmatic label (`aria-labelledby` or `htmlFor`).
