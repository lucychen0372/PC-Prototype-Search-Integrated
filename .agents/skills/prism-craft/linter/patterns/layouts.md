# Layouts

Source: [https://ds.nutanix.design/patterns/layouts](https://ds.nutanix.design/patterns/layouts)

---

## Overview

Prism UI layouts are established exclusively using structured layout components. The use of custom styling wrappers, hardcoded margin offsets, or standard `<div>` wrappers for laying out structures is strictly forbidden.

---

## Core Layout Components

- **`<MainPageLayout>`**: Establishes the core template of a product page, wrapping the top header, the side navigation, and the content canvas.
- **`<NavBarLayout>`**: Standardized navigation bar structures.
- **`<StackingLayout>`**: Controls vertical arrangements. Gaps between stacked elements must be managed using the `itemGap` prop.
- **`<FlexLayout>`**: Controls horizontal arrangements, alignment, wrapping, and item spacing via the `itemGap` prop.
- **`<FlexItem>`**: Used to specify sizing behaviors (e.g. `flexBasis`) of individual children in a flex structure.

---

## Layout Check Rules

- [ ] **No layout `<div>` elements**: Verify that all structural grids and spacing use `FlexLayout` or `StackingLayout` instead of generic `div` blocks.
- [ ] **No custom spacing CSS**: Padding and spacing must use layout component props (`itemGap` and `padding`) instead of custom stylesheet rules.
- [ ] **Uniform Spacing Usage**: Layout gaps must use standardized semantic tokens (`XS`, `S`, `M`, `L`, `XL`, `XXL`).
- [ ] **Scroll Handling**: High-density elements must scroll within designated boundaries using `<Scrollbar>` or table inline frames instead of overflowing the page fold uncontrollably.
