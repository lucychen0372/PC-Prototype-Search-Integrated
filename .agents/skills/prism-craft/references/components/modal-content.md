# ModalContent

## Figma

- **Library name:** Modal (page: N/A, frame: Modal)

## React

Import: `import { ModalContent } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import { ModalContent } from '@nutanix-ui/prism-reactjs'

// Also available as a static property of Modal:
// const { ModalContent } = Modal;
```

### Props Interfaces

#### `ModalContentProps`

All props are optional.

| Prop                   | Type                                                   | Default  | Description                                                                                                                                                                                                                                                                                                        |
| ---------------------- | ------------------------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `background`           | `'base' \| 'alt' \| 'body'`                            | `'base'` | Background context applied via `BackgroundContext.Provider`. Affects child components that consume the background context.                                                                                                                                                                                         |
| `bodyProps`            | `React.HTMLProps<HTMLDivElement>`                      | `{}`     | Props spread onto the modal body `<div>`. Use to set `className`, `style`, `data-*` attributes, etc.                                                                                                                                                                                                               |
| `bodyRef`              | `React.Ref<HTMLDivElement>`                            | —        | Ref forwarded to the modal body `<div>`. Useful for scroll containers or `getPopupContainer` targets.                                                                                                                                                                                                              |
| `children`             | `React.ReactNode`                                      | —        | Content rendered inside the modal body.                                                                                                                                                                                                                                                                            |
| `className`            | `string`                                               | —        | Additional class name applied to the root `<div>`.                                                                                                                                                                                                                                                                 |
| `closeButtonProps`     | `ButtonProps`                                          | —        | Props spread onto the header close `Button`. Ignored when `headerActions` is set. Replaces the deprecated `closeIconProps`.                                                                                                                                                                                        |
| `closeIconProps`       | `CloseIconProps`                                       | —        | **@deprecated** — use `closeButtonProps` instead. Props for the header close icon. Ignored when `headerActions` is set.                                                                                                                                                                                            |
| `footer`               | `boolean \| React.ReactNode`                           | —        | Controls the footer. `true` renders a single primary `Button` (configured via `primaryButtonLabel` / `primaryButtonOnClick` / `primaryButtonProps`). An array of nodes is rendered in a right-aligned `FlexLayout`. Any other `ReactNode` is rendered as-is. Omit or pass `false` / `null` to suppress the footer. |
| `footerProps`          | `React.HTMLProps<HTMLDivElement>`                      | —        | Props spread onto the footer `<div>`.                                                                                                                                                                                                                                                                              |
| `headerActions`        | `React.ReactNode`                                      | —        | Custom header action nodes (e.g. help icon + close button). Replaces the built-in close button; `onClose` is no longer called automatically when this prop is used. Multiple nodes are separated by a `VerticalSeparator`.                                                                                         |
| `headerTitleId`        | `string`                                               | —        | **@deprecated** — use `titleProps.id` instead. Sets an `id` on the header title element for `aria-labelledby`.                                                                                                                                                                                                     |
| `height`               | `string \| number`                                     | —        | Height of the modal in px (applied as an inline style).                                                                                                                                                                                                                                                            |
| `modalHeaderProps`     | `ModalHeaderProps`                                     | —        | Props spread onto the internal `ModalHeader`. Merged after individual header props, so these can override them.                                                                                                                                                                                                    |
| `onClose`              | `(e: React.MouseEvent \| React.KeyboardEvent) => void` | —        | Callback fired when the built-in close button is clicked. Not called when `headerActions` is provided.                                                                                                                                                                                                             |
| `primaryButtonLabel`   | `React.ReactNode`                                      | —        | Label for the primary footer button. Only used when `footer={true}`.                                                                                                                                                                                                                                               |
| `primaryButtonOnClick` | `ButtonProps['onClick']`                               | —        | Click handler for the primary footer button. Only used when `footer={true}`.                                                                                                                                                                                                                                       |
| `primaryButtonProps`   | `ButtonProps`                                          | —        | Props spread onto the primary footer `Button`. Only used when `footer={true}`.                                                                                                                                                                                                                                     |
| `title`                | `React.ReactNode`                                      | —        | Modal title rendered in the header. When a string, a styled `Title` (H3 visually, H2 semantically) is rendered. Otherwise rendered in a plain `<div>`.                                                                                                                                                             |
| `titleProps`           | `Omit<TitleProps, 'children'>`                         | —        | Props for the header title. Only applied when `title` is a string. Use `titleProps.id` to set a unique ID for `aria-labelledby` (replaces deprecated `headerTitleId`).                                                                                                                                             |
| `visible`              | `boolean`                                              | —        | Drives entry/exit animation. `true` → `pop-in` animation; `false` → `pop-out` animation; `undefined` → no animation.                                                                                                                                                                                               |
| `width`                | `string \| number`                                     | —        | Width of the modal in px (applied as an inline style).                                                                                                                                                                                                                                                             |

