# Visual & Content Linter

> Lint React UI code and Figma screens against [ds.nutanix.design](https://ds.nutanix.design) standards.

## Trigger Keywords

lint UI, review UI, check compliance, visual lint, design review,
audit components, review Figma screen, check accessibility.

---

## Workflow A: Lint React Code

1. Identify all `@nutanix-ui/prism-reactjs` imports in the file(s)
2. Look up each component in [react-mapping.md](react-mapping.md)
3. For each matched component, read the corresponding `components/*.md` lint doc
4. Cross-reference against `foundations/` for universal rules (typography, spacing, tokens, content guidelines)
5. If the code implements a known pattern (EBR, form, dashboard, modal), also load the relevant `patterns/*.md`
6. Produce a structured compliance report:
   - **Pass**: rule satisfied
   - **Warn**: minor deviation, suggest fix
   - **Fail**: violation, must fix
   - **N/A**: rule does not apply

## Workflow B: Lint Figma Screen

1. Use the Figma MCP `get_design_context` tool to read the screen
2. Identify components from the design context output
3. Look up each in [react-mapping.md](react-mapping.md) (Figma names map to the same ds pages)
4. Follow steps 3-6 from Workflow A

---

## File Structure

```
linter/
  overview.md           <- You are here
  react-mapping.md      <- React component -> ds page -> lint doc
  foundations/           <- Universal rules (apply to ALL checks)
    principles.md
    compliance.md
    content-guidelines.md
    typography.md
    spacing.md
    tokens.md
  components/            <- Per-component do's/don'ts
    accordion.md
    buttons.md
    table.md
    ... (one per ds.nutanix.design component page)
  patterns/              <- Pattern-level do's/don'ts
    dashboard.md
    eb.md
    forms.md
    ...
```

## Important

- Do **NOT** load these linter files during Figma-to-React code generation.
- Generation uses ONLY `references/` files.
- The linter is a separate, parallel workflow.

---

For questions: Slack @aryan.r / aryan.rathod@nutanix.com
