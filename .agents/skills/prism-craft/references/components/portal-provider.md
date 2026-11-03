# PortalProvider

## Figma

- **Library name:** N/A
- **Use case:** React-only utility export; not usually mapped directly from a Figma component.

## React

Import: `import { PortalProvider } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import { PortalProvider } from '@nutanix-ui/prism-reactjs'
```

`PortalProviderTrigger` and `PopupProviderToPortalProviderMapping` are **not** re-exported from the main package index. Import them directly from the component file when needed:

```tsx
import {
  PortalProviderTrigger,
  PopupProviderToPortalProviderMapping,
} from '@nutanix-ui/prism-reactjs/services/src/components/v2/Utility/PortalProvider'
```

### Enums / Constants

#### `PortalProviderTrigger`

| Key     | Value     |
| ------- | --------- |
| `HOVER` | `'hover'` |
| `CLICK` | `'click'` |
| `FOCUS` | `'focus'` |

#### `PopupProviderToPortalProviderMapping`

Maps legacy `PopupProvider` `popupPlacement` values to `PortalProvider` `placement` values. Useful when migrating from `PopupProvider`.

| PopupProvider placement | PortalProvider placement |
| ----------------------- | ------------------------ |
| `leftTop`               | `'left-start'`           |
| `left`                  | `'left-start'`           |
| `leftBottom`            | `'left-end'`             |
| `topLeft`               | `'top-start'`            |
| `top`                   | `'top-start'`            |
| `topRight`              | `'top-end'`              |
| `rightTop`              | `'right-start'`          |
| `right`                 | `'right-start'`          |
| `rightBottom`           | `'right-end'`            |
| `bottomLeft`            | `'bottom-start'`         |
| `bottom`                | `'bottom-start'`         |
| `bottomRight`           | `'bottom-end'`           |

### Props Interface

#### `PortalProviderProps`

