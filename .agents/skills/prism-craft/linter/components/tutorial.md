# Tutorial

Source: [https://ds.nutanix.design/components/tutorial](https://ds.nutanix.design/components/tutorial)
React: `Tutorial`, `TutorialTip`

---

## Overview

The Tutorial component guides users through critical workflows, new features, or setup processes using structured popovers, visual indicators, or cursors.

---

## Usage & Sizing Constraints

- **Fixed Width**: The width of the tutorial popover is strictly fixed to **350px**. Do not increase it.
- **Height**: Keep the height as short as possible to prevent viewport occlusion.
- **Images/Illustrations**: The supported size for embedded images is strictly **310px x 310px**.
- **Header Title**: Provide a clear title in each popover to direct the user.

---

## Interruption Levels

- **Interruption Level 1**: Low friction. Popover overlays UI without adding any focus trap or underlay. Users can dismiss at any time.
- **Interruption Level 2**: Medium friction. Adds an underlay behind targeted elements to cover the rest of the screen. Forces keyboard focus and trap. Dismissible.
- **Interruption Level 3**: High friction. Adds focus-locked underlay. The user cannot dismiss it; completion of the sequence is required to close.

---

## Content Guidelines

- **Conciseness**: Show only **one action or piece of info per step**. Do not overload steps with multiple decisions or long explanations.
- **Sequence Labeling**:
  - Use the word `"Step"` only if the sequence is strictly ordered (e.g. `Step 1 of 5`).
  - If the content is informative and can be viewed out of order, use plain progression numbering instead (e.g. `1 of 5` or `1/5`).
- **Completion CTAs**: The final action button in the tutorial must use **"Got It"** or **"Done"** instead of "Next".

---

## Accessibility & Images

- **Decorative Images**: Any purely decorative illustrations must use null alt text (`alt=""`) to prevent screen reader noise.
- **Informative Images**: Provide meaningful `alt` text describing the image purpose if it conveys system information.

---

## Compliance Checklist

- [ ] **Popover Width (350px)**: Popover width does not exceed 350px.
- [ ] **Image Bounds (310x310px)**: Embedded image dimensions are strictly 310px x 310px.
- [ ] **Final Button Label**: The final button in a multi-step tutorial is labeled "Got It" or "Done" instead of "Next".
- [ ] **Single action per step**: Each popover contains only one instruction or key system detail.
- [ ] **Conditional "Step" text**: The word "Step" is excluded if the guide lacks a strict operational order.
- [ ] **Decorative alt rules**: Decorative assets use `alt=""`.
