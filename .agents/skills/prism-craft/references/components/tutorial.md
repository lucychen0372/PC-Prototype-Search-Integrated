# Tutorial

## Figma

- **Library name:** Tutorial (Spec Library, node-id: 21482-168024)

## React

Import: `import { Tutorial, TutorialTip, TutorialMouse, TutorialManager } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import {
  Tutorial,
  TutorialTip,
  TutorialMouse,
  TutorialManager,
} from '@nutanix-ui/prism-reactjs'
```

Type-only imports (not exported from the main index — import directly from the sub-module when needed):

```tsx
import type {
  TutorialTipProps,
  TutorialTipPlacement,
} from '@nutanix-ui/prism-reactjs/...'
import type { TutorialMouseProps } from '@nutanix-ui/prism-reactjs/...'
import type { TutorialStep, TutorialSteps } from '@nutanix-ui/prism-reactjs/...'
```

---

### Architecture Overview

The Tutorial system is composed of four co-operating pieces:

| Export            | Kind                    | Role                                                                                                                            |
| ----------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `Tutorial`        | React class component   | Shell component — mount once at the **root** of the app. Renders `TutorialTip` and `TutorialMouse` portals. Takes **no props**. |
| `TutorialManager` | Singleton utility class | Imperative API — call `TutorialManager.start(steps)` from anywhere to drive the `Tutorial` component.                           |
| `TutorialTip`     | React class component   | Lower-level tip balloon. Can be used standalone without `Tutorial`/`TutorialManager`.                                           |
| `TutorialMouse`   | React class component   | Lower-level animated virtual mouse cursor. Can be used standalone.                                                              |

**Normal usage:** Mount `<Tutorial />` once at the root, then call `TutorialManager.start(steps)` to launch a tutorial flow. Do **not** use `TutorialTip` or `TutorialMouse` directly unless you need fine-grained control.

---

### `<Tutorial />` Component

`Tutorial` accepts **no props**. It registers itself with `TutorialManager` on mount and renders hidden `TutorialTip` and `TutorialMouse` portals into `document.body`. Place it at the root level of your application.

```tsx
// In your app root (e.g. App.tsx)
import { Tutorial } from '@nutanix-ui/prism-reactjs'

function App() {
  return (
    <>
      <Tutorial />
      {/* rest of app */}
    </>
  )
}
```

---

### `TutorialManager` API

`TutorialManager` is a **singleton** (not a React component). Import it and call its methods imperatively.

#### `TutorialManager.start(tutorialSteps, onStop?)`

Starts the tutorial sequence.

| Parameter       | Type             | Required | Description                                                                                             |
| --------------- | ---------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `tutorialSteps` | `TutorialStep[]` | Yes      | Ordered array of step objects. Each step may include `tutorialTipProps`, `tutorialMouseProps`, or both. |
| `onStop`        | `() => void`     | No       | Callback fired when the tutorial ends (after the last step or when `stop()` is called).                 |

Throws if a tutorial is already in progress or if no `<Tutorial />` component is mounted.

#### `TutorialManager.stop()`

Stops the tutorial immediately, hides all UI, and fires `onStop` if provided.

#### `TutorialManager.continue()`

Advances to the next step. Called automatically by `TutorialManager` unless you provide a custom `onClickNext` callback on a step.

#### `TutorialManager.goBack()`

Goes back to the previous `tutorialTipProps` step. No-op if already on the first step.

#### `TutorialStep` shape

```ts
interface TutorialStep {
  // At least one of the two must be provided.
  tutorialTipProps?: TutorialTipProps // Show a tooltip balloon
  tutorialMouseProps?: TutorialMouseProps // Show a virtual mouse cursor
}

type TutorialSteps = TutorialStep[]
```

**When both `tutorialTipProps` and `tutorialMouseProps` are in the same step:**

- The tip is shown **without** a Next button.
- The tutorial auto-advances after the mouse animation completes.