| Prop                           | Type                                                                                                                                                                 | Default               | Required | Description                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`                     | `React.ReactElement<any, string \| React.JSXElementConstructor<any>>`                                                                                                | —                     | Yes      | The element or text node for the portal to anchor on. Must be a React element (not a string or fragment).                                                                                                                                                                                                                                            |
| `animationFrame`               | `boolean`                                                                                                                                                            | `false`               | No       | When `true`, schedules auto-positioning updates using `requestAnimationFrame` for smoother rendering aligned with the browser repaint cycle; when `false`, updates are applied immediately.                                                                                                                                                          |
| `allowEmptyContent`            | `boolean`                                                                                                                                                            | `true`                | No       | When `false`, the portal will not render if `content` is `undefined`, `null`, `false`, or `''`. Set to `false` to use null/empty content as a disabled state.                                                                                                                                                                                        |
| `caretRef`                     | `React.RefObject<HTMLElement>`                                                                                                                                       | —                     | No       | Ref for a caret (arrow) element inside the portal content. `PortalProvider` will automatically position it based on placement using `@floating-ui/dom`'s `arrow` middleware. Static edge positioning (`-start`/`-end` placements) is handled by CSS.                                                                                                 |
| `className`                    | `string`                                                                                                                                                             | —                     | No       | Custom class name applied to the portal wrapper element.                                                                                                                                                                                                                                                                                             |
| `closeOnEscape`                | `boolean`                                                                                                                                                            | —                     | No       | When `true`, pressing Escape closes the portal. The ESC listener is attached to `document` (not the portal wrapper) unless `trapFocus` is also `true`, in which case a React synthetic `onKeyDown` is used on the portal wrapper instead.                                                                                                            |
| `closableOnClickAway`          | `boolean`                                                                                                                                                            | —                     | No       | When `true`, clicking outside the portal and its anchor element closes the portal. The listener uses `click` (not `mousedown`) to prevent event bubbling issues.                                                                                                                                                                                     |
| `content`                      | `React.ReactNode`                                                                                                                                                    | —                     | No       | The content rendered inside the portal. When `allowEmptyContent` is `false`, falsy values here will suppress portal rendering entirely.                                                                                                                                                                                                              |
| `trapFocus`                    | `boolean`                                                                                                                                                            | —                     | No       | When `true` and the portal is visible, keyboard focus is trapped inside the portal. **Important caveats:** (1) You are responsible for returning focus to the trigger when the portal closes. (2) `closeOnEscape` relies on a React synthetic event on the portal wrapper when `trapFocus` is active — if focus escapes the trap, ESC will not fire. |
| `focusOnFirstFocusableElement` | `boolean`                                                                                                                                                            | —                     | No       | When `true`, focus is moved to the first focusable element inside the portal when it becomes visible.                                                                                                                                                                                                                                                |
| `passThrough`                  | `boolean`                                                                                                                                                            | —                     | No       | When `true` and `trapFocus` is active, pressing Tab on the last focusable item (or Shift+Tab on the first) moves focus to the trigger element rather than looping inside the portal.                                                                                                                                                                 |
| `restoreFocus`                 | `boolean`                                                                                                                                                            | —                     | No       | When `true`, focus is returned to the trigger element when the portal closes.                                                                                                                                                                                                                                                                        |
| `onVisibleChange`              | `(visible: boolean) => void`                                                                                                                                         | —                     | No       | Callback fired whenever portal visibility changes. Always fires even if the new value equals the current state (due to React async `setState`).                                                                                                                                                                                                      |
| `offset`                       | `number`                                                                                                                                                             | `0`                   | No       | Distance in pixels between the portal and the anchor element.                                                                                                                                                                                                                                                                                        |
| `mouseEnterDelay`              | `number`                                                                                                                                                             | `0`                   | No       | Delay in milliseconds before showing the portal on mouse enter (when `trigger` includes `'hover'`).                                                                                                                                                                                                                                                  |
| `mouseLeaveDelay`              | `number`                                                                                                                                                             | `0`                   | No       | Delay in milliseconds before hiding the portal on mouse leave (when `trigger` includes `'hover'`). Useful to prevent flicker when moving between anchor and portal.                                                                                                                                                                                  |
| `placement`                    | `'left-start' \| 'left' \| 'left-end' \| 'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end'` | `'bottom'`            | No       | Preferred placement of the portal relative to the anchor. The `@floating-ui/dom` `flip` middleware will automatically switch to an opposite placement when there is insufficient space.                                                                                                                                                              |
| `style`                        | `React.CSSProperties`                                                                                                                                                | —                     | No       | Custom styles applied to the portal wrapper. Always include `zIndex` to ensure the portal renders above other content.                                                                                                                                                                                                                               |
| `transitionStyles`             | `TransitionProps['transitionStyles']`                                                                                                                                | `{}`                  | No       | CSS style objects keyed by transition status (`entering`, `entered`, `exiting`, `exited`). Applied to the portal wrapper during `react-transition-group` transitions.                                                                                                                                                                                |
| `transitionTimeout`            | `TransitionProps['timeout']`                                                                                                                                         | `0`                   | No       | Duration (ms) for portal enter/exit transitions. Should match the CSS transition duration in `transitionStyles`.                                                                                                                                                                                                                                     |
| `trigger`                      | `PortalProviderTrigger \| PortalProviderTrigger[]`                                                                                                                   | —                     | No       | One or more interaction event(s) that toggle portal visibility. No default — omit to use `visible` for fully controlled mode. Accepts `'click'`, `'hover'`, `'focus'`, or an array like `['focus', 'hover']`. For `'focus'` trigger: ensure the anchor is natively focusable or has a `tabIndex`.                                                    |
| `unmountOnExit`                | `TransitionProps['unmountOnExit']`                                                                                                                                   | `true`                | No       | When `true`, the portal DOM is removed from the document when hidden. Set to `false` to keep the portal mounted (useful for nested portals or preserving state).                                                                                                                                                                                     |
| `visible`                      | `boolean`                                                                                                                                                            | —                     | No       | Controlled visibility of the portal. When provided, this overrides and disables any `trigger`-based visibility management. The component becomes fully controlled.                                                                                                                                                                                   |
| `wrapperProps`                 | `DataWrapperProps<React.HTMLProps<HTMLElement>>`                                                                                                                     | —                     | No       | DOM props spread onto the portal wrapper element (e.g. `data-test-id`, `aria-*`, event handlers). Event handlers in `wrapperProps` are merged with internal handlers.                                                                                                                                                                                |
| `mountElement`                 | `() => HTMLElement \| null \| undefined`                                                                                                                             | `() => document.body` | No       | Function returning the DOM element where the portal will be mounted via `ReactDOM.createPortal`. Defaults to `document.body`. Use this to scope the portal to a scrollable container for correct positioning.                                                                                                                                        |

### Behaviour Notes

- **Positioning engine:** Uses `@floating-ui/dom` (`computePosition`, `autoUpdate`, `flip`, `shift`, `offset`, `arrow`, `hide`). The portal is automatically repositioned on scroll and resize via `autoUpdate`. When the anchor scrolls out of the viewport, the portal is hidden (`visibility: hidden`) rather than clipped.
- **Mount target:** By default the portal mounts on `document.body`. When a custom `mountElement` is provided, the portal wrapper is given `position: absolute` instead of `position: fixed` so it positions correctly relative to the container.
- **Class prefix:** The portal wrapper receives `{classPrefix}-portal` and `{classPrefix}` class names from the Prism `ThemeManager`.
- **`data-status` attribute:** The portal wrapper element exposes a `data-status` attribute with the current `react-transition-group` `TransitionStatus` (`'entering'`, `'entered'`, `'exiting'`, `'exited'`). Useful for CSS-driven animations.
- **Click + Focus combined trigger:** When both `'click'` and `'focus'` are in the `trigger` array, a `mousedown` pre-check (`wasFocusedBeforeClick`) prevents the portal from toggling twice when clicking a focused anchor.
- **Escape key propagation:** When `closeOnEscape` fires, `event.stopPropagation()` is called to prevent cascading closures of parent modals or portals.
- **`isContentEmpty` static helper:** `PortalProvider.isContentEmpty(allowEmptyContent, content)` returns `true` when `allowEmptyContent` is `false` and `content` is `undefined`, `null`, `false`, or `''`. Used internally to gate both rendering and `visible` state changes.

### Accessibility Notes

- When using `trapFocus`, manually restore focus to the triggering element on close (e.g. via `restoreFocus` prop or an `onVisibleChange` callback).
- When using `trigger="focus"`, ensure the anchor element is natively focusable or has an explicit `tabIndex`.
- For non-interactive anchor elements (e.g. `TextLabel`), add `tabIndex={0}` to make them keyboard-reachable.
- `closeOnEscape` with `trapFocus`: the ESC event is handled via a React synthetic `onKeyDown` on the portal — focus must be inside the portal for it to fire.

### Source Examples

These are adapted from the Prism source examples. Some examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Trigger Actions (click / hover / focus / combined)

```tsx
import React from 'react'
import {
  Alert,
  Button,
  FlexLayout,
  PortalProvider,
  StackingLayout,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
import { ThemeWrapperContext } from '@nutanix-core/prism-ui-themes-common'

const PortalContent = () => (
  <ThemeWrapperContext.Consumer>
    {() => (
      <div
        style={{
          background: 'var(--color-background-base)',
          padding: 20,
          border: '1px solid var(--color-border-interactive)',
          borderRadius: 4,
        }}
      >
        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}>
          I am a Floating Portal
        </TextLabel>
      </div>
    )}
  </ThemeWrapperContext.Consumer>
)

