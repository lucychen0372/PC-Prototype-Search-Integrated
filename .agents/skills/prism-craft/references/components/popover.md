# Popover

## Figma

- **Library name:** Popover (page: N/A, frame: Popover)

## React

Import: `import { Popover } from '@nutanix-ui/prism-reactjs'`

### Version note: new vs. old Popover

The component ships two implementations behind a single export.

| Mode                                        | How to activate                          | Positioning engine                      |
| ------------------------------------------- | ---------------------------------------- | --------------------------------------- |
| **New (V2)** — recommended                  | `oldPopover={false}`                     | `@floating-ui/dom` via `PortalProvider` |
| **Old (legacy)** — backwards-compat default | omit `oldPopover` or `oldPopover={true}` | `PopupProvider` (rc-trigger)            |

**Always set `oldPopover={false}` for new code.** The legacy mode exists only for migration. Every example below targets the new API unless noted otherwise.

---

## New Popover API (`oldPopover={false}`)

### Props

| Prop                           | Type                                                                 | Default          | Required        | Description                                                                                                                          |
| ------------------------------ | -------------------------------------------------------------------- | ---------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `oldPopover`                   | `false`                                                              | —                | Yes (to opt in) | Must be `false` to use the new V2 API.                                                                                               |
| `children`                     | `JSX.Element`                                                        | —                | Yes             | The trigger element the popover anchors to.                                                                                          |
| `content`                      | `React.ReactNode`                                                    | —                | Yes             | Content rendered inside the popover.                                                                                                 |
| `title`                        | `React.ReactNode`                                                    | —                | No              | Title shown at the top of the popover. When a string, `aria-labelledby` is set automatically on the dialog.                          |
| `titleProps`                   | `Omit<TitleProps, 'children'>`                                       | —                | No              | Extra props forwarded to the internal `<Title>` component. Usable only when `title` is a string.                                     |
| `placement`                    | `Placement` (see below)                                              | `'top'`          | No              | Preferred placement of the popover relative to the trigger. Flips automatically when space is limited.                               |
| `offset`                       | `number`                                                             | `10`             | No              | Distance in pixels between the popover and the trigger element.                                                                      |
| `padding`                      | `'0px' \| '20px'`                                                    | `'20px'`         | No              | Inner padding of the popover content area.                                                                                           |
| `showCaret`                    | `boolean`                                                            | `true`           | No              | Whether to render the directional caret/arrow.                                                                                       |
| `trigger`                      | `'click' \| 'hover' \| 'focus' \| 'none' \| PortalProviderTrigger[]` | `'click'`        | No              | Interaction event(s) that open the popover. Use `'none'` to make it fully controlled via `visible`.                                  |
| `visible`                      | `boolean`                                                            | —                | No              | Controlled visibility. When set, `trigger` events are ignored.                                                                       |
| `onVisibleChange`              | `(visible: boolean) => void`                                         | —                | No              | Callback fired when the popover opens or closes.                                                                                     |
| `trapFocus`                    | `boolean`                                                            | `true`           | No              | Keep keyboard focus inside the popover while it is open.                                                                             |
| `passThrough`                  | `boolean`                                                            | `true`           | No              | When `trapFocus` is `true`, Tab past the last item (or Shift+Tab past the first) moves focus back to the trigger instead of looping. |
| `focusOnFirstFocusableElement` | `boolean`                                                            | `true`           | No              | Automatically focus the first focusable element when the popover opens.                                                              |
| `restoreFocus`                 | `boolean`                                                            | `true`           | No              | Return focus to the trigger element when the popover closes.                                                                         |
| `background`                   | `'base' \| 'alt'`                                                    | inherits context | No              | Override the `BackgroundContext` background surface for the popover container.                                                       |
| `className`                    | `string`                                                             | —                | No              | Additional CSS class added to the popover portal wrapper.                                                                            |
| `wrapperProps`                 | `PopoverContentProps['wrapperProps']` (see below)                    | —                | No              | Props forwarded to the inner popover container `<div>`, including `role`, `aria-label`, and `data-test-id`.                          |
| `mountElement`                 | `() => HTMLElement \| null \| undefined`                             | `document.body`  | No              | Function returning the DOM element into which the popover portal is mounted. Useful inside scrollable containers.                    |
| `mouseEnterDelay`              | `number`                                                             | `0`              | No              | Delay (ms) before showing when `trigger` includes `'hover'`.                                                                         |
| `mouseLeaveDelay`              | `number`                                                             | `0`              | No              | Delay (ms) before hiding when `trigger` includes `'hover'`.                                                                          |
| `unmountOnExit`                | `boolean`                                                            | `true`           | No              | Unmount the portal content from the DOM when hidden.                                                                                 |
| `animationFrame`               | `boolean`                                                            | `false`          | No              | Use `requestAnimationFrame` for position updates (smoother in animated layouts).                                                     |
| `style`                        | `React.CSSProperties`                                                | —                | No              | Inline styles applied to the portal wrapper.                                                                                         |

