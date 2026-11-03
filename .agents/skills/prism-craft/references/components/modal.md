# Modal

## Figma

- **Library name:** Modal (page: N/A, frame: Modal)
- **Figma spec (Modal):** https://www.figma.com/file/KVbKkR0QAFRbTVpwysQLWw/Spec-Library?version-id=3368532166&node-id=21096-165290
- **Figma spec (ConfirmModal):** https://www.figma.com/design/KVbKkR0QAFRbTVpwysQLWw/Spec-Doc?node-id=50329-37408
- **Figma spec (FullPageModal):** https://www.figma.com/design/KVbKkR0QAFRbTVpwysQLWw/Spec-Doc?node-id=21116-165843

## React

Import: `import { Modal } from '@nutanix-ui/prism-reactjs'`

### TSX Examples

```tsx
{
  /* Standard modal with custom footer */
}
;<Modal
  visible={isOpen}
  title="Add Provider"
  onClose={() => setIsOpen(false)}
  closeOnEscape={true}
  restoreFocus={true}
  footer={
    <FlexLayout justifyContent="flex-end" itemSpacing="10px">
      <Button
        type={Button.ButtonTypes.SECONDARY}
        onClick={() => setIsOpen(false)}
      >
        Cancel
      </Button>
      <Button onClick={handleSave} disabled={!canSave}>
        Add
      </Button>
    </FlexLayout>
  }
>
  <StackingLayout itemSpacing="L" padding="20px">
    <StackingLayout itemSpacing="XS">
      <TextLabel id="name-label">Name</TextLabel>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-labelledby="name-label"
      />
    </StackingLayout>
  </StackingLayout>
</Modal>

{
  /* Modal with default primary button */
}
;<Modal
  visible={visible}
  title="Confirm"
  onClose={onClose}
  primaryButtonLabel="OK"
  primaryButtonOnClick={handleOk}
/>

{
  /* Heavy content modal — unmount on close for performance */
}
;<Modal
  visible={showEditor}
  title="Code Editor"
  onClose={() => setShowEditor(false)}
  unmountOnClose={true}
  width="90vw"
  height="80vh"
>
  <CodeInput value={code} onChange={setCode} themeMode="dark" />
</Modal>

{
  /* No footer */
}
;<Modal
  visible={visible}
  title="Details"
  footer={false}
  onClose={onClose}
  restoreFocus={true}
>
  <StackingLayout padding="20px">
    <Paragraph>Read-only content here.</Paragraph>
  </StackingLayout>
</Modal>

{
  /* Custom header actions (replaces built-in close button) */
}
;<Modal
  visible={visible}
  title="VM Configuration"
  headerActions={[
    <Link key="help" type="secondary" href="#" onClick={openHelp}>
      <QuestionIcon aria-hidden="false" aria-label="Documentation" />
    </Link>,
    <Button
      key="close"
      type={Button.ButtonTypes.ICON_SECONDARY}
      onClick={onClose}
    >
      <CloseIcon aria-hidden="false" aria-label="Close modal" />
    </Button>,
  ]}
  footer={
    <FlexLayout itemSpacing="10px" justifyContent="flex-end">
      <Button type={Button.ButtonTypes.SECONDARY} onClick={onClose}>
        Cancel
      </Button>
      <Button onClick={handleSave}>Save</Button>
    </FlexLayout>
  }
>
  <StackingLayout padding="20px">
    <Paragraph>Content here.</Paragraph>
  </StackingLayout>
</Modal>

{
  /* Custom focus on open via onVisibleChange */
}
;<Modal
  visible={visible}
  title="Custom Focus Modal"
  onClose={handleClose}
  restoreFocus={true}
  onVisibleChange={(isVisible) => {
    if (isVisible && resetBtnRef.current) {
      resetBtnRef.current.focus()
    }
  }}
  footer={
    <FlexLayout itemSpacing="10px" justifyContent="flex-end">
      <Button innerRef={resetBtnRef} type="secondary">
        Reset
      </Button>
      <Button onClick={handleSave}>Save</Button>
    </FlexLayout>
  }
>
  <StackingLayout padding="20px">
    <Paragraph>Content here.</Paragraph>
  </StackingLayout>
</Modal>
```

### Anti-patterns

- Don't create custom overlay+dialog — use `Modal`
- Always set `closeOnEscape={true}` and `restoreFocus={true}` unless there is a specific reason not to
- Don't add a manual `FocusTrap` — `Modal` wraps `ModalWrap` which uses `FocusTrap` internally
- Use `unmountOnClose` for modals with heavy content (charts, editors) to reset child state on close
- Don't nest `Modal` inside `Modal`; use a `ConfirmModal` as the nested confirmation dialog instead
- Popup-type elements (Select, Tooltip, Popover) inside a modal should use `getPopupContainer` pointing to the modal body ref to ensure correct scroll and screen reader behavior
- Use `aria-disabled` instead of `disabled` on footer buttons when wrapping them in a `Tooltip`