// Tip: For 'focus' trigger, ensure the anchor element is focusable (natively or via tabIndex).
// Tip: Always provide a zIndex on style so the portal renders above other content.
;<StackingLayout>
  <Alert
    style={{ minWidth: 200, maxWidth: 800 }}
    message="The trigger action must be explicitly set. Omit trigger and use visible for controlled mode."
    inline={true}
  />
  <FlexLayout>
    <PortalProvider
      trigger="click"
      style={{ zIndex: 1 }}
      offset={10}
      content={<PortalContent />}
      wrapperProps={{ 'data-test-id': 'portal-click' }}
    >
      <Button data-test-id="portal-btn-click">Click Me</Button>
    </PortalProvider>

    <PortalProvider
      trigger="hover"
      style={{ zIndex: 1 }}
      offset={10}
      content={<PortalContent />}
      wrapperProps={{ 'data-test-id': 'portal-hover' }}
    >
      <Button
        type={Button.ButtonTypes.SECONDARY}
        data-test-id="portal-btn-hover"
      >
        Hover Me
      </Button>
    </PortalProvider>

    <PortalProvider
      trigger="focus"
      style={{ zIndex: 1 }}
      offset={10}
      content={<PortalContent />}
      wrapperProps={{ 'data-test-id': 'portal-focus' }}
    >
      <Button
        type={Button.ButtonTypes.SUCCESS}
        tabIndex={0}
        data-test-id="portal-btn-focus"
      >
        Focus Me
      </Button>
    </PortalProvider>

    {/* Combined triggers as an array */}
    <PortalProvider
      trigger={['focus', 'hover']}
      style={{ zIndex: 1 }}
      offset={10}
      content={<PortalContent />}
      wrapperProps={{ 'data-test-id': 'portal-hover-focus' }}
    >
      <Button
        type={Button.ButtonTypes.WARNING}
        tabIndex={0}
        data-test-id="portal-btn-hover-focus"
      >
        Focus/Hover Me
      </Button>
    </PortalProvider>

    <PortalProvider
      trigger={['focus', 'click']}
      style={{ zIndex: 1 }}
      offset={10}
      content={<PortalContent />}
      wrapperProps={{ 'data-test-id': 'portal-focus-click' }}
    >
      <Button
        type={Button.ButtonTypes.DESTRUCTIVE}
        tabIndex={0}
        data-test-id="portal-btn-focus-click"
      >
        Focus/Click Me
      </Button>
    </PortalProvider>
  </FlexLayout>