### `placement` values

```
'top' | 'top-start' | 'top-end'
'bottom' | 'bottom-start' | 'bottom-end'
'left' | 'left-start' | 'left-end'
'right' | 'right-start' | 'right-end'
```

The popover uses `@floating-ui/dom` and automatically flips/shifts when the preferred placement has insufficient viewport space.

### `wrapperProps` shape

```ts
{
  role?: 'dialog' | 'alertdialog',
  'aria-label'?: string,
  'data-test-id'?: string,
  // …any HTMLDivElement attribute
}
```

`role` defaults to `"dialog"`. Use `"alertdialog"` for destructive confirmations.

### `trigger` enum

```ts
import { PortalProviderTrigger } from '@nutanix-ui/prism-reactjs'

PortalProviderTrigger.CLICK // 'click'
PortalProviderTrigger.HOVER // 'hover'
PortalProviderTrigger.FOCUS // 'focus'
```

---

## Subcomponent: `Popover.PopoverContent`

`PopoverContent` is the visual shell of the popover. It is exposed as `Popover.PopoverContent` and can be used standalone to render a static popover-styled container (for demos, previews, or stacked layouts).

### `PopoverContentProps`

| Prop           | Type                                      | Default          | Description                                                                                                          |
| -------------- | ----------------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------- |
| `content`      | `React.ReactNode`                         | —                | Main content of the container.                                                                                       |
| `title`        | `React.ReactNode`                         | —                | Title rendered above `content`.                                                                                      |
| `titleProps`   | `Omit<TitleProps, 'children'>`            | —                | Extra props for the `<Title>` element when `title` is a string.                                                      |
| `padding`      | `'0px' \| '20px'`                         | `'20px'`         | Inner padding.                                                                                                       |
| `showCaret`    | `boolean \| PopoverContentCaretPlacement` | —                | Whether to show the caret; when a `PopoverContentCaretPlacement` value is provided the caret is pinned to that edge. |
| `background`   | `'base' \| 'alt'`                         | inherits context | Background surface override.                                                                                         |
| `wrapperProps` | see above                                 | —                | Props forwarded to the container `<div>`.                                                                            |
| `caretRef`     | `React.Ref<HTMLDivElement>`               | —                | Ref attached to the caret `<div>` for position computation by `PortalProvider`.                                      |
| `headerId`     | `string`                                  | auto-generated   | `id` set on the title node; used for `aria-labelledby`.                                                              |
| `className`    | `string`                                  | —                | Extra class on the container.                                                                                        |
| `data-test`    | `string`                                  | —                | Test attribute.                                                                                                      |
| `role`         | `'dialog' \| 'alertdialog'`               | `'dialog'`       | ARIA role.                                                                                                           |
| `aria-label`   | `string`                                  | —                | ARIA label when the title is not visible text.                                                                       |

### `PopoverContentCaretPlacement` enum

Static members: `PopoverContent.PopoverContentCaretPlacement` and `PopoverContent.CARET_PLACEMENTS`.

