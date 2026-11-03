# ConfirmModal

## Figma

- **Library name:** Confirm Modal (page: N/A, frame: Confirm Modal)
- **Figma spec:** [26.1 Spec Doc](https://www.figma.com/design/KVbKkR0QAFRbTVpwysQLWw/Spec-Doc?node-id=50329-37408&m=dev)

## React

Import: `import { ConfirmModal } from '@nutanix-ui/prism-reactjs'`

### TSX Examples

```tsx
// Delete confirmation — use confirmButtonProps.type for destructive styling
<ConfirmModal
  visible={showDelete}
  header="Delete Endpoint?"
  confirmButtonLabel="Delete"
  cancelButtonLabel="Cancel"
  confirmButtonProps={{ type: 'destructive' }}
  onConfirm={handleDelete}
  onCancel={() => setShowDelete(false)}
>
  This will permanently remove the endpoint and all associated data. This action cannot be undone.
</ConfirmModal>

// Standard confirmation
<ConfirmModal
  visible={showConfirm}
  header="Apply Changes?"
  confirmButtonLabel="Apply"
  onConfirm={handleApply}
  onCancel={() => setShowConfirm(false)}
>
  This will restart all affected services.
</ConfirmModal>
```

### Anti-patterns

- Don't use `Modal` with manual confirm/cancel buttons when the dialog is purely a yes/no confirmation — use `ConfirmModal`
- Do **not** pass a top-level `type` prop to `ConfirmModal` for destructive styling. Use `confirmButtonProps={{ type: 'destructive' }}` instead
- Do **not** use `onClose` to dismiss — use `onCancel`; `onClose` is a `ModalWrap`-level escape-key callback that `ConfirmModal` wires internally to `onCancel`
- Always provide a `header` for accessibility; omitting it produces a visually-hidden default "Please confirm" title

<!-- SOURCE-API-START -->

### Import

```tsx
import { ConfirmModal } from '@nutanix-ui/prism-reactjs'
```

`ConfirmModalContent` is available as a static member:

```tsx
const { ConfirmModalContent } = ConfirmModal
// or
import { ConfirmModalContent } from '@nutanix-ui/prism-reactjs'
```

### Props Interfaces

#### `ConfirmModalProps`

Extends `ModalWrapProps` (which extends `FocusTrapProps`, which extends `React.HTMLProps<HTMLDivElement>`).

| Prop                           | Type                                                            | Default            | Required | Description                                                                                                                                                                                                                                                                                    |
| ------------------------------ | --------------------------------------------------------------- | ------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `visible`                      | `boolean`                                                       | —                  | No       | Controls whether the modal is shown.                                                                                                                                                                                                                                                           |
| `header`                       | `React.ReactNode`                                               | —                  | No       | Title displayed in the modal header. For accessibility, always provide a header; if omitted a visually-hidden "Please confirm" title is rendered.                                                                                                                                              |
| `titleProps`                   | `Omit<TitleProps, 'children'>`                                  | —                  | No       | Custom props forwarded to the inner `Title` component. Prefer `titleProps.id` over the deprecated `headerTitleId`.                                                                                                                                                                             |
| `headerTitleId`                | `string`                                                        | auto-generated     | No       | **Deprecated.** Unique ID for the header title element (a11y). Use `titleProps.id` instead.                                                                                                                                                                                                    |
| `modalDescId`                  | `string`                                                        | auto-generated     | No       | Unique ID applied to the modal body element for `aria-describedby`.                                                                                                                                                                                                                            |
| `children`                     | `React.ReactNode`                                               | —                  | No       | Body content. Plain strings are automatically wrapped in a `<Paragraph>`.                                                                                                                                                                                                                      |
| `confirmButtonLabel`           | `string`                                                        | `"Confirm"` (i18n) | No       | Label for the primary action button.                                                                                                                                                                                                                                                           |
| `confirmButtonProps`           | `ButtonProps`                                                   | —                  | No       | Props forwarded to the confirm button (e.g. `{ type: 'destructive' }` for delete actions).                                                                                                                                                                                                     |
| `cancelButtonLabel`            | `string`                                                        | `"Cancel"` (i18n)  | No       | Label for the cancel/secondary button.                                                                                                                                                                                                                                                         |
| `cancelButtonProps`            | `ButtonProps`                                                   | —                  | No       | Props forwarded to the cancel button.                                                                                                                                                                                                                                                          |
| `footer`                       | `boolean \| React.ReactNode`                                    | `true`             | No       | `true` renders the default Cancel + Confirm button row. `false` / `null` removes the footer entirely. Pass a React node or an array of nodes for a fully custom footer. When not `true`, `onConfirm`, `onCancel`, `confirmButtonLabel`, and `cancelButtonLabel` no longer apply to the footer. |
| `onConfirm`                    | `ButtonProps['onClick']`                                        | —                  | No       | Called when the confirm button is clicked.                                                                                                                                                                                                                                                     |
| `onCancel`                     | `(e: React.MouseEvent \| React.KeyboardEvent) => void`          | —                  | No       | Called when the cancel button is clicked, or when Escape is pressed (if `closeOnEscape` is `true`).                                                                                                                                                                                            |
| `closeOnEscape`                | `boolean`                                                       | `true`             | No       | When `true`, pressing Escape calls `onCancel`.                                                                                                                                                                                                                                                 |
| `width`                        | `number`                                                        | `400`              | No       | Modal width in pixels.                                                                                                                                                                                                                                                                         |
| `height`                       | `string \| number`                                              | `'auto'`           | No       | Modal height. Accepts a pixel value or CSS string (e.g. `'auto'`, `600`).                                                                                                                                                                                                                      |
| `background`                   | `'body' \| 'base' \| 'alt'`                                     | `'base'`           | No       | Background token applied to the `StackingLayout` inside the modal. Match this to the surrounding page background context.                                                                                                                                                                      |
| `className`                    | `string`                                                        | —                  | No       | Additional CSS class applied to the modal wrapper.                                                                                                                                                                                                                                             |
| `containerElement`             | `React.ReactNode \| ((props: Record<any, any>) => JSX.Element)` | —                  | No       | Override the `ConfirmModalContent` container element. Defaults to `StackingLayout`-compatible props. Pass a function for full control.                                                                                                                                                         |
| `confirmModalContentProps`     | `ConfirmModalContentProps`                                      | —                  | No       | Extra props forwarded directly to `ConfirmModalContent`.                                                                                                                                                                                                                                       |
| `restoreFocus`                 | `boolean`                                                       | —                  | No       | Restore focus to the triggering element when the modal closes.                                                                                                                                                                                                                                 |
| `unmountOnClose`               | `boolean`                                                       | —                  | No       | When `true`, the modal is unmounted from the DOM after closing (useful to reset child state). By default the modal stays mounted but hidden.                                                                                                                                                   |
| `focusOnFirstFocusableElement` | `boolean`                                                       | `true`             | No       | Automatically focuses the first focusable element when the modal opens (inherited from `FocusTrapProps`).                                                                                                                                                                                      |
| `innerRef`                     | `React.Ref<HTMLDivElement>`                                     | —                  | No       | Ref forwarded to the inner modal wrapper `div`.                                                                                                                                                                                                                                                |
| `modalWrapRef`                 | `React.Ref<HTMLDivElement>`                                     | —                  | No       | **Deprecated.** Use `innerRef` instead.                                                                                                                                                                                                                                                        |
| `onVisibleChange`              | `(visible: boolean) => void`                                    | —                  | No       | Callback fired when the modal visibility state changes (after focus events settle).                                                                                                                                                                                                            |
| `passThrough`                  | `boolean`                                                       | —                  | No       | When `true`, Tab on the last focusable item (or Shift+Tab on first) moves focus to the trigger instead of looping.                                                                                                                                                                             |
| `onPassThrough`                | `() => void`                                                    | —                  | No       | Called when pass-through focus movement exits the trap.                                                                                                                                                                                                                                        |

#### `ConfirmModalContentProps`

Extends `StackingLayoutProps`. Used directly when rendering `ConfirmModalContent` standalone.

| Prop                 | Type                                                                | Default            | Required | Description                                                    |
| -------------------- | ------------------------------------------------------------------- | ------------------ | -------- | -------------------------------------------------------------- |
| `children`           | `React.ReactNode`                                                   | —                  | No       | Body content. Plain strings are auto-wrapped in `<Paragraph>`. |
| `header`             | `React.ReactNode`                                                   | —                  | No       | Header title text or node.                                     |
| `titleProps`         | `Omit<TitleProps, 'children'>`                                      | —                  | No       | Props forwarded to the inner `Title`.                          |
| `headerTitleId`      | `string`                                                            | —                  | No       | **Deprecated.** ID for the title element. Use `titleProps.id`. |
| `modalDescId`        | `string`                                                            | —                  | No       | ID applied to the body wrapper for `aria-describedby`.         |
| `confirmButtonLabel` | `string`                                                            | `"Confirm"` (i18n) | No       | Confirm button label.                                          |
| `confirmButtonProps` | `ButtonProps`                                                       | —                  | No       | Props forwarded to the confirm button.                         |
| `cancelButtonLabel`  | `string`                                                            | `"Cancel"` (i18n)  | No       | Cancel button label.                                           |
| `cancelButtonProps`  | `ButtonProps`                                                       | —                  | No       | Props forwarded to the cancel button.                          |
| `footer`             | `boolean \| React.ReactNode`                                        | `true`             | No       | Same semantics as `ConfirmModalProps.footer`.                  |
| `onConfirm`          | `ButtonProps['onClick']`                                            | —                  | No       | Confirm button click handler.                                  |
| `onCancel`           | `(e: React.MouseEvent \| React.KeyboardEvent) => void`              | —                  | No       | Cancel button click / Escape key handler.                      |
| `visible`            | `boolean`                                                           | —                  | No       | Drives open/close animation.                                   |
| `closeOnEscape`      | `boolean`                                                           | —                  | No       | When `true`, Escape calls `onCancel`.                          |
| `width`              | `number`                                                            | `400`              | No       | Width in pixels.                                               |
| `height`             | `string \| number`                                                  | `'auto'`           | No       | Height (px or CSS string).                                     |
| `background`         | `'body' \| 'base' \| 'alt'`                                         | `'base'`           | No       | Background token for the `StackingLayout` root.                |
| `containerElement`   | `React.ReactNode \| ((props: Record<any, any>) => React.ReactNode)` | —                  | No       | Override the root container element.                           |

### Static Members

- `ConfirmModal.ConfirmModalContent` = `ConfirmModalContent`

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Accessibility Guidelines

```tsx
<StackingLayout style={{ maxWidth: 800 }}>
  <FlexLayout itemSpacing="20px" flexDirection="column" alignItems="flex-start">
    <Paragraph>
      Managing keyboard focus is a common source of confusion when dealing with
      modals. Please see the section on focus management on the main Modal page
      for tips on where to set keyboard focus when the modal is opened or
      closed.
    </Paragraph>
    <Paragraph>
      For accessibility reasons, dialogs such as the ConfirmationModal require a
      title. Due to backwards compatibility reasons the header prop is not
      enforced and a default hidden "Please confirm" title is set. Please make
      sure to add one when using this component.
    </Paragraph>
    <Paragraph>
      Confirm Modals are designed to announce their content to screen readers
      when opened. Because of this, they should not contain more than a sentence
      or two of text and generally should not include things like tables and
      lists. A regular Modal should be used if the content is long or complex.
    </Paragraph>
  </FlexLayout>
</StackingLayout>
```

#### Presentation (ConfirmModalContent standalone)

```tsx
import { ConfirmModal, ConfirmModalContent } from '@nutanix-ui/prism-reactjs'

// ConfirmModalContent renders the content shell without the portal/overlay.
// Useful for previewing layout in storybooks or tests.
;<ConfirmModalContent
  header="Make your choice."
  cancelButtonLabel="Cancel"
  confirmButtonLabel="Confirm"
>
  Click Confirm to continue.
</ConfirmModalContent>
```

#### Basic usage

```tsx
import React, { useState } from 'react'
import { ConfirmModal, Button } from '@nutanix-ui/prism-reactjs'

function MyComponent() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Open Confirm Modal
      </Button>
      <ConfirmModal
        header="Attention!"
        visible={visible}
        onCancel={() => setVisible(false)}
        onConfirm={() => setVisible(false)}
        restoreFocus={true}
      >
        Are you sure you want to proceed?
      </ConfirmModal>
    </>
  )
}
```

#### Dialog without title

When `header` is omitted, a visually-hidden "Please confirm" title is rendered for screen readers.

```tsx
<ConfirmModal
  visible={visible}
  onCancel={() => setVisible(false)}
  onConfirm={() => setVisible(false)}
  restoreFocus={true}
>
  Are you sure you want to proceed?
</ConfirmModal>
```

#### Usage with Delete Action

Pass `confirmButtonProps={{ type: 'destructive' }}` — there is no top-level `type` prop on `ConfirmModal`.

```tsx
<ConfirmModal
  confirmButtonProps={{ type: 'destructive' }}
  header="Are you sure?"
  visible={visible}
  onCancel={() => setVisible(false)}
  onConfirm={handleDelete}
  restoreFocus={true}
>
  Are you sure you want to proceed?
</ConfirmModal>
```

#### Usage with Delete Action and Input Confirm

Use a custom `footer` array when you need to gate the confirm button on user input.

```tsx
import {
  ConfirmModal,
  Button,
  Alert,
  Paragraph,
  StackingLayout,
  FormItemInput,
} from '@nutanix-ui/prism-reactjs'

function DeleteWithInputConfirm({ visible, onClose }) {
  const [inputVal, setInputVal] = React.useState('')
  const [error, setError] = React.useState(false)

  const validate = () => {
    if (inputVal.toUpperCase() === 'DELETE') {
      onClose()
    } else {
      setError(true)
    }
  }

  return (
    <ConfirmModal
      visible={visible}
      header='Deleting VM "ms-db-004"?'
      onCancel={onClose}
      restoreFocus={true}
      footer={[
        <Button key="cancel" type="secondary" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="confirm" type="destructive" onClick={validate}>
          Delete
        </Button>,
      ]}
    >
      <StackingLayout>
        {error && (
          <Alert type="error" inline message='Type "DELETE" to confirm.' />
        )}
        <Paragraph>Deletion of a VM cannot be undone.</Paragraph>
        <FormItemInput
          id="confirm-input"
          label='To proceed, type "Delete" below (case insensitive)'
          placeholder='Type "Delete" here…'
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
      </StackingLayout>
    </ConfirmModal>
  )
}
```

#### Custom width/height with no footer

```tsx
<ConfirmModal
  visible={visible}
  onCancel={() => setVisible(false)}
  restoreFocus={true}
  width={600}
  height={600}
  footer={null}
  header="Welcome to Planet Funkotron"
>
  <StackingLayout style={{ textAlign: 'center' }}>
    <Title tag="h3" size="h2">
      The funkiest planet in the galaxy.
    </Title>
    <Paragraph>
      If you wish to enter, you must use a suitable means of transportation.
    </Paragraph>
    <Button onClick={() => setVisible(false)} type="secondary">
      Cancel
    </Button>
    <Button onClick={() => setVisible(false)}>Let's Go!</Button>
  </StackingLayout>
</ConfirmModal>
```

#### Unmount modal on close (reset child state)

```tsx
import React, { useState } from 'react'
import {
  ConfirmModal,
  Button,
  FormItemInput,
  FlexLayout,
} from '@nutanix-ui/prism-reactjs'

function ModalContent() {
  const [inputValue, setInputValue] = useState('VM Apache')
  return (
    <FlexLayout padding="20px" itemSpacing="20px">
      <FormItemInput
        id="input-name"
        label="Name"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </FlexLayout>
  )
}

function MyModal() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Open Modal
      </Button>
      <ConfirmModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onConfirm={() => setVisible(false)}
        restoreFocus={true}
        unmountOnClose={true}
      >
        <ModalContent />
      </ConfirmModal>
    </>
  )
}
```

#### Background context matching

Match the `background` prop to the surrounding layout surface so the modal content blends correctly.

```tsx
// On a page with background="base" (default):
<ConfirmModal background="base" visible={visible} onCancel={onClose} onConfirm={onClose}>
  Content on base background.
</ConfirmModal>

// On a page with background="alt":
<ConfirmModal background="alt" visible={visible} onCancel={onClose} onConfirm={onClose}>
  Content on alt background.
</ConfirmModal>
```

#### Custom container element via ConfirmModalContent

```tsx
import { ConfirmModalContent, FlexLayout } from '@nutanix-ui/prism-reactjs'

// Swap the root StackingLayout for a FlexLayout:
<ConfirmModalContent containerElement={FlexLayout}>
  Are you sure?
</ConfirmModalContent>

// Full control via render function:
<ConfirmModalContent
  containerElement={(props) => {
    const { className } = props
    return <div className={[className, 'my-custom'].join(' ')}>Custom container</div>
  }}
/>
```

#### Footer variants

```tsx
import { Button, ConfirmModalContent } from '@nutanix-ui/prism-reactjs'

// Default footer (true) — renders Cancel + Confirm:
<ConfirmModalContent header="Title">Default footer</ConfirmModalContent>

// Array of buttons:
<ConfirmModalContent
  footer={[
    <Button key="a">Button A</Button>,
    <Button key="b">Button B</Button>,
  ]}
>
  Which Button is your favorite?
</ConfirmModalContent>

// Single custom node:
<ConfirmModalContent footer={<Button key="a">Button A</Button>}>
  Single button footer
</ConfirmModalContent>

// No footer:
<ConfirmModalContent footer={false}>
  Where did my Button go?
</ConfirmModalContent>
```

### Usage Notes

- The `ConfirmModal` renders via a `Portal` (using `ModalWrap`) so the DOM node is always appended outside the component tree.
- The modal is not rendered at all until `visible` is first set to `true` (lazy mount). After that it remains in the DOM unless `unmountOnClose` is set.
- `closeOnEscape` defaults to `true` on `ModalWrap`; when the user presses Escape, `onCancel` is called.
- The modal uses `role="alertdialog"` with `aria-labelledby` and `aria-describedby` wired to auto-generated IDs. Override with `headerTitleId`/`titleProps.id` and `modalDescId` only when you need stable IDs (e.g. for testing).
- Use Prism layout props (`itemSpacing`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing inside `children`.
- Do not place complex content (tables, long lists) inside `ConfirmModal`; use a full `Modal` for that.

<!-- SOURCE-API-END -->