</StackingLayout>
```

#### Controlled (visibility managed externally)

```tsx
import React from 'react'
import {
  Button,
  FlexLayout,
  PortalProvider,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
import { ThemeWrapperContext } from '@nutanix-core/prism-ui-themes-common'

const PortalContent = () => (
  <ThemeWrapperContext.Consumer>
    {() => (
      <div
        style={{
          background: 'var(--color-background-base)',
          padding: 20,
          border: '1px solid var(--color-border-interactive)',
          borderRadius: 4,
        }}
      >
        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}>
          I am a Floating Portal
        </TextLabel>
      </div>
    )}
  </ThemeWrapperContext.Consumer>
)

const MyControlledPortal = () => {
  const [visible, setVisible] = React.useState(false)

  return (
    <FlexLayout itemSpacing="40px">
      <PortalProvider
        style={{ zIndex: 1 }}
        offset={10}
        content={<PortalContent />}
        visible={visible}
      >
        <Button onClick={() => setVisible(!visible)}>Click Me</Button>
      </PortalProvider>
      <Button
        onClick={() => setVisible(!visible)}
        type={Button.ButtonTypes.SECONDARY}
      >
        Click My Representative
      </Button>
    </FlexLayout>
  )
}
```

#### Controlled with Closable Events (click-away + ESC on a controlled portal)

```tsx
import React from 'react'
import {
  Button,
  FlexLayout,
  PortalProvider,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
import { ThemeWrapperContext } from '@nutanix-core/prism-ui-themes-common'

const PortalContent = () => (
  <ThemeWrapperContext.Consumer>
    {() => (
      <div
        style={{
          background: 'var(--color-background-base)',
          padding: 20,
          border: '1px solid var(--color-border-interactive)',
          borderRadius: 4,
        }}
      >
        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}>
          I am a Floating Portal
        </TextLabel>
      </div>
    )}
  </ThemeWrapperContext.Consumer>
)

const MyControlledPortal = () => {
  const [visible, setVisible] = React.useState(false)

  return (
    <FlexLayout itemSpacing="40px">
      <PortalProvider
        closableOnClickAway={true}
        closeOnEscape={true}
        onVisibleChange={() => setVisible(!visible)}
        style={{ zIndex: 1 }}
        offset={10}
        content={<PortalContent />}
        visible={visible}
        wrapperProps={{ 'data-test-id': 'portal-controlled-click-away' }}
      >
        <Button onClick={() => setVisible(!visible)}>Click Me</Button>
      </PortalProvider>
      <Button
        data-test-id="portal-btn-controlled-click-away"
        onClick={() => setVisible(!visible)}
        type={Button.ButtonTypes.SECONDARY}
      >
        Click My Representative
      </Button>
    </FlexLayout>
  )
}
```

#### Click Outside to Close

```tsx
import React from 'react'
import { Button, PortalProvider, TextLabel } from '@nutanix-ui/prism-reactjs'
import { ThemeWrapperContext } from '@nutanix-core/prism-ui-themes-common'