```ts
import { Popover } from '@nutanix-ui/prism-reactjs'
const { PopoverContent } = Popover

PopoverContent.CARET_PLACEMENTS.TOP // 'top'
PopoverContent.CARET_PLACEMENTS.TOP_LEFT // 'top-left'
PopoverContent.CARET_PLACEMENTS.TOP_RIGHT // 'top-right'
PopoverContent.CARET_PLACEMENTS.LEFT // 'left'
PopoverContent.CARET_PLACEMENTS.LEFT_TOP // 'left-top'
PopoverContent.CARET_PLACEMENTS.LEFT_BOTTOM // 'left-bottom'
PopoverContent.CARET_PLACEMENTS.RIGHT // 'right'
PopoverContent.CARET_PLACEMENTS.RIGHT_TOP // 'right-top'
PopoverContent.CARET_PLACEMENTS.RIGHT_BOTTOM // 'right-bottom'
PopoverContent.CARET_PLACEMENTS.BOTTOM // 'bottom'
PopoverContent.CARET_PLACEMENTS.BOTTOM_LEFT // 'bottom-left'
PopoverContent.CARET_PLACEMENTS.BOTTOM_RIGHT // 'bottom-right'
```

---

## TSX Examples

### Basic (minimal working example)

```tsx
import {
  Popover,
  StackingLayout,
  Button,
  Paragraph,
} from '@nutanix-ui/prism-reactjs'

const content = (
  <StackingLayout>
    <Paragraph>Additional information goes here.</Paragraph>
    <Button type={Button.ButtonTypes.PRIMARY}>Confirm</Button>
  </StackingLayout>
)

;<Popover
  oldPopover={false}
  content={content}
  title="Details"
  wrapperProps={{ 'data-test-id': 'my-popover' }}
>
  <Button>Open Popover</Button>
</Popover>
```

### Delete / destructive confirmation

```tsx
import {
  Popover,
  StackingLayout,
  FlexLayout,
  Button,
  Paragraph,
} from '@nutanix-ui/prism-reactjs'

const content = (
  <StackingLayout>
    <FlexLayout itemFlexBasis="100pc">
      <Paragraph>
        Are you sure you want to delete this security policy?
      </Paragraph>
    </FlexLayout>
    <FlexLayout itemFlexBasis="100pc">
      <Button type={Button.ButtonTypes.SECONDARY}>Cancel</Button>
      <Button type={Button.ButtonTypes.DESTRUCTIVE}>Delete</Button>
    </FlexLayout>
  </StackingLayout>
)

;<Popover
  oldPopover={false}
  content={content}
  placement="right"
  title="Please Confirm"
  wrapperProps={{ role: 'alertdialog' }}
>
  <Button>Delete Policy</Button>
</Popover>
```

### Controlled visibility

```tsx
import React, { useState } from 'react'
import {
  Popover,
  FlexLayout,
  Button,
  Paragraph,
} from '@nutanix-ui/prism-reactjs'

const ControlledPopover = () => {
  const [visible, setVisible] = useState(false)

  const content = (
    <FlexLayout itemFlexBasis="100pc">
      <Button
        type={Button.ButtonTypes.PRIMARY}
        onClick={() => setVisible(false)}
      >
        Confirm
      </Button>
      <Button
        type={Button.ButtonTypes.SECONDARY}
        onClick={() => setVisible(false)}
      >
        Cancel
      </Button>
    </FlexLayout>
  )

  return (
    <FlexLayout justifyContent="space-between">
      <Popover
        oldPopover={false}
        content={content}
        title="Confirm Action"
        padding="0px"
        visible={visible}
        onVisibleChange={setVisible}
      >
        <Button onClick={() => setVisible(!visible)}>Open Popover</Button>
      </Popover>
    </FlexLayout>
  )
}
```

### No caret

```tsx
import { Popover, Button, Title } from '@nutanix-ui/prism-reactjs'
;<Popover
  oldPopover={false}
  content={<Title size="h3">Check again tomorrow.</Title>}
  placement="top-end"
  showCaret={false}
>
  <Button type={Button.ButtonTypes.TEXT_NORMAL}>Where did my caret go?</Button>
</Popover>
```

