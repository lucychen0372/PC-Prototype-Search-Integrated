# Progress

Source: [https://ds.nutanix.design/components/progress](https://ds.nutanix.design/components/progress)
React: `Progress`, `DonutLoader`

---

## Overview

The Progress component visually represents the completion of a system task or process, showing how much has been completed and how much is remaining.

---

## Usage Guidelines

- **Progress Bar**: Use standard horizontal bars when you can programmatically determine the exact percentage of completion.
- **Donut Progress**: Circular loader used in compact areas or layouts requiring higher visual density.
- **Icon Progress**: A mini circular percentage indicator used when space is extremely restricted.

---

## Anatomy & Variants

1. **Label Text (Optional)**: Informs the user what operation is running.
2. **Value (Optional)**: Displays completion percentages or data ratios.
3. **Semantic States**: Use success (green), warning (yellow), or error (red) status colors accompanied by corresponding status icons.

---

## Accessibility

- **Do Not Rely on Color Alone**: Always accompany progress indicators (bars, donuts, icons) with explicit textual values or progress ratios so that color blind and screen reader users can comprehend completion states.
- **Dynamic Announcements**: Ensure task progression is announced to screen readers.

---

## Compliance Checklist

- [ ] **Always include text value**: Progress bars/donuts are accompanied by visible percentage or ratio text.
- [ ] **Bar for deterministic states**: Infinite spin loaders are not used for tasks where the percentage completed is known.
- [ ] **Icons on semantic failure/warnings**: Red or yellow progression states display adjacent descriptive status icons.