### Footer rendering logic

| `footer` value             | Rendered output                                                                              |
| -------------------------- | -------------------------------------------------------------------------------------------- |
| `true`                     | A single `<Button>` using `primaryButtonLabel`, `primaryButtonOnClick`, `primaryButtonProps` |
| Array of nodes             | Nodes wrapped in `<FlexLayout itemSpacing="10px" justifyContent="flex-end">`                 |
| Any other `ReactNode`      | Rendered directly without a wrapper                                                          |
| `false` / `null` / omitted | Footer `<div>` is not rendered; modal body gets `modal-body-no-footer` class                 |

### `background` values

```tsx
// Valid literal values (from BackgroundType)
'base' // default — standard modal surface
'alt' // alternate surface
'body' // body-level surface
```

The `background` prop sets a `BackgroundContext.Provider` wrapping the header, body, and footer. Child Prism components that consume this context (e.g. `Table`, `FormSection`) will automatically adapt their appearance.

### Examples

#### Minimal working example

```tsx
import React, { useState } from 'react'
import {
  ModalContent,
  Button,
  FlexLayout,
  StackingLayout,
  Paragraph,
} from '@nutanix-ui/prism-reactjs'

const MyModal = () => {
  const [visible, setVisible] = useState(true)

  return (
    <div
      className="ntnx ntnx-modal"
      style={{ borderRadius: 4, width: 500, position: 'relative' }}
    >
      <ModalContent
        visible={visible}
        width="500px"
        title="VM Configuration"
        onClose={() => setVisible(false)}
        footer={
          <FlexLayout itemSpacing="10px" justifyContent="flex-end">
            <Button type="secondary" onClick={() => setVisible(false)}>
              Cancel
            </Button>
            <Button onClick={() => setVisible(false)}>Save</Button>
          </FlexLayout>
        }
      >
        <StackingLayout padding="20px">
          <Paragraph>Modal body content goes here.</Paragraph>
        </StackingLayout>
      </ModalContent>
    </div>
  )
}
```