<!-- SOURCE-API-END -->

### Import

```tsx
import {
  Modal,
  ConfirmModal,
  FullPageModal,
  ModalContent,
  ModalHeader,
  ModalWrap,
  ConfirmModalContent,
  FullPageModalContent,
} from '@nutanix-ui/prism-reactjs'
```

### Component Family

| Component              | Use case                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| `Modal`                | General-purpose dialog with header, scrollable body, and footer. Default width `500px`.                       |
| `ConfirmModal`         | Compact confirmation dialog (`role="alertdialog"`). Default width `400px`. Cancel + Confirm buttons centered. |
| `FullPageModal`        | Full-viewport modal for multi-step flows or complex layouts.                                                  |
| `ModalContent`         | Accessible via `Modal.ModalContent`. Can be rendered standalone (no Portal) for demos/previews.               |
| `ConfirmModalContent`  | Accessible via `ConfirmModal.ConfirmModalContent`. Standalone content area of `ConfirmModal`.                 |
| `FullPageModalContent` | Accessible via `FullPageModal.FullPageModalContent`. Standalone content area of `FullPageModal`.              |
| `ModalWrap`            | Low-level Portal + FocusTrap wrapper. Use only when building a fully custom modal variant.                    |
| `ModalHeader`          | Internal header used by `ModalContent` and `FullPageModalContent`.                                            |

---

### Props Interfaces

#### `ModalProps`

Extends: `Omit<ModalWrapProps, 'title'>` (which itself extends `Omit<FocusTrapProps, 'ref' | 'isActive'>`, which extends `React.HTMLProps<HTMLDivElement>`)

| Prop                           | Type                                                   | Default        | Required | Description                                                                                                                                                                                                                                               |
| ------------------------------ | ------------------------------------------------------ | -------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `visible`                      | `boolean`                                              | —              | —        | Controls visibility of the modal dialog.                                                                                                                                                                                                                  |
| `title`                        | `React.ReactNode`                                      | —              | —        | Title displayed in the modal header. When a string, rendered as a `Title` (h3 styled, h2 tag). When a node, wrapped in a plain div.                                                                                                                       |
| `titleProps`                   | `Omit<TitleProps, 'children'>`                         | —              | —        | Custom props for the title `Title` component. Only applies when `title` is a string. `children` is not allowed here.                                                                                                                                      |
| `onClose`                      | `(e: React.MouseEvent \| React.KeyboardEvent) => void` | —              | —        | Called when the close (X) button is clicked, or when Escape is pressed if `closeOnEscape` is true.                                                                                                                                                        |
| `closeOnEscape`                | `boolean`                                              | `true`         | —        | When true, pressing Escape calls `onClose`.                                                                                                                                                                                                               |
| `restoreFocus`                 | `boolean`                                              | —              | —        | When true, focus is returned to the triggering element when the modal closes.                                                                                                                                                                             |
| `footer`                       | `boolean \| React.ReactNode`                           | `true`         | —        | Footer content. `true` renders the default primary button. `false` / `null` hides the footer entirely. Any other node replaces the default footer. When an array of nodes is passed, they are wrapped in a `FlexLayout` with `justifyContent="flex-end"`. |
| `footerProps`                  | `React.HTMLProps<HTMLDivElement>`                      | —              | —        | HTML props spread onto the footer `div`. Supports `className`, `ref`, `data-test-id`, etc.                                                                                                                                                                |
| `primaryButtonLabel`           | `React.ReactNode`                                      | i18n `'OK'`    | —        | Label for the default primary button (only used when `footer={true}`).                                                                                                                                                                                    |
| `primaryButtonOnClick`         | `React.MouseEventHandler<HTMLButtonElement>`           | —              | —        | Click handler for the default primary button (only used when `footer={true}`).                                                                                                                                                                            |
| `primaryButtonProps`           | `ButtonProps`                                          | —              | —        | Additional props spread onto the default primary `Button`.                                                                                                                                                                                                |
| `children`                     | `React.ReactNode`                                      | —              | —        | Content rendered in the modal body.                                                                                                                                                                                                                       |
| `width`                        | `string \| number`                                     | `'500px'`      | —        | Width of the modal content panel (passed as CSS `style.width`).                                                                                                                                                                                           |
| `height`                       | `string \| number`                                     | `'auto'`       | —        | Height of the modal content panel (passed as CSS `style.height`).                                                                                                                                                                                         |
| `background`                   | `'base' \| 'alt' \| 'body'`                            | `'base'`       | —        | Background context token applied to `ModalContent` via `BackgroundContext`.                                                                                                                                                                               |
| `className`                    | `string`                                               | —              | —        | Additional class name applied to the `ModalWrap` Portal element.                                                                                                                                                                                          |
| `headerActions`                | `React.ReactNode`                                      | —              | —        | Custom actions placed in the header (e.g. help icon + close button). **Overrides the built-in close button and negates `onClose`** — you must wire close manually in your actions.                                                                        |
| `closeButtonProps`             | `ButtonProps`                                          | —              | —        | Props spread onto the built-in close `Button` in the header.                                                                                                                                                                                              |
| `closeIconProps`               | `CloseIconProps`                                       | —              | —        | **Deprecated** — use `closeButtonProps` instead. Aria string props are forwarded to the button; other props to the icon.                                                                                                                                  |
| `contentProps`                 | `ModalContentProps`                                    | —              | —        | Props spread onto the inner `ModalContent` component. Use for `bodyRef`, `bodyProps`, etc.                                                                                                                                                                |
| `modalHeaderProps`             | `ModalHeaderProps`                                     | —              | —        | Props spread onto the `ModalHeader` inside `ModalContent`. Supports `className`, `data-test-id`, `innerRef`.                                                                                                                                              |
| `headerTitleId`                | `string`                                               | auto-generated | —        | **Deprecated** — use `titleProps.id` instead. Sets the `id` on the title element for `aria-labelledby`.                                                                                                                                                   |
| `unmountOnClose`               | `boolean`                                              | —              | —        | When true, the modal is removed from the DOM after closing (useful to reset child component state).                                                                                                                                                       |
| `modalWrapRef`                 | `React.Ref<HTMLDivElement>`                            | —              | —        | Ref attached to the inner `ModalWrap` Portal div. Use to scope `getPopupContainer` for nested Selects/Tooltips.                                                                                                                                           |
| `onVisibleChange`              | `(visible: boolean) => void`                           | —              | —        | Called when the modal transitions from invisible→visible (after focus enters) or visible→invisible. Use to set custom focus targets on open.                                                                                                              |
| `focusOnFirstFocusableElement` | `boolean`                                              | `true`         | —        | Inherited from `FocusTrap`. When true (default), focus moves to the first focusable element on open.                                                                                                                                                      |
| `innerRef`                     | `React.Ref<HTMLDivElement>`                            | —              | —        | Inherited from `FocusTrap`. Alternative to `modalWrapRef` for ref access to the wrapper div.                                                                                                                                                              |

