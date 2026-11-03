# Rules, Anti-Patterns & Accessibility

## DO

- Use `FlexLayout` and `StackingLayout` for all layouts
- Use `itemGap` and `padding` props for spacing (never custom margins)
- Use enum constants: `Button.ButtonTypes.PRIMARY`, `Title.SIZES.H2`, `Input.ErrorType.CRITICAL`
- Provide `aria-label` for icon-only buttons and interactive elements
- Provide `aria-describedby` for error messages and help text
- Maintain heading hierarchy: H1 > H2 > H3 > H4
- Always set `rowKey` on `Table` for performance
- Use `closeOnEscape` on modals
- Use `restoreFocus` on modals to return focus to trigger element
- When a Figma input has Label Top and/or Label Bottom visible, use `FormItemInput`/`FormItemSelect`/`FormItemTextArea`/`FormItemCodeInput`/`FormItemDatePicker` -- they auto-generate label, help text, error styling, and aria attributes
- Use `LocalTable` for datasets under 1000 items
- Use `unmountOnClose` for modals with heavy content

## DO NOT

- Use `<div>` for layout
- Use custom CSS for spacing, alignment, padding, or flex properties
- Use inline styles when Prism props are available
- Use hardcoded hex color values -- always use `var(--token-name)`
- Use custom SVGs or image icons -- use built-in `*Icon` components
- Use raw strings like `type="primary"` when an enum constant exists
- Use `itemSpacing` (deprecated) -- use `itemGap` instead
- Mix layout components without purpose
- Use Button without specifying `type`
- Create custom margins/padding instead of using `itemGap` and `padding`
- Render bare `Input`/`Select`/`TextArea`/`CodeInput`/`DatePicker` when the Figma design shows a top label or bottom help text -- use the `FormItem*` wrapper instead

## Accessibility

### Icon-Only Buttons

```tsx
<Button type={Button.ButtonTypes.ICON_DEFAULT} aria-label="Settings">
  <SettingsIcon />
</Button>
```

### Form Fields

```tsx
<StackingLayout itemGap="XS">
  <TextLabel id="email-label">Email Address</TextLabel>
  <Input
    aria-labelledby="email-label"
    aria-describedby={hasError ? 'email-error' : undefined}
    error={hasError}
    errorType={Input.ErrorType.CRITICAL}
  />
  {hasError && (
    <TextLabel id="email-error" type={TextLabel.TextLabelType.ERROR}>
      Please enter a valid email
    </TextLabel>
  )}
</StackingLayout>
```

### Modals

- Always provide `title` and `onClose`
- Set `closeOnEscape={true}`
- Set `restoreFocus={true}` to return focus to trigger
- FocusTrap is built into Modal -- do not add another

### Tables

- Always set `rowKey` for efficient rendering
- Add `aria-label` to describe the table purpose

## Error Handling Patterns

### Input Validation

```tsx
<Input
  error={!!errors.email}
  errorType={Input.ErrorType.CRITICAL}
  builtInSuffix={{
    type: Input.InputBuildInSuffix.FAILED,
    failMessage: errors.email,
  }}
/>
```

### Alert Messages

```tsx
<Alert
  type={Alert.AlertTypes.ERROR}
  message="Failed to save changes"
  showCloseIcon={true}
  onClose={() => clearError()}
/>
```

### Table Loading States

```tsx
<Table
  loading={isLoading ? Table.LOADING_TYPE.INLINE : false}
  loadingError={hasError}
  customMessages={{
    loadingError: 'Failed to load data. Please try again.',
  }}
/>
```

## Performance

- Use `LocalTable` for client-side datasets under 1000 items
- Use server-side `Table` with pagination for large datasets
- Set `unmountOnClose` on modals with heavy content to free memory
- Use `rowKey` for efficient React reconciliation in tables and lists
- Avoid re-creating `columns` arrays on every render -- define them outside the component or memoize

## When Custom CSS Is Necessary

Use dedicated `.css` files (never inline styles), CSS nesting, and only semantic tokens:

| Token Family | Example                                                                      |
| ------------ | ---------------------------------------------------------------------------- |
| Backgrounds  | `var(--color-background-base)`, `var(--color-background-primary)`            |
| Text         | `var(--color-text-primary-label)`, `var(--color-text-secondary-label)`       |
| Borders      | `var(--color-border-interactive)`, `var(--color-border-separator)`           |
| Shadows      | `var(--effect-shadow-0)`, `var(--effect-shadow-1)`, `var(--effect-shadow-2)` |
| Opacity      | `var(--opacity-disabled)`, `var(--opacity-modal-underlay)`                   |

## Post-Generation Self-Check

After generating code from a Figma design, audit every custom CSS rule:

- [ ] No `display: flex/grid` -- use FlexLayout/StackingLayout
- [ ] No `gap`/`margin`/`padding` in CSS -- use `itemGap`/`padding` props
- [ ] No `align-items`/`justify-content` in CSS -- use component props
- [ ] No hex/rgb/hsl color values -- use `var(--color-*)` tokens
- [ ] No `font-size`/`font-weight` -- use Title/Paragraph/TextLabel
- [ ] No `<svg>`/`<img>` icons -- use `*Icon` components
- [ ] No inline `style={}` attributes
- [ ] Remaining CSS uses only `var(--*)` tokens and lives in `.css` files
- [ ] Remaining CSS is annotated with `/* PRISM: no built-in equivalent */`
