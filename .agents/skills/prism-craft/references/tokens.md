# Design Tokens

Source: `@nutanix-core/prism-ui-themes-common`. All tokens auto-switch light/dark.

Usage: `var(--<token-name>)` in CSS. Never hardcode hex values.

## Figma Style -> CSS Token Cross-Reference

| Figma Style                 | Figma Alias                     | CSS Token                          |
| --------------------------- | ------------------------------- | ---------------------------------- |
| `greyDark`                  | `themeTextColorPrimary`         | `--color-text-primary-label`       |
| `greyDarkLighten4`          | `themeTextColorSecondary`       | `--color-text-secondary-label`     |
| `greyLightDarken2`          | `themeTextColorDisabled`        | `--color-text-tertiary-label`      |
| `purple`                    | `themeBrandPrimary`             | `--color-background-primary`       |
| `white`                     | `themeBgPrimary`                | `--color-background-base`          |
| `greyLightLighten5`         | `themeBgSecondary`              | `--color-background-base-hover`    |
| `greyLight`                 | `themeBgNeutral`, `themeBorder` | `--color-border-separator`         |
| `purpleDarken4`             | `themeBgAppHeader`              | `--color-background-nav-base`      |
| `red`                       | `themeError`                    | `--color-background-error`         |
| `green`                     | `themeSuccess`                  | `--color-background-success`       |
| `yellow`                    | `themeWarning`                  | `--color-background-warning`       |
| `borderColorDefault`        | --                              | `--color-border-interactive`       |
| `itemHoverBackgroundColor`  | --                              | `--color-background-base-hover`    |
| `itemActiveBackgroundColor` | --                              | `--color-background-base-selected` |

## Text Colors

| Token                            | Usage                    | Light     |
| -------------------------------- | ------------------------ | --------- |
| `--color-text-primary-label`     | Headings, primary labels | `#15171a` |
| `--color-text-primary-paragraph` | Body text                | `#15171a` |
| `--color-text-secondary-label`   | Subtitles, secondary     | `#37414b` |
| `--color-text-tertiary-label`    | Hints, placeholders      | `#586678` |
| `--color-text-inverse`           | Text on dark bg          | `#ffffff` |
| `--color-text-link`              | Links                    | `#1b6dc6` |
| `--color-text-error`             | Error text               | `#d02550` |
| `--color-text-success`           | Success text             | `#15792e` |
| `--color-text-warning`           | Warning text             | `#a85400` |
| `--color-text-destructive`       | Destructive actions      | `#d02550` |

## Background Colors

| Token                                  | Usage              | Light     |
| -------------------------------------- | ------------------ | --------- |
| `--color-background-base`              | Page surface       | `#ffffff` |
| `--color-background-base-alt`          | Cards              | `#ffffff` |
| `--color-background-base-hover`        | Hover state        | `#f8f9fa` |
| `--color-background-body`              | App body           | `#edf0f2` |
| `--color-background-base-selected`     | Selected row       | `#e9f6fe` |
| `--color-background-primary`           | Primary button     | `#1b6dc6` |
| `--color-background-secondary`         | Secondary button   | `#586678` |
| `--color-background-modal-underlay`    | Modal backdrop     | `#37414b` |
| `--color-background-dark-tooltip`      | Tooltip            | `#22272e` |
| `--color-background-info-primary`      | Info banner        | `#d3edfd` |
| `--color-background-info-success`      | Success banner     | `#d7f6e1` |
| `--color-background-info-warning`      | Warning banner     | `#fff2ce` |
| `--color-background-info-error`        | Error banner       | `#fddddd` |
| `--color-background-error`             | Error button       | `#d02550` |
| `--color-background-destructive`       | Destructive button | `#d02550` |
| `--color-background-nav-base`          | Nav bar            | `#22272e` |
| `--color-background-nav-base-alt`      | Nav sidebar        | `#15171a` |
| `--color-background-nav-base-selected` | Active nav         | `#37414b` |

## Border Colors

| Token                               | Usage                 | Light     |
| ----------------------------------- | --------------------- | --------- |
| `--color-border-separator`          | Dividers              | `#edf0f2` |
| `--color-border-separator-contrast` | High-contrast divider | `#d5dae0` |
| `--color-border-interactive`        | Input borders         | `#b8bfca` |
| `--color-border-interactive-hover`  | Input hover           | `#9aa5b5` |
| `--color-border-overlay`            | Modal border          | `#b8bfca` |
| `--color-border-selected`           | Selected item         | `#1b6dc6` |
| `--color-border-focus-interactive`  | Focus ring            | `#1b6dc6` |
| `--color-border-error`              | Error border          | `#e93559` |
| `--color-border-warning`            | Warning border        | `#cf7200` |
| `--color-border-success`            | Success border        | `#20973e` |

## Shadows

| Token                               | Usage                               |
| ----------------------------------- | ----------------------------------- |
| `--effect-shadow-0`                 | Large elevation (modals)            |
| `--effect-shadow-1`                 | Medium elevation (cards, dropdowns) |
| `--effect-shadow-2`                 | Subtle elevation (popovers)         |
| `--effect-inner-shadow-input-focus` | Input focus glow                    |

## Opacity

| Token                      | Light | Dark | Usage             |
| -------------------------- | ----- | ---- | ----------------- |
| `--opacity-disabled`       | 0.5   | 0.4  | Disabled elements |
| `--opacity-modal-underlay` | 0.4   | 0.8  | Modal backdrop    |

## Spacing (Layout Props)

| `itemGap` | Pixels |
| --------- | ------ |
| `"none"`  | 0      |
| `"XS"`    | 5      |
| `"S"`     | 10     |
| `"M"`     | 15     |
| `"L"`     | 20     |
| `"XL"`    | 30     |
| `"XXL"`   | 40     |

## Visualization Colors

Reserved: `--color-reserved-{red,yellow,green,grey}-{default,hover,active,disabled}`
Categorical (12 series): `--color-categorical-{1..12}-{default,hover,active,disabled}`
Sequential (6 steps): `--color-sequential-{1..6}-*`
Divergent (5 steps): `--color-divergent-{1..5}-*`