#### Static Members

- `Modal.ModalContent` = `ModalContent`

---

#### `ConfirmModalProps`

Extends: `ModalWrapProps`

| Prop                       | Type                                                   | Default          | Required | Description                                                                                                                                                          |
| -------------------------- | ------------------------------------------------------ | ---------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `visible`                  | `boolean`                                              | —                | —        | Controls visibility.                                                                                                                                                 |
| `header`                   | `React.ReactNode`                                      | —                | —        | Title for the confirm modal. Rendered as a `Title` (h3 styled, h2 tag). If omitted, a visually hidden default title "Please confirm" is rendered for screen readers. |
| `titleProps`               | `Omit<TitleProps, 'children'>`                         | —                | —        | Custom props for the header `Title`.                                                                                                                                 |
| `children`                 | `React.ReactNode`                                      | —                | —        | Body content. Plain strings are auto-wrapped in `<Paragraph>`.                                                                                                       |
| `onCancel`                 | `(e: React.MouseEvent \| React.KeyboardEvent) => void` | —                | —        | Called on Cancel button click or Escape key (if `closeOnEscape`).                                                                                                    |
| `onConfirm`                | `React.MouseEventHandler<HTMLButtonElement>`           | —                | —        | Called on Confirm button click.                                                                                                                                      |
| `cancelButtonLabel`        | `string`                                               | i18n `'Cancel'`  | —        | Label for the cancel button.                                                                                                                                         |
| `cancelButtonProps`        | `ButtonProps`                                          | —                | —        | Props spread onto the cancel `Button`.                                                                                                                               |
| `confirmButtonLabel`       | `string`                                               | i18n `'Confirm'` | —        | Label for the confirm button.                                                                                                                                        |
| `confirmButtonProps`       | `ButtonProps`                                          | —                | —        | Props spread onto the confirm `Button`.                                                                                                                              |
| `footer`                   | `boolean \| React.ReactNode`                           | `true`           | —        | Footer content. `true` renders centered Cancel + Confirm buttons. `false` hides footer. Array of nodes is wrapped in a centered `FlexLayout`.                        |
| `width`                    | `number`                                               | `400`            | —        | Width in px (number only, unlike `Modal.width` which accepts string too).                                                                                            |
| `height`                   | `string \| number`                                     | `'auto'`         | —        | Height of the content panel.                                                                                                                                         |
| `background`               | `'base' \| 'alt' \| 'body'`                            | `'base'`         | —        | Background context token.                                                                                                                                            |
| `closeOnEscape`            | `boolean`                                              | —                | —        | When true, pressing Escape calls `onCancel`.                                                                                                                         |
| `restoreFocus`             | `boolean`                                              | —                | —        | Return focus to triggering element on close.                                                                                                                         |
| `unmountOnClose`           | `boolean`                                              | —                | —        | Unmount from DOM when closed.                                                                                                                                        |
| `className`                | `string`                                               | —                | —        | Additional class on the wrapper.                                                                                                                                     |
| `headerTitleId`            | `string`                                               | auto-generated   | —        | **Deprecated** — use `titleProps.id`.                                                                                                                                |
| `modalDescId`              | `string`                                               | auto-generated   | —        | ID for the body element, wired to `aria-describedby` on the dialog.                                                                                                  |
| `confirmModalContentProps` | `ConfirmModalContentProps`                             | —                | —        | Escape hatch to pass additional props to the inner `ConfirmModalContent`.                                                                                            |
| `containerElement`         | `React.ReactNode \| ((props) => JSX.Element)`          | —                | —        | Custom container element for the content area.                                                                                                                       |

