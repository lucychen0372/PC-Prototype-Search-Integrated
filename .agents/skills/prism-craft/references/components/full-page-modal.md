# FullPageModal

## Figma

- **Library name:** Fullpage Modal (page: N/A, frame: Fullpage Modal)
- **Figma spec:** [Design spec node](https://www.figma.com/design/KVbKkR0QAFRbTVpwysQLWw/Spec-Doc?node-id=21116-165843)

## React

Import: `import { FullPageModal } from '@nutanix-ui/prism-reactjs'`

### When to use

- Complex multi-step flows that need the full viewport (wizards, setup flows).
- Single-step UI with a large amount of components (double sidebars, analysis views).

### Anti-patterns

- Do not use `Modal` with `width`/`height` set to 100% — use `FullPageModal` instead.
- Do not place footer action buttons in `headerActions`; put them inline in the modal body content.

<!-- SOURCE-API-START -->

### Import

```tsx
import { FullPageModal } from '@nutanix-ui/prism-reactjs'
```

The static `FullPageModalContent` subcomponent can be destructured from the composite:

```tsx
const { FullPageModalContent } = FullPageModal
```

---

### Props Interfaces

#### `FullPageModalProps`

Extends: `Omit<ModalWrapProps, 'title'>` (which itself extends `Omit<FocusTrapProps, 'ref' | 'isActive'>`)

All props are **optional** unless marked required.

| Prop                           | Type                                                   | Default                             | Description                                                                                                                                                                                                                   |
| ------------------------------ | ------------------------------------------------------ | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `visible`                      | `boolean`                                              | —                                   | Controls whether the modal is shown. Drives the swipe-up/swipe-down animation.                                                                                                                                                |
| `title`                        | `React.ReactNode \| string`                            | —                                   | Title rendered in the modal header. When a string is passed it renders as a `<Title size="h3" tag="h2">`.                                                                                                                     |
| `onClose`                      | `(e: React.MouseEvent \| React.KeyboardEvent) => void` | —                                   | Called when the built-in close (X) button is clicked, or when Escape is pressed if `closeOnEscape` is true. Providing `headerActions` disables the built-in close button and this prop is ignored for that button.            |
| `children`                     | `React.ReactNode`                                      | —                                   | Content rendered inside the modal body.                                                                                                                                                                                       |
| `className`                    | `string`                                               | —                                   | Additional CSS class applied to the modal wrapper.                                                                                                                                                                            |
| `headerActions`                | `React.ReactNode`                                      | —                                   | Custom action nodes rendered in the header (e.g. Help and Close icons). **When provided, the default close button is hidden and `onClose` is NOT automatically wired** — you must wire `onClick` on your close icon manually. |
| `contentProps`                 | `FullPageModalContentProps`                            | —                                   | Props forwarded directly to the inner `FullPageModalContent` element (e.g. `bodyRef`, `bodyProps`).                                                                                                                           |
| `background`                   | `'base' \| 'alt' \| 'body'`                            | `'base'`                            | Sets the `BackgroundContext` for the modal body. Affects child components that are background-context-aware.                                                                                                                  |
| `closeOnEscape`                | `boolean`                                              | `true` (inherited from `ModalWrap`) | When true, pressing Escape calls `onClose`.                                                                                                                                                                                   |
| `unmountOnClose`               | `boolean`                                              | `false`                             | When true, the modal DOM is unmounted after it closes (useful for resetting child state). By default the modal stays mounted and hidden.                                                                                      |
| `restoreFocus`                 | `boolean`                                              | —                                   | Returns focus to the element that triggered the modal when the modal closes.                                                                                                                                                  |
| `headerTitleId`                | `string`                                               | auto-generated                      | ID applied to the header title element for `aria-labelledby`. Auto-generated with `uniqueId` if not provided.                                                                                                                 |
| `closeButtonProps`             | `ButtonProps`                                          | —                                   | Props forwarded to the default close `Button` in the header (e.g. `data-test`).                                                                                                                                               |
| `closeIconProps`               | `CloseIconProps`                                       | —                                   | **Deprecated** — use `closeButtonProps` instead. Props forwarded to the `CloseIcon` inside the default close button. Aria props are hoisted to the button; non-aria props go to the icon.                                     |
| `modalWrapRef`                 | `React.Ref<HTMLDivElement>`                            | —                                   | **Deprecated** — use `innerRef` instead. Ref to the inner modal wrapper `<div>`. Useful for mounting popups (Select, Tooltip) inside the modal.                                                                               |
| `innerRef`                     | `React.Ref<HTMLDivElement>`                            | —                                   | Ref to the inner modal wrapper `<div>`. Prefer over `modalWrapRef`.                                                                                                                                                           |
| `focusOnFirstFocusableElement` | `boolean`                                              | `true`                              | When true, focus is moved to the first focusable child when the modal opens.                                                                                                                                                  |
| `passThrough`                  | `boolean`                                              | —                                   | When true, Tab on the last item (or Shift+Tab on the first) moves focus to the trigger instead of looping inside the trap.                                                                                                    |
| `onPassThrough`                | `() => void`                                           | —                                   | Called when focus leaves the trap via pass-through Tab movement.                                                                                                                                                              |
| `onVisibleChange`              | `(visible: boolean) => void`                           | —                                   | Fires when the modal transitions to visible or hidden (after focus change, not animation).                                                                                                                                    |
| `data-test`                    | `string`                                               | —                                   | Test ID forwarded to the modal wrapper element.                                                                                                                                                                               |

> `FullPageModal` spreads any additional HTML `<div>` props onto the underlying `ModalWrap` / `FocusTrap` container.

---

#### `FullPageModalContentProps`

Used directly when rendering `FullPageModal.FullPageModalContent` standalone, or passed via `contentProps` on `FullPageModal`.

Extends: `Omit<React.HTMLProps<HTMLDivElement>, 'ref' | 'title'>` and `Pick<ModalHeaderProps, 'headerActions' | 'onClose' | 'closeIconProps' | 'closeButtonProps'>`

| Prop               | Type                                                   | Default  | Description                                                                                                                         |
| ------------------ | ------------------------------------------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `visible`          | `boolean`                                              | —        | Drives the swipe-up (`true`) / swipe-down (`false`) CSS animation on the content element.                                           |
| `title`            | `React.ReactNode \| string`                            | —        | Title rendered inside the header.                                                                                                   |
| `headerTitleId`    | `string`                                               | —        | Unique ID applied to the title for `aria-labelledby` on the parent dialog.                                                          |
| `headerActions`    | `React.ReactNode`                                      | —        | Custom header action nodes. Replaces the built-in close button.                                                                     |
| `onClose`          | `(e: React.MouseEvent \| React.KeyboardEvent) => void` | —        | Close callback wired to the default close button.                                                                                   |
| `closeButtonProps` | `ButtonProps`                                          | —        | Props forwarded to the default close `Button`.                                                                                      |
| `closeIconProps`   | `CloseIconProps`                                       | —        | **Deprecated** — use `closeButtonProps`. Props forwarded to the `CloseIcon` inside the default close button.                        |
| `background`       | `'base' \| 'alt' \| 'body'`                            | `'base'` | Background context for child components.                                                                                            |
| `children`         | `React.ReactNode`                                      | —        | Modal body content.                                                                                                                 |
| `bodyProps`        | `React.HTMLProps<HTMLDivElement>`                      | `{}`     | Props forwarded to the modal body `<div>` (e.g. `style: { position: 'relative' }` to enable scroll-aware popups).                   |
| `bodyRef`          | `React.Ref<HTMLDivElement>`                            | —        | Ref attached to the modal body `<div>`. Use with `getPopupContainer` on Select/Tooltip to mount floating elements inside the modal. |
| `data-test`        | `string`                                               | —        | Test ID forwarded to the content wrapper element.                                                                                   |
| `className`        | `string`                                               | —        | Additional CSS class on the content wrapper.                                                                                        |
| `style`            | `React.CSSProperties`                                  | —        | Inline style on the content wrapper.                                                                                                |

---

### Static Members

- `FullPageModal.FullPageModalContent` — the `FullPageModalContent` component, re-exported for convenience.

---

### Behaviour Notes

- **Animation:** The modal uses a Portal (`react-portal`) to render outside the normal DOM tree. It animates with `fade-in`/`fade-out` on the outer `ModalWrap` and `swipe-up`/`swipe-down` on the inner `FullPageModalContent`. The DOM is not removed until the animation completes (unless `unmountOnClose` is true).
- **Focus trap:** Focus is trapped inside the modal while visible. `focusOnFirstFocusableElement` (default `true`) moves focus to the first focusable child automatically.
- **Escape key:** Escape calls `onClose` when `closeOnEscape` is true (the default for `ModalWrap`).
- **`aria-labelledby`:** The outer `ModalWrap` has `role="dialog"` and `aria-labelledby` wired to the header title ID. The ID is auto-generated via `uniqueId` unless you pass `headerTitleId`.
- **Background context:** `FullPageModalContent` wraps children in `BackgroundContext.Provider`. Set `background` to `'alt'` or `'body'` to change the surface colour and propagate the correct contrast background to nested context-aware Prism components.
- **Popup mounting:** When using `Select`, `Tooltip`, or other floating elements inside the modal, mount them to the modal body DOM node to keep z-index and scroll behaviour correct. Pass `bodyRef` via `contentProps`, set `position: relative` on the body via `bodyProps`, and pass `getPopupContainer={() => bodyRef.current}` to floating elements. Pass `mountElement` to `Tooltip`.
- **Warn before closing:** Show a `ConfirmModal` from inside `onClose` to intercept close events when the user has unsaved data. Set `closeOnEscape={true}` so Escape also routes through `onClose`.
- **Multi-modal:** `FullPageModal` can be stacked on top of a `Modal`. The full-page modal renders in a Portal at the top of the stacking context.

---

### Accessibility

- Managing keyboard focus is the most common source of confusion with modals. Set `restoreFocus={true}` to return focus to the trigger element when the modal closes.
- When `headerActions` is used to add a custom close button, you must provide `aria-label="Close"` (or equivalent) on the action element — the built-in close button's accessible label is no longer rendered.
- The outer `ModalWrap` renders with `aria-modal="true"`.
- For Tooltips nested inside the modal, pass `mountElement={() => modalWrapRef.current}` for correct screen-reader association.

---

### Source Examples

These are adapted from the Prism source examples. When generating app code, prefer functional components with hooks over class components.

#### Minimal working example

```tsx
import { useState } from 'react'
import { FullPageModal, Button } from '@nutanix-ui/prism-reactjs'

function Example() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button
        type={Button.ButtonTypes.PRIMARY}
        onClick={() => setVisible(true)}
      >
        Open Modal
      </Button>
      <FullPageModal
        visible={visible}
        title="Setup Wizard"
        onClose={() => setVisible(false)}
        restoreFocus={true}
        closeOnEscape={true}
      >
        {/* modal body content */}
      </FullPageModal>
    </>
  )
}
```

#### Basic example — form with header actions

```tsx
import React from 'react'
import {
  FullPageModal,
  Alert,
  FlexLayout,
  Button,
  QuestionIcon,
  CloseIcon,
  FormLayout,
  FormSection,
  FormItemInput,
  FormItemSelect,
  Checkbox,
} from '@nutanix-ui/prism-reactjs'

class MyModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { visible: false, checked: false }
    this.handleOnClose = this.handleOnClose.bind(this)
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this)
  }

  handleCheckboxClick() {
    this.setState({ checked: !this.state.checked })
  }

  handleOnClose() {
    this.setState({ visible: false })
  }

  render() {
    const data = [{ key: 'optionOne', label: 'App Type: Microsoft Exchange' }]
    return (
      <div>
        <Button
          data-test-id="open-fullpage-modal"
          type={Button.ButtonTypes.PRIMARY}
          onClick={() => this.setState({ visible: true })}
        >
          Open Full-Page Modal
        </Button>
        <FullPageModal
          visible={this.state.visible}
          title="Add New App Security Policy"
          onClose={this.handleOnClose}
          restoreFocus={true}
          headerActions={[
            <FlexLayout
              htmlTag="button"
              key="help-btn"
              aria-label="Documentation"
              type={Button.ButtonTypes.ICON_DEFAULT}
            >
              <QuestionIcon key="question" />
            </FlexLayout>,
            <FlexLayout
              htmlTag="button"
              key="close-btn"
              aria-label="Close"
              type={Button.ButtonTypes.ICON_DEFAULT}
              onClick={this.handleOnClose}
            >
              <CloseIcon key="close" />
            </FlexLayout>,
          ]}
        >
          <Alert
            type={Alert.AlertTypes.INFO}
            message="It is recommended to secure the app to avoid potential intrusions."
          />
          <FormLayout contentWidth="600px">
            <FormSection>
              <FormItemInput
                id="name"
                label="Name"
                placeholder="Name"
                defaultValue="New App Security Policy"
              />
              <FormItemInput
                id="purpose"
                label="Purpose"
                placeholder="e.g. Secure Microsoft Exchange"
              />
            </FormSection>
            <FormSection>
              <FormItemSelect
                id="secure"
                label="Secure This App"
                selectedRow={data[0]}
                rowsData={data}
              />
              <Checkbox
                checked={this.state.checked}
                onChange={this.handleCheckboxClick}
                id="checkbox"
                label="Secure this app in a specific data center"
              />
            </FormSection>
            <FormSection>
              <FlexLayout itemSpacing="10px" justifyContent="flex-end">
                <Button
                  onClick={this.handleOnClose}
                  type={Button.ButtonTypes.SECONDARY}
                >
                  Cancel
                </Button>
                <Button onClick={this.handleOnClose}>Save</Button>
              </FlexLayout>
            </FormSection>
          </FormLayout>
        </FullPageModal>
      </div>
    )
  }
}
```

#### With Steps (wizard pattern)

```tsx
import React from 'react'
import {
  FullPageModal,
  FlexLayout,
  FormLayout,
  FormSection,
  FormItemInput,
  Button,
  Steps,
  ChevronLeftIcon,
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
          type={Button.ButtonTypes.PRIMARY}
          onClick={() => this.setState({ visible: true })}
        >
          Open Full-Page Modal
        </Button>
        <FullPageModal
          visible={this.state.visible}
          title="Full-Page Modal Title"
          onClose={this.handleOnClose}
          restoreFocus={true}
        >
          <Steps
            panelIdPrefix="steps"
            aria-label="Steps"
            data={[
              { title: 'Finished Step' },
              { title: 'Current Step' },
              { title: 'Unfinished Step' },
            ]}
            current={1}
          />
          <FormLayout contentWidth="600px">
            <FormSection>
              <FormItemInput id="name" label="Name" placeholder="Name" />
            </FormSection>
            <FormSection>
              <FlexLayout itemSpacing="10px" justifyContent="space-between">
                <Button type={Button.ButtonTypes.SECONDARY}>
                  <ChevronLeftIcon aria-hidden="true" /> Back
                </Button>
                <Button>Next</Button>
              </FlexLayout>
            </FormSection>
          </FormLayout>
        </FullPageModal>
      </div>
    )
  }
}
```

#### With Vertical Steps (sidebar layout)

```tsx
<FullPageModal
  visible={visible}
  title="Full-Page Modal Title"
  onClose={handleOnClose}
  restoreFocus={true}
>
  <FlexLayout alignItems="flex-start" itemSpacing="0px">
    <Steps
      panelIdPrefix="steps"
      flexDirection="column"
      aria-label="Vertical steps"
      data={[
        { title: 'Finished Step' },
        { title: 'Current Step' },
        { title: 'Unfinished Step' },
      ]}
      current={1}
    />
    {/* main content panel */}
  </FlexLayout>
</FullPageModal>
```

#### With Tabs

```tsx
import { FullPageModal, Tabs, Button } from '@nutanix-ui/prism-reactjs'
import { uniqueId } from 'lodash'

// ...inside component state:
// panelIdPrefix: uniqueId('tabs-panel-'), activeKey: '1'
;<FullPageModal
  visible={visible}
  title="Full-Page Modal Title"
  onClose={handleOnClose}
  restoreFocus={true}
>
  <Tabs
    data={[
      { title: 'General Settings', key: '1' },
      { title: 'Users and Roles', key: '2' },
      { title: 'Settings', key: '3' },
    ]}
    panelIdPrefix={panelIdPrefix}
    onTabClick={(key) => setActiveKey(key)}
    defaultActiveKey="1"
    justifyContent="center"
    id="modal-with-tabs"
    aria-label="Modal with tabs example tablist"
  />
  {/* tab panel content */}
</FullPageModal>
```

#### Fetching data (loading state)

```tsx
import {
  FullPageModal,
  FlexLayout,
  Loader,
  Button,
} from '@nutanix-ui/prism-reactjs'
;<FullPageModal
  visible={visible}
  title="Full-Page Modal Title"
  onClose={handleOnClose}
  restoreFocus={true}
>
  <FlexLayout
    style={{ height: '100%' }}
    flexGrow="1"
    alignItems="center"
    justifyContent="center"
  >
    <Loader tip="Fetching Data..." overlay={true} />
  </FlexLayout>
</FullPageModal>
```

#### Select dropdown scrolling inside modal

Mount floating elements to the modal body DOM node to keep scroll and z-index correct.

```tsx
import React from 'react'
import {
  FullPageModal,
  Select,
  Button,
  FlexLayout,
} from '@nutanix-ui/prism-reactjs'

class MyModal extends React.Component {
  constructor(props) {
    super(props)
    this.modalBodyRef = React.createRef()
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
          title="Full-Page Modal Title"
          onClose={this.handleOnClose}
          restoreFocus={true}
          contentProps={{
            // 1. Attach ref to the modal body
            bodyRef: this.modalBodyRef,
            // 2. Set position: relative to enable scroll-aware floating elements
            bodyProps: { style: { position: 'relative' } },
          }}
        >
          <Select
            rowsData={[{ key: 1, label: 'Option A' }]}
            label="Clusters"
            // 3. Mount the popup inside the modal body
            getPopupContainer={() => this.modalBodyRef.current}
          />
        </FullPageModal>
      </div>
    )
  }
}
```

> **Pro tip:** Follow the same pattern for `Tooltip` — pass `mountElement={() => modalWrapRef.current}` to keep screen-reader associations inside the modal.

#### Warning before closing (guard pattern)

```tsx
import React from 'react'
import {
  FullPageModal,
  ConfirmModal,
  Button,
  FormItemInput,
  FormLayout,
  FormSection,
} from '@nutanix-ui/prism-reactjs'

class MyModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { visible: false, warningVisible: false, name: '' }
    this.handleOnClose = this.handleOnClose.bind(this)
    this.handleOnConfirmWarning = this.handleOnConfirmWarning.bind(this)
  }

  handleOnClose() {
    if (this.state.name !== '') {
      this.setState({ warningVisible: true })
    } else {
      this.setState({ visible: false })
    }
  }

  handleOnConfirmWarning() {
    this.setState({ warningVisible: false, visible: false, name: '' })
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
          title="Full-Page Modal Title"
          onClose={this.handleOnClose}
          closeOnEscape={true}
          restoreFocus={true}
        >
          <FormLayout contentWidth="600px">
            <FormSection>
              <FormItemInput
                id="name"
                label="Name"
                placeholder="Name"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </FormSection>
          </FormLayout>
        </FullPageModal>
        <ConfirmModal
          visible={this.state.warningVisible}
          onCancel={() => this.setState({ warningVisible: false })}
          onConfirm={this.handleOnConfirmWarning}
        >
          The changes you have made will not be saved. Are you sure you want to
          close the modal?
        </ConfirmModal>
      </div>
    )
  }
}
```

#### Unmount on close (reset child state)

```tsx
import React, { useState } from 'react'
import {
  FullPageModal,
  Button,
  FormItemInput,
  FlexLayout,
} from '@nutanix-ui/prism-reactjs'

function ModalContent() {
  const [inputValue, setInputValue] = useState('VM Apache')
  return (
    <FlexLayout padding="20px">
      <FormItemInput
        id="input-name"
        label="Name"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </FlexLayout>
  )
}

// Pass unmountOnClose={true} to reset ModalContent state on each open:
;<FullPageModal
  visible={visible}
  title="Modal"
  onClose={handleOnClose}
  restoreFocus={true}
  unmountOnClose={true}
  closeButtonProps={{ 'data-test': 'close-icon-data-test' }}
>
  <ModalContent />
</FullPageModal>
```

#### Background context variants

The `background` prop controls which design-token surface the modal renders on and propagates to context-aware children.

```tsx
// Renders on the 'alt' surface (useful when the modal is opened from an 'alt' background section)
<FullPageModal
  visible={visible}
  title="Full-Page Modal Title"
  onClose={handleOnClose}
  background="alt"
>
  {/* children automatically receive contrasting background context */}
</FullPageModal>
```

Valid values: `'base'` (default) | `'alt'` | `'body'`

#### Standalone `FullPageModalContent` (no Portal)

`FullPageModalContent` can be used independently when you need modal-style content layout without a Portal (e.g. for Storybook-style presentation):

```tsx
import { FullPageModal } from '@nutanix-ui/prism-reactjs'

const { FullPageModalContent } = FullPageModal

;<FullPageModalContent
  visible={true}
  title="Full-Page Modal Title"
  headerActions={[
    <FlexLayout
      htmlTag="button"
      key="help"
      aria-label="Documentation"
      type="icon-default"
    >
      <QuestionIcon />
    </FlexLayout>,
    <FlexLayout
      htmlTag="button"
      key="close"
      aria-label="Close modal"
      type="icon-default"
    >
      <CloseIcon />
    </FlexLayout>,
  ]}
>
  {/* modal body content */}
</FullPageModalContent>
```

---

### Usage Notes

- Prefer documented enum/static values such as `Button.ButtonTypes.PRIMARY` over raw strings.
- Keep labels, help text, and validation visible and persistent for form controls; use `FormItem*` wrappers where available.
- Use Prism layout props (`itemSpacing`, `padding`, `alignItems`, `justifyContent`, `flexGrow`) instead of custom CSS for layout and spacing.
- When `headerActions` is provided, you are responsible for all header action accessibility (aria-labels, click handlers, keyboard interaction).
- `closeButtonProps` is the supported way to attach `data-test` or other attributes to the built-in close button; `closeIconProps` is deprecated.

<!-- SOURCE-API-END -->