### Zero padding (widget action menu)

Use `padding="0px"` when building compact menus where the content manages its own spacing.

```tsx
import React, { useState } from 'react'
import {
  Popover,
  Button,
  FlexLayout,
  TripleDotVerticalIcon,
} from '@nutanix-ui/prism-reactjs'

const WidgetMenu = () => {
  const [visible, setVisible] = useState(false)

  const menuContent = (
    <FlexLayout
      flexDirection="column"
      itemGap="XS"
      alignItems="flex-start"
      padding="10px"
      style={{ minWidth: 160 }}
    >
      <Button type={Button.ButtonTypes.TEXT_PRIMARY}>Edit</Button>
      <Button type={Button.ButtonTypes.TEXT_PRIMARY}>Duplicate</Button>
      <Button type={Button.ButtonTypes.TEXT_PRIMARY}>Delete</Button>
    </FlexLayout>
  )

  return (
    <Popover
      oldPopover={false}
      visible={visible}
      onVisibleChange={setVisible}
      placement="bottom-end"
      padding="0px"
      content={menuContent}
      wrapperProps={{ 'data-test-id': 'widget-menu-popover' }}
    >
      <Button
        type={Button.ButtonTypes.TEXT_PRIMARY}
        onClick={() => setVisible(!visible)}
      >
        <TripleDotVerticalIcon />
      </Button>
    </Popover>
  )
}
```

### Scrollable container (`mountElement`)

Mount the popover inside a scrollable container so it stays positioned correctly when the container scrolls.

```tsx
import React, { useEffect, useRef, useState } from 'react'
import {
  Popover,
  ContainerLayout,
  FlexLayout,
  Button,
  StackingLayout,
  Paragraph,
} from '@nutanix-ui/prism-reactjs'

const ScrollingPopover = () => {
  const containerRef = useRef(null)
  const [container, setContainer] = useState(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 600
      containerRef.current.scrollLeft = 600
      setContainer(containerRef)
    }
  }, [])

  return (
    <ContainerLayout border={true} style={{ width: 600 }}>
      <div
        ref={containerRef}
        style={{ overflow: 'auto', width: 600, height: 600 }}
      >
        <FlexLayout
          style={{ width: 1800, height: 1800 }}
          justifyContent="center"
          alignItems="center"
        >
          <Popover
            oldPopover={false}
            trapFocus={false}
            content={
              <StackingLayout>
                <Paragraph>Scroll me!</Paragraph>
              </StackingLayout>
            }
            mountElement={() => container && container.current}
            visible={true}
          >
            <Button>Popover</Button>
          </Popover>
        </FlexLayout>
      </div>
    </ContainerLayout>
  )
}
```

### `PopoverContent` standalone (static preview)

```tsx
import {
  Popover,
  StackingLayout,
  FormItemInput,
  Button,
} from '@nutanix-ui/prism-reactjs'

const { PopoverContent } = Popover

;<PopoverContent
  showCaret="left-top"
  title="Edit Security Rule"
  content={
    <StackingLayout>
      <FormItemInput
        id="rule-name"
        label="Name"
        defaultValue="Isolating Dev VMs"
      />
      <Button fullWidth={true}>Save</Button>
    </StackingLayout>
  }
/>
```

---

## Legacy Popover API (`oldPopover={true}` / default)

> Use this API only when maintaining existing code. All new features should use `oldPopover={false}`.

### Legacy-only props