**Steps with only `tutorialMouseProps`** are not counted in the step counter shown in the footer.

---

### `TutorialTip` Props

`TutorialTip` is the tooltip balloon component. Normally driven by `TutorialManager`, but can also be used standalone (see examples below).

| Prop                    | Type                                                           | Default                       | Required | Description                                                                                                                                       |
| ----------------------- | -------------------------------------------------------------- | ----------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `targetSelector`        | `string`                                                       | —                             | Yes      | CSS selector of the DOM element to anchor the tip to.                                                                                             |
| `message`               | `React.ReactNode`                                              | —                             | Yes      | Body content. Plain strings are auto-styled; nodes must be styled by the caller.                                                                  |
| `currentStepCount`      | `number`                                                       | —                             | Yes      | Current step number (base 1). Shown in the footer ("Step X of Y").                                                                                |
| `totalStepCount`        | `number`                                                       | —                             | Yes      | Total number of steps. Used to decide whether to show "Next" or "Done" button.                                                                    |
| `title`                 | `React.ReactNode`                                              | —                             | No       | Title shown in the header area of the balloon.                                                                                                    |
| `titleProps`            | `Omit<TitleProps, 'children'>`                                 | `{ tag: TitleSizes.H2 }`      | No       | Extra props forwarded to the `Title` component.                                                                                                   |
| `icon`                  | `React.ReactNode`                                              | —                             | No       | Icon/illustration rendered to the left of the content.                                                                                            |
| `placement`             | `TutorialTipPlacement`                                         | `TutorialTipPlacement.CENTER` | No       | Position of the balloon relative to the target element. See enum table below.                                                                     |
| `offset`                | `{ x: number, y: number }`                                     | —                             | No       | Pixel offset applied after placement calculation.                                                                                                 |
| `targetRect`            | `{ x: number, y: number, width: number, height: number }`      | —                             | No       | Override the DOMRect of the target element (useful for fixed positions).                                                                          |
| `targetPadding`         | `{ top: number, left: number, bottom: number, right: number }` | —                             | No       | Expands or shrinks the cutout area around the target element.                                                                                     |
| `show`                  | `boolean`                                                      | `true`                        | No       | Show or hide the tip.                                                                                                                             |
| `portalContainer`       | `HTMLElement`                                                  | `document.body`               | No       | DOM node to mount the tip portal onto.                                                                                                            |
| `waitForTargetSelector` | `number`                                                       | `1000`                        | No       | Max milliseconds to wait for `targetSelector` to appear in the DOM.                                                                               |
| `onClickNext`           | `(event: React.MouseEvent) => void`                            | —                             | No       | Callback for the Next button. Next button only renders when this is provided and `currentStepCount < totalStepCount`.                             |
| `onClickPrev`           | `(event: React.MouseEvent) => void`                            | —                             | No       | Callback for the Back button. Back button only renders when this is provided and `currentStepCount > 1`.                                          |
| `onClickClose`          | `(event: React.MouseEvent \| React.KeyboardEvent) => void`     | —                             | No       | Callback for the close (×) icon and the Done button. Done button is shown in place of Next on the last step. Also called on **Escape** key press. |
| `closeButtonIconProps`  | `ButtonProps`                                                  | —                             | No       | Extra props for the upper-right corner close icon button.                                                                                         |
| `closeButtonProps`      | `ButtonProps`                                                  | —                             | No       | Extra props for the footer Done/close button (last step only). Pass `children` to override the label.                                             |
| `nextButtonProps`       | `ButtonProps`                                                  | —                             | No       | Extra props for the Next button. Pass `children` to override the label.                                                                           |
| `prevButtonProps`       | `ButtonProps`                                                  | —                             | No       | Extra props for the Back button. Pass `children` to override the label.                                                                           |
| `popoverContentProps`   | `PopoverContentProps`                                          | —                             | No       | Extra props forwarded to the `PopoverContent` balloon wrapper (e.g. custom `wrapperProps` for width overrides).                                   |
| `wrapperProps`          | `React.HTMLAttributes<HTMLDivElement>`                         | —                             | No       | Extra props for the outermost wrapper `<div>`.                                                                                                    |