#### Static Members

- `ConfirmModal.ConfirmModalContent` = `ConfirmModalContent`

---

#### `FullPageModalProps`

Extends: `Omit<ModalWrapProps, 'title'>`

| Prop               | Type                                                   | Default        | Required | Description                                                          |
| ------------------ | ------------------------------------------------------ | -------------- | -------- | -------------------------------------------------------------------- |
| `visible`          | `boolean`                                              | —              | —        | Controls visibility.                                                 |
| `title`            | `React.ReactNode`                                      | —              | —        | Title in the full-page header (uses `ModalHeaderSize.LARGE` layout). |
| `children`         | `React.ReactNode`                                      | —              | —        | Body content.                                                        |
| `onClose`          | `(e: React.MouseEvent \| React.KeyboardEvent) => void` | —              | —        | Called when close button is clicked or Escape is pressed.            |
| `closeOnEscape`    | `boolean`                                              | —              | —        | When true, Escape calls `onClose`.                                   |
| `restoreFocus`     | `boolean`                                              | —              | —        | Return focus to triggering element on close.                         |
| `unmountOnClose`   | `boolean`                                              | —              | —        | Unmount from DOM on close.                                           |
| `background`       | `'base' \| 'alt' \| 'body'`                            | `'base'`       | —        | Background context token.                                            |
| `className`        | `string`                                               | —              | —        | Additional class on the wrapper.                                     |
| `headerActions`    | `React.ReactNode`                                      | —              | —        | Custom header actions (overrides built-in close button).             |
| `closeButtonProps` | `ButtonProps`                                          | —              | —        | Props for the built-in close button.                                 |
| `closeIconProps`   | `CloseIconProps`                                       | —              | —        | **Deprecated** — use `closeButtonProps`.                             |
| `headerTitleId`    | `string`                                               | auto-generated | —        | ID set on the header title element, used for `aria-labelledby`.      |
| `contentProps`     | `FullPageModalContentProps`                            | —              | —        | Props spread onto the inner `FullPageModalContent`.                  |

#### Static Members

- `FullPageModal.FullPageModalContent` = `FullPageModalContent`

---

#### `ModalWrapProps`

Low-level wrapper. Extends `Omit<FocusTrapProps, 'ref' | 'isActive'>`.

| Prop              | Type                                                   | Default                 | Description                                                                             |
| ----------------- | ------------------------------------------------------ | ----------------------- | --------------------------------------------------------------------------------------- |
| `visible`         | `boolean`                                              | —                       | Visibility state. The wrap is not rendered at all until `visible` is set at least once. |
| `type`            | `ModalWrapType`                                        | `ModalWrapType.DEFAULT` | Sets `data-type` on the wrapper and controls CSS sizing.                                |
| `closeOnEscape`   | `boolean`                                              | `true`                  | Close on Escape key press.                                                              |
| `onClose`         | `(e: React.MouseEvent \| React.KeyboardEvent) => void` | —                       | Escape/close callback.                                                                  |
| `unmountOnClose`  | `boolean`                                              | —                       | Unmount from DOM when animation ends post-close.                                        |
| `modalWrapRef`    | `React.Ref<HTMLDivElement>`                            | —                       | **Deprecated** — use `innerRef` instead.                                                |
| `onVisibleChange` | `(visible: boolean) => void`                           | —                       | Fired when visibility transitions.                                                      |
| `data-test`       | `string`                                               | —                       | Test automation attribute.                                                              |

```tsx
import { ModalWrap, ModalWrapType } from '@nutanix-ui/prism-reactjs'

// Enum values:
ModalWrapType.DEFAULT // 'default'
ModalWrapType.CONFIRM // 'confirm'
ModalWrapType.FULL_PAGE // 'full-page'

// Static aliases (deprecated):
ModalWrap.TYPE // same as ModalWrapType
ModalWrap.ModalWrapType // same as ModalWrapType
```

---

#### `ModalContentProps`

Standalone content component (no Portal). Accessible via `Modal.ModalContent`.

