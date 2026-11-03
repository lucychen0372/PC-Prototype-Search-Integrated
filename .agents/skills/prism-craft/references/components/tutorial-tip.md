# TutorialTip

## Figma

- **Library name:** Tutorial (page: N/A, frame: Tutorial)

## React

Import: `import { TutorialTip } from '@nutanix-ui/prism-reactjs'`

> **Prefer `Tutorial` + `TutorialManager` over direct `TutorialTip` use.**
> `TutorialTip` is used internally by [`Tutorial`](#!/Tutorial) and [`TutorialManager`](#!/TutorialManager).
> Use it directly only when you need fine-grained control outside those abstractions.

### TSX Examples

#### Minimal working example (multi-step)

```tsx
import React, { useState, useCallback } from 'react'
import { TutorialTip, Button, FlexLayout } from '@nutanix-ui/prism-reactjs'

const steps = [
  {
    targetSelector: '.my-anchor',
    title: 'Step one',
    message: 'This is the first step.',
    placement: TutorialTip.PLACEMENTS.BOTTOM,
  },
  {
    targetSelector: '.my-anchor',
    title: 'Step two',
    message: 'This is the last step.',
    placement: TutorialTip.PLACEMENTS.RIGHT,
  },
]

const MyTutorial = () => {
  const [show, setShow] = useState(false)
  const [currStep, setCurrStep] = useState(1)

  const handleNext = useCallback(() => setCurrStep((s) => s + 1), [])
  const handleBack = useCallback(() => setCurrStep((s) => s - 1), [])
  const handleClose = useCallback(() => {
    setCurrStep(1)
    setShow(false)
  }, [])

  return (
    <FlexLayout
      alignItems="center"
      justifyContent="center"
      className="my-anchor"
    >
      <Button onClick={() => setShow(true)}>Start tutorial</Button>
      <TutorialTip
        {...steps[currStep - 1]}
        currentStepCount={currStep}
        totalStepCount={steps.length}
        onClickClose={handleClose}
        onClickNext={handleNext}
        onClickPrev={handleBack}
        show={show}
      />
    </FlexLayout>
  )
}
```

#### Single-step with icon

```tsx
import React, { useState } from 'react'
import {
  TutorialTip,
  Button,
  KarbonLogoIcon,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'

const TutorialTipWithIcon = () => {
  const [visible, setVisible] = useState(false)
  const toggle = () => setVisible((v) => !v)

  return (
    <StackingLayout>
      <Button className="my-btn" onClick={toggle}>
        Open tip
      </Button>
      {visible && (
        <TutorialTip
          targetSelector=".my-btn"
          title="Icon and new style"
          message="Place the tooltip on right-top corner of the demo button"
          placement={TutorialTip.PLACEMENTS.RIGHT_TOP}
          onClickClose={toggle}
          currentStepCount={1}
          totalStepCount={1}
          show={visible}
          icon={<KarbonLogoIcon />}
          closeButtonProps={{ 'data-test-id': 'tutorial-tip-close-button' }}
        />
      )}
    </StackingLayout>
  )
}
```

#### Custom button labels

```tsx
import React, { useState } from 'react'
import {
  TutorialTip,
  Button,
  StackingLayout,
  CheckMarkIcon,
} from '@nutanix-ui/prism-reactjs'

const steps = [
  {
    targetSelector: '.my-anchor',
    title: 'Custom labels',
    message: 'Custom Next button label.',
    placement: TutorialTip.PLACEMENTS.TOP,
    nextButtonProps: {
      children: 'Next tip',
      'data-test-id': 'tutorial-tip-next',
    },
  },
  {
    targetSelector: '.my-anchor',
    title: 'Custom labels',
    message: 'Custom Previous and Close button.',
    placement: TutorialTip.PLACEMENTS.TOP,
    prevButtonProps: { children: 'Previous tip' },
  },
]

const TutorialTipWithCustomLabels = () => {
  const [visible, setVisible] = useState(false)
  const [currStep, setCurrentStep] = useState(1)

  const toggle = () => {
    setVisible((v) => !v)
    setCurrentStep(1)
  }
  const handleNext = () => setCurrentStep((s) => s + 1)
  const handleBack = () => setCurrentStep((s) => s - 1)

  return (
    <StackingLayout>
      <Button className="my-anchor" onClick={toggle} data-test-id="my-anchor">
        Tutorial tip with custom labels
      </Button>
      {visible && (
        <TutorialTip
          title="Custom labels"
          placement={TutorialTip.PLACEMENTS.TOP}
          {...steps[currStep - 1]}
          currentStepCount={currStep}
          totalStepCount={steps.length}
          onClickClose={toggle}
          onClickNext={handleNext}
          onClickPrev={handleBack}
          show={visible}
          closeButtonIconProps={{
            'data-test-id': 'tutorial-tip-close-btn-icon',
          }}
          closeButtonProps={{
            'data-test-id': 'tutorial-tip-close-button',
            children: (
              <>
                <span>Close tutorial</span>
                <CheckMarkIcon size="small" />
              </>
            ),
          }}
        />
      )}
    </StackingLayout>
  )
}
```

#### Custom `targetPadding` and `targetRect` override

```tsx
<TutorialTip
  targetSelector=".my-element"
  title="Custom cutout"
  message="The cutout around the target has extra padding."
  placement={TutorialTip.PLACEMENTS.TOP}
  targetPadding={{ top: 10, left: 10, bottom: 10, right: 10 }}
  currentStepCount={1}
  totalStepCount={1}
  onClickClose={handleClose}
  show
/>
```

### Anti-patterns

- Don't use `Tooltip` for onboarding tutorials — use `TutorialTip` (or `Tutorial` + `TutorialManager`)
- `TutorialTip` supports step indicators; `Tooltip` does not
- Don't pass `visible`, `content`, `step`, `totalSteps`, or `onClose` — those props do not exist. The correct props are `show`, `message`, `currentStepCount`, `totalStepCount`, and `onClickClose`.
- `currentStepCount` is **1-based**, not 0-based.

<!-- SOURCE-API-START -->

### Import

```tsx
import { TutorialTip } from '@nutanix-ui/prism-reactjs'
// TutorialTipPlacement is NOT re-exported from the package root.
// Use the static property instead: TutorialTip.PLACEMENTS.<VALUE>
```

### Static Properties

| Property                 | Description                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------- |
| `TutorialTip.PLACEMENTS` | Alias for the `TutorialTipPlacement` enum. Use this to reference placement values. |

### Enums / Constants

#### `TutorialTipPlacement` (via `TutorialTip.PLACEMENTS`)

Exported from `TutorialTip.tsx` but **not** re-exported from `@nutanix-ui/prism-reactjs` index.
Always reference via `TutorialTip.PLACEMENTS.<VALUE>`.

| Key            | Value          | Tooltip caret position       |
| -------------- | -------------- | ---------------------------- |
| `CENTER`       | `center`       | No caret (no cutout overlay) |
| `TOP`          | `top`          | Caret on bottom              |
| `TOP_LEFT`     | `top-left`     | Caret on bottom-right        |
| `TOP_RIGHT`    | `top-right`    | Caret on bottom-left         |
| `LEFT`         | `left`         | Caret on right               |
| `RIGHT`        | `right`        | Caret on left                |
| `BOTTOM`       | `bottom`       | Caret on top                 |
| `BOTTOM_LEFT`  | `bottom-left`  | Caret on top-right           |
| `BOTTOM_RIGHT` | `bottom-right` | Caret on top-left            |
| `LEFT_BOTTOM`  | `left-bottom`  | Caret on right-top           |
| `LEFT_TOP`     | `left-top`     | Caret on right-bottom        |
| `RIGHT_BOTTOM` | `right-bottom` | Caret on left-top            |
| `RIGHT_TOP`    | `right-top`    | Caret on left-bottom         |

### Props Interfaces

#### `TutorialTipProps`

**Required props** are bold in the Required column.

| Prop                    | Type                                                           | Required | Default                         | Description                                                                                                                            |
| ----------------------- | -------------------------------------------------------------- | -------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `message`               | `React.ReactNode`                                              | **Yes**  | —                               | Body content of the tip. A plain string is auto-styled as a `Paragraph`; a node must be styled by the caller.                          |
| `targetSelector`        | `string`                                                       | **Yes**  | —                               | CSS selector of a visible DOM element to anchor the tip to.                                                                            |
| `currentStepCount`      | `number`                                                       | **Yes**  | —                               | Current step number (1-based).                                                                                                         |
| `totalStepCount`        | `number`                                                       | **Yes**  | —                               | Total number of steps. Used with `currentStepCount` to decide whether to show Next or Done.                                            |
| `icon`                  | `React.ReactNode`                                              | No       | —                               | Icon rendered in the tip content area (left of the text).                                                                              |
| `title`                 | `React.ReactNode`                                              | No       | —                               | Title rendered at the top of the tip. When omitted, no title row is rendered.                                                          |
| `titleProps`            | `Omit<TitleProps, 'children'>`                                 | No       | `{ tag: TitleSizes.H2 }`        | Custom props forwarded to the internal `Title` component. `children` is not allowed here.                                              |
| `targetRect`            | `{ x: number; y: number; width: number; height: number }`      | No       | —                               | Override the bounding rect used for positioning. By default the `targetSelector` element's `getBoundingClientRect()` is used.          |
| `targetPadding`         | `{ top: number; left: number; bottom: number; right: number }` | No       | —                               | Extra padding applied to the cutout around the `targetSelector` element. Ignored when `placement` is `CENTER`.                         |
| `placement`             | `TutorialTipPlacement`                                         | No       | `TutorialTip.PLACEMENTS.CENTER` | Position of the tip relative to `targetSelector`. See enum table above.                                                                |
| `offset`                | `{ x: number; y: number }`                                     | No       | —                               | Pixel offset applied on top of the calculated placement position.                                                                      |
| `onClickNext`           | `(event: React.MouseEvent) => void`                            | No       | —                               | Callback for the Next button. Next button is rendered only when this prop is provided and `currentStepCount < totalStepCount`.         |
| `onClickPrev`           | `(event: React.MouseEvent) => void`                            | No       | —                               | Callback for the Back button. Back button is rendered only when this prop is provided and `currentStepCount > 1`.                      |
| `onClickClose`          | `(event: React.MouseEvent \| React.KeyboardEvent) => void`     | No       | —                               | Callback for the Close (×) icon button and the Done button (shown on the last step). Also fires on `Escape` key.                       |
| `show`                  | `boolean`                                                      | No       | `true`                          | Show or hide the tip.                                                                                                                  |
| `portalContainer`       | `HTMLElement`                                                  | No       | `document.body`                 | DOM element to mount this component into via a React portal.                                                                           |
| `closeButtonIconProps`  | `ButtonProps`                                                  | No       | —                               | Props for the upper-right × close icon button.                                                                                         |
| `closeButtonProps`      | `ButtonProps`                                                  | No       | —                               | Props for the Done/Close footer button (only visible at the last step). Use `children` to override the button label.                   |
| `nextButtonProps`       | `ButtonProps`                                                  | No       | —                               | Props for the Next button. Use `children` to override the label.                                                                       |
| `prevButtonProps`       | `ButtonProps`                                                  | No       | —                               | Props for the Back button. Use `children` to override the label.                                                                       |
| `popoverContentProps`   | `PopoverContentProps`                                          | No       | —                               | Additional props forwarded to the internal `PopoverContent` wrapper. Use `wrapperProps.style.width` to override the default tip width. |
| `wrapperProps`          | `React.HTMLAttributes<HTMLDivElement>`                         | No       | —                               | Props for the outermost wrapper `div` rendered inside the portal.                                                                      |
| `waitForTargetSelector` | `number`                                                       | No       | `1000`                          | Maximum time in ms to wait for `targetSelector` to appear in the DOM before logging an error.                                          |

### Behaviour Notes

#### Overlay and cutout

- For all placements except `CENTER`, `TutorialTip` renders a full-screen semi-transparent overlay with a rounded-rectangle cutout around the `targetSelector` element. The cutout uses an SVG `<clipPath>` appended to `portalContainer`.
- With `CENTER` placement there is no cutout; the overlay covers the full viewport.
- `targetPadding` expands/contracts the cutout size; it has no effect when `placement` is `CENTER`.
- On `window` resize the tip repositions and the clip-path redraws automatically.
- The target element is scrolled into view (`scrollIntoView({ block: 'nearest' })`) before positioning.

#### Step indicators and footer buttons

| Condition                                                         | Footer shows                                                   |
| ----------------------------------------------------------------- | -------------------------------------------------------------- |
| `currentStepCount > 1` and `onClickPrev` provided                 | Back (`←`) button                                              |
| `currentStepCount < totalStepCount` and `onClickNext` provided    | Next (`→`) button                                              |
| `currentStepCount === totalStepCount` and `onClickClose` provided | Done / Close button                                            |
| Always                                                            | Step counter label (`"Step X of Y"`) with `aria-live="polite"` |

#### Close button placement

- When `title` is present: the × button appears inline with the title (top-right of header).
- When `title` is absent: the × button appears inline with the message content.
- In both cases, `closeButtonIconProps` controls the upper × icon button and `closeButtonProps` controls the footer Done button.

#### Caret

The `PopoverContent` caret is automatically set to the opposite side of the chosen `placement` (e.g. `TOP` → caret on bottom). `CENTER` renders no caret.

### Accessibility

- The tip wrapper has `role="presentation"` and the inner `PopoverContent` has `aria-modal="true"` with `aria-labelledby` pointing to the title and step counter.
- **Keyboard:** `Escape` calls `onClickClose` and stops event propagation. Focus is trapped inside the tip while open via `FocusTrap`.
- On mount and step change, focus is moved automatically: first to the Next button (if visible), then to the Close button, then to the first focusable element inside the tip.
- The step counter label has `aria-live="polite"` and `aria-atomic="true"` so screen readers announce step changes.

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Basic multi-placement demo (all 13 placements)

```tsx
import React from 'react'
import { TutorialTip, Button, FlexLayout } from '@nutanix-ui/prism-reactjs'

const TutorialTips = [
  {
    targetSelector: '.my-target-selector',
    title: 'TutorialTip Demo',
    message:
      'The following props are required: targetSelector, message, currentStepCount, totalStepCount. Placement defaults to "center".',
    popoverContentProps: {
      wrapperProps: {
        'data-test-id': 'my-custom-width',
        style: { width: 400 },
      },
    },
  },
  {
    targetSelector: '.tutorial-demo-btn',
    title: 'TutorialTip Demo',
    message: 'Tooltip on top with custom padding',
    placement: TutorialTip.PLACEMENTS.TOP,
    targetPadding: { top: 10, left: 10, bottom: 10, right: 10 },
  },
  {
    targetSelector: '.tutorial-demo-btn',
    title: 'TutorialTip Demo',
    message: 'top-left',
    placement: TutorialTip.PLACEMENTS.TOP_LEFT,
  },
  {
    targetSelector: '.tutorial-demo-btn',
    title: 'TutorialTip Demo',
    message: 'top-right',
    placement: TutorialTip.PLACEMENTS.TOP_RIGHT,
  },
  {
    targetSelector: '.tutorial-demo-btn',
    title: 'TutorialTip Demo',
    message: 'bottom',
    placement: TutorialTip.PLACEMENTS.BOTTOM,
  },
  {
    targetSelector: '.tutorial-demo-btn',
    title: 'TutorialTip Demo',
    message: 'bottom-left',
    placement: TutorialTip.PLACEMENTS.BOTTOM_LEFT,
  },
  {
    targetSelector: '.tutorial-demo-btn',
    title: 'TutorialTip Demo',
    message: 'bottom-right',
    placement: TutorialTip.PLACEMENTS.BOTTOM_RIGHT,
  },
  {
    targetSelector: '.tutorial-demo-btn',
    title: 'TutorialTip Demo',
    message: 'left',
    placement: TutorialTip.PLACEMENTS.LEFT,
  },
  {
    targetSelector: '.tutorial-demo-btn',
    title: 'TutorialTip Demo',
    message: 'left-top',
    placement: TutorialTip.PLACEMENTS.LEFT_TOP,
  },
  {
    targetSelector: '.tutorial-demo-btn',
    title: 'TutorialTip Demo',
    message: 'left-bottom',
    placement: TutorialTip.PLACEMENTS.LEFT_BOTTOM,
  },
  {
    targetSelector: '.tutorial-demo-btn',
    title: 'TutorialTip Demo',
    message: 'right',
    placement: TutorialTip.PLACEMENTS.RIGHT,
  },
  {
    targetSelector: '.tutorial-demo-btn',
    title: 'TutorialTip Demo',
    message: 'right-top',
    placement: TutorialTip.PLACEMENTS.RIGHT_TOP,
  },
  {
    targetSelector: '.tutorial-demo-btn',
    title: 'TutorialTip Demo',
    message: 'right-bottom',
    placement: TutorialTip.PLACEMENTS.RIGHT_BOTTOM,
  },
  {
    targetSelector: '.tutorial-demo-btn',
    title: 'TutorialTip Demo',
    message: 'center',
    placement: TutorialTip.PLACEMENTS.CENTER,
  },
]

const MyTutorialTip = () => {
  const [show, setShow] = React.useState(false)
  const [currStep, setCurrStep] = React.useState(1)

  const handleNextStep = React.useCallback(() => setCurrStep((s) => s + 1), [])
  const handleBackStep = React.useCallback(() => setCurrStep((s) => s - 1), [])
  const handleClose = React.useCallback(() => {
    setCurrStep(1)
    setShow(false)
  }, [])

  return (
    <FlexLayout
      alignItems="center"
      justifyContent="center"
      className="my-target-selector"
      style={{ padding: '120px' }}
    >
      <Button
        className="tutorial-demo-btn"
        data-test-id="tutorial-demo-btn"
        onClick={() => setShow(true)}
      >
        Start Demo
      </Button>
      <TutorialTip
        {...TutorialTips[currStep - 1]}
        currentStepCount={currStep}
        totalStepCount={TutorialTips.length}
        onClickClose={handleClose}
        onClickNext={handleNextStep}
        onClickPrev={handleBackStep}
        nextButtonProps={{ 'data-test-id': 'tutorial-tip-next-button' }}
        wrapperProps={{ 'data-test-id': 'tutorial-tip-basic' }}
        show={show}
      />
    </FlexLayout>
  )
}
```

#### Tutorial tip with icon and new style

```tsx
import React, { useState } from 'react'
import {
  TutorialTip,
  Button,
  KarbonLogoIcon,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'

const TutorialTipWithIcon = () => {
  const [visible, setVisible] = useState(false)
  const toggleTutorialTip = () => setVisible((v) => !v)

  return (
    <StackingLayout>
      <Button
        className="button-for-tutorial-with-icon"
        data-test-id="button-for-tutorial-with-icon"
        onClick={toggleTutorialTip}
      >
        TutorialTip with Icon new style
      </Button>
      {visible && (
        <TutorialTip
          targetSelector=".button-for-tutorial-with-icon"
          title="Icon and new style"
          message="Place the tooltip on right-top corner of the demo button"
          placement={TutorialTip.PLACEMENTS.RIGHT_TOP}
          onClickClose={toggleTutorialTip}
          currentStepCount={1}
          totalStepCount={1}
          show={visible}
          closeButtonProps={{ 'data-test-id': 'tutorial-tip-close-button' }}
          icon={<KarbonLogoIcon />}
        />
      )}
    </StackingLayout>
  )
}
```

#### Various layouts (title, icon, close button toggles)

```tsx
import React, { useState } from 'react'
import {
  TutorialTip,
  Button,
  StackingLayout,
  Checkbox,
  FlexLayout,
  KarbonLogoIcon,
  Paragraph,
} from '@nutanix-ui/prism-reactjs'

const CustomMessage = ({ onClick }) => (
  <StackingLayout>
    <Paragraph>
      You can customize the message to any node, but must style it yourself.
    </Paragraph>
    <Button data-test-id="custom-close-button" onClick={onClick}>
      Close
    </Button>
  </StackingLayout>
)

const TutorialTipWithoutIcon = () => {
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState(null)
  const [showIcon, setShowIcon] = useState(false)
  const [showCloseIcon, setShowCloseIcon] = useState(true)
  const toggle = () => setVisible((v) => !v)

  return (
    <StackingLayout>
      <Button
        className="button-various-layout"
        onClick={toggle}
        data-test-id="button-layout"
      >
        Click here to see the TutorialTip
      </Button>
      {visible && (
        <TutorialTip
          targetSelector=".button-various-layout"
          title={title}
          message={
            showCloseIcon ? (
              "You'll need a message. It can be non-string, but you must style it yourself."
            ) : (
              <CustomMessage onClick={toggle} />
            )
          }
          placement={TutorialTip.PLACEMENTS.RIGHT_TOP}
          onClickClose={showCloseIcon ? toggle : null}
          currentStepCount={1}
          totalStepCount={1}
          show={visible}
          icon={showIcon && <KarbonLogoIcon />}
          popoverContentProps={{
            wrapperProps: { 'data-test-id': 'tutorial-tip-layout' },
          }}
          closeButtonProps={{ 'data-test-id': 'tutorial-tip-close-button' }}
        />
      )}
      <FlexLayout>
        <Checkbox
          id="title-checkbox"
          label="Show Title"
          checked={!!title}
          onChange={() => setTitle((t) => (t ? null : 'Title Goes Here'))}
        />
        <Checkbox
          id="icon-checkbox"
          label="Show Illustration Icon"
          checked={showIcon}
          onChange={() => setShowIcon((v) => !v)}
        />
        <Checkbox
          id="close-button-checkbox"
          label="Show Close Button"
          checked={showCloseIcon}
          onChange={() => setShowCloseIcon((v) => !v)}
        />
      </FlexLayout>
    </StackingLayout>
  )
}
```

#### Tutorial tip with custom labels for next, previous and close buttons

```tsx
import React, { useState } from 'react'
import {
  TutorialTip,
  Button,
  StackingLayout,
  CheckMarkIcon,
} from '@nutanix-ui/prism-reactjs'

const steps = [
  {
    targetSelector: '.button-custom-labels',
    title: 'Custom button labels',
    message: 'Custom Next button label.',
    placement: TutorialTip.PLACEMENTS.TOP,
    nextButtonProps: {
      children: 'Next tip',
      'data-test-id': 'tutorial-tip-next',
    },
  },
  {
    targetSelector: '.button-custom-labels',
    title: 'Custom button labels',
    message: 'Custom Previous and Close button.',
    placement: TutorialTip.PLACEMENTS.TOP,
    prevButtonProps: { children: 'Previous tip' },
  },
]

const TutorialTipWithCustomLabels = () => {
  const [visible, setVisible] = useState(false)
  const [currStep, setCurrentStep] = useState(1)

  const toggle = () => {
    setVisible((v) => !v)
    setCurrentStep(1)
  }
  const handleNext = () => setCurrentStep((s) => s + 1)
  const handleBack = () => setCurrentStep((s) => s - 1)

  return (
    <StackingLayout>
      <Button
        className="button-custom-labels"
        onClick={toggle}
        data-test-id="button-custom-labels"
      >
        Tutorial tip with custom labels
      </Button>
      {visible && (
        <TutorialTip
          title="Custom button labels"
          placement={TutorialTip.PLACEMENTS.TOP}
          {...steps[currStep - 1]}
          currentStepCount={currStep}
          totalStepCount={steps.length}
          onClickClose={toggle}
          onClickNext={handleNext}
          onClickPrev={handleBack}
          show={visible}
          popoverContentProps={{
            wrapperProps: { 'data-test-id': 'tutorial-tip-custom-labels' },
          }}
          closeButtonIconProps={{
            'data-test-id': 'tutorial-tip-close-btn-icon',
          }}
          closeButtonProps={{
            'data-test-id': 'tutorial-tip-close-button',
            children: (
              <>
                <span>Close tutorial</span>
                <CheckMarkIcon size="small" />
              </>
            ),
          }}
        />
      )}
    </StackingLayout>
  )
}
```

### Usage Notes

- Prefer `Tutorial` + `TutorialManager` over direct `TutorialTip` for standard onboarding flows.
- Always use `TutorialTip.PLACEMENTS.<VALUE>` for placement values; `TutorialTipPlacement` is not exported from the package root.
- `currentStepCount` is **1-based**. The footer shows "Step X of Y".
- The Back button only renders when `onClickPrev` is provided **and** `currentStepCount > 1`.
- The Next button only renders when `onClickNext` is provided **and** `currentStepCount < totalStepCount`.
- The Done/Close footer button only renders when `onClickClose` is provided **and** `currentStepCount === totalStepCount`.
- Pass `null` as `onClickClose` to omit the close × button entirely (and use a custom close inside `message`).
- Use `popoverContentProps.wrapperProps.style.width` to override the default tip width.
- Keep labels, help text, and validation visible and persistent for form controls; use `FormItem*` wrappers where available.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.

<!-- SOURCE-API-END -->