> In practice, prefer the [`Modal`](#!/Modal) wrapper which handles the overlay, focus trap, `restoreFocus`, and `closeOnEscape`. Use `ModalContent` directly only when you need to compose a modal-like surface without the full overlay behaviour.

#### Custom header actions (help + close)

```tsx
import React, { useState } from 'react'
import {
  ModalContent,
  Button,
  CloseIcon,
  QuestionIcon,
  Link,
  FlexLayout,
  StackingLayout,
  Paragraph,
} from '@nutanix-ui/prism-reactjs'

const MyModal = () => {
  const [visible, setVisible] = useState(true)

  return (
    <div
      className="ntnx ntnx-modal"
      style={{ borderRadius: 4, width: 500, position: 'relative' }}
    >
      <ModalContent
        visible={visible}
        width="500px"
        title="VM Configuration"
        headerActions={[
          <Link
            key="help"
            type="secondary"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            <QuestionIcon aria-hidden={false} aria-label="Documentation" />
          </Link>,
          <Button
            key="close"
            type={Button.ButtonTypes.ICON_SECONDARY}
            onClick={() => setVisible(false)}
          >
            <CloseIcon aria-hidden={false} aria-label="Close modal" />
          </Button>,
        ]}
        footer={
          <FlexLayout itemSpacing="10px" justifyContent="flex-end">
            <Button type="secondary" onClick={() => setVisible(false)}>
              Cancel
            </Button>
            <Button onClick={() => setVisible(false)}>Save</Button>
          </FlexLayout>
        }
      >
        <StackingLayout padding="20px">
          <Paragraph>Modal body content goes here.</Paragraph>
        </StackingLayout>
      </ModalContent>
    </div>
  )
}
```

#### footer={true} — built-in primary button

```tsx
<ModalContent
  title="Confirm Action"
  onClose={() => setVisible(false)}
  footer={true}
  primaryButtonLabel="OK"
  primaryButtonOnClick={() => setVisible(false)}
  primaryButtonProps={{ type: Button.ButtonTypes.PRIMARY }}
>
  <StackingLayout padding="20px">
    <Paragraph>Are you sure you want to proceed?</Paragraph>
  </StackingLayout>
</ModalContent>
```

#### bodyRef for popup mounting (Select / Tooltip inside modal)

```tsx
import React, { useRef, useState } from 'react'
import {
  Modal,
  ModalContent,
  Select,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'

// Pass bodyRef to get a ref to the scrolling body container.
// Set position: relative on the body so floating elements scroll with it.
// Pass that ref as getPopupContainer to Select/Tooltip so dropdowns mount inside the modal.
const MyModal = () => {
  const bodyRef = useRef(null)
  const [visible, setVisible] = useState(true)

  return (
    <div
      className="ntnx ntnx-modal"
      style={{ width: 500, position: 'relative' }}
    >
      <ModalContent
        title="Select Cluster"
        visible={visible}
        onClose={() => setVisible(false)}
        bodyRef={bodyRef}
        bodyProps={{ style: { maxHeight: 400, position: 'relative' } }}
        footer={true}
        primaryButtonLabel="Save"
        primaryButtonOnClick={() => setVisible(false)}
      >
        <StackingLayout padding="20px">
          <Select
            rowsData={[
              { key: '1', label: 'Cluster A' },
              { key: '2', label: 'Cluster B' },
            ]}
            getPopupContainer={() => bodyRef.current}
          />
        </StackingLayout>
      </ModalContent>
    </div>
  )
}
```

### Usage Notes

- **Prefer `Modal` over `ModalContent` directly.** `ModalContent` is the inner surface component; `Modal` adds the overlay, focus trap, keyboard handling (`closeOnEscape`), `restoreFocus`, and `unmountOnClose`. Only use `ModalContent` standalone for non-overlay contexts.
- **`headerActions` overrides `onClose`.** When `headerActions` is provided, the built-in close `Button` is replaced entirely. You must provide your own close action inside `headerActions`.
- **`closeButtonProps` over `closeIconProps`.** The `closeIconProps` prop is deprecated; pass button props (including `aria-label`, `data-test-id`, `disabled`) via `closeButtonProps` instead.
- **`headerTitleId` is deprecated.** Use `titleProps={{ id: 'my-modal-title' }}` and reference it with `aria-labelledby` on the modal wrapper.
- **Popup containers.** For `Select`, `Tooltip`, or other floating elements inside a modal, pass a `bodyRef` and set `position: relative` on the body via `bodyProps`. Then use `getPopupContainer={() => bodyRef.current}` on the floating component to prevent z-index and scroll issues.
- **Background context.** The `background` prop wraps all modal content in a `BackgroundContext.Provider`. Child Prism components that read the context (e.g. `Table`, `FormSection background="alt"`) will automatically use the correct surface tokens. Default is `'base'`.
- **Footer array shorthand.** Passing an array as `footer` automatically wraps items in `FlexLayout justifyContent="flex-end"`. For full layout control (e.g. a left-aligned cancel and right-aligned save), pass a single `FlexLayout` node instead.
- **Accessibility — focus on open.** Keyboard focus should go to the first interactive element when the modal opens. If initial focus on an interactive element scrolls critical content out of view, or if the action is destructive, set focus on a non-destructive or non-interactive element with `tabIndex={-1}`.
- **Accessibility — focus on close.** Return focus to the triggering element on close. When using `Modal`, set `restoreFocus={true}` for automatic restoration.
- **Popup content should mount to the modal body** for screen reader support (see `bodyRef` example above).

<!-- SOURCE-API-END -->
