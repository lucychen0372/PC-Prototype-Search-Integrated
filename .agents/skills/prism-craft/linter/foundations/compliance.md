# Design System Compliance

Source: [https://ds.nutanix.design/foundations/design-system-compliance](https://ds.nutanix.design/foundations/design-system-compliance)

---

## Overview

We establish this guide to smooth the friction around and post EC (Engineering Commit) when designs are marked as incompliant in various steps of the process. The most common issues arise when designs are marked non-compliant late during VD (Visual Design) and FnF (Fit and Finish) reviews, or when UI engineers request custom design system changes post handoff.

We strongly discourage any custom implementation in the product. Please try your best to stick to the design system and help contribute to it in a timely manner if gaps are identified.

---

## Timeline & Processes

### 1. As Soon as Possible

Always try to stick to already established components and patterns. If you need something that is not currently established, consult the visual designer on the project or reach out directly to the Design System team:

- Ahmed Elgamal (`ahmed.elgamal@nutanix.com`)
- Aditya Krishnan (`aditya.krishnan@nutanix.com`)
- Shreyas Bendre (`shreyas.bendre@nutanix.com`)

### 2. VD Reviews

This is your last checkpoint before engineering. Non-compliant patterns are called out here. If you need a new pattern, you must follow up with the design system team immediately.

### 3. Post Hand-Off & FnF Reviews

Changes here cause extreme friction. All design system additions go through multiple steps: design validation, accessibility reviews, engineering validation, implementation, and FnF reviews.

---

## How to Spot Non-Compliant Designs

### Detached Components & Styles

If you find yourself needing to detach a component or a style to slightly modify it, there’s a decent chance you are creating a non-compliant override.

### Implementation Alignment Markers (Figma Library 26.2+)

Make sure your design file is updated with the latest changes from the design library to see alignment markers:

- ⚠️ = Future component or variant (not yet available)
- 🛑 = Legacy component or variant (do not use)

### Visualizations & Charts

If a visualization is in your files but missing from the [Design Library for Visualizations](https://www.figma.com/design/XNpH8JZdAYA3KSwODFqmSA/Design-Library-for-Visualizations?node-id=0-1&p=f&t=GmEBf0dgO8h8k55D-11) or the [React charts link](http://prism-styleguide/charts/), it is non-compliant.
Today we only support four types of visualizations:

- Bar chart
- Donut chart
- Line chart
- Area chart

### Component Library Gap

If a component or variant is in your files but missing from the [PrismReactJS component library](http://prism-styleguide/v2/index.html#), it is non-compliant.

### Entity Browser React (EBR) Restrictions

EBR is a rigid layout that cannot be customized beyond certain limitations. Check a live PC instance for behavior, or view the [EBR spec doc](https://www.figma.com/design/qBs6e6dmaxnEalWiCp5Opi/Entity-Browser-React---EBR?node-id=3357-13763&p=f&t=uCBDwEKsr7xJcUiY-11).

**Filter Panel Constraints:** Custom filter types on a feature-by-feature level are not supported. The filter panel only supports:

- String
- Checkbox
- Numeric checkbox + custom range value
- Checkbox + custom date range
- Radio
- Dynamic search select
- Time range

**Layout Rigidity:** You cannot place custom elements in EBR rigid areas (e.g. between buttons and filter bar, above buttons, to the left of the table, etc.).

---

## Contribution & Requests

### File Request

To request a new component or variant, file a request on the [Design System Request Sheet](https://docs.google.com/spreadsheets/d/1VD2p-mArOjMcTDsNTb0TsyTJSrv_AFnBS6RbwVTrfd0/edit?gid=1451239004#gid=1451239004). You must:

- Provide supporting info and links.
- Define the component's complete behavior (including accessibility, themes, and color tokens).

_Note: Contributing code is an option to expedite requests. If approved, feature teams can provide their UI engineers to contribute directly to the Prism ReactJS library._
