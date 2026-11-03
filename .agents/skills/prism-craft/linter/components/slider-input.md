# Slider Input

Source: [https://ds.nutanix.design/components/slider-input](https://ds.nutanix.design/components/slider-input)
React: `Slider`

---

## Overview

The Slider component allows users to select a single numerical value or a range by dragging a handle along a horizontal track.

---

## Accessibility & Layout Constraints

- **Input Suffix Requirement**: **Always include a numeric input field adjacent to the slider.**
  - This ensures keyboard-only accessibility (keyboards cannot drag handles).
  - It satisfies standard target size and non-dragging interaction requirements.
- **Labels**:
  - Always provide a visible, programmatically connected label.
  - **Range Sliders**: Include a visible label for **each** of the input boxes in a range slider.
  - **Increments**: Display the increment step values directly within the labels or scale markers.