#### `TutorialTipPlacement` enum

Import path: `TutorialTip.PLACEMENTS` (static on the class) or `TutorialTipPlacement` from the source.

| Constant                              | Value            | Description                                             |
| ------------------------------------- | ---------------- | ------------------------------------------------------- |
| `TutorialTip.PLACEMENTS.CENTER`       | `'center'`       | Centered over the target (default). No cutout or caret. |
| `TutorialTip.PLACEMENTS.TOP`          | `'top'`          | Above the target, centered horizontally.                |
| `TutorialTip.PLACEMENTS.TOP_LEFT`     | `'top-left'`     | Above the target, aligned to the left edge.             |
| `TutorialTip.PLACEMENTS.TOP_RIGHT`    | `'top-right'`    | Above the target, aligned to the right edge.            |
| `TutorialTip.PLACEMENTS.BOTTOM`       | `'bottom'`       | Below the target, centered horizontally.                |
| `TutorialTip.PLACEMENTS.BOTTOM_LEFT`  | `'bottom-left'`  | Below the target, aligned to the left edge.             |
| `TutorialTip.PLACEMENTS.BOTTOM_RIGHT` | `'bottom-right'` | Below the target, aligned to the right edge.            |
| `TutorialTip.PLACEMENTS.LEFT`         | `'left'`         | Left of the target, centered vertically.                |
| `TutorialTip.PLACEMENTS.LEFT_TOP`     | `'left-top'`     | Left of the target, aligned to the top edge.            |
| `TutorialTip.PLACEMENTS.LEFT_BOTTOM`  | `'left-bottom'`  | Left of the target, aligned to the bottom edge.         |
| `TutorialTip.PLACEMENTS.RIGHT`        | `'right'`        | Right of the target, centered vertically.               |
| `TutorialTip.PLACEMENTS.RIGHT_TOP`    | `'right-top'`    | Right of the target, aligned to the top edge.           |
| `TutorialTip.PLACEMENTS.RIGHT_BOTTOM` | `'right-bottom'` | Right of the target, aligned to the bottom edge.        |

---

### `TutorialMouse` Props

`TutorialMouse` renders a virtual mouse cursor that animates to a target element and simulates a click. Normally driven by `TutorialManager` via `tutorialMouseProps` in a step. Can also be used standalone.

| Prop              | Type          | Default         | Required | Description                                                                                                    |
| ----------------- | ------------- | --------------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| `targetSelector`  | `string`      | —               | Yes      | CSS selector of the DOM element to animate the cursor to and click.                                            |
| `show`            | `boolean`     | `true`          | No       | Show or hide the virtual mouse.                                                                                |
| `moveDuration`    | `number`      | `1000`          | No       | Duration in milliseconds for the cursor movement animation.                                                    |
| `delay`           | `number`      | `1000`          | No       | Delay in milliseconds after the click animation before `onDone` is called.                                     |
| `onDone`          | `() => void`  | —               | No       | Callback fired after the cursor animation, click, and delay complete.                                          |
| `inputValue`      | `string`      | —               | No       | If the target is a `<input type="text">`, this value is programmatically set and a change event is dispatched. |
| `portalContainer` | `HTMLElement` | `document.body` | No       | DOM node to mount the cursor portal onto.                                                                      |

---

### Source Examples

#### Minimal Working Example (with `TutorialManager`)

```tsx
import {
  Tutorial,
  TutorialTip,
  TutorialManager,
  Button,
} from '@nutanix-ui/prism-reactjs'

// Mount once at the app root.
function AppRoot() {
  return (
    <>
      <Tutorial />
      <MyPage />
    </>
  )
}

// Anywhere in the app — launch the tutorial.
function MyPage() {
  const steps = [
    {
      tutorialTipProps: {
        targetSelector: '.my-button',
        title: 'Welcome',
        message: 'Click this button to get started.',
        onClickClose: () => TutorialManager.stop(),
      },
    },
  ]

  return (
    <Button
      className="my-button"
      onClick={() => TutorialManager.start(steps, () => console.log('done'))}
    >
      Start Tutorial
    </Button>
  )
}
```

