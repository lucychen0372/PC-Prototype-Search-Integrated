# FocusTrap

## Figma

- **Library name:** N/A
- **Use case:** React-only utility export; not usually mapped directly from a Figma component.

## React

Import: `import { FocusTrap } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import { FocusTrap } from '@nutanix-ui/prism-reactjs'
```

> **Note:** `FocusTrapProps` is not re-exported from `@nutanix-ui/prism-reactjs`. Import the type directly from the component path if needed, or use `React.ComponentProps<typeof FocusTrap>`.

### Props Interfaces

#### `FocusTrapProps`

Extends: `React.HTMLProps<HTMLDivElement>`

All standard `HTMLDivElement` props are accepted and forwarded to the underlying `<div>` (e.g. `data-testid`, `style`, `className`).

| Prop                           | Type                        | Required | Default | Description                                                                                                                                                                                 |
| ------------------------------ | --------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isActive`                     | `boolean`                   | **Yes**  | —       | Whether the focus trap is active. When `true`, focus is captured inside the container. When toggled to `false`, restores focus if `restoreFocus` is set.                                    |
| `children`                     | `React.ReactNode`           | No       | —       | Content rendered inside the focus trap container.                                                                                                                                           |
| `innerRef`                     | `React.Ref<HTMLDivElement>` | No       | —       | Ref forwarded to the underlying `<div>`. Accepts both `RefObject` and ref-callback forms.                                                                                                   |
| `restoreFocus`                 | `boolean`                   | No       | —       | When `true`, returns focus to the element that was focused before the trap activated. Triggers on both `isActive` becoming `false` and on component unmount.                                |
| `focusOnFirstFocusableElement` | `boolean`                   | No       | —       | When `true` and `isActive` is `true`, automatically focuses the first focusable descendant instead of the trap container itself. Logs a console warning if no focusable children are found. |
| `passThrough`                  | `boolean`                   | No       | —       | When `true`, pressing Tab on the last focusable item (or Shift+Tab on the first) moves focus to the trigger element rather than cycling within the trap.                                    |
| `onPassThrough`                | `() => void`                | No       | —       | Callback invoked when focus leaves the trap via the pass-through behaviour (Tab past last item or Shift+Tab past first item).                                                               |

### DOM Behaviour

- Renders a single `<div tabIndex={0} style={{ outline: 'none' }}>` wrapper.
- Sets `data-focus-guard` attribute on the wrapper when `isActive` is `false` (attribute is removed when active).
- When `isActive` becomes `true`, records `document.activeElement` as the previous focused element.
- When `isActive` becomes `false` with `restoreFocus={true}`, returns focus to the previously recorded element unless focus has already moved outside the trap to a different interactive element.
- When the component unmounts with `restoreFocus={true}`, focus is also restored to the previously recorded element.
- When `focusOnFirstFocusableElement={true}` and no focusable child is found, the trap container `<div>` itself receives focus and a `console.warn` is emitted.

### Accessibility & Keyboard Notes

- Tab / Shift+Tab cycle focus within the trap container when `passThrough` is `false` (default).
- With `passThrough={true}`, Tab past the last item or Shift+Tab past the first item moves focus to the trigger element instead of cycling.
- `onPassThrough` lets the parent react to this pass-through event (e.g. close a popup).
- When used inside a `Modal`, do **not** set focus programmatically inside `useEffect` descendants — this runs before the Modal animation ends and breaks the trap. Use the Modal's `onVisibleChange` callback instead.
- Using `React.useEffect` to handle focus in Modal descendants will fire before the animation ends. If unavoidable, set `restoreFocus={false}` on the Modal and manage focus restoration manually via `onClose`.

### Source Examples

#### Minimal usage

```tsx
import { FocusTrap } from '@nutanix-ui/prism-reactjs'
;<FocusTrap isActive={true}>
  <button>Focusable item</button>