| Prop                   | Type                                                   | Default  | Description                                                                                                                   |
| ---------------------- | ------------------------------------------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `visible`              | `boolean`                                              | —        | Drives enter/exit animation (`pop-in` / `pop-out`).                                                                           |
| `title`                | `React.ReactNode`                                      | —        | Title rendered in `ModalHeader`.                                                                                              |
| `titleProps`           | `Omit<TitleProps, 'children'>`                         | —        | Custom props for title `Title`.                                                                                               |
| `children`             | `React.ReactNode`                                      | —        | Body content.                                                                                                                 |
| `footer`               | `boolean \| React.ReactNode`                           | —        | Footer content (same rules as `Modal.footer`).                                                                                |
| `footerProps`          | `React.HTMLProps<HTMLDivElement>`                      | —        | Props on the footer `div`.                                                                                                    |
| `primaryButtonLabel`   | `React.ReactNode`                                      | —        | Label for default primary button (when `footer={true}`).                                                                      |
| `primaryButtonOnClick` | `React.MouseEventHandler`                              | —        | Handler for default primary button.                                                                                           |
| `primaryButtonProps`   | `ButtonProps`                                          | —        | Extra props for the primary `Button`.                                                                                         |
| `onClose`              | `(e: React.MouseEvent \| React.KeyboardEvent) => void` | —        | Close callback.                                                                                                               |
| `headerActions`        | `React.ReactNode`                                      | —        | Custom header actions (overrides close button).                                                                               |
| `closeButtonProps`     | `ButtonProps`                                          | —        | Props for the built-in close `Button`.                                                                                        |
| `closeIconProps`       | `CloseIconProps`                                       | —        | **Deprecated** — use `closeButtonProps`.                                                                                      |
| `modalHeaderProps`     | `ModalHeaderProps`                                     | —        | Props passed to the inner `ModalHeader`.                                                                                      |
| `headerTitleId`        | `string`                                               | —        | **Deprecated** — use `titleProps.id`.                                                                                         |
| `width`                | `string \| number`                                     | —        | CSS width of the content panel.                                                                                               |
| `height`               | `string \| number`                                     | —        | CSS height of the content panel.                                                                                              |
| `background`           | `'base' \| 'alt' \| 'body'`                            | `'base'` | Background context token.                                                                                                     |
| `className`            | `string`                                               | —        | Additional class on the content wrapper div.                                                                                  |
| `bodyProps`            | `React.HTMLProps<HTMLDivElement>`                      | `{}`     | Props on the body `div`. Use `bodyProps.style = { position: 'relative' }` when mounting Select/Tooltip dropdowns to the body. |
| `bodyRef`              | `React.Ref<HTMLDivElement>`                            | —        | Ref attached to the body `div`. Pass to `getPopupContainer` for nested dropdowns.                                             |

---

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Accessibility Guidelines

```tsx
/* eslint-disable max-len */
<StackingLayout style={{ maxWidth: 800 }}>
  <Paragraph>
    Popup content should generally be mounted to the body of the modal for
    screen reader support. However, be aware that there are limitations when the
    modal space is very limited. In extreme cases this behavior may be
    counterintuitive and the popup may be unusable. Ask UX for alternative
    recommendations in these circumstances.
  </Paragraph>
  <Title size="h3">Focus Management</Title>
  <Paragraph>
    Managing keyboard focus is a common source of confusion when dealing with
    modals. Below are some guidelines for correctly handling focus, but you may
    need to work with UX to find the best solution for your specific use case.
  </Paragraph>
  <Title size="h4">When Modal is opened</Title>
  <UnorderedList
    data={[
      'Keyboard focus should usually go to the first interactive element within the modal.',
      'If modal content is very important to understanding the action required, it may make sense to set initial focus on a static element at the beginning of the container. While the modal heading is generally read out, modal content can be overlooked by screen reader users if the focus is set on an element in the modal footer.',
      'If setting the initial focus to the first interactive element causes the modal content to scroll out of view, it is better to set the focus on a static element at the beginning of the container.',
      'If the modal is the final step in an action that is destructive or difficult to reverse (such as deleting data), initial keyboard focus should be set on a non-destructive action (such as cancel or close) to avoid accidental clicks.',
    ]}
  />
  <Title size="h4">When Modal is closed</Title>
  <UnorderedList
    data={[
      'Keyboard focus should usually be returned to the triggering element. Use the restoreFocus={true} property for this behavior.',
      'If the triggering element no longer exists, then focus should be moved to another element that makes sense such as the previous control in a set or the container for the triggering element.',
      'If the task completed in the modal is directly related to a later step in the work flow, it may make sense to move the focus to that step.',
    ]}
  />
  <Paragraph>
    When setting focus on a non-interactive element, please ensure that tabindex
    is set to -1 and that the element receiving focus is either a text element
    or has an accessible label.
  </Paragraph>
</StackingLayout>
/* eslint-enable max-len */
```

#### Basic Example

