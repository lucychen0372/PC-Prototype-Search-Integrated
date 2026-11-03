# Checkbox, Radio, Toggle

Source: [https://ds.nutanix.design/components/checkbox-radio-toggle](https://ds.nutanix.design/components/checkbox-radio-toggle)
React: `Checkbox`, `Radio`, `RadioGroup`, `Slider` (Toggle)

---

## Checkbox

Checkboxes allow users to select zero, one, or multiple options from a list of individual items.

- **States**: Selected, Unselected, Disabled, Indeterminate.
- **Nesting**: Supports parent-child checkbox hierarchy relationships (e.g., ticking parent checkbox selects all nested children).

---

## Radio

Radio buttons are used for mutually exclusive, single-choice options.

- **Usage**: Only one radio button can be selected at a time in a radio group.
- **Don't**: **Never** use radio buttons for multiple-choice selections. If a user can select more than one option, use Checkboxes.
- **States**: Selected, Unselected, Disabled.

---

## Toggle

Toggles are binary "on/off" switches that execute action states immediately.

- **Usage**:
  - Use **only** for binary actions.
  - Actions must execute immediately upon toggling.
- **States**: On, Off, Disabled.

---

## Accessibility

When displaying additional information, instructions, or subtexts for checkbox/radio groups:

- **Show Info Upfront**: **Always display supporting help text upfront/inline.**
- **Do NOT hide info in tooltips**: Hiding supporting details inside tooltips is heavily discouraged.
  - Hiding text reduces readability.
  - **Tooltips break keyboard focus order** inside checkbox or radio groups, making navigation highly inaccessible.
- **Exception**: You may place tooltips inside dense, space-constrained tables, but avoid them in standard forms.

---

## Compliance Checklist

- [ ] **Radio exclusivity**: Only one radio button can be checked at a time in a group.
- [ ] **No multiple selection on radios**: Multi-select options use Checkboxes instead of radio groups.
- [ ] **Binary toggles**: Toggle switches map to binary actions with immediate execution.
- [ ] **No tooltips for checkboxes**: Group instructions or checkbox metadata are displayed persistently inline instead of inside hover tooltips.