</FocusTrap>
```

#### Usage with PopupProvider

```tsx
import React, { useState } from 'react'
import {
  Button,
  ContainerLayout,
  FlexLayout,
  FocusTrap,
  Form,
  FormItemInput,
  FormSection,
  Paragraph,
  PopupProvider,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'

const renderPopupContent = (isVisible, onClose) => (
  <ContainerLayout backgroundColor="white" padding="30px">
    <FocusTrap isActive={isVisible} restoreFocus={true}>
      <StackingLayout>
        <Paragraph>
          Duis nostrud nisi adipisicing dolor excepteur. Proident minim sint
          nisi nulla velit et irure in minim proident amet nulla. Exercitation
          sunt irure nulla ex nulla nisi adipisicing eu non in adipisicing est
          excepteur. Occaecat amet proident nisi elit laborum cillum quis ea.
          Duis aliqua minim do sit adipisicing laborum. Officia et mollit
          deserunt veniam qui dolor.
        </Paragraph>
        <Form>
          <FormSection>
            <FormItemInput id="email" label="Email" />
            <FormItemInput id="desc" label="Description" />
            <FlexLayout>
              <Button type={Button.ButtonTypes.SECONDARY} onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={onClose}>Submit</Button>
            </FlexLayout>
          </FormSection>
        </Form>
      </StackingLayout>
    </FocusTrap>
  </ContainerLayout>
)

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <StackingLayout>
      <Paragraph>
        This component should be used to trap focus inside a component. It
        should be used for popups(popover, modal, dropdown etc).
      </Paragraph>
      <PopupProvider
        action={['click']}
        popup={renderPopupContent(isOpen, () => setIsOpen(false))}
        popupPlacement="right"
        popupVisible={isOpen}
        onPopupVisibleChange={(visible) => setIsOpen(visible)}
        popupStyle={{
          zIndex: 1,
          border: '1px solid black',
          display: isOpen ? 'block' : 'none',
          width: '500px',
        }}
      >
        <Button>Open Popup</Button>
      </PopupProvider>
    </StackingLayout>
  )
}

;<Popup />
```

#### Restore focus with Modal (using `onVisibleChange`)

This example demonstrates the correct pattern for focus management inside a `Modal`. The Modal's own `restoreFocus` prop delegates to `FocusTrap` internally. Focus for custom elements inside the Modal must be set inside `onVisibleChange` (after the animation ends), **not** in `useEffect`.

```tsx
import React from 'react'
import {
  Badge,
  Button,
  FlexItem,
  FlexLayout,
  Modal,
  Paragraph,
  StackingLayout,
  Steps,
} from '@nutanix-ui/prism-reactjs'

const stepsData = [{ title: 'First' }, { title: 'Second' }, { title: 'Third' }]
const panelIdPrefix = 'test'

const MySteps = React.forwardRef((props, ref) => {
  const [current, setCurrent] = React.useState(0)

  const focusStep = React.useCallback(
    (index) => {
      const stepNumber = (index !== undefined ? index : current) + 1
      const stepButton = document.querySelector(
        `button[data-step-number="${stepNumber}"]`,
      )
      stepButton.focus()
    },
    [current],
  )

  React.useImperativeHandle(
    ref,
    () => ({
      focusSelectedStep: focusStep,
    }),
    [focusStep],
  )

  return (
    <StackingLayout data-test-id="default">
      <Steps data={stepsData} current={current} panelIdPrefix={panelIdPrefix} />
      {`Step ${current + 1} form content`}
      <FlexLayout
        id={`${panelIdPrefix}-${current + 1}`}
        alignItems="center"
        role="tabpanel"
      >
        <Button
          disabled={current === 0}
          onClick={() => {
            const prevStep = current - 1
            setCurrent(prevStep)
            focusStep(prevStep)
          }}
        >
          Back
        </Button>
        <Button
          data-test-id="btn-next-step"
          disabled={current > 1}
          onClick={() => {
            const nextStep = current + 1
            setCurrent(nextStep)
            focusStep(nextStep)
          }}
        >
          Next
        </Button>
      </FlexLayout>
    </StackingLayout>
  )
})

class MyModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { visible: false }
    this.myStepsRef = React.createRef()
    this.handleOnClose = this.handleOnClose.bind(this)
  }

  handleOnClose() {
    this.setState({ visible: false })
  }

  render() {
    return (
      <div data-test-id="restore-focus">
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
          primaryButtonProps={{ 'data-test-id': 'primary-button' }}
          onVisibleChange={(visible) => {
            // Set focus AFTER animation ends (onVisibleChange), not in useEffect
            if (visible) {
              this.myStepsRef.current &&
                this.myStepsRef.current.focusSelectedStep()
            }
          }}
        >
          <StackingLayout padding="20px">
            <MySteps ref={this.myStepsRef} />
          </StackingLayout>
        </Modal>
      </div>
    )
  }
}

;<StackingLayout>
  <FlexLayout itemGap="M" flexDirection="column" alignItems="flex-start">
    <FlexItem style={{ whiteSpace: 'nowrap' }}>
      <Badge color="green" count="Action Recommended" />
    </FlexItem>
    <Paragraph type="secondary">
      When dealing with Modals, in order for the FocusTrap to properly capture
      the triggering item for automatic focus handling, please refrain from
      setting the focus programatically until the animation ends. To achieve
      this, use the <strong>onVisibleChange</strong> function of the Modal.
    </Paragraph>
  </FlexLayout>
  <FlexLayout itemGap="M" flexDirection="column" alignItems="flex-start">
    <FlexItem style={{ whiteSpace: 'nowrap' }}>
      <Badge color="red" count="Attention" />
    </FlexItem>
    <Paragraph type="secondary">
      Using <strong>React.useEffect</strong> to handle focus in descendants of
      the Modal will be called before the animation ends, and the Focus trap
      will not work. If this cannot be avoided, please set{' '}
      <strong>restoreFocus={false}</strong> on Modal and handle the focus
      management when modal closes using <strong>onClose</strong> and as a
      consequence of <strong>primaryButtonOnClick</strong>
      being triggered.
    </Paragraph>
  </FlexLayout>
  <MyModal />
</StackingLayout>
```

#### Using `innerRef` to access the trap container

```tsx
import React from 'react'
import { FocusTrap } from '@nutanix-ui/prism-reactjs'

const MyComponent = () => {
  const trapRef = React.createRef<HTMLDivElement>()

  return (
    <FocusTrap isActive={true} innerRef={trapRef}>
      <button>Inside trap</button>
    </FocusTrap>
  )
}
```

#### Pass-through mode

```tsx
import React, { useState } from 'react'
import { FocusTrap, Button } from '@nutanix-ui/prism-reactjs'

const PassThroughExample = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open</Button>
      <FocusTrap
        isActive={isOpen}
        passThrough={true}
        onPassThrough={() => setIsOpen(false)}
      >
        <button>Item 1</button>
        <button>Item 2</button>
      </FocusTrap>
    </>
  )
}
```

### Usage Notes

- These exports are React-only helpers or lower-level utilities. Prefer higher-level Prism components when they satisfy the design.
- Use these docs when existing component docs mention the provider/helper by name or when implementing advanced accessibility, popup, portal, upload, truncation, or notification behavior.
- Keep generated app code aligned with repository rules: Prism layout components for layout, persistent accessible labels, and no custom CSS for spacing.
- `FocusTrap` is exported as the default export from its module but is re-exported as a named export from `@nutanix-ui/prism-reactjs`. Always use the named import.
- The `FocusTrapProps` interface is **not** exported from the package's public index. Use `React.ComponentProps<typeof FocusTrap>` to type props externally.

<!-- SOURCE-API-END -->