```tsx
import React from 'react'
import {
  Modal,
  Button,
  StackingLayout,
  Paragraph,
} from '@nutanix-ui/prism-reactjs'

class MyModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }

    this.footerRef = React.createRef()
    this.headerRef = React.createRef()
    this.handleOnClose = this.handleOnClose.bind(this)
  }

  handleOnClose() {
    this.setState({ visible: false })
  }

  render() {
    return (
      <div>
        <Button
          data-test-id="open-modal"
          type={Button.ButtonTypes.PRIMARY}
          onClick={() => this.setState({ visible: true })}
        >
          Open Modal
        </Button>
        <Modal
          visible={this.state.visible}
          title="Modal"
          onClose={this.handleOnClose}
          restoreFocus={true}
          closeButtonProps={{ 'data-test': 'my-close-icon-data-test' }}
          primaryButtonOnClick={this.handleOnClose}
          footerProps={{
            className: 'footer-custom-class',
            'data-test-id': 'basic-modal-footer',
            ref: this.footerRef,
          }}
          modalHeaderProps={{
            className: 'header-custom-class',
            'data-test-id': 'basic-modal-header',
            innerRef: this.headerRef,
          }}
        >
          <StackingLayout padding="20px">
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam...
            </Paragraph>
          </StackingLayout>
        </Modal>
      </div>
    )
  }
}
```

#### No Footer Example

```tsx
import React from 'react'
import {
  Modal,
  Button,
  StackingLayout,
  Paragraph,
} from '@nutanix-ui/prism-reactjs'

class MyModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { visible: false }
    this.handleOnClose = this.handleOnClose.bind(this)
  }

  handleOnClose() {
    this.setState({ visible: false })
  }

  render() {
    return (
      <div>
        <Button
          data-test-id="no-footer-modal"
          type={Button.ButtonTypes.PRIMARY}
          onClick={() => this.setState({ visible: true })}
        >
          Open Modal
        </Button>
        <Modal
          visible={this.state.visible}
          title="Modal"
          footer={false}
          onClose={this.handleOnClose}
          restoreFocus={true}
        >
          <StackingLayout padding="20px">
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </Paragraph>
          </StackingLayout>
        </Modal>
      </div>
    )
  }
}
```

#### Custom Header Actions (Help + Close icons)

```tsx
import React from 'react'
import {
  Modal,
  Button,
  QuestionIcon,
  CloseIcon,
  Link,
  StackingLayout,
  Paragraph,
} from '@nutanix-ui/prism-reactjs'

class MyModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { visible: false }
    this.handleOnClose = this.handleOnClose.bind(this)
  }

  handleOnClose() {
    this.setState({ visible: false })
  }

  render() {
    return (
      <div>
        <Button
          data-test-id="open-modal"
          type={Button.ButtonTypes.PRIMARY}
          onClick={() => this.setState({ visible: true })}
        >
          Open Modal
        </Button>
        <Modal
          visible={this.state.visible}
          title="Modal"
          onClose={this.handleOnClose}
          restoreFocus={true}
          primaryButtonOnClick={this.handleOnClose}
          headerActions={[
            <Link
              key="help"
              type="secondary"
              onClick={() => this.handleOnClose()}
              href="#"
            >
              <QuestionIcon
                key="question"
                aria-hidden="false"
                aria-label="Documentation"
              />
            </Link>,
            <Button
              key="close"
              onClick={() => this.handleOnClose()}
              type={Button.ButtonTypes.ICON_SECONDARY}
            >
              <CloseIcon
                key="close-icon"
                aria-hidden="false"
                aria-label="Close modal"
              />
            </Button>,
          ]}
        >
          <StackingLayout padding="20px">
            <Paragraph>Lorem ipsum dolor sit amet...</Paragraph>
          </StackingLayout>
        </Modal>
      </div>
    )
  }
}
```

#### Custom Focus on Open (onVisibleChange)

```tsx
import React from 'react'
import {
  Modal,
  Button,
  StackingLayout,
  Paragraph,
  FlexLayout,
} from '@nutanix-ui/prism-reactjs'

class CustomFocusModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { visible: false }
    this.resetBtnRef = React.createRef()
    this.handleOnClose = this.handleOnClose.bind(this)
    this.onVisibleChange = this.onVisibleChange.bind(this)
  }

  handleOnClose() {
    this.setState({ visible: false })
  }

  onVisibleChange(visible) {
    if (visible && this.resetBtnRef.current) {
      this.resetBtnRef.current.focus()
    }
  }

  render() {
    return (
      <div>
        <Button
          data-test-id="open-custom-focus-modal"
          type={Button.ButtonTypes.PRIMARY}
          onClick={() => this.setState({ visible: true })}
        >
          Open Modal
        </Button>
        <Modal
          visible={this.state.visible}
          title="Custom Focus Modal"
          onClose={this.handleOnClose}
          restoreFocus={true}
          onVisibleChange={this.onVisibleChange}
          footer={
            <FlexLayout itemSpacing="10px" justifyContent="flex-end">
              <Button
                data-test-id="reset-button"
                innerRef={this.resetBtnRef}
                type="secondary"
              >
                Reset
              </Button>
              <Button>Save</Button>
            </FlexLayout>
          }
        >
          <StackingLayout padding="20px">
            <Paragraph>Lorem ipsum dolor sit amet...</Paragraph>
          </StackingLayout>
        </Modal>
      </div>
    )
  }
}
```