const PortalContent = () => (
  <ThemeWrapperContext.Consumer>
    {() => (
      <div
        style={{
          background: 'var(--color-background-base)',
          padding: 20,
          border: '1px solid var(--color-border-interactive)',
          borderRadius: 4,
        }}
      >
        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}>
          I am a Floating Portal
        </TextLabel>
      </div>
    )}
  </ThemeWrapperContext.Consumer>
)

;<PortalProvider
  closableOnClickAway={true}
  style={{ zIndex: 1 }}
  offset={10}
  content={<PortalContent />}
  trigger="click"
  wrapperProps={{ 'data-test-id': 'portal-click-away' }}
>
  <Button data-test-id="portal-btn-click-away">Click Me</Button>
</PortalProvider>
```

#### Press Escape to Close

```tsx
import React from 'react'
import { Button, PortalProvider, TextLabel } from '@nutanix-ui/prism-reactjs'
import { ThemeWrapperContext } from '@nutanix-core/prism-ui-themes-common'

const PortalContent = () => (
  <ThemeWrapperContext.Consumer>
    {() => (
      <div
        style={{
          background: 'var(--color-background-base)',
          padding: 20,
          border: '1px solid var(--color-border-interactive)',
          borderRadius: 4,
        }}
      >
        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}>
          I am a Floating Portal
        </TextLabel>
      </div>
    )}
  </ThemeWrapperContext.Consumer>
)

;<PortalProvider
  closeOnEscape={true}
  style={{ zIndex: 1 }}
  offset={10}
  content={<PortalContent />}
  trigger="click"
  wrapperProps={{ 'data-test-id': 'portal-close-escape' }}
>
  <Button data-test-id="portal-btn-close-escape">Click Me</Button>
</PortalProvider>
```

#### Animation (enter/exit transitions via `transitionStyles` + `transitionTimeout`)

```tsx
import React from 'react'
import { Button, PortalProvider, TextLabel } from '@nutanix-ui/prism-reactjs'
import { ThemeWrapperContext } from '@nutanix-core/prism-ui-themes-common'

const duration = 200
const transitionStyles = {
  entering: {
    transition: `all ${duration}ms cubic-bezier(0.08, 0.82, 0.17, 1)`,
    transform: 'scale(1)',
    opacity: 1,
  },
  entered: { transform: 'scale(1)', opacity: 1 },
  exiting: {
    transition: `all ${duration}ms cubic-bezier(0.78, 0.14, 0.15, 0.86)`,
    transform: 'scale(0.8)',
    opacity: 0,
  },
  exited: { transform: 'scale(0.8)', opacity: 0 },
}

const PortalContent = () => (
  <ThemeWrapperContext.Consumer>
    {() => (
      <div
        style={{
          background: 'var(--color-background-base)',
          padding: 20,
          border: '1px solid var(--color-border-interactive)',
          borderRadius: 4,
        }}
      >
        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}>
          I am an animated Floating Portal!
        </TextLabel>
      </div>
    )}
  </ThemeWrapperContext.Consumer>
)

;<PortalProvider
  closeOnEscape={true}
  style={{ zIndex: 1 }}
  offset={10}
  content={<PortalContent />}
  trigger="click"
  transitionStyles={transitionStyles}
  transitionTimeout={duration}
>
  <Button>Click Me</Button>