#### Multi-step Tutorial with Mouse Guidance

```tsx
import {
  Tutorial,
  TutorialTip,
  TutorialManager,
  Button,
} from '@nutanix-ui/prism-reactjs'

const onClickClose = () => TutorialManager.stop()

const tutorialSteps = [
  // Step 1 — tooltip centered on the page
  {
    tutorialTipProps: {
      targetSelector: 'body',
      title: 'Getting Started',
      message: 'Welcome! We will guide you through the key features.',
      onClickClose,
    },
  },
  // Step 2 — tooltip below a nav element
  {
    tutorialTipProps: {
      targetSelector: '.ntnx-menu',
      placement: TutorialTip.PLACEMENTS.RIGHT,
      title: 'Navigation',
      message: 'Use the menu to move between sections.',
      onClickClose,
    },
  },
  // Step 3 — mouse animation then tooltip
  {
    tutorialMouseProps: {
      targetSelector: '.search-input',
    },
  },
  {
    tutorialTipProps: {
      targetSelector: '.search-input',
      placement: TutorialTip.PLACEMENTS.BOTTOM,
      title: 'Search',
      message: 'Use the search field to filter results.',
      targetPadding: { top: 5, left: 5, bottom: 5, right: 5 },
      onClickClose,
    },
  },
  // Step 4 — fill an input with the virtual mouse
  {
    tutorialMouseProps: {
      targetSelector: 'input.search-input',
      inputValue: 'Button',
    },
  },
]

function MyPage() {
  return (
    <Button onClick={() => TutorialManager.start(tutorialSteps)}>
      Launch Tutorial
    </Button>
  )
}
```

#### Standalone `TutorialTip` (without `TutorialManager`)

```tsx
import React, { useState } from 'react'
import { TutorialTip, Button } from '@nutanix-ui/prism-reactjs'

function StandaloneTip() {
  const [show, setShow] = useState(false)
  const [step, setStep] = useState(1)
  const totalSteps = 3

  return (
    <>
      <Button className="demo-target" onClick={() => setShow(true)}>
        Show Tip
      </Button>
      <TutorialTip
        targetSelector=".demo-target"
        title="Step Title"
        message="This is the tip body."
        placement={TutorialTip.PLACEMENTS.TOP}
        currentStepCount={step}
        totalStepCount={totalSteps}
        show={show}
        onClickNext={() => setStep((s) => s + 1)}
        onClickPrev={() => setStep((s) => s - 1)}
        onClickClose={() => {
          setShow(false)
          setStep(1)
        }}
      />
    </>
  )
}
```

#### `TutorialTip` with Icon and Custom Close Label

```tsx
import React, { useState } from 'react'
import { TutorialTip, Button, KarbonLogoIcon } from '@nutanix-ui/prism-reactjs'

function TipWithIcon() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button className="icon-demo-btn" onClick={() => setVisible(true)}>
        Show
      </Button>
      {visible && (
        <TutorialTip
          targetSelector=".icon-demo-btn"
          title="Icon Example"
          message="An illustration icon appears to the left of the content."
          placement={TutorialTip.PLACEMENTS.RIGHT_TOP}
          icon={<KarbonLogoIcon />}
          currentStepCount={1}
          totalStepCount={1}
          show={visible}
          onClickClose={() => setVisible(false)}
          closeButtonProps={{ children: 'Got it' }}
        />
      )}
    </>
  )
}
```

#### `TutorialTip` with `targetRect` Override and `offset`