#### Mounting Select/Tooltip to Modal Body (getPopupContainer pattern)

```tsx
import React, { useRef, useState } from 'react'
import {
  Modal,
  Button,
  StackingLayout,
  Select,
} from '@nutanix-ui/prism-reactjs'

const MyModal = () => {
  const modalRef = useRef(null)
  const modalBodyRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)

  return (
    <div>
      <Button
        type={Button.ButtonTypes.PRIMARY}
        onClick={() => setVisible(true)}
      >
        Open Modal
      </Button>
      <Modal
        visible={visible}
        title="Select Example"
        modalWrapRef={modalRef}
        onClose={() => setVisible(false)}
        restoreFocus={true}
        contentProps={{
          bodyRef: modalBodyRef,
          bodyProps: {
            style: { maxHeight: 400, position: 'relative' },
          },
        }}
        footer={<Button onClick={() => setVisible(false)}>Close</Button>}
      >
        <StackingLayout padding="20px">
          {/* getPopupContainer mounts the dropdown inside the modal body for correct scrolling */}
          <Select
            rowsData={[{ key: '1', label: 'Option 1' }]}
            selectedRow={selected}
            onSelectedChange={setSelected}
            getPopupContainer={() => modalBodyRef.current}
          />
        </StackingLayout>
      </Modal>
    </div>
  )
}
```

#### ConfirmModal — Basic Usage

```tsx
import React from 'react'
import { ConfirmModal, Button } from '@nutanix-ui/prism-reactjs'

class MyConfirmModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { visible: false }
    this.handleOnClose = this.handleOnClose.bind(this)
  }

  handleOnClose() {
    this.setState({ visible: false })
  }

  render() {
    return (
      <div>
        <Button
          type={Button.ButtonTypes.PRIMARY}
          onClick={() => this.setState({ visible: true })}
        >
          Delete
        </Button>
        <ConfirmModal
          visible={this.state.visible}
          header="Delete VM?"
          onCancel={this.handleOnClose}
          onConfirm={() => {
            // perform delete
            this.handleOnClose()
          }}
          closeOnEscape={true}
          restoreFocus={true}
          confirmButtonLabel="Delete"
          cancelButtonLabel="Cancel"
          confirmButtonProps={{ type: Button.ButtonTypes.DESTRUCTIVE }}
        >
          This action cannot be undone.
        </ConfirmModal>
      </div>
    )
  }
}
```

#### Nested ConfirmModal inside a Modal (warning before close)

```tsx
import React from 'react'
import {
  Modal,
  Button,
  ConfirmModal,
  FormLayout,
  FormSection,
  FormItemInput,
} from '@nutanix-ui/prism-reactjs'

class MyModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      warningVisible: false,
      email: '',
    }

    this.handleOnClose = this.handleOnClose.bind(this)
    this.handleOnConfirmWarning = this.handleOnConfirmWarning.bind(this)
    this.handleOnCancelWarning = this.handleOnCancelWarning.bind(this)
  }

  formIsPartiallyCompleted() {
    return this.state.email !== ''
  }

  handleOnClose() {
    if (this.formIsPartiallyCompleted()) {
      this.setState({ warningVisible: true })
    } else {
      this.setState({ visible: false })
    }
  }

  handleOnCancelWarning() {
    this.setState({ warningVisible: false })
  }

  handleOnConfirmWarning() {
    this.setState({ warningVisible: false, visible: false, email: '' })
  }

  render() {
    return (
      <div>
        <Button
          data-test-id="open-modal"
          type={Button.ButtonTypes.PRIMARY}
          onClick={() => this.setState({ visible: true })}
        >
          Open Modal
        </Button>
        <Modal
          visible={this.state.visible}
          title="Modal"
          closeOnEscape={true}
          onClose={this.handleOnClose}
          restoreFocus={true}
          primaryButtonOnClick={this.handleOnClose}
        >
          <FormLayout>
            <FormSection title="General Configuration">
              <FormItemInput
                id="email"
                label="Email"
                value={this.state.email}
                onChange={(event) =>
                  this.setState({ email: event.target.value })
                }
              />
            </FormSection>
          </FormLayout>
        </Modal>
        <ConfirmModal
          visible={this.state.warningVisible}
          onCancel={this.handleOnCancelWarning}
          closeOnEscape={true}
          onConfirm={this.handleOnConfirmWarning}
        >
          The changes you have made will not be saved. Are you sure you want to
          close?
        </ConfirmModal>
      </div>
    )
  }
}
```

#### FullPageModal — Basic Usage