</PortalProvider>
```

#### Dynamic Positioning System — custom `mountElement` + `caretRef`

Use `mountElement` to scope the portal to a scrollable container. The portal will reposition automatically as the container scrolls, and will hide when the anchor scrolls out of the viewport.

```tsx
import React, { useEffect, useState, useRef } from 'react'
import {
  ContainerLayout,
  FlexLayout,
  Button,
  PortalProvider,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
import { ThemeWrapperContext } from '@nutanix-core/prism-ui-themes-common'

const size = 400

const PortalContent = ({ caretRef, text }) => (
  <ThemeWrapperContext.Consumer>
    {() => (
      <div>
        <div
          style={{
            background: 'var(--color-background-base)',
            padding: 20,
            border: '1px solid var(--color-border-interactive)',
            borderRadius: 4,
          }}
        >
          <TextLabel type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}>{text}</TextLabel>
        </div>
        <div
          ref={caretRef}
          style={{
            width: 0,
            height: 0,
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderTop: '8px solid var(--color-background-destructive)',
          }}
        />
      </div>
    )}
  </ThemeWrapperContext.Consumer>
)

const MyPopover = () => {
  const caretRef = useRef(null)
  const containerRef = useRef(null)
  const [container, setContainer] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = (size * 2) / 2
      containerRef.current.scrollLeft = (size * 2) / 2
      setContainer(containerRef)
      setVisible(true)
    }
  }, [])

  return (
    <ContainerLayout border={true} style={{ width: size }}>
      <div
        ref={containerRef}
        style={{
          overflow: 'auto',
          position: 'relative',
          width: size,
          height: size,
        }}
      >
        <FlexLayout
          style={{ width: size * 3, height: size * 3 }}
          justifyContent="center"
          alignItems="center"
        >
          <PortalProvider
            caretRef={caretRef}
            style={{ zIndex: 1 }}
            offset={10}
            content={
              <PortalContent
                caretRef={caretRef}
                text="I am a Floating Portal"
              />
            }
            mountElement={() => container && container.current}
            visible={visible}
            placement="top"
          >
            <Button>Scroll Me</Button>
          </PortalProvider>
        </FlexLayout>
      </div>
    </ContainerLayout>
  )
}
```

#### Disabled via Empty Content (`allowEmptyContent={false}`)

```tsx
import React from 'react'
import {
  Button,
  FlexLayout,
  Paragraph,
  PortalProvider,
  StackingLayout,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
import { ThemeWrapperContext } from '@nutanix-core/prism-ui-themes-common'

const PortalContent = () => (
  <ThemeWrapperContext.Consumer>
    {() => (
      <div
        style={{
          background: 'var(--color-background-base)',
          padding: 20,
          border: '1px solid var(--color-border-interactive)',
          borderRadius: 4,
        }}
      >
        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}>
          I am a Floating Portal
        </TextLabel>
      </div>
    )}
  </ThemeWrapperContext.Consumer>
)

const DisabledPortalExample = () => {
  const [visible, setVisible] = React.useState(true)
  const [content, setContent] = React.useState(undefined)

  return (
    <StackingLayout>
      <Paragraph type="secondary" forceMultiLineHeight={true}>
        Setting content to a falsy value while allowEmptyContent is false
        disables the portal.
      </Paragraph>
      <FlexLayout itemSpacing="40px">
        <PortalProvider
          allowEmptyContent={false}
          style={{ zIndex: 1 }}
          offset={10}
          content={content}
          visible={visible}
        >
          <Button onClick={() => setVisible(!visible)}>Toggle</Button>
        </PortalProvider>
        <Button
          disabled={!!content}
          onClick={() => setContent(<PortalContent />)}
          type={Button.ButtonTypes.SUCCESS}
        >
          {content ? 'My Work is Done Here' : 'Refuel My Friend!'}
        </Button>
      </FlexLayout>
    </StackingLayout>
  )
}
```

#### Non-Button Anchor (TextLabel with `tabIndex`)

For non-interactive anchor elements, add `tabIndex={0}` to enable keyboard focus triggers.

```tsx
import React from 'react'
import {
  Alert,
  PortalProvider,
  StackingLayout,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
import { ThemeWrapperContext } from '@nutanix-core/prism-ui-themes-common'

const PortalContent = () => (
  <ThemeWrapperContext.Consumer>
    {() => (
      <div
        style={{
          background: 'var(--color-background-base)',
          padding: 20,
          border: '1px solid var(--color-border-interactive)',
          borderRadius: 4,
        }}
      >
        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}>
          I see you are using a tabIndex. Great job!
        </TextLabel>
      </div>
    )}
  </ThemeWrapperContext.Consumer>
)