| Prop                   | Type                                      | Default   | Description                                                                     |
| ---------------------- | ----------------------------------------- | --------- | ------------------------------------------------------------------------------- |
| `action`               | `'click' \| 'hover' \| 'focus' \| 'none'` | `'click'` | Trigger event. **`'hover'` is deprecated** since 2.24.0; use `Tooltip` instead. |
| `popupPlacement`       | see below                                 | `'top'`   | Placement using rc-trigger style names.                                         |
| `popupVisible`         | `boolean`                                 | —         | Controlled visibility (legacy equivalent of `visible`).                         |
| `onPopupVisibleChange` | `(visible: boolean) => void`              | —         | Visibility change callback (legacy equivalent of `onVisibleChange`).            |
| `trapFocus`            | `'auto' \| boolean`                       | `'auto'`  | `'auto'` traps focus while the popup is visible.                                |
| `getPopupContainer`    | `() => HTMLElement`                       | —         | Container for the popup (legacy equivalent of `mountElement`).                  |

Legacy `popupPlacement` values: `'leftTop' | 'left' | 'leftBottom' | 'topLeft' | 'top' | 'topRight' | 'rightTop' | 'right' | 'rightBottom' | 'bottomLeft' | 'bottom' | 'bottomRight'`

### Migration: 1.x → 2.x → V2 (new)

| 1.x prop          | 2.x (legacy) prop      | New V2 prop       |
| ----------------- | ---------------------- | ----------------- |
| `trigger`         | `action`               | `trigger`         |
| `placement`       | `popupPlacement`       | `placement`       |
| `visible`         | `popupVisible`         | `visible`         |
| `onVisibleChange` | `onPopupVisibleChange` | `onVisibleChange` |

---

## Accessibility & Keyboard Behaviour

- The popover **must** be triggered by an explicit user action (click / Enter / Space). Do not use hover-only triggers.
- The popover **should** contain at least one interactive element. If no interactive element is required, consider `Tooltip` instead.
- Providing a `title` string automatically sets `aria-labelledby` on the `role="dialog"` container.
- If there is no visible title, supply `wrapperProps={{ 'aria-label': '…' }}`.
- **Escape** closes the popover and restores focus to the trigger (controlled by `closeOnEscape` in `PortalProvider`, always `true` in `Popover`).
- **Tab / Shift+Tab**: with the default `trapFocus={true}` + `passThrough={true}`, Tab past the last focusable item (or Shift+Tab past the first) moves focus back to the trigger and closes the popover.
- `focusOnFirstFocusableElement={true}` (default) auto-focuses the first focusable control on open.
- `restoreFocus={true}` (default) returns focus to the trigger on close.
- For destructive confirmations, set `wrapperProps={{ role: 'alertdialog' }}`.

---

## Anti-patterns

- Don't use `Dropdown` for rich content — use `Popover`.
- `Dropdown` is for menu/action lists; `Popover` is for rich info panels.
- Don't omit `oldPopover={false}` for new code — the legacy default is retained only for backwards compatibility.
- Don't use `trigger="hover"` (or `action="hover"` in legacy) — it is deprecated and violates accessibility standards; use `Tooltip` for hover-only patterns.
- Don't put only static text with no interactive elements in a popover; screen reader and keyboard users have no way to dismiss it gracefully.

---

<!-- SOURCE-API-START -->

### Import

```tsx
import { Popover } from '@nutanix-ui/prism-reactjs'
```

### Exported Type Aliases

#### `NewPopoverProps`

```ts
type NewPopoverProps = { oldPopover: false } & Props
```

#### `OlderPopoverProps`

```ts
type OlderPopoverProps = { oldPopover?: true } & OldPopoverProps
```

#### `PopoverProps`

```ts
type PopoverProps = NewPopoverProps | OlderPopoverProps
```

### Static Members

- `Popover.PopoverContent` — the `PopoverContent` subcomponent (see above)

### Usage Notes

- Prefer `oldPopover={false}` for all new code.
- Use `placement` (not `popupPlacement`) with new-API values (`'top'`, `'bottom-start'`, etc.).
- Use `visible` + `onVisibleChange` (not `popupVisible` / `onPopupVisibleChange`) with new API.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) inside `content` instead of custom CSS where possible.
- Pass `data-test-id` via `wrapperProps`, not directly on `<Popover>`.
- When nesting inside a scrollable container, pass `mountElement` so `@floating-ui/dom` can anchor the portal correctly.

<!-- SOURCE-API-END -->