```tsx
import React from 'react'
import {
  FullPageModal,
  Button,
  FlexLayout,
  FormLayout,
  FormSection,
  FormItemInput,
} from '@nutanix-ui/prism-reactjs'

class MyFullPageModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { visible: false }
    this.handleOnClose = this.handleOnClose.bind(this)
  }

  handleOnClose() {
    this.setState({ visible: false })
  }

  render() {
    return (
      <div>
        <Button
          type={Button.ButtonTypes.PRIMARY}
          onClick={() => this.setState({ visible: true })}
        >
          Open Full-Page Modal
        </Button>
        <FullPageModal
          visible={this.state.visible}
          title="Configure Application"
          onClose={this.handleOnClose}
          restoreFocus={true}
          closeOnEscape={true}
          contentProps={{
            bodyProps: {
              style: { padding: '20px' },
            },
            footer: (
              <FlexLayout itemSpacing="10px" justifyContent="flex-end">
                <Button
                  type={Button.ButtonTypes.SECONDARY}
                  onClick={this.handleOnClose}
                >
                  Cancel
                </Button>
                <Button onClick={this.handleOnClose}>Save</Button>
              </FlexLayout>
            ),
          }}
        >
          <FormLayout>
            <FormSection title="General">
              <FormItemInput id="app-name" label="Application Name" />
            </FormSection>
          </FormLayout>
        </FullPageModal>
      </div>
    )
  }
}
```

#### Presentation (ModalContent standalone — demo use only)

```tsx
import React from 'react'
import {
  Modal,
  FlexLayout,
  Button,
  StackingLayout,
  Paragraph,
} from '@nutanix-ui/prism-reactjs'

const { ModalContent } = Modal

// ModalContent renders without a Portal — useful for style guides and demos.
// In production always use <Modal> so focus trapping and Portal behaviour are included.
;<div
  className="ntnx ntnx-modal"
  style={{ borderRadius: '4px', width: '500px', position: 'relative' }}
>
  <ModalContent
    visible={true}
    width="500px"
    title="VM Configuration"
    headerActions={
      <Button
        key="cancel-btn"
        aria-label="Cancel"
        type={Button.ButtonTypes.ICON_SECONDARY}
        onClick={() => {}}
      >
        <CloseIcon />
      </Button>
    }
    footer={
      <FlexLayout itemSpacing="10px" justifyContent="flex-end">
        <Button type="secondary">Cancel</Button>
        <Button>Save</Button>
      </FlexLayout>
    }
  >
    <StackingLayout padding="20px">
      <Paragraph>Here is an example modal body.</Paragraph>
    </StackingLayout>
  </ModalContent>
</div>
```

#### Example without focusable element (not recommended)

```tsx
import React from 'react'
import {
  Modal,
  Button,
  StackingLayout,
  Paragraph,
  Alert,
} from '@nutanix-ui/prism-reactjs'

class ModalWithoutFocusableElement extends React.Component {
  constructor(props) {
    super(props)
    this.state = { visible: false }
    this.handleOnClose = this.handleOnClose.bind(this)
  }

  handleOnClose() {
    this.setState({ visible: false })
  }

  render() {
    return (
      <StackingLayout style={{ width: 800 }}>
        <Alert
          type={Alert.AlertTypes.WARNING}
          showCloseIcon={false}
          message={`Usage without any focusable element is not recommended; keyboard navigation and focus
             trap do not behave as expected.
             Modal should contain at least one focusable element.`}
        />
        <Button
          data-test-id="open-modal-without-focusable-element"
          type={Button.ButtonTypes.PRIMARY}
          onClick={() => this.setState({ visible: true })}
        >
          Open Modal
        </Button>
        <Modal
          visible={this.state.visible}
          footer={null}
          closeButtonProps={{ disabled: true }}
          onClose={this.handleOnClose}
          restoreFocus={true}
          primaryButtonOnClick={this.handleOnClose}
        >
          <StackingLayout padding="20px">
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Paragraph>
          </StackingLayout>
        </Modal>
      </StackingLayout>
    )
  }
}
```

### Usage Notes

- Prefer documented enum/static values such as `Button.ButtonTypes.SECONDARY` over raw strings when available.
- Keep labels, help text, and validation visible and persistent for form controls; use `FormItem*` wrappers where available.
- Use Prism layout props (`itemSpacing`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.
- The modal is not rendered into the DOM at all until `visible` is set for the first time (lazy mount). Use `unmountOnClose` if you additionally want it removed from the DOM on every close.
- `Modal` sets `role="dialog"` and `aria-labelledby` automatically. `ConfirmModal` sets `role="alertdialog"` with both `aria-labelledby` and `aria-describedby`.
- When Tooltip or Popover components are nested inside a modal, set `mountElement` (Tooltip) or `getPopupContainer` (Select) to return the modal body ref to ensure correct screen reader announcement and scroll behaviour.
- `FullPageModal` uses `ModalHeaderSize.LARGE` (spacious header with `justifyContent: space-between`) whereas `Modal` uses `ModalHeaderSize.DEFAULT`.
- `background` values (`'base'`, `'alt'`, `'body'`) propagate through `BackgroundContext` to all Prism components inside the modal so tokens resolve correctly for the surface.

<!-- SOURCE-API-END -->