;<StackingLayout>
  <Alert
    style={{ minWidth: 200, maxWidth: 800 }}
    message="You must add tabIndex to non-interactive anchor elements."
    inline={true}
  />
  <div>
    <PortalProvider
      trigger={['focus', 'hover']}
      style={{ zIndex: 1 }}
      offset={10}
      content={<PortalContent />}
      wrapperProps={{ 'data-test-id': 'text-portal-hover' }}
    >
      <TextLabel
        tabIndex={0}
        type={TextLabel.TEXT_LABEL_TYPE.TRIGGER}
        data-test-id="text-portal-btn-hover"
        style={{ position: 'relative' }}
      >
        Hover Me
      </TextLabel>
    </PortalProvider>
  </div>
</StackingLayout>
```

#### Nested Portals with `unmountOnExit={false}`

When nesting portals (portal inside portal content), set `unmountOnExit={false}` to keep inner portals mounted and avoid positioning issues.

```tsx
import React from 'react'
import { Button, PortalProvider } from '@nutanix-ui/prism-reactjs'
import { ThemeWrapperContext } from '@nutanix-core/prism-ui-themes-common'

const NestedPortalExample = () => {
  const [portalOneVisible, setPortalOneVisible] = React.useState(false)
  const [portalTwoVisible, setPortalTwoVisible] = React.useState(false)

  return (
    <PortalProvider
      style={{ zIndex: 1, visibility: portalOneVisible ? 'visible' : 'hidden' }}
      offset={10}
      visible={portalOneVisible}
      unmountOnExit={false}
      wrapperProps={{ 'data-test-id': 'first-portal' }}
      content={
        <ThemeWrapperContext.Consumer>
          {() => (
            <div
              style={{
                background: 'var(--color-background-base)',
                padding: 20,
                border: '1px solid var(--color-border-interactive)',
                borderRadius: 4,
              }}
            >
              <PortalProvider
                style={{
                  zIndex: 1,
                  visibility: portalTwoVisible ? 'visible' : 'hidden',
                }}
                offset={10}
                visible={portalTwoVisible}
                unmountOnExit={false}
                wrapperProps={{ 'data-test-id': 'second-portal' }}
                content={
                  <ThemeWrapperContext.Consumer>
                    {() => (
                      <div
                        style={{
                          background: 'var(--color-background-base)',
                          padding: 20,
                          border: '1px solid var(--color-border-interactive)',
                          borderRadius: 4,
                        }}
                      >
                        <Button
                          onClick={() => {
                            setPortalOneVisible(!portalOneVisible)
                            setPortalTwoVisible(!portalTwoVisible)
                          }}
                        >
                          I am a dream inside another dream
                        </Button>
                      </div>
                    )}
                  </ThemeWrapperContext.Consumer>
                }
              >
                <Button
                  onClick={() => {
                    setPortalOneVisible(!portalOneVisible)
                    setPortalTwoVisible(!portalTwoVisible)
                  }}
                  data-test-id="second-trigger-btn"
                >
                  Wait, but there is more!
                </Button>
              </PortalProvider>
            </div>
          )}
        </ThemeWrapperContext.Consumer>
      }
    >
      <Button
        onClick={() => setPortalOneVisible(!portalOneVisible)}
        data-test-id="first-trigger-btn"
      >
        Click Me
      </Button>
    </PortalProvider>
  )
}
```

### Usage Notes

- `PortalProvider` is a React class component (`React.Component`). It is a lower-level utility; prefer higher-level Prism components (e.g. `Tooltip`, `Popover`, `Select`) when they satisfy the design — those are built on top of this primitive.
- Always set `style={{ zIndex: <n> }}` on the portal; without an explicit `zIndex`, the portal may render below other stacked elements.
- When `trigger` is omitted, the component is in uncontrolled mode with no automatic show/hide behaviour. Use `visible` for fully controlled mode.
- `onVisibleChange` always fires, even when the new state equals the current state. In controlled mode, wire `onVisibleChange` to your state setter so that `closableOnClickAway` and `closeOnEscape` can update the controlled `visible` prop.
- Keep generated app code aligned with repository rules: Prism layout components for layout, persistent accessible labels, and no custom CSS for spacing.

<!-- SOURCE-API-END -->
