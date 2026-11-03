# FullPageModalContent

## Figma

- **Library name:** Fullpage Area (page: N/A, frame: Fullpage Area)

## React

Import: `import { FullPageModalContent } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import { FullPageModalContent } from '@nutanix-ui/prism-reactjs'
```

`FullPageModalContent` is also re-exported as a static property of `FullPageModal`:

```tsx
import { FullPageModal } from '@nutanix-ui/prism-reactjs'
const { FullPageModalContent } = FullPageModal
```

### Component Description

Renders full-page modal content **without** a portal container. Typically used internally by [`FullPageModal`](#!/FullPageModal), but can be used standalone in layouts that already manage their own overlay. The component wraps a large `ModalHeader` (always `ModalHeaderSize.LARGE`) and a scrollable body `<div>`, all within a `BackgroundContext.Provider`.

### Props Interfaces

#### `FullPageModalContentProps`

Extends: `Omit<React.HTMLProps<HTMLDivElement>, 'ref' | 'title'>` and `Pick<ModalHeaderProps, 'headerActions' | 'onClose' | 'closeIconProps' | 'closeButtonProps'>`

All standard HTML `<div>` props (e.g. `className`, `style`, `id`, `data-*`) are forwarded to the root wrapper element.

| Prop               | Type                                                   | Default  | Required | Description                                                                                                                                                                                         |
| ------------------ | ------------------------------------------------------ | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`            | `TitleProps['children']` (string or ReactNode)         | —        | No       | Displayed in the modal header. When a plain `string`, renders as a `<Title size="h3" tag="h2">`. When a ReactNode, wrapped in a `<div>`.                                                            |
| `headerTitleId`    | `string`                                               | —        | No       | `id` applied to the rendered title element for `aria-labelledby` wiring. **Deprecated** — prefer `titleProps.id` on `ModalHeader` directly if using `ModalHeader` standalone.                       |
| `headerActions`    | `React.ReactNode`                                      | —        | No       | Custom header action elements (e.g. help/close icon buttons). When provided, **replaces** the default close button entirely — `onClose`, `closeIconProps`, and `closeButtonProps` are ignored.      |
| `onClose`          | `(e: React.MouseEvent \| React.KeyboardEvent) => void` | —        | No       | Callback fired when the built-in close button is clicked. Ignored when `headerActions` is supplied.                                                                                                 |
| `closeButtonProps` | `ButtonProps`                                          | —        | No       | Additional props forwarded to the close `<Button>` element. Use for `data-test`, `aria-label` overrides, etc. Ignored when `headerActions` is supplied.                                             |
| `closeIconProps`   | `CloseIconProps`                                       | —        | No       | **Deprecated.** Additional props forwarded to the `<CloseIcon>` inside the close button. Non-ARIA props go to the icon; ARIA string props are lifted to the button. Use `closeButtonProps` instead. |
| `bodyProps`        | `React.HTMLProps<HTMLDivElement>`                      | `{}`     | No       | Props forwarded to the inner body `<div>` (class `modal-body`). Use for `style`, `id`, etc. `className` is merged with `modal-body`.                                                                |
| `bodyRef`          | `React.Ref<HTMLDivElement>`                            | —        | No       | Ref attached to the body `<div>`. Useful for mounting Select/Tooltip popups inside the modal body to preserve scroll behaviour.                                                                     |
| `visible`          | `boolean`                                              | —        | No       | Controls the entry/exit animation on the root element via `data-animation`. `true` → `swipe-up`, `false` → `swipe-down`, `undefined` → no animation attribute set.                                  |
| `background`       | `BackgroundType`                                       | `'base'` | No       | Sets the `BackgroundContext` for all child components. Accepts `'base'`, `'alt'`, or `'body'`.                                                                                                      |
| `data-test`        | `string`                                               | —        | No       | Test selector placed on the root wrapper `<div>`.                                                                                                                                                   |
| `children`         | `React.ReactNode`                                      | —        | No       | Content rendered inside the body area below the header.                                                                                                                                             |

### `BackgroundType`

```ts
// Source: @nutanix-ui/prism-reactjs (internal BackgroundContext)
type BackgroundType = 'base' | 'alt' | 'body'
```

There is no exported enum constant for this type — pass the string value directly.

### Inherited Props from `ModalHeaderProps` (via `Pick`)

The following props are picked from `ModalHeaderProps` and wired directly to the internal `ModalHeader`:

| Inherited Prop     | Type                                                   | Description             |
| ------------------ | ------------------------------------------------------ | ----------------------- |
| `headerActions`    | `React.ReactNode`                                      | See above.              |
| `onClose`          | `(e: React.MouseEvent \| React.KeyboardEvent) => void` | See above.              |
| `closeIconProps`   | `CloseIconProps`                                       | Deprecated — see above. |
| `closeButtonProps` | `ButtonProps`                                          | See above.              |

### Behaviour Notes

- The internal `ModalHeader` is **always** rendered at `ModalHeaderSize.LARGE` (`data-size="large"`), producing a space-between flex layout with 20 px item spacing.
- When `title` is a string, it renders as `<Title size="h3" tag="h2" className="header-title">`.
- When `title` is a ReactNode, it renders inside `<div className="header-title">`.
- The `visible` prop drives a CSS `data-animation` attribute (`swipe-up` / `swipe-down`). When `visible` is `undefined`, no animation attribute is applied.
- The component wraps its output in `<BackgroundContext.Provider value={{ background }}>` so all descendants automatically inherit the correct background token.
- The root element class is `ntnx-full-page-modal-content ntnx`.
- The body area class is `modal-body` (merged with any `bodyProps.className`).

### Accessibility

- Provide a `headerTitleId` and pair it with `aria-labelledby` on the modal container to satisfy WCAG dialog labelling requirements.
- Focus management is the responsibility of the parent (`FullPageModal` handles `restoreFocus`). When using `FullPageModalContent` standalone, implement focus trapping yourself.
- When `headerActions` is used instead of `onClose`, ensure each action element carries an appropriate `aria-label`.
- For Tooltips or Select popups rendered inside the modal body, set `getPopupContainer` / `mountElement` to `bodyRef.current` and add `position: relative` to `bodyProps.style` to prevent overflow clipping.
- Managing keyboard focus on open/close is a common source of errors — see the [Modal page focus management section](#!/Layouts/Sessions?id=modal) for guidance.

### Usage Notes

- `FullPageModalContent` is a **layout primitive**. Use [`FullPageModal`](#!/FullPageModal) for the complete portal + overlay experience.
- `headerActions` completely replaces the default close button. If you still need a close action, include it explicitly inside `headerActions`.
- `closeIconProps` is deprecated; pass everything via `closeButtonProps` instead.
- `bodyRef` + `bodyProps.style={{ position: 'relative' }}` is required when mounting Select dropdowns or Tooltips inside the body to enable correct scroll-aware positioning.

<!-- SOURCE-API-END -->

### Examples

#### Minimal working example (standalone)

```tsx
import { FullPageModalContent } from '@nutanix-ui/prism-reactjs'

function MyContent() {
  return (
    <FullPageModalContent
      title="Full-Page Modal Title"
      onClose={() => console.log('closed')}
    >
      <p>Body content goes here.</p>
    </FullPageModalContent>
  )
}
```

#### With `visible` animation control

```tsx
import { FullPageModalContent } from '@nutanix-ui/prism-reactjs'

// visible=true triggers swipe-up animation; visible=false triggers swipe-down
;<FullPageModalContent
  title="Animated Modal"
  visible={isOpen}
  onClose={handleClose}
>
  <p>Content</p>
</FullPageModalContent>
```

#### With custom `headerActions` (replaces default close button)

```tsx
import {
  FullPageModalContent,
  FlexLayout,
  Button,
  QuestionIcon,
  CloseIcon,
} from '@nutanix-ui/prism-reactjs'
;<FullPageModalContent
  title="Full-Page Modal Title"
  headerActions={[
    <FlexLayout htmlTag="button" key="help-btn" aria-label="Documentation">
      <QuestionIcon />
    </FlexLayout>,
    <FlexLayout
      htmlTag="button"
      key="close-btn"
      aria-label="Close modal"
      onClick={handleClose}
    >
      <CloseIcon />
    </FlexLayout>,
  ]}
>
  <p>Body content</p>
</FullPageModalContent>
```

#### With `bodyRef` for popup mounting (Select/Tooltip inside body)

```tsx
import React, { useRef } from 'react'
import { FullPageModalContent, Select } from '@nutanix-ui/prism-reactjs'

function MyContent() {
  const bodyRef = useRef<HTMLDivElement>(null)

  return (
    <FullPageModalContent
      title="Modal with Select"
      onClose={handleClose}
      bodyRef={bodyRef}
      bodyProps={{ style: { position: 'relative' } }}
    >
      <Select rowsData={options} getPopupContainer={() => bodyRef.current} />
    </FullPageModalContent>
  )
}
```

#### With `background` context

```tsx
import { FullPageModalContent } from '@nutanix-ui/prism-reactjs'

// 'base' (default), 'alt', or 'body'
;<FullPageModalContent
  title="Alt Background Modal"
  background="alt"
  onClose={handleClose}
>
  <p>Child components inherit the "alt" background context.</p>
</FullPageModalContent>
```

#### With `closeButtonProps` for test IDs

```tsx
import { FullPageModalContent } from '@nutanix-ui/prism-reactjs'
;<FullPageModalContent
  title="Modal"
  onClose={handleClose}
  closeButtonProps={{ 'data-test': 'my-close-button' }}
>
  <p>Content</p>
</FullPageModalContent>
```

#### Typical usage via `FullPageModal` (recommended)

```tsx
import {
  FullPageModal,
  FormLayout,
  FormSection,
  FormItemInput,
  FlexLayout,
  Button,
} from '@nutanix-ui/prism-reactjs'

// FullPageModal renders FullPageModalContent internally and passes all matching props through.
function MyModal({ visible, onClose }) {
  return (
    <FullPageModal
      visible={visible}
      title="Add New Policy"
      onClose={onClose}
      restoreFocus
    >
      <FormLayout contentWidth="600px">
        <FormSection>
          <FormItemInput id="name" label="Name" placeholder="Name" />
        </FormSection>
        <FormSection>
          <FlexLayout itemSpacing="10px" justifyContent="flex-end">
            <Button type={Button.ButtonTypes.SECONDARY} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onClose}>Save</Button>
          </FlexLayout>
        </FormSection>
      </FormLayout>
    </FullPageModal>
  )
}
```
