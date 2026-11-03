---
name: prism-craft
description: >-
  Translates Figma designs into production React code using the Nutanix
  @nutanix-ui/prism-reactjs component library. Also performs visual and content
  linting of React UI and Figma screens against ds.nutanix.design standards.
  Covers component props, enum constants, Figma variant-to-React prop mapping,
  design tokens, icons, illustrations, data visualizations, accessibility,
  layout patterns, and post-generation CSS self-evaluation. Use when writing
  any Prism UI code, building components, translating Figma designs, or
  reviewing UI for compliance — even if the user doesn't mention Figma
  explicitly. Triggers: prism, nutanix, figma, design system, illustration,
  chart, visualization, dashboard, Button, Modal, Table, FlexLayout, Badge,
  Alert, Input, Select, lint UI, review UI, visual lint, check compliance,
  design review, audit components, review Figma screen.
metadata:
  library: '@nutanix-ui/prism-reactjs'
  version: '2.47.0'
  components: '51'
  illustrations: '755'
  generated: '2026-04-10'
---

# Figma-to-Prism React

All UI must use `@nutanix-ui/prism-reactjs`. No third-party UI libraries.

## Constraints

- Import everything from `@nutanix-ui/prism-reactjs`
- **No `<div>` for layout** -- use `FlexLayout`, `StackingLayout`, `MainPageLayout`
- **No custom SVGs for icons** -- use built-in `*Icon` components
- **No hardcoded colors** -- use `var(--token-name)` CSS variables
- **No custom CSS for layout/spacing** -- use `itemGap`, `padding`, `alignItems`, `justifyContent` props
- Use enum constants: `Button.ButtonTypes.PRIMARY`, `Title.SIZES.H1`, not raw strings
- Use `FormItem*` wrappers (`FormItemInput`, `FormItemSelect`, etc.) when the design shows a label or help text -- they auto-generate label, error styling, and aria attributes
- Check `.d.ts` files in `node_modules/@nutanix-ui/prism-reactjs/lib/components/v2/` for exact prop types

## Quick Start

```tsx
import {
  FlexLayout,
  StackingLayout,
  Button,
  Title,
  Paragraph,
  Input,
  Select,
  Modal,
  Table,
  Badge,
  Alert,
  MainPageLayout,
  NavBarLayout,
  Menu,
  MenuItem,
  Tabs,
} from '@nutanix-ui/prism-reactjs'
import '@nutanix-ui/prism-reactjs/dist/index.css'
```

For the full list of 100+ available components (including sub-components not in Figma), see [references/components-inventory.md](references/components-inventory.md).

## Workflow: Figma Design to Code

1. Identify the Figma component name from the design
2. Look it up in [references/components/\_index.md](references/components/_index.md) to find the React component and its doc file
3. Read the specific component file in `references/components/` for props, Figma variant mapping, and TSX examples
4. Use tokens from [references/tokens.md](references/tokens.md) for any colors, backgrounds, or borders
5. Use icons from [references/icons.md](references/icons.md) -- never create custom SVGs
6. Check illustrations in [references/illustrations/\_index.md](references/illustrations/_index.md) -- use pre-baked inline SVGs, never create custom illustration SVGs
7. For any charts or data visualizations, emit a `ChartPlaceholder` wrapped in `DashboardWidgetLayout` -- see the Data Visualizations section below

## Styling Hierarchy (Priority Order)

1. **Prism component props** -- `itemGap`, `padding`, `alignItems`, `justifyContent`, `flexDirection`
2. **CSS variable tokens** -- `var(--color-background-base)`, `var(--color-text-primary-label)` (from `@nutanix-core/prism-ui-themes-common`)
3. **Global CSS** -- app-wide foundations only
4. **Component CSS files** -- only when explicitly required for non-layout styling; never inline styles

## Post-Generation: CSS Self-Evaluation

After generating code, review ALL custom CSS (`.css` files and inline styles) and attempt to eliminate each rule:

1. **Layout/spacing** -- Replace `display: flex`, `gap`, `margin`, `padding`, `align-items`, `justify-content` with `FlexLayout`/`StackingLayout` props (`itemGap`, `padding`, `alignItems`, `justifyContent`)
2. **Colors** -- Replace any hex/rgb/hsl values with `var(--color-*)` tokens from tokens.md
3. **Typography** -- Replace `font-size`, `font-weight`, `line-height` with `Title`, `Paragraph`, `TextLabel` components
4. **Borders/shadows** -- Replace with `var(--color-border-*)`, `var(--effect-shadow-*)`
5. **Icons** -- Replace `<svg>` or `<img>` icons with `*Icon` components
6. **Visibility/opacity** -- Replace hardcoded opacity with `var(--opacity-*)`

If a CSS rule survives all checks, it is acceptable only if:

