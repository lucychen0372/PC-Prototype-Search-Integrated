# Design Tokens

Source: [https://ds.nutanix.design/foundations/design-tokens](https://ds.nutanix.design/foundations/design-tokens)

---

## Introduction

Design tokens are the foundational elements of our design system that store visual design attributes. They maintain visual consistency across platforms and support dynamic switching between themes (**Light**, **Dark**, and **High Contrast**).

---

## Color Token Hierarchy

Our color tokens follow a three-tier hierarchical structure:

1. **Global Tokens**: Represent raw color values (e.g., `color.blue.500`). These should **never** be used directly in components.
2. **Semantic Tokens**: Convey purpose rather than visual attributes (e.g., `color.background.primary`, represented in CSS as `var(--color-background-primary)`). **Always prefer semantic tokens.**
3. **Component Tokens**: Specific to individual components (e.g., `button.background.primary`).

---

## Token Naming Convention

All design tokens follow this pattern:
`{category}.{concept}.{property}.{scale/state}`

In CSS, they map directly to lowercase CSS variables:
`--{category}-{concept}-{property}-{scale/state}` (e.g. `var(--color-background-primary)`)

---

## Complete Token Reference

### 1. Text Color Tokens

Used for rendering typography and icons. (Excludes hover and active states).

| Token Variable                         | Purpose & Example Usage      |
| -------------------------------------- | ---------------------------- |
| `color-text-primary-label`             | Modal title, section title   |
| `color-text-primary-interactive`       | Secondary button             |
| `color-text-primary-paragraph`         | Onboarding, modal paragraphs |
| `color-text-secondary-label`           | Input label                  |
| `color-text-secondary-interactive`     | Tab, view switcher           |
| `color-text-secondary-paragraph`       | Onboarding, modal paragraphs |
| `color-text-tertiary-label`            | Info icon                    |
| `color-text-tertiary-interactive`      | Input placeholder            |
| `color-text-tertiary-paragraph`        | Paragraphs                   |
| `color-text-inverse`                   | Primary button text          |
| `color-text-info-primary`              | Info banner                  |
| `color-text-link`                      | Link text, link icon         |
| `color-text-info-success`              | Success banner text          |
| `color-success`                        | Success text, success icon   |
| `color-text-info-warning`              | Warning banner text          |
| `color-text-warning-icon`              | Warning icon                 |
| `color-text-warning`                   | Warning text                 |
| `color-text-info-error`                | Error or Alert banner text   |
| `color-text-error`                     | Error text, error icon       |
| `color-text-destructive`               | Destructive text, icon       |
| `color-text-nav-title`                 | Header title                 |
| `color-text-nav-primary-interactive`   | Header link, input text      |
| `color-text-nav-primary-paragraph`     | Paragraph text               |
| `color-text-nav-secondary-interactive` | Secondary links, icon        |
| `color-text-nav-secondary-paragraph`   | Secondary paragraph text     |
| `color-text-nav-primary-label`         | Input label icon             |
| `color-text-nav-secondary-label`       | Input label icon             |
| `color-text-nav-placeholder`           | Input placeholder            |
| `color-text-nav-info-primary`          | Nav menu tag                 |

---

### 2. Border Color Tokens

Used for components borders, separators, and focuses. (Excludes hover and active states).

| Token Variable                              | Purpose & Example Usage                           |
| ------------------------------------------- | ------------------------------------------------- |
| `color-border-separator`                    | Horizontal separator, table separator             |
| `color-border-separator-contrast`           | Vertical separator, second level line             |
| `color-border-interactive`                  | Button, input field, usually paired with base-alt |
| `color-border-small-elements`               | Checkboxes, radios, toggles                       |
| `color-border-overlay`                      | Tooltips, dropdown menus                          |
| `color-border-dark-tooltip`                 | Tooltips that are dark in both themes             |
| `color-border-active`                       | Active input field                                |
| `color-border-primary-button-separator`     | Primary button group separator                    |
| `color-border-focus`                        | Focus states                                      |
| `color-border-success`                      | Success state borders                             |
| `color-border-warning`                      | Warning input field border                        |
| `color-border-error`                        | Error input field border                          |
| `color-border-destructive-button-separator` | Destructive button group separator                |
| `color-border-nav-active`                   | Active search                                     |
| `color-border-nav-separator`                | Separators in navigation                          |
| `color-border-nav-separator-active`         | Active menu item separator                        |
| `color-border-nav-overlay`                  | Header search menu                                |

---

### 3. Background Color Tokens

Used for layouts, fields, badges, and feedback components. (Excludes hover and active states).

| Token Variable                      | Purpose & Example Usage                         |
| ----------------------------------- | ----------------------------------------------- |
| `color-background-base`             | Button, input, table placed on body or base-alt |
| `color-background-base-alt`         | Button, input, table placed on base             |
| `color-background-body`             | Page background                                 |
| `color-background-neutral-selected` | Active view switcher tab                        |
| `color-background-secondary`        | Secondary backgrounds                           |
| `color-background-tertiary`         | Tertiary backgrounds                            |
| `color-background-inverse`          | Slider handle                                   |
| `color-background-base-expanded`    | Expanded row, table filter background           |
| `color-background-info-neutral`     | Neutral tag, neutral step badge                 |
| `color-background-small-elements`   | Checkbox, radio, toggle background              |
| `color-background-modal-underlay`   | Backdrop underlay for Modals                    |
| `color-background-dark-tooltip`     | Dark tooltips in both themes                    |
| `color-background-base-active`      | Selected side menu page                         |
| `color-background-info-primary`     | Banner, label, completed step                   |
| `color-background-primary`          | Primary button, primary badge                   |
| `color-background-focus`            | Focus states                                    |
| `color-background-info-success`     | Banner, tag                                     |
| `color-background-success`          | Success badge                                   |
| `color-background-info-warning`     | Banner, tag                                     |
| `color-background-warning`          | Warning badge                                   |
| `color-background-info-error`       | Banner, tag                                     |
| `color-background-error`            | Error badge                                     |
| `color-background-destructive`      | Destructive button background                   |
| `color-background-nav-base`         | Header background                               |
| `color-background-nav-base-alt`     | Search background                               |
| `color-background-nav-base-active`  | Selected nav menu item                          |
| `color-background-nav-primary`      | Primary nav menu badges                         |
| `color-background-nav-success`      | Success nav menu badges                         |
| `color-background-nav-warning`      | Warning nav menu badges                         |
| `color-background-nav-error`        | Error nav menu badges                           |
| `color-background-nav-info-primary` | Nav menu tag                                    |

---

### 4. Opacity Tokens

Used to handle disabled states, underlays, and loading states.

| Token Variable             | Percentage / Purpose                  |
| -------------------------- | ------------------------------------- |
| `opacity-disabled`         | **50%** - Disabled components         |
| `opacity-modal-underlay`   | **40%** - Modal, tutorial underlay    |
| `opacity-fade-30`          | **30%** - General faded overlays      |
| `opacity-fade-50`          | **50%** - General faded overlays      |
| `opacity-loading-underlay` | Loading indicator background overlays |

---

### 5. Shadow Tokens

Used to convey elevation and hierarchy.

| Token Variable             | Purpose & Example Usage  |
| -------------------------- | ------------------------ |
| `shadow`                   | Popovers, dropdown menus |
| `shadow-right`             | Left side fixed columns  |
| `shadow-left`              | Right side fixed columns |
| `shadow-top`               | Sticky footers           |
| `inner-shadow-input-focus` | Focused input fields     |

---

## Theme Adaptability

The system supports three main themes:

- **Light**
- **Dark**
- **High Contrast**

All token values dynamically adapt based on the active theme wrapper context.

---

## Figma Variables vs Styles

When reviewing designs or visual specs:

- **Figma Variables (Recommended)**: Represent single token values (colors, spacing, typography, border-radius, shadows, opacities) and adapt dynamically to themes.
- **Figma Styles**: Combine multiple properties into static, non-adaptive presets (only used for complex typography formatting or legacy designs). Always ensure components are mapped to dynamic variables rather than static styles.

---

## Visual Linter Checklist

- [ ] **No Hardcoded Hex/RGB/HSL values**: All colors must resolve to CSS variable tokens.
- [ ] **Correct Token Category Applied**: Text uses `color-text-*`, borders use `color-border-*`, backgrounds use `color-background-*`.
- [ ] **No Global Token Usage**: Component code must not reference primitive raw values (like `color.blue.500`). It must use semantic variables.
- [ ] **Consistent Contrast & Sizing**: Ensure opacity and shadows conform to standard opacity and shadow tokens.
- [ ] **Theme Switch Readiness**: Confirm that no static visual overrides exist that would break switching between Light, Dark, and High Contrast.
