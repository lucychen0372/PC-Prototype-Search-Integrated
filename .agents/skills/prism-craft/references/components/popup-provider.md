# PopupProvider

## Figma

- **Library name:** N/A
- **Use case:** React-only utility export; not usually mapped directly from a Figma component.

## React

Import: `import { PopupProvider } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import { PopupProvider } from '@nutanix-ui/prism-reactjs'
```

To use the placement types directly:

```tsx
import type { TypePlacementMap, AlignConfig } from '@nutanix-ui/prism-reactjs'
```

### Overview

`PopupProvider` is a low-level utility component that wraps `rc-trigger` and provides enhancements for building custom popups — Tooltip, Popover, Dropdown, Notification, etc. Higher-level Prism components (e.g. `Tooltip`, `Popover`, `Dropdown`) are built on top of it; prefer those when they satisfy the design. Use `PopupProvider` directly only when you need fine-grained control not exposed by the higher-level components.

### Props Interfaces

#### `PopupProviderProps`

All props are optional in the TypeScript interface. `children` and `popup` are required at runtime (enforced by `propTypes`).

| Prop                      | Type                                                                                                                                                             | Default       | Required      | Description                                                                                                                                                                                                                                                                                                 |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `action`                  | `('hover' \| 'click' \| 'focus' \| 'contextMenu')[] \| 'hover' \| 'click' \| 'focus' \| 'contextMenu'`                                                           | —             | No            | Event(s) that trigger the popup. Accepts a single string or an array of trigger types.                                                                                                                                                                                                                      |
| `afterPopupVisibleChange` | `(visible: boolean) => void`                                                                                                                                     | —             | No            | Called after popup visibility has finished changing.                                                                                                                                                                                                                                                        |
| `children`                | `React.ReactNode`                                                                                                                                                | —             | Yes (runtime) | The trigger element. If `text` is supplied, a `Link` wraps the text. Beware: disabled child components may swallow events — add a wrapper `<span>` if needed.                                                                                                                                               |
| `onPopupVisibleChange`    | `(visible: boolean) => void`                                                                                                                                     | —             | No            | Called when popup visibility changes.                                                                                                                                                                                                                                                                       |
| `popup`                   | `React.ReactNode`                                                                                                                                                | —             | Yes (runtime) | The popup content rendered above/below/beside the trigger.                                                                                                                                                                                                                                                  |
| `popupClassName`          | `string`                                                                                                                                                         | —             | No            | Additional CSS class name for the popup container element.                                                                                                                                                                                                                                                  |
| `popupPlacement`          | `'leftTop' \| 'left' \| 'leftBottom' \| 'topLeft' \| 'top' \| 'topRight' \| 'rightTop' \| 'right' \| 'rightBottom' \| 'bottomLeft' \| 'bottom' \| 'bottomRight'` | —             | No            | Placement of the popup relative to the trigger. All 12 compass positions are supported.                                                                                                                                                                                                                     |
| `popupVisible`            | `boolean`                                                                                                                                                        | —             | No            | Controlled visibility. When set, **overrides** the `action` prop's internal state entirely.                                                                                                                                                                                                                 |
| `prebuiltPlacementMap`    | `'offsetByCaret' \| 'offset0px' \| 'offset5px' \| 'offset10px'`                                                                                                  | `'offset0px'` | No            | Selects a premade 12-direction placement map with a preset offset. `offsetByCaret` uses a primary offset of 10 px and a secondary (perpendicular) offset of 12 px, suitable for caret/tooltip arrows. `offset5px` / `offset10px` apply a uniform offset in the primary axis. `offset0px` applies no offset. |
| `transitionType`          | `'none' \| 'slide' \| 'zoom-big' \| 'zoom-big-fast'`                                                                                                             | —             | No            | Enter/leave transition. `slide` is direction-aware: it derives the slide direction from `popupPlacement` (e.g. `bottom*` → `slide-up`, `right*` → `slide-left`). `zoom-big-fast` and `zoom-big` use scale-based zooming. `none` suppresses all transitions.                                                 |
| `getPopupContainer`       | `() => HTMLElement \| null`                                                                                                                                      | —             | No            | Returns the DOM element that will contain the popup. Use when the popup must scroll with a non-`body` container (e.g. a modal). The function must return an `HTMLElement` whenever the container is visible.                                                                                                |
| `popupStyle`              | `React.CSSProperties`                                                                                                                                            | —             | No            | Inline styles applied to the popup container. `position: 'absolute'` is always merged in by `PopupProvider` regardless of this value.                                                                                                                                                                       |
| `builtinPlacements`       | `TypePlacementMap`                                                                                                                                               | —             | No            | Fully custom placement align map. When provided, overrides `prebuiltPlacementMap` entirely. See `TypePlacementMap` below.                                                                                                                                                                                   |
| `popupTransitionName`     | `string \| Record<any, any>`                                                                                                                                     | —             | No            | Raw transition name passed to `rc-animate`. When provided, overrides the transition derived from `transitionType`. See [rc-animate](https://github.com/react-component/animate).                                                                                                                            |
| `mouseEnterDelay`         | `number`                                                                                                                                                         | —             | No            | Delay in **seconds** before showing on mouse enter. When provided, overrides the delay inferred from `transitionType`.                                                                                                                                                                                      |
| `mouseLeaveDelay`         | `number`                                                                                                                                                         | —             | No            | Delay in **seconds** before hiding on mouse leave. When provided, overrides the delay inferred from `transitionType`.                                                                                                                                                                                       |
| `mask`                    | `boolean`                                                                                                                                                        | —             | No            | Whether to render a backdrop mask behind the popup. See [rc-trigger 2.5.x](https://github.com/react-component/trigger/tree/2.5.x).                                                                                                                                                                          |
| `maskClosable`            | `boolean`                                                                                                                                                        | —             | No            | Whether clicking the mask closes the popup. See [rc-trigger 2.5.x](https://github.com/react-component/trigger/tree/2.5.x).                                                                                                                                                                                  |
| `onPopupAlign`            | `(value: Record<any, any>) => void`                                                                                                                              | —             | No            | Callback fired when the popup node is aligned/repositioned. See [rc-trigger 2.5.x](https://github.com/react-component/trigger/tree/2.5.x).                                                                                                                                                                  |
| `destroyPopupOnHide`      | `boolean`                                                                                                                                                        | —             | No            | When `true`, the popup DOM is destroyed when hidden instead of just hidden. See [rc-trigger 2.5.x](https://github.com/react-component/trigger/tree/2.5.x).                                                                                                                                                  |
| `alignPoint`              | `boolean`                                                                                                                                                        | —             | No            | When `true`, the popup aligns to the mouse cursor position. Supported for `'click'`, `'hover'`, and `'contextMenu'` actions.                                                                                                                                                                                |

#### `TypePlacementMap`

Exported from `@nutanix-ui/prism-reactjs`. Maps each of the 12 placement keys to an `AlignConfig` object.

```ts
type TypePlacementMap = {
  leftTop?: AlignConfig
  left?: AlignConfig
  leftBottom?: AlignConfig
  topLeft?: AlignConfig
  top?: AlignConfig
  topRight?: AlignConfig
  rightTop?: AlignConfig
  right?: AlignConfig
  rightBottom?: AlignConfig
  bottomLeft?: AlignConfig
  bottom?: AlignConfig
  bottomRight?: AlignConfig
}
```

#### `AlignConfig`

Based on [dom-align](https://github.com/yiminghe/dom-align) alignment config.

```ts
type PointString = 'tr' | 'tl' | 'cr' | 'cl' | 'br' | 'bl' | 'bc' | 'tc'

interface AlignConfig {
  points?: [PointString, PointString] // [popup anchor point, target anchor point]
  offset?: [number, number] // [x, y] offset in px from popup anchor
  targetOffset?: [number, number] // [x, y] offset in px from target anchor
  overflow?: {
    adjustX?: boolean | number
    adjustY?: boolean | number
    alwaysByViewport?: boolean
  }
}
```

### `transitionType` behaviour details

When `transitionType` is `'slide'`, the slide direction is inferred from `popupPlacement`:

| Placement group                       | Transition name |
| ------------------------------------- | --------------- |
| `bottomLeft`, `bottom`, `bottomRight` | `slide-up`      |
| `topLeft`, `top`, `topRight`          | `slide-down`    |
| `leftTop`, `left`, `leftBottom`       | `slide-right`   |
| `rightTop`, `right`, `rightBottom`    | `slide-left`    |

Timing delays applied automatically by `transitionType` (overridable with `mouseEnterDelay` / `mouseLeaveDelay`):

| `transitionType` | enter delay | leave delay |
| ---------------- | ----------- | ----------- |
| `slide`          | 0.15 s      | 0.1 s       |
| `zoom-big-fast`  | 0.1 s       | 0.1 s       |
| `zoom-big`       | 0.2 s       | 0.2 s       |
| `none` / unset   | none        | none        |

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Basic Example

```tsx
import React from 'react'
import { Button, PopupProvider } from '@nutanix-ui/prism-reactjs'

class MyPopupProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isPopupVisible: false,
    }

    this.handlePopupVisibleChange = this.handlePopupVisibleChange.bind(this)
  }

  handlePopupVisibleChange(visible) {
    this.setState({ isPopupVisible: visible })
  }

  render() {
    return (
      <PopupProvider
        action={['hover', 'click', 'focus']}
        popup={<div>Content wrapper</div>}
        popupPlacement="bottom"
        popupVisible={this.state.isPopupVisible}
        onPopupVisibleChange={this.handlePopupVisibleChange}
        popupStyle={{
          zIndex: 1,
          border: '1px solid black',
          display: this.state.isPopupVisible ? 'block' : 'none',
        }}
      >
        <Button>Open Popup</Button>
      </PopupProvider>
    )
  }
}
```

#### Functional Component (Controlled Visibility)

```tsx
import React, { useState } from 'react'
import { Button, PopupProvider } from '@nutanix-ui/prism-reactjs'

function ControlledPopup() {
  const [visible, setVisible] = useState(false)

  return (
    <PopupProvider
      action={['click']}
      popup={
        <div
          style={{ padding: 8, background: '#fff', border: '1px solid #ccc' }}
        >
          Popup content
        </div>
      }
      popupPlacement="bottomLeft"
      popupVisible={visible}
      onPopupVisibleChange={setVisible}
      transitionType="zoom-big-fast"
      prebuiltPlacementMap="offset5px"
    >
      <Button>Toggle</Button>
    </PopupProvider>
  )
}
```

#### With Slide Transition

```tsx
import React, { useState } from 'react'
import { Button, PopupProvider } from '@nutanix-ui/prism-reactjs'

function SlidePopup() {
  const [visible, setVisible] = useState(false)

  return (
    <PopupProvider
      action={['click']}
      popup={<div style={{ padding: 8 }}>Slides up from bottom</div>}
      popupPlacement="bottom"
      transitionType="slide"
      onPopupVisibleChange={setVisible}
    >
      <Button>Open</Button>
    </PopupProvider>
  )
}
```

#### Using getPopupContainer (Popup Inside a Scrollable Container)

```tsx
import React from 'react'
import {
  Button,
  Select,
  StackingLayout,
  PopupProvider,
} from '@nutanix-ui/prism-reactjs'

class MySelect extends React.Component {
  constructor(props) {
    super(props)

    this.state = { selectedRow: null }
    this.handleOnSelectedChange = this.handleOnSelectedChange.bind(this)
    this.selectProps = {
      rowsData: [
        { key: 1, label: 'puppyfood' },
        { key: 2, label: 'Peach' },
        { key: 3, label: 'galesbure2' },
        { key: 4, label: 'Orange', disabled: true },
        { key: 5, label: 'Green' },
        { key: 6, label: 'Red' },
        { key: 7, label: 'Purple' },
        { key: 8, label: 'Blue' },
        { key: 9, label: 'Yellow' },
        { key: 10, label: 'Cyan' },
      ],
      label: 'Clusters',
      onSelectedChange: this.handleOnSelectedChange,
      dropdownProps: { showCustomScrollbar: false },
    }
  }

  handleOnSelectedChange(selectedRow) {
    this.setState({ selectedRow })
  }

  render() {
    return (
      <Select
        inputProps={{ name: 'basic-select' }}
        style={{ maxWidth: '440px' }}
        {...this.selectProps}
        selectedRow={this.state.selectedRow}
        {...this.props}
        getPopupContainer={() => this.props.mountRef.current}
      />
    )
  }
}

class MyPopupProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = { isPopupVisible: false }
    this.handlePopupVisibleChange = this.handlePopupVisibleChange.bind(this)
    this.popupRef = React.createRef()
  }

  handlePopupVisibleChange(visible) {
    this.setState({ isPopupVisible: visible })
  }

  renderPopup() {
    return (
      <StackingLayout
        parentDivRef={this.popupRef}
        padding="20px"
        style={{ height: 200, overflow: 'auto', position: 'relative' }}
      >
        <MySelect mountRef={this.popupRef} />
      </StackingLayout>
    )
  }

  render() {
    return (
      <PopupProvider
        action={['click']}
        popup={this.renderPopup()}
        popupPlacement="bottom"
        popupVisible={this.state.isPopupVisible}
        onPopupVisibleChange={this.handlePopupVisibleChange}
        popupStyle={{
          zIndex: 1,
          border: '1px solid black',
          display: this.state.isPopupVisible ? 'block' : 'none',
        }}
      >
        <Button>Open Popup</Button>
      </PopupProvider>
    )
  }
}
```

#### Using a Custom `builtinPlacements` Map

```tsx
import React, { useState } from 'react'
import { Button, PopupProvider } from '@nutanix-ui/prism-reactjs'
import type { TypePlacementMap } from '@nutanix-ui/prism-reactjs'

const customPlacements: TypePlacementMap = {
  bottom: {
    points: ['tc', 'bc'],
    offset: [0, 4],
    overflow: { adjustX: true, adjustY: true },
  },
}

function CustomPlacementPopup() {
  const [visible, setVisible] = useState(false)

  return (
    <PopupProvider
      action={['click']}
      popup={<div>Custom placement</div>}
      popupPlacement="bottom"
      builtinPlacements={customPlacements}
      onPopupVisibleChange={setVisible}
    >
      <Button>Open</Button>
    </PopupProvider>
  )
}
```

### Usage Notes

- `PopupProvider` is a low-level building block. Prefer `Tooltip`, `Popover`, or `Dropdown` for standard use cases.
- When `popupVisible` is provided, `PopupProvider` becomes fully controlled and **ignores** the `action` prop's automatic show/hide logic. You must manage visibility state entirely yourself.
- `popupStyle` always has `position: 'absolute'` merged in by the component — you cannot override this property via `popupStyle`.
- When a **disabled** component is the direct child, it may swallow pointer events and prevent the popup from triggering. Wrap the disabled child in a `<span>` to restore event propagation.
- Use `getPopupContainer` when the trigger is inside a scrollable container. Without it, the popup is attached to `document.body` and will not scroll with its trigger.
- `destroyPopupOnHide` reduces DOM size but incurs a remount cost each time the popup opens. Omit it for popups that open frequently.
- `mouseEnterDelay` and `mouseLeaveDelay` are in **seconds** (not milliseconds).
- These exports are React-only helpers or lower-level utilities. Keep generated app code aligned with repository rules: Prism layout components for layout, persistent accessible labels, and no custom CSS for spacing.

<!-- SOURCE-API-END -->
