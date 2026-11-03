# Spacing Tokens

Source: [https://ds.nutanix.design/foundations/spacing-tokens](https://ds.nutanix.design/foundations/spacing-tokens)

---

## REMs & Sizing Methods

We convert measurements to REMs for web implementation (1 REM = 16px). In Figma, we continue to use pixels because Figma only supports pixel units.

We are moving away from fixed sizing in favor of combining padding with min/max constraints to support responsiveness:

- **Button Sizing**: Use a min-height with flexible padding.
- **Form Field Sizing**: Use max-width with padding to adapt to screen sizes.
- **Menu Sizing**: Use a percentage width with min and max constraints.

---

## Spacing Rules

- **Use Spacing Tokens**: Avoid hardcoded pixel values in custom styles. Use semantic design variables instead.
- **Sizing Hierarchy**: Prefer `hug` (adjusts automatically to fit content) > `fill` (expands to fill container space) > `fixed` sizing (avoid fixed widths/heights where possible).
- **Semantic Usage**: Spacing tokens must be applied semantically, not just because a pixel value matches.
- **Figma Alignment**: Check spacing tokens in Figma Dev Mode. Visual design teams review token usage during VD and FnF reviews.

---

## Spacing Token Scale

### Gap Tokens

Used for paddings, margins, and gaps (represented in layout components as `itemGap` or `padding` props).

| Token Name | Pixel Value | REM Value  | Purpose & Example                   |
| ---------- | ----------- | ---------- | ----------------------------------- |
| `none`     | 0px         | 0 rem      | Used when no spacing is needed      |
| `XS`       | 5px         | 0.3125 rem | Closely associated elements, labels |
| `S`        | 10px        | 0.625 rem  | Form elements gap, buttons          |
| `M`        | 15px        | 0.9375 rem | Standard layout gaps, card sections |
| `L`        | 20px        | 1.25 rem   | Larger dividers, container paddings |
| `XL`       | 30px        | 1.875 rem  | Page margins, form-to-header gap    |
| `XXL`      | 40px        | 2.5 rem    | Large vertical spacing, page blocks |

---

### Border Radius Tokens

Defines the roundness of corners for UI elements.

_Note: While proportional scaling is the long-term goal, during the transitional phase, several tokens resolve to a "flat" mapping of 4px to facilitate updates._

- **Default Border Radius**: 4px.
- **チェック Checklist**: All rounded corners should map to dynamic tokens rather than static hardcoded border-radius values.

---

### Thickness Tokens

Used for stroke widths, dividing bars, and borders.

- Standard borders and line dividers use `--border-thickness` or exact design token strokes (usually 1px).

---

## Layout Check Rules

- [ ] Layouts must use `<FlexLayout>` or `<StackingLayout>` props (`itemGap`, `padding`) instead of custom margins/padding.
- [ ] No hardcoded layout spacing or static CSS margins (e.g. `margin-top: 15px` is a violation). Use `itemGap="M"`.
- [ ] Ensure proper responsive behavior using min/max bounds instead of fixed px values.