```tsx
<TutorialTip
  targetSelector=".my-element"
  targetRect={{ x: 345, y: 60, width: 30, height: 50 }}
  placement={TutorialTip.PLACEMENTS.BOTTOM}
  offset={{ x: -100, y: 0 }}
  title="Precise Positioning"
  message="Using targetRect overrides the element's actual DOMRect."
  currentStepCount={1}
  totalStepCount={1}
  onClickClose={() => {}}
/>
```

#### Standalone `TutorialMouse`

```tsx
import React, { useState } from 'react'
import { TutorialMouse, Button, Input } from '@nutanix-ui/prism-reactjs'

function MouseDemo() {
  const [show, setShow] = useState(false)

  return (
    <>
      <Input className="my-input" placeholder="Watch me get filled" />
      <Button onClick={() => setShow(true)}>Demo Mouse</Button>
      <TutorialMouse
        targetSelector="input.my-input"
        inputValue="Hello!"
        moveDuration={1000}
        delay={500}
        show={show}
        onDone={() => setShow(false)}
      />
    </>
  )
}
```

### Accessibility Guidelines

```tsx
import {
  Paragraph,
  StackingLayout,
  UnorderedList,
} from '@nutanix-ui/prism-reactjs'

/* eslint-disable max-len */
const data = [
  'Always refer to elements using their programmatic name or label. For instance, instead of "Click here to view the code" say "Click the View Code button to see the code".',
  'Allow users to exit the tutorial at any time. When the tutorial is exited, keyboard focus should return to where it was before the tutorial started.',
]
/* eslint-enable max-len */

;<StackingLayout style={{ maxWidth: 800 }}>
  <Paragraph>
    The Tutorial component can be very confusing for people with vision
    disabilities since it automatically moves focus around the screen. The
    following tips will make your tutorial more inclusive.
  </Paragraph>
  <UnorderedList data={data} />
</StackingLayout>
```

### Behaviour & Keyboard Notes

- **Focus management:** On each step change, `TutorialTip` moves focus to the Next button, then the Done/Close button, then the first focusable element in the tip — in that priority order.
- **Escape key:** Pressing `Escape` while the tip is visible calls `onClickClose` and stops propagation.
- **Window resize:** `TutorialTip` re-positions itself on `window.resize`.
- **Target polling:** `TutorialTip` waits up to `waitForTargetSelector` ms (default 1000) for the `targetSelector` element to appear in the DOM before rendering. Useful when navigating between routes mid-tutorial.
- **Cutout:** For all placements except `CENTER`, a full-screen semi-transparent overlay with a rounded rectangular cutout is rendered around the target element, keeping it interactive and visible.
- **ARIA:** The balloon wrapper has `aria-modal="true"` and is labelled by `aria-labelledby="tutorial-tip-title tutorial-tip-step"`. The step counter uses `aria-live="polite"` and `aria-atomic="true"`.
- **Mouse + tip in one step:** When `tutorialMouseProps` and `tutorialTipProps` are both present in a single step, the tip omits the Next button; `TutorialManager` advances automatically once the mouse `onDone` fires.
- **Steps-only mouse steps:** Steps with only `tutorialMouseProps` (no `tutorialTipProps`) are excluded from the step counter shown in the balloon footer.

### Usage Notes

- Mount `<Tutorial />` **once** at the app root, not inside individual pages or routes.
- Use `TutorialTip.PLACEMENTS.<VALUE>` (static on the class) instead of raw strings for placement values.
- When navigating between pages mid-tutorial, call `TutorialManager.continue()` in the `onClickNext` callback after the navigation — the component will wait for the new `targetSelector` to appear.
- Pass custom `onClickNext`, `onClickPrev`, and `onClickClose` directly in `tutorialTipProps` when you need to perform side-effects (e.g. route changes) before advancing.
- Customize button labels via `nextButtonProps.children`, `prevButtonProps.children`, and `closeButtonProps.children`.
- Use `popoverContentProps.wrapperProps.style` to override the default balloon width.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing inside custom `message` nodes.

<!-- SOURCE-API-END -->