- It targets a non-layout visual (e.g. animation, transition, transform, cursor)
- It uses only semantic `var(--*)` tokens
- It lives in a dedicated `.css` file (never inline)

Flag any remaining custom CSS with a code comment: `/* PRISM: no built-in equivalent */`

## Spacing

Use `itemGap` on `FlexLayout` / `StackingLayout`: `none` (0) | `XS` (5px) | `S` (10px) | `M` (15px) | `L` (20px) | `XL` (30px) | `XXL` (40px)

Use `padding` prop for container padding. Never use custom margins.

For the full prop value tables (flexDirection, justifyContent, alignItems, flexWrap, etc.), see [references/components-inventory.md](references/components-inventory.md).

## Typography

Use components, not CSS:

| Element | Component                             | Usage                 |
| ------- | ------------------------------------- | --------------------- |
| Heading | `<Title size={Title.SIZES.H1}>`       | H1 through H4         |
| Body    | `<Paragraph>`                         | Body text             |
| Label   | `<TextLabel>`                         | Form labels, captions |
| Link    | `<Link type={Link.LinkType.PRIMARY}>` | Navigation links      |

## Illustrations (755 pre-baked)

Illustrations are NOT part of `@nutanix-ui/prism-reactjs`. They are pre-extracted as inline SVGs from the Figma Illustration Library.

**IMPORTANT -- false-positive guard:** Only treat a Figma element as an illustration if its name appears EXACTLY in [references/illustrations/\_index.md](references/illustrations/_index.md). Do NOT fuzzy-match. Components with similar names that are not in the index must use standard component mapping.

### Workflow

1. Check if the Figma element name exists in [references/illustrations/\_index.md](references/illustrations/_index.md)
2. If yes, read the corresponding `references/illustrations/{name}.md` file for the inline SVG
3. Wrap in a Prism layout component:

```tsx
<FlexLayout justifyContent="center" alignItems="center" padding="40px">
  <IllustrationComponent aria-hidden="true" />
</FlexLayout>
```

## Data Visualizations

Prism does **not** include charting components. When you detect a chart or data visualization in a Figma design (bar chart, line chart, donut, area chart, sparkline, meter, etc.), do the following:

1. Identify the chart type: `bar` | `horizontal-bar` | `stacked-bar` | `grouped-bar` | `line` | `area` | `stacked-area` | `donut` | `meter` | `sparkline`
2. Emit a `ChartPlaceholder` component wrapped in `DashboardWidgetLayout` using the pattern from [references/patterns.md](references/patterns.md) (see "Data Visualization Placeholder" section)
3. Include a `// TODO:` comment telling the developer to replace the placeholder with their charting library (e.g. recharts, visx, nivo)
4. Infer the expected data shape from the Figma design context and pass it as the `dataShape` prop

Do NOT attempt to generate actual chart rendering code. Do NOT import third-party charting libraries. The placeholder makes the chart slot visible and actionable for the developer.

## Theming

```tsx
import { ThemeWrapperContext } from '@nutanix-core/prism-ui-themes-common'
const theme = useContext(ThemeWrapperContext)
```

All CSS variable tokens auto-switch between light/dark.

## Reference Documents

- [references/components-inventory.md](references/components-inventory.md) -- Full list of 100+ available components, layout prop value tables
- [references/rules.md](references/rules.md) -- Anti-patterns, accessibility, performance, error handling, post-generation self-check
- [references/tokens.md](references/tokens.md) -- Colors, backgrounds, borders, shadows, opacity, spacing, typography tokens
- [references/icons.md](references/icons.md) -- 60 Figma-mapped icons + 151 React-only icons
- [references/patterns.md](references/patterns.md) -- Common composition patterns (forms, modals, tables, pages, controlled components, wizards, side panels, empty states, chart placeholders)
- [references/components/\_index.md](references/components/_index.md) -- Figma name to React component lookup table
- Individual component docs: `references/components/<name>.md` -- Figma canvas structure, React props, TSX examples
- [references/illustrations/\_index.md](references/illustrations/_index.md) -- 755 pre-baked illustration SVGs from Figma Illustration Library
- [linter/foundations/content-guidelines.md](linter/foundations/content-guidelines.md) -- CTA text, placeholder, error message, date/time formatting conventions for generated UI

## Visual Linter Mode

When asked to lint, review, or audit UI (React code or Figma screen):

1. Read [linter/overview.md](linter/overview.md) for the full workflow
2. Identify components used in the code/screen
3. Look up each in [linter/react-mapping.md](linter/react-mapping.md)
4. Load the relevant component lint docs from `linter/components/`
5. Cross-reference against `linter/foundations/` for universal rules
6. Check pattern-level rules in `linter/patterns/` if applicable
7. Produce a structured compliance report

**Important:** Do NOT load `linter/` references during Figma-to-React code generation.
Generation uses ONLY `references/` files.
