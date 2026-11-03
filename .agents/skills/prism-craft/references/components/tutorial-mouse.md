# TutorialMouse

## Figma

- **Library name:** N/A
- **Use case:** React-only utility export; not usually mapped directly from a Figma component.

## React

Import: `import { TutorialMouse } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import { TutorialMouse } from '@nutanix-ui/prism-reactjs'
```

`TutorialMouse` is exported as the **default** export from
`./components/v2/Tutorial/TutorialMouse` and re-exported by name from the
package root index (`export { default as TutorialMouse }`).

### Overview

`TutorialMouse` renders a virtual mouse cursor into a portal (defaults to
`document.body`) and animates it to a target DOM element identified by a CSS
selector. On arrival it simulates a click/focus, optionally sets a text-input
value, waits for a configurable delay, then fires `onDone`. It is a class
component that runs its animation sequence in `componentDidMount` and
`componentDidUpdate`.

It is used internally by the higher-level
[Tutorial](#/Tutorial) and [TutorialManager](#/TutorialManager) components.

### Props Interface

#### `TutorialMouseProps`

| Prop              | Type          | Required | Default         | Description                                                                                                                                                                                    |
| ----------------- | ------------- | -------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `targetSelector`  | `string`      | **Yes**  | —               | CSS selector for the DOM element the virtual mouse moves to. The element is scrolled into view, then the cursor animates to its centre.                                                        |
| `moveDuration`    | `number`      | No       | `1000`          | Duration in milliseconds for the cursor-move animation (`transition: top Xms, left Xms`).                                                                                                      |
| `onDone`          | `() => void`  | No       | —               | Callback fired after the cursor has moved, clicked, (optionally) typed, and waited for `delay` ms.                                                                                             |
| `delay`           | `number`      | No       | `1000`          | Milliseconds to wait after the click/input event before calling `onDone`.                                                                                                                      |
| `portalContainer` | `HTMLElement` | No       | `document.body` | DOM node that hosts the portal into which the cursor `<div>` is mounted.                                                                                                                       |
| `show`            | `boolean`     | No       | `true`          | Show or hide the virtual cursor. When `false` the animation sequence is skipped entirely.                                                                                                      |
| `inputValue`      | `string`      | No       | —               | If provided **and** `targetSelector` resolves to `<input type="text">`, the input's value is set to this string and an `input` event is dispatched (React-compatible via native value setter). |

### Behaviour Notes

- **Animation sequence** (when `show` is `true`):
  1. `targetEl.scrollIntoView({ block: 'nearest' })` — brings target into view.
  2. If the cursor is already at the target position, it first nudges 100 px left so the transition is visible.
  3. CSS transition moves the cursor `<div>` to the centre of the target's bounding rect over `moveDuration` ms.
  4. `mouse-clicked` CSS class is applied for 250 ms to play a click animation, then removed.
  5. `targetEl.click()` and `targetEl.focus()` are called.
  6. If `inputValue` is defined and target is `<input type="text">`, value is injected via `HTMLInputElement.prototype.value` native setter + `input` event dispatch.
  7. After `delay` ms, `onDone?.()` is invoked.
- **Portal** — the cursor `<div>` renders outside the component tree via `createPortal`, so it always appears above page content.
- **`data-show` attribute** — the rendered `<div>` carries `data-show={show}` (`"true"` / `"false"`), useful for selectors in tests.
- **CSS classes** — rendered element uses `ntnx ntnx-tutorial-mouse` (class prefix resolved via `ThemeManager.getVar('classPrefix')`).
- `show` changing from `true` to `false` hides the cursor; updating `targetSelector` while `show` is `true` triggers a new animation to the new target (`componentDidUpdate` re-runs the sequence).

### Usage Examples

#### Minimal working example — multi-step mouse walkthrough

```tsx
import React from 'react'
import {
  TutorialMouse,
  Button,
  Input,
  FlexItem,
  FlexLayout,
} from '@nutanix-ui/prism-reactjs'

const mouseSteps = [
  { targetSelector: '.button1' },
  { targetSelector: '.button2', delay: 3000 },
  { targetSelector: 'input.input1', inputValue: 'Hello!' },
]

class MyTutorialMouse extends React.Component {
  constructor(props) {
    super(props)
    this.state = { currStep: 1, show: false }
    this.handleStartDemo = this.handleStartDemo.bind(this)
    this.handleOnDone = this.handleOnDone.bind(this)
  }

  handleStartDemo() {
    this.setState({ show: true })
  }

  handleOnDone() {
    if (this.state.currStep === mouseSteps.length) {
      this.setState({ currStep: 1, show: false })
    } else {
      this.setState({ currStep: this.state.currStep + 1 })
    }
  }

  render() {
    const { currStep, show } = this.state
    return (
      <div>
        <FlexLayout justifyContent="space-between" alignItems="center">
          <FlexItem style={{ padding: '20px' }}>
            <Button className="button1">targetSelector=.button1</Button>
          </FlexItem>
          <FlexItem style={{ padding: '20px' }}>
            <Button className="button2">targetSelector=.button2</Button>
          </FlexItem>
          <Input className="input1" placeholder="input.input1" />
        </FlexLayout>

        <Button onClick={this.handleStartDemo} disabled={show}>
          Demo Mouse
        </Button>

        <TutorialMouse
          {...mouseSteps[currStep - 1]}
          onDone={this.handleOnDone}
          show={show}
        />
      </div>
    )
  }
}
```

#### Hidden cursor (show=false)

```tsx
<TutorialMouse targetSelector=".my-element" show={false} />
```

When `show` is `false` the cursor `<div>` is rendered (`data-show="false"`) but
no animation runs.

#### Custom portal container

```tsx
const containerRef = React.useRef(document.getElementById('tutorial-layer'))

;<TutorialMouse
  targetSelector=".save-button"
  portalContainer={containerRef.current}
  moveDuration={800}
  delay={500}
  onDone={() => console.log('step done')}
/>
```

#### Setting a text input value

```tsx
<TutorialMouse
  targetSelector="input.search-field"
  inputValue="nutanix"
  moveDuration={1200}
  delay={2000}
  onDone={handleNext}
  show={isRunning}
/>
```

`inputValue` only takes effect when `targetSelector` resolves to
`<input type="text">`. The value is set via the React-compatible native setter
pattern, so controlled `<Input>` components pick up the change.

### Usage Notes

- `TutorialMouse` is a low-level building block. Prefer the higher-level
  `Tutorial` or `TutorialManager` components for full guided-tour flows.
- Keep `targetSelector` stable across renders; changing it while `show` is
  `true` immediately starts a new animation to the new target.
- The cursor `<div>` is always present in the DOM (inside the portal) as long as
  the component is mounted. Unmount the component or pass `show={false}` to hide
  it.
- `moveDuration` and `delay` both default to `1000` ms; set them to `0` in tests
  to avoid slow async waits.
- Use these docs when existing component docs mention the provider/helper by name
  or when implementing advanced tutorial, walkthrough, or onboarding behavior.
- Keep generated app code aligned with repository rules: Prism layout components
  for layout, persistent accessible labels, and no custom CSS for spacing.

<!-- SOURCE-API-END -->
