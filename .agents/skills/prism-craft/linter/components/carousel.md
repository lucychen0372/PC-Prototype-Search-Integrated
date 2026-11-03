# Carousel

Source: [https://ds.nutanix.design/components/carousel](https://ds.nutanix.design/components/carousel)
React: `Carousel`

---

## Overview

The Carousel component cycles through a sequence of related content slides within a single, space-efficient viewport.

---

## Sizing & Slices Limit

- **Maximum Tabs Limit**: Do **not use more than 6 tabs/slides** inside a carousel. If more than 6 slots are required, consider a different UI paradigm (such as a paginated list or grid).
- **Physical Hard Cap**: The component supports a maximum of **9 slides** at any single time.

---

## Variants & Anatomy

- **Autoplay**: Sets a customizable cyclic duration timer. When activated, a **play/pause control button must be rendered** adjacent to the progress tabs.
- **Inside/Overlay Tabs & Chevrons**: Navigation controls are placed inside the viewport when cycling visual promotional banners.
- **Outside Tabs & Chevrons**: Controls are rendered outside the content box when showing interactive UI elements (e.g. form widgets or dashboard controls).

---

## Content Guidelines

- **Casing**:
  - Carousel main header uses **Title Case**.
  - Child description headlines and copy use **sentence case**.
- **Punctuation**: Do not use ending periods for short phrases or title headers. Use punctuation only in full-length description paragraphs.
- **Independence**: Each slide's content must stand on its own. Do not split a single sentence across multiple slides.
- **Sequence wording**: Use the word "Step" (e.g. `Step 1 of 5`) **only** if the carousel mandates a strict, sequential order of execution. If slides are purely informational, use standard progression indicators (`1 of 5`).

---

## Accessibility & Contrast

- **Play/Pause Button**: Must be visible if autoplay is enabled. This prevents visual distractions and gives users with motor/cognitive disabilities ample reading time.
- **Indicator Contrast**: For overlaid/inside tabs, designers and engineers must ensure a **minimum contrast ratio of 3:1** between the tabs and the slide backgrounds. (e.g. Use a solid `--color-background-base` underlay instead of transparent variables if slide contrast falls short).

---

## Compliance Checklist

- [ ] **Max 6 slides recommendation**: Carousel contains 6 or fewer slides.
- [ ] **Autoplay play/pause control**: Autoplay carousels have an explicit play/pause button next to the tabs.
- [ ] **No mid-sentence splits**: A sentence is never split across multiple slides.
- [ ] **Contrast ratio (3:1)**: High contrast exists between indicators (tabs/chevrons) and backgrounds.
- [ ] **Conditional "Step" labeling**: The word "Step" is excluded if slides do not require sequential completion.
- [ ] **No period on titles**: Slider title headers do not end with periods.
